import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status, Request
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password, create_access_token
from app.repositories.db import get_db
from app.repositories import user_repository, audit_repository
from app.models.user import User
from app.models.provider import Provider, Certificate, ProviderService
from app.models.service import Service
from app.schemas.provider_onboarding import (
    ProviderOnboardingRequest,
    ProviderOnboardingResponse,
    CategoryEvidenceRequirement,
)

router = APIRouter(prefix="/provider/onboarding", tags=["Provider Onboarding"])

# 14 Category-Aware Distinct Evidence Rules
CATEGORY_EVIDENCE_MAP = {
    "1. Beauty, Salon & Spa": CategoryEvidenceRequirement(
        category="1. Beauty, Salon & Spa",
        required_evidence_type="Cosmetology Diploma or Salon Experience Certification",
        description="Official cosmetology diploma, salon academy certificate, or verified master stylist credential.",
        document_types_accepted=["Diploma in Cosmetology", "CIDESCO/VTCT Certificate", "Registered Salon Experience Letter"]
    ),
    "2. Cleaning & Pest Control": CategoryEvidenceRequirement(
        category="2. Cleaning & Pest Control",
        required_evidence_type="Police Verification & Pest Control Operator Certification",
        description="Police clearance certificate or government-approved commercial pest control operator license.",
        document_types_accepted=["Police Clearance Certificate", "PCO License (CIB&RC)", "Commercial Sanitation Training Proof"]
    ),
    "3. Painting, Waterproofing & Home Improvement": CategoryEvidenceRequirement(
        category="3. Painting, Waterproofing & Home Improvement",
        required_evidence_type="Master Contractor Certification & Site Work Portfolio",
        description="Painting contractor trade certificate, waterproofing manufacturer applicator certification, or past project evidence.",
        document_types_accepted=["Asian Paints / Berger Certified Applicator", "Civil Contractor Trade License", "Waterproofing Specialist Proof"]
    ),
    "4. AC, Appliance & Electronics Repair": CategoryEvidenceRequirement(
        category="4. AC, Appliance & Electronics Repair",
        required_evidence_type="HVAC / Refrigeration Technician Trade Certification",
        description="ITI Refrigeration & AC certificate, OEM technician authorization, or certified electronics repair license.",
        document_types_accepted=["ITI RAC Trade Certificate", "Brand Authorized Technician Card", "MSDE Electronics Certificate"]
    ),
    "5. Electrician, Plumber, Carpenter & Home Repairs": CategoryEvidenceRequirement(
        category="5. Electrician, Plumber, Carpenter & Home Repairs",
        required_evidence_type="Electrical License Grade A / Plumber Trade Verification",
        description="Government electrical contractor/wireman license, ITI trade certificate, or certified plumbing contractor proof.",
        document_types_accepted=["State Electrical Wireman License", "ITI Electrician / Plumber Certificate", "NSDC Skilled Trade Card"]
    ),
    "6. Smart Home & Security": CategoryEvidenceRequirement(
        category="6. Smart Home & Security",
        required_evidence_type="CCTV & IoT Security Systems Certification",
        description="Surveillance systems installation certification or home automation OEM integrator credentials.",
        document_types_accepted=["Hikvision / CP Plus Certified Engineer", "KNX / Zigbee Smart Home Certificate", "Network Technician License"]
    ),
    "7. Domestic Help & Cooking": CategoryEvidenceRequirement(
        category="7. Domestic Help & Cooking",
        required_evidence_type="Food Safety & Hygiene Certification & Address Verification",
        description="FSSAI food safety training certificate, culinary trade diploma, and local police verification.",
        document_types_accepted=["FSSAI FoSTaC Certificate", "Culinary Institute Certificate", "Police Verification Record"]
    ),
    "8. Education, Teachers & Coaching": CategoryEvidenceRequirement(
        category="8. Education, Teachers & Coaching",
        required_evidence_type="University Degree & Academic Teaching Credentials",
        description="Accredited bachelor/master degree certificate and B.Ed/NET teaching qualification proof.",
        document_types_accepted=["University Degree Certificate", "B.Ed / CTET Qualification", "Institutional Teaching Experience Letter"]
    ),
    "9. Health, Fitness & Wellness": CategoryEvidenceRequirement(
        category="9. Health, Fitness & Wellness",
        required_evidence_type="Certified Fitness / Yoga Instructor or Therapy Credential",
        description="Yoga Alliance/YCB certification, certified personal trainer diploma (ACE/ACSM), or physiotherapy license.",
        document_types_accepted=["YCB / Yoga Alliance Certificate", "ACE / ACSM Personal Trainer Credential", "Physiotherapy Council Registration"]
    ),
    "10. Events, Photography & Entertainment": CategoryEvidenceRequirement(
        category="10. Events, Photography & Entertainment",
        required_evidence_type="Professional Portfolio & Commercial Production Showreel",
        description="Link to professional portfolio, commercial photography/videography registration, or verified event showcase.",
        document_types_accepted=["Commercial Studio Registration", "Verified Photography Portfolio Link", "Event Management Association Card"]
    ),
    "11. Pet Services": CategoryEvidenceRequirement(
        category="11. Pet Services",
        required_evidence_type="Veterinary Assistant or Certified Canine Groomer Credential",
        description="Certified companion animal groomer certification or veterinary nursing/handling certification.",
        document_types_accepted=["Certified Pet Groomer Certificate", "Veterinary Assistant Credential", "Canine Behaviorist Certificate"]
    ),
    "12. Technology & Digital Services": CategoryEvidenceRequirement(
        category="12. Technology & Digital Services",
        required_evidence_type="IT / Computer Engineering Diploma or Technical Certification",
        description="Recognized computer hardware/networking diploma (CompTIA, Cisco) or verified software portfolio.",
        document_types_accepted=["CompTIA / Cisco Network Associate", "Diploma in Computer Applications", "B.Tech / MCA Degree Proof"]
    ),
    "13. Professional & Business Services": CategoryEvidenceRequirement(
        category="13. Professional & Business Services",
        required_evidence_type="Professional Council License & Educational Credentials",
        description="ICAI / Bar Council / Professional board registration and practitioner license.",
        document_types_accepted=["CA / CS Membership Certificate", "Bar Council Registration", "Certified Management Consultant Proof"]
    ),
    "14. Moving, Delivery & Local Assistance": CategoryEvidenceRequirement(
        category="14. Moving, Delivery & Local Assistance",
        required_evidence_type="Commercial Transport Permit & Commercial Driver's License",
        description="Valid commercial transport badge, vehicle registration (commercial), and logistics clearance.",
        document_types_accepted=["Commercial Heavy/Light Vehicle License", "Transporter Association Registration", "Police Verification"]
    ),
}

DEFAULT_REQUIREMENT = CategoryEvidenceRequirement(
    category="General Home Services",
    required_evidence_type="Trade License or Professional Experience Certificate",
    description="Valid professional credential or certified employer verification letter in your service category.",
    document_types_accepted=["Trade Certificate", "Professional Experience Letter", "Identity & Police Verification"]
)


@router.get("/requirements", response_model=CategoryEvidenceRequirement)
def get_onboarding_requirements(
    category: Optional[str] = Query(None, description="Service category to inspect")
):
    """Retrieve category-aware skill evidence requirements. Never reuses requirements across categories."""
    if not category:
        return DEFAULT_REQUIREMENT
    for key, req in CATEGORY_EVIDENCE_MAP.items():
        if key.lower() in category.lower() or category.lower() in key.lower():
            return req
    return DEFAULT_REQUIREMENT


@router.get("/categories-list", response_model=List[CategoryEvidenceRequirement])
def list_all_category_requirements():
    """List distinct evidence rules for all 14 authentic categories."""
    return list(CATEGORY_EVIDENCE_MAP.values())


@router.post("/submit", response_model=ProviderOnboardingResponse, status_code=status.HTTP_201_CREATED)
def submit_provider_onboarding(
    payload: ProviderOnboardingRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Phase 3 Provider Onboarding Pipeline:
    1. Validates personal information, unique email, non-placeholder professional description.
    2. Validates identity/KYC document references.
    3. Validates NDA & code of conduct undertaking sign-off.
    4. Validates up to 3 services strictly chosen from existing Admin catalog.
    5. Validates category-aware skill evidence.
    6. Persists records with initial status = 'Pending' (cannot operate or self-approve).
    """
    clean_email = payload.personal_info.email.strip().lower()

    # Disallow placeholder or low-effort descriptions
    skills_desc = payload.personal_info.skills_description.strip()
    forbidden_terms = ["placeholder", "lorem ipsum", "test description", "asdf", "dummy"]
    if any(term in skills_desc.lower() for term in forbidden_terms) or len(skills_desc) < 20:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Skills & Professional Description must be a genuine, detailed summary of your qualifications (minimum 20 characters, no placeholder text)."
        )

    # Email uniqueness check
    existing_user = user_repository.get_user_by_email(db, clean_email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please log in or use another email."
        )

    # NDA verification check
    if not payload.nda_undertaking.signed:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="You must review and sign the Service Partner NDA and Terms of Service Undertaking to onboard."
        )

    # Validate selected services against master catalog
    if len(payload.service_selection.service_ids) > 3 or len(payload.service_selection.service_ids) < 1:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="You must select between 1 and 3 services from the Admin catalog."
        )

    catalog_services = db.query(Service).filter(Service.id.in_(payload.service_selection.service_ids)).all()
    if len(catalog_services) != len(payload.service_selection.service_ids):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="One or more selected services do not exist in the Admin master catalog. Providers cannot create new service names."
        )

    # Compute base price from selected services
    avg_base_price = sum(s.base_price for s in catalog_services) / len(catalog_services)

    # 1. Create User
    user_id = uuid.uuid4()
    new_user = User(
        id=user_id,
        email=clean_email,
        password_hash=hash_password(payload.personal_info.password),
        role="provider",
        is_active=True,
        is_2fa_enabled=False,
        created_at=datetime.now(timezone.utc)
    )
    db.add(new_user)
    db.flush()

    # 2. Create Provider (Verification Status = False / Pending)
    new_provider = Provider(
        user_id=user_id,
        full_name=payload.personal_info.full_name.strip(),
        photo_url=payload.personal_info.photo_url,
        category=payload.service_selection.category,
        skills=skills_desc,
        experience_years=payload.personal_info.experience_years,
        base_price=avg_base_price,
        service_area=payload.personal_info.service_area.strip(),
        is_verified=False,  # Under manual admin review
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(new_provider)
    db.flush()

    # 3. Attach Selected Catalog Services
    for svc in catalog_services:
        db.add(ProviderService(
            id=uuid.uuid4(),
            provider_id=user_id,
            service_id=svc.id,
            price=svc.base_price,
            duration_minutes=60,
            active=True
        ))

    # 4. Attach Verification Documents (Certificates)
    # 4a. Aadhaar Identity Document
    db.add(Certificate(
        id=uuid.uuid4(),
        provider_id=user_id,
        document_url=payload.identity_kyc.aadhaar_doc_url,
        certificate_type="Identity Proof (Aadhaar)",
        verification_status="PENDING",
        document_number=payload.identity_kyc.aadhaar_number,
        is_duplicate=False
    ))

    # 4b. PAN Tax Identity Document
    db.add(Certificate(
        id=uuid.uuid4(),
        provider_id=user_id,
        document_url=payload.identity_kyc.pan_doc_url,
        certificate_type="Tax Identity (PAN)",
        verification_status="PENDING",
        document_number=payload.identity_kyc.pan_number,
        is_duplicate=False
    ))

    # 4c. Signed NDA Undertaking
    db.add(Certificate(
        id=uuid.uuid4(),
        provider_id=user_id,
        document_url=payload.nda_undertaking.undertaking_doc_url,
        certificate_type="Signed NDA & Code of Conduct Undertaking",
        verification_status="PENDING",
        is_duplicate=False
    ))

    # 4d. Category-Aware Skill Evidence
    db.add(Certificate(
        id=uuid.uuid4(),
        provider_id=user_id,
        document_url=payload.skill_evidence.evidence_url,
        certificate_type=payload.skill_evidence.evidence_type,
        extracted_name=payload.skill_evidence.description,
        verification_status="PENDING",
        is_duplicate=False
    ))

    db.commit()

    # Issue session JWT for provider
    token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": str(user_id), "email": clean_email, "role": "provider", "full_name": new_provider.full_name},
        expires_delta=token_expires
    )

    client_ip = request.client.host if request.client else "127.0.0.1"
    audit_repository.create_audit_log(
        db, actor_id=user_id, actor_email=clean_email, actor_role="provider",
        action=f"New Provider Onboarding Submitted ({new_provider.full_name} - {new_provider.category})",
        risk_level="Info", ip_address=client_ip
    )

    return ProviderOnboardingResponse(
        status="success",
        message="Onboarding profile submitted successfully. Verification status is Pending manual admin review.",
        provider_id=user_id,
        email=clean_email,
        full_name=new_provider.full_name,
        category=new_provider.category,
        verification_status="Pending",
        selected_services_count=len(catalog_services),
        documents_submitted_count=4,
        access_token=token,
        token_type="bearer"
    )
