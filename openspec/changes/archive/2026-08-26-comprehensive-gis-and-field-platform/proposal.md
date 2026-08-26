## Why

To evolve the newly stabilized Venezuelan territorial map into a comprehensive, multi-tiered precision agriculture platform. Producers, agronomists, and researchers require continuous geospatial drill-down from national to municipal and micro-parcel scales, interactive polygon drawing in field boundaries, multitemporal Sentinel-2 spectral diagnostics (NDVI/NDWI), offline rural resilience, and automated technical dossier exports for financial and certification purposes.

## What Changes

- **Phase A (Municipal Vector Breakdown)**: Introduce Level 2 municipal drill-down across Venezuela's 335 municipalities and key agricultural hubs (Turén, Calabozo, Santa Bárbara, etc.) with localized crop calendars.
- **Phase B (Interactive Parcel Delimitation & Field Draw)**: Implement precision Leaflet polygon drawing controls with real-time Shoelace WGS84 area in hectares and Haversine perimeter in meters, persisting directly to the database via `/api/parcels`.
- **Phase C (Sentinel-2 Multitemporal Spectral Analytics)**: Integrate multi-spectral index computation (NDVI vigor, NDWI moisture, EVI canopy) with Sentinel-2 L2A SCL cloud masking and 40-year MapBiomas deforestation & water trajectories.
- **Phase D (Offline PWA & Local Geocaching)**: Configure PWA service workers and client-side IndexedDB caching for full offline field operations without internet connectivity in rural zones.
- **Phase E (Agronomic PDF & Spatial Dossier Exporter)**: Implement one-click export of executive agronomic reports, GeoJSON boundaries, and prescription maps formatted for agricultural banks and carbon credit verification.

## Capabilities

### New Capabilities
- `municipal-vector-breakdown`: Level 2 municipal geospatial drilldown with 335 municipal vector boundaries and agricultural hub profiles.
- `parcel-boundary-draw`: Interactive geodesic polygon drawing, vertex editing, Shoelace WGS84 area, and field log association.
- `sentinel-multitemporal-analytics`: Multi-spectral indices (NDVI/NDWI/EVI) and 40-year historical trajectory analysis.
- `offline-pwa-geocache`: PWA service worker and IndexedDB offline field sync.
- `agronomic-dossier-exporter`: Automated PDF agronomic report and GeoJSON export engine.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend**: `src/components/gis/MultiLevelMapViewer.tsx`, `src/components/gis/ParcelDiagnosticModal.tsx`, `src/app/dashboard/tierras/page.tsx`, `src/app/dashboard/bitacora/page.tsx`.
- **Backend**: `backend/src/main.py`, `backend/src/sentinel_processor.py`, `backend/src/cache_manager.py`.
- **APIs**: `/api/parcels`, `/api/field-logs`, `/api/municipalities`, `/api/geo/export-dossier`.
