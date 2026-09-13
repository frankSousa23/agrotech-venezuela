# Design: connect-system-integrations-and-routes

## Context

Varios subsistemas clave (Carbon Credits MRV, Parser Vernacular, Prescripciones VRA Maquinaria, Radar SAR y GDD) están implementados a nivel de lógica y componentes, pero desconectados de las pantallas donde el usuario o evaluador interactúa.

## Goals / Non-Goals

**Goals:**
- Conectar los enlaces de la Calculadora de Carbono MRV con ancla `#carbon-credits` desde Landing, Estadísticas y Barra Lateral.
- Integrar reconocimiento por voz y parser vernacular campesino en el formulario de la Bitácora de Campo (`/dashboard/bitacora`).
- Habilitar la exportación a maquinaria VRA directamente desde la simulación de recomendaciones (`/dashboard/recomendaciones`).
- Visibilizar el Radar SAR Sentinel-1 en las insignias de cabecera del Dashboard y la constante GDD en el catálogo de cultivos.
- Mantener los 233 tests automatizados y compilación 100% limpia.

**Non-Goals:**
- No alterar esquemas de base de datos ni modelos matemáticos ya calibrados.

## Decisions

### Decisión 1: Anclaje de Hash y Enrutamiento para Carbon Credits
- **Enfoque**: Asignar `id="carbon-credits"` en el contenedor de `CarbonCreditsCalculator` en `src/app/dashboard/recomendaciones/page.tsx`. Corregir el enlace en el Módulo 5 de la Landing Page (`src/app/page.tsx`) hacia `/dashboard/recomendaciones#carbon-credits`, y en el menú de navegación *Ciencia & Datos*.
- **Alternativa Descartada**: Crear una página independiente `/dashboard/carbono`. Descartada para no multiplicar rutas estáticas innecesarias a días de la postulación.

### Decisión 2: Botón de Dictado por Voz en Modal de Bitácora
- **Enfoque**: Integrar el hook `useVoiceAssistant()` y la función `parseVernacularSpeech()` en `src/app/dashboard/bitacora/page.tsx`. Al presionar el botón de micrófono, transcribir el habla en español venezolano y auto-rellenar los campos del formulario modal (acción, dosis convertida a kg/L, insumo y notas).

### Decisión 3: Exportador de Maquinaria en Recomendaciones y Paleta
- **Enfoque**: Reutilizar `MachineryExportModal` dentro de `src/app/dashboard/recomendaciones/page.tsx` creando una parcela sintética a partir de los sliders activos (`simAreaHa`, `simStateId`, `simCrop`, `simLimeDose`, `simNpkDose`). Agregar ítem en `CommandPalette.tsx`.

### Decisión 4: Reconocimiento Visual de Radar SAR y GDD
- **Enfoque**: Agregar badge visual `📡 Radar SAR Sentinel-1 (Sin Nubes)` en `src/app/dashboard/page.tsx`. En `src/app/dashboard/cultivos/page.tsx`, añadir pill con la acumulación térmica GDD (ej. `1,650 GDD`).

## Risks / Trade-offs

- **Riesgo**: Disparar errores de hidratación en Web Speech API si el navegador no tiene soporte.
  - **Mitigación**: `useVoiceAssistant` ya maneja detección de `isSupported` con fallback transparente.
