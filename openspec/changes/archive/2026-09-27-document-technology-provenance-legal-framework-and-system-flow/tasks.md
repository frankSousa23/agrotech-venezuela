# Tasks

## 1. Marco Legal y Documentación Canónica de Procedencia

- [x] 1.1 Redactar el documento canónico `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` detallando las 5 familias tecnológicas (Sentinel-1 SAR / Sentinel-2 Copernicus con Reglamento UE 1159/2013; NASA POWER / SRTM / GPM con NPD 2230.1; MapBiomas Colección 3.0 con CC BY 4.0; algoritmos científicos Shoelace/Kamprath/Saxton-Rawls; Google Gemini 1.5 Flash con Términos de AI Studio), el relato del proceso creativo frente a cuellos de botella venezolanos y el diagrama de flujo end-to-end entre componentes.
- [x] 1.2 Replicar de forma síncrona el documento en `public/docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` para descarga directa e inspección estática desde el navegador, verificando paridad exacta de contenido.
- [x] 1.3 Actualizar `README.md` y `DEVELOPING.md` vinculando explícitamente el nuevo marco de gobernanza, procedencia y proceso creativo en las secciones de arquitectura y atribución.

## 2. Integración en Interfaz de Usuario y Navegación

- [x] 2.1 Actualizar `src/app/dashboard/postulacion/page.tsx` agregando la tarjeta interactiva de *Gobernanza de Datos, Permisos & Marco Legal* con insignias regulatorias (Copernicus, NASA, MapBiomas) y acción de descarga/lectura.
- [x] 2.2 Actualizar `src/components/layout/Footer.tsx` incorporando un enlace directo y visible hacia la documentación de procedencia y marco legal en el pie de página global.

## 3. Aserciones de Prueba y Verificación de Integridad del Sistema

- [x] 3.1 Actualizar `__tests__/api/security-and-dossier.test.ts` agregando `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` a la lista de archivos de dossier requeridos y verificando presencia de menciones legales clave (`Copernicus`, `1159/2013`, `NASA`, `MapBiomas`, `CC BY 4.0`).
- [x] 3.2 Ejecutar `npm test` y verificar que las 33 suites y los 236 tests de Jest pasen al 100%.
- [x] 3.3 Ejecutar `npm run typecheck` y verificar 0 errores TypeScript.
- [x] 3.4 Ejecutar `npm run build` y verificar compilación limpia de 35 rutas en Next.js 16 Turbopack.
- [x] 3.5 Ejecutar `npm run test:summary` y verificar reporte consolidado intacto con 290 pruebas totales y 35 rutas.
