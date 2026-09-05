# mapbiomas-ml-yield-integration Specification

## Purpose

Injects multi-decadal MapBiomas land cover transition vectors and soil degradation modifiers into the machine learning feature pipeline to adjust crop yield predictions.

## Requirements

### Requirement: Historical Transition Integration in ML Feature Engine
The system SHALL ingest MapBiomas historical transition categories and compute land-use legacy modifier weights within the `MLFeatureEngine` and `CropYieldPredictor`.

#### Scenario: Compaction and Nutrient Legacy Adjustment
- **WHEN** feature extraction evaluates a parcel transitioning from continuous pasture or intensive monoculture
- **THEN** the system SHALL apply corresponding soil compaction and soil health penalty factors to the projected crop yield ton/ha and highlight specific remedial agronomic actions.

#### Scenario: Regenerative Soil Potential
- **WHEN** a parcel exhibits agroforestry or rotational savanna transition history
- **THEN** the yield model SHALL incorporate positive organic resilience modifiers into the suitability curve.

### Requirement: Strategic Protected Horticulture and Vegetable ML Crop Model
The yield prediction engine and edaphic spatial utilities SHALL provide calibrated agronomic suitability and yield estimation models for `tomate_hortalizas` (Tomate Cherry & Horticultura Protegida), completing the 8 strategic agricultural chains.

#### Scenario: Yield prediction for Tomate Cherry and vegetables
- **WHEN** yield prediction is requested for crop `tomate_hortalizas` with soil and climate parameters
- **THEN** the engine calculates suitability and projects realistic commercial yield in Ton/ha (35.0 to 55.0 Ton/ha baseline) based on optimal thermal range (18-28°C) and water thresholds.

#### Scenario: Spatial suitability ranking includes vegetables
- **WHEN** the spatial suitability calculator evaluates crop ranking for a parcel
- **THEN** `Tomate Cherry & Hortalizas` is ranked among the viable crop recommendations with appropriate pH and moisture tolerances.
