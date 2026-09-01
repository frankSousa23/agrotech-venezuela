## MODIFIED Requirements

### Requirement: Interactive Parcel Boundary Drawing
The system SHALL provide interactive polygon drawing and vertex editing tools with real-time Shoelace WGS84 area in hectares and Haversine perimeter. After saving, the system SHALL display a success action panel with navigation options to continue to downstream views. Clicking the clear button SHALL reset all drawing state — including the parcel name field — to a clean initial state.

#### Scenario: Drawing and Saving a Field Parcel
- **WHEN** user draws a polygon around their agricultural plot and clicks "Guardar Parcela"
- **THEN** the system computes the exact surface area in hectares and perimeter in meters, persists the parcel to `/api/parcels`, and displays a success panel with CTAs to "Ver mis Fincas" and "Obtener Recomendaciones IA"

#### Scenario: Resetting Drawing State
- **WHEN** the user clicks the clear button (trash icon) at any point during or after drawing
- **THEN** all polygon vertices are removed, the parcel name reverts to "Tablón Nuevo — Parcela 1", and any success or error message is hidden
