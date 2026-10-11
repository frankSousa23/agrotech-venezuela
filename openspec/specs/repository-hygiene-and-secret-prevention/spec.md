# repository-hygiene-and-secret-prevention Specification

## Purpose

Establishes strict repository hygiene rules, universal environment file exclusions, and automated scanning to permanently prevent secrets, certificates, and binary artifacts from entering Git history.

## Requirements

### Requirement: Universal Environment and Secret Patterns in Gitignore
The project repository SHALL configure `.gitignore` with broad wildcard patterns that prevent staging any environment file, cryptographic key, digital certificate, database credential, package manager token, or intermediate multimedia render artifacts (`slides_png/`, `*.webm`, `*.mov`, `*.tmp`, `*.bak`).

#### Scenario: Staging custom environment files
- **WHEN** a contributor creates a local `.env.production`, `.env.staging`, or `.env.local.backup` file
- **THEN** Git automatically ignores the file by default unless it explicitly matches `.env.example` or `.env.production.example`.

#### Scenario: Staging cryptographic keys or certificates
- **WHEN** a contributor creates or downloads `*.pem`, `*.key`, `*.p12`, `*.pfx`, or `service-account.json` within the workspace
- **THEN** Git treats the files as ignored, preventing accidental commit to public repositories.

#### Scenario: Staging intermediate presentation slides or local video renders
- **WHEN** a script generates intermediate slide frames in `slides_png/` or creates local `*.webm`/`*.mov` renders
- **THEN** Git ignores the folder and media files by default, preventing repository bloat while preserving local generation capability.

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

### Requirement: Automated Secret Scanning in Continuous Integration
The continuous integration pipeline SHALL execute an automated secret-scanning audit step on all pushes and pull requests to block commits containing sensitive strings.

#### Scenario: Pull request with hardcoded secret
- **WHEN** a pull request or branch push contains high-entropy API keys or private credentials
- **THEN** the CI workflow fails the build and flags the offending commit before merging to `main`.

### Requirement: Centralized Audit Archive
The repository SHALL organize non-canonical historical audit records in a dedicated `docs/audits/` subdirectory rather than storing them in the root directory.

#### Scenario: Locating System Audit Certificates
- **WHEN** a reviewer searches for past system audit reports such as `AUDITORIA_GLOBAL_SISTEMA_2026.md`
- **THEN** the file is located inside `docs/audits/` and linked cleanly from the documentation index without cluttering the project root.
