# Spec Delta: role-based-documentation-and-navigation

## ADDED Requirements

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
