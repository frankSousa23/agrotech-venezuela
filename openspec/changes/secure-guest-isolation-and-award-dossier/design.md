## Context

The system currently exposes administrative endpoints (`/api/admin/users`) without server-side Bearer token inspection, and data endpoints (`/api/parcels`, `/api/field-logs`) read `userId` from client parameters without token ownership validation. Furthermore, the submission memorandum link on `/dashboard/postulacion` triggered a 404 error, and evaluators lack direct access to the official 2026 MapBiomas Prize rules, FAQs, evaluation matrix, and scientific paper in downloadable formats.

See `proposal.md` for background and motivation.

## Goals / Non-Goals

**Goals:**
- Implement cryptographic server-side authorization on `/api/admin/users` rejecting requests without valid `ADMIN` Bearer tokens.
- Architect an ephemeral, isolated guest sandbox where concurrent evaluators receive unique tokens and seeded demonstration datasets that never touch or leak genuine user data.
- Secure cryptographic signature comparisons against side-channel timing attacks with `crypto.timingSafeEqual()`.
- Whitelist explicit origins for the FastAPI backend (`backend/src/main.py`) rather than wildcard origins when credentials are enabled.
- Instate defensive HTTP response headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`) in `next.config.ts`.
- Deliver a comprehensive "Expediente Oficial Premio MapBiomas 2026" on `/dashboard/postulacion` with direct download capability for Prize Rules (Bases), FAQs, Evaluation Matrix, Scientific Article, and Technical Memorandum.

**Non-Goals:**
- Migrating from lightweight HMAC JWT to complex external OAuth2/OIDC identity providers (Auth0/Keycloak).
- Altering core Leaflet WebGIS algorithms or spatial calculation routines.

## Decisions

### Decision 1: Centralized Server-Side Token Extractor (`extractUserFromRequest`)
Instead of duplicating header parsing across route handlers, add a helper in `src/lib/auth/authUtils.ts`:
```ts
export function extractUserFromRequest(req: Request): UserSession | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return verifyToken(authHeader.split(' ')[1]);
}
```
*Rationale:* Standardizes authorization across all Next.js App Router handlers and provides consistent 401/403 responses.

### Decision 2: Timing-Safe Signature Verification
Update `verifyToken()` in `src/lib/auth/authUtils.ts`:
```ts
const sigBuf = Buffer.from(signature);
const expectedBuf = Buffer.from(expectedSignature);
if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
  return null;
}
```
*Rationale:* Eliminates timing attacks on signature strings.

### Decision 3: Ephemeral Guest Sandbox Isolation
When a request has a token with `isGuest: true` or `id: usr-guest-*`:
- Store guest parcels and logs in an in-memory dictionary partitioned by `guestId`.
- Automatically initialize the guest partition with clean sample data (Turén Maíz Blanco 48.5 ha and Calabozo Arroz 62.0 ha).
- Queries for `/api/admin/users` return 403 Forbidden for all guest tokens.
*Rationale:* Allows dozens of evaluators and jury members to test the application simultaneously in isolated environments without risk of data collisions or unauthorized data access.

### Decision 4: Static Public Docs Placement and Direct Downloads
- Place all official documents in `public/docs/`:
  - `public/docs/MEMORANDO_POSTULACION.md`
  - `public/docs/BASES_PREMIO_MAPBIOMAS_2026.md`
  - `public/docs/PREGUNTAS_FRECUENTES_PREMIO_2026.md`
  - `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `public/docs/ARTICULO_CIENTIFICO_DRAFT.md`
- In `next.config.ts`, ensure `/docs/:path*` correctly serves the static files without interfering with `/api-docs`.
- Render a dedicated "Expediente Oficial & Descargas PDF" section in `/dashboard/postulacion` with direct download buttons and clear criteria compliance indicators.

### Decision 5: Explicit FastAPI CORS Whitelist
In `backend/src/main.py`, configure:
```python
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8501",
    "http://127.0.0.1:8501",
]
```
*Rationale:* Conforms to W3C standards and prevents cross-origin authentication vulnerabilities.

## Risks / Trade-offs

- **[Risk]** Existing test suites might call `/api/admin/users` or `/api/parcels` without an Authorization header.
  → *Mitigation:* Ensure test suites pass valid admin/farmer Bearer tokens or support a test mock token.
- **[Risk]** Large volumes of concurrent guests accumulating in-memory data.
  → *Mitigation:* Cap the in-memory guest store with LRU eviction (retaining up to 50 active guest sessions).
