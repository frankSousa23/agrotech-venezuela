# Capability: Crop Catalog Simulation Link

## Purpose
Enables direct 1-click navigation from individual crop cards in the Crop Catalog directly into the AI Advisor with the selected crop and optimal soil parameters pre-populated.

## Requirements

### Requirement: Direct Crop Simulation Action Button
The system SHALL display a "🌾 Simular en Mi Finca" action button on every crop item in `/dashboard/cultivos`.

#### Scenario: User clicks simulation button on a crop card
- **WHEN** user clicks "🌾 Simular en Mi Finca" on any crop card (e.g. "Maíz Blanco Harinero")
- **THEN** the browser navigates to `/dashboard/recomendaciones?crop=Maíz%20Blanco%20Harinero` with the simulator pre-configured for that botanical variety

#### Scenario: Crop modal simulation action
- **WHEN** user opens the detailed crop information modal and clicks the simulation CTA
- **THEN** the modal closes and redirects to `/dashboard/recomendaciones` with the crop name and optimal pH range pre-selected
