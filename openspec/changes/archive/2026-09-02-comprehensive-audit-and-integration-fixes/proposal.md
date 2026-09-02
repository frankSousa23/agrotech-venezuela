## Why

A través de una auditoría solicitada por el usuario sobre los últimos 10 cambios de OpenSpec, se detectaron discrepancias entre las especificaciones documentadas (y marcadas como completadas) y la integración real en el código base. Por ejemplo, la explicación de los colores en el mapa (`MapLayerLegendOverlay`) se implementó para el mapa estático pero se omitió en el `MultiLevelMapViewer`, dejando a los usuarios sin contexto visual. Además, detalles finos de UX (como la animación de pulso en el botón de trazar) no se codificaron completamente. Este cambio consolida la auditoría y repara definitivamente estas omisiones para cumplir al 100% las promesas de los cambios anteriores.

## What Changes

- **Integración de Leyenda Multi-Escala:** Inyectar el componente `MapLayerLegendOverlay` en `MultiLevelMapViewer.tsx` para que los usuarios puedan ver la leyenda del semáforo de pH, Lluvia y MapBiomas durante la delimitación de parcelas.
- **Micro-interacciones UX:** Refactorizar el `btn_draw_toggle` para utilizar animaciones `@keyframes` reales (CSS o framer-motion) en lugar de una sombra estática (sombra verde a roja), cumpliendo la tarea 2.4 de `2026-09-01-guided-map-onboarding`.
- **Auditoría e Integridad Final:** Revisión de las demás advertencias visuales o componentes huérfanos documentados en auditorías para inyectarlos en la UI sin romper el Layout principal.

## Capabilities

### New Capabilities

- Ninguna nueva (Solo correcciones de integraciones previas).

### Modified Capabilities

- Ninguna modificación de comportamiento de sistema externo. (Se marcará `skip_specs: true`).

## Impact

- `src/components/gis/MultiLevelMapViewer.tsx`: Modificación crítica visual y estructural (añadir overlay).
- CSS Animations: Adición de reglas `@keyframes` para botones.
- No impacta APIs ni backend.
