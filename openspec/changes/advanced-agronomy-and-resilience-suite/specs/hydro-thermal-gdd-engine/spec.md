## Purpose

Calculates cumulative thermal accumulation (Growing Degree Days - GDD) and soil water balance to predict crop phenological milestones and optimal harvest timing.

## ADDED Requirements

### Requirement: Growing Degree Days and Water Balance Calculation
The system SHALL compute thermal unit accumulation ($GDD_{10}^{30}$) and soil water deficit/surplus using daily NASA POWER temperature and precipitation metrics.

#### Scenario: Evaluating Crop Phenology with GDD
- **WHEN** user selects a crop and sowing date in the simulator
- **THEN** the system calculates accumulated GDD, predicts days to flowering and physiological maturity, and graphs the monthly water balance deficit vs surplus.
