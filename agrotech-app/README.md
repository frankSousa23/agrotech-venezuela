# Agrotech Venezuela 🌾

Plataforma de código abierto para la gestión científica, estadística y edafológica de los suelos de Venezuela y su cruzamiento de idoneidad con cultivos agrícolas.

## Arquitectura y Stack Tecnológico
Este sistema ha sido estructurado con estándares premium y arquitectura robusta para garantizar la integridad científica de los datos:
- **Frontend**: Next.js 14+ (App Router), React, CSS Modules (Glassmorphism UI).
- **Backend**: Next.js Route Handlers (API REST).
- **Base de Datos**: PostgreSQL alojado a través de Docker.
- **ORM**: Prisma (Migraciones, Seed, Seguridad Relacional en Cascada y Restricciones).
- **Seguridad**: Control de Acceso Basado en Roles (RBAC) a nivel de Middleware.
- **Testing**: Integración completa con Jest.
- **Documentación**: API descrita bajo el estándar OpenAPI y renderizada con Swagger UI.

## Sistema de Roles y Permisos (RBAC)
1. **ADMIN**: Acceso irrestricto. Puede crear, editar y realizar borrados destructivos (`DELETE`) de cualquier entidad del sistema.
2. **AGRONOMIST (Ingeniero Agrónomo)**: Puede leer e ingresar nueva información científica (Suelos, Cultivos, Recomendaciones) mediante `POST` y `PUT`.
3. **PRODUCER (Productor)**: Acceso de solo lectura (`GET`). Puede visualizar el mapa interactivo y exportar las recomendaciones a Excel o CSV, pero no puede mutar la base de datos.

## Guía Rápida de Inicio (Entorno Local)

### 1. Requisitos Previos
- [Node.js](https://nodejs.org/en/) (v18+)
- [Docker](https://www.docker.com/) y Docker Compose

### 2. Levantar la Base de Datos Local
En la carpeta raíz del proyecto (`agrotech-app`), enciende tu contenedor de PostgreSQL (que correrá de forma segura en el puerto `5444`):
```bash
docker-compose up -d
```

### 3. Configurar e Instalar
```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Ejecutar la Aplicación y Tests
```bash
# Iniciar servidor
npm run dev

# Correr los tests de integración (Jest)
npx jest
```
Visita [http://localhost:3000](http://localhost:3000) para el Dashboard, y [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar la API.

---

> **Aviso para Despliegues en Producción:** Nunca subas el archivo `docker-compose.yml` ni la carpeta `node_modules`. En producción (Vercel/Railway), la variable de entorno `DATABASE_URL` debe apuntar directamente a tu servicio de base de datos en la nube.

*Licencia MIT - Desarrollado por Frank Sousa (2026).*
