## 1. Cryptographic and Identity Hardening

- [x] 1.1 In `src/lib/auth/authUtils.ts`, implement `extractUserFromRequest(req: Request)`, upgrade `verifyToken` signature comparison to use `crypto.timingSafeEqual`, and verify signature timing resistance.
- [x] 1.2 In `src/app/api/admin/users/route.ts`, enforce strict server-side authentication using `extractUserFromRequest`, returning 401 for unauthenticated requests and 403 for non-ADMIN roles on both GET and PATCH.
- [x] 1.3 In `src/app/dashboard/admin/page.tsx`, update client-side `fetchUsers` and `handleUpdateStatus` to include `Authorization: Bearer <token>` from the active session.

## 2. Multi-Guest Sandbox Isolation

- [x] 2.1 In `src/app/api/parcels/route.ts`, implement isolated ephemeral namespaces for guest users (`usr-guest-*`), seeding each guest with isolated demo parcels (Turén & Calabozo) and strictly blocking access to genuine producer accounts.
- [x] 2.2 In `src/app/api/field-logs/route.ts`, partition field logs by guest token, ensuring multiple concurrent guests maintain isolated chronological labor entries without cross-contamination.

## 3. Infrastructure & Defensive Headers Hardening

- [x] 3.1 In `next.config.ts`, add security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`), configure `/docs/:path*` static file handling, and document `JWT_SECRET` in `.env.production.example`.
- [x] 3.2 In `backend/src/main.py`, replace wildcard CORS `allow_origins=["*"]` with an explicit origin whitelist (`http://localhost:3000`, `http://127.0.0.1:3000`, `http://localhost:8501`, `http://127.0.0.1:8501`, `ALLOWED_ORIGINS`).

## 4. Official MapBiomas Prize 2026 Dossier and Document Hub

- [x] 4.1 In `public/docs/`, publish the official documentation suite: `MEMORANDO_POSTULACION.md`, `BASES_PREMIO_MAPBIOMAS_2026.md` (10-page rules with Annex I/II), `PREGUNTAS_FRECUENTES_PREMIO_2026.md` (6-page FAQs), `MATRIZ_CUMPLIMIENTO_EVALUACION.md` (6 evaluation criteria breakdown), and `ARTICULO_CIENTIFICO_DRAFT.md`.
- [x] 4.2 In `src/app/dashboard/postulacion/page.tsx`, integrate an "Expediente Oficial Premio MapBiomas 2026 & Descargas" hub with direct preview/download actions and verifiable criteria compliance scores.

## 5. Automated Verification & Quality Assurance

- [x] 5.1 Run `npm run typecheck` (`tsc --noEmit`) and verify 0 TypeScript errors.
- [x] 5.2 Run `npm run test:all` and verify all tests pass without regressions, including admin auth guards and guest isolation.
- [x] 5.3 Launch the browser subagent to verify that `/dashboard/postulacion` downloads work with 200 OK responses and that the guest sandbox remains isolated.
