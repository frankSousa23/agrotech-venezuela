# Proposal: MapBiomas Soil Module Ecosystem Integration

## Why

Para maximizar la visibilidad y el impacto de Agrotech Venezuela ante el jurado del **Premio MapBiomas Venezuela 2026**, no basta con tener la complementariedad del Módulo de Suelos reflejada en el portal de postulación y el memorando; es imperativo que **toda la experiencia de usuario y documentación institucional proyecte coherentemente esta visión**. Cualquier evaluador que revise el repositorio en GitHub (`README.md`), navegue la página de inicio (`src/app/page.tsx`), consulte el Estudio de Arquitectura (`DataflowDiagramStudio.tsx`), examine la Matriz Oficial de Evaluación (`MATRIZ_CUMPLIMIENTO_EVALUACION.md`), o lea el Artículo Técnico (`ARTICULO_TECNICO_DRAFT.md`), debe reconocer de inmediato que Agrotech es el **prototipo fundacional (TRL 4) de código abierto diseñado para dotar a MapBiomas Venezuela de su Módulo de Suelos**.

## What Changes

1. **Front-Door del Repositorio (`README.md`)**:
   - Añadir insignia institucional de MapBiomas Suelos.
   - Declarar en la sección introductoria y en la sección del Premio 2026 la tesis de complementariedad como prototipo de suelos de MapBiomas.
2. **Página de Inicio y Hero Banner (`src/app/page.tsx`)**:
   - Actualizar el distintivo del Hero (`awardBadge`) y el subtítulo para destacar: *"Prototipo Fundacional para MapBiomas Suelos Venezuela • TRL 4"*.
3. **Matriz Oficial de Criterios (`MATRIZ_CUMPLIMIENTO_EVALUACION.md` en `docs/` y `public/docs/`)**:
   - Incorporar en el **Criterio 6 (Aporte a MapBiomas Venezuela, 5%)** y en el **Criterio 2 (Originalidad e Innovación, 20%)** la entrega del código, modelos y arquitectura para el Módulo de Suelos como evidencia verificable.
4. **Artículo Técnico Científico (`ARTICULO_TECNICO_DRAFT.md` en `docs/` y `public/docs/`)**:
   - Enriquecer el Resumen / Abstract y la Sección de Introducción formalizando a Agrotech como el precursor tecnológico del Módulo de Suelos de MapBiomas Venezuela.
5. **Estudio de Arquitectura de Datos (`DataflowDiagramStudio.tsx`)**:
   - Extender el Diagrama 5 ("Matriz de Integración MapBiomas") para conectar el flujo de cobertura raster hacia el nodo *"🌱 Módulo de Suelos MapBiomas (TRL 4)"*.
6. **Catálogo de Suelos (`src/app/dashboard/suelos/page.tsx`)**:
   - Incorporar badge y subtítulo identificando los 1.245 perfiles calibrados como la capa base para MapBiomas Suelos.
7. **Suite de Pruebas Automatizadas**:
   - Extender las pruebas en Jest para verificar la sincronización de estos puntos de contacto, manteniendo los 292 tests pasando y 0 errores de compilación.

## Capabilities

### New Capabilities
*(Ninguna)*

### Modified Capabilities
- `repository-showcase-and-evaluator-guide`: Extiende la guía de evaluación y la matriz del baremo para codificar el aporte fundacional del Módulo de Suelos de MapBiomas en el README y la documentación técnica oficial.
- `interactive-landing-ecosystem`: Incorpora en la página de inicio (`src/app/page.tsx`) la acreditación explícita de Agrotech como prototipo operacional para MapBiomas Suelos.

## Impact

- **Código y Documentación Afectada**:
  - `README.md`
  - `src/app/page.tsx`
  - `src/components/diagrams/DataflowDiagramStudio.tsx`
  - `src/app/dashboard/suelos/page.tsx`
  - `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` y su réplica en `public/docs/`
  - `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` y su réplica en `public/docs/`
  - `__tests__/api/security-and-dossier.test.ts`
- **Riesgo Operativo**: Nulo. Cambios aditivos y de alineación documental y visual sin alterar lógica matemática, APIs o dependencias.
- **Calidad**: Preservación estricta de 292 tests (237 Jest + 55 Pytest), 0 errores TypeScript y 35 rutas limpias.
