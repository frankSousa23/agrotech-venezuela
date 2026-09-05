# system-status-synchronization Specification

## Purpose

Ensures consistent, synchronized project metrics and capabilities across all documentation, guidelines, and technical UI surfaces of the Agrotech Venezuela platform.

## Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 197 automated tests passing (145 Jest + 52 Pytest across 24 test suites and 12 backend modules), 28 clean Next.js 16 routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (197 tests passing: 145 Jest + 52 Pytest, 28 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 24 Jest test suites (145 tests) and 52 Pytest tests without outdated label numbers.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under a 3-pillar farmer narrative, isolating technical environment setup into `DEVELOPING.md` and articulating every capability via the formula *Technical Feature + Agricultural Problem Solved = Tangible Field Benefit*.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through 3 narrative pillars (*Accesibilidad y Adopción Rural*, *Inteligencia Agronómica y Observación Satelital Sin Nubes*, *Sostenibilidad, Retorno Económico y Validación Institucional*) with tangible agricultural benefits, offering immediate sandbox access and referencing `DEVELOPING.md` for local deployment.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites without distracting non-technical readers.
