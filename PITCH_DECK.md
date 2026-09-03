# 🏆 Dossier Técnico y Pitch Deck de Competición — Agrotech Venezuela 🌾🛰️

**"Transformando 40 años de observación satelital en decisiones agronómicas prescriptivas y de alta rentabilidad para el campo venezolano."**

- **Autor y Creador**: Frank Sousa
- **Proyecto**: Agrotech Venezuela
- **Nicho**: Agtech, Inteligencia Edafo-Climática, Visión Satelital (WebGIS) e Inteligencia Artificial Generativa.

---

## 🎯 1. El Problema en el Campo Venezolano

1. **Fricción y Costo de los Análisis de Laboratorio**:
   El productor promedio en Venezuela enfrenta costos de \$80 a \$150 por análisis físico-químico de suelo, con tiempos de espera de 3 a 6 semanas y alta dificultad logística para el envío de muestras desde zonas remotas (Portuguesa, Guárico, Sur del Lago).
2. **Brecha entre Observación y Acción**:
   Plataformas científicas de referencia como **MapBiomas Venezuela** ofrecen un valor incalculable de mapeo histórico (1985–2024), pero su naturaleza es puramente **observacional y descriptiva**. No le dicen al agricultor: *¿Qué sembrar hoy? ¿Cuántas toneladas de cal aplicar? ¿Qué rendimiento esperar?*
3. **Pérdidas Millonarias por Mal Manejo de Suelos**:
   La acidez no corregida (toxicidad por Aluminio en suelos con pH < 5.2) reduce la eficiencia de absorción de fertilizantes N-P-K en hasta un **45%**, causando pérdidas de rendimiento masivas.

---

## 💡 2. La Solución Tecnológica: Agrotech Venezuela

Agrotech Venezuela es la primera plataforma integral que **elimina la fricción de entrada manual**, permitiendo que un productor o agrónomo simplemente señale su parcela en un mapa o ingrese sus coordenadas GPS $(Lat, Lon)$ para obtener un **Gemelo Digital instantáneo**:

```
[Coordenadas GPS (Lat, Lon)]
            ⬇️
┌────────────────────────────────────────────────────────────────────────┐
│ 🛰️ PIPELINE DE INGESTA ESPACIAL AUTOMATIZADA                           │
│  • MapBiomas Col 3: Serie histórica de 40 años (1985-2024) (30m)       │
│  • Sentinel-2 L2A: Reflectancia óptica + Máscara de Nubes SCL (10m)    │
│  • NASA POWER API: Clima diario, Radiación Solar y GDD acumulados      │
│  • Caché SQLite Local: Respuesta en < 5ms y resiliencia offline        │
└────────────────────────────────────────────────────────────────────────┘
            ⬇️
┌────────────────────────────────────────────────────────────────────────┐
│ 🌾 MOTOR PREDICTIVO DE MACHINE LEARNING & IA GENERATIVA                │
│  • Árboles y Superficies de Respuesta Agronómica (INIA/Danac/CENIAP)   │
│  • Proyección de Rendimiento en Ton/ha para 8 cultivos estratégicos    │
│  • Cuantificación de Riesgos Agroclimáticos y Balance de Carbono (SOC) │
│  • Agente Agrónomo Google Gemini AI: Prescripciones y Plan N-P-K       │
└────────────────────────────────────────────────────────────────────────┘
            ⬇️
[Dictamen Técnico Imprimible + Ficha GeoJSON Descargable]
```

---

## ⚔️ 3. Matriz Competitiva: ¿Por qué Agrotech es Superior?

| Dimensión | Enfoque Tradicional / Observacional (MapBiomas) | Agrotech Venezuela (Enfoque Prescriptivo) |
| :--- | :--- | :--- |
| **Ingreso de Datos** | Manual en formularios o consulta de mapas estáticos. | **Automático por Coordenadas GPS** (Zero-friction). |
| **Resolución Espacial** | 30 metros (Píxel Landsat). | **10 metros a nivel de parcela** (Sentinel-2 L2A con corrección SCL). |
| **Variables Climáticas** | Climatología histórica general. | **NASA POWER en tiempo real**: Grados Día de Desarrollo (GDD) y radiación diaria. |
| **Prescripción Agronómica** | Ninguna (Requiere interpretación externa). | **Cálculo exacto de encalado ($CaCO_3$) y dosis $N-P_2O_5-K_2O$**. |
| **Proyección de Cosecha** | No disponible. | **Modelado ML de rendimiento en Ton/ha e intervalo de confianza**. |
| **Asesoría de IA** | No disponible. | **Agente Google Gemini AI** contextualizado a la realidad de insumos de Venezuela. |
| **Conectividad Rural** | Dependencia 100% de internet estable. | **Base de Datos SQLite en Caché Local** y compatibilidad PWA Offline. |

---

## 🌾 4. Impacto Económico y Retorno de Inversión (ROI)

- **Ahorro de Tiempo y Costos**: Diagnóstico preliminar en **menos de 3 segundos** vs semanas de laboratorio.
- **Incremento de Rendimiento**: La corrección precisa de pH y nutrición balanceada incrementa el rendimiento del maíz de **3.5 Ton/ha a 6.2+ Ton/ha** en los Llanos Occidentales.
- **Sostenibilidad y Créditos de Carbono**: Monitoreo de secuestro de **hasta 3.85 Ton $CO_2e$/ha/año** bajo prácticas agroforestales y siembra directa.

---

## 🎬 5. Guión de Demostración en Vivo para los Jueces (3 Minutos)

1. **Minuto 1 — Ingesta Espacial Instantánea**:
   - *Demostración*: Abrir el Dashboard en `http://localhost:8501` o `http://localhost:3000`.
   - *Acción*: Seleccionar un preset (ej. **Turén, Portuguesa**).
   - *Narrativa*: "Observen cómo en menos de 10 milisegundos, el sistema extrae 40 años de historia de uso de suelo de MapBiomas, el vigor fotosintético Sentinel-2 de 10 metros y el clima de la NASA sin que el productor deba escribir una sola cifra."

2. **Minuto 2 — Simulación Reactiva y Machine Learning**:
   - *Acción*: Mover el slider de pH de 6.2 a 4.8 (simulando suelo ácido) en vivo.
   - *Narrativa*: "El modelo de Machine Learning penaliza automáticamente los cultivos sensibles y activa la alerta de acidez crítica, recalculando la dosis requerida de Cal Dolomítica a 2.5 Ton/ha."

3. **Minuto 3 — IA Generativa y Exportación Oficial**:
   - *Acción*: Pulsar el botón **"Generar Dictamen Técnico Completo"** y consultar al chat de Gemini.
   - *Narrativa*: "El agente Google Gemini genera una prescripción técnica estructurada recomendando fertilizantes disponibles en el mercado nacional y permitiendo descargar el Gemelo Digital en GeoJSON para maquinaria agrícola con piloto automático."

💡 *Modalidad Express para Evaluadores*: El jurado puede pulsar directamente el botón **`🎬 Tour Demo`** en la barra superior del Dashboard para iniciar un recorrido interactivo guiado de 5 pasos que sintetiza la totalidad de la plataforma (incluyendo el Laboratorio Agro-IoT in-situ).

---

## 🛠️ 6. Stack Tecnológico de Nivel Empresarial

- **Frontend WebGIS**: Next.js 16 (App Router con Turbopack, 28 rutas limpias), React 19, Leaflet nativo, CSS Glassmorphism, PWA con cola de mutaciones IndexedDB.
- **Visualizador Interactivo**: Streamlit 1.62, Folium, Plotly Express.
- **Backend & ML**: Python 3.13, FastAPI, Scikit-Learn, NumPy, Google Earth Engine API, NASA POWER Client.
- **Agro-IoT & Hardware In-Situ**: Microcontrolador ESP32 DevKit v1, corte transversal animado en SVG, telemetría edáfica multivariable (VWC, Temp, NPK, pH) y supresión predictiva de riego acoplada a NASA POWER.
- **Inteligencia Artificial**: Google Gemini API (`gemini-1.5-flash` / `gemini-2.0-flash`) con memoria territorial y fallback edafológico determinista.
- **Base de Datos & Caché**: PostgreSQL 15 (Docker), Prisma ORM, SQLite WAL Mode con hashing geodésico a 4 decimales.
- **Calidad de Código**: **148 pruebas automatizadas (97 Jest Frontend/WebGIS + 51 Pytest Backend/ML/IA, 100% aprobadas)**, 0 errores TypeScript, CI/CD con GitHub Actions.
- **Despliegue Productivo**: Aislamiento de puertos en Docker con perfiles (`profiles: ["prod", "production"]`) y plantilla exhaustiva `.env.production.example`.

---

*Proyecto Agrotech Venezuela — Frank Sousa (2026).*
