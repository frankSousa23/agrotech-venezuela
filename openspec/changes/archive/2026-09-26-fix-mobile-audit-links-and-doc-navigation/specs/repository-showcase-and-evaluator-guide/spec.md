# Spec Delta

## MODIFIED Requirements

### Requirement: MapBiomas Prize Evaluator Audit Roadmap
The repository SHALL provide a fast-track audit guide (`docs/GUIA_EVALUADOR.md`) and submission documentation that maps each of the 6 official evaluation criteria defined in Anexo II of the bases of the Segunda Edición del Premio MapBiomas Venezuela 2026 (Categoría General, totaling exactly 100%):
1. **Complejidad Técnica (20%)**: MapBiomas 40-year trajectory, Sentinel-1 SAR C-Band radar (5.405 GHz all-weather), Shoelace WGS84 ellipsoidal geodesics, Saxton-Rawls dynamic PAW balance, supported by the foundational verification substrate of 278 automated tests (224 Jest + 54 Pytest) and 0 TypeScript compilation errors under an open MIT License.
2. **Originalidad e Innovación (20%)**: Conversion of multidecadal coverage history into chemical soil prescriptions (Kamprath modified, dolomitic lime balance Ca:Mg, and Quíbor gypsum amendment), Dual-Mode UI architecture, tri-modal machinery prescriptions (ESRI VRA Shapefile, KML, cabin sheet), and smallholder Carbon Pooling aggregation.
3. **Claridad y Estructura (15%)**: Next.js 16 Turbopack architecture, 32 clean production routes, 5-minute audit tour, interactive OpenAPI 3.0 documentation (`/api-docs`), and live mathematical formulations in KaTeX.
4. **Resultados, Discusión y Conclusiones (20%)**: Emblematic agricultural modeling scenarios (Turén in maize and Calabozo in rice), operational ROI costing strictly decoupled from speculative carbon markets, IPCC Tier 2 / Verra VCS carbon modeling, and Sentinel-1 SAR canopy roughness oracle.
5. **Aporte General y Social (20%)**: Democratization through Modo Productor Fácil with 4 giant tactile action doors, Web Speech API native vernacular voice dictation, Venezuelan peasant unit normalizer, and offline IndexedDB/SQLite WAL caching.
6. **Aporte a MapBiomas Venezuela (5%)**: Direct field operationalization of Colección 3.0 (1985–2024) for tractor and field decision-making, ground-truth farmer validation, and CC BY 4.0 data attribution.

The audit guide and submission documentation SHALL present all technical elements with scientific humility, clarity, and objective verifiable evidence, avoiding self-assigned grades or presumptuous assertions of victory, explicitly submitting all aspects to the jury's sovereign evaluation.

Furthermore, the guide and repository documentation SHALL implement a **mobile-first, app-resilient navigation architecture**:
1. The criteria summary table in `docs/GUIA_EVALUADOR.md` SHALL embed direct, clickable markdown links to the verifiable test suites (e.g. `[spatial.test.ts](../__tests__/api/spatial.test.ts)`) and primary source code files (e.g. `[spatialUtils.ts](../src/lib/geo/spatialUtils.ts)`) within the table cells, enabling mobile users to open and inspect evidence in 1 tap without depending on in-page anchor jumps.
2. In-document section navigation SHALL use clean, universal ASCII anchor tags (`<a id="criterio-1"></a>` and `[Ver Detalle ↓](#criterio-1)`) without accented characters or punctuation that fail in native mobile Markdown renderers (such as GitHub Android or iOS).
3. Every criterion section SHALL provide a bidirectional return navigation link (`[Volver al Índice ↑](#indice)`).
4. All referenced file paths within the guide (including `src/components/gis/VenezuelaStateMapInner.tsx` and `src/components/tierras/ParcelConflictModal.tsx`) and cross-document relative links across `docs/mapbiomas_premio_2026/` and `public/docs/` SHALL resolve to exact existing files without 404 broken links.

#### Scenario: Auditing Specific Evaluation Criteria
- **WHEN** a juror or evaluator consults `docs/GUIA_EVALUADOR.md` to review a specific scoring criterion (e.g., Inclusión Rural, Complejidad Técnica or Resultados)
- **THEN** the guide presents the objective evidence, mathematical formulas, exact source code paths, and automated verification tests corresponding to that criterion without self-assigned scores.

#### Scenario: Navigating to Source Files and Automated Tests
- **WHEN** an evaluator clicks on any file or test link in `docs/GUIA_EVALUADOR.md`
- **THEN** the link navigates to the exact existing file in the repository (such as `src/lib/agronomy/pedotransferEngine.ts`, `src/lib/agronomy/roiCostEngine.ts`, `src/lib/geo/machineryExporter.ts`, or `__tests__/api/spatial.test.ts`).

#### Scenario: Mobile-First Navigation on Android and iOS GitHub App
- **WHEN** an evaluator views `docs/GUIA_EVALUADOR.md` in the GitHub mobile app on an Android or iOS device
- **THEN** tapping on any test suite or source file link in the criteria summary table opens the file directly in the app, and tapping on ASCII anchor links scrolls smoothly to the corresponding section without encountering ignored intents or unhandled character encoding failures.

#### Scenario: Consulting Submission Evaluation Matrix
- **WHEN** an evaluator or juror reads `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` or `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the document presents verifiable technical facts, architectural features, and test results submitted for the jury's evaluation without presumptuous self-awarded ratings.
