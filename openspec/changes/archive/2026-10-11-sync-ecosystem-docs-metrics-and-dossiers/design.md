# Design

## Context

The Agrotech Venezuela platform has reached 311 passing automated tests across 36 Jest suites and 17 Pytest modules, integrating a pedagogical soil mode (Water Comfort Bar, 40-year historical trajectory card, bag calculations, and cross-module flow). However, several documentation guides and application manuscripts still display historical test numbers (292 or 306) and lack documentation of the new pedagogical layer.

## Goals / Non-Goals

**Goals:**
- Unify quality metrics (311 automated tests, 256 Jest in 36 suites + 55 Pytest in 17 modules, 40 Next.js 16 routes, 0 TypeScript errors) across all root, guide, and modal files.
- Document the pedagogical soil layer comprehensively in `docs/GUIA_MODULO_SUELOS.md`, `docs/GUIA_EVALUADOR.md`, and `docs/SHOWCASE.md`.
- Synchronize all MapBiomas 2026 prize submission documents in `docs/mapbiomas_premio_2026/` with their public downloadable counterparts in `public/docs/`.
- Update `scripts/test_summary.js` to register the two newest Jest suites so `npm run test:summary` reports the full 311 tests.

**Non-Goals:**
- Modifying underlying agronomic formulas or pedotransfer math (Kamprath, Saxton-Rawls, and Shoelace algorithms remain untouched).
- Adding new external dependencies or modifying database schemas.

## Decisions

### Decision 1: Test Suite Registry Alignment in `scripts/test_summary.js`
- **Choice**: Add `SoilPedagogicalWaterBar.test.tsx` (3 tests) and `MapBiomas40YearTrajectoryCard.test.tsx` (2 tests) to the `Agronomía & Física Edafológica` section of `frontendSuites`.
- **Rationale**: `scripts/test_summary.js` provides the canonical terminal reporting matrix for evaluators and developers running `npm run test:summary`. Adding these suites updates the output dynamically to 256 frontend tests across 36 suites, bringing the consolidated total to 311 tests.
- **Alternative considered**: Reading Jest output dynamically via JSON reporter. Discarded because `scripts/test_summary.js` is intentionally zero-dependency, instantaneous, and format-guaranteed.

### Decision 2: Pedagogical Framing in `docs/GUIA_MODULO_SUELOS.md`
- **Choice**: Introduce a dedicated section "Capa Pedagógica MapBiomas: Esponja de Suelo y Memoria de 40 Años" detailing:
  1. The 4 water comfort zones (Marchitez, Estrés, Confort, Encharcamiento) and autonomy calculation ($\text{Lámina} / 4.5\text{ mm/día}$).
  2. The historical land use memory card with organic matter depletion (-55% to -61%) and regenerative Kamprath remedies translated to traditional 50 kg bags.
  3. The didactic vs. technical toggle in the UI and embed widget.
  4. Cross-module deep-linking from `/dashboard/tierras` and handoffs to `/dashboard/bitacora`.
- **Rationale**: Elevates the documentation from pure mathematical equations to a dual-audience manual understandable by both MapBiomas general users and soil scientists.

### Decision 3: Bilateral Mirror Synchronization
- **Choice**: Keep `docs/mapbiomas_premio_2026/` and `public/docs/` identical for all shared files (`ARTICULO_TECNICO_DRAFT.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `PITCH_DECK.md`, `GUIA_POSTULACION.md`).
- **Rationale**: Evaluators may inspect files directly on GitHub in `docs/mapbiomas_premio_2026/` or download them from the local application in `public/docs/`. Parity prevents any discrepancies during assessment.

## Risks / Trade-offs

- **[Risk: Stale hardcoded numbers in UI components]** → **Mitigation**: Grep-verified search across `src/` to update all legacy instances (e.g. 292 tests) in `postulacion/page.tsx`, `DemoTourModal.tsx`, `MultiLevelMapViewer.tsx`, and `DataflowDiagramStudio.tsx`.
- **[Risk: Markdown formatting divergence between mirrors]** → **Mitigation**: Copy identical content between `docs/mapbiomas_premio_2026/` and `public/docs/`.
