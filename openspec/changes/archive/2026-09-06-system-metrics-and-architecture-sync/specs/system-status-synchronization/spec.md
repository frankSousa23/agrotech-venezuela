## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 227 automated tests passing (173 Jest + 54 Pytest across 28 test suites and 17 backend modules), 30 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (227 tests passing: 173 Jest + 54 Pytest, 30 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 28 Jest test suites (173 tests) and 54 Pytest tests without outdated label numbers.

## ADDED Requirements

### Requirement: Architectural Diagram Synchronization
The interactive dataflow diagrams in `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) and system technical blueprints SHALL visually represent the certified operational components including Sentinel-1 SAR radar cross-validation oracle in `/api/mrv/sar-oracle` and deterministic parcel conflict quarantine and resolution in `/api/parcels/conflicts`.

#### Scenario: Inspecting Offline Conflict Sequence Flow
- **WHEN** a user or auditor views Diagram 3 (Offline Resilience) in the architecture studio
- **THEN** the diagram illustrates the sequence of monotonic version collision detection (HTTP 409), quarantine queue routing, and visual resolution via `ParcelConflictModal.tsx`.

#### Scenario: Inspecting MRV Satellite Oracle Dataflow
- **WHEN** an auditor views Diagram 1 (Microservices & Data Flow) in the architecture studio
- **THEN** the diagram illustrates the integration of the Sentinel-1 SAR dual-polarization oracle providing structural canopy roughness verification to collapse MRV uncertainty.
