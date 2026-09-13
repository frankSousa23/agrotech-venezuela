## ADDED Requirements

### Requirement: Thermal Constant Display in Crop Catalog Cards
The Crop Catalog view (`/dashboard/cultivos`) SHALL render the base thermal constant and cumulative GDD threshold to physiological maturity for each displayed agricultural crop alongside edaphic requirements.

#### Scenario: Inspecting Crop Thermal Requirements
- **WHEN** user views any crop card in the catalog (`/dashboard/cultivos`)
- **THEN** the badge or metadata list includes the cumulative thermal requirement (e.g. `1,650 GDD`) linking to the phenological hydrothermal model.
