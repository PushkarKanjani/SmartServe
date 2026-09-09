# SmartServe — Provider Module: Build Instructions

Third role in the platform. Admin and Customer are fully built and live (see System
Context below) — Provider must slot into the same backend, same database, same design
language. This document supersedes the earlier draft; the attached
SmartServe_Admin_Provider_Customer.pdf is background/idea reference only, not a literal
spec to re-implement — this markdown is the source of truth for this build.

---

## Read first — non-negotiables

- **No schema changes without a reported reason.** Inspect the existing DB first. If a
  feature genuinely can't be represented in the current schema, stop, report the exact
  field/table gap, and wait for confirmation before migrating.
- **No fake data, ever** — no fake providers, bookings, verification results, AI
  accuracy numbers, or catalog services. Use what's already in Postgres.
- **Providers don't touch the catalog.** They select from Admin's existing services;
  they never create, rename, or price a service.
- **Backend authorization is mandatory everywhere.** Frontend route-hiding is not
  security. Every provider endpoint must check both authentication and ownership
  (changing an ID in a URL must never expose another provider's data).
- **Don't redesign Admin or Customer.** Extend the existing Admin provider-management
  area only as far as Provider needs; don't touch unrelated pages, the catalog, or
  existing UI/content.
- **AI/OCR is assistive, not authoritative.** Low-confidence or suspicious results
  route to manual Admin review — AI never auto-approves a provider.
- **Actually run it.** Build/lint/type-check passing is not "done." Every major feature
  must be traced source → API → database → running app → browser, using a real existing
  provider from Postgres, and confirmed in‑browser before it's reported as implemented.
- **Local scope only** — no Render, no GitHub push, this phase.

---

## 1. System context (what already exists — match this, don't reinvent it)

**Stack:** Backend FastAPI at `http://127.0.0.1:8000` (API under `/api/v1`) · Postgres
at `localhost:5432`, database `smartserve` · Admin at `localhost:5173` · Customer at
`localhost:5174`.

**Admin (`admin-frontend`)** — already has: JWT auth + RBAC + `ProtectedRoute` guard,
admin management, executive dashboard/analytics, 4-level catalog management
(categories → subcategories → services → 12-section service editor), provider
directory with verification workflow states (Pending/Verified/Rejected), customer
management, booking operations, support ticketing, email/communications center,
security/audit center, system settings.

**Customer (`customer-frontend`)** — already has: ivory/green landing page
(glassmorphic hero, services grid, testimonials, trust indicators), splash screen,
auth (login/register wired to backend), home dashboard (category shortcuts, search,
active booking widget, recommendations), 4-level catalog explore with filtering/sort,
service detail with multi-tier package selection + add-ons + live price calc + slot
picker + booking submission, bookings list with live status tracker, support portal,
profile management.

Both apps are React + Vite + TS + Tailwind, with modular API client layers
(`src/api`) hitting the FastAPI backend directly. **Provider must follow this same
pattern** — same stack, same API-client convention, same component structure.

---

## 2. Architecture for the Provider module

- **New frontend app**, `provider-frontend`, same stack as the other two (React + Vite
  + TS + Tailwind). Confirm a free port (5175 is the natural next one) before starting
  the dev server, rather than assuming.
- **Backend**: new routers under `/api/v1/provider/*` inside the existing FastAPI app —
  do not spin up a separate service. Reuse existing SQLAlchemy models for `providers`,
  `provider_services`, `certificates`, `availability`, `bookings`, `users`, `services`.
- **Auth**: extend the existing JWT/RBAC system with a `provider` role. Ownership
  checks (provider can only touch their own rows) live in the backend, not the
  frontend.
- **Booking system**: one shared `bookings` table and one shared state machine across
  Customer, Provider, and Admin — never a parallel provider-only booking system.
- **Document/evidence storage**: reuse whatever certificate/document architecture
  already exists for providers; don't stand up a second storage system.

---

## 3. Design language — must match Admin and Customer exactly

- **Palette**: ivory base `#FAF7F0` / `#F2EDE1`, warm ink `#1F2A1E`, primary forest
  green `#2F5233`, sage accent `#7A9E6E`, gold highlight `#C9A15A` (sparing use). Same
  tokens Customer already ships — don't introduce a new palette for Provider.
- **Components**: reuse the same sources already in play (react-bits, Aceternity UI,
  Magic UI, hover.dev) and the same card/button/nav patterns visible in Admin and
  Customer — don't default to a generic dashboard template or corporate-blue theme.
- **Branding**: reuse the existing "S" mark and splash/loader treatment; Provider
  should read as the same product, not a bolted-on tool.
- **Layout convention**: mirror Customer's sidebar nav pattern (Home/Explore/Bookings/
  Support/Profile-style) adapted for Provider's own sections — don't invent a
  different navigation paradigm.

---

## 4. Phased implementation plan

### Phase 1 — Inspect before building (read-only)
Inspect current Postgres schema/data for `providers`, `provider_services`,
`certificates`, `availability`, `bookings`, `users`, `services`, plus any existing
provider routes/models/frontend/auth already in the repo. Report: provider count,
existing provider IDs, provider↔user relationship, verification status fields,
table structures for each of the above, existing provider routes, existing Admin
provider-management functionality. **Capture before-counts for every table** — these
are the baseline for the Phase 12 regression check. Make no writes in this phase.

### Phase 2 — Provider authentication & RBAC
Authenticated login, JWT, provider role, ownership checks on every endpoint. A
provider must only ever reach their own profile, services, documents, availability,
bookings, support tickets, earnings, and the customer info needed for their assigned
jobs — verified server-side, tested by literally changing IDs in the URL.

### Phase 3 — Provider onboarding (new providers only — existing ones are preserved as-is)
1. **Personal info** — name, contact, photo, experience, skills, and a genuine
   "Skills & Professional Description" free-text field (no placeholder/default text).
2. **Identity/KYC** — Aadhaar, PAN, KYC docs, certificates, police verification where
   applicable, using the existing document architecture.
3. **NDA/undertaking** — upload + signed status. Uploading a file ≠ verified.
4. **Service selection** — up to 3 services chosen from the existing Admin catalog
   only; no new service names, no catalog duplication.
5. **Category-aware skill evidence** — the required evidence type depends on the
   category (e.g. electrical → repair evidence/video; teaching → degrees/certs;
   music → performance video or portfolio link). Never reuse one category's
   requirement for another.
6. **Review & submit** — full summary shown, then status becomes `Pending`. Provider
   cannot operate or self-approve.

### Phase 4 — Verification status & Admin verification UI
Support `Pending / Verified / Rejected / Suspended`, with a return-for-correction path
instead of deletion when documents are missing/invalid. Extend the *existing* Admin
provider area (don't redesign it) to show: profile, selected services, documents (with
metadata, upload time, status), skill evidence, OCR/AI results, and admin actions
(Approve / Reject / Request replacement / Suspend / Reactivate) with an audit trail.

### Phase 5 — OCR + AI-assistive verification
PaddleOCR primary, EasyOCR fallback. Extract name, document number, certificate
number, issue/expiry dates; flag blurry, expired, duplicate, or name-mismatched
documents. AI/ML layer produces confidence + risk/mismatch signals only — routes
low-confidence cases to manual Admin review. If no properly trained model exists,
implement a transparent rule-based risk score and label it as such — don't fabricate
accuracy figures or pretend a model exists.

### Phase 6 — Customer → Provider booking integration
Customer selects an existing active catalog service → backend validates it → backend
determines eligible provider(s) based on approval status, service association,
availability, and requested slot → booking is written to the shared `bookings` table →
eligible provider sees the request. No mock booking objects anywhere in this path.

### Phase 7 — Booking state machine
`Requested → Accepted/Rejected`, `Accepted → Started`, `Started → Completed`,
`Cancelled/Expired` as a terminal read-only state. Enforce transitions strictly
(no Requested→Completed, no Rejected→Started, no restarting Completed, no accepting
another provider's booking) — validated server-side.

### Phase 8 — Emergency vs. customer-selectable services
Selectable services: customer sees eligible verified providers (name, skills, rating,
experience, availability) and picks one. Emergency services: customer does **not**
choose — the system assigns based on eligibility/availability. Drive this off the
existing service data's emergency-eligibility field — don't hardcode a list of
"emergency" service names.

### Phase 9 — Provider workspace
- **Services** ("My Services"): only the provider's own services, grouped
  Category → Subcategory → Service, showing name/category/subcategory/duration/Admin
  base price/emergency eligibility/existing add-ons — pulled from the master catalog,
  never generated.
- **Availability**: day/week calendar; add/update/remove/mark-unavailable; validate no
  overlaps, end>start, no past slots, no conflicts with confirmed bookings, ownership
  enforced. Confirmed bookings are never silently overwritten.
- **Dashboard**: today's bookings, active/completed jobs, pending requests, earnings,
  pipeline, recent activity, urgent alerts — all real backend data, nothing hardcoded.
- **Profile & trust**: photo, summary, experience, skills, categories/services,
  contact, coverage, rating, completed jobs, verification status. Rating/completed
  jobs are read-only; verification decisions are Admin-only.
- **Support**: create ticket, category, optional booking link, message thread, status
  (Open/In Progress/Waiting for Provider/Resolved/Closed), own tickets only.

### Phase 10 — Admin visibility extensions
Extend the existing Admin provider/operations area (not a redesign) so Admin can see,
per provider: verification status and approved services; per slot: date, start, end,
status, occupying booking, owning provider; per booking: ID, customer, provider,
service, requested slot, status, emergency flag. Admin needs full visibility into who's
available, who's booked, and what's filled — without gaining edit rights over
provider-owned records beyond verification actions.

### Phase 11 — Customer-side availability constraints
Customer booking UI must never expose an unavailable, unapproved, inactive, conflicting,
or past slot/provider. Selectable services show eligible provider + real available
slots; emergency services auto-offer an eligible provider per availability.

### Phase 12 — RBAC audit across all three roles
Confirm server-side, per role:
- Customer → own profile/bookings/support/feedback/payments only.
- Provider → own profile/services/availability/assigned bookings/earnings + only the
  customer info required for assigned work.
- Admin → provider management/verification/bookings/reports/system analytics.
No role reaches another role's protected data by URL manipulation.

### Phase 13 — Database regression check
Compare before/after counts (from Phase 1) for providers, services, provider_services,
certificates, availability, bookings, customers, users. Catalog and existing
provider/customer records must be provably unchanged.

### Phase 14 — Real browser test pass
Run backend, admin, customer, and provider together in a real browser using an
existing provider from Postgres:
1. Provider login
2. Provider sees only their own services
3. Provider sees their own profile
4. Provider sees availability
5. Customer creates a real booking for an eligible service
6. Provider sees that actual request
7. Provider accepts
8. Customer sees accepted/provider info
9. Provider starts job
10. Customer sees Started
11. Provider completes job
12. Customer sees Completed
13. Admin sees the same booking/provider/customer state
14. Provider cannot access another provider's data via URL ID changes
15. Customer cannot reach provider-only endpoints
16. Provider cannot modify the Admin catalog
17. Provider availability conflicts are rejected
18. Emergency service follows the auto-assignment rule
19. Selectable service allows provider choice where appropriate

---

## 5. Final report — required structure

1. Existing provider architecture discovered
2. Existing provider records used (not recreated)
3. Files changed
4. APIs changed/added
5. Onboarding implementation
6. Verification implementation
7. OCR implementation
8. AI/risk implementation
9. Customer→Provider booking integration
10. Provider→Customer status sync
11. Admin provider-verification UI
12. Admin booking/slot visibility
13. Provider services
14. Provider availability
15. Provider support
16. RBAC test results
17. Browser test results (all 19)
18. Database before/after comparison
19. Anything blocked by existing schema, and why
20. Exact remaining configuration needed

Don't report a feature as "implemented" because files exist — trace it through to a
working browser test, or report it as incomplete and say why.
