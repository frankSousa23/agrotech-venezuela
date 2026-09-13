## Context

El ecosistema WebGIS de Agrotech Venezuela se sustenta en componentes clientes de Leaflet nativo (`L.map`) sincronizados mediante `useRef`, desacoplados de `react-leaflet` para garantizar compatibilidad con React 19 y Next.js 16 App Router.

Actualmente:
- El confinamiento geográfico estricto (`maxBounds: [[0.6, -73.4], [12.5, -59.8]]` con `maxBoundsViscosity: 1.0`) genera un efecto de "mapa recortado a la mitad" en pantallas con relaciones de aspecto no cuadradas (16:9, ultra-wide y smartphones verticales), ya que Leaflet bloquea el desplazamiento y rehúsa renderizar teselas que excedan milimétricamente dichos límites.
- La capa de "Modo Oscuro" (`activeLayer === 'dark'`) apunta por defecto al servidor de teselas estándar de OpenStreetMap (fondo blanco), impidiendo que el usuario experimente cartografía nocturna de alto contraste.
- En Nivel 3 (Micro-Parcela), las capas temáticas ("Semáforo pH", "Lluvias NASA") no proyectan información visual sobre el lote al haberse desmontado los polígonos estadales y municipales.
- El panel de control lateral flotante de 330px no cuenta con mecanismo de colapso en `MultiLevelMapViewer.tsx`, reduciendo el espacio útil para dibujo táctil en dispositivos móviles.

## Goals / Non-Goals

**Goals:**
- Proporcionar una experiencia visual fluida y sin cortes: expandir el mapa al 100% del ancho y 75vh de altura, suavizando los límites territoriales (`maxBoundsViscosity: 0.55` y bounding box con zona de amortiguamiento marítimo-fronterizo).
- Garantizar que cada botón de capa genere un cambio visible, perceptible e interactivo:
  - "Modo Oscuro": Teselas reales de CartoDB Dark Matter.
  - "Semáforo pH", "Lluvias NASA", "MapBiomas": Proyección contextual y badges reactivos en tiempo real sobre la micro-parcela en Nivel 3.
- Añadir controles ergonómicos de vanguardia:
  - Botón de colapso/despliegue del panel flotante (`[◀ Ocultar Panel]` / `[▶ Controles]`).
  - Botón de Pantalla Completa (`[⛶ Pantalla Completa]`) con `map.invalidateSize()`.
  - Botón de geolocalización GPS (`[📍 Ubicar mi Finca]`).
- Adaptabilidad por roles: Ajustar dinámicamente la densidad de información y herramientas según el rol activo (`FARMER` con énfasis en botones táctiles grandes y glosario criollo; `TECH` con radar SAR y calculadora Kamprath; `AUDITOR` con acceso directo a matriz de pruebas y expediente).

**Non-Goals:**
- No reemplazar Leaflet nativo por librerías complejas tipo Mapbox GL o react-leaflet.
- No requerir autenticación obligatoria para explorar el mapa (los invitados `GUEST` continúan disfrutando de interactividad completa).

## Decisions

### 1. Suavizado de Confinamiento Territorial (Cushioned Viewport)
- **Decisión**: Modificar `VENEZUELA_BOUNDS` en `LeafletMapInner.tsx` y `VenezuelaStateMapInner.tsx` ampliando el margen geográfico a `[[-1.0, -76.0], [16.0, -57.0]]` y reduciendo `maxBoundsViscosity` de `1.0` a `0.55`.
- **Alternativas consideradas**:
  - *Eliminar maxBounds por completo*: Descartado porque permitiría al usuario alejarse accidentalmente hacia otros continentes perdiendo el foco en Venezuela.
  - *Mantener 1.0 con fitBounds rígido*: Descartado porque produce el recorte a la mitad y franjas grises cuando el contenedor no coincide con la relación de aspecto del país.

### 2. Proveedor de Teselas CartoDB Dark Matter
- **Decisión**: Para `activeLayer === 'dark'`, configurar la URL de teselas como `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` con atribución a CartoDB y OpenStreetMap.
- **Alternativas consideradas**:
  - *Invertir colores con CSS filter*: Descartado porque distorsiona los colores de los polígonos y las etiquetas.

### 3. Retroalimentación Temática en Nivel 3 (Micro-Parcela)
- **Decisión**: Cuando el usuario cambia de capa en Nivel 3, renderizar una tarjeta flotante de telemetría localizada en la esquina superior derecha (`MapLayerStatusCard`) y aplicar una colorimetría dinámica al polígono de la parcela trazada según la capa activa (ej. tinte de pH, halo de lluvia).
- **Alternativas consideradas**:
  - *Cargar WMS externos de pH en alta resolución*: Descartado para mantener latencia < 30ms e independencia de servidores lentos.

### 4. Panel Colapsable y Pantalla Completa
- **Decisión**: Añadir el estado `isPanelCollapsed` en `MultiLevelMapViewer.tsx` con persistencia en `localStorage` y un botón toggle flotante minimalista. Para la pantalla completa, utilizar la API estándar `requestFullscreen()` con fallback a modo ventana maximizada (`position: fixed; inset: 0; zIndex: 9999`).

## Risks / Trade-offs

- **[Permiso de Geolocalización Denegado por el Navegador]** → Mitigación: Capturar el error en `navigator.geolocation.getCurrentPosition` y mostrar un toast informativo orientando al usuario a seleccionar su estado manualmente en el selector sin arrojar excepciones en consola.
- **[Soporte de Fullscreen en iOS Safari]** → Mitigación: Detección condicional de `document.fullscreenEnabled` / `webkitFullscreenEnabled`; si no está disponible, aplicar la clase CSS de maximizado absoluto con `map.invalidateSize()`.
- **[Rendimiento de Teselas bajo Conexiones Rurales Lentas]** → Mitigación: Mantener caché local en IndexedDB / Service Worker PWA para las teselas previamente consultadas.
