# Spec Delta: interactive-soil-simulator-ui

## ADDED Requirements

### Requirement: URL Parameter Preselection and Responsive Grid
The `/dashboard/suelos` page SHALL parse URL search parameters (`tab`, `texture`, `ph`, `om`, `al`) upon initial load to automatically pre-select the active workstation tab and initialize simulation slider values, and the soil card stats grid SHALL adapt to 2 columns on mobile screens narrower than 640px to ensure legible presentation.

#### Scenario: Navigating to simulator with query parameters
- **WHEN** user navigates to `/dashboard/suelos?tab=simulator&texture=arenoso&ph=4.8`
- **THEN** system automatically activates the simulator tab, sets texture to arenoso, configures pH to 4.8, and recalculates the Saxton-Rawls pF curve without requiring manual slider movements.

#### Scenario: Mobile viewport rendering of soil stats grid
- **WHEN** user views soil cards in `/dashboard/suelos` on a screen narrower than 640px
- **THEN** the statistics grid displays metrics in a 2-column layout preventing textual overlap and truncation.
