# Capability: Predictive Irrigation Engine

## Purpose

Computes predictive water balance and automated actuation decisions combining in-situ soil moisture sensors with NASA POWER satellite precipitation forecasts.

## Requirements

### Requirement: Predictive Irrigation Decision Model
The system SHALL evaluate soil moisture deficit against crop threshold limits, checking imminent rainfall forecasts before triggering valve/pump actuation.

#### Scenario: Rain-Forecasted Irrigation Suppression
- **WHEN** in-situ soil moisture drops below critical threshold (e.g. 28% VWC) but NASA POWER predicts >= 5.0 mm of rainfall within 6 hours
- **THEN** the engine suppresses automated pump activation to conserve water and electrical/fuel energy.

#### Scenario: Automated Actuation Under Prolonged Deficit
- **WHEN** soil moisture drops below threshold and no rain is forecasted
- **THEN** the engine activates the parcel's solenoid valve for a calculated pulse duration and logs an automated irrigation event to the Cuaderno de Campo.
