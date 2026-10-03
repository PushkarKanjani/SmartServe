import os
import re
import uuid
import httpx
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.core.config import settings
from app.models.user import User
from app.models.customer import Customer, Booking
from app.models.provider import Provider
from app.models.support import SupportTicket, TicketMessage, TicketPriority, TicketStatus
from app.core.dependencies import AuthUser

# Approved SmartServe Knowledge Base Summary for Prompt Grounding
SMARTSERVE_APPROVED_KNOWLEDGE = """
SmartServe is an on-demand verified home and urban services platform in India.

APPROVED GENERAL INFORMATION:
- Operating cities: Noida, Greater Noida, Delhi NCR, and expanding metro areas.
- Service Categories: Beauty & Salon (Women & Men), Deep Cleaning & Pest Control, AC & Appliance Repair, Electrician, Plumber, Carpenter, Home Painting.
- Core Promise: Upfront fixed catalog pricing, verified background-checked service partners, standard 30-day service warranty on repairs.
- Payment Methods: UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD). Payment status is Pending until service completion.

CUSTOMER WORKFLOW & RULES:
1. Booking Flow: Select service -> choose address & date/time slot -> select verified provider or instant match -> booking is Requested -> Provider Accepts -> Provider updates status (On The Way -> Arrived -> Started -> Completed).
2. Start OTP: When provider arrives, customer receives a 4-digit Service Start OTP. The provider enters this OTP to officially begin the job.
3. Cancellation Policy: Free cancellation before the provider departs ("On The Way"). Once provider is "On The Way" or "Arrived", cancellation may require Admin support or standard dispatch charges.
4. Rescheduling: Customers can reschedule their booking from their Bookings page before technician dispatch, choosing another available slot.
5. Provider Location: Customers can track provider arrival status ("On The Way", "Arrived") on their Booking Detail page.

PROVIDER WORKFLOW & RULES:
1. Job Lifecycle: Provider receives booking notification -> Reviews job & address -> Accepts or Rejects (with valid reason within SLA) -> On The Way -> Arrived -> Enter 4-digit Customer Start OTP -> Perform service -> Complete job.
2. Availability & Slots: Providers configure their schedule in the Availability calendar (Free, Booked, Unavailable). Slots must be managed in advance.
3. Verification & Compliance: Providers must maintain verified KYC documents (Aadhaar, PAN, Skill Certificate) to accept jobs.

STRICT CONSTRAINTS (CRITICAL):
- Never invent prices, discounts, coupons, refund decisions, or policies.
- Never guarantee a refund or make financial promises — only Admin can approve refunds.
- Never expose private customer contact info (personal phone/email) to anyone except authorized parties.
- Never expose provider personal addresses or documents to customers.
- Never claim an action was completed (e.g. "I cancelled your booking") because AI cannot execute mutations. Always direct the user to the appropriate button on their dashboard or escalate to Admin.
- If uncertain, clearly say you cannot answer and offer to escalate to Admin Support.
"""


def ensure_ai_system_user(db: Session) -> User:
    """Ensure an AI system user exists in the DB so ticket_messages FK constraint is satisfied."""
    ai_user = db.query(User).filter(User.email == "ai-support@smartserve.com").first()
    if not ai_user:
        ai_user = User(
            id=uuid.uuid4(),
            email="ai-support@smartserve.com",
            password_hash="$2b$12$eA8m9cSmartServeAiSupportAgentPlaceholderHash123",
            role="ai_agent",
            is_active=True,
            created_at=datetime.now(timezone.utc),
        )
        db.add(ai_user)
        db.commit()
        db.refresh(ai_user)
    return ai_user


# Regex patterns for deterministic safety, legal, dispute & human escalation triggers
ESCALATION_PATTERNS = {
    "human_requested": re.compile(
        r"\b(human|talk to human|speak to human|real person|agent|representative|executive|customer care|speak to someone|human support|operator|live agent)\b",
        re.IGNORECASE,
    ),
    "safety_emergency": re.compile(
        r"\b(emergency|fire|electric shock|hazard|danger|police|threat|ambulance|injured|injury|hurt|bleeding|assault|unsafe|physically|harassed)\b",
        re.IGNORECASE,
    ),
    "fraud_suspicious": re.compile(
        r"\b(fraud|scam|stolen|unauthorized|hacked|fake profile|impersonat|cheated|robbed)\b",
        re.IGNORECASE,
    ),
    "payment_dispute": re.compile(
        r"\b(dispute|chargeback|money back|double charged|wrong amount|deducted twice|charged incorrectly|unauthorized charge|refund denied|demand refund)\b",
        re.IGNORECASE,
    ),
    "customer_provider_dispute": re.compile(
        r"\b(abusive|misbehaved|screaming|damaged my|broke my|stole from|property damage|refused to work|fighting|rude behavior)\b",
        re.IGNORECASE,
    ),
    "serious_complaint": re.compile(
        r"\b(file complaint|official complaint|legal notice|sue|consumer court|unacceptable|escalate to admin|talk to manager|terrible service)\b",
        re.IGNORECASE,
    ),
    "account_verification_issue": re.compile(
        r"\b(account suspended|account blocked|kyc rejected|document rejected|banned|reinstate account|verification failed)\b",
        re.IGNORECASE,
    ),
}


class AISupportService:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY or os.getenv("OPENROUTER_API_KEY", "")
        self.model = settings.OPENROUTER_MODEL or os.getenv("OPENROUTER_MODEL", "openrouter/free")
        self.max_messages = settings.MAX_AI_SUPPORT_MESSAGES
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"

    def check_escalation_triggers(
        self, user_message: str, interaction_count: int
    ) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Evaluate if user message or interaction limit triggers immediate escalation.
        Returns: (should_escalate, reason_key, human_readable_reason)
        """
        # 1. Interaction limit check
        if interaction_count >= self.max_messages:
            return (
                True,
                "interaction_limit_reached",
                "Maximum AI interaction limit reached. Escalating to human operations.",
            )

        # 2. Check keyword patterns
        for key, pattern in ESCALATION_PATTERNS.items():
            if pattern.search(user_message):
                readable_names = {
                    "human_requested": "User requested to speak with a human support agent",
                    "safety_emergency": "Safety or emergency incident reported",
                    "fraud_suspicious": "Fraud or suspicious activity detected",
                    "payment_dispute": "Payment or refund dispute requiring Admin resolution",
                    "customer_provider_dispute": "Interpersonal dispute or property damage reported",
                    "serious_complaint": "Formal customer grievance or severe service complaint",
                    "account_verification_issue": "Account suspension or KYC verification issue requiring Admin review",
                }
                return True, key, readable_names.get(key, "Issue flagged for Admin review")

        return False, None, None

    def get_authorized_context(
        self, db: Session, user: AuthUser, booking_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Retrieve strictly authorized data for the caller.
        Customer can only see customer's bookings.
        Provider can only see provider's assigned jobs.
        """
        context = {
            "role": user.role,
            "full_name": user.full_name,
            "email": user.email,
            "active_booking": None,
            "recent_bookings": [],
        }

        # 1. Customer Context
        if user.role == "customer":
            customer = db.query(Customer).filter(Customer.user_id == user.id).first()
            if not customer:
                return context
            context["customer_id"] = str(customer.id)

            # If specific booking requested, enforce ownership
            if booking_id:
                try:
                    b_uuid = uuid.UUID(booking_id)
                    b = (
                        db.query(Booking)
                        .filter(Booking.id == b_uuid, Booking.customer_id == customer.id)
                        .first()
                    )
                    if b:
                        context["active_booking"] = self._serialize_booking(b)
                except Exception:
                    pass

            # If no specific active booking found, query recent customer bookings
            bookings = (
                db.query(Booking)
                .filter(Booking.customer_id == customer.id)
                .order_by(Booking.scheduled_time.desc())
                .limit(3)
                .all()
            )
            context["recent_bookings"] = [self._serialize_booking(b) for b in bookings]
            if not context["active_booking"] and bookings:
                active_b = next(
                    (b for b in bookings if b.status not in ["Completed", "Cancelled", "Rejected"]),
                    None,
                )
                if active_b:
                    context["active_booking"] = self._serialize_booking(active_b)

        # 2. Provider Context
        elif user.role == "provider":
            provider = db.query(Provider).filter(Provider.user_id == user.id).first()
            if not provider:
                return context
            context["provider_id"] = str(provider.user_id)
            context["is_verified"] = provider.is_verified
            context["category"] = provider.category

            # If specific booking requested, enforce provider ownership
            if booking_id:
                try:
                    b_uuid = uuid.UUID(booking_id)
                    b = (
                        db.query(Booking)
                        .filter(Booking.id == b_uuid, Booking.provider_id == provider.user_id)
                        .first()
                    )
                    if b:
                        context["active_booking"] = self._serialize_booking(b)
                except Exception:
                    pass

            # Query provider's upcoming jobs
            jobs = (
                db.query(Booking)
                .filter(Booking.provider_id == provider.user_id)
                .order_by(Booking.scheduled_time.asc())
                .limit(3)
                .all()
            )
            context["recent_bookings"] = [self._serialize_booking(b) for b in jobs]
            if not context["active_booking"] and jobs:
                active_j = next(
                    (j for j in jobs if j.status not in ["Completed", "Cancelled", "Rejected"]),
                    None,
                )
                if active_j:
                    context["active_booking"] = self._serialize_booking(active_j)

        return context

    def _serialize_booking(self, b: Booking) -> Dict[str, Any]:
        """Serialize booking data securely for AI prompt grounding."""
        provider_name = "Not Assigned"
        try:
            if b.provider and hasattr(b.provider, "full_name") and b.provider.full_name:
                provider_name = b.provider.full_name
        except Exception:
            pass

        customer_name = "Customer"
        try:
            if b.customer and hasattr(b.customer, "full_name") and b.customer.full_name:
                customer_name = b.customer.full_name
        except Exception:
            pass

        service_name = "Home Service"
        try:
            if b.service and hasattr(b.service, "name") and b.service.name:
                service_name = b.service.name
        except Exception:
            pass

        return {
            "id": str(b.id),
            "reference": f"BK-{str(b.id)[:8].upper()}",
            "service_name": service_name,
            "status": b.status,
            "payment_status": b.payment_status,
            "scheduled_time": b.scheduled_time.strftime("%d %b %Y, %I:%M %p") if b.scheduled_time else "TBD",
            "provider_name": provider_name,
            "customer_name": customer_name,
            "total_price": f"₹{b.total_price}",
            "address": b.address or "On file",
        }

    def call_llm(self, prompt_messages: List[Dict[str, str]]) -> Tuple[bool, str]:
        """
        Invoke the configured LLM gateway.
        Returns: (success: bool, text_response: str)
        """
        if not self.api_key:
            return False, ""

        # Models to try in order (primary + fallback free models)
        models_to_try = [
            self.model,
            "nvidia/nemotron-3.5-lightning:free",
            "openrouter/free",
        ]

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://smartserve.in",
            "X-Title": "SmartServe Limited AI Assistant",
        }

        for model_name in models_to_try:
            try:
                payload = {
                    "model": model_name,
                    "messages": prompt_messages,
                    "temperature": 0.2,
                    "max_tokens": 450,
                }
                with httpx.Client(timeout=14.0) as client:
                    resp = client.post(self.base_url, headers=headers, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        choices = data.get("choices", [])
                        if choices and "message" in choices[0]:
                            content = choices[0]["message"].get("content", "").strip()
                            if content:
                                return True, content
            except Exception:
                continue

        return False, ""

    def create_support_ticket(
        self,
        db: Session,
        user: AuthUser,
        reason: str,
        issue_summary: str,
        history: List[Dict[str, str]],
        booking_id: Optional[str] = None,
    ) -> SupportTicket:
        """
        Escalate to Admin Support using the EXISTING support_tickets and ticket_messages tables.
        """
        ai_user = ensure_ai_system_user(db)
        ticket_id = uuid.uuid4()

        # Resolve customer_id and provider_id
        customer_id = None
        provider_id = None
        b_uuid = None

        if booking_id:
            try:
                b_uuid = uuid.UUID(booking_id)
                bk = db.query(Booking).filter(Booking.id == b_uuid).first()
                if bk:
                    customer_id = bk.customer_id
                    provider_id = bk.provider_id
            except Exception:
                pass

        if user.role == "customer" and not customer_id:
            cust = db.query(Customer).filter(Customer.user_id == user.id).first()
            if cust:
                customer_id = cust.id

        if user.role == "provider" and not provider_id:
            prov = db.query(Provider).filter(Provider.user_id == user.id).first()
            if prov:
                provider_id = prov.user_id

        # Categorize
        category = "AI Escalation"
        priority = TicketPriority.MEDIUM
        reason_lower = reason.lower()
        if "safety" in reason_lower or "emergency" in reason_lower:
            priority = TicketPriority.URGENT
            category = "Safety & Emergency"
        elif "payment" in reason_lower or "refund" in reason_lower or "fraud" in reason_lower:
            priority = TicketPriority.HIGH
            category = "Billing & Refund"
        elif "dispute" in reason_lower:
            priority = TicketPriority.HIGH
            category = "Customer Dispute"

        # Format transcript summary
        transcript_lines = []
        for msg in history[-6:]:
            sender = "User" if msg.get("role") == "user" else "AI Assistant"
            transcript_lines.append(f"{sender}: {msg.get('content')}")
        transcript_text = "\n".join(transcript_lines)

        full_description = (
            f"[SmartServe AI Support Escalation]\n"
            f"Escalation Reason: {reason}\n"
            f"User: {user.full_name} ({user.email}) | Role: {user.role.title()}\n"
            f"Related Booking: {booking_id or 'None'}\n\n"
            f"Issue Summary:\n{issue_summary}\n\n"
            f"Recent Conversation Transcript:\n{transcript_text}"
        )

        ticket = SupportTicket(
            id=ticket_id,
            customer_id=customer_id,
            provider_id=provider_id,
            booking_id=b_uuid,
            subject=f"AI Support Escalation: {issue_summary[:80]}",
            description=full_description,
            category=category,
            priority=priority.value if hasattr(priority, "value") else str(priority),
            status=TicketStatus.OPEN.value if hasattr(TicketStatus.OPEN, "value") else "Open",
            escalated_to_admin=True,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )
        db.add(ticket)

        # Log conversation messages to ticket_messages table
        for msg in history[-4:]:
            role = msg.get("role")
            content = msg.get("content", "")
            if not content:
                continue

            if role == "user":
                sender_id = user.id
                sender_role = user.role
                sender_name = user.full_name
            else:
                sender_id = ai_user.id
                sender_role = "ai_agent"
                sender_name = "SmartServe AI Assistant"

            ticket_msg = TicketMessage(
                id=uuid.uuid4(),
                ticket_id=ticket_id,
                sender_id=sender_id,
                sender_role=sender_role,
                sender_name=sender_name,
                message_text=content,
                created_at=datetime.now(timezone.utc),
            )
            db.add(ticket_msg)

        db.commit()
        db.refresh(ticket)

        # Broadcast via Kafka/WS to Admin realtime feed if configured
        try:
            from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
            msg_event = KafkaEvent(
                event_type=KafkaTopics.SUPPORT_MESSAGE,
                ticket_id=str(ticket.id),
                booking_id=str(ticket.booking_id) if ticket.booking_id else None,
                sender_id=str(user.id),
                payload={
                    "ticket_id": str(ticket.id),
                    "booking_id": str(ticket.booking_id) if ticket.booking_id else None,
                    "sender_id": str(user.id),
                    "sender_role": user.role,
                    "sender_name": user.full_name,
                    "subject": ticket.subject,
                    "message_text": ticket.description,
                    "created_at": ticket.created_at.isoformat(),
                    "escalated_to_admin": True,
                },
            )
            kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, msg_event)
        except Exception:
            pass

        return ticket

    def generate_grounded_answer(
        self, user_message: str, context: Dict[str, Any]
    ) -> Optional[str]:
        """
        High-precision rule-based grounding for standard SmartServe FAQ questions.
        Guarantees instant, accurate responses even if the external LLM is slow or throttled.
        """
        msg_lower = user_message.lower().strip()
        role = context.get("role", "customer")
        active_b = context.get("active_booking")

        # 1. Customer: "Where is my provider?" or "booking status"
        if role == "customer" and any(k in msg_lower for k in ["where is my provider", "provider status", "arrival", "booking status", "track provider", "when will provider arrive"]):
            if active_b:
                return (
                    f"Your booking #{active_b['reference']} for {active_b['service_name']} is currently **{active_b['status']}**. "
                    f"Assigned Partner: **{active_b['provider_name']}**. "
                    f"Scheduled for: {active_b['scheduled_time']} at {active_b['address']}. "
                    f"You can view live status tracking on your Booking Detail page."
                )
            else:
                return (
                    "You do not have an active ongoing booking right now. "
                    "You can view your completed or past bookings in the Bookings section."
                )

        # 2. Provider: "What booking do I have next?" or "booking status"
        if role == "provider" and any(k in msg_lower for k in ["next booking", "what booking do i have", "next job", "upcoming booking", "my schedule"]):
            if active_b:
                return (
                    f"Your next scheduled job is #{active_b['reference']} for **{active_b['service_name']}** "
                    f"(Status: **{active_b['status']}**). "
                    f"Customer: {active_b['customer_name']} at {active_b['address']}. "
                    f"Scheduled time: {active_b['scheduled_time']}. Payout: {active_b['total_price']}."
                )
            else:
                return (
                    "You have no upcoming jobs assigned at the moment. "
                    "Make sure your availability slots are set to Free in the Availability section."
                )

        # 3. Cancellation Policy Guidance
        if any(k in msg_lower for k in ["cancellation policy", "cancel booking", "cancellation charges", "can i cancel"]):
            if role == "customer":
                return (
                    "SmartServe Cancellation Policy:\n"
                    "• **Free cancellation** is available at any time before the service provider departs ('On The Way').\n"
                    "• If the partner has already departed or arrived at your location, cancellation may incur a standard dispatch fee.\n"
                    "• To cancel, open your Booking Details and click **Cancel Booking**."
                )
            else:
                return (
                    "Provider Cancellation Guidance:\n"
                    "• If you cannot fulfill an accepted job, please reject or cancel it promptly with a clear reason so the customer can be rematched.\n"
                    "• Frequent late cancellations may negatively affect your reliability score."
                )

        # 4. Rescheduling Guidance
        if any(k in msg_lower for k in ["reschedule", "change time", "postpone"]):
            return (
                "You can reschedule an active booking before the technician departs:\n"
                "1. Go to your Bookings tab.\n"
                "2. Select the booking and choose an alternate available date/time slot.\n"
                "3. If the technician is already on the way, please contact Admin Support."
            )

        # 5. Service Start OTP Guidance
        if any(k in msg_lower for k in ["otp", "start code", "verification code", "start otp"]):
            if role == "customer":
                return (
                    "For your safety, SmartServe uses a 4-digit Service Start OTP. "
                    "When your verified provider arrives at your home, share this 4-digit code shown on your Booking Detail screen to begin the service."
                )
            else:
                return (
                    "Upon arriving at the customer's location, ask the customer for their 4-digit Start OTP "
                    "and enter it on your job card to officially mark the job as 'Started'."
                )

        # 6. Payment & Billing Guidance
        if any(k in msg_lower for k in ["payment methods", "how to pay", "cash on delivery", "cod", "upi"]):
            return (
                "SmartServe supports online payments via UPI, Credit/Debit cards, and Net Banking, as well as Cash on Delivery (COD). "
                "For completed bookings, you can download your official tax invoice directly from the booking detail screen."
            )

        # 7. Slot & Availability Guidance (Provider)
        if role == "provider" and any(k in msg_lower for k in ["slot", "availability", "schedule", "working hours"]):
            return (
                "To manage your work availability:\n"
                "1. Open the **Availability** tab from your sidebar.\n"
                "2. Click any date to add or edit slots (Free, Booked, or Unavailable).\n"
                "3. Setting slots ensures customers can only book during your preferred hours."
            )

        return None

    def process_chat(
        self,
        db: Session,
        user: AuthUser,
        user_message: str,
        history: List[Dict[str, str]],
        booking_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Main entry point for handling customer or provider AI chat queries.
        Enforces interaction limit, RBAC, domain restriction, and automatic escalation.
        """
        # Count user turns in the current history session
        user_turns = sum(1 for m in history if m.get("role") == "user") + 1

        # 1. Check escalation triggers
        should_escalate, esc_key, esc_reason = self.check_escalation_triggers(
            user_message, user_turns
        )

        if should_escalate:
            # Build conversation history including the latest message
            full_history = list(history) + [{"role": "user", "content": user_message}]

            # Create ticket in existing support system
            ticket = self.create_support_ticket(
                db=db,
                user=user,
                reason=esc_reason or "Escalation requested",
                issue_summary=user_message[:100],
                history=full_history,
                booking_id=booking_id,
            )

            ticket_ref = f"TKT-{str(ticket.id)[:8].upper()}"

            if esc_key == "interaction_limit_reached":
                response_text = (
                    f"Looks like this needs help from our support team. I've sent your issue to SmartServe Admin Support "
                    f"(Reference #{ticket_ref})."
                )
            else:
                response_text = (
                    f"Looks like this needs help from our support team. I've sent your issue to SmartServe Admin Support "
                    f"(Reference #{ticket_ref})."
                )

            return {
                "response": response_text,
                "escalated": True,
                "escalation_reason": esc_reason,
                "ticket_id": str(ticket.id),
                "ticket_reference": ticket_ref,
                "message_count": user_turns,
                "max_messages": self.max_messages,
                "status": "escalated",
            }

        # 2. Retrieve authorized context
        context = self.get_authorized_context(db, user, booking_id)

        # 3. Check for high-precision grounded domain response
        grounded_reply = self.generate_grounded_answer(user_message, context)
        if grounded_reply:
            return {
                "response": grounded_reply,
                "escalated": False,
                "escalation_reason": None,
                "ticket_id": None,
                "ticket_reference": None,
                "message_count": user_turns,
                "max_messages": self.max_messages,
                "status": "success",
            }

        # 4. Formulate contextual LLM prompt
        role_label = "Customer" if user.role == "customer" else "Service Provider Partner"
        active_b_text = (
            f"Active Booking: #{context['active_booking']['reference']} ({context['active_booking']['service_name']}, Status: {context['active_booking']['status']}, Partner: {context['active_booking']['provider_name']})"
            if context.get("active_booking")
            else "No active booking in context"
        )

        system_instruction = (
            f"You are the official SmartServe AI Support Assistant for a verified {role_label}.\n"
            f"User Name: {user.full_name}\n"
            f"Context Data:\n{active_b_text}\n\n"
            f"Approved SmartServe Knowledge:\n{SMARTSERVE_APPROVED_KNOWLEDGE}\n\n"
            f"RESPONSE RULES:\n"
            f"1. Be concise, polite, and directly address SmartServe support questions.\n"
            f"2. Use only real SmartServe information. Never invent prices, dates, discounts, or policies.\n"
            f"3. Never claim you performed an action (e.g. 'I cancelled your booking'). Guide the user to the correct button.\n"
            f"4. If the question is outside SmartServe home services, or if you cannot confidently answer, output '[ESCALATE: Question outside supported SmartServe knowledge]'.\n"
            f"5. Keep responses under 3-4 sentences."
        )

        prompt_messages = [{"role": "system", "content": system_instruction}]
        for m in history[-4:]:
            prompt_messages.append({"role": m.get("role", "user"), "content": m.get("content", "")})
        prompt_messages.append({"role": "user", "content": user_message})

        # 5. Call LLM
        success, llm_reply = self.call_llm(prompt_messages)

        if success and llm_reply:
            # Check if LLM requested escalation
            if "[ESCALATE" in llm_reply:
                full_history = list(history) + [{"role": "user", "content": user_message}]
                ticket = self.create_support_ticket(
                    db=db,
                    user=user,
                    reason="AI unable to confidently resolve issue",
                    issue_summary=user_message[:100],
                    history=full_history,
                    booking_id=booking_id,
                )
                ticket_ref = f"TKT-{str(ticket.id)[:8].upper()}"
                return {
                    "response": f"Your issue has been sent to SmartServe Admin Support (Reference #{ticket_ref}). Our team will review and assist you shortly.",
                    "escalated": True,
                    "escalation_reason": "AI unable to confidently resolve issue",
                    "ticket_id": str(ticket.id),
                    "ticket_reference": ticket_ref,
                    "message_count": user_turns,
                    "max_messages": self.max_messages,
                    "status": "escalated",
                }

            return {
                "response": llm_reply,
                "escalated": False,
                "escalation_reason": None,
                "ticket_id": None,
                "ticket_reference": None,
                "message_count": user_turns,
                "max_messages": self.max_messages,
                "status": "success",
            }

        # 6. Fallback if AI provider is unavailable
        return {
            "response": "AI Support is temporarily unavailable. Would you like to contact Admin Support?",
            "escalated": False,
            "escalation_reason": "AI service offline",
            "ticket_id": None,
            "ticket_reference": None,
            "message_count": user_turns,
            "max_messages": self.max_messages,
            "status": "unavailable",
        }


ai_support_service = AISupportService()
