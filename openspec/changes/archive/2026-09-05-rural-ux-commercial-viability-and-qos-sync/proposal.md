## Why

La evaluación externa del proyecto identificó tres fricciones críticas que comprometen la adopción rural y la viabilidad ante comités evaluadores e inversionistas:
1. **Salto cognitivo en la IA**: Aunque la interfaz cuenta con un Modo Productor accesible ("Tierra Mansa", dictado por voz), las respuestas de Gemini AI devuelven jerga ultratécnica (grados día de crecimiento, decibeles de retrodispersión radar, Shoelace elipsoidal), rompiendo la inmersión del agricultor.
2. **Desbalance Técnico vs. Viabilidad de Negocio**: El expediente resalta proezas arquitectónicas (TRL 7, 197 tests), pero opaca el modelo de ingresos. La calculadora de carbono (MRV) se percibe como una fórmula matemática en vez de un modelo fintech escalable de agregación de bonos de carbono para pequeños productores.
3. **Riesgo de colapso en sincronización offline rural**: Al recuperar conexión débil (2G/EDGE) en el campo, el sistema carece de un protocolo QoS que priorice el envío de notas ligeras de bitácora (< 10 KB) bloqueando descargas masivas de teselas satelitales (> 20 MB).

## What Changes

- **IA Dual-Tone & Capa de Traducción Vernácula**:
  - Propagar `uiMode` (`'farmer' | 'technical'`) desde el contexto de interfaz hacia `/api/gemini/advisor`.
  - Configurar en Gemini y en el motor determinista local el rol "El Compadre Agrónomo" para el Modo Productor (traducción de radar SAR a "humedad bajo tierra", GDD a "días de sol para espigar", Kamprath a "sacos de cal para endulzar el suelo bravo").
  - Preservar la rigurosidad edafológica y satelital completa para el Modo Técnico.
- **Modelo de Negocio & Agregador de Carbono (MRV Carbon Pooling)**:
  - Reestructurar `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md` y `src/app/dashboard/postulacion/page.tsx` anteponiendo el impacto económico (ROI rural de 3.8x, -35% en fertilizantes) y las 4 capas de monetización B2B/B2G.
  - Integrar en `CarbonCreditsCalculator.tsx` la simulación del modelo comercial de "Pool Regional de Carbono" (85% para el agricultor, 15% comisión de plataforma Agrotech) resolviendo la barrera de certificación de pequeños lotes.
- **Protocolo de Priorización QoS Rural (2-Tier Sync)**:
  - Definir Canal A (Uplink crítico ligero < 10 KB: bitácora de campo, polígonos) despachado inmediatamente al reconectar con UUID idempotente.
  - Definir Canal B (Downlink pesado > 500 KB: teselas de mapas y satélite) que se pausa automáticamente en conexiones lentas (`2g`, `slow-2g`, `saveData: true` o RTT > 600ms).
  - Banner informativo en `ConnectivityStatusBadge.tsx` y encolado real en `agrotech_offline_field_logs` con reintentos idempotentes.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `farmer-mode-dual-ui`: Incorporar la capa de traducción dual en los prompts de la IA y el motor determinista, alineando el lenguaje del asesor al Modo Productor o Modo Técnico.
- `carbon-credits-mrv-calculator`: Expandir la calculadora MRV para proyectar el modelo de negocio escalable de agregación de carbono (Carbon Pooling) y retorno neto para el productor.
- `connectivity-sync-indicator`: Implementar el protocolo QoS rural de 2 capas que prioriza cargas de texto ligero y bloquea/pospone descargas de mapas pesados en señales intermitentes o débiles.

## Impact

- **APIs afectadas**:
  - `/api/gemini/advisor`: Soporte para parámetro `uiMode` y branching de `systemInstruction` + fallback determinista dual.
  - `/api/field-logs`: Procesamiento de `clientLogId` para garantizar idempotencia y resolución de conflictos Last-Write-Wins (LWW).
- **Componentes y Páginas**:
  - `src/components/gis/ParcelDiagnosticModal.tsx` y `src/app/dashboard/recomendaciones/page.tsx`: Inyección de `uiMode` en peticiones de asesoría.
  - `src/components/layout/ConnectivityStatusBadge.tsx`: Detección de calidad de red (Network Information API) y control de QoS.
  - `src/app/dashboard/bitacora/page.tsx`: Encolado offline real en `localStorage` ante desconexión o fallo.
  - `src/components/agronomy/CarbonCreditsCalculator.tsx`: Módulo de agregación de bonos y retorno económico.
  - `src/app/dashboard/postulacion/page.tsx`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`: Reorganización comercial con la economía al frente y especificaciones técnicas en apéndices.
