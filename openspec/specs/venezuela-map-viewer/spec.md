# venezuela-map-viewer Specification

## Purpose

Provides a fast, stable, and reactive Venezuelan territorial map viewer with interactive state selection, geospatial telemetry, and edaphoclimatic information panels.

## Requirements

### Requirement: Global Venezuela Map Initialization
The WebGIS viewer SHALL initialize centered on Venezuela with geographic boundaries and load vector geometries for all 24 federal entities without server-side rendering hydration errors.

#### Scenario: Successful Initial Map Render
- **WHEN** user navigates to `/dashboard/mapa`
- **THEN** the system displays the interactive map of Venezuela showing 24 state boundaries with smooth controls and responsive dimensions.

### Requirement: Interactive State Selection and Telemetry
The system SHALL allow users to select any Venezuelan state by clicking directly on its map polygon or choosing it from the state dropdown selector.

#### Scenario: State Selection via Map Polygon Click
- **WHEN** user clicks on any Venezuelan state polygon (e.g. Portuguesa)
- **THEN** the map smoothly centers and zooms into the selected state (`flyTo`), highlights its border, and updates the telemetry panel with the state's capital, agricultural region, dominant soil texture, average pH, annual rainfall, and key crops.

#### Scenario: State Selection via Dropdown Selector
- **WHEN** user selects a state from the dropdown selector
- **THEN** the map view camera immediately animates to the chosen state and synchronizes the active information panel.

### Requirement: URL Parameter Synchronization and Deep-Linking
The viewer SHALL synchronize the active state selection with the URL search query parameter `?state=<state_id>`.

#### Scenario: Direct URL Navigation with State Parameter
- **WHEN** user opens `/dashboard/mapa?state=zulia`
- **THEN** the viewer directly initializes focused on Zulia and loads its edaphoclimatic profile in the information card.

### Requirement: Map Layer Switching
The viewer SHALL provide seamless switching between thematic layers including Satellite Imagery, MapBiomas Land Cover, Soil pH, and NASA Rainfall.

#### Scenario: Switching to Satellite Layer
- **WHEN** user clicks on the "Satélite HD" layer toggle
- **THEN** the map base layer updates to high-resolution satellite imagery while preserving state vector boundaries and interactive click handlers.
