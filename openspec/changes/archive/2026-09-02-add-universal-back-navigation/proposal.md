## Why

En diversas vistas del sistema (como `/api-docs`, `/auth/login`, `/auth/register`, `/dashboard/arquitectura`, `/dashboard/postulacion` y los niveles 2 y 3 de `/dashboard/mapa`), los usuarios quedan visualmente "atrapados" o desorientados sin un mecanismo explícito para regresar a la pantalla anterior o al panel principal. Es necesario implementar un sistema estandarizado de navegación de retorno ("Volver") accesible, táctil y contextual, además de auditar y garantizar que el entorno de desarrollo y Docker no secuestren puertos para que los cambios se reflejen de inmediato en caliente.

## What Changes

- **Componente Reutilizable `BackButton`:** Creación de `src/components/ui/BackButton.tsx` con manejo inteligente de historial (`router.back()`), ruta de escape (`fallbackHref`), accesibilidad táctil (mínimo 42px) y texto contextual descriptivo.
- **Navegación de Retorno en Vistas Aisladas:**
  - `/api-docs`: Botón destacado `← Volver al Dashboard` en la cabecera principal.
  - `/auth/login`: Botón `← Volver a Portada` en la parte superior de la tarjeta.
  - `/auth/register`: Botón `← Volver a Iniciar Sesión` en la cabecera del formulario.
- **Navegación de Retorno en Vistas de Análisis y Documentación:**
  - `/dashboard/arquitectura` y `/dashboard/postulacion`: Cabecera con botón `← Volver al Dashboard`.
  - `/dashboard/mapa`: Botón táctil explícito para descender de nivel (`← Volver al Nivel Anterior` / `← Volver al Mapa Nacional`).
- **Navegación Contextual en Barra Superior (`layout.tsx`):** Inclusión de botón de retorno sutil cuando la ruta activa sea diferente a la portada del panel (`/dashboard`).
- **Verificación y Levantamiento Limpio de Entorno:** Comprobación de que Docker no ejecute el contenedor web en el puerto 3000 y levantamiento de microservicios backend para validar que el servidor de desarrollo local refleje los cambios en tiempo real.

## Capabilities

### New Capabilities
- `universal-back-navigation`: Componente y pauta de diseño para navegación hacia atrás con soporte de historial y fallback seguro.

### Modified Capabilities
- `interactive-api-docs-explorer`: Incorporación de botón de retorno directo al dashboard desde la documentación técnica.
- `map-viewer-responsive-drawer`: Integración de navegación de retroceso explícita entre niveles cartográficos (Nivel 3 a Nivel 2 y Nivel 2 a Nivel 1).

## Impact

- `src/components/ui/BackButton.tsx`: Nuevo componente UI.
- `src/app/api-docs/page.tsx`: Inyección de botón de retorno.
- `src/app/auth/login/page.tsx`: Inyección de retorno a portada.
- `src/app/auth/register/page.tsx`: Inyección de retorno a login.
- `src/app/dashboard/arquitectura/page.tsx`: Cabecera con botón de retorno.
- `src/app/dashboard/postulacion/page.tsx`: Cabecera con botón de retorno.
- `src/components/gis/MultiLevelMapViewer.tsx`: Botón explícito de retorno de nivel.
- `src/app/dashboard/layout.tsx`: Botón contextual de retorno en la barra de utilidades.
