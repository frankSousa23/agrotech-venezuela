## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, 233 automated tests passing (179 Jest + 54 Pytest across 28 test suites and 17 backend modules), 30 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, 233 tests passing: 179 Jest + 54 Pytest, 30 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 28 Jest test suites (179 tests) and 54 Pytest tests without outdated label numbers.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under a 3-pillar farmer narrative, isolating technical environment setup into `DEVELOPING.md`, articulating every capability via the formula *Technical Feature + Agricultural Problem Solved = Tangible Field Benefit*, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through 3 narrative pillars (*Accesibilidad y Adopción Rural*, *Inteligencia Agronómica y Observación Satelital Sin Nubes*, *Modelado Prescriptivo, Proyección Económica y Sostenibilidad*) framing ROI and carbon as computational projections, offering immediate sandbox access, and referencing `DEVELOPING.md` for local deployment.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites without distracting non-technical readers.
