FROM node:20-alpine AS base
WORKDIR /app

ARG API_URL
ARG DOMAIN
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DOMAIN

ENV API_URL=$API_URL
ENV DOMAIN=$DOMAIN
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN

RUN echo "🔧 API_URL is ${API_URL}"

# Copia y instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . .

# Construye la app (genera .next)
RUN npm run build --debug

# Expone el puerto donde correrá Next.js
EXPOSE 3001

# Inicia el servidor en producción escuchando en todas las interfaces
CMD ["npm", "start"]
