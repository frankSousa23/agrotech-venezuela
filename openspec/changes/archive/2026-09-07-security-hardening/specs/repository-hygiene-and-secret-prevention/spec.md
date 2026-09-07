## Purpose

Establishes strict repository hygiene rules, universal environment file exclusions, and automated scanning to permanently prevent secrets, certificates, and binary artifacts from entering Git history.

## ADDED Requirements

### Requirement: Universal Environment and Secret Patterns in Gitignore
The project repository SHALL configure `.gitignore` with broad wildcard patterns that prevent staging any environment file, cryptographic key, digital certificate, database credential, or package manager token.

#### Scenario: Staging custom environment files
- **WHEN** a contributor creates a local `.env.production`, `.env.staging`, or `.env.local.backup` file
- **THEN** Git automatically ignores the file by default unless it explicitly matches `.env.example` or `.env.production.example`.

#### Scenario: Staging cryptographic keys or certificates
- **WHEN** a contributor creates or downloads `*.pem`, `*.key`, `*.p12`, `*.pfx`, or `service-account.json` within the workspace
- **THEN** Git treats the files as ignored, preventing accidental commit to public repositories.

### Requirement: Automated Secret Scanning in Continuous Integration
The continuous integration pipeline SHALL execute an automated secret-scanning audit step on all pushes and pull requests to block commits containing sensitive strings.

#### Scenario: Pull request with hardcoded secret
- **WHEN** a pull request or branch push contains high-entropy API keys or private credentials
- **THEN** the CI workflow fails the build and flags the offending commit before merging to `main`.
