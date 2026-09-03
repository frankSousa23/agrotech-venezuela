## ADDED Requirements

### Requirement: Plain-Language Farmer Onboarding Walkthrough
The platform onboarding guide SHALL provide an optional simplified farmer walkthrough explaining each step in terms of concrete field actions (Sembrar, Regar, Abonar, Medir) rather than technical GIS terminology.

#### Scenario: First-time farmer onboarding
- **WHEN** a user enters the dashboard with zero parcels in Farmer Mode
- **THEN** the onboarding wizard opens automatically presenting visual illustration cards and colloquial field terms instead of requiring numeric decimal coordinates.

#### Scenario: Switching between technical and farmer onboarding
- **WHEN** the user toggles UI mode while viewing the onboarding guide
- **THEN** the guide step descriptions dynamically update to reflect either plain farming terminology or advanced scientific methodologies.
