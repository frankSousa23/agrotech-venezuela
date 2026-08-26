## 1. Visual Connectivity & Synchronization Badge

- [x] 1.1 Implement `ConnectivityStatusBadge.tsx` with online/offline state listeners, pending IndexedDB mutations counter, and manual sync action. Verify in layout header.

## 2. Sentinel-1 SAR Cloud Penetration Radar

- [x] 2.1 Implement `sarRadarService.ts` and integrate Sentinel-1 SAR Radar layer option into `VenezuelaStateMapInner.tsx` and `MultiLevelMapViewer.tsx`. Verify SAR radar backscatter visualization.

## 3. Hydro-Thermal Balance & Growing Degree Days (GDD)

- [x] 3.1 Implement `hydroThermalEngine.ts` calculating daily $GDD_{10}^{30}$ and monthly precipitation vs evapotranspiration water balance. Verify GDD output and phenology predictions.
- [x] 3.2 Add Hydro-Thermal & GDD module to `/dashboard/recomendaciones/page.tsx` and `/dashboard/estadisticas/page.tsx`. Verify interactive GDD charts.

## 4. Soil Carbon Credits & MRV Calculator

- [x] 4.1 Implement `CarbonCreditsCalculator.tsx` calculating SOC stocks, annual $\text{tCO}_2\text{e}$ sequestration under conservation practices, and economic credit valuation. Verify calculation accuracy.
- [x] 4.2 Integrate MRV Carbon Calculator into `/dashboard/recomendaciones` and parcel diagnostics. Verify carbon credit simulation.

## 5. Global Verification & End-to-End System Audit

- [x] 5.1 Add Jest test cases in `__tests__/api/` for SAR radar, GDD engine, and Carbon MRV formulas. Verify `npm test` passes 100%.
- [x] 5.2 Execute backend test suite with Pytest (`cd backend && py -m pytest tests`). Verify all tests pass.
- [x] 5.3 Verify clean TypeScript compilation (`npx tsc --noEmit`) and Turbopack production build (`npm run build`).
