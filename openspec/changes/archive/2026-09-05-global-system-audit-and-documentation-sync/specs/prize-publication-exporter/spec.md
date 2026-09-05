## MODIFIED Requirements

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 182 automated tests (130 Jest + 52 Pytest), TRL 7 maturity, and highlight the interactive 5-step Demo Tour to facilitate immediate jury auditing without broken links.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects "182 Tests Automatizados Pasando (130 Jest + 52 Pytest)" with direct access to the Demo Tour.

#### Scenario: Accessing Technical Memorandum Without Errors
- **WHEN** evaluators click on the technical memorandum link in `/dashboard/postulacion`
- **THEN** the system resolves the document cleanly in the browser or initiates download without HTTP 404 errors.
