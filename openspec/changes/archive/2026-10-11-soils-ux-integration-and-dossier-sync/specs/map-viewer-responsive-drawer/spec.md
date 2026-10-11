# Spec Delta: map-viewer-responsive-drawer

## ADDED Requirements

### Requirement: Soil Study Quick-Actions in Map Popups and Panels
The WebGIS map viewer and parcel diagnostic modal SHALL provide interactive action links allowing users to transition directly to the Saxton-Rawls pF retention curve simulator in `/dashboard/suelos`, carrying the active soil sample attributes, municipal dominant texture, or parcel diagnostic parameters.

#### Scenario: Clicking soil marker popup action link
- **WHEN** user clicks a soil point marker on the WebGIS map and clicks the simulator action link in the popup
- **THEN** system navigates to `/dashboard/suelos?tab=simulator` pre-filled with the sample's texture, pH, and organic matter values.

#### Scenario: Quick action from municipal panel or parcel diagnostic modal
- **WHEN** user selects a municipality in the WebGIS viewer or opens the parcel diagnostic modal
- **THEN** the UI provides an explicit action button to simulate soil physics and retention for the selected zone in `/dashboard/suelos`.
