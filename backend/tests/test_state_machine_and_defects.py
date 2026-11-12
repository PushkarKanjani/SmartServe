import uuid
from datetime import datetime, timezone, date, time
import pytest
from sqlalchemy.orm import Session

from app.models.customer import Customer, Booking, BookingWarranty
from app.models.provider import Provider, Availability
from app.models.service import Service
from app.models.user import User
from app.core.database import SessionLocal
from app.services.booking.state_machine import (
    transition_booking_status,
    BookingStatus,
    ALLOWED_TRANSITIONS,
)
from app.services.booking.warranty_service import (
    get_warranty_policy,
    validate_warranty_claim,
)


@pytest.fixture
def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.rollback()
        session.close()


def test_state_machine_started_requires_completed_before_paid():
    """Verify that BookingStatus.STARTED cannot jump directly to PAID, bypassing completion OTP."""
    allowed_from_started = ALLOWED_TRANSITIONS[BookingStatus.STARTED.value]
    assert BookingStatus.COMPLETED.value in allowed_from_started
    assert BookingStatus.PAID.value not in allowed_from_started

    allowed_from_completed = ALLOWED_TRANSITIONS[BookingStatus.COMPLETED.value]
    assert BookingStatus.PAID.value in allowed_from_completed


def test_warranty_policy_beauty_exemption():
    """Verify that beauty/personal care categories return is_eligible=False with explanatory terms."""
    beauty_policy = get_warranty_policy("Beauty & Personal Care", "Classic Relaxing Foot Pedicure")
    assert beauty_policy["is_eligible"] is False
    assert "excluded" in beauty_policy["terms"].lower() or "exempt" in beauty_policy["terms"].lower()

    # validate_warranty_claim on None warranty with beauty category
    is_valid, msg, fee = validate_warranty_claim(None, category="Beauty & Personal Care", service_name="Classic Relaxing Foot Pedicure")
    assert is_valid is False
    assert "excluded" in msg.lower() or "exempt" in msg.lower()

    # Home repair category is eligible
    plumbing_policy = get_warranty_policy("Plumbing", "Tap Leakage Repair")
    assert plumbing_policy["is_eligible"] is True
    assert plumbing_policy["duration_days"] == 7


def test_customer_cancellation_frees_reserved_slot(db: Session):
    """Verify that cancelling an active booking frees provider's RESERVED availability slot."""
    # Create test provider user & provider
    p_user = User(
        id=uuid.uuid4(),
        email=f"prov_test_{uuid.uuid4().hex[:6]}@example.com",
        password_hash="fakehash",
        role="provider",
    )
    db.add(p_user)
    db.flush()

    provider = Provider(
        user_id=p_user.id,
        full_name="Test Provider",
        category="Cleaning",
        is_verified=True,
    )
    db.add(provider)

    # Create availability slot
    today = date.today()
    slot = Availability(
        id=uuid.uuid4(),
        provider_id=provider.user_id,
        slot_date=today,
        start_time=time(10, 0),
        end_time=time(12, 0),
        status="RESERVED",
    )
    db.add(slot)

    # Create customer
    c_user = User(
        id=uuid.uuid4(),
        email=f"cust_test_{uuid.uuid4().hex[:6]}@example.com",
        password_hash="fakehash",
        role="customer",
    )
    db.add(c_user)
    db.flush()

    customer = Customer(
        id=uuid.uuid4(),
        user_id=c_user.id,
        full_name="Test Customer",
        email=c_user.email,
        is_verified=True,
    )
    db.add(customer)

    # Create service
    svc = Service(
        id=uuid.uuid4(),
        name="Test Deep Cleaning",
        category="Cleaning",
        subcategory="Deep Cleaning",
        base_price=599.0,
        is_active=True,
    )
    db.add(svc)
    db.flush()

    # Create booking at 10:30 AM today
    sched_dt = datetime.combine(today, time(10, 30)).replace(tzinfo=timezone.utc)
    booking = Booking(
        id=uuid.uuid4(),
        customer_id=customer.id,
        provider_id=provider.user_id,
        service_id=svc.id,
        status="Accepted",
        scheduled_time=sched_dt,
        total_price=599.0,
        timeline=[],
    )
    db.add(booking)
    db.commit()

    # Cancel via transition_booking_status
    updated_booking = transition_booking_status(
        db=db,
        booking_id=booking.id,
        next_status="Cancelled",
        user=c_user,
        reason="Schedule conflict",
    )

    assert updated_booking.status == "Cancelled"
    db.refresh(slot)
    # The slot was RESERVED, now it should be freed to FREE
    assert slot.status == "FREE"

    # Timeline audit must exist
    tl_events = [e.get("event") for e in updated_booking.timeline or []]
    assert any("Cancelled" in str(e) for e in tl_events)
