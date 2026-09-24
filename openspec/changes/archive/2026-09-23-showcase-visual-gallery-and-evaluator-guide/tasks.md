# Tasks

## 1. High-Definition Operational Showcase Asset Curation

- [x] 1.1 Create `docs/images/showcase/` and curate the 6 high-resolution operational platform screenshots (`01_webgis_3_niveles.png`, `02_modo_productor_facil.png`, `03_retorno_inversion_costeo.png`, `04_laboratorio_iot_riego.png`, `05_manual_agronomico_cabina.png`, and `06_perfil_postulacion_mapbiomas.png`), and verify file existence and sizes.
- [x] 1.2 Create `docs/SHOWCASE.md` providing an annotated visual tour of the platform with detailed technical captions and capability breakdowns for non-cloning evaluators, and verify file rendering.

## 2. Evaluator Rubric Guide & Direct PDF Navigation

- [x] 2.1 Create `docs/GUIA_EVALUADOR.md` mapping each of the 7 official MapBiomas Prize evaluation criteria directly to source files, mathematical equations, APIs, and automated tests, and verify file structure.
- [x] 2.2 Update `README.md` to incorporate the 1-click PDF access table (7 compiled award PDFs), the visual showcase gallery preview, the link to `docs/GUIA_EVALUADOR.md`, the collapsible `<details>` 278-test execution summary, and enhanced framing of cloud-penetrating Sentinel-1 SAR radar, and verify links and formatting.

## 3. Automated Verification & System Integrity

- [x] 3.1 Run `npm test` to confirm all 224 Jest tests across 33 suites (including `security-and-dossier.test.ts`) pass with zero regressions.
- [x] 3.2 Run `npm run test:summary` and `npm run test:backend` to verify all 278 automated tests (224 Jest + 54 Pytest) pass at 100%.
- [x] 3.3 Run `npm run typecheck` and `npm run build` to confirm 0 TypeScript errors and clean production compilation of 32 Next.js 16 Turbopack routes.
