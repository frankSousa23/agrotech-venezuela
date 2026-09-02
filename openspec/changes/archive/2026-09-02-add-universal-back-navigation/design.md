## Context

Ver `proposal.md` para motivación y justificación. Actualmente la aplicación tiene páginas independientes (`/api-docs`, `/auth/login`, `/auth/register`) y vistas profundas (`/dashboard/postulacion`, `/dashboard/arquitectura`, `/dashboard/mapa`) donde los usuarios carecen de un camino claro y obvio para regresar a su punto de origen sin recurrir al botón del navegador o escribir URLs manualmente.

## Goals / Non-Goals

**Goals:**
- Crear el componente `BackButton` reutilizable en `src/components/ui/BackButton.tsx` con soporte para `router.back()` y fallback seguro vía `Link`.
- Incorporar botones de retorno en `/api-docs`, `/auth/login`, `/auth/register`, `/dashboard/postulacion`, `/dashboard/arquitectura` y en el visor multinivel `/dashboard/mapa`.
- Añadir botón de retorno contextual en la barra de utilidades de `src/app/dashboard/layout.tsx` cuando no se esté en la raíz del dashboard.
- Establecer procedimiento y verificación técnica para garantizar que Docker no monopolice el puerto 3000 y que el servidor local de desarrollo (`npm run dev`) refleje cambios en caliente.

**Non-Goals:**
- No se sustituye el historial nativo del navegador ni se implementa un sistema complejo de máquina de estados de navegación.
- No se alteran las rutas existentes ni los endpoints del backend.

## Decisions

### 1. Componente Unificado `BackButton`
- **Decisión:** Implementar `src/components/ui/BackButton.tsx` como componente cliente (`"use client"`).
- **Mecanismo:** Si `window.history.length > 1`, ejecuta `router.back()`; si el usuario aterrizó por enlace directo o nueva pestaña, redirige inmediatamente a `fallbackHref`.
- **Alternativa Descartada:** Usar simples `<Link>` estáticos en cada página. Se descartó porque perdería la procedencia dinámica cuando el usuario llega desde diferentes partes del sistema.

### 2. Ergonomía Táctil y Estilo Visual
- **Decisión:** Diseño con fondo translúcido (`rgba(255,255,255,0.06)`), borde sutil, icono `ArrowLeft` animado y altura táctil mínima de 40px acorde a las pautas de accesibilidad móvil en campo.

### 3. Navegación en el Visor Multinivel (`MultiLevelMapViewer.tsx`)
- **Decisión:** En Nivel 3 (Parcela), renderizar un botón táctil destacado `← Volver a [Estado]` que ejecuta `setCurrentLevel(2)`; en Nivel 2 (Estado), un botón `← Volver a Venezuela` que ejecuta `setCurrentLevel(1)`.
- **Alternativa Descartada:** Depender únicamente de los breadcrumbs existentes que a menudo pasan desapercibidos en teléfonos celulares.

### 4. Estrategia de Entorno de Desarrollo y Docker
- **Decisión:** Documentar y verificar el aislamiento del puerto 3000. El contenedor `agrotech-web` no debe ejecutarse en caliente; únicamente los servicios de soporte (`agrotech-db`, `agrotech-api`, `agrotech-dashboard`) deben correr en Docker, dejando el puerto 3000 100% libre para Turbopack (`npm run dev`).

## Risks / Trade-offs

- **[Bucle de navegación si la página previa era un redirect]** → Mitigación: cada instancia de `BackButton` declara un `fallbackHref` explícito y seguro (ej. `/dashboard`, `/` o `/auth/login`).
- **[Confusión en pantallas móviles reducidas]** → Mitigación: texto conciso (`Volver` o `Atrás`) que se adapta con media queries.
