## Why

In sandboxed iframe environments (such as Google AI Studio, Cloud Run previews, and embedded WebContainers), `react-leaflet` v5 frequently fails to resolve its React 19 context before client hydration completes. This leaves dynamic components perpetually stuck on the loading state ("Iniciando Mapa Global de Venezuela & Polígonos Estadales..."). Migrating all GIS viewers to pure native Leaflet (`L.map` via `useRef<HTMLDivElement>`) guarantees instant, 100% resilient map initialization across any host environment without losing any features.

## What Changes

- **1. Native Leaflet Ref Architecture in `VenezuelaStateMapInner.tsx`**: Replace `<MapContainer>` and `useMap()` with native `L.map(ref.current)` lifecycle. Maintain all 24 states vector GeoJSON, thematic layers (pH, Rainfall, SAR Radar, MapBiomas LULC), dynamic tooltips, and smooth `flyTo` camera animation.
- **2. Native Leaflet Ref Architecture in `LeafletMapInner.tsx`**: Migrate the 3-level multi-scale and parcel drawing viewer to native Leaflet with reactive polygon updates, Shoelace area calculations, and GPS soil sample markers.
- **3. Built-in `ResizeObserver` & Lifecycle Cleanup**: Ensure maps cleanly destroy instances on component unmount and immediately synchronize canvas dimensions upon mounting inside iframes.

## Capabilities

### New Capabilities
- `native-leaflet-map-engine`: Direct Leaflet DOM engine (`useRef`) with zero `react-leaflet` context dependencies.
- `lifecycle-safe-map-synchronizer`: Bulletproof instance tracking, `ResizeObserver`, and automatic cleanup on unmount.
- `resilient-vector-layers`: Direct GeoJSON layers with dynamic thematic styling and interactive click handlers.

### Modified Capabilities
<!-- None -->

## Impact

- **Components**: `src/components/gis/VenezuelaStateMapInner.tsx`, `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/MapResizeSynchronizer.tsx`.
- **Pages**: `src/app/dashboard/mapa/page.tsx`, `src/app/dashboard/page.tsx`, `src/app/dashboard/tierras/page.tsx`.
