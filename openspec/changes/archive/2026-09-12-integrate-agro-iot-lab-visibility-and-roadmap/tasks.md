# Tasks: integrate-agro-iot-lab-visibility-and-roadmap

## 1. Integración de Navegación y Acceso en Frontend

- [x] 1.1 Agregar botón de acceso directo "🔬 Lab IoT (Pruebas)" y tarjeta de orientación en el flujo guiado de `src/app/dashboard/page.tsx`, verificando que enlace a `/dashboard/iot`.
- [x] 1.2 Incorporar la intención "Probar sensores y microrriego (Lab IoT)" en `src/components/layout/IntentionsModal.tsx`, verificando que redirija correctamente a `/dashboard/iot`.
- [x] 1.3 Agregar nota contextual de investigación en ambiente controlado en `src/app/dashboard/tierras/page.tsx` dentro del panel de Gemelo Digital IoT.

## 2. Documentación y Hoja de Ruta Formal

- [x] 2.1 Actualizar el `README.md` principal incorporando la sección formal sobre el Laboratorio Agro-IoT (Fase 1: Ambiente controlado / micro-bancal de bajo costo vs Fase 2: Escalamiento macro-territorial en campo con redes malladas y radar SAR).

## 3. Verificación y Calidad

- [x] 3.1 Ejecutar suite completa de Jest (`npm test`) y verificar que todos los tests pasen al 100%.
- [x] 3.2 Ejecutar `npm run typecheck` y certificar 0 errores de TypeScript.
- [x] 3.3 Ejecutar `npm run build` y asegurar que la compilación de producción en Next.js 16 se complete exitosamente.
