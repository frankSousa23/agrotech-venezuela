# Tasks: soils-ux-integration-and-dossier-sync

## 1. WebGIS Map and Parcel Modal Soil Integrations

- [x] 1.1 In `src/components/gis/LeafletMapInner.tsx`, update soil point popups to include an interactive action link navigating to `/dashboard/suelos?tab=simulator&texture=${pt.texture}&ph=${pt.ph}&om=${pt.organicMatter}` and verify popup markup.
- [x] 1.2 In `src/components/gis/MultiLevelMapViewer.tsx`, add a soil study CTA button for the selected municipality navigating to `/dashboard/suelos?tab=simulator&texture=${currentMunicipality.soilTexture}&ph=${currentMunicipality.avgPh}` and verify rendering.
- [x] 1.3 In `src/components/gis/ParcelDiagnosticModal.tsx`, add a quick action button navigating to `/dashboard/suelos?tab=simulator&texture=${texture}&ph=${avgPh}&om=${organicMatter}` and verify modal integration.

## 2. Soil Simulator URL Parameter Parsing and Responsive Grid

- [x] 2.1 In `src/app/dashboard/suelos/page.tsx`, parse `useSearchParams()` (`tab`, `texture`, `ph`, `om`, `al`) within a `<Suspense>` wrapper to pre-select workstation tabs and configure simulation sliders automatically.
- [x] 2.2 In `src/app/dashboard/suelos/page.module.css`, add `@media (max-width: 640px)` rule adapting `.statsGrid` to 2 columns and verify layout on mobile viewports.

## 3. Postulation Dossier and Repository Documentation Synchronization

- [x] 3.1 Update `docs/MEMORANDO_POSTULACION.md` and `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md` to 306 automated tests (251 Jest + 55 Pytest), 40 production routes, and active TRL 4 MapBiomas Soil Module status.
- [x] 3.2 Update `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` and `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` to reflect 306 automated tests and 40 production routes.
- [x] 3.3 Update `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `docs/mapbiomas_premio_2026/PITCH_DECK.md`, `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`, and `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` to 306 automated tests and 40 routes.

## 4. Verification and Regression Testing

- [x] 4.1 Run unit and integration test suite (`npm test`) to verify all 251 Jest tests pass.
- [x] 4.2 Run backend suite (`npm run test:backend`) to verify all 55 Pytest tests pass.
- [x] 4.3 Run full system test suite (`npm run test:all`) and TypeScript typecheck (`npm run typecheck`) to verify 306/306 tests passing and 0 TypeScript errors.

