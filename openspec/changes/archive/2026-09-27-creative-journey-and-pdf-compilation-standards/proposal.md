# Proposal: Memoria del Proceso Creativo, Dimensión Humana y Estándares de Compilación PDF

## Why

El proyecto Agrotech Venezuela ha alcanzado una madurez técnica sobresaliente (292 pruebas automatizadas al 100%, 35 rutas Next.js 16 limpias, TRL 4 y blindaje legal canónico). No obstante, el expediente técnico y la plataforma requieren un componente reflexivo e íntimo: la voz y visión humana del autor (Frank Sousa), documentando la génesis del proyecto, la intuición inicial ("para mapas Google es quien tiene los mejores") contrastada con la realidad tropical del campo venezolano (nubes, baja conectividad, carencia de laboratorios edáficos, lenguaje campesino de sacos y tablones), la forja colaborativa con Gemini dentro del entorno Antigravity mediante revisiones exhaustivas y consecutivas, y el horizonte de escalabilidad multidisciplinaria.

Asimismo, ante la presentación a jurados evaluadores y comités científicos (como el Premio MapBiomas Venezuela 2026), es indispensable documentar de forma clara, breve y accesible los parámetros técnicos, formatos y estándares de compilación de los documentos PDF (formato A4, márgenes, reglas CSS anticorte de página, templates de encabezado/pie dinámicos, figuras analíticas a 300 DPI y pipelines de renderizado reproducible con Node/Puppeteer/Python).

## What Changes

- **Memoria de Ingeniería y Dimensión Humana Canónica**: Creación de `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (con réplica en `public/docs/` para descarga y consulta directa en navegador), narrando en primera persona e ingeniería rigurosa la trayectoria creativa del autor, la sinergia con Gemini en Antigravity, el proceso iterativo de auditorías y correcciones consecutivas, el blindaje de licencias/usos de datos y los 5 horizontes de evolución futura (Bot rural WhatsApp/SMS, Scoring crediticio agrícola, Co-validación Ground-Truth MapBiomas, Nodos IoT LoRaWAN DIY, y monitoreo pan-amazónico).
- **Especificación de Parámetros y Formatos PDF**: Incorporación de una sección detallada y concisa sobre los parámetros de compilación de documentos PDF oficiales (estándar ISO A4, márgenes de 15mm, reglas CSS `page-break-inside: avoid` para tablas y figuras, encabezados y números de página dinámicos `pageNumber / totalPages`, pre-renderizado de figuras Plotly a 300 DPI y comandos de compilación universal vía `node scripts/compile_all_docs_to_pdf.js`).
- **Punto de Enlace en el Frontend WebGIS**: Integración de acceso directo al nuevo documento de Memoria Creativa y Estándares PDF desde el hub institucional `/dashboard/postulacion` y `/api-docs` para auditabilidad inmediata por parte de jurados.
- **Validación Automatizada**: Ampliación de la suite de pruebas Jest (`__tests__/api/security-and-dossier.test.ts`) para certificar la existencia, contenido íntegro y paridad del documento de memoria creativa y parámetros PDF en `public/docs/`.

## Capabilities

### Modified Capabilities
- `prize-publication-exporter`: Se incorporan dos requisitos a nivel de especificación:
  1. *Requirement: Creative Process Engineering Memoir and Human Dimension Integration*: Exige la presencia del documento maestro que articula la génesis creativa del autor, la colaboración con Gemini en Antigravity, la evolución del repositorio y las proyecciones a futuro.
  2. *Requirement: Official PDF Formatting and Compilation Parameters Specification*: Exige la documentación explícita de los estándares, opciones de página (A4, márgenes, headers/footers) y recetas de compilación de documentos PDF para evaluadores e investigadores.

## Impact

- **Documentación**: Nuevos archivos canónicos `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`. Actualización cruzada en `README.md` y `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`.
- **Frontend**: Enlaces y badges descriptivos en `/dashboard/postulacion` hacia la memoria creativa y guía de formatos PDF.
- **Scripts**: Enriquecimiento del README o cabeceras en `scripts/compile_all_docs_to_pdf.js` y `scripts/pdf_config.json` para facilitar la reproducción transparente por evaluadores.
- **Testing**: Ampliación de aserciones en `__tests__/api/security-and-dossier.test.ts`, manteniendo el 100% de aprobación en los 292 tests del ecosistema.
