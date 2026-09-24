# Proposal

## Why

Following an exhaustive end-to-end dataflow audit across the running Agrotech Venezuela platform, four synchronization and completeness gaps were identified:
1. The **Interactive Architecture Studio** (`/dashboard/arquitectura` in `DataflowDiagramStudio.tsx`) features only 5 diagrams, omitting dedicated architectural visualizations for three major innovations: **Tri-Modal Machinery Prescriptions** (ESRI Shapefile VRA, KML for drones, and 1-page cabin sheet), **Carbon MRV & Sentinel-1 SAR Radar Canopy Roughness Oracle** (`/api/mrv/sar-oracle`), and **Agro-IoT Digital Twin & Saxton-Rawls Physical Pedotransfer Engine** (PAW < 50% automated irrigation and NASA POWER rain suppression). Furthermore, its audit specifications tab omits the recent 278 automated test verification baseline and mathematical formulations.
2. In [src/app/dashboard/postulacion/page.tsx](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/src/app/dashboard/postulacion/page.tsx), residual self-scoring and autoevaluation wording persists: line 399 displays `Autoevaluación Anexo II`, line 671 displays a self-awarded badge `<span className="badge-pill badge-purple">Evaluación 5/5</span>`, and line 674 reads `Auditoría y autoevaluación punto por punto...`, contradicting the project's strict mandate of scientific humility and sovereign jury evaluation.
3. In [README.md](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/README.md) (line 239) and [docs/SHOWCASE.md](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/docs/SHOWCASE.md) (line 125), residual references cite "7 criterios oficiales" or "Autoevaluación Anexo II" instead of the 6 official evaluation criteria of Anexo II (100% total weight).

Resolving these gaps ensures that any researcher, developer, or juror exploring the repository or running the platform encounters 100% accurate, comprehensive, and respectfully framed architectural dataflows and documentation.

## What Changes

1. **Enrich `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`)**:
   - Expand the architectural catalog from 5 to 8 interactive diagrams with zoom, pan, and SVG export:
     - *Diagram 6*: **Pipeline Tri-Modal de Prescripciones para Maquinaria & VRA** (vector parcel ➔ soil/MapBiomas rules ➔ ESRI Shapefile VRA UTM 19N WGS84, KML agricultural drone flight paths, and analog 1-page cabin sheet).
     - *Diagram 7*: **Ciclo MRV de Carbono (IPCC Tier 2 / Verra VCS) & Oráculo Radar SAR Sentinel-1 Banda C** (baseline SOC 0-30cm ➔ field log labor ➔ SAR C-Band 5.405 GHz all-weather roughness ratio $\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$ ➔ uncertainty reduction 40% to 10% ➔ Carbon Pooling 85/15).
     - *Diagram 8*: **Gemelo Digital Agro-IoT, Física Saxton-Rawls & Riego Predictivo** (ESP32 node ➔ `/api/iot/telemetry` ➔ Saxton-Rawls retention curves ➔ dynamic PAW balance ➔ trigger irrigation when $\text{PAW} < 50\%$ with NASA POWER rain suppression $> 5\text{ mm}$).
   - Update the "Especificaciones de Auditoría" tab to explicitly document the 278 automated test suite (224 Jest + 54 Pytest), 0 TypeScript errors, 32 production routes, and regional edaphic formulas (Kamprath, dolomitic lime balance, Quíbor gypsum).

2. **Purge Residual Self-Scoring in `src/app/dashboard/postulacion/page.tsx`**:
   - Replace `Autoevaluación Anexo II` on line 399 with `Criterios Oficiales Anexo II`.
   - Replace `<span className="badge-pill badge-purple">Evaluación 5/5</span>` on line 671 with `<span className="badge-pill badge-purple">Baremo Oficial 100%</span>`.
   - Update line 674 to remove "autoevaluación", framing it as technical evidence submitted to the jury.

3. **Synchronize Residual "7 Criterios" and "Autoevaluación" References in Markdown Documentation**:
   - Update [README.md](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/README.md) line 239 from "7 criterios oficiales" to "6 criterios oficiales del baremo (Anexo II, 100%)".
   - Update [docs/SHOWCASE.md](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/docs/SHOWCASE.md) line 125 from "Autoevaluación Anexo II ... 7 criterios" to "Matriz de Cumplimiento de Criterios (Anexo II) (Presentación técnica frente a los 6 criterios oficiales del baremo)".

4. **Verify Quality Baseline**:
   - Confirm all 278 automated tests pass (100% OK), 0 TypeScript errors (`tsc --noEmit`), and 32 clean production routes in Next.js 16 Turbopack.

## Capabilities

### Modified Capabilities
- `system-status-synchronization`: Update requirements to reflect the 6 official award criteria of Anexo II (100% total weight) in project overviews and mandate the complete 8-diagram architectural suite in `DataflowDiagramStudio.tsx` without residual self-awarded evaluation scores.

## Impact

- **UI / Frontend**: `src/components/diagrams/DataflowDiagramStudio.tsx`, `src/app/dashboard/postulacion/page.tsx`.
- **Documentation**: `README.md`, `docs/SHOWCASE.md`.
- **Tests**: Verify with `npm test`, `npm run test:backend`, `npm run typecheck`, and `npm run build`.
