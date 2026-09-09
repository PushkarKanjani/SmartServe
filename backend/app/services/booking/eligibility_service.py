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
    requested_provider_id: Optional[uuid.UUID] = None,
) -> Tuple[Optional[Provider], Optional[Availability], str]:
    """
    Determine the most eligible provider for a requested service and time slot.

    Strict eligibility rules:
    1. Service Association: Provider must actively offer the specific catalog service.
    2. Verification Status: Provider must be approved (is_verified == True).
    3. Availability Window: Provider must have an active, FREE slot covering requested date and time.
    4. Conflict Prevention: Provider must not have an active booking overlapping the requested slot.

    If requested_provider_id is provided, validates that specific provider against all 4 criteria.
    Otherwise, automatically selects and assigns the highest ranked eligible provider.

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
    if requested_provider_id and requested_provider_id not in associated_provider_ids:
        return None, None, "The selected provider does not offer this specific catalog service"

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
    if requested_provider_id and requested_provider_id not in verified_ids:
        return None, None, "The selected provider is not currently approved and verified by admin"

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

    if requested_provider_id and requested_provider_id not in provider_slot_map:
        return None, None, f"The selected provider does not have a free availability slot on {req_date} at {req_time.strftime('%H:%M')}"

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

    # If customer selected a specific provider, confirm they are conflict-free
    if requested_provider_id:
        chosen = next((p for p in eligible_candidates if p.user_id == requested_provider_id), None)
        if not chosen:
            return None, None, "The selected provider has an active conflicting booking at this scheduled time"
        matched_slot = provider_slot_map.get(chosen.user_id)
        return chosen, matched_slot, "Selected provider assigned"

    # Step 5: Auto-assign best candidate (highest reliability score, acceptance rate)
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


def get_eligible_providers(
    db: Session,
    service_id: uuid.UUID,
) -> List[dict]:
    """
    Retrieve all verified providers offering this service with their skills,
    rating/reliability metrics, and availability for customer selection.
    """
    active_services = (
        db.query(ProviderService)
        .filter(
            ProviderService.service_id == service_id,
            ProviderService.active == True
        )
        .all()
    )
    if not active_services:
        return []

    associated_provider_ids = [ps.provider_id for ps in active_services]
    verified_providers = (
        db.query(Provider)
        .filter(
            Provider.user_id.in_(associated_provider_ids),
            Provider.is_verified == True
        )
        .all()
    )

    results = []
    for p in verified_providers:
        # Get free slots for provider
        slots = (
            db.query(Availability)
            .filter(
                Availability.provider_id == p.user_id,
                Availability.status == "FREE"
            )
            .order_by(Availability.slot_date.asc(), Availability.start_time.asc())
            .limit(6)
            .all()
        )
        slot_list = [
            f"{s.slot_date.isoformat()} ({s.start_time.strftime('%I:%M %p')} - {s.end_time.strftime('%I:%M %p')})"
            for s in slots
        ]

        results.append({
            "provider_id": str(p.user_id),
            "full_name": p.full_name,
            "category": p.category,
            "skills": p.skills or "",
            "experience_years": p.experience_years or 0,
            "reliability_score": float(p.reliability_score or 100.0),
            "acceptance_rate": float(p.acceptance_rate or 100.0),
            "service_area": p.service_area or "Citywide",
            "available_slots": slot_list,
            "is_available": len(slots) > 0,
        })

    results.sort(
        key=lambda x: (x["reliability_score"], x["acceptance_rate"], x["experience_years"]),
        reverse=True
    )
    return results
