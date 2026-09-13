## 1. Laboratorio Agro-IoT: Micro-Animaciones de Flujo y Simulador de Estrés

- [x] 1.1 Agregar micro-animación dinámica de pulsos de agua SVG en manguera de goteo e hidratación radicular activa en `MicrocropIoTLab.tsx` y su módulo CSS cuando la electroválvula está en `OPEN`. Verificar visualmente la animación y estilos reactivos.
- [x] 1.2 Integrar medidor de caudal simulado ($L/\text{min}$) y contador acumulativo de agua consumida en tiempo real en `MicrocropIoTLab.tsx`. Verificar que el caudal se active y acumule litros consumidos únicamente con válvula abierta.
- [x] 1.3 Incorporar disparadores rápidos de estresores en 1 clic (Ola de calor +38°C, Tormenta NASA POWER con corte de riego, Desconexión de sensor ADC > 4000) en `MicrocropIoTLab.tsx`. Verificar que cada botón altere el estado reactivo correspondiente y actualice las alertas visuales y de ahorro de recursos.

## 2. Laboratorio Agro-IoT: Historiador Temporal 24 Horas

- [x] 2.1 Desarrollar gráfico temporal SVG interactivo de 24 horas (`Historiador24h`) dentro de la pestaña de Telemetría en `MicrocropIoTLab.tsx`, mostrando VWC%, umbral crítico de marchitez y pulsos de riego/lluvia. Verificar que la curva de oscilación diurna renderice adecuadamente los puntos horarios calculados.
- [x] 2.2 Agregar controles de inspección horaria interactiva (tooltips al pasar el cursor o pulsar sobre la curva de 24h) y métricas de balance hídrico acumulado en `MicrocropIoTLab.tsx`. Verificar que los tooltips muestren hora, humedad y estado de riego.

## 3. Pirámide Cartográfica Unificada en WebGIS

- [x] 3.1 Unificar la navegación cartográfica en `MultiLevelMapViewer.tsx` integrando los 24 polígonos GeoJSON de estados (`venezuelaGeoJson.ts`) directamente en el Nivel 1 Nacional, permitiendo transiciones fluidas hacia el Nivel 2 Municipal y Nivel 3 Parcela mediante breadcrumb interactivo. Verificar que la navegación entre los 3 niveles funcione sin selector de modo separado.
- [x] 3.2 Refactorizar `src/app/dashboard/mapa/page.tsx` para eliminar la segmentación de modos "Explorador Estatal" vs "Multi-Escala", unificando el header y simplificando los controles cartográficos. Verificar que la página cargue directamente el visor integrado.
- [x] 3.3 Implementar optimización de ergonomía táctil en contenedores Leaflet (`touch-action: pan-y`, márgenes táctiles seguros y sincronización de redimensionamiento `map.invalidateSize()`). Verificar en viewport móvil que no se produzcan trampas de scroll vertical.

## 4. Vista Previa Vectorial en Diagnóstico de Parcelas y Proporciones de Dashboard

- [x] 4.1 Incorporar mini-visor cartográfico vectorial con el polígono geodésico y centroide en `ParcelDiagnosticModal.tsx`. Verificar que al abrir el modal de diagnóstico para cualquier lote registrado se visualice el polígono en satélite con su cálculo de Shoelace (ha).
- [x] 4.2 Ajustar proporciones compactas del radar macro-satelital en `src/app/dashboard/page.tsx` (380px móvil / 480px desktop) asegurando armonía visual con la barra de presets emblemáticos. Verificar visualmente el layout del dashboard en resoluciones desktop y móvil.

## 5. Pruebas y Validación Integral del Sistema

- [x] 5.1 Crear suite de pruebas unitarias Jest para el historiador 24h del Laboratorio IoT y la pirámide cartográfica unificada (`src/__tests__/unifiedMapAndIoTLab.test.ts`). Verificar que todos los tests unitarios pasen exitosamente con `npm test`.
- [x] 5.2 Ejecutar verificación de tipos TypeScript (`npm run typecheck`), asegurando 0 errores obligatorios.
- [x] 5.3 Ejecutar compilación de producción Next.js 16 (`npm run build`) verificando que todas las rutas se generen limpiamente.
- [x] 5.4 Ejecutar suite completa unificada de pruebas (`npm run test:all`) certificando 0 regresiones en los 244+ tests existentes de frontend y backend.
