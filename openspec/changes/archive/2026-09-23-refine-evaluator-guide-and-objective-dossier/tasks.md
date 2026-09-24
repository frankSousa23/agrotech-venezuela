# Tasks: Refine Evaluator Guide and Objective Dossier

## 1. Restructure Evaluator Guide (Criteria Realignment & Link Precision)

- [x] 1.1 Restructure the criteria table and sections in `docs/GUIA_EVALUADOR.md` to strictly reflect the 6 official criteria of Anexo II (Complejidad Técnica 20%, Originalidad 20%, Claridad 15%, Resultados 20%, Aporte Social 20%, Aporte MapBiomas 5% = 100%), framing the 278 automated tests as the foundational methodology of Complejidad Técnica.
- [x] 1.2 Update all source code, API route, and test suite hyperlinks in `docs/GUIA_EVALUADOR.md` to exact existing paths in `src/`, `backend/`, and `__tests__/`, verifying that all referenced files resolve without broken links.

## 2. Eliminate Self-Scoring in Submission Dossiers

- [x] 2.1 Refactor `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` to replace self-assigned grades ("5 / 5", "100% / 100%") with "Evidencia y Criterio de Cumplimiento Técnico Presentado al Jurado para su Evaluación", maintaining a humble and strictly evidence-based scientific tone.
- [x] 2.2 Verify that the dossier overview across `POSTULACION_EXPEDIENTE_PREMIO_2026.md` and `MEMORANDO_POSTULACION.md` presents the platform's achievements objectively without presumptuous language.

## 3. Synchronize Article Drafts & Visual Workflow Infographic

- [x] 3.1 Update `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` to embed the 5-phase data workflow infographic (`/images/flujo_inteligencia_agricola.png`) and synchronize the extended caption with `public/docs/ARTICULO_TECNICO_DRAFT.md`.
- [x] 3.2 Execute `py scripts/generate_prize_pdf.py` and verify clean chart generation, word count compliance (<10,000 words), mandatory citation presence, and synchronized dossier compilation.

## 4. Quality & Build Verification

- [x] 4.1 Run `npm test` and verify that all 224 Jest tests pass across 33 test suites without string mismatch regressions.
- [x] 4.2 Run `npm run test:backend` and verify that all 54 Pytest tests pass across 17 backend modules.
- [x] 4.3 Run `npm run typecheck` and `npm run build` to confirm 0 TypeScript errors and 32 clean production routes in Next.js 16 Turbopack.
