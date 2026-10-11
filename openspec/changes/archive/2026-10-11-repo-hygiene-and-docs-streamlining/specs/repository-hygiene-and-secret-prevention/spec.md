# Spec Delta: repository-hygiene-and-secret-prevention

## MODIFIED Requirements

### Requirement: Redundant Binary Asset Purge
The repository SHALL maintain zero unreferenced code components, binary duplicates, or duplicate documentation files, ensuring all codebase elements and documentation reference single canonical paths and eliminating redundant clones.

#### Scenario: Referencing Precision Agriculture Workflow Diagram
- **WHEN** documentation pages or frontend views display the 5-stage precision agriculture workflow infographic
- **THEN** they reference the single canonical asset `public/images/flujo_inteligencia_agricola.png` with zero orphaned `.jpg` duplicate files remaining in the repository tree.

#### Scenario: Purging Unreferenced MapResizeSynchronizer and React-Leaflet
- **WHEN** the project builds and packages frontend dependencies
- **THEN** `src/components/gis/MapResizeSynchronizer.tsx` is completely deleted, and `react-leaflet` is removed from `package.json` dependencies, leaving only native `leaflet` (`L.map`) managed through `useRef`.

#### Scenario: Purging Duplicate Root Documentation and Agent Directories
- **WHEN** an evaluator or contributor inspects the project root
- **THEN** no duplicate `PITCH_DECK.md` or partial `.agent/` folder exists in the root, with pitch materials centralized in `docs/mapbiomas_premio_2026/PITCH_DECK.md` and agent workflows located in `.agents/`.

## ADDED Requirements

### Requirement: Centralized Audit Archive
The repository SHALL organize non-canonical historical audit records in a dedicated `docs/audits/` subdirectory rather than storing them in the root directory.

#### Scenario: Locating System Audit Certificates
- **WHEN** a reviewer searches for past system audit reports such as `AUDITORIA_GLOBAL_SISTEMA_2026.md`
- **THEN** the file is located inside `docs/audits/` and linked cleanly from the documentation index without cluttering the project root.
