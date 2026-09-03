## MODIFIED Requirements

### Requirement: Production Environment Template
The system SHALL provide a comprehensive `.env.production.example` file detailing all required production environment variables (Database URL, JWT secret, FastAPI backend URL, and Google Gemini API credentials) with descriptive configuration guidelines, avoiding third-party test workbench references.

#### Scenario: Inspecting Production Configuration Template
- **WHEN** a devops engineer reviews the root configuration files
- **THEN** `.env.production.example` clearly specifies the production port mappings, security tokens, and backend microservice addresses without mentioning private test workbenches.

## ADDED Requirements

### Requirement: Modern Docker Compose and Ergonomic Scripting
The system configuration SHALL omit deprecated compose schema attributes (such as `version: '3.8'`), provide unified orchestration and test execution scripts (`services:up`, `services:down`, `test:all`, `typecheck`) in `package.json`, and furnish official PWA manifest and favicon assets in `public/`.

#### Scenario: Starting Docker Services Without Warnings
- **WHEN** developer runs `docker compose up -d` or `npm run services:up`
- **THEN** all containers start without obsolete attribute warnings in the CLI output.

#### Scenario: Executing Full-Stack Verification Suite
- **WHEN** developer runs `npm run test:all`
- **THEN** both Jest frontend tests and Pytest backend tests execute sequentially and report aggregate pass status.
