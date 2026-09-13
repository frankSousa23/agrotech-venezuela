## 1. Map Viewport Elasticity and Unclipped Responsive Expansion

- [x] 1.1 Update `LeafletMapInner.tsx` and `VenezuelaStateMapInner.tsx` to expand geographic boundaries to `[[-1.0, -76.0], [16.0, -57.0]]` and reduce `maxBoundsViscosity` to `0.55` to eliminate the half-cut viewport clipping. Verify with `npm test -- __tests__/api/native-gis-lifecycle.test.ts`.
- [x] 1.2 Update container styles in `src/app/dashboard/mapa/page.module.css` and `MultiLevelMapViewer.tsx` to utilize fluid full-width and `height: 75vh; min-height: 680px` with immediate `map.invalidateSize()` reactive triggers. Verify layout in browser.

## 2. Basemap Interactivity and Thematic Layer Feedback

- [x] 2.1 Update tile configurations in `LeafletMapInner.tsx` and `VenezuelaStateMapInner.tsx` to route `activeLayer === 'dark'` to CartoDB Dark Matter tiles (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) instead of standard white OSM. Verify by testing "Modo Oscuro" button.
- [x] 2.2 Add Level 3 contextual edaphoclimatic feedback in `MultiLevelMapViewer.tsx` so that toggling "Semáforo pH", "Lluvias NASA", or "MapBiomas 2024" updates visual badges and parcel polygon styling with the active stratum data. Verify layer switching in Level 3.

## 3. Cartographic Ergonomics and Role-Based Usability

- [x] 3.1 Implement a collapsible floating panel toggle (`[◀ Ocultar Panel]` / `[▶ Controles]`) in `MultiLevelMapViewer.tsx` with mobile auto-collapse to free up the touch drawing canvas. Verify panel toggle in desktop and mobile viewports.
- [x] 3.2 Add Fullscreen toggle (`[⛶ Pantalla Completa]`) and GPS geolocation centering (`[📍 Ubicar mi Finca]`) with HTML5 Geolocation API and toast error handling in `MultiLevelMapViewer.tsx`. Verify controls in browser.
- [x] 3.3 Refine role-based UI ergonomics in map views (`FARMER` touch-friendly presets, `TECH` telemetry metrics, `AUDITOR` methodology badges, `GUEST` persistent sandboxing). Verify with auth role toggling.

## 4. Testing, Building and Full Validation

- [x] 4.1 Update and run Jest map test suites (`__tests__/api/map-viewer.test.ts`, `__tests__/api/native-gis-lifecycle.test.ts`, `__tests__/agronomy/unifiedMapAndIoTLab.test.ts`) verifying all map expansion, layer switching, and role ergonomics tests pass.
- [x] 4.2 Run `npm run typecheck` verifying 0 TypeScript errors.
- [x] 4.3 Run `npm run build` verifying clean production build across 31 Turbopack routes.
- [x] 4.4 Run `npm run test:all` and `npx openspec validate --all` verifying all tests and spec deltas pass.
