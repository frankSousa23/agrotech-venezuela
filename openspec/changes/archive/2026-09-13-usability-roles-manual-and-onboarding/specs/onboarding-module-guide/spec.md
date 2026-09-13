## ADDED Requirements

### Requirement: Interactive Onboarding Progress Checklist
The platform dashboard SHALL feature an interactive "Primeros Pasos en Agrotech" checklist widget displaying progress completion (percentage and step count) across key operational milestones, with direct action deep-links and persistent local state.

#### Scenario: Initial Checklist State
- **WHEN** a new user visits `/dashboard` for the first time
- **THEN** the checklist widget renders in an expanded or summary card showing 4 actionable steps with 0% progress and an encouraging progress bar.

#### Scenario: Completing an Onboarding Milestone
- **WHEN** the user explores the map, delimits a parcel, simulates IoT telemetry, or visits the user manual
- **THEN** the corresponding checklist item marks as completed, incrementing the overall progress percentage (25%, 50%, 75%, 100%) and persisting the state across reloads.

#### Scenario: Direct Action Deep Link from Checklist
- **WHEN** the user clicks on an uncompleted step in the checklist (e.g. "🛰️ Explorar Visor WebGIS" or "📖 Consultar Manual de Campo")
- **THEN** the browser immediately navigates to the target route with contextual focus.
