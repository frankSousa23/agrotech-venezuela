# Design

## Context

Agrotech Venezuela integrates multi-sensor teledetección (Copernicus Sentinel-1/2), agroclimatic series (NASA POWER), digital elevation models (SRTM), 40 years of land-use dynamics (MapBiomas Venezuela Collection 3.0), and localized artificial intelligence (Gemini 1.5 Flash). The platform operates on Next.js 16 Turbopack with 35 production routes, 290 automated tests, and strict TypeScript compilation. This design outlines how data provenance, legal licensing, open data regulations, the creative process narrative, and system dataflow will be codified, cross-referenced, and surfaced in the application.

## Goals / Non-Goals

**Goals:**
- Provide an authoritative legal and data governance document (`DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`) detailing the origin, legal permissions, licenses, and specific operational uses of all technologies.
- Detail the creative process that transformed retrospective satellite observation into proactive agronomic prescriptions, overcoming the tropical cloud curtain through C-Band SAR radar and bridging rural accessibility through native voice and vernacular parsing.
- Render the 5-stage global system dataflow from orbital sensors down to machinery and farm fields.
- Expose legal provenance and data governance directly in the UI via a dedicated card in `/dashboard/postulacion` and an accessible footer link in `Footer.tsx`.
- Guarantee that all existing 290 tests, TypeScript strictness, and 35 production routes continue passing with 100% success, augmented by new assertions in `__tests__/api/security-and-dossier.test.ts`.

**Non-Goals:**
- Refactoring the core spatial algorithms (Shoelace WGS84, Kamprath, Saxton-Rawls) or changing existing API payload schemas.
- Adding third-party proprietary dependencies or requiring external database migrations.

## Decisions

### 1. Dual-Path Document Placement (`docs/` and `public/docs/`)
- **Choice**: Store `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` in `docs/` for GitHub/developer reading and replicate it in `public/docs/` for web client viewing and direct browser downloads.
- **Rationale**: Follows the established pattern used by `MEMORANDO_POSTULACION.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, and `PITCH_DECK.md`.
- **Alternative Considered**: Single file served via dynamic Next.js API route. Rejected because static file serving from `public/` is faster, offline-capable, and avoids server-side overhead.

### 2. High-Visibility Governance Card in `/dashboard/postulacion`
- **Choice**: Add a responsive glassmorphic card titled *Gobernanza de Datos, Permisos & Marco Legal* inside the postulation dashboard, containing tags for Copernicus EU 1159/2013, NASA Open Science, and MapBiomas CC BY 4.0, with a direct button to read/download the document.
- **Rationale**: Directs prize jurors and evaluators to legal compliance immediately alongside technical criteria.
- **Alternative Considered**: Hiding legal text inside a deeply nested modal. Rejected because evaluators require upfront transparency.

### 3. Global Footer Link Integration
- **Choice**: Add a subtle, accessible footer link labeled *"Marco Legal y Procedencia de Datos"* in `src/components/layout/Footer.tsx`.
- **Rationale**: Ensures legal compliance and proper attribution are discoverable across all 35 application routes without interfering with primary navigation.

### 4. Integration into Automated Security and Dossier Tests
- **Choice**: Extend the existing `expectedFiles` array in `__tests__/api/security-and-dossier.test.ts` to include `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` and assert key legal tokens (`Copernicus`, `1159/2013`, `NASA`, `MapBiomas`, `CC BY 4.0`).
- **Rationale**: Guarantees CI/CD verification against accidental document removal or truncation.

## Risks / Trade-offs

- **[Risk] File desynchronization between `docs/` and `public/docs/`** → *Mitigation*: Both files will be generated and updated synchronously, and Jest tests in `security-and-dossier.test.ts` will enforce content parity and minimum file size.
- **[Risk] Cluttering mobile screens in the postulation page** → *Mitigation*: Use responsive CSS grid layouts and collapsible cards with fluid typography.
