## Purpose

Enables 360-degree inter-module navigation from individual parcel cards to the Field Diary, Carbon Credits MRV Calculator, and IoT Telemetry with pre-populated parcel parameters.

## ADDED Requirements

### Requirement: Parcel Card 360 Degree Cross-Module Navigation
The parcel cards in "Mis Tierras" SHALL provide direct navigation links to the Field Diary, Carbon MRV Calculator, and IoT Digital Twin, carrying the parcel identifier, area, and state parameters.

#### Scenario: Opening Field Diary for Specific Parcel
- **WHEN** user clicks the "Cuaderno / Labores" action link on a parcel card
- **THEN** the system SHALL navigate to `/dashboard/bitacora?parcelId=<id>` and automatically filter existing logs and pre-select that parcel in the new labor modal.

#### Scenario: Opening Carbon MRV Calculator for Specific Parcel
- **WHEN** user clicks the "Carbono MRV" action link on a parcel card
- **THEN** the system SHALL navigate to `/dashboard/recomendaciones?parcelId=<id>#carbon-credits` with initial area and soil organic matter populated from the parcel geometry.
