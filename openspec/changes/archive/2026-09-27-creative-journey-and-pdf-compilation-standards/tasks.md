# Tasks

## 1. Redacción de la Memoria Creativa y Estándares PDF

- [x] 1.1 Redactar el documento canónico maestro `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` estructurado en sus 5 capítulos (génesis creativa desde la intuición urbana de Google Maps a la realidad tropical, forja en Antigravity junto a Gemini, revisiones exhaustivas y consecutivas, blindaje de licencias/usos de datos y los 5 horizontes evolutivos), verificando que el archivo supere los 5 KB y cumpla con las directrices de autoría de Frank Sousa.
- [x] 1.2 Incorporar en dicho documento maestro la especificación técnica de formatos y parámetros de compilación PDF (estándar ISO A4, márgenes de 15mm, directivas CSS anti-corte `page-break-inside: avoid;` en tablas y figuras, cabeceras/pies dinámicos con `pageNumber / totalPages`, pre-renderizado de figuras Plotly a 300 DPI y scripts de compilación `compile_all_docs_to_pdf.js`), verificando correspondencia exacta con `scripts/pdf_config.json`.
- [x] 1.3 Replicar el documento en `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`, verificando paridad exacta de contenido y hashes para su consumo estático y descarga en el navegador.

## 2. Integración en UI y Referencias Cruzadas del Repositorio

- [x] 2.1 Actualizar el hub institucional de postulación en `src/app/dashboard/postulacion/page.tsx` integrando una tarjeta de alto impacto visual ("Memoria del Proceso Creativo & Estándares PDF") con acceso directo y botones de lectura y descarga, verificando su correcta renderización y compatibilidad con el modo sol.
- [x] 2.2 Actualizar las referencias cruzadas en `README.md` y `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` enlazando formalmente la nueva memoria de autor y guía técnica de formatos PDF.

## 3. Pruebas Automatizadas y Validación Global

- [x] 3.1 Extender la suite de pruebas `__tests__/api/security-and-dossier.test.ts` con aserciones que verifiquen la presencia, tamaño y términos clave del nuevo documento en `public/docs/`, ejecutando `npm test -- -t "dossier"` para comprobar que los tests pasan en verde.
- [x] 3.2 Ejecutar la verificación unificada completa (`npm test`, `npm run typecheck`, `npm run test:backend` y validación de compilación), asegurando que se mantengan los 292 tests automatizados pasando al 100% y 0 errores de TypeScript.
