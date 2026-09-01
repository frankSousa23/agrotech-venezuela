## Purpose
Provides an in-map contextual tutorial banner and a visual level breadcrumb to guide first-time users through the 3-level WebGIS navigation (País → Municipio → Lote) so they can activate parcel drawing without prior training.

## ADDED Requirements

### Requirement: Drawing Tutorial Banner
The system SHALL display a collapsible tutorial banner on the Mapa Satelital page when the user has zero saved parcels and the Multi-Scale mode is active.

#### Scenario: First-time user opens map in drawing mode
- **WHEN** a user with no saved parcels opens the map with `?mode=multilevel` or `?intent=draw`
- **THEN** a visible banner appears above the map controls with three numbered steps: "① Selecciona tu Estado", "② Elige tu Municipio", "③ Haz clic en Trazar y dibuja tus vértices"

#### Scenario: User dismisses tutorial
- **WHEN** the user clicks a close/dismiss button on the tutorial banner
- **THEN** the banner collapses and the preference is saved in localStorage so it does not reappear in the same session

### Requirement: Level Progress Breadcrumb
The system SHALL render a visible breadcrumb indicator above the Multi-Scale panel showing which of the three levels (País, Municipio, Lote) is currently active.

#### Scenario: Progressing through levels
- **WHEN** the user advances from Nivel 1 to Nivel 2 by selecting a state
- **THEN** Nivel 1 is marked complete (✓) and Nivel 2 becomes the active step in the breadcrumb

#### Scenario: Reaching Nivel 3
- **WHEN** the user selects a municipality and reaches Nivel 3
- **THEN** the breadcrumb shows all three levels complete and a pulsing green indicator highlights the "📐 Trazar con Clics" button

### Requirement: Intent-Aware Map Entry
The system SHALL detect a `?intent=draw` query parameter when loading the Mapa Satelital page.

#### Scenario: Arriving from dashboard Step 2
- **WHEN** the user navigates to `/dashboard/mapa?intent=draw`
- **THEN** the map initialises directly in Multi-Scale mode (bypassing the State Explorer default) so the user starts at Nivel 1 of the drawing workflow without an extra click
