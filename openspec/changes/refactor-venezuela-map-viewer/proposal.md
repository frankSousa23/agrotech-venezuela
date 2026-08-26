## Why

The current map section has grown complex across multi-level abstractions, resulting in unstable interactions, rendering friction, and degraded user experience. The user requires a clean, robust, and functional baseline: a global Venezuelan territorial map clearly referencing the 24 federal entities with polygon delimitations, where selecting/clicking any state smoothly centers the camera, highlights the entity, and displays comprehensive agricultural and edaphoclimatic telemetry in an integrated side panel. This establishes a solid, stable, and reactive foundation before layering subsequent phased features.

## What Changes

- Refactor and simplify the WebGIS map viewer component into a reliable, dedicated Venezuela State Explorer (`VenezuelaStateMapViewer`).
- Ensure 100% reactive polygon rendering for all 24 Venezuelan states with interactive hover highlighting, click-to-select, and camera animation (`flyTo`).
- Implement an integrated State Telemetry & Information Card displaying: capital, agricultural region, dominant soil texture, average pH, annual rainfall (NASA POWER), major crops, and MapBiomas land cover breakdown.
- Integrate seamless two-way state selection (via map polygon click or dropdown selector).
- Maintain deep-link search parameter synchronization (`?state=<state_id>`) for direct URL navigation.
- Ensure zero SSR hydration crashes with dynamic Leaflet imports, rock-solid TypeScript types, and comprehensive Jest/Pytest automated test coverage.

## Capabilities

### New Capabilities
- `venezuela-map-viewer`: Interactive global map of Venezuela with 24 state boundaries, reactive click-to-select, synchronized information panel, and deep-link integration.

### Modified Capabilities
<!-- None: No existing specs in openspec/specs -->

## Impact

- **Frontend Components**: `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, `src/app/dashboard/mapa/page.tsx`.
- **Data & Utilities**: `src/lib/geo/venezuelaData.ts`, `src/lib/geo/venezuelaGeoJson.ts`.
- **Testing**: Jest test suites (`__tests__/api/spatial.test.ts`, `__tests__/api/geo.test.ts`).
- **Dependencies**: React-Leaflet, Leaflet, Next.js App Router.
