# Tasks: MapBiomas Postulation Synchronization and Scientific Dossier

## 1. Scientific Manuscript and Author Attribution

- [x] 1.1 Update `public/docs/ARTICULO_CIENTIFICO_DRAFT.md` with complete author attribution (Frank Sousa), institutional affiliations, dual-licensing notice (MIT for code, CC BY 4.0 for MapBiomas data), mandatory terms-of-use citation, up-to-date system metrics (227 automated tests: 173 Jest + 54 Pytest, 30 Next.js 16 Turbopack production routes), and technical coverage of Dual-Mode UI, Saxton-Rawls dynamic PAW model, SAR Sentinel-1 oracle, machinery VRA Shapefiles/KML, and Agrotech Carbon Pooling.
- [x] 1.2 Synchronize the complete master article to `docs/mapbiomas_premio_2026/ARTICULO_CIENTIFICO_DRAFT.md` and `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md` and verify identical content.

## 2. Evaluation Criteria Matrix and Formal Word Count Audit

- [x] 2.1 Update `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` aligning the project's current state with all 6 official jury evaluation criteria (Anexo II of the Prize Rules), upgrading technical complexity and social impact evidence to 227 tests and TRL 7 operational deployment.
- [x] 2.2 Execute `scripts/generate_prize_pdf.py` to audit word count (< 10,000 words) and generate updated Plotly transition figures.

## 3. Publication-Grade PDF Compilation

- [x] 3.1 Compile the updated scientific paper into `public/docs/Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf` using `npx md-to-pdf` with A4 formatting, full KaTeX mathematical typesetting, high-definition styling, and complete author/license metadata.
- [x] 3.2 Verify the generated PDF file size, page integrity, and availability in `public/docs/`.

## 4. Verification and System Integrity

- [x] 4.1 Verify `/dashboard/postulacion` download links and ensure test suites pass with `npm test` and `npm run test:backend`.
- [x] 4.2 Run `openspec validate` to confirm change coherence.
