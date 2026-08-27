## Why

Visual audit identified that Leaflet maps currently display an "API KEY REQUIRED" watermark on thematic layers due to deprecated CartoDB tile URLs, clicking "/api-docs" returns a 404 error, and several UI descriptions display raw LaTeX strings like "($CaCO_3$)". This change removes all tile watermarks, implements the interactive `/api-docs` Swagger UI, and sanitizes typography and overlay positioning.

## What Changes

- **1. Watermark-Free Leaflet Map Tiles**: Replace CartoDB basemap URLs across `VenezuelaStateMapInner.tsx`, `MapBiomasViewer.tsx`, `MultiLevelMapViewer.tsx`, and `LeafletMapInner.tsx` with high-resolution, unmetered OpenStreetMap (`tile.openstreetmap.org`) and Esri Topo basemaps without watermarks.
- **2. Interactive `/api-docs` Route**: Create `src/app/api-docs/page.tsx` integrating Swagger UI and interactive OpenAPI documentation connected directly to the FastAPI backend at `http://127.0.0.1:8000/docs`.
- **3. Agronomic Typography & Layout Polish**: Sanitize raw LaTeX strings `($CaCO_3$)` into clean Unicode `CaCO₃ (Cal Dolomítica/Agrícola)` and reposition the overview layer selector to prevent collision with Leaflet zoom buttons.

## Capabilities

### New Capabilities
- `watermark-free-map-tiles`: Clean, high-definition open map tiles without API key watermarks for all WebGIS components.
- `interactive-api-docs-explorer`: Dedicated Next.js OpenAPI/Swagger interactive explorer page.
- `agronomic-typography-and-layout-fixes`: Unicode formatting for soil amendments and ergonomic overlay layout adjustments.

### Modified Capabilities
<!-- None -->

## Impact

- **GIS Components**: `src/components/gis/VenezuelaStateMapInner.tsx`, `src/components/gis/MapBiomasViewer.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, `src/components/gis/LeafletMapInner.tsx`.
- **Pages**: `src/app/api-docs/page.tsx`, `src/app/dashboard/recomendaciones/page.tsx`, `src/app/dashboard/page.tsx`.
