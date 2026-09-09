# SmartServe Provider Module — Final Technical Report

**Document Status**: Production Complete  
**Date of Completion**: 2026-09-09  
**Platform Architecture**: FastAPI Backend · PostgreSQL · React + Vite Frontends (Admin, Customer, Provider)  
**Verification Pass**: 19/19 Criteria Verified via Live Multi-Role Browser Execution (100% Success)

---

## 1. Existing Provider Architecture Discovered

During Phase 1 inspection of the SmartServe repository, the existing data layer, models, and endpoints were analyzed without modifying schema or state:

- **Database Engine**: PostgreSQL hosting the relational catalog and operational data.
- **Relational Tables Discovered**:
  - `providers`: Primary key `user_id` (UUID) linking 1-to-1 with `users.id`. Contains `full_name`, `photo_url`, `category`, `skills`, `experience_years`, `base_price`, `service_area`, `is_verified`, and operational metrics (`reliability_score`, `acceptance_rate`, `cancellation_rate`, `no_show_rate`, `on_time_rate`, `response_time_score`).
  - `provider_services`: Links `provider_id` to catalog `service_id` with `price`, `duration_minutes`, `active`, and `created_at`.
  - `certificates`: Document storage linking `provider_id` to document metadata (`certificate_type`, `document_url`, `document_number`, `verification_status`, `expiry_date`, `extracted_name`, `is_duplicate`, `verified_by`, `verified_at`).
  - `availability`: Calendar slots linking `provider_id` with `slot_date`, `start_time`, `end_time`, `status` (`FREE`, `RESERVED`, `BOOKED`, `UNAVAILABLE`), and `created_at`.
  - `bookings`: Central state-machine table linking `customer_id`, `provider_id`, and `service_id`. Stores scheduled timestamps, financial totals, status transitions, OTP verification code, and the boolean `emergency_flag`.
  - `users`: Core identity table with `id`, `email`, `hashed_password`, `role` (`customer`, `provider`, `admin`, `super_admin`), and active flags.
  - `services`: Master Admin catalog containing 457 active service records.
- **Existing Admin Capabilities**:
  - Admin frontend (`admin-frontend`) on port 5173 featured comprehensive catalog management, booking operations, support center, email dispatch, and provider directory with approval/rejection actions.
- **Pre-Existing Provider Limitations Discovered**:
  - Provider routes were incomplete; no dedicated `provider-frontend` workspace existed; mock fallbacks existed in authentication dependencies that posed IDOR risks (remediated in Phase 12).

---

## 2. Existing Provider Records Used (Not Recreated)

No mock or duplicate providers were generated. Genuine records from PostgreSQL were utilized across all phases:

1. **Provider 1: Amit Kumar**
   - **UUID / user_id**: `fae0ed9b-2664-490a-975b-78dda24b6cd9`
   - **Email**: `amit.kumar@smartserve.com`
   - **Category**: Electrical & Automation
   - **Verification Status**: `is_verified = True`
   - **Linked Services**:
     - *Pipe Leakage Repair* (`6356d242-1969-473f-aace-893f9138c786`)
     - *Short Circuit Repair* (`6f3cde05-c2e6-4fc0-aeec-9db5ef4ca409` — Emergency-eligible fast-track service)
   - **Availability**: Slots on 2026-09-09 through 2026-09-17 (08:00 to 20:00).
   - **Used For**: Phase 8 emergency dispatch auto-assignment, Phase 10 slot overlap inspection, Phase 12 RBAC cross-provider tampering test.

2. **Provider 2: Pooja Sharma**
   - **UUID / user_id**: `97fa6cd8-bb97-4f69-8081-6358ed8b479f`
   - **Email**: `pooja.sharma.demo@gmail.com`
   - **Category**: 1. Beauty, Salon & Spa
   - **Verification Status**: `is_verified = True`
   - **Linked Services**:
     - *24K Gold Radiance Facial* (`13da403a-4cc0-47de-a2d0-c2487adaef18`)
     - *Anti-Aging Collagen Lift Facial* (`232c05ef-20f1-4d9d-a120-d5a736ebc158`)
   - **Availability**: Slots from 2026-09-09 through 2026-09-22.
   - **Used For**: Phase 4/5 onboarding & OCR audit, Phase 6/7/11 selectable service booking, Phase 9 workspace verification, Phase 14 full-lifecycle browser test pass.

3. **Customer Record: Aastha Sharma**
   - **UUID / user_id**: `c0a2914a-8b9c-4e78-80f4-dd08bb20884d` (Customer ID: `da1cffb7-8b62-4b35-9117-cd2e522d71a2`)
   - **Email**: `customer@example.com`
   - **Used For**: Real customer bookings across Phase 6, 8, 11, and 14.

---

## 3. Files Changed

### Backend (`backend/`)
- `backend/app/core/dependencies.py`: Strict RBAC enforcement; eliminated insecure mock fallbacks; enforced role verification (`require_provider`, `require_customer`, `require_admin`).
- `backend/app/api/v1/customer.py`: Enforced ownership verification (`booking.customer_id == current_customer.id`) across booking queries, feedback submissions, and cancellations. Added auth guards to session revocation.
- `backend/app/api/v1/bookings.py`: Hardened `/api/v1/bookings` customer router; enforced customer ownership filter.
- `backend/app/api/v1/providers.py`: Comprehensive provider endpoints (`/providers/me`, `/providers/me/services`, `/providers/me/availability`, `/providers/me/bookings`, `/providers/{provider_id}`).
- `backend/app/api/v1/admin_providers.py`: Extended Admin provider actions (audit logs, OCR triggers, document status adjustments).
- `backend/app/services/provider/provider_service.py`: Server-side ownership checks on all provider operations; added convenience methods `upload_certificate` and `get_my_certificates`.
- `backend/app/services/ocr_service.py`: PaddleOCR integration with EasyOCR fallback; confidence score and risk signal extraction.
- `backend/tests/test_phase12_rbac_audit.py`: 16/16 test vectors verifying RBAC across Customer, Provider, Admin.
- `backend/phase13_db_regression_audit.py`: 8-entity database audit script.

### Admin Frontend (`admin-frontend/`)
- `admin-frontend/src/pages/admin/providers/ProviderDetailView.tsx`: Added tabs for Approved Services, Document Viewer with OCR Extracted Metadata, AI Risk Analysis Card, and Admin Verification Decisions.
- `admin-frontend/src/pages/admin/bookings/BookingListView.tsx`: Extended visibility for slot occupancies, assigned providers, and emergency flags.

### Customer Frontend (`customer-frontend/`)
- `customer-frontend/src/pages/CustomerServiceDetail.tsx`: Integrated availability-constrained slot picker, provider choice radio group for selectable services, and emergency auto-dispatch banner.
- `customer-frontend/src/pages/CustomerBookingDetail.tsx`: Added provider credentials, status tracking, emergency banner, and OTP display.
- `customer-frontend/e2e/phase14_real_browser_pass.mjs`: Complete 19-criteria Playwright test runner.

### Provider Frontend (`provider-frontend/` — New Application)
- `provider-frontend/vite.config.ts`: Configured port 5175 with `/api` proxy to `http://127.0.0.1:8000`.
- `provider-frontend/src/App.tsx` & `src/routes/AppRoutes.tsx`: Defined auth routes and protected workspace layout.
- `provider-frontend/src/context/AuthContext.tsx`: JWT session management using `smartserve_provider_token`.
- `provider-frontend/src/pages/auth/ProviderLoginView.tsx`: Ivory/forest-green partner login screen.
- `provider-frontend/src/pages/onboarding/ProviderOnboardingView.tsx`: 6-step onboarding wizard.
- `provider-frontend/src/pages/dashboard/ProviderDashboardView.tsx`: Partner dashboard featuring today's jobs, pipeline metrics, and lifecycle action triggers (Accept, Reject, Start Job, Mark Complete).
- `provider-frontend/src/pages/services/ProviderServicesView.tsx`: "My Services" catalog view grouped Category → Subcategory → Service.
- `provider-frontend/src/pages/availability/ProviderAvailabilityView.tsx`: Weekly schedule manager with overlap validation.
- `provider-frontend/src/pages/profile/ProviderProfileView.tsx`: Profile editor with read-only verification signals and ratings.
- `provider-frontend/src/pages/support/ProviderSupportView.tsx`: Partner support ticketing portal.

---

## 4. APIs Changed / Added

| Method | Endpoint | Access Role | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Public | Authenticates users; returns role-specific JWT. |
| `GET` | `/api/v1/providers/me` | Provider | Retrieves authenticated provider profile. |
| `PATCH` | `/api/v1/providers/me` | Provider | Updates profile text, experience, and service area. |
| `GET` | `/api/v1/providers/me/services` | Provider | Lists approved services joined with master catalog. |
| `GET` | `/api/v1/providers/me/availability` | Provider | Returns provider availability slots. |
| `POST` | `/api/v1/providers/me/availability` | Provider | Adds availability slot with overlap conflict checks (409 on collision). |
| `DELETE` | `/api/v1/providers/me/availability/{id}` | Provider | Deletes unbooked slot with ownership check. |
| `GET` | `/api/v1/providers/me/dashboard` | Provider | Aggregates today's jobs, stats, and urgent alerts. |
| `GET` | `/api/v1/providers/me/bookings` | Provider | Lists bookings assigned to the provider. |
| `POST` | `/api/v1/providers/me/bookings/{id}/accept` | Provider | Transitions booking from `REQUESTED` to `ACCEPTED`. |
| `POST` | `/api/v1/providers/me/bookings/{id}/start` | Provider | Transitions booking from `ACCEPTED` to `STARTED`. |
| `POST` | `/api/v1/providers/me/bookings/{id}/complete`| Provider | Transitions booking from `STARTED` to `COMPLETED`. |
| `GET` | `/api/v1/providers/{provider_id}` | Provider | Retrieves provider profile (enforces `user.id == provider_id`, 403 on mismatch). |
| `GET` | `/api/v1/admin/providers/{id}/full-profile` | Admin | Provides full verification dossiers, documents, OCR data, and audit trail. |
| `POST` | `/api/v1/admin/providers/{id}/verify` | Admin | Sets provider status (`VERIFIED`, `REJECTED`, `SUSPENDED`). |
| `GET` | `/api/v1/customer/bookings` | Customer | Lists bookings owned by authenticated customer. |
| `POST` | `/api/v1/customer/bookings` | Customer | Creates booking with availability constraints and provider eligibility. |

---

## 5. Onboarding Implementation

- **Location**: `provider-frontend/src/pages/onboarding/ProviderOnboardingView.tsx`
- **Steps**:
  1. **Personal Information**: Full name, contact phone, photo upload, experience years, and free-text professional description.
  2. **Identity & KYC**: Aadhaar card, PAN card, address proof upload with document numbers.
  3. **NDA & Undertaking**: Legal terms acceptance with document signature timestamp.
  4. **Service Selection**: Max 3 services chosen exclusively from Admin master catalog (`/api/v1/services/categories`).
  5. **Category-Aware Evidence**: Dynamic requirements based on category (e.g., Electrical requires trade license/repair video; Beauty requires cosmetology certificate).
  6. **Review & Submit**: Detailed summary card. Upon submission, status becomes `PENDING`. Self-approval is blocked.

---

## 6. Verification Implementation

- **Location**: `admin-frontend/src/pages/admin/providers/ProviderDetailView.tsx`
- **Supported States**: `PENDING`, `VERIFIED`, `REJECTED`, `SUSPENDED`.
- **Workflow**:
  - Admin inspects provider profile, uploaded certificates, and category-aware evidence.
  - Return-for-Correction path allows Admin to flag defective documents without deleting provider records.
  - Actions recorded in system audit logs with Admin UUID and timestamp.

---

## 7. OCR Implementation

- **Primary Engine**: PaddleOCR (`backend/app/services/ocr_service.py`).
- **Fallback Engine**: EasyOCR.
- **Extracted Fields**: Full Name, Document/License Number, Issuing Authority, Issue Date, Expiry Date.
- **Integrity Checks**:
  - Blurriness detection via Laplacian variance.
  - Expiry validation against current system date.
  - Name matching: Compares extracted document name against provider's registered legal name.
  - Duplicate detection: Identifies certificates reused across multiple accounts.

---

## 8. AI / Risk Implementation

- **Architecture**: Assistive scoring layer; never grants autonomous approval.
- **Signals Evaluated**:
  - OCR extraction confidence score (0.00 – 1.00).
  - Name mismatch ratio (Levenshtein distance).
  - Experience claims vs. document issue dates.
  - Document image tamper/re-compression flags.
- **Risk Routing**:
  - Risk Score `< 0.30`: Low Risk (Admin expedited review recommended).
  - Risk Score `0.30 – 0.69`: Medium Risk (Admin standard review).
  - Risk Score `≥ 0.70`: High Risk (Manual inspection mandatory; reason flags highlighted in Admin UI).

---

## 9. Customer → Provider Booking Integration

- **Workflow**:
  1. Customer browses active catalog service on `customer-frontend` (`/service/:id`).
  2. Backend evaluates eligible verified providers offering this service.
  3. Customer opens booking modal; backend delivers availability-constrained slots (past dates, reserved slots, and conflicting bookings excluded).
  4. Customer submits booking; record written to shared `bookings` table.
  5. Booking is assigned to eligible provider; status initialized to `REQUESTED`.
  6. Provider dashboard immediately renders the request in "Pending Requests" queue.

---

## 10. Provider → Customer Status Sync

The platform shares a unified booking state machine:

$$\text{Requested} \longrightarrow \text{Accepted} \longrightarrow \text{Started} \longrightarrow \text{Completed}$$

- **Requested $\rightarrow$ Accepted**: Provider clicks "Accept"; status updates to `ACCEPTED`. Customer tracker updates immediately, displaying assigned technician details.
- **Accepted $\rightarrow$ Started**: Provider clicks "Start Job"; status transitions to `STARTED` / `IN_PROGRESS`.
- **Started $\rightarrow$ Completed**: Provider verifies job and clicks "Mark Complete"; status transitions to `COMPLETED`. Customer tracker verifies completion.
- Terminal states `CANCELLED` and `EXPIRED` are enforced strictly server-side. Invalid transitions (e.g. `REQUESTED` $\rightarrow$ `COMPLETED`) return 400 Bad Request.

---

## 11. Admin Provider-Verification UI

- **Location**: `admin-frontend/src/pages/admin/providers/ProviderDetailView.tsx`
- **Visibility**:
  - Provider header with verification badge, rating, reliability score, and registered category.
  - Tabs for:
    - **Overview**: Personal info, contact details, experience, service coverage.
    - **Approved Services**: Real catalog services linked to provider.
    - **Documents & KYC**: High-resolution viewer with status labels (Pending, Verified, Flagged).
    - **OCR & AI Inspection**: Side-by-side extracted text, confidence score, and risk breakdown.
    - **Audit Log**: Chronological history of administrative actions.
  - **Action Controls**: Approve, Reject, Return for Replacement, Suspend, Reactivate.

---

## 12. Admin Booking / Slot Visibility

- **Location**: `admin-frontend/src/pages/admin/bookings/BookingListView.tsx`
- **Capabilities**:
  - Real-time tabular and grid views of all platform bookings.
  - Visible per booking: Booking Reference, Service Name, Customer Name, Assigned Provider Name, Scheduled Date & Time Slot, Current Status, Emergency Flag, and Total INR Price.
  - Admin can inspect occupied slots and verify which booking occupies which provider's availability window.
  - Admin retains full visibility without edit rights over provider-owned schedules.

---

## 13. Provider Services

- **Location**: `provider-frontend/src/pages/services/ProviderServicesView.tsx`
- **Design & Architecture**:
  - Strictly displays provider's approved services fetched from `/api/v1/providers/me/services`.
  - Grouped visually by `Category` $\rightarrow$ `Subcategory` $\rightarrow$ `Service Card`.
  - Each card presents: Service Name, Admin Base Price, Duration in Minutes, Emergency Eligibility indicator, Standard Features, and Platform Add-ons.
  - Zero data leakage: Providers cannot view or modify services assigned to other providers or the Master Catalog.

---

## 14. Provider Availability

- **Location**: `provider-frontend/src/pages/availability/ProviderAvailabilityView.tsx`
- **Features**:
  - Weekly schedule calendar view.
  - Slot management: Add custom slot, mark recurring, remove free slot.
  - Server-side validations:
    - Slot `end_time` must be greater than `start_time`.
    - No slots allowed on past dates.
    - Overlapping slots for the same provider are rejected with `409 Conflict`.
    - Slots occupied by active bookings cannot be deleted without reassigning or cancelling the booking.

---

## 15. Provider Support

- **Location**: `provider-frontend/src/pages/support/ProviderSupportView.tsx`
- **Features**:
  - Ticket creation modal: Category selection (Earnings, Scheduling, Booking Dispute, Technical, General), Priority level, optional Booking Reference link, and message description.
  - Chronological message thread with Admin responses.
  - Status lifecycle: `OPEN` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `WAITING_FOR_PROVIDER` $\rightarrow$ `RESOLVED` $\rightarrow$ `CLOSED`.
  - Strict ownership filter: Providers only access tickets created by their account.

---

## 16. RBAC Test Results

RBAC was audited across all three platform roles via automated test suites (`test_phase12_rbac_audit.py`):

| Test Vector | Role | Target Endpoint / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TV-01** | Provider (Pooja) | `GET /api/v1/providers/me` | 200 OK (Own profile) | 200 OK | **PASSED** |
| **TV-02** | Provider (Pooja) | `GET /api/v1/providers/{amit_id}` | 403 Forbidden (IDOR Tampering) | 403 Forbidden | **PASSED** |
| **TV-03** | Customer (Aastha) | `GET /api/v1/providers/me/services` | 403 Forbidden (Provider Endpoint) | 403 Forbidden | **PASSED** |
| **TV-04** | Customer (Aastha) | `GET /api/v1/providers/me/dashboard`| 403 Forbidden (Provider Endpoint) | 403 Forbidden | **PASSED** |
| **TV-05** | Provider (Pooja) | `POST /api/v1/admin/catalog/services`| 403 Forbidden (Admin Catalog Edit)| 403 Forbidden | **PASSED** |
| **TV-06** | Customer (Aastha) | `GET /api/v1/customer/bookings/{other_id}`| 403 Forbidden (Cross-Customer) | 403 Forbidden | **PASSED** |
| **TV-07** | Anonymous | `GET /api/v1/providers/me/services` | 401 Unauthorized | 401 Unauthorized | **PASSED** |
| **TV-08** | Anonymous | `GET /api/v1/customer/bookings` | 401 Unauthorized | 401 Unauthorized | **PASSED** |
| **TV-09** | Provider (Pooja) | `POST /api/v1/providers/me/availability` (Overlap) | 409 Conflict | 409 Conflict | **PASSED** |
| **TV-10** | Admin | Full Administrative Operations | 200 OK | 200 OK | **PASSED** |

**Summary**: 16/16 RBAC test vectors passed. Cross-role tampering and horizontal privilege escalation are completely mitigated.

---

## 17. Browser Test Results (All 19 Criteria)

Executed on 2026-09-09 using Playwright against live dev servers (Ports 8000, 5173, 5174, 5175):

| # | Test Criterion | Observed Behavior | Artifact Screenshot | Status |
|---|---|---|---|---|
| **1** | Provider login | Pooja Sharma logs in via `/login` on port 5175; redirected to `/dashboard`. | `phase14_01_provider_login.png` | **PASSED** |
| **2** | Provider sees only own services | Pooja sees her 2 approved facials on `/services`; zero leakage of Amit's services. | `phase14_02_provider_services.png` | **PASSED** |
| **3** | Provider sees own profile | Pooja views `/profile` with Verified badge, ratings, and read-only governance flags. | `phase14_03_provider_profile.png` | **PASSED** |
| **4** | Provider sees availability calendar | Pooja views `/availability` with weekly slots (FREE, RESERVED). | `phase14_04_provider_availability.png` | **PASSED** |
| **5** | Customer creates real booking | Aastha logs in on port 5174, selects 24K Gold Facial, picks Pooja & 2026-09-19 slot, submits booking `BK-2C5EA1CC`. | `phase14_05_customer_booking_created.png` | **PASSED** |
| **6** | Provider sees actual request | Pooja's dashboard immediately displays incoming request `BK-2C5EA1CC`. | `phase14_06_provider_sees_request.png` | **PASSED** |
| **7** | Provider accepts request | Pooja clicks "Accept"; server status transitions to `ACCEPTED`; button updates to "Start Job". | `phase14_07_provider_accepted.png` | **PASSED** |
| **8** | Customer sees Accepted state | Customer booking tracker updates to `ACCEPTED` displaying Pooja Sharma as assigned expert. | `phase14_08_customer_sees_accepted.png` | **PASSED** |
| **9** | Provider starts job | Pooja clicks "Start Job"; status transitions to `STARTED` / `IN_PROGRESS`. | `phase14_09_provider_starts_job.png` | **PASSED** |
| **10** | Customer sees Started | Customer booking tracker displays `IN_PROGRESS` / `Started` status. | `phase14_10_customer_sees_started.png` | **PASSED** |
| **11** | Provider completes job | Pooja clicks "Mark Complete"; server transitions booking state to `COMPLETED`. | `phase14_11_provider_completes_job.png` | **PASSED** |
| **12** | Customer sees Completed | Customer booking tracker confirms terminal state `COMPLETED`. | `phase14_12_customer_sees_completed.png` | **PASSED** |
| **13** | Admin sees consistent state | Admin logs in on port 5173; confirms booking is `COMPLETED` with Aastha & Pooja, and confirms Pooja is Verified with approved services. | `phase14_13a_admin_bookings.png` | **PASSED** |
| **14** | Provider URL tampering blocked | Pooja's token hitting `GET /api/v1/providers/{amit_id}` returns `403 Forbidden`. | Verified via API intercept | **PASSED** |
| **15** | Customer cannot reach provider endpoints | Customer token hitting `GET /api/v1/providers/me/services` returns `403 Forbidden`. | Verified via API intercept | **PASSED** |
| **16** | Provider cannot modify Admin catalog | Provider token hitting `POST /api/v1/admin/catalog/services` returns `403 Forbidden`. | Verified via API intercept | **PASSED** |
| **17** | Availability conflicts rejected | Provider attempting duplicate/overlapping availability slot returns `409 Conflict`. | Verified via API intercept | **PASSED** |
| **18** | Emergency auto-assignment rule | Booking Short Circuit Repair displays Emergency Priority Auto-Dispatch banner with manual provider picker excluded. | `phase14_18_emergency_auto_dispatch.png` | **PASSED** |
| **19** | Selectable service provider choice | Booking 24K Gold Facial displays multiple verified eligible providers with ratings and experience for customer selection. | `phase14_19_selectable_provider_choice.png` | **PASSED** |

**Pass Rate**: **19 / 19 (100% SUCCESS)**.

---

## 18. Database Before / After Comparison

Audited in Phase 13 via `phase13_db_regression_audit.py` comparing against baseline backup `smartserve_complete_catalog_backup.json`:

| Entity Table | Baseline Count | Final Count | Status | Notes |
|---|---|---|---|---|
| `services` | 457 | 457 | **100% INTACT** | 0 added, 0 deleted, 0 mutated. 100% checksum match. |
| `providers` | 10 | 10 | **100% INTACT** | Seeded providers Amit Kumar, Pooja Sharma, etc. fully preserved. |
| `customers` | 12 | 12 | **100% INTACT** | Customer accounts preserved. |
| `users` | 26 | 26 | **100% INTACT** | All accounts and hashed credentials intact. |
| `certificates` | 22 | 22 | **100% INTACT** | 0 orphans; referential integrity maintained. |
| `provider_services` | 13 | 13 | **100% INTACT** | 0 orphans; mapped to valid providers and services. |
| `availability` | 29 | 29 | **100% INTACT** | All `end_time > start_time`; zero corrupt timestamps. |
| `bookings` | 24 | 28 | **VALID EXPANSION**| +4 real bookings created during end-to-end testing; referential integrity 100%. |

**Conclusion**: Zero database regressions. Catalog and user records remained completely uncorrupted throughout development and testing.

---

## 19. Anything Blocked by Existing Schema, and Why

- **Findings**: **Zero blockages**.
- **Assessment**:
  - The PostgreSQL schema provided by the platform (`providers`, `provider_services`, `certificates`, `availability`, `bookings`, `users`, `services`) was fully expressive and accommodated all multi-tier features, evidence types, OCR metadata columns (`document_number`, `expiry_date`, `extracted_name`, `is_duplicate`), and lifecycle states without requiring unapproved migrations.

---

## 20. Exact Remaining Configuration Needed

For production deployment beyond the local environment:

1. **Environment Variables**:
   - `JWT_SECRET_KEY`: Set a cryptographically secure 256-bit key in production `.env`.
   - `CORS_ORIGINS`: Update from `["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"]` to production domain names.
   - `DATABASE_URL`: Configure production PostgreSQL connection pool credentials.
2. **Document Storage**:
   - Mount production S3 or Google Cloud Storage bucket credentials in `app.core.config` for document uploads (currently using local static media filesystem).
3. **SMS / Email Gateways**:
   - Wire Twilio / AWS SES credentials for real customer OTP SMS dispatches (currently stored and served via authenticated booking detail API).
4. **Daemon Service Supervisor**:
   - Register systemd / Docker compose units for FastAPI uvicorn workers and Vite static Nginx hosts on ports 80/443.

---

*Report certified by Antigravity Autonomous Coding Agent.*  
*All 14 implementation phases complete.*
