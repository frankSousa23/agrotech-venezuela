# Spec Delta

## Purpose

Provides an advanced tri-modal workstation in `/dashboard/suelos` allowing farmers, agronomists, and researchers to explore Venezuelan soil profiles, simulate Saxton-Rawls water retention curves (pF) interactively, and export GIS data packages for MapBiomas.

## ADDED Requirements

### Requirement: Tri-Modal Soil Workstation Navigation
The `/dashboard/suelos` page SHALL provide tabbed navigation supporting three distinct operating modes: territorial catalog, interactive retention curve simulation, and MapBiomas export hub.

#### Scenario: Switching between workstation views
- **WHEN** user clicks on the simulation or export hub tab
- **THEN** system switches views without page reloads, maintaining active parameter state across tabs.

### Requirement: Interactive Water Retention Curve Simulation
The system SHALL provide an interactive SVG or Canvas visualization of the Saxton-Rawls pF soil water retention curve that dynamically updates with user-controlled physical and chemical sliders.

#### Scenario: Adjusting texture and pH sliders
- **WHEN** user adjusts sand, clay, or pH sliders
- **THEN** the retention curve recalculates saturation, field capacity, PAW 50%, and permanent wilting point thresholds in real time, updating visual status indicators.

### Requirement: MapBiomas Federation and Code Hub
The system SHALL provide an export and integration panel in `/dashboard/suelos` displaying download actions for GeoJSON and Earth Engine scripts alongside copyable API integration code snippets.

#### Scenario: Copying API snippet
- **WHEN** user selects a programming language tab (cURL, Python, JavaScript)
- **THEN** system displays the corresponding syntax-highlighted code snippet configured with current host parameters and offers a one-click copy button.
