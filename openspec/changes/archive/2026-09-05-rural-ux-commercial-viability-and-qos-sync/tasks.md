## 1. IA Dual-Tone & Capa de Traducción Vernácula

- [x] 1.1 Actualizar `src/app/api/gemini/advisor/route.ts` para admitir `uiMode?: 'farmer' | 'technical'`, configurar el prompt "El Compadre Agrónomo" con traducción de radar SAR, GDD, Kamprath y unidades en sacos para Modo Productor, y actualizar el fallback determinista dual. Verificar que una petición con `uiMode: 'farmer'` devuelva vocabulario vernáculo y sin jerga informática.
- [x] 1.2 Inyectar `useUIMode()` en `src/components/gis/ParcelDiagnosticModal.tsx` y `src/app/dashboard/recomendaciones/page.tsx` para enviar el `uiMode` activo al endpoint `/api/gemini/advisor`. Verificar que el modal y la página envíen `'farmer'` o `'technical'` según el modo activo.

## 2. Protocolo de Sincronización Rural QoS & Bitácora Resiliente

- [x] 2.1 Actualizar `src/app/api/field-logs/route.ts` para aceptar `clientLogId` y garantizar idempotencia en la inserción de labores agrícolas ante reconexiones intermitentes. Verificar con peticiones consecutivas con el mismo `clientLogId`.
- [x] 2.2 Modificar `src/app/dashboard/bitacora/page.tsx` para que ante fallos de conexión encole las labores en `localStorage` (`agrotech_offline_field_logs`) con `clientLogId` único y actualice la vista de forma optimista. Verificar que desconectado se guarden las anotaciones localmente.
- [x] 2.3 Mejorar `src/components/layout/ConnectivityStatusBadge.tsx` incorporando detección de calidad de red (Network Information API), despacho prioritario de la cola de texto ligero (< 10 KB) al reconectar, supresión/pausa de teselas de mapa pesadas en señales débiles (2G/EDGE), y visualización del aviso de ahorro de datos rural. Verificar la lógica de sincronización y estado visual.

## 3. Viabilidad Comercial, MRV Carbon Pooling & Reorganización del Dossier

- [x] 3.1 Integrar en `src/components/agronomy/CarbonCreditsCalculator.tsx` el módulo interactivo de "Modelo de Agregación Comercial (Carbon Pooling)", calculando viabilidad para parcelas < 50 ha, partición de ingresos (85% agricultor, 15% plataforma Agrotech) y comparativa frente a certificación tradicional. Verificar los cálculos reactivos de retorno.
- [x] 3.2 Reestructurar `PITCH_DECK.md` y `docs/MEMORANDO_POSTULACION.md` anteponiendo el impacto económico cuantificado (ROI de 3.8x, ahorro de 35% en fertilizantes), las 4 capas de monetización B2B/B2G y el modelo de negocio de carbono, trasladando la arquitectura técnica a apéndices. Verificar coherencia editorial.
- [x] 3.3 Actualizar `src/app/dashboard/postulacion/page.tsx` destacando los KPIs económicos, los niveles de negocio SaaS y el modelo de originación de carbono en la cabecera ejecutiva. Verificar renderizado en la interfaz web.

## 4. Auditoría Integral, Suite de Pruebas & Validación del Sistema

- [x] 4.1 Ejecutar suite de pruebas Jest (`npm test`) y verificar que todos los tests de frontend, dual mode y sincronización pasen al 100%.
- [x] 4.2 Ejecutar verificación de tipos estricta TypeScript (`npm run typecheck`) y confirmar 0 errores.
- [x] 4.3 Ejecutar compilación de producción Next.js Turbopack (`npm run build`) y verificar que las 28 rutas compilen de manera limpia.
- [x] 4.4 Ejecutar suite unificada automatizada (`npm run test:all`) y verificar la aprobación total de las pruebas frontend y backend.

