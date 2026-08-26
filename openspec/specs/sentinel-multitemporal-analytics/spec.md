# sentinel-multitemporal-analytics Specification

## Purpose

Delivers multi-spectral crop vigor diagnostics (NDVI, NDWI, EVI), cloud masking, and 40-year MapBiomas land use trajectory analysis for any coordinate in Venezuela.

## Requirements

### Requirement: Multi-Spectral Crop Diagnostic Calculation
The system SHALL calculate NDVI, NDWI, and soil organic carbon estimates for selected parcels using Sentinel-2 L2A optical bands and cloud masking.

#### Scenario: Requesting Spectral Crop Diagnostic
- **WHEN** user clicks "Auditoría Satelital" on any registered parcel
- **THEN** the system returns spectral indices, vigor classification, water stress levels, and historical land use trajectory from 1985 to 2024.
