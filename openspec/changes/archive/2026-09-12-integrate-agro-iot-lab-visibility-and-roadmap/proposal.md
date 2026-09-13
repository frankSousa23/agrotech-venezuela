# Proposal: integrate-agro-iot-lab-visibility-and-roadmap

## Why

El Laboratorio Agro-IoT de Agrotech Venezuela cuenta con una infraestructura de simulación, telemetría y firmware completamente funcional, pero actualmente padece de baja visibilidad dentro del flujo principal del usuario (Dashboard Overview, Modal de Intenciones, Mis Tierras y Documentación pública). Esta propuesta integra el laboratorio como un banco de investigación empírica en ambiente controlado (bajo costo, BYOD, <$35 USD) y articula la hoja de ruta hacia el escalamiento macro-territorial futuro, manteniendo el enfoque 100% software-first y sin alterar la postulación oficial de la competencia.

## What Changes

- **Acceso Directo en Dashboard Overview (`/dashboard`)**: Adición de un botón de acción rápida en la cabecera ("🔬 Lab IoT (Pruebas)") y una tarjeta de orientación en el flujo guiado explicando la fase de pruebas de microrriego en ambiente controlado.
- **Séptima Intención en el Asistente Guiado (`IntentionsModal.tsx`)**: Incorporación de la intención "Probar sensores y microrriego (Lab IoT)" en el modal "¿Qué necesitas hacer hoy?" para navegación directa a `/dashboard/iot`.
- **Refuerzo de Contexto en Mis Fincas (`/dashboard/tierras`)**: Enlace contextual en el panel del Gemelo Digital explicando que las lecturas y umbrales provienen del banco de investigación y calibración.
- **Documentación de la Hoja de Ruta en `README.md`**: Inclusión de una sección formal detallando la Fase 1 (Investigación en ambiente controlado / micro-bancal) y la Fase 2 (Escalamiento a gran escala con redes LoRaWAN / sensores in-situ acoplados al WebGIS).
- **Consistencia y Preservación de Pruebas**: Garantizar que todas las modificaciones respeten los 233 tests automatizados y 0 errores de compilación TypeScript.

## Capabilities

### New Capabilities
<!-- Ninguna nueva capacidad estructural requerida, se extiende la suite existente -->

### Modified Capabilities
- `interactive-iot-microcrop-lab`: Extiende los requisitos de visibilidad, navegación bidireccional desde el Dashboard y formalización de la hoja de ruta de investigación en ambiente controlado.
- `webgis-iot-digital-twin`: Incorpora el marco de referencia del laboratorio experimental como fase previa de calibración antes del despliegue en lotes agrícolas.

## Impact

- **Frontend**: `src/app/dashboard/page.tsx`, `src/components/layout/IntentionsModal.tsx`, `src/app/dashboard/tierras/page.tsx`, `README.md`.
- **APIs y Backend**: Sin cambios que rompan compatibilidad; preserva `/api/iot/telemetry` y `iot_manager.py`.
- **Tests**: Sin regresiones en Jest ni Pytest.
