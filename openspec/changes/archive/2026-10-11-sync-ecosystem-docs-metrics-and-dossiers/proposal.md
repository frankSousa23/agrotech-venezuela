# Proposal

## Why

Recent architectural advancements (MapBiomas pedagogical soil mode, water comfort sponge bar, 40-year land-use trajectory card, and cross-module data handoffs) expanded the automated test suite to 311 tests (256 Jest in 36 suites + 55 Pytest), but repository documentation, evaluators' guides, test reporting scripts, and MapBiomas 2026 prize application dossiers still reference legacy figures (292 or 306 tests) and lack documentation of the new pedagogical layer. Synchronizing these metrics, operational guides, and submission manuscripts is essential to maintain complete auditability, academic rigor, and seamless evaluation by the jury.

## What Changes

- **Test Suite Metrics Synchronization**: Update all references to tests across `README.md`, `AGENTS.md`, `scripts/test_summary.js`, `src/app/dashboard/postulacion/page.tsx`, `DemoTourModal.tsx`, `MultiLevelMapViewer.tsx`, and `DataflowDiagramStudio.tsx` to reflect the active 311 automated tests (256 Jest + 55 Pytest, 100% passing).
- **Pedagogical Soil Module Documentation**: Document the 4-zone Water Comfort Bar ("Esponja de Suelo"), water autonomy days, 40-year historical trajectory card, and didactic/technical mode switcher in `docs/GUIA_MODULO_SUELOS.md`, `docs/GUIA_EVALUADOR.md`, and `docs/SHOWCASE.md`.
- **Application Dossier & Mirror Consistency**: Update official MapBiomas 2026 submission manuscripts (`ARTICULO_TECNICO_DRAFT.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `PITCH_DECK.md`, `GUIA_POSTULACION.md`) in `docs/mapbiomas_premio_2026/` and synchronize their public downloadable mirrors in `public/docs/`.
- **Automated Summary Script Update**: Register the 2 new Jest suites (`SoilPedagogicalWaterBar.test.tsx` and `MapBiomas40YearTrajectoryCard.test.tsx`) in `scripts/test_summary.js` so `npm run test:summary` renders all 36 frontend suites and 311 total tests.

## Capabilities

### New Capabilities
- `ecosystem-audit-and-documentation-synchronization`: Defines requirements for unified quality metrics consistency, pedagogical soil layer documentation, and synchronization of the MapBiomas 2026 evaluation dossier and public mirrors.

### Modified Capabilities

*(None)*

## Impact

- **Affected Files**: `README.md`, `AGENTS.md`, `scripts/test_summary.js`, `docs/GUIA_MODULO_SUELOS.md`, `docs/GUIA_EVALUADOR.md`, `docs/SHOWCASE.md`, `docs/mapbiomas_premio_2026/*.md`, `public/docs/*.md`, and UI badges in `src/app/dashboard/postulacion/page.tsx` and modal components.
- **Dependencies & APIs**: Zero changes to external dependencies or production APIs; purely documentation, reporting, and interface metric synchronization.
- **Compatibility**: 100% backward compatible; ensures strict alignment between code reality (311 tests, Next.js 16, FastAPI) and evaluators' documentation.
