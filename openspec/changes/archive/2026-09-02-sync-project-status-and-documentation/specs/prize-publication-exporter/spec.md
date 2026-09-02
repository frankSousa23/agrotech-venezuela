## ADDED Requirements

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 140 automated tests, TRL 7 maturity, and highlight the interactive 4-step Demo Tour to facilitate immediate jury auditing.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects "140 Tests Automatizados Pasando (89 Jest + 51 Pytest)" with direct access to the Demo Tour.
