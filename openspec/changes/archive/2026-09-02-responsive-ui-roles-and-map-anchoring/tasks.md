## 1. Anclaje Cartográfico y Leyendas en Venezuela

- [x] 1.1 Configurar `maxBounds: [[0.6, -73.4], [12.5, -59.8]]`, `maxBoundsViscosity: 1.0` y `minZoom: 4.8` en `src/components/gis/VenezuelaStateMapInner.tsx` y verificar con inspección que el arrastre del mapa quede confinado dentro de Venezuela.
- [x] 1.2 Replicar el confinamiento estricto territorial y zoom responsivo para pantallas móviles en `src/components/gis/LeafletMapInner.tsx`.
- [x] 1.3 Optimizar `src/components/gis/MapLayerLegendOverlay.tsx` con soporte de diseño responsivo móvil para colapsar como píldora flotante compacta en pantallas < 768px.

## 2. Ergonomía Responsive del Dashboard y Botón de Salir

- [x] 2.1 En `src/app/dashboard/layout.module.css` y `layout.tsx`, ocultar la barra flotante de utilidades de escritorio en resoluciones menores a 768px para evitar duplicación con `.mobileBar`.
- [x] 2.2 Asegurar que el botón de "Cerrar Sesión" esté presente de manera visible tanto en la barra fija móvil superior (`.mobileBar`) como con posición `sticky` al pie del sidebar drawer móvil y de escritorio.
- [x] 2.3 Agregar botón de cierre táctil `✕` en la cabecera del sidebar drawer móvil para facilitar la navegación en teléfonos.

## 3. Blindaje de Roles y Selector Rápido de Perfiles

- [x] 3.1 Implementar guarda de rol en `src/app/dashboard/admin/page.tsx` que evalúe si `user?.role === 'ADMIN'`, renderizando un banner de acceso restringido con retorno a `/dashboard` si no es administrador.
- [x] 3.2 Implementar selector rápido de rol interactivo en el área de perfil de `src/app/dashboard/layout.tsx` para alternar fluidamente entre `FARMER`, `AGRONOMIST`, `ADMIN` y `GUEST`.

## 4. Validación Automatizada

- [x] 4.1 Ejecutar suite de pruebas de frontend (`npm test`) y comprobación de tipos TypeScript (`npx tsc --noEmit`) para garantizar 0 errores y 100% de tests aprobados.
