## Why

La incorporación de tecnología IoT en el campo venezolano enfrenta con frecuencia barreras de adopción debido al desconocimiento práctico de cómo cablear, calibrar y programar sensores antes de desplegarlos a escala real en lotes de decenas de hectáreas. El usuario requiere un entorno didáctico interactivo tipo "Laboratorio Agro-IoT de Micro-Cultivo" que ilustre un ejercicio de cultivo mínimo (bancal elevado / mesa de cultivo para hortalizas o plántulas), con animaciones explicativas del ciclo de riego y telemetría, simulación en tiempo real de lluvia satelital NASA POWER vs riego por goteo, esquemas de hardware accesibles (ESP32) y guías de calibración de suelo.

## What Changes

- **Nueva Vista de Laboratorio Agro-IoT (`/dashboard/iot`)**:
  - Interfaz interactiva y moderna con animaciones explicativas SVG/CSS del corte transversal del cultivo (suelo seco, activación de micro-goteo, hidratación radicular, alerta de anegamiento).
  - 3 Presets de Micro-Cultivo Didáctico:
    1. *Huerto de Hortalizas (Tomate Cherry & Pimentón)* - Umbral crítico 35% VWC.
    2. *Micro-Bancal de Maíz Dulce* - Umbral crítico 28% VWC.
    3. *Vivero de Propagación (Café & Cacao)* - Umbral crítico 45% VWC.
  - Simulador de Riego Predictivo: Controles reactivos de humedad, slider de precipitación pronosticada (NASA POWER) y cálculo dinámico de ahorro de agua (Litros) y energía (kWh).
  - Guía Didáctica de Hardware & Código: Esquema de conexiones para ESP32 DevKit v1, relé de 5V, electroválvula de 12V y sonda capacitiva v1.2, con visor de código Arduino C++ listo para copiar.
  - Mini-Calculadora de Calibración de Suelo: Conversor interactivo de lecturas analógicas ADC (aire vs agua) a porcentaje de humedad volumétrica (VWC).
- **Integración Global en el Ecosistema**:
  - Inclusión en el menú de navegación de `src/app/dashboard/layout.tsx` bajo *Fase 3: Operación* con insignia `LAB`.
  - Botón de enlace directo desde `/dashboard/tierras` para saltar de la finca al laboratorio didáctico.
  - Registro en Command Palette (`Ctrl+K`) para búsqueda ágil de términos como "Laboratorio IoT", "Micro-Cultivo", "Riego ESP32".

## Capabilities

### New Capabilities
- `interactive-iot-microcrop-lab`: Dedicated interactive laboratory for learning, simulating, and validating agricultural IoT sensor deployments (ESP32, capacitive moisture, DS18B20, NPK) and automated predictive irrigation in a controlled micro-crop sandbox.

### Modified Capabilities
- `webgis-iot-digital-twin`: Integrate the micro-crop lab telemetry, cross-section animation, and manual/predictive actuator controls into the platform's digital twin architecture.

## Impact

- Nuevos archivos en frontend: `src/app/dashboard/iot/page.tsx`, `src/app/dashboard/iot/page.module.css`, `src/components/agronomy/MicrocropIoTLab.tsx`.
- Modificación en layout y navegación: `src/app/dashboard/layout.tsx`.
- Modificación en tierras: `src/app/dashboard/tierras/page.tsx` (botón de enlace al laboratorio).
- Backend FastAPI: Enlace opcional a los endpoints existentes en `backend/src/iot_manager.py` (`/api/v1/iot/telemetry`).
- Pruebas automatizadas: Suite de pruebas Jest para el laboratorio IoT.
