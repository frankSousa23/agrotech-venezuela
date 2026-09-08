# 🌾 Agrotech Venezuela: Plataforma WebGIS y Gemelo Digital de Software Libre para la Integración de Series Históricas de MapBiomas (1985–2024) y Teledetección Satelital en la Prescripción Agrícola
### *Artículo Técnico — Prototipo Funcional de Software (TRL 4), Modelado Computacional y Accesibilidad Rural*

**Autor Principal y Desarrollador**: Ing. Frank Alfonso Sousa Mota¹  
**Afiliación Institucional**: ¹ Ingeniero en Informática (2025), Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos (UNERG), San Juan de los Morros, Estado Guárico, Venezuela  
**Contacto Institucional**: [frankalfonso1988@gmail.com](mailto:frankalfonso1988@gmail.com) | LinkedIn: [frank-alfonso-sousa-mota-32ba9971](https://linkedin.com/in/frank-alfonso-sousa-mota-32ba9971) | GitHub: [@frankSousa23](https://github.com/frankSousa23)  
**Convocatoria**: Segunda Edición del Premio MapBiomas Venezuela 2026  
**Categoría de Postulación**: **Categoría General** (Software Libre, Plataformas Espaciales e Innovación Tecnológica)  
**Formato Documental**: **Artículo Técnico**  
**Nivel de Madurez Tecnológica**: **TRL 4** (Prototipo Funcional de Software Validado en Entorno de Desarrollo y Simulación Local)  
**Repositorio Oficial de Código Abierto**: [https://github.com/frankSousa23/agrotech-venezuela](https://github.com/frankSousa23/agrotech-venezuela)  
**Licenciamiento del Código**: Licencia MIT (Copyright 2026 Frank Sousa - Agrotech Venezuela)  
**Licenciamiento y Atribución de Datos**: Creative Commons Atribución 4.0 Internacional (CC BY 4.0) — [MapBiomas Venezuela](https://venezuela.mapbiomas.org/terminos-de-uso/)  

---

## Resumen

La agricultura en la cuenca tropical venezolana enfrenta desafíos concurrentes: alta meteorización edáfica con acidez severa (pH < 5.2 y toxicidad por Al³⁺), variabilidad climática extrema exacerbada por el fenómeno ENOS, densa nubosidad estacional durante el ciclo de siembra que inutiliza sensores ópticos, y barreras socioeconómicas que excluyen al 85% de los productores del acceso a análisis de laboratorio tradicionales. Este trabajo presenta **Agrotech Venezuela**, una plataforma WebGIS y Gemelo Digital de software libre desarrollada de manera independiente por el Ing. **Frank Alfonso Sousa Mota** (UNERG), situada en nivel **TRL 4** (prototipo funcional de software integrado y verificado en entorno de desarrollo local con datos espaciales reales y 233 pruebas automatizadas) que transforma cuatro décadas de memoria espacial territorial (**MapBiomas Venezuela Colección 3.0, 1985–2024**) en prescripciones agronómicas cuantitativas y ejecutables. 

El ecosistema articula reflectancia óptica multiespectral (**Sentinel-2 L2A** a 10m), penetración activa de nubes mediante radar de apertura sintética (**Sentinel-1 SAR Banda C**, retrodispersión dual VV/VH), series climatológicas diarias de superficie (**NASA POWER**), pedocalibración dinámica Saxton-Rawls para agua disponible en suelo (PAW), y un agente experto de inteligencia artificial adaptativa (**Google Gemini AI**). El sistema implementa la formulación esferoidal geodésica Shoelace WGS84 para el cálculo de áreas sin distorsión proyectiva, acumulación térmica por Grados Día de Crecimiento (GDD), un módulo de estimación prospectiva de carbono orgánico (IPCC Tier 2 / Verra VCS), prescripciones tri-modales para maquinaria (Shapefiles ESRI con dosis variable VRA para tractores, planes KML para drones agrícolas y fichas de cabina analógicas) y una arquitectura de inclusión rural **Dual-Mode UI** con *Modo Productor Fácil* gobernado por voz nativa y dialecto campesino venezolano. Validada mediante **233 pruebas automatizadas (179 Jest + 54 Pytest, 100% aprobadas)** y desplegada sobre 30 rutas de producción Next.js 16 Turbopack, la plataforma modela un potencial de retorno de inversión rural estimado de **hasta 3.8x** y abre el camino hacia la soberanía tecnológica.

**Palabras clave**: MapBiomas Venezuela, Artículo Técnico, Gemelo Digital Agronómico, Radar SAR Sentinel-1, Shoelace Geodésico WGS84, Saxton-Rawls PAW, Dual-Mode UI, Google Gemini AI, Frank Sousa, TRL 4.

---

## Abstract

Agriculture in the Venezuelan tropics faces multiple structural constraints: high soil weathering with severe acidity (pH < 5.2 and aluminum toxicity), intense climate variability driven by ENSO anomalies, persistent cloud cover during the primary rainy cropping season that obstructs optical satellites, and severe economic barriers preventing over 85% of smallholders from accessing laboratory soil testing. This article presents **Agrotech Venezuela**, an open-source WebGIS decision-support platform and agronomic digital twin independently engineered by Software Engineer **Frank Alfonso Sousa Mota** (UNERG), positioned at Technology Readiness Level **TRL 4** (functional software prototype validated in a local development and simulation environment using real spatial data and a comprehensive suite of 233 automated tests).

The system couples multispectral reflectance (**Sentinel-2 L2A**), cloud-penetrating synthetic aperture radar (**Sentinel-1 SAR C-Band**, dual VV/VH backscatter), daily surface agroclimatology (**NASA POWER**), dynamic Saxton-Rawls pedotransfer soil moisture modeling (PAW), and adaptive artificial intelligence (**Google Gemini AI**). The mathematical engine integrates ellipsoidal Shoelace WGS84 geodesics for sub-metric area quantification, Growing Degree Days (GDD) hydro-thermal balance, a forward-looking soil organic carbon estimation module following IPCC Tier 2 / Verra VCS guidelines, tri-modal machinery variable-rate prescriptions (ESRI Shapefiles for GPS tractors, flight KML for drones, and 1-page analog cabin cards), and an offline-resilient **Dual-Mode UI** featuring an accessible *Farmer Easy Mode* with Web Speech voice recognition and Venezuelan agrarian vernacular parsing. Verified through **233 automated tests (179 Jest + 54 Pytest, 100% passing)** across 30 production routes in Next.js 16 Turbopack, the platform projects a potential rural ROI of **up to 3.8x** in cereal cropping systems and establishes a scalable foundation for digital carbon pooling research.

**Keywords**: MapBiomas Venezuela, Technical Article, Agronomic Digital Twin, Sentinel-1 SAR, WGS84 Shoelace Geodesics, Saxton-Rawls PAW, Dual-Mode UI, Google Gemini AI, Frank Sousa, TRL 4.

---

## 1. Introducción y Planteamiento del Problema Territorial

La producción de alimentos en Venezuela se concentra principalmente en los Llanos Occidentales, la Depresión de Quíbor y la Cuenca del Lago de Maracaibo. No obstante, la sostenibilidad y rentabilidad de estas regiones están severamente limitadas por tres factores biofísicos y socioeconómicos:

1. **La Paradoja de la Acidez y Bloqueo de Nutrientes**: En sabanas y terrazas aluviales (ej. estados Portuguesa, Guárico, Barinas, Monagas y Anzoátegui), predominan Ultisoles y Oxisoles altamente lixiviados con pH frecuentemente inferior a 5.2. En estas condiciones ácidas, el aluminio intercambiable (Al³⁺) se solubiliza en niveles fitotóxicos, bloqueando hasta un **45% del fósforo (P) y potasio (K)** aplicados como fertilizantes sintéticos.
2. **La Barrera Económica y Temporal del Diagnóstico**: Un análisis de fertilidad en laboratorio comercial cuesta entre \$80 y \$150 USD por muestra y su procesamiento tarda de 3 a 6 semanas. Para una pequeña finca familiar de 15 a 40 hectáreas, este desembolso previo a la siembra resulta prohibitivo, provocando que más del 80% de los productores apliquen fórmulas convencionales a ciegas.
3. **La Ceguera Óptica Estacional por Nubosidad**: Durante la temporada de lluvias (mayo a noviembre), coincidente con el ciclo comercial de cereales (maíz y arroz), el porcentaje medio de cobertura nubosa supera el 75% en las imágenes satelitales ópticas (Sentinel-2 y Landsat), generando vacíos de información justamente cuando el cultivo demanda monitoreo crítico de biomasa y estrés hídrico.

**Agrotech Venezuela**, concebido y desarrollado por el Ing. **Frank Alfonso Sousa Mota** (UNERG), nace como un Gemelo Digital Agronómico abierto y reproducible que capitaliza los 40 años de trayectoria histórica reconstruidos por **MapBiomas Venezuela** para proveer diagnósticos inmediatos, prescripciones de enmiendas regionalizadas, un sandbox didáctico Agro-IoT BYOD y modelos prospectivos de agregación de carbono (Carbon Pooling).

---

## 2. Metodología e Integración Geoespacial y Biofísica

| 1. Ingestión Espacial & Climatológica | 2. Motor Computacional Edafo-Espacial | 3. Salidas de Campo & Rentabilidad |
| :--- | :--- | :--- |
| • **MapBiomas Venezuela Col. 3.0** (1985–2024, 40 años)<br>• **Sentinel-1 SAR** Banda C (5.405 GHz, VV/VH)<br>• **Sentinel-2 L2A** Multiespectral (SCL nube libre)<br>• **NASA POWER** (Radiación solar, Temp, Ppt)<br>• **Telemetría IoT BYOD** (Sandbox didáctico opcional) | • **Shoelace Esferoidal WGS84** (Área elipsoidal)<br>• **Pedocalibración PAW %** (Saxton-Rawls)<br>• **Kamprath Modificado** (Corrección de Al³⁺)<br>• **Módulo MRV de Carbono** (Algoritmo IPCC Tier 2)<br>• **AgroClimatic Engine** (GDD base 10°C) | • **Modo Productor Fácil** (4 Puertas táctiles)<br>• **Prescripción Tri-Modal** (VRA SHP, KML, PDF)<br>• **Agrotech Carbon Pooling** (85% para productor)<br>• **Bitácora de Campo** (Parser vernacular de voz)<br>• **Resiliencia Offline** (SQLite WAL / IndexedDB) |

<p class="caption"><strong>Figura 1: Flujo integral de la arquitectura técnica de Agrotech Venezuela</strong> — <em>Pipeline desde la ingesta de datos satelitales y climáticos, pasando por el motor matemático edafológico local, hasta los canales de prescripción y accesibilidad rural.</em></p>

### 2.1 Memoria Espacial de 40 Años: Transición Histórica de Uso de Suelo (MapBiomas)
La plataforma no trata el suelo como un sustrato estático. A través de la base cartográfica de MapBiomas Venezuela (Colección 3.0, 1985–2024), el sistema rastrea la trayectoria temporal de cada polígono parcelario:
- **Transición Bosque Natural → Agricultura Anual**: Revela tasas aceleradas de mineralización de materia orgánica nativa y pérdida de agregados, demandando enmiendas de retención de carbono y bio-carbón.
- **Transición Pastura Bovina → Agricultura**: Diagnostica compactación mecánica subsuperficial (*piso de arado* a 15–22 cm de profundidad) provocada por décadas de pisoteo animal continuo, emitiendo alertas agronómicas para subsolado vertical antes del pase de rastra.
- **Agricultura Continua (>15 años)**: Señala riesgo inminente de agotamiento de bases cambiables (Ca²⁺, Mg²⁺) y micronutrientes esenciales (Zn, B), priorizando esquemas de rotación con leguminosas fijadoras de nitrógeno.

### 2.2 Superación de la Nubosidad Tropical con Radar SAR Sentinel-1 Banda C
Para eliminar la ceguera óptica estacional, el sistema procesa escenas del radar de apertura sintética Sentinel-1 en polarización dual ortogonal (VV y VH) a 5.405 GHz (Banda C). La retrodispersión calibrada en decibeles (σ° dB) se computa como:

$$\sigma^0 (\text{dB}) = 10 \cdot \log_{10} \left( \frac{\text{DN}^2}{A_\sigma} \right)$$

Donde DN es el valor digital del píxel y A_σ es la función de ganancia del procesador SAR. El cociente polarimétrico cruzado:

$$\gamma_{SAR} = \frac{\sigma_{VH}^0}{\sigma_{VV}^0}$$

evalúa la rugosidad superficial y el contenido volumétrico de agua en los primeros 5 cm de suelo, operando con 100% de penetración a través de nubes densas, humo y lluvias tropicales.

### 2.3 Cálculo Esferoidal Geodésico de Superficie (Fórmula Shoelace WGS84)
Para evitar distorsiones métricas de proyecciones planas UTM en latitudes cercanas al ecuador (0°N – 12°N), la superficie de cada lote delimitado se calcula directamente sobre el elipsoide geodésico WGS84 (R = 6.378.137,0 m):

$$\text{Área (ha)} = \frac{R^2}{2 \times 10^4} \left| \sum_{i=1}^{n} (\lambda_{i+1} - \lambda_{i-1}) \cdot \sin(\phi_i) \right|$$

Donde λ_i y ϕ_i corresponden a la longitud y latitud geodésicas en radianes del vértice i. Esta formulación proporciona precisión submétrica independiente de la zona UTM (18N, 19N o 20N).

### 2.4 Pedocalibración Dinámica Edafológica (Saxton-Rawls) y Agua Disponible (PAW)
El motor edafológico regionaliza la función de pedotransferencia de Saxton-Rawls para predecir el Agua Fácilmente Disponible (PAW):

$$\text{PAW (\%)} = \frac{\theta - \theta_{PWP}}{\theta_{FC} - \theta_{PWP}} \times 100$$

Donde θ es la humedad volumétrica actual, θ_FC es la capacidad de campo (-33 kPa) y θ_PWP es el punto de marchitez permanente (-1500 kPa). Calibrado para tres familias texturales dominantes en Venezuela:
- Suelos Arenosos (Sabanas orientales): θ_crit = 9,0%
- Suelos Francos (Llanos aluviales): θ_crit = 20,0%
- Suelos Arcillosos (Depresiones y valles): θ_crit = 35,0%

El sandbox didáctico Agro-IoT en `/api/iot/telemetry` permite ensayar de forma aislada algoritmos de riego predictivo cuando PAW < 50% en ausencia de precipitaciones previstas en las siguientes 6 horas, operando bajo filosofía BYOD (Bring Your Own Device) sin requerir hardware comercial ni generar dependencias físicas en campo.

### 2.5 Calibración Regional de Enmiendas Químicas
El sistema formula planes de dosificación según la ecorregión:
- **Sabanas Ácidas Llaneras y Orientales**: Corrección de toxicidad por Al³⁺ mediante el modelo Kamprath modificado:
  $$\text{Dosis de Cal (t/ha)} = 1.5 \times \text{Al}^{3+}_{\text{intercambiable}} \times \frac{100}{\text{PRNT}}$$
- **Sur del Lago de Maracaibo**: Corrección de desbalances Ca:Mg (ajuste a relación 3:1 a 4:1) utilizando cal dolomítica (CaCO₃ · MgCO₃).
- **Valles Semiáridos de Quíbor (Lara)**: Para suelos salino-sódicos alcalinos (pH ≥ 7.4), prescripción de Yeso Agrícola (CaSO₄ · 2H₂O) a razón de 2.5 t/ha para lixiviación de sodio intercambiable.

Para la asistencia interactiva y vernacular, el sistema acopla **Google Gemini 1.5 Flash** activado bajo demanda (mediante la cuota gratuita de Google AI Studio: 15 RPM / 1.500 RPD), garantizando cero deuda en la nube. A su vez, la totalidad de los cálculos agronómicos deterministas (Kamprath, Shoelace, Saxton-Rawls) son resueltos localmente en milisegundos con costo marginal cero ($0.00).

### 2.6 Módulo de Estimación Prospectiva de Carbono Orgánico (MRV)
Como componente de investigación tecnológica para la gestión ambiental, el software incorpora un módulo de cuantificación prospectiva basado en las ecuaciones de stock de carbono del IPCC Tier 2 (0-30 cm) acoplado a la verificación satelital de rugosidad de dosel mediante radar SAR:

$$\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12.0\text{ dB}$$

Al cruzar este umbral con las labores registradas en la bitácora de campo (siembra directa, cobertura viva o enmiendas orgánicas), el software modela la reducción de incertidumbre de verificación y proyecta escenarios de acumulación de carbono para esquemas de **Carbon Pooling**.

### 2.7 Prescripciones Tri-Modales para Maquinaria Agrícola
Para transformar los dictámenes analíticos en acciones físicas en el surco, Agrotech emite paquetes tri-modales:
1. **Consolas GPS de Tractores (ESRI Shapefile VRA)**: Georreferenciados en UTM 19N WGS84 con atributos vectoriales estandarizados (`RATE_LIME` en kg/ha, `RATE_NPK`, `AREA_HA`) compatibles con monitores John Deere GreenStar, Trimble AgGPS y Raven.
2. **Drones Agrícolas de Pulverización (Misiones KML)**: Archivos de vuelo con polígonos de corteza y waypoints para aplicaciones aéreas ultrabajo volumen (UBL) en sistemas DJI Agras y XAG.
3. **Fichas Analógicas de Cabina (1 Página Imprimible)**: Cuadrantes tabulados en lenguaje vernacular (sacos por tablón) para tractores sin asistencia satelital ni computadoras a bordo.

---

## 3. Accesibilidad Rural, Resiliencia Offline y Arquitectura Dual-Mode

En comunidades rurales donde la conectividad celular es precaria o nula (2G/EDGE), la plataforma implementa:

1. **Dual-Mode UI (Contexto de Doble Modo)**:
   - *Modo Productor Fácil*: Interfaz visual táctil de alto contraste simplificada a 4 puertas de navegación (*Ver mi Lote*, *Clima y Lluvia*, *Anotar Labor*, *Mi Receta*), reconocimiento y dictado por voz nativo (Web Speech API) y parser fonético insensible a acentos que traduce unidades vernáculas venezolanas (1 saco = 50 kg, 1 tambor = 200 L, 1 caneca = 20 L, 1 tablón = 1.0 ha).
   - *Modo Técnico*: Consola analítica completa para agrónomos, investigadores y jurados evaluadores con visualización espectral, curvas GDD, fórmulas edafológicas y árboles de decisión.
2. **Protocolo QoS de Dos Canales en Redes 2G/EDGE**:
   - *Canal A (Uplink Ligero < 10 KB)*: Sincronización idempotente prioritaria de bitácoras y parcelas mediante UUID y resolución determinista Last-Write-Wins (LWW).
   - *Canal B (Downlink Pesado > 500 KB)*: Pausa automática de teselas satelitales complejas al detectar conexiones degradadas (`2g`, `slow-2g`, o RTT > 500 ms), operando sobre caché SQLite WAL local e IndexedDB.
3. **Resolución Determinista de Conflictos Offline**: Versionado monotónico (`version`) que retiene colisiones en la cola de cuarentena `/api/parcels/conflicts` y permite resolución guiada tanto en modo campesino como métrico.

---

## 4. Estado de Madurez Actual (TRL 4) y Calidad de Software Certificada

El sistema se sitúa en el nivel de madurez tecnológica **TRL 4 (Prototipo funcional de software validado en entorno de desarrollo y simulación local)**:

| Dimensión de Certificación | Métrica Verificada en Producción | Estándar y Entorno Operacional |
| :--- | :---: | :--- |
| **Pruebas Automatizadas Unificadas** | **233 tests aprobados (100%)** | 179 Jest (Frontend, WebGIS, Dual-Mode) + 54 Pytest (Backend, ML, SAR, Saxton-Rawls) |
| **Integridad de Tipado** | **0 errores TypeScript** | Verificación estricta (`tsc --noEmit`) sin excepciones |
| **Rutas de Producción WebGIS** | **30 rutas optimizadas** | Compilación Next.js 16 con Turbopack y dynamic imports (`ssr: false`) |
| **Cobertura Territorial Nacional** | **24 Estados y 335 Municipios** | Capas vectoriales GeoJSON con detección Point-in-Polygon (Ray-Casting) |
| **Latencia de Respuesta Rural** | **< 25 ms en caché local** | SQLite en modo WAL y hash geodésico a 4 decimales (~11 m de resolución) |
| **Interoperabilidad y APIs** | **OpenAPI 3.0 / Swagger** | Documentación viva de endpoints en `/docs` y `/api-docs` |
| **IA Pragmática & FinOps** | **Google AI Studio Free Tier + Motor $0** | Invocación on-demand de Gemini 1.5 Flash; cómputo determinista local a costo marginal cero |
| **Filosofía de Hardware** | **100% Software-First & BYOD** | Agrotech no manufactura hardware; sandbox educativo opcional sin dependencias físicas en campo |

<p class="caption"><strong>Tabla 1: Matriz de salud del sistema y certificación de calidad de software</strong> — <em>Resumen cuantitativo de los indicadores de robustez, confiabilidad, cobertura geográfica y rendimiento computacional que sustentan el nivel de madurez tecnológica TRL 4 (prototipo de software funcional validado en entorno de desarrollo). Acredita la ejecución exitosa de 233 pruebas automatizadas de extremo a extremo, cero errores de tipado y total conformidad técnica para el Premio MapBiomas Venezuela 2026.</em></p>

### Hoja de Ruta Tecnológica (Roadmap TRL 4 → TRL 6)
- **TRL 4 (Actual — Septiembre 2026)**: Prototipo funcional completo verificado en desarrollo local con 233 pruebas automatizadas y datos satelitales reales de MapBiomas y Sentinel-1.
- **TRL 5 (Fase Siguiente)**: Despliegue en servidor cloud con soporte multiusuario y canal piloto de telemetría IoT.
- **TRL 6 (Validación en Campo)**: Ensayos demostrativos y pruebas piloto participativas en parcelas reales en colaboración con cooperativas agrícolas de Portuguesa y Guárico.

---

## 5. Escenarios de Modelado Computacional y Proyecciones Agronómicas

A fin de evaluar la coherencia de las recomendaciones del sistema, se configuraron dos escenarios de simulación computacional basados en características agroclimáticas y edafológicas representativas de Venezuela:

### Escenario 1: Modelado Computacional en Suelos Ácidos de Turén, Portuguesa (Cultivo de Maíz Blanco)
- **Contexto Simulado**: Lote de 48.5 ha representativo de terrazas aluviales con historial de transición de pastura degradada a agricultura anual (detectado en MapBiomas). Parámetros iniciales: pH 4.85 y saturación de Al³⁺ del 38%.
- **Prescripción Generada por el Software**: Dosis calculada de 1.450 kg/ha de cal dolomítica mediante el modelo Kamprath modificado y recomendación de descompactación mecánica (subsolado a 20 cm).
- **Proyección del Modelo**: El algoritmo de proyección edáfica estima un potencial de reducción sustancial de pérdidas de fertilizante por inmovilización química y una mejora progresiva del rendimiento teórico en campañas sucesivas, proyectando un retorno de inversión (ROI) estimado de **hasta 3.8x** sobre el costo de la enmienda en condiciones óptimas de manejo.

### Escenario 2: Modelado Computacional en el Sistema de Riego Calabozo, Guárico (Cultivo de Arroz Inundado)
- **Contexto Simulado**: Lote de 62.0 ha en suelo arcilloso vértico.
- **Monitoreo Satelital Simulado**: Seguimiento de lámina de agua mediante retrodispersión Sentinel-1 SAR ($\sigma^\circ_{VV} < -18\text{ dB}$) y cálculo de balance hídrico $P - ET_c$.
- **Proyección del Modelo**: El algoritmo proyecta un potencial de optimización del riego que permitiría un ahorro teórico de hasta el **18% en bombeo de agua**, con la consecuente reducción en consumo de combustible diésel.

### Escenario 3: Módulo de Estimación Prospectiva de Carbono Orgánico (MRV y Carbon Pooling)
Como componente de investigación tecnológica para la gestión ambiental, el software incorpora un módulo de cuantificación prospectiva basado en las ecuaciones de stock de carbono del IPCC Tier 2:
- **Funcionalidad**: Permite proyectar el secuestro teórico de carbono ($\text{tCO}_2\text{e}/\text{ha}/\text{año}$) si el productor registra con constancia prácticas de manejo regenerativo (siembra directa, abonos verdes).
- **Modelo de Agregación "Carbon Pooling"**: El sistema modela esquemas teóricos de agregación comunitaria donde pequeños predios suman masa crítica para diluir costos de certificación, proyectando que hasta un **85%** de los eventuales dividendos retorne directamente al agricultor.

---

## 6. Conclusiones y Aportes a la Gestión Territorial en Venezuela

1. **Puesta en Valor Productivo de MapBiomas**: Agrotech Venezuela demuestra que los 40 años de datos de cobertura de la iniciativa MapBiomas Venezuela no constituyen únicamente un inventario ambiental retrospectivo, sino una palanca prospectiva indispensable para restaurar la fertilidad biológica y productiva de los suelos agrícolas.
2. **Democratización Tecnológica y Soberanía**: Al unificar código libre bajo licencia MIT, accesibilidad rural nativa por voz (Dual-Mode UI) y resiliencia offline en redes 2G, la plataforma transfiere el poder de la informática de vanguardia directamente a las manos de los campesinos y agrónomos venezolanos.
3. **Escalabilidad y Transparencia**: Con **233 pruebas automatizadas** y una rigurosa arquitectura de microservicios, el proyecto sienta las bases para la gobernanza territorial, la investigación en certificación de carbono y la seguridad agroalimentaria de la nación.

---

## 7. Referencias Bibliográficas y Cita Obligatoria de Fuentes

1. **MapBiomas Venezuela (2024)**: *Colección 3.0 Anual de Cobertura y Uso del Suelo de Venezuela (1985–2024)*. Red MapBiomas, Provita, Wataniba, LSIGMA-USB y RAISG. Disponible en: [https://venezuela.mapbiomas.org/terminos-de-uso/](https://venezuela.mapbiomas.org/terminos-de-uso/) *(Cita obligatoria en cumplimiento de los Términos de Uso bajo licencia CC BY 4.0)*.
2. **Kamprath, E. J. (1970)**: *Exchangeable aluminum as a criterion for liming leached mineral soils*. Soil Science Society of America Journal, 34(2), 252-254.
3. **Saxton, K. E., & Rawls, W. J. (2006)**: *Soil water characteristic estimates by texture and organic matter for hydrologic solutions*. Soil Science Society of America Journal, 70(5), 1569-1578.
4. **IPCC (2019)**: *Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories: Volume 4 (Agriculture, Forestry and Other Land Use)*. Intergovernmental Panel on Climate Change, Geneva, Switzerland.
5. **NASA POWER Project (2026)**: *Prediction of Worldwide Energy Resources: Surface Meteorology and Solar Energy Data Set*. NASA Langley Research Center, Hampton, VA.
6. **Sousa, F. A. (2026)**: *Agrotech Venezuela: Plataforma WebGIS y Gemelo Digital de Software Libre para la Prescripción Agrícola*. Repositorio GitHub: [https://github.com/frankSousa23/agrotech-venezuela](https://github.com/frankSousa23/agrotech-venezuela). Licencia MIT.

---

## 8. Anexo Gráfico y Evidencia Analítica

<div class="figure-container" style="page-break-inside: avoid; break-inside: avoid; margin: 12px 0;">
  <div style="text-align: center; margin-bottom: 4px;">
    <img src="figures/figura1_transicion_mapbiomas.png" alt="Figura 1: Evolución de Cobertura y Uso del Suelo (1985 - 2024)" style="width: 100%; max-width: 650px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </div>
  <p class="caption"><strong>Figura 1: Dinámica multidecadal de cobertura vegetal y uso del suelo (1985–2024) en el polo cerealero de Turén, Portuguesa</strong> — <em>Reconstrucción biofísica a partir de la Colección 3.0 de MapBiomas Venezuela. Ilustra la contracción de formaciones forestales (-67%) y sabanas naturales (-20%) en favor de pasturas y agricultura anual intensiva (que escala del 15% al 64% de ocupación territorial). Esta firma espacial justifica la aplicación del modelo Kamprath modificado y la necesidad de subsolado vertical contra el piso de arado remanente de pasturas degradadas.</em></p>
</div>

<p>La reconstrucción espacio-temporal expuesta en la Figura 1 demuestra que los suelos de los Llanos Occidentales no pueden ser diagnosticados mediante instantáneas satelitales aisladas. Cuatro décadas de intervención antropogénica continua han modificado sustancialmente la capacidad de intercambio catiónico (CIC), la fracción de carbono orgánico lábil y la resistencia mecánica del perfil en profundidad. El acople del archivo histórico de MapBiomas Venezuela permite al Gemelo Digital correlacionar la pérdida histórica de cobertura arbórea con la susceptibilidad a la acidificación y la desestructuración edáfica, transformando 40 años de monitoreo satelital retrospectivo en una guía agronómica de regeneración biológica del suelo.</p>

<div style="page-break-before: always; break-before: always;"></div>

<div class="figure-container" style="page-break-inside: avoid; break-inside: avoid; margin: 12px 0;">
  <div style="text-align: center; margin-bottom: 4px;">
    <img src="figures/figura2_optimizacion_rendimientos.png" alt="Figura 2: Optimización de Rendimiento por Compensación de Legado Edafológico" style="width: 100%; max-width: 650px; border: 1px solid #cbd5e1; border-radius: 6px;" />
  </div>
  <p class="caption"><strong>Figura 2: Comparativa de rendimientos proyectados (t/ha) entre manejo empírico convencional y el Gemelo Digital Agrotech acoplado a MapBiomas</strong> — <em>Evaluación multicadena en cinco rubros prioritarios de soberanía agroalimentaria (maíz blanco, soya, arroz bajo riego, plátano y cacao criollo fino de aroma). La compensación de acidez, fijación de fósforo y balance hídrico Saxton-Rawls PAW genera saltos de productividad modelados entre +28% y +98%, sustentando el potencial de ROI rural estimado de hasta 3.8x.</em></p>
</div>

---

## 9. Certificación Institucional y Declaración de Postulación

El presente expediente técnico consolida la candidatura oficial de **Agrotech Venezuela** a la **Segunda Edición del Premio MapBiomas Venezuela 2026** en la **Categoría General** (Artículo Técnico). Se certifica que todo el software es de código abierto (Licencia MIT), los algoritmos son reproducibles, los datos territoriales cumplen estrictamente con la licencia CC BY 4.0 de MapBiomas Venezuela, y la plataforma opera en nivel de madurez **TRL 4** (Prototipo Funcional de Software Validado en Entorno de Desarrollo Local) validada mediante **233 pruebas automatizadas** (179 Jest + 54 Pytest, 100% aprobadas).

| Postulante y Desarrollador Principal | Convocatoria Oficial | Categoría | Estatus Tecnológico |
| :--- | :--- | :--- | :---: |
| **Ing. Frank Alfonso Sousa Mota**<br>Ingeniero en Informática (UNERG 2025)<br>San Juan de los Morros, Guárico<br>[frankalfonso1988@gmail.com](mailto:frankalfonso1988@gmail.com) | Premio MapBiomas Venezuela 2026 | **Categoría General**<br>(Artículo Técnico) | **TRL 4 (Prototipo Funcional Validado en Desarrollo — 233 tests)** |

<p class="caption"><strong>Certificación Oficial de Postulación</strong> — <em>Documento expedido para el Comité Organizador y el Jurado Calificador del Premio MapBiomas Venezuela 2026. Toda la suite de software, datos y microservicios se encuentra disponible públicamente en https://github.com/frankSousa23/agrotech-venezuela.</em></p>
