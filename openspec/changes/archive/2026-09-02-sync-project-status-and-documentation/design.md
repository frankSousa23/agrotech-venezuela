## Context

Ver `proposal.md`. La plataforma cuenta con una arquitectura de 4 microservicios, 140 pruebas automatizadas y 26 rutas Next.js 16 App Router con Turbopack, pero las referencias documentales y badges visuales aún conservan valores históricos dispares (63 tests vs 89 vs 140, 25 rutas vs 26). Este diseño establece la estrategia para unificar y sincronizar todas las fuentes.

## Goals / Non-Goals

**Goals:**
- Sincronizar en todas las ubicaciones la métrica exacta: **140 pruebas automatizadas (89 Jest + 51 Pytest, 100% aprobadas)** y **26 rutas Next.js limpias**.
- Documentar en `README.md` y `PITCH_DECK.md` las innovaciones clave: Tour Demostrativo de 4 pasos (`DemoTourModal`), Navegación Universal (`BackButton`), Deep-Linking Parcela ➔ Prescripción IA y perfil de producción Docker.
- Actualizar las pautas de arquitectura en `AGENTS.md` (26 rutas) y la cabecera de `/dashboard/postulacion`.
- Sincronizar `docs/MEMORANDO_POSTULACION.md` para comités y evaluadores.

**Non-Goals:**
- No se alteran modelos de Machine Learning, APIs REST ni bases de datos.

## Decisions

### 1. Unificación de Métricas de Testing
- **Decisión:** Especificar siempre el desglose transparente: "140 Tests Automatizados (89 Jest Frontend/WebGIS + 51 Pytest Backend/ML/IA)".
- **Archivos:** `PITCH_DECK.md`, `README.md`, `AGENTS.md`, `src/app/dashboard/postulacion/page.tsx`, `docs/MEMORANDO_POSTULACION.md`.

### 2. Documentación de Módulos Recientes en README
- **Decisión:** Añadir a los módulos del `README.md`:
  - *Módulo 9: Modo Demostración / Tour Guiado (`DemoTourModal`)*: Recorrido de 4 pasos para jurados y evaluadores.
  - *Módulo 10: Navegación Universal de Retorno (`BackButton`)*: Retorno con fallback inteligente en vistas standalone y visores multinivel.
  - *Sección Despliegue Producción*: Instrucciones sobre `.env.production.example` y Docker con `profiles: ["prod", "production"]`.

### 3. Ficha Técnica `/dashboard/postulacion`
- **Decisión:** Actualizar la insignia de cabecera a 140 tests y en el paso 1 de la Guía de Evaluación referenciar el botón `🎬 Tour Demo`.

## Risks / Trade-offs

- **[Inconsistencia futura en conteos al agregar tests]** → Mitigación: Establecer como norma en `AGENTS.md` actualizar tanto Jest como Pytest al agregar suites.
