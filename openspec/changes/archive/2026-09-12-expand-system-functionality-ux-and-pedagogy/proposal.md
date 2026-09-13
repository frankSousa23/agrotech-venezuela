## Why

A días de la postulación formal al Premio MapBiomas Venezuela 2026 (Categoría General / Artículo Técnico TRL 4), el sistema cuenta con algoritmos avanzados de machine learning, radar SAR, calibración edafológica regional y telemetría IoT. Sin embargo, tres áreas clave requieren optimización secuencial:
1. **Funcionalidad oculta**: El detector de discrepancias satelitales (`mapbiomas_discrepancy_detector.py`) no está expuesto en la interfaz WebGIS como red de validación y Ground-Truth en vivo para el equipo MapBiomas.
2. **Navegación fragmentada de parcelas**: La tarjeta de lote en Mis Tierras no ofrece enlaces 360° directos a la Bitácora, Carbono MRV y Lab IoT con parámetros precargados.
3. **Storytelling pedagógico y evaluación rápida**: Los jurados y visitantes técnicos deben manipular múltiples controles manuales en vez de poder activar escenarios emblemáticos venezolanos en 1 clic o visualizar el retorno de inversión y el flujo punta a punta del dato agronómico.

## What Changes

- **Conexión WebGIS de Discrepancias MapBiomas**: Integrar en el modal de diagnóstico de parcelas (`ParcelDiagnosticModal.tsx`) y en el visor WebGIS la evaluación de concordancia en tiempo real contra Sentinel-2 L2A y radar SAR, mostrando insignias de consistencia o alertas tempranas de deforestación/regeneración como retroalimentación para la Colección 4 de MapBiomas.
- **Hub de Parcela 360° en Mis Tierras**: Enriquecer la tarjeta de cada lote en `src/app/dashboard/tierras/page.tsx` con accesos rápidos hacia:
  - Cuaderno de campo filtrado por la parcela (`/dashboard/bitacora?parcelId=...`).
  - Calculadora de Bonos de Carbono con área y pH del lote (`/dashboard/recomendaciones?parcelId=...#carbon-credits`).
  - Banco de pruebas IoT (`/dashboard/iot?parcelId=...`).
- **Selector de Escenarios Emblemáticos en 1 Clic**: Barra interactiva superior en el Dashboard (`/dashboard`) y en el Simulador (`/dashboard/recomendaciones`) con 4 presets geográficos inmediatos:
  - 🌾 *Llanos Centrales (Turén / Portuguesa)*: Maíz Harinero, pH 6.4, NPK 12-24-12.
  - 🍌 *Sur del Lago (Zulia)*: Cacao Porcelana / Plátano Hartón, pH 5.2, Cal Dolomítica 2.2 Ton/ha.
  - 🧅 *Valle de Quíbor (Lara)*: Suelo salino-sódico, pH 7.8, Yeso Agrícola 2.5 Ton/ha.
  - ☕ *Cordillera Andina (Mérida)*: Café Arábica, pH 5.8, SAF agroforestal y alto stock de carbono.
- **Comparador Visual de Impacto & Calculadora ROI**: Componente interactivo split-screen "Manejo Tradicional Ciego vs. Inteligencia Agrotech" y widget de cálculo de ahorro de fertilizante, rendimiento extra, litros de agua preservados y valor de créditos de carbono según las hectáreas ingresadas.
- **Glosario Flotante de Campo y Ciencia**: Drawer colapsable accesible desde la interfaz global para consulta instantánea de terminología agronómica (PRNT, AHP, SAR, Shoelace, Saxton-Rawls, GDD).

## Capabilities

### New Capabilities
- `territorial-scenarios-quick-switcher`: Selector interactivo de 4 escenarios emblemáticos venezolanos en 1 clic para autoconfigurar mapas, suelos, cultivos y dictámenes.
- `parcel-360-hub-navigation`: Navegación integral bidireccional desde cada lote hacia Bitácora, Carbono MRV y gemelo digital IoT con parámetros precargados.
- `ecosystem-impact-and-roi-simulator`: Comparador interactivo de impacto regenerativo (Antes vs. Después) y calculadora económica de ahorro y retorno agronómico.

### Modified Capabilities
- `mapbiomas-discrepancy-detection`: Extensión de la especificación para exponer la evaluación de concordancia espectral en la interfaz de usuario WebGIS con insignias de confianza y soporte de retroalimentación Ground-Truth.

## Impact

- **Frontend**: `src/components/gis/ParcelDiagnosticModal.tsx`, `src/app/dashboard/tierras/page.tsx`, `src/app/dashboard/page.tsx`, `src/app/dashboard/recomendaciones/page.tsx`, `src/app/dashboard/layout.tsx`.
- **API**: Nuevo endpoint puente `/api/mapbiomas/discrepancy` en Next.js comunicándose con el motor Python o evaluando la firma espectral localmente con resiliencia offline.
- **Tests**: Ampliación de la suite Jest para cubrir los nuevos componentes interactivos, manteniendo los 233 tests automatizados y 0 errores TypeScript.
