# Proposal: soils-pedagogical-ui-and-cross-module-ux

## Why

While Agrotech Venezuela features rigorous pedotransfer and geospatial engines (Saxton-Rawls, Kamprath, van Genuchten $pF$, MapBiomas 40-year trajectories), the current Soil Module (`/dashboard/suelos` and `/embed/soil-module`) relies on dense physical formulas ($\log_{10}|\psi|$, $\theta\%$, kPa) that create cognitive friction for everyday MapBiomas users (ecologists, educators, policy makers) and field producers. Furthermore, navigation between modules remains partially siloed: farmers cannot effortlessly translate a soil diagnostic into a field diary labor entry with Venezuelan vernacular units (sacos/ha), nor easily inspect a parcel's hydrological comfort curve directly from the land management view. On mobile screens (< 768px), high-density action button rows wrap into cluttered stacks.

This change introduces a pedagogical layer for the Soil Module (a 4-zone Water Comfort Bar, a 40-year historical trajectory impact card, and a Dual-Mode switcher) alongside an end-to-end Cross-Module Data Fabric that unifies WebGIS, Parcel Management, Soils, Crops, Field Diary, and IoT Lab with touch-optimized mobile ergonomics.

## What Changes

- **Modo Didáctico MapBiomas & Semáforo Hídrico**: Add a visual soil water comfort bar ("Esponja de Suelo") with 4 physiological zones (Marchitez Roja, Estrés Amarillo, Confort Verde, Encharcamiento Azul) and estimated days of water autonomy ($\text{Lámina Útil} / ET_c$) in `/dashboard/suelos` and `/embed/soil-module`.
- **Memoria Territorial MapBiomas 40 Años (1985–2024)**: Add an explanatory card displaying the 40-year land cover trajectory (`calculateMapBiomasTrajectory`), organic matter depletion rate, and regenerative remediation steps.
- **Selector Dual-Mode en Suelos**: Add a top toggle between *Modo Didáctico MapBiomas* (visual, vernacular explanations, bag conversions) and *Modo Técnico Avanzado* (van Genuchten $pF$ curve, matric suction in kPa, $K_{sat}$, Kamprath equations).
- **Flujos Cruzados Bidireccionales (Cross-Module Fabric)**:
  - Add `[💧 Curva Hídrica & Suelo]` action to parcel cards in `/dashboard/tierras`, deep-linking into `/dashboard/suelos?tab=simulator&texture=...&ph=...&parcelId=...`.
  - Add `[📒 Registrar Enmienda en Bitácora]` button in `/dashboard/suelos`, deep-linking into `/dashboard/bitacora` with pre-filled labor type (`ENCALADO`), dosage in t/ha, and automatic conversion to 50 kg traditional bags.
  - Add `[🌱 Ver Cultivos Compatibles]` link in `/dashboard/suelos` to filter `/dashboard/cultivos` by the simulated pH and soil texture.
  - Add `[⚡ Probar Riego en IoT Lab]` trigger when simulated $PAW < 50\%$ to jump into `/dashboard/iot`.
  - Add `[🚀 Abrir en Agrotech Completo]` CTA on the embeddable `/embed/soil-module` iframe.
- **Ergonomía Táctil y Mobile Cleanup**:
  - Reorganize multi-button parcel cards in `/dashboard/tierras` into primary actions (`Diagnóstico Suelo`, `Asesor IA`) and a secondary menu/actions layout on small screens (< 768px).
  - Add quick vernacular voice action accessibility in `/dashboard/bitacora` for outdoor field usage.

## Capabilities

### New Capabilities
- `mapbiomas-pedagogical-soil-mode`: Introduces the intuitive pedagogical layer for the Soil Module, including the 4-zone Water Comfort Bar, days of water autonomy estimation, 40-year MapBiomas historical trajectory impact card, and the Dual-Mode toggle between Didactic and Technical views.
- `cross-module-data-fabric`: Defines the bidirectional URL state contracts, navigation bridges, and touch-optimized ergonomics connecting WebGIS, Parcel Management, Soil Simulator, Crop Catalog, Field Diary, and IoT Lab.

### Modified Capabilities
<!-- None -->

## Impact

- **Affected Views & Components**:
  - `src/app/dashboard/suelos/page.tsx` & `page.module.css`
  - `src/components/soils/SoilRetentionCurveCanvas.tsx` & `SoilSimulationSliders.tsx`
  - `src/app/embed/soil-module/page.tsx` & `page.module.css`
  - `src/app/dashboard/tierras/page.tsx` & `page.module.css`
  - `src/app/dashboard/bitacora/page.tsx` & `page.module.css`
  - `src/app/dashboard/cultivos/page.tsx`
- **APIs & Data Flow**: Purely client-side and URL parameter contracts (`tab`, `texture`, `ph`, `om`, `parcelId`, `action`, `dosage`, `sacos`); non-breaking with existing `/api/v1/soil/point`, `/api/parcels`, and `/api/field-logs`.
- **Testing**: Jest test suites for pedagogical components and integration links; 0 TypeScript errors; 100% preservation of the existing 306-test baseline.
