## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 233 automated tests passing (179 Jest + 54 Pytest across 28 test suites and 17 backend modules), 30 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (233 tests passing: 179 Jest + 54 Pytest, 30 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 28 Jest test suites (179 tests) and 54 Pytest tests without outdated label numbers.
