# 🧭 Guía Rápida de Auditoría para Evaluadores y Jurados
## Segunda Edición del Premio MapBiomas Venezuela 2026 🌾🛰️

Esta guía proporciona a los miembros del comité técnico evaluador y jurados del **Premio MapBiomas Venezuela 2026** una hoja de ruta estructurada, neutral y verificable para auditar directamente cada uno de los criterios oficiales de evaluación, mapeándolos con total transparencia contra el **código fuente**, las **ecuaciones matemáticas**, las **rutas de API** y las **pruebas automatizadas** del repositorio.

> **Nota de Respeto Institucional al Jurado:**  
> Las ponderaciones corresponden fielmente al baremo oficial de la convocatoria (**Anexo II — Categoría General**). Este documento no asigna calificaciones previas ni autoevaluaciones cuantitativas: su propósito es someter a la soberana consideración de los evaluadores las evidencias técnicas, científicas y empíricas que demuestran el funcionamiento integral del sistema.

---

## 📑 Índice de Navegación por Criterio Oficial (Bases Anexo II)

| Criterio Oficial del Premio | Ponderación | Componentes Técnicos Sometidos a Evaluación | Pruebas Automatizadas Verificables | Enlace Directo |
| :--- | :---: | :--- | :--- | :---: |
| **1. Complejidad Técnica** | **20%** | WebGIS 3 Niveles, Radar SAR Banda C, Shoelace WGS84, Saxton-Rawls, Oráculo MRV | `spatial.test.ts`, `pedotransfer.test.ts`, `test_risk_and_carbon.py` | [Auditar](#1-complejidad-técnica-ponderación-20) |
| **2. Originalidad e Innovación** | **20%** | De Observación a Prescripción Química (Kamprath/Dolomita/Yeso), Dual-Mode UI, Maquinaria VRA | `soils.test.ts`, `recomendaciones.test.ts`, `machinery-exporter.test.ts` | [Auditar](#2-originalidad-e-innovación-metodológica-ponderación-20) |
| **3. Claridad y Estructura** | **15%** | Next.js 16 Turbopack (32 rutas), Tour Demo Interactivo, OpenAPI 3.0, KaTeX | `routing-and-redirects.test.ts`, `security-and-dossier.test.ts` | [Auditar](#3-claridad-estructura-y-presentación-ponderación-15) |
| **4. Resultados, Discusión y Conclusiones** | **20%** | Escenarios Turén / Calabozo, Costeo ROI Desacoplado, Cuarentena HTTP 409 | `roiCostEngine.test.ts`, `ImpactRoiWidget.test.ts`, `parcels-conflict.test.ts` | [Auditar](#4-resultados-discusión-y-conclusiones-ponderación-20) |
| **5. Aporte General y Social** | **20%** | Modo Productor Fácil (4 Puertas), Voz Web Speech Nativa, Parser Vernáculo, Resiliencia 2G | `vernacular-parser.test.ts`, `farmer-ux-and-intentions.test.ts`, `parcels-and-diary.test.ts` | [Auditar](#5-aporte-general-y-social-inclusión-rural-ponderación-20) |
| **6. Aporte a MapBiomas Venezuela** | **5%** | Operacionalización de Colección 3.0 (1985–2024) para Maquinaria y Validación de Campo | `mapbiomas-discrepancy-and-pedagogy.test.ts`, `test_mapbiomas_discrepancy.py` | [Auditar](#6-aporte-directo-a-mapbiomas-venezuela-ponderación-5) |
| **Total Ponderado Oficial** | **100%** | **Sustentado en 278 Pruebas Automatizadas (224 Jest + 54 Pytest) y Licencia MIT** | `npm run test:all` | [Verificación](#7-rigor-científico-testing-y-reproducibilidad-experimental) |

---

## 1. Complejidad Técnica (Ponderación: 20%)

### 🔬 Fundamentos y Algoritmos Implementados:
1. **Cálculo de Área Esferoidal Shoelace WGS84**: Proyección geodésica sobre el elipsoide $R = 6.378.137\text{ m}$ que neutraliza la distorsión de áreas en latitudes tropicales:
   - Archivo fuente: [`src/lib/geo/spatialUtils.ts`](../src/lib/geo/spatialUtils.ts)
   - Test suite verificable: [`__tests__/api/spatial.test.ts`](../__tests__/api/spatial.test.ts)
2. **Penetración de Nubes con Radar SAR Sentinel-1 Banda C (5.405 GHz)**: Estimación de saturación superficial de humedad mediante retrodispersión dual $\sigma^\circ_{VV}$ y $\sigma^\circ_{VH}$ en decibelios (dB), inmune a la nubosidad del invierno venezolano:
   - Archivos fuente: [`src/lib/geo/sarRadarService.ts`](../src/lib/geo/sarRadarService.ts) y [`backend/src/risk_and_carbon_engine.py`](../backend/src/risk_and_carbon_engine.py)
   - Test suites: [`__tests__/api/comprehensive-audit.test.ts`](../__tests__/api/comprehensive-audit.test.ts) y [`backend/tests/test_risk_and_carbon.py`](../backend/tests/test_risk_and_carbon.py)
3. **Pedocalibración Dinámica Edafológica Saxton-Rawls & Balance PAW**:
   - Modelado de curva de retención hídrica para texturas Arenosa ($\theta_{crit}=9\%$), Franca ($\theta_{crit}=20\%$) y Arcillosa ($\theta_{crit}=35\%$):
   - Archivos fuente: [`src/lib/agronomy/pedotransferEngine.ts`](../src/lib/agronomy/pedotransferEngine.ts) y [`backend/src/ml_feature_engine.py`](../backend/src/ml_feature_engine.py)
   - Ruta API: [`src/app/api/iot/telemetry/route.ts`](../src/app/api/iot/telemetry/route.ts)
   - Test suites: [`__tests__/agronomy/pedotransfer.test.ts`](../__tests__/agronomy/pedotransfer.test.ts) y [`backend/tests/test_ml_feature_engine.py`](../backend/tests/test_ml_feature_engine.py)
4. **Motor Hidrotérmico GDD y Evapotranspiración ($P - ET_c$)**:
   - Acoplamiento bioclimático NASA POWER con base térmica $10.0^\circ\text{C}$ y techo $30.0^\circ\text{C}$:
   - Archivo fuente: [`src/lib/geo/hydroThermalEngine.ts`](../src/lib/geo/hydroThermalEngine.ts)
   - Test suite: [`__tests__/agronomy/pedotransfer.test.ts`](../__tests__/agronomy/pedotransfer.test.ts)
5. **Oráculo Satelital Radar SAR para Certificación MRV**:
   - Verificación de rugosidad de dosel ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) para reducir la incertidumbre metodológica Verra VCS del 40% al 10%:
   - Ruta API: [`src/app/api/mrv/sar-oracle/route.ts`](../src/app/api/mrv/sar-oracle/route.ts) y [`backend/src/risk_and_carbon_engine.py`](../backend/src/risk_and_carbon_engine.py)
   - Test suites: [`__tests__/agronomy/carbon-groundtruth.test.ts`](../__tests__/agronomy/carbon-groundtruth.test.ts) y [`backend/tests/test_risk_and_carbon.py`](../backend/tests/test_risk_and_carbon.py)

---

## 2. Originalidad e Innovación Metodológica (Ponderación: 20%)

### 💡 Elementos Inéditos en el Ecosistema Nacional:
1. **De la Observación Cartográfica Pasiva a la Prescripción Química Activa**:
   - Conversión de 40 años de datos de cobertura MapBiomas (Colección 3.0) en requerimientos exactos de enmienda de suelo:
     - *Modelo Kamprath modificado* para sabanas ácidas: $\text{Dosis Cal} = 1.5 \times Al^{3+} \times 100 / \text{PRNT}$.
     - *Balance Calcio:Magnesio (3:1 a 4:1)* para Sur del Lago con cal dolomítica garantizada ($MgO > 15\%$).
     - *Yeso Agrícola ($CaSO_4 \cdot 2H_2O$)* a 2.5 t/ha para suelos salino-sódicos en Quíbor ($pH \ge 7.4$), prohibiendo explícitamente el uso de cal.
   - Archivo fuente: [`src/lib/geo/spatialUtils.ts`](../src/lib/geo/spatialUtils.ts) (sección edafológica regional)
   - Test suites: [`__tests__/api/soils.test.ts`](../__tests__/api/soils.test.ts) y [`__tests__/api/recomendaciones.test.ts`](../__tests__/api/recomendaciones.test.ts)
2. **Arquitectura Dual-Mode UI (Inclusión Rural Radical)**:
   - Conmutación en 1 toque entre *Modo Productor Fácil* (diseñado para uso con luz solar directa y dedos en el campo) y *Modo Técnico* para ingenieros y científicos:
   - Archivos fuente: [`src/lib/context/UIModeContext.tsx`](../src/lib/context/UIModeContext.tsx) y [`src/components/layout/FarmerModeToggle.tsx`](../src/components/layout/FarmerModeToggle.tsx)
   - Test suite: [`__tests__/api/farmer-ux-and-intentions.test.ts`](../__tests__/api/farmer-ux-and-intentions.test.ts)
3. **Prescripción Tri-Modal para Maquinaria**:
   - Generación en 1 clic de paquetes ESRI Shapefile con atributos de Tasa Variable (VRA: `RATE_LIME`, `RATE_NPK`, `AREA_HA` en UTM 19N WGS84) para tractores GPS, archivos KML para drones de fumigación y fichas analógicas de cabina:
   - Archivo fuente: [`src/lib/geo/machineryExporter.ts`](../src/lib/geo/machineryExporter.ts)
   - Test suite: [`__tests__/api/machinery-exporter.test.ts`](../__tests__/api/machinery-exporter.test.ts)
4. **Modelo de Agregación Regional (Carbon Pooling)**:
   - Digitalización conceptual para agrupar pequeños predios (<50 ha) y hacer viable la certificación de carbono Verra VCS distribuyendo el 85% del dividendo al productor.

---

## 3. Claridad, Estructura y Presentación (Ponderación: 15%)

### 🏛️ Arquitectura Limpia y Rendimiento WebGIS:
1. **Next.js 16 App Router con Turbopack**:
   - 32 rutas de producción generadas de forma limpia (0 warnings de compilación).
   - Test suite de enrutamiento: [`__tests__/api/routing-and-redirects.test.ts`](../__tests__/api/routing-and-redirects.test.ts)
2. **Ciclo de Vida Leaflet Seguro**:
   - Implementación pura con Leaflet nativo (`L.map`) encapsulado en `useRef` para prevenir fugas de memoria y pantallas blancas en React 19:
   - Archivo fuente: [`src/components/maps/VenezuelaStateMapInner.tsx`](../src/components/maps/VenezuelaStateMapInner.tsx)
   - Test suite: [`__tests__/api/native-gis-lifecycle.test.ts`](../__tests__/api/native-gis-lifecycle.test.ts)
3. **Documentación de APIs bajo OpenAPI / Swagger 3.0**:
   - Especificación completa accesible en `/docs` del backend FastAPI (`backend/src/main.py`) y visor interno en `/api-docs`.
4. **Formulación Matemática en Vivo**:
   - Ecuaciones renderizadas en KaTeX con tipografía legible tanto en modo oscuro como en modo alto contraste solar.

---

## 4. Resultados, Discusión y Conclusiones (Ponderación: 20%)

### 📊 Desacoplamiento Financiero y Validación Agronómica:
1. **Motor de Costeo Operativo & ROI Desacoplado**:
   - Desacoplamiento estricto entre el **Flujo de Caja Real en Finca** (ahorro inmediato en fertilizantes N-P-K, jornales manuales, rendimiento de cosecha y bombeo) y los **Mercados Voluntarios de Carbono** (etiquetados explícitamente como `SIMULACIÓN PROSPECTIVA / NO SUMADO AL FLUJO OPERATIVO`):
   - Archivo fuente: [`src/lib/agronomy/roiCostEngine.ts`](../src/lib/agronomy/roiCostEngine.ts)
   - Componente UI: [`src/components/agronomy/ImpactRoiWidget.tsx`](../src/components/agronomy/ImpactRoiWidget.tsx)
   - Test suites: [`__tests__/agronomy/roiCostEngine.test.ts`](../__tests__/agronomy/roiCostEngine.test.ts) y [`__tests__/agronomy/ImpactRoiWidget.test.ts`](../__tests__/agronomy/ImpactRoiWidget.test.ts)
2. **Escenarios Agrícolas Emblemáticos en 1 Clic**:
   - *Turén (Portuguesa)*: Granero cerealero (Maíz blanco), corrección de piso de arado de pastura previa y balance N-P-K.
   - *Sur del Lago (Zulia)*: Cacao fino de aroma y plátano, encalado dolomítico y manejo de alta humedad aluvial.
   - *Valle de Quíbor (Lara)*: Horticultura semiárida (Cebolla/Pimentón), microrriego y enmienda con yeso agrícola para desalinizasión.
   - *Páramo de Mérida*: Papa criolla en ladera, terrazas de conservación y balance térmico por altitud.
3. **Resolución Determinista de Conflictos Offline**:
   - Versionado monotónico y cuarentena en `/api/parcels/conflicts` para resolver colisiones concurrentes en campo:
   - Archivo fuente: [`src/app/api/parcels/conflicts/route.ts`](../src/app/api/parcels/conflicts/route.ts)
   - Componente modal: [`src/components/gis/ParcelConflictModal.tsx`](../src/components/gis/ParcelConflictModal.tsx)
   - Test suites: [`__tests__/api/parcels-conflict.test.ts`](../__tests__/api/parcels-conflict.test.ts) y [`__tests__/api/parcel-conflict-modal.test.ts`](../__tests__/api/parcel-conflict-modal.test.ts)

---

## 5. Aporte General y Social (Inclusión Rural) (Ponderación: 20%)

### 🤝 Democratización y Accesibilidad Campesina:
1. **Las 4 Puertas Táctiles de Campo**:
   - Diseñadas para agricultores con poca alfabetización digital o bajo condiciones de campo (guantes, polvo, luz solar intensa):
   - Puerta 1 (Diagnóstico edáfico), Puerta 2 (Clima y nubes SAR), Puerta 3 (Medición de potreros), Puerta 4 (Bitácora de labores).
   - Test suite: [`__tests__/api/farmer-ux-and-intentions.test.ts`](../__tests__/api/farmer-ux-and-intentions.test.ts)
2. **Dictado por Voz Vernacular (Web Speech API)**:
   - Normalización offline de expresiones coloquiales campesinas venezolanas:
     - 1 saco = 50 kg | 1 tablón = 1.0 ha | 1 tambor = 200 L | 1 caneca = 20 L | 1 garrafa = 5 L.
   - Archivo fuente: [`src/lib/farmer/vernacularParser.ts`](../src/lib/farmer/vernacularParser.ts)
   - Test suite: [`__tests__/api/vernacular-parser.test.ts`](../__tests__/api/vernacular-parser.test.ts)
3. **Resiliencia Rural Offline & Tolerancia a Cortes Eléctricos**:
   - Almacenamiento local automático en IndexedDB y SQLite WAL geodésico con latencia $< 25\text{ ms}$.
   - Protocolo QoS de sincronización en 2 canales para redes rurales 2G/EDGE:
   - Archivos fuente: [`src/lib/diary/fieldDiaryStorage.ts`](../src/lib/diary/fieldDiaryStorage.ts) y [`src/components/layout/ConnectivityStatusBadge.tsx`](../src/components/layout/ConnectivityStatusBadge.tsx)
   - Test suite: [`__tests__/api/parcels-and-diary.test.ts`](../__tests__/api/parcels-and-diary.test.ts)

---

## 6. Aporte Directo a MapBiomas Venezuela (Ponderación: 5%)

### 🛰️ Operacionalización Productiva de Colección 3.0 (1985–2024):
1. **Valor Agregado al Dato Satelital**:
   - Demuestra que los 40 años de series históricas de MapBiomas no solo sirven para monitoreo macro-ecológico, sino para **decisiones agronómicas microeconómicas directas en la cabina del tractor**.
   - Archivo fuente: [`src/lib/geo/mapbiomasTrajectory.ts`](../src/lib/geo/mapbiomasTrajectory.ts) y [`backend/src/mapbiomas_analyzer.py`](../backend/src/mapbiomas_analyzer.py)
   - Test suite: [`__tests__/api/mapbiomas-discrepancy-and-pedagogy.test.ts`](../__tests__/api/mapbiomas-discrepancy-and-pedagogy.test.ts) y [`backend/tests/test_mapbiomas_discrepancy.py`](../backend/tests/test_mapbiomas_discrepancy.py)
2. **Retroalimentación de Verdad de Terreno (Ground Truth)**:
   - El productor valida en campo si la clasificación satelital coincide con la realidad de su tablón a través del Cuaderno de Campo.
3. **Cita y Atribución Rigurosa**:
   - Reconocimiento explícito a la Red MapBiomas Venezuela (Provita, LSIGMA USB, Wataniba y RAISG) bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)** en interfaces, mapas y documentación.

---

## 7. Rigor Científico, Testing y Reproducibilidad Experimental

### 🧪 Verificación Automatizada Inmediata (278 Tests Pasando al 100%):

La solidez técnica del proyecto no se fundamenta en afirmaciones declarativas, sino en una **batería de pruebas automatizadas reproducibles** que cualquier miembro del jurado puede ejecutar localmente tras clonar el repositorio:

```bash
# 1. Ejecutar las 224 pruebas unitarias y de integración de Frontend (Jest)
npm test

# 2. Generar el reporte categorizado por subsistemas
npm run test:summary

# 3. Ejecutar las 54 pruebas de Backend Espacial, ML, Saxton-Rawls y Oráculo SAR (Pytest)
npm run test:backend

# 4. Verificación de Tipos TypeScript (0 errores obligatorios)
npm run typecheck

# 5. Compilación de Producción Next.js 16 Turbopack (32 rutas limpias)
npm run build
```

---

## 📚 Enlaces a Documentos del Expediente Compilado (Visualización en 1 Clic)

Para leer los documentos oficiales del expediente directamente en el visor nativo de GitHub sin descargas adicionales:

- 📄 [Artículo Técnico Oficial (Arquitectura & Algoritmos)](mapbiomas_premio_2026/Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf)
- 📋 [Matriz Oficial de Cumplimiento de Evaluación (Anexo II)](mapbiomas_premio_2026/Matriz_Cumplimiento_Evaluacion_2026.pdf)
- 📑 [Expediente de Postulación Consolidado](mapbiomas_premio_2026/Postulacion_Expediente_Premio_2026.pdf)
- 📌 [Memorando de Postulación Oficial](mapbiomas_premio_2026/Memorando_Postulacion_Agrotech_2026.pdf)
- 📊 [Pitch Deck Ejecutivo de Presentación](mapbiomas_premio_2026/Pitch_Deck_Agrotech_Venezuela_2026.pdf)
- 📖 [Guía del Postulante & Metodología](mapbiomas_premio_2026/Guia_Postulacion_MapBiomas_2026.pdf)
- ✍️ [Anexo I — Declaración Jurada de Autoría y Licenciamiento](mapbiomas_premio_2026/Anexo_I_Declaracion_Jurada_Frank_Sousa.pdf)

---
*Agrotech Venezuela — Frank Alfonso Sousa Mota (UNERG 2025) — Septiembre de 2026.*
