# Mr. Hyre — Complete Work Remaining

> **Audit Date:** June 12, 2026
> **Audited By:** AI Code Audit
> **Project Stack:** Next.js 16 (Frontend) + Express.js (Backend) + PostgreSQL/Supabase (Database) + Prisma ORM + OpenAI API

---

## Table of Contents

1. [Empty Files & Dead Code](#1-empty-files--dead-code)
2. [Empty Directories (Stub/Skeleton)](#2-empty-directories-stubskeleton)
3. [Frontend — Missing & Incomplete Features](#3-frontend--missing--incomplete-features)
4. [Backend — Missing & Incomplete Features](#4-backend--missing--incomplete-features)
5. [Security & Authentication Gaps](#5-security--authentication-gaps)
6. [Database & Schema Issues](#6-database--schema-issues)
7. [DevOps, CI/CD & Infrastructure](#7-devops-cicd--infrastructure)
8. [UI/UX Improvements](#8-uiux-improvements)
9. [Performance & Optimization](#9-performance--optimization)
10. [Testing](#10-testing)
11. [Documentation](#11-documentation)

---

## 1. Empty Files & Dead Code

These files exist in the codebase but are completely empty (0 bytes) or contain no functional code:

| File | Status | Action Required |
|------|--------|-----------------|
| `lib/matching.ts` | **Empty file (0 bytes)** | Implement or delete. The actual matching logic lives in `lib/ai-matcher.ts`. This file is unused. |
| `components/landing/Candidate.tsx` | **Empty file (0 bytes)** | Implement the Candidate section for the landing page, or delete if not needed. It is NOT imported in `app/page.tsx`. |

### Dead Code / Debug Routes

| File | Issue | Action Required |
|------|-------|-----------------|
| `app/api/test-db/route.ts` | Debug-only route that exposes Prisma model names publicly | **Delete** — security risk in production |
| `app/api/debug/users/` | Empty directory, likely a leftover debug endpoint | **Delete** |
| `app/api/debug/` | Contains only empty subdirectory | **Delete entire directory** |
| `backend/test-flow.html` | Integration test UI that hardcodes `http://localhost:5000` | **Delete** — not needed in production |
| `backend/check-counts.js` | Diagnostic script for counting DB records | **Delete** — development-only utility |

### Unused Static Assets

| File | Issue |
|------|-------|
| `public/file.svg` | Default Next.js scaffold asset — unused |
| `public/globe.svg` | Default Next.js scaffold asset — unused |
| `public/next.svg` | Default Next.js scaffold asset — unused |
| `public/vercel.svg` | Default Next.js scaffold asset — unused |
| `public/window.svg` | Default Next.js scaffold asset — unused |
| `public/hero-bg.png`, `hero-bg-v2.png`, `hero-bg-v3.png` | Multiple hero background versions — audit which is actually used and delete the rest |

### Duplicate Config Files

| File | Issue |
|------|-------|
| `postcss.config.js` AND `postcss.config.mjs` | Two PostCSS config files exist. Only one should be kept (likely `.mjs`). |

---

## 2. Empty Directories (Stub/Skeleton)

These directories exist but contain no files, indicating planned but unimplemented features:

| Directory | Purpose | Action Required |
|-----------|---------|-----------------|
| `components/candidate/` | Reusable candidate UI components | Build shared components (profile card, resume card, stats widgets) |
| `components/recruiter/` | Reusable recruiter UI components | Build shared components (job card, analytics widgets) |
| `components/dashboard/` | Shared dashboard components | Build shared dashboard widgets |
| `app/settings/` | Root settings page (not role-specific) | Implement or redirect to role-specific settings |
| `app/interviews/` | Root-level interviews page | Implement or redirect to role-specific interviews |
| `app/candidate/admin/` | Candidate admin area | Purpose unclear — delete or implement |

---

## 3. Frontend — Missing & Incomplete Features

### 3.1 Contact Page — Form Not Functional

**File:** `app/contact/page.tsx`

The contact form is **purely visual**. The `<form>` has no `onSubmit` handler, no API call, no state management. The "Send Message" button does nothing.

**Work Required:**
- [ ] Add form state management (name, email, message)
- [ ] Create `/api/contact` route to handle submissions
- [ ] Send contact form data via email (nodemailer) or store in DB
- [ ] Add form validation and success/error feedback

### 3.2 Settings Pages — UI-Only Toggles

**File:** `app/candidate/settings/page.tsx`

The settings page has extensive UI but several features are **non-functional**:

- [ ] **AI Stealth Mode toggle** — UI only, no API call to persist setting
- [ ] **Public AI Profile toggle** — UI only, no backend support
- [ ] **Auto-Pilot Selection toggle** — UI only, no backend support
- [ ] **Email notifications toggle** — UI only, no backend support
- [ ] **Match Threshold slider** — Hardcoded at 85%, not interactive
- [ ] **Two-Factor Auth "Configure" button** — No implementation
- [ ] **"Revoke All" sessions button** — No session management API
- [ ] **"Deactivate Account" button** — No deactivation API
- [ ] **"Request Deletion" button** — No account deletion API
- [ ] **"Setup Push" notifications button** — No push notification system
- [ ] **Avatar Upload overlay** — Shows upload UI on hover but has no file upload handler
- [ ] **Recruiter settings page** — Check if `app/recruiter/settings/` has same issues

### 3.3 Messaging System — Polling-Based

**File:** `app/messages/page.tsx`

- [ ] Current implementation uses `setInterval` polling every 5 seconds — replace with WebSockets or Server-Sent Events for real-time messaging
- [ ] No read receipts / delivery indicators
- [ ] No typing indicators
- [ ] No message search functionality

### 3.4 Missing Next.js Middleware

**Deleted:** `proxy.ts` (was never active as `middleware.ts`)

The project currently has **NO active Next.js middleware** for route protection. All auth is done at the API route level, but client-side pages can still be accessed without authentication before the client-side redirect kicks in.

- [ ] Create a proper `middleware.ts` file for server-side route protection
- [ ] Implement role-based route guards (candidate/recruiter/admin paths)
- [ ] Redirect unauthenticated users before page render

### 3.5 Missing Footer on Landing Page

**File:** `app/page.tsx`

The landing page imports `Navbar`, `Hero`, `Features`, `Engagement`, `Recruiter`, `Pricing`, and `CTA` but does **NOT** include the `Footer` component (which exists at `components/landing/Footer.tsx`).

- [ ] Add `<Footer />` to the landing page

### 3.6 Pricing Page — No Payment Integration

**File:** `app/pricing/page.tsx` + `components/landing/Pricing.tsx`

- [ ] No Stripe/Razorpay integration for payment processing
- [ ] Plan selection buttons are non-functional
- [ ] No subscription management
- [ ] No billing history page

### 3.7 LinkedIn OAuth

**File:** `app/api/auth/[...nextauth]/route.ts`

- [ ] LinkedIn OAuth credentials are in `.env` but verify if the LinkedIn provider is configured in NextAuth
- [ ] Test LinkedIn login flow end-to-end

---

## 4. Backend — Missing & Incomplete Features

### 4.1 Unprotected Routes

The Express backend has an `authMiddleware.js` with `requireAuth`, but it is **only applied to 2 out of 6 route files**:

| Route File | Auth Protected? | Issue |
|------------|:-:|-------|
| `analyticsRoutes.js` | ✅ | Uses `requireAuth` |
| `userRoutes.js` | ✅ | Uses `requireAuth` |
| `resumeRoutes.js` | ❌ | **Anyone can upload resumes** |
| `jobRoutes.js` | ❌ | **Anyone can create/view jobs** |
| `matchRoutes.js` | ❌ | **Anyone can run candidate matching** |
| `authRoutes.js` | ❌ | Expected (public signup/login) |

**Work Required:**
- [ ] Add `requireAuth` middleware to `resumeRoutes.js`
- [ ] Add `requireAuth` middleware to `jobRoutes.js` (at least for POST/create)
- [ ] Add `requireAuth` middleware to `matchRoutes.js`

### 4.2 Dual Prisma Schema Inconsistency

The project has **two separate Prisma schemas** that have diverged significantly:

| Feature | Root Schema (`prisma/schema.prisma`) | Backend Schema (`backend/prisma/schema.prisma`) |
|---------|------|------|
| User model | Has OAuth fields, `isVerified`, relations to profiles | Has `phone`, `website`, `industry`, `teamSize`, no OAuth |
| Candidate model | Has `userId` relation, `phone`, `linkedin`, `github`, `website` | No `userId`, no `phone`/`linkedin`/`github`/`website` |
| Recruiter model | Has `userId`, `companyEmail`, `bio`, `website`, `location`, `marketStatus`, `phone`, `logoUrl`, `coverUrl`, `isVerified` | Missing most of these fields |
| Interview model | ✅ Exists | ❌ Missing entirely |
| OtpVerification model | ✅ Exists | ❌ Missing entirely |
| Message model | Full relations | Minimal |

**Work Required:**
- [ ] Consolidate into a single Prisma schema used by both frontend and backend
- [ ] OR keep separate schemas but ensure they are compatible with the shared database

### 4.3 Backend Has No Role in Frontend Flow

The Express backend (`localhost:5000`) appears to be a **standalone API** that is NOT called by the Next.js frontend. The frontend uses its own API routes under `app/api/`. The backend seems to be an older or separate version of the API.

- [ ] Clarify the backend's purpose: Is it for external integrations, mobile apps, or legacy?
- [ ] If unused by the main app, consider deprecating or documenting its role

### 4.4 CORS Configuration

**File:** `backend/src/index.js`

```js
app.use(cors());
```

CORS is wide open with `cors()` (allows all origins). This is a security risk in production.

- [ ] Configure CORS to allow only specific origins (frontend domain)

---

## 5. Security & Authentication Gaps

### 5.1 Exposed API Keys in `.env`

The `.env` file contains **real production API keys** (OpenAI, Google OAuth, Supabase credentials) and is committed to the repository.

- [ ] **CRITICAL:** Rotate ALL exposed API keys immediately
- [ ] Add `.env` to `.gitignore` (it should already be there — verify)
- [ ] Use environment variable management (Vercel env vars, Docker secrets)

### 5.2 JWT Secret Fallback

**File:** `backend/src/controllers/authController.js` and `backend/src/middleware/authMiddleware.js`

```js
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-fallback-key";
```

A hardcoded fallback JWT secret is extremely dangerous. If `JWT_SECRET` is unset, anyone can forge tokens.

- [ ] Remove fallback value — crash if `JWT_SECRET` is undefined
- [ ] Add startup validation for required environment variables

### 5.3 No CSRF Protection

- [ ] No CSRF tokens on form submissions
- [ ] `sameSite: "lax"` on cookies provides minimal protection

### 5.4 No Rate Limiting on Login

**File:** `app/api/auth/login/route.ts`

The signup route has rate limiting via `checkRateLimit()`, but the **login route does not**. This allows brute-force attacks.

- [ ] Add rate limiting to the login endpoint
- [ ] Consider account lockout after N failed attempts

### 5.5 No Input Sanitization

- [ ] No HTML/XSS sanitization on user inputs (biography, messages, job descriptions)
- [ ] SQL injection is handled by Prisma, but NoSQL-style injection via JSON payloads is not checked

### 5.6 Gmail App Password in `.env`

```
GMAIL_APP_PASSWORD="Mr.hyre#2026@"
```

This appears to be a regular password, not a Google App Password (which are 16 random characters). Gmail SMTP will likely reject this.

- [ ] Generate a proper Google App Password for SMTP
- [ ] Or migrate to a transactional email service (SendGrid, Resend, Postmark)

---

## 6. Database & Schema Issues

### 6.1 No Database Migrations

The project uses `prisma db push` which is not suitable for production databases.

- [ ] Set up proper Prisma migrations (`prisma migrate dev` / `prisma migrate deploy`)
- [ ] Create initial migration baseline from current schema
- [ ] Add migration strategy to deployment pipeline

### 6.2 Missing Database Indexes

The Prisma schema only has one explicit index:

```prisma
@@index([email, otp])  // on OtpVerification
```

- [ ] Add indexes on frequently queried fields:
  - `Shortlist.candidateId`
  - `Shortlist.jobId`
  - `Job.recruiterId`
  - `Message.recruiterId` + `Message.candidateId`
  - `Resume.userId`
  - `Interview.shortlistId`

### 6.3 No Soft Delete

All delete operations are hard deletes. Consider implementing soft delete for:
- [ ] User accounts (GDPR compliance)
- [ ] Job postings (archival)
- [ ] Messages (audit trail)

---

## 7. DevOps, CI/CD & Infrastructure

### 7.1 No CI/CD Pipeline

- [ ] Set up GitHub Actions for:
  - Linting (`eslint`)
  - Type checking (`tsc --noEmit`)
  - Build verification (`next build`)
  - Automated tests (when added)

### 7.2 Docker Compose — Production Readiness

The `docker-compose.yml` is set up for local development but needs production hardening:

- [ ] Add health checks for frontend and backend services
- [ ] Add resource limits (CPU, memory) to containers
- [ ] Use multi-stage build for backend (currently single-stage)
- [ ] Add a reverse proxy (nginx/traefik) for SSL termination
- [ ] Remove port 5432 exposure in production (only internal network)

### 7.3 No Logging Infrastructure

All error handling uses `console.error()`. In production:

- [ ] Implement structured logging (Winston, Pino)
- [ ] Add request ID tracking for debugging
- [ ] Set up log aggregation (if deploying to cloud)

### 7.4 No Monitoring / Health Checks

- [ ] Add `/api/health` endpoint returning service status
- [ ] Add database connectivity check in health endpoint
- [ ] Set up uptime monitoring (UptimeRobot, Better Stack)

---

## 8. UI/UX Improvements

### 8.1 Missing Error Boundaries

- [ ] No React Error Boundaries — unhandled component errors crash the entire page
- [ ] Add `error.tsx` files in key route segments

### 8.2 Missing Loading States

- [ ] Add `loading.tsx` files for route segments that fetch data
- [ ] Add skeleton loaders for dashboard pages

### 8.3 No `not-found.tsx`

- [ ] Add a custom 404 page (`app/not-found.tsx`)

### 8.4 SEO Gaps

- [ ] No `<title>` or `<meta>` tags on most pages (only `layout.tsx` sets defaults)
- [ ] No Open Graph / Twitter Card meta tags
- [ ] No `robots.txt`
- [ ] No `sitemap.xml`

### 8.5 Accessibility

- [ ] No ARIA labels on interactive elements
- [ ] No keyboard navigation support on custom components (toggles, tabs)
- [ ] No skip-to-content link
- [ ] Color contrast may not meet WCAG AA standards (light text on light backgrounds)

---

## 9. Performance & Optimization

### 9.1 No Image Optimization

- [ ] Hero images (`hero-bg.png`, `hero-bg-v2.png`, etc.) are large (700KB–2.4MB)
- [ ] Convert to WebP/AVIF format
- [ ] Use Next.js `<Image>` component with proper `sizes` and `priority` attributes

### 9.2 Database Connection Pooling

**File:** `lib/db.ts`

The connection pool is configured with `max: 20` connections. On serverless (Vercel), this can exhaust connections quickly.

- [ ] Use Supabase's connection pooler (PgBouncer) endpoint consistently
- [ ] Consider using Prisma Accelerate for serverless deployments

### 9.3 No Caching

- [ ] No Redis or in-memory caching for frequently accessed data
- [ ] No API response caching headers (except on user profile)
- [ ] Rate limiting uses in-memory `Map` — doesn't persist across serverless instances

---

## 10. Testing

### 10.1 No Tests Exist

The project has **zero tests** — no unit tests, integration tests, or E2E tests.

- [ ] Set up testing framework (Jest + React Testing Library for frontend)
- [ ] Add unit tests for critical utilities (`lib/auth.ts`, `lib/security.ts`, `lib/ai-matcher.ts`)
- [ ] Add API route integration tests for auth flow (signup → login → token verification)
- [ ] Add E2E tests for critical flows (Playwright/Cypress):
  - Candidate signup and profile creation
  - Recruiter job posting
  - AI matching flow
  - Messaging between recruiter and candidate

---

## 11. Documentation

### 11.1 README.md

The `README.md` is the default Next.js scaffold README. It contains no project-specific information.

- [ ] Write project overview and architecture description
- [ ] Document environment variable requirements (with `.env.example`)
- [ ] Add setup instructions (local dev, Docker, production)
- [ ] Document API endpoints
- [ ] Add contributing guidelines

### 11.2 API Documentation

- [ ] No API documentation exists for either the Next.js API routes or the Express backend
- [ ] Create Swagger/OpenAPI spec or a markdown API reference
- [ ] Document request/response formats for all endpoints

### 11.3 Missing `.env.example`

- [ ] Create `.env.example` with all required environment variables (without actual values)
- [ ] Document which variables are required vs optional

---

## Priority Summary

### 🔴 Critical (Do First)
1. Rotate all exposed API keys in `.env`
2. Add Next.js middleware for route protection
3. Fix backend unprotected routes (resume/job/match)
4. Remove JWT fallback secret
5. Delete debug/test routes from production

### 🟠 High Priority
6. Make contact form functional
7. Wire up settings page toggles to actual APIs
8. Add rate limiting to login endpoint
9. Consolidate Prisma schemas (or document dual-schema strategy)
10. Set up proper database migrations

### 🟡 Medium Priority
11. Add custom 404 page and error boundaries
12. Replace message polling with WebSockets
13. Add CI/CD pipeline
14. Harden Docker Compose for production
15. Optimize images and add caching

### 🟢 Low Priority
16. Add comprehensive test suite
17. Implement payment integration
18. Add push notifications
19. Write full API documentation
20. Implement 2FA, session management, and account deletion

---

*This document should be reviewed and updated as features are completed.*
