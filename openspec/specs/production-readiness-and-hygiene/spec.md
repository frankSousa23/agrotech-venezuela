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
The system SHALL provide a comprehensive `.env.production.example` file detailing all required production environment variables (Database URL, JWT secret, FastAPI backend URL, and Google AI Studio / Gemini API credentials) with descriptive configuration guidelines.

#### Scenario: Inspecting Production Configuration Template
- **WHEN** a devops engineer reviews the root configuration files
- **THEN** `.env.production.example` clearly specifies the production port mappings, security tokens, and backend microservice addresses.
