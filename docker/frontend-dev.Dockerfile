# syntax=docker/dockerfile:1
FROM node:20-alpine

RUN apk add --no-cache libc6-compat python3 make g++ git

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    CHOKIDAR_USEPOLLING=1 \
    WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["pnpm","dev","--hostname","0.0.0.0","--port","3000"]