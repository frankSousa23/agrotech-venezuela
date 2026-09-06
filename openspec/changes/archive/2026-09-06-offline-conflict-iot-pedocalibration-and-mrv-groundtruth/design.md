## Context

Agrotech Venezuela operates across extreme rural connectivity constraints and diverse agro-ecological regions—from the acid sandy savannas of Monagas and Anzoátegui to the heavy vertisol clays of Portuguesa and Sur del Lago.

Currently:
- Parcels stored in memory, IndexedDB, and SQLite WAL lack monotonic version counters. When offline producers and desktop agronomists make concurrent updates, naive synchronization defaults to Last-Write-Wins, risking silent loss of boundary modifications or edaphic data.
- The predictive irrigation engine (`backend/src/iot_manager.py` and `src/app/api/iot/telemetry/route.ts`) triggers on a uniform 30.0% volumetric water content (VWC) threshold. In vertisol clay soils ("Tierra Brava"), 30% moisture is near permanent wilting point ($\psi_m \approx -1500\text{ kPa}$), leaving crops in severe water stress; in sandy soils, 30% indicates oversaturation.
- Soil Organic Carbon (SOC) MRV modeling (`CarbonCreditsCalculator.tsx`, `risk_and_carbon_engine.py`) relies on self-reported tillage dropdowns. International standards (Verra VCS / IPCC Tier 2) discount unverified claims by up to 40-50% unless anchored to empirical field logs and satellite radar cross-validation.

See `proposal.md` for complete motivation and target capabilities.

## Goals / Non-Goals

**Goals:**
- Implement monotonic `version` tracking and `updated_at` timestamps for parcels in client state and `/api/parcels`.
- Detect version divergence on sync and isolate conflicting payloads into a `parcel_conflicts` quarantine repository.
- Provide a Dual-Mode visual conflict resolution interface in `/dashboard/tierras`:
  - **Modo Productor Fácil**: Vernacular wording (*"Compadre, encontramos dos versiones..."*), side-by-side card previews, and single-tap selection.
  - **Modo Técnico**: Detailed geometry, area, soil pH, crop, and author metadata diff with manual merge controls.
- Parameterize soil hydraulic thresholds ($\theta_{FC}$, $\theta_{PWP}$, $\theta_{crit}$) by texture ("Arenoso", "Franco / Tierra Mansa", "Arcilloso / Tierra Brava") and compute Plant-Available Water ($\text{PAW} = \frac{\theta - \theta_{PWP}}{\theta_{FC} - \theta_{PWP}} \times 100$).
- Couple verified field diary entries (`/dashboard/bitacora`) with dynamic SOC calculation and integrate a Sentinel-1 SAR Radar cross-polarization ($\sigma^\circ_{VH}/\sigma^\circ_{VV}$) and NASA POWER oracle to collapse MRV uncertainty deductions from 40% to 10%.
- Maintain 100% test pass rate across the existing 202 tests and 0 TypeScript compilation errors.

**Non-Goals:**
- Implementing complex, heavyweight distributed CRDT frameworks (e.g. Yjs or Automerge), which inflate mobile bundle sizes and complicate simple farm boundary disputes.
- Real hardware LoRaWAN receiver deployment (synthetic/telemetry simulator endpoints fulfill validation requirements).
- Direct live API integration with the commercial Verra Registry clearinghouse (simulation and cryptographic hash receipts are appropriate for TRL 7).

## Decisions

### 1. Optimistic Versioning with Conflict Quarantine over Silent Overwrite or CRDT
- **Rationale**: An agronomist re-measuring a parcel centroid on desktop should not be silently overwritten by an offline field scout adjusting crop variety on a phone. By including a `version: number` attribute, if `client.version !== server.version`, the incoming payload is stored in a quarantine collection (`parcel_conflicts`) and marked with an active dispute flag.
- **Alternatives Considered**:
  - *Last-Write-Wins (LWW)*: Current naive approach; discards data silently.
  - *CRDTs (Yjs/Automerge)*: Excessive CPU and bundle overhead (~1.5 MB) for low-end rural Android devices; geometric polygons do not naturally merge without spatial intersection artifacts.

### 2. Dual-Mode Resolution UI (Farmer vs Technical)
- **Rationale**: Adheres to the platform's core architectural principle (`UIModeContext`). Smallholders need clear, non-technical visual decisions without jargon, while agronomists require coordinate precision.
- **Farmer Card**: "Versión de Campo" vs "Versión de Oficina", showing area in hectares, date, and a big green button.
- **Technical Card**: GeoJSON difference visualization, centroid drift in meters, soil metric comparison, and an explicit attribute-level merger.

### 3. Texture-Aware Pedotransfer Functions (PAW & Matric Potential)
- **Rationale**: Volumetric water content is physically meaningless without soil matric potential ($\psi_m$).
- **Parameters**:
  - *Arenoso (Sand)*: $\theta_{FC} = 14.0\%$, $\theta_{PWP} = 6.0\%$, $\theta_{crit} = 9.0\%$ (PAW range: 8.0%).
  - *Franco / "Tierra Mansa" (Loam)*: $\theta_{FC} = 28.0\%$, $\theta_{PWP} = 14.0\%$, $\theta_{crit} = 20.0\%$ (PAW range: 14.0%).
  - *Arcilloso / "Tierra Brava" (Clay)*: $\theta_{FC} = 44.0\%$, $\theta_{PWP} = 28.0\%$, $\theta_{crit} = 35.0\%$ (PAW range: 16.0%).
- **Actuation Rule**: Irrigation is recommended when $\text{PAW} < 50.0\%$ and NASA POWER forecast precipitation for the next 6 hours is $< 5.0\text{ mm}$.

### 4. Empirical Ground-Truth Field Diary & Sentinel-1 SAR Radar Oracle
- **Rationale**: Theoretical SOC models (IPCC Tier 1) carry a standard 40% uncertainty deduction in carbon credit markets. By pairing confirmed farm activities (e.g. Siembra Directa, Abonos Verdes, Cal Dolomítica) from `cuaderno_labores` with Sentinel-1 SAR C-band dual-polarization cross-ratio ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$, confirming biomass structure and soil roughness), empirical verification is achieved, reducing certification uncertainty to 10%.

## Risks / Trade-offs

- **[Risk] Legacy parcels stored without a `version` field**
  → *Mitigation*: Migration default initializes existing records to `version: 1` and sets `updated_at` to the current timestamp.
- **[Risk] Offline user submits multiple conflicting drafts before reconnecting**
  → *Mitigation*: Client-side queue collapses intermediate pending edits to the latest local draft with incremented sequence before sending.
- **[Risk] Radar backscatter noise during heavy tropical downpours**
  → *Mitigation*: Cross-validation requires multi-pass temporal filtering and cross-checks with NASA POWER precipitation flags to separate surface puddle dielectric shifts from genuine canopy biomass.

## Migration Plan

1. Seamless schema extension: `version` (default: 1) and `updated_at` added to `Parcel` interface in `src/types/parcel.ts` and `src/app/api/parcels/route.ts`.
2. Telemetry ingestion gracefully accepts either explicit `soil_texture` or defaults to `'franco'`.
3. Non-destructive: Existing saved parcels and field notes remain fully operational.
