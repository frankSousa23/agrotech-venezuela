# Design

## Context

See `proposal.md` for motivation. While the core agronomic engines, WebGIS viewers, automated tests (278 passing), and postulation dossiers have been refined to an objective, evidence-based standard, three areas require synchronization:
1. `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) omits diagrams for the tri-modal machinery exporter, the Sentinel-1 SAR canopy roughness oracle in MRV, and the Agro-IoT Saxton-Rawls dynamic PAW balance.
2. `src/app/dashboard/postulacion/page.tsx` retains residual references to `Autoevaluación Anexo II` and `<span className="badge-pill badge-purple">Evaluación 5/5</span>`.
3. `README.md` and `docs/SHOWCASE.md` contain minor lingering references to "7 criterios" or "Autoevaluación".

## Goals / Non-Goals

**Goals:**
- Enrich `DataflowDiagramStudio.tsx` to host 8 comprehensive architectural diagrams with interactive step-by-step highlights, Mermaid code view, SVG export, and an updated audit specifications tab.
- Purge all residual self-assigned evaluation grades (`Evaluación 5/5`) and "Autoevaluación" phrasing in `src/app/dashboard/postulacion/page.tsx`.
- Harmonize `README.md` line 239 and `docs/SHOWCASE.md` line 125 to state the 6 official criteria of Anexo II (100% total weight) and objective evidence presentation.
- Maintain 100% test pass rate across 278 automated tests (224 Jest + 54 Pytest), 0 TypeScript compilation errors, and 32 clean production routes in Next.js 16 Turbopack.

**Non-Goals:**
- Altering existing API routes or changing the core agronomic formulas.
- Adding third-party diagramming libraries beyond the already integrated native Mermaid.js.

## Decisions

### 1. Expanded 8-Diagram Catalog Architecture in `DataflowDiagramStudio.tsx`
- *Decision*: Maintain the clean, responsive glassmorphic layout and add 3 new diagrams to `SYSTEM_DIAGRAMS`:
  1. `machinery_prescriptions`: **6. Pipeline Tri-Modal de Prescripciones para Maquinaria & VRA** (Vector Parcela + Edafología/MapBiomas ➔ `machineryExporter.ts` ➔ Shapefile ESRI UTM 19N WGS84, KML drones agrícolas, Ficha de Cabina analógica de 1 página).
  2. `carbon_mrv_sar_oracle`: **7. Ciclo MRV de Carbono (IPCC Tier 2 / Verra VCS) & Oráculo Radar SAR Sentinel-1** (Línea base SOC 0-30cm + Bitácora ➔ Oráculo SAR `/api/mrv/sar-oracle` 5.405 GHz all-weather con ratio $\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$ ➔ Reducción de incertidumbre 40% a 10% ➔ Carbon Pooling 85/15).
  3. `iot_saxton_rawls`: **8. Gemelo Digital Agro-IoT, Física Saxton-Rawls & Riego Predictivo** (ESP32 ➔ `/api/iot/telemetry` ➔ Saxton-Rawls curvas de retención ➔ Cálculo dinámico de $\text{PAW}$ ➔ Disparo de electroválvula si $\text{PAW} < 50\%$ con supresión de lluvia NASA POWER).
- *Category Extension*: Support clean category badges (`machinery`, `carbon`, `iot`) and ensure responsive button wrapping on mobile and desktop.

### 2. Audit Specifications Tab Synchronization
- *Decision*: Update the `specs` view in `DataflowDiagramStudio.tsx` to document:
  - Software quality: 278 automated tests passed (224 Jest + 54 Pytest), 0 TypeScript errors, 32 production routes.
  - Edaphic models: Kamprath modificado ($1.5 \times \text{Al}^{3+} \times 100 / \text{PRNT}$), Cal dolomítica (balance Ca:Mg), Yeso agrícola Quíbor ($pH \ge 7.4$).
  - Spatial radar: Sentinel-1 SAR C-Band (5.405 GHz) penetración de nubes.
  - Machinery outputs: ESRI Shapefile VRA UTM 19N, KML, cabin sheet.

### 3. Objective Framing in UI and Documentation
- *Decision*: In `src/app/dashboard/postulacion/page.tsx`:
  - Line 399: `Autoevaluación Anexo II` ➔ `Criterios Oficiales Anexo II`.
  - Line 671: `<span className="badge-pill badge-purple">Evaluación 5/5</span>` ➔ `<span className="badge-pill badge-purple">Baremo Oficial 100%</span>`.
  - Line 674: Remove `autoevaluación`, stating `Presentación de evidencias técnicas y científicas punto por punto frente a los 6 criterios del jurado...`.
- In `README.md` and `docs/SHOWCASE.md`:
  - Standardize on `los 6 criterios oficiales del baremo (Anexo II, 100%)`.

## Risks / Trade-offs

- **[Risk: Mermaid Rendering Glitch]** → *Mitigation*: Ensure all new Mermaid code strings follow valid syntax with quoted node labels when special characters are used.
- **[Risk: Test Regression in Postulación View]** → *Mitigation*: `__tests__/api/security-and-dossier.test.ts` and UI test suites do not check for `Evaluación 5/5`. Run full `npm test` immediately after modifying files.
