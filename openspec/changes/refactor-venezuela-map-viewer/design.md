## Context

See `proposal.md` for motivation. The application is built on Next.js 16 (React 19) with Turbopack. Leaflet requires browser `window` access and must always be rendered on the client via `next/dynamic(..., { ssr: false })`. Geographic boundary data is statically structured in `src/lib/geo/venezuelaGeoJson.ts` (24 state geometries) and `src/lib/geo/venezuelaData.ts` (state agroclimatic statistics).

## Goals / Non-Goals

**Goals:**
- Provide a clean, robust, and responsive full-screen map viewer centered on Venezuela (`[8.0, -66.0]`, zoom 6).
- Render all 24 state polygons with dynamic thematic styling, hover effects, and interactive click handling.
- Display an integrated, well-structured telemetry card showing the selected state's capital, region, soil texture, pH, rainfall, and agricultural highlights.
- Support smooth bidirectional selection (clicking a map polygon updates the card and dropdown; choosing from dropdown moves the map camera).
- Enable URL query param deep linking (`/dashboard/mapa?state=<id>`).

**Non-Goals:**
- Micro-parcel drawing or multi-tier municipal nesting during this initial stabilization phase (to be layered cleanly once the global state explorer baseline is approved).
- Modification of backend Python/FastAPI data models.

## Decisions

### Decision 1: Architecture of `VenezuelaStateMapViewer` Component
- **Choice**: Encapsulate the map container and telemetry sidebar into a unified, modular component dynamically imported with `ssr: false`.
- **Rationale**: Isolates Leaflet lifecycle from Next.js server components and guarantees 0 SSR hydration issues.
- **Alternatives Considered**: Direct Google Maps iframe (rejected: lack of interactive polygon events, styling, and offline capability).

### Decision 2: State Selection State Management
- **Choice**: Single state `selectedStateId: string` with `useState` in the parent container, passed down to the Leaflet inner component and the Info Card.
- **Rationale**: Keeps map polygons and telemetry card in 100% synchronization.
- **Alternatives Considered**: Internal Leaflet-only state (rejected: disconnected from external controls and URL search params).

### Decision 3: Polygon Styling & Layer Switching
- **Choice**: Declarative layer switcher supporting Standard Thematic (by region), High-Definition Satellite (Esri), Soil pH heatmap, and NASA Rainfall.
- **Rationale**: Allows agronomists and farmers to inspect spatial variations effortlessly.

## Risks / Trade-offs

- **[Risk]** Leaflet icon path resolution bugs in Next.js Turbopack → **[Mitigation]** Use custom SVG/divIcon or omit default pin markers in favor of styled GeoJSON polygons.
- **[Risk]** `useSearchParams` de-opting Next.js page to client render → **[Mitigation]** Wrap `MapaContent` in `<Suspense fallback={...}>` in `src/app/dashboard/mapa/page.tsx`.
