## Purpose

Injects multi-decadal MapBiomas land cover transition vectors and soil degradation modifiers into the machine learning feature pipeline to adjust crop yield predictions.

## ADDED Requirements

### Requirement: Historical Transition Integration in ML Feature Engine
The system SHALL ingest MapBiomas historical transition categories and compute land-use legacy modifier weights within the `MLFeatureEngine` and `CropYieldPredictor`.

#### Scenario: Compaction and Nutrient Legacy Adjustment
- **WHEN** feature extraction evaluates a parcel transitioning from continuous pasture or intensive monoculture
- **THEN** the system SHALL apply corresponding soil compaction and soil health penalty factors to the projected crop yield ton/ha and highlight specific remedial agronomic actions.

#### Scenario: Regenerative Soil Potential
- **WHEN** a parcel exhibits agroforestry or rotational savanna transition history
- **THEN** the yield model SHALL incorporate positive organic resilience modifiers into the suitability curve.
