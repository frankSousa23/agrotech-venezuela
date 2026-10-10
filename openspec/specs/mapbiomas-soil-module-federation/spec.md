# mapbiomas-soil-module-federation Specification

## Purpose
Provides a federated, CORS-enabled geospatial API and export toolkit allowing external platforms, specifically MapBiomas Venezuela, to query localized soil physics (Saxton-Rawls), regional chemistry amendments (Kamprath), and generate Google Earth Engine scripts.

## Requirements

### Requirement: Federated Point Soil Query with k-NN Resolution
The system SHALL provide `GET /api/v1/soil/point` accepting latitude and longitude query parameters to return the nearest or interpolated soil physical-chemical profile with CORS enabled.

#### Scenario: Successful coordinate query
- **WHEN** a client performs `GET /api/v1/soil/point?lat=9.324&lon=-69.112`
- **THEN** system responds with HTTP 200, CORS header `Access-Control-Allow-Origin: *`, and JSON containing soil taxonomy, Saxton-Rawls parameters (field capacity, wilting point, PAW), regional chemistry, and Kamprath amendment recommendations.

#### Scenario: Missing coordinate parameters
- **WHEN** a client calls `GET /api/v1/soil/point` without latitude or longitude
- **THEN** system responds with HTTP 400 Bad Request detailing the missing coordinates.

### Requirement: Zonal Polygon Soil Intersection
The system SHALL provide `POST /api/v1/soil/intersect` accepting a GeoJSON Polygon or MultiPolygon payload to return area-weighted soil characteristics and aggregate amendment totals.

#### Scenario: Intersecting parcel polygon
- **WHEN** a client posts a valid GeoJSON Polygon with territorial coordinates
- **THEN** system computes surface area using ellipsoidal Shoelace WGS84, matches overlapping soil profiles, and responds with HTTP 200 containing weighted pH, bulk lime requirements in metric tons and 50 kg sacks, and total water retention volume in cubic meters.

#### Scenario: Invalid polygon geometry
- **WHEN** a client posts a malformed geometry payload
- **THEN** system responds with HTTP 400 Bad Request indicating invalid GeoJSON.

### Requirement: Google Earth Engine Script Generation
The system SHALL provide `GET /api/v1/soil/export/gee-script` returning a downloadable JavaScript module (`mapbiomas_soil_engine.js`) compatible with the Google Earth Engine Code Editor.

#### Scenario: Downloading Earth Engine module
- **WHEN** a user or client requests `GET /api/v1/soil/export/gee-script`
- **THEN** system responds with HTTP 200, `Content-Type: application/javascript`, and a valid Earth Engine module exporting functions for Saxton-Rawls PAW raster evaluation and Kamprath liming raster expressions.
