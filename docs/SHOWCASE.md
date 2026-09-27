# Galería Visual & Showcase Operativo — Agrotech Venezuela 🌾🛰️

Bienvenido a la **Galería Visual de Operación** de **Agrotech Venezuela**. Este documento proporciona un recorrido visual y técnico de alta resolución a través de los componentes operativos clave de la plataforma, diseñado específicamente para que jurados del **Premio MapBiomas Venezuela 2026**, evaluadores agronómicos, investigadores y visitantes puedan verificar y auditar el sistema en funcionamiento directo **sin necesidad de clonar el repositorio, configurar entornos Node.js/Python ni ejecutar servidores locales**.

---

## 🗺️ 1. Visor WebGIS Multi-Escala & Cruce Satelital

> **Ruta en plataforma:** `/dashboard/mapa`  
> **Tecnologías:** Leaflet Nativo (`L.map`) + React 19 `useRef`, GeoJSON WGS84, Sentinel-2 (10m L2A), Sentinel-1 SAR Radar (Banda C 5.405 GHz), MapBiomas Colección 3.0 (1985–2024).

![Visor WebGIS Multi-Escala](images/showcase/01_webgis_3_niveles.png)

### Capacidades Demostradas en Pantalla:
- **Pirámide Cartográfica Unificada de 3 Niveles:**
  1. *Nivel 1 (Nacional)*: Los 24 estados georreferenciados con selector territorial en 1 clic.
  2. *Nivel 2 (Municipal)*: 335 municipios y polos agrícolas estratégicos (ej. Portuguesa, Cuenca del Catatumbo, Depresión de Quíbor, Cordillera Andina).
  3. *Nivel 3 (Micro-Parcela)*: Delimitación de tablones agrícolas con cálculo geodésico Shoelace WGS84.
- **Capas Satelitales Conmutables:**
  - `MapBiomas 2024`: Cobertura multitemporal histórica de 40 años (1985–2024).
  - `Satélite HD`: Mosaico óptico de alta resolución.
  - `Semáforo pH`: Regionalización de acidez y balance de bases intercambiables.
  - `Lluvias NASA POWER`: Precipitación acumulada histórica y balance hídrico $P - ET_c$.
  - `Modo Oscuro / Alto Contraste`: Ergonomía visual de campo con cartografía contrastada.
- **Herramienta de Delimitación Guiada:** Asistente interactivo de 30 segundos con trazo de vértices GPS en tiempo real.

---

## 🧑‍🌾 2. Arquitectura Dual-Mode: Modo Productor Fácil & Dictado por Voz

> **Ruta en plataforma:** `/dashboard` (Activando *Modo Productor*)  
> **Tecnologías:** React 19 Context (`UIModeContext`), Web Speech API nativo, Parser Vernacular Campesino offline, IndexedDB.

![Modo Productor Fácil](images/showcase/02_modo_productor_facil.png)

### Capacidades Demostradas en Pantalla:
- **Las 4 Puertas Táctiles Gigantes de Campo:**
  - **Puerta 1 — Saber cómo está mi tierra:** Diagnóstico en 3 toques sobre acidez (dulce o brava) y receta de cal/abono en sacos de 50 kg.
  - **Puerta 2 — Ver si va a llover o secar:** Pronóstico agroclimático NASA POWER + radar SAR para determinar ventanas óptimas de siembra.
  - **Puerta 3 — Medir mi parcela:** Visualización y linderos de potreros y tablones georreferenciados.
  - **Puerta 4 — Anotar lo que hice hoy:** Registro instantáneo de siembra, fertilización, jornales o cosecha con dictado de voz nativo.
- **Dictado Vernacular por Voz (`Web Speech API`):**
  - Reconocimiento de modismos agrícolas venezolanos (*"Hoy eché 30 sacos de cal en el tablón 2"*).
  - Normalización determinista sin conexión a internet: 1 saco = 50 kg, 1 tablón = 1.0 ha, 1 tambor = 200 L, 1 caneca = 20 L.
- **Checklist de Primeros Pasos:** Guía de adopción progresiva (0/4 completados) para reducir la brecha digital rural.

---

## 💰 3. Motor de Costeo Operativo & Retorno de Inversión (ROI) Desacoplado

> **Ruta en plataforma:** `/dashboard/tierras` (Pestaña *Retorno Operativo & Flujo de Caja*)  
> **Tecnologías:** Next.js 16, Algoritmos de Pedotransferencia Saxton-Rawls, Modelo Kamprath Regionalizado, IPCC Tier 2 / Verra VCS.

![Retorno de Inversión y Costeo](images/showcase/03_retorno_inversion_costeo.png)

### Capacidades Demostradas en Pantalla:
- **Desacoplamiento Financiero Riguroso:**
  - **Caja Operativa Inmediata (Arriba):** Basada estrictamente en ahorro real de sacos de fertilizante, optimización de jornales manuales, incremento de rendimiento de cosecha ($+111.6$ ton extra) y ahorro en combustible/bombeo de riego ($+33,671$ USD netos para 48.5 ha).
  - **Proyección Ambiental & Bonos de Carbono (Abajo):** Desglosada con etiqueta explícita de `SIMULACIÓN PROSPECTIVA / NO SUMADO AL FLUJO OPERATIVO`, protegiendo al productor de especulaciones financieras.
- **Selector de Perfil Productivo:**
  - *Pequeño Productor (Manual & Sacos)*: Desglose en sacos de 50 kg y jornales humanos de campo.
  - *Mecanizado (Tractor & Granel)*: Desglose en litros de diésel por hectárea y tolvas VRA a granel.
- **Slider Interactivo de Superficie:** Recálculo en tiempo real desde 1 ha hasta fincas comerciales a escala territorial.

---

## ⚡ 4. Laboratorio Didáctico Agro-IoT & Riego de Precisión

> **Ruta en plataforma:** `/dashboard/iot`  
> **Tecnologías:** Simulador físico de balance hídrico Saxton-Rawls, Microcontrolador ESP32 Simulado / Edge, Ingestión NASA POWER.

![Laboratorio Agro-IoT](images/showcase/04_laboratorio_iot_riego.png)

### Capacidades Demostradas en Pantalla:
- **Sandbox Experimental BYOD (Bring Your Own Device):**
  - Entorno pedagógico para que escuelas técnicas agrarias, universidades y productores ensayen sensores de bajo costo (<$35 USD).
  - El núcleo WebGIS de Agrotech opera de forma **100% autónoma vía satélite**; el hardware es complementario y opcional.
- **Corte Transversal Vivo Animado:**
  - Simulación física del perfil del suelo (0-10 cm capa superficial vs. 10-25 cm zona radicular).
  - Dinámica en vivo de electroválvulas y pulsos de goteo.
- **Supresión Predictiva de Riego acoplada a NASA POWER:**
  - El sistema detecta pronóstico de lluvia y **suspende automáticamente el riego**, ahorrando agua (45 L) y energía de bombeo (0.28 kWh).
- **Herramientas de Ingeniería Abierta:**
  - Pestañas con esquemas de cableado GPIO, código firmware C++ para ESP32 y calculadora de calibración analógica.

---

## 🚜 5. Ficha de Cabina Plastificable & Manual Agronómico de Campo

> **Ruta en plataforma:** `/dashboard/manual` (Botón *Imprimir Ficha de Cabina*)  
> **Tecnologías:** CSS Print Media Queries (1 Página A4/Carta), Tipografía de Alta Legibilidad, Glosario Campesino.

![Ficha de Cabina Imprimible](images/showcase/05_manual_agronomico_cabina.png)

### Capacidades Demostradas en Pantalla:
- **Hoja Operativa de 1 Página para Cabina de Tractor:**
  - Diseñada para imprimirse, plastificarse y fijarse dentro del tractor o llevarse en la camioneta de campo.
- **Cuatro Secciones Estratégicas:**
  1. *Tabla de Conversión Vernácula $\leftrightarrow$ Métrica*: Sacos, tambores, canecas, tablones y garrafas.
  2. *Calibración de Tolva de Encalado*: Velocidad de avance constante (6.0 km/h, 2da Media a 1,800 RPM / 540 RPM TDF) y verificación de guardarrayas.
  3. *Reglas de Oro Edafológicas*:
     - Suelo Ácido ($pH < 5.5$, Sabanas Orientales / Portuguesa): Neutalización de aluminio tóxico ($Al^{3+}$) con cal agrícola.
     - Suelo Alcalino / Salino-Sódico ($pH \ge 7.4$, Quíbor / Lara): **¡PROHIBIDO APLICAR CAL!** Aplicación correctiva de Yeso Agrícola ($CaSO_4 \cdot 2H_2O$) a 2.5 t/ha.
     - **Alerta de Nubes Tropicales:** Advertencia explícita sobre no confiar en satélites ópticos nublados y utilizar el **Radar SAR Sentinel-1 Banda C** que traspasa la nubosidad.
  4. *Operación Sin Conexión (Modo Rural PWA)*: Explicación de almacenamiento local seguro en IndexedDB y sincronización automática al volver a la casa de hacienda.

---

## 🏆 6. Expediente Institucional & Centro de Descarga de Postulación

> **Ruta en plataforma:** `/dashboard/postulacion`  
> **Tecnologías:** Next.js 16, Dossier Engine, Visor de Documentos PDF y Markdown.

![Expediente de Postulación MapBiomas](images/showcase/06_perfil_postulacion_mapbiomas.png)

### Capacidades Demostradas en Pantalla:
- **Impacto Económico Cuantificado & Modelos de Sostenibilidad:**
  - Retorno de Inversión agronómico proyectado de **3.8x**.
  - Ahorro promedio de **-35% en fertilizantes N-P-K**.
  - Incremento potencial de rendimiento en cereales de hasta **+75%** en suelos encalados de Portuguesa.
  - Modelo Fintech de Agrupación de Carbono (Carbon Pooling 85% Productor / 15% Plataforma) para colapsar los costos de auditoría individual Verra VCS.
- **Acceso Directo al Expediente MapBiomas 2026:**
  - *Bases Oficiales de la Convocatoria* (10 págs.).
  - *Aclaratorias & Preguntas Frecuentes* (6 págs., 20 respuestas oficiales).
  - *Matriz de Cumplimiento de Criterios (Anexo II)* (Presentación técnica frente a los 6 criterios oficiales del baremo).
  - *Artículo Técnico Formal* con arquitectura, algoritmos, formulación matemática y validación TRL 4.

---

## 🎯 Resumen de Arquitectura e Integridad

| Dimensión | Especificación Técnica | Estado de Verificación |
| :--- | :--- | :---: |
| **Pruebas Automatizadas** | 292 pruebas (237 Jest en 33 suites + 55 Pytest en 17 módulos) | `100% PASS` |
| **Compilación Next.js 16** | 35 rutas de producción generadas de forma estática y dinámica | `CLEAN BUILD` |
| **Rigor de Tipado** | TypeScript modo estricto en toda la base de código | `0 ERRORES` |
| **Licenciamiento** | Código abierto bajo Licencia MIT con atribución CC BY 4.0 | `CERTIFICADO` |
| **Soberanía & Costo Cloud** | 0 dependencias pagas obligatorias, SQLite WAL + IndexedDB offline | `RESILIENTE` |

---
*Para consultar cómo cada uno de estos módulos responde a la rúbrica oficial de evaluación del jurado, consulte la [Guía de Auditoría para Evaluadores](GUIA_EVALUADOR.md).*
