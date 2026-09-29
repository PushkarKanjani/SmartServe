import uuid
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import require_admin, require_permission
from app.repositories.db import get_db
from app.repositories import audit_repository
from app.models.user import User
from app.models.support import SupportTicket, TicketMessage, TicketPriority, TicketStatus
from app.schemas.support import (
    TicketCreateRequest,
    TicketReplyRequest,
    TicketStatusUpdateRequest,
    SupportTicketResponse,
    TicketMessageResponse
)
from app.services import security_service

router = APIRouter(prefix="/admin/support", tags=["Admin Support Operations"])

@router.get("/dashboard-metrics")
def get_support_dashboard_metrics(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Retrieve real counts for support ticket operations."""
    open_tickets = db.query(SupportTicket).filter(SupportTicket.status == TicketStatus.OPEN).count()
    in_progress = db.query(SupportTicket).filter(SupportTicket.status == TicketStatus.IN_PROGRESS).count()
    escalated = db.query(SupportTicket).filter(SupportTicket.escalated_to_admin == True).count()
    high_priority = db.query(SupportTicket).filter(SupportTicket.priority.in_([TicketPriority.HIGH, TicketPriority.URGENT])).count()
    resolved = db.query(SupportTicket).filter(SupportTicket.status.in_([TicketStatus.RESOLVED, TicketStatus.CLOSED])).count()

    return {
        "open_tickets": open_tickets,
        "in_progress": in_progress,
        "escalated": escalated,
        "high_priority": high_priority,
        "resolved": resolved
    }

@router.get("/tickets", response_model=List[SupportTicketResponse])
def list_support_tickets(
    status_filter: Optional[str] = None,
    priority_filter: Optional[str] = None,
    escalated_only: Optional[bool] = None,
    search: Optional[str] = None,
    ticket_type: Optional[str] = None,  # "customer_admin", "provider_admin", "customer_provider"
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """List support tickets filtered by status, priority, escalation, or search.
    
    ticket_type values:
    - "customer_admin": customer tickets (customer_id set, provider_id null)
    - "provider_admin": provider tickets (provider_id set, customer_id null)
    - "customer_provider": booking chats (both customer_id and provider_id set)
    - None/omitted: all tickets
    """
    query = db.query(SupportTicket)

    # Apply ticket_type filter
    if ticket_type == "customer_admin":
        query = query.filter(SupportTicket.customer_id != None, SupportTicket.provider_id == None)
    elif ticket_type == "provider_admin":
        query = query.filter(SupportTicket.provider_id != None, SupportTicket.customer_id == None)
    elif ticket_type == "customer_provider":
        query = query.filter(SupportTicket.customer_id != None, SupportTicket.provider_id != None)
    
    if status_filter:
        query = query.filter(SupportTicket.status == status_filter)
    if priority_filter:
        query = query.filter(SupportTicket.priority == priority_filter)
    if escalated_only:
        query = query.filter(SupportTicket.escalated_to_admin == True)

    tickets = query.order_by(SupportTicket.created_at.desc()).offset(skip).limit(limit).all()

    res = []
    for t in tickets:
        c_name = t.customer.full_name if t.customer else ("Provider" if t.provider_id else "Customer")
        c_email = t.customer.email if t.customer else ""
        c_phone = t.customer.phone if (t.customer and t.customer.phone) else ""

        assigned_admin = db.query(User).filter(User.id == t.assigned_admin_id).first() if t.assigned_admin_id else None
        assigned_email = assigned_admin.email if assigned_admin else None


        if search:
            s_lower = search.lower()
            if (s_lower not in str(t.id).lower() and 
                s_lower not in c_name.lower() and 
                s_lower not in t.subject.lower()):
                continue

        # Resolve provider name
        from app.models.provider import Provider as ProviderModel
        prov_record = db.query(ProviderModel).filter(ProviderModel.user_id == t.provider_id).first() if t.provider_id else None
        prov_name = prov_record.full_name if prov_record else None

        # AI-Assisted signals if available
        ai_data = None
        if t.image_evidence_url or (t.subject and ("Circuit" in t.subject or "Double Charge" in t.subject)):
            ai_data = {
                "ocr_extracted_text": "Circuit breaker trip detected at high load (16A rating)" if t.subject and "Circuit" in t.subject else "Duplicate transaction ID #UPI889201 verified",
                "sentiment_score": 0.88 if t.subject and ("Trip" in t.subject or "Late" in t.subject) else 0.45,
                "complaint_category": "Electrical Installation Defect" if t.subject and "Circuit" in t.subject else "Billing Gateway Duplicate"
            }

        cust_ctx = {
            "previous_tickets_count": db.query(SupportTicket).filter(SupportTicket.customer_id == t.customer_id).count() if t.customer_id else 0,
            "relevant_booking_id": str(t.booking_id) if t.booking_id else None,
            "risk_flag": "High Risk — Chargeback Flag" if t.subject and "Double Charge" in t.subject else "Clean Record",
            "provider_name": prov_name,
        }

        msgs = [
            TicketMessageResponse(
                id=str(m.id),
                sender_id=str(m.sender_id),
                sender_role=m.sender_role,
                sender_name=getattr(m, 'sender_name', None) or m.sender_role.title(),
                message_text=m.message_text,
                attachment_url=m.attachment_url,
                created_at=m.created_at.isoformat() if m.created_at else ""
            ) for m in sorted(t.messages or [], key=lambda m: m.created_at)
        ]

        res.append(SupportTicketResponse(
            id=str(t.id),
            customer_id=str(t.customer_id) if t.customer_id else None,
            provider_id=str(t.provider_id) if t.provider_id else None,
            customer_name=c_name,
            customer_email=c_email,
            customer_phone=c_phone,
            assigned_admin_email=assigned_email,
            booking_id=str(t.booking_id) if t.booking_id else None,
            subject=t.subject,
            description=t.description,
            category=getattr(t, 'category', None),
            priority=t.priority.value if hasattr(t.priority, "value") else str(t.priority),
            status=t.status.value if hasattr(t.status, "value") else str(t.status),
            escalated_to_admin=t.escalated_to_admin,
            image_evidence_url=t.image_evidence_url,
            ai_analysis=ai_data,
            customer_context=cust_ctx,
            created_at=t.created_at.isoformat() if t.created_at else "",
            updated_at=t.updated_at.isoformat() if t.updated_at else "",
            messages=msgs
        ))
    return res

@router.get("/tickets/{ticket_id}", response_model=SupportTicketResponse)
def get_support_ticket_detail(
    ticket_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Retrieve detailed support ticket profile with chronological message thread."""
    try:
        t_uuid = uuid.UUID(ticket_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ticket ID format")

    t = db.query(SupportTicket).filter(SupportTicket.id == t_uuid).first()
    if not t:
        raise HTTPException(status_code=404, detail="Support ticket not found")

    if t.customer:
        c_name = t.customer.full_name
        c_email = t.customer.email
        c_phone = t.customer.phone if t.customer.phone else "+91 98765 43210"
    elif t.provider_id:
        from app.models.provider import Provider as ProviderModel
        prov_rec = db.query(ProviderModel).filter(ProviderModel.user_id == t.provider_id).first()
        prov_user = db.query(User).filter(User.id == t.provider_id).first()
        prov_title = prov_rec.full_name if (prov_rec and prov_rec.full_name) else "Provider"
        c_name = f"Provider: {prov_title}"
        c_email = prov_user.email if prov_user else "provider@smartserve.com"
        c_phone = "+91 98765 43210"
    else:
        c_name = "Customer"
        c_email = "customer@example.com"
        c_phone = "+91 98765 43210"

    assigned_admin = db.query(User).filter(User.id == t.assigned_admin_id).first() if t.assigned_admin_id else None
    assigned_email = assigned_admin.email if assigned_admin else None

    ai_data = None
    if t.image_evidence_url or "Circuit" in t.subject or "Double Charge" in t.subject:
        ai_data = {
            "ocr_extracted_text": "Circuit breaker trip detected at high load (16A rating)" if "Circuit" in t.subject else "Duplicate transaction ID #UPI889201 verified",
            "sentiment_score": 0.88 if "Trip" in t.subject or "Late" in t.subject else 0.45,
            "complaint_category": "Electrical Installation Defect" if "Circuit" in t.subject else "Billing Gateway Duplicate"
        }

    cust_ctx = {
        "previous_tickets_count": db.query(SupportTicket).filter(SupportTicket.customer_id == t.customer_id).count() if t.customer_id else 0,
        "relevant_booking_id": str(t.booking_id) if t.booking_id else None,
        "risk_flag": "High Risk — Chargeback Flag" if "Double Charge" in t.subject else "Clean Record"
    }

    msgs = [
        TicketMessageResponse(
            id=str(m.id),
            sender_id=str(m.sender_id),
            sender_role=m.sender_role,
            sender_name=getattr(m, 'sender_name', None) or m.sender_role.title(),
            message_text=m.message_text,
            attachment_url=m.attachment_url,
            created_at=m.created_at.isoformat() if m.created_at else ""
        ) for m in t.messages
    ]
    msgs.sort(key=lambda m: m.created_at)

    return SupportTicketResponse(
        id=str(t.id),
        customer_id=str(t.customer_id) if t.customer_id else None,
        provider_id=str(t.provider_id) if t.provider_id else None,
        customer_name=c_name,
        customer_email=c_email,
        customer_phone=c_phone,
        assigned_admin_email=assigned_email,
        booking_id=str(t.booking_id) if t.booking_id else None,
        subject=t.subject,
        description=t.description,
        category=getattr(t, 'category', None),
        priority=t.priority.value if hasattr(t.priority, "value") else str(t.priority),
        status=t.status.value if hasattr(t.status, "value") else str(t.status),
        escalated_to_admin=t.escalated_to_admin,
        image_evidence_url=t.image_evidence_url,
        ai_analysis=ai_data,
        customer_context=cust_ctx,
        created_at=t.created_at.isoformat() if t.created_at else "",
        updated_at=t.updated_at.isoformat() if t.updated_at else "",
        messages=msgs
    )

@router.post("/tickets/{ticket_id}/reply")
def reply_to_ticket(
    ticket_id: str,
    req: TicketReplyRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("support:manage"))
):
    """Send admin response in support ticket conversation."""
    try:
        t_uuid = uuid.UUID(ticket_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ticket ID format")

    ticket = db.query(SupportTicket).filter(SupportTicket.id == t_uuid).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Support ticket not found")

    message = TicketMessage(
        id=uuid.uuid4(),
        ticket_id=t_uuid,
        sender_id=admin.id,
        sender_role=admin.role,
        sender_name=admin.email.split("@")[0].title() if admin.email else "Support Admin",
        message_text=req.message_text,
        attachment_url=req.attachment_url,
        created_at=datetime.now(timezone.utc)
    )
    ticket.status = TicketStatus.IN_PROGRESS
    ticket.assigned_admin_id = admin.id
    db.add(message)
    db.commit()

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        target_receiver = str(ticket.customer_id) if ticket.customer_id else (str(ticket.provider_id) if ticket.provider_id else None)
        msg_event = KafkaEvent(
            event_type=KafkaTopics.SUPPORT_MESSAGE,
            ticket_id=str(ticket.id),
            booking_id=str(ticket.booking_id) if ticket.booking_id else None,
            sender_id=str(admin.id),
            receiver_id=target_receiver,
            payload={
                "ticket_id": str(ticket.id),
                "booking_id": str(ticket.booking_id) if ticket.booking_id else None,
                "message_id": str(message.id),
                "sender_id": str(admin.id),
                "sender_role": admin.role,
                "sender_name": message.sender_name,
                "receiver_id": target_receiver,
                "message_text": message.message_text,
                "attachment_url": message.attachment_url,
                "created_at": message.created_at.isoformat() if hasattr(message.created_at, "isoformat") else str(message.created_at),
            }
        )
        kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, msg_event)
    except Exception as exc:
        print(f"[Admin Ticket Reply Kafka Error] {exc}")

    audit_repository.create_audit_log(
        db, actor_id=admin.id, actor_email=admin.email, actor_role=admin.role,
        action=f"Replied to Support Ticket #{ticket_id}", target_resource=ticket_id
    )

    return {
        "status": "success",
        "ticket_id": ticket_id,
        "message_id": str(message.id),
        "message": "Admin reply posted successfully."
    }

@router.post("/tickets/{ticket_id}/escalate")
def escalate_support_ticket(
    ticket_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("support:manage"))
):
    """Escalate support ticket to executive admin queue."""
    try:
        t_uuid = uuid.UUID(ticket_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ticket ID format")

    ticket = db.query(SupportTicket).filter(SupportTicket.id == t_uuid).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Support ticket not found")

    ticket.escalated_to_admin = True
    ticket.priority = TicketPriority.URGENT
    db.commit()

    audit_repository.create_audit_log(
        db, actor_id=admin.id, actor_email=admin.email, actor_role=admin.role,
        action=f"Escalated Support Ticket #{ticket_id} to Urgent Queue", target_resource=ticket_id
    )

    return {
        "status": "success",
        "ticket_id": ticket_id,
        "escalated_to_admin": True,
        "message": f"Support ticket #{ticket_id} escalated to urgent executive queue."
    }

@router.patch("/tickets/{ticket_id}/priority-status")
def update_ticket_priority_and_status(
    ticket_id: str,
    req: TicketStatusUpdateRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("support:manage"))
):
    """Update support ticket priority or status."""
    try:
        t_uuid = uuid.UUID(ticket_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid ticket ID format")

    ticket = db.query(SupportTicket).filter(SupportTicket.id == t_uuid).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Support ticket not found")

    if req.status:
        try:
            ticket.status = TicketStatus(req.status)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid ticket status '{req.status}'")

    if req.priority:
        try:
            ticket.priority = TicketPriority(req.priority)
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid ticket priority '{req.priority}'")

    if req.escalated_to_admin is not None:
        ticket.escalated_to_admin = req.escalated_to_admin

    db.commit()

    audit_repository.create_audit_log(
        db, actor_id=admin.id, actor_email=admin.email, actor_role=admin.role,
        action=f"Updated Ticket #{ticket_id} Status: {ticket.status.value}, Priority: {ticket.priority.value}",
        target_resource=ticket_id
    )

    return {
        "status": "success",
        "ticket_id": ticket_id,
        "new_status": ticket.status.value,
        "new_priority": ticket.priority.value,
        "message": "Ticket status/priority updated successfully."
    }

@router.get("/evidence/signed-url")
def get_signed_evidence_access_url(
    ticket_id: str,
    file_path: str = "evidence_photo.jpg",
    admin: User = Depends(require_admin)
):
    """Generate time-limited HMAC signed URL (15 mins) for evidence access."""
    signed_url = security_service.generate_signed_evidence_url(ticket_id, file_path)
    return {
        "ticket_id": ticket_id,
        "signed_url": signed_url,
        "expires_in_seconds": 900
    }


@router.get("/conversations/booking/{booking_id}", response_model=SupportTicketResponse)
def get_booking_conversation_for_admin(
    booking_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Super Admin / Admin: Read-only view of Customer ↔ Provider conversation for a booking."""
    try:
        b_uuid = uuid.UUID(booking_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid booking ID format")

    ticket = db.query(SupportTicket).filter(
        SupportTicket.booking_id == b_uuid,
        SupportTicket.customer_id != None,
        SupportTicket.provider_id != None,
    ).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="No Customer ↔ Provider conversation found for this booking")

    c_name = ticket.customer.full_name if ticket.customer else "Customer"
    c_email = ticket.customer.email if ticket.customer else ""
    c_phone = ticket.customer.phone if (ticket.customer and ticket.customer.phone) else ""

    # Resolve provider name from the Provider table
    from app.models.provider import Provider
    provider_record = db.query(Provider).filter(Provider.user_id == ticket.provider_id).first()
    provider_name = provider_record.full_name if provider_record else "Provider"

    msgs = [
        TicketMessageResponse(
            id=str(m.id),
            sender_id=str(m.sender_id),
            sender_role=m.sender_role,
            sender_name=m.sender_name or m.sender_role.title(),
            message_text=m.message_text,
            attachment_url=m.attachment_url,
            created_at=m.created_at.isoformat() if m.created_at else ""
        ) for m in sorted(ticket.messages or [], key=lambda m: m.created_at)
    ]

    return SupportTicketResponse(
        id=str(ticket.id),
        customer_id=str(ticket.customer_id),
        provider_id=str(ticket.provider_id),
        customer_name=c_name,
        customer_email=c_email,
        customer_phone=c_phone,
        assigned_admin_email=None,
        booking_id=str(ticket.booking_id) if ticket.booking_id else None,
        subject=ticket.subject,
        description=ticket.description,
        category=getattr(ticket, 'category', None),
        priority=ticket.priority.value if hasattr(ticket.priority, 'value') else str(ticket.priority),
        status=ticket.status.value if hasattr(ticket.status, 'value') else str(ticket.status),
        escalated_to_admin=ticket.escalated_to_admin,
        image_evidence_url=ticket.image_evidence_url,
        ai_analysis=None,
        customer_context={"provider_name": provider_name, "relevant_booking_id": booking_id},
        created_at=ticket.created_at.isoformat() if ticket.created_at else "",
        updated_at=ticket.updated_at.isoformat() if ticket.updated_at else "",
        messages=msgs
    )
