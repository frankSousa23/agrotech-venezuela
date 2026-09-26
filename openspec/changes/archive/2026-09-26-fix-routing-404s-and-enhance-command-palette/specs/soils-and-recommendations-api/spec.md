# Spec Delta: soils-and-recommendations-api

## Purpose

Provides resilient REST endpoints for soil profiles, agronomic compatibility recommendations, and statistics export with role-based access control.

## ADDED Requirements

### Requirement: Soils Profile Retrieval and Creation
The system SHALL provide `/api/soils` supporting GET requests to retrieve soil profiles and POST requests to record new soil samples. POST requests MUST require authentication with role `AGRONOMIST` or `ADMIN`.

#### Scenario: Public soil profile query
- **WHEN** any user (authenticated, farmer, or guest) performs `GET /api/soils`
- **THEN** system responds with HTTP 200 and a JSON list of soil profiles including pH, texture, organic matter, and state references.

#### Scenario: Unauthorized soil creation
- **WHEN** a user with role `FARMER` or an unauthenticated user sends a `POST /api/soils`
- **THEN** system responds with HTTP 401 or 403 Access Denied.

#### Scenario: Authorized agronomist soil creation
- **WHEN** a user with role `AGRONOMIST` or `ADMIN` sends a `POST /api/soils` with valid soil data
- **THEN** system saves or caches the soil record and responds with HTTP 201 Created.

### Requirement: Agronomic Recommendations Matrix
The system SHALL provide `/api/recomendaciones` supporting GET requests to return the compatibility matrix between Venezuelan crops and regional soil types.

#### Scenario: Querying recommendations matrix
- **WHEN** a client performs `GET /api/recomendaciones`
- **THEN** system responds with HTTP 200 and an array of crop-soil suitability recommendations with NPK guidelines and pH tolerance ranges.

### Requirement: Statistics and Soil Data Export
The system SHALL provide `/api/export/stats` supporting query parameter `format` (`csv` or `excel`/`json`) to download agronomic datasets.

#### Scenario: Exporting soils as CSV
- **WHEN** a user navigates to `/api/export/stats?format=csv`
- **THEN** system responds with HTTP 200, header `Content-Type: text/csv`, and a formatted CSV attachment containing soil samples and territorial metrics.
