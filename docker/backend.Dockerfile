# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/backend ./cmd/backend

# Final stage
FROM alpine:latest

WORKDIR /app

# Install CA certificates (for outbound HTTPS if needed)
RUN apk add --no-cache ca-certificates

# Copy config file
COPY --from=builder /app/config.yaml /app/config.yaml

# Copy the binary from builder to a location not shadowed by bind mounts
COPY --from=builder /app/backend /usr/local/bin/backend

# Expose port (assuming 8080)
EXPOSE 8080

# Run the binary
CMD ["backend"]