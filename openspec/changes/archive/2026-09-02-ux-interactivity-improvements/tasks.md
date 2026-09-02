## 1. Componentes Reutilizables de Ayuda

- [x] 1.1 Crear componente `Tooltip.tsx` interactivo y verificar que renderiza correctamente el texto al hacer hover (Desktop) o click (Mobile).
- [x] 1.2 Crear componente `HelpModal.tsx` y verificar que abre/cierra correctamente mostrando el título y contenido dinámico que se le pase.

## 2. Botón Global de Cerrar Sesión

- [x] 2.1 Modificar `src/app/dashboard/layout.tsx` para asegurar que el botón de "Cerrar Sesión" esté permanentemente visible en la barra Desktop junto al toggle de tema. Verificar iniciando sesión.
- [x] 2.2 Modificar `src/app/dashboard/layout.tsx` para agregar el mismo botón en la barra superior Mobile de forma nativa. Verificar simulando vista de teléfono.

## 3. Implementación de Ayudas en Vistas Complejas

- [x] 3.1 Añadir `Tooltip` en los parámetros de la Calculadora de Carbono y el Simulador para explicar variables edafológicas. Verificar que los textos sean legibles.
- [x] 3.2 Implementar el `HelpModal` en el WebGIS o Dashboard para explicar la integración de datos de MapBiomas y NASA POWER, reemplazando la información estática oculta. Verificar abriendo el modal desde la interfaz.

## 4. Auditoría y Verificación Final

- [x] 4.1 Correr toda la suite de pruebas del Frontend (`npm test`) y verificar que pasa con los nuevos componentes.
- [x] 4.2 Correr Next.js build y verificar visualmente los flujos con el servidor corriendo sin errores.
