# prize-publication-exporter Delta Specification

## MODIFIED Requirements

### Requirement: Submission Paper and Digital Twin Compilation
The system SHALL compile the draft scientific paper (`public/docs/ARTICULO_CIENTIFICO_DRAFT.md` and `docs/mapbiomas_premio_2026/`) together with live parcel agronomic metrics, NASA POWER climate charts, MapBiomas transition diagrams, explicit author attribution to **Frank Sousa**, open-source MIT code licensing, and MapBiomas CC BY 4.0 data terms into an up-to-date, publication-ready PDF document under 10,000 words.

#### Scenario: Generating Submission Package
- **WHEN** user or pipeline executes the publication exporter command (`md-to-pdf` or compiler script)
- **THEN** the system generates a formatted PDF document containing executive summary, author Frank Sousa metadata, TRL 7 validation, Dual-Mode UI coverage, Saxton-Rawls PAW model, Sentinel-1 SAR radar oracle, embedded charts, and formal MapBiomas attribution references.

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 227 automated tests (173 Jest + 54 Pytest, 100% passing), 30 Next.js 16 Turbopack production routes, TRL 7 maturity, highlighting the tripartite features (regional edaphic amendments, rural vernacular voice parser, and universal precision machinery packages) along with the interactive 5-step Demo Tour to facilitate immediate jury auditing without broken links.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects the 227 automated test suite metrics with direct access to the Demo Tour, author Frank Sousa credentials, and tripartite operational modules.

#### Scenario: Accessing Technical Memorandum Without Errors
- **WHEN** evaluators click on the technical memorandum link in `/dashboard/postulacion`
- **THEN** the system resolves the document cleanly in the browser or initiates download without HTTP 404 errors.

### Requirement: Downloadable Official MapBiomas Award 2026 Package
The platform SHALL provide direct access and downloadable packages containing the official MapBiomas Venezuela 2026 Prize Rules (Bases), FAQs (Preguntas Frecuentes), an updated Evaluation Criteria Compliance Matrix (Anexo II) with 227 tests and latest architectural milestones, and the complete Scientific Research Paper in both regenerated publication-grade PDF (`Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`) and Markdown formats.

#### Scenario: Downloading Prize Rules and FAQs
- **WHEN** evaluator accesses the document hub on `/dashboard/postulacion`
- **THEN** links and download actions are provided for the 2026 Prize Rules (10 pages) and FAQs (6 pages).

#### Scenario: Downloading Official PDF Documents
- **WHEN** an evaluator or judge clicks on the download action for the Prize Rules, FAQs, Compliance Matrix, or Scientific Paper
- **THEN** the system provides direct download of the official PDF document from `public/docs/`.

#### Scenario: Inspecting Evaluation Criteria Compliance Matrix
- **WHEN** jury reviews the compliance section on `/dashboard/postulacion` or opens `MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the system displays the breakdown demonstrating alignment with all 6 jury evaluation criteria: Complejidad Técnica (20%), Originalidad (20%), Claridad (15%), Resultados (20%), Aporte General (20%), and Aporte a MapBiomas Venezuela (5%), supported by 227 passing tests and TRL 7 operational proof.

#### Scenario: Downloading Scientific Paper on Present and Future Horizon
- **WHEN** evaluator requests the scientific article on the project
- **THEN** the system provides the complete scientific paper draft detailing TRL 7 validation, Sentinel-1 SAR cloud penetration, Shoelace WGS84 geodesics, Dual-Mode UI, and AI prescriptive agronomy with dual publication-grade PDF and Markdown access with Frank Sousa author attribution.
