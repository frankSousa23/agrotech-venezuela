## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: TRL 4 maturity (*Prototipo Funcional de Software en Entorno de Desarrollo Local*), Categoría General postulation, **278 automated tests passing (224 Jest + 54 Pytest across 33 test suites and 17 backend modules)**, 32 clean Next.js 16 production routes, and 0 TypeScript compilation errors across all public-facing, offline dossier, and in-app technical materials (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/GUIA_POSTULACION.md`, `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`, `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`, `docs/mapbiomas_premio_2026/PITCH_DECK.md`, `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md`, `scripts/generate_prize_pdf.py`, and `/dashboard/postulacion`). The documentation SHALL also surface the interactive agronomic manual route (`/dashboard/manual`), the precision agriculture workflow infographic, and the decoupled ROI operational costing for both mechanized and smallholder profiles as part of the platform's featured capabilities.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, DEVELOPING.md, AGENTS.md, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified metrics (TRL 4, **278 tests passing: 224 Jest + 54 Pytest**, **33 Jest suites**, 32 routes, 0 TypeScript errors), and the README's capability section mentions the `/dashboard/manual` interactive agronomic manual and the 5-stage data lifecycle infographic.

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect **33 Jest test suites (224 tests)** and 54 Pytest tests without outdated label numbers.

#### Scenario: Auditing MapBiomas Prize Evaluation Dossiers and Submission Artifacts
- **WHEN** an evaluator inspects any evaluation matrix, technical article, or submission guide either in `public/docs/` or in `docs/mapbiomas_premio_2026/`
- **THEN** the documents consistently describe TRL 4 validated through **278 automated tests (224 Jest + 54 Pytest)** and **32 clean Next.js 16 production routes**, without any residual mentions of 252 tests, 198 Jest, or 30/31 routes.

#### Scenario: Running the Official Prize Dossier PDF Generator Script
- **WHEN** an operator runs `python scripts/generate_prize_pdf.py`
- **THEN** the script compiles the consolidated dossier embedding the official certification of **278 automated tests (224 Jest + 54 Pytest, 100% aprobadas)**.
