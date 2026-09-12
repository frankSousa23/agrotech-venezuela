## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local y Simulación*), Categoría General postulation, 233 automated tests passing (179 Jest across 28 test suites and 54 Pytest across 17 backend modules), 30 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, 233 tests passing: 179 Jest + 54 Pytest, 30 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 28 Jest test suites (179 tests) and 54 Pytest tests without outdated label numbers.

#### Scenario: Consulting Global System Audit Certificate
- **WHEN** an auditor, evaluator, or technical reviewer inspects `AUDITORIA_GLOBAL_SISTEMA_2026.md`
- **THEN** the certificate presents up-to-date metrics (September 11, 2026), certified TRL 4 status, exact breakdown of all 233 tests across 28 Jest suites and 17 Pytest modules, and the complete catalog of 30 Next.js production routes including `/api/parcels/conflicts` and `/api/mrv/sar-oracle`.
