## Why

To enhance the operational resilience and agronomic intelligence of Agrotech Venezuela with four cutting-edge modules: real-time network connectivity & sync status indicators for rural field operations, Sentinel-1 Synthetic Aperture Radar (SAR) for cloud-penetrating moisture tracking in tropical rainy seasons, a hydro-thermal Crop Water Balance & Growing Degree Days (GDD) growth stage predictor, and a formal Soil Organic Carbon (SOC) Carbon Credits & MRV (Measurement, Reporting and Verification) calculator.

## What Changes

- **1. Connectivity & Sync Visual Indicator**: A persistent status badge in the dashboard navigation bar displaying network connectivity (`Online 🟢`, `Offline Finca 🟠`, `Syncing 🔄`), pending offline mutations counter, and manual sync trigger.
- **2. Sentinel-1 SAR Cloud-Penetrating Radar Layer**: Radar backscatter analysis (VV/VH dual-polarization) to assess ground soil moisture and drainage anomalies during cloudy tropical months when optical Sentinel-2 is obstructed.
- **3. Hydro-Thermal Balance & Growing Degree Days (GDD) Engine**: Multi-criteria agroclimatic calculation aggregating daily NASA POWER thermal units ($10^\circ\text{C}$ base, $30^\circ\text{C}$ ceiling) and soil moisture balance (effective rainfall minus Penman-Monteith potential evapotranspiration $ET_0$) to estimate phenological stages (flowering, grain fill, harvest).
- **4. Soil Carbon Credits & MRV Calculator**: Interactive MRV module calculating baseline SOC, annual sequestered $\text{tCO}_2\text{e}/\text{ha}$ under conservation agriculture vs conventional tillage, and estimated carbon certificate revenue at international carbon credit market prices.
- **5. Global Verification & Integration Audit**: Automated validation across all API routes, Jest frontend tests, Pytest backend tests, TypeScript types, and Turbopack production compilation.

## Capabilities

### New Capabilities
- `connectivity-sync-indicator`: Visual real-time indicator of network state, pending offline mutations, and background sync triggers.
- `sar-cloud-penetration-radar`: Sentinel-1 SAR C-Band radar moisture detection through dense tropical cloud cover.
- `hydro-thermal-gdd-engine`: Daily thermal accumulation (GDD) and water balance phenology predictor.
- `carbon-credits-mrv-calculator`: Soil organic carbon sequestration quantification and MRV carbon credit estimator.

### Modified Capabilities
<!-- None -->

## Impact

- **Frontend**: Navigation bar (`src/components/layout/`), Map view (`src/components/gis/`), Simulador/Recomendaciones (`src/app/dashboard/recomendaciones/page.tsx`), Parcel Diagnostics (`src/components/gis/ParcelDiagnosticModal.tsx`).
- **Backend**: `backend/src/main.py`, `backend/src/risk_engine.py`, `backend/src/sentinel_processor.py`.
- **APIs**: `/api/geo/sar-radar`, `/api/geo/gdd-balance`, `/api/geo/carbon-mrv`.
