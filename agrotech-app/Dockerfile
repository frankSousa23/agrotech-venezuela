FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar el código fuente
COPY . .

# Generar Prisma y compilar Next.js
# RUN npx prisma generate (se ejecutará cuando prisma esté configurado)
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
