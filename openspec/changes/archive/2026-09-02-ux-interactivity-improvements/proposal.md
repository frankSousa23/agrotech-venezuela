## Why

Los usuarios actuales necesitan mayor contexto e interactividad durante el uso de la plataforma para comprender qué acciones pueden realizar y cómo aprovechar la integración de MapBiomas y Gemini. Además, se identificó que el control de sesión (botón de cerrar sesión) no estaba claramente visible o funcional en todas las vistas autenticadas, generando confusión en la experiencia de usuario.

## What Changes

- **Control de Sesión**: Implementación garantizada y visible del botón "Cerrar Sesión" en la barra superior (Desktop y Mobile) para todos los roles, contiguo al control de contraste/tema solar.
- **Guías y Tooltips**: Inclusión de tooltips y textos de ayuda en componentes clave (como la Calculadora de Carbono, mapas de capas y análisis agronómico) que explican el "por qué" y el "cómo" de cada herramienta.
- **Documentación Visible en UI**: Pequeñas píldoras informativas o modales en la interfaz que expliquen el origen de los datos (MapBiomas, NASA POWER) de forma didáctica para el productor/agrónomo, en lugar de estar solo en el README.

## Capabilities

### New Capabilities
- `ux-interactivity`: Define los requerimientos de ayuda contextual, tooltips interactivos, visualización clara del estado de sesión y modales didácticos sobre el procesamiento de datos satelitales en las interfaces del sistema.

### Modified Capabilities
- `<existing-capability-path>`: 

## Impact

- **UI/UX**: Modificación de `src/app/dashboard/layout.tsx` y creación de nuevos componentes de ayuda (`Tooltip`, `HelpModal`).
- **Accesibilidad**: Mejora general en el entendimiento de las métricas complejas.
- **Sin impacto en Backend**: Todo el trabajo se centra en el cliente (Frontend React/Next.js) y en la documentación visible del proyecto.
