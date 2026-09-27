# Design: Memoria del Proceso Creativo, Dimensión Humana y Estándares de Compilación PDF

## Context

El ecosistema Agrotech Venezuela cuenta con una base técnica sólida y validada (292 pruebas automatizadas, 35 rutas Next.js 16, TRL 4 y arquitectura dual-mode). Toda la documentación formal de postulación y científica está centralizada en `docs/` y `public/docs/` (`ARTICULO_TECNICO_DRAFT.md`, `MEMORANDO_POSTULACION.md`, `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`, etc.).

Sin embargo, el expediente carecía de la voz en primera persona del creador y autor principal (**Frank Sousa**) que explique el viaje intelectual y humano: cómo se transitó de una intuición común de desarrollador urbano ("para mapas Google es quien tiene los mejores") a la comprensión de los desafíos biofísicos del trópico venezolano (cobertura nubosa persistente, baja conectividad, lenguaje vernacular de campo), cómo se forjó el código en Antigravity junto a Gemini mediante auditorías y revisiones exhaustivas consecutivas, y cómo se estructuran los parámetros técnicos de compilación PDF para la presentación formal.

Ver `proposal.md` y `specs/prize-publication-exporter/spec.md`.

## Goals / Non-Goals

**Goals:**
- Redactar un documento canónico exhaustivo, emotivo y de alto rigor técnico: `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (con réplica exacta en `public/docs/`).
- Documentar de forma precisa y pedagógica los parámetros, formatos, reglas CSS de maquetación y comandos de compilación de los documentos PDF oficiales.
- Integrar acceso visible y amigable a este documento en el hub institucional `/dashboard/postulacion` del frontend WebGIS.
- Actualizar `README.md` y `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` con hipervínculos cruzados hacia esta memoria de autor.
- Extender la suite de pruebas `__tests__/api/security-and-dossier.test.ts` para verificar la presencia, tamaño y palabras clave de la memoria creativa en `public/docs/`.

**Non-Goals:**
- Modificar el motor de renderizado de mapas o reescribir algoritmos agronómicos existentes.
- Obligar a ejecutar la compilación pesada de Puppeteer durante el pipeline de CI/test diario (los PDFs ya están precompilados; se documenta el procedimiento de compilación).

## Decisions

### Decisión 1: Estructura de la Memoria en 5 Capítulos Temáticos
Se organizará el documento con una narrativa de ingeniería reflexiva pero rigurosamente técnica:
1. **Génesis Creativa y el Choque con la Realidad Tropical**:
   - La intuición urbana inicial: pensar en Google Maps como la solución por defecto.
   - El choque empírico: descubrir que la agricultura venezolana en ciclo de invierno sufre >75% de cobertura de nubes (haciendo inútil la fotografía satelital óptica convencional) y que los productores no usan coordenadas decimales ni NPK técnico, sino "sacos de cal, tambores de biofertilizante y tablones de tierra".
   - El pivote hacia la soberanía de datos abiertos: radar SAR Sentinel-1, bandas C, Saxton-Rawls y Modo Productor con dictado por voz.
2. **La Forja en Antigravity con Gemini (Sinergia Humano-IA)**:
   - Descripción transparente del flujo de trabajo: Frank Sousa como arquitecto y evaluador implacable; Gemini dentro de Antigravity como copiloto de ingeniería.
   - El ciclo de retroalimentación: peticiones de revisiones exhaustivas, auditorías consecutivas, refactorizaciones profundas y cero tolerancia a regresiones, materializado en 292 pruebas automatizadas (237 Jest + 55 Pytest).
3. **El Blindaje Legal y Ético como Activo Estratégico**:
   - Integración armónica de licencias: Copernicus Reglamento UE 1159/2013, NASA Open Science NPD 2230.1, MapBiomas CC BY 4.0, Google AI Studio Free Tier, y software MIT.
   - Demostración de viabilidad económica sin deuda oculta de API ni costos de nube privativa.
4. **Parámetros y Estándares de Compilación de Documentos PDF**:
   - Detalle conciso de la arquitectura de publicación: formato ISO A4 (210x297mm), márgenes de 15mm, tipografía del sistema a 9pt con interlineado 1.5, directivas CSS anticorte (`page-break-inside: avoid; break-inside: avoid;` en tablas, figuras, captions y bloques pre), headers/footers dinámicos con conteo de páginas (`pageNumber / totalPages`), pre-renderizado de figuras Plotly a 300 DPI mediante headless Puppeteer, control estricto de extensión (<10.000 palabras) y script universal `node scripts/compile_all_docs_to_pdf.js`.
5. **Horizontes de Evolución y Escalabilidad Multidisciplinaria**:
   - Cinco vectores tangibles: Bot rural WhatsApp/SMS, Scoring de riesgo crediticio agro-bancario, Red de co-validación Ground-Truth para MapBiomas, Nodos meteorológicos LoRaWAN solares DIY, y expansión al monitoreo de la cuenca pan-amazónica y del Orinoco.

### Decisión 2: Paridad Dual de Archivos y Verificación en Jest
El documento residirá en `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`. La prueba `__tests__/api/security-and-dossier.test.ts` verificará:
- Existencia y peso (> 4 KB).
- Presencia de palabras clave fundamentales (`Frank Sousa`, `Antigravity`, `Gemini`, `Google Maps`, `Sentinel-1`, `292`, `A4`, `15mm`).

### Decisión 3: Visualización en el Hub Institucional (`/dashboard/postulacion`)
Se añadirá una tarjeta dedicada en la interfaz institucional del Dashboard ("Memoria del Proceso Creativo & Estándares PDF"), con enlaces directos para lectura web y descarga, respetando la estética Glassmorphism esmeralda y el modo de alto contraste para el sol.

## Risks / Trade-offs

- **[Riesgo] Extensión excesiva del documento de memoria**: Si el documento es demasiado largo, los jurados podrían no leerlo completo.
  - *Mitigación*: Incluir una "Síntesis Ejecutiva en 60 Segundos" y un diagrama de flujo ASCII al inicio del documento.
- **[Riesgo] Discrepancia entre la documentación PDF y los scripts reales**: Que las opciones descritas difieran de `pdf_config.json`.
  - *Mitigación*: Tomar los parámetros exactos directamente de `scripts/pdf_config.json` y `scripts/compile_all_docs_to_pdf.js`.
