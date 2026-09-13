## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, **267 automated tests passing (213 Jest + 54 Pytest across 31 test suites and 17 backend modules)**, 31 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`). The documentation SHALL also surface the interactive agronomic manual route (`/dashboard/manual`) and the onboarding checklist widget as part of the platform's featured capabilities.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, AGENTS.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, **267 tests passing: 213 Jest + 54 Pytest**, **31 Jest suites**, 31 routes, 0 TypeScript errors), and the README's capability section mentions the `/dashboard/manual` interactive agronomic manual.

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect **31 Jest test suites (213 tests)** and 54 Pytest tests without outdated label numbers.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure, isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios. The README SHALL explicitly mention the **interactive agronomic manual** (`/dashboard/manual`) with role-based content filtering and the **printable tractor cabin reference sheet** as part of the Rural Inclusion pillar.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise, single-read overview that includes the interactive agronomic manual and onboarding checklist among the platform's key usability features.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites reflecting **267 tests passing (213 Jest in 31 suites + 54 Pytest)** without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all **267 automated tests (213 Jest across 31 suites + 54 Pytest across 17 modules)** and 31 production routes by subsystem with validation descriptions, including the `manual-and-onboarding` suite.
