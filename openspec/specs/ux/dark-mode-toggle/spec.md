# Dark Mode Toggle Specification

## Purpose
Introduces a global dark mode toggle that allows field users to fully invert the UI theme for low-light environments, complementing the existing Sunlight mode.

## Requirements

### Requirement: Global Dark Mode Toggle
The system SHALL provide a persistent toggle control to switch the application theme between default (Dark/Sunlight) and the user's preferred visual mode.

#### Scenario: User toggles theme
- **WHEN** the user interacts with the theme toggle button in the navigation bar
- **THEN** the system applies the dark mode color variables globally across all views

#### Scenario: State Persistence
- **WHEN** the user navigates between different dashboard sections
- **THEN** the selected theme state (dark/light/sunlight) is preserved and instantly applied without flashing
