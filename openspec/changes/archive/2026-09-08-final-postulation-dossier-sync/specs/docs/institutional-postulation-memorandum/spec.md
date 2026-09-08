## MODIFIED Requirements

### Requirement: Formal Institutional Postulation Memorandum
The system SHALL maintain a comprehensive technical whitepaper (`docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md`) documenting the project's executive summary, author Frank Sousa credentials, MIT open-source code licensing, CC BY 4.0 MapBiomas data terms, 233 automated tests (179 Jest + 54 Pytest), 30 Next.js 16 Turbopack production routes, problem-solution matrix, TRL 6 validation, mathematical models, and ESG impacts.

#### Scenario: Inspecting the Institutional Memorandum
- **WHEN** an evaluator or technical reviewer accesses `docs/MEMORANDO_POSTULACION.md` or `public/docs/MEMORANDO_POSTULACION.md`
- **THEN** the document provides structured sections for Executive Summary, Author and License Metadata, Technological Readiness Level (TRL 6 with 233 tests), Multi-Scale Geo-Engine, Precision Formulas (Shoelace WGS84, Sentinel-1 SAR Radar dB, Saxton-Rawls PAW, GDD Hydro-Thermal, IPCC Tier 2 SOC), and academic citations.

#### Scenario: Verifying Mathematical and Scientific Formulations
- **WHEN** reviewing scientific equations in the memorandum
- **THEN** all mathematical notation accurately reflects geodetic area calculations, cloud-penetrating SAR dual polarization ($VV/VH$), dynamic available water ($\text{PAW}$), thermal unit accumulation ($GDD_{10}^{30}$), and soil organic carbon stock ($SOC_{0-30cm}$).
