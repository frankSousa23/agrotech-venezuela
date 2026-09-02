# map-viewer-responsive-drawer Specification

## Purpose

Provides a fluid responsive layout for WebGIS viewers that adapts seamlessly across mobile screens, tablets, and desktop workstations without clipping or horizontal overflow.

## Requirements

### Requirement: Responsive Collapsible Telemetry Drawer
The system SHALL adapt the telemetry card layout based on screen width, displaying a stacked or collapsible bottom sheet on viewports smaller than 900px.

#### Scenario: Mobile Viewport Rendering
- **WHEN** a user opens the map on a screen narrower than 900px
- **THEN** the map fills 100% of the available horizontal space, and the state telemetry card docks below or as an expandable drawer without causing horizontal scrollbars.

#### Scenario: Desktop Viewport Rendering
- **WHEN** a user opens the map on a screen wider than 900px
- **THEN** the map and telemetry card render side-by-side in a two-column glassmorphism grid.

### Requirement: Multi-Scale Map Level Return Action
The multi-scale map viewer (`MultiLevelMapViewer`) SHALL render an explicit, prominent "Volver al nivel anterior" button when the active zoom level is Level 2 (Municipio) or Level 3 (Parcela), enabling immediate one-tap return to the parent state or national map.

#### Scenario: Returning from Parcel Level 3 to State Level 2
- **WHEN** user is inspecting Level 3 (Parcela / Municipio) and taps "Volver al Nivel Estatal"
- **THEN** the viewer camera animates back to Level 2 (Estado) and updates telemetry accordingly.

#### Scenario: Returning from State Level 2 to National Level 1
- **WHEN** user is inspecting Level 2 (Estado) and taps "Volver al Mapa Nacional"
- **THEN** the viewer camera resets to Level 1 (Venezuela global).
