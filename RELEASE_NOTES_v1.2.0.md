# Agrotech Venezuela v1.2.0 🌾🛰️
## Edición Oficial Premio MapBiomas Venezuela 2026 — Prototipo Operacional Módulo de Suelos & WebGIS Soberano

**Fecha de Lanzamiento:** 10 de Octubre de 2026  
**Autor:** Ing. Frank Alfonso Sousa Mota ([@frankSousa23](https://github.com/frankSousa23))  
**Licencia:** MIT (Software Libre y Abierto)  
**Nivel de Madurez:** TRL 4 (Validación Funcional en Entorno de Desarrollo y Simulación Local)  

---

### 🌟 Resumen Ejecutivo de la Versión

La versión **v1.2.0** consolida el estado definitivo del ecosistema **Agrotech Venezuela** previo al cierre de postulaciones de la **Segunda Edición del Premio MapBiomas Venezuela 2026**. Esta entrega formaliza la arquitectura de doble vía del proyecto: una **plataforma WebGIS soberana y completa** para la productividad agropecuaria nacional, y al mismo tiempo, el **prototipo operacional de código abierto (TRL 4)** prediseñado para dotar a la red MapBiomas Venezuela de su **Módulo de Suelos**.

---

### 🚀 Novedades y Capacidades Principales en v1.2.0

#### 1. 🌾 Armonía de Identidad y Enfoque de Doble Vía
- **Plataforma Madre**: Agrotech Venezuela integra diagnóstico edáfico, climatología satelital, cuaderno de campo y prescripciones de maquinaria.
- **Capa de Adopción TRL 4**: Conecta 40 años de series históricas de MapBiomas (Colección 3.0, 1985–2024) con la física edafológica subsuperficial, convirtiendo mapas de cobertura en prescripciones químicas directas para el agricultor venezolano.

#### 2. 🧪 Batería de 294 Pruebas Automatizadas (100% PASS)
- **Frontend & WebGIS (Jest + React 19 / Next.js 16)**: **239 pruebas** en 33 test suites cubriendo Shoelace geodésico WGS84, ciclo de vida Leaflet puro (`L.map`) con `useRef`, parser vernáculo, aislamiento de sandbox y seguridad.
- **Backend Espacial & ML (Pytest + Python 3.13)**: **55 pruebas** en 17 módulos cubriendo ingestión NASA POWER, modelos de rendimiento agrícola Scikit-Learn, oráculo SAR y FastAPI OpenAPI 3.0.
- **TypeScript**: Cero errores en modo estricto (`tsc --noEmit`).
- **Next.js 16 App Router**: 35 rutas de producción compiladas de forma limpia con Turbopack.

#### 3. 🛰️ Radar SAR Sentinel-1 Banda C (All-Weather)
- Penetración de microondas a 5.405 GHz con polarización dual $\sigma^\circ_{VV}$ y $\sigma^\circ_{VH}$ en decibelios (dB), eliminando la ceguera por nubosidad tropical durante la temporada de lluvias en Venezuela (>75% de cobertura nubosa en invierno).
- Oráculo satelital radar para certificación MRV de carbono orgánico (IPCC Tier 2 / Verra VCS), reduciendo la incertidumbre metodológica del 40% al 10%.

#### 4. 🧮 Edafología Computacional & Física de Suelos
- Calibración de 1.245 perfiles de suelo venezolanos con el modelo de pedotransferencia Saxton-Rawls USDA/ARS (Arenoso, Franco, Arcilloso) para estimación del Agua Disponible en Suelo (PAW).
- Corrección química regionalizada:
  - *Modelo Kamprath modificado* ($1.5 \times Al^{3+} \times 100 / \text{PRNT}$) para neutralización de acidez en sabanas orientales.
  - *Cal dolomítica con balance Ca:Mg* (3:1 a 4:1) para Sur del Lago de Maracaibo.
  - *Yeso Agrícola* ($CaSO_4 \cdot 2H_2O$) a 2.5 t/ha para suelos salino-sódicos en Quíbor (Lara), prohibiendo explícitamente el uso de cal a $pH \ge 7.4$.

#### 5. 🧑‍🌾 Inclusión Campesina Radical (Dual-Mode UI)
- Conmutación en 1 toque entre *Modo Productor Fácil* y *Modo Técnico*.
- **Las 4 Puertas Táctiles**: Diseñadas para uso bajo sol llanero y dedos con guantes (*Saber cómo está mi tierra*, *Ver si va a llover o secar*, *Medir mi parcela*, *Anotar lo que hice hoy*).
- **Dictado por Voz Nativo (Web Speech API)** acoplado al **Parser Vernacular Campesino** que normaliza expresiones locales sin internet (1 saco = 50 kg, 1 tablón = 1.0 ha, 1 tambor = 200 L, 1 caneca = 20 L).
- Resiliencia rural offline en IndexedDB con cola de cuarentena determinista (HTTP 409) para resolver colisiones concurrentes en campo.

#### 6. 🚜 Prescripciones Tri-Modales para Maquinaria
- Generación en 1 clic de paquetes **ESRI Shapefile** con atributos VRA (`RATE_LIME`, `RATE_NPK`, `AREA_HA` en proyección UTM 19N WGS84) para tractores GPS.
- Misiones de vuelo en formato **KML/KMZ** para drones agrícolas de fumigación.
- **Ficha de Cabina Analógica** de 1 página para operarios sin tecnología satelital a bordo.

#### 7. 💰 Economía Agrícola & ROI Desacoplado
- Desacoplamiento contable riguroso entre el flujo de caja operativo real en finca (ahorro en fertilizantes N-P-K, diésel, jornales e incremento de cosecha) y los mercados voluntarios de carbono (etiquetados como *Simulación Prospectiva / No Sumado al Flujo Operativo*).

#### 8. 📚 Suite Completa del Expediente del Premio (PDFs Compilados)
- Acceso directo a los 7 documentos oficiales en PDF compilados directamente en el visor nativo de GitHub:
  - 📖 *Artículo Técnico Oficial (Arquitectura & Algoritmos)*
  - 📋 *Matriz de Cumplimiento de Criterios (Anexo II)*
  - 📑 *Expediente de Postulación Consolidado*
  - 📌 *Memorando Institucional de Postulación*
  - 📊 *Pitch Deck Ejecutivo de Presentación*
  - 📖 *Guía del Postulante & Metodología*
  - ✍️ *Anexo I — Declaración Jurada de Autoría y Licenciamiento*
- Hoja de ruta para evaluadores: [`docs/GUIA_EVALUADOR.md`](docs/GUIA_EVALUADOR.md) con auditoría rápida en 3 minutos.

---

### 📦 Guía de Instalación y Ejecución Rápida

```bash
# 1. Clonar el repositorio oficial
git clone https://github.com/frankSousa23/agrotech-venezuela.git
cd agrotech-venezuela

# 2. Instalar dependencias de frontend
npm install

# 3. Ejecutar entorno de desarrollo WebGIS (Turnkey Zero-Config)
npm run dev

# 4. (Opcional) Ejecutar suite de validación completa
npm run test:all
```

Abre `http://localhost:3000` en tu navegador para ingresar de inmediato con el modo invitado interactivo.

---

### 🛡️ Gobernanza y Licenciamiento
- **Software**: Licencia MIT — Copyright © 2026 Frank Sousa.
- **Datos Copernicus (Sentinel-1 SAR / Sentinel-2)**: ESA / Comisión Europea (Reglamento UE Nº 1159/2013).
- **Datos MapBiomas Venezuela**: Provita, LSIGMA USB, Wataniba y RAISG bajo Licencia CC BY 4.0.
- **Climatología NASA POWER**: NASA Earth Science Data Policy (NPD 2230.1 y SPD-41A).
