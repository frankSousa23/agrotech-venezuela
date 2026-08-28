## 1. Actualización de Documentación Arquitectónica

- [x] 1.1 Modificar `AGENTS.md` para asentar el uso de `Leaflet nativo + useRef` como único estándar del ecosistema WebGIS, verificando la legibilidad del documento.
- [x] 1.2 Actualizar `README.md` y cualquier otra guía para reflejar la consolidación interactiva vía Omnibox y temas, y verificar la compilación Markdown.

## 2. Alineación de Backend Swagger (FastAPI)

- [x] 2.1 Refinar docstrings y parámetros en los modelos Pydantic ubicados en `backend/src/models/` para el cálculo de polígonos y las prescripciones Gemini, verificando que `/docs` arroja esquemas más legibles e informativos.

## 3. Limpieza de Tests y Entorno de Pruebas

- [x] 3.1 Actualizar los mocks de Leaflet en `jest.setup.ts` o los archivos `*.test.ts` correspondientes para asegurar compatibilidad total con la importación dinámica nativa `L.map` y evitar warnings, verificando que `npm test` pase en limpio sin arrojar errores de referencias a Window o DOM nulos.
