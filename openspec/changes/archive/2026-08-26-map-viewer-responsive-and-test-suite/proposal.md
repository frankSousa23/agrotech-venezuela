## Why

To elevate the WebGIS cartographic experience across all screen viewports (mobile, tablet, and desktop) by introducing a responsive collapsible bottom sheet/drawer for telemetry cards, dynamic floating map legends that react to active layers (SAR Radar, pH, NASA Rain, MapBiomas), automatic `map.invalidateSize()` event synchronization during mode switching, and a dedicated, comprehensive test suite covering all spatial geometry and map edge cases.

## What Changes

- **1. Mobile Responsive Bottom Sheet / Drawer**: Replace rigid 2-column grids on mobile/tablet viewports (< 900px) with a responsive layout where the map takes 100% viewport width and the state telemetry card docks smoothly as a collapsible drawer/bottom sheet.
- **2. Dynamic Floating Map Legends**: Add an interactive floating legend widget in the bottom-left corner of the map that adapts in real-time to the active layer (Radar SAR dB scale, pH traffic light, NASA precipitation mm, MapBiomas land cover classes).
- **3. Automatic `map.invalidateSize()` Synchronization**: Trigger size invalidation upon container resize, tab switching, or viewport changes using `ResizeObserver` and `useMap` hooks to eliminate blank tile rendering.
- **4. Exhaustive Map Testing Suite (`__tests__/api/map-viewer.test.ts`)**: Comprehensive unit and integration test suite covering 24 state geometries, 335 municipal topologies, Shoelace edge cases (concave/complex polygons), SAR backscatter boundary invariants, and layer color resolvers.

## Capabilities

### New Capabilities
- `map-viewer-responsive-drawer`: Responsive mobile drawer and collapsible bottom sheet for telemetry cards on smaller viewports.
- `map-floating-legends-and-sync`: Dynamic floating map legend component and automatic Leaflet `invalidateSize()` container synchronization.
- `map-spatial-test-suite`: Dedicated comprehensive test suite for all geospatial algorithms, state/municipal topologies, and map layer behaviors.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend**: `src/components/gis/VenezuelaStateMapViewer.tsx`, `src/components/gis/VenezuelaStateMapInner.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, `src/app/dashboard/mapa/page.module.css`.
- **Tests**: `__tests__/api/map-viewer.test.ts`, `__tests__/api/spatial.test.ts`.
