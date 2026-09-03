## Context

Ver `proposal.md`. Con la incorporación del Laboratorio Agro-IoT de Micro-Cultivo (`/dashboard/iot`), el proyecto alcanzó 144 pruebas automatizadas aprobadas (93 Jest + 51 Pytest), 27 rutas en Next.js Turbopack y 12 módulos funcionales. Este diseño define el plan de sincronización integral para unificar todas las fuentes de verdad documentales, diagramas arquitectónicos y modales interactivos.

## Goals / Non-Goals

**Goals:**
- Actualizar todas las menciones a pruebas automatizadas a: **144 tests (93 Jest + 51 Pytest, 100% aprobadas)**.
- Actualizar todas las menciones de rutas a: **27 rutas de producción** en Next.js 16 Turbopack.
- Documentar formalmente el **Módulo 12: Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo** en `README.md` y `PITCH_DECK.md`.
- Expandir `DemoTourModal.tsx` de 4 a 5 pasos incorporando el paso de Agro-IoT in-situ con enlace a `/dashboard/iot`.
- Actualizar la ficha de postulación (`/dashboard/postulacion`) con insignias sincronizadas.
- Actualizar `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`) para reflejar el flujo del nodo cliente ESP32 hacia FastAPI `/api/v1/iot/telemetry`.

**Non-Goals:**
- No se modifican los contratos de API ni las fórmulas agronómicas de encalado/NPK ya validadas.

## Decisions

### 1. Jerarquía del Tour Demostrativo de 5 Pasos
1. *WebGIS Nacional & Edafología MapBiomas* (`/dashboard/mapa`)
2. *Micro-Parcelas & Radar SAR Sentinel-1 Banda C* (`/dashboard/tierras`)
3. *Prescripción Asistida por Gemini AI & Suelos* (`/dashboard/recomendaciones`)
4. *Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo* (`/dashboard/iot`)
5. *Madurez TRL 7, MRV de Carbono & APIs OpenAPI* (`/dashboard/postulacion`)

### 2. Flujo Arquitectónico en DataflowDiagramStudio
- Agregar el nodo `IOT_LAB` en la capa de clientes y enlazarlo con FastAPI mediante peticiones HTTP REST de telemetría de suelo y comandos de electroválvula.

## Risks / Trade-offs

- **[Discrepancia en suites de testing]** → Mitigación: Validar con `npm test` (93 tests) y `py -m pytest tests` (51 tests) antes de archivar.
