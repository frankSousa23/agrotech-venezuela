## Context

During visual inspection, three specific issues were found:
1. CartoDB basemap URLs show a diagonal "API KEY REQUIRED" watermark text on all vector tiles.
2. Navigating to `/api-docs` returns a 404 page.
3. Raw LaTeX strings like `$CaCO_3$` appear in UI text, and the overview map legend collides with Leaflet's zoom buttons.

## Goals / Non-Goals

**Goals:**
- Upgrade all Leaflet tile configurations to clean, unmetered, watermark-free OpenStreetMap and Esri sources.
- Create an interactive Next.js route at `/api-docs` displaying OpenAPI / Swagger UI.
- Format all chemical notations as clean Unicode subscripts (`CaCO₃`, `N-P-K`).
- Position floating map controls with proper offsets away from standard Leaflet controls.

**Non-Goals:**
- Modifying underlying geospatial algorithms (Shoelace, Haversine, GDD remain unchanged).

## Decisions

### 1. Tile Provider Configuration
- Use OpenStreetMap standard (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`) for vector/thematic basemaps and Esri World Imagery (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`) for satellite imagery.

### 2. Next.js OpenAPI Documentation Page (`/api-docs`)
- Build a responsive documentation page embedding the FastAPI OpenAPI interface with interactive endpoint testing and direct download links for the OpenAPI JSON schema.

### 3. Typography & Overlay Offsets
- Replace all instances of `$CaCO_3$` with `CaCO₃ (Cal Dolomítica/Agrícola)`.
- Adjust CSS overlay margins in `MapBiomasViewer.tsx` to prevent overlapping Leaflet's `top-left` zoom controls.
