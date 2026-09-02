## Purpose

Establece los lineamientos y componentes de UI/UX destinados a proporcionar ayuda, interactividad y explicaciones de uso para garantizar una navegación fluida e intuitiva del sistema, así como asegurar que el control de sesión sea evidente en todos los flujos.

## Requirements

### Requirement: Botón de Cerrar Sesión Global
El sistema SHALL mostrar un botón funcional y visible de "Cerrar Sesión" (o "Salir") en todas las vistas autenticadas (Dashboard, Mapa, Mis Tierras, etc.), ubicado en la barra de utilidades superior, independientemente del rol del usuario (ADMIN, AGRONOMIST, FARMER, GUEST).

#### Scenario: Visualización en Desktop
- **WHEN** el usuario autenticado navega por el sistema en una pantalla grande
- **THEN** el sistema muestra el botón "Cerrar Sesión" junto al control de tema "Pleno Sol"

#### Scenario: Visualización en Mobile
- **WHEN** el usuario autenticado navega por el sistema en un dispositivo móvil
- **THEN** el sistema muestra el botón "Cerrar Sesión" de manera accesible en el encabezado móvil sin necesidad de abrir menús ocultos

### Requirement: Explicaciones Interactivas (Tooltips y Guías)
El sistema SHALL proveer ayudas contextuales interactivas (ej. Tooltips, íconos de información o modales) en componentes complejos que requieran comprensión técnica (como los datos de MapBiomas, NASA POWER o modelos de Gemini).

#### Scenario: Despliegue de ayuda en Calculadora
- **WHEN** el usuario interactúa o pasa el cursor sobre el ícono de ayuda en la Calculadora de Carbono
- **THEN** el sistema despliega un texto explicativo (Tooltip) detallando cómo los datos impactan los resultados

#### Scenario: Información sobre fuentes de datos
- **WHEN** el usuario hace clic en el indicador de "MapBiomas Col. 3"
- **THEN** el sistema abre un breve modal o cuadro de diálogo que explica cómo se integran esos datos en el WebGIS para el beneficio agrícola
