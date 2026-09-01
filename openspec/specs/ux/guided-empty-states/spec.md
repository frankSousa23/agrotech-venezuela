# Guided Empty States Specification

## Purpose
Provides guided empty states on dependent views (like Recommendations and Field Diary) to ensure users always define a parcel first before attempting advanced workflows.

## Requirements

### Requirement: Mandatory Parcel Gateway
The system SHALL detect if a user has zero defined parcels when navigating to data-dependent views (e.g., IA Recommendations).

#### Scenario: Navigating without parcels
- **WHEN** a user with no parcels visits the IA Recommendations page
- **THEN** the system displays a friendly empty state card explaining that a parcel is required, with a primary action button linking directly to the map to draw one
