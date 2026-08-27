## 1. Native Leaflet Ref Engine in `VenezuelaStateMapInner.tsx`

- [x] 1.1 Refactor `VenezuelaStateMapInner.tsx` to native Leaflet (`useRef<HTMLDivElement>` + `L.map`) with 24 state GeoJSON polygons, thematic colors (pH, Rain, MapBiomas, SAR), tooltips, and `flyTo` transitions.

## 2. Native Leaflet Ref Engine in `LeafletMapInner.tsx`

- [x] 2.1 Refactor `LeafletMapInner.tsx` to native Leaflet with multi-scale zooming, parcel drawing, Shoelace area calculation, and GPS soil sample markers.

## 3. Instance Lifecycle & Resize Synchronization

- [x] 3.1 Implement safe cleanup on unmount (`map.remove()`) and `ResizeObserver` listener to prevent `"already initialized"` errors and handle iframe resizes.

## 4. Full Validation & Test Suite

- [x] 4.1 Run full Jest test suite (`npm test`), TypeScript verification (`npx tsc --noEmit`), and Turbopack production build (`npm run build`).
