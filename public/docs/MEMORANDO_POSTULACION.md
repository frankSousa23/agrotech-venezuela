# 🏛️ Memorando Técnico y Documento de Postulación Institucional
## Agrotech Venezuela: Plataforma WebGIS Edafo-Climática e Inteligencia Artificial Prescriptiva para la Agricultura Sostenible

- **Autor / Desarrollador Principal**: Frank Sousa
- **Ecosistema**: Agrotech Venezuela
- **Nicho Tecnológico**: AgTech, Observación Satelital (WebGIS Multi-Escala), Inteligencia Artificial Generativa & Machine Learning Edafo-Climático.
- **Nivel de Madurez Tecnológica**: **TRL 7** (Sistema integrado y validado en entorno operacional real).
- **Licencia de Código y Datos**: MIT License (Código) / Creative Commons Attribution 4.0 International (CC BY 4.0 - MapBiomas Venezuela).

---

## 🎯 1. Resumen Ejecutivo (Executive Summary)

La agricultura en Venezuela enfrenta una brecha crítica entre la observación científica y la toma de decisiones agronómicas en campo:
1. **Altos costos y demoras de laboratorio tradicional**: Un análisis físico-químico de suelo oscila entre \$80 y \$150 por muestra, con tiempos de respuesta de 3 a 6 semanas y severas barreras logísticas para productores en zonas remotas.
2. **Pérdida masiva de fertilizantes por acidez edáfica**: Suelos tropicales altamente meteorizados con pH inferior a 5.2 (toxicidad por aluminio intercambiable $Al^{3+}$) reducen la absorción de fertilizantes N-P-K hasta en un 45%.
3. **Falta de herramientas prescriptivas accesibles**: Los mapas satelitales convencionales son puramente observacionales y no le indican al agricultor cuánto encalar, qué fórmula fertilizante aplicar o cuál será su rendimiento proyectado.

**Agrotech Venezuela** resuelve esta problemática eliminando la fricción de entrada: mediante la delimitación interactiva de una parcela en mapa satelital o el ingreso de coordenadas GPS, la plataforma genera de manera instantánea un **Gemelo Digital Agronómico** que fusiona **40 años de trayectoria de uso de suelo (MapBiomas Colección 3)**, **reflectancia multiespectral Sentinel-2 (10m)**, **radar SAR Sentinel-1 banda C para penetración de nubes**, **agroclimatología diaria NASA POWER** y un **Agente Agrónomo impulsado por Google Gemini AI**.

---

## 🚀 2. Nivel de Madurez Tecnológica (TRL 7)

El proyecto se encuentra en **TRL 7 (Technology Readiness Level 7)** según la escala estandarizada de la NASA / Unión Europea:

```
TRL 1-3: Investigación Básica / Formulación de Hipótesis (Completado)
TRL 4-5: Validación en Laboratorio / Prototipos Iniciales (Completado)
TRL 6:   Demostración en Entorno Relevante (Completado)
TRL 7:   DEMOSTRACIÓN DE SISTEMA OPERACIONAL INTEGRADO EN ENTORNO REAL (ESTADO ACTUAL)
         • Plataforma WebGIS interactiva en Next.js 16 App Router con Turbopack (28 rutas limpias).
         • Backend espacial de microservicios en FastAPI y Python 3.13 con 39 endpoints OpenAPI.
         • Cobertura territorial completa para los 24 estados y 335 municipios venezolanos.
         • Suite de 197 pruebas automatizadas (145 Jest Frontend/WebGIS + 52 Pytest Backend/ML/IA).
         • Tour Demostrativo interactivo guiado en 5 pasos para auditoría técnica inmediata.
         • Resiliencia offline-first con SQLite WAL e IndexedDB para zonas rurales.
```

---

## 🏗️ 3. Arquitectura del Sistema y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│ 🛰️ FUENTES DE DATOS ESPACIALES & TELEMETRÍA (INGESTA AUTOMATIZADA)     │
│  • MapBiomas Venezuela Col 3 (1985-2024, 30m, 40 años de serie temporal)│
│  • Copernicus Sentinel-2 L2A (10m, bandas ópticas con máscara SCL)     │
│  • Copernicus Sentinel-1 SAR Banda C (Retrodispersión VV/VH radar)     │
│  • NASA POWER API (Radiación Solar MJ/m², Temp Diaria, Precipitación)  │
│  • Red de Nodos IoT In-Situ (ESP32, Sondas VWC y Lab de Micro-Cultivo) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ ⚙️ CAPA DE PROCESAMIENTO ESPACIAL & MACHINE LEARNING (FastAPI/Python) │
│  • Shoelace Geodésico WGS84 para cálculo de área exacta en hectáreas   │
│  • Algoritmo AHP de Aptitud Multivariable para 42 cultivos tropicales  │
│  • Modelo Hidrotérmico GDD (Base 10°C, Techo 30°C) + Balance P - ETc  │
│  • Cuantificador de Carbono Orgánico (SOC) IPCC Tier 2 / Verra VCS     │
│  • Caché Geodésica SQLite en modo WAL (< 5ms de latencia, Offline)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 🧠 AGENTE AGRÓNOMO & IA GENERATIVA (Google Gemini 2.5 Flash)           │
│  • Prescripción de Encalado (Cal Dolomítica CaCO3 + MgCO3)             │
│  • Plan de Fertilización N-P-K según disponibilidad en mercado local   │
│  • Detección de Riesgos Agroclimáticos y Alertas Fitosanitarias        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 📱 PLATAFORMA DE EXPERIENCIA DE USUARIO (Next.js 16 + PWA Glassmorphism)│
│  • WebGIS Multi-Escala (Nivel 1 País ➔ Nivel 2 Municipio ➔ Nivel 3 Lote)│
│  • Cuaderno de Campo Digital & Bitácora con Plantillas Fenológicas     │
│  • Modo Pleno Sol (Alto contraste visual para tablets y luz directa)  │
│  • Exportador GeoJSON estándar para maquinaria con GPS / Autoguiado    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧮 4. Fundamentación Científica y Algoritmos de Precisión

### 4.1 Cálculo de Área Exacta: Shoelace Geodésico sobre Elipsoide WGS84
Para evitar distorsiones proyectivas en regiones tropicales ecuatoriales, el área de parcelas delimitadas se calcula mediante proyección trapezoidal esferoidal geodésica:

$$\text{Área (ha)} = \frac{R^2}{2 \times 10^4} \left| \sum_{i=1}^{n} (\lambda_{i+1} - \lambda_{i-1}) \cdot \sin(\phi_i) \right|$$

Donde $R = 6,378,137\text{ m}$ (radio ecuatorial WGS84), $\phi_i$ representa la latitud y $\lambda_i$ la longitud en radianes.

### 4.2 Penetración de Nubes Tropicales: Radar SAR Sentinel-1 Banda C
Durante el ciclo de lluvias en Venezuela, la cobertura nubosa impide la captura óptica tradicional. Agrotech implementa el análisis de retrodispersión radar dual en decibeles ($\text{dB}$):

$$\sigma^0 (\text{dB}) = 10 \cdot \log_{10} \left( \frac{\text{Digital Number}^2}{A_\sigma} \right)$$

El ratio de polarización cruzada $\text{Ratio} = \sigma_{VH}^0 / \sigma_{VV}^0$ permite estimar la rugosidad superficial y el índice de saturación de humedad en los primeros 5 cm de suelo independientemente de la nubosidad.

### 4.3 Acumulación Térmica y Fenología: Grados Día de Crecimiento (GDD)
El motor de fenología calcula la energía térmica acumulada diariamente para predecir con exactitud el ciclo biológico de los cultivos:

$$\text{GDD} = \max\left( \frac{\min(T_{\max}, T_{\text{upper}}) + \max(T_{\min}, T_{\text{base}})}{2} - T_{\text{base}}, 0 \right)$$

Con parámetros calibrados para el trópico: $T_{\text{base}} = 10.0^\circ\text{C}$ y $T_{\text{upper}} = 30.0^\circ\text{C}$.

### 4.4 Stock y Secuestro de Carbono Orgánico en Suelo (SOC) — IPCC Tier 2
La cuantificación del potencial de créditos de carbono en suelos bajo manejo regenerativo se fundamenta en la metodología IPCC Tier 2 / Verra VCS:

$$\text{SOC}_{\text{stock}} (\text{tC/ha}) = \text{SOC}_{\text{conc}} (\%) \times \text{BD} (\text{g/cm}^3) \times \text{Depth} (\text{cm}) \times (1 - \text{Fragments}) \times 0.1$$

$$\text{Secuestro Anual} (\text{tCO}_2\text{e/ha/año}) = \Delta \text{SOC} \times \frac{44}{12} \times \text{Factor de Manejo Regenerativo}$$

### 4.5 Calibración Edafológica Regional de Enmiendas
El motor de prescripción química geo-diferenciada aplica modelos pedológicos adaptados a las tres grandes problemáticas del suelo venezolano:
1. **Sabanas Orientales y Llanos Ácidos (Monagas, Anzoátegui, Guárico, Portuguesa)**: Neutralización de saturación de aluminio tóxico mediante el modelo Kamprath modificado:
   $$\text{Dosis Cal (t/ha)} = 1.5 \times \text{Al}^{3+} (\text{cmol}_c/\text{kg}) \times \frac{100}{\text{PRNT}}$$
2. **Sur del Lago de Maracaibo (Zulia) y Suelos Lacustres**: Corrección de desbalances Ca:Mg (relación óptima 3:1 a 4:1) prescribiendo Cal Dolomítica rica en magnesio soluble.
3. **Depresión de Quíbor / Lara y Valles Semiáridos (Falcón)**: En suelos alcalinos/salino-sódicos ($pH \ge 7.4$), contraindica estrictamente el carbonato de calcio y prescribe **Yeso Agrícola ($CaSO_4 \cdot 2H_2O$)** a 2.5 t/ha para desplazar el sodio intercambiable sin alcalinizar la solución.

### 4.6 Parser Vernacular Rural y Prescripciones VRA para Maquinaria
1. **Procesamiento de Voz Vernacular Campesina**: Mapeo determinista e insensible a diacríticos de medidas tradicionales a unidades internacionales (1 saco = 50 kg, 1 tambor = 200 L, 1 caneca = 20 L, 1 tablón = 1.0 ha) y clasificación de intenciones directas a la bitácora.
2. **Suite de Prescripción Universal Tri-Modal**:
   - Consolas GPS de Maquinaria Agrícola: Paquetes ESRI Shapefile con atributos VRA (`RATE_LIME`, `RATE_NPK`, `AREA_HA` en UTM 19N WGS84).
   - Drones de Pulverización: Planes de vuelo en KML georreferenciado con perímetros y puntos de recarga.
   - Ficha de Cabina Analógica de 1 Página: Matriz de marchas mecánicas (L2/L3), RPM de motor y apertura de compuerta para tractores sin electrónica.

---

## 📊 5. Matriz de Impacto Social, Económico y Ambiental (ODS)

| Dimensión | Métrica Cuantificable en Campo | Alineación con ODS |
| :--- | :--- | :--- |
| **Democratización Económica** | Reducción de la barrera de diagnóstico de **\$150 a \$0** para pequeños productores. | 🌾 **ODS 1 (Fin de la Pobreza)** |
| **Soberanía y Rendimiento** | Incremento de rendimiento en cereales de **3.5 t/ha a 6.2+ t/ha** en los Llanos. | 🌽 **ODS 2 (Hambre Cero)** |
| **Eficiencia de Nutrientes** | Reducción del **30% al 45% en desperdicio de fertilizantes NPK** por corrección de acidez. | 🧪 **ODS 12 (Producción Responsable)** |
| **Mitigación Climática** | Secuestro de hasta **3.85 tCO2e/ha/año** mediante siembra directa y SAF. | 🌳 **ODS 13 (Acción por el Clima)** |
| **Protección de Bosques** | Protocolo estricto del **Escudo de Conservación del Sur del Orinoco** contra la deforestación. | 🛡️ **ODS 15 (Vida de Ecosistemas Terrestres)** |

---

## 🚜 6. Despliegue en Campo y Resiliencia Rural

1. **Operación Offline-First (Resiliencia PWA)**:
   - Sincronización automática de mutaciones de campo en cola `IndexedDB`.
   - Caché geodésica local SQLite con latencias inferiores a 5 ms.
   - Reconocimiento y normalización vernacular por voz 100% offline.
2. **Interoperabilidad Universal para Maquinaria y Drones**:
   - Descarga de fichas parcelarias y prescripciones en **GeoJSON estándar**, **ESRI Shapefile VRA** para consolas de tractor (John Deere, Case IH, Trimble), **KML de vuelo para drones agrícolas** y **fichas de cabina analógica** imprimibles en 1 página.
3. **Ergonomía de Trabajo Bajo Luz Solar**:
   - Tema visual *"Pleno Sol"* diseñado para legibilidad inmediata en campo bajo radiación solar intensa.

---

## 📚 7. Licenciamiento, Citas Académicas y Atribución

- **Código Fuente**: MIT License (Copyright 2026 Frank Sousa - Agrotech Venezuela).
- **Cobertura Vegetal y Uso de la Tierra**: **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba y RAISG), disponible bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**.
- **Datos Climáticos**: **NASA POWER Project** (Prediction of Worldwide Energy Resources), NASA Langley Research Center.
- **Modelos de Enmienda Edafológica**: Guías técnicas del **INIA**, **Fundación Danac** y **CENIAP** para suelos venezolanos.
