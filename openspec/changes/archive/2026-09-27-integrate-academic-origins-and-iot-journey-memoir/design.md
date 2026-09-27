# Design: Integración de Orígenes Académicos Edafológicos, Certificación MapBiomas y Génesis del Hardware IoT

## Context

El documento maestro `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y su versión pública en `public/docs/` documentan la visión de ingeniería de Agrotech Venezuela. Para completar la veracidad histórica y humana del proyecto, es necesario incorporar el relato vivencial compartido por su autor (**Frank Sousa**): su vínculo temprano con un grupo de investigadores universitarios y un profesor de agronomía especializado en edafología, la asistencia y obtención del certificado oficial en el taller de la plataforma MapBiomas (40 años de trayectoria), la motivación inicial por la producción vegetal y las pasturas forrajeras para ganado, su metodología soberana como único desarrollador (*solo developer*) que investiga, filtra, transforma y poda sugerencias de la IA o de terceros sin aceptar nada a ciegas, y el nacimiento de la telemetría a partir de ensayos prácticos con microcontroladores Arduino y sensores de humedad de suelo, proyectados al futuro de grandes cosechas.

Ver `proposal.md` y `specs/prize-publication-exporter/spec.md`.

## Goals / Non-Goals

**Goals:**
- Actualizar `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` incorporando las nuevas secciones vivenciales con el más alto rigor narrativo y técnico.
- Actualizar la tarjeta de postulación en `src/app/dashboard/postulacion/page.tsx` para destacar la certificación oficial MapBiomas y el origen edafológico.
- Extender la suite de pruebas `__tests__/api/security-and-dossier.test.ts` con aserciones sobre estos términos clave (*profesor de agronomía/edafología*, *taller certificado MapBiomas*, *producción vegetal*, *pasturas/ganado*, *desarrollador único / solo developer* y *sensores Arduino*).
- Preservar la métrica dorada de 292 pruebas automatizadas al 100%, 0 errores de TypeScript y compilación limpia de 35 rutas en Next.js 16.

**Non-Goals:**
- Modificar el firmware ESP32 o el backend de FastAPI en este ciclo (se mantiene su compatibilidad actual).

## Decisions

### Decisión 1: Estructuración de las Nuevas Secciones en la Memoria de Ingeniería
1. **En el Capítulo 1 (Génesis Creativa)**:
   - Añadir la subsección `1.3 La Chispa Inicial: El Grupo de Investigación, el Profesor de Edafología y el Taller Certificado de MapBiomas`.
   - Detallar cómo el contacto con la cátedra de suelos orientó el interés hacia la producción vegetal (maíz, arroz, hortalizas) y el forraje ganadero, y cómo la participación en el taller de MapBiomas (con certificado de asistencia) demostró el potencial de los 40 años de datos para responder a las preguntas del suelo vivo.
2. **En el Capítulo 2 (La Forja en Antigravity)**:
   - Añadir la subsección `2.3 El Tamiz Crítico del Desarrollador Único (Solo Developer): Soberanía de Criterio y Resistencia al Código Inflado`.
   - Narrar la experiencia de solicitar sugerencias, investigar alternativas y podar/rechazar implacablemente lo que no encajaba con el suelo y la infraestructura venezolana.
3. **En el Capítulo 4/5 (IoT y Horizontes Futuros)**:
   - Detallar cómo el laboratorio de micro-cultivo actual (`/dashboard/iot`) tiene su raíz en los ensayos iniciales con placas Arduino y sensores de humedad caseros en macetas, y cómo esa experiencia física fundamenta la proyección hacia redes malladas y riego automatizado para grandes cosechas comerciales.

### Decisión 2: Enriquecimiento de la Tarjeta en `/dashboard/postulacion`
Actualizar el texto descriptivo de la Tarjeta 6 para mencionar que el autor cuenta con certificación oficial en la plataforma MapBiomas y que el proyecto nace de la intersección entre informática, la cátedra de edafología y la experimentación física con Arduino.

### Decisión 3: Verificación sin Aumentar el Número de Tests (Preservar 292)
Integrar las nuevas aserciones dentro de la prueba de validación de la memoria en `__tests__/api/security-and-dossier.test.ts`, asegurando que la cuenta total de pruebas de Jest se mantenga exactamente en 237 pruebas y el total unificado del sistema en 292 pruebas.

## Risks / Trade-offs

- **[Riesgo] Discrepancia de tamaño o contenido entre `docs/` y `public/docs/`**:
  - *Mitigación*: Copiar el archivo canónico con `Copy-Item -Force` e inspeccionar sus longitudes en bytes con PowerShell.
