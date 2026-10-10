# Tasks

## 1. Landing Page & Web Interface Alignment

- [x] 1.1 Update hero award badge and mission subtitle in `src/app/page.tsx` highlighting the foundational Soil Module prototype for MapBiomas Venezuela and verify via Next.js page rendering.
- [x] 1.2 Update the Soil Profiles catalog in `src/app/dashboard/suelos/page.tsx` with MapBiomas Soil Module base layer badge and verify via component inspection.
- [x] 1.3 Update Diagram 5 in `src/components/diagrams/DataflowDiagramStudio.tsx` to include the MapBiomas Soil Module node in the Mermaid workflow and verify diagram rendering.

## 2. GitHub Showcase & Institutional Evaluation Matrices

- [x] 2.1 Update `README.md` with official MapBiomas Soil Module badge, introductory overview, and prize section alignment and verify markdown link integrity.
- [x] 2.2 Synchronize Criterion 6 and Criterion 2 in `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and verify exact file parity.
- [x] 2.3 Synchronize Abstract and Motivation in `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` and `public/docs/ARTICULO_TECNICO_DRAFT.md` and verify exact file parity.

## 3. Automated Verification & Quality Assurance

- [x] 3.1 Update Jest test suite in `__tests__/api/security-and-dossier.test.ts` to assert that evaluation matrices and landing copies reference MapBiomas Suelos and verify with `npm test`.
- [x] 3.2 Execute full test suite and build verification (`npm run typecheck`, `npm test`, `npm run test:backend`, `npm run build`) and verify 292 passing tests, 0 TypeScript errors, and 35 production routes.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
