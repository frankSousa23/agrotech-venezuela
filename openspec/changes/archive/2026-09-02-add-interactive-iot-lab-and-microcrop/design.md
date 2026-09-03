## Context

Ver `proposal.md`. La plataforma cuenta con capacidades backend para ingesta de telemetría IoT (`backend/src/iot_manager.py`) y un panel básico en `/dashboard/tierras`. Sin embargo, falta un entorno dedicado, interactivo y pedagógico donde los usuarios puedan visualizar un micro-cultivo a escala de banco de pruebas, comprender el ciclo de decisiones de riego predictivo con NASA POWER y aprender a cablear y calibrar sensores con microcontroladores ESP32.

## Goals / Non-Goals

**Goals:**
- Implementar la vista `/dashboard/iot` con el componente interactivo `MicrocropIoTLab.tsx` y su módulo de estilos.
- Crear una ilustración interactiva en corte transversal SVG con animación fluida de micro-gotas, hidratación radicular y cambio de textura edáfica.
- Implementar simulador con 3 presets de micro-cultivo (Tomate Cherry/Hortalizas, Maíz Dulce, Vivero Café/Cacao) y controles reactivos de humedad y lluvia NASA POWER.
- Mostrar métricas en vivo de ahorro hídrico (Litros) y ahorro energético (kWh) generados por la supresión inteligente de riego.
- Proporcionar guía de hardware (Pinout ESP32, relé 5V, electroválvula 12V, sonda capacitiva v1.2) con visor de código firmware Arduino C++ y calculadora de calibración ADC.
- Integrar la ruta en la navegación de `layout.tsx`, `CommandPalette.tsx` y enlace contextual desde `/dashboard/tierras`.

**Non-Goals:**
- No se requiere conexión por puerto serie físico WebSerial en el navegador (opera mediante simulación matemática o peticiones REST HTTP a FastAPI).

## Decisions

### 1. Animación Vectorial SVG + CSS Keyframes
- **Decisión:** Emplear SVG puro con clases CSS para animar las gotas de agua cayendo de la micro-manguera, la onda de absorción en la zona radicular y el pulso de radiofrecuencia del nodo ESP32.
- **Ventaja:** 60fps garantizados, cero dependencias pesadas de canvas/three.js, escalabilidad perfecta en móviles y soporte para modo Pleno Sol.

### 2. Arquitectura de Simulación Híbrida (Zero-Fail Offline + API REST)
- **Decisión:** El laboratorio dispondrá de un motor de simulación local autónomo en React (que corre offline en PWA) y opcionalmente puede despachar peticiones a `/api/v1/iot/telemetry` del backend FastAPI cuando esté en línea.

### 3. Presets Agronómicos Realistas
- **Decisión:** Los 3 presets utilizarán curvas de retención hídrica reales:
  - *Tomate*: Umbral crítico 35% VWC, goteros de 1.5 L/h.
  - *Maíz*: Umbral crítico 28% VWC, goteros de 2.0 L/h.
  - *Café/Cacao*: Umbral crítico 45% VWC, micro-aspersión de 3.0 L/h.

## Risks / Trade-offs

- **[Rendimiento de animaciones en dispositivos de gama baja]** → Mitigación: Usar aceleración por hardware (`will-change: transform`, `transform: translateY`) y pausas automáticas cuando el riego no está activo.
