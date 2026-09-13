# Tasks: expand-system-functionality-ux-and-pedagogy

## 1. Conexión de Discrepancias Satelitales MapBiomas (Ground-Truth)

- [x] 1.1 Crear endpoint puente `src/app/api/mapbiomas/discrepancy/route.ts` que consulte al backend o ejecute evaluación heurística offline de concordancia espectral.
- [x] 1.2 Integrar tarjeta o insignia de "Validación de Concordancia MapBiomas Colección 3" en `src/components/gis/ParcelDiagnosticModal.tsx` con score de confianza y estado Ground-Truth.

## 2. Hub de Parcela 360° en Mis Tierras

- [x] 2.1 Enriquecer las tarjetas de parcelas en `src/app/dashboard/tierras/page.tsx` con accesos rápidos parametrizados hacia Bitácora (`/dashboard/bitacora?parcelId=...`), Carbono MRV (`/dashboard/recomendaciones?parcelId=...#carbon-credits`) y gemelo IoT (`/dashboard/iot?parcelId=...`).
- [x] 2.2 Soportar el parámetro `parcelId` en `src/app/dashboard/bitacora/page.tsx` para pre-filtrar el historial y auto-seleccionar la parcela en el formulario modal.

## 3. Selector de Escenarios Emblemáticos en 1 Clic (Demo Switcher)

- [x] 3.1 Crear componente `src/components/agronomy/TerritorialPresetBar.tsx` con los 4 escenarios emblemáticos (Turén, Sur del Lago, Quíbor, Mérida).
- [x] 3.2 Integrar `TerritorialPresetBar` en `src/app/dashboard/recomendaciones/page.tsx` y `src/app/dashboard/page.tsx` para autoconfigurar el simulador y métricas al instante.

## 4. Pedagogía Visual: Comparador Split-Screen, Calculadora ROI y Glosario

- [x] 4.1 Crear componente `src/components/agronomy/ImpactRoiWidget.tsx` con comparador tradicional vs Agrotech y calculadora dinámica de ahorro y bonos de carbono.
- [x] 4.2 Integrar `ImpactRoiWidget` en la sección de sostenibilidad de `src/app/dashboard/recomendaciones/page.tsx` o `src/app/dashboard/estadisticas/page.tsx`.
- [x] 4.3 Crear drawer flotante de glosario de campo `src/components/layout/AgronomicGlossaryDrawer.tsx` e integrarlo en `src/app/dashboard/layout.tsx`.

## 5. Verificación y Certificación de Calidad

- [x] 5.1 Ejecutar suite completa de pruebas Jest (`npm test`) y Pytest backend (`npm run test:backend`) asegurando 100% de tests passing.
- [x] 5.2 Ejecutar `npm run typecheck` y verificar 0 errores TypeScript.
- [x] 5.3 Ejecutar `npm run build` certificando compilación limpia en todas las rutas de Next.js 16.
