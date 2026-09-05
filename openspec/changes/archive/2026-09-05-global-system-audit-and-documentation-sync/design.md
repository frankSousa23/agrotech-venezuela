## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform has reached 182 automated tests (130 Jest + 52 Pytest) across 28 Next.js Turbopack routes. However, `src/app/dashboard/postulacion/page.tsx` still shows `179 Tests Automatizados Pasando (128 Jest + 51 Pytest)`, and `docs/MEMORANDO_POSTULACION.md` (along with its public copy `public/docs/MEMORANDO_POSTULACION.md`) still shows `160 pruebas automatizadas (109 Jest + 51 Pytest)`. This audit change reconciles these metrics across all institutional presentation layers and executes a comprehensive 5-axis system health verification.

## Goals / Non-Goals

**Goals:**
- Update `src/app/dashboard/postulacion/page.tsx` badge to `182 Tests Automatizados Pasando (130 Jest + 52 Pytest)`.
- Update `docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md` to reflect 182 automated tests and 28 clean routes.
- Execute full test verification (`npm test`, `npm run test:backend`, `npx tsc --noEmit`, and `npm run build`).
- Produce an official certification artifact `AUDITORIA_GLOBAL_SISTEMA_2026.md` assessing the 5 core axes (Geoespacial & Satelital, ML & IA, UX Rural & Resiliencia, Documentación y TRL 7).

**Non-Goals:**
- Altering core computational logic, GIS rendering, or database schemas.

## Decisions

### Decision 1: Mirror Synchronization of Institutional Memorandums
- **Choice**: Synchronize both `docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md` identically.
- **Rationale**: Next.js serves public assets directly from `/docs/MEMORANDO_POSTULACION.md` via `public/docs/`. Keeping both in sync guarantees that users clicking from `/dashboard/postulacion` and users browsing the GitHub repository read the exact same certified metrics.

### Decision 2: 5-Axis Comprehensive Audit Artifact
- **Choice**: Compile the audit findings into `AUDITORIA_GLOBAL_SISTEMA_2026.md` in the root/artifacts.
- **Rationale**: Provides evaluators, juries (MapBiomas Prize 2026), and investors with an auditable summary confirming that every component (radar SAR, Shoelace geodesics, offline indexedDB, ML models, Gemini AI) operates in harmony.

## Risks / Trade-offs

- **[Risk]** Overlooking residual references to old test counts (160, 173, or 179).
  - **Mitigation**: Run repository-wide ripgrep scans for all previous metric counts to guarantee 100% synchronization.
