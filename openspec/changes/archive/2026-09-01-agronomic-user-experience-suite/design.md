## Context

See `proposal.md - Why` for motivation. The Agrotech Venezuela platform contains sophisticated WebGIS, ML and AI capabilities, but new users (especially agronomists without GIS expertise) need immediate, sequential guidance to set up their land, understand satellite metrics, and seamlessly move between crop catalog, simulator, map, and field diary.

## Goals / Non-Goals

**Goals:**
- Provide a frictionless 30-second initial setup wizard for new users on the dashboard.
- Establish cross-module deep links from the crop catalog directly into the AI Advisor.
- Clarify technical and satellite metrics (SAR dB, GDD, SOC, pH, Shoelace) with field-level tooltips.
- Add phenological quick-templates in the Field Diary to eliminate empty-form fatigue.
- Ensure all interactive elements respect the 3-state theme system (Light, Dark, Sunlight).

**Non-Goals:**
- Creating new backend microservices or changing PostgreSQL schema.
- Replacing existing detailed form modals (the templates only pre-fill existing modal fields).
- Enforcing mandatory completion (all wizards and templates can be skipped or closed).

## Decisions

### 1. `QuickStartWizard.tsx` Client-Side State & Persistence
- **Decision**: Implemented as a clean modal component using React hooks. Checks `localStorage.getItem('agrotech-quickstart-dismissed')`. When the user submits, it sends a standard `POST /api/parcels` request with default centroid coordinates for the selected municipality.
- **Why**: Avoids creating a complex user-preferences schema in the database while giving instant feedback.
- **Alternative considered**: Forcing wizard as a blocking onboarding route (`/onboarding`). Rejected because users should be free to explore immediately if they prefer.

### 2. Crop Simulation Deep-Link Architecture
- **Decision**: In `src/app/dashboard/cultivos/page.tsx`, add a `"🌾 Simular en Mi Finca"` CTA button on each crop card. This builds a link to `/dashboard/recomendaciones?crop=${encodeURIComponent(crop.name)}`.
- **Why**: Leverages the query-parameter handoff mechanism already established in the recommendations page, providing instant parameter pre-population without global state overhead.

### 3. Accessible, Lightweight `AgroTooltip` Component
- **Decision**: Build `src/components/ui/AgroTooltip.tsx` with pure CSS glassmorphism, rendering a small `(?)` badge with floating popover on hover/focus.
- **Why**: Zero external dependencies, highly responsive, supports touch devices on mobile/field tablets, and adheres to WCAG accessibility.

### 4. Phenological Templates in `FieldLogModal`
- **Decision**: In `src/app/dashboard/bitacora/page.tsx`, render a row of quick-template badges (e.g. "🌱 Siembra & Fondo", "🧪 Encalado", "⚡ Reabono Urea V6", "🌾 Cosecha"). Clicking any template opens `FieldLogModal` with pre-filled `activityType`, `description`, and unit suggestions.
- **Why**: Dramatically speeds up data entry for agronomists managing multiple field logs.

## Risks / Trade-offs

- **[Risk] Modal stacking**: If multiple modals open simultaneously (e.g., QuickStart + SoilModal). → **Mitigation**: QuickStart only opens on `/dashboard` and closes before any navigation occurs.
- **[Risk] Touch usability on mobile for tooltips**: Hover does not work on smartphones. → **Mitigation**: `AgroTooltip` supports both click/tap toggling and focus events.

## Migration Plan

1. Purely additive UI/UX components.
2. 0 database migrations needed.
3. 0 new npm packages needed.
4. Backward-compatible with all existing bookmarks and routes.

## Open Questions

None. All technical decisions are resolved.
