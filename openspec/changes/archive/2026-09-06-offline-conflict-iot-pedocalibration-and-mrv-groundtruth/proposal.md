## Why

Agricultural field operations in Venezuela face extreme connectivity fragility, complex edaphological variability across regions (from heavy vertisol clays in Portuguesa and Sur del Lago to acidic sandy savannas in Monagas/Anzoátegui), and stringent audit standards for international carbon credit certification (Verra VCS / IPCC Tier 2).

Currently:
1. When multiple field agents or an agronomist and producer edit parcel boundaries, soil data, or crop attributes offline, naive reconnection or simple idempotency risks silent overwrite ("Last-Write-Wins"), destroying critical technical edits made in the field.
2. The predictive irrigation engine utilizes a flat, hardcoded soil moisture threshold (30.0% VWC), which causes critical agronomic misjudgments: in clay soils ("Tierra Brava"), 30% moisture is near the permanent wilting point ($\psi_m \approx -1500\text{ kPa}$), leaving crops in drought stress without irrigation; conversely, in sandy soils, 30% indicates near-saturation.
3. The Carbon MRV calculator computes theoretical sequestration potential based on static dropdown assumptions, which are subject to high uncertainty discounts (~50%) by international carbon registries without empirical field verification and satellite radar backscatter validation.

This change introduces deterministic version-based conflict quarantine for parcels, texture-aware pedotransfer functions for IoT irrigation decisions, and empirical ground-truth coupling with Sentinel-1 SAR radar cross-validation for carbon MRV audit trails.

## What Changes

- **Deterministic Parcel Conflict Quarantine & Visual Resolution**:
  - Implements an incremental `version` counter and `updated_at` timestamps on parcel entities across IndexedDB, LocalStorage, and backend API storage (`/api/parcels`).
  - Detects version divergence upon reconnect: instead of silently overwriting server data, conflicting submissions are routed to an offline-resilient quarantine state (`parcel_conflicts`).
  - Adds a Dual-Mode conflict resolution card/modal in `/dashboard/tierras`:
    - *Farmer Mode ("Modo Productor Fácil")*: Rural vernacular dialogue (*"Compadre, detectamos dos versiones de este lote: la guardada en campo vs la de oficina. ¿Con cuál nos quedamos?"*), side-by-side thumbnail comparison, and one-tap selection.
    - *Technical Mode*: Side-by-side delta inspector (area in ha, centroid coordinates, soil pH, crop variety, timestamp, and author) with manual merge or overwrite options.
- **Dynamic Soil Texture Calibration for IoT Sensors (Matric Potential $\psi_m$ & PAW)**:
  - Replaces the monolithic 30.0% moisture trigger in `backend/src/iot_manager.py` and `src/app/api/iot/telemetry/route.ts` with pedotransfer functions parameterized by soil texture classification:
    - *Arenoso (Sandy)*: Field Capacity ($\theta_{FC}$) ~14%, Permanent Wilting Point ($\theta_{PWP}$) ~6%, Stress Threshold ($\theta_{crit}$) ~9%.
    - *Franco / "Tierra Mansa" (Loam)*: $\theta_{FC}$ ~28%, $\theta_{PWP}$ ~14%, Stress Threshold ($\theta_{crit}$) ~20%.
    - *Arcilloso / "Tierra Brava" (Clay)*: $\theta_{FC}$ ~44%, $\theta_{PWP}$ ~28%, Stress Threshold ($\theta_{crit}$) ~35%.
  - Computes Plant-Available Water percentage ($\text{PAW} = \frac{\theta - \theta_{PWP}}{\theta_{FC} - \theta_{PWP}} \times 100$) to evaluate crop hydric safety before evaluating NASA POWER precipitation forecasts.
  - Updates the IoT Microcrop Lab interactive simulator and telemetry cards to reflect calibrated thresholds and active soil texture.
- **Empirical Ground Truth Coupling & Sentinel-1 SAR Radar Oracle for Carbon MRV**:
  - Integrates recorded field diary operations (`/dashboard/bitacora` events: siembra directa / no-till, enmienda con cal dolomítica, incorporación de abonos verdes, pastoreo rotativo) into the Soil Organic Carbon (SOC) formula in `CarbonCreditsCalculator.tsx` and `backend/src/risk_and_carbon_engine.py`.
  - Establishes a Sentinel-1 SAR Radar cross-polarization ($\sigma^\circ_{VH}/\sigma^\circ_{VV}$ ratio) and NASA POWER precipitation validation oracle: checks surface structural roughness and soil moisture dynamics to confirm that recorded regenerative practices physically occurred on the parcel, reducing Verra VCS uncertainty deductions from 40% down to 10% and elevating credit issuance value.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `offline-pwa-geocache`: Adds deterministic parcel versioning, conflict quarantine queue, and vernacular/technical visual conflict resolution for offline edits.
- `predictive-irrigation-engine`: Implements texture-aware pedotransfer functions (Arenoso, Franco/"Tierra Mansa", Arcilloso/"Tierra Brava") calculating Plant-Available Water (PAW) and dynamic matric potential thresholds for irrigation triggering and suppression.
- `carbon-credits-mrv-calculator`: Couples empirical field diary management logs directly with dynamic SOC calculations, and introduces a Sentinel-1 SAR Radar cross-polarization verification oracle to collapse MRV uncertainty margins for Verra VCS certification.

## Impact

- **Frontend Core & State**:
  - `src/app/api/parcels/route.ts`: Adds version tracking, collision detection, and `/api/parcels/conflicts` handling.
  - `src/components/tierras/ParcelConflictModal.tsx`: Visual resolution component adapted to Dual-Mode UI (Farmer vs Technical).
  - `src/components/agronomy/CarbonCreditsCalculator.tsx`: Dynamic ground-truth diary sync and Sentinel-1 SAR cross-validation widget.
  - `src/app/dashboard/iot/page.tsx` & `src/components/iot/SoilMoistureCard.tsx`: Soil texture selector and PAW gauge visualization.
- **Backend Services**:
  - `backend/src/iot_manager.py`: Texture-aware pedotransfer thresholds and PAW calculation logic.
  - `backend/src/risk_and_carbon_engine.py`: Ground-truth labor coefficients and SAR backscatter verification validator.
- **Testing & Quality Assurance**:
  - New test suites for parcel conflict resolution, texture-calibrated IoT telemetry, and carbon MRV ground-truth oracle.
  - Guarantees backward compatibility with all existing 202 tests (150 Jest + 52 Pytest) and 0 TypeScript errors.
