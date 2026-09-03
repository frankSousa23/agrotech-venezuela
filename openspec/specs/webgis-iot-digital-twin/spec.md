# Capability: WebGIS IoT Digital Twin

## Purpose

Visualizes live IoT node placements, moisture rings, and remote actuator switches directly on the Leaflet WebGIS and farm management interfaces.

## Requirements

### Requirement: Interactive IoT Digital Twin on WebGIS
The WebGIS viewer SHALL render georeferenced sensor nodes inside parcel boundaries, color-coding current soil moisture status and providing manual actuator override controls.

#### Scenario: Visualizing Sensor Health and Sparklines
- **WHEN** user selects an IoT node pin inside a parcel
- **THEN** a telemetry drawer displays current NPK, pH, moisture percentages, battery levels, and 24-hour historical trend charts.

#### Scenario: Manual Actuator Override Command
- **WHEN** producer clicks the "Activar Riego Manual" button in the WebGIS interface
- **THEN** the system dispatches an ON command to the designated actuator and updates the active valve indicator.

### Requirement: Micro-Crop Lab Linkage and Digital Twin Extension
The farm management view (`/dashboard/tierras`) and global dashboard navigation SHALL provide direct bidirectional routing to the interactive IoT Micro-Crop Laboratory (`/dashboard/iot`), enabling producers to transition between macro-parcel twin monitoring and micro-experimental sensor benches.

#### Scenario: Navigating from Saved Parcel to IoT Laboratory
- **WHEN** user clicks "Laboratorio IoT" on a saved parcel or in the sidebar
- **THEN** the system navigates to `/dashboard/iot` retaining the parcel context and active crop presets.
