import uuid
from typing import List, Optional
from decimal import Decimal
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import AuthUser, require_provider
from app.models.customer import Booking
from app.services.provider.provider_service import ProviderServiceDomain
from app.services.booking.state_machine import transition_booking_status
from app.schemas.provider import (
    ProviderProfileResponse,
    ProviderProfileUpdate,
    ProviderServiceCreate,
    ProviderServiceUpdate,
    ProviderServiceResponse,
    AvailabilityCreate,
    AvailabilityUpdate,
    AvailabilityResponse,
    CertificateCreate,
    CertificateResponse,
    ProviderBookingResponse,
    ProviderServiceCatalogResponse,
    ProviderDashboardStatsResponse,
    ProviderProfileTrustResponse,
    BookingStatusUpdatePayload,
    BookingRejectPayload,
    BookingCompletePayload,
)

router = APIRouter(tags=["Providers & Verification"])


def get_service_domain(db: Session = Depends(get_db)) -> ProviderServiceDomain:
    return ProviderServiceDomain(db)


# ==========================================
# PROVIDER PROFILE ENDPOINTS
# ==========================================

@router.get(
    "/providers/me",
    response_model=ProviderProfileResponse,
    summary="Get current authenticated provider profile",
)
def get_my_provider_profile(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_my_profile(current_user)


@router.patch(
    "/providers/me",
    response_model=ProviderProfileResponse,
    summary="Update current authenticated provider profile",
)
def update_my_provider_profile(
    update_data: ProviderProfileUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_my_profile(current_user, update_data)


@router.get(
    "/providers/me/profile-trust",
    response_model=ProviderProfileTrustResponse,
    summary="Get verified trust signals and stats for current provider",
)
def get_my_profile_trust(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_profile_trust(current_user)


@router.get(
    "/providers/{provider_id}",
    response_model=ProviderProfileResponse,
    summary="Get provider profile with strict ownership check",
)
def get_provider_profile(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_provider_profile(current_user, provider_id)


# ==========================================
# PROVIDER SERVICES ENDPOINTS
# ==========================================

@router.get(
    "/providers/me/services",
    response_model=List[ProviderServiceCatalogResponse],
    summary="List customized services offered by current authenticated provider joined with master catalog",
)
def list_my_provider_services(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_my_services_catalog(current_user)


@router.post(
    "/providers/me/services",
    response_model=ProviderServiceResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a service offering to current provider profile",
)
def create_provider_service_offering(
    data: ProviderServiceCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.add_provider_service(current_user, data)


@router.patch(
    "/providers/me/services/{id}",
    response_model=ProviderServiceResponse,
    summary="Update customized pricing or active status of a service offering",
)
def update_provider_service_offering(
    id: uuid.UUID,
    data: ProviderServiceUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_provider_service(current_user, id, data)


@router.delete(
    "/providers/me/services/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a service offering from current provider profile",
)
def delete_provider_service_offering(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_provider_service(current_user, id)
    return None


@router.get(
    "/providers/{provider_id}/services",
    response_model=List[ProviderServiceResponse],
    summary="List customized services offered by a provider with ownership check",
)
def list_provider_services(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_provider_services(current_user, provider_id)


# ==========================================
# AVAILABILITY SCHEDULE ENDPOINTS
# ==========================================

@router.get(
    "/providers/me/availability",
    response_model=List[AvailabilityResponse],
    summary="View active available timeslots for current provider",
)
def get_my_availability(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_availability(current_user, current_user.id)


@router.post(
    "/providers/me/availability",
    response_model=AvailabilityResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Publish a new available timeslot",
)
def add_availability_slot(
    data: AvailabilityCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.add_availability_slot(current_user, data)


@router.patch(
    "/providers/me/availability/{id}",
    response_model=AvailabilityResponse,
    summary="Update an existing timeslot (status or hours) with conflict checks",
)
def update_availability_slot(
    id: uuid.UUID,
    data: AvailabilityUpdate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.update_availability_slot(current_user, id, data)


@router.get(
    "/providers/{provider_id}/availability",
    response_model=List[AvailabilityResponse],
    summary="View active available timeslots for a provider with ownership check",
)
def get_provider_availability(
    provider_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_availability(current_user, provider_id)


@router.delete(
    "/providers/me/availability/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an available timeslot",
)
def delete_availability_slot(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_availability_slot(current_user, id)
    return None


# ==========================================
# CERTIFICATES & VERIFICATION ENDPOINTS
# ==========================================

@router.post(
    "/certificates",
    response_model=CertificateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload certificate metadata for admin verification review",
)
def upload_certificate(
    data: CertificateCreate,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.upload_certificate(current_user, data)


@router.get(
    "/certificates",
    response_model=List[CertificateResponse],
    summary="List all uploaded certificates and verification statuses for current provider",
)
def list_my_certificates(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_my_certificates(current_user)


@router.get(
    "/certificates/{id}",
    response_model=CertificateResponse,
    summary="Get a certificate by ID with strict ownership check",
)
def get_certificate_by_id(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_certificate_by_id(current_user, id)


@router.delete(
    "/certificates/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a certificate with strict ownership check",
)
def delete_certificate(
    id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    service.delete_certificate(current_user, id)
    return None


# ==========================================
# PROVIDER BOOKINGS & ASSIGNED JOBS
# ==========================================

@router.get(
    "/providers/me/dashboard-stats",
    response_model=ProviderDashboardStatsResponse,
    summary="Get aggregated live dashboard metrics for current provider",
)
def get_my_dashboard_stats(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.get_dashboard_stats(current_user)


@router.get(
    "/providers/me/bookings",
    response_model=List[ProviderBookingResponse],
    summary="List all customer bookings assigned to current authenticated provider",
)
def get_my_assigned_bookings(
    status_filter: Optional[str] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    query = db.query(Booking).filter(Booking.provider_id == current_user.id)
    if status_filter and status_filter.upper() != "ALL":
        query = query.filter(Booking.status.ilike(f"%{status_filter}%"))
    bookings = query.order_by(Booking.created_at.desc()).all()
    results = []
    for b in bookings:
        results.append(
            ProviderBookingResponse(
                id=b.id,
                booking_reference=b.booking_reference,
                customer_id=b.customer_id,
                customer_name=b.customer.full_name if b.customer else "Customer",
                customer_phone=b.customer.phone if b.customer else None,
                service_id=b.service_id,
                service_name=b.service_name,
                category=b.category,
                status=str(b.status.value if hasattr(b.status, "value") else b.status),
                payment_status=str(b.payment_status or "Pending"),
                scheduled_time=b.scheduled_time,
                scheduled_date=b.scheduled_date,
                address=b.address or "",
                total_price=Decimal(str(b.total_price or "0.00")),
                otp_code=b.otp_code,
                emergency_flag=b.emergency_flag,
                timeline=b.timeline,
                created_at=b.created_at,
            )
        )
    return results


@router.get(
    "/providers/me/bookings/{booking_id}",
    response_model=ProviderBookingResponse,
    summary="Get single assigned booking by ID with ownership check",
)
def get_my_assigned_booking_detail(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    b = db.query(Booking).filter(Booking.id == booking_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Booking not found")
    if b.provider_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: You cannot access bookings assigned to another provider",
        )
    return ProviderBookingResponse(
        id=b.id,
        booking_reference=b.booking_reference,
        customer_id=b.customer_id,
        customer_name=b.customer.full_name if b.customer else "Customer",
        customer_phone=b.customer.phone if b.customer else None,
        service_id=b.service_id,
        service_name=b.service_name,
        category=b.category,
        status=str(b.status.value if hasattr(b.status, "value") else b.status),
        payment_status=str(b.payment_status or "Pending"),
        scheduled_time=b.scheduled_time,
        scheduled_date=b.scheduled_date,
        address=b.address or "",
        total_price=Decimal(str(b.total_price or "0.00")),
        otp_code=b.otp_code,
        emergency_flag=b.emergency_flag,
        timeline=b.timeline,
        created_at=b.created_at,
    )


def _serialize_booking_response(b: Booking) -> ProviderBookingResponse:
    return ProviderBookingResponse(
        id=b.id,
        booking_reference=b.booking_reference,
        customer_id=b.customer_id,
        customer_name=b.customer.full_name if b.customer else "Customer",
        customer_phone=b.customer.phone if b.customer else None,
        service_id=b.service_id,
        service_name=b.service_name,
        category=b.category,
        status=str(b.status.value if hasattr(b.status, "value") else b.status),
        payment_status=str(b.payment_status or "Pending"),
        scheduled_time=b.scheduled_time,
        scheduled_date=b.scheduled_date,
        address=b.address or "",
        total_price=Decimal(str(b.total_price or "0.00")),
        otp_code=b.otp_code,
        emergency_flag=b.emergency_flag,
        timeline=b.timeline,
        created_at=b.created_at,
    )


@router.post(
    "/providers/me/bookings/{booking_id}/accept",
    response_model=ProviderBookingResponse,
    summary="Accept an incoming requested booking",
)
def accept_booking(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Accepted",
        user=current_user,
    )
    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/reject",
    response_model=ProviderBookingResponse,
    summary="Reject an incoming requested booking with optional reason",
)
def reject_booking(
    booking_id: uuid.UUID,
    payload: Optional[BookingRejectPayload] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    reason = payload.reason if payload else "Declined by service partner"
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Rejected",
        user=current_user,
        reason=reason,
    )
    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/start",
    response_model=ProviderBookingResponse,
    summary="Mark an accepted booking as Started (service delivery initiated)",
)
def start_booking(
    booking_id: uuid.UUID,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Started",
        user=current_user,
    )
    return _serialize_booking_response(updated)


@router.post(
    "/providers/me/bookings/{booking_id}/complete",
    response_model=ProviderBookingResponse,
    summary="Complete a job in progress with optional customer OTP verification",
)
def complete_booking(
    booking_id: uuid.UUID,
    payload: Optional[BookingCompletePayload] = None,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    otp = payload.otp_code if payload else None
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status="Completed",
        user=current_user,
        otp_code=otp,
    )
    return _serialize_booking_response(updated)


@router.patch(
    "/providers/me/bookings/{booking_id}/status",
    response_model=ProviderBookingResponse,
    summary="Generic state machine transition endpoint for provider booking",
)
def update_booking_status(
    booking_id: uuid.UUID,
    payload: BookingStatusUpdatePayload,
    current_user: AuthUser = Depends(require_provider),
    db: Session = Depends(get_db),
):
    updated = transition_booking_status(
        db=db,
        booking_id=booking_id,
        next_status=payload.status,
        user=current_user,
        reason=payload.reason,
        otp_code=payload.otp_code,
    )
    return _serialize_booking_response(updated)
