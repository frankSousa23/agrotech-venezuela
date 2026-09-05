## Purpose

Generates field-ready machinery prescription packages for variable-rate applications (VRA), supporting onboard GPS displays (ESRI Shapefiles), agricultural drones (GeoJSON / KML missions), and 1-page printable tractor cabin calibration cards for conventional tractors without onboard computers.

## ADDED Requirements

### Requirement: Multi-Format Machinery Prescription Export
The system SHALL compile calculated soil and fertilizer prescriptions into a downloadable package containing ESRI Shapefile, GeoJSON/KML, and a printable 1-page calibration sheet.

#### Scenario: Exporting VRA Shapefile for GPS Displays
- **WHEN** evaluator or farmer clicks export machinery package for a delineated parcel
- **THEN** the system generates ESRI Shapefile components (.shp, .shx, .dbf) carrying attributes `RATE_LIME`, `RATE_NPK`, `AREA_HA`, and `LOTE_ID` projected in standard UTM coordinates.

#### Scenario: Exporting Flight Boundary for Agricultural Drones
- **WHEN** user selects drone mission export format
- **THEN** the system outputs a GeoJSON/KML file compatible with DJI Agras and XAG agricultural drone controllers specifying flight perimeter and application dosage in L/ha.

#### Scenario: Generating 1-Page Printable Tractor Cabin Sheet
- **WHEN** user generates the analog cabin guide
- **THEN** the system outputs a printable 1-page document with parcel sketch, tractor gear, target engine RPM, and spreader gate opening calibration levels.
