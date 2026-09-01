# Parcel Save Handoff Specification

## Purpose
Propagates a saved parcel's agronomic data (stateId, ph, soilTexture, currentCrop) as URL query parameters when navigating to downstream views, so users do not have to re-enter data they already defined on the map.

## Requirements

### Requirement: Post-Save Action Panel
The system SHALL display a success action panel immediately after a parcel is saved successfully to `/api/parcels`.

#### Scenario: Parcel saved successfully
- **WHEN** `POST /api/parcels` returns a successful response
- **THEN** the map drawing panel transitions to a success state showing the saved parcel name, area in hectares, and two CTA buttons: "Ver mis Fincas" (→ `/dashboard/tierras`) and "Obtener Recomendaciones IA" (→ `/dashboard/recomendaciones?state=<stateId>&ph=<ph>&soilTexture=<texture>&crop=<crop>`)

#### Scenario: User chooses IA recommendations after saving
- **WHEN** the user clicks "Obtener Recomendaciones IA" from the success panel
- **THEN** the browser navigates to `/dashboard/recomendaciones` with the parcel's stateId, ph, soilTexture, and currentCrop pre-filled as query parameters

### Requirement: Simulator Parcel Pre-Population
The system SHALL read `?ph`, `?soilTexture`, and `?crop` query params on the Recomendaciones page and pre-populate the corresponding simulator sliders and selectors.

#### Scenario: Arriving from a saved parcel
- **WHEN** the user navigates to `/dashboard/recomendaciones?state=portuguesa&ph=6.2&soilTexture=Franco&crop=Maíz Blanco`
- **THEN** the state selector, pH slider, and texture selector are initialised with those values without requiring manual adjustment

### Requirement: Clean Drawing State Reset
The system SHALL fully reset all drawing state when the user clears the drawn polygon.

#### Scenario: User clears a partially drawn polygon
- **WHEN** the user clicks the clear/trash button during or after drawing
- **THEN** all drawn vertices are removed, the parcel name field reverts to the default placeholder, and any success or error panel is hidden so the canvas is ready for a fresh drawing session
