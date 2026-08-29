## Why

To guarantee that the digital field notebook (Cuaderno de Campo), multi-level WebGIS cartography, SAR Radar, and MapBiomas land-cover discrepancy detection engines operate with institutional-grade reliability, Agrotech Venezuela requires an automated QA and auditing suite specifically tailored to each functional module.

## What Changes

- **Field Diary Verification Suite**: Adds automated tests auditing field logs filtering by agronomic operation, yield recording in Ton/ha, and dosage validation.
- **WebGIS & SAR Radar Multi-Level Cartography Audit**: Adds automated validation for geospatial rendering, level transitions (National -> Municipal -> Micro-Parcel), SAR C-band layer backscatter calculations, and Shoelace geometric area precision.
- **MapBiomas Ground Truth & Transition Matrix Audit**: Adds automated test coverage verifying MapBiomas Colección 3 attribution compliance, transition matrix risk score calculations, and real-time deforestation/expansion alert firing.

## Capabilities

### New Capabilities
- `field-diary-qa-suite`: Automated testing and auditing for digital field logs, dosages, and harvest yield records.
- `webgis-multilevel-audit`: Automated testing and auditing for multi-level WebGIS cartography, SAR radar backscatter, and parcel Shoelace geometries.
- `mapbiomas-groundtruth-audit`: Automated auditing for MapBiomas Colección 3 ground-truth discrepancy detection and transition risk models.

### Modified Capabilities
- None.

## Impact

- **Frontend Tests**: Adds dedicated test specifications in `__tests__/audit/`.
- **Backend Tests**: Adds discrepancy and agronomic rule audit suites in `backend/tests/`.
- **Documentation**: Updates audit logs and benchmark figures.
