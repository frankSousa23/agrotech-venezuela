## 1. UI & Component Clarification

- [x] 1.1 Update `src/components/agronomy/MicrocropIoTLab.tsx` with an educational sandbox banner and BYOD hardware-agnostic disclaimer, clarifying that Agrotech does not manufacture hardware and physical sensors are optional. Verify component renders properly.

## 2. Documentation and Pitch Deck Recalibration

- [x] 2.1 Update `PITCH_DECK.md` across root, `public/docs/`, and `docs/mapbiomas_premio_2026/` to establish TRL 6 maturity, on-demand free-tier AI, educational IoT scope, and prioritized agronomic value over carbon credits.
- [x] 2.2 Update `POSTULACION_EXPEDIENTE_PREMIO_2026.md` in both locations with calibrated TRL 6, on-demand AI invocation model, and decoupled IoT testing scope.
- [x] 2.3 Update `MEMORANDO_POSTULACION.md` and `MATRIZ_CUMPLIMIENTO_EVALUACION.md` to reflect TRL 6 prototype maturity and software-first focus.
- [x] 2.4 Update `README.md` and `AUDITORIA_GLOBAL_SISTEMA_2026.md` with the honest TRL 6 benchmark and hardware-agnostic policy.

## 3. PDF Recompilation and Synchronization

- [x] 3.1 Recompile all 6 official PDFs using `scripts/compile_all_docs_to_pdf.js` and `scripts/generate_prize_pdf.py`.
- [x] 3.2 Verify that all 6 generated PDFs in `docs/mapbiomas_premio_2026/` and `public/docs/` have clean page breaks and exact endings (8 pages for Postulacion_Expediente).

## 4. System Verification

- [x] 4.1 Execute `npm run typecheck` and confirm 0 TypeScript errors.
- [x] 4.2 Execute `npm run test:all` and confirm all 233 automated tests (179 Jest + 54 Pytest) pass without regression.
