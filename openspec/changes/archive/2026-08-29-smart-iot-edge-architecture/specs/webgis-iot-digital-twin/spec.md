## Purpose

Visualizes live IoT node placements, moisture rings, and remote actuator switches directly on the Leaflet WebGIS and farm management interfaces.

## ADDED Requirements

### Requirement: Interactive IoT Digital Twin on WebGIS
The WebGIS viewer SHALL render georeferenced sensor nodes inside parcel boundaries, color-coding current soil moisture status and providing manual actuator override controls.

#### Scenario: Visualizing Sensor Health and Sparklines
- **WHEN** user selects an IoT node pin inside a parcel
- **THEN** a telemetry drawer displays current NPK, pH, moisture percentages, battery levels, and 24-hour historical trend charts.

#### Scenario: Manual Actuator Override Command
- **WHEN** producer clicks the "Activar Riego Manual" button in the WebGIS interface
- **THEN** the system dispatches an ON command to the designated actuator and updates the active valve indicator.
