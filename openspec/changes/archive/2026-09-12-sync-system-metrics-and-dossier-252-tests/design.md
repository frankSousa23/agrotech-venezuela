## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform has reached **252 automated tests** (198 Jest + 54 Pytest) across 30 Jest test suites and 17 Pytest modules, with **31 Next.js 16 Turbopack routes**.

Multiple presentation, documentation, and reporting surfaces currently carry outdated counts from prior audits (233 tests / 179 Jest / 28 suites / 30 routes). This design coordinates the simultaneous, unified update of all documents and testing verification utilities.

## Goals / Non-Goals

**Goals:**
- Harmonize all metric indicators to 252 tests (198 Jest + 54 Pytest), 30 Jest suites, and 31 production routes across UI, README, engineering guidelines, pitch deck, and submission dossiers.
- Enrich `scripts/test_summary.js` with the 2 missing Jest test suites so that `npm run test:summary` dynamically matches `npm test` and `npm run test:all`.
- Update `__tests__/api/security-and-dossier.test.ts` assertions for `MEMORANDO_POSTULACION.md` to prevent test regressions.
- Update `.github/workflows/ci.yml` step titles to reflect the true suite numbers.

**Non-Goals:**
- Creating new functional features or modifying application business logic.
- Altering existing test logic beyond expected metric string assertions in the dossier audit test.

## Decisions

### Decision 1: Precise Accounting of the 30 Jest Suites & 198 Tests
In `scripts/test_summary.js`, add:
- `mapbiomas-discrepancy-and-pedagogy.test.ts` (14 tests) under *Usabilidad Rural Dual-Mode & Prescripciones*.
- `unifiedMapAndIoTLab.test.ts` (5 tests) under *Geoespacial, WebGIS & Sensores*.
This yields:
$$179 + 14 + 5 = 198 \text{ tests Jest}$$
$$198 + 54 = 252 \text{ tests unificados}$$

### Decision 2: Precise Accounting of 31 Turbopack Routes
Include `/api/mapbiomas/discrepancy` in the route catalogue of `AUDITORIA_GLOBAL_SISTEMA_2026.md`, bringing the total count to 31 distinct compiled routes matching Next.js 16 Turbopack's build matrix.

### Decision 3: Atomic Test Assertion and Dossier Synchronization
`__tests__/api/security-and-dossier.test.ts` explicitly asserts:
```typescript
expect(content).toContain('252 pruebas automatizadas');
expect(content).toContain('31 rutas');
```
Both `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, and `security-and-dossier.test.ts` will be updated simultaneously to maintain a 100% green test suite.

## Risks / Trade-offs

- **[Risk: Test failure due to string mismatch]** → **Mitigation**: Update both `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, and `__tests__/api/security-and-dossier.test.ts` with identical phrasing (`252 pruebas automatizadas` and `31 rutas`) and verify immediately with `npm test`.
- **[Risk: Outdated PDF generation script]** → **Mitigation**: Update `scripts/generate_prize_pdf.py` to reference 252 tests and 31 routes so that future PDF exports are consistent with the markdown and web views.
