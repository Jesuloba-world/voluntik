FROM golang:1.24-alpine AS builder

WORKDIR /app

# Install Air
RUN go install github.com/air-verse/air@latest

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Final dev stage
FROM golang:1.24-alpine

WORKDIR /app

# Copy Air binary from builder
COPY --from=builder /go/bin/air /usr/local/bin/air

# Install CA certificates
RUN apk add --no-cache ca-certificates

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]