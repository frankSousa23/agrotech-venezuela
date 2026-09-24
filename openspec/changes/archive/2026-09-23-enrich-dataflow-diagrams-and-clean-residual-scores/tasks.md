# Tasks

## 1. Purge Residual Self-Scoring and Align Documentation

- [x] 1.1 In `src/app/dashboard/postulacion/page.tsx`, replace `Autoevaluación Anexo II` with `Criterios Oficiales Anexo II`, replace `<span className="badge-pill badge-purple">Evaluación 5/5</span>` with `<span className="badge-pill badge-purple">Baremo Oficial 100%</span>`, and rephrase line 674 to frame it as technical evidence submitted to the jury. Verify via text inspection.
- [x] 1.2 In `README.md` (line 239), update "7 criterios oficiales" to "6 criterios oficiales del baremo (Anexo II, 100%)", and in `docs/SHOWCASE.md` (line 125), replace "Autoevaluación Anexo II ... 7 criterios" with "Matriz de Cumplimiento de Criterios (Anexo II) (Presentación técnica frente a los 6 criterios oficiales del baremo)". Verify via grep search.

## 2. Enrich Architecture Studio Diagrams in `DataflowDiagramStudio.tsx`

- [x] 2.1 Add Diagram 6: **Pipeline Tri-Modal de Prescripciones para Maquinaria & VRA** to `SYSTEM_DIAGRAMS` in `src/components/diagrams/DataflowDiagramStudio.tsx`, detailing the transformation from parcel geometry to ESRI Shapefile VRA UTM 19N WGS84, drone flight KML, and analog 1-page cabin sheet, with step highlights and metrics.
- [x] 2.2 Add Diagram 7: **Ciclo MRV de Carbono (IPCC Tier 2 / Verra VCS) & Oráculo Radar SAR Sentinel-1** to `SYSTEM_DIAGRAMS` in `src/components/diagrams/DataflowDiagramStudio.tsx`, detailing the SAR C-Band all-weather roughness verification ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) in `/api/mrv/sar-oracle` and Carbon Pooling (85/15).
- [x] 2.3 Add Diagram 8: **Gemelo Digital Agro-IoT, Física Saxton-Rawls & Riego Predictivo** to `SYSTEM_DIAGRAMS` in `src/components/diagrams/DataflowDiagramStudio.tsx`, detailing the ESP32 telemetry ingestion (`/api/iot/telemetry`), Saxton-Rawls retention curves, dynamic PAW balance, automated irrigation trigger ($\text{PAW} < 50\%$), and rain forecast suppression via NASA POWER.
- [x] 2.4 Update the "Especificaciones de Auditoría" (`specs`) tab in `src/components/diagrams/DataflowDiagramStudio.tsx` with the consolidated 278 automated tests, 0 TypeScript errors, 32 production routes, Kamprath / dolomita / yeso Quíbor formulas, and radar SAR all-weather penetration.

## 3. Testing and Production Build Verification

- [x] 3.1 Run `npm test` and verify that all 224 Jest tests pass across 33 test suites without regressions.
- [x] 3.2 Run `npm run test:backend` and verify that all 54 Pytest tests pass across 17 backend modules.
- [x] 3.3 Run `npm run typecheck` and `npm run build` to confirm 0 TypeScript errors and 32 clean production routes in Next.js 16 Turbopack.
