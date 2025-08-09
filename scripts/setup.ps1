param (
    [string]$env = "dev"
)

Write-Host "Setting up $env environment..."

# Change to docker directory
Set-Location -Path "..\docker"

# Start Docker Compose
docker-compose -f "docker-compose.$env.yml" up -d

Write-Host "Environment setup complete. Services are running."