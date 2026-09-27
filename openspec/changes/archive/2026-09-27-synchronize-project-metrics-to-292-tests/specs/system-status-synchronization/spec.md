# Spec Delta

## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, **292 automated tests passing (237 Jest + 55 Pytest across 33 test suites and 17 backend modules)**, **35 clean Next.js 16 production routes**, and 0 TypeScript compilation errors across all public-facing, offline dossier, and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/GUIA_POSTULACION.md`, `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`, `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`, `docs/mapbiomas_premio_2026/PITCH_DECK.md`, `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`, `scripts/generate_prize_pdf.py`, and `/dashboard/postulacion`). The documentation SHALL also surface the interactive agronomic manual route (`/dashboard/manual`), the precision agriculture workflow infographic, and the decoupled ROI operational costing for both mechanized and smallholder profiles as part of the platform's featured capabilities.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, AGENTS.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, **292 tests passing: 237 Jest + 55 Pytest**, **33 Jest suites**, **17 Pytest modules**, **35 routes**, 0 TypeScript errors), and the README's capability section mentions the `/dashboard/manual` interactive agronomic manual and the 5-stage data lifecycle infographic.

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect **33 Jest test suites (237 tests)** and **55 Pytest tests** without outdated label numbers.

#### Scenario: Auditing MapBiomas Prize Evaluation Dossiers and Submission Artifacts
- **WHEN** an evaluator inspects any evaluation matrix, technical article, or submission guide either in `public/docs/` or in `docs/mapbiomas_premio_2026/`
- **THEN** the documents consistently describe TRL 4 validated through **292 automated tests (237 Jest + 55 Pytest)** and **35 clean Next.js 16 production routes**, without any residual mentions of 290 tests, 278 tests, 224 Jest, or 32 routes.

#### Scenario: Running the Official Prize Dossier PDF Generator Script
- **WHEN** an operator runs `python scripts/generate_prize_pdf.py`
- **THEN** the script compiles the consolidated dossier embedding the official certification of **292 automated tests (237 Jest + 55 Pytest, 100% aprobadas)**.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure, isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines and embedded official infographics, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios. The README SHALL explicitly feature:
1. The **interactive agronomic manual** (`/dashboard/manual`) with role-based content filtering.
2. The **printable tractor cabin reference sheet** as part of the Rural Inclusion pillar.
3. The **5-stage data workflow infographic**.
4. The **visual platform showcase gallery** linking to `docs/SHOWCASE.md`.
5. The **1-click direct access table** for in-browser reading of the 7 compiled official MapBiomas Prize PDFs in `docs/mapbiomas_premio_2026/`.
6. The **fast-track Evaluator Rubric Guide** (`docs/GUIA_EVALUADOR.md`) mapped to the 6 official evaluation criteria of Anexo II (100% total weight).
7. A **collapsible automated test summary breakdown** displaying the categorized execution results of all 292 automated tests.
8. Prominent technical framing of **Sentinel-1 SAR C-Band radar (5.405 GHz VV/VH)** for overcoming the tropical cloud barrier (>75% cloud cover during the commercial rainy season) across Venezuelan agricultural lowlands.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise overview that includes the visual showcase gallery, the 1-click PDF access table, the evaluator rubric guide, the interactive agronomic manual, the 5-stage data lifecycle infographic, and the smallholder vs mechanized costing profiles among the platform's key features.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites reflecting **292 tests passing (237 Jest in 33 suites + 55 Pytest in 17 modules)** without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all **292 automated tests (237 Jest across 33 suites + 55 Pytest across 17 modules)** and 35 production routes by subsystem with validation descriptions, explicitly listing `security-and-dossier.test.ts` (10 tests) and `test_api_endpoints.py` (22 tests) alongside all core agronomic suites.

#### Scenario: Reviewing Test Verification Without Local Execution
- **WHEN** an evaluator inspects the testing section of `README.md` on GitHub
- **THEN** an expandable details block displays the full categorized summary of all 292 passing automated tests without requiring the visitor to clone the repo or run Jest/Pytest.

### Requirement: Architectural Diagram Synchronization
The interactive dataflow diagrams in `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) and system technical blueprints SHALL visually represent the full breadth of certified operational components through an expanded 8-diagram catalog with interactive step-by-step sequences, zoomable Mermaid diagrams, and audit specifications. The catalog SHALL feature:
1. Microservices & E2E Global Data Flow.
2. Spatial Data Lifecycle & 10m Micro-Parcel Processing.
3. Offline Rural Resilience, Token Hashing & Monotonic Collision Quarantine.
4. Multi-Parametric Agronomic AI Workflow with Gemini.
5. MapBiomas Venezuela 40-Year Land-Use Matrix.
6. Tri-Modal Machinery Prescriptions Pipeline (ESRI Shapefile VRA UTM 19N WGS84, Drone Flight KML, and Analog 1-Page Cabin Sheet).
7. Carbon MRV Lifecycle (IPCC Tier 2 / Verra VCS) & Sentinel-1 SAR Radar Canopy Roughness Oracle.
8. Agro-IoT Digital Twin, Saxton-Rawls Physical Pedotransfer Curves, Dynamic PAW Balance, and NASA POWER Rain Suppression.

Furthermore, all user interface screens (including `/dashboard/postulacion`) and documentation artifacts (including `docs/SHOWCASE.md`) SHALL strictly purge any residual self-assigned evaluation grades (such as `Evaluación 5/5`) or presumptuous autoevaluation wording, framing all technical evidence and matrices exclusively for the sovereign evaluation of the jury. The verification cards and metadata badges in `DataflowDiagramStudio.tsx` SHALL display **292 automated tests** and **35 production routes** in Next.js 16 Turbopack.

#### Scenario: Inspecting Offline Conflict Sequence Flow
- **WHEN** a user or auditor views Diagram 3 (Offline Resilience) in the architecture studio
- **THEN** the diagram illustrates the sequence of monotonic version collision detection (HTTP 409), quarantine queue routing, and visual resolution via `ParcelConflictModal.tsx`.

#### Scenario: Inspecting MRV Satellite Oracle Dataflow
- **WHEN** an auditor views Diagram 1 or Diagram 7 in the architecture studio
- **THEN** the diagram illustrates the integration of the Sentinel-1 SAR dual-polarization oracle (`/api/mrv/sar-oracle`) providing structural canopy roughness verification ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) to collapse MRV uncertainty from 40% to 10%.

#### Scenario: Inspecting Tri-Modal Machinery Prescriptions Flow
- **WHEN** an engineer or agronomist views Diagram 6 in the architecture studio
- **THEN** the diagram details the generation of ESRI Shapefile VRA packages, agricultural drone KML flight plans, and 1-page cabin reference sheets.

#### Scenario: Inspecting Agro-IoT Digital Twin and Saxton-Rawls Flow
- **WHEN** an evaluator views Diagram 8 in the architecture studio
- **THEN** the diagram traces ESP32 telemetry ingestion, Saxton-Rawls physical soil curves (PWP, FC, SAT), PAW calculation, automated irrigation trigger when $\text{PAW} < 50\%$, and rain forecast suppression via NASA POWER.

#### Scenario: Reviewing Postulation Hub Without Self-Assigned Grades
- **WHEN** an evaluator or juror visits `/dashboard/postulacion`
- **THEN** all badges and cards frame the criteria and metrics objectively (e.g. `Baremo Oficial 100%`, `Criterios Oficiales Anexo II`) without displaying `Evaluación 5/5` or claiming self-awarded victory.
