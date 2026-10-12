# ecosystem-audit-and-documentation-synchronization Specification

## Purpose

Ensures complete factual consistency across repository documentation, code badges, test reporting scripts, and MapBiomas 2026 award submission dossiers, accurately reflecting the 311 automated tests and the pedagogical soil module.

## Requirements

### Requirement: Unified Test Suite Metric Assertion across Docs and UI
The system documentation, badges, and interface components SHALL uniformly state the exact active automated test suite size of 311 tests (256 Jest tests in 36 suites + 55 Pytest tests in 17 módulos) with 0 TypeScript errors and 40 Next.js 16 production routes.

#### Scenario: Documentation test count verification
- **WHEN** an evaluator or developer reads `README.md`, `AGENTS.md`, `SHOWCASE.md`, or `GUIA_EVALUADOR.md`
- **THEN** all test suite tables and badges display 311 passing tests (256 Jest + 55 Pytest)

#### Scenario: Interface and modal test badge verification
- **WHEN** a user visits `/dashboard/postulacion`, opens `DemoTourModal`, views `MultiLevelMapViewer`, or checks `DataflowDiagramStudio`
- **THEN** the rendered badges and certification labels reflect 311 automated tests instead of legacy figures

### Requirement: Pedagogical Soil Layer Documentation in Operational Guides
The project documentation SHALL comprehensively document the pedagogical soil layer, explaining the 4-zone Water Comfort Bar ("Esponja de Suelo"), crop water autonomy estimation, 40-year MapBiomas history card, and didactic/technical mode switcher.

#### Scenario: Operational soil module guide enrichment
- **WHEN** a user or judge consults `docs/GUIA_MODULO_SUELOS.md`
- **THEN** it provides dedicated sections explaining the Water Comfort Bar, water autonomy days, historical organic matter loss remediation, and cross-module handoffs to the field diary in 50 kg bags

#### Scenario: Showcase and evaluators guide alignment
- **WHEN** an evaluator reads `docs/SHOWCASE.md` or `docs/GUIA_EVALUADOR.md`
- **THEN** it explicitly maps the pedagogical soil mode to the official MapBiomas 2026 evaluation criteria (Social Inclusion and MapBiomas Contribution)

### Requirement: MapBiomas 2026 Application Dossiers and Public Mirror Synchronization
The system SHALL synchronize all MapBiomas 2026 prize submission documents in `docs/mapbiomas_premio_2026/` and their public mirrors in `public/docs/`, ensuring identical text, up-to-date metrics (311 tests), and explicit descriptions of the TRL 4 soil module prototype.

#### Scenario: Technical article and dossier metrics sync
- **WHEN** reading `ARTICULO_TECNICO_DRAFT.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, or `MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the text reports 311 automated tests (256 Jest + 55 Pytest) and highlights the pedagogical soil module

#### Scenario: Public downloadable mirror parity
- **WHEN** documents in `docs/mapbiomas_premio_2026/` are updated
- **THEN** matching markdown files in `public/docs/` contain identical synchronized contents

### Requirement: Automated Test Summary Script Full Coverage Assertion
The test reporting script `scripts/test_summary.js` SHALL register all 36 Jest test suites, explicitly including `SoilPedagogicalWaterBar.test.tsx` and `MapBiomas40YearTrajectoryCard.test.tsx`, rendering an exact total of 311 tests.

#### Scenario: Running test summary command
- **WHEN** user executes `npm run test:summary`
- **THEN** the console report lists 256 frontend tests across 36 suites and 55 backend tests across 17 modules, totaling 311 tests passed
