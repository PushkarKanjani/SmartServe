from typing import Optional, List, Any
from pydantic import BaseModel, Field


class AdminProviderDocumentItem(BaseModel):
    id: str
    document_url: str
    certificate_type: str
    document_number: Optional[str] = None
    extracted_name: Optional[str] = None
    is_duplicate: bool = False
    verification_status: str
    uploaded_at: Optional[str] = None
    verified_at: Optional[str] = None
    ai_scan_signal: Optional[Any] = None


class AdminProviderServiceItem(BaseModel):
    id: str
    name: str
    category: str
    subcategory: Optional[str] = None
    base_price: float
    is_active: bool = True


class AdminProviderAuditLogItem(BaseModel):
    id: str
    action: str
    actor_email: str
    actor_role: str
    created_at: str
    metadata_json: Optional[Any] = None


class AdminSlotOccupiedBooking(BaseModel):
    booking_id: str
    booking_reference: str
    customer_id: str
    customer_name: str
    customer_phone: Optional[str] = None
    service_id: str
    service_name: str
    status: str
    emergency_flag: Optional[str] = None
    scheduled_time: str
    total_price: float


class AdminProviderSlotItem(BaseModel):
    id: str
    provider_id: str
    provider_name: str
    slot_date: str
    start_time: str
    end_time: str
    status: str
    is_occupied: bool = False
    occupied_booking: Optional[AdminSlotOccupiedBooking] = None
    created_at: Optional[str] = None


class AdminProviderBookingItem(BaseModel):
    id: str
    booking_reference: str
    customer_id: str
    customer_name: str
    customer_phone: Optional[str] = None
    provider_id: Optional[str] = None
    provider_name: Optional[str] = None
    service_id: str
    service_name: str
    status: str
    emergency_flag: Optional[str] = None
    scheduled_time: str
    requested_slot: Optional[str] = None
    address: str
    total_price: float
    payment_status: str
    created_at: str


class AdminProviderItem(BaseModel):
    id: str
    user_id: str
    full_name: str
    email: str
    phone: str
    category: str
    experience_years: int
    base_price: float
    is_verified: bool
    is_active: bool
    reliability_score: float
    acceptance_rate: float
    on_time_rate: float
    cancellation_rate: float
    rating: float
    completed_bookings: int
    composite_rank_score: float
    rank_tier: str
    created_at: str
    documents: List[AdminProviderDocumentItem] = []
    services: List[AdminProviderServiceItem] = []
    audit_logs: List[AdminProviderAuditLogItem] = []
    slots: List[AdminProviderSlotItem] = []
    bookings: List[AdminProviderBookingItem] = []


class ProviderVerifyRequest(BaseModel):
    verification_status: str = Field(..., description="'Approved' or 'Rejected'")
    reason: Optional[str] = None


class ProviderReplacementRequest(BaseModel):
    document_id: Optional[str] = None
    reason: str = Field(..., min_length=3)


class AccountStatusRequest(BaseModel):
    is_active: bool
    reason: Optional[str] = None
