# Proposal: Refine Evaluator Guide and Objective Dossier

## Why

Following an exhaustive global system and documentation audit of the Agrotech Venezuela repository, several opportunities for precision and alignment were identified:
1. **Evaluation Criteria & Ponderation Realignment**: The Evaluator Guide (`docs/GUIA_EVALUADOR.md`) previously listed 7 criteria totaling 110% by treating scientific rigor as an independent 10% weighted criterion. The official bases of the *Segunda Edición del Premio MapBiomas Venezuela 2026* (Anexo II - Categoría General) strictly specify **6 criteria totaling exactly 100%** (20%, 20%, 15%, 20%, 20%, 5%). Rigorous automated testing (278 tests) and MIT licensing naturally constitute the foundational methodology of Criterion 1 (*Complejidad Técnica*) and transversal reproducibility.
2. **Humility & Objective Presentation**: Self-assigned scores (such as "5/5" or "100% / 100% Cumplimiento Sobresaliente") can convey presumptuousness. Evaluation and scoring belong solely to the jury. The repository must present technical evidence, code, mathematical equations, and automated tests with scientific humility, clarity, and objectivity, submitting all aspects to the evaluators' sovereign judgment.
3. **Exact File Link Precision**: Several file links in `docs/GUIA_EVALUADOR.md` pointed to conventional or hypothetical paths rather than exact existing paths (e.g., `src/lib/agronomy/pedotransferEngine.ts`, `backend/src/ml_feature_engine.py`, `src/lib/geo/machineryExporter.ts`, `__tests__/api/spatial.test.ts`). Correcting these ensures 100% navigation accuracy for evaluators on GitHub or in an IDE.
4. **Dossier Asset Synchronization**: Harmonizing `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` with `public/docs/ARTICULO_TECNICO_DRAFT.md` ensures identical diagram references and extended 5-phase captions.

## What Changes

- **Update `docs/GUIA_EVALUADOR.md`**:
  - Restructure the evaluation rubric to strictly reflect the 6 official criteria of Anexo II (totaling 100%: 20%, 20%, 15%, 20%, 20%, 5%).
  - Highlight the 278 automated tests (224 Jest + 54 Pytest), 0 TypeScript errors, 32 production routes, and MIT open licensing as the underlying scientific and reproducible foundation supporting Criterion 1 (*Complejidad Técnica*).
  - Correct all hyperlinks and references to point to exact existing paths in `src/`, `backend/`, and `__tests__/`.
- **Remove Presumptuous Self-Scoring Across Dossier Files**:
  - In `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, replace self-assigned scores ("5 / 5", "100% / 100%") with "Aspectos y Evidencias Sometidos a Consideración del Jurado Evaluador".
  - Maintain a respectful, humble, and strictly evidence-based tone focused on demonstrable functionality.
- **Harmonize `ARTICULO_TECNICO_DRAFT.md`**:
  - Sync the embedded precision agriculture diagram (`/images/flujo_inteligencia_agricola.png`) and the detailed 5-stage caption in `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`.
- **Verify Clean Build & Full Test Suite**:
  - Ensure all 278 automated tests continue passing (100% OK), 0 TypeScript errors, and 32 Next.js production routes build cleanly.

## Capabilities

### Modified Capabilities
- `repository-showcase-and-evaluator-guide`: Update `Requirement: MapBiomas Prize Evaluator Audit Roadmap` to reflect the 6 official criteria (100% total weight), eliminate self-awarded grades in favor of objective evidence submitted to the jury, and mandate exact source code and test file paths.

## Impact

- **Affected Documentation**: `docs/GUIA_EVALUADOR.md`, `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`.
- **Source Code**: No breaking code changes. Enhances documentation accuracy, external credibility, and auditor navigation.
- **Dependencies & Tests**: Zero impact on runtime dependencies. Preserves 278 passing automated tests and 32 Next.js routes.
