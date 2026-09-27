# prize-publication-exporter Specification

## Purpose

Compiles scientific manuscripts, parcel digital twins, charts, official MapBiomas Prize 2026 rules, FAQs, evaluation matrices, and metadata into publication-ready PDF formats compliant with MapBiomas Venezuela Prize 2026 guidelines.

## Requirements

### Requirement: Submission Paper and Digital Twin Compilation
The system SHALL compile the draft technical paper (`public/docs/ARTICULO_TECNICO_DRAFT.md` and `docs/mapbiomas_premio_2026/`) together with live parcel agronomic metrics, NASA POWER climate charts, MapBiomas transition diagrams, explicit author attribution to **Frank Sousa**, open-source MIT code licensing, and MapBiomas CC BY 4.0 data terms into an up-to-date, publication-ready PDF document under 10,000 words.

#### Scenario: Generating Submission Package
- **WHEN** user or pipeline executes the publication exporter command (`md-to-pdf` or compiler script)
- **THEN** the system generates a formatted PDF document containing executive summary, author Frank Sousa metadata, TRL 4 validation, Dual-Mode UI coverage, Saxton-Rawls PAW model, Sentinel-1 SAR radar oracle, embedded charts, and formal MapBiomas attribution references.

### Requirement: Up-to-Date Institutional Submission Dossier
The institutional submission dossiers (`/dashboard/postulacion`, `MEMORANDO_POSTULACION.md`, and `POSTULACION_EXPEDIENTE_PREMIO_2026.md`) SHALL present the synchronized count of 292 automated tests (237 Jest + 55 Pytest, 100% passing), 35 Next.js 16 Turbopack production routes, TRL 4 maturity, the tripartite operational features (regional edaphic amendments, rural vernacular voice parser, and universal precision machinery packages), the interactive 5-step Demo Tour, AND the comprehensive **Audited Development Lifecycle Timeline (5 Eras)** detailing the full engineering journey forged by Frank Sousa as a solo developer during his work vacations.

The 5 evolutionary eras codified SHALL comprise:
1. **La Semilla Académica & Certificación MapBiomas**: UNERG edaphology mentorship, crop vs. pasture matrix, and official MapBiomas 40-year training certificate.
2. **El Choque Tropical & Soberanía Satelital**: Overcoming the 75% rainy season cloud opacity with Sentinel-1 SAR C-band radar and native Leaflet `useRef` WebGIS.
3. **Inclusión Rural Radical & Voz Campesina**: Dual-Mode UI, 4 giant 80px tactile gates, native Web Speech voice dictation, vernacular parser (sacos, tambores, canecas, tablones), and offline SQLite WAL (<25 ms).
4. **Blindaje Científico, Maquinaria & Procedencia Legal**: Regional soil calibrations (Kamprath, dolomite, gypsum), Saxton-Rawls PAW curves, tri-modal machinery exports (GPS tractors, drones, analog sheets), and five-stage open legal frameworks (Copernicus, NASA, MapBiomas CC BY 4.0).
5. **La Síntesis de Calidad TRL 4 & Forja en Antigravity**: Iterative pair-programming with Gemini, sovereign critical sieve, 292 passing automated tests, 0 TypeScript errors, and 35 production routes.

#### Scenario: Reviewing Submission Header in Dashboard
- **WHEN** evaluators open `/dashboard/postulacion`
- **THEN** the header badge reflects the 292 automated test suite metrics (237 Jest + 55 Pytest) with direct access to the Demo Tour, author Frank Sousa credentials, and tripartite operational modules.

#### Scenario: Inspecting Audited Development Lifecycle Timeline
- **WHEN** an evaluator, researcher, or judge visits `/dashboard/postulacion`
- **THEN** the system presents the interactive 5-era audited development timeline detailing the transition from university edaphology and MapBiomas training to TRL 4 production maturity with zero regressions.

#### Scenario: Accessing Technical Memorandum Without Errors
- **WHEN** evaluators click on the technical memorandum link in `/dashboard/postulacion`
- **THEN** the system resolves the document cleanly in the browser or initiates download without HTTP 404 errors, containing the audited 5-era engineering lifecycle summary.

### Requirement: Downloadable Official MapBiomas Award 2026 Package
The platform SHALL provide direct access and downloadable packages containing the official MapBiomas Venezuela 2026 Prize Rules (Bases), FAQs (Preguntas Frecuentes), an updated Evaluation Criteria Compliance Matrix (Anexo II) with 292 tests and latest architectural milestones, and the complete Technical/Scientific Paper in both regenerated publication-grade PDF (`Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf`) and Markdown formats.

#### Scenario: Downloading Prize Rules and FAQs
- **WHEN** evaluator accesses the document hub on `/dashboard/postulacion`
- **THEN** links and download actions are provided for the 2026 Prize Rules (10 pages) and FAQs (6 pages).

#### Scenario: Downloading Official PDF Documents
- **WHEN** an evaluator or judge clicks on the download action for the Prize Rules, FAQs, Compliance Matrix, or Scientific Paper
- **THEN** the system provides direct download of the official PDF document from `public/docs/`.

#### Scenario: Inspecting Evaluation Criteria Compliance Matrix
- **WHEN** jury reviews the compliance section on `/dashboard/postulacion` or opens `MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the system displays the breakdown demonstrating alignment with all 6 jury evaluation criteria: Complejidad Técnica (20%), Originalidad (20%), Claridad (15%), Resultados (20%), Aporte General (20%), and Aporte a MapBiomas Venezuela (5%), supported by 292 passing tests and TRL 4 operational proof.

#### Scenario: Downloading Scientific Paper on Present and Future Horizon
- **WHEN** evaluator requests the scientific article on the project
- **THEN** the system provides the complete scientific paper draft detailing TRL 4 validation, Sentinel-1 SAR cloud penetration, Shoelace WGS84 geodesics, Dual-Mode UI, and AI prescriptive agronomy with dual publication-grade PDF and Markdown access with Frank Sousa author attribution.

### Requirement: Realistic TRL 6 Maturity and Pragmatic AI Positioning
The publication exporter and documentation suite SHALL present the platform's technical readiness as TRL 4 (functional software prototype validated in a local development and simulation environment with real multi-temporal spatial data), clearly articulating that Gemini AI is utilized pragmatically on-demand for complex synthesis (under Google AI Studio's free tier) rather than continuous high-cost server invocation.

#### Scenario: Reviewing Technical Maturity in Dossier
- **WHEN** an evaluator, researcher, or judge reviews the pitch deck or executive memorandum
- **THEN** the platform maturity is defined as TRL 4 (fully functional integrated prototype validated in local environment with roadmap to TRL 5/6), providing transparent, credible development benchmarks.

#### Scenario: Inspecting On-Demand AI Architecture
- **WHEN** an evaluator reviews the system's economic feasibility and AI invocation strategy
- **THEN** documentation clarifies that routine edaphic calculations run on local deterministic engines with zero API fees, reserving generative AI for targeted, high-value agronomic synthesis.

### Requirement: Grounded Agricultural Value Prioritization
The official dossier and pitch deck SHALL anchor the primary value proposition on concrete agricultural economics—fertilizer optimization (-35%), soil acidity correction (Kamprath), drainage risk management via Sentinel-1 SAR, and offline vernacular accessibility—framing carbon credits as an exploratory, future-facing research module rather than an immediate commercial dependency.

#### Scenario: Reviewing Primary Platform Objectives
- **WHEN** reading the project overview and executive summary
- **THEN** the primary focus highlights farmer productivity, cost reduction in inputs, and climate resilience, keeping international carbon finance as an auxiliary research capability.

### Requirement: Creative Process Engineering Memoir and Human Dimension Integration
The system and project documentation SHALL maintain an authoritative, personal engineering memoir and creative process narrative in `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (with an identical public replica in `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`). The document SHALL present the authentic voice of the creator, **Frank Sousa**, detailing:
1. **The Academic Spark and Certified MapBiomas Training**: The project's genesis originating from proximity to a university research group and mentorship from an agronomist professor specialized in edaphology (soil science); Frank Sousa's formal certified attendance at the official MapBiomas Venezuela training workshop; and the strategic vision of bridging 40 years of territorial land-use data with practical soil physics for both vegetable/crop production (cereals, legumes, horticulture) and livestock pasture nutrition (forage).
2. **The Solo Developer's Critical Sieve and Iterative Rigor**: The sovereign methodology of Frank Sousa as a solo developer (*solo developer*) collaborating with Gemini within the Google Antigravity IDE: actively researching suggestions, critically filtering, adapting, pruning, and rejecting ideas that did not fit the biophysical and infrastructural realities of Venezuela, validated through consecutive exhaustive audit cycles and 292 passing automated tests (237 Jest + 55 Pytest).
3. **The Tangible Seed of Arduino/ESP32 Soil Sensors**: The bottom-up experimental origin using low-cost microcontrollers (Arduino/ESP32) and capacitive soil moisture probes in controlled pot/bed assays to observe real-world hydraulic responses, establishing the architectural foundation for scalable LoRaWAN mesh networks and automated pivot irrigation across large commercial harvests.
4. **Legal Governance and Third-Party Data Licensing**: The integration of external open-data frameworks (Copernicus Regulation EU 1159/2013, NASA NPD 2230.1, MapBiomas CC BY 4.0, Google AI Studio Free Tier, and MIT software licensing) providing an unassailable legal and operational foundation.
5. **Multidisciplinary Evolutionary Horizons**: Five tangible expansion vectors building on current foundations:
   - Conversational WhatsApp/SMS rural bot for non-smartphone accessibility.
   - Agro-banking credit risk and micro-insurance scoring based on historical satellite proof.
   - MapBiomas Ground-Truth participatory co-validation network.
   - Open-hardware solar LoRaWAN IoT weather stations for rural micro-catchments.
   - Pan-Amazonian / Orinoco Basin transboundary territorial monitoring.

#### Scenario: Inspecting Author Engineering Memoir from Documentation Hub
- **WHEN** an evaluator, researcher, or juror visits `/dashboard/postulacion` or opens `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`
- **THEN** the document is fully readable, detailing Frank Sousa's academic edaphology roots, official MapBiomas workshop certificate, the solo developer filter methodology, the Arduino IoT origin, the Antigravity-Gemini pair programming method, the 292 tests quality gate, and the 5 evolutionary horizons.

#### Scenario: Verifying Public Distribution Parity for Engineering Memoir
- **WHEN** the documentation build pipeline executes or automated tests run
- **THEN** `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` is present in both `docs/` and `public/docs/` with identical content, ensuring immediate browser download availability.

### Requirement: Official PDF Formatting and Compilation Parameters Specification
The publication exporter and project documentation SHALL explicitly document the technical parameters, layout rules, styling constraints, and compilation commands for generating official award-grade PDF dossiers from Markdown sources. The specification SHALL codify:
1. **Physical Page Layout**: ISO A4 standard (210 mm x 297 mm) with uniform 15 mm margins and `printBackground: true`.
2. **Typography and Readability Hierarchy**: Clean modern sans-serif typography (`Segoe UI`, system Apple-System) with 9 pt body text, justified paragraphs, and emerald primary accents (`#065f46`, `#059669`).
3. **CSS Page-Break Constraints**: Mandatory `page-break-inside: avoid; break-inside: avoid;` rules applied to tables, pre/code blocks, figure containers, blockquotes, and image captions to prevent split figures and orphaned headers across page transitions.
4. **Dynamic Running Headers and Footers**: Header templates featuring document title, author Frank Sousa attribution, and right-aligned branding; footer templates rendering dynamic `<span class='pageNumber'></span> de <span class='totalPages'></span>` page counters.
5. **High-Resolution Vector and Plotly Pre-Rendering**: Pre-compilation of interactive Plotly HTML figures into 300 DPI high-resolution PNG images via headless Puppeteer browser before PDF injection.
6. **Word Count Compliance**: Automated verification guaranteeing that official prize dossiers remain strictly below the 10,000-word limit prescribed by MapBiomas Venezuela guidelines.
7. **Compilation Tooling and Reproduction**: Documentation of the universal batch script (`node scripts/compile_all_docs_to_pdf.js`) and individual CLI generation (`npx md-to-pdf <document.md> --config-file scripts/pdf_config.json`).

#### Scenario: Reviewing PDF Parameters in Engineering Documentation
- **WHEN** an evaluator, designer, or developer inspects the PDF compilation section in `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` or `scripts/`
- **THEN** the document details the exact page dimensions (A4), 15 mm margins, CSS anti-split rules, header/footer tokens, and execution commands.

#### Scenario: Reproducing Official Dossier Compilation via Node Script
- **WHEN** an engineer executes `node scripts/compile_all_docs_to_pdf.js` with `md-to-pdf` installed
- **THEN** the system compiles all registered Markdown sources into publication-grade PDFs in `public/docs/` adhering to the configured styling and pagination parameters.
