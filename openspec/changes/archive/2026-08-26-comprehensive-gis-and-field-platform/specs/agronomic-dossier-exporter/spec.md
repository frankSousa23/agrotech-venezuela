## Purpose

Enables automated generation, preview, and download of formal agronomic technical dossiers in PDF and GeoJSON formats for financial credit, insurance, and certification.

## ADDED Requirements

### Requirement: Agronomic PDF and Spatial Data Export
The system SHALL generate downloadable PDF reports and GeoJSON vector packages containing parcel telemetry, soil analysis, and satellite diagnostics.

#### Scenario: Exporting Parcel Technical Dossier
- **WHEN** user clicks "Descargar Dossier Técnico PDF" for a parcel
- **THEN** the system generates an executive PDF containing plot boundaries, agroclimatic metrics, soil pH, Sentinel-2 spectral indices, and agronomic prescriptions.
