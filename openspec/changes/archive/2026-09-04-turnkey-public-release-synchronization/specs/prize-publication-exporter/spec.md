## MODIFIED Requirements

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 179 automated tests (128 Jest + 51 Pytest), TRL 7 maturity, and highlight the interactive 5-step Demo Tour to facilitate immediate jury auditing without broken links.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects "179 Tests Automatizados Pasando (128 Jest + 51 Pytest)" with direct access to the Demo Tour.

#### Scenario: Accessing Technical Memorandum Without Errors
- **WHEN** evaluators click on the technical memorandum link in `/dashboard/postulacion`
- **THEN** the system resolves the document cleanly in the browser or initiates download without HTTP 404 errors.

### Requirement: Downloadable Official MapBiomas Award 2026 Package
The platform SHALL provide direct access and downloadable packages containing the official MapBiomas Venezuela 2026 Prize Rules (Bases), FAQs (Preguntas Frecuentes), an Evaluation Criteria Compliance Matrix (Anexo II), and the Scientific Research Paper draft in both official PDF and Markdown formats.

#### Scenario: Downloading Prize Rules and FAQs
- **WHEN** evaluator accesses the document hub on `/dashboard/postulacion`
- **THEN** links and download actions are provided for the 2026 Prize Rules (10 pages) and FAQs (6 pages).

#### Scenario: Downloading Official PDF Documents
- **WHEN** an evaluator or judge clicks on the download action for the Prize Rules, FAQs, Compliance Matrix, or Scientific Paper
- **THEN** the system provides direct download of the official PDF document from `public/docs/`.

#### Scenario: Inspecting Evaluation Criteria Compliance Matrix
- **WHEN** jury reviews the compliance section on `/dashboard/postulacion`
- **THEN** the system displays the breakdown demonstrating alignment with all 6 jury evaluation criteria: Complejidad Técnica (20%), Originalidad (20%), Claridad (15%), Resultados (20%), Aporte General (20%), and Aporte a MapBiomas Venezuela (5%).

#### Scenario: Downloading Scientific Paper on Present and Future Horizon
- **WHEN** evaluator requests the scientific article on the project
- **THEN** the system provides the complete scientific paper draft detailing TRL 7 validation, Sentinel-1 SAR cloud penetration, Shoelace WGS84 geodesics, and AI prescriptive agronomy with dual PDF and Markdown access.
