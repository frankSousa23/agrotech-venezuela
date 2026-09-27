# Tasks

## 1. Repositorio & Gobernanza Legal Canónica (LICENSE y AGENTS.md)

- [x] 1.1 Actualizar `LICENSE` en la raíz del repositorio incorporando formalmente las secciones de Third-Party Data Attribution para ESA Copernicus Sentinel-1/2 (Reglamento UE 1159/2013) y NASA Earth Science Data Policy (NPD 2230.1), junto al enlace hacia `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`.
- [x] 1.2 Actualizar `AGENTS.md` en su Sección 4 ("Licenciamiento y Atribución") consolidando el marco regulatorio de teledetección espacial (Copernicus ESA y NASA POWER/SRTM) y directrices de procedencia.

## 2. FastAPI Swagger / OpenAPI 3.0 Metadata & Testing

- [x] 2.1 Actualizar `backend/src/main.py` enriqueciendo la instancia `FastAPI` con `license_info`, `contact`, `terms_of_service` y descripción exhaustiva de las políticas de datos abiertos para los 39 endpoints.
- [x] 2.2 Implementar prueba unitaria `test_openapi_metadata_and_legal_governance` en `backend/tests/test_api_endpoints.py` que valide la respuesta de `GET /openapi.json` con aserciones sobre `license_info`, `terms_of_service`, Copernicus y NASA.
- [x] 2.3 Ejecutar `npm run test:backend` (Pytest) y verificar que las 55 pruebas del backend pasen al 100%.

## 3. Portal WebGIS de APIs & Verificación Integral del Sistema

- [x] 3.1 Actualizar `src/app/api-docs/page.tsx` incorporando la tarjeta de *Gobernanza de Datos, Licenciamiento Abierto & Términos de Servicio de APIs* con insignias regulatorias y enlace directo al marco legal canónico.
- [x] 3.2 Actualizar `scripts/test_summary.js` sincronizando el conteo total a 291 pruebas automatizadas del sistema.
- [x] 3.3 Ejecutar `npm test`, `npm run typecheck`, `npm run build` y `npm run test:summary` comprobando 0 errores TypeScript y 35 rutas compiladas en producción.
