## Purpose

Audits MapBiomas Colección 3 data integration, transition matrix risk score computations, and real-time ground-truth satellite discrepancy alerts.

## ADDED Requirements

### Requirement: MapBiomas Discrepancy & Transition Matrix Validation
The system SHALL evaluate Sentinel optical and radar anomalies against MapBiomas baseline classes, computing transition risk scores and triggering discrepancy alarms.

#### Scenario: Deforestation Discrepancy Alert Trigger
- **WHEN** a historical Forest pixel (Class 3) exhibits current optical NDVI < 0.40 and SAR backscatter < -15.0 dB
- **THEN** the discrepancy detector SHALL flag a critical DEFORESTATION alert with confidence >= 0.85.

#### Scenario: Pasture to Annual Crop Conversion
- **WHEN** a Pasture pixel (Class 15) exhibits current active crop spectral signatures (NDVI > 0.75)
- **THEN** the system SHALL record an intensification transition event.
