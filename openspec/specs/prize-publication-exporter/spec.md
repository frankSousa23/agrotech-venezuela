# prize-publication-exporter Specification

## Purpose

Compiles scientific manuscripts, parcel digital twins, charts, and official metadata into publication-ready PDF formats compliant with MapBiomas Venezuela Prize 2026 guidelines.

## Requirements

### Requirement: Submission Paper and Digital Twin Compilation
The system SHALL compile the draft scientific paper together with live parcel agronomic metrics, NASA POWER climate charts, and MapBiomas transition diagrams into a submission-ready PDF document under 10,000 words.

#### Scenario: Generating Submission Package
- **WHEN** user or pipeline executes the publication exporter command or triggers the export endpoint
- **THEN** the system generates a formatted document containing executive summary, methodology, results, embedded charts, and formal MapBiomas attribution references.

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 144 automated tests, TRL 7 maturity, and highlight the interactive 5-step Demo Tour to facilitate immediate jury auditing.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects "144 Tests Automatizados Pasando (93 Jest + 51 Pytest)" with direct access to the Demo Tour.
