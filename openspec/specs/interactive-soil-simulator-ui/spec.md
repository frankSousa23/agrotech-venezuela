# interactive-soil-simulator-ui Specification

## Purpose
Provides an advanced tri-modal workstation in `/dashboard/suelos` allowing farmers, agronomists, and researchers to explore Venezuelan soil profiles, simulate Saxton-Rawls water retention curves (pF) interactively, and export GIS data packages for MapBiomas.

## Requirements

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

### Requirement: URL Parameter Preselection and Responsive Grid
The `/dashboard/suelos` page SHALL parse URL search parameters (`tab`, `texture`, `ph`, `om`, `al`) upon initial load to automatically pre-select the active workstation tab and initialize simulation slider values, and the soil card stats grid SHALL adapt to 2 columns on mobile screens narrower than 640px to ensure legible presentation.

#### Scenario: Navigating to simulator with query parameters
- **WHEN** user navigates to `/dashboard/suelos?tab=simulator&texture=arenoso&ph=4.8`
- **THEN** system automatically activates the simulator tab, sets texture to arenoso, configures pH to 4.8, and recalculates the Saxton-Rawls pF curve without requiring manual slider movements.

#### Scenario: Mobile viewport rendering of soil stats grid
- **WHEN** user views soil cards in `/dashboard/suelos` on a screen narrower than 640px
- **THEN** the statistics grid displays metrics in a 2-column layout preventing textual overlap and truncation.
