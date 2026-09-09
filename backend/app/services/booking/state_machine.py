import uuid
from typing import Optional, Dict, Any, List
from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.customer import Booking
from app.models.booking import BookingStatus, PaymentStatus
from app.core.dependencies import AuthUser

# Valid state transitions mapping: source_status -> set of allowed next_statuses
ALLOWED_TRANSITIONS: Dict[str, set] = {
    BookingStatus.REQUESTED.value: {
        BookingStatus.ACCEPTED.value,
        BookingStatus.REJECTED.value,
        BookingStatus.CANCELLED.value,
        BookingStatus.EXPIRED.value,
    },
    BookingStatus.ASSIGNED.value: {
        BookingStatus.ACCEPTED.value,
        BookingStatus.REJECTED.value,
        BookingStatus.CANCELLED.value,
        BookingStatus.EXPIRED.value,
    },
    BookingStatus.ACCEPTED.value: {
        BookingStatus.STARTED.value,
        BookingStatus.CANCELLED.value,
    },
    BookingStatus.STARTED.value: {
        BookingStatus.COMPLETED.value,
        BookingStatus.PAID.value,
    },
    # Terminal states: strictly read-only, no further transitions allowed
    BookingStatus.COMPLETED.value: set(),
    BookingStatus.PAID.value: set(),
    BookingStatus.CANCELLED.value: set(),
    BookingStatus.REJECTED.value: set(),
    BookingStatus.EXPIRED.value: set(),
}

TERMINAL_STATES = {
    BookingStatus.COMPLETED.value,
    BookingStatus.PAID.value,
    BookingStatus.CANCELLED.value,
    BookingStatus.REJECTED.value,
    BookingStatus.EXPIRED.value,
}


def get_current_status_val(booking: Booking) -> str:
    if hasattr(booking.status, "value"):
        return str(booking.status.value)
    return str(booking.status)


def transition_booking_status(
    db: Session,
    booking_id: uuid.UUID,
    next_status: str,
    user: AuthUser,
    reason: Optional[str] = None,
    otp_code: Optional[str] = None,
) -> Booking:
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' was not found.",
        )

    # 1. Strict Ownership Check: A provider can only transition their own assigned booking
    if user.role == "provider":
        if booking.provider_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot transition a booking assigned to another provider.",
            )

    curr_status = get_current_status_val(booking)

    # 2. Check if current state is terminal
    if curr_status in TERMINAL_STATES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid transition: Booking is in terminal state '{curr_status}' and cannot be altered.",
        )

    # 3. Enforce Strict State Machine Transition Rules
    allowed_next = ALLOWED_TRANSITIONS.get(curr_status, set())
    if next_status not in allowed_next:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Invalid state transition: Cannot transition booking from '{curr_status}' to '{next_status}'. "
                f"Allowed transitions from '{curr_status}' are: {list(allowed_next) or 'None (terminal)'}."
            ),
        )

    # 4. Special validation for Completion: Check OTP if provided
    if next_status == BookingStatus.COMPLETED.value:
        if otp_code and booking.otp_code and otp_code.strip() != booking.otp_code.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid service completion OTP code provided by customer.",
            )
        booking.payment_status = "Completed"

    # 5. Append timeline audit event
    now_iso = datetime.now(timezone.utc).isoformat()
    timeline_event = {
        "event": f"Job status updated to {next_status}",
        "previous_status": curr_status,
        "status": next_status,
        "actor": user.full_name or user.email,
        "role": user.role,
        "reason": reason or "",
        "timestamp": now_iso,
    }
    current_timeline = list(booking.timeline or [])
    current_timeline.append(timeline_event)
    booking.timeline = current_timeline

    booking.status = next_status
    booking.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(booking)
    return booking
