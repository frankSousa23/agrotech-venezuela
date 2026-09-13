# Proposal: connect-system-integrations-and-routes

## Why

Diversos subsistemas clave del ecosistema Agrotech Venezuela (Módulo de Créditos de Carbono MRV, Parser Vernacular por Voz en Bitácora, Exportador de Prescripciones para Maquinaria, Radar SAR Sentinel-1 y Grados Día de Crecimiento GDD) se encuentran técnicamente implementados con alto rigor, pero desconectados de las vistas de usuario donde lógicamente deben operar. Este cambio interconecta estos cables sueltos, corrige enlaces erróneos en la Landing Page, agrega anclas `#id` para navegación fluida y acopla el dictado por voz en el Cuaderno de Campo, elevando la coherencia global del sistema sin modificar contratos de datos ni comprometer la postulación al premio.

## What Changes

- **Interconexión y Corrección de Créditos de Carbono (MRV)**:
  - Asignación de ancla `id="carbon-credits"` en `src/app/dashboard/recomendaciones/page.tsx`.
  - Corrección del botón en Landing Page (`src/app/page.tsx` Módulo 5) para dirigir a `/dashboard/recomendaciones#carbon-credits` en lugar de `/dashboard/tierras`.
  - Corrección del menú superior *Ciencia & Datos* para enlazar directamente al módulo MRV.
  - Adición de botón de salto en la tarjeta de carbono de `src/app/dashboard/estadisticas/page.tsx`.
  - Inclusión del ítem `Créditos de Carbono (MRV)` en la navegación lateral (`src/app/dashboard/layout.tsx`).
- **Integración del Dictado por Voz & Parser Vernacular en Bitácora (`src/app/dashboard/bitacora/page.tsx`)**:
  - Incorporación de botón de micrófono nativo (Web Speech API via `useVoiceAssistant`) en el modal de registro de labores.
  - Procesamiento con `parseVernacularSpeech` para auto-completar tipo de labor, cultivo, insumo y conversión de unidades criollas (sacos a kg, canecas a L).
- **Acceso Cruzado al Exportador de Maquinaria y Drones**:
  - Incorporación de botón directo *«Exportar Prescripción a Maquinaria (SHP / KML)»* en la vista de recomendaciones (`/dashboard/recomendaciones`).
  - Indexación de la herramienta de maquinaria en la Paleta de Comandos (`CommandPalette.tsx`).
- **Visibilidad de Radar SAR y Constante Térmica GDD**:
  - Adición del badge `📡 Radar SAR Sentinel-1 (Sin Nubes)` en la cabecera del Dashboard principal (`/dashboard`).
  - Visualización del requerimiento térmico GDD a cosecha en las tarjetas de `src/app/dashboard/cultivos/page.tsx`.

## Capabilities

### Modified Capabilities
- `carbon-credits-mrv-calculator`: Asegura direccionamiento directo mediante ancla de hash `#carbon-credits`, enlaces corregidos desde Landing/Estadísticas y entrada en la barra lateral.
- `rural-voice-vernacular-parser`: Acopla el parser vernacular y reconocimiento de voz nativo en el modal de creación de labores de la Bitácora de Campo.
- `precision-machinery-prescriptions-exporter`: Permite invocar la exportación VRA directamente desde la pantalla de recomendación agronómica.
- `hydro-thermal-gdd-engine`: Integra la constante térmica GDD en el catálogo de cultivos.

## Impact

- **Archivos Modificados**:
  - `src/app/page.tsx`
  - `src/app/dashboard/layout.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/dashboard/recomendaciones/page.tsx`
  - `src/app/dashboard/estadisticas/page.tsx`
  - `src/app/dashboard/bitacora/page.tsx`
  - `src/app/dashboard/cultivos/page.tsx`
  - `src/components/layout/CommandPalette.tsx`
- **APIs y Base de Datos**: Sin cambios disruptivos; preserva esquemas y endpoints.
- **Tests**: Requiere verificación de los 233 tests para asegurar 0 regresiones.
