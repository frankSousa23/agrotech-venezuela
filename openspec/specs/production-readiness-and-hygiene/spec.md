# production-readiness-and-hygiene Specification

## Purpose

Defines repository cleanliness rules, .gitignore exclusion policies, and production deployment configuration standards to ensure secure public repository publishing.

## Requirements

### Requirement: Repository Cleanliness and Local Cache Untracking
The repository SHALL exclude local build artifacts (`*.tsbuildinfo`), debug logs (`*.log`), and ephemeral scratch scripts from Git tracking, maintaining only production-ready source code, tests, and documentation in the committed tree.

#### Scenario: Running TypeScript Verification
- **WHEN** developer runs `npx tsc --noEmit`
- **THEN** any generated `.tsbuildinfo` file is ignored by Git and does not mark the working tree as dirty.

### Requirement: Production Environment Template
The system SHALL provide a comprehensive `.env.production.example` and root `.env.example` detailing that all external services (PostgreSQL, Gemini API, GEE, NASA POWER) are optional for local evaluation due to resilient in-memory datasets and calibrated geo-climatic fallbacks.

#### Scenario: Inspecting Production Configuration Template
- **WHEN** a devops engineer reviews the root configuration files
- **THEN** `.env.production.example` clearly specifies the production port mappings, security tokens, and backend microservice addresses.

#### Scenario: Inspecting Configuration Templates on Fresh Clone
- **WHEN** an evaluator reviews `.env.example` or runs the platform without custom credentials
- **THEN** the platform launches turnkey with clear documentation explaining that local fallback mode is active without failure.

### Requirement: Modern Docker Compose and Ergonomic Scripting
The system configuration SHALL omit deprecated compose schema attributes (such as `version: '3.8'`), furnish official PWA manifest and favicon assets in `public/`, and provide 100% cross-platform orchestration and test execution scripts in `package.json` (`services:up`, `services:down`, `test`, `test:backend`, `test:all`, `clean`, `typecheck`, and automated `"postinstall": "prisma generate"`) that execute universally across Windows, macOS, and Linux without platform-specific binary dependencies (`pwsh`, `py`). Furthermore, `package.json` SHALL declare production release metadata (`version: "1.0.0"`, author attribution, repository URL, description, and keywords) for public distribution.

#### Scenario: Starting Docker Services Without Warnings
- **WHEN** developer runs `docker compose up -d` or `npm run services:up`
- **THEN** all containers start without obsolete attribute warnings in the CLI output.

#### Scenario: Automated Turnkey Installation for Cloned Repository
- **WHEN** a developer, judge, or CI environment runs `npm install`
- **THEN** Prisma Client is automatically generated via `postinstall` script without requiring manual execution of `npx prisma generate`.

#### Scenario: Executing Full-Stack Verification Suite
- **WHEN** developer runs `npm run test:all`
- **THEN** both Jest frontend tests and Pytest backend tests execute sequentially and report aggregate pass status.

#### Scenario: Running Universal Clean Across Platforms
- **WHEN** a developer or CI environment runs `npm run clean` on Windows, macOS, or Linux
- **THEN** the `.next` directory is removed cleanly via cross-platform Node.js without requiring PowerShell or platform-specific shells.

#### Scenario: Executing Cross-Platform Backend Pytest Suite
- **WHEN** a developer or evaluator runs `npm run test:backend` on Windows, Linux, or macOS
- **THEN** the test runner detects the host Python executable (`py` on Windows, `python3` or `python` on Unix) and executes all 51 backend Pytest tests, returning proper exit codes.

#### Scenario: Inspecting Public Package Metadata
- **WHEN** an evaluator, researcher, or automated registry tool inspects `package.json`
- **THEN** the version displays `1.0.0`, author attribution is Frank Sousa, repository link points to GitHub, and official agrotech keywords are declared.
