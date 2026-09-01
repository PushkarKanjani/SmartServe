# SmartServe — Customer Frontend Master Build Prompt (for Antigravity / AG)

> **Audience:** Antigravity (AG) — autonomous AI build agent.
> **Mission:** Build the **Customer Dashboard** for SmartServe — a polished, production-grade customer-facing web application — that visually and architecturally matches the existing **admin-frontend**, shares the same FastAPI backend, and is **seamlessly compatible** with the existing **mobile (Expo / React Native)** app.
> **Source of truth for product spec:** the attached `Customer Module — PLANNED DESIGN DOCUMENT` (the doc you were given alongside this prompt).
> **Source of truth for code patterns / theme / shell:** the existing `admin-frontend/` directory in this same repo.

Read this document **end-to-end before writing any code**. Then build top-to-bottom in the order specified in §14.

---

## 0. Project Context (read first)

SmartServe is a full-stack AI-powered multi-service booking platform (urban-company-style) being built by **Pushkar Kanjani** (Provider ecosystem, integration, cloud, deployment) and **Aastha** (Customer ecosystem, backend, AI/ML).

**Current state of the monorepo (`SmartServe/`)**

| Folder | State | Purpose |
|---|---|---|
| `admin-frontend/` | **Fully built** | Admin / provider-ops console (React 18, Vite, TS, Tailwind 4, lucide-react, axios). Has 12 pages, polished theme, custom canvas splash, JWT auth. |
| `backend/` | **Fully built** | FastAPI + SQLAlchemy 2.0 + PostgreSQL/Neon + MongoDB + Alembic + JWT + RBAC. Exposes `/api/v1/...` (admin, catalog, bookings, providers, customers, support, reports, security). |
| `mobile/` | **Partially built** | Expo (React Native) shell: splash, auth, home, catalog, bookings, profile. Tabs already wired. **You are NOT rebuilding this — it must keep working and consume the same backend.** |
| `customer-frontend/` | **🆕 TO BE BUILT BY YOU** | The web app this prompt covers. |

**Tech stack — frozen, do not deviate**

- **Web:** React 18, TypeScript (strict, no `any`), Vite, Tailwind CSS v4, `lucide-react`, `axios`, `react-router-dom` v7.
- **State:** Local React state + small custom hooks. **No Redux, no Zustand, no React Query** — match admin-frontend's idiomatic style.
- **Backend:** FastAPI, PostgreSQL via Neon, SQLAlchemy 2.0, Alembic, JWT, Pydantic v2, RBAC.
- **Auth:** JWT bearer token, same `smartserve_token` localStorage key (so admin and customer sessions stay isolated by key namespace if needed).
- **Currency / locale:** Indian Rupee (₹) with `en-IN` number formatting (use the existing `formatCurrencyINR` / `formatRupee` patterns).

**Hard rules — non-negotiable**

1. **No `any` in TypeScript.** Every API response, every prop, every state must be typed. Derive request/response types from the backend Pydantic schemas (mirror field names exactly).
2. **Ownership checks happen server-side** — your job is to send the right token, hide other users' UUIDs, and never trust client-side authorization.
3. **All customer endpoints must use `/api/v1/` prefix** and UUIDs (never integer IDs).
4. **Production code uses the live Neon PostgreSQL backend** (already deployed: `https://smartserve-backend-tr3p.onrender.com/api/v1`) — no mocks, no hardcoded lists for "real" data. Mock data is only acceptable inside clearly-marked `*.mock.ts` for offline UI dev.
5. **Mobile + Web share the same backend and the same conceptual data model.** Type names and field names you define on the web side must be compatible with what the mobile app already imports. If you change a name, also update the mobile imports.
6. **V1 payment is Cash on Delivery (COD).** Do not build any card / UPI / wallet UI in this milestone.
7. **V1 has no WebSockets / Redis / Kafka.** All "real-time" UI is polling-on-focus + manual refresh for now.
8. **AI recommendations are a v1.1 feature** — the UI scaffolding (placeholder cards on Home) must exist, but you can hardcode the response shape and call `/api/v1/customer/recommendations` if/when it exists; otherwise return `[]` and show an empty-state card.
9. **No new heavy dependencies** without justification. Stick to what the admin-frontend already uses.

---

## 1. Design System (carry over from admin-frontend exactly)

You are **building a sibling of the admin dashboard**, not a new product. Copy the visual language verbatim.

### 1.1 Color tokens (use these exact hex values)

| Token | Hex | Where |
|---|---|---|
| `primary-blue` | `#2563EB` | Buttons, active states, focus rings, brand chip, CTA |
| `primary-blue-hover` | `#1D4ED8` | Hover/active button |
| `primary-blue-soft` | `#EFF6FF` / `#DBEAFE` | Selected row background, info chip background |
| `accent-blue` | `#5CA8FF` | Logo gradient partner, light accents |
| `bg-app` | `#F8FAFC` | Page background, main canvas |
| `bg-card` | `#FFFFFF` | Card surfaces, sidebars |
| `border-soft` | `#E2E8F0` / `#F1F5F9` | Card / input / divider borders |
| `text-primary` | `#0F172A` | Headings, brand mark |
| `text-secondary` | `#475569` | Body copy |
| `text-muted` | `#64748B` | Captions, placeholders, secondary metadata |
| `text-disabled` | `#94A3B8` | Disabled state |
| `success` | `#10B981` (bg `#ECFDF5`) | Confirmed / paid / verified states |
| `warning` | `#F59E0B` (bg `#FFFBEB`) | Pending / awaiting acceptance |
| `danger` | `#EF4444` (bg `#FEF2F2`) | Cancelled / error |
| `info` | `#3B82F6` (bg `#EFF6FF`) | In-progress / informational |

### 1.2 Typography

- **Font stack:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif` (already in admin `index.css`).
- **Scale:** `text-xs` (12) → `text-sm` (14) → `text-base` (16) → `text-lg` (18) → `text-xl` (20) → `text-2xl` (24) → `text-3xl` (30) for hero numbers.
- **Weight:** `font-bold` / `font-extrabold` (700/800) for headings, `font-semibold` (600) for nav, `font-medium` (500) for body, `font-normal` for long-form.
- **Letter spacing:** `tracking-tight` on big headings, `tracking-wide` + `uppercase` for category chips.

### 1.3 Spacing & shape

- **Card border-radius:** `rounded-2xl` (16px) for big cards, `rounded-xl` (12px) for buttons/inputs, `rounded-full` for chips.
- **Page padding:** `p-4 sm:p-6 lg:p-8` (mirrors admin).
- **Sidebar width (desktop):** `260px` on the left.
- **Top header height:** `72px` (`h-18`).
- **Touch targets:** every button ≥ 36px tall (already in admin `index.css`).

### 1.4 Component primitives — build once, reuse everywhere

Create these in `customer-frontend/src/components/ui/` and **never** reimplement them ad-hoc in pages:

- `Button` (variants: `primary` | `secondary` | `ghost` | `danger`; sizes: `sm` | `md` | `lg`; loading state with spinner; fullWidth flag).
- `Card` (props: `padding`, `hoverable`, `onClick`, `as`).
- `Badge` (variants: `success` | `warning` | `danger` | `info` | `neutral`).
- `Input` / `Textarea` / `Select` (consistent focus ring `focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]`).
- `Modal` (headless, focus-trapped, ESC-to-close, click-outside-to-close).
- `Drawer` (right-side slide-in for filters / details).
- `Tabs` (controlled, accessible).
- `EmptyState` (icon + title + description + optional CTA).
- `Skeleton` (animated pulse placeholder for loading).
- `Avatar` (initials fallback, square + circle variants).
- `Rating` (5-star display + interactive input).
- `Toast` (top-right, auto-dismiss 3s, success / error variants — wire via a tiny `useToast` hook + portal).

### 1.5 Iconography

Use `lucide-react` exclusively. Pick semantically:
- Home → `Home`
- Explore → `Compass` or `Search`
- Bookings → `CalendarCheck` (active) / `Calendar` (idle)
- Support → `LifeBuoy` or `HelpCircle`
- Profile → `User`
- Search → `Search`
- Bell → `Bell`
- Star → `Star`
- Emergency → `Zap` (with red bg)
- Back → `ArrowLeft`
- Forward / next step → `ChevronRight`
- Close → `X`
- Up-right CTA → `ArrowUpRight`

### 1.6 Imagery

Use the existing `serviceImages.ts` (admin already maps Unsplash URLs to all 14 categories + subcategories). **Reuse the same map.** If you need a customer-specific image that doesn't exist, add it to a new `customer-frontend/src/utils/serviceImages.ts` (mirror the export shape) and add the URL — but **prefer reuse**.

### 1.7 Layout shells (mandatory)

Build two shell components, both mirroring admin-frontend's patterns:

- **`<AppLayout>`** — used by every authenticated customer page. Top header + optional left rail (on Home/Explore/Bookings/Support/Profile) + main scrollable area. Background `bg-[#F8FAFC]`.
- **`<AuthLayout>`** — used by Login, Register, Forgot Password. Centered single-column card on a soft slate background, with the SmartServe brand mark and a tagline.

Both must include the **persistent top app bar** that holds: brand mark + search (compact) + notification bell + profile avatar with dropdown.

### 1.8 Responsive rules (match admin exactly)

- **Mobile (<768px):** Sidebar becomes a left-edge drawer toggled by a hamburger. Header collapses to icon-only actions.
- **Tablet (768–1024px):** Sidebar still drawer; main content uses 2-column grids.
- **Desktop (≥1024px):** Persistent left sidebar; main content uses 3- or 4-column grids.
- **iOS zoom prevention:** all form inputs must keep `font-size ≥ 16px` on mobile (already in admin `index.css`).

---

## 2. Splash Screen — keep it, port it

The admin's `SplashScreen.tsx` (canvas-based, ~5.4s, hand-draws an "S" then "SmartServe" wordmark with bezier-curve progressive rendering) is a **brand asset**.

**Action items:**

1. Copy `admin-frontend/src/components/common/SplashScreen.tsx` verbatim into `customer-frontend/src/components/common/SplashScreen.tsx`.
2. Mount it at app root, above `<AppRoutes>`, exactly like admin does:
   ```tsx
   const [splashDone, setSplashDone] = useState(false);
   return (
     <ErrorBoundary>
       <AppRoutes />
       {!splashDone && <SplashScreen durationMs={5400} onFinish={() => setSplashDone(true)} />}
     </ErrorBoundary>
   );
   ```
3. Adjust the **logo handoff target** so the S-box lands in the same screen-relative position where the **AuthLayout's brand mark** lives (top-center of the login card, ~48×48). The animation timing constants in `SplashScreen.tsx` were tuned for admin — they will work as-is for customer. Test it.

4. Persist a `sessionStorage` flag (`smartserve_splash_seen`) so the splash only plays **once per browser tab** and customers don't see a 5s splash on every page navigation. Admin does not do this; for customer UX it's the right call.

---

## 3. Customer Auth Flow

### 3.1 Backend reality check (what already exists)

- `/api/v1/auth/login` → **admin only** (`user.role != 'admin'` → 401).
- `/api/v1/auth/me` → any authenticated user.
- `users` table has `role` column with default `'customer'`.
- `customers` table has its own `email + password_hash` and a 1:1 `user_id` FK to `users`.
- **Gap:** there is currently **no public customer login / register endpoint**. Aastha will add these to the backend as part of this build.

### 3.2 What you must build on the customer side (frontend first, mock the API until Aastha lands the backend)

Define the **expected** contract (mirror admin's `auth.ts`):

```ts
// customer-frontend/src/api/auth.ts
export interface CustomerRegisterPayload {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
}
export interface CustomerLoginPayload { email: string; password: string; }
export interface CustomerTokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in_minutes: number;
  customer_id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
}
export interface CustomerSessionResponse {
  customer_id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  is_active: boolean;
}
```

**Expected endpoints (negotiate with Aastha, but these are the names to use):**

| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/api/v1/customer/auth/register` | `CustomerRegisterPayload` | `CustomerTokenResponse` |
| POST | `/api/v1/customer/auth/login` | `CustomerLoginPayload` | `CustomerTokenResponse` |
| GET | `/api/v1/customer/auth/me` | — (Bearer) | `CustomerSessionResponse` |
| POST | `/api/v1/customer/auth/logout` | — (Bearer) | `{ status: 'ok' }` |
| POST | `/api/v1/customer/auth/forgot-password` | `{ email }` | `{ status: 'ok' }` |
| POST | `/api/v1/customer/auth/reset-password` | `{ token, new_password }` | `{ status: 'ok' }` |

**Frontend responsibilities while the backend is being built:**

- Build the full UI now (Login, Register, Forgot Password screens).
- In `customer-frontend/src/api/client.ts`, expose the same `apiClient` pattern as admin (axios + JWT request interceptor + 401 response interceptor → clear localStorage + redirect to `/login`).
- If the endpoint returns 404 during local dev, fall back to a **clearly-marked** offline mock that returns a fake JWT (`mock.jwt`) and a stub `CustomerSessionResponse` so you can develop the rest of the UI. Use a single `USE_MOCK_AUTH` env flag (`VITE_USE_MOCK_AUTH=true`) and log a console banner `"⚠ MOCK AUTH ENABLED"` so it's never accidentally shipped.

### 3.3 Token storage

- `localStorage.setItem('smartserve_customer_token', ...)` — **do not reuse** `smartserve_token` (that's the admin namespace).
- `localStorage.setItem('smartserve_customer_user', JSON.stringify({...}))`.

### 3.4 Screens to build

| Route | Component | Notes |
|---|---|---|
| `/login` | `<CustomerLogin />` | Email + password, "Remember me" (default on), "Forgot password?" link, "Create account" link, post-splash entrance animation mirroring admin's `animate-login-card`. |
| `/register` | `<CustomerRegister />` | Full name, email, phone (optional, validated `+91` or 10-digit Indian), password (min 8, 1 uppercase, 1 number), confirm password, T&Cs checkbox, submit → auto-login. |
| `/forgot-password` | `<CustomerForgotPassword />` | Email field → success state ("Check your inbox") even if the email doesn't exist (don't leak account existence). |
| `/reset-password?token=...` | `<CustomerResetPassword />` | New password + confirm + submit. |

---

## 4. App Shell & Navigation

### 4.1 Top-level routes (under `<AppLayout>` after login)

```tsx
<Routes>
  <Route path="/login" element={<AuthLayout><CustomerLogin /></AuthLayout>} />
  <Route path="/register" element={<AuthLayout><CustomerRegister /></AuthLayout>} />
  <Route path="/forgot-password" element={<AuthLayout><CustomerForgotPassword /></AuthLayout>} />
  <Route path="/reset-password" element={<AuthLayout><CustomerResetPassword /></AuthLayout>} />

  <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<Home />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/explore/category/:category" element={<SubcategoryList />} />
    <Route path="/explore/category/:category/subcategory/:subcategory" element={<ServiceList />} />
    <Route path="/service/:serviceId" element={<ServiceDetail />} />
    <Route path="/book/:serviceId" element={<CreateBooking />} />
    <Route path="/bookings" element={<BookingsList />} />
    <Route path="/bookings/:bookingId" element={<BookingDetail />} />
    <Route path="/support" element={<Support />} />
    <Route path="/support/new" element={<NewSupportTicket />} />
    <Route path="/support/:ticketId" element={<SupportTicketDetail />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/edit" element={<ProfileEdit />} />
    <Route path="/profile/security" element={<ProfileSecurity />} />  {/* change password, sign out everywhere */}
  </Route>
  <Route path="*" element={<Navigate to="/home" replace />} />
</Routes>
```

> **Why these routes:** they match the existing mobile app's tab structure 1:1. Mobile uses `HomeTab` / `CatalogTab` / `BookingsTab` / `ProfileTab`. Web uses the same five concepts but on a single URL space. If Aastha later adds a "Support" tab to mobile, both should reflect it.

### 4.2 `<AppLayout>` anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  [≡] SmartServe        [🔍 Search services...]    [🔔] [👤 Aastha] │   ← Top header (h-18)
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                       │
│  🏠 Home │                                                       │
│  🧭 Explore │                                                     │
│  📅 Bookings│                  <main>                            │
│  🆘 Support│                  (scrollable, p-6 lg:p-8)           │
│  👤 Profile │                                                    │
│          │                                                       │
│  ──  ──  │                                                       │
│  [Log out]│                                                      │
└──────────┴──────────────────────────────────────────────────────┘
```

- Sidebar items: `Home`, `Explore`, `Bookings`, `Support`, `Profile` (in that order). Icons from lucide as specified in §1.5.
- On mobile, the sidebar becomes a left-edge drawer; tapping a route closes it (admin does this — copy the pattern).
- "Log out" is a small button at the bottom of the sidebar, full-width, `text-rose-600 hover:bg-rose-50` on hover, with `LogOut` icon. Click → clear localStorage → navigate to `/login`.
- Top header profile dropdown mirrors admin's: email + role chip (here: "Customer") → "Account Settings" → "Sign Out".

### 4.3 `<ProtectedRoute>`

Identical pattern to admin's: read `smartserve_customer_token`; if missing, `<Navigate to="/login" replace />`. If present but `GET /api/v1/customer/auth/me` returns 401, the axios interceptor already handles the redirect.

### 4.4 `<ErrorBoundary>`

**Copy admin's `ErrorBoundary.tsx` verbatim.** It already handles the case where the localStorage token is stale. Adjust the localStorage keys to `smartserve_customer_token` / `smartserve_customer_user`.

---

## 5. Page-by-Page Spec

For every page, follow this template:

> **Page N — {Name}**
> **Route:** `/...`
> **Purpose:** {1 sentence}
> **Data needed:** {API calls or "none"}
> **UI components:** {list of sections}
> **State machine:** {loading → empty → loaded → error}
> **Empty state:** {what to show}
> **Edge cases:** {auth expired, network error, no data}

### Page 1 — Home (`/home`)

**Purpose:** First screen after login. Service discovery entry, quick actions, recent activity, emergency access.

**Layout (desktop, in order top-to-bottom):**

1. **Greeting hero** — full-width card with gradient `from-[#0A1128] via-[#0F1D40] to-[#0B132B]`, white text, contains:
   - "Hi {first_name} 👋" (h1, `text-2xl font-extrabold`)
   - "What service do you need today?" (subtitle, `text-slate-300`)
   - Large rounded search bar (placeholder: "Search for AC repair, deep cleaning, salon at home...") — on submit, navigate to `/explore?q={query}`
2. **Quick category grid** — 4×2 grid of 8 most-used categories on mobile, 4×2 on tablet, up to 8×2 on desktop. Each card: rounded image (h-24) + name + chevron. Click → `/explore/category/{slug}`. Source: `GET /api/v1/catalog/categories` (derive from `/admin/catalog/services` if needed).
3. **Emergency banner** — bright red/amber gradient card with `Zap` icon: "Need urgent help? Tap for emergency services" → `/explore?emergency=true`. Only render if any service has `is_emergency=true` in the catalog.
4. **Featured / trending services** — horizontal scroll row of 6 service cards (image, name, base price in ₹, duration, "Book" button).
5. **Recommended for you** — section heading + 3-4 AI-recommendation cards. (Empty state: "We're learning your preferences — book a service to get personalized recommendations.") Uses `GET /api/v1/customer/recommendations`.
6. **Recent booking summary** — top 2 most-recent bookings (compact cards) + "View all bookings" link → `/bookings`.
7. **Quick actions row** — 3 buttons: "Explore services" (→ `/explore`), "My bookings" (→ `/bookings`), "Contact support" (→ `/support`).

**State:**
- Loading: 6× Skeleton cards in the "Featured" row + skeleton grid for categories.
- Empty categories: EmptyState with illustration + "Browse all services" CTA.
- Error: toast + retry button per section.

**Files:**
- `src/pages/customer/Home.tsx`
- `src/components/customer/SearchHero.tsx`
- `src/components/customer/CategoryQuickGrid.tsx`
- `src/components/customer/EmergencyBanner.tsx`
- `src/components/customer/FeaturedServicesRow.tsx`
- `src/components/customer/RecommendedRow.tsx`
- `src/components/customer/RecentBookingStrip.tsx`
- `src/api/customer/home.ts` (aggregates the calls)

---

### Page 2 — Explore (`/explore` + nested)

**Purpose:** The complete catalog discovery experience.

**Layout (`/explore`):**
- Sticky filter bar: search input (left, takes most width) + sort dropdown (Price: Low→High, Price: High→Low, A→Z) + "Emergency only" toggle.
- **Two view modes** (toggle top-right, `LayoutGrid` / `List` icons):
  - **By Category** (default): large card grid of all 14 categories. Each card: tall image (h-40), category name, count of services, "Browse" CTA.
  - **By Service** (when `?view=services` or search has results): service cards.
- Pagination / infinite scroll — start with "Load more" button; aim for 24 cards/page.

**Sub-route `/explore/category/:category`:**
- Breadcrumb: Home › Explore › {Category}
- List of subcategories as horizontal pill chips (sticky). Each chip: name + count.
- Service cards grid below — 3 cols desktop, 2 tablet, 1 mobile. Each card:
  - service image (h-32, rounded-2xl)
  - service name (font-semibold)
  - base price `formatCurrencyINR` (bold, blue)
  - duration (`· 60 min` muted)
  - emergency badge if applicable (red `Zap` icon)
  - "View details" button
- Card click → `/service/:serviceId`.

**Sub-route `/explore/category/:category/subcategory/:subcategory`:**
- Same as above but scoped to a single subcategory.

**Search behaviour:** Debounce 300ms. Show inline "X results for '{q}'" header. Highlight matched substring in service names.

**Data:**
- `GET /api/v1/customer/catalog/categories` (list with counts).
- `GET /api/v1/customer/catalog/services?category=&subcategory=&q=&emergency_only=` (paginated).

**Files:**
- `src/pages/customer/Explore.tsx`
- `src/pages/customer/SubcategoryList.tsx`
- `src/pages/customer/ServiceList.tsx`
- `src/components/customer/CategoryCard.tsx`
- `src/components/customer/ServiceCard.tsx` (this is the most-reused card in the app — design it well)
- `src/components/customer/FilterBar.tsx`
- `src/api/customer/catalog.ts`

---

### Page 3 — Service Detail (`/service/:serviceId`)

**Purpose:** Show full service info, allow add-on selection, kick off booking.

**Layout:**
- **Top media:** Full-width hero image (h-64 mobile, h-80 desktop) with back button (top-left, glassmorphism), share + favourite (top-right).
- **Title block:** service name (h1), category › subcategory breadcrumb, rating + review count (placeholder if none: "New"), base price (large, `text-2xl font-extrabold text-[#2563EB]`), duration, emergency badge.
- **Tabs:** `Overview` | `What's included` | `Add-ons` | `FAQs` (default: Overview).
  - **Overview:** description, distinct features as bullet chips, "Important notes" callout box.
  - **What's included:** process steps as a vertical timeline (numbered circles, title, short description, duration).
  - **Add-ons:** checkbox list of add-ons from `service.suggested_addons`. Each row: name + extra price (e.g., "+ ₹200") + short description. Selected add-ons update the running total at the bottom.
  - **FAQs:** accordion (one open at a time).
- **Sticky bottom bar** (mobile) / sticky right-rail (desktop): "Total: {running total in ₹}" + primary CTA "Continue to book" → `/book/:serviceId?addons={id,id,id}`.

**Files:**
- `src/pages/customer/ServiceDetail.tsx`
- `src/components/customer/ServiceHero.tsx`
- `src/components/customer/ServiceTabs.tsx`
- `src/components/customer/AddonList.tsx`
- `src/components/customer/StickyBookingBar.tsx`
- `src/components/common/Accordion.tsx`
- `src/api/customer/services.ts`

---

### Page 4 — Create Booking (`/book/:serviceId`)

**Purpose:** Confirm the booking request.

**Layout (single column, max-w-2xl centered):**
1. **Service summary strip** — small image (h-16) + name + base price + selected add-ons list.
2. **Form:**
   - **Scheduled date & time** — date picker (HTML5 `<input type="date">` min=today) + time picker (`<input type="time">`). If `service.is_emergency` show a toggle: "ASAP (emergency)" — when on, replace date/time with "Provider will arrive ASAP after acceptance" copy.
   - **Service location** — textarea (min 10 chars), with a "Use my saved address" select dropdown above it. Saved addresses come from the customer's profile (extend `customers` table or add `customer_addresses` table — coordinate with Aastha; until then, just store the current address in localStorage as a single `default_address` for demo).
   - **Special instructions** — optional textarea.
   - **Payment method** — read-only: "Cash on Delivery (COD)" with `Banknote` icon. Caption: "Pay the provider in cash after the service is complete."
3. **Price breakdown card** (right-rail on desktop):
   - Base price
   - Add-ons (line items)
   - Subtotal
   - Taxes (placeholder: 0% for V1)
   - **Total** (bold, large)
4. **Sticky footer:** "Confirm booking — Pay ₹{total} on completion" CTA.

**Submit:**
- POST to `POST /api/v1/customer/bookings/` (mirror the admin create payload):
  ```ts
  interface CreateBookingPayload {
    service_id: string;
    scheduled_time: string;  // ISO
    address: string;
    instructions?: string;
    addons?: { addon_id?: string; name: string; price: number }[];
    total_price: number;
    emergency_flag?: 'ASAP' | null;
  }
  ```
- On success: show success modal with the booking reference + "View booking" → `/bookings/:id` + "Book another service" → `/explore`.
- On error: inline form errors + toast.

**Files:**
- `src/pages/customer/CreateBooking.tsx`
- `src/components/booking/BookingForm.tsx`
- `src/components/booking/PriceBreakdown.tsx`
- `src/api/customer/bookings.ts`

---

### Page 5 — Bookings List (`/bookings`)

**Purpose:** All customer bookings, with status filters.

**Layout:**
- **Tabs (sticky):** `Upcoming` (Requested + Assigned + Accepted + Started) | `Active` (In Progress) | `Completed` | `Cancelled` (Cancelled + Rejected + Expired). Each tab shows a count badge.
- **Booking cards** (vertical list):
  - Service image (h-20, rounded-xl) on left.
  - Service name + status badge + scheduled date/time + provider name (or "Awaiting provider") + total price + OTP if Started.
  - Right side: chevron → `/bookings/:id`.
  - For `Requested` bookings: "Cancel booking" ghost button.
  - For `Completed` bookings without a review: "Rate service" primary button.
- **Empty state per tab:** friendly illustration + "No {tab} bookings" + CTA to explore.

**Data:** `GET /api/v1/customer/bookings?status_filter=...`.

**Files:**
- `src/pages/customer/BookingsList.tsx`
- `src/components/booking/BookingCard.tsx`
- `src/components/booking/StatusBadge.tsx` (maps enum → variant + label + icon)
- `src/components/booking/BookingTabs.tsx`
- `src/api/customer/bookings.ts`

---

### Page 6 — Booking Detail (`/bookings/:bookingId`)

**Purpose:** Single booking — full lifecycle view, timeline, payment, support, feedback.

**Layout:**
- **Header card:** service image + name + status badge + price + scheduled time.
- **Provider card** (if assigned): avatar, name, rating, phone (call button).
- **Timeline:** vertical timeline of `booking.timeline` events (Requested → Assigned → Accepted → Started → Completed → Paid). Each event: dot, label, timestamp, optional reason. Active step highlighted blue; pending steps greyed.
- **Payment section:** amount, status (Pending/Completed), method (COD). For `Completed` bookings that aren't yet `Paid`: "Mark as paid" button (only shown if the customer confirms the COD payment was collected — this is a customer-side acknowledgement; the actual server-side payment confirmation is provider-initiated).
- **Actions panel:**
  - `Requested` or `Assigned`: "Cancel booking" (with reason modal).
  - `Completed` without review: "Rate this service" → opens `FeedbackModal`.
  - Any state: "Report an issue" → opens new support ticket with this `booking_id` pre-filled → `/support/new?booking_id=...`.
- **Support tickets related to this booking** (if any): list of mini-tickets with status.

**Data:**
- `GET /api/v1/customer/bookings/:id`
- `POST /api/v1/customer/bookings/:id/cancel` (with `{ reason }`)
- `POST /api/v1/customer/bookings/:id/feedback` (rating, text, image_urls[])

**Files:**
- `src/pages/customer/BookingDetail.tsx`
- `src/components/booking/BookingTimeline.tsx`
- `src/components/booking/PaymentCard.tsx`
- `src/components/booking/FeedbackModal.tsx`
- `src/components/booking/CancelBookingModal.tsx`

---

### Page 7 — Support (`/support`)

**Purpose:** Customer feedback on completed services + support tickets.

**Layout:**
- **Section A: Recent feedback** — last 3 feedback items the customer has left, with the linked booking. "View all" link.
- **Section B: Active tickets** — list of Open + In Progress tickets, each row: subject, ticket ID, status badge, last-update timestamp. "View" → detail. "New ticket" primary button (top-right) → `/support/new`.
- **Section C: Resolved tickets** — collapsed accordion showing the last 30 days of resolved/closed tickets.

**Empty state:** "Need help? Create a support ticket and our team will get back to you." + big "New ticket" button.

**Files:**
- `src/pages/customer/Support.tsx`
- `src/components/support/TicketRow.tsx`
- `src/components/support/FeedbackRow.tsx`
- `src/api/customer/support.ts`
- `src/api/customer/feedback.ts`

---

### Page 8 — New Support Ticket (`/support/new`)

**Purpose:** Create a new ticket, optionally linked to a booking.

**Layout:**
- **Category picker** (chip group, single-select): `Booking issue` | `Payment issue` | `Service quality` | `Account / Login` | `Technical problem` | `Other`. (Drives `ai_category` server-side.)
- **Subject** — single-line input (max 120 chars, show counter).
- **Description** — textarea (min 20 chars, max 2000). Show counter.
- **Linked booking** — optional combobox (search by service name or booking ID). Pre-fill if `?booking_id=` in URL.
- **Image evidence** — multi-file uploader, max 4 images, max 5MB each, type-checked (`image/jpeg|png|webp`). Show thumbnails; allow remove. (V1 just shows them; AI analysis is backend-side.)
- **Priority** — auto-set to `High` if a category other than `Other` is chosen with a linked booking; else default `Normal`. Show as a read-only chip.
- **Submit** → `POST /api/v1/customer/support/tickets` → on success: navigate to `/support/:id`.

**Files:**
- `src/pages/customer/NewSupportTicket.tsx`
- `src/components/support/CategoryChips.tsx`
- `src/components/common/ImageUploader.tsx`
- `src/components/common/BookingCombobox.tsx`

---

### Page 9 — Support Ticket Detail (`/support/:ticketId`)

**Purpose:** View + reply to a support ticket.

**Layout:**
- **Header card:** subject, status badge, priority badge, category, ticket ID, created/updated timestamps.
- **Linked booking strip** (if any).
- **Conversation thread:** messages alternating customer (right, blue) vs support (left, slate). Each message: avatar, sender name + role, text, timestamp, attachment thumbnails if any.
- **Reply composer** (sticky bottom): textarea + "Attach image" + "Send" button. Disabled if ticket is `Closed` or `Resolved` for more than 7 days (read-only then, with explanatory caption).
- **Side panel:** ticket metadata (ticket ID, customer ID, last admin assignee if any, AI category + confidence if present).

**Files:**
- `src/pages/customer/SupportTicketDetail.tsx`
- `src/components/support/MessageBubble.tsx`
- `src/components/support/ReplyComposer.tsx`
- `src/api/customer/support.ts`

---

### Page 10 — Profile (`/profile`)

**Purpose:** View and edit customer account.

**Layout:**
- **Top card:** avatar (initials), full name, email, phone, member-since date, account status chip.
- **Quick links list:** "Edit profile" (→ `/profile/edit`), "Security & password" (→ `/profile/security`), "My bookings" (→ `/bookings`), "My support tickets" (→ `/support`).
- **Stats card:** total bookings, completed bookings, total spent (lifetime, in ₹), average rating given.
- **Sign out** (danger button) at bottom.

**Files:**
- `src/pages/customer/Profile.tsx`
- `src/components/customer/ProfileHeader.tsx`
- `src/components/customer/ProfileStats.tsx`

---

### Page 11 — Profile Edit (`/profile/edit`)

**Purpose:** Update name, email, phone.

**Layout:** Form (single column, max-w-md):
- Full name (required, min 2).
- Email (required, RFC-valid, will require re-verification — show note).
- Phone (optional, Indian format).
- Save / Cancel buttons. Optimistic update + revert on error.

**API:** `PATCH /api/v1/customer/profile` with `{ full_name?, email?, phone? }`.

---

### Page 12 — Profile Security (`/profile/security`)

**Purpose:** Change password, see active sessions, sign out everywhere.

**Layout:**
- **Change password** form: current password, new password (with strength meter: weak/medium/strong), confirm. `POST /api/v1/customer/auth/change-password`.
- **Active sessions list:** device, browser, last-active, IP, "Sign out" button per session. "Sign out of all other devices" button.
- **API:** `GET /api/v1/customer/sessions`, `POST /api/v1/customer/sessions/{id}/revoke`, `POST /api/v1/customer/sessions/revoke-all`.

---

## 6. State Management Conventions

Match admin-frontend's idiomatic style:

- **Server state:** plain `useEffect` + `useState` with a `loading | error | data` tuple. **Do not** introduce React Query / SWR.
- **Forms:** controlled components, local state per field, single `submitting` flag. Validation inline (no library) — write small `validate*` helpers in each form file.
- **Toasts:** `useToast()` hook exposing `{ showToast(message, variant) }`. Single `<ToastContainer />` mounted in `App.tsx`. 3s auto-dismiss, max 3 stacked.
- **Auth state:** `useAuth()` hook reading from localStorage, exposing `{ customer, isAuthenticated, login, logout, refresh }`. Mirror the mobile `AuthContext` so the two stay in sync conceptually.
- **No global store** unless absolutely necessary (it isn't, for V1).

---

## 7. Routing & Code Splitting

- Use `react-router-dom` v7 (admin uses v7).
- All pages lazy-loaded with `React.lazy` + `<Suspense fallback={<PageSkeleton />}>`. Route-level code splitting is mandatory — the mobile team's app is large; this will keep TTI low.
- 404 → `<Navigate to="/home" replace />`.
- A 401 from any API call → axios interceptor clears storage + `window.location.assign('/login')` (don't use `navigate()` — we may be outside the Router context).

---

## 8. Backend Coordination Contract (sign this off with Aastha)

The customer frontend assumes the following backend contracts. **If any of these don't exist, raise it before building the screen that depends on it** — do not silently mock critical paths.

| Endpoint | Method | Purpose | Frontend uses it on |
|---|---|---|---|
| `/api/v1/customer/auth/register` | POST | Register new customer | `/register` |
| `/api/v1/customer/auth/login` | POST | Customer login | `/login` |
| `/api/v1/customer/auth/me` | GET | Get current customer | `<AppLayout>`, `<Profile>`, `<ProtectedRoute>` |
| `/api/v1/customer/auth/logout` | POST | Logout | Sidebar "Log out" |
| `/api/v1/customer/auth/forgot-password` | POST | Request reset | `/forgot-password` |
| `/api/v1/customer/auth/reset-password` | POST | Apply reset | `/reset-password` |
| `/api/v1/customer/auth/change-password` | POST | Change password | `/profile/security` |
| `/api/v1/customer/sessions` | GET | List active sessions | `/profile/security` |
| `/api/v1/customer/sessions/{id}/revoke` | POST | Revoke one | `/profile/security` |
| `/api/v1/customer/sessions/revoke-all` | POST | Revoke all others | `/profile/security` |
| `/api/v1/customer/profile` | GET / PATCH | Read / update profile | `/profile`, `/profile/edit` |
| `/api/v1/customer/dashboard` | GET | Home page aggregates | `/home` |
| `/api/v1/customer/recommendations` | GET | AI recs (V1.1 — may be empty) | `/home` |
| `/api/v1/customer/catalog/categories` | GET | All categories with counts | `/explore`, `/home` |
| `/api/v1/customer/catalog/services` | GET | Paginated list w/ filters | `/explore`, `/explore/category/...` |
| `/api/v1/customer/catalog/services/{id}` | GET | Service detail (includes addons, FAQs, process steps) | `/service/:id` |
| `/api/v1/customer/bookings` | GET / POST | List / create | `/bookings`, `/book/:id` |
| `/api/v1/customer/bookings/{id}` | GET | Booking detail | `/bookings/:id` |
| `/api/v1/customer/bookings/{id}/cancel` | POST | Cancel | `/bookings/:id` |
| `/api/v1/customer/bookings/{id}/feedback` | POST | Leave rating | `/bookings/:id` |
| `/api/v1/customer/feedback` | GET | List my feedback | `/support` (Section A) |
| `/api/v1/customer/support/tickets` | GET / POST | List / create | `/support`, `/support/new` |
| `/api/v1/customer/support/tickets/{id}` | GET | Ticket detail + messages | `/support/:id` |
| `/api/v1/customer/support/tickets/{id}/messages` | POST | Add reply | `/support/:id` |
| `/api/v1/customer/uploads/image` | POST | Upload image evidence (multipart) | `/support/new`, `FeedbackModal` |

**Auth:** all endpoints require `Authorization: Bearer <customer_token>`, except `register` / `login` / `forgot-password` / `reset-password` / `catalog/*` (catalog is public for browsing). **Verify this last assumption with Aastha** — admin's catalog is admin-only; if customer catalog is also gated, you'll need a token for the Home/Explore pages.

---

## 9. Mobile-Compatibility & Cross-Platform Discipline

The user explicitly said the customer app should "seamlessly integrate with Android or iOS" later. Here's how to make that painless.

### 9.1 Reuse the mobile data model

- The mobile app already imports types from `mobile/src/api/...` and uses `smartserve_token` in AsyncStorage.
- When you define `interface BookingItem` in `customer-frontend/src/api/customer/bookings.ts`, **name the fields identically** to how the mobile screens display them (`status`, `scheduled_time`, `total_price`, `address`, `service_name`, `provider_name`, `timeline`, etc.). This lets a future consolidation merge the two without a rewrite.
- For now, accept that the web uses `localStorage` and the mobile uses `AsyncStorage`; the **response shapes must converge**.

### 9.2 Container / responsive design that works on a phone browser too

- All layouts must be **mobile-first** and degrade gracefully to desktop. Don't use Tailwind breakpoints in reverse.
- Test every page at 360×640 (small Android), 390×844 (iPhone 14), 768×1024 (iPad), 1280×800 (desktop).
- Use `min-h-screen` + `min-h-[100dvh]` on `<body>` for iOS Safari URL-bar handling.

### 9.3 No platform-specific APIs on the web

- Avoid `navigator.share` unless you wrap it in a feature check + fallback (copy link to clipboard).
- Avoid `window.Android` / `window.webkit`. None of these will be wired in V1.
- Use `Intl.NumberFormat('en-IN')` for ₹ — same on web and RN.

### 9.4 When the React Native app absorbs the web app

When Aastha (or future-you) decides to **lift the customer-frontend into the Expo app** (e.g., via `react-native-web`), these design choices will pay off:
- **No CSS-in-JS**, only Tailwind utilities → easy to swap for StyleSheet.
- **All data via `apiClient`** → swap axios for a `fetch` shim in RN.
- **No `window.*` direct access** outside the `client.ts` interceptor and `SplashScreen.tsx` → easy to replace with a native splash.
- **No `localStorage`** outside the `auth.ts` module → easy to swap for AsyncStorage.

Mark every `localStorage` / `window.*` access in the codebase with a `// platform:web` comment so future porting is one grep away.

### 9.5 Don't break the existing mobile app

- **Do not modify any file under `mobile/`** unless Aastha explicitly approves.
- The backend API is the contract. If you add a new query param, it's additive and mobile ignores it.

---

## 10. Project Structure (create this exactly)

```
SmartServe/
├── admin-frontend/        (DO NOT TOUCH)
├── backend/               (DO NOT TOUCH unless absolutely required for shared types)
├── mobile/                (DO NOT TOUCH)
└── customer-frontend/     (← YOU BUILD THIS)
    ├── .env.example
    ├── .env
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css                    (mirror admin/frontend's index.css, add customer-specific bits)
        ├── routes/
        │   └── AppRoutes.tsx
        ├── api/
        │   ├── client.ts                (axios + interceptors, mirror admin)
        │   ├── auth.ts
        │   ├── customer.ts             (GET/PATCH /customer/profile)
        │   ├── catalog.ts              (customer-side catalog browsing)
        │   ├── services.ts             (single service detail)
        │   ├── bookings.ts
        │   ├── feedback.ts
        │   ├── support.ts
        │   ├── sessions.ts
        │   ├── uploads.ts
        │   └── home.ts                 (dashboard aggregator)
        ├── auth/
        │   ├── AuthContext.tsx
        │   ├── useAuth.ts
        │   └── ProtectedRoute.tsx
        ├── components/
        │   ├── common/
        │   │   ├── ErrorBoundary.tsx
        │   │   ├── SplashScreen.tsx     (copy from admin)
        │   │   ├── ui/
        │   │   │   ├── Button.tsx
        │   │   │   ├── Card.tsx
        │   │   │   ├── Badge.tsx
        │   │   │   ├── Input.tsx
        │   │   │   ├── Textarea.tsx
        │   │   │   ├── Select.tsx
        │   │   │   ├── Modal.tsx
        │   │   │   ├── Drawer.tsx
        │   │   │   ├── Tabs.tsx
        │   │   │   ├── EmptyState.tsx
        │   │   │   ├── Skeleton.tsx
        │   │   │   ├── Avatar.tsx
        │   │   │   ├── Rating.tsx
        │   │   │   ├── Toast.tsx
        │   │   │   ├── Accordion.tsx
        │   │   │   └── ImageUploader.tsx
        │   ├── layout/
        │   │   ├── AppLayout.tsx
        │   │   ├── AuthLayout.tsx
        │   │   ├── Sidebar.tsx
        │   │   ├── TopHeader.tsx
        │   │   └── ProfileDropdown.tsx
        │   ├── customer/
        │   │   ├── SearchHero.tsx
        │   │   ├── CategoryQuickGrid.tsx
        │   │   ├── CategoryCard.tsx
        │   │   ├── EmergencyBanner.tsx
        │   │   ├── FeaturedServicesRow.tsx
        │   │   ├── RecommendedRow.tsx
        │   │   ├── RecentBookingStrip.tsx
        │   │   ├── ServiceCard.tsx
        │   │   ├── ServiceHero.tsx
        │   │   ├── ServiceTabs.tsx
        │   │   ├── AddonList.tsx
        │   │   ├── StickyBookingBar.tsx
        │   │   ├── ProfileHeader.tsx
        │   │   └── ProfileStats.tsx
        │   ├── booking/
        │   │   ├── BookingForm.tsx
        │   │   ├── PriceBreakdown.tsx
        │   │   ├── BookingCard.tsx
        │   │   ├── BookingTabs.tsx
        │   │   ├── BookingTimeline.tsx
        │   │   ├── PaymentCard.tsx
        │   │   ├── StatusBadge.tsx
        │   │   ├── FeedbackModal.tsx
        │   │   └── CancelBookingModal.tsx
        │   └── support/
        │       ├── TicketRow.tsx
        │       ├── FeedbackRow.tsx
        │       ├── MessageBubble.tsx
        │       ├── ReplyComposer.tsx
        │       ├── CategoryChips.tsx
        │       └── BookingCombobox.tsx
        ├── pages/
        │   ├── auth/
        │   │   ├── CustomerLogin.tsx
        │   │   ├── CustomerRegister.tsx
        │   │   ├── CustomerForgotPassword.tsx
        │   │   └── CustomerResetPassword.tsx
        │   └── customer/
        │       ├── Home.tsx
        │       ├── Explore.tsx
        │       ├── SubcategoryList.tsx
        │       ├── ServiceList.tsx
        │       ├── ServiceDetail.tsx
        │       ├── CreateBooking.tsx
        │       ├── BookingsList.tsx
        │       ├── BookingDetail.tsx
        │       ├── Support.tsx
        │       ├── NewSupportTicket.tsx
        │       ├── SupportTicketDetail.tsx
        │       ├── Profile.tsx
        │       ├── ProfileEdit.tsx
        │       └── ProfileSecurity.tsx
        ├── hooks/
        │   ├── useAuth.ts
        │   ├── useToast.ts
        │   ├── useDebounce.ts
        │   └── useApi.ts            (tiny generic hook: { data, loading, error, refresh })
        ├── utils/
        │   ├── formatters.ts        (copy from admin + add any customer-specific helpers)
        │   ├── serviceImages.ts     (re-export from admin, or copy map)
        │   ├── validators.ts        (email, phone, password, pincode)
        │   ├── bookingStatus.ts     (enum ↔ label ↔ variant ↔ icon maps)
        │   └── time.ts              (formatScheduledTime, timeAgo)
        └── types/
            └── index.ts             (shared cross-module types if needed)
```

---

## 11. Environment & Run

`.env.example` (commit this; copy to `.env` for local dev):

```
# Backend base URL — same as admin uses
VITE_API_BASE_URL=https://smartserve-backend-tr3p.onrender.com/api/v1

# Set to true ONLY for offline UI dev. Logs a banner on boot.
VITE_USE_MOCK_AUTH=false

# Brand
VITE_BRAND_NAME=SmartServe
VITE_BRAND_TAGLINE=Professional services, made simple.
```

`package.json` scripts (mirror admin):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc -b --noEmit"
  }
}
```

Dependencies: copy admin's `package.json` deps + add:
- `react-hot-toast` (or write your own — preferred to keep dep count low).

DevDependencies: identical to admin.

Run:
```bash
cd customer-frontend
cp .env.example .env
npm install
npm run dev          # http://localhost:5174 (admin uses 5173)
```

Add `customer-frontend` to the repo-root `README.md` in a new "Customer Frontend" section, listing how to run it (do this in a separate commit so admin-frontend changes stay isolated).

---

## 12. Quality Bar (acceptance criteria)

Before declaring the build done, **all** of these must be true:

### Functional
- [ ] User can register, log in, and log out. Token is persisted, page refresh keeps them logged in.
- [ ] Home page loads categories, featured services, and recent bookings. Each link routes correctly.
- [ ] Explore page lists categories, supports search and filter, navigates to subcategory and service detail.
- [ ] Service detail page shows description, add-ons, FAQs, and total price that updates as add-ons are toggled.
- [ ] User can create a booking. The booking appears in `/bookings` immediately with `Requested` status.
- [ ] Booking detail shows the full timeline. Cancelling a `Requested` booking works and updates the status.
- [ ] User can leave a 1–5 star review + text + optional images on a `Completed` booking. Review appears in `/support` (feedback section) and on the booking detail.
- [ ] User can create a support ticket, optionally linked to a booking, with image evidence. The ticket appears in `/support`.
- [ ] User can reply to a support ticket. Reply shows up in the thread.
- [ ] User can edit profile fields and change password.
- [ ] User can sign out of a single session or all other sessions.

### Visual / UX
- [ ] Every page matches the design tokens in §1. No off-brand colors, no `text-gray-*` Tailwind palette (use `slate-*`).
- [ ] Every interactive element has a hover + focus state.
- [ ] Every form has inline validation, error messages, and a success toast on submit.
- [ ] Loading skeletons appear within 100ms of route navigation.
- [ ] Empty states exist for every list (categories, services, bookings, tickets).
- [ ] Mobile (360px wide) layout has no horizontal scroll, no overlapping elements, no unreadable text.
- [ ] Splash plays once per tab on first load. Logo handoff lands in the AuthLayout brand mark position.

### Engineering
- [ ] `npm run build` succeeds with zero TypeScript errors.
- [ ] `npm run typecheck` succeeds.
- [ ] No `any` in the codebase (grep for `: any` and `as any`).
- [ ] Every API call has a typed response interface.
- [ ] Every list has a `key` prop on its rendered items.
- [ ] All `localStorage` / `window.*` accesses have a `// platform:web` comment.
- [ ] No console errors in dev or prod build.
- [ ] No hardcoded mock data is reachable in production. The `VITE_USE_MOCK_AUTH` flag is the single offline escape hatch.
- [ ] `tsconfig.json` has `strict: true` and `noUncheckedIndexedAccess: true`.

### Cross-platform
- [ ] No file under `mobile/` or `admin-frontend/` is modified by this build (verify with `git diff --stat main`).
- [ ] Type names for `Booking`, `Service`, `SupportTicket`, `Feedback` are compatible with the mobile app's `mobile/src/api/...` interfaces (or a `// mobile-parity:` comment explains the difference).

---

## 13. Anti-patterns to Avoid

1. **No copy-paste of the admin sidebar verbatim** — the customer sidebar is shorter (5 items vs 11). Build it from scratch with the same visual language, don't import admin's component.
2. **No new colour palette.** If you need a new colour, justify it; default to the existing tokens.
3. **No emoji as icons.** Use lucide. (Emoji is fine inside placeholder copy / empty-state illustrations, never as UI controls.)
4. **No 100vh on iOS** — use `100dvh` with `100vh` fallback.
5. **No `alert()` / `confirm()`** — use the Modal / Toast components.
6. **No `dangerouslySetInnerHTML`** — render user content as text.
7. **No "powered by SmartServe" footer in the customer app** — they ARE SmartServe. The admin app has a subtle "Become a Pro" promo card because the viewer is an admin. The customer app's "promo" is a referral / loyalty section on the Profile page, not a footer.
8. **No data fetching inside render** — always `useEffect` or event handler.
9. **No infinite re-render loops from inline `useEffect` deps** — extract objects / functions with `useCallback` / `useMemo` where needed.
10. **No `<img>` without `alt`** — every image, decorative or not, gets an `alt` (empty string for decorative).

---

## 14. Build Order (do not skip ahead)

Build in this exact order. Each phase ends with a green typecheck + a manual smoke test before moving on.

1. **Bootstrap** — `package.json`, `vite.config.ts`, `tsconfig.*`, `index.html`, `main.tsx`, `App.tsx` with splash + error boundary, empty `AppRoutes`. Run `npm run dev` and verify the splash plays and you see a blank screen.
2. **Design primitives** — `index.css` (copy from admin + brand-color overrides), `Button`, `Card`, `Badge`, `Input`, `Textarea`, `Select`, `Modal`, `Drawer`, `Tabs`, `EmptyState`, `Skeleton`, `Avatar`, `Rating`, `Toast`, `Accordion`, `ImageUploader`. Build a tiny `/dev/ui` route (gated by `import.meta.env.DEV`) that renders every primitive so you can eyeball them.
3. **API + auth plumbing** — `api/client.ts`, `api/auth.ts`, `AuthContext`, `useAuth`, `ProtectedRoute`. Then `/login`, `/register`, `/forgot-password`, `/reset-password` with full validation. Manually test register → login → logout → refresh.
4. **App shell** — `AppLayout`, `AuthLayout`, `Sidebar`, `TopHeader`, `ProfileDropdown`, `AppRoutes` skeleton (Home / Explore / Bookings / Support / Profile placeholders). Verify navigation, sidebar drawer on mobile, logout from dropdown.
5. **Catalog discovery** — `Home` (without recommendations for now), `Explore`, `SubcategoryList`, `ServiceList`, `ServiceDetail`. Categories and services must come from real API calls (or a clearly-marked mock if catalog endpoint is not yet public).
6. **Booking flow** — `CreateBooking`, `BookingsList`, `BookingDetail`, `BookingTimeline`, `PaymentCard`, `FeedbackModal`, `CancelBookingModal`, `StatusBadge`, `PriceBreakdown`. End-to-end test: discover → detail → book → see in list → see detail → cancel/feedback.
7. **Support flow** — `Support`, `NewSupportTicket`, `SupportTicketDetail`, `MessageBubble`, `ReplyComposer`, `CategoryChips`, `BookingCombobox`, `ImageUploader`, `TicketRow`, `FeedbackRow`.
8. **Profile** — `Profile`, `ProfileEdit`, `ProfileSecurity`, sessions list, change password.
9. **Polish pass** — empty states, error states, loading skeletons, focus rings, keyboard nav, mobile drawer transitions, splash-once-per-tab.
10. **Acceptance** — run through §12 checklist top to bottom. File any issues as TODOs with file:line references.

---

## 15. Hand-off Checklist (the last thing you do)

When the build is complete, produce a `customer-frontend/README.md` that includes:

- One-paragraph project description.
- Tech stack list.
- Setup instructions (`cp .env.example .env`, `npm install`, `npm run dev`).
- Folder map (paste the tree from §10).
- Environment variables reference.
- API contract summary (link to §8 of this prompt or copy the table).
- Known limitations / future work (e.g., "AI recommendations endpoint not yet exposed by backend; UI is in place").
- Mobile-parity notes (which interfaces match `mobile/src/api/...`).
- A "what's not done" section so Pushkar / Aastha can pick up loose threads.

Also commit a `render.yaml` snippet (or an `INFRASTRUCTURE.md`) describing how to deploy the built `customer-frontend/dist/` to Render as a static site (point at admin's `render.yaml` as a reference).

---

## 16. Final Reminders

- **You are building on Pushkar and Aastha's existing work.** Read their code, mirror their patterns, respect their conventions. The user wants the customer dashboard to feel like it was built by the same team.
- **Polish is a feature.** A clean button hover state, a well-timed skeleton, an empty state with personality — these are what make SmartServe feel like a product and not a wireframe.
- **Ship the smallest working thing first.** A working Home + Explore + Book + View Bookings is more valuable than a half-finished everything.
- **Ask early, ask once.** If the backend contract in §8 is wrong, raise it before you've built five screens against the wrong shape.

Now go build. 🚀
