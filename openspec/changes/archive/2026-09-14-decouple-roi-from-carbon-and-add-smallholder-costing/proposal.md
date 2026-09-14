## Why

In Venezuela's current agricultural reality, operational farmers and smallholders (conuqueros) make purchase and cultivation decisions based on tangible, immediate cashflow metrics: sacks of fertilizer purchased, diesel consumed per tractor pass, manual labor days (*jornales*), and harvest sales at the local silo or market. Carbon credit monetization and Soil Organic Carbon (SOC) markets in Venezuela remain nascent, largely inaccessible to individual producers, and speculative in immediate farm budgeting.

Previously, the platform's ROI simulator bundled projected carbon credit revenue directly into the producer's net operational financial profit (`totalNetEconomicBenefit = fertilizerSavings + extraYield + carbonRevenue`). This created unrealistic short-term cashflow projections for Venezuelan farmers while also failing to account for the unique cost structure of smallholders who cultivate manually without heavy machinery.

This change decouples the operational financial ROI from carbon credit monetization—basing farm cashflow strictly on verified agronomic savings (fertilizer, regional amendments, predictive irrigation, diesel or manual labor, and extra crop yield)—while preserving the carbon credit quantification and SAR radar MRV modules as prospective, simulated agroclimatic benchmarks for future ESG certification. Additionally, it introduces a dedicated smallholder costing profile modeled on manual labor, backpack sprayers, and commercial retail inputs (sacks and *jornales*).

## What Changes

- **Decoupled Operational ROI Formula**: Exclude SOC carbon credit revenue from the primary farm net economic benefit and operational cashflow. Net operational margin is strictly defined as `Ahorro en Fertilizantes/Enmiendas + Ahorro en Riego/Energía + Ahorro Operativo (Diesel o Mano de Obra) + Ingreso Bruto por Rendimiento Adicional`.
- **Prospective Environmental & ESG Simulation Section**: Retain carbon credit calculations (`tCO2e` sequestered, voluntary market valuation, and Verra VCS pooling) as a distinct, prospective environmental impact card clearly labeled as a simulation and future green financing projection.
- **Dual Operational Costing Profiles**:
  - **Mecanizado / Extensivo Profile**: Models tractor passes, VRA prescription Shapefiles, bulk fertilizer ($/ton), and diesel fuel consumption (12–20 L/ha).
  - **Pequeño Productor / Conuco Profile**: Models manual agriculture without machinery, factoring in retail fertilizer sacks (50 kg sacks at $35–45/sack), backpack spraying hours, and manual labor (*jornales* at $10–15/day saved by precision timing).
- **Dynamic Real-Parcel ROI Ingestion**: Enable the ROI calculator to directly ingest active parcel data from `/api/parcels` (area, crop type, pH, texture, diagnostic recommendations) and field diary logs rather than relying solely on manual slider defaults.
- **Vernacular Integration with Dual-Mode UI**: In *Modo Campesino Fácil*, present smallholder ROI in field terms (sacos de abono ahorrados, días de trabajo/jornales rindiendo más, sacos cosechados), while providing engineering metrics (USD/ha, kg/ha, kWh/ha) in *Modo Técnico*.

## Capabilities

### Modified Capabilities
- `ecosystem-impact-and-roi-simulator`: Update the ROI calculation requirement to strictly separate operational farm cashflow from carbon credit monetization, introduce dual-track costing profiles (mechanized vs smallholder manual labor), and enable dynamic ingestion of real parcel diagnostic metrics.

## Impact

- **Affected UI Components**:
  - `src/components/agronomy/ImpactRoiWidget.tsx`: Refactored calculation engine, dual profile switch (Mecanizado vs Pequeño Productor), and separated ESG/Carbon simulation view.
  - `src/app/dashboard/recomendaciones/page.tsx`: Pass active parcel parameters and selected agronomic recommendation into the ROI calculator.
  - `src/app/dashboard/tierras/page.tsx`: Quick-action link from parcel diagnostic card to instant ROI breakdown.
- **Affected Logic & Engines**:
  - `src/lib/geo/regionalSoilEngine.ts` & `src/lib/geo/hydroThermalEngine.ts`: Standardize per-hectare and per-sack savings constants.
- **Backward Compatibility & Testing**:
  - All existing Carbon MRV modules (`CarbonCreditsCalculator.tsx`, SAR radar oracle, MapBiomas transition matrices) remain 100% operational and intact.
  - Jest test suites for ROI and agronomy components will be updated and expanded to cover smallholder calculations and decoupled financial summaries.
