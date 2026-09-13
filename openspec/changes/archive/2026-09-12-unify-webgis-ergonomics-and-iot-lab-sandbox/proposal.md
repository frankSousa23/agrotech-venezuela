## Why

El Laboratorio Agro-IoT y el ecosistema cartográfico WebGIS de Agrotech Venezuela son componentes clave tanto para la experimentación técnica de bajo costo (BYOD) como para la toma de decisiones territoriales. Actualmente, el Laboratorio IoT funciona como un entorno cerrado de investigación que requiere mayor fidelidad visual (animación de flujo hídrico, simulación de estrés en 1 clic e historiador temporal de 24 horas), mientras que los visores cartográficos se encuentran fragmentados en modos separados en `/dashboard/mapa` y carecen de una vista previa vectorial del contorno dentro del modal de diagnóstico de parcelas, con oportunidades de mejora en ergonomía táctil móvil (prevención de trampas de scroll).

Esta propuesta unifica la experiencia cartográfica en una pirámide continua de 3 niveles y potencia la interactividad pedagógica del Laboratorio IoT como sandbox experimental autónomo.

## What Changes

- **Laboratorio Agro-IoT (Sandbox Autónomo de Experimentación)**:
  - Animación dinámica de flujo de agua y pulsos de microrriego en el corte transversal SVG cuando la electroválvula está en `OPEN`.
  - Indicador dinámico de caudalímetro simulado ($L/\text{min}$) y acumulador de agua consumida.
  - Historiador interactivo de 24 horas (gráfico Canvas/SVG) que contrasta la oscilación de humedad volumétrica (VWC%), el umbral crítico de marchitez y los eventos de lluvia NASA POWER.
  - Botones de simulación de eventos en 1 clic: Ola de calor (+38°C), Tormenta NASA POWER (20 mm) y Alerta de Sonda Abierta (ADC > 4000).
- **Pirámide Cartográfica Unificada en `/dashboard/mapa`**:
  - Eliminación de la dicotomía de dos modos separados ("Explorador Estatal" vs "Multi-Escala"), integrando los polígonos GeoJSON de los 24 estados directamente en el Nivel 1 Nacional.
  - Navegación fluida por breadcrumbs: `Venezuela ──► Estado ──► Municipio ──► Micro-Parcela`.
  - Controles táctiles móviles ergonómicos con prevención de trampas de scroll (`touch-action: pan-y`, márgenes táctiles) y paneles tipo drawer colapsables.
- **Vista Previa Vectorial en `ParcelDiagnosticModal.tsx`**:
  - Mini-mapa cartográfico interactivo/estático centrado en el centroide de la parcela, dibujando el contorno poligonal delimitado por el productor con sus hectáreas calculadas bajo Shoelace geodésico.
- **Radar Macro-Satelital Compacto en `/dashboard`**:
  - Ajuste de proporciones y altura responsiva (380px en móvil, 480px en desktop) para evitar desplazar los indicadores de impacto y la barra de presets emblemáticos.

## Capabilities

### New Capabilities
- `iot-lab-interactive-sandbox`: Laboratorio y banco de pruebas IoT cerrado con animación dinámica de flujo hídrico, simulación de estresores en 1 clic e historiador interactivo de 24 horas.
- `unified-webgis-pyramid-and-responsive-ergonomics`: Motor WebGIS unificado en pirámide jerárquica de 3 niveles con prevención de trampas de scroll y controles táctiles móviles.
- `parcel-diagnostic-vector-preview`: Vista previa cartográfica vectorial del polígono de parcela dentro del modal de diagnóstico del gemelo digital.

### Modified Capabilities
- *Ninguna. No se modifican contratos de requerimientos existentes.*

## Impact

- **Frontend (`src/`)**:
  - `src/components/agronomy/MicrocropIoTLab.tsx` y su módulo CSS.
  - `src/components/gis/MultiLevelMapViewer.tsx`, `VenezuelaStateMapViewer.tsx` y `LeafletMapInner.tsx`.
  - `src/components/gis/ParcelDiagnosticModal.tsx`.
  - `src/app/dashboard/mapa/page.tsx` y `src/app/dashboard/page.tsx`.
- **Pruebas Automatizadas**:
  - Nuevas pruebas Jest validando la unificación de niveles cartográficos, el historiador 24h y el cálculo del mini-mapa vectorial.
  - 0 regresiones en las 244 pruebas existentes y 0 errores TypeScript.
