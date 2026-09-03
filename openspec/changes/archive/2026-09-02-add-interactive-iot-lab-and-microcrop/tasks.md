## 1. Componente del Laboratorio de Micro-Cultivo IoT y Estilos

- [x] 1.1 Crear `src/components/agronomy/MicrocropIoTLab.tsx` con el corte transversal SVG interactivo, animaciones de micro-goteo, 3 presets de micro-cultivo (Tomate, Maíz, Café/Cacao), sliders reactivos de humedad y simulación NASA POWER.
- [x] 1.2 Implementar la pestaña didáctica de hardware con el diagrama de conexiones del ESP32, visor de código Arduino C++ con botón de copiado y mini-calculadora de calibración ADC.
- [x] 1.3 Crear `src/components/agronomy/MicrocropIoTLab.module.css` con estilos Glassmorphism, animaciones de gotas de agua, pulsos de radiofrecuencia y adaptabilidad responsive.

## 2. Nueva Ruta en Next.js e Integración de Navegación

- [x] 2.1 Crear `src/app/dashboard/iot/page.tsx` y su CSS module integrando el componente del laboratorio y el botón universal `BackButton`.
- [x] 2.2 Actualizar `src/app/dashboard/layout.tsx` para agregar la opción `{ href: '/dashboard/iot', label: 'Laboratorio IoT', icon: Radio, badge: 'LAB' }` en `NAV_GROUPS`.
- [x] 2.3 Actualizar `src/components/layout/CommandPalette.tsx` para incorporar términos de búsqueda para el laboratorio IoT.
- [x] 2.4 Actualizar `src/app/dashboard/tierras/page.tsx` para agregar el botón directo hacia el Laboratorio IoT.

## 3. Pruebas Automatizadas y Verificación Técnica

- [x] 3.1 Crear prueba unitaria Jest `__tests__/api/iot-lab.test.ts` para validar el renderizado, cambio de presets y cálculo de ahorro hídrico.
- [x] 3.2 Ejecutar `npx tsc --noEmit` y `npm test` asegurando 100% de tests aprobados y 0 errores de tipado.
- [x] 3.3 Validar la compilación de producción con `npm run build` confirmando las 27 rutas limpias en Turbopack.
