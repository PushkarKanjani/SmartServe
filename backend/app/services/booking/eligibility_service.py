import uuid
from datetime import datetime, date, time
from typing import Optional, List, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.provider import Provider, ProviderService, Availability
from app.models.customer import Booking


def parse_scheduled_datetime(scheduled_date: str, scheduled_time: str) -> datetime:
    """
    Robustly parse scheduled date and time into a datetime object.
    Supports ISO formats, 12-hour AM/PM formats, and standard variations.
    """
    cleaned_date = str(scheduled_date).strip()
    cleaned_time = str(scheduled_time).strip()

    combos = [
        f"{cleaned_date} {cleaned_time}",
        f"{cleaned_date}T{cleaned_time}",
    ]
    formats = [
        "%Y-%m-%d %I:%M %p",
        "%Y-%m-%d %I:%M%p",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M",
        "%d/%m/%Y %I:%M %p",
        "%d-%m-%Y %I:%M %p",
    ]
    for combo in combos:
        for fmt in formats:
            try:
                return datetime.strptime(combo, fmt)
            except ValueError:
                continue

    # Fallback to date only with 10:00 AM default
    try:
        parsed_d = datetime.strptime(cleaned_date, "%Y-%m-%d").date()
        return datetime.combine(parsed_d, time(10, 0))
    except Exception:
        return datetime.utcnow()


def find_eligible_provider(
    db: Session,
    service_id: uuid.UUID,
    scheduled_datetime: datetime,
) -> Tuple[Optional[Provider], Optional[Availability], str]:
    """
    Determine the most eligible provider for a requested service and time slot.

    Strict eligibility rules:
    1. Service Association: Provider must actively offer the specific catalog service.
    2. Verification Status: Provider must be approved (is_verified == True).
    3. Availability Window: Provider must have an active, FREE slot covering requested date and time.
    4. Conflict Prevention: Provider must not have an active booking overlapping the requested slot.

    Returns:
        (eligible_provider, matching_availability_slot, reason_or_status)
    """
    req_date = scheduled_datetime.date()
    req_time = scheduled_datetime.time()

    # Step 1: Filter by Service Association
    active_services = (
        db.query(ProviderService)
        .filter(
            ProviderService.service_id == service_id,
            ProviderService.active == True
        )
        .all()
    )
    if not active_services:
        return None, None, "No active provider offers this catalog service"

    associated_provider_ids = [ps.provider_id for ps in active_services]

    # Step 2: Filter by Approved / Verified Status
    verified_providers = (
        db.query(Provider)
        .filter(
            Provider.user_id.in_(associated_provider_ids),
            Provider.is_verified == True
        )
        .all()
    )
    if not verified_providers:
        return None, None, "No verified, approved providers offer this catalog service"

    verified_ids = [p.user_id for p in verified_providers]

    # Step 3: Filter by Availability Slot (Matching Requested Date & Time)
    matching_slots = (
        db.query(Availability)
        .filter(
            Availability.provider_id.in_(verified_ids),
            Availability.slot_date == req_date,
            Availability.start_time <= req_time,
            Availability.end_time >= req_time,
            Availability.status == "FREE"
        )
        .all()
    )
    if not matching_slots:
        return None, None, f"No verified provider has an available free slot on {req_date} at {req_time.strftime('%H:%M')}"

    # Map provider to their matching slot
    provider_slot_map = {slot.provider_id: slot for slot in matching_slots}
    available_providers = [p for p in verified_providers if p.user_id in provider_slot_map]

    # Step 4: Conflict Check (Exclude providers with an existing booking in that window)
    eligible_candidates = []
    for prov in available_providers:
        conflicting_booking = (
            db.query(Booking)
            .filter(
                Booking.provider_id == prov.user_id,
                Booking.status.in_(["Requested", "Assigned", "Accepted", "Started"]),
                Booking.scheduled_time.isnot(None),
                func.abs(func.extract("epoch", Booking.scheduled_time - scheduled_datetime)) < 3600
            )
            .first()
        )
        if not conflicting_booking:
            eligible_candidates.append(prov)

    if not eligible_candidates:
        return None, None, "All available providers have conflicting booking commitments for this slot"

    # Step 5: Rank best candidate (highest reliability score, acceptance rate)
    eligible_candidates.sort(
        key=lambda p: (
            float(p.reliability_score or 100.0),
            float(p.acceptance_rate or 100.0),
            float(p.experience_years or 0)
        ),
        reverse=True
    )

    selected_provider = eligible_candidates[0]
    matched_slot = provider_slot_map.get(selected_provider.user_id)
    return selected_provider, matched_slot, "Eligible provider assigned"
