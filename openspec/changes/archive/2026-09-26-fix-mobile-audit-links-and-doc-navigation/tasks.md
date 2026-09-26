# Tasks: Resilient Mobile Audit Navigation & Documentation Link Verification

## 1. Mobile-First Overhaul of Evaluator Guide (`docs/GUIA_EVALUADOR.md`)

- [x] 1.1 In the summary table of `docs/GUIA_EVALUADOR.md`, turn all test suite references (`spatial.test.ts`, `pedotransfer.test.ts`, `test_risk_and_carbon.py`, `soils.test.ts`, `recomendaciones.test.ts`, `machinery-exporter.test.ts`, `routing-and-redirects.test.ts`, `security-and-dossier.test.ts`, `roiCostEngine.test.ts`, `ImpactRoiWidget.test.ts`, `parcels-conflict.test.ts`, `vernacular-parser.test.ts`, `farmer-ux-and-intentions.test.ts`, `parcels-and-diary.test.ts`, `mapbiomas-discrepancy-and-pedagogy.test.ts`, `test_mapbiomas_discrepancy.py`) into direct Markdown hyperlinks pointing to the exact test files, and include primary source file links in the component description column. Verify by verifying each link target exists.
- [x] 1.2 Implement explicit ASCII HTML anchors `<a id="criterio-1"></a>` through `<a id="criterio-6"></a>` and `<a id="rigor-tecnico"></a>` paired with clean ASCII links `[Ver Detalle ↓](#criterio-1)`, add `<a id="indice"></a>` at the top table, and add bidirectional `[Volver al Índice ↑](#indice)` return links at the end of each evaluation section. Verify anchor resolution.
- [x] 1.3 Correct the two broken relative file links in `docs/GUIA_EVALUADOR.md`: update `src/components/maps/VenezuelaStateMapInner.tsx` to `src/components/gis/VenezuelaStateMapInner.tsx` and `src/components/gis/ParcelConflictModal.tsx` to `src/components/tierras/ParcelConflictModal.tsx`. Verify both target files resolve without 404.

## 2. Cross-Dossier Markdown Relative Link Normalization

- [x] 2.1 Fix directory nesting relative links in `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`, `docs/mapbiomas_premio_2026/PITCH_DECK.md`, `public/docs/MEMORANDO_POSTULACION.md`, and `public/docs/PITCH_DECK.md` (e.g. updating `../README.md` to `../../README.md`, `DEVELOPING.md` to `../../DEVELOPING.md`, and `docs/MEMORANDO_POSTULACION.md` to `MEMORANDO_POSTULACION.md`). Verify all target files exist.
- [x] 2.2 Normalize image path references in `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`, `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, and `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md` so that `public/images/flujo_inteligencia_agricola.png` is addressed via valid relative paths (`../../public/images/...` or `../images/...`). Verify image path targets exist.

## 3. Comprehensive Link Verification and System Integrity

- [x] 3.1 Execute an automated link verification script across all Markdown files in `docs/`, `public/docs/`, and root `README.md` to certify that zero broken file or test links remain. Verify script exits with 0 missing links.
- [x] 3.2 Run the full test suite (`npm test`), TypeScript verification (`npm run typecheck`), and OpenSpec validation (`openspec validate fix-mobile-audit-links-and-doc-navigation`) to verify that the entire repository maintains 278 passing tests, 0 TypeScript errors, and valid OpenSpec change artifacts.
