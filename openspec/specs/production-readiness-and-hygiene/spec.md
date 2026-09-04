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
The system configuration SHALL omit deprecated compose schema attributes (such as `version: '3.8'`), provide unified orchestration and test execution scripts (`services:up`, `services:down`, `test:all`, `typecheck`, and automated `"postinstall": "prisma generate"`) in `package.json`, and furnish official PWA manifest and favicon assets in `public/`.

#### Scenario: Starting Docker Services Without Warnings
- **WHEN** developer runs `docker compose up -d` or `npm run services:up`
- **THEN** all containers start without obsolete attribute warnings in the CLI output.

#### Scenario: Automated Turnkey Installation for Cloned Repository
- **WHEN** a developer, judge, or CI environment runs `npm install`
- **THEN** Prisma Client is automatically generated via `postinstall` script without requiring manual execution of `npx prisma generate`.

#### Scenario: Executing Full-Stack Verification Suite
- **WHEN** developer runs `npm run test:all`
- **THEN** both Jest frontend tests and Pytest backend tests execute sequentially and report aggregate pass status.
