## Why

Agronomists and farm managers new to Agrotech Venezuela need an intuitive, interconnected experience where every screen speaks their language and immediately leads to productive action. Currently, discovering how to register a farm, understanding specialized satellite metrics (SAR dB, GDD, SOC), moving from a crop in the catalog directly to its simulation, and starting a structured field diary require manual steps across disconnected screens. This change delivers a sequential, end-to-end UX suite that integrates a 30-second Welcome Quick-Start Wizard, 1-click crop simulation links, contextual agronomic tooltips, intent-driven farm drawing from "Mis Tierras", and phenological labor templates in the Field Diary.

## What Changes

- **Welcome Quick-Start Wizard (`QuickStartWizard.tsx`)**: An interactive 30-second modal for new users on the dashboard to register their first plot with 1 click (select State/Municipality, Crop, Area) and automatically create their digital twin. Includes an option to skip or dismiss to `localStorage`.
- **1-Click Crop Simulation Links (`/dashboard/cultivos`)**: Every crop card and modal in the Crop Catalog now features a primary action button "🌾 Simular en Mi Finca" that links directly to `/dashboard/recomendaciones?crop=<name>&state=<stateId>` pre-configuring the simulator inputs.
- **Direct Drawing Intent from "Mis Tierras" (`/dashboard/tierras`)**: The "+ Delimitar Nueva Parcela" button now links to `/dashboard/mapa?mode=multilevel&intent=draw` so the map immediately opens in drawing mode.
- **Agronomic Explanatory Tooltips (`AgroTooltip.tsx`)**: Contextual helper tooltips on technical metrics across the dashboard, simulator, and map (e.g., SAR dB radar moisture, GDD growing degree days, SOC soil organic carbon, pH fertility ranges, Shoelace area calculation) with practical field-level advice.
- **Phenological Labor Sequence Templates (`/dashboard/bitacora`)**: Quick-fill buttons in the Field Diary for standard crop cycle stages (e.g. "🌱 Siembra & Fondo", "🧪 Encalado Pre-Siembra", "⚡ Reabono con Urea V6", "🌾 Cosecha & Rendimiento") to eliminate blank-form paralysis.

## Capabilities

### New Capabilities
- `ux/quick-start-wizard`: 30-second first-time farm setup wizard modal on dashboard for 1-click plot creation.
- `ux/crop-catalog-simulation-link`: 1-click simulation action from crop catalog cards directly into the AI Advisor.
- `ux/agronomic-tooltips`: Reusable field-level contextual tooltips for complex agronomic, satellite and climatic indicators.
- `ux/field-diary-labor-templates`: Pre-configured phenological labor sequence templates for rapid field diary logging.

### Modified Capabilities
- `onboarding-module-guide`: Dashboard and landing onboarding cards updated to reference the quick-start wizard and cross-module simulation pathways.
- `ux/agronomic-navigation`: "Mis Tierras" quick-draw action updated to navigate with full multi-level drawing intent.

## Impact

- `src/components/ui/QuickStartWizard.tsx`: New component for initial farm setup wizard.
- `src/components/ui/AgroTooltip.tsx`: New component for practical agronomic metric tooltips.
- `src/app/dashboard/page.tsx`: Integrated QuickStartWizard and agro tooltips.
- `src/app/dashboard/cultivos/page.tsx`: Added simulation CTA button on cards.
- `src/app/dashboard/tierras/page.tsx`: Updated new parcel link with drawing intent.
- `src/app/dashboard/bitacora/page.tsx`: Added phenological quick-template buttons.
- `src/app/dashboard/recomendaciones/page.tsx`: Integrated AgroTooltip on GDD, SAR and SOC sliders.
- No new external dependencies; no database schema breaking changes.
