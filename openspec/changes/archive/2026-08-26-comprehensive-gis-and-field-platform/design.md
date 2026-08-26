## Context

Building on the robust Venezuela state explorer baseline, this design integrates the five sequential phases (A through E) into a cohesive, high-performance WebGIS and precision agriculture suite. The system leverages Next.js 16 (App Router with Turbopack), React-Leaflet (`ssr: false`), SQLite WAL caching, and FastAPI backend microservices.

## Goals / Non-Goals

**Goals:**
- Provide seamless hierarchical zoom and exploration: Level 1 (24 States) ➔ Level 2 (335 Municipalities & Hubs) ➔ Level 3 (Micro-Parcel Satellite Inspection).
- Support interactive polygon drawing on Esri World Imagery with live Shoelace WGS84 area calculation in hectares.
- Provide comprehensive spectral diagnostics modal with NDVI, NDWI, EVI, and 40-year MapBiomas history.
- Implement offline capability with Service Worker and local storage sync.
- Generate high-fidelity agronomic PDF dossiers and GeoJSON exports directly from the client.

**Non-Goals:**
- External proprietary GIS desktop formats (e.g. ArcGIS proprietary MXD).
- Real-time IoT drone fleet control (scoped for future phases).

## Decisions

### Decision 1: Hierarchical Multi-Level State Navigation
- **Choice**: MultiLevelMapViewer manages level state (1, 2, 3) seamlessly while allowing instant jump back to national level.
- **Rationale**: Gives users complete control over geographic resolution.

### Decision 2: Geodesic Calculation Engine
- **Choice**: Shoelace formula projected on WGS84 ellipsoid and Haversine for perimeter in `spatialUtils.ts`.
- **Rationale**: Highly accurate for Venezuelan low-latitude coordinates ($0.5^\circ\text{N}$ to $12.5^\circ\text{N}$).

### Decision 3: Client-Side PDF Dossier Generation
- **Choice**: Structured HTML/print rendering engine with custom styling and vector map snapshots.
- **Rationale**: Instantaneous generation without requiring heavy backend PDF rendering server dependencies.

## Risks / Trade-offs

- **[Risk]** Heavy GeoJSON payloads for 335 municipalities → **[Mitigation]** Lazy-load municipal geometries on demand per active state.
- **[Risk]** Offline tile storage size limits in browser → **[Mitigation]** Cache bounding box vectors and thumbnail tiles with LRU eviction.
