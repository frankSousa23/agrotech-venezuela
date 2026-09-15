## Why

During an exhaustive audit of all documents constituting the project for the MapBiomas Venezuela 2026 award evaluation, we identified that while the running codebase, tests, `README.md`, `DEVELOPING.md`, and in-app UI surfaces (`/dashboard/postulacion`) have been fully upgraded to **278 automated tests (224 Jest + 54 Pytest)** and **32 clean Next.js 16 production routes**, several offline dossier and evaluation matrix documents (`docs/mapbiomas_premio_2026/`, `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/GUIA_POSTULACION.md`, and `scripts/generate_prize_pdf.py`) still retain legacy figures (252 tests, 198 Jest, and 30/31 routes).

To guarantee absolute institutional consistency and zero discrepancy regardless of whether an evaluator reviews the live web platform, browses the GitHub repository, or inspects the downloaded static PDFs and markdown files in the submission dossier, all dossier surfaces must be synchronized to the exact verified metrics.

## What Changes

- **Synchronize Public Evaluation Matrix & Submission Guides**: Update `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `public/docs/GUIA_POSTULACION.md` from `252 pruebas` (198 Jest) and `30/31 rutas` to **278 pruebas automatizadas** (224 Jest + 54 Pytest) and **32 rutas de producción**.
- **Synchronize Offline Award Dossier Archive (`docs/mapbiomas_premio_2026/`)**: Harmonize all markdown dossier copies (`ARTICULO_TECNICO_DRAFT.md`, `MEMORANDO_POSTULACION.md`, `PITCH_DECK.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `GUIA_POSTULACION.md`) to 278 automated tests (224 Jest in 33 suites + 54 Pytest in 17 modules) and 32 clean production routes.
- **Update PDF/Dossier Compilation Script**: Update `scripts/generate_prize_pdf.py` so that automated compilation of the official submission expediente writes **278 pruebas automatizadas (224 Jest + 54 Pytest)** into the compiled documents.
- **Ensure Automated Security & Dossier Test Alignment**: Ensure `__tests__/api/security-and-dossier.test.ts` and the entire 278-test suite continue to pass with 100% success.

## Capabilities

### Modified Capabilities
- `system-status-synchronization`: Update Requirement 1 to mandate that all offline dossier files (`docs/mapbiomas_premio_2026/*`), evaluation matrices (`MATRIZ_CUMPLIMIENTO_EVALUACION.md`), submission guides (`GUIA_POSTULACION.md`), and compilation scripts (`scripts/generate_prize_pdf.py`) strictly reflect the verified 278 automated tests (224 Jest + 54 Pytest) and 32 production routes.

## Impact

- **Affected Documents**:
  - `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `public/docs/GUIA_POSTULACION.md`
  - `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`
  - `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`
  - `docs/mapbiomas_premio_2026/PITCH_DECK.md`
  - `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`
  - `scripts/generate_prize_pdf.py`
- **APIs and Runtime Code**: No breaking changes to runtime APIs or Leaflet/WebGIS logic.
- **Validation**: Full suite of 278 tests (Jest + Pytest), TypeScript typecheck, and Next.js 16 build remain completely green.
