# Design: expand-system-functionality-ux-and-pedagogy

## Context

See `proposal.md` for motivation. El sistema ya cuenta con motores matemáticos de precisión en backend (`mapbiomas_discrepancy_detector.py`) y frontend (`spatialUtils.ts`, `hydroThermalEngine.ts`, `sarRadarService.ts`), pero carece de puentes de interfaz gráfica para ciertas funciones clave y de herramientas interactivas de rápida evaluación para evaluadores del Premio MapBiomas.

## Goals / Non-Goals

**Goals:**
- Conectar la detección de discrepancias de MapBiomas en el modal de diagnóstico de parcelas (`ParcelDiagnosticModal.tsx`).
- Integrar navegación 360° en las tarjetas de parcelas de `src/app/dashboard/tierras/page.tsx`.
- Crear una barra de presets territoriales en 1 clic (`TerritorialPresetBar.tsx`) utilizable en Dashboard y Simulador.
- Diseñar el comparador split-screen interactivo y calculadora de ROI agroambiental (`ImpactRoiWidget.tsx`).
- Incorporar drawer flotante de glosario agronómico bilingüe (`AgronomicGlossaryDrawer.tsx`).
- Mantener 100% de los 233 tests automatizados pasando y 0 errores de TypeScript.

**Non-Goals:**
- No reestructurar esquemas de Prisma ni tablas de base de datos PostgreSQL.
- No incorporar dependencias pesadas de terceros; utilizar Vanilla CSS glassmorphism, React 19 y Lucide React.

## Decisions

### Decisión 1: Endpoint Puente de Discrepancias Satelitales (`/api/mapbiomas/discrepancy`)
- **Enfoque**: Implementar una ruta en Next.js App Router (`src/app/api/mapbiomas/discrepancy/route.ts`) que intente consultar el backend FastAPI en el puerto 8000 y, en caso de modo offline o sandbox, ejecute un evaluador heurístico local basado en la latitud/longitud y la clase MapBiomas 2024.
- **Alternativa Descartada**: Llamar a FastAPI directamente desde el navegador del cliente. Descartada para evitar problemas de CORS o fallos en despliegues estáticos aislados.

### Decisión 2: Barra Reutilizable de Presets Territoriales (`TerritorialPresetBar.tsx`)
- **Enfoque**: Componente modular que recibe un callback `onSelectScenario(scenario)`. Al activarse, propaga los parámetros exactos (estado, pH, materia orgánica, textura, cultivo, dosis recomendadas) a los estados de React del simulador o panel de control.
- **Escenarios**: Turén (Portuguesa), Sur del Lago (Zulia), Quíbor (Lara) y Cordillera Andina (Mérida).

### Decisión 3: Enlaces Parametrizados en el Hub de Parcela 360°
- **Enfoque**: Extender las tarjetas de `src/app/dashboard/tierras/page.tsx` con enlaces enriquecidos con Query Params:
  - `/dashboard/bitacora?parcelId=${p.id}&parcelName=${encodeURIComponent(p.name)}`
  - `/dashboard/recomendaciones?parcelId=${p.id}&stateId=${p.stateId}&area=${p.areaHectares}#carbon-credits`
  - `/dashboard/iot?parcelId=${p.id}`
- **Beneficio**: No requiere alterar el estado global de la aplicación; el enrutador estándar de Next.js resuelve la hidratación de parámetros en destino.

### Decisión 4: Calculadora de Retorno de Inversión y Comparador Split-Screen
- **Enfoque**: Componente interactivo con slider de hectáreas ($10\text{ ha}$ a $500\text{ ha}$) que modela:
  - Ahorro en enmiendas ($38/ha encalado de precisión).
  - Incremento de rendimiento (+18% en cereales / +22% en cacao).
  - Litros de agua ahorrados ($140,000\text{ L/ha}$ en micro-riego con supresión de lluvia).
  - Ingresos por Bonos de Carbono ($18.5/tCO2e bajo Verra VCS).

### Decisión 5: Drawer Flotante de Glosario de Campo & Ciencia
- **Enfoque**: Botón flotante accesible en la esquina inferior derecha (`📖 Glosario`) que abre un drawer con animación suave sin interrumpir el flujo de trabajo activo, con filtro de búsqueda instantáneo.

## Risks / Trade-offs

- **[Riesgo] Saturación visual en pantallas móviles**: Agregar demasiados botones a las tarjetas de parcelas podría provocar desbordes.
  - *Mitigación*: Agrupar acciones secundarias en un submenú compacto o fila responsiva con iconos y tooltips.
- **[Riesgo] Desalineación entre valores de presets y datos oficiales**:
  - *Mitigación*: Importar constantes directamente desde `VENEZUELA_STATES_DATA` para garantizar 100% de coherencia geográfica.
