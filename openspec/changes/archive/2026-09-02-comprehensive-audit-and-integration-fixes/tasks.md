## 1. Integración de Leyenda de Colores

- [x] 1.1 Inyectar el componente `MapLayerLegendOverlay` en `src/components/gis/MultiLevelMapViewer.tsx` pasándole el prop `activeLayer`. Colocarlo dentro del contenedor principal del visor para que flote correctamente sobre el mapa. Verify by navigating to `/dashboard/mapa?mode=multilevel` and observing the floating legend that changes when toggling layers (pH, Lluvia, SAR, MapBiomas).

## 2. Refinamiento UX de Onboarding y Animaciones

- [x] 2.1 Refactorizar el botón `btn_draw_toggle` en `src/components/gis/MultiLevelMapViewer.tsx` para usar un `@keyframes pulseDraw` cuando `isDrawing` sea falso y estemos en el `currentLevel === 3`, reemplazando el simple `boxShadow` estático. Verify by reaching level 3 and observing a pulsing animation inviting to draw.

## 3. Auditoría Visual (Sidebar y Sesión)

- [x] 3.1 Auditar que los botones añadidos para "Cerrar Sesión" en la barra lateral e inferior no se superpongan ni desborden sus contenedores, verificando flexbox y padding en `src/app/dashboard/layout.tsx`. Verify by checking desktop and mobile layouts for visual clipping.
- [x] 3.2 Ejecutar suite de validación `npm test` y compilación de TypeScript para asegurar 0 regresiones. Verify by seeing passing tests output.
