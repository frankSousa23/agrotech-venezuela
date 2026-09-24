# Design: Refine Evaluator Guide and Objective Dossier

## Context

See `proposal.md` for background and motivation. The project is at TRL 4 with 278 automated tests (224 Jest + 54 Pytest), 32 clean production routes, and comprehensive postulation documentation for the *Segunda Edición del Premio MapBiomas Venezuela 2026* (Categoría General).

The user explicitly requires:
1. **Scientific Humility & Evaluator Respect**: Eliminating any self-assigned grades (such as "5/5", "100% / 100%", "Excelente"), pre-emptive victory declarations, or egocentric framing. All aspects must be presented as verifiable technical evidence submitted for the jury's sovereign evaluation.
2. **Official Criteria Alignment**: Aligning `docs/GUIA_EVALUADOR.md` strictly to the 6 official evaluation criteria of Anexo II (20%, 20%, 15%, 20%, 20%, 5% = 100%), framing the 278 automated tests and MIT open source licensing as the verifiable substrate of Complejidad Técnica rather than an artificial 7th criterion of 10%.
3. **Exact Navigation Accuracy**: Ensuring every file link, test link, and line reference points to real, existing paths in the workspace.
4. **Complete Self-Contained Experience**: Ensuring that someone browsing only the GitHub repository can fully understand the system and improvements, while anyone who clones and runs it can immediately verify 100% operational functionality.

## Goals / Non-Goals

**Goals:**
- Restructure `docs/GUIA_EVALUADOR.md` into the official 6 criteria of the MapBiomas Prize bases (100% total weight).
- Frame the 278 tests, 0 TypeScript errors, 32 routes, and MIT Open Source license as the verifiable technical foundation supporting Criterion 1 (*Complejidad Técnica*) and transversal reproducibility.
- Correct all hyperlinks and paths in `docs/GUIA_EVALUADOR.md` to match existing files in `src/`, `backend/`, and `__tests__/`.
- Refactor `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` to remove self-assigned scores ("5 / 5", "100% / 100%") and present evidence respectfully for the evaluators' consideration.
- Synchronize `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` with `public/docs/` to embed the 5-phase precision agriculture workflow diagram and detailed caption.
- Ensure all 278 tests pass (100% OK), TypeScript compiles with 0 errors, and Next.js builds 32 routes cleanly.

**Non-Goals:**
- Modifying platform code, runtime algorithms, or API endpoints.
- Changing verified core metrics (278 tests, 32 routes, TRL 4).
- Altering the legal identity or academic attribution of the author (Frank Alfonso Sousa Mota, UNERG 2025).

## Decisions

### Decision 1: Rubric Structure in `docs/GUIA_EVALUADOR.md`
- *Decision*: Adopt the exact 6 criteria from Anexo II:
  1. Complejidad Técnica (20%)
  2. Originalidad e Innovación (20%)
  3. Claridad y Estructura (15%)
  4. Resultados, Discusión y Conclusiones (20%)
  5. Aporte General y Social (20%)
  6. Aporte a MapBiomas Venezuela (5%)
  Total: **100%**.
- *Rationale*: A juror comparing the guide against the official bases will see an exact 1:1 correspondence without mathematical discrepancy. Scientific rigor and reproducibility are framed as the methodological proof of Complejidad Técnica and project integrity.

### Decision 2: Neutral and Humble Tone Across the Dossier
- *Decision*: Replace self-assigned scores ("Calificación Esperada: 5/5", "100% / 100% Cumplimiento Sobresaliente") with "Evidencia y Criterio de Cumplimiento Técnico Presentado al Jurado para su Evaluación".
- *Alternatives Considered*: Retaining self-scores as "expectations". Rejected because it risks appearing presumptuous or disrespectful towards the evaluators' judgment.

### Decision 3: Exact Path Mapping for Source Files and Tests
- *Decision*: Verify and map every single link in `docs/GUIA_EVALUADOR.md` against real paths:
  - `src/lib/geo/spatialUtils.ts` ➔ `__tests__/api/spatial.test.ts`
  - `src/lib/agronomy/pedotransferEngine.ts` ➔ `__tests__/agronomy/pedotransfer.test.ts`
  - `backend/src/ml_feature_engine.py` ➔ `backend/tests/test_ml_feature_engine.py`
  - `src/lib/agronomy/roiCostEngine.ts` ➔ `__tests__/agronomy/roiCostEngine.test.ts` & `__tests__/agronomy/ImpactRoiWidget.test.ts`
  - `src/lib/geo/machineryExporter.ts` ➔ `__tests__/api/machinery-exporter.test.ts`
  - `src/lib/farmer/vernacularParser.ts` ➔ `__tests__/api/vernacular-parser.test.ts`
  - `src/lib/context/UIModeContext.tsx` ➔ `src/components/layout/FarmerModeToggle.tsx`
  - `src/app/api/parcels/conflicts/route.ts` ➔ `__tests__/api/parcels-conflict.test.ts`
  - `backend/src/risk_and_carbon_engine.py` ➔ `backend/tests/test_risk_and_carbon.py`

## Risks / Trade-offs

- **[Risk: Test assertion breaks on documentation strings]**  
  *Mitigation*: `__tests__/api/security-and-dossier.test.ts` checks for `'278 pruebas automatizadas'` and `'32 rutas'` in `MEMORANDO_POSTULACION.md`. All edits strictly maintain these metrics. Run `npm test` immediately after modifying files.

- **[Risk: Divergence between `public/docs/` and `docs/mapbiomas_premio_2026/`]**  
  *Mitigation*: Keep identical copies of `MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `ARTICULO_TECNICO_DRAFT.md` across both directories.
