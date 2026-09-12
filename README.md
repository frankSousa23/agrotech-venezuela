# Agrotech Venezuela 🌾🛰️

**Plataforma de Inteligencia Edafo-Climática, Visor WebGIS Multi-Escala, Radar SAR Sentinel-1 Sin Nubes y Asesoría Agronómica Prescriptiva.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-2.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![Tests: 233 Passing](https://img.shields.io/badge/Tests-233%20Passing-brightgreen.svg)]()
[![TRL: 4](https://img.shields.io/badge/TRL-4%20(Prototipo%20Funcional)-blue.svg)]()
[![MapBiomas Col 3.0](https://img.shields.io/badge/MapBiomas-Colección%203.0%20(1985--2024)-amber.svg)](https://venezuela.mapbiomas.org)

---

## 💡 ¿Qué es Agrotech Venezuela?

**Agrotech Venezuela** es un proyecto de software libre e independiente desarrollado por **Frank Alfonso Sousa Mota** (Ingeniero en Informática UNERG 2025, San Juan de los Morros, Estado Guárico). 

La plataforma transforma los **40 años de trayectoria de MapBiomas Venezuela (1985–2024)**, las imágenes ópticas **Sentinel-2 L2A**, el radar de microondas **Sentinel-1 SAR** y la climatología **NASA POWER** en **diagnósticos edáficos accionables, predicción fenológica y prescripciones directas para el agricultor**, superando la barrera entre la ciencia espacial y la realidad del campo venezolano.

```
 ┌──────────────────────────┐      ┌──────────────────────────┐      ┌──────────────────────────┐
 │   OBSERVACIÓN ESPACIAL   │      │   CEREBRO ALGORÍTMICO    │      │    ACCIÓN EN CAMPO Y     │
 │  (MapBiomas, SAR, NASA)  │ ───▶ │   (Fórmulas, ML e IA)    │ ───▶ │    RETORNO PRODUCTIVO    │
 └──────────────────────────┘      └──────────────────────────┘      └──────────────────────────┘
   • 40 Años MapBiomas Col 3         • Shoelace Geodésico WGS84        • Modo Productor Fácil (4 Puertas)
   • Sentinel-1 SAR All-Weather      • Modelo Kamprath Acidez Al³⁺     • Dictado por Voz & Medidas Campesinas
   • Balance Hídrico NASA POWER      • Saxton-Rawls PAW Microrriego    • Prescripciones VRA para Maquinaria
   • 24 Estados & 335 Municipios     • Grados Día (GDD) y Cosecha ML   • Bitácora PWA Offline en 2G/EDGE
```

---

## 🌟 Los 3 Pilares del Ecosistema

### 1. 🛰️ Visión Espacial Multi-Escala & Radar Sin Nubes
- **WebGIS en 3 Niveles (`/dashboard/mapa`)**: Navegación jerárquica fluida desde nivel Macro-Nacional (24 estados), pasando por Municipal (335 polos agrícolas), hasta Micro-Parcela delimitada por el usuario.
- **Radar SAR Sentinel-1 Banda C (5.4 GHz)**: Estimación de saturación edáfica que **penetra 100% la nubosidad tropical**, permitiendo monitorear anegamiento en pleno invierno lluvioso sin esperar cielos despejados.
- **Motor Fenológico ($GDD_{10}^{30}$) & Clima NASA**: Cálculo de grados día de desarrollo acumulados y balance hídrico diario ($P - ET_c$) para sincronizar siembras y cosechas con el clima real.

### 2. 🚜 Inclusión Rural, Voz Campesina & Resiliencia Offline
- **Dual-Mode UI (`Modo Productor Fácil`)**: Interfaz táctil de 4 puertas de gran tamaño (*Saber cómo está mi tierra*, *Ver si va a llover*, *Medir mi parcela*, *Anotar lo que hice hoy*), operable bajo sol intenso con una sola mano.
- **Dictado por Voz & Parser Vernacular**: Registro de labores con reconocimiento de voz nativo en español venezolano, convirtiendo unidades tradicionales (1 saco = 50 kg, 1 tambor = 200 L, 1 tablón = 1.0 ha) a unidades métricas oficiales.
- **Resiliencia PWA Offline en 2G/EDGE**: Almacenamiento local con IndexedDB y resolución determinista de conflictos en cuarentena (`/api/parcels/conflicts`), priorizando datos ligeros y pausando descargas pesadas sin señal.

### 3. 📈 Modelado Prescriptivo, Proyección de Cosecha & TRL 4
- **Calibración Edafológica Regional**: Algoritmos matemáticos adaptados al suelo venezolano: neutralización de aluminio ($Al^{3+}$) en sabanas orientales, balance Ca:Mg en Sur del Lago y yeso agrícola en suelos alcalinos de Quíbor/Lara.
- **Machine Learning de Cosecha**: Proyección estimada de rendimiento en Ton/ha para 8 cadenas estratégicas (Maíz, Arroz, Café, Cacao, Caña, Plátano, Soya y Hortalizas).
- **Herramientas de Decisión y Carbono**: Calculadora prospectiva de retorno económico (ROI proyectado hasta 3.8x) y secuestro de carbono orgánico (SOC) bajo metodología IPCC Tier 2 / Verra VCS.

---

## 🚀 Inicio Rápido (Turnkey Zero-Config en 2 Minutos)

La plataforma cuenta con persistencia en memoria para probar de inmediato la totalidad del sistema **sin instalar PostgreSQL ni configurar API keys**:

```bash
# 1. Clonar el repositorio
git clone https://github.com/frankSousa23/agrotech-venezuela.git
cd agrotech-venezuela

# 2. Instalar dependencias
npm install

# 3. Iniciar entorno de desarrollo
npm run dev
```

Abre **`http://localhost:3000`** en tu navegador para interactuar con la plataforma o ingresar directamente con el **Modo Invitado (1-Click Sandbox)**.

---

## 🏗️ Topología de Servicios y Puertos

| Servicio | Tecnología | Puerto | Propósito Principal |
| :--- | :--- | :---: | :--- |
| **Plataforma WebGIS** | Next.js 16 (Turbopack), React 19, Leaflet Nativo | `3000` | Interfaz de usuario dual, PWA offline, mapas y endpoints API. |
| **Backend Espacial & ML** | Python 3.13, FastAPI, Scikit-Learn | `8000` | Ingestión satelital, oráculo SAR, modelos ML y docs OpenAPI (`/docs`). |
| **Prescription Dashboard** | Streamlit 1.62, Folium, Plotly | `8501` | Cuadros analíticos interactivos y prescripciones visuales. |
| **Base de Datos (Opcional)**| PostgreSQL 15 (Docker) | `5444` | Almacenamiento persistente de parcelas, bitácora y usuarios. |

> Para configuraciones avanzadas de producción y variables de entorno, consulta **[DEVELOPING.md](DEVELOPING.md)**.

---

## 🧪 Calidad de Software & Validación Automatizada (233 Tests)

El código fuente cuenta con una suite rigurosa de **233 pruebas automatizadas (100% passing)** ejecutadas antes de cada versión:

```bash
# Ejecutar verificación completa (179 tests Jest + 54 tests Pytest)
npm run test:all

# Matriz ejecutiva visual de pruebas (resumen categorizado)
npm run test:summary

# Verificación de tipos TypeScript estricto (0 errores)
npm run typecheck

# Compilación limpia de producción (30 rutas Next.js 16)
npm run build
```

---

## 🏆 Convocatoria Premio MapBiomas Venezuela 2026

Este proyecto se postula formalmente en la **Segunda Edición del Premio MapBiomas Venezuela**:
- **Categoría**: **Categoría General** (postulación unificada e individual).
- **Formato**: **Artículo Técnico** (arquitectura de software, algoritmos y teledetección espacial, ~3.200 palabras).
- **Madurez**: **TRL 4** (*Prototipo Funcional de Software Validado en Entorno de Desarrollo y Simulación Local*), con hoja de ruta hacia TRL 5/6.
- **Expediente Completo**: Consulta el **[Expediente Consolidado de Postulación](docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md)** y el **[Artículo Técnico Oficial](public/docs/ARTICULO_TECNICO_DRAFT.md)** en [`docs/mapbiomas_premio_2026/`](docs/mapbiomas_premio_2026/) (o explora la vista interactiva en la app local en `/dashboard/postulacion`).

---

## 👨‍💻 Autor & Contacto Institucional

- **Autor / Desarrollador Principal**: **Frank Alfonso Sousa Mota**
- **Título**: Ingeniero en Informática (2025)
- **Alma Máter**: Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos (UNERG)
- **Ubicación**: San Juan de los Morros, Estado Guárico, Venezuela 🇻🇪
- **Correo Electrónico**: [frankalfonso1988@gmail.com](mailto:frankalfonso1988@gmail.com)
- **LinkedIn**: [linkedin.com/in/frank-alfonso-sousa-mota-32ba9971](https://linkedin.com/in/frank-alfonso-sousa-mota-32ba9971)
- **GitHub**: [@frankSousa23](https://github.com/frankSousa23)

---

## 📜 Licencia y Atribución de Datos

- **Código Fuente**: Licencia **MIT** (Copyright © 2026 Frank Sousa - Agrotech Venezuela).
- **Cobertura de la Tierra**: **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba y RAISG), bajo licencia **Creative Commons CC BY 4.0**.
- **Agroclimatología**: **NASA POWER Project**, Langley Research Center.
