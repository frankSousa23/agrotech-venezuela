## ADDED Requirements

### Requirement: WebGIS Real-Time Discrepancy Overlay
The WebGIS and Parcel Diagnostic Modal SHALL display real-time land cover discrepancy evaluation results between MapBiomas Collection 3 baseline and active Sentinel-2 / SAR observations, providing confidence scores and Ground-Truth validation badges.

#### Scenario: Displaying Concordant Ground Truth in Diagnostic Modal
- **WHEN** the user opens the Parcel Diagnostic Modal for an agricultural lot whose current NDVI and SAR roughness match MapBiomas Class 18
- **THEN** the system SHALL display a "MapBiomas Ground-Truth Validado" badge with high confidence score (>90%) indicating zero anomalies.

#### Scenario: Alerting Deforestation Discrepancy
- **WHEN** spectral indices for a historical forest baseline drop below critical thresholds (NDVI < 0.40 and SAR < -15 dB)
- **THEN** the modal SHALL render a high-visibility alert indicating detected clearing and offering to flag the discrepancy for MapBiomas validation.
