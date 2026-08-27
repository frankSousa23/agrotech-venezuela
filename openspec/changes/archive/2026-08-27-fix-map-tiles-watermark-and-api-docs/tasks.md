## 1. Watermark-Free Leaflet Map Tiles

- [x] 1.1 Replace tile layer URLs in `VenezuelaStateMapInner.tsx`, `MapBiomasViewer.tsx`, `MultiLevelMapViewer.tsx`, and `LeafletMapInner.tsx` with clean OSM and Esri providers. Verify watermark-free rendering.

## 2. Interactive `/api-docs` Route

- [x] 2.1 Create `src/app/api-docs/page.tsx` with responsive Swagger/OpenAPI documentation. Verify `/api-docs` loads 200 OK.

## 3. Agronomic Typography & Overlay Layout Polish

- [x] 3.1 Replace `$CaCO_3$` with `CaCO₃` in `recomendaciones/page.tsx` and `dashboard/page.tsx`. Adjust overlay offsets in `MapBiomasViewer.tsx`. Verify layout.

## 4. System Validation & Testing

- [x] 4.1 Run full Jest test suite (`npm test`), TypeScript verification (`npx tsc --noEmit`), and Turbopack production build (`npm run build`).
