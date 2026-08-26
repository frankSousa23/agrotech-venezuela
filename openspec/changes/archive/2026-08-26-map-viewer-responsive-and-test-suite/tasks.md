## 1. Responsive Drawer & Mobile-First Map Layout

- [x] 1.1 Update `page.module.css` and `VenezuelaStateMapViewer.tsx` with responsive media queries for screens `< 900px` (full width map + collapsible telemetry). Verify mobile rendering.

## 2. Dynamic Floating Legend & Canvas Synchronization

- [x] 2.1 Implement floating legend component inside `VenezuelaStateMapInner.tsx` and `LeafletMapInner.tsx` showing active scale for SAR, pH, Rainfall, MapBiomas. Verify legend transitions.
- [x] 2.2 Implement `MapResizeSynchronizer` to automatically trigger `map.invalidateSize()` on resize and mode switch. Verify tile rendering.

## 3. Dedicated Exhaustive Map Testing Suite

- [x] 3.1 Create `__tests__/api/map-viewer.test.ts` testing 24 states, 335 municipalities, layer styling, and extreme Shoelace polygons. Verify `npm test` passes 100%.
- [x] 3.2 Verify TypeScript compilation (`npx tsc --noEmit`) and Turbopack production build (`npm run build`).
