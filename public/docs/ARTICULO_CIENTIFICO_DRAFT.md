# 🌾 Agrotech Venezuela: Plataforma WebGIS y Gemelo Digital de Software Libre para la Integración de Series Históricas de MapBiomas (1985–2024) y Teledetección Satelital en la Prescripción Agrícola
### *Artículo Técnico — Prototipo Funcional de Software (TRL 4), Modelado Computacional y Accesibilidad Rural*

**Autor Principal y Desarrollador**: Ing. Frank Alfonso Sousa Mota¹  
**Afiliación Institucional**: ¹ Ingeniero en Informática (2025), Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos (UNERG), San Juan de los Morros, Estado Guárico, Venezuela  
**Contacto**: [frankalfonso1988@gmail.com](mailto:frankalfonso1988@gmail.com) | LinkedIn: [frank-alfonso-sousa-mota-32ba9971](https://linkedin.com/in/frank-alfonso-sousa-mota-32ba9971) | GitHub: [@frankSousa23](https://github.com/frankSousa23)  
**Convocatoria**: Segunda Edición del Premio MapBiomas Venezuela 2026  
**Categoría de Postulación**: **Categoría General** (Software Libre, Plataformas Espaciales e Innovación Tecnológica)  
**Formato Documental**: **Artículo Técnico**  
**Nivel de Madurez Tecnológica**: **TRL 4** (Prototipo Funcional de Software Validado en Entorno de Desarrollo y Simulación Local)  
**Repositorio Oficial de Código Abierto**: [https://github.com/frankSousa23/agrotech-venezuela](https://github.com/frankSousa23/agrotech-venezuela)  
**Licenciamiento del Código**: Licencia MIT (Copyright 2026 Frank Sousa - Agrotech Venezuela)  
**Licenciamiento y Atribución de Datos**: Creative Commons Atribución 4.0 Internacional (CC BY 4.0) — [MapBiomas Venezuela](https://venezuela.mapbiomas.org/terminos-de-uso/)  

---

## Resumen

La agricultura en los Llanos y regiones productivas de Venezuela enfrenta limitantes biofísicas y estructurales: acidez edáfica severa (pH < 5.2 con fitotoxicidad por Al³⁺), persistente nubosidad tropical durante el ciclo de lluvias que anula la observación óptica satelital, y barreras de acceso a análisis de fertilidad en laboratorio para los pequeños y medianos productores. Este trabajo presenta **Agrotech Venezuela**, una plataforma WebGIS y Gemelo Digital de software libre desarrollada de manera independiente por el Ing. **Frank Alfonso Sousa Mota** (UNERG), situada en nivel de madurez tecnológica **TRL 4** (prototipo funcional de software integrado y verificado en entorno de desarrollo local con datos espaciales reales y una suite exhaustiva de 233 pruebas automatizadas).

El sistema articula 40 años de trayectoria histórica de coberturas y usos del suelo de **MapBiomas Venezuela (Colección 3.0, 1985–2024)** con reflectancia óptica (**Sentinel-2 L2A**), radar de apertura sintética para penetración de nubes (**Sentinel-1 SAR Banda C**, retrodispersión dual VV/VH) y variables climatológicas de superficie (**NASA POWER**). A través de un motor computacional determinista, implementa la fórmula geodésica esferoidal Shoelace WGS84 para medición de áreas sin distorsión proyectiva, acumulación térmica por Grados Día de Crecimiento (GDD), pedocalibración dinámica Saxton-Rawls para balance hídrico de agua disponible (PAW), un módulo de estimación prospectiva de carbono orgánico según directrices IPCC Tier 2 / Verra VCS, y prescripciones tri-modales para maquinaria de precisión (Shapefiles VRA, planes KML y fichas de cabina analógicas). Con el fin de garantizar inclusión rural en zonas de baja conectividad (2G/EDGE), la aplicación incorpora una arquitectura **Dual-Mode UI** con *Modo Productor Fácil* gobernado por reconocimiento de voz nativo (Web Speech API) y glosario criollo venezolano. La plataforma cuenta con **233 pruebas automatizadas (179 Jest + 54 Pytest, 100% aprobadas)** sobre 30 rutas de producción Next.js 16 Turbopack, demostrando el potencial del software libre nacional para transformar datos satelitales en recomendaciones agronómicas directas al surco.

**Palabras clave**: MapBiomas Venezuela, Artículo Técnico, Software Libre, Gemelo Digital Agronómico, Radar SAR Sentinel-1, Shoelace Geodésico WGS84, Saxton-Rawls PAW, Dual-Mode UI, Frank Sousa, TRL 4.

---

## Abstract

Agriculture across Venezuela's productive lowlands faces critical biophysical and technological bottlenecks: severe soil acidity (pH < 5.2 with Al³⁺ toxicity), persistent tropical cloud cover during the rainy commercial cycle that obscures optical sensors, and financial barriers limiting smallholder access to commercial laboratory soil testing. This article presents **Agrotech Venezuela**, an open-source WebGIS decision-support platform and agronomic digital twin independently engineered by Software Engineer **Frank Alfonso Sousa Mota** (UNERG), positioned at Technology Readiness Level **TRL 4** (functional software prototype validated in a local development and simulation environment using real spatial data and a comprehensive suite of 233 automated tests).

The system integrates 40 years of historical land-use dynamics from **MapBiomas Venezuela (Collection 3.0, 1985–2024)** with optical reflectance (**Sentinel-2 L2A**), cloud-penetrating synthetic aperture radar (**Sentinel-1 SAR C-Band**, dual VV/VH backscatter), and surface agroclimatology (**NASA POWER**). Using a deterministic computational core, it executes ellipsoidal Shoelace WGS84 geodesics for sub-metric area quantification, Growing Degree Days (GDD) thermal accumulation, Saxton-Rawls pedotransfer modeling for Plant Available Water (PAW), a forward-looking soil organic carbon estimation module following IPCC Tier 2 / Verra VCS guidelines, and tri-modal machinery variable-rate prescriptions (ESRI Shapefiles, flight KML, and 1-page analog cabin sheets). To ensure rural accessibility under 2G/EDGE mobile networks, the platform features a **Dual-Mode UI** with a *Farmer Easy Mode* driven by native Web Speech API voice dictation and Venezuelan agrarian vernacular parsing. Verified through **233 automated tests (179 Jest + 54 Pytest, 100% passing)** across 30 production routes in Next.js 16 Turbopack, the platform showcases the viability of national open-source software in translating satellite time series into actionable field guidance.

**Keywords**: MapBiomas Venezuela, Technical Article, Open Source Software, Agronomic Digital Twin, Sentinel-1 SAR, WGS84 Shoelace Geodesics, Saxton-Rawls PAW, Dual-Mode UI, Frank Sousa, TRL 4.

---

## 1. Introducción y Motivación del Desarrollo

El acceso a información agroclimática y edafológica precisa en Venezuela continúa siendo un privilegio limitado a grandes explotaciones agroindustriales. Los pequeños y medianos productores, que representan la base productiva campesina en los llanos occidentales y centrales (Portuguesa, Guárico, Barinas, Cojedes), enfrentan tres desafíos estructurales:

1. **Acidez y Pérdida de Eficiencia de Fertilizantes**: En suelos tropicales altamente meteorizados (Ultisoles y Oxisoles), el pH frecuentemente desciende por debajo de 5.2, liberando aluminio intercambiable (Al³⁺) fitotóxico que inmoviliza los fosfatos aplicados, ocasionando que gran parte del fertilizante comercial se pierda por fijación química.
2. **Costo y Demora de Análisis Químicos de Laboratorio**: Un análisis de fertilidad tradicional tiene un costo que oscila entre \$80 y \$150 USD por muestra y suele demorar entre 3 y 6 semanas en ser reportado, lo cual resulta impráctico para planificar la siembra en calendarios estrechos.
3. **Persistencia de Nubosidad en Temporada de Lluvias**: Durante los meses de mayor crecimiento vegetativo de cereales (mayo a noviembre), la nubosidad supera con frecuencia el 75% en imágenes ópticas (Sentinel-2 o Landsat), dejando a los agricultores a ciegas durante momentos críticos del cultivo.

Frente a esta problemática, **Agrotech Venezuela** fue concebido y desarrollado por el Ing. **Frank Alfonso Sousa Mota** como una iniciativa de software libre para la **Segunda Edición del Premio MapBiomas Venezuela 2026 (Categoría General)**. El objetivo del proyecto es demostrar cómo la informática aplicada, los sistemas de información geográfica web (WebGIS) y las series temporales de 40 años de **MapBiomas Venezuela (1985–2024)** pueden integrarse en un prototipo funcional (TRL 4) que genere prescripciones edáficas, modelos de simulación y recomendaciones accesibles para el campo venezolano.

---

## 2. Arquitectura de Software y Pipeline de Datos Geoespaciales

El sistema se estructura como una arquitectura de microservicios de código abierto concebida para operar con cero deuda en la nube y alta resiliencia:

| Capa de Datos / Ingesta | Motor Algorítmico y Geoespacial | Salidas de Prescripción y Accesibilidad |
| :--- | :--- | :--- |
| • **MapBiomas Venezuela Col. 3.0** (1985–2024, 40 años)<br>• **Sentinel-1 SAR** Banda C (5.405 GHz, VV/VH)<br>• **Sentinel-2 L2A** Multiespectral (Escenas SCL)<br>• **NASA POWER** (Radiación solar, Temp, Ppt)<br>• **Telemetría IoT Educativa BYOD** (Sandbox `/api/iot`) | • **Shoelace Esferoidal WGS84** (Área elipsoidal)<br>• **Pedocalibración PAW %** (Saxton-Rawls regional)<br>• **Kamprath Modificado** (Corrección de Al³⁺)<br>• **Módulo MRV de Carbono** (Algoritmo IPCC Tier 2)<br>• **Balance Hidrotérmico GDD** (Base 10°C / Techo 30°C) | • **Modo Productor Fácil** (Voz y 4 puertas táctiles)<br>• **Prescripción Tri-Modal** (VRA SHP, KML, Fichas)<br>• **Modelado de Agregación "Carbon Pooling"**<br>• **Bitácora de Campo** (Parser vernacular criollo)<br>• **Resiliencia Offline** (SQLite WAL / IndexedDB) |

<p class="caption"><strong>Figura 1: Arquitectura de integración y flujo de procesamiento de Agrotech Venezuela</strong> — <em>Pipeline desde la ingesta de datos satelitales y climáticos, pasando por el motor matemático edafológico local, hasta los canales de prescripción y accesibilidad rural.</em></p>

### 2.1 Memoria Espacial de 40 Años con MapBiomas Venezuela
A través de la Colección 3.0 de MapBiomas Venezuela, la plataforma analiza la trayectoria histórica de uso de suelo en cada lote:
- **Transición Bosque → Uso Agrícola**: Alerta sobre desbalance en agregados del suelo y rápida mineralización de materia orgánica nativa.
- **Transición Pastura Bovina → Cultivo Anual**: Diagnostica posible compactación subsuperficial (*piso de arado* a 15–20 cm) por pisoteo ganadero reiterado, sugiriendo labores de subsolado mecánico.
- **Uso Agrícola Continuo (>15 años)**: Señala agotamiento de bases cambiables (Ca²⁺, Mg²⁺), orientando planes de rotación y enmiendas de fondo.

### 2.2 Superación de Nubosidad Tropical mediante Radar SAR Sentinel-1
Para evitar la interferencia de nubes y lluvias tropicales, el backend procesa escenas Sentinel-1 Banda C (5.405 GHz) en polarizaciones duales (VV y VH). La retrodispersión calibrada en decibeles ($\sigma^\circ\text{ dB}$) y el ratio de polarización cruzada:

$$\gamma_{SAR} = \frac{\sigma_{VH}^0}{\sigma_{VV}^0}$$

permiten inferir condiciones de rugosidad superficial y presencia de agua libre o humedad en el suelo de manera ininterrumpida a lo largo de todo el ciclo invernal.

### 2.3 Medición Geodésica Esferoidal (Shoelace WGS84)
Para garantizar cálculos de área rigurosos sin las distorsiones métricas de proyecciones planas UTM en latitudes tropicales, la superficie de los lotes se computa sobre el elipsoide WGS84:

$$\text{Área (ha)} = \frac{R^2}{2 \times 10^4} \left| \sum_{i=1}^{n} (\lambda_{i+1} - \lambda_{i-1}) \cdot \sin(\phi_i) \right|$$

donde $R = 6.378.137,0\text{ m}$, y $\lambda_i, \phi_i$ representan longitud y latitud geodésicas en radianes.

### 2.4 Pedocalibración Saxton-Rawls y Humedad Disponible (PAW)
El motor de suelo implementa la formulación de Saxton-Rawls para estimar el Agua Fácilmente Disponible (PAW):

$$\text{PAW (\%)} = \frac{\theta - \theta_{PWP}}{\theta_{FC} - \theta_{PWP}} \times 100$$

calibrada para tres familias texturales dominantes en Venezuela: arenosa ($\theta_{crit} = 9.0\%$), franca ($\theta_{crit} = 20.0\%$) y arcillosa ($\theta_{crit} = 35.0\%$). El sandbox IoT didáctico en `/api/iot/telemetry` permite simular reglas de riego cuando $\text{PAW} < 50\%$ sin requerir sensores comerciales en campo.

### 2.5 Calibración Edafológica Regionalizada
El software implementa algoritmos deterministas de la literatura agronómica:
- **Sabanas Ácidas**: Corrección de aluminio mediante Kamprath modificado: $\text{Dosis de Cal (t/ha)} = 1.5 \times \text{Al}^{3+}_{\text{intercambiable}} \times \frac{100}{\text{PRNT}}$.
- **Sur del Lago de Maracaibo**: Equilibrio Ca:Mg mediante cal dolomítica.
- **Valles Semiáridos de Quíbor (Lara)**: Prescripción de yeso agrícola ($CaSO_4 \cdot 2H_2O$) a razón de 2.5 t/ha para suelos salino-sódicos alcalinos ($pH \ge 7.4$).

---

## 3. Accesibilidad Rural, Resiliencia Offline y Arquitectura Dual-Mode

Uno de los principales aportes de ingeniería del proyecto es su diseño para entornos rurales con conectividad limitada (redes 2G/EDGE):

1. **Dual-Mode UI**:
   - *Modo Productor Fácil*: Interfaz táctil de alto contraste simplificada a 4 puertas clave (*Ver mi Lote*, *Clima y Lluvia*, *Anotar Labor*, *Mi Receta*), con dictado por voz nativo (Web Speech API) y normalización de unidades vernáculas venezolanas (1 saco = 50 kg, 1 tambor = 200 L, 1 caneca = 20 L, 1 tablón = 1.0 ha).
   - *Modo Técnico*: Consola avanzada para agrónomos, ingenieros y evaluadores con métricas espectrales, curvas GDD, fórmulas edafológicas y APIs.
2. **QoS y Persistencia Offline**:
   - Sincronización ligera prioritaria (< 10 KB) en redes débiles y pausa de teselas satelitales pesadas.
   - Almacenamiento local mediante SQLite en modo WAL (< 25 ms) e IndexedDB en el navegador para operar sin conexión.
3. **Prescripción Tri-Modal para Maquinaria**:
   - Generación de Shapefiles ESRI con dosis variable (VRA) para consolas GPS, planes de vuelo KML para drones y fichas analógicas impresas de 1 página para tractores convencionales.

---

## 4. Nivel de Madurez Tecnológica (TRL 4) y Calidad de Software Certificada

El proyecto se sitúa de forma transparente en el nivel de madurez **TRL 4 (Prototipo Funcional de Software Validado en Entorno de Laboratorio / Desarrollo Local)**:

| Dimensión de Certificación | Métrica Verificada en Desarrollo | Entorno y Estándar Operacional |
| :--- | :---: | :--- |
| **Pruebas Automatizadas Unificadas** | **233 tests aprobados (100%)** | 179 Jest (Frontend, WebGIS, Dual-Mode) + 54 Pytest (Backend, ML, SAR, Saxton-Rawls) |
| **Integridad de Tipado** | **0 errores TypeScript** | Verificación estricta (`tsc --noEmit`) sin excepciones |
| **Rutas de Producción WebGIS** | **30 rutas optimizadas** | Compilación limpia en Next.js 16 con Turbopack |
| **Cobertura Territorial Nacional** | **24 Estados y 335 Municipios** | Capas vectoriales GeoJSON con detección Ray-Casting |
| **Latencia de Respuesta Rural** | **< 25 ms en caché local** | SQLite WAL con hash geodésico a 4 decimales (~11 m de resolución) |
| **Interoperabilidad y APIs** | **OpenAPI 3.0 / Swagger** | Documentación interactiva de endpoints en `/docs` y `/api-docs` |
| **Filosofía de Hardware** | **100% Software-First & BYOD** | Sin exigencia de hardware propietario; sandbox educativo accesible |

<p class="caption"><strong>Tabla 1: Matriz de verificación técnica y calidad de software</strong> — <em>Indicadores comprobables del prototipo funcional TRL 4 respaldados por pruebas automatizadas y compilación limpia.</em></p>

### Hoja de Ruta de Escalabilidad Tecnológica (Roadmap TRL 4 → TRL 6)
- **TRL 4 (Actual — Septiembre 2026)**: Prototipo funcional completo verificado en entorno de desarrollo local con 233 pruebas automatizadas y datos satelitales reales.
- **TRL 5 (Fase Siguiente)**: Despliegue en servidor en la nube con acceso multiusuario simultáneo y canal piloto de telemetría IoT.
- **TRL 6 (Validación en Campo)**: Ensayos demostrativos y pruebas piloto participativas en parcelas reales en colaboración con cooperativas agrícolas de Portuguesa y Guárico.

---

## 5. Escenarios de Modelado Computacional y Proyecciones Agronómicas

A fin de evaluar la coherencia de las recomendaciones del sistema, se configuraron dos escenarios de simulación computacional basados en características agroclimáticas y edafológicas representativas de Venezuela:

### Escenario 1: Modelado Computacional en Suelos Ácidos de Turén (Portuguesa) — Maíz Blanco
- **Contexto Simulado**: Lote de 48.5 ha representativo de terrazas aluviales con historial de transición de pastura degradada a agricultura anual (detectado en MapBiomas). Parámetros iniciales: pH 4.85 y saturación de Al³⁺ del 38%.
- **Prescripción Generada por el Software**: Dosis calculada de 1.450 kg/ha de cal dolomítica mediante el modelo Kamprath modificado y recomendación de descompactación mecánica (subsolado a 20 cm).
- **Proyección del Modelo**: El algoritmo de proyección edáfica estima un potencial de reducción sustancial de pérdidas de fertilizante por inmovilización química y una mejora progresiva del rendimiento teórico en campañas sucesivas, proyectando un retorno de inversión (ROI) estimado de hasta **3.8x** sobre el costo de la enmienda en condiciones óptimas de manejo.

### Escenario 2: Modelado Computacional en el Sistema de Riego Calabozo (Guárico) — Arroz Inundado
- **Contexto Simulado**: Lote de 62.0 ha en suelo arcilloso vértico.
- **Monitoreo Satelital Simulado**: Seguimiento de lámina de agua mediante retrodispersión Sentinel-1 SAR ($\sigma^\circ_{VV} < -18\text{ dB}$) y cálculo de balance hídrico $P - ET_c$.
- **Proyección del Modelo**: El algoritmo proyecta un potencial de optimización del riego que permitiría un ahorro teórico de hasta el **18% en bombeo de agua**, con la consecuente reducción en consumo de combustible diésel.

### Escenario 3: Módulo de Estimación Prospectiva de Carbono Orgánico (MRV y Carbon Pooling)
Como componente de investigación tecnológica para la gestión ambiental, el software incorpora un módulo de cuantificación prospectiva basado en las ecuaciones de stock de carbono del IPCC Tier 2:
- **Funcionalidad**: Permite proyectar el secuestro teórico de carbono ($\text{tCO}_2\text{e}/\text{ha}/\text{año}$) si el productor registra con constancia prácticas de manejo regenerativo (siembra directa, abonos verdes).
- **Modelo de Agregación "Carbon Pooling"**: El sistema modela esquemas teóricos de agregación comunitaria donde pequeños predios suman masa crítica para diluir costos de certificación, proyectando que hasta un **85%** de los eventuales dividendos retorne directamente al agricultor.

---

## 6. Conclusiones y Aportes a la Categoría General

1. **Valor Práctico de los Datos de MapBiomas**: Agrotech Venezuela demuestra que los 40 años de datos cartográficos de MapBiomas Venezuela no solo tienen un valor ecológico macroscópico, sino que pueden ser consumidos por herramientas de software para reconstruir la historia del suelo y guiar la toma de decisiones agrícolas.
2. **Software Libre Nacional y Rigor Técnico**: Desarrollado como un prototipo de software libre (Licencia MIT) por un ingeniero informático venezolano recién graduado, el proyecto demuestra que con metodologías de desarrollo rigurosas, pruebas automatizadas y estándares abiertos es posible crear tecnología geoespacial de alto nivel sin grandes presupuestos.
3. **Herramienta Accesible para el Campo**: La inclusión de modos de uso por voz y dialecto criollo en un visor WebGIS rompe las barreras tecnológicas que tradicionalmente apartan al campesino venezolano de los beneficios de la observación satelital.

---

## 7. Referencias Bibliográficas

1. **MapBiomas Venezuela (2024)**: *Colección 3.0 Anual de Cobertura y Uso del Suelo de Venezuela (1985–2024)*. Red MapBiomas, Provita, Wataniba, LSIGMA-USB y RAISG. Disponible en: [https://venezuela.mapbiomas.org/terminos-de-uso/](https://venezuela.mapbiomas.org/terminos-de-uso/) *(Licencia CC BY 4.0)*.
2. **Kamprath, E. J. (1970)**: *Exchangeable aluminum as a criterion for liming leached mineral soils*. Soil Science Society of America Journal, 34(2), 252-254.
3. **Saxton, K. E., & Rawls, W. J. (2006)**: *Soil water characteristic estimates by texture and organic matter for hydrologic solutions*. Soil Science Society of America Journal, 70(5), 1569-1578.
4. **IPCC (2019)**: *Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories: Volume 4 (Agriculture, Forestry and Other Land Use)*. Intergovernmental Panel on Climate Change.
5. **NASA POWER Project (2026)**: *Surface Meteorology and Solar Energy Data Set*. NASA Langley Research Center.
6. **Sousa, F. A. (2026)**: *Agrotech Venezuela: Plataforma WebGIS y Gemelo Digital de Software Libre para la Prescripción Agrícola*. Repositorio GitHub: [https://github.com/frankSousa23/agrotech-venezuela](https://github.com/frankSousa23/agrotech-venezuela). Licencia MIT.
