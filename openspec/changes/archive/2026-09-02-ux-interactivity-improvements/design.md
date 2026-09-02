## Context

El sistema tiene funciones complejas (visor espacial de múltiples niveles, métricas meteorológicas de NASA POWER, analíticas SAR de Sentinel-1, modelos predictivos y una calculadora de carbono) que pueden ser abrumadoras para un agricultor o agrónomo principiante en la plataforma. Además, existe la necesidad de estandarizar la visibilidad del botón de control de sesión en todos los roles (ADMIN, AGRONOMIST, FARMER, GUEST) sin importar el tamaño del dispositivo o vista que se esté usando.

## Goals / Non-Goals

**Goals:**
- Crear componentes reutilizables de UX para la ayuda contextual (`HelpModal` y `Tooltip`).
- Asegurar que el control de sesión del usuario siempre sea visible, reemplazando cualquier renderizado condicional restrictivo por un botón universal alineado junto a las utilidades (tema Pleno Sol).
- Proveer textos explicativos didácticos orientados a productores sobre los beneficios de MapBiomas y Gemini.

**Non-Goals:**
- Rediseñar el flujo de autenticación o arquitectura de base de datos.
- Proveer un sistema de tours paso a paso que requiera guardar estados en la base de datos de los usuarios (se priorizará la ayuda on-demand).

## Decisions

- **Componente Reutilizable `Tooltip`**: Se creará un componente de React genérico y liviano (sin dependencias extra si no son necesarias, o usando algo de Lucide-react para el ícono) que aparezca `onHover` en Desktop y `onClick` en Mobile.
- **Componente Reutilizable `HelpModal`**: Para explicaciones largas (como MapBiomas y NASA POWER) se usarán modales de Next.js/React genéricos.
- **Botón Global de Logout**: En lugar de ocultarlo si es modo invitado (sandbox) u otros casos, se garantizará que todos puedan "Salir" o "Volver al Login" fácilmente en `src/app/dashboard/layout.tsx`. Se ajustará el renderizado de la barra superior.

## Risks / Trade-offs

- [Risk] Z-index del Tooltip o Modal chocando con las capas de Leaflet Map. → **Mitigación**: Definir z-index mayores (por ej. > 1000) en el archivo de estilos globales o usar un portal de React.
- [Risk] Saturación visual con muchos íconos de ayuda. → **Mitigación**: Colocarlos sutilmente junto a los títulos de las secciones más crípticas.
