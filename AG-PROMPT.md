# AG — Execution Prompt (SmartServe Customer Frontend)

> **Path to the spec you must follow:**
> `C:\MyDrive\SEM-7\BigData\SmartServe\customer-frontend-INSTRUCTIONS.md`
>
> That single markdown file is your **complete build specification**. Read it end-to-end before you write a single line of code. Do not skim, do not skip sections, do not improvise the architecture — every decision (folder layout, design tokens, route map, API contract, mobile-parity rules, build order, acceptance criteria) is already made in there.

---

## 0. Who you are and what you're doing

You are the build agent for the **SmartServe Customer Frontend** — a new web app (`customer-frontend/`) that lives next to the existing `admin-frontend/`, `backend/`, and `mobile/` folders inside the `SmartServe/` monorepo.

- **Pushkar Kanjani** owns Provider / cloud / deployment.
- **Aastha** owns Customer / backend / AI/ML.
- **You** are building the customer-facing web app that matches the admin dashboard's design system, consumes the existing FastAPI backend, and is designed to stay compatible with the existing Expo / React Native mobile app.

The brand target is a polished, production-grade customer experience — urban-company-style, India-first (₹ / en-IN locale), mobile-first responsive.

---

## 1. How to approach this

### 1.1 Read first, ask early
1. Open and read `customer-frontend-INSTRUCTIONS.md` **fully** (it's ~1000 lines / 56 KB).
2. Skim the **existing `admin-frontend/`** to absorb the patterns you're being asked to mirror (especially `src/api/client.ts`, `src/components/common/SplashScreen.tsx`, `src/components/layout/AdminLayout.tsx`, `src/index.css`, `src/utils/formatters.ts`).
3. Glance at `backend/app/api/v1/` to confirm the customer-endpoint contract listed in §8 of the spec. If any endpoint clearly doesn't exist yet (e.g. `/api/v1/customer/auth/login`), do not block — use the `VITE_USE_MOCK_AUTH` escape hatch from §3.2 and surface the gap in the hand-off report.
4. Glance at `mobile/src/api/` to confirm the type-name parity requirements in §9.1.

### 1.2 Build in the 10 phases in §14 of the spec
Strict order. **No skipping ahead.** Each phase ends with a green `npm run typecheck` and a manual smoke test of the affected routes before moving to the next.

| Phase | Deliverable | Gate to next phase |
|---|---|---|
| 1 | Bootstrap (`package.json`, Vite, TS, App.tsx, splash, ErrorBoundary) | `npm run dev` shows splash → blank screen without console errors |
| 2 | UI primitives in `components/common/ui/*` + `/dev/ui` route | All primitives render correctly on the dev page |
| 3 | API client + AuthContext + Login / Register / Forgot / Reset | Register → Login → Refresh-persists-session → Logout all work |
| 4 | AppLayout + AuthLayout + Sidebar + TopHeader + routes skeleton | Navigation works on mobile + desktop, sidebar drawer opens/closes, logout works from dropdown |
| 5 | Home + Explore + SubcategoryList + ServiceList + ServiceDetail | Browse end-to-end from Home → service detail with real catalog data (or marked mock) |
| 6 | CreateBooking + BookingsList + BookingDetail + Timeline + Feedback + Cancel | Full booking lifecycle works end-to-end |
| 7 | Support + NewSupportTicket + TicketDetail + ReplyComposer | Create ticket with images, reply, see it in thread |
| 8 | Profile + ProfileEdit + ProfileSecurity | Edit profile, change password, see active sessions |
| 9 | Polish pass (empty states, skeletons, focus rings, splash-once-per-tab) | Every list has all three states (loading / empty / error) |
| 10 | Acceptance pass against §12 checklist | Every box ticked or explicitly listed as TODO in the hand-off report |

### 1.3 Use worktree isolation
If the repo is a git repo, do your work in a worktree branch:
```bash
cd C:\MyDrive\SEM-7\BigData\SmartServe
git worktree add ../smartserve-customer-frontend -b feat/customer-frontend
cd ../smartserve-customer-frontend
```
This keeps `admin-frontend/`, `backend/`, `mobile/` untouched as required by §9.5 of the spec.

---

## 2. Hard rules (violating any of these is a fail)

1. **Do not touch `admin-frontend/`, `backend/`, or `mobile/`** unless an API contract gap forces it. If you must modify the backend, do it in a separate commit with a clear `// backend-bridge:` comment and a line item in the hand-off report.
2. **No `any` in TypeScript.** `tsconfig` must have `strict: true` and `noUncheckedIndexedAccess: true`. `npm run typecheck` must pass with zero errors.
3. **Every API call is typed** with an interface that mirrors the backend Pydantic schema field names.
4. **All currency is ₹ via `Intl.NumberFormat('en-IN')`** or the `formatCurrencyINR` / `formatRupee` helpers copied from admin's `utils/formatters.ts`.
5. **Splash + theme are retained from admin** — copy `SplashScreen.tsx` verbatim, use the exact colour tokens from §1.1 of the spec, build `AppLayout` / `AuthLayout` in the same visual language.
6. **V1 payment is Cash on Delivery only.** Do not build card / UPI / wallet UI.
7. **No new heavy deps** without justification. Stick to the admin-frontend's stack.
8. **Mobile-parity types** — names of `BookingItem`, `ServiceItem`, `SupportTicketItem`, `FeedbackItem` must be field-compatible with the mobile app's types. Add `// mobile-parity:` comments where you deviate.
9. **Mark every `localStorage` / `window.*` access with `// platform:web`** so future RN port is one grep away.

---

## 3. Communication protocol

AG, I want short, structured updates — not walls of text. After each phase, produce a 5-bullet status block:

```
PHASE 3 — DONE / IN PROGRESS / BLOCKED
- Files added: <count>
- Key files: <list of new files, one per line>
- Decisions made: <any choice you made that wasn't in the spec>
- Gaps/blockers: <backend endpoints missing, ambiguous spec, etc.>
- Next: <one-line description of phase 4>
```

If you hit a blocker that affects the architecture, **stop and ask** before guessing. For small judgement calls (a button colour variant, a placeholder copy tweak, an empty-state illustration choice), **just decide and move on** — log the decision in the status block.

---

## 4. Definition of Done

The build is "done" when **all** of these are true:

- [ ] All 10 phases from §14 of the spec are complete.
- [ ] Every item in the §12 acceptance checklist passes (or is explicitly listed as a known TODO).
- [ ] `npm run typecheck` passes with zero errors.
- [ ] `npm run build` produces a clean `dist/`.
- [ ] `git diff --stat main` shows changes only inside `customer-frontend/` (plus a `README.md` / `customer-frontend-INSTRUCTIONS.md` handoff at the repo root if you want to).
- [ ] `customer-frontend/README.md` exists and follows the §15 hand-off template.
- [ ] A hand-off report (markdown) is written at `customer-frontend/HANDOFF.md` covering: what was built, what's mocked, what's not done, type-parity notes vs. mobile, deploy notes for Render static-site hosting.

---

## 5. Start now

1. Read `C:\MyDrive\SEM-7\BigData\SmartServe\customer-frontend-INSTRUCTIONS.md` in full.
2. Skim `admin-frontend/` (especially the files listed in §1.1 of this prompt).
3. Confirm the worktree (or branch) you're working in.
4. Begin Phase 1.
5. After each phase, post the 5-bullet status block.
6. When §4 is satisfied, hand off.

Go. 🚀
