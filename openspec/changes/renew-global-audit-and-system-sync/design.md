# Technical Design: Renew Global Audit and System Synchronization

## Context

See `proposal.md` for motivation. While the frontend and official submission article have been successfully grounded in TRL 4 with 233 passing tests, `AUDITORIA_GLOBAL_SISTEMA_2026.md` and auxiliary scripts (`scripts/generate_prize_pdf.py`) still contained outdated statements from an earlier September 5th draft (claiming TRL 6, 145 Jest tests in 24 suites, and omitting 2 routes). This design details the exact audit structure and synchronization strategy.

## Goals / Non-Goals

**Goals:**
- Completely rewrite `AUDITORIA_GLOBAL_SISTEMA_2026.md` with the verified metrics of September 11, 2026: TRL 4 maturity, 233 automated tests (179 Jest + 54 Pytest across 28 suites and 17 modules), 30 clean Next.js 16 routes, and `npm run test:summary` protocol.
- Sanitize `scripts/generate_prize_pdf.py` so that automated dossier generation never writes TRL 6 benchmarks.
- Synchronize residual OpenSpec specs in `openspec/specs/` that mention TRL 6 (`prize-publication-exporter`, `role-based-documentation-and-navigation`, `interactive-landing-ecosystem`, `guided-demo-tour`, `docs/institutional-postulation-memorandum`).
- Pass the full 4-stage automated verification suite (`typecheck`, `test:summary`, `test:all`, `build`).

**Non-Goals:**
- No changes to core mathematical engines, routes, or component behavior.
- No changes to existing passing test logic.

## Decisions

### 1. Accurate 30-Route Catálogo in the Global Audit
The audit will catalogue all 30 compiled routes in Next.js 16 Turbopack, specifically highlighting:
- `/api/parcels/conflicts`: Monotonic version collision detection (HTTP 409) and quarantine queue for rural offline resilience.
- `/api/mrv/sar-oracle`: Sentinel-1 SAR dual-polarization canopy roughness verification for MRV carbon uncertainty collapse.

### 2. Forensic Test Matrix Breakdown
The audit will list all 28 Jest test suites with their exact test counts matching `scripts/test_summary.js` (totaling 179) and all 17 Pytest modules (totaling 54), bringing 100% mathematical consistency to the entire document.

### 3. Protection Against Accidental Regressions in Python Scripts
Update `scripts/generate_prize_pdf.py` lines 220 and 224 to explicitly write `TRL 4 (Prototipo Funcional de Software Validado en Entorno de Desarrollo y Simulación Local)` to safeguard against accidental text drift if the script is rerun.

## Risks / Trade-offs

- **[Risk: Breaking assertions in existing tests]** → **Mitigation**: `__tests__/api/security-and-dossier.test.ts` expects `'233 pruebas automatizadas'` and `'30 rutas'` in `MEMORANDO_POSTULACION.md`. The global audit update strictly respects these exact strings and numbers.
