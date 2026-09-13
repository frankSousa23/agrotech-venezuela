# Tasks: connect-system-integrations-and-routes

## 1. Conexión y Enrutamiento de Créditos de Carbono

- [x] 1.1 Asignar `id="carbon-credits"` en `src/app/dashboard/recomendaciones/page.tsx` y corregir los enlaces del Módulo 5 y menú *Ciencia & Datos* en `src/app/page.tsx`.
- [x] 1.2 Agregar botón de enlace directo hacia la calculadora en la sección de carbono de `src/app/dashboard/estadisticas/page.tsx`.
- [x] 1.3 Agregar ítem de navegación "Créditos de Carbono" con badge "MRV" en la barra lateral (`src/app/dashboard/layout.tsx`).

## 2. Integración de Voz y Parser Vernacular en Bitácora

- [x] 2.1 Conectar `useVoiceAssistant` y `parseVernacularSpeech` en el modal de registro de labores de `src/app/dashboard/bitacora/page.tsx` con botón de micrófono y auto-conversión de dosis tradicionales.

## 3. Acceso a Maquinaria, Radar SAR y Constante Térmica GDD

- [x] 3.1 Integrar botón para abrir `MachineryExportModal` directamente desde `src/app/dashboard/recomendaciones/page.tsx` y añadir `tool-machinery` a `src/components/layout/CommandPalette.tsx`.
- [x] 3.2 Incorporar badge `📡 Radar SAR Sentinel-1 (Sin Nubes)` en la cabecera de `src/app/dashboard/page.tsx` y mostrar la constante térmica GDD en las tarjetas de `src/app/dashboard/cultivos/page.tsx`.

## 4. Verificación y Calidad

- [x] 4.1 Ejecutar suite de pruebas Jest (`npm test`) y Pytest (`npm run test:backend`) asegurando 233 tests passing.
- [x] 4.2 Ejecutar `npm run typecheck` y certificar 0 errores de TypeScript.
- [x] 4.3 Ejecutar `npm run build` garantizando compilación de producción limpia en las 30 rutas de Next.js 16.
