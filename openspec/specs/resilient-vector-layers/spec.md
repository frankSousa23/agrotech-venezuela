# resilient-vector-layers Specification

## Purpose

Renders GeoJSON polygons, tooltips, thematic color styles, and parcel drawing tools directly through Leaflet native vector layer APIs.

## Requirements

### Requirement: Native GeoJSON State Polygons
The system SHALL create and update 24 state polygons using `L.geoJSON` with styles corresponding to the selected layer (Thematic, pH, Rainfall, SAR, MapBiomas).

#### Scenario: State Selection
- **WHEN** user clicks on a state polygon (e.g. Portuguesa)
- **THEN** the map performs a cinematic `map.flyTo` animation to the state center and highlights the border with a golden stroke.

### Requirement: Native Parcel Polygon Delimitation
The system SHALL allow users to click coordinates on the map canvas to construct polygons, rendering real-time Shoelace area calculations.

#### Scenario: Delimiting a Micro-Parcel
- **WHEN** user clicks 4 vertices in drawing mode
- **THEN** an `L.polygon` vector is drawn on the canvas and total hectares are computed and displayed.
