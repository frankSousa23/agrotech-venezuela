## MODIFIED Requirements

### Requirement: Agronomic PDF and Spatial Data Export
The system SHALL generate downloadable PDF reports and GeoJSON vector packages containing parcel telemetry, soil analysis, and satellite diagnostics.

#### Scenario: Exporting Parcel Technical Dossier
- **WHEN** user clicks "Descargar Dossier Técnico PDF" for a parcel
- **THEN** the system generates an executive PDF containing plot boundaries, agroclimatic metrics, soil pH, Sentinel-2 spectral indices, and agronomic prescriptions.

## ADDED Requirements

### Requirement: Institutional Submission Citations & Metadata
The exported dossier and project reports SHALL include formal academic citations to MapBiomas Venezuela (Provita, LSIGMA USB, Wataniba, RAISG), NASA POWER Agroclimatology, and IPCC Good Practice Guidance.

#### Scenario: Inspecting Dossier Attribution Block
- **WHEN** reviewing the attribution block of any generated technical report
- **THEN** it displays full institutional acknowledgements and open data licenses (CC BY 4.0).
