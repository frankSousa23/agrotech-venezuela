# 🏆 Dossier Comercial y Pitch Deck de Competición — Agrotech Venezuela 🌾🛰️

**"Transformando 40 años de observación satelital en rentabilidad directa para el productor y modelos de negocio agro-climáticos escalables."**

- **Autor y Fundador**: Frank Alfonso Sousa Mota (Ingeniero en Informática, UNERG 2025)
- **Ubicación Geográfica**: San Juan de los Morros, Estado Guárico, Venezuela 🇻🇪
- **Contacto**: [frankalfonso1988@gmail.com](mailto:frankalfonso1988@gmail.com) | [LinkedIn](https://linkedin.com/in/frank-alfonso-sousa-mota-32ba9971) | [GitHub](https://github.com/frankSousa23)
- **Proyecto**: Agrotech Venezuela
- **Sector**: AgTech, Inteligencia Edafo-Climática, Visión Satelital (WebGIS) y Prototipado Agro-IoT BYOD.
- **Convocatoria Oficial**: Segunda Edición del Premio MapBiomas Venezuela 2026 — **Categoría General** (Artículo Técnico)
- **Madurez Operacional**: **TRL 4** (Prototipo funcional de software validado en entorno de desarrollo y simulación local con datos de Portuguesa, Zulia y Monagas; validado con 233 pruebas automatizadas: 179 Jest + 54 Pytest; con hoja de ruta hacia TRL 5 y TRL 6).

[⬅️ Ir al README Principal](README.md) | [🛠️ Ver Guía de Desarrollo & Despliegue](DEVELOPING.md) | [🏛️ Ver Memorando Oficial](docs/MEMORANDO_POSTULACION.md)

---

## 💰 1. Proyecciones de Impacto Económico y Retorno de Inversión Estimado (ROI Rural)

El valor fundamental de Agrotech Venezuela se sustenta en la optimización analítica de recursos para el agricultor y la soberanía alimentaria:

| Indicador Financiero / Productivo | Práctica Tradicional | Con Agrotech Venezuela | Impacto Económico Proyectado |
| :--- | :--- | :--- | :--- |
| **Diagnóstico de Suelo** | \$80 a \$150 por análisis (3-6 semanas de espera) | **Instantáneo en < 3 segundos** vía satélite | **Ahorro de \$120 y 4 semanas de tiempo crítico** |
| **Eficiencia de Fertilizantes (NPK)** | Hasta 45% de merma por acidez edáfica no corregida | **Encalado dirigido** (dosis calculada de cal dolomítica) | **-35% proyectado en costo de fertilizantes** (\$140/ha ahorrados) |
| **Rendimiento de Maíz (Llanos)** | 3.2 a 3.8 Ton/ha (promedio histórico nacional) | **6.2+ Ton/ha estimadas** con nutrición y GDD calibrados | **+75% potencial en producción neta** (+\$720/ha en ingreso bruto) |
| **Retorno de Inversión (ROI)** | Incierto por manejo a ciegas | **Hasta 3.8x estimado en el primer ciclo** | Cada dólar invertido en encalado proyecta \$3.80 de retorno |
| **Ingreso por Créditos de Carbono** | Inaccesible para predios < 500 ha (auditoría Verra > \$45k) | **Carbon Pooling Agrupado (Exploratorio)** | **+\$1,400 a \$3,200 USD/año** (proyección en modelo de investigación) |

<div style="page-break-before: always; break-before: always;"></div>

## 📈 2. Modelo de Negocio Escalable y Estrategia de Monetización

Agrotech no es solo una pieza de ingeniería; es una iniciativa escalable con 4 capas diversificadas de ingresos B2B, B2G y Fintech:

| Capa de Ingreso / Segmento | Modelo de Monetización & Precio | Mercado Objetivo e Impacto Financiero |
| :--- | :--- | :--- |
| **1. Tier Productor Familiar** | **Freemium ($0 / mes)**<br>Diagnóstico preliminar, clima diario y bitácora rural para predios < 10 ha. | **Adopción comunitaria masiva** y trazabilidad territorial para alimentar modelos IA. |
| **2. Tier Gremios & Cooperativas** | **B2B SaaS ($0.50 / ha / año)**<br>Tablero multi-predio, estimación de cosecha y monitoreo hídrico. | **Mercado Portuguesa/Guárico**: 400.000 ha potenciales = **$200.000 USD/año**. |
| **3. Tier Agro-Banca & Aseguradoras** | **B2B API Data Scoring ($1.200 - $3.500/mes)**<br>Evaluación de riesgo crediticio edafo-climático y demanda de insumos. | Bancos de desarrollo (Banco Agrícola, Banesco) y empresas fabricantes de fertilizantes. |
| **4. Originación Carbon Pooling (I+D)** | **Take-Rate del 15% sobre bonos transados**<br>Modelo prospectivo de agregación en bloques de 5.000 ha Verra VCS ($18.5/t). | **Línea de investigación económica futura**; el núcleo de la plataforma no depende de bonos para viabilidad inmediata. |

<p class="caption"><strong>Tabla: Arquitectura del modelo de negocios diversificado de Agrotech Venezuela</strong> — <em>Estructura de cuatro capas que garantiza sostenibilidad financiera combinando adopción rural masiva, suscripciones B2B con asociaciones gremiales, APIs corporativas y corretaje en mercados de carbono.</em></p>

---

## 🌿 3. Investigación en Carbono (MRV) y Sandbox Didáctico Agro-IoT BYOD

El módulo de **Créditos de Carbono y MRV** (`CarbonCreditsCalculator.tsx`) y el **Laboratorio Agro-IoT** (`MicrocropIoTLab.tsx`) operan como entornos especializados de investigación aplicada y transferencia tecnológica:
- **Investigación Económica de Carbono**: Explora la viabilidad de la agricultura regenerativa para predios familiares típicamente excluidos de certificaciones internacionales (Verra/Gold Standard). Agrotech modela algoritmos de agregación digital (pools de 5.000 ha) y verificación satelital SAR como línea prospectiva de ingresos para el productor.
- **Sandbox Educativo Agro-IoT (BYOD)**: Entorno aislado y 100% opcional para experimentación en huertos, viveros o camas demostrativas indoor/outdoor. **Agrotech Venezuela no fabrica ni vende hardware**; cualquier productor o estudiante puede conectar sensores genéricos comerciales (ESP32/capacitivos) mediante código abierto, o bien prescindir por completo de ellos, ya que el 100% de la analítica del sistema opera de forma satelital autónoma.

---

## 🚜 4. Prescripciones Tri-Modales Universales para Maquinaria

Agrotech resuelve la brecha de adopción entre tecnología de vanguardia y maquinaria convencional:
1. **Consolas GPS de Precisión (Shapefiles VRA)**: Formato ESRI SHP con polígonos de tasa variable (`RATE_LIME`, `RATE_NPK`) para tractores guiados por satélite (John Deere, Trimble).
2. **Drones Agrícolas (Misiones KML)**: Planes de vuelo vectoriales georreferenciados para fumigación y fertilización aérea precisa (DJI Agras, XAG).
3. **Fichas Analógicas de Cabina (1 Página Imprimible)**: Cuadrantes tabulados en dialecto criollo (sacos por tablón) para tractores tradicionales sin electrónica a bordo.

---

## 🌐 5. Accesibilidad Rural: Dual-Mode UI y Resiliencia en 2G/EDGE

- **Modo Productor Fácil**: Interfaz de 4 botones de alto contraste, asistida por voz nativa (Web Speech API) y glosario rural criollo (sacos, tablones, canecas).
- **Modo Técnico**: Consola avanzada para agrónomos y peritos con índices espectrales, curvas térmicas GDD y balances hídricos.
- **QoS en Conectividad Débil**: En conexiones 2G/EDGE, el sistema prioriza la bitácora de campo (< 10 KB) y pausa automáticamente las capas satelitales pesadas (> 500 KB), apoyándose en SQLite WAL local (< 25 ms).

---

## ⚡ 6. Comparativa Frente a Soluciones Existentes

| Característica / Capacidad | Visores Tradicionales | Soluciones Agrícolas Comerciales | Agrotech Venezuela |
| :--- | :--- | :--- | :--- |
| **Profundidad Temporal** | Instantáneas aisladas. | Serie limitada a 1-3 años. | **40 años completos** (MapBiomas 1985–2024). |
| **Ingreso de Datos** | Consulta de mapas estáticos. | Formularios manuales densos. | **Automático por GPS (Zero-Friction)**. |
| **Resolución Espacial** | 30 metros (Landsat). | N/A (Solo hojas de cálculo). | **10 metros parcela** (Sentinel-2 + SAR Radar). |
| **Modelo de Negocio** | Financiación filantrópica. | Licencias costosas (\$800+/año). | **Freemium + B2B Cooperativas + Servicios Satelitales**. |
| **Asesoría de IA & FinOps** | Inexistente. | Inexistente. | **Gemini 1.5 Flash on-demand (Free Tier)** + Motores deterministas locales a **$0.00 costo marginal**. |
| **Hardware & Sensores** | N/A (Solo satelital observacional). | Requiere comprar hardware propietario costoso. | **100% Software-First**. Sandbox BYOD opcional; cero hardware comercial requerido. |
| **Conectividad Rural** | Requiere internet estable. | Requiere internet estable. | **Caché SQLite WAL + Protocolo QoS en 2G/EDGE**. |

---

## 🎬 7. Guión de Demostración en Vivo para los Jueces (3 Minutos)

1. **Minuto 1 — Ingesta Espacial y Modelado Prescriptivo**:
   - *Demostración*: Abrir el Dashboard en `http://localhost:3000`.
   - *Acción*: Seleccionar el preset del escenario de **Turén, Portuguesa**.
   - *Narrativa*: "En milisegundos, el sistema consulta 40 años de trayectoria de MapBiomas y calcula la dosis óptima de cal dolomítica para neutralizar el aluminio, proyectando una mejora de rendimiento de 3.5 a 6.2 t/ha."

2. **Minuto 2 — Modo Productor Fácil vs Modo Técnico (IA Dual-Tone)**:
   - *Acción*: Conmutar entre Modo Productor y Modo Técnico; consultar al Asesor IA.
   - *Narrativa*: "Observen la accesibilidad: para el agricultor, la IA habla en sacos de cal y días de sol ('El Compadre Agrónomo'); para el perito o evaluador, entrega matrices de correlación y retrodispersión SAR."

3. **Minuto 3 — Modelos de Proyección Agrícola, Sandbox Didáctico y Prescripción Maquinaria**:
   - *Acción*: Abrir la Calculadora de Carbono, el Laboratorio IoT y el Exportador de Maquinaria.
   - *Narrativa*: "Demostramos el módulo de proyección regenerativa, el sandbox didáctico IoT bajo premisa BYOD y la exportación de prescripciones Shapefile para maquinaria."

---

## 🛠️ Apéndice Técnico: Arquitectura y Factibilidad TRL 4

- **Frontend WebGIS**: Next.js 16 (App Router, Turbopack, 30 rutas de producción), React 19, Leaflet Nativo puro, PWA offline con resolución determinista de conflictos en `/api/parcels/conflicts`.
- **Dual-Mode UI & QoS**: Modo Productor Fácil (4 Puertas táctiles, dictado por voz) y Protocolo QoS que bloquea mapas pesados en señales 2G/EDGE priorizando notas de bitácora (< 10 KB).
- **Backend Espacial**: Python 3.13, FastAPI con OpenAPI 3.0, Scikit-Learn, NumPy, SQLite en modo WAL con hash geodésico a 4 decimales (< 5ms).
- **IA On-Demand & FinOps Cero Deuda**: Modelos heurísticos locales (Kamprath, Shoelace, Saxton-Rawls) ejecutados a costo marginal $0.00; Gemini 1.5 Flash activado bajo demanda con cuota gratuita de Google AI Studio (15 RPM / 1.500 RPD).
- **Filosofía de Hardware**: 100% Software-First y neutralidad BYOD. Agrotech no manufactura hardware ni exige sensores físicos en campo para operar el WebGIS.
- **Validación Automatizada**: **233 pruebas automatizadas pasando (179 Jest + 54 Pytest, 100% aprobadas)**, 0 errores TypeScript, auditorías responsive 320px–4K.
- **Propiedad Intelectual**: Código bajo Licencia MIT (Copyright 2026 Frank Sousa). Datos satelitales bajo Creative Commons CC BY 4.0.

| Dimensión Técnica | Métrica Comprobable | Estándar de Implementación |
| :--- | :--- | :--- |
| **Arquitectura WebGIS** | 30 rutas compiladas en producción | Next.js 16 App Router + Leaflet puro (`useRef`) |
| **Backend Espacial & APIs** | OpenAPI 3.0 / Latencia < 25 ms | FastAPI + Python 3.13 + SQLite WAL |
| **Suite de Calidad** | 233 tests automatizados (100%) | 179 Jest (Frontend) + 54 Pytest (Backend) |
| **Teledetección Multi-Sensor**| Óptico 10m + Radar SAR Banda C | Sentinel-2 L2A + Sentinel-1 dual VV/VH |
| **IA Agroclimática & FinOps** | Vocabulario dual (Campesino / Técnico) | Google Gemini 1.5 Flash on-demand + motor local $0 |
| **Madurez Tecnológica (TRL)** | TRL 4 (Prototipo funcional en desarrollo) | Validado localmente con datos reales y roadmap a TRL 5/6 |

<p class="caption"><strong>Tabla: Parámetros técnicos del Gemelo Digital en TRL 4</strong> — <em>Certificación de robustez del software y de la arquitectura de microservicios para la evaluación del jurado de MapBiomas 2026.</em></p>

---

## 🚀 Llamado a la Acción y Alianzas Estratégicas

Agrotech Venezuela convoca alianzas con la Red MapBiomas, asociaciones de productores agrícolas (Fedeagro, Fedenaga), gremios cooperativos y centros de investigación para avanzar en las fases TRL 5 y TRL 6 y validar la plataforma en parcelas demostrativas de los Llanos venezolanos.

| Contacto de Alianzas | Rol Institucional | Convocatoria Oficial |
| :--- | :--- | :---: |
| **Frank Alfonso Sousa Mota** (`frankalfonso1988@gmail.com`)<br>Ing. en Informática (UNERG 2025) • San Juan de los Morros, Guárico | Fundador & Desarrollador Principal<br>[LinkedIn](https://linkedin.com/in/frank-alfonso-sousa-mota-32ba9971) • [GitHub](https://github.com/frankSousa23) | **Premio MapBiomas Venezuela 2026**<br>(Categoría General) |
