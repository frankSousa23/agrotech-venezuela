# Design: Sincronización Exhaustiva de Métricas de Calidad a 292 Pruebas Automatizadas

## Context

Véase `proposal.md` para la motivación. La suite de pruebas de Agrotech Venezuela cuenta actualmente con **292 pruebas automatizadas pasando al 100%**:
- **Frontend / Fullstack (Jest)**: 237 pruebas distribuidas en 33 suites de prueba.
- **Backend Espacial & ML (Pytest)**: 55 pruebas distribuidas en 17 módulos de prueba.
- **Total combinado**: 292 pruebas (0 fallos, 0 errores TypeScript, 35 rutas Next.js 16 App Router con Turbopack y 39 endpoints FastAPI).

## Goals / Non-Goals

**Goals:**
- Actualizar de manera atómica y coherente todas las superficies visuales, badges, tarjetas de verificación y textos de auditoría que mencionan 290 pruebas (o cifras heredadas) para reflejar exactamente **292 pruebas automatizadas (237 Jest + 55 Pytest)**.
- Sincronizar simultáneamente la aserción en `__tests__/api/security-and-dossier.test.ts` para que valide `'292 pruebas automatizadas'` contra `docs/MEMORANDO_POSTULACION.md`.
- Mantener la integridad de los 292 tests pasando en verde, la compilación de 35 rutas y la comprobación de tipos TypeScript.

**Non-Goals:**
- No modificar la lógica de negocio ni los algoritmos geoespaciales o agronómicos.
- No alterar la estructura de endpoints ni añadir nuevas rutas innecesarias.

## Decisions

### 1. Actualización Atómica y Simetría de Pruebas
- **Decisión**: Actualizar de forma sincronizada el archivo `docs/MEMORANDO_POSTULACION.md` y la aserción de `__tests__/api/security-and-dossier.test.ts` (línea 170).
- **Razón**: El test verifica programáticamente la presencia del texto exacto sobre las pruebas automatizadas en el memorando para evitar desincronizaciones accidentales en el dossier entregado al jurado.
- **Alternativas consideradas**: Eliminar la aserción (rechazado: debilita la garantía de calidad de la documentación formal).

### 2. Segmentación de Áreas de Cambio
Se estructuran 5 grupos de actualización técnica:
1. **Frontend UI Components**:
   - `src/app/dashboard/postulacion/page.tsx`: Badges de cabecera, tarjetas de auditoría TRL 4 y desglose Jest/Pytest.
   - `src/components/layout/DemoTourModal.tsx`: Métricas del modal de bienvenida y tour.
   - `src/components/gis/MultiLevelMapViewer.tsx`: Insignia de confiabilidad de la barra de herramientas.
   - `src/components/diagrams/DataflowDiagramStudio.tsx`: Panel de auditoría de arquitectura.
2. **Expedientes de Postulación y Documentación Canónica (`docs/`, `public/docs/`, `docs/mapbiomas_premio_2026/`)**:
   - `MEMORANDO_POSTULACION.md`, `ARTICULO_TECNICO_DRAFT.md`, `PITCH_DECK.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`, `SHOWCASE.md`.
3. **Pautas de Arquitectura y Entrada al Repositorio**:
   - `README.md`: Badge Shields.io `Tests-292%20Passing`, descripciones y tabla expandible de pruebas.
   - `DEVELOPING.md`: Guía de desarrollo y ejecución de comandos de prueba.
   - `AGENTS.md`: Directrices de arquitectura del ecosistema.
4. **Scripts de Compilación y Exportación**:
   - `scripts/generate_prize_pdf.py`: Certificación de 292 pruebas embebidas en el PDF compilado.
5. **Aserciones de Verificación en Pruebas**:
   - `__tests__/api/security-and-dossier.test.ts`.

## Risks / Trade-offs

- **[Riesgo] Desfase entre documentación y aserción de test**: Si se actualiza el memorando sin la aserción en Jest, el test suite fallará.
  → *Mitigación*: Se aplica el cambio en paralelo y se ejecuta de inmediato `npm test` para certificar el paso de las 237 pruebas Jest.
- **[Riesgo] Dispersión de archivos duplicados (`docs/` vs `public/docs/` vs `docs/mapbiomas_premio_2026/`)**:
  → *Mitigación*: Modificar exhaustivamente cada copia identificada en el inventario del compaction summary para garantizar consistencia absoluta tanto si el evaluador navega en GitHub, en el portal web o en los PDFs generados.
