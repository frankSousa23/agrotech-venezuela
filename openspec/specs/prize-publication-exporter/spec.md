# prize-publication-exporter Specification

## Purpose

Compiles scientific manuscripts, parcel digital twins, charts, official MapBiomas Prize 2026 rules, FAQs, evaluation matrices, and metadata into publication-ready PDF formats compliant with MapBiomas Venezuela Prize 2026 guidelines.

## Requirements

### Requirement: Submission Paper and Digital Twin Compilation
The system SHALL compile the draft scientific paper (`public/docs/ARTICULO_CIENTIFICO_DRAFT.md` and `docs/mapbiomas_premio_2026/`) together with live parcel agronomic metrics, NASA POWER climate charts, MapBiomas transition diagrams, explicit author attribution to **Frank Sousa**, open-source MIT code licensing, and MapBiomas CC BY 4.0 data terms into an up-to-date, publication-ready PDF document under 10,000 words.

#### Scenario: Generating Submission Package
- **WHEN** user or pipeline executes the publication exporter command (`md-to-pdf` or compiler script)
- **THEN** the system generates a formatted PDF document containing executive summary, author Frank Sousa metadata, TRL 6 validation, Dual-Mode UI coverage, Saxton-Rawls PAW model, Sentinel-1 SAR radar oracle, embedded charts, and formal MapBiomas attribution references.

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 233 automated tests (179 Jest + 54 Pytest, 100% passing), 30 Next.js 16 Turbopack production routes, TRL 6 maturity, highlighting the tripartite features (regional edaphic amendments, rural vernacular voice parser, and universal precision machinery packages) along with the interactive 5-step Demo Tour to facilitate immediate jury auditing without broken links.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects the 233 automated test suite metrics with direct access to the Demo Tour, author Frank Sousa credentials, and tripartite operational modules.

#### Scenario: Accessing Technical Memorandum Without Errors
- **WHEN** evaluators click on the technical memorandum link in `/dashboard/postulacion`
- **THEN** the system resolves the document cleanly in the browser or initiates download without HTTP 404 errors.

### Requirement: Downloadable Official MapBiomas Award 2026 Package
The platform SHALL provide direct access and downloadable packages containing the official MapBiomas Venezuela 2026 Prize Rules (Bases), FAQs (Preguntas Frecuentes), an updated Evaluation Criteria Compliance Matrix (Anexo II) with 233 tests and latest architectural milestones, and the complete Scientific Research Paper in both regenerated publication-grade PDF (`Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`) and Markdown formats.

#### Scenario: Downloading Prize Rules and FAQs
- **WHEN** evaluator accesses the document hub on `/dashboard/postulacion`
- **THEN** links and download actions are provided for the 2026 Prize Rules (10 pages) and FAQs (6 pages).

#### Scenario: Downloading Official PDF Documents
- **WHEN** an evaluator or judge clicks on the download action for the Prize Rules, FAQs, Compliance Matrix, or Scientific Paper
- **THEN** the system provides direct download of the official PDF document from `public/docs/`.

#### Scenario: Inspecting Evaluation Criteria Compliance Matrix
- **WHEN** jury reviews the compliance section on `/dashboard/postulacion` or opens `MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the system displays the breakdown demonstrating alignment with all 6 jury evaluation criteria: Complejidad Técnica (20%), Originalidad (20%), Claridad (15%), Resultados (20%), Aporte General (20%), and Aporte a MapBiomas Venezuela (5%), supported by 233 passing tests and TRL 6 operational proof.

#### Scenario: Downloading Scientific Paper on Present and Future Horizon
- **WHEN** evaluator requests the scientific article on the project
- **THEN** the system provides the complete scientific paper draft detailing TRL 6 validation, Sentinel-1 SAR cloud penetration, Shoelace WGS84 geodesics, Dual-Mode UI, and AI prescriptive agronomy with dual publication-grade PDF and Markdown access with Frank Sousa author attribution.

### Requirement: Realistic TRL 6 Maturity and Pragmatic AI Positioning
The publication exporter and documentation suite SHALL present the platform's technical readiness as TRL 6 (functional system prototype integrated and demonstrated in a relevant environment with real multi-temporal spatial data), clearly articulating that Gemini AI is utilized pragmatically on-demand for complex synthesis (under Google AI Studio's free tier) rather than continuous high-cost server invocation.

#### Scenario: Reviewing Technical Maturity in Dossier
- **WHEN** an evaluator, researcher, or judge reviews the pitch deck or executive memorandum
- **THEN** the platform maturity is defined as TRL 6 (fully functional integrated prototype ready for pilot field validation), providing transparent, credible development benchmarks.

#### Scenario: Inspecting On-Demand AI Architecture
- **WHEN** an evaluator reviews the system's economic feasibility and AI invocation strategy
- **THEN** documentation clarifies that routine edaphic calculations run on local deterministic engines with zero API fees, reserving generative AI for targeted, high-value agronomic synthesis.

### Requirement: Grounded Agricultural Value Prioritization
The official dossier and pitch deck SHALL anchor the primary value proposition on concrete agricultural economics—fertilizer optimization (-35%), soil acidity correction (Kamprath), drainage risk management via Sentinel-1 SAR, and offline vernacular accessibility—framing carbon credits as an exploratory, future-facing research module rather than an immediate commercial dependency.

#### Scenario: Reviewing Primary Platform Objectives
- **WHEN** reading the project overview and executive summary
- **THEN** the primary focus highlights farmer productivity, cost reduction in inputs, and climate resilience, keeping international carbon finance as an auxiliary research capability.

