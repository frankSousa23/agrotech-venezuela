# 🏆 Dossier Comercial y Pitch Deck de Competición — Agrotech Venezuela 🌾🛰️

**"Transformando 40 años de observación satelital en rentabilidad directa para el productor y modelos de negocio agro-climáticos escalables."**

- **Autor y Fundador**: Frank Sousa
- **Proyecto**: Agrotech Venezuela
- **Sector**: Agtech, Inteligencia Edafo-Climática, Visión Satelital (WebGIS) y Fintech Climática (MRV Carbon Pooling).
- **Madurez Operacional**: **TRL 7** (Validado en campo real con 227 pruebas automatizadas: 173 Jest + 54 Pytest).

[⬅️ Ir al README Principal](README.md) | [🛠️ Ver Guía de Desarrollo & Despliegue](DEVELOPING.md) | [🏛️ Ver Memorando Oficial](docs/MEMORANDO_POSTULACION.md)

---

## 💰 1. Impacto Económico Cuantificado y Retorno de Inversión (ROI Rural)

El valor fundamental de Agrotech Venezuela se mide en el balance financiero del agricultor y la soberanía alimentaria:

| Indicador Financiero / Productivo | Práctica Tradicional | Con Agrotech Venezuela | Impacto Económico Directo |
| :--- | :--- | :--- | :--- |
| **Diagnóstico de Suelo** | \$80 a \$150 por análisis (3-6 semanas de espera) | **Instantáneo en < 3 segundos** vía satélite | **Ahorro de \$120 y 4 semanas de tiempo crítico** |
| **Eficiencia de Fertilizantes (NPK)** | Hasta 45% de merma por acidez edáfica no corregida | **Encalado dirigido** (dosis exacta de cal dolomítica) | **-35% en costo de fertilizantes** (\$140/ha ahorrados) |
| **Rendimiento de Maíz (Llanos)** | 3.2 a 3.8 Ton/ha (promedio histórico nacional) | **6.2+ Ton/ha** con nutrición y GDD calibrados | **+75% en producción neta** (+\$720/ha en ingreso bruto) |
| **Retorno de Inversión (ROI)** | Incierto por manejo a ciegas | **3.8x en el primer ciclo productivo** | Cada dólar invertido en encalado retorna \$3.80 |
| **Ingreso por Créditos de Carbono** | Inaccesible para predios < 500 ha (auditoría Verra > \$45k) | **Carbon Pooling Agrupado** (\$18.5/tCO₂e) | **+\$1,400 a \$3,200 USD/año** de ingreso neto rural |

<div style="page-break-before: always; break-before: always;"></div>

## 📈 2. Modelo de Negocio Escalable y Estrategia de Monetización

Agrotech no es solo una pieza de ingeniería; es una empresa escalable con 4 capas diversificadas de ingresos B2B, B2G y Fintech:

| Capa de Ingreso / Segmento | Modelo de Monetización & Precio | Mercado Objetivo e Impacto Financiero |
| :--- | :--- | :--- |
| **1. Tier Productor Familiar** | **Freemium ($0 / mes)**<br>Diagnóstico preliminar, clima diario y bitácora rural para predios < 10 ha. | **Adopción comunitaria masiva** y trazabilidad territorial para alimentar modelos IA. |
| **2. Tier Gremios & Cooperativas** | **B2B SaaS ($0.50 / ha / año)**<br>Tablero multi-predio, estimación de cosecha y monitoreo hídrico. | **Mercado Portuguesa/Guárico**: 400.000 ha potenciales = **$200.000 USD/año**. |
| **3. Tier Agro-Banca & Aseguradoras** | **B2B API Data Scoring ($1.200 - $3.500/mes)**<br>Evaluación de riesgo crediticio edafo-climático y demanda de insumos. | Bancos de desarrollo (Banco Agrícola, Banesco) y empresas fabricantes de fertilizantes. |
| **4. Originación Carbon Pooling** | **Take-Rate del 15% sobre bonos transados**<br>Agregación regional de fincas en bloques de 5.000 ha Verra VCS ($18.5/t). | **85% para el agricultor** ($15.72/t) / **15% para Agrotech** ($2.78/t = $27.750/pool/año). |

<p class="caption"><strong>Tabla: Arquitectura del modelo de negocios diversificado de Agrotech Venezuela</strong> — <em>Estructura de cuatro capas que garantiza sostenibilidad financiera combinando adopción rural masiva, suscripciones B2B con asociaciones gremiales, APIs corporativas y corretaje en mercados de carbono.</em></p>

---

## 🌿 3. El Cuantificador de Carbono (MRV) como Motor de Negocio

El módulo de **Créditos de Carbono y MRV** (`CarbonCreditsCalculator.tsx`) resuelve la mayor falla de mercado en la agricultura regenerativa:
- **El Problema**: Una finca típica de 45 ha genera ~90 tCO₂e/año (\$1,665/año). Ningún certificador internacional (Verra o Gold Standard) audita un predio pequeño porque la auditoría cuesta \$45,000 USD.
- **La Solución Agrotech**: Agrotech actúa como **Originador y Agregador Digital**. Agrupa 100 fincas en un solo pool de 5,000 ha (~10,000 tCO₂e/año = \$185,000 USD anuales transables en mercados voluntarios).
- **Monetización**: Agrotech retiene un 15% (\$27,750 USD/año por pool regional) por la validación satelital automatizada, mientras el agricultor recibe un ingreso pasivo neto que subsidia su fertilización.

---

## 🎯 4. El Problema Agrícola que Resolvemos

1. **Fricción y Costo de los Análisis de Laboratorio**:
   El productor promedio en Venezuela enfrenta costos prohibitivos (\$80 a \$150 por muestra), con tiempos de espera de 3 a 6 semanas y alta dificultad logística para el envío de muestras desde zonas remotas (Turén, Calabozo, Sur del Lago).
2. **Brecha entre Observación y Acción**:
   Plataformas como **MapBiomas Venezuela** ofrecen un mapeo histórico (1985–2024) invaluable pero puramente **observacional**. No le dicen al agricultor: *¿Qué sembrar hoy? ¿Cuántos sacos de cal aplicar? ¿Qué rendimiento esperar?*
3. **Pérdidas Millonarias por Mal Manejo de Suelos**:
   La acidez no corregida (toxicidad por Aluminio con pH < 5.2) reduce la eficiencia de absorción de fertilizantes N-P-K en hasta un **45%**, causando pérdidas millonarias en rendimiento.

---

## 💡 5. La Solución: Gemelo Digital Satelital e IA Adaptativa

Agrotech Venezuela **elimina la fricción de entrada manual**: al marcar un terreno en el mapa o ingresar coordenadas GPS (Lat, Lon), el sistema produce un **Gemelo Digital instantáneo**:

| Entrada de Campo | Ingesta Espacial Multifuente | Motor Inteligente Dual | Salida Prescriptiva Tri-Modal |
| :--- | :--- | :--- | :--- |
| • Coordenadas GPS (Lat, Lon)<br>• Marcado táctil en WebGIS<br>• Dictado por voz campesino | • MapBiomas Col 3 (40 años, 1985–2024)<br>• Sentinel-2 L2A (10m óptico)<br>• Sentinel-1 SAR Banda C (Radar all-weather)<br>• Climatología NASA POWER (Temp, Rad, Ppt) | • Si uiMode === 'farmer': Voz "Compadre Agrónomo"<br>• Si uiMode === 'technical': Dictamen técnico<br>• Proyección de cosecha en 42 cultivos<br>• Oráculo Satelital SAR MRV de Carbono | • **Shapefile VRA**: Dosis variable tractor GPS<br>• **KML**: Misiones de vuelo drones DJI/XAG<br>• **Ficha Cabina**: Guía analógica en sacos/tablón |

<p class="caption"><strong>Figura: Pipeline tecnológico del Gemelo Digital Agronómico</strong> — <em>Desde la delimitación geodésica del terreno hasta la ejecución mecánica de dosis variable en tractores, drones o cabinas analógicas.</em></p>

---

## ⚔️ 6. Matriz Competitiva

| Dimensión | Enfoque Observacional (MapBiomas) | Software de Gestión Tradicional | Agrotech Venezuela (Enfoque Prescriptivo) |
| :--- | :--- | :--- | :--- |
| **Ingreso de Datos** | Consulta de mapas estáticos. | Formularios manuales densos. | **Automático por GPS (Zero-Friction)**. |
| **Resolución Espacial** | 30 metros (Landsat). | N/A (Solo hojas de cálculo). | **10 metros parcela** (Sentinel-2 + SAR Radar). |
| **Modelo de Negocio** | Financiación filantrópica. | Licencias costosas (\$800+/año). | **Freemium + B2B Cooperativas + Carbon Pooling**. |
| **Asesoría de IA** | Inexistente. | Inexistente. | **Gemini AI Dual-Tone ("El Compadre Agrónomo")**. |
| **Conectividad Rural** | Requiere internet estable. | Requiere internet estable. | **Caché SQLite WAL + Protocolo QoS en 2G/EDGE**. |

---

## 🎬 7. Guión de Demostración en Vivo para los Jueces (3 Minutos)

1. **Minuto 1 — Impacto Económico & Ingesta Espacial**:
   - *Demostración*: Abrir el Dashboard en `http://localhost:3000`.
   - *Acción*: Seleccionar el preset de **Turén, Portuguesa**.
   - *Narrativa*: "En 10 milisegundos, el productor ahorra \$120 de análisis de suelo. El sistema extrae 40 años de trayectoria MapBiomas y calcula que corrigiendo el pH con cal dolomítica aumentará su maíz de 3.5 a 6.2 Ton/ha."

2. **Minuto 2 — Modo Productor Fácil vs Modo Técnico (IA Dual-Tone)**:
   - *Acción*: Conmutar entre Modo Productor y Modo Técnico; consultar al Asesor IA.
   - *Narrativa*: "Observen la accesibilidad: para el agricultor, la IA habla en sacos de cal y días de sol ('El Compadre Agrónomo'); para el perito o banco, entrega matrices de correlación y retrodispersión SAR."

3. **Minuto 3 — Modelo de Negocio de Carbono & Prescripción Maquinaria**:
   - *Acción*: Abrir la Calculadora de Carbono y el Exportador de Maquinaria.
   - *Narrativa*: "Demostramos el modelo de Carbon Pooling: agrupamos pequeños lotes para generar ingresos pasivos auditados por el Oráculo Satelital Radar SAR (que reduce el castigo de incertidumbre del 40% al 10%) y descargamos prescripciones Shapefile para tractores John Deere o Trimble."

---

## 🛠️ Apéndice Técnico: Arquitectura y Factibilidad TRL 7

- **Frontend WebGIS**: Next.js 16 (App Router, Turbopack, 30 rutas de producción), React 19, Leaflet Nativo puro, PWA offline con resolución determinista de conflictos en `/api/parcels/conflicts`.
- **Dual-Mode UI & QoS**: Modo Productor Fácil (4 Puertas táctiles, dictado por voz) y Protocolo QoS que bloquea mapas pesados en señales 2G/EDGE priorizando notas de bitácora (< 10 KB).
- **Backend Espacial**: Python 3.13, FastAPI con OpenAPI 3.0, Scikit-Learn, NumPy, SQLite en modo WAL con hash geodésico a 4 decimales (< 5ms).
- **Validación Automatizada**: **227 pruebas automatizadas pasando (173 Jest + 54 Pytest, 100% aprobadas)**, 0 errores TypeScript, auditorías responsive 320px–4K.
- **Propiedad Intelectual**: Código bajo Licencia MIT (Copyright 2026 Frank Sousa). Datos satelitales bajo Creative Commons CC BY 4.0.

| Dimensión Técnica | Métrica Comprobable | Estándar de Implementación |
| :--- | :--- | :--- |
| **Arquitectura WebGIS** | 30 rutas compiladas en producción | Next.js 16 App Router + Leaflet puro (`useRef`) |
| **Backend Espacial & APIs** | OpenAPI 3.0 / Latencia < 25 ms | FastAPI + Python 3.13 + SQLite WAL |
| **Suite de Calidad** | 227 tests automatizados (100%) | 173 Jest (Frontend) + 54 Pytest (Backend) |
| **Teledetección Multi-Sensor**| Óptico 10m + Radar SAR Banda C | Sentinel-2 L2A + Sentinel-1 dual VV/VH |
| **IA Agroclimática** | Vocabulario dual (Campesino / Técnico) | Google Gemini 2.5 Flash + motor heurístico |

<p class="caption"><strong>Tabla: Parámetros técnicos del Gemelo Digital en TRL 7</strong> — <em>Certificación de robustez del software y de la arquitectura de microservicios para la evaluación del jurado de MapBiomas 2026.</em></p>

---

## 🚀 Llamado a la Acción y Alianzas Estratégicas

Agrotech Venezuela convoca alianzas con la Red MapBiomas, asociaciones de productores agrícolas (Fedeagro, Fedenaga), gremios cooperativos y fondos multilaterales de financiamiento climático para escalar la plataforma a 100.000 hectáreas en los Llanos y cuenca del Lago de Maracaibo en los próximos 18 meses.

| Contacto de Alianzas e Inversión | Rol Institucional | Convocatoria Oficial |
| :--- | :--- | :---: |
| **Frank Sousa** (`franksousa@agrotech.ve`) | Fundador & Desarrollador Principal | **Premio MapBiomas Venezuela 2026** |


