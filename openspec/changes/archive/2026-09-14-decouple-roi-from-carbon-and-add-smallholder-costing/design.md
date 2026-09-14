## Context

In `src/components/agronomy/ImpactRoiWidget.tsx`, farm economic returns were previously calculated by aggregating fertilizer reduction savings, yield increases, and projected voluntary carbon credits into a single `totalNetEconomicBenefit`. In the current Venezuelan economic context, carbon credit monetization is neither immediate nor accessible to individual farmers, leading to distorted operational cashflow expectations. Furthermore, the calculator assumed an industrial mechanized operational model (cost per hectare, bulk inputs, tractor machinery), neglecting smallholders (*conuqueros*) who cultivate 0.5 to 5 hectares using manual labor, retail 50 kg fertilizer sacks, and backpack sprayers.

This technical design decouples the operational financial ROI from carbon credits, provides a dedicated smallholder costing model, introduces a pure TypeScript ROI engine (`src/lib/agronomy/roiCostEngine.ts`), and connects real parcel geometries directly to ROI projections.

## Goals / Non-Goals

**Goals:**
- **Strict Cashflow Separation**: Formulate operational farm net profit purely on tangible savings (fertilizer, regional amendments, predictive irrigation power/water, diesel or manual labor *jornales*) plus extra harvest yield sold at local market rates.
- **Dedicated Smallholder / Conuquero Costing Profile**: Model input economics for non-mechanized producers based on retail 50 kg sack pricing ($35–45/sack), backpack spraying reduction, and saved manual labor days (*jornales* at $10–15/day).
- **Preserved & Decoupled ESG Carbon Simulator**: Present voluntary carbon credit metrics ($\text{tCO}_2\text{e}$ sequestered and prospective market value) in a distinct, simulated environmental card explicitly tagged as a future certification scenario.
- **Dynamic Parcel Binding**: Allow `ImpactRoiWidget` to ingest real parcel diagnostic data (area, crop type, soil pH, recommended amendments) directly from `/dashboard/recomendaciones` and `/dashboard/tierras`.
- **Dual-Mode UI Support**: Seamlessly render engineering metrics (USD/ha, kg/ha, hr-man) in *Modo Técnico* and vernacular field metrics (sacos de abono, jornales, sacos cosechados) in *Modo Campesino Fácil*.

**Non-Goals:**
- Do not delete or alter `CarbonCreditsCalculator.tsx`, the SAR radar oracle (`/api/mrv/sar-oracle`), or the backend MRV logic.
- Do not add database schema migrations; all operational profiles and calculations are computed dynamically and can be saved to existing field notes or exported to PDF.

## Decisions

### Decision 1: Pure TypeScript Calculation Engine (`src/lib/agronomy/roiCostEngine.ts`)
- **Choice**: Extract all financial and agronomic calculations into a standalone module `roiCostEngine.ts`.
- **Rationale**: Isolates domain math from React component state, enables fast, comprehensive Jest unit testing, and facilitates reuse across `ImpactRoiWidget`, PDF dossier exporters, and dashboard recommendation cards.
- **Interface Structure**:
  ```typescript
  export type FarmingProfile = 'mechanized' | 'smallholder_manual';

  export interface RoiParameters {
    areaHa: number;
    cropType: string;
    profile: FarmingProfile;
    // Mechanized inputs
    dieselPricePerLiter?: number; // default $0.50 - $0.70/L
    dieselSavedLitersPerHa?: number; // default 15 L/ha
    bulkFertilizerSavingsUsdPerHa?: number;
    // Smallholder inputs
    fertilizerSacksSavedPerHa?: number; // default 3 - 6 sacos (50kg) / ha
    sackPriceUsd?: number; // default $38 / saco
    jornalesSavedPerHa?: number; // default 2 - 4 jornales / ha
    jornalRateUsd?: number; // default $12 / jornal
    // Common
    irrigationSavingsUsdPerHa?: number;
    extraYieldTonPerHa?: number;
    cropPriceUsdPerTon?: number;
    // Carbon simulation (decoupled)
    carbonPriceUsdPerTon?: number; // benchmark $15 / tCO2e
  }

  export interface OperationalRoiResult {
    totalFertilizerSavings: number;
    totalOperationalSavings: number; // diesel or jornales
    totalIrrigationSavings: number;
    totalExtraYieldRevenue: number;
    netOperationalProfit: number; // The decoupled cashflow total
    roiPercentage: number;
    // Vernacular equivalents for Farmer Easy Mode
    vernacular: {
      sacksFertilizerSaved: number;
      jornalesSaved: number;
      extraSacksHarvested: number;
    };
    // Decoupled Environmental ESG Simulation
    esgSimulation: {
      annualCo2SequesteredTons: number;
      potentialCarbonCreditRevenueUsd: number;
      disclaimer: string;
    };
  }
  ```

### Decision 2: Dual Profile Selector in `ImpactRoiWidget`
- **Choice**: Add an ergonomic toggle at the top of `ImpactRoiWidget`:
  - `🚜 Mecanizado / Extensivo` (Tractor, VRA Shapefile, diesel L/ha, granel $/ha).
  - `👨‍🌾 Pequeño Productor / Conuco` (Manual, sacos 50kg, fumigación de espalda, jornales).
- **Rationale**: Farmers instantly identify with their production mode without feeling alienated by industrial assumptions or irrelevant machinery inputs.

### Decision 3: Visual Decoupling of the ESG & Carbon Simulation
- **Choice**: The main summary card displays `Retorno Neto Operativo en Finca` ($ USD y $/ha) as the primary KPI. A distinct secondary section or card labeled `🌿 Proyección Ambiental y Bonos de Carbono (Simulación Futura)` renders the estimated $\text{tCO}_2\text{e}$ and potential carbon revenue, explicitly stating: *"Simulación prospectiva para certificación ambiental o bonos verdes. No forma parte del flujo de caja operativo inmediato."*
- **Rationale**: Aligns with Venezuelan field realities while completely protecting the project's award postulation and scientific MRV credentials.

### Decision 4: Parcel Diagnostic Hand-off
- **Choice**: In `/dashboard/recomendaciones`, add a "Calcular Retorno de Inversión (ROI)" button alongside each parcel diagnostic recommendation card, preloading the widget with the parcel's verified area, crop, and amendment requirements via query parameter or shared state.
- **Rationale**: Eliminates manual friction for agronomists and farmers testing the economic feasibility of a specific soil prescription.

## Risks / Trade-offs

- **[Risk] Existing test assertions in `ImpactRoiWidget.test.tsx` may fail due to the new calculation formula**:
  - *Mitigation*: Update existing tests to verify that `totalNetEconomicBenefit` equals operational savings without carbon, and add dedicated test suites verifying the smallholder profile calculations and decoupled ESG projection.
- **[Risk] Variation in input prices across Venezuelan regions (e.g., diesel prices or agrotienda markups in Táchira vs Portuguesa)**:
  - *Mitigation*: Provide sensible regional defaults calibrated to Venezuelan benchmarks with accessible adjustment sliders/steppers for custom input costs.
