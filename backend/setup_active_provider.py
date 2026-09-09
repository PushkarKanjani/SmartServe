import sys
import uuid
from datetime import date, time, datetime, timezone, timedelta

sys.path.insert(0, '.')

from app.repositories.db import get_db
from app.models.user import User
from app.models.provider import Provider, Certificate, ProviderService, Availability
from app.models.service import Service
from app.core.security import hash_password

def setup():
    db = next(get_db())
    print("=" * 70)
    print("SETTING UP ACTIVE FULLY-EQUIPPED PROVIDER ACCOUNTS")
    print("=" * 70)

    # -------------------------------------------------------------
    # 1. Rajesh Sharma (Beauty, Salon & Spa)
    # -------------------------------------------------------------
    u_rajesh = db.query(User).filter(User.email == "rajesh.sharma@smartserve.com").first()
    if not u_rajesh:
        u_rajesh = User(
            id=uuid.uuid4(),
            email="rajesh.sharma@smartserve.com",
            role="provider",
            is_active=True
        )
        db.add(u_rajesh)
        db.flush()

    u_rajesh.password_hash = hash_password("ProviderPassword123!")
    u_rajesh.is_active = True
    u_rajesh.role = "provider"

    p_rajesh = db.query(Provider).filter(Provider.user_id == u_rajesh.id).first()
    if not p_rajesh:
        p_rajesh = Provider(
            user_id=u_rajesh.id,
            full_name="Rajesh Sharma",
            category="1. Beauty, Salon & Spa",
            experience_years=6,
            is_verified=True,
            reliability_score=98.8,
            acceptance_rate=96.5,
            on_time_rate=99.0,
            cancellation_rate=1.2
        )
        db.add(p_rajesh)
        db.flush()

    p_rajesh.full_name = "Rajesh Sharma"
    p_rajesh.is_verified = True
    p_rajesh.category = "1. Beauty, Salon & Spa"
    p_rajesh.experience_years = 6
    p_rajesh.base_price = 499.0
    p_rajesh.service_area = "Indiranagar, Koramangala & Whitefield, Bengaluru"
    p_rajesh.skills = "Certified Master Aesthetician & Spa Specialist with 6+ years of premium salon, skincare and wellness practice."

    # Documents
    certs_rajesh = db.query(Certificate).filter(Certificate.provider_id == u_rajesh.id).all()
    if not certs_rajesh:
        certs_to_add = [
            ("Identity Proof (Aadhaar)", "984412349012", "https://smartserve.s3.amazonaws.com/kyc/rajesh_aadhaar.pdf"),
            ("Tax Identity (PAN)", "ABCDE1234F", "https://smartserve.s3.amazonaws.com/kyc/rajesh_pan.pdf"),
            ("Signed NDA & Undertaking", "NDA-SIGNED-2026", "https://smartserve.s3.amazonaws.com/kyc/rajesh_nda.pdf"),
            ("Professional Trade Credential", "COSM-CERT-5521", "https://smartserve.s3.amazonaws.com/kyc/rajesh_trade.pdf")
        ]
        for ctype, dnum, durl in certs_to_add:
            c = Certificate(
                id=uuid.uuid4(),
                provider_id=u_rajesh.id,
                certificate_type=ctype,
                document_number=dnum,
                document_url=durl,
                extracted_name="Rajesh Sharma",
                verification_status="Verified",
                verified_at=datetime.now(timezone.utc),
                uploaded_at=datetime.now(timezone.utc)
            )
            db.add(c)
    else:
        for c in certs_rajesh:
            c.verification_status = "Verified"
            c.extracted_name = "Rajesh Sharma"

    # Services
    beauty_svcs = db.query(Service).filter(Service.category.like("%Beauty%")).limit(5).all()
    for s in beauty_svcs:
        existing_ps = db.query(ProviderService).filter(
            ProviderService.provider_id == u_rajesh.id,
            ProviderService.service_id == s.id
        ).first()
        if not existing_ps:
            ps = ProviderService(
                provider_id=u_rajesh.id,
                service_id=s.id,
                price=s.base_price,
                active=True
            )
            db.add(ps)

    # Availability Slots (Next 7 days)
    today = date.today()
    existing_slots = db.query(Availability).filter(Availability.provider_id == u_rajesh.id).all()
    if len(existing_slots) < 7:
        slot_times = [
            (time(9, 0), time(11, 0)),
            (time(11, 30), time(13, 30)),
            (time(14, 30), time(16, 30)),
            (time(17, 0), time(19, 0)),
        ]
        for day_offset in range(7):
            d = today + timedelta(days=day_offset)
            for st, et in slot_times:
                chk = db.query(Availability).filter(
                    Availability.provider_id == u_rajesh.id,
                    Availability.slot_date == d,
                    Availability.start_time == st
                ).first()
                if not chk:
                    slot = Availability(
                        id=uuid.uuid4(),
                        provider_id=u_rajesh.id,
                        slot_date=d,
                        start_time=st,
                        end_time=et,
                        status="FREE"
                    )
                    db.add(slot)

    # -------------------------------------------------------------
    # 2. Amit Kumar (Electrician, Plumber, Carpenter)
    # -------------------------------------------------------------
    u_amit = db.query(User).filter(User.email == "amit.kumar@smartserve.com").first()
    if not u_amit:
        u_amit = User(
            id=uuid.uuid4(),
            email="amit.kumar@smartserve.com",
            role="provider",
            is_active=True
        )
        db.add(u_amit)
        db.flush()

    u_amit.password_hash = hash_password("ProviderPassword123!")
    u_amit.is_active = True
    u_amit.role = "provider"

    p_amit = db.query(Provider).filter(Provider.user_id == u_amit.id).first()
    if not p_amit:
        p_amit = Provider(
            user_id=u_amit.id,
            full_name="Amit Kumar",
            category="5. Electrician, Plumber, Carpenter & Home Repairs",
            experience_years=5,
            is_verified=True,
            reliability_score=97.8,
            acceptance_rate=95.0,
            on_time_rate=98.5,
            cancellation_rate=1.8
        )
        db.add(p_amit)
        db.flush()

    p_amit.full_name = "Amit Kumar"
    p_amit.is_verified = True
    p_amit.category = "5. Electrician, Plumber, Carpenter & Home Repairs"
    p_amit.experience_years = 5
    p_amit.base_price = 349.0
    p_amit.service_area = "HSR Layout, BTM Layout & Jayanagar, Bengaluru"
    p_amit.skills = "Licensed Electrical & Multi-Trade Contractor with 5+ years of experience in residential wiring, plumbing, and precision home repairs."

    # Documents
    certs_amit = db.query(Certificate).filter(Certificate.provider_id == u_amit.id).all()
    if len(certs_amit) < 4:
        # Add missing standard docs
        existing_types = [c.certificate_type for c in certs_amit]
        standard_docs = [
            ("Identity Proof (Aadhaar)", "912388331199", "https://smartserve.s3.amazonaws.com/kyc/amit_aadhaar.pdf"),
            ("Tax Identity (PAN)", "BKIPA9921M", "https://smartserve.s3.amazonaws.com/kyc/amit_pan.pdf"),
            ("Signed NDA & Undertaking", "NDA-AMIT-2026", "https://smartserve.s3.amazonaws.com/kyc/amit_nda.pdf"),
            ("Electrical License Grade A", "ELEC-LIC-44910", "https://smartserve.s3.amazonaws.com/kyc/amit_license.pdf")
        ]
        for ctype, dnum, durl in standard_docs:
            if ctype not in existing_types:
                c = Certificate(
                    id=uuid.uuid4(),
                    provider_id=u_amit.id,
                    certificate_type=ctype,
                    document_number=dnum,
                    document_url=durl,
                    extracted_name="Amit Kumar",
                    verification_status="Verified",
                    verified_at=datetime.now(timezone.utc),
                    uploaded_at=datetime.now(timezone.utc)
                )
                db.add(c)
    for c in db.query(Certificate).filter(Certificate.provider_id == u_amit.id).all():
        c.verification_status = "Verified"
        c.extracted_name = "Amit Kumar"

    # Services
    elec_svcs = db.query(Service).filter(Service.category.like("%Electrician%")).limit(5).all()
    for s in elec_svcs:
        existing_ps = db.query(ProviderService).filter(
            ProviderService.provider_id == u_amit.id,
            ProviderService.service_id == s.id
        ).first()
        if not existing_ps:
            ps = ProviderService(
                provider_id=u_amit.id,
                service_id=s.id,
                price=s.base_price,
                active=True
            )
            db.add(ps)

    # Availability Slots (Next 7 days)
    for day_offset in range(7):
        d = today + timedelta(days=day_offset)
        slot_times = [
            (time(9, 30), time(11, 30)),
            (time(12, 0), time(14, 0)),
            (time(15, 0), time(17, 0)),
            (time(17, 30), time(19, 30)),
        ]
        for st, et in slot_times:
            chk = db.query(Availability).filter(
                Availability.provider_id == u_amit.id,
                Availability.slot_date == d,
                Availability.start_time == st
            ).first()
            if not chk:
                slot = Availability(
                    id=uuid.uuid4(),
                    provider_id=u_amit.id,
                    slot_date=d,
                    start_time=st,
                    end_time=et,
                    status="FREE"
                )
                db.add(slot)

    db.commit()
    print("Database updated successfully!")
    print(f"Rajesh Sharma: verified={p_rajesh.is_verified}, active={u_rajesh.is_active}")
    print(f"Amit Kumar: verified={p_amit.is_verified}, active={u_amit.is_active}")

if __name__ == "__main__":
    setup()
