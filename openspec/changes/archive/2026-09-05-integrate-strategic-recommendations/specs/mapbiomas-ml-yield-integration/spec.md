## ADDED Requirements

### Requirement: Strategic Protected Horticulture and Vegetable ML Crop Model
The yield prediction engine and edaphic spatial utilities SHALL provide calibrated agronomic suitability and yield estimation models for `tomate_hortalizas` (Tomate Cherry & Horticultura Protegida), completing the 8 strategic agricultural chains.

#### Scenario: Yield prediction for Tomate Cherry and vegetables
- **WHEN** yield prediction is requested for crop `tomate_hortalizas` with soil and climate parameters
- **THEN** the engine calculates suitability and projects realistic commercial yield in Ton/ha (35.0 to 55.0 Ton/ha baseline) based on optimal thermal range (18-28°C) and water thresholds.

#### Scenario: Spatial suitability ranking includes vegetables
- **WHEN** the spatial suitability calculator evaluates crop ranking for a parcel
- **THEN** `Tomate Cherry & Hortalizas` is ranked among the viable crop recommendations with appropriate pH and moisture tolerances.
