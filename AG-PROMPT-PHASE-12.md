# AG — Phase 12 Execution Prompt
## "Customer ↔ Backend ↔ Admin — full vertical slice, pushed to GitHub"

> **Mission:** Take the customer-frontend from "demo-ready with mocks" to "fully wired to a real FastAPI customer backend, observed by the existing admin dashboard, all changes pushed to GitHub via proper branching."
>
> **Owner constraints:** Pushkar and Aastha are the human owners. AG does the implementation; humans review the PRs. Do not push to `main` directly — go through PRs.
>
> **Hard isolation rule:** No changes to `admin-frontend/`, `mobile/`, or `backend/alembic/versions/*` (existing migrations) without an explicit `// bridge:` commit message and a line item in the hand-off report.

---

## 0. Read first (in this order, end-to-end)

1. `customer-frontend-INSTRUCTIONS.md` — the original spec.
2. `customer-frontend/HANDOFF.md` — what's actually built.
3. `customer-frontend/README.md` — what runs today.
4. `customer-frontend/INTEGRATION.md` — if it exists from Phase 11, the Aastha-facing contract.
5. `customer-frontend/INTEGRATION_CHECKLIST.md` — if it exists.
6. **Skim (don't modify) the existing backend:**
   - `backend/app/main.py` — see how routers are mounted.
   - `backend/app/api/v1/router.py` — see the router list and the URL collision (`customer_bookings_router` at `/bookings` not `/customer/bookings`).
   - `backend/app/api/v1/auth.py` — the admin JWT pattern. Mirror it for customer.
   - `backend/app/api/v1/customers.py` — admin-side customer list/flag. Do not touch; this is admin-only.
   - `backend/app/api/v1/bookings.py` — has both `router` (admin) and `customer_bookings_router` (customer). You'll **move** the customer one to a new file at the right prefix.
   - `backend/app/models/{user,customer,booking,service,feedback,support,provider}.py` — the data model you'll work with.
   - `backend/app/core/security.py` — `create_access_token`, `verify_password`, `hash_password`. Mirror for customer.
   - `backend/app/core/dependencies.py` — `get_current_user`, `require_admin`, `require_permission`. Add `get_current_customer`.
   - `backend/alembic/versions/` — DO NOT modify existing migrations; add a new one if you need schema changes.
7. **Skim the existing admin-frontend API layer** to confirm what the admin already pulls (it already lists customers, bookings, support tickets — verify this still works after your changes).

---

## 1. Pre-flight checklist (verify before doing anything)

Tick every box. If any fails, stop and ask the user.

- [ ] **Working directory:** `C:\MyDrive\SEM-7\BigData\SmartServe` (or wherever the repo lives on the runner).
- [ ] **Git is initialized and clean:** `git status` shows no uncommitted changes. If there are, `git stash` them and tell the user.
- [ ] **Remote configured:** `git remote -v` shows the GitHub URL (`https://github.com/PushkarKanjani/SmartServe.git`).
- [ ] **Auth available:** either `gh auth status` succeeds, OR a GitHub PAT is in `GITHUB_TOKEN` env, OR SSH works (`ssh -T git@github.com`). If none, **stop and ask** — you cannot push without credentials.
- [ ] **Node 18+** installed (`node --version`).
- [ ] **Python 3.11+** installed (`python --version`).
- [ ] **Backend dependencies** installable: `cd backend && pip install -r requirements.txt` succeeds.
- [ ] **Customer-frontend dependencies** installable: `cd customer-frontend && npm install` succeeds.
- [ ] **Customer-frontend builds clean:** `cd customer-frontend && npm run typecheck && npm run build` both green.
- [ ] **Live Render backend** is reachable: `curl -sI https://smartserve-backend-tr3p.onrender.com/api/v1/health` returns a response (even 404 means it loaded).

If the live backend isn't reachable, you cannot do real integration testing — you'll have to run a local backend. That's fine, document it.

---

## 2. Git branching strategy (use exactly this)

```
main                          ← protected, only merges from release/*
└── develop                   ← integration branch, all features merge here
    ├── feat/customer-backend-routes       ← Phase 1
    ├── feat/customer-frontend-integration ← Phase 2
    ├── feat/admin-customer-feedback-view  ← Phase 3
    ├── chore/integration-tests-and-docs   ← Phase 4
    └── release/v1.0-customer-frontend     ← Phase 6 (final release PR)
```

**Branch rules:**
- `main` is protected. You never push to it directly. The user merges your release PR.
- `develop` is the integration branch. All features merge into it via PR.
- Each phase works on its own branch. When the phase is done, open a PR from `feat/...` → `develop`.
- Commit messages use **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- Every PR description includes a one-paragraph "what" and a "how to test" section.

**Setup commands (run once at start of Phase 1):**
```bash
cd SmartServe
git checkout -b develop 2>/dev/null || git checkout develop
git pull origin develop 2>/dev/null || echo "develop not on remote yet, will push after first commit"
```

---

## 3. Phase 1 — Backend customer routes (foundation)

**Branch:** `feat/customer-backend-routes`
**Goal:** Stand up every `/api/v1/customer/*` endpoint the customer-frontend expects, in a clean new module.

### 3.1 What to build

Create the following new files under `backend/app/`:

```
backend/app/
├── api/v1/
│   ├── customer.py              ← NEW: all customer-facing routes (prefix=/customer)
│   └── (existing files — do not touch except to register the new router)
├── schemas/
│   ├── customer_auth.py         ← NEW: register, login, password reset, change-password payloads
│   ├── customer_profile.py      ← NEW: profile read/update
│   ├── customer_booking.py      ← NEW: create booking, cancel, feedback payloads
│   ├── customer_support.py      ← NEW: ticket create, message reply
│   └── customer_catalog.py      ← NEW: (mostly empty — catalog uses the existing admin/services.py with a public projection)
├── core/
│   └── customer_security.py     ← NEW: customer-side JWT issuance, password hashing (or reuse from core/security.py)
└── repositories/
    └── (extend customer_repository.py with a get-by-email, create-customer, etc.)
```

If you prefer to keep it tighter, you can collapse the schemas into one `customer_schemas.py` file. Don't fragment unnecessarily.

### 3.2 Endpoint list (exact contract — copy field names from the customer-frontend types)

| Method | Path | Auth | Request body | Response |
|---|---|---|---|---|
| POST | `/customer/auth/register` | public | `{ full_name, email, phone?, password }` | `CustomerTokenResponse` |
| POST | `/customer/auth/login` | public | `{ email, password }` | `CustomerTokenResponse` |
| GET | `/customer/auth/me` | customer | — | `CustomerSessionResponse` |
| POST | `/customer/auth/logout` | customer | — | `{ status: 'ok' }` |
| POST | `/customer/auth/forgot-password` | public | `{ email }` | `{ status: 'ok' }` (always 200, don't leak account existence) |
| POST | `/customer/auth/reset-password` | public | `{ token, new_password }` | `{ status: 'ok' }` |
| POST | `/customer/auth/change-password` | customer | `{ current_password, new_password }` | `{ status: 'ok' }` |
| GET | `/customer/profile` | customer | — | `CustomerSessionResponse` (full profile) |
| PATCH | `/customer/profile` | customer | `{ full_name?, email?, phone? }` | `CustomerSessionResponse` |
| GET | `/customer/dashboard` | customer | — | `CustomerHomeData` (categories + featured + recent bookings + greeting name) |
| GET | `/customer/catalog/categories` | public (or customer) | `?parent=true` | `CategoryList[]` with counts |
| GET | `/customer/catalog/services` | public (or customer) | `?category=&subcategory=&q=&emergency_only=&skip=&limit=` | `ServiceListItem[]` |
| GET | `/customer/catalog/services/{id}` | public (or customer) | — | `ServiceDetail` (includes addons, FAQs, process steps) |
| GET | `/customer/bookings` | customer | `?status_filter=&skip=&limit=` | `BookingListItem[]` |
| POST | `/customer/bookings` | customer | `CreateBookingPayload` | `BookingDetail` |
| GET | `/customer/bookings/{id}` | customer (owner) | — | `BookingDetail` |
| POST | `/customer/bookings/{id}/cancel` | customer (owner) | `{ reason }` | `BookingDetail` |
| POST | `/customer/bookings/{id}/feedback` | customer (owner, completed only) | `{ rating, review_text?, image_urls? }` | `FeedbackItem` |
| GET | `/customer/support/tickets` | customer | `?status_filter=&skip=&limit=` | `SupportTicketListItem[]` |
| POST | `/customer/support/tickets` | customer | `{ subject, description, category, booking_id?, priority?, image_urls? }` | `SupportTicketDetail` |
| GET | `/customer/support/tickets/{id}` | customer (owner) | — | `SupportTicketDetail` (with `messages[]`) |
| POST | `/customer/support/tickets/{id}/messages` | customer (owner, ticket open) | `{ message_text, attachment_url? }` | `MessageItem` |
| GET | `/customer/feedback` | customer | `?skip=&limit=` | `FeedbackListItem[]` (the customer's own feedback) |
| GET | `/customer/sessions` | customer | — | `SessionListItem[]` |
| POST | `/customer/sessions/{id}/revoke` | customer (owner) | — | `{ status: 'ok' }` |
| POST | `/customer/sessions/revoke-all` | customer | — | `{ status: 'ok' }` |
| GET | `/customer/recommendations` | customer | — | `ServiceListItem[]` (empty array for V1 is fine) |
| POST | `/customer/uploads/image` | customer | `multipart/form-data` | `{ url: string }` |

**Total: 27 endpoints.**

### 3.3 Implementation rules (mirror the admin pattern, don't invent)

- **Router:** `router = APIRouter(prefix="/customer", tags=["Customer API"])`. Mount in `backend/app/api/v1/router.py`.
- **Auth dependency:** Create `get_current_customer` in `backend/app/core/dependencies.py` that decodes the JWT and verifies `role == "customer"`. Reuse `create_access_token` and `verify_password` from `core/security.py` — set the JWT claim `{"sub": str(user.id), "email": user.email, "role": "customer", "customer_id": str(customer.id)}`.
- **Registration:** Create both a `users` row (role='customer') AND a `customers` row in one transaction. Hash password with the existing `hash_password` (argon2 from passlib). Reject if email already exists with 409.
- **Login:** Find user by email, verify password, verify `is_active`, verify role is customer, issue JWT. Track session in the existing `sessions` table.
- **Ownership:** Every endpoint that returns customer-owned data (`/bookings/{id}`, `/support/tickets/{id}`, `/profile`) must check `record.customer_id == current_customer.id` and return 404 (not 403, to avoid leaking existence).
- **Booking create:** Mirror the admin create but with the authenticated customer as the customer_id. Validate service is active, scheduled_time is in the future (unless emergency_flag='ASAP'), and total_price matches base + addons.
- **Feedback:** Only allow on bookings where the customer is owner AND status is COMPLETED. One feedback per booking.
- **Support tickets:** Allow customers to create tickets. Auto-assign priority: High if category in {Booking issue, Service quality} AND booking_id present, else Normal.
- **Catalog:** If the admin's `/admin/catalog/services` is gated, you need a public/customer-side projection. Easiest: query the same `services` table filtering `is_active=True` and return a slimmer `ServiceListItem` shape.
- **Sessions:** Reuse the existing `sessions` table; just add endpoints to list/revoke.
- **Uploads:** Save uploaded images to a local `customer_uploads/` dir (or extend the existing upload infrastructure if there is one), return a URL. Don't worry about CDN for V1.
- **CORS:** The customer-frontend will be on a different origin. Add the customer's dev URL (`http://localhost:5174`) and prod URL to the CORS allow-list in `backend/app/main.py`. Check what the admin's URL is already in there.

### 3.4 Schema alignment

After you write the Pydantic schemas, **run a type-comparison pass**: for every response model, compare its fields against the matching TypeScript interface in `customer-frontend/src/api/`. If anything differs, fix the backend to match the frontend (the frontend types are the contract; the spec defined them). Document any intentional deviations in `INTEGRATION.md` § "Field-level contracts".

### 3.5 Migration (if needed)

If you need any new columns/tables (e.g., `customer_sessions` view, `customer_addresses` for saved addresses), add a **new Alembic migration**:

```bash
cd backend
alembic revision --autogenerate -m "feat: customer ecosystem - session tracking, address book"
```

Review the generated migration. **Do not edit existing migrations** — create a new one.

### 3.6 Local backend testing

```bash
cd backend
# Apply migrations
alembic upgrade head
# Run with hot reload
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
# In another terminal, smoke test:
curl -s http://127.0.0.1:8000/api/v1/customer/catalog/categories | jq
curl -s -X POST http://127.0.0.1:8000/api/v1/customer/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@example.com","password":"TestPass123!"}' | jq
```

Write a `backend/tests/test_customer_api.py` with at least one happy-path test per endpoint group (auth, profile, catalog, bookings, support, sessions, uploads). Use FastAPI's TestClient. Don't go overboard — one test per endpoint family is enough to prove wiring.

### 3.7 Phase 1 acceptance

- [ ] All 27 endpoints exist and return non-404 on the local backend.
- [ ] Pydantic schemas match the frontend TypeScript interfaces.
- [ ] `backend/tests/test_customer_api.py` passes.
- [ ] CORS allows the customer-frontend origin.
- [ ] No existing admin endpoint behavior was changed.
- [ ] Branch `feat/customer-backend-routes` is committed and ready to push (don't push yet — Phase 6).

---

## 4. Phase 2 — Customer frontend wiring

**Branch:** `feat/customer-frontend-integration`
**Goal:** Point the customer-frontend at the new backend, remove the mock-fallback dependency, verify every operation works end-to-end.

### 4.1 What to change

In `customer-frontend/`:

1. **`.env` and `.env.example`:** set `VITE_USE_MOCK_AUTH=false` as the **default** in `.env.example`. Keep `VITE_USE_MOCK_AUTH` as an opt-in escape hatch, but flipped (default `false`).
2. **Add a "backend mode" badge in the dev indicator** (from Phase 11): the floating indicator now reads:
   - 🟢 `Backend live — 27/27 endpoints` (or whatever count)
   - 🟡 `Backend live — 12/27 (mock fallback active)`
   - 🔴 `Backend unreachable — full mock mode (set VITE_USE_MOCK_AUTH=true to force)`
3. **Audit the mock fallback code paths** in `src/api/*.ts`. For each one:
   - If the call can hit a real endpoint now, **remove the mock branch**. Let real errors bubble up so the UI shows them.
   - Keep the mock ONLY for endpoints that genuinely don't exist yet (e.g., `/customer/recommendations` if Aastha hasn't shipped it). Log a `console.warn` so it's visible.
4. **Add a `transformError` interceptor** in `src/api/client.ts` that converts axios errors into a typed `ApiError` shape so the UI can show meaningful messages:
   ```ts
   export interface ApiError {
     status: number;
     code?: string;
     message: string;
     fieldErrors?: Record<string, string>;
   }
   ```
   Update the most user-facing error toasts to use this (Login, Register, Booking creation, Support ticket creation).
5. **Add a `customer-frontend/.env.development`** (gitignored) that points at the **local** backend (`VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1`) for fast local iteration, and `.env.production` that points at the Render URL. Vite picks the right one automatically.
6. **Wire the `useBackendStatus` hook into `<AppLayout>`** so the dev indicator always shows. Also show a small "stale data" warning on data-fetching pages if the last fetch was > 60s ago.

### 4.2 Verify against local backend

```bash
# Terminal 1: local backend
cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2: customer frontend
cd customer-frontend && npm run dev
# Visit http://localhost:5174 — dev indicator should show 🟢
```

Walk through the **end-to-end customer journey** manually:
1. Register a new customer → success → lands on `/home`.
2. Browse `/explore` → real categories from the live API.
3. Open a service detail → real addons, real FAQs.
4. Book it → real booking created, appears in `/bookings` with a real ID.
5. Admin (in another tab at `localhost:5173` admin-frontend) should now see this new customer in `/admin/customers` and this new booking in `/admin/bookings`.
6. Back on customer, cancel the booking → admin sees status change.
7. Create a support ticket → admin sees the new ticket in `/admin/support`.
8. Log out → log in again → token works.

### 4.3 Phase 2 acceptance

- [ ] `VITE_USE_MOCK_AUTH=false` is the default in `.env.example`.
- [ ] Every previously-mocked endpoint now hits the real backend in normal operation.
- [ ] Dev indicator shows 🟢 when local backend is up.
- [ ] Manual end-to-end journey above works without errors.
- [ ] Error states show real backend error messages (not generic "something went wrong").
- [ ] `npm run typecheck` and `npm run build` still green.
- [ ] No new `any` types.

---

## 5. Phase 3 — Admin sees customer operations

**Branch:** `feat/admin-customer-feedback-view`
**Goal:** Verify and (where missing) extend admin's visibility into customer-generated data.

### 5.1 What already works (verify, don't rebuild)

The admin-frontend already has:
- `getCustomersList` → lists every customer row.
- `getCustomerDetail` → shows a customer's booking history.
- `getBookingsList` → lists every booking, including customer-initiated ones.
- `getSupportTicketsList` → lists every ticket, including customer-created ones.
- `getSupportTicketDetail` → shows full conversation thread.
- `getDashboardOverview` → KPIs.

Run the customer journey from Phase 4.2, then **switch to admin** and verify:
- The new customer appears in `/admin/customers`.
- The new booking appears in `/admin/bookings` with `Requested` status.
- The new ticket appears in `/admin/support`.

If any of these are missing, **don't add a new endpoint** — fix the existing one. The data is already in the same tables.

### 5.2 What's likely missing (add only if needed)

- **Feedback visibility for admin:** the existing `getCustomersList` and `getCustomerDetail` likely don't show the customer's reviews. Add a section to `CustomerDetailView.tsx` that fetches and displays the customer's feedback (you can call the new `GET /api/v1/admin/customers/{id}/feedback` endpoint you'll add to the admin's `customers.py`).
- **Recent customer activity on admin dashboard:** the dashboard might not surface new customer signups or recent customer-initiated bookings. Add a "Recent Customers" card to `Dashboard.tsx` if it's not there.
- **Audit log of customer actions:** if `audit_repository.create_audit_log` isn't being called for customer actions, add calls in the new backend customer endpoints. (Don't add it to every endpoint — only the security-sensitive ones: login, register, change-password, booking create, booking cancel, feedback create, support ticket create.)

### 5.3 Phase 3 acceptance

- [ ] Admin can see every customer-initiated booking, ticket, and feedback.
- [ ] Admin dashboard shows recent customer activity.
- [ ] Audit logs include security-sensitive customer actions.
- [ ] No regression in existing admin functionality.

---

## 6. Phase 4 — End-to-end integration tests

**Branch:** `chore/integration-tests-and-docs`
**Goal:** Automated proof that the whole vertical slice works.

### 6.1 Backend integration tests

Expand `backend/tests/test_customer_api.py` into a proper integration test suite that runs against a real test database (use SQLite in-memory for speed, or a throwaway PostgreSQL schema):

- [ ] `test_auth.py` — register, login (success + wrong password + suspended), me, logout, change-password, forgot/reset.
- [ ] `test_catalog.py` — list categories, list services with filters, get service detail.
- [ ] `test_bookings.py` — list, create, get, cancel, feedback. Test ownership: customer A can't see customer B's booking (404).
- [ ] `test_support.py` — list, create, get, reply.
- [ ] `test_profile_sessions.py` — profile read/update, sessions list/revoke.
- [ ] `test_uploads.py` — image upload, size limit, type limit.

### 6.2 Customer frontend E2E tests (extend Phase 11 suite)

If Phase 11 already added Playwright, extend the existing specs to run with `VITE_USE_MOCK_AUTH=false` against the local backend. Add a new `e2e/10-fullstack-integration.spec.ts` that drives the full vertical:

```
1. Customer registers via customer-frontend
2. Customer books a service via customer-frontend
3. Admin sees the booking in admin-frontend (cross-frontend assertion)
4. Customer cancels via customer-frontend
5. Admin sees the cancellation
6. Customer creates a support ticket via customer-frontend
7. Admin sees the ticket
8. Customer leaves feedback on a (manually-COMPLETED) booking
9. Admin sees the feedback on the customer detail
```

This single test is the **proof of full-stack wiring**. If it passes, the vertical works.

### 6.3 Phase 4 acceptance

- [ ] Backend test suite runs in < 30s, all green.
- [ ] Frontend E2E test suite runs in < 5min, all green.
- [ ] The cross-frontend integration test (10-fullstack-integration.spec.ts) passes.
- [ ] CI pipeline (from Phase 11) now runs both backend and frontend tests.

---

## 7. Phase 5 — Documentation

**Branch:** same as Phase 4 (`chore/integration-tests-and-docs`)

### 7.1 Update `INTEGRATION.md`

Mark every endpoint 🟢 Done (instead of 🔴 Missing). Add:
- "Local development setup" section: how to run backend + customer-frontend together.
- "Cross-frontend testing" section: how to run admin and customer in parallel.
- "Production deployment" section: how the customer-frontend gets deployed to Render (use the `render.yaml` snippet from the existing HANDOFF).

### 7.2 Update `README.md` (customer-frontend)

- Add a "Status: Full-Stack Ready" badge at the top.
- Update "Known Limitations": remove "backend not yet shipped", add "online payments not yet integrated" if true.

### 7.3 Create `RELEASE-NOTES-v1.0.md` at repo root

A short (1-page) release note for the team:

- What shipped
- Who owns what going forward
- How to test
- Known follow-ups

---

## 8. Phase 6 — Push to GitHub

**Branch:** all four feature branches, then a `release/v1.0-customer-frontend`.

### 8.1 Pre-push cleanup

- [ ] All four feature branches have clean working trees.
- [ ] All branch names follow the convention in §2.
- [ ] Commit messages use Conventional Commits.
- [ ] Each branch has been rebased onto `develop` (or `main` if `develop` doesn't exist yet).

### 8.2 Push sequence (in this exact order)

```bash
cd SmartServe

# 1. Push develop first
git checkout develop
git push -u origin develop

# 2. Push each feature branch
for branch in feat/customer-backend-routes \
              feat/customer-frontend-integration \
              feat/admin-customer-feedback-view \
              chore/integration-tests-and-docs; do
  git checkout "$branch"
  git push -u origin "$branch"
done

# 3. Create PRs from each feature into develop (use gh if available, else print the URLs)
for branch in feat/customer-backend-routes \
              feat/customer-frontend-integration \
              feat/admin-customer-feedback-view \
              chore/integration-tests-and-docs; do
  gh pr create \
    --base develop \
    --head "$branch" \
    --title "$(git log -1 --format=%s $branch)" \
    --body "## What
$(git log -1 --format=%b $branch)

## How to test
1. Pull this branch
2. Run \`cd backend && pip install -r requirements.txt && alembic upgrade head\`
3. Run \`cd backend && python -m uvicorn app.main:app --reload\`
4. Run \`cd customer-frontend && npm install && npm run dev\`
5. Visit http://localhost:5174

## Checklist
- [x] Typecheck green
- [x] Build green
- [x] Tests added/updated
- [x] Docs updated" \
    --reviewer PushkarKanjani,aastha 2>/dev/null \
  || echo "gh CLI not available — create PR manually at https://github.com/PushkarKanjani/SmartServe/compare/develop...$branch"
done
```

### 8.3 Cut a release

```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.0-customer-frontend

# Optional: bump versions in package.json files
cd customer-frontend && npm version 1.0.0 -m "chore(release): customer-frontend v1.0.0" && cd ..
cd admin-frontend && npm version 1.0.0 -m "chore(release): admin-frontend v1.0.0" && cd ..

git push -u origin release/v1.0-customer-frontend

# Open release PR
gh pr create \
  --base main \
  --head release/v1.0-customer-frontend \
  --title "Release v1.0 — Customer Frontend (Full-Stack)" \
  --body-file RELEASE-NOTES-v1.0.md \
  --reviewer PushkarKanjani,aastha 2>/dev/null \
|| echo "Create release PR manually: https://github.com/PushkarKanjani/SmartServe/compare/main...release/v1.0-customer-frontend"
```

### 8.4 Phase 6 acceptance

- [ ] All four feature branches are pushed to origin.
- [ ] All four PRs are open (either via `gh` or with manual URLs printed).
- [ ] `develop` branch is pushed and contains all four features.
- [ ] `release/v1.0-customer-frontend` branch is pushed with a release PR into `main`.
- [ ] `RELEASE-NOTES-v1.0.md` is committed at the repo root.
- [ ] `git log --oneline main..develop` shows the full feature set.
- [ ] No commits were made directly to `main`.

---

## 9. Phase 7 — Deployment (only if user confirms)

Don't auto-deploy. The user has to say "yes, deploy to Render" before you run anything in this phase.

If confirmed:
- Deploy the customer-frontend `dist/` to Render as a static site using the `render.yaml` snippet from `customer-frontend/HANDOFF.md`.
- Set `VITE_API_BASE_URL` to the production backend URL.
- Verify the deployed URL works (curl + a real browser visit if possible).

---

## 10. Master acceptance criteria (the whole phase is done when)

- [ ] All 4 feature branches are merged into `develop` (either via `gh pr merge` if the user approved auto-merge, or via the user clicking "Merge" in the GitHub UI).
- [ ] Release PR is open, approved, and merged into `main`.
- [ ] Local backend serves all 27 customer endpoints with correct contracts.
- [ ] Customer-frontend's dev indicator shows 🟢 when pointed at the local backend.
- [ ] Customer-frontend with `VITE_USE_MOCK_AUTH=false` works end-to-end against the real backend.
- [ ] Admin-frontend can see every customer-initiated booking, ticket, and feedback.
- [ ] Backend test suite is green.
- [ ] Customer-frontend E2E suite is green.
- [ ] The cross-frontend integration test (10-fullstack-integration.spec.ts) is green.
- [ ] `INTEGRATION.md` is updated with 🟢 on every endpoint.
- [ ] `RELEASE-NOTES-v1.0.md` exists at the repo root.
- [ ] No `any` types introduced.
- [ ] No existing admin-frontend, mobile, or alembic-versions files modified without a `// bridge:` commit marker.

---

## 11. Reporting format (post each phase)

```
PHASE N — DONE / IN PROGRESS / BLOCKED
- Files added: <list>
- Files modified: <list>
- Endpoints added/updated: <count + brief>
- Tests added/updated: <count + brief>
- Branches created/pushed: <list>
- PRs opened: <list with URLs>
- Decisions made: <any>
- Gaps/blockers: <any>
- Next: <one-line>
```

When the entire Phase 12 is done, write `customer-frontend/HANDOFF-v1.0.md` with the full status report.

---

## 12. Hard rules (do not violate)

1. **Never push to `main` directly.** Always via a release PR.
2. **Never modify `admin-frontend/`, `mobile/`, or existing `backend/alembic/versions/*` without a `// bridge:` commit marker and a HANDOFF line item.**
3. **Never introduce `any` types** in the customer-frontend or backend code.
4. **Never break the existing admin functionality** — the admin must still work after every phase.
5. **Never commit secrets** (`.env`, JWT secrets, DB URLs) — only `.env.example`.
6. **Never auto-deploy** without explicit user confirmation.
7. **Never use `--force` on `develop` or `main`.** Force-push only on your own feature branch.
8. **If the pre-flight checklist fails** for credentials (can't push to GitHub), STOP and tell the user. Do not try to work around it.
9. **If a backend endpoint is ambiguous**, mirror the customer-frontend TypeScript type exactly. The frontend is the contract.
10. **If you're stuck for more than 15 minutes** on a single endpoint, write what you have, mark it as a TODO in the HANDOFF, and move on. The user can clarify later.

---

## 13. Start now

1. Run the §1 pre-flight checklist. Report any failures.
2. Set up the git branches per §2.
3. Begin Phase 1 (backend customer routes). When done, post a status block and stop — wait for the user to acknowledge before starting Phase 2.

(Phase 1 alone is a 4–8 hour focused build. Don't try to do all 6 phases in one shot. Ship Phase 1, get a 👍 from the user, then continue.)

Go. 🚀
