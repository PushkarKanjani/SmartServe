import uuid
from typing import List, Optional
from decimal import Decimal
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import AuthUser, require_provider
from app.models.customer import Booking
from app.services.provider.provider_service import ProviderServiceDomain
from app.services.booking.state_machine import transition_booking_status
from app.schemas.provider import (
    ProviderProfileResponse,
    ProviderProfileUpdate,
    ProviderServiceCreate,
    ProviderServiceUpdate,
    ProviderServiceResponse,
    AvailabilityCreate,
    AvailabilityUpdate,
    AvailabilityResponse,
    CertificateCreate,
    CertificateResponse,
    ProviderBookingResponse,
    ProviderServiceCatalogResponse,
    ProviderDashboardStatsResponse,
    ProviderProfileTrustResponse,
    ProviderStatusResponse,
    ProviderResubmitRequest,
    BookingStatusUpdatePayload,
    BookingRejectPayload,
    BookingCompletePayload,
    ProviderTicketCreateRequest,
)
from app.schemas.support import (
    SupportTicketResponse,
    TicketReplyRequest,
    TicketMessageResponse,
)

router = APIRouter(tags=["Providers & Verification"])


def get_service_domain(db: Session = Depends(get_db)) -> ProviderServiceDomain:
    return ProviderServiceDomain(db)


# ==========================================
# PROVIDER PROFILE ENDPOINTS
# ==========================================

@router.get(
    "/providers/me",
    response_model=ProviderProfileResponse,
    summary="Get current authenticated provider profile",
)
def get_my_provider_profile(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_my_profile(current_user)


@router.patch(
    "/providers/me",
    response_model=ProviderProfileResponse,
    summary="Update current authenticated provider profile",
)
def update_my_provider_profile(
    update_data: ProviderProfileUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_my_profile(current_user, update_data)


@router.get(
    "/providers/me/profile-trust",
    response_model=ProviderProfileTrustResponse,
    summary="Get verified trust signals and stats for current provider",
)
def get_my_profile_trust(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_profile_trust(current_user)


@router.get(
    "/providers/me/status",
    response_model=ProviderStatusResponse,
    summary="Get current provider's application verification status (accessible while Pending)",
)
def get_my_verification_status(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    """
    Returns the provider's verification status, document breakdown, and rejection reason.
    This endpoint does NOT require is_verified=True — any authenticated provider can call it.
    Used by the Application Status page after onboarding submission.
    """
    return service.get_my_status(current_user)


@router.post(
    "/providers/me/resubmit",
    response_model=ProviderStatusResponse,
    summary="Re-submit application with updated documents after admin requested changes",
)
def resubmit_my_application(
    payload: ProviderResubmitRequest,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    """
    Called by the provider when Admin requests document corrections or additional documents.
    Resets verification status to 'Pending' so Admin can review again.
    """
    return service.resubmit_application(current_user, payload)


@router.get(
    "/providers/{provider_id}",
    response_model=ProviderProfileResponse,
    summary="Get provider profile with strict ownership check",
)
def get_provider_profile(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_provider_profile(current_user, provider_id)


# ==========================================
# PROVIDER SERVICES ENDPOINTS
# ==========================================

@router.get(
    "/providers/me/services",
    response_model=List[ProviderServiceCatalogResponse],
    summary="List customized services offered by current authenticated provider joined with master catalog",
)
def list_my_provider_services(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_my_services_catalog(current_user)


@router.post(
    "/providers/me/services",
    response_model=ProviderServiceResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a service offering to current provider profile",
)
def create_provider_service_offering(
    data: ProviderServiceCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.add_provider_service(current_user, data)


@router.patch(
    "/providers/me/services/{id}",
    response_model=ProviderServiceResponse,
    summary="Update customized pricing or active status of a service offering",
)
def update_provider_service_offering(
    id: uuid.UUID,
    data: ProviderServiceUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_provider_service(current_user, id, data)


@router.delete(
    "/providers/me/services/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a service offering from current provider profile",
)
def delete_provider_service_offering(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_provider_service(current_user, id)
    return None


@router.get(
    "/providers/{provider_id}/services",
    response_model=List[ProviderServiceResponse],
    summary="List customized services offered by a provider with ownership check",
)
def list_provider_services(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_provider_services(current_user, provider_id)


# ==========================================
# AVAILABILITY SCHEDULE ENDPOINTS
# ==========================================

@router.get(
    "/providers/me/availability",
    response_model=List[AvailabilityResponse],
    summary="View active available timeslots for current provider",
)
def get_my_availability(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_availability(current_user, current_user.id)


@router.post(
    "/providers/me/availability",
    response_model=AvailabilityResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Publish a new available timeslot",
)
def add_availability_slot(
    data: AvailabilityCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.add_availability_slot(current_user, data)


@router.patch(
    "/providers/me/availability/{id}",
    response_model=AvailabilityResponse,
    summary="Update an existing timeslot (status or hours) with conflict checks",
)
def update_availability_slot(
    id: uuid.UUID,
    data: AvailabilityUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_availability_slot(current_user, id, data)


@router.get(
    "/providers/{provider_id}/availability",
    response_model=List[AvailabilityResponse],
    summary="View active available timeslots for a provider with ownership check",
)
def get_provider_availability(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_availability(current_user, provider_id)


@router.delete(
    "/providers/me/availability/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an available timeslot",
)
def delete_availability_slot(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_availability_slot(current_user, id)
    return None


# ==========================================
# CERTIFICATES & VERIFICATION ENDPOINTS
# ==========================================

@router.post(
    "/certificates",
    response_model=CertificateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload certificate metadata for admin verification review",
)
def upload_certificate(
    data: CertificateCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.upload_certificate(current_user, data)


@router.get(
    "/certificates",
    response_model=List[CertificateResponse],
    summary="List all uploaded certificates and verification statuses for current provider",
)
def list_my_certificates(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_my_certificates(current_user)


@router.get(
    "/certificates/{id}",
    response_model=CertificateResponse,
    summary="Get a certificate by ID with strict ownership check",
)
def get_certificate_by_id(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_certificate_by_id(current_user, id)


@router.delete(
    "/certificates/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a certificate with strict ownership check",
)
def delete_certificate(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_certificate(current_user, id)
    return None


# ==========================================
# PROVIDER BOOKINGS & ASSIGNED JOBS
# ==========================================

@router.get(
    "/providers/me/dashboard-stats",
    response_model=ProviderDashboardStatsResponse,
    summary="Get aggregated live dashboard metrics for current provider",
)
def get_my_dashboard_stats(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_dashboard_stats(current_user)


@router.get(
    "/providers/me/bookings",
    response_model=List[ProviderBookingResponse],
    summary="List all customer bookings assigned to current authenticated provider",
)
def get_my_assigned_bookings(
    status_filter: Optional[str] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    query = db.query(Booking).filter(Booking.provider_id == current_user.id)
    if status_filter and status_filter.upper() != "ALL":
        query = query.filter(Booking.status.ilike(f"%{status_filter}%"))
    bookings = query.order_by(Booking.created_at.desc()).all()
    results = []
    for b in bookings:
        results.append(
            ProviderBookingResponse(
                id=b.id,
                booking_reference=b.booking_reference,
                customer_id=b.customer_id,
                customer_name=b.customer.full_name if b.customer else "Customer",
                customer_phone=b.customer.phone if b.customer else None,
                service_id=b.service_id,
                service_name=b.service_name,
                category=b.category,
                status=str(b.status.value if hasattr(b.status, "value") else b.status),
                payment_status=str(b.payment_status or "Pending"),
                scheduled_time=b.scheduled_time,
                scheduled_date=b.scheduled_date,
                address=b.address or "",
                total_price=Decimal(str(b.total_price or "0.00")),
                otp_code=b.otp_code,
                emergency_flag=b.emergency_flag,
                timeline=b.timeline,
                created_at=b.created_at,
            )
        )
    return results


@router.get(
    "/providers/me/bookings/{booking_id}",
    response_model=ProviderBookingResponse,
    summary="Get single assigned booking by ID with ownership check",
)
def get_my_assigned_booking_detail(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    b = db.query(Booking).filter(Booking.id == booking_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Booking not found")
    if b.provider_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: You cannot access bookings assigned to another provider",
        )
    return ProviderBookingResponse(
        id=b.id,
        booking_reference=b.booking_reference,
        customer_id=b.customer_id,
        customer_name=b.customer.full_name if b.customer else "Customer",
        customer_phone=b.customer.phone if b.customer else None,
        service_id=b.service_id,
        service_name=b.service_name,
        category=b.category,
        status=str(b.status.value if hasattr(b.status, "value") else b.status),
        payment_status=str(b.payment_status or "Pending"),
        scheduled_time=b.scheduled_time,
        scheduled_date=b.scheduled_date,
        address=b.address or "",
        total_price=Decimal(str(b.total_price or "0.00")),
        otp_code=b.otp_code,
        emergency_flag=b.emergency_flag,
        timeline=b.timeline,
        created_at=b.created_at,
    )


def _serialize_booking_response(b: Booking) -> ProviderBookingResponse:
    return ProviderBookingResponse(
        id=b.id,
        booking_reference=b.booking_reference,
        customer_id=b.customer_id,
        customer_name=b.customer.full_name if b.customer else "Customer",
        customer_phone=b.customer.phone if b.customer else None,
        service_id=b.service_id,
        service_name=b.service_name,
        category=b.category,
        status=str(b.status.value if hasattr(b.status, "value") else b.status),
        payment_status=str(b.payment_status or "Pending"),
        scheduled_time=b.scheduled_time,
        scheduled_date=b.scheduled_date,
        address=b.address or "",
        total_price=Decimal(str(b.total_price or "0.00")),
        otp_code=b.otp_code,
        emergency_flag=b.emergency_flag,
        timeline=b.timeline,
        created_at=b.created_at,
    )


@router.post(
    "/providers/me/bookings/{booking_id}/accept",
    response_model=ProviderBookingResponse,
    summary="Accept an incoming requested booking",
)
def accept_booking(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Accepted",
        user=current_user,
    )

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        cust_id = str(updated.customer_id) if updated.customer_id else None
        cust_user_id = str(updated.customer.user_id) if updated.customer and hasattr(updated.customer, 'user_id') else None
        accepted_event = KafkaEvent(
            event_type=KafkaTopics.BOOKING_ACCEPTED,
            booking_id=str(updated.id),
            sender_id=str(current_user.id),
            receiver_id=cust_id,
            payload={
                "booking_id": str(updated.id),
                "booking_reference": updated.booking_reference,
                "customer_id": cust_id,
                "customer_user_id": cust_user_id,
                "customer_name": updated.customer.full_name if updated.customer else "Customer",
                "provider_id": str(current_user.id),
                "provider_name": current_user.full_name,
                "service_name": updated.service_name,
                "status": "Accepted",
                "total_price": float(updated.total_price or 0.0),
                "scheduled_date": updated.scheduled_date,
                "scheduled_time": updated.scheduled_time.strftime("%H:%M:%S") if hasattr(updated.scheduled_time, "strftime") else str(updated.scheduled_time),
            }
        )
        kafka_producer.publish_event(KafkaTopics.BOOKING_ACCEPTED, accepted_event)
    except Exception as exc:
        print(f"[Provider Accept Booking Kafka Error] {exc}")

    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/reject",
    response_model=ProviderBookingResponse,
    summary="Reject an incoming requested booking with optional reason",
)
def reject_booking(
    booking_id: uuid.UUID,
    payload: Optional[BookingRejectPayload] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    if not payload or not payload.reason or not payload.reason.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rejection reason is required when declining a booking request.",
        )
    reason = payload.reason.strip()
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Rejected",
        user=current_user,
        reason=reason,
    )

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        cust_id = str(updated.customer_id) if updated.customer_id else None
        cust_user_id = str(updated.customer.user_id) if updated.customer and hasattr(updated.customer, 'user_id') else None
        rejected_event = KafkaEvent(
            event_type=KafkaTopics.BOOKING_REJECTED,
            booking_id=str(updated.id),
            sender_id=str(current_user.id),
            receiver_id=cust_id,
            payload={
                "booking_id": str(updated.id),
                "booking_reference": updated.booking_reference,
                "customer_id": cust_id,
                "customer_user_id": cust_user_id,
                "customer_name": updated.customer.full_name if updated.customer else "Customer",
                "provider_id": str(current_user.id),
                "provider_name": current_user.full_name,
                "service_name": updated.service_name,
                "status": "Rejected",
                "reason": reason,
                "rejection_reason": reason,
                "cancellation_reason": reason,
                "total_price": float(updated.total_price or 0.0),
                "scheduled_date": updated.scheduled_date,
            }
        )
        kafka_producer.publish_event(KafkaTopics.BOOKING_REJECTED, rejected_event)
    except Exception as exc:
        print(f"[Provider Reject Booking Kafka Error] {exc}")

    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/start",
    response_model=ProviderBookingResponse,
    summary="Mark an accepted booking as Started (service delivery initiated)",
)
def start_booking(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Started",
        user=current_user,
    )
    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/complete",
    response_model=ProviderBookingResponse,
    summary="Complete a job in progress with optional customer OTP verification",
)
def complete_booking(
    booking_id: uuid.UUID,
    payload: Optional[BookingCompletePayload] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    otp = payload.otp_code if payload else None
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Completed",
        user=current_user,
        otp_code=otp,
    )
    return _serialize_booking_response(updated)


@router.patch(
    "/providers/me/bookings/{booking_id}/status",
    response_model=ProviderBookingResponse,
    summary="Generic state machine transition endpoint for provider booking",
)
def update_booking_status(
    booking_id: uuid.UUID,
    payload: BookingStatusUpdatePayload,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status=payload.status,
        user=current_user,
        reason=payload.reason,
        otp_code=payload.otp_code,
    )
    return _serialize_booking_response(updated)


# ==========================================
# SUPPORT TICKETS
# ==========================================

def _serialize_ticket_response(t) -> SupportTicketResponse:
    from app.schemas.support import TicketMessageResponse
    msgs = [
        TicketMessageResponse(
            id=str(m.id),
            sender_id=str(m.sender_id),
            sender_role=m.sender_role,
            sender_name=getattr(m, "sender_name", None) or (m.sender_role.title() if m.sender_role else "User"),
            message_text=m.message_text,
            attachment_url=m.attachment_url,
            created_at=m.created_at.isoformat() if m.created_at else ""
        ) for m in getattr(t, "messages", [])
    ]
    msgs.sort(key=lambda m: m.created_at)
    
    # Resolve accurate customer name
    c_name = "Customer"
    if getattr(t, "customer", None) and getattr(t.customer, "full_name", None):
        c_name = t.customer.full_name
    elif not getattr(t, "customer_id", None) and getattr(t, "provider_id", None):
        c_name = "Provider"

    return SupportTicketResponse(
        id=str(t.id),
        customer_id=str(t.customer_id) if getattr(t, "customer_id", None) else None,
        provider_id=str(t.provider_id) if getattr(t, "provider_id", None) else None,
        customer_name=c_name,
        subject=t.subject,
        description=t.description,
        category=getattr(t, "category", None),
        priority=t.priority.value if hasattr(t.priority, "value") else str(t.priority),
        status=t.status.value if hasattr(t.status, "value") else str(t.status),
        escalated_to_admin=t.escalated_to_admin,
        booking_id=str(t.booking_id) if t.booking_id else None,
        image_evidence_url=t.image_evidence_url,
        created_at=t.created_at.isoformat() if t.created_at else "",
        updated_at=t.updated_at.isoformat() if t.updated_at else "",
        messages=msgs
    )


@router.post(
    "/providers/me/tickets",
    response_model=SupportTicketResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a support ticket as a provider",
)
def create_my_ticket(
    data: ProviderTicketCreateRequest,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    ticket = service.create_support_ticket(current_user, data)

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        msg_event = KafkaEvent(
            event_type=KafkaTopics.SUPPORT_MESSAGE,
            ticket_id=str(ticket.id),
            booking_id=str(ticket.booking_id) if ticket.booking_id else None,
            sender_id=str(current_user.id),
            payload={
                "ticket_id": str(ticket.id),
                "booking_id": str(ticket.booking_id) if ticket.booking_id else None,
                "sender_id": str(current_user.id),
                "sender_role": "provider",
                "sender_name": current_user.full_name,
                "subject": ticket.subject,
                "message_text": ticket.description or ticket.subject,
                "created_at": ticket.created_at.isoformat() if hasattr(ticket.created_at, "isoformat") else str(ticket.created_at),
            }
        )
        kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, msg_event)
    except Exception as exc:
        print(f"[Provider Create Ticket Kafka Error] {exc}")

    return _serialize_ticket_response(ticket)


@router.get(
    "/providers/me/tickets",
    response_model=List[SupportTicketResponse],
    summary="List all support tickets created by the current provider",
)
def list_my_tickets(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    tickets = service.list_my_tickets(current_user)
    return [_serialize_ticket_response(t) for t in tickets]


@router.get(
    "/providers/me/tickets/{ticket_id}",
    response_model=SupportTicketResponse,
    summary="Get single support ticket with messages",
)
def get_my_ticket(
    ticket_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    ticket = service.get_my_ticket(current_user, ticket_id)
    return _serialize_ticket_response(ticket)


@router.post(
    "/providers/me/tickets/{ticket_id}/reply",
    response_model=TicketMessageResponse,
    summary="Reply to an existing support ticket",
)
def reply_my_ticket(
    ticket_id: uuid.UUID,
    payload: TicketReplyRequest,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    ticket = service.get_my_ticket(current_user, ticket_id)
    msg = service.reply_to_ticket(current_user, ticket_id, payload.message_text, payload.attachment_url)

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        target_receiver = str(ticket.customer_id) if hasattr(ticket, 'customer_id') and ticket.customer_id else None
        cust_user_id = str(ticket.customer.user_id) if hasattr(ticket, 'customer') and ticket.customer and hasattr(ticket.customer, 'user_id') else None
        b_id = str(ticket.booking_id) if hasattr(ticket, 'booking_id') and ticket.booking_id else None
        msg_event = KafkaEvent(
            event_type=KafkaTopics.SUPPORT_MESSAGE,
            ticket_id=str(ticket_id),
            booking_id=b_id,
            sender_id=str(current_user.id),
            receiver_id=target_receiver,
            payload={
                "ticket_id": str(ticket_id),
                "booking_id": b_id,
                "message_id": str(msg.id),
                "sender_id": str(current_user.id),
                "sender_role": "provider",
                "sender_name": current_user.full_name,
                "receiver_id": target_receiver,
                "customer_id": target_receiver,
                "customer_user_id": cust_user_id,
                "message_text": msg.message_text,
                "attachment_url": msg.attachment_url,
                "created_at": msg.created_at.isoformat() if hasattr(msg.created_at, "isoformat") else str(msg.created_at),
            }
        )
        kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, msg_event)
    except Exception as exc:
        print(f"[Provider Ticket Reply Kafka Error] {exc}")

    return TicketMessageResponse(
        id=str(msg.id),
        sender_id=str(msg.sender_id),
        sender_role=msg.sender_role,
        sender_name=getattr(msg, "sender_name", None) or current_user.full_name,
        message_text=msg.message_text,
        attachment_url=msg.attachment_url,
        created_at=msg.created_at.isoformat() if msg.created_at else ""
    )


# ==========================================
# BOOKING CHAT (Provider ↔ Customer)
# ==========================================

@router.get(
    "/providers/me/bookings/{booking_id}/chat",
    response_model=SupportTicketResponse,
    summary="Get or create the Customer ↔ Provider chat thread for a booking",
)
def get_my_booking_chat(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    """Provider retrieves the chat thread for a specific booking they're assigned to."""
    from app.models.customer import SupportTicket, TicketMessage
    from datetime import datetime

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden: You cannot access chats for bookings not assigned to you")
    if not booking.customer_id:
        raise HTTPException(status_code=400, detail="No customer linked to this booking")

    ticket = db.query(SupportTicket).filter(
        SupportTicket.booking_id == booking_id,
        SupportTicket.provider_id == current_user.id,
        SupportTicket.customer_id == booking.customer_id,
    ).first()

    if not ticket:
        ticket = SupportTicket(
            id=uuid.uuid4(),
            customer_id=booking.customer_id,
            provider_id=current_user.id,
            booking_id=booking_id,
            subject=f"Chat: {booking.service_name} (Booking {booking.booking_reference})",
            description=f"Booking chat thread between customer and provider for {booking.service_name}.",
            category="Booking Chat",
            priority="Normal",
            status="Open",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(ticket)
        db.commit()
        db.refresh(ticket)

    return _serialize_ticket_response(ticket)


@router.post(
    "/providers/me/bookings/{booking_id}/chat/messages",
    response_model=TicketMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Provider sends a message in the Customer ↔ Provider booking chat",
)
def send_my_booking_chat_message(
    booking_id: uuid.UUID,
    payload: TicketReplyRequest,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    """Provider sends a message to the customer in a booking chat thread."""
    from app.models.customer import SupportTicket, TicketMessage
    from app.models.user import User
    from datetime import datetime

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden: You cannot send messages in chats for bookings not assigned to you")
    if not booking.customer_id:
        raise HTTPException(status_code=400, detail="No customer linked to this booking")

    ticket = db.query(SupportTicket).filter(
        SupportTicket.booking_id == booking_id,
        SupportTicket.provider_id == current_user.id,
        SupportTicket.customer_id == booking.customer_id,
    ).first()

    if not ticket:
        ticket = SupportTicket(
            id=uuid.uuid4(),
            customer_id=booking.customer_id,
            provider_id=current_user.id,
            booking_id=booking_id,
            subject=f"Chat: {booking.service_name} (Booking {booking.booking_reference})",
            description=f"Booking chat thread between customer and provider for {booking.service_name}.",
            category="Booking Chat",
            priority="Normal",
            status="Open",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(ticket)
        db.flush()

    msg = TicketMessage(
        id=uuid.uuid4(),
        ticket_id=ticket.id,
        sender_id=current_user.id,
        sender_role="provider",
        sender_name=current_user.full_name,
        message_text=payload.message_text,
        attachment_url=payload.attachment_url,
        created_at=datetime.utcnow(),
    )
    db.add(msg)
    ticket.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(msg)

    try:
        from app.services.kafka import kafka_producer, KafkaTopics, KafkaEvent
        cust_id = str(booking.customer_id) if booking.customer_id else None
        cust_user_id = str(booking.customer.user_id) if booking.customer and hasattr(booking.customer, 'user_id') else None
        chat_event = KafkaEvent(
            event_type=KafkaTopics.SUPPORT_MESSAGE,
            ticket_id=str(ticket.id),
            booking_id=str(booking_id),
            sender_id=str(current_user.id),
            receiver_id=cust_id,
            payload={
                "ticket_id": str(ticket.id),
                "booking_id": str(booking_id),
                "message_id": str(msg.id),
                "sender_id": str(current_user.id),
                "sender_role": "provider",
                "sender_name": current_user.full_name,
                "receiver_id": cust_id,
                "customer_id": cust_id,
                "customer_user_id": cust_user_id,
                "message_text": msg.message_text,
                "attachment_url": msg.attachment_url,
                "category": "Booking Chat",
                "created_at": msg.created_at.isoformat() if hasattr(msg.created_at, "isoformat") else str(msg.created_at),
            }
        )
        kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, chat_event)
    except Exception as exc:
        print(f"[Provider Booking Chat Kafka Error] {exc}")

    return TicketMessageResponse(
        id=str(msg.id),
        sender_id=str(msg.sender_id),
        sender_role=msg.sender_role,
        sender_name=msg.sender_name,
        message_text=msg.message_text,
        attachment_url=msg.attachment_url,
        created_at=msg.created_at.isoformat() if msg.created_at else "",
    )
