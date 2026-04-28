# Build stage
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage - serve with Caddy
FROM zeabur/caddy-static:latest
COPY --from=builder /app/dist /srv
