FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for server
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci

# Switch back to root
WORKDIR /app

# Copy source code
COPY server ./server
COPY shared ./shared

# Build the server (if using a build step)
WORKDIR /app/server
# We run the build script defined in server/package.json
# Note: we might need to adjust tsconfig or imports if they rely on root.
# For simplicity, we can interpret TS directly in prod with tsx or build with esbuild.
# The server package.json I created has a "build" script.
RUN npm run build

# Production image for Server
FROM node:20-alpine

WORKDIR /app

# Copy built artifacts and dependencies
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules ./node_modules
# We might need shared schema at runtime if not bundled.
# The esbuild script bundles dependencies, but let's check.
# If we bundle, we don't need node_modules (except native modules).
# But usually simplest to keep node_modules.

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run", "start"]
