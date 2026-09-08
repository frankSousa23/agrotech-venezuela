## 1. Documentation & Guide Synchronization

- [x] 1.1 Overwrite `docs/MEMORANDO_POSTULACION.md` with the verified contents of `public/docs/MEMORANDO_POSTULACION.md` (TRL 6, 233 automated tests, FinOps on-demand, software-first BYOD). Verify with file diff and text inspection.
- [x] 1.2 Update `DEVELOPING.md` Section 4 title to `## 🧪 4. Suite Completa de Pruebas y Verificación (233 Tests)`, update Jest count in step 1 to `179 tests`, and update unified suite count in step 5 to `233 de 233 tests aprobados`. Verify with text inspection.
- [x] 1.3 Update `README.md` line 237 markdown anchor to link to `DEVELOPING.md#4-suite-completa-de-pruebas-y-verificación-233-tests`. Verify link anchor text.
- [x] 1.4 Update `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md` and `public/docs/GUIA_POSTULACION.md` lines 31 and 63 to reflect `233 pruebas automatizadas` and `233 tests automatizados`. Verify with grep inspection.

## 2. OpenSpec Capability Specs Synchronization

- [x] 2.1 Update `openspec/specs/system-status-synchronization/spec.md` to reference 233 automated tests (179 Jest + 54 Pytest). Verify spec content.
- [x] 2.2 Update `openspec/specs/docs/institutional-postulation-memorandum/spec.md` to reference TRL 6 and 233 automated tests (179 Jest + 54 Pytest). Verify spec content.
- [x] 2.3 Update `openspec/specs/role-based-documentation-and-navigation/spec.md` to reference TRL 6 operational maturity validation. Verify spec content.

## 3. Publication PDF Compilation & System Verification

- [x] 3.1 Execute `node scripts/compile_all_docs_to_pdf.js` to recompile all official postulation PDFs in `public/docs/` (`Guia_Postulacion_MapBiomas_2026.pdf`, `Memorando_Postulacion_Agrotech_2026.pdf`, etc.). Verify PDFs are updated on disk.
- [x] 3.2 Execute complete test suite (`npm run test:all`) and confirm all 233 tests pass (179 Jest + 54 Pytest).
- [x] 3.3 Execute TypeScript typecheck (`npm run typecheck`) and Next.js production build (`npm run build`) to confirm 0 errors and 30 clean production routes.
