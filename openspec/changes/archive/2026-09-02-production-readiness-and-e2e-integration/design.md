## Context

Ver `proposal.md` para justificación. El sistema cuenta con microservicios sólidos, suites de pruebas automatizadas y cobertura territorial nacional, pero requiere elevar la cohesión entre módulos (flujo continuo entre parcelas e inteligencia artificial), limpiar el repositorio de archivos efímeros antes de su publicación y preparar la configuración para el despliegue en producción.

## Goals / Non-Goals

**Goals:**
- Des-trackear de Git y depurar archivos no esenciales (`tsconfig.tsbuildinfo`, `eslint_output.txt`, `scratch_fix.py`, `scratch/fix_css.js`).
- Reforzar `.gitignore` para blindar el repositorio contra artefactos de compilación y logs locales.
- Implementar deep-linking entre `/dashboard/tierras` y `/dashboard/recomendaciones` para que las parcelas guardadas puedan solicitar prescripción con 1 clic sin reescribir datos.
- Desarrollar el componente `DemoTourModal.tsx` con un recorrido interactivo de 4 pasos para presentaciones técnicas.
- Crear `.env.production.example` documentando cada parámetro de configuración para despliegues en servidores Linux VPS o Google Cloud.

**Non-Goals:**
- No se modifican los esquemas relacionales de base de datos de Prisma ni los endpoints geoespaciales de FastAPI.

## Decisions

### 1. Higiene del Repositorio Git
- **Decisión:** Ejecutar `git rm --cached tsconfig.tsbuildinfo`, eliminar archivos de log/scratch que ya no tienen vigencia y añadir reglas explícitas en `.gitignore` (`*.tsbuildinfo`, `*.log`, `*_output.txt`, `scratch/`).
- **Razón:** Mantener el repositorio limpio, profesional y ligero para jurados y evaluadores de código abierto.

### 2. Deep-Link de Parcelas hacia Recomendaciones de IA
- **Decisión:** En `src/app/dashboard/tierras/page.tsx`, cada tarjeta de parcela guardada incluirá una acción directa `✨ Asesor IA` con ruta `/dashboard/recomendaciones?stateId=${p.stateId}&crop=${p.crop}&parcelName=${encodeURIComponent(p.name)}`.
- **Decisión:** En `src/app/dashboard/recomendaciones/page.tsx`, capturar `useSearchParams()` para autocompletar el formulario de consulta inmediatamente.

### 3. Modal de Demostración Guiada (`DemoTourModal.tsx`)
- **Decisión:** Componente flotante accesible desde la barra superior (`layout.tsx`) con botón `🎬 Tour Demo`.
- **Estructura del Tour:**
  - *Paso 1:* Cartografía Nacional & Edafología MapBiomas.
  - *Paso 2:* Micro-Parcela Sentinel-1 SAR (penetración de nubes).
  - *Paso 3:* Dictamen Agronómico y Prescripción Asistida por Gemini AI.
  - *Paso 4:* Certificación TRL 7, MRV de Carbono y APIs OpenAPI.

### 4. Plantilla de Variables de Producción (`.env.production.example`)
- **Decisión:** Documentar variables agrupadas por categorías (Base de datos, Autenticación JWT, Endpoints de APIs satelitales, Llaves de Gemini en Google AI Studio).

## Risks / Trade-offs

- **[Pérdida de parámetros de URL al recargar]** → Mitigación: `recomendaciones/page.tsx` mantendrá valores por defecto si no se detectan parámetros en la query string.
