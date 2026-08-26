## 1. Component Architecture & Core Leaflet Map Engine

- [x] 1.1 Implement `VenezuelaStateMapInner.tsx` rendering all 24 state GeoJSON polygons with dynamic styling, hover outlines, click handlers, and `map.flyTo` camera animation. Verify interactive polygon clicks in browser.
- [x] 1.2 Add layer switcher controls for Standard Thematic, Esri Satellite HD, Soil pH, and NASA Rainfall. Verify that toggling layers preserves state polygons and click responsiveness.

## 2. Synchronized State Telemetry & UI Panel

- [x] 2.1 Build the integrated State Telemetry Card displaying capital, agricultural region, dominant soil texture, average pH, annual rainfall (NASA POWER), and key crops for the active state. Verify telemetry card updates immediately when a state is selected.
- [x] 2.2 Connect bidirectional state selection between the dropdown selector and map polygon clicks. Verify that choosing a state in dropdown centers the map and updates the telemetry card.

## 3. Page Integration, Deep-Linking & Verification

- [x] 3.1 Integrate the refactored map viewer in `src/app/dashboard/mapa/page.tsx` wrapped in `<Suspense>` with `useSearchParams` synchronization (`?state=<id>`). Verify direct URL navigation with query parameters.
- [x] 3.2 Update and execute test suites in Jest (`npm test`) and Pytest (`cd backend && py -m pytest tests`) to ensure 100% test coverage.
- [x] 3.3 Run `npx tsc --noEmit` and `npm run build` to verify clean TypeScript compilation and Turbopack production build.
