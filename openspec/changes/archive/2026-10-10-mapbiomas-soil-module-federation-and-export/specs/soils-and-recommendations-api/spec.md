# Spec Delta

## ADDED Requirements

### Requirement: GeoJSON and Spatial Data Export
The system SHALL provide `/api/export/stats` supporting query parameter `format=geojson` to download soil samples as a valid RFC 7946 GeoJSON FeatureCollection with spatial properties.

#### Scenario: Exporting soils as GeoJSON
- **WHEN** a client performs `GET /api/export/stats?format=geojson`
- **THEN** system responds with HTTP 200, `Content-Type: application/geo+json`, and a FeatureCollection containing Point geometries with properties including pH, organic matter, texture, and regional identification.
