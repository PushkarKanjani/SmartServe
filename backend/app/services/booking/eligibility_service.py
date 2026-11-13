import uuid
import math
from datetime import datetime, date, time, timedelta
from typing import Optional, List, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.provider import Provider, ProviderService, Availability, ProviderLocation
from app.models.customer import Booking
from app.models.user import User


PROVIDER_LOCATION_FRESHNESS_HOURS = 48.0


def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance in kilometers between two GPS coordinates
    using the Haversine formula.
    """
    R = 6371.0  # Earth's radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2.0) ** 2
        + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2.0) ** 2
    )
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(R * c, 2)


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


def generate_slot_times(slot: Availability, active_bookings: List[Booking]) -> List[str]:
    """
    Generate non-conflicting time intervals within a provider's availability window.
    Strictly filters out past dates and active booking overlaps.
    """
    slot_date = slot.slot_date
    now_dt = datetime.now()
    today_val = now_dt.date()
    if slot_date < today_val:
        return []

    curr_hour = slot.start_time.hour
    curr_min = slot.start_time.minute
    end_hour = slot.end_time.hour
    end_min = slot.end_time.minute

    total_start_mins = curr_hour * 60 + curr_min
    total_end_mins = end_hour * 60 + end_min

    if total_end_mins <= total_start_mins:
        return []

    # Generate candidate time points (every 2 hours, or hourly if window is small)
    step_mins = 60 if (total_end_mins - total_start_mins) <= 180 else 120
    candidates = []
    t = total_start_mins
    while t < total_end_mins:
        h = t // 60
        m = t % 60
        candidates.append(time(h, m))
        t += step_mins

    # Real-time lead buffer: at least 30 minutes ahead of current time for same-day bookings
    min_lead_time = now_dt + timedelta(minutes=30)

    valid_times = []
    for cand in candidates:
        cand_dt = datetime.combine(slot_date, cand)

        # 1. Past & elapsed time guard for same-day slots
        if slot_date == today_val and cand_dt <= min_lead_time:
            continue

        # 2. Conflict check against active bookings (60-minute window)
        has_conflict = False
        for b in active_bookings:
            if not b.scheduled_time:
                continue
            b_dt = b.scheduled_time
            if hasattr(b_dt, "tzinfo") and b_dt.tzinfo is not None:
                b_dt = b_dt.replace(tzinfo=None)
            diff_secs = abs((b_dt - cand_dt).total_seconds())
            if diff_secs < 3600:
                has_conflict = True
                break

        if not has_conflict:
            valid_times.append(cand.strftime("%I:%M %p"))

    return valid_times


def find_eligible_provider(
    db: Session,
    service_id: uuid.UUID,
    scheduled_datetime: datetime,
    requested_provider_id: Optional[uuid.UUID] = None,
    customer_lat: Optional[float] = None,
    customer_lng: Optional[float] = None,
    max_radius_km: Optional[float] = 50.0,
) -> Tuple[Optional[Provider], Optional[Availability], str]:
    """
    Determine the most eligible provider for a requested service and time slot.

    Strict eligibility rules:
    1. Past Date Guard: Requested date must not be in the past (before today).
    2. Service Association: Provider must actively offer the specific catalog service.
    3. Verification & Active Status: Provider must be approved (is_verified == True) and user account active.
    4. Availability Window: Provider must have an active, FREE slot covering requested date and time.
    5. Conflict Prevention: Provider must not have an active booking overlapping the requested slot.
    6. Proximity & Freshness: Nearest eligible provider with fresh GPS location (<= 48h) is prioritized.
    """
    check_dt = scheduled_datetime
    if hasattr(check_dt, "tzinfo") and check_dt.tzinfo is not None:
        check_dt = check_dt.replace(tzinfo=None)

    now_dt = datetime.now()
    req_date = check_dt.date()
    req_time = check_dt.time()

    if req_date < now_dt.date() or (req_date == now_dt.date() and check_dt <= now_dt):
        return None, None, "Cannot schedule a booking in the past. Please select an upcoming date and time."

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

    # Step 2: Filter by Approved / Verified Status AND Active User Status
    verified_providers = (
        db.query(Provider)
        .join(User, Provider.user_id == User.id)
        .filter(
            Provider.user_id.in_(associated_provider_ids),
            Provider.is_verified == True,
            User.is_active == True,
        )
        .all()
    )
    if not verified_providers:
        return None, None, "No verified, approved providers currently offer this catalog service"

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
            func.upper(Availability.status) == "FREE"
        )
        .all()
    )
    if not matching_slots:
        return None, None, f"No verified provider has an available free slot on {req_date} at {req_time.strftime('%I:%M %p')}"

    # Map provider to their matching slot
    provider_slot_map = {slot.provider_id: slot for slot in matching_slots}
    available_providers = [p for p in verified_providers if p.user_id in provider_slot_map]

    if requested_provider_id and requested_provider_id not in provider_slot_map:
        return None, None, f"The selected provider does not have a free availability slot on {req_date} at {req_time.strftime('%I:%M %p')}"

    # Step 4: Conflict Check (Exclude providers with an existing booking overlapping this window)
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

    # Step 5: Auto-assign best candidate based on real GPS proximity, freshness, and quality metrics
    now_utc = datetime.utcnow()
    candidate_meta = []
    for p in eligible_candidates:
        prov_loc = (
            db.query(ProviderLocation)
            .filter(
                ProviderLocation.provider_id == p.user_id,
                ProviderLocation.is_active == True,
            )
            .first()
        )
        has_fresh_gps = False
        dist_km = 99999.0
        if prov_loc and prov_loc.latitude is not None and prov_loc.longitude is not None:
            loc_time = prov_loc.updated_at
            if hasattr(loc_time, "tzinfo") and loc_time.tzinfo is not None:
                loc_time = loc_time.replace(tzinfo=None)
            age_hours = (now_utc - loc_time).total_seconds() / 3600.0
            if age_hours <= PROVIDER_LOCATION_FRESHNESS_HOURS:
                has_fresh_gps = True
                if customer_lat is not None and customer_lng is not None:
                    dist_km = calculate_haversine_distance(
                        customer_lat, customer_lng, float(prov_loc.latitude), float(prov_loc.longitude)
                    )

        in_radius = True
        if customer_lat is not None and customer_lng is not None and max_radius_km is not None and has_fresh_gps:
            in_radius = (dist_km <= max_radius_km)

        candidate_meta.append({
            "provider": p,
            "has_fresh_gps": has_fresh_gps,
            "in_radius": in_radius,
            "dist_km": dist_km,
            "reliability_score": float(p.reliability_score or 100.0),
            "acceptance_rate": float(p.acceptance_rate or 100.0),
            "experience_years": float(p.experience_years or 0),
        })

    if customer_lat is not None and customer_lng is not None:
        # Prioritize candidates with fresh GPS within radius, ordered by distance ascending
        in_radius_candidates = [c for c in candidate_meta if c["has_fresh_gps"] and c["in_radius"]]
        if in_radius_candidates:
            in_radius_candidates.sort(
                key=lambda c: (
                    c["dist_km"],
                    -c["reliability_score"],
                    -c["acceptance_rate"],
                    -c["experience_years"],
                )
            )
            selected_provider = in_radius_candidates[0]["provider"]
        else:
            # Fall back to best overall verified provider if no candidate in radius has fresh GPS
            candidate_meta.sort(
                key=lambda c: (
                    -c["reliability_score"],
                    -c["acceptance_rate"],
                    -c["experience_years"],
                    c["dist_km"],
                )
            )
            selected_provider = candidate_meta[0]["provider"]
    else:
        candidate_meta.sort(
            key=lambda c: (
                -c["reliability_score"],
                -c["acceptance_rate"],
                -c["experience_years"],
            )
        )
        selected_provider = candidate_meta[0]["provider"]

    matched_slot = provider_slot_map.get(selected_provider.user_id)
    return selected_provider, matched_slot, "Eligible provider assigned"


def get_eligible_providers(
    db: Session,
    service_id: uuid.UUID,
    customer_lat: Optional[float] = None,
    customer_lng: Optional[float] = None,
    customer_city: Optional[str] = None,
    max_radius_km: Optional[float] = 50.0,
) -> List[dict]:
    """
    Retrieve verified providers offering this service with their skills,
    metrics, upcoming availability slots, and location-aware distance filtering.
    Filters providers by coverage radius (Haversine formula) and service area.
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
        .join(User, Provider.user_id == User.id)
        .filter(
            Provider.user_id.in_(associated_provider_ids),
            Provider.is_verified == True,
            User.is_active == True,
        )
        .all()
    )

    today = date.today()
    results = []
    for p in verified_providers:
        # Location & Coverage Radius Check
        prov_loc = db.query(ProviderLocation).filter(
            ProviderLocation.provider_id == p.user_id,
            ProviderLocation.is_active == True,
        ).first()

        distance_km: Optional[float] = None
        has_fresh_gps = False
        if prov_loc and prov_loc.latitude is not None and prov_loc.longitude is not None:
            loc_time = prov_loc.updated_at
            if hasattr(loc_time, "tzinfo") and loc_time.tzinfo is not None:
                loc_time = loc_time.replace(tzinfo=None)
            age_hours = (datetime.utcnow() - loc_time).total_seconds() / 3600.0
            if age_hours <= PROVIDER_LOCATION_FRESHNESS_HOURS:
                has_fresh_gps = True

        if customer_lat is not None and customer_lng is not None:
            if has_fresh_gps:
                distance_km = calculate_haversine_distance(
                    customer_lat,
                    customer_lng,
                    float(prov_loc.latitude),
                    float(prov_loc.longitude),
                )
                if max_radius_km is not None and distance_km > max_radius_km:
                    # Exclude provider outside serviceable radius
                    continue
        elif customer_city:
            area = (p.service_area or "").strip().lower()
            city_norm = customer_city.strip().lower()
            if area and area not in ["citywide", "all", "all areas", "pan-india", "national"]:
                if city_norm not in area and area not in city_norm:
                    # Exclude provider not servicing customer city
                    continue

        # Get active bookings for conflict checking
        active_bookings = (
            db.query(Booking)
            .filter(
                Booking.provider_id == p.user_id,
                Booking.status.in_(["Requested", "Assigned", "Accepted", "Started"]),
                Booking.scheduled_time.isnot(None),
            )
            .all()
        )

        # Get upcoming free slots for provider
        slots = (
            db.query(Availability)
            .filter(
                Availability.provider_id == p.user_id,
                func.upper(Availability.status) == "FREE",
                Availability.slot_date >= today,
            )
            .order_by(Availability.slot_date.asc(), Availability.start_time.asc())
            .all()
        )

        structured_slots = []
        slot_list = []

        for s in slots:
            valid_times = generate_slot_times(s, active_bookings)
            if not valid_times:
                continue

            disp_time = f"{s.start_time.strftime('%I:%M %p')} - {s.end_time.strftime('%I:%M %p')}"
            structured_slots.append({
                "slot_id": str(s.id),
                "slot_date": s.slot_date.isoformat(),
                "start_time": s.start_time.strftime("%H:%M"),
                "end_time": s.end_time.strftime("%H:%M"),
                "display_time": disp_time,
                "is_available": True,
                "available_times": valid_times,
            })
            slot_list.append(f"{s.slot_date.isoformat()} ({disp_time})")

        results.append({
            "provider_id": str(p.user_id),
            "full_name": p.full_name,
            "category": p.category,
            "skills": p.skills or "",
            "experience_years": p.experience_years or 0,
            "reliability_score": float(p.reliability_score or 100.0),
            "acceptance_rate": float(p.acceptance_rate or 100.0),
            "service_area": p.service_area or "Citywide",
            "distance_km": distance_km,
            "is_location_fresh": has_fresh_gps,
            "available_slots": slot_list,
            "structured_slots": structured_slots,
            "is_available": len(structured_slots) > 0,
        })

    if customer_lat is not None and customer_lng is not None:
        results.sort(
            key=lambda x: (
                0 if (x["distance_km"] is not None and x.get("is_location_fresh", False)) else 1,
                x["distance_km"] if x["distance_km"] is not None else 9999.0,
                -x["reliability_score"],
                -x["acceptance_rate"],
            )
        )
    else:
        results.sort(
            key=lambda x: (
                -x["reliability_score"],
                -x["acceptance_rate"],
                -x["experience_years"],
            )
        )
    return results

