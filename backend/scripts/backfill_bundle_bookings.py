"""
Backfill live Booking records for existing CombinedBooking records.
This ensures customer 'My Bookings' and provider 'Assigned Job Pipeline' show all bundle booked services.
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import uuid
import random
from decimal import Decimal
from datetime import datetime, timezone
from app.core.database import SessionLocal
from app.models.customer import Booking, CombinedBooking, CombinedBookingItem
from app.models.service import Service
from app.models.provider import Provider

def backfill():
    db = SessionLocal()
    try:
        combined_bookings = db.query(CombinedBooking).all()
        print(f"Found {len(combined_bookings)} CombinedBooking entries.")

        # Default provider (Rajesh Sharma)
        default_provider = db.query(Provider).filter(Provider.full_name == "Rajesh Sharma").first()
        if not default_provider:
            default_provider = db.query(Provider).first()
        default_prov_id = default_provider.user_id if default_provider else None

        created_count = 0
        for cb in combined_bookings:
            bundle_ref = f"CB-{str(cb.id)[:8].upper()}"
            print(f"Processing bundle {bundle_ref} ({cb.id})...")

            if cb.total_price and cb.total_price > 0 and cb.discount_applied:
                discount_rate = Decimal(str(cb.discount_applied)) / Decimal(str(cb.total_price))
            else:
                discount_rate = Decimal("0.10")

            for itm in cb.items:
                # Check if a booking already exists for this item or bundle + service
                existing = db.query(Booking).filter(
                    Booking.customer_id == cb.customer_id,
                    Booking.service_id == itm.service_id,
                    Booking.customer_notes.ilike(f"%{bundle_ref}%")
                ).first()

                if existing:
                    print(f"  Booking already exists for service {itm.service_id}: {existing.id}")
                    continue

                # Find provider
                svc = db.query(Service).filter(Service.id == itm.service_id).first()
                assigned_prov = itm.provider_id
                if not assigned_prov and svc:
                    prov_match = db.query(Provider).filter(Provider.category.ilike(f"%{svc.category}%")).first()
                    if prov_match:
                        assigned_prov = prov_match.user_id
                    else:
                        assigned_prov = default_prov_id
                if not assigned_prov:
                    assigned_prov = default_prov_id

                # Update item provider if empty
                if not itm.provider_id and assigned_prov:
                    itm.provider_id = assigned_prov
                    db.add(itm)

                unit_price = Decimal(str(itm.unit_price or (svc.base_price if svc else "499.00")))
                discounted_unit = round(unit_price * (Decimal("1.0") - discount_rate), 2)
                booking_otp = f"{random.randint(1000, 9999)}"

                sched_time = itm.scheduled_time or cb.scheduled_time or datetime.now(timezone.utc)

                new_booking = Booking(
                    id=uuid.uuid4(),
                    customer_id=cb.customer_id,
                    provider_id=assigned_prov,
                    service_id=itm.service_id,
                    status="Requested",
                    payment_status="Pending",
                    scheduled_time=sched_time,
                    address=(cb.address or "Flat 402, Sunshine Apartments, Mumbai").strip(),
                    total_price=discounted_unit,
                    otp_code=booking_otp,
                    customer_notes=f"[{bundle_ref} • {int(discount_rate * 100)}% Bundle Discount] {cb.customer_notes or ''}".strip(),
                    timeline=[
                        {
                            "event": "Booking Created via Multi-Service Bundle",
                            "bundle_reference": bundle_ref,
                            "bundle_id": str(cb.id),
                            "discount_rate": f"{int(discount_rate * 100)}%",
                            "timestamp": datetime.now(timezone.utc).isoformat(),
                            "role": "customer",
                        }
                    ],
                    created_at=cb.created_at or datetime.now(timezone.utc),
                    updated_at=cb.updated_at or datetime.now(timezone.utc),
                )
                db.add(new_booking)
                created_count += 1
                svc_title = svc.name if svc else str(itm.service_id)
                print(f"  + Created Booking {new_booking.id} for service '{svc_title}' assigned to provider {assigned_prov}")

        db.commit()
        print(f"\nSuccessfully backfilled {created_count} service bookings across {len(combined_bookings)} bundles!")

    except Exception as e:
        db.rollback()
        print(f"Error backfilling: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    backfill()
