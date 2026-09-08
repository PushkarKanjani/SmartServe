import uuid
from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import AuthUser, require_provider
from app.services.provider.provider_service import ProviderServiceDomain
from app.schemas.provider import (
    ProviderProfileResponse,
    ProviderProfileUpdate,
    ProviderServiceCreate,
    ProviderServiceUpdate,
    ProviderServiceResponse,
    AvailabilityCreate,
    AvailabilityResponse,
    CertificateCreate,
    CertificateResponse,
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
    response_model=List[ProviderServiceResponse],
    summary="List customized services offered by current authenticated provider",
)
def list_my_provider_services(
    current_user: AuthUser = Depends(require_provider),
    service: ProviderServiceDomain = Depends(get_service_domain),
):
    return service.list_provider_services(current_user, current_user.id)


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
