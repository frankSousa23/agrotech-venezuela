## Purpose

Enables precision drawing of parcel polygons on high-resolution satellite imagery with real-time geodetic metric calculation and database persistence.

## ADDED Requirements

### Requirement: Interactive Parcel Boundary Drawing
The system SHALL provide interactive polygon drawing and vertex editing tools with real-time Shoelace WGS84 area in hectares and Haversine perimeter.

#### Scenario: Drawing and Saving a Field Parcel
- **WHEN** user draws a polygon around their agricultural plot and clicks "Guardar Parcela"
- **THEN** the system computes the exact surface area in hectares and perimeter in meters, and persists the parcel to `/api/parcels`.
