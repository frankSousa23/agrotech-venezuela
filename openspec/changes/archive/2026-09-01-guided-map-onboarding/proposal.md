## Why

Agronomists reaching the map for the first time find no contextual guidance on how to navigate from the national view to their municipality and then activate parcel drawing. Beyond that, a saved parcel is not automatically wired into downstream views — the IA Advisor requires manual state selection, the Field Diary does not react to a saved parcel's data, and after saving there is no clear call to action to continue. This change delivers a zero-friction first-use experience: guided, connected, and forgiving of mistakes.

## What Changes

- **Map tutorial banner**: When a user with zero parcels opens the Mapa Satelital in Multi-Scale mode, a collapsible step-by-step banner explains the 3-level navigation flow (País → Municipio → Lote) and the draw tool, with a one-click demo ("Tablón Auto") as a fallback.
- **Intent-aware map routing**: Dashboard links to the map now append `?intent=draw` when the user comes from "Delimita tu Parcela" (Step 2). The map page detects this and auto-switches to Multi-Scale mode so the user lands directly in the drawing context.
- **Level breadcrumb with tooltips**: A visible progress indicator (Nivel 1 ✓ → Nivel 2 ✓ → Nivel 3) appears above the map controls in Multi-Scale mode. Each level shows a plain-language tooltip (e.g., "Nivel 3 = aquí dibujas tu lote").
- **Parcel save → redirect flow**: After `POST /api/parcels` succeeds, the UI shows a success panel with two CTAs: "Ver mis Fincas" (→ `/dashboard/tierras`) and "Obtener Recomendaciones" (→ `/dashboard/recomendaciones?state=<stateId>`). This wires the saved parcel's `stateId` into the IA Advisor so it pre-selects the correct state and climate data automatically.
- **Post-save cross-section data propagation**: The saved parcel's `ph`, `soilTexture`, `currentCrop`, and `stateId` are forwarded as query params when navigating to Recomendaciones, so the simulator sliders are pre-populated without the user having to re-enter data.
- **Clean reset / drawing state guardrails**: Clearing the drawn polygon (`btn_draw_clear`) now also resets the parcel name field to the default placeholder and collapses the success panel so the user can start fresh cleanly.
- **Dashboard "Paso 2" link update**: The Step 2 card link changes from `/dashboard/mapa` to `/dashboard/mapa?mode=multilevel&intent=draw` so the user lands exactly in drawing mode.

## Capabilities

### New Capabilities

- `ux/map-drawing-tutorial`: In-map contextual tutorial banner and level breadcrumb for guiding first-time parcel drawing across the 3-level WebGIS hierarchy.
- `ux/parcel-save-handoff`: Post-save redirect flow that propagates parcel data (stateId, ph, soilTexture, crop) as query params to downstream views (Recomendaciones, Tierras).

### Modified Capabilities

- `parcel-boundary-draw`: The draw and save flow SHALL now show a success action panel after saving and reset drawing state cleanly on clear.
- `onboarding-module-guide`: The dashboard Step 2 "Delimita tu Parcela" card SHALL link with `?mode=multilevel&intent=draw` so the map opens directly in drawing mode.
- `ux/guided-empty-states`: The empty state for Recomendaciones and Bitácora SHALL accept a `?state=<id>` query param forwarded from a newly saved parcel to pre-select the correct state in the simulator.

## Impact

- `src/app/dashboard/page.tsx` — update Step 2 link href
- `src/app/dashboard/mapa/page.tsx` — read `?intent=draw` param to set initial mode
- `src/components/gis/MultiLevelMapViewer.tsx` — add tutorial banner, breadcrumb, success redirect panel, reset guardrails
- `src/app/dashboard/recomendaciones/page.tsx` — read `?ph`, `?soilTexture`, `?crop` query params to pre-populate simulator sliders
- No new API routes; no schema changes; no dependency additions
