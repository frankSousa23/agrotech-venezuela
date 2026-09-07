## Why

Tras la integración secuencial de las mejoras de UI/UX (sidebar compacto con cero scroll vertical, dropdowns semánticos en portada, reorganización jerárquica del Laboratorio IoT y alertas agronómicas en WebGIS), es necesario formalizar y blindar la adaptabilidad responsiva en todas las resoluciones (móvil ≤ 768px, tablet 768px–1024px, y escritorio ≥ 1024px). Asimismo, se requiere garantizar que toda la actualidad del proyecto (TRL 6, 233 pruebas automatizadas, 40 años de trayectoria MapBiomas y modo dual rural) se mantenga verificada y sincronizada de forma estricta en todo el ecosistema.

## What Changes

- **Optimización de Breakpoints de Navegación en Portada**: Ajuste del media query de `.navLinks` en `page.module.css` (de `1140px` a `880px`) para que las tablets y portátiles compactas conserven el acceso a los 3 menús desplegables semánticos (`🌾 Módulos de Campo`, `🔬 Ciencia & Datos`, `🏛️ Postulación TRL 6`) sin ocultamiento prematuro.
- **Ergonomía Táctil en Laboratorio IoT**: Garantizar que las 5 pestañas de `MicrocropIoTLab` admitan desplazamiento horizontal nativo sin barras antiestéticas (`scrollbar-width: none`) y que en la Pestaña 5 la calculadora de calibración ADC y la tarjeta Saxton-Rawls se apilen verticalmente con controles táctiles de al menos 44px de altura.
- **Acordeón Táctil en Telemetría WebGIS**: Preservar la experiencia en smartphones (≤ 768px) mediante el colapso/expansión reactiva de la ficha de estado (`mobileDrawerToggle`), manteniendo visibles las micro-alertas edafo-climáticas (Kamprath, Yeso y SAR) y el botón de prescripción VRA.
- **Sincronización Exhaustiva de Métricas de Actualidad**: Verificar y congelar en specs la coherencia del estándar TRL 6, la suite unificada de 233 tests automatizados (179 Jest + 54 Pytest) y las 30 rutas de producción Next.js 16 Turbopack.

## Capabilities

### New Capabilities
<!-- Ninguna capacidad completamente nueva; se modifican y extienden capacidades existentes -->

### Modified Capabilities
- `interactive-landing-ecosystem`: Incorpora la especificación de menús desplegables semánticos en el navbar superior y la retención responsiva de navegación en tablets (hasta 880px).
- `mobile-touch-ergonomics`: Extiende los criterios de ergonomía táctil móvil y tablet al sidebar compacto de cero scroll, al drawer de telemetría de WebGIS y a las pestañas swipeables del Laboratorio IoT.

## Impact

- **Frontend WebGIS & Dashboard**:
  - `src/app/page.tsx` & `src/app/page.module.css`
  - `src/app/dashboard/layout.tsx` & `src/app/dashboard/layout.module.css`
  - `src/components/gis/VenezuelaStateMapViewer.tsx`
  - `src/components/agronomy/MicrocropIoTLab.tsx`
- **Especificaciones & Documentación**:
  - Actualización de delta specs para `interactive-landing-ecosystem` y `mobile-touch-ergonomics`.
  - Mantenimiento de la suite de 233 tests automatizados (0 regresiones).
