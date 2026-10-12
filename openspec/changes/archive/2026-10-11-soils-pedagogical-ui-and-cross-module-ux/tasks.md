# Tasks: soils-pedagogical-ui-and-cross-module-ux

## 1. Componentes Pedagógicos del Módulo de Suelos

- [x] 1.1 Implementar `SoilPedagogicalWaterBar.tsx` con 4 zonas fisiológicas (Marchitez, Estrés, Confort Radicular, Encharcamiento), aguja indicadora reactiva, cálculo de días de autonomía hídrica ($\text{Lámina Útil} / 4.5$) y verificar su renderizado mediante tests Jest en `src/components/soils/__tests__/SoilPedagogicalWaterBar.test.tsx`.
- [x] 1.2 Implementar `MapBiomas40YearTrajectoryCard.tsx` integrando `calculateMapBiomasTrajectory`, pérdida de materia orgánica y prescripción regenerativa en sacos tradicionales de 50 kg, verificando sus cálculos con tests Jest en `src/components/soils/__tests__/MapBiomas40YearTrajectoryCard.test.tsx`.
- [x] 1.3 Implementar `SoilModeSwitcher.tsx` e integrarlo en `src/app/dashboard/suelos/page.tsx` y `src/app/embed/soil-module/page.tsx` para alternar entre "Modo Didáctico MapBiomas" y "Modo Técnico Avanzado", verificando la persistencia de estado y legibilidad.

## 2. Tejido de Conectividad Inter-Módulos (Cross-Module Data Fabric)

- [x] 2.1 Agregar enlace de simulación de suelo `[💧 Curva Hídrica & Suelo]` en las tarjetas de parcelas de `src/app/dashboard/tierras/page.tsx` transfiriendo `parcelId`, `texture` y `ph`, verificando que `/dashboard/suelos?tab=simulator` inicialice los sliders con los valores del lote.
- [x] 2.2 Agregar botón de traspaso `[📒 Registrar Enmienda en Bitácora]` en `/dashboard/suelos` hacia `/dashboard/bitacora` pre-rellenando labor `ENCALADO`, dosis en t/ha y conversión automática a sacos tradicionales de 50 kg, verificando la recepción de parámetros en `BitacoraContent`.
- [x] 2.3 Agregar llamada a la acción contextual en `/dashboard/suelos` para filtrar especies en `/dashboard/cultivos` según el pH simulado y enlace a `/dashboard/iot` cuando el agua disponible caiga por debajo del umbral ($\text{PAW} < 50\%$).
- [x] 2.4 Agregar botón CTA institucional `[🚀 Abrir en Agrotech Completo]` en `/embed/soil-module/page.tsx` para que usuarios de MapBiomas puedan acceder a la suite completa sin perder las coordenadas evaluadas.

## 3. Ergonomía Responsive Mobile y Verificación Integral

- [x] 3.1 Reorganizar la distribución de botones de acción en las tarjetas de `/dashboard/tierras` para pantallas móviles (< 768px), agrupando acciones secundarias para eliminar saltos de línea desordenados.
- [x] 3.2 Añadir disparador de dictado por voz campesino de fácil acceso en `/dashboard/bitacora` para registrar labores directamente en condiciones de campo.
- [x] 3.3 Ejecutar la suite automatizada unificada completa (`npm test`, `npm run typecheck`, `npm run test:backend`, `npm run test:all`) y verificar que todos los 306+ tests pasen con 0 errores de TypeScript y 0 regresiones.
