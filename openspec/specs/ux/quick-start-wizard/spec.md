# Capability: Quick-Start Wizard

## Purpose
Provides an interactive 30-second onboarding wizard modal on the main dashboard for new agronomists to configure and register their first farm plot with a single click.

## Requirements

### Requirement: Welcome Quick-Start Wizard Modal
The system SHALL present an interactive setup wizard dialog on the dashboard when a user with zero parcels arrives for the first time.

#### Scenario: First-time user lands on dashboard
- **WHEN** a user with no registered parcels loads `/dashboard` and has not previously dismissed the wizard
- **THEN** the Quick-Start Wizard modal opens automatically, displaying a 3-step setup form (State/Municipality, Crop selection, Estimated Hectares)

#### Scenario: 1-Click Fast Farm Creation
- **WHEN** the user selects their state, municipality, crop, enters their area, and clicks "Crear Mi Finca en 1 Clic"
- **THEN** the system issues a `POST /api/parcels` request, creates the parcel, saves it, and offers direct navigation to the Map or the AI Advisor

#### Scenario: Dismissing or Skipping Wizard
- **WHEN** the user clicks "Explorar por mi cuenta" or closes the wizard
- **THEN** the modal closes and sets `agrotech-quickstart-dismissed` in `localStorage` so it does not auto-open again in subsequent visits
