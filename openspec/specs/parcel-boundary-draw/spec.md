# parcel-boundary-draw Specification

## Purpose

Enables precision drawing of parcel polygons on high-resolution satellite imagery with real-time geodetic metric calculation and database persistence.

## Requirements

### Requirement: Interactive Parcel Boundary Drawing
The system SHALL provide interactive polygon drawing and vertex editing tools with real-time Shoelace WGS84 area in hectares and Haversine perimeter. After saving, the system SHALL display a success action panel with navigation options to continue to downstream views. Clicking the clear button SHALL reset all drawing state — including the parcel name field — to a clean initial state.

#### Scenario: Drawing and Saving a Field Parcel
- **WHEN** user draws a polygon around their agricultural plot and clicks "Guardar Parcela"
- **THEN** the system computes the exact surface area in hectares and perimeter in meters, persists the parcel to `/api/parcels`, and displays a success panel with CTAs to "Ver mis Fincas" and "Obtener Recomendaciones IA"

#### Scenario: Resetting Drawing State
- **WHEN** the user clicks the clear button (trash icon) at any point during or after drawing
- **THEN** all polygon vertices are removed, the parcel name reverts to "Tablón Nuevo — Parcela 1", and any success or error message is hidden

### Requirement: Continuous Deep-Link to Gemini Advisor from Saved Parcels
The parcel management view (`/dashboard/tierras`) SHALL provide a direct, prominent action button on saved parcel cards that links seamlessly to `/dashboard/recomendaciones` with query parameters (`crop`, `stateId`, `parcelName`) to auto-populate the agronomic recommendation wizard.

#### Scenario: Requesting AI Prescription for a Specific Parcel
- **WHEN** user clicks "✨ Obtener Recomendación IA" on a saved parcel card (e.g. "Tablón 1 - Maíz Turén")
- **THEN** the system navigates to `/dashboard/recomendaciones` with the parcel name, state, and crop pre-selected, ready to generate the prescription.
