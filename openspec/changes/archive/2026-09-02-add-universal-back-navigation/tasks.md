## 1. Componente Reutilizable BackButton

- [x] 1.1 Crear `src/components/ui/BackButton.tsx` y `BackButton.module.css` con soporte para `useRouter().back()`, `fallbackHref`, estilo glassmorphism, accesibilidad táctil (>= 40px) e icono `ArrowLeft`.

## 2. Integración en Vistas Aisladas y Documentación

- [x] 2.1 En `src/app/api-docs/page.tsx`, insertar `BackButton` en la cabecera superior con texto "Volver al Dashboard" y fallback a `/dashboard`.
- [x] 2.2 En `src/app/auth/login/page.tsx` y `src/app/auth/register/page.tsx`, insertar `BackButton` en la cabecera de las tarjetas con fallback a `/` y `/auth/login` respectivamente.
- [x] 2.3 En `src/app/dashboard/postulacion/page.tsx` y `src/app/dashboard/arquitectura/page.tsx`, añadir `BackButton` en el bloque superior con fallback a `/dashboard`.

## 3. Navegación Multi-Escala en Mapas y Layout

- [x] 3.1 En `src/components/gis/MultiLevelMapViewer.tsx`, incorporar botón táctil destacado de retorno de nivel ("← Volver al Nivel Estatal" en Nivel 3 y "← Volver al Mapa Nacional" en Nivel 2).
- [x] 3.2 En `src/app/dashboard/layout.tsx`, mostrar botón contextual de retorno en la barra de utilidades cuando la ruta activa sea diferente a `/dashboard`.

## 4. Validación de Entorno, Pruebas y Comprobación en Vivo

- [x] 4.1 Ejecutar suite completa de frontend (`npm test`) y comprobación de tipos TypeScript (`npx tsc --noEmit`) garantizando 100% de tests aprobados y 0 errores.
- [x] 4.2 Comprobar estado de Docker, asegurar que `agrotech-web` no esté ocupando el puerto 3000, levantar los microservicios de soporte (`docker compose up -d agrotech-db agrotech-api agrotech-dashboard`) y validar que el servidor de desarrollo local sirva la versión viva y actualizada.
