# system-status-synchronization Specification

## Purpose

Ensures consistent, synchronized project metrics and capabilities across all documentation, guidelines, and technical UI surfaces of the Agrotech Venezuela platform.

## Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, 233 automated tests passing (179 Jest + 54 Pytest across 28 test suites and 17 backend modules), 30 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, 233 tests passing: 179 Jest + 54 Pytest, 30 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 28 Jest test suites (179 tests) and 54 Pytest tests without outdated label numbers.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure (< 150 lines in README), isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise, single-read overview with 3 core pillars, an ASCII pipeline diagram, turnkey 3-command execution, and direct author attribution without duplicate comparative tables.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all 233 automated tests (179 Jest + 54 Pytest) by subsystem with validation descriptions.

### Requirement: Architectural Diagram Synchronization
The interactive dataflow diagrams in `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) and system technical blueprints SHALL visually represent the certified operational components including Sentinel-1 SAR radar cross-validation oracle in `/api/mrv/sar-oracle` and deterministic parcel conflict quarantine and resolution in `/api/parcels/conflicts`.

#### Scenario: Inspecting Offline Conflict Sequence Flow
- **WHEN** a user or auditor views Diagram 3 (Offline Resilience) in the architecture studio
- **THEN** the diagram illustrates the sequence of monotonic version collision detection (HTTP 409), quarantine queue routing, and visual resolution via `ParcelConflictModal.tsx`.

#### Scenario: Inspecting MRV Satellite Oracle Dataflow
- **WHEN** an auditor views Diagram 1 (Microservices & Data Flow) in the architecture studio
- **THEN** the diagram illustrates the integration of the Sentinel-1 SAR dual-polarization oracle providing structural canopy roughness verification to collapse MRV uncertainty.
