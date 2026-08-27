# watermark-free-map-tiles Specification

## Purpose

Ensures all Leaflet map viewers utilize unmetered, high-resolution tile providers that render without diagonal "API KEY REQUIRED" watermarks or usage restrictions.

## Requirements

### Requirement: Watermark-Free Base Tiles
The system SHALL use OpenStreetMap or Esri World Topo tiles for thematic layers, and Esri World Imagery for satellite layers across all WebGIS views.

#### Scenario: Rendering Thematic Layer
- **WHEN** user views `/dashboard/mapa` or `/dashboard` on thematic/pH/Rainfall/SAR layers
- **THEN** the map canvas renders clean cartographic tiles without any watermark text.
