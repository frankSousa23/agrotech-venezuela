## 1. Phase A: Municipal Vector Breakdown

- [x] 1.1 Connect municipal dataset (`venezuelaMunicipalities.ts`) to the WebGIS viewer with state filtering. Verify municipal polygon selection.
- [x] 1.2 Display municipal agricultural hub statistics and crop calendars. Verify telemetry card updates for selected municipality.

## 2. Phase B: Interactive Parcel Delimitation & Field Draw

- [x] 2.1 Integrate Leaflet drawing controls with real-time Shoelace WGS84 area calculation in hectares. Verify polygon creation and area updates.
- [x] 2.2 Persist drawn parcels to database via `/api/parcels` and load saved parcels on map. Verify parcel saving and loading.

## 3. Phase C: Sentinel-2 Multitemporal Spectral Analytics

- [x] 3.1 Connect `ParcelDiagnosticModal` with FastAPI spectral engine and 40-year MapBiomas history. Verify spectral NDVI/NDWI and historical charts.

## 4. Phase D: Offline PWA & Local Geocaching

- [x] 4.1 Configure PWA service worker and IndexedDB local store for field log recording when offline. Verify offline log caching and sync.

## 5. Phase E: Agronomic PDF & Spatial Dossier Exporter

- [x] 5.1 Implement executive PDF and GeoJSON dossier export for parcels. Verify export generation and download.
- [x] 5.2 Execute end-to-end verification across all test suites (`npm test`, `pytest`, `npx tsc --noEmit`, `npm run build`).
