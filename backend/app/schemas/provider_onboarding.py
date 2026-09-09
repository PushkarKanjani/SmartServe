import uuid
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class OnboardingPersonalInfo(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    password: str = Field(..., min_length=8)
    photo_url: Optional[str] = Field(None, max_length=1024)
    experience_years: int = Field(..., ge=0, le=50)
    skills_description: str = Field(..., min_length=20, max_length=2000, description="Genuine description of skills and professional background")
    service_area: str = Field(..., min_length=3, max_length=255)


class OnboardingIdentityKYC(BaseModel):
    aadhaar_number: str = Field(..., min_length=12, max_length=20)
    aadhaar_doc_url: str = Field(..., min_length=5, max_length=1024)
    pan_number: str = Field(..., min_length=10, max_length=10)
    pan_doc_url: str = Field(..., min_length=5, max_length=1024)


class OnboardingNDA(BaseModel):
    signed: bool = Field(..., description="Confirmation that provider has signed the NDA/undertaking")
    undertaking_doc_url: str = Field(..., min_length=5, max_length=1024, description="Uploaded signed NDA / undertaking document")


class OnboardingServiceSelection(BaseModel):
    category: str = Field(..., description="Selected master category from Admin catalog")
    service_ids: List[uuid.UUID] = Field(..., min_length=1, max_length=3, description="Up to 3 services chosen from existing Admin catalog")


class OnboardingSkillEvidence(BaseModel):
    evidence_type: str = Field(..., min_length=5, max_length=255)
    evidence_url: str = Field(..., min_length=5, max_length=1024)
    description: Optional[str] = Field(None, max_length=1000)


class ProviderOnboardingRequest(BaseModel):
    personal_info: OnboardingPersonalInfo
    identity_kyc: OnboardingIdentityKYC
    nda_undertaking: OnboardingNDA
    service_selection: OnboardingServiceSelection
    skill_evidence: OnboardingSkillEvidence


class ProviderOnboardingResponse(BaseModel):
    status: str = "success"
    message: str
    provider_id: uuid.UUID
    email: str
    full_name: str
    category: str
    verification_status: str = "Pending"
    selected_services_count: int
    documents_submitted_count: int
    access_token: str
    token_type: str = "bearer"


class CategoryEvidenceRequirement(BaseModel):
    category: str
    required_evidence_type: str
    description: str
    document_types_accepted: List[str]
