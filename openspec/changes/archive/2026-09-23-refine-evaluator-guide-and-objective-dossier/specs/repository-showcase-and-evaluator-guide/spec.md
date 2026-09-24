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

The audit guide and submission documentation SHALL present all technical elements with scientific humility, clarity, and objective verifiable evidence, avoiding self-assigned grades or presumptuous assertions of victory, explicitly submitting all aspects to the jury's sovereign evaluation. Furthermore, the guide SHALL provide exact, verified file paths to source code and automated test suites without broken or hypothetical links.

#### Scenario: Auditing Specific Evaluation Criteria
- **WHEN** a juror or evaluator consults `docs/GUIA_EVALUADOR.md` to review a specific scoring criterion (e.g., Inclusión Rural, Complejidad Técnica or Resultados)
- **THEN** the guide presents the objective evidence, mathematical formulas, exact source code paths, and automated verification tests corresponding to that criterion without self-assigned scores.

#### Scenario: Navigating to Source Files and Automated Tests
- **WHEN** an evaluator clicks on any file or test link in `docs/GUIA_EVALUADOR.md`
- **THEN** the link navigates to the exact existing file in the repository (such as `src/lib/agronomy/pedotransferEngine.ts`, `src/lib/agronomy/roiCostEngine.ts`, `src/lib/geo/machineryExporter.ts`, or `__tests__/api/spatial.test.ts`).

#### Scenario: Consulting Submission Evaluation Matrix
- **WHEN** an evaluator or juror reads `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` or `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- **THEN** the document presents verifiable technical facts, architectural features, and test results submitted for the jury's evaluation without presumptuous self-awarded ratings.
