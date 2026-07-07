# 🌱 Agrotech Venezuela

Bienvenido al sistema **Agrotech Venezuela**, una herramienta tecnológica orientada a ingenieros agrónomos y productores, diseñada para centralizar, analizar y consultar información vital sobre los **suelos** y **cultivos** en las diversas regiones del país.

## 🚀 Tecnologías Principales (Stack)

*   **Frontend & Backend:** Next.js (App Router), TypeScript, React, CSS Modules (Glassmorphism design).
*   **Base de Datos (ORM):** Prisma.
*   **Base de Datos (Motor):** PostgreSQL.
*   **Geoespacial:** Leaflet (`react-leaflet`) para mapas interactivos edafológicos.
*   **Testing:** Jest & Supertest.
*   **Documentación de API:** Swagger (OpenAPI 3.0).

---

## 💻 Desarrollo Local (Local Environment)

El proyecto está diseñado para poder ser ejecutado localmente sin necesidad de instalar bases de datos de forma nativa en tu computadora.

### Requisitos Previos
- Node.js (v18+)
- Docker y Docker Compose

### Instrucciones paso a paso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Levantar la Base de Datos Local:**
   En la raíz del proyecto, asegúrate de utilizar el archivo `docker-compose.yml` para iniciar un contenedor de PostgreSQL aislado.
   ```bash
   docker-compose up -d
   ```
   > **Nota:** Este contenedor se levanta en el puerto `5444` (por defecto en tu `.env`) para no chocar con otras instalaciones locales de Postgres.

3. **Sincronizar Esquemas:**
   Una vez levantada la base de datos, envía las tablas desde Prisma:
   ```bash
   npx prisma db push
   ```

4. **Llenar Base de Datos (Seeding):**
   Para poder tener datos de las regiones de Venezuela, perfiles de suelos y cultivos, corre:
   ```bash
   npm run tsx prisma/seed.ts
   ```
   *(Si `tsx` no está configurado como script, puedes ejecutar `npx tsx prisma/seed.ts`)*

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la interfaz.

---

## ☁️ Despliegue en Producción (Deployment)

Es crucial entender la diferencia entre el entorno local y el de producción para evitar subir configuraciones erróneas.

### 1. Base de Datos en Producción
**No debes usar `docker-compose.yml` para desplegar la base de datos en producción.** 
Para producción, debes utilizar un servicio de bases de datos PostgreSQL gestionado, tales como:
- **Neon** o **Supabase** (Serveless PostgreSQL)
- **Railway**, **Render** o **DigitalOcean** (Bases de datos relacionales).

Al crear tu base de datos en alguna de estas plataformas, te proporcionarán una cadena de conexión (Connection String). Debes colocar esta cadena como tu variable de entorno **`DATABASE_URL`** en la plataforma de despliegue.

### 2. Despliegue del Código (Frontend + API)
Dado que el proyecto utiliza Next.js, puedes desplegar la aplicación fácilmente en **Vercel** o plataformas PaaS (Render, Railway).
El proyecto cuenta con un `Dockerfile` base que puede ser utilizado en servicios que despliegan a partir de contenedores, aislando el código y ejecutando `npm run build` y `npm start`.

*Asegúrate de agregar `DATABASE_URL` en las variables de entorno de tu proveedor de hosting antes de compilar.*

---

## 📚 Documentación de API (Swagger)

Puedes revisar todas las capacidades del Backend, rutas, y esquemas dirigiéndote a:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

*(Esta página renderizará la UI de Swagger dinámicamente usando la especificación del sistema).*
