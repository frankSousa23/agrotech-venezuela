# Proposal: soils-ux-integration-and-dossier-sync

## Why

Following the operational development of the MapBiomas Soil Module (TRL 4), WebGIS maps and parcel diagnostics need direct, bidirectional UI/UX navigation into the interactive Saxton-Rawls pF curve simulator, while mobile soil statistics require responsive CSS enhancements. Concurrently, all postulation dossier files and documentation must be synchronized to accurately reflect the project's current milestone of 306 unified automated tests, 40 production routes, and the active MapBiomas Soil Module.

## What Changes

- **WebGIS Soil Pin Popups**: Enhance Venezuelan soil sample markers in `LeafletMapInner.tsx` with an interactive action link directing users to `/dashboard/suelos?tab=simulator&texture=...&ph=...&om=...`.
- **Territorial Municipality Soil Quick-Action**: Add a direct CTA in `MultiLevelMapViewer.tsx` to simulate the soil hydraulic retention curve for the selected municipality's dominant soil texture.
- **Parcel Diagnostic Modal Soil Link**: Integrate a direct link in `ParcelDiagnosticModal.tsx` allowing parcel diagnostics to transition smoothly to the Saxton-Rawls pF simulator.
- **Dynamic URL Parameter Preselection**: Update `src/app/dashboard/suelos/page.tsx` with `useSearchParams()` to automatically initialize tabs and simulator slider values from incoming navigation query parameters (`tab`, `texture`, `ph`, `om`, `al`).
- **Mobile Responsive Polish**: Update `src/app/dashboard/suelos/page.module.css` with a responsive `@media (max-width: 640px)` rule for `.statsGrid` to display 2 columns on small mobile viewports.
- **Comprehensive Dossier & Documentation Synchronization**: Update test counts (306 automated tests: 251 Jest + 55 Pytest), route metrics (40 production routes), and explicit MapBiomas Soil Module TRL 4 operational status across:
  - `docs/MEMORANDO_POSTULACION.md`
  - `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`
  - `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`
  - `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
  - `docs/mapbiomas_premio_2026/PITCH_DECK.md`
  - `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`
  - `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`
  - `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`

## Capabilities

### Modified Capabilities
- `interactive-soil-simulator-ui`: Extend simulator page to parse URL search parameters for initial tab and slider values, and improve mobile responsive grid ergonomics.
- `map-viewer-responsive-drawer`: Add soil study quick-actions in Leaflet markers and municipal drawers to jump directly into the soil simulator.
- `technology-provenance-and-legal-framework`: Update canonical legal and provenance documents to reflect 306 tests and the TRL 4 soil federation module.
- `docs/institutional-postulation-memorandum`: Synchronize postulation dossier metrics across all submission documents to 306 automated tests and 40 routes.

## Impact

- Frontend: `src/app/dashboard/suelos/page.tsx`, `src/app/dashboard/suelos/page.module.css`, `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, and `src/components/gis/ParcelDiagnosticModal.tsx`.
- Documentation: 9 dossier markdown files under `docs/` and `docs/mapbiomas_premio_2026/`.
- Testing: All 306 automated tests and 0 TypeScript errors remain 100% passing.
