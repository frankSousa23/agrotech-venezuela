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
