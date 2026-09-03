## Context

El ecosistema Agrotech Venezuela cuenta con 27 rutas compiladas y 144 pruebas automatizadas. Este diseño aborda la integración horizontal de componentes que estaban desacoplados (el simulador frontend de micro-cultivo y los endpoints de telemetría de FastAPI), resuelve advertencias de herramientas de infraestructura (Docker Compose v2), provee scripts de orquestación ergonómicos, añade metadatos de Progressive Web App (PWA) y neutraliza menciones a entornos privados de pruebas (Google AI Studio) para presentar una arquitectura estandarizada orientada a cualquier entorno de nube o VPS.

## Goals / Non-Goals

**Goals:**
1. **Infraestructura Limpia**: Eliminar la advertencia `the attribute version is obsolete` removiendo `version: '3.8'` en `docker-compose.yml`.
2. **Scripts DX**: Incorporar comandos `services:up`, `services:down`, `test:all`, `typecheck` y `clean` en `package.json`.
3. **Puente E2E Agro-IoT**: Crear Route Handler `/api/iot/telemetry` en Next.js 16 que conecte con FastAPI `/api/v1/iot/telemetry` en puerto 8000 con tolerancia a fallos offline.
4. **Interactividad del Laboratorio**: Dotar a `MicrocropIoTLab.tsx` de un panel de transmisión en vivo a FastAPI con indicador de latencia y estado devuelto de la electroválvula.
5. **PWA Completa**: Suministrar `public/icon.svg`, `public/favicon.ico` y `public/manifest.webmanifest` con iconos vectoriales temáticos de Agrotech Venezuela.
6. **Visibilidad en Landing**: Incorporar acceso directo y tarjeta de presentación del Módulo 12 en `src/app/page.tsx`.
7. **Neutralización de Entornos Privados**: Retirar toda mención a "Google AI Studio" de `README.md`, `.env.production.example`, componentes Leaflet y especificaciones, estandarizándolo hacia "Google Gemini API", "Servidores Cloud / VPS" y "Entornos Sandboxed".

**Non-Goals:**
- No alterar las fórmulas edafológicas de encalado ni el modelo de clasificación de cobertura vegetal de MapBiomas.

## Decisions

### 1. Arquitectura del Route Handler de Telemetría (`/api/iot/telemetry`)
- Next.js expone un endpoint POST en `src/app/api/iot/telemetry/route.ts`.
- Intenta enviar la carga útil a `http://localhost:8000/api/v1/iot/telemetry` (o la variable `SPATIAL_BACKEND_URL`) con un timeout abortivo de 3 segundos.
- Si FastAPI responde 200, devuelve el payload con `backend_status: "FASTAPI_LIVE"`.
- Si FastAPI no está accesible (ej. solo Next.js activo en local), calcula la orden del actuador localmente según el umbral del cultivo y devuelve `backend_status: "LOCAL_FALLBACK"` con HTTP 200 para garantizar cero caídas en la UI.

### 2. Assets PWA Oficiales
- `public/icon.svg`: Emblema estilizado con hoja verde, espiga de trigo y órbita satelital en alta resolución.
- `public/manifest.webmanifest`: Declaración PWA con `display: standalone`, `background_color: #0b1329`, `theme_color: #22c55e`.

### 3. Neutralización de Google AI Studio
- En `README.md`: Sección de despliegue renombrada a "Despliegue Productivo con Docker & Cloud VPS".
- En `.env.production.example`: Encabezado de sección cambiado a "GOOGLE GEMINI API (PRODUCCIÓN)".
- En `LeafletMapInner.tsx` y `VenezuelaStateMapInner.tsx`: Comentarios de cabecera ajustados a "iframes, entornos sandboxed y Cloud Run".

## Risks / Trade-offs

- **[Latencia de red si FastAPI está caído]** → Mitigado con `AbortController` y timeout de 3000ms antes de activar el fallback local.
