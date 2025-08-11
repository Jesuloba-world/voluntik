# Dev stage
FROM node:20-alpine AS dev

WORKDIR /app

# Configure npm to be resilient to network hiccups
ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000 \
    NPM_CONFIG_TIMEOUT=600000 \
    NPM_CONFIG_NETWORK_CONCURRENCY=1

EXPOSE 3000

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Configure npm to be resilient to network hiccups
ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000 \
    NPM_CONFIG_TIMEOUT=600000 \
    NPM_CONFIG_NETWORK_CONCURRENCY=1

# Copy package files
COPY package*.json ./

# Install dependencies (allow legacy peer deps due to React 19 ecosystem)
RUN npm install --no-audit --no-fund --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Final stage
FROM node:20-alpine

WORKDIR /app

# Configure npm to be resilient to network hiccups
ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000 \
    NPM_CONFIG_TIMEOUT=600000 \
    NPM_CONFIG_NETWORK_CONCURRENCY=1

# Copy built assets and necessary files
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install production dependencies (allow legacy peer deps due to React 19 ecosystem)
RUN npm install --only=production --no-audit --no-fund --legacy-peer-deps

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]