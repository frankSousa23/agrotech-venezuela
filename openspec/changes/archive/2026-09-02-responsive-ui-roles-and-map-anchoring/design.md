## Context

Véase `proposal.md` para la motivación. La plataforma cuenta con visores Leaflet nativos (`VenezuelaStateMapInner.tsx` y `LeafletMapInner.tsx`) que carecían de confinamiento geográfico estricto, lo cual permitía que la vista del mapa se desplazara fuera de Venezuela al interactuar en pantallas táctiles. Asimismo, en resoluciones móviles se detectaron colisiones de barras de navegación y necesidad de un acceso directo y sticky para el botón de cierre de sesión.

## Goals / Non-Goals

**Goals:**
- Confinar geográficamente los visores cartográficos a los límites oficiales de Venezuela (`maxBounds` con WGS84).
- Optimizar la experiencia táctil en móviles (< 768px) eliminando barras duplicadas y garantizando accesibilidad del botón de salir.
- Proteger la ruta `/dashboard/admin` para que usuarios no administradores reciban un aviso amigable y claro.
- Incorporar un selector ágil de roles en la barra lateral para facilitar la verificación interactiva de permisos.

**Non-Goals:**
- No se modifican esquemas de base de datos ni entidades de Prisma.
- No se altera la lógica de cálculo agronómico ni las APIs geoespaciales de FastAPI.

## Decisions

### Decisión 1: Confinamiento territorial Leaflet con `maxBoundsViscosity: 1.0`
- **Alternativa considerada:** Limitar mediante eventos `moveend` recalculando centro.
- **Razón técnica:** `maxBounds` nativo de Leaflet con viscosidad 1.0 es renderizado por el hilo de animación del navegador a 60fps sin latencia ni tirones visuales, impidiendo que el usuario arrastre la cámara fuera de Venezuela.
- **Coordenadas:** `[[0.6, -73.4], [12.5, -59.8]]` con `minZoom: 4.8` y zoom inicial móvil de `5`.

### Decisión 2: Jerarquía limpia de barras en vista móvil (< 768px)
- **Alternativa considerada:** Dejar ambas barras y escalarlas.
- **Razón técnica:** En pantallas móviles de 375-430px de ancho, el espacio vertical es crítico. La barra flotante de escritorio se oculta mediante `@media (max-width: 768px)`, integrando el botón de Salir en la barra móvil superior y en la base del drawer lateral.

### Decisión 3: Guarda de cliente para `/dashboard/admin`
- **Alternativa considerada:** Redirección forzada sin mensaje (`router.replace`).
- **Razón técnica:** Renderizar un componente informativo de "Acceso Restringido" con explicación clara del rol requerido (`ADMIN`) y botón de retorno al dashboard aporta mayor transparencia y evita desconcierto en el usuario.

## Risks / Trade-offs

- [Riesgo] El confinamiento de coordenadas podría cortar islas periféricas (Aves) → **Mitigación**: Los límites norte se fijaron en 12.5°N y el bounding box abarca ampliamente el territorio continental e insular venezolano.
- [Riesgo] Desborde en pantallas muy pequeñas (< 340px) → **Mitigación**: Uso de flex-wrap, `box-sizing: border-box` y scroll vertical en el cajón lateral.
