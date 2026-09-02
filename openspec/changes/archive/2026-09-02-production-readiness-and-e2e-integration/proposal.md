## Why

Para consolidar el proyecto de cara a su presentación pública, evaluación en Google AI Studio y posterior despliegue en un servidor de producción, se requiere optimizar e higienizar el repositorio (eliminando archivos huérfanos, cachés y artefactos locales de Git), conectar de forma fluida los módulos principales en flujos punta a punta (como el trazado de parcelas con el dictamen de Gemini AI), incorporar un tour demostrativo para evaluadores y preparar la arquitectura con tolerancia a fallos ("Zero-Fail") y guías de despliegue productivo.

## What Changes

- **Higiene y Limpieza del Repositorio:**
  - Des-trackear de Git cachés locales como `tsconfig.tsbuildinfo`, logs temporales (`eslint_output.txt`) y scripts de scratch antiguos (`scratch_fix.py`, `scratch/fix_css.js`).
  - Robustecer `.gitignore` con exclusiones exhaustivas para cachés de compilación, logs, artefactos temporales y archivos locales.
- **Integración E2E Parcela ➔ Recomendación:**
  - En `/dashboard/tierras`, tras guardar o seleccionar una parcela delimitada, ofrecer botón directo "✨ Diagnóstico Agronómico con IA" que transfiera el contexto a `/dashboard/recomendaciones` preseleccionando cultivo y coordenadas.
- **Modo Demostración / Tour Guiado:**
  - Crear componente interactivo `DemoTourModal.tsx` accesible desde la barra superior para guiar a jurados y evaluadores a través de los 4 pilares clave del sistema (WebGIS Nacional, Micro-Parcela SAR, Asesor Gemini AI, Ficha TRL 7).
- **Preparación para Producción & Resiliencia Zero-Fail:**
  - Crear `.env.production.example` con documentación integral de todas las variables de entorno.
  - Garantizar fallback agronómico en el backend y frontend si la cuota de Google AI Studio se agota durante una demostración en vivo.
- **Suite de Auditoría Final:**
  - Comprobación estricta de tipos TypeScript (`npx tsc --noEmit`), suite Jest (`npm test`) y validación de compilación limpia de Next.js (`npm run build`).

## Capabilities

### New Capabilities
- `production-readiness-and-hygiene`: Normas de higiene de código Git, exclusión de artefactos locales y configuración de variables para producción.
- `guided-demo-tour`: Recorrido interactivo guiado de 4 pasos para presentaciones técnicas y evaluación institucional.

### Modified Capabilities
- `parcel-boundary-draw`: Añadir enlace de navegación continua con pre-carga de parámetros desde la lista y mapa de parcelas hacia el asesor agronómico de Gemini AI.

## Impact

- `.gitignore`: Actualización de reglas de exclusión.
- `src/components/layout/DemoTourModal.tsx`: Nuevo componente modal para la demostración guiada.
- `src/app/dashboard/layout.tsx`: Integración del botón de inicio de tour en la barra de utilidades.
- `src/app/dashboard/tierras/page.tsx`: Botón de conexión directa hacia recomendaciones de IA.
- `src/app/dashboard/recomendaciones/page.tsx`: Soporte para lectura de parámetros de consulta (`?parcelId=...` o `?crop=...`).
- `.env.production.example`: Nueva plantilla documentada para despliegue en VPS/Cloud.
- Git Index: Eliminación de archivos temporales trackeados.
