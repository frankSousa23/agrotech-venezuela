## 1. Core ROI Calculation Engine

- [x] 1.1 Create `src/lib/agronomy/roiCostEngine.ts` implementing `calculateOperationalRoi` and `calculateEsgSimulation`, strictly decoupling operational net profit from carbon credits while supporting dual profiles (mechanized vs smallholder manual). Verify with unit test suite in `src/lib/agronomy/__tests__/roiCostEngine.test.ts`.
- [x] 1.2 Implement vernacular conversion utilities in `src/lib/agronomy/roiCostEngine.ts` translating monetary/metric results into field units (sacos de abono de 50 kg ahorrados, jornales de trabajo rindiendo más, sacos cosechados) for *Modo Campesino Fácil*. Verify with unit tests.

## 2. ROI Component Refactoring & Dual Profile UI

- [x] 2.1 Refactor `src/components/agronomy/ImpactRoiWidget.tsx` to consume `calculateOperationalRoi`, ensuring primary headline KPI `totalNetEconomicBenefit` represents purely operational farm cashflow (fertilizer + irrigation + operational labor/diesel + extra yield revenue). Verify operational profit excludes carbon revenue.
- [x] 2.2 Add ergonomic profile selector toggle (`🚜 Mecanizado / Extensivo` vs `👨‍🌾 Pequeño Productor / Conuco (Manual)`) in `ImpactRoiWidget.tsx` with dynamic control panels for smallholder inputs (retail sack prices, saved sacks, manual labor *jornales*) versus mechanized inputs (diesel L/ha, bulk fertilizer). Verify switching profiles immediately updates calculation and UI inputs.
- [x] 2.3 Implement decoupled secondary card `🌿 Proyección Ambiental y Bonos de Carbono (Simulación Futura)` in `ImpactRoiWidget.tsx` displaying prospective $\text{tCO}_2\text{e}$ sequestered and voluntary carbon revenue with explicit ESG simulation disclaimer. Verify card renders with distinct styling without affecting operational totals.
- [x] 2.4 Add dynamic parcel ingestion support (`initialParcel` prop / query parameter support) to `ImpactRoiWidget.tsx` so real registered parcel parameters (area in ha, crop type, soil pH, recommended amendments) prefill the calculator. Verify pre-population on parcel load.

## 3. Dashboard Integration & Parcel Diagnostic Handoff

- [x] 3.1 In `src/app/dashboard/recomendaciones/page.tsx`, add a "Calcular Retorno de Inversión (ROI)" action button to parcel recommendation cards, passing parcel ID, area, and crop type into the ROI component or routing with query params. Verify clicking opens the ROI simulator pre-populated.
- [x] 3.2 In `src/app/dashboard/tierras/page.tsx` (and `ParcelDiagnosticModal.tsx`), add quick-action link to evaluate economic ROI directly from the parcel diagnostic view. Verify navigation with parcel context.

## 4. Verification & Regression Testing

- [x] 4.1 Update and expand `src/components/agronomy/__tests__/ImpactRoiWidget.test.tsx` to cover decoupled cashflow calculations, smallholder profile toggles, vernacular presentation, and ESG simulation separation. Verify all tests pass with `npm test -- ImpactRoiWidget`.
- [x] 4.2 Run TypeScript verification (`npm run typecheck`) and the full Jest test suite (`npm test`) ensuring 0 type errors and 100% passing frontend suites.
- [x] 4.3 Run unified full test suite (`npm run test:all`) to confirm complete system cohesion across frontend and backend.
