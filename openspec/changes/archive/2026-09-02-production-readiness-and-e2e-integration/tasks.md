## 1. Higiene del Repositorio y Configuración de Git

- [x] 1.1 Des-trackear `tsconfig.tsbuildinfo` del índice de Git (`git rm --cached tsconfig.tsbuildinfo`) y eliminar archivos de log/scratch efímeros (`eslint_output.txt`, `scratch_fix.py`, `scratch/fix_css.js`).
- [x] 1.2 Actualizar `.gitignore` con exclusiones robustas para `*.tsbuildinfo`, `*.log`, `*_output.txt`, `scratch/` y cachés locales.

## 2. Integración E2E Parcela ➔ Asesor Gemini AI

- [x] 2.1 En `src/app/dashboard/tierras/page.tsx`, añadir botón de acción rápida "✨ Asesor IA" en las tarjetas de parcelas guardadas para transferir el contexto hacia `/dashboard/recomendaciones`.
- [x] 2.2 En `src/app/dashboard/recomendaciones/page.tsx`, habilitar lectura de parámetros de URL (`crop`, `stateId`, `parcelName`) para autocompletar el asistente edafológico al aterrizar desde una parcela.

## 3. Modo Demostración / Tour Guiado de 4 Pasos

- [x] 3.1 Crear el componente `src/components/layout/DemoTourModal.tsx` con navegación interactiva paso a paso (1. Nacional, 2. Micro-Parcela SAR, 3. Asesor Gemini, 4. TRL 7).
- [x] 3.2 Integrar el botón "🎬 Tour Demo" en la barra de utilidades de `src/app/dashboard/layout.tsx` para abrir el modal desde cualquier vista del dashboard.

## 4. Configuración de Producción y Auditoría Final

- [x] 4.1 Crear `.env.production.example` con la documentación detallada de todas las variables de entorno para despliegue en VPS Linux o Google Cloud.
- [x] 4.2 Ejecutar comprobación de tipos TypeScript (`npx tsc --noEmit`), suite de pruebas Jest (`npm test`) y compilación Next.js (`npm run build`) para auditar que el 100% de los módulos e integraciones funcionen limpiamente.
