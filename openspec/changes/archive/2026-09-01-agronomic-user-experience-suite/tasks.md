## 1. Reusable UI Components

- [x] 1.1 Create `src/components/ui/AgroTooltip.tsx` and `src/components/ui/AgroTooltip.module.css` with accessible hover/click popover support and theme-aware styling. Verify by testing tooltip rendering with sample text.
- [x] 1.2 Create `src/components/ui/QuickStartWizard.tsx` and `src/components/ui/QuickStartWizard.module.css` with a 3-step farm setup form (State/Municipality, Crop, Area) and 1-click parcel creation. Verify parcel creation calls `/api/parcels` and saves to state.

## 2. Dashboard Integration & Quick-Start Trigger

- [x] 2.1 In `src/app/dashboard/page.tsx`, mount `QuickStartWizard` for users with zero parcels, and add an explicit "⚡ Asistente de Inicio" button in the onboarding header to allow re-opening at any time. Verify the modal opens and dismisses properly.
- [x] 2.2 Add `AgroTooltip` components to key KPI metric cards in `src/app/dashboard/page.tsx` (MapBiomas, NASA POWER, AHP). Verify hover/click reveals practical agronomic explanations.

## 3. Cross-Module Deep-Linking

- [x] 3.1 In `src/app/dashboard/cultivos/page.tsx`, add a "🌾 Simular en Mi Finca" action button on each crop card that navigates to `/dashboard/recomendaciones?crop=<name>`. Verify clicking any crop card redirects to the AI advisor with that crop pre-loaded.
- [x] 3.2 In `src/app/dashboard/tierras/page.tsx`, update the "+ Delimitar Nueva Parcela en WebGIS" button href to `/dashboard/mapa?mode=multilevel&intent=draw`. Verify clicking navigates directly into the WebGIS drawing mode.

## 4. Field Diary Phenological Templates

- [x] 4.1 In `src/app/dashboard/bitacora/page.tsx`, add a row of quick-fill template buttons ("🌱 Siembra & Fondo", "🧪 Encalado Dolomítico", "⚡ Reabono Urea V6", "🌾 Cosecha & Rendimiento") that open `FieldLogModal` with pre-filled activity type, description, and dosage suggestions. Verify clicking a template loads the pre-filled modal.

## 5. Simulator Contextual Tooltips

- [x] 5.1 In `src/app/dashboard/recomendaciones/page.tsx`, integrate `AgroTooltip` on the GDD Thermal Engine, SAR Radar moisture, and SOC Carbon Credit metric sections. Verify all tooltips render with clear agronomic guidance.

## 6. Verification & Testing

- [x] 6.1 Run `npm test` and confirm all existing and new test suites pass with 0 regressions.
- [x] 6.2 Run `npx tsc --noEmit` and confirm 0 TypeScript errors.
