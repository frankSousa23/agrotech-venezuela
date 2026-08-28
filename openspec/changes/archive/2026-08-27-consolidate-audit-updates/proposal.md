## Why

Tras la exitosa auditoría E2E del sistema, se confirmó que la migración a Leaflet nativo, el uso de ResizeObserver para iframes (Google AI Studio) y la navegación Omnibox están funcionando impecablemente. Sin embargo, la documentación arquitectónica actual (`AGENTS.md`, `README.md`), los esquemas de Swagger en FastAPI y los mocks de pruebas en Jest no reflejan estos últimos avances estructurales. Esta propuesta busca alinear la documentación, contratos de API y pruebas con la realidad operativa actual del proyecto para garantizar la mantenibilidad y extender las pruebas automatizadas de manera robusta.

## What Changes

- Actualización de `AGENTS.md` y `README.md` para asentar `Leaflet nativo + useRef` como estándar oficial del ecosistema, erradicando menciones a react-leaflet.
- Actualización de modelos Pydantic y docstrings en FastAPI para reflejar exactamente los requerimientos del Gemelo Digital y cálculo de polígonos, mejorando el Swagger (`/docs`).
- Actualización de Mocks de Jest en el frontend para evitar falsos positivos con `L.map` y asentar bases para pruebas de visual regression o E2E (Playwright/Cypress).

## Capabilities

Esta es una actualización estrictamente de documentación, alineación de pruebas y contratos API que no altera la lógica de negocio ni agrega nuevas capacidades funcionales. 

Por lo tanto, se ha establecido `skip_specs: true` en `.openspec.yaml`.

### New Capabilities
*(Ninguna)*

### Modified Capabilities
*(Ninguna)*

## Impact

- **Documentación**: Desarrollo más claro y sin ambigüedades para nuevos agentes o mantenedores.
- **Backend API**: Mayor claridad en contratos de IA y GIS, facilitando la integración.
- **Frontend Tests**: Entorno local de test (Jest) más limpio sin advertencias de dependencias ausentes de Leaflet.
