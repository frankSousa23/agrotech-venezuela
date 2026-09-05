## Why

Following deep tripartite exploration between modern software engineering, doctoral edaphology, and rural farming ergonomics, Agrotech Venezuela requires a generational leap across three core operational frontiers:
1. **Edaphic Scientific Accuracy**: Replace generic linear pH liming with regionally calibrated chemical engines (Kamprath aluminum neutralization for eastern sabanas, Ca:Mg ratios for Sur del Lago, and Agricultural Gypsum for saline/sodic Aridisols in Quíbor/Lara).
2. **Zero-Barrier Rural UX**: Enhance the Web Speech assistant with an offline-first Venezuelan campesino vernacular lexicon (parsing traditional units like sacos, tambores, and tablones directly into structured field logs).
3. **Closing the Precision Loop**: Bridge satellite algorithms and physical fields by exporting Variable Rate Application (VRA) packages for onboard GPS tractors (ESRI Shapefiles), agricultural drones (GeoJSON/KML), and printable 1-page analog cabin guides for conventional tractors.

## What Changes

- **Region-Aware Soil Amendment Engine (`regional-soil-amendments-engine`)**:
  - Implement regional edaphic strategy recognizing 3 distinct Venezuelan pedological zones (Llanos/Oriente Ultisoles/Oxisoles, Sur del Lago Alluvial Inceptisoles, and Quíbor/Lara Saline/Sodic Aridisols).
  - Calculate Kamprath $Al^{3+}$ lime requirements and Agricultural Gypsum ($CaSO_4 \cdot 2H_2O$) sodicity reclamation doses.
- **Offline Campesino Vernacular Voice Parser (`rural-voice-vernacular-parser`)**:
  - Introduce client-side regex and phonetic normalization for Venezuelan agrarian expressions (*"tirar urea"*, *"reabono"*, *"curar candelilla"*, *"coger sacos"*).
  - Convert traditional units (*saco* = 50 kg, *tambor* = 200 L, *caneca/bomba* = 20 L, *tablón* = 1 ha, *tablita* = 0.5 ha) into ISO metric units.
- **Universal Precision Machinery Package Exporter (`precision-machinery-prescriptions-exporter`)**:
  - Generate downloadable VRA prescription packages containing ESRI Shapefile structures (`RATE_LIME`, `RATE_NPK`, `AREA_HA` in UTM projections) for John Deere, Trimble, and Case IH displays.
  - Generate flight boundaries and spray volumes for agricultural drones (DJI Agras, XAG).
  - Generate printable 1-page analog cabin guide for tractors without GPS (gear, engine RPM, and spreader gate settings).
- **Institutional Dossier & Verification Synchronization (`prize-publication-exporter`)**:
  - Synchronize documentation, metrics, and test assertions across the codebase to certify 100% operational readiness.

## Capabilities

### New Capabilities
- `regional-soil-amendments-engine`: Regionally calibrated soil amendment models for acidic, alluvial, and saline/sodic Venezuelan agricultural lands.
- `rural-voice-vernacular-parser`: Offline client-side lexical parser converting regional campesino dialect and rural units into structured field operations.
- `precision-machinery-prescriptions-exporter`: Universal export suite generating GPS tractor Shapefiles, drone mission files, and analog tractor cabin calibration sheets.

### Modified Capabilities
- `prize-publication-exporter`: Update institutional dossier and memorandums with the newly certified tripartite capabilities.

## Impact

- **Frontend & GIS**: `src/lib/geo/spatialUtils.ts`, `src/lib/farmer/vernacularParser.ts`, `src/lib/geo/machineryExporter.ts`, `src/app/dashboard/tierras/page.tsx`, `src/app/dashboard/recomendaciones/page.tsx`, and `src/components/gis/ParcelDiagnosticModal.tsx`.
- **Backend & APIs**: New endpoints or client-side utilities for multi-format prescription generation and unit conversions.
- **Testing**: New Jest and Pytest test suites validating the pedological formulas, voice lexical parsing, and machinery export formats without regressions.
