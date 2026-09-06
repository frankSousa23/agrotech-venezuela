## ADDED Requirements

### Requirement: Dynamic Pedotransfer Calibration and Plant-Available Water Calculation
The system SHALL calculate soil hydraulic properties ($\theta_{FC}$ and $\theta_{PWP}$) and critical moisture thresholds based on regional Venezuelan soil texture categories ("Arenoso", "Franco / Tierra Mansa", "Arcilloso / Tierra Brava") and compute Plant-Available Water ($\text{PAW}$) percentage to govern predictive irrigation actuation and suppression.

#### Scenario: Texture-Specific Critical Moisture Evaluation
- **WHEN** IoT soil moisture telemetry is ingested for a monitored parcel
- **THEN** the system calculates critical moisture deficit using the parcel's calibrated pedotransfer threshold (9% for Arenoso, 20% for Franco, 35% for Arcilloso) rather than a uniform static threshold.

#### Scenario: Irrigation Trigger Based on Plant-Available Water Depletion
- **WHEN** in-situ soil moisture drops below 50% of Plant-Available Water ($\text{PAW} < 50\%$) and forecasted precipitation within 6 hours is below 5.0 mm
- **THEN** the engine triggers automated irrigation valve actuation or issues a prioritized irrigation advisory to the producer.
