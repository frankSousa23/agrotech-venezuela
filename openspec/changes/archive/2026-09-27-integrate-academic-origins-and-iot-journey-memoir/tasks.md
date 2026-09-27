# Tasks

## 1. Ampliación de la Memoria Canónica y Paridad Pública

- [x] 1.1 Redactar e incorporar en `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` las nuevas secciones sobre el grupo de investigación, la influencia del profesor de edafología, la asistencia y obtención del certificado oficial de MapBiomas, el enfoque en producción vegetal y forraje para ganado, el rol crítico del desarrollador único (filtrando, adaptando y podando sugerencias de la IA), y la génesis física de sensores de humedad con Arduino proyectados a grandes cosechas, verificando su formato y estilo.
- [x] 1.2 Replicar el archivo ampliado en `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y verificar la paridad exacta de tamaño y contenido.

## 2. Actualización de Interfaz y Documentos de Postulación

- [x] 2.1 Actualizar la tarjeta de postulación institucional en `src/app/dashboard/postulacion/page.tsx` para reflejar la acreditación del taller oficial MapBiomas, el trasfondo edafológico y la evolución IoT desde Arduino.
- [x] 2.2 Actualizar las menciones cruzadas en `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` y `public/docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` resaltando la certificación en MapBiomas del autor y su rol de filtro crítico soberano.

## 3. Pruebas Automatizadas y Validación Global

- [x] 3.1 Extender `__tests__/api/security-and-dossier.test.ts` con aserciones sobre las nuevas palabras clave ('edafología', 'certificado', 'producción vegetal', 'Arduino', 'desarrollador único') ejecutando `npx jest __tests__/api/security-and-dossier.test.ts` para verificar su aprobación.
- [x] 3.2 Ejecutar la validación unificada del sistema (`npm test`, `npm run typecheck`, `npm run test:backend` y `npm run build`), certificando el 100% de aprobación en las 292 pruebas automatizadas y 0 errores de TypeScript.
