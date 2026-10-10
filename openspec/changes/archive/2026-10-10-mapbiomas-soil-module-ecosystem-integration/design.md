# Design: MapBiomas Soil Module Ecosystem Integration

## Context

El ecosistema Agrotech Venezuela cuenta con la complementariedad consagrada en el portal de postulación y el memorando técnico. Sin embargo, para que los miembros del jurado evaluador y la comunidad científica perciban la coherencia integral del proyecto, todos los puntos de contacto primarios deben reflejar armónicamente esta misma tesis: el repositorio en GitHub (`README.md`), la página principal de la aplicación (`src/app/page.tsx`), la matriz oficial de baremo (`MATRIZ_CUMPLIMIENTO_EVALUACION.md`), el artículo técnico (`ARTICULO_TECNICO_DRAFT.md`), el estudio de arquitectura (`DataflowDiagramStudio.tsx`) y el módulo de perfiles edafológicos (`/dashboard/suelos`).

## Goals / Non-Goals

**Goals:**
- Proyectar con total claridad y elegancia en la portada de GitHub (`README.md`) y en la página web principal (`src/app/page.tsx`) que Agrotech es el prototipo fundacional (TRL 4) prediseñado para el Módulo de Suelos de MapBiomas Venezuela.
- Explicitación formal en el Criterio 6 (Aporte a MapBiomas, 5%) y Criterio 2 (Originalidad, 20%) de `MATRIZ_CUMPLIMIENTO_EVALUACION.md` del aporte de código abierto, curvas Saxton-Rawls y calibraciones edafológicas para la red MapBiomas.
- Enriquecer el Resumen y la Introducción de `ARTICULO_TECNICO_DRAFT.md` (y su réplica pública) para situar la investigación como el puente entre series satelitales históricas y salud edafológica de cultivos y pasturas.
- Conectar visualmente en el Diagrama 5 de `DataflowDiagramStudio.tsx` la ingesta raster de 40 años con el bloque del Módulo de Suelos.
- Mantener 100% de paridad documental entre `docs/` y `public/docs/`, 0 errores TypeScript, y 292 tests pasando.

**Non-Goals:**
- No alterar esquemas de bases de datos ni modelos matemáticos ya validados (Shoelace, Kamprath, Saxton-Rawls, SAR).
- No modificar el enrutamiento de Next.js (se mantienen las 35 rutas).
- No alterar las cuotas ni llamadas a APIs externas.

## Decisions

### Decisión 1: Integración Visual y Textual en la Portada de GitHub (`README.md`)
- **Elección**: Agregar una insignia oficial en la cabecera (`MapBiomas Suelos: Prototipo Operacional TRL 4`) y una subsección explícita en "¿Qué es Agrotech Venezuela?" y en la sección de la convocatoria 2026.
- **Razón**: Es lo primero que los jueces ven cuando abren el repositorio en GitHub sin correr la aplicación.

### Decisión 2: Distintivo de Honor en la Landing Page (`src/app/page.tsx`)
- **Elección**: Modificar el `awardBadge` del Hero para indicar *"Prototipo Operacional para MapBiomas Suelos Venezuela • TRL 4 (292 Tests)"* y ajustar el subtítulo para enfatizar la conexión entre los 40 años de datos y la física subsuperficial del suelo.
- **Razón**: Genera coherencia inmediata al abrir `http://localhost:3000` o la URL en vivo.

### Decisión 3: Fortalecimiento del Criterio 6 en la Matriz de Evaluación
- **Elección**: Añadir el ítem 4 en el Criterio 6 de `MATRIZ_CUMPLIMIENTO_EVALUACION.md` especificando la entrega de código libre MIT, 1.245 perfiles calibrados y prescripciones tri-modales como la semilla lista para que el consorcio MapBiomas active su Módulo de Suelos en Venezuela.
- **Razón**: Permite que el evaluador califique con nota máxima el rubro de aporte específico a MapBiomas Venezuela.

### Decisión 4: Extensión del Diagrama 5 en Mermaid.js
- **Elección**: En `DataflowDiagramStudio.tsx`, enriquecer el flujo del diagrama 5 para que el análisis de cambio de cobertura desemboque en el nodo `🌱 Módulo de Suelos MapBiomas (TRL 4)`.
- **Razón**: Los evaluadores técnicos que exploran la ruta `/dashboard/arquitectura` verán el flujo lógico renderizado en tiempo real.

## Risks / Trade-offs

- **[Riesgo]** Desincronización entre archivos Markdown de evaluación en `docs/` y `public/docs/`.
  - *Mitigación*: Automatizar la copia exacta en la misma tarea de implementación y verificar con `git diff --no-index`.
- **[Riesgo]** Errores de sintaxis en el diagrama Mermaid.js al modificar el string template.
  - *Mitigación*: Probar y renderizar la ruta `/dashboard/arquitectura` validando la compilación con `npm test` y `npm run typecheck`.
