## Why

The current UI/UX architecture of the dashboard contains technical terminology (e.g. "Visor WebGIS", "Arquitectura", "Geoestadísticas") and a flat navigation structure that is overwhelming for a non-tech-savvy agronomist. Agronomists require a workflow-based approach that logically follows crop cycles (Farm -> Soil -> Crops -> Diary -> Results). Additionally, field usability must be improved by providing a seamless, globally accessible Dark Mode toggle that fully inverts the UI for low-light or preference-based usage, alongside the existing Sunlight Mode.

## What Changes

- **Navigation Grouping**: Restructure the sidebar into logical phases (Fase 1: Mi Terreno, Fase 2: Diagnóstico, Fase 3: Operación).
- **Renaming**: Change technical jargon to agronomy-friendly terms (e.g., "WebGIS" -> "Mapa Satelital").
- **Dark Mode**: Add a global dark mode toggle button accessible on all screens.
- **Empty States**: Improve onboarding empty states across views to enforce drawing a parcel first.

## Capabilities

### New Capabilities

- `ux/dark-mode-toggle`: Introduces a global dark mode toggle for low-light environments or user preference.
- `ux/agronomic-navigation`: Redesigns the navigation sidebar to use logical agricultural groupings and agronomist-friendly terminology.
- `ux/guided-empty-states`: Ensures that users without defined parcels are gently guided to the mapping tool from other views.

### Modified Capabilities

- `<empty>`

## Impact

- **UI Components**: `DashboardLayout` sidebar, Empty State components.
- **State Management**: Theme context (dark vs light vs sunlight).
- **Views**: Renaming page titles and adjusting `page.tsx` texts in dashboard sections.
