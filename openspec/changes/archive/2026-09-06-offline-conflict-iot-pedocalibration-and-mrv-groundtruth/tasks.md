## 1. Deterministic Parcel Conflict Quarantine & Dual-Mode Resolution

- [x] 1.1 Extend `Parcel` and offline synchronization interfaces with monotonic `version` (number) and `updated_at` (ISO timestamp) in `src/types/parcel.ts` and `src/lib/geo/spatialUtils.ts`. Verify TypeScript compilation passes without errors.
- [x] 1.2 Update `/api/parcels/route.ts` to detect version collisions during sync, reject silent overwrites, and route conflicting records to a quarantine storage endpoint `/api/parcels/conflicts`. Verify via automated unit test in `__tests__/api/parcels-conflict.test.ts`.
- [x] 1.3 Create Dual-Mode visual conflict modal `src/components/tierras/ParcelConflictModal.tsx` supporting vernacular comparison in Farmer Mode and coordinate/metric diff in Technical Mode. Verify rendering across both UI modes.
- [x] 1.4 Integrate the conflict resolution modal and quarantine notifications into `/dashboard/tierras/page.tsx` and IndexedDB sync queue. Verify user can accept local, accept remote, or perform attribute merge.

## 2. Dynamic Soil Texture Calibration & IoT Plant-Available Water (PAW)

- [x] 2.1 Implement Saxton-Rawls regional pedotransfer function and PAW calculator in `src/lib/agronomy/pedotransferEngine.ts` and `backend/src/iot_manager.py` for Arenoso, Franco ("Tierra Mansa"), and Arcilloso ("Tierra Brava"). Verify with unit test in `__tests__/agronomy/pedotransfer.test.ts`.
- [x] 2.2 Update IoT telemetry ingestion in `src/app/api/iot/telemetry/route.ts` and backend `iot_manager.py` to evaluate dynamic $\theta_{crit}$ and require $\text{PAW} < 50\%$ before triggering predictive irrigation. Verify suppression and actuation behavior with automated tests.
- [x] 2.3 Enhance `src/components/iot/SoilMoistureCard.tsx` and `/dashboard/iot/page.tsx` with texture badges, matric potential indicator, and PAW gauge. Verify responsive visual rendering.

## 3. Empirical Field Diary Ground Truth & Sentinel-1 SAR Radar Oracle

- [x] 3.1 Couple confirmed field operations from `src/lib/diary/fieldDiaryStorage.ts` (siembra directa, abonos verdes, encalado dolomítico) into `src/components/agronomy/CarbonCreditsCalculator.tsx` and `backend/src/risk_and_carbon_engine.py` to dynamically adjust SOC factors. Verify with unit test in `__tests__/agronomy/carbon-groundtruth.test.ts`.
- [x] 3.2 Implement Sentinel-1 SAR radar cross-polarization ($\sigma^\circ_{VH}/\sigma^\circ_{VV}$) and NASA POWER validation oracle in `src/lib/geo/sarRadarService.ts` and `/api/mrv/sar-oracle/route.ts`. Verify oracle collapses certification uncertainty from 40% to 10% when roughness threshold ($-12\text{ dB}$) is satisfied.
- [x] 3.3 Add MRV Ground-Truth and SAR Radar audit verification cards to the Carbon Credits Calculator UI. Verify visual state transitions upon audit check.

## 4. Comprehensive Quality Audit & Backward Compatibility

- [x] 4.1 Run full Jest test suite (`npm test`) and verify all new and existing tests pass.
- [x] 4.2 Run TypeScript typecheck (`npm run typecheck`) and verify 0 errors.
- [x] 4.3 Run backend Pytest suite (`py -m pytest backend/tests`) and verify all tests pass.
- [x] 4.4 Run full unified test suite (`npm run test:all`) and Next.js production build (`npm run build`) to ensure 28 clean routes and total system integrity.
