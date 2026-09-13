# Design: integrate-agro-iot-lab-visibility-and-roadmap

## Context

El proyecto Agrotech Venezuela ya cuenta con una infraestructura completa de software para IoT (corte transversal SVG animado, telemetría NPK, firmware ESP32 en C++, calibración ADC Saxton-Rawls y endpoint `/api/iot/telemetry`). Sin embargo, el laboratorio no es evidente para los usuarios al navegar por la aplicación o el repositorio. Se requiere una integración visual y documental no invasiva.

## Goals / Non-Goals

**Goals:**
- Visibilizar de forma destacada el Laboratorio Agro-IoT en el Dashboard principal (`/dashboard`) y en el Asistente de Intenciones (`IntentionsModal.tsx`).
- Enlazar la calibración de sensores de las parcelas (`/dashboard/tierras`) con el laboratorio experimental.
- Documentar de manera formal la metodología de dos fases (Fase 1: Ambiente controlado / micro-bancal de investigación vs. Fase 2: Escalamiento macro-territorial) en el `README.md`.
- Mantener el 100% de pruebas unitarias pasando (233 tests) y 0 errores en TypeScript.

**Non-Goals:**
- No se fabricará ni exigirá hardware propietario (principio BYOD y neutralidad de hardware).
- No se alterarán los contratos de API ni endpoints existentes para evitar cualquier conflicto con la postulación formal.

## Decisions

### Decisión 1: Botón de Acción en Cabecera de Dashboard Overview
- **Enfoque**: Agregar un botón estilo `btn-secondary` con borde cian y el icono `<Radio size={16} />` con el texto `🔬 Lab IoT (Pruebas)` en la botonera de acciones del header en `src/app/dashboard/page.tsx`.
- **Alternativa Descartada**: Modificar las 4 puertas del modo productor campesino. Se descartó para no sobrecargar la vista simplificada de campo del agricultor.

### Decisión 2: Séptima Intención en el Modal Asistente
- **Enfoque**: Insertar en `INTENTIONS` (`IntentionsModal.tsx`) el ítem `intent-iot`:
  - `icon`: '🔬'
  - `title`: 'Probar sensores y microrriego'
  - `subtitle`: 'Simulador de riego predictivo en maceta o bancal de prueba con ESP32'
  - `url`: '/dashboard/iot'
- **Alternativa Descartada**: Crear un modal independiente. Se descartó por redundancia y fragmentación de la experiencia de usuario.

### Decisión 3: Tip de Onboarding de Investigación en Ambiente Controlado
- **Enfoque**: Incorporar un banner de investigación en `src/app/dashboard/page.tsx` dentro de la sección de onboarding explicando que las dosis y umbrales pueden validarse primero a pequeña escala.

### Decisión 4: Articulación de Hoja de Ruta en `README.md`
- **Enfoque**: Incorporar una subsección dedicada en el `README.md` que detalle la Fase 1 (Validación en ambiente controlado) y la Fase 2 (Escalamiento a nivel de lote agrícola).

## Risks / Trade-offs

- **Riesgo**: Que los usuarios piensen que necesitan sensores físicos para usar Agrotech.
  - **Mitigación**: Mantener etiquetas explícitas de "Sandbox Opcional" y "Ambiente Controlado Didáctico" en todas las menciones.
- **Riesgo**: Que los tests de `IntentionsModal` o búsqueda esperen un número fijo de elementos.
  - **Mitigación**: Ejecutar `npm test` inmediatamente y ajustar assertions en caso de que verifiquen longitud exacta de intenciones.
