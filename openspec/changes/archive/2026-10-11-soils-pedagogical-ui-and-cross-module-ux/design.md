# Design: soils-pedagogical-ui-and-cross-module-ux

## Context

The Agrotech Venezuela platform provides high-precision agronomic calculations (`pedotransferEngine.ts`, `spatialUtils.ts`, `mapbiomasTrajectory.ts`). However, users without a background in soil physics find van Genuchten $pF$ logarithmic curves difficult to translate into actionable decisions. Additionally, inter-module navigation currently requires manual re-entry of parameters when moving from parcel diagnostic to soil simulation, from soil recommendations to field diary records, or from drought alerts to IoT irrigation testing.

See [proposal.md](proposal.md) for detailed background and motivations.

## Goals / Non-Goals

**Goals:**
- Deliver a lightweight, visually clear `SoilPedagogicalWaterBar` component rendering 4 physiological moisture zones (Marchitez, Estrés, Confort Radicular, Encharcamiento) and calculating estimated days of crop water autonomy.
- Deliver `MapBiomas40YearTrajectoryCard` connecting 40 years of satellite land cover transitions (1985–2024) to soil physical degradation (organic matter loss and subsoil compaction) and regenerative remedies.
- Implement a Dual-Mode switcher allowing seamless toggling between "Modo Didáctico MapBiomas" and "Modo Técnico Avanzado" in `/dashboard/suelos` and `/embed/soil-module`.
- Implement a Cross-Module Data Fabric using clean URL query contracts to connect WebGIS, Parcel Management, Soils, Crops, Field Diary, and IoT Lab.
- Streamline mobile (< 768px) touch ergonomics on parcel cards and field diary logging.

**Non-Goals:**
- Removing or dumbing down the scientific $pF$ curve engine (it remains accessible in Technical Mode).
- Modifying backend PostgreSQL/Prisma schemas or database migrations.
- Adding heavyweight third-party charting libraries (all new components use native SVG and CSS Modules).

## Decisions

### 1. Pure SVG & React State for the Water Comfort Bar
- **Decision**: Implement `SoilPedagogicalWaterBar` using native React SVG rendering with smooth CSS transitions, rather than Chart.js or D3.
- **Rationale**: Keeps the Next.js bundle footprint minimal, integrates natively with existing Dark Glassmorphism and Sunlight themes, and guarantees zero client hydration mismatches.
- **Alternative considered**: Expanding `SoilRetentionCurveCanvas.tsx` to handle both views in a single 500-line component. Rejected to maintain clean separation of concerns and testability.

### 2. Leverage Existing Multitemporal Trajectory Engine
- **Decision**: Directly import and call `calculateMapBiomasTrajectory(lat, lon)` from `src/lib/geo/mapbiomasTrajectory.ts`.
- **Rationale**: Agrotech already has a verified 40-year historical trajectory engine with regional classifications (Llanos, Andes, Zulia, Amazonas). Connecting it directly ensures 100% coherence across `/dashboard/recomendaciones`, `/dashboard/tierras`, and `/dashboard/suelos`.

### 3. URL Query Parameter Contracts for Cross-Module Handoffs
- **Decision**: Standardize URL query parameters for cross-module integration:
  - `/dashboard/suelos?tab=simulator&texture=[val]&ph=[val]&om=[val]&parcelId=[id]&parcelName=[name]`
  - `/dashboard/bitacora?action=ENCALADO&dosage=[val]&sacos=[count]&parcelId=[id]`
  - `/dashboard/cultivos?phMin=[val]&phMax=[val]`
  - `/dashboard/iot?preset=[val]&moisture=[val]`
- **Rationale**: URL parameters are stateless, shareable, testable, and support browser Back/Forward navigation naturally without fragile global state stores.

### 4. Vernacular Unit Conversion Rule
- **Decision**: For all liming and gypsum recommendations, automatically convert metric rates ($t/\text{ha}$) to traditional Venezuelan 50 kg bags ($1\text{ t} = 20\text{ sacos}$) formatted as:
  $$\text{Dosis: } X\text{ t/ha } (Y\text{ sacos de 50 kg por hectárea})$$
- **Rationale**: Bridges the gap between agricultural scientists and field producers who purchase and apply inputs in standard 50 kg sacks.

## Architecture & Data Flow Diagram

```
+-----------------------------------------------------------------------------+
|                          CROSS-MODULE DATA FLOW                             |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [ WebGIS / Parcela ]                                                       |
|       |                                                                     |
|       | (lat, lon, texture, ph)                                             |
|       v                                                                     |
|  [ /dashboard/suelos (Simulador) ] <====================================>   |
|       |                                [ Modo Didáctico / Técnico Toggle ]  |
|       +---> [ SoilPedagogicalWaterBar ]                                     |
|       |       - 4 Zonas de Humedad (Marchitez, Estrés, Confort, Ahogo)      |
|       |       - Autonomía Hídrica: Lámina Útil / 4.5 mm/día                 |
|       |                                                                     |
|       +---> [ MapBiomas40YearTrajectoryCard ]                               |
|       |       - 1985 (Bosque) ➔ 2024 (Agricultura)                          |
|       |       - Pérdida de M.O. (%) y Remediación en Sacos                  |
|       |                                                                     |
|       +=====================[ ACCIONES DE ENLACE ]========================+ |
|                 |                                    |                      |
|                 v                                    v                      |
|      [ Bitácora de Campo ]                 [ Catálogo Cultivos ]            |
|      ?action=ENCALADO                      ?phMin=5.5&phMax=6.5             |
|      &dosage=1.5 t/ha (30 sacos)                                            |
|                                                                             |
+-----------------------------------------------------------------------------+
```

## Risks / Trade-offs

- **[Risk] Visual overload on narrow mobile viewports (< 480px)**
  - *Mitigation*: Ensure `SoilPedagogicalWaterBar` and `MapBiomas40YearTrajectoryCard` use vertical responsive layout with collapsible details on small screens.
- **[Risk] Regional evapotranspiration ($ET_c$) assumptions**
  - *Mitigation*: Clearly label the days of water autonomy as an estimate based on $ET_c = 4.5\text{ mm/día}$, advising farmers to refer to local weather alerts during extreme drought or wet events.
