# agronomic-typography-and-layout-fixes Specification

## Purpose

Standardizes chemical and agronomic symbols to clean Unicode formatting and ensures overlay controls do not collide with Leaflet map navigation controls.

## Requirements

### Requirement: Unicode Agronomic Symbols
The system SHALL display "CaCO₃" and "N-P-K" formatted cleanly without unrendered LaTeX braces.

#### Scenario: Viewing Encalado Prescriptions
- **WHEN** user views the Soil Simulator recommendations
- **THEN** chemical formulas render as "CaCO₃" with proper subscripts.

### Requirement: Leaflet Control Alignment
The system SHALL position custom floating overlays to avoid overlapping default zoom and pan buttons.

#### Scenario: Viewing Map on Dashboard
- **WHEN** user opens `/dashboard`
- **THEN** the layer control bar does not cover the `+` / `-` zoom control buttons.
