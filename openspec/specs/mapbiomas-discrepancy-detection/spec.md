# mapbiomas-discrepancy-detection Specification

## Purpose

Detects real-time land cover discrepancies between Sentinel-2 optical/SAR observations and MapBiomas historical baseline classification to alert on deforestation, degradation, or agricultural expansion.

## Requirements

### Requirement: Land Cover Discrepancy Evaluation
The system SHALL compare current Sentinel-2 spectral indices (NDVI, NDWI, EVI) and SAR backscatter against MapBiomas baseline classification for a target coordinate or parcel to detect divergence between historical baseline and current ground condition.

#### Scenario: Detecting Agricultural Expansion in Forested Baseline
- **WHEN** MapBiomas baseline classifies a coordinate as Forest (Class 3) but current Sentinel-2 NDVI indicates active seasonal cropping with low tree canopy density
- **THEN** the system SHALL return a discrepancy alert indicating potential recent deforestation or agricultural expansion with an estimated confidence score.

#### Scenario: Concordant Land Cover Validation
- **WHEN** current optical indices match the expected phenological behavior of the baseline MapBiomas land cover class
- **THEN** the system SHALL mark the ground truth status as verified concordant.
