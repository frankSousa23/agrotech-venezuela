# Capability: Onboarding Module Guide

## Purpose

Guides new and existing users through the 7 primary platform routes with purpose definitions, 3-step action walkthroughs, and direct routing.

## Requirements

### Requirement: 7-Module Onboarding Guide Cards
The landing page SHALL render structured onboarding guide cards for all core routes: WebGIS Multi-Scale, Mis Tierras & IoT, Cuaderno de Campo, Simulador & IA, Bonos de Carbono, Geoestadísticas, and API Docs.

#### Scenario: Inspecting Module Instructions
- **WHEN** user views any module card in the onboarding catalog
- **THEN** the card displays a concise definition of purpose, a 3-step usage instruction, and a direct CTA link.

#### Scenario: Exploring Future Technological Horizons
- **WHEN** user scrolls to the future innovation section
- **THEN** the interface outlines milestones for Hyperspectral imaging, LoRaWAN networks, Computer Vision pest diagnosis, and Blockchain carbon certificates.

### Requirement: Intent-Driven Dashboard Step 2 Link
The dashboard "Delimita tu Parcela" Step 2 card SHALL link to the map with drawing intent pre-set.

#### Scenario: Clicking Step 2 from dashboard
- **WHEN** the user clicks "Probar Trazo" on the dashboard Step 2 guide card
- **THEN** the browser navigates to `/dashboard/mapa?mode=multilevel&intent=draw` so the map opens directly in Multi-Scale mode ready for parcel drawing

### Requirement: Quick-Start Entry from Dashboard Guide
The dashboard onboarding header SHALL include an explicit trigger button to re-open the Quick-Start Wizard at any time.

#### Scenario: User clicks "Asistente de Inicio Rápido"
- **WHEN** user clicks the "⚡ Asistente de Inicio" button in the dashboard onboarding section
- **THEN** the Quick-Start Wizard dialog opens, enabling fast creation or reconfiguration of a farm plot

### Requirement: Plain-Language Farmer Onboarding Walkthrough
The platform onboarding guide SHALL provide an optional simplified farmer walkthrough explaining each step in terms of concrete field actions (Sembrar, Regar, Abonar, Medir) rather than technical GIS terminology.

#### Scenario: First-time farmer onboarding
- **WHEN** a user enters the dashboard with zero parcels in Farmer Mode
- **THEN** the onboarding wizard opens automatically presenting visual illustration cards and colloquial field terms instead of requiring numeric decimal coordinates.

#### Scenario: Switching between technical and farmer onboarding
- **WHEN** the user toggles UI mode while viewing the onboarding guide
- **THEN** the guide step descriptions dynamically update to reflect either plain farming terminology or advanced scientific methodologies.
