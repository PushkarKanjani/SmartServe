import uuid
from datetime import datetime, date, time, timedelta
from decimal import Decimal
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import SessionLocal
from app.models.user import User
from app.models.provider import Provider, Certificate, Availability, ProviderService
from app.models.service import Service
from app.core.security import hash_password

CATEGORIES_PROVIDER_MAP = [
    {
        "category": "1. Beauty, Salon & Spa",
        "name": "Pooja Verma",
        "email": "pooja.beauty@smartserve.com",
        "phone": "+91 98765 11001",
        "skills": "Bridal Makeup, Facials, Hair Styling, Spa Treatments",
        "experience": 6,
        "base_price": Decimal("599.00"),
    },
    {
        "category": "2. Cleaning & Home Cleaning",
        "name": "Sanjay Kumar",
        "email": "sanjay.cleaning@smartserve.com",
        "phone": "+91 98765 11002",
        "skills": "Full Home Deep Cleaning, Kitchen Sanitization, Sofa Cleaning",
        "experience": 5,
        "base_price": Decimal("699.00"),
    },
    {
        "category": "2. Cleaning & Pest Control",
        "name": "Ramesh Chandra",
        "email": "ramesh.pest@smartserve.com",
        "phone": "+91 98765 11003",
        "skills": "Pest Control, Balcony Washing, Window Track Cleaning, Tile Scrubbing",
        "experience": 7,
        "base_price": Decimal("499.00"),
    },
    {
        "category": "3. Painting, Waterproofing & Home Improvement",
        "name": "Vikas Sharma",
        "email": "vikas.painting@smartserve.com",
        "phone": "+91 98765 11004",
        "skills": "Interior Painting, Wall Waterproofing, Texture Paint, Wood Polishing",
        "experience": 8,
        "base_price": Decimal("999.00"),
    },
    {
        "category": "4. AC, Appliance & Electronics Repair",
        "name": "Deepak Negi",
        "email": "deepak.repair@smartserve.com",
        "phone": "+91 98765 11005",
        "skills": "AC Gas Refill, Compressor Repair, Refrigerator & Washing Machine Service",
        "experience": 6,
        "base_price": Decimal("449.00"),
    },
    {
        "category": "5. Electrician, Plumber, Carpenter & Home Repairs",
        "name": "Manoj Yadav",
        "email": "manoj.electric@smartserve.com",
        "phone": "+91 98765 11006",
        "skills": "Electrical Wiring, MCB Installation, Plumbing Fixtures, Furniture Assembly",
        "experience": 9,
        "base_price": Decimal("399.00"),
    },
    {
        "category": "6. Smart Home & Security",
        "name": "Arun Mehra",
        "email": "arun.security@smartserve.com",
        "phone": "+91 98765 11007",
        "skills": "CCTV Setup, Smart Lock Installation, Video Doorbell, Wi-Fi Mesh",
        "experience": 5,
        "base_price": Decimal("799.00"),
    },
    {
        "category": "7. Domestic Help & Cooking",
        "name": "Geeta Devi",
        "email": "geeta.cook@smartserve.com",
        "phone": "+91 98765 11008",
        "skills": "North Indian Cooking, Continental, Meal Prep, Party Catering",
        "experience": 10,
        "base_price": Decimal("499.00"),
    },
    {
        "category": "8. Education, Teachers & Coaching",
        "name": "Neha Singhal",
        "email": "neha.tutor@smartserve.com",
        "phone": "+91 98765 11009",
        "skills": "CBSE / ICSE Mathematics, Physics, Chemistry, Homework Assistance",
        "experience": 6,
        "base_price": Decimal("600.00"),
    },
    {
        "category": "9. Health, Fitness & Wellness",
        "name": "Aditya Rawat",
        "email": "aditya.fitness@smartserve.com",
        "phone": "+91 98765 11010",
        "skills": "Personal Training, Functional Fitness, Yoga Instruction, Posture Correction",
        "experience": 7,
        "base_price": Decimal("850.00"),
    },
    {
        "category": "10. Events, Photography & Entertainment",
        "name": "Kunal Kapoor",
        "email": "kunal.photo@smartserve.com",
        "phone": "+91 98765 11011",
        "skills": "Wedding Photography, Portrait Sessions, Birthday Event Shoots",
        "experience": 6,
        "base_price": Decimal("1499.00"),
    },
    {
        "category": "11. Pet Services",
        "name": "Simran Kaur",
        "email": "simran.pets@smartserve.com",
        "phone": "+91 98765 11012",
        "skills": "Pet Grooming, Dog Walking, Tick Treatment, Nail Trimming",
        "experience": 4,
        "base_price": Decimal("499.00"),
    },
    {
        "category": "12. Technology & Digital Services",
        "name": "Rohan Gupta",
        "email": "rohan.tech@smartserve.com",
        "phone": "+91 98765 11013",
        "skills": "Laptop OS Installation, Data Recovery, Printer Setup, Network Troubleshooting",
        "experience": 5,
        "base_price": Decimal("549.00"),
    },
    {
        "category": "13. Professional & Business Services",
        "name": "Kavita Reddy",
        "email": "kavita.pro@smartserve.com",
        "phone": "+91 98765 11014",
        "skills": "Tax Consultation, Accounting Audit, Business Registration, Documentation",
        "experience": 8,
        "base_price": Decimal("999.00"),
    },
    {
        "category": "14. Moving, Delivery & Local Assistance",
        "name": "Harish Bhati",
        "email": "harish.delivery@smartserve.com",
        "phone": "+91 98765 11015",
        "skills": "Intercity Moving, Heavy Furniture Shifting, Secure Document Delivery",
        "experience": 7,
        "base_price": Decimal("799.00"),
    },
]

def seed_category_providers():
    db: Session = SessionLocal()
    try:
        now = datetime.now()
        today = date.today()
        password_hash = hash_password("ProviderPass123!")

        print(f"[{now.isoformat()}] Starting Seeding of Test Providers for all 15 SmartServe Categories...")

        for item in CATEGORIES_PROVIDER_MAP:
            cat_name = item["category"]
            email = item["email"]

            # 1. Ensure User exists
            user = db.query(User).filter(User.email == email).first()
            if not user:
                user = User(
                    id=uuid.uuid4(),
                    email=email,
                    password_hash=password_hash,
                    role="provider",
                    is_active=True,
                    created_at=datetime.utcnow()
                )
                db.add(user)
                db.flush()
                print(f"Created User: {email} (ID: {user.id})")
            else:
                user.is_active = True
                user.role = "provider"
                db.add(user)
                db.flush()

            # 2. Ensure Provider profile exists
            provider = db.query(Provider).filter(Provider.user_id == user.id).first()
            if not provider:
                provider = Provider(
                    user_id=user.id,
                    full_name=item["name"],
                    category=cat_name,
                    skills=item["skills"],
                    experience_years=item["experience"],
                    base_price=item["base_price"],
                    service_area="Delhi NCR (Noida, Greater Noida, Ghaziabad)",
                    is_verified=True,
                    reliability_score=Decimal("98.50"),
                    acceptance_rate=Decimal("96.00"),
                    on_time_rate=Decimal("99.00"),
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow(),
                )
                db.add(provider)
                db.flush()
                print(f"Created Provider Profile: {item['name']} for '{cat_name}'")
            else:
                provider.is_verified = True
                provider.full_name = item["name"]
                provider.category = cat_name
                provider.service_area = "Delhi NCR (Noida, Greater Noida, Ghaziabad)"
                db.add(provider)
                db.flush()

            # 3. Ensure Certificate / Verified document
            cert = db.query(Certificate).filter(Certificate.provider_id == provider.user_id).first()
            if not cert:
                cert = Certificate(
                    id=uuid.uuid4(),
                    provider_id=provider.user_id,
                    document_url="/documents/smartserve_verified_badge.pdf",
                    certificate_type="Government ID & Professional Skill License",
                    verification_status="VERIFIED",
                    uploaded_at=datetime.utcnow(),
                    verified_at=datetime.utcnow(),
                    document_number=f"DOC-{str(provider.user_id)[:6].upper()}",
                    extracted_name=item["name"]
                )
                db.add(cert)

            # 4. Link Provider to Catalog Services in this Category
            services = db.query(Service).filter(Service.category == cat_name, Service.is_active == True).all()
            if not services:
                # If exact string didn't match, try like match
                services = db.query(Service).filter(Service.category.ilike(f"%{cat_name[3:].strip()}%")).all()

            for srv in services:
                ps = db.query(ProviderService).filter(
                    ProviderService.provider_id == provider.user_id,
                    ProviderService.service_id == srv.id
                ).first()
                if not ps:
                    ps = ProviderService(
                        id=uuid.uuid4(),
                        provider_id=provider.user_id,
                        service_id=srv.id,
                        price=srv.base_price,
                        duration_minutes=60,
                        active=True,
                        created_at=datetime.utcnow()
                    )
                    db.add(ps)
                else:
                    ps.active = True
                    db.add(ps)

            # 5. Seed Real Future Availability Slots
            # Remove any past slots to keep table clean
            db.query(Availability).filter(
                Availability.provider_id == provider.user_id,
                Availability.slot_date < today
            ).delete(synchronize_session=False)

            # Define slot schedules for future days
            slot_schedules = [
                # (day_offset, start_time, end_time)
                (0, time(max(now.hour + 1, 10), 0), time(min(max(now.hour + 3, 12), 21), 0)) if now.hour < 19 else None,
                (1, time(9, 0), time(12, 0)),
                (1, time(13, 0), time(16, 0)),
                (1, time(16, 30), time(19, 30)),
                (2, time(10, 0), time(13, 0)),
                (2, time(14, 0), time(18, 0)),
                (3, time(9, 0), time(12, 0)),
                (3, time(13, 30), time(17, 30)),
                (4, time(10, 0), time(14, 0)),
                (4, time(15, 0), time(19, 0)),
                (5, time(9, 30), time(12, 30)),
                (5, time(14, 0), time(18, 0)),
                (7, time(9, 0), time(12, 0)),
                (7, time(14, 0), time(18, 0)),
            ]

            for sched in slot_schedules:
                if not sched:
                    continue
                day_offset, s_time, e_time = sched
                slot_date = today + timedelta(days=day_offset)

                existing_slot = db.query(Availability).filter(
                    Availability.provider_id == provider.user_id,
                    Availability.slot_date == slot_date,
                    Availability.start_time == s_time,
                    Availability.end_time == e_time,
                ).first()

                if not existing_slot:
                    new_slot = Availability(
                        id=uuid.uuid4(),
                        provider_id=provider.user_id,
                        slot_date=slot_date,
                        start_time=s_time,
                        end_time=e_time,
                        status="FREE",
                        created_at=datetime.utcnow(),
                    )
                    db.add(new_slot)
                elif existing_slot.status != "BOOKED":
                    existing_slot.status = "FREE"
                    db.add(existing_slot)

        db.commit()
        print("\nAll 15 category providers successfully seeded and verified with active availability!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding providers: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_category_providers()
