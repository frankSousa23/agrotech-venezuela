## Purpose

Displays contextual layer legends inside the map canvas and ensures Leaflet map dimensions synchronize smoothly during DOM re-renders or mode transitions.

## ADDED Requirements

### Requirement: Dynamic Floating Layer Legend
The system SHALL render a floating legend on the map displaying active scale ranges for Radar SAR, pH, Rainfall, and MapBiomas land cover.

#### Scenario: Switching to Radar SAR Layer
- **WHEN** user selects the "Radar SAR" layer
- **THEN** the floating legend displays the Sentinel-1 C-Band backscatter gradient (dB) from saturated blue to dry silver.

### Requirement: Automatic Leaflet Size Invalidation
The system SHALL invoke `map.invalidateSize()` upon container resize or tab mode switching.

#### Scenario: Switching Between State and Multi-Level Modes
- **WHEN** user switches between "Explorador Estatal" and "Multi-Escala" tabs
- **THEN** the map recalculates tile bounds and renders all tiles without gray voids.
