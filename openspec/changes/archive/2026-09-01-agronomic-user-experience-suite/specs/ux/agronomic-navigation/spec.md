## MODIFIED Requirements

### Requirement: Agronomic Section Grouping
The system SHALL organize the main navigation sidebar into logical agricultural phases: Identification, Diagnosis, and Operation.

#### Scenario: Viewing the sidebar
- **WHEN** a user logs into the dashboard
- **THEN** they see the navigation items grouped by agronomic workflow steps instead of a flat list

### Requirement: Friendly Copywriting
The system SHALL use agronomy-focused terminology for navigation items instead of technical software architecture terms.

#### Scenario: Identifying core tools
- **WHEN** the user looks for the WebGIS tool
- **THEN** it is labeled as "Mapa Satelital" to be immediately recognizable by non-technical producers

## ADDED Requirements

### Requirement: Intent-Driven Navigation from Mis Tierras
The "Delimitar Nueva Parcela" action in "Mis Tierras" (`/dashboard/tierras`) SHALL navigate with full drawing intent.

#### Scenario: Clicking new parcel from Tierras page
- **WHEN** user clicks "+ Delimitar Nueva Parcela en WebGIS" in `/dashboard/tierras`
- **THEN** the system navigates to `/dashboard/mapa?mode=multilevel&intent=draw` so the user lands directly in drawing mode
