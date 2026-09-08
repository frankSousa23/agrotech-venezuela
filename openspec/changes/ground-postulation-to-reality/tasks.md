## 1. Documentation and Technical Article Refactoring

- [x] 1.1 Refactor `ARTICULO_CIENTIFICO_DRAFT.md` into `ARTICULO_TECNICO_DRAFT.md` in `docs/mapbiomas_premio_2026/` and `public/docs/`, establishing Technical Article format, Categoría General, TRL 4 maturity with roadmap to TRL 5/6, and computational simulation scenarios for Turén and Calabozo
- [x] 1.2 Update `MEMORANDO_POSTULACION.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, and `GUIA_POSTULACION.md` in both `docs/mapbiomas_premio_2026/` and `public/docs/` to reflect TRL 4, Categoría General, and prospective ROI/carbon modeling
- [x] 1.3 Update `PITCH_DECK.md` and `README.md` to reflect TRL 4 status, Categoría General, and computational simulation scenarios

## 2. Platform UI Updates and Script Synchronization

- [x] 2.1 Update `src/app/dashboard/postulacion/page.tsx` to display TRL 4 badges, Categoría General indicator, Technical Article download links, and prospective modeling framing
- [x] 2.2 Update `scripts/compile_all_docs_to_pdf.js` to compile `Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf` and synchronize all output PDF paths

## 3. PDF Recompilation, Verification, and Testing

- [x] 3.1 Recompile all 6 official postulation PDFs using `node scripts/compile_all_docs_to_pdf.js` and verify generation in both `docs/mapbiomas_premio_2026/` and `public/docs/`
- [x] 3.2 Execute TypeScript check (`npm run typecheck`) and verify 0 errors
- [x] 3.3 Execute full unified test suite (`npm run test:all`) and verify 233 tests pass (179 Jest + 54 Pytest)
- [x] 3.4 Verify Next.js production build (`npm run build`) with 30 clean routes
