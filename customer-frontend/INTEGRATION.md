# SmartServe — Backend Integration Guide & API Contract (`INTEGRATION.md`)

> **Target Audience:** Aastha (Backend Lead) & Pushkar Kanjani (Platform / Cloud)  
> **Author:** Antigravity (Customer Web Build Agent)  
> **Date:** September 1, 2026  
> **Purpose:** Comprehensive integration specification for shipping the `/api/v1/customer/*` backend routes.

---

## 1. Overview

The customer web frontend (`customer-frontend/`) is complete, production-built, fully responsive, and typed with **zero `any` types**. Currently, the frontend operates against a deterministic mock fallback layer (`VITE_USE_MOCK_AUTH=true`) because the backend endpoints under `/api/v1/customer/*` return `404 Not Found` on the live Render environment (`https://smartserve-backend-tr3p.onrender.com/api/v1`).

This document provides the exact field-level contract, data models, endpoint specifications, and migration sequence required to connect the frontend to live FastAPI endpoints without breaking existing UI logic.

---

## 2. Authentication & Identity Architecture

### 2.1 Token Model & Headers
- **Header:** `Authorization: Bearer <access_token>`
- **Token Type:** Standard JWT signed with `JWT_SECRET_KEY` using `HS256`.
- **Payload Claims:**
  ```json
  {
    "sub": "cust-uuid-1001",
    "email": "customer@example.com",
    "role": "customer",
    "exp": 1788284400
  }
  ```
- **Token Storage:** Stored in `localStorage.setItem('smartserve_customer_token', token)` on the web (`// platform:web`).
- **401 Response Behavior:** When Axios receives a `401 Unauthorized` status, the frontend clears `smartserve_customer_token` and `smartserve_customer_user` and redirects to `/login`.

### 2.2 Reusing Existing Auth vs Dedicated Customer Auth
- The admin dashboard currently logs in via `POST /api/v1/auth/login`.
- **Recommendation:** Implement dedicated `/api/v1/customer/auth/*` endpoints (or extend existing `/auth/login` to validate user role matches `'customer'`).

---

## 3. Comprehensive Endpoint Status Table

| Endpoint | Method | Required Payload / Params | Expected Response | Live Status |
|---|---|---|---|---|
| `/customer/auth/register` | `POST` | `{ full_name, email, password, phone? }` | `{ access_token, token_type, user }` | 🔴 Missing (404) |
| `/customer/auth/login` | `POST` | `{ email, password }` | `{ access_token, token_type, user }` | 🔴 Missing (404) |
| `/customer/auth/me` | `GET` | Header Bearer Token | `CustomerUser` object | 🔴 Missing (404) |
| `/customer/auth/logout` | `POST` | Header Bearer Token | `{ success: true }` | 🔴 Missing (404) |
| `/customer/auth/forgot-password` | `POST` | `{ email }` | `{ message: string }` | 🔴 Missing (404) |
| `/customer/auth/reset-password` | `POST` | `{ token, password }` | `{ message: string }` | 🔴 Missing (404) |
| `/customer/catalog/categories` | `GET` | None | `Array<CategoryItem>` | 🔴 Missing (404) |
| `/customer/catalog/services` | `GET` | `?category_id&search&page&limit` | `{ items: ServiceItem[], total, page }` | 🔴 Missing (404) |
| `/customer/catalog/services/{id}` | `GET` | Path `id` | `ServiceItem` (with addons & faqs) | 🔴 Missing (404) |
| `/customer/bookings` | `GET` | `?status` (`all` \| `upcoming` \| `completed`) | `Array<BookingItem>` | 🔴 Missing (404) |
| `/customer/bookings` | `POST` | `CreateBookingPayload` | `BookingItem` | 🔴 Missing (404) |
| `/customer/bookings/{id}` | `GET` | Path `id` | `BookingItem` | 🔴 Missing (404) |
| `/customer/bookings/{id}/cancel` | `POST` | `{ reason: string }` | `BookingItem` (status: Cancelled) | 🔴 Missing (404) |
| `/customer/bookings/{id}/feedback`| `POST` | `{ rating, review_text?, image_urls? }`| `BookingItem` | 🔴 Missing (404) |
| `/customer/support/tickets` | `GET` | None | `Array<SupportTicket>` | 🔴 Missing (404) |
| `/customer/support/tickets` | `POST` | `CreateTicketPayload` | `SupportTicket` | 🔴 Missing (404) |
| `/customer/support/tickets/{id}` | `GET` | Path `id` | `SupportTicket` | 🔴 Missing (404) |
| `/customer/support/tickets/{id}/messages`| `POST`| `{ text, attachments? }` | `TicketMessage` | 🔴 Missing (404) |
| `/customer/profile` | `GET` | Header Bearer Token | `CustomerProfile` | 🔴 Missing (404) |
| `/customer/profile` | `PATCH` | `{ full_name?, email?, phone? }` | `CustomerProfile` | 🔴 Missing (404) |
| `/customer/sessions` | `GET` | Header Bearer Token | `Array<UserSession>` | 🔴 Missing (404) |
| `/customer/sessions/{id}/revoke` | `POST` | Path `id` | `{ success: true }` | 🔴 Missing (404) |
| `/customer/sessions/revoke-all` | `POST` | Header Bearer Token | `{ success: true }` | 🔴 Missing (404) |
| `/customer/uploads/image` | `POST` | `multipart/form-data` | `Array<string>` (image URLs) | 🔴 Missing (404) |

---

## 4. Field-Level Data Models & Pydantic Contracts

### 4.1 `CustomerUser`
```ts
// TypeScript (frontend/src/api/auth.ts)
export interface CustomerUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  is_verified: boolean;
}
```
**Matching Pydantic Schema (`backend/app/schemas/customer.py`):**
```python
class CustomerUserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool = True
    is_verified: bool = True
```

### 4.2 `ServiceItem`
```ts
// TypeScript (frontend/src/api/catalog.ts)
export interface ServiceItem {
  id: string;
  category_id: string;
  category: string;
  subcategory_id: string;
  subcategory: string;
  name: string;
  short_description: string;
  full_description: string;
  base_price: number;
  duration_minutes: number;
  rating: number;
  review_count: number;
  image_url: string;
  is_popular: boolean;
  is_emergency: boolean;
  suggested_addons: AddonItem[];
  faqs?: FAQItem[];
}
```

### 4.3 `BookingItem`
```ts
// TypeScript (frontend/src/api/bookings.ts)
export interface BookingItem {
  id: string;
  booking_reference: string;
  customer_id: string;
  service_id: string;
  service_name: string;
  service_image: string;
  category: string;
  scheduled_time: string;
  address: string;
  instructions?: string;
  status: 'Requested' | 'Assigned' | 'Accepted' | 'Started' | 'Completed' | 'Cancelled' | 'Rejected' | 'Expired';
  payment_status: 'Pending' | 'Completed';
  payment_method: 'COD';
  addons?: AddonSelection[];
  total_price: number;
  provider_name?: string;
  provider_phone?: string;
  provider_rating?: number;
  otp?: string;
  timeline: TimelineEvent[];
  created_at: string;
  has_feedback?: boolean;
}
```

---

## 5. Migration Sequence (Backend Phase Plan)

1. **Phase A — Auth & Identity:** Ship `/api/v1/customer/auth/register`, `/login`, and `/me`. Unblocks authenticated requests.
2. **Phase B — Public Catalog:** Ship `/api/v1/customer/catalog/categories` and `/services`.
3. **Phase C — Bookings Engine:** Ship `/api/v1/customer/bookings` (GET & POST) and booking action endpoints (cancellation & ratings).
4. **Phase D — Support & Profile:** Ship support ticket endpoints, profile read/update, sessions list/revoke, and upload handler.
5. **Phase E — Flip Mock Flag:** Set `VITE_USE_MOCK_AUTH=false` by default and run full Playwright E2E suite against live backend.

---

## 6. E2E Verification Plan for Backend Landing

Once backend endpoints are deployed, run:
```bash
cd customer-frontend
VITE_USE_MOCK_AUTH=false VITE_API_BASE_URL=https://smartserve-backend-tr3p.onrender.com/api/v1 npm run test:e2e
```
Every green Playwright spec guarantees zero regressions between frontend components and FastAPI endpoints.

---

## 7. Open Architectural Questions for Aastha

1. **OTP Generation:** Should the backend generate the 4-digit service start OTP when a booking switches to `Started` status? *(Current UI expects `booking.otp` string)*.
2. **Password Reset Token:** Does `/forgot-password` return a reset link or send an email via SendGrid? *(Current UI accepts a token parameter at `/reset-password?token=...`)*.
