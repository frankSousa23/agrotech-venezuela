# Design: MapBiomas Soil Module Complementarity Blueprint

## Context

La plataforma Agrotech Venezuela cuenta con un portal integral de postulación en `src/app/dashboard/postulacion/page.tsx`, memorandos institucionales (`docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`), memoria de ingeniería (`docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`), y una suite de pruebas automatizadas con 292 tests. Ver `proposal.md` para la motivación institucional y contextualización ante el Premio MapBiomas Venezuela 2026.

El enfoque técnico consiste en consolidar la tesis de diseño: demostrar al comité evaluador que Agrotech no compite con MapBiomas ni es una herramienta desconectada, sino que es el **prototipo operacional (TRL 4) prediseñado para convertirse en el Módulo de Suelos de MapBiomas Venezuela**, traduciendo 40 años de matrices de cobertura vegetal en balances edáficos y prescripciones agrícolas reales.

## Goals / Non-Goals

**Goals:**
- Incorporar en el portal de postulación (`/dashboard/postulacion`) un bloque arquitectónico destacado ("Complementariedad Estratégica: Módulo de Suelos MapBiomas Venezuela") con insignias de interoperabilidad y diagrama de flujo conceptual (Datos Raster MapBiomas 1985–2024 → Inferencia Edafológica Saxton-Rawls/Kamprath → Prescripciones Agronómicas Tri-Modales).
- Sincronizar de forma íntegra los expedientes (`MEMORANDO_POSTULACION.md` y `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`) en sus rutas internas (`docs/`) y públicas descargables (`public/docs/`).
- Actualizar `AGENTS.md` para formalizar la directriz de complementariedad como principio canónico del repositorio.
- Añadir aserciones en `__tests__/api/security-and-dossier.test.ts` que validen la presencia y consistencia textual de esta complementariedad.

**Non-Goals:**
- No alterar los algoritmos matemáticos ni el código base de cálculo edafológico (`kamprath`, `saxton-rawls`, `sarRadarService`, etc.).
- No modificar esquemas de bases de datos relacionales ni SQLite.
- No alterar la estructura de rutas existentes (las 35 rutas se mantienen inalteradas).

## Decisions

### Decisión 1: Tarjeta Arquitectónica de Alta Visibilidad en el Portal de Postulación
- **Elección**: Agregar una sección modular visual en `src/app/dashboard/postulacion/page.tsx` inmediatamente después del resumen ejecutivo y antes de la línea de tiempo de las 5 Eras.
- **Razón**: Permite que los evaluadores identifiquen al primer impacto visual que el proyecto resuelve la brecha de suelos que la iniciativa MapBiomas Venezuela aún no ha desplegado a nivel nacional.
- **Alternativas consideradas**:
  - *Crear una nueva ruta separada `/dashboard/suelos-mapbiomas`*: Descartada porque diluye la atención del evaluador; el expediente debe ser autocontenido y unificado.
  - *Mencionarlo únicamente en los PDFs descargables*: Descartada porque muchos evaluadores navegan primero la interfaz web antes de descargar documentos.

### Decisión 2: Sincronización Estricta entre `docs/` y `public/docs/`
- **Elección**: Actualizar concurrentemente los archivos canónicos en `docs/` y sus réplicas estáticas en `public/docs/`.
- **Razón**: Los evaluadores que descargan el archivo Markdown directamente desde el servidor web obtendrán la versión con paridad al 100%.
- **Alternativas consideradas**:
  - *Generar symlinks*: Descartada por potenciales problemas de portabilidad en sistemas Windows/Docker.

### Decisión 3: Verificación por Tests Automatizados en Jest
- **Elección**: Extender la suite en `__tests__/api/security-and-dossier.test.ts` con aserciones que verifiquen que el memorando institucional y la memoria creativa contengan las referencias explícitas a "MapBiomas Suelos", "Módulo de Suelos" y "40 años".
- **Razón**: Garantiza inmunidad contra regresiones o ediciones accidentales en futuros commits.

## Risks / Trade-offs

- **[Riesgo]** Desfase de estilos CSS en dispositivos móviles al agregar la nueva tarjeta en la postulación.
  - *Mitigación*: Utilizar el mismo sistema de diseño glassmorphism y clases CSS nativas existentes en la página (`border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md rounded-2xl p-6`).
- **[Riesgo]** Confusión sobre si el módulo ya es oficial de MapBiomas.
  - *Mitigación*: Enfatizar rigurosamente los términos "Prototipo Operacional Fundacional", "Candidato a Integración" y "TRL 4", respetando la autoría y gobernanza de MapBiomas Venezuela.
