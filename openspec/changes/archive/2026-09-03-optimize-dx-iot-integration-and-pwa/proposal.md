## Why

Tras consolidar las 27 rutas y 144 pruebas automatizadas, se identificaron puntos clave de mejora en la ergonomía de desarrollo (DX), la infraestructura y la integración de sistemas: la advertencia de obsolescencia de `version: '3.8'` en Docker Compose, la ausencia de scripts unificados de orquestación y testing combinados en `package.json`, la desconexión entre el frontend didáctico de IoT y los endpoints reales de FastAPI (`/api/v1/iot/telemetry`), la falta de assets estáticos PWA (`manifest.webmanifest` y favicon) en `public/`, y la falta de visibilidad del Módulo 12 en la Landing Page. Asimismo, es necesario retirar todas las menciones a "Google AI Studio" en la documentación pública, especificaciones y código del proyecto, reservando dicha herramienta como un banco privado de pruebas en la nube para el desarrollador, y dejando el proyecto estructurado para cualquier entorno de despliegue en producción (VPS, Docker, Cloud Run).

## What Changes

- **DX & Limpieza de Infraestructura**:
  - Retirar la directiva obsoleta `version: '3.8'` de `docker-compose.yml` para una ejecución 100% limpia sin advertencias en Docker Compose CLI.
  - Añadir scripts de orquestación y desarrollo en `package.json`: `services:up`, `services:down`, `test:all`, `typecheck` y `clean`.
- **Integración E2E del Laboratorio Agro-IoT con FastAPI**:
  - Implementar el Route Handler `src/app/api/iot/telemetry/route.ts` en Next.js 16 para actuar como puente seguro hacia FastAPI (`http://localhost:8000/api/v1/iot/telemetry`), con tolerancia a fallos y fallback a simulación local si el backend está apagado.
  - En `MicrocropIoTLab.tsx`, incorporar un conmutador/botón "📡 Transmitir a Servidor FastAPI (Puerto 8000)" con telemetría en vivo, medición de latencia en milisegundos y visualización de la orden de electroválvula devuelta por Python.
- **PWA & Recursos Estáticos**:
  - Crear `public/favicon.ico` y `public/icon.svg` oficiales con el emblema de Agrotech Venezuela (🌾🛰️).
  - Crear `public/manifest.webmanifest` cumpliendo la especificación PWA para instalación móvil y en escritorio.
- **Visibilidad en Landing Page (`src/app/page.tsx`)**:
  - Agregar el acceso directo `🔬 Lab IoT` en la barra de navegación superior de la landing page.
  - Añadir la tarjeta de presentación del **Módulo 12: Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo** en la grilla de pilares funcionales.
- **Neutralización de Referencias a Google AI Studio**:
  - Eliminar toda mención a "Google AI Studio" en `README.md`, `.env.production.example`, `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/VenezuelaStateMapInner.tsx` y en las especificaciones OpenSpec, refiriéndose en su lugar a "Google Gemini API", "Servidores Cloud / VPS", "Docker" o "entornos sandboxed".

## Capabilities

### Modified Capabilities
- `interactive-iot-microcrop-lab`: Incorporación del puente de telemetría E2E hacia FastAPI (`/api/iot/telemetry`) y modo de transmisión en vivo con retroalimentación de actuador del backend.
- `production-readiness-and-hygiene`: Retiro de menciones a Google AI Studio en configuración y documentación, agregando scripts de conveniencia, eliminación de warnings de Docker Compose y provisión de assets PWA.
- `native-leaflet-map-engine`: Neutralización de referencias a Google AI Studio en comentarios y escenarios de soporte para iframes y entornos sandboxed.

## Impact

- Archivos modificados: `docker-compose.yml`, `package.json`, `README.md`, `.env.production.example`, `src/app/page.tsx`, `src/components/agronomy/MicrocropIoTLab.tsx`, `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/VenezuelaStateMapInner.tsx`.
- Nuevos archivos: `src/app/api/iot/telemetry/route.ts`, `public/icon.svg`, `public/manifest.webmanifest`, `__tests__/api/iot-telemetry-route.test.ts`.
- Pruebas y validación: Se preservarán y aumentarán las 144 pruebas automatizadas con 0 errores de TypeScript y 27+ rutas limpias en Turbopack.
