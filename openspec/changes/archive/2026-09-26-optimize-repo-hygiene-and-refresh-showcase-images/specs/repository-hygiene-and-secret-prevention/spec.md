# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Redundant Binary Asset Purge
The repository SHALL maintain zero unreferenced binary asset duplicates, ensuring all documentation and web pages reference a single canonical asset path and eliminating redundant clones.

#### Scenario: Referencing Precision Agriculture Workflow Diagram
- **WHEN** documentation pages or frontend views display the 5-stage precision agriculture workflow infographic
- **THEN** they reference the single canonical asset `public/images/flujo_inteligencia_agricola.png` with zero orphaned `.jpg` duplicate files remaining in the repository tree.
