## Why

A comprehensive technical and security audit of the platform revealed two critical areas requiring immediate resolution before external institutional evaluation:
1. **Security & Guest Concurrency Isolation**: While the platform supports 1-click guest access for seamless demonstration, the administrative endpoints (`/api/admin/users`) and core data endpoints (`/api/parcels`, `/api/field-logs`) do not enforce cryptographic Bearer token validation on the server side, allowing parameter manipulation (BOLA/BFLA). Furthermore, multiple concurrent evaluators/guests must enjoy completely isolated demo datasets without any capability to view, mutate, or leak real production user data or cross-contaminate other guests' sessions.
2. **Official MapBiomas Prize 2026 Dossier & PDF Exports**: The submission link `/docs/MEMORANDO_POSTULACION.md` returned a 404 error due to missing public asset placement, and evaluators require a centralized repository of verifiable institutional documents: the official MapBiomas Venezuela 2026 Prize Rules (Bases), FAQs (Preguntas Frecuentes), an Evaluation Compliance Matrix mapping the 6 jury criteria (Complejidad Técnica 20%, Originalidad 20%, Claridad 15%, Resultados 20%, Aporte General 20%, Aporte MapBiomas 5%), and the Scientific Paper covering state of the art and future trajectory, all directly downloadable in PDF and Markdown formats.

## What Changes

- **Server-Side Authorization on Admin Endpoints**: Enforce strict `Authorization: Bearer <token>` validation on `GET` and `PATCH` `/api/admin/users`, returning `401 Unauthorized` for missing/invalid tokens and `403 Forbidden` for non-ADMIN roles.
- **Isolated Multi-Guest Sandbox**: Refactor `/api/parcels` and `/api/field-logs` so that guest tokens (`usr-guest-*`) always query and mutate strictly within their own isolated namespace, seeded with pristine demo samples (Turén corn and Calabozo rice) on every fresh session without ever exposing genuine producer accounts.
- **Timing-Safe Cryptography & Environment Hygiene**: Upgrade `verifyToken` to use `crypto.timingSafeEqual()` to eliminate timing attack vectors on HMAC signatures, document `JWT_SECRET` in `.env.production.example`, and sanitize default passwords.
- **FastAPI CORS Hardening**: Replace `allow_origins=["*"]` with explicit configured origins (`http://localhost:3000`, `http://127.0.0.1:3000`, and `ALLOWED_ORIGINS`) while preserving credentials support for Next.js.
- **Defensive HTTP Security Headers**: Inject `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` in `next.config.ts`.
- **Public MapBiomas Prize 2026 Documentation Hub**:
  - Place `MEMORANDO_POSTULACION.md`, `BASES_PREMIO_MAPBIOMAS_2026.md`, `PREGUNTAS_FRECUENTES_PREMIO_2026.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, and `ARTICULO_CIENTIFICO_DRAFT.md` into `public/docs/` and create dedicated viewer/download API endpoints.
  - Implement a dedicated "Expediente Oficial & Descargas PDF" panel inside `/dashboard/postulacion` allowing evaluators to preview and download all official PDFs and Markdown files with 1 click.

## Capabilities

### New Capabilities
- `api-security-and-defensive-headers`: Enforces HTTP security headers, timing-safe cryptographic comparisons, and strict FastAPI CORS whitelist configuration.

### Modified Capabilities
- `user-roles-and-permissions`: Extends role-based access control with server-side Bearer token validation on administrative endpoints and strict data isolation for concurrent ephemeral guest sessions.
- `prize-publication-exporter`: Expands the postulation dossier to include downloadable MapBiomas Prize 2026 official documents, evaluation compliance matrix, and scientific paper in PDF and Markdown formats.

## Impact

- **Affected Code**:
  - `src/lib/auth/authUtils.ts` (timingSafeEqual, JWT_SECRET validation)
  - `src/app/api/admin/users/route.ts` (Bearer token & ADMIN role enforcement)
  - `src/app/api/parcels/route.ts` (token extraction & guest namespace isolation)
  - `src/app/api/field-logs/route.ts` (token extraction & guest namespace isolation)
  - `src/app/dashboard/admin/page.tsx` (Authorization header inclusion in client fetch)
  - `src/app/dashboard/postulacion/page.tsx` (Expediente download panel and fixed document links)
  - `next.config.ts` (Security headers and clean document redirects)
  - `backend/src/main.py` (CORS whitelist hardening)
  - `public/docs/` (static repository of official PDFs and markdown dossiers)
- **Dependencies**: No external npm packages required (Node.js built-in `crypto` and native Next.js 16 APIs).
