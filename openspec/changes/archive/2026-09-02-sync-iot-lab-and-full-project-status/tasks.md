## 1. Sincronización de Documentación Externa e Institucional

- [x] 1.1 En `README.md`, actualizar el badge de testing a 144 tests passing, documentar el Módulo 12 (Laboratorio Agro-IoT), actualizar el Tour a 5 pasos y ajustar la sección de validación a 144 tests y 27 rutas.
- [x] 1.2 En `PITCH_DECK.md`, actualizar las métricas a 144 pruebas (93 Jest + 51 Pytest), 27 rutas limpias, Tour de 5 pasos e incluir el Laboratorio Agro-IoT en el stack.
- [x] 1.3 En `docs/MEMORANDO_POSTULACION.md`, actualizar la sección TRL 7 a 27 rutas, 144 tests, 5 pasos del Tour y añadir el banco de micro-cultivo en el diagrama de fuentes de telemetría.
- [x] 1.4 En `AGENTS.md`, actualizar las reglas de testing previo a commit a 93 tests de frontend y 27 rutas limpias en Turbopack.

## 2. Actualización de Componentes y Vistas Interactivas

- [x] 2.1 En `src/components/layout/DemoTourModal.tsx`, expandir `TOUR_STEPS` de 4 a 5 pasos incorporando el Laboratorio Agro-IoT (`/dashboard/iot`).
- [x] 2.2 En `src/app/dashboard/postulacion/page.tsx`, actualizar los badges a "144 Tests Automatizados Pasando" y "Tour Demo 5 Pasos Disponible", integrando la mención al paso del Laboratorio IoT.
- [x] 2.3 En `src/components/diagrams/DataflowDiagramStudio.tsx`, incorporar el nodo `IOT_LAB` en el diagrama Mermaid de Microservicios E2E.

## 3. Verificación Automatizada y Auditoría Final

- [x] 3.1 Ejecutar `npx tsc --noEmit` para verificar 0 errores TypeScript.
- [x] 3.2 Ejecutar `npm test` para certificar los 93 tests Jest y `py -m pytest tests` para los 51 tests Pytest (144 en total).
- [x] 3.3 Compilar en producción con `npm run build` certificando las 27 rutas limpias en Turbopack.
