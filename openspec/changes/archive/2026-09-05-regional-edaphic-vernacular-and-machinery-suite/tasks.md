## 1. Regional Edaphic Amendment Engine

- [x] 1.1 Implement pedological zone detection and regional amendment algorithms (Kamprath Al³⁺ lime for eastern sabanas, Ca:Mg ratio for Sur del Lago, and Agricultural Gypsum for Quíbor/Lara) in `src/lib/geo/spatialUtils.ts` and verify unit tests pass
- [x] 1.2 Update diagnostic display in `src/components/gis/ParcelDiagnosticModal.tsx` and `src/app/dashboard/recomendaciones/page.tsx` to show regional amendment warnings and verify JSX compilation

## 2. Offline Campesino Vernacular Voice Parser

- [x] 2.1 Implement `src/lib/farmer/vernacularParser.ts` with tokenizer, dialect action classifier, and traditional unit normalizer (saco to 50kg, tambor to 200L, caneca to 20L, tablón to 1ha) and verify unit test suite passes
- [x] 2.2 Integrate vernacular speech parser with `src/components/layout/IntentionsModal.tsx` to show live transcribed action confirmation card and verify UI interaction

## 3. Universal Precision Machinery Prescription Exporter

- [x] 3.1 Implement `src/lib/geo/machineryExporter.ts` generating ESRI Shapefiles (VRA attributes), Drone KML/GeoJSON missions, and 1-page printable tractor cabin calibration cards and verify exporter test suite passes
- [x] 3.2 Add machinery prescription download button and modal in `src/app/dashboard/tierras/page.tsx` and verify package generation

## 4. Comprehensive Testing & Institutional Synchronization

- [x] 4.1 Verify full automated quality suites (`npx tsc --noEmit`, `npm test`, `npm run test:backend`, `npm run build`) ensuring 100% green pass
- [x] 4.2 Update test counters and institutional memorandums in `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, and `/dashboard/postulacion` certifying the tripartite suite integration
