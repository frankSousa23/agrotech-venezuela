# role-based-documentation-and-navigation Specification

## Purpose

Provides a structured, role-based navigation model and curated information architecture that eliminates audience friction by segmenting user journeys and encapsulating technical complexity into collapsible sections.

## Requirements

### Requirement: Multi-Profile Role-Based Navigation Anchors
The primary project documentation (`README.md`) SHALL feature visual role-based entry anchors immediately following the core vision header, routing visitors directly to tailored documentation sections according to their persona.

#### Scenario: Navigating as a Developer
- **WHEN** a software engineer or DevOps specialist clicks the "Para Desarrolladores" navigation anchor
- **THEN** the documentation jumps directly to the development environment prerequisites, zero-config quickstart commands, and automated test execution steps.

#### Scenario: Navigating as an Innovation Juror or Investor
- **WHEN** an evaluator, jury member, or commercial partner clicks the "Para Jurados e Inversores" navigation anchor
- **THEN** the documentation jumps directly to the TRL 4 operational maturity validation, economic ROI metrics (3.8x return), carbon pooling cooperative model, and SDG impact matrix.

#### Scenario: Navigating as an Agronomist or Farmer
- **WHEN** an agricultural producer or field technician clicks the "Para Agrónomos y Productores" navigation anchor
- **THEN** the documentation jumps directly to field operations, Dual-Mode UI 4-door access, offline PWA resilience, and voice dictation with vernacular conversion.

### Requirement: Conceptual 3-Tier Data Pipeline Presentation
The project overview SHALL present a clean, high-level conceptual dataflow diagram (`Satélites ➔ Cerebro IA ➔ Decisiones en Finca`) before introducing detailed microservice topology or port assignments.

#### Scenario: Reading the High-Level System Architecture Flow
- **WHEN** a visitor inspects the system architecture in the introductory section
- **THEN** the interface renders an intuitive 3-stage data flow illustrating the transformation of raw remote sensing (Sentinel-1 SAR, Sentinel-2, NASA POWER) into AI-driven agronomic prescriptions and field actions without displaying low-level network ports or ORM schemas.

### Requirement: Curated Technical Depth via Collapsible Sections
Low-level infrastructure details, network port tables, environment variables, and Docker container mappings SHALL be encapsulated in collapsible `<details>` elements to prevent visual fatigue while preserving 100% technical rigor.

#### Scenario: Expanding Technical Configuration Accordions
- **WHEN** a technical reader clicks on any configuration or deployment accordion
- **THEN** the section expands revealing full microservice topologies, port tables, environment setups, and test runner details without cluttering the executive narrative.

### Requirement: Soil Module Field Operations Guide
The repository SHALL provide a dedicated, comprehensive operational guide (`docs/GUIA_MODULO_SUELOS.md`) that documents the end-to-end workflow from WebGIS geospatial selection to interactive pF simulation and multi-format exports.

#### Scenario: Navigating from WebGIS to Soil Simulation
- **WHEN** a user selects a soil sample pin, municipal card, or drawn parcel in the WebGIS map (`/dashboard/mapa`)
- **THEN** the guide describes how the interactive link (`🔬 Simular en Módulo de Suelos`) transfers soil texture, pH, organic matter, and aluminum values dynamically to `/dashboard/suelos?tab=simulator`.

#### Scenario: Running Interactive Saxton-Rawls and Kamprath Simulations
- **WHEN** a user adjusts simulation sliders in the Soil Workstation
- **THEN** the guide explains the interpretation of the pF water retention curve (Field Capacity $\theta_{FC}$, Permanent Wilting Point $\theta_{PWP}$, and Plant Available Water PAW %) alongside Kamprath, dolomitic lime, or agricultural gypsum amendment dosages.

#### Scenario: Exporting Field and Cloud Assets
- **WHEN** an agronomist, GIS specialist, or machinery operator accesses the Export Hub
- **THEN** the guide details how to generate and use Google Earth Engine JavaScript scripts, GeoJSON feature collections, ESRI Shapefiles for GPS tractors, KML flight missions for drones, and 1-page analog cabin sheets.
