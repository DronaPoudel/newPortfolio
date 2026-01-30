FROM node:20-alpine AS builder

WORKDIR /app

# Copy client definition and installs deps
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci

# Switch back to root to copy shared files if needed by config, 
# but effectively we build inside client
WORKDIR /app

# Copy source code
COPY client ./client
COPY shared ./shared

# Build the client
WORKDIR /app/client
RUN npm run build

# Production image for Client (Nginx)
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/client/dist/public /usr/share/nginx/html

# Copy nginx config if you have one, or just use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
