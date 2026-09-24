# 🧭 Guía Rápida de Auditoría para Evaluadores y Jurados
## Segunda Edición del Premio MapBiomas Venezuela 2026 🌾🛰️

Esta guía proporciona a los miembros del comité técnico evaluador y jurados del **Premio MapBiomas Venezuela 2026** una hoja de ruta estructurada y verificable para auditar de forma inmediata cada uno de los criterios oficiales de evaluación, mapeándolos directamente contra el **código fuente**, las **ecuaciones matemáticas**, las **rutas de API** y las **pruebas automatizadas** del repositorio.

---

## 📑 Índice de Navegación por Criterio Oficial

| Criterio Oficial del Premio | Ponderación | Archivos Principales | Pruebas Automatizadas | Enlace Rápido |
| :--- | :---: | :--- | :--- | :---: |
| **1. Complejidad Técnica** | **20%** | WebGIS, SAR, Shoelace, Saxton-Rawls | `spatial.test.ts`, `sarRadarService.test.ts`, `test_spatial_engine.py` | [Auditar](#1-complejidad-técnica-ponderación-20) |
| **2. Originalidad e Innovación** | **20%** | Prescripción Química, Travesía 40 Años, Carbon Pooling | `soilRecommendations.test.ts`, `CarbonCreditsCalculator.test.ts` | [Auditar](#2-originalidad-e-innovación-metodológica-ponderación-20) |
| **3. Claridad y Rigor de Presentación** | **15%** | Next.js 16, 32 Rutas, OpenAPI 3.0, KaTeX | `routing.test.ts`, `security-and-dossier.test.ts` | [Auditar](#3-claridad-estructura-y-presentación-ponderación-15) |
| **4. Resultados y Modelado Operativo** | **20%** | Escenarios Turén / Calabozo, ROI Desacoplado | `roiCostEngine.test.ts`, `ImpactRoiWidget.test.ts` | [Auditar](#4-resultados-modelado-operativo-y-conclusiones-ponderación-20) |
| **5. Aporte Social e Inclusión Rural** | **20%** | Modo Productor Fácil, Voz Web Speech, Glosario | `vernacularParser.test.ts`, `fieldDiary.test.ts`, `offlineSync.test.ts` | [Auditar](#5-aporte-social-viabilidad-e-inclusión-rural-ponderación-20) |
| **6. Aporte a MapBiomas Venezuela** | **5%** | Operacionalización Colección 3.0, Salida Maquinaria | `machineryExport.test.ts`, `test_main.py` | [Auditar](#6-aporte-directo-a-mapbiomas-venezuela-ponderación-5) |
| **7. Rigor Científico y Reproducibilidad** | **10%** | Suite de 278 Tests (100% OK), Licencia MIT, CC BY 4.0 | `npm run test:all`, `npm run typecheck`, `npm run build` | [Auditar](#7-rigor-científico-y-reproducibilidad-ponderación-10) |

---

## 1. Complejidad Técnica (Ponderación: 20%)

### 🔬 Fundamentos y Algoritmos Implementados:
1. **Cálculo de Área Esferoidal Shoelace WGS84**: Proyección geodésica sobre el elipsoide $R = 6.378.137\text{ m}$ que neutraliza la distorsión de áreas en latitudes tropicales:
   - Archivo fuente: [`src/lib/geo/spatialUtils.ts`](../src/lib/geo/spatialUtils.ts)
   - Test suite: [`__tests__/geo/spatial.test.ts`](../__tests__/geo/spatial.test.ts)
2. **Penetración de Nubes con Radar SAR Sentinel-1 Banda C (5.405 GHz)**: Estimación de saturación superficial de humedad mediante retrodispersión dual $\sigma^\circ_{VV}$ y $\sigma^\circ_{VH}$ en decibelios (dB), inmune a la nubosidad del invierno venezolano:
   - Archivo fuente: [`src/lib/geo/sarRadarService.ts`](../src/lib/geo/sarRadarService.ts) y [`backend/src/sar_service.py`](../backend/src/sar_service.py)
   - Test suite: [`__tests__/geo/sarRadarService.test.ts`](../__tests__/geo/sarRadarService.test.ts) y [`backend/tests/test_sar_service.py`](../backend/tests/test_sar_service.py)
3. **Pedocalibración Dinámica Edafológica Saxton-Rawls & Balance PAW**:
   - Modelado de curva de retención hídrica para texturas Arenosa ($\theta_{crit}=9\%$), Franca ($\theta_{crit}=20\%$) y Arcillosa ($\theta_{crit}=35\%$):
   - Archivo fuente: [`src/lib/agronomy/pedotransfer.ts`](../src/lib/agronomy/pedotransfer.ts) y [`backend/src/pedotransfer.py`](../backend/src/pedotransfer.py)
   - Ruta API: [`src/app/api/iot/telemetry/route.ts`](../src/app/api/iot/telemetry/route.ts)
   - Test suite: [`__tests__/agronomy/pedotransfer.test.ts`](../__tests__/agronomy/pedotransfer.test.ts) y [`backend/tests/test_pedotransfer.py`](../backend/tests/test_pedotransfer.py)
4. **Motor Hidrotérmico GDD y Evapotranspiración ($P - ET_c$)**:
   - Acoplamiento bioclimático NASA POWER con base térmica $10.0^\circ\text{C}$ y techo $30.0^\circ\text{C}$:
   - Archivo fuente: [`src/lib/geo/hydroThermalEngine.ts`](../src/lib/geo/hydroThermalEngine.ts)
   - Test suite: [`__tests__/geo/hydroThermalEngine.test.ts`](../__tests__/geo/hydroThermalEngine.test.ts)
5. **Oráculo Satelital Radar SAR para Certificación MRV**:
   - Verificación de rugosidad de dosel ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) para reducir el factor de descuento por incertidumbre Verra VCS del 40% al 10%:
   - Ruta API: [`src/app/api/mrv/sar-oracle/route.ts`](../src/app/api/mrv/sar-oracle/route.ts) y [`backend/src/sar_oracle.py`](../backend/src/sar_oracle.py)
   - Test suite: [`__tests__/api/mrvSarOracle.test.ts`](../__tests__/api/mrvSarOracle.test.ts) y [`backend/tests/test_sar_oracle.py`](../backend/tests/test_sar_oracle.py)

---

## 2. Originalidad e Innovación Metodológica (Ponderación: 20%)

### 💡 Elementos Inéditos en el Ecosistema Nacional:
1. **De la Observación Cartográfica Pasiva a la Prescripción Química Activa**:
   - Conversión de 40 años de datos de cobertura MapBiomas (Colección 3.0) en requerimientos exactos de enmienda de suelo:
     - *Modelo Kamprath modificado* para sabanas ácidas: $\text{Dosis Cal} = 1.5 \times Al^{3+} \times 100 / \text{PRNT}$.
     - *Balance Calcio:Magnesio (3:1 a 4:1)* para Sur del Lago con cal dolomítica garantizada ($MgO > 15\%$).
     - *Yeso Agrícola ($CaSO_4 \cdot 2H_2O$)* a 2.5 t/ha para suelos salino-sódicos en Quíbor ($pH \ge 7.4$), prohibiendo explícitamente el uso de cal.
   - Archivo fuente: [`src/lib/agronomy/soilRecommendations.ts`](../src/lib/agronomy/soilRecommendations.ts)
   - Test suite: [`__tests__/agronomy/soilRecommendations.test.ts`](../__tests__/agronomy/soilRecommendations.test.ts)
2. **Arquitectura Dual-Mode UI (Inclusión Rural Radical)**:
   - Conmutación en 1 toque entre *Modo Productor Fácil* (diseñado para uso con luz solar directa y dedos en el campo) y *Modo Técnico* para ingenieros y científicos:
   - Archivo fuente: [`src/context/UIModeContext.tsx`](../src/context/UIModeContext.tsx) y [`src/components/layout/FarmerModeToggle.tsx`](../src/components/layout/FarmerModeToggle.tsx)
3. **Prescripción Tri-Modal para Maquinaria**:
   - Generación en 1 clic de paquetes ESRI Shapefile con atributos de Tasa Variable (VRA: `RATE_LIME`, `RATE_NPK`, `AREA_HA` en UTM 19N WGS84) para tractores GPS, archivos KML para drones de fumigación y fichas analógicas de cabina:
   - Archivo fuente: [`src/lib/agronomy/machineryPrescription.ts`](../src/lib/agronomy/machineryPrescription.ts)
   - Test suite: [`__tests__/agronomy/machineryExport.test.ts`](../__tests__/agronomy/machineryExport.test.ts)

---

## 3. Claridad, Estructura y Presentación (Ponderación: 15%)

### 🏛️ Arquitectura Limpia y Rendimiento WebGIS:
1. **Next.js 16 App Router con Turbopack**:
   - 32 rutas de producción generadas de forma limpia (0 warnings de compilación).
   - Test suite de enrutamiento: [`__tests__/routing/routes.test.ts`](../__tests__/routing/routes.test.ts)
2. **Ciclo de Vida Leaflet Seguro**:
   - Implementación pura con Leaflet nativo (`L.map`) encapsulado en `useRef` para prevenir fugas de memoria y pantallas blancas en React 19:
   - Archivo fuente: [`src/components/maps/VenezuelaStateMapInner.tsx`](../src/components/maps/VenezuelaStateMapInner.tsx)
3. **Documentación de APIs bajo OpenAPI / Swagger 3.0**:
   - Especificación completa accesible en `/docs` del backend FastAPI (`backend/src/main.py`).
4. **Formulación Matemática en Vivo**:
   - Ecuaciones renderizadas en KaTeX con tipografía legible en modo oscuro y modo claro.

---

## 4. Resultados, Modelado Operativo y Conclusiones (Ponderación: 20%)

### 📊 Desacoplamiento Financiero y Validación Agronómica:
1. **Motor de Costeo Operativo & ROI Desacoplado**:
   - Desacoplamiento estricto entre el **Flujo de Caja Real en Finca** (ahorro inmediato en fertilizantes N-P-K, jornales manuales, rendimiento de cosecha y bombeo) y los **Mercados Voluntarios de Carbono** (etiquetados explícitamente como `SIMULACIÓN PROSPECTIVA / NO SUMADO AL FLUJO OPERATIVO`):
   - Archivo fuente: [`src/lib/finance/roiCostEngine.ts`](../src/lib/finance/roiCostEngine.ts)
   - Componente UI: [`src/components/agronomy/ImpactRoiWidget.tsx`](../src/components/agronomy/ImpactRoiWidget.tsx)
   - Test suites: [`__tests__/finance/roiCostEngine.test.ts`](../__tests__/finance/roiCostEngine.test.ts) y [`__tests__/agronomy/ImpactRoiWidget.test.ts`](../__tests__/agronomy/ImpactRoiWidget.test.ts)
2. **Escenarios Agrícolas Emblemáticos en 1 Clic**:
   - *Turén (Portuguesa)*: Granero cerealero (Maíz blanco), corrección de piso de arado de pastura previa y balance N-P-K.
   - *Sur del Lago (Zulia)*: Cacao fino de aroma y plátano, encalado dolomítico y manejo de alta humedad aluvial.
   - *Valle de Quíbor (Lara)*: Horticultura semiárida (Cebolla/Pimentón), microrriego y enmienda con yeso agrícola para desalinizasión.
   - *Páramo de Mérida*: Papa criolla en ladera, terrazas de conservación y balance térmico por altitud.
3. **Resolución Determinista de Conflictos Offline**:
   - Versionado monotónico y cuarentena en `/api/parcels/conflicts` para resolver colisiones concurrentes en campo:
   - Archivo fuente: [`src/app/api/parcels/conflicts/route.ts`](../src/app/api/parcels/conflicts/route.ts)
   - Test suite: [`__tests__/api/parcelConflicts.test.ts`](../__tests__/api/parcelConflicts.test.ts)

---

## 5. Aporte Social, Viabilidad e Inclusión Rural (Ponderación: 20%)

### 🤝 Democratización y Accesibilidad Campesina:
1. **Las 4 Puertas Táctiles de Campo**:
   - Diseñadas para agricultores con poca alfabetización digital o bajo condiciones de campo (guantes, polvo, luz solar intensa):
   - Puerta 1 (Diagnóstico edáfico), Puerta 2 (Clima y nubes SAR), Puerta 3 (Medición de potreros), Puerta 4 (Bitácora de labores).
2. **Dictado por Voz Vernacular (Web Speech API)**:
   - Normalización offline de expresiones coloquiales campesinas venezolanas:
     - 1 saco = 50 kg | 1 tablón = 1.0 ha | 1 tambor = 200 L | 1 caneca = 20 L | 1 garrafa = 5 L.
   - Archivo fuente: [`src/lib/agronomy/vernacularParser.ts`](../src/lib/agronomy/vernacularParser.ts)
   - Test suite: [`__tests__/agronomy/vernacularParser.test.ts`](../__tests__/agronomy/vernacularParser.test.ts)
3. **Resiliencia Rural Offline & Tolerancia a Cortes Eléctricos**:
   - Almacenamiento local automático en IndexedDB y SQLite WAL geodésico con latencia $< 25\text{ ms}$.
   - Protocolo QoS de sincronización en 2 canales para redes rurales 2G/EDGE:
   - Archivos fuente: [`src/lib/offline/offlineSync.ts`](../src/lib/offline/offlineSync.ts) y [`src/components/layout/ConnectivityStatusBadge.tsx`](../src/components/layout/ConnectivityStatusBadge.tsx)
   - Test suite: [`__tests__/offline/offlineSync.test.ts`](../__tests__/offline/offlineSync.test.ts)

---

## 6. Aporte Directo a MapBiomas Venezuela (Ponderación: 5%)

### 🛰️ Operacionalización Productiva de Colección 3.0 (1985–2024):
1. **Valor Agregado al Dato Satelital**:
   - Demuestra a la comunidad científica y a los tomadores de decisiones que los 40 años de series históricas de MapBiomas no solo sirven para monitoreo macro-ecológico, sino para **decisiones agronómicas microeconómicas directas en la cabina del tractor**.
2. **Retroalimentación de Verdad de Terreno (Ground Truth)**:
   - El productor valida en campo si la clasificación satelital coincide con la realidad de su tablón a través del Cuaderno de Campo.
3. **Cita y Atribución Rigurosa**:
   - Reconocimiento explícito a la Red MapBiomas Venezuela (Provita, LSIGMA USB, Wataniba y RAISG) bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)** en interfaces, mapas y documentación.

---

## 7. Rigor Científico y Reproducibilidad (Ponderación: 10%)

### 🧪 Verificación Automatizada Inmediata (278 Tests):

Cualquier evaluador puede ejecutar los siguientes comandos para verificar la suite completa de pruebas:

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

Para leer los documentos oficiales del expediente directamente en el visor nativo de GitHub:

- 📄 [Artículo Técnico Oficial (Arquitectura & Algoritmos)](mapbiomas_premio_2026/Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf)
- 📋 [Matriz Oficial de Cumplimiento de Evaluación (Anexo II)](mapbiomas_premio_2026/Matriz_Cumplimiento_Evaluacion_2026.pdf)
- 📑 [Expediente de Postulación Consolidado](mapbiomas_premio_2026/Postulacion_Expediente_Premio_2026.pdf)
- 📌 [Memorando de Postulación Oficial](mapbiomas_premio_2026/Memorando_Postulacion_Agrotech_2026.pdf)
- 📊 [Pitch Deck Ejecutivo de Presentación](mapbiomas_premio_2026/Pitch_Deck_Agrotech_Venezuela_2026.pdf)
- 📖 [Guía del Postulante & Metodología](mapbiomas_premio_2026/Guia_Postulacion_MapBiomas_2026.pdf)
- ✍️ [Anexo I — Declaración Jurada de Autoría y Licenciamiento](mapbiomas_premio_2026/Anexo_I_Declaracion_Jurada_Frank_Sousa.pdf)

---
*Agrotech Venezuela — Frank Alfonso Sousa Mota (UNERG 2025) — Septiembre de 2026.*
