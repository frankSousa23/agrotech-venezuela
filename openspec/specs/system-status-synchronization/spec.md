# system-status-synchronization Specification

## Purpose

Ensures consistent, synchronized project metrics and capabilities across all documentation, guidelines, and technical UI surfaces of the Agrotech Venezuela platform.

## Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, **278 automated tests passing (224 Jest + 54 Pytest across 33 test suites and 17 backend modules)**, 32 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing, offline dossier, and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/GUIA_POSTULACION.md`, `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`, `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`, `docs/mapbiomas_premio_2026/PITCH_DECK.md`, `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`, `scripts/generate_prize_pdf.py`, and `/dashboard/postulacion`). The documentation SHALL also surface the interactive agronomic manual route (`/dashboard/manual`), the precision agriculture workflow infographic, and the decoupled ROI operational costing for both mechanized and smallholder profiles as part of the platform's featured capabilities.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, AGENTS.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, **278 tests passing: 224 Jest + 54 Pytest**, **33 Jest suites**, 32 routes, 0 TypeScript errors), and the README's capability section mentions the `/dashboard/manual` interactive agronomic manual and the 5-stage data lifecycle infographic.

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect **33 Jest test suites (224 tests)** and 54 Pytest tests without outdated label numbers.

#### Scenario: Auditing MapBiomas Prize Evaluation Dossiers and Submission Artifacts
- **WHEN** an evaluator inspects any evaluation matrix, technical article, or submission guide either in `public/docs/` or in `docs/mapbiomas_premio_2026/`
- **THEN** the documents consistently describe TRL 4 validated through **278 automated tests (224 Jest + 54 Pytest)** and **32 clean Next.js 16 production routes**, without any residual mentions of 252 tests, 198 Jest, or 30/31 routes.

#### Scenario: Running the Official Prize Dossier PDF Generator Script
- **WHEN** an operator runs `python scripts/generate_prize_pdf.py`
- **THEN** the script compiles the consolidated dossier embedding the official certification of **278 automated tests (224 Jest + 54 Pytest, 100% aprobadas)**.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure (< 160 lines in README), isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines and embedded official infographics, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios. The README SHALL explicitly mention the **interactive agronomic manual** (`/dashboard/manual`) with role-based content filtering, the **printable tractor cabin reference sheet** as part of the Rural Inclusion pillar, and the **5-stage data workflow infographic**.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise, single-read overview that includes the interactive agronomic manual, the 5-stage data lifecycle infographic, and the smallholder vs mechanized costing profiles among the platform's key usability features.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites reflecting **278 tests passing (224 Jest in 33 suites + 54 Pytest)** without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all **278 automated tests (224 Jest across 33 suites + 54 Pytest across 17 modules)** and 32 production routes by subsystem with validation descriptions, explicitly listing `roiCostEngine.test.ts` and `ImpactRoiWidget.test.ts`.

### Requirement: Architectural Diagram Synchronization
The interactive dataflow diagrams in `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) and system technical blueprints SHALL visually represent the certified operational components including Sentinel-1 SAR radar cross-validation oracle in `/api/mrv/sar-oracle` and deterministic parcel conflict quarantine and resolution in `/api/parcels/conflicts`.

#### Scenario: Inspecting Offline Conflict Sequence Flow
- **WHEN** a user or auditor views Diagram 3 (Offline Resilience) in the architecture studio
- **THEN** the diagram illustrates the sequence of monotonic version collision detection (HTTP 409), quarantine queue routing, and visual resolution via `ParcelConflictModal.tsx`.

#### Scenario: Inspecting MRV Satellite Oracle Dataflow
- **WHEN** an auditor views Diagram 1 (Microservices & Data Flow) in the architecture studio
- **THEN** the diagram illustrates the integration of the Sentinel-1 SAR dual-polarization oracle providing structural canopy roughness verification to collapse MRV uncertainty.
