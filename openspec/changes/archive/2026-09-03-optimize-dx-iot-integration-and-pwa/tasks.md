## 1. DX, Scripts y Limpieza de Infraestructura

- [x] 1.1 En `docker-compose.yml`, retirar la línea `version: '3.8'` para eliminar la advertencia de atributo obsoleto en Docker Compose v2.
- [x] 1.2 En `package.json`, añadir los scripts de conveniencia `services:up`, `services:down`, `test:all`, `typecheck` y `clean`.
- [x] 1.3 Crear `public/icon.svg` y `public/favicon.ico` con el emblema de Agrotech Venezuela.
- [x] 1.4 Crear `public/manifest.webmanifest` con la especificación PWA y enlazarlo en `src/app/layout.tsx`.

## 2. Integración E2E Agro-IoT con FastAPI

- [x] 2.1 Implementar el Route Handler `src/app/api/iot/telemetry/route.ts` con proxy hacia FastAPI y fallback de tolerancia a fallos.
- [x] 2.2 En `src/components/agronomy/MicrocropIoTLab.tsx`, incorporar la función interactiva y botón "📡 Transmitir a Servidor FastAPI" mostrando latencia y respuesta del actuador.
- [x] 2.3 Crear la suite de pruebas unitarias Jest `__tests__/api/iot-telemetry-route.test.ts` para validar el endpoint y su fallback.

## 3. Visibilidad en Landing Page y Neutralización de Referencias a Google AI Studio

- [x] 3.1 En `src/app/page.tsx`, añadir el enlace a `/dashboard/iot` en la barra de navegación superior y la tarjeta del Módulo 12 en la grilla de módulos.
- [x] 3.2 En `README.md` y `.env.production.example`, retirar las referencias a Google AI Studio y sustituirlas por Google Gemini API y servidores Cloud / VPS.
- [x] 3.3 En `src/components/gis/LeafletMapInner.tsx` y `VenezuelaStateMapInner.tsx`, neutralizar menciones a Google AI Studio en comentarios de cabecera.

## 4. Verificación Automatizada y Validación Integral

- [x] 4.1 Ejecutar `npx tsc --noEmit` para verificar 0 errores TypeScript.
- [x] 4.2 Ejecutar `npm test` para certificar las pruebas de frontend y `py -m pytest tests` para el backend.
- [x] 4.3 Ejecutar el nuevo script `npm run test:all` certificando la ejecución unificada de las suites de prueba.
- [x] 4.4 Compilar en producción con `npm run build` verificando la generación de todas las rutas limpias en Next.js Turbopack.
