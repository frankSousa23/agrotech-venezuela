## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 197 automated tests passing (145 Jest + 52 Pytest across 24 test suites and 12 backend modules), 28 clean Next.js 16 routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (197 tests passing: 145 Jest + 52 Pytest, 28 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 24 Jest test suites (145 tests) and 52 Pytest tests without outdated label numbers.
