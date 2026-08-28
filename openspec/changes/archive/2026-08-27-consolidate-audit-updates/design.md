# Diseño de Consolidación (consolidate-audit-updates)

Este documento certifica las decisiones técnicas y de diseño implementadas durante el proceso de auditoría global y consolidación del sistema.

## Decisiones Arquitectónicas

1.  **Leaflet Nativo + useRef**: Se establece como estándar absoluto el uso de `L.map` interactuando de forma nativa a través de referencias de React (`useRef`). Esta arquitectura probó ser la única capaz de evitar los errores de renderizado en `0x0` píxeles dentro de entornos *sandboxed* (iframes, Google AI Studio) y soluciona deficiencias del empaquetado SSR de Next.js.

2.  **Mocks Globales en Jest**: Para asegurar que los componentes de WebGIS no bloqueen los flujos de integración continua, se estableció el mock global del objeto `L` en `jest.setup.ts`. Esto permite a las pruebas E2E e unitarias (77 tests de frontend) correr en entornos Node puro donde no existe un objeto `window` real ni el DOM.

3.  **Documentación Actualizada**: 
    *   `AGENTS.md` fue modificado para servir como contrato irrefutable (regla) sobre la implementación de Leaflet nativo.
    *   `README.md` incluye los nuevos contadores de pruebas (116) y detalla la disponibilidad de la Búsqueda Omnibox y los Temas (Alto Contraste / Pleno Sol).

4.  **Swagger UI y Pydantic**: Las estructuras de petición en `backend/src/main.py` recibieron validaciones más restrictivas y docstrings detallados, reflejando correctamente las capacidades de georreferenciación (Shoelace geodésico) al proveer el contexto espacial para Gemini AI.

*Nota: Todas estas decisiones ya han sido implementadas y probadas exitosamente.*
