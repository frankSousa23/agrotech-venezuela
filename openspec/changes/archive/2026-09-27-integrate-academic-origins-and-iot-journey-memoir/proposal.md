# Proposal: Integración de los Orígenes Académicos Edafológicos, Certificación MapBiomas y Génesis del Hardware IoT

## Why

La memoria del proceso creativo y el expediente del proyecto requieren incorporar los hechos fundacionales reales que dieron origen a Agrotech Venezuela: la vinculación temprana de Frank Sousa con un grupo de investigadores universitarios liderado por un profesor de agronomía especializado en edafología (ciencia del suelo), la asistencia y certificación oficial en el taller de capacitación de la plataforma MapBiomas (40 años de trayectoria de coberturas), el interés original por la producción vegetal combinado con la nutrición de pasturas para ganado, el rol soberano y crítico de Frank Sousa como único desarrollador (filtrando, transformando, podando y descartando activamente sugerencias externas o de la IA que no encajaban en la realidad nacional), y el origen experimental y tangible de los sensores de riego con Arduino/ESP32 proyectados hacia el futuro de grandes cosechas.

Documentar esta verdad histórica y metodológica enriquece el valor testimonial del proyecto ante el jurado del Premio MapBiomas Venezuela 2026, demostrando que el autor no solo es un desarrollador certificado en la herramienta por los propios organizadores, sino que moldeó de manera crítica y soberana cada línea de código.

## What Changes

- **Ampliación de la Memoria Canónica (`docs/` y `public/docs/`)**: Actualización de `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` incorporando:
  - La génesis académica: el grupo de investigación y el profesor de agronomía/edafología.
  - El taller oficial de MapBiomas y la obtención del certificado de capacitación sobre los 40 años de datos.
  - La dualidad agronómica: producción vegetal (cereales/hortalizas) y pasturas/forrajes pecuarios.
  - El tamiz implacable del desarrollador solitario (*solo developer*): el proceso de pedir sugerencias, investigarlas, transformarlas, podarlas o descartarlas sin aceptar nada a ciegas, respaldado por iteraciones consecutivas de 292 pruebas automatizadas.
  - El origen práctico de la telemetría: los primeros ensayos con placas Arduino y sensores de humedad de suelo, y su proyección hacia redes malladas y automatización de grandes cosechas.
- **Sincronización en la Especificación (`prize-publication-exporter`)**: Modificación del requisito normativo sobre la memoria de ingeniería para codificar la presencia obligatoria de estos antecedentes académicos, la certificación MapBiomas y la génesis IoT.
- **Ampliación de Pruebas Automatizadas**: Extensión de `__tests__/api/security-and-dossier.test.ts` con aserciones que verifiquen la presencia de los nuevos hitos (*profesor de edafología*, *certificado MapBiomas*, *producción vegetal*, *Arduino* y *solo developer / único desarrollador*).

## Capabilities

### Modified Capabilities
- `prize-publication-exporter`: Se actualiza el `Requirement: Creative Process Engineering Memoir and Human Dimension Integration` para exigir explícitamente la documentación de la influencia edafológica académica, la certificación en el taller oficial MapBiomas, la soberanía de filtrado de sugerencias por el autor y la evolución del hardware Arduino hacia grandes cosechas.

## Impact

- **Archivos de Documentación**: `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`.
- **UI de Postulación**: Mención en la tarjeta de memoria de autor en `/dashboard/postulacion` de la certificación oficial MapBiomas y el origen edafológico.
- **Pruebas Automatizadas**: `__tests__/api/security-and-dossier.test.ts`, manteniendo el 100% de éxito en la suite de 292 pruebas del sistema.
