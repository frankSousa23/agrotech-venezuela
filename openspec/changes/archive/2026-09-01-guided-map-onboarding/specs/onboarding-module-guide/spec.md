## MODIFIED Requirements

### Requirement: 7-Module Onboarding Guide Cards
The landing page SHALL render structured onboarding guide cards for all core routes: WebGIS Multi-Scale, Mis Tierras & IoT, Cuaderno de Campo, Simulador & IA, Bonos de Carbono, Geoestadísticas, and API Docs.

#### Scenario: Inspecting Module Instructions
- **WHEN** user views any module card in the onboarding catalog
- **THEN** the card displays a concise definition of purpose, a 3-step usage instruction, and a direct CTA link.

#### Scenario: Exploring Future Technological Horizons
- **WHEN** user scrolls to the future innovation section
- **THEN** the interface outlines milestones for Hyperspectral imaging, LoRaWAN networks, Computer Vision pest diagnosis, and Blockchain carbon certificates.

## ADDED Requirements

### Requirement: Intent-Driven Dashboard Step 2 Link
The dashboard "Delimita tu Parcela" Step 2 card SHALL link to the map with drawing intent pre-set.

#### Scenario: Clicking Step 2 from dashboard
- **WHEN** the user clicks "Probar Trazo" on the dashboard Step 2 guide card
- **THEN** the browser navigates to `/dashboard/mapa?mode=multilevel&intent=draw` so the map opens directly in Multi-Scale mode ready for parcel drawing
