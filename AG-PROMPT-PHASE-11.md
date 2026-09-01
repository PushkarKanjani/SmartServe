# AG — Phase 11 Execution Prompt
## "Lock it down, then prep for full-stack wiring"

> **Predecessor:** Phases 1–10 complete (`customer-frontend/`, 14 pages, 15 UI primitives, demo-ready with mock fallbacks).
> **Current state:** `npm run typecheck` ✅, `npm run build` ✅, 0 `any` ✅, isolated ✅, but every `/api/v1/customer/*` endpoint returns **404 from the live Render backend** — Aastha hasn't shipped them yet.
> **Your mission:** Build the safety net (E2E tests + CI) AND prep the customer frontend for the moment Aastha's endpoints come online. No more features until the safety net is up.

---

## 0. Read first

Before writing any code:

1. Re-read `customer-frontend-INSTRUCTIONS.md` §12 (acceptance checklist) and §15 (hand-off template).
2. Re-read `customer-frontend/HANDOFF.md` and `customer-frontend/README.md` — that's your ground truth for what exists.
3. Skim the existing `customer-frontend/src/api/*` files. Every backend call goes through them — that's where you'll add the connection-status plumbing.
4. Skim the **admin-frontend/** `src/api/client.ts` for the existing axios-interceptor pattern. You'll mirror it for the new "data layer" you'll add.

---

## 1. Why this is the right next step (and what to NOT do)

- **Don't** add more screens, more polish, more features. The customer frontend is demo-ready.
- **Don't** try to "fix" the 404s by changing the frontend — the API contract is correct; the backend just doesn't have those routes yet.
- **Don't** mock more things. The mock fallbacks are a temporary escape hatch, not a long-term strategy.
- **Do** build the safety net. Once E2E + CI are green, every future change is safe.
- **Do** prep the integration. The moment Aastha's `/customer/*` routes go live, the frontend should know — and you should know within 5 minutes.

---

## 2. Deliverables (six concrete artifacts)

### Deliverable 1 — `customer-frontend/playwright.config.ts` + E2E test suite

**Goal:** A real end-to-end test suite that runs against the actual built app, catches regressions, and will become the integration test suite the moment Aastha's backend lands.

**Constraints:**
- Use **Playwright** (`@playwright/test`). It's the industry standard, works against any browser, doesn't need a server-side runner.
- Test against the **dev server** (`npm run dev`, port 5174) for fast iteration AND against the **preview server** (`npm run preview`, port 4173) for production-confidence. Default to preview, fall back to dev if preview is unavailable.
- Use the **`VITE_USE_MOCK_AUTH=true` flag** so tests are deterministic and don't depend on the backend.
- **No new heavyweight deps** beyond Playwright itself. No Percy, no Chromatic, no axe-playwright in this round (we'll add a11y tests in Phase 12).

**Test files to create (under `customer-frontend/e2e/`):**

| File | Coverage |
|---|---|
| `01-auth.spec.ts` | Splash plays once → login → register → forgot password → reset password → logout. Each form's validation rules. |
| `02-app-shell.spec.ts` | Sidebar opens/closes (desktop + mobile drawer). Top header profile dropdown. Logout from dropdown. Splash does NOT replay on internal navigation. |
| `03-discover.spec.ts` | Home renders categories, featured, recent strip. Explore loads categories, search debounces, filter bar works, grid/list view toggle. Subcategory → service list → service detail. |
| `04-service-detail.spec.ts` | Add-on checkboxes update the running total. FAQ accordion opens. "Continue to book" routes correctly. |
| `05-booking-flow.spec.ts` | Create booking → success modal with reference → booking appears in `/bookings` Requested tab. Cancel modal works. Feedback modal star rating + text submission. |
| `06-support-flow.spec.ts` | New ticket with category + subject + description + image → ticket detail. Reply composer adds a message bubble. |
| `07-profile.spec.ts` | Profile shows correct data. Edit profile updates and reflects. Security page password strength meter (Weak/Medium/Strong). Sessions list renders. |
| `08-design-tokens.spec.ts` | Snapshot a few key pages and assert `getComputedStyle` matches the design tokens from §1.1 of the spec (primary `#2563EB`, bg `#F8FAFC`, slate text). |
| `09-mobile-responsive.spec.ts` | Run all of the above at 360×640 and 390×844 viewports. Assert no horizontal scroll, hamburger visible, sidebar hidden, inputs ≥ 16px font. |

**Per-test rules:**
- Use Playwright's `getByRole`, `getByLabel`, `getByText` — never `getByTestId` unless absolutely necessary. Accessibility-first selectors make the tests resilient and double as a11y checks.
- Use `await expect(...).toBeVisible()` for assertions, not `await page.waitForTimeout(...)`. If you need a wait, use `expect.poll` or a real `waitFor` on a DOM signal.
- One `test.describe` per file. One `test.beforeEach` that visits `/login` and signs in (so each test starts authenticated).
- Capture a video + screenshot on failure (`use: { trace: 'on-first-retry' }`).

**`playwright.config.ts` shape:**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: 'http://localhost:4173',  // preview server by default
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

**`package.json` additions:**
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:install": "playwright install --with-deps chromium"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0"
  }
}
```

**.gitignore addition:** `playwright-report/`, `test-results/`, `playwright/.cache/`.

Run `npm run test:e2e:install` once locally, verify it downloads browsers, then `npm run test:e2e` should pass green.

---

### Deliverable 2 — `customer-frontend/INTEGRATION.md` (the Aastha hand-off)

**Goal:** A single document Aastha opens, sees exactly what endpoints to build, in what order, with field-level contracts she can implement against without ambiguity.

**Sections (write all of these):**

1. **Overview** — what's already built in the frontend, what 404s today, what we need from the backend.
2. **Auth & Identity** — token format, expiry, claim shape. Reuse the admin's existing JWT pattern (`/api/v1/auth/login` already exists — note whether to extend it with `role: 'customer'` or build a separate `/api/v1/customer/auth/login`).
3. **Endpoint table** — copy from `customer-frontend/README.md` but add a "Status" column: `🔴 Missing` / `🟡 Exists (admin variant) / needs customer variant` / `🟢 Done`. Fill in the Status column by hitting the live Render backend for each one. The table is the integration contract.
4. **Field-level contracts** — for every entity (`BookingItem`, `ServiceItem`, `SupportTicket`, `Feedback`, `CustomerProfile`, `CustomerSession`), paste the TypeScript interface from `customer-frontend/src/api/*.ts` and the matching Pydantic schema path in `backend/app/schemas/`. Highlight any mismatches.
5. **Migration plan** — the exact sequence:
   - Phase A: Aastha adds customer auth (`/customer/auth/*`). Tests use `VITE_USE_MOCK_AUTH=false` against staging backend.
   - Phase B: Aastha adds public catalog (`/customer/catalog/*`).
   - Phase C: Aastha adds bookings (`/customer/bookings/*`).
   - Phase D: Aastha adds support, profile, sessions, uploads.
   - Phase E: Flip `VITE_USE_MOCK_AUTH` to `false` by default. Remove the mock data files (kept in git history).
6. **Test plan for Aastha** — once her endpoints are live, here's how we test the integration: run the E2E suite with `VITE_USE_MOCK_AUTH=false` against her staging backend.
7. **Open questions** — anything that needs a decision before backend work starts (e.g., "should `forgot-password` send an email via SendGrid or just return a token?").

**Length target:** ~300–500 lines. Detailed enough that Aastha can implement without asking you clarifying questions, short enough to read in one sitting.

---

### Deliverable 3 — `customer-frontend/src/api/health.ts` + a connection-status hook

**Goal:** A small module that the UI can call to check whether the backend is reachable, and a `useBackendStatus()` hook the rest of the app uses to switch between mock and real data gracefully.

**Implementation:**

```ts
// customer-frontend/src/api/health.ts
import { apiClient } from './client';

export interface BackendHealth {
  reachable: boolean;
  apiVersion?: string;
  customerEndpointsExposed: number;  // count of /customer/* routes that returned non-404
  customerEndpointsExpected: number;  // from the static list
  lastCheckedAt: string;              // ISO
  latencyMs?: number;
}

const EXPECTED_CUSTOMER_ROUTES = [
  '/customer/auth/me',
  '/customer/catalog/categories',
  '/customer/catalog/services',
  '/customer/bookings',
  '/customer/support/tickets',
  '/customer/profile',
  '/customer/sessions',
] as const;

export const checkBackendHealth = async (): Promise<BackendHealth> => {
  // Hit a cheap public endpoint first to confirm the API is up
  const start = performance.now();
  let reachable = false;
  let apiVersion: string | undefined;

  try {
    const res = await apiClient.get('/health', { timeout: 4000 });
    reachable = res.status === 200;
    apiVersion = res.data?.version;
  } catch {
    reachable = false;
  }

  // Then count how many customer endpoints are actually live
  let exposed = 0;
  if (reachable) {
    await Promise.all(
      EXPECTED_CUSTOMER_ROUTES.map(async (route) => {
        try {
          // Use a HEAD where possible; GET with a 404-distinguishing interceptor otherwise
          await apiClient.get(route, { timeout: 2000, validateStatus: (s) => s === 200 || s === 401 || s === 403 });
          exposed += 1;
        } catch { /* still missing */ }
      })
    );
  }

  return {
    reachable,
    apiVersion,
    customerEndpointsExposed: exposed,
    customerEndpointsExpected: EXPECTED_CUSTOMER_ROUTES.length,
    lastCheckedAt: new Date().toISOString(),
    latencyMs: Math.round(performance.now() - start),
  };
};
```

```ts
// customer-frontend/src/hooks/useBackendStatus.ts
import { useEffect, useState, useCallback } from 'react';
import { checkBackendHealth, type BackendHealth } from '../api/health';

const POLL_INTERVAL_MS = 60_000;

export const useBackendStatus = () => {
  const [status, setStatus] = useState<BackendHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    setLoading(true);
    const next = await checkBackendHealth();
    setStatus(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [refresh]);

  return { status, loading, refresh };
};
```

Then add a tiny floating indicator to `<AppLayout>` (bottom-right, dev-only) that shows:
- 🟢 `Backend live — 7/7 endpoints`
- 🟡 `Backend live — 3/7 endpoints (mock fallback for rest)`
- 🔴 `Backend unreachable — full mock mode`

Gated by `import.meta.env.DEV` so it never ships to production. This is the "are we full-stack yet?" pulse-check the whole team can see at a glance.

---

### Deliverable 4 — `.github/workflows/customer-frontend-ci.yml`

**Goal:** GitHub Actions pipeline that runs on every PR and push to `main`, gates merges.

**Pipeline stages:**

```yaml
name: customer-frontend CI
on:
  push:
    branches: [main]
    paths:
      - 'customer-frontend/**'
      - '.github/workflows/customer-frontend-ci.yml'
  pull_request:
    paths:
      - 'customer-frontend/**'

defaults:
  run:
    working-directory: customer-frontend

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: customer-frontend/package-lock.json
      - run: npm ci
      - name: Typecheck
        run: npm run typecheck
      - name: Lint (if script exists)
        run: npm run lint || echo "lint script not configured, skipping"
      - name: Grep for any-types
        run: ! grep -REn ":\s*any\b|as\s+any\b" src/ || (echo "❌ Found 'any' types" && exit 1)
      - name: Grep for hardcoded secrets
        run: ! grep -REn "sk_live|pk_live|AKIA[A-Z0-9]{16}|ghp_[A-Za-z0-9]{36}" src/ || (echo "❌ Possible secret found" && exit 1)

  build:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: customer-frontend/package-lock.json
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: customer-frontend-dist
          path: customer-frontend/dist
          retention-days: 7

  e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: customer-frontend/package-lock.json
      - run: npm ci
      - run: npm run test:e2e:install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: customer-frontend/playwright-report
          retention-days: 7
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: test-results
          path: customer-frontend/test-results
          retention-days: 7
```

**Add a status badge to `customer-frontend/README.md`:**
```markdown
[![CI](https://github.com/PushkarKanjani/SmartServe/actions/workflows/customer-frontend-ci.yml/badge.svg)](../../actions/workflows/customer-frontend-ci.yml)
```

---

### Deliverable 5 — Update `customer-frontend/HANDOFF.md` and `README.md`

**Goal:** Reflect the new state.

In `HANDOFF.md` add a new section:
```markdown
## Phase 11 — Safety Net & Full-Stack Prep

- ✅ E2E test suite (Playwright, 9 spec files, 3 projects including mobile viewports)
- ✅ CI pipeline (GitHub Actions: typecheck + grep guards + build + E2E)
- ✅ Backend health check + status indicator
- ✅ INTEGRATION.md hand-off for Aastha
- ⏳ Awaiting Aastha's customer backend routes
- ⏳ Will run E2E against live backend once endpoints ship
```

In `README.md`:
- Add the CI badge at the top.
- Add a "Backend status" section with the 3-tier indicator explanation.
- Add E2E commands to the "Setup & Running" section.
- Update the limitations list to add: "Customer backend endpoints are not yet shipped by Aastha; using mock fallbacks. See INTEGRATION.md for the migration plan."

---

### Deliverable 6 — `customer-frontend/INTEGRATION_CHECKLIST.md` (for Aastha, also for you)

**Goal:** A 1-page printable checklist Aastha works through as she ships endpoints.

```markdown
# Customer Backend — Integration Checklist

For each endpoint below, mark ✅ when shipped, paste the live response sample,
and re-run the E2E suite with `VITE_USE_MOCK_AUTH=false` to verify.

## Phase A — Auth (unblocks everything else)
- [ ] POST /api/v1/customer/auth/register
- [ ] POST /api/v1/customer/auth/login
- [ ] GET  /api/v1/customer/auth/me
- [ ] POST /api/v1/customer/auth/logout
- [ ] POST /api/v1/customer/auth/forgot-password
- [ ] POST /api/v1/customer/auth/reset-password
- [ ] POST /api/v1/customer/auth/change-password

## Phase B — Public catalog
- [ ] GET  /api/v1/customer/catalog/categories
- [ ] GET  /api/v1/customer/catalog/services
- [ ] GET  /api/v1/customer/catalog/services/{id}

## Phase C — Bookings
- [ ] GET  /api/v1/customer/bookings
- [ ] POST /api/v1/customer/bookings
- [ ] GET  /api/v1/customer/bookings/{id}
- [ ] POST /api/v1/customer/bookings/{id}/cancel
- [ ] POST /api/v1/customer/bookings/{id}/feedback

## Phase D — Support, profile, sessions, uploads
- [ ] GET  /api/v1/customer/support/tickets
- [ ] POST /api/v1/customer/support/tickets
- [ ] GET  /api/v1/customer/support/tickets/{id}
- [ ] POST /api/v1/customer/support/tickets/{id}/messages
- [ ] GET  /api/v1/customer/feedback
- [ ] GET  /api/v1/customer/profile
- [ ] PATCH /api/v1/customer/profile
- [ ] GET  /api/v1/customer/sessions
- [ ] POST /api/v1/customer/sessions/{id}/revoke
- [ ] POST /api/v1/customer/sessions/revoke-all
- [ ] POST /api/v1/customer/uploads/image

## Final
- [ ] Set `VITE_USE_MOCK_AUTH=false` in production env
- [ ] Delete `*.mock.ts` files from the frontend (kept in git history)
- [ ] Run E2E suite with real backend — all 9 specs green
- [ ] Deploy customer-frontend to Render as static site
```

---

## 3. Acceptance criteria for Phase 11

- [ ] `npm run test:e2e` runs locally and all 9 spec files pass green (chromium project; mobile projects pass with viewport assertions).
- [ ] Playwright report opens at `customer-frontend/playwright-report/index.html` with screenshots on every failure.
- [ ] `.github/workflows/customer-frontend-ci.yml` is committed; pushing to a branch triggers the workflow.
- [ ] The CI workflow has 3 jobs (quality / build / e2e), each runs in under 5 min.
- [ ] The "any types" and "hardcoded secrets" grep guards are in the CI and would fail the build if violated.
- [ ] `INTEGRATION.md` exists, ≥ 300 lines, has all 7 sections, every endpoint has a status (🔴/🟡/🟢).
- [ ] `INTEGRATION_CHECKLIST.md` exists as a 1-page Aastha-facing checklist.
- [ ] The dev-only backend status indicator appears in `<AppLayout>` (gated by `import.meta.env.DEV`).
- [ ] `useBackendStatus()` hook polls every 60s and updates state.
- [ ] `README.md` has the CI badge and the new "Backend status" section.
- [ ] `HANDOFF.md` has the Phase 11 section.
- [ ] No regressions: `npm run typecheck` and `npm run build` still green.
- [ ] No `any` introduced.
- [ ] No new files modified outside `customer-frontend/` and `.github/workflows/`.

---

## 4. Build order (strict, gate each phase)

1. **Read everything in §0.** Confirm you understand the state.
2. **Write `INTEGRATION.md` and `INTEGRATION_CHECKLIST.md` first.** These are the docs Aastha reads. The code work that follows is informed by them.
3. **Add `health.ts` + `useBackendStatus` hook + dev indicator.** Run `npm run dev` and confirm the indicator appears bottom-right and updates.
4. **Add Playwright + write the 9 spec files incrementally.** Get `01-auth.spec.ts` passing first, then add one at a time. Each spec must be green before moving to the next.
5. **Add the CI workflow file.** Push to a branch and watch it run green. Fix any path / cache issues.
6. **Update `README.md` and `HANDOFF.md`.**
7. **Final pass:** walk the §3 acceptance list, tick every box, write the phase-11 status report.

---

## 5. Reporting format (post each sub-deliverable)

After each of the 6 sub-deliverables, post a 5-bullet block (same as Phase 10):

```
DELIVERABLE N — DONE / IN PROGRESS / BLOCKED
- Files added: <list>
- Files modified: <list>
- Decisions made: <any>
- Gaps/blockers: <any>
- Next: <one-line>
```

When the entire Phase 11 is done, post the full phase-11 status report (use the same structure as Phase 10's HANDOFF.md table).

---

## 6. What's NOT in this phase (explicit non-goals)

- **No new screens, no new UI primitives, no polish.** The UI is done.
- **No backend code.** Aastha owns that.
- **No online payments, no WebSockets, no AI recommendations.** Those are Phase 12+.
- **No mobile app changes.** `mobile/` stays untouched.
- **No admin-frontend changes.** Stays untouched.

The only goal: **the safety net is up, the team knows what to do the moment the backend lands, and every future change is safe.**

---

## 7. Start now

1. Open `customer-frontend-INSTRUCTIONS.md` and re-skim §12 + §15.
2. Open `customer-frontend/HANDOFF.md` to confirm the current state.
3. Begin with `INTEGRATION.md` (it's the source of truth for everything else).
4. Then `health.ts` → Playwright → CI → docs.

Go. 🚀
