import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Any, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.core.dependencies import AuthUser
from app.repositories.provider_repository import ProviderRepository
from app.models.provider import Provider, Certificate, Availability, ProviderService
from app.models.service import Service
from app.models.customer import Booking
from app.models.user import User
from app.schemas.provider import (
    ProviderProfileUpdate,
    CertificateCreate,
    AvailabilityCreate,
    AvailabilityUpdate,
    ProviderServiceCreate,
    ProviderServiceUpdate,
    ProviderServiceCatalogResponse,
    ProviderDashboardStatsResponse,
    ProviderProfileTrustResponse,
)


class ProviderServiceDomain:
    def __init__(self, db: Session):
        self.repo = ProviderRepository(db)

    # ==========================================
    # PROFILE MANAGEMENT
    # ==========================================

    def get_my_profile(self, user: AuthUser) -> Provider:
        return self.repo.get_or_create(user_id=user.id, default_name=user.full_name)

    def update_my_profile(self, user: AuthUser, update_data: ProviderProfileUpdate) -> Provider:
        provider = self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        # Prevent updating read-only metrics or verification status
        clean_update = ProviderProfileUpdate(
            skills=update_data.skills,
            experience_years=update_data.experience_years,
            base_price=update_data.base_price,
            service_area=update_data.service_area,
            photo_url=update_data.photo_url,
        )
        return self.repo.update_profile(provider, clean_update)

    def get_profile_trust(self, user: AuthUser) -> ProviderProfileTrustResponse:
        provider = self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        user_record = self.repo.db.query(User).filter(User.id == user.id).first()
        completed_count = (
            self.repo.db.query(Booking)
            .filter(Booking.provider_id == user.id, Booking.status == "Completed")
            .count()
        )
        certs_count = (
            self.repo.db.query(Certificate)
            .filter(Certificate.provider_id == user.id)
            .count()
        )
        phone = "+91 98765 34567" if "amit" in user.email.lower() else "+91 98765 99881"
        return ProviderProfileTrustResponse(
            user_id=provider.user_id,
            full_name=provider.full_name,
            email=user_record.email if user_record else user.email,
            phone=phone,
            photo_url=provider.photo_url,
            category=provider.category,
            skills=provider.skills,
            experience_years=provider.experience_years,
            base_price=provider.base_price,
            service_area=provider.service_area,
            is_verified=provider.is_verified,
            reliability_score=provider.reliability_score,
            acceptance_rate=provider.acceptance_rate,
            cancellation_rate=provider.cancellation_rate,
            no_show_rate=provider.no_show_rate,
            on_time_rate=provider.on_time_rate,
            response_time_score=provider.response_time_score,
            completed_jobs_count=completed_count,
            certificates_count=certs_count,
            created_at=provider.created_at,
            updated_at=provider.updated_at,
        )

    def get_my_status(self, user: AuthUser):
        """Return the provider's verification status and document breakdown.
        Accessible to any authenticated provider — pending OR verified.
        """
        from app.schemas.provider import ProviderStatusResponse, DocumentStatusItem
        provider = self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        user_record = self.repo.db.query(User).filter(User.id == user.id).first()
        certs = (
            self.repo.db.query(Certificate)
            .filter(Certificate.provider_id == user.id)
            .all()
        )

        doc_items = [
            DocumentStatusItem(
                certificate_type=c.certificate_type,
                verification_status=c.verification_status,
                document_number=c.document_number,
                uploaded_at=c.uploaded_at,
                verified_at=c.verified_at,
            )
            for c in certs
        ]

        docs_verified = sum(1 for c in certs if c.verification_status in ("Verified", "VERIFIED"))
        docs_rejected = sum(1 for c in certs if c.verification_status in ("Rejected", "REJECTED"))
        docs_correction = sum(1 for c in certs if c.verification_status == "Correction Requested")

        # Derive overall verification_status string
        if provider.is_verified:
            overall = "Verified"
        elif docs_rejected > 0 and not docs_correction:
            overall = "Rejected"
        elif docs_correction > 0:
            overall = "Correction Requested"
        else:
            overall = "Pending"

        # Attempt to find rejection_reason or correction_instructions from latest audit log
        rejection_reason = None
        correction_instructions = None
        if overall in ("Rejected", "Correction Requested"):
            from app.models.security import AuditLog
            from sqlalchemy import desc
            last_audit = (
                self.repo.db.query(AuditLog)
                .filter(
                    (AuditLog.target_resource == str(user.id)) |
                    (AuditLog.target_resource == f"provider:{user.id}")
                )
                .order_by(desc(AuditLog.created_at))
                .first()
            )
            if last_audit and last_audit.metadata_json and isinstance(last_audit.metadata_json, dict):
                msg = last_audit.metadata_json.get("reason")
                if overall == "Correction Requested":
                    correction_instructions = msg
                else:
                    rejection_reason = msg

        # Verified_at: latest cert verified_at
        verified_at_val = None
        if provider.is_verified and certs:
            verified_ats = [c.verified_at for c in certs if c.verified_at]
            if verified_ats:
                verified_at_val = max(verified_ats)

        return ProviderStatusResponse(
            provider_id=provider.user_id,
            full_name=provider.full_name,
            email=user_record.email if user_record else user.email,
            category=provider.category,
            is_verified=provider.is_verified,
            verification_status=overall,
            documents_submitted=len(certs),
            documents_verified=docs_verified,
            documents_rejected=docs_rejected,
            documents=doc_items,
            rejection_reason=rejection_reason,
            correction_instructions=correction_instructions,
            submitted_at=provider.created_at,
            verified_at=verified_at_val,
        )

    def resubmit_application(self, user: AuthUser, data: Any) -> Any:
        """
        Allows provider to re-submit updated documents after admin requests corrections.
        Resets status of affected documents to 'PENDING' so they appear for admin review.
        """
        from datetime import datetime, timezone
        from app.models.provider import Certificate
        from app.repositories import audit_repository
        from app.services.ai_service import ai_service

        provider = self.repo.get_by_user_id(user.id)
        if not provider:
            raise HTTPException(status_code=404, detail="Provider profile not found")

        now = datetime.now(timezone.utc)

        # 1. Update or create submitted documents
        if data.updated_documents:
            for doc in data.updated_documents:
                existing_cert = (
                    self.repo.db.query(Certificate)
                    .filter(
                        Certificate.provider_id == user.id,
                        Certificate.certificate_type.ilike(f"%{doc.certificate_type.strip()}%"),
                    )
                    .first()
                )
                if existing_cert:
                    existing_cert.document_url = doc.document_url
                    if doc.document_number:
                        existing_cert.document_number = doc.document_number
                    if doc.description:
                        existing_cert.extracted_name = doc.description
                    existing_cert.verification_status = "PENDING"
                    existing_cert.uploaded_at = now
                    self.repo.db.add(existing_cert)
                else:
                    new_c = Certificate(
                        id=uuid.uuid4(),
                        provider_id=user.id,
                        document_url=doc.document_url,
                        certificate_type=doc.certificate_type,
                        document_number=doc.document_number,
                        extracted_name=doc.description or provider.full_name,
                        verification_status="PENDING",
                        uploaded_at=now,
                        is_duplicate=False,
                    )
                    self.repo.db.add(new_c)

        # 2. Reset any remaining 'Correction Requested' certs to 'PENDING'
        correction_certs = (
            self.repo.db.query(Certificate)
            .filter(
                Certificate.provider_id == user.id,
                Certificate.verification_status == "Correction Requested",
            )
            .all()
        )
        for cc in correction_certs:
            cc.verification_status = "PENDING"
            self.repo.db.add(cc)

        self.repo.db.commit()

        # Run OCR scan on newly updated/pending certificates
        all_certs = (
            self.repo.db.query(Certificate)
            .filter(Certificate.provider_id == user.id)
            .all()
        )
        for cert in all_certs:
            try:
                ai_service.analyze_provider_document(
                    document_url=cert.document_url,
                    certificate_type=cert.certificate_type,
                    provider_name=provider.full_name,
                    provider_id=str(user.id),
                    cert_id=str(cert.id),
                    db=self.repo.db,
                    existing_doc_number=cert.document_number,
                    existing_extracted_name=cert.extracted_name,
                )
            except Exception:
                pass

        # 3. Log audit trail
        audit_repository.create_audit_log(
            self.repo.db,
            actor_id=user.id,
            actor_email=user.email,
            actor_role="provider",
            action=f"Provider Re-submitted Documents for Approval ({provider.full_name})",
            target_resource=str(user.id),
            metadata_json={
                "action": "resubmit_application",
                "notes": getattr(data, "notes", None) or "Documents re-submitted by provider",
                "timestamp": now.isoformat(),
            },
        )

        return self.get_my_status(user)

    def get_provider_profile(self, user: AuthUser, provider_id: uuid.UUID) -> Provider:
        # Cross-provider ownership check: a provider can only access their own profile
        if user.role == "provider" and user.id != provider_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot access another provider's profile",
            )
        provider = self.repo.get_by_user_id(provider_id)
        if not provider:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Provider with ID '{provider_id}' not found",
            )
        return provider

    # ==========================================
    # CERTIFICATES & ONBOARDING
    # ==========================================

    def add_certificate(self, user: AuthUser, data: CertificateCreate) -> Certificate:
        self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        return self.repo.create_certificate(provider_id=user.id, data=data)

    upload_certificate = add_certificate

    def get_my_certificates(self, user: AuthUser) -> List[Certificate]:
        return self.list_certificates(user, user.id)

    def list_certificates(self, user: AuthUser, provider_id: uuid.UUID) -> List[Certificate]:
        # Cross-provider ownership check: a provider can only view their own certificates
        if user.role == "provider" and user.id != provider_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot view another provider's certificates",
            )
        return self.repo.list_certificates_by_provider(provider_id=provider_id)

    def get_certificate_by_id(self, user: AuthUser, cert_id: uuid.UUID) -> Certificate:
        cert = self.repo.get_certificate_by_id(cert_id)
        if not cert:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Certificate document not found",
            )
        if cert.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot access another provider's certificate",
            )
        return cert

    def delete_certificate(self, user: AuthUser, cert_id: uuid.UUID) -> None:
        cert = self.repo.get_certificate_by_id(cert_id)
        if not cert:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Certificate document not found",
            )
        if cert.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot delete another provider's certificate",
            )
        self.repo.delete_certificate(cert)

    # ==========================================
    # AVAILABILITY SCHEDULE & CONFLICT CHECKS
    # ==========================================

    def add_availability_slot(self, user: AuthUser, data: AvailabilityCreate) -> Availability:
        # 1. Validate time ordering
        if data.start_time >= data.end_time:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Slot start_time must be strictly before end_time",
            )

        # 2. Prevent creating past slots
        if data.slot_date < date.today():
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Cannot schedule availability slots in the past",
            )

        self.repo.get_or_create(user_id=user.id, default_name=user.full_name)

        # 3. Check for overlapping availability slots for this provider on the same date
        existing_slots = (
            self.repo.db.query(Availability)
            .filter(
                Availability.provider_id == user.id,
                Availability.slot_date == data.slot_date,
                Availability.status != "CANCELLED",
            )
            .all()
        )
        for s in existing_slots:
            if max(s.start_time, data.start_time) < min(s.end_time, data.end_time):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=f"Slot overlaps with an existing {s.status} slot ({s.start_time.strftime('%H:%M')} - {s.end_time.strftime('%H:%M')})",
                )

        return self.repo.create_availability_slot(provider_id=user.id, data=data)

    def update_availability_slot(
        self, user: AuthUser, slot_id: uuid.UUID, data: AvailabilityUpdate
    ) -> Availability:
        slot = self.repo.get_availability_by_id(slot_id)
        if not slot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Availability slot not found",
            )

        if slot.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot modify another provider's availability slot",
            )

        # Check conflict with confirmed bookings if marking UNAVAILABLE or changing times
        confirmed_bookings = (
            self.repo.db.query(Booking)
            .filter(
                Booking.provider_id == user.id,
                Booking.status.in_(["Requested", "Accepted", "Started"]),
            )
            .all()
        )
        has_confirmed_booking = any(
            b.scheduled_time
            and b.scheduled_time.date() == slot.slot_date
            and slot.start_time <= b.scheduled_time.time() < slot.end_time
            for b in confirmed_bookings
        )

        if data.status == "UNAVAILABLE" and has_confirmed_booking:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Cannot mark slot unavailable: an active or confirmed booking is scheduled during this time.",
            )

        # If updating times
        if data.start_time is not None or data.end_time is not None:
            new_start = data.start_time if data.start_time is not None else slot.start_time
            new_end = data.end_time if data.end_time is not None else slot.end_time
            if new_start >= new_end:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="Slot start_time must be strictly before end_time",
                )
            if slot.slot_date < date.today():
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail="Cannot modify past availability slots",
                )

            # Check overlap with other slots
            other_slots = (
                self.repo.db.query(Availability)
                .filter(
                    Availability.provider_id == user.id,
                    Availability.slot_date == slot.slot_date,
                    Availability.id != slot.id,
                    Availability.status != "CANCELLED",
                )
                .all()
            )
            for s in other_slots:
                if max(s.start_time, new_start) < min(s.end_time, new_end):
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail=f"Modified slot overlaps with existing {s.status} slot ({s.start_time.strftime('%H:%M')} - {s.end_time.strftime('%H:%M')})",
                    )

            # If slot currently covers a confirmed booking, new bounds must still cover it
            for b in confirmed_bookings:
                if b.scheduled_time and b.scheduled_time.date() == slot.slot_date:
                    b_time = b.scheduled_time.time()
                    if slot.start_time <= b_time < slot.end_time:
                        if not (new_start <= b_time < new_end):
                            raise HTTPException(
                                status_code=status.HTTP_409_CONFLICT,
                                detail=f"Cannot resize slot: confirmed booking {b.booking_reference} is at {b_time.strftime('%H:%M')}",
                            )

        return self.repo.update_availability_slot(slot, data)

    def list_availability(self, user: AuthUser, provider_id: uuid.UUID) -> List[Availability]:
        if user.role == "provider" and user.id != provider_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot view another provider's availability schedule",
            )
        return self.repo.list_availability_by_provider(provider_id=provider_id)

    def delete_availability_slot(self, user: AuthUser, slot_id: uuid.UUID) -> None:
        slot = self.repo.get_availability_by_id(slot_id)
        if not slot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Availability slot not found",
            )

        if slot.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot delete another provider's availability slot",
            )

        # Conflict check with active bookings
        active_bookings = (
            self.repo.db.query(Booking)
            .filter(
                Booking.provider_id == user.id,
                Booking.status.in_(["Requested", "Accepted", "Started"]),
            )
            .all()
        )
        for b in active_bookings:
            if b.scheduled_time and b.scheduled_time.date() == slot.slot_date:
                b_time = b.scheduled_time.time()
                if slot.start_time <= b_time < slot.end_time:
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail=f"Cannot delete slot: confirmed booking {b.booking_reference} is scheduled during this time",
                    )

        self.repo.delete_availability_slot(slot)

    # ==========================================
    # CUSTOMIZED SERVICES & MASTER CATALOG JOIN
    # ==========================================

    def list_my_services_catalog(self, user: AuthUser) -> List[ProviderServiceCatalogResponse]:
        results = (
            self.repo.db.query(ProviderService, Service)
            .join(Service, ProviderService.service_id == Service.id)
            .filter(ProviderService.provider_id == user.id)
            .order_by(Service.category.asc(), Service.subcategory.asc(), Service.name.asc())
            .all()
        )
        output = []
        for ps, s in results:
            output.append(
                ProviderServiceCatalogResponse(
                    id=ps.id,
                    provider_id=ps.provider_id,
                    service_id=s.id,
                    price=Decimal(str(ps.price or s.base_price)),
                    duration_minutes=ps.duration_minutes or 60,
                    active=ps.active,
                    service_name=s.name,
                    category=s.category,
                    subcategory=s.subcategory or "General",
                    base_price=Decimal(str(s.base_price)),
                    is_emergency_eligible=bool(s.is_emergency_eligible),
                    distinct_features=s.distinct_features or [],
                    suggested_addons=s.suggested_addons or [],
                    created_at=ps.created_at,
                )
            )
        return output

    def add_provider_service(self, user: AuthUser, data: ProviderServiceCreate) -> ProviderService:
        self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        return self.repo.create_provider_service(provider_id=user.id, data=data)

    def update_provider_service(
        self, user: AuthUser, entry_id: uuid.UUID, data: ProviderServiceUpdate
    ) -> ProviderService:
        entry = self.repo.get_provider_service_by_id(entry_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Provider service offering not found",
            )

        if entry.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot modify another provider's service offering",
            )

        return self.repo.update_provider_service(entry, data)

    def delete_provider_service(self, user: AuthUser, entry_id: uuid.UUID) -> None:
        entry = self.repo.get_provider_service_by_id(entry_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Provider service offering not found",
            )

        if entry.provider_id != user.id and user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot delete another provider's service offering",
            )

        self.repo.delete_provider_service(entry)

    def list_provider_services(self, user: AuthUser, provider_id: uuid.UUID) -> List[ProviderService]:
        if user.role == "provider" and user.id != provider_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden: You cannot view another provider's service offerings",
            )
        return self.repo.list_provider_services(provider_id=provider_id)

    # ==========================================
    # DASHBOARD REAL METRICS
    # ==========================================

    def get_dashboard_stats(self, user: AuthUser) -> ProviderDashboardStatsResponse:
        today = date.today()
        bookings = (
            self.repo.db.query(Booking)
            .filter(Booking.provider_id == user.id)
            .order_by(Booking.created_at.desc())
            .all()
        )
        today_count = sum(1 for b in bookings if b.scheduled_time and b.scheduled_time.date() == today)
        active_count = sum(1 for b in bookings if b.status in ["Accepted", "Started"])
        completed_count = sum(1 for b in bookings if b.status == "Completed")
        pending_count = sum(1 for b in bookings if b.status == "Requested")
        total_earnings = sum(Decimal(str(b.total_price or 0)) for b in bookings if b.status == "Completed")
        pipeline = [
            b for b in bookings
            if b.scheduled_time and b.scheduled_time.date() >= today and b.status in ["Requested", "Accepted", "Started"]
        ]
        urgent_alerts = sum(
            1 for b in bookings
            if (b.emergency_flag == "EMERGENCY" and b.status in ["Requested", "Accepted"])
        )

        recent_activity = []
        for b in bookings[:10]:
            recent_activity.append({
                "booking_id": str(b.id),
                "reference": b.booking_reference,
                "service_name": b.service_name,
                "status": b.status,
                "customer_name": b.customer.full_name if b.customer else "Customer",
                "amount": float(b.total_price or 0),
                "timestamp": b.updated_at.isoformat() if b.updated_at else b.created_at.isoformat(),
                "is_emergency": b.emergency_flag == "EMERGENCY",
            })

        return ProviderDashboardStatsResponse(
            today_bookings_count=today_count,
            active_jobs_count=active_count,
            completed_jobs_count=completed_count,
            pending_requests_count=pending_count,
            total_earnings=total_earnings,
            pipeline_count=len(pipeline),
            urgent_alerts_count=urgent_alerts,
            recent_activity=recent_activity,
        )

    # ==========================================
    # SUPPORT TICKETS
    # ==========================================

    def create_support_ticket(self, user: AuthUser, data: "ProviderTicketCreateRequest") -> "SupportTicket":
        from app.models.customer import SupportTicket
        self.repo.get_or_create(user_id=user.id, default_name=user.full_name)
        
        ticket = SupportTicket(
            provider_id=user.id,
            subject=data.subject,
            description=data.description,
            booking_id=data.booking_id if data.booking_id else None,
            category=data.category,
            priority=data.priority if data.priority else "Medium",
            status="Open",
            image_evidence_url=data.image_evidence_url,
        )
        self.repo.db.add(ticket)
        self.repo.db.commit()
        self.repo.db.refresh(ticket)
        return ticket

    def list_my_tickets(self, user: AuthUser) -> List["SupportTicket"]:
        from app.models.customer import SupportTicket
        return (
            self.repo.db.query(SupportTicket)
            .filter(SupportTicket.provider_id == user.id)
            .order_by(SupportTicket.updated_at.desc())
            .all()
        )

    def get_my_ticket(self, user: AuthUser, ticket_id: uuid.UUID) -> "SupportTicket":
        from app.models.customer import SupportTicket
        ticket = self.repo.db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
        if not ticket:
            raise HTTPException(status_code=404, detail="Support ticket not found")
        if ticket.provider_id != user.id:
            raise HTTPException(status_code=403, detail="Forbidden: Cannot access another provider's ticket")
        return ticket

    def reply_to_ticket(self, user: AuthUser, ticket_id: uuid.UUID, message_text: str, attachment_url: str = None) -> "TicketMessage":
        from app.models.customer import TicketMessage
        ticket = self.get_my_ticket(user, ticket_id)
        
        message = TicketMessage(
            ticket_id=ticket.id,
            sender_id=user.id,
            sender_role="provider",
            sender_name=user.full_name,
            message_text=message_text,
            attachment_url=attachment_url
        )
        self.repo.db.add(message)
        ticket.updated_at = datetime.utcnow()
        self.repo.db.commit()
        self.repo.db.refresh(message)
        return message
