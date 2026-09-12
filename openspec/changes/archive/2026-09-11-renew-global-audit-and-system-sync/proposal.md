# Proposal: Renew Global Audit and System Synchronization

## Why

A forensic exploration of the repository revealed that `AUDITORIA_GLOBAL_SISTEMA_2026.md` in the project root remained frozen in a September 5th snapshot displaying outdated metrics (claiming TRL 6, 145 Jest tests across 24 suites, 28 Next.js routes, omitting `/api/parcels/conflicts` and `/api/mrv/sar-oracle`, and lacking documentation for the `npm run test:summary` runner). Additionally, `scripts/generate_prize_pdf.py` and residual specs in `openspec/specs/` still referenced TRL 6.

This change conducts a brand new, fully synchronized global audit certificate dated September 11, 2026, realigns all system documentation and exporter scripts to the honest, verified TRL 4 benchmark with 233 automated tests (179 Jest + 54 Pytest) and 30 production routes, and eliminates all contradictory metrics across the platform.

## What Changes

- **Renew `AUDITORIA_GLOBAL_SISTEMA_2026.md`**: Complete overhaul to September 11, 2026, documenting TRL 4 maturity, the exact breakdown of all 233 passing tests (179 Jest across 28 suites + 54 Pytest across 17 modules), the 30 production routes (explicitly incorporating `/api/parcels/conflicts` and `/api/mrv/sar-oracle`), and the native `npm run test:summary` tool.
- **Sanitize `scripts/generate_prize_pdf.py`**: Update lines 220 and 224 to anchor TRL 4 (*Prototipo Funcional de Software en Entorno de Desarrollo Local*) so future python builds never regress to TRL 6.
- **Synchronize Residual OpenSpec Specifications**: Harmonize `prize-publication-exporter`, `role-based-documentation-and-navigation`, `interactive-landing-ecosystem`, `guided-demo-tour`, and `docs/institutional-postulation-memorandum` to reflect TRL 4 maturity.
- **Comprehensive Quality Gate Verification**: Verify that `npm run typecheck` (0 errors), `npm run test:summary` (233 tests), `npm test:all` (179 Jest + 54 Pytest passing), and `npm run build` (30 clean routes) operate with 100% success.

## Capabilities

### Modified Capabilities

- `system-status-synchronization`: Sincroniza la auditoría global integral a fecha de 11 de septiembre de 2026, certificando el nivel TRL 4, la batería de 233 tests automatizados con `npm run test:summary`, y las 30 rutas de producción compiladas limpiamente.
- `prize-publication-exporter`: Sincroniza los requerimientos del expediente institucional y generador de artículos a nivel de madurez TRL 4 pragmático, eliminando menciones residuales de TRL 6.

## Impact

- **Affected Files**: `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `scripts/generate_prize_pdf.py`, `openspec/specs/prize-publication-exporter/spec.md`, `openspec/specs/system-status-synchronization/spec.md`.
- **APIs and Runtime**: No breaking changes to APIs, database schemas, or runtime logic. Pure documentation, auditing, and specification synchronization.
