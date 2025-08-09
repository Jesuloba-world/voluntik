param (
    [string]$action,
    [string]$env = "dev"
)

if (-not $action) {
    Write-Host "Usage: container-manage.ps1 -action <start|stop|rebuild> [-env <dev|staging|prod>]"
    exit 1
}

Set-Location -Path "..\docker"

switch ($action) {
    "start" {
        docker-compose -f "docker-compose.$env.yml" up -d
        Write-Host "Containers started for $env."
    }
    "stop" {
        docker-compose -f "docker-compose.$env.yml" down
        Write-Host "Containers stopped for $env."
    }
    "rebuild" {
        docker-compose -f "docker-compose.$env.yml" down
        docker-compose -f "docker-compose.$env.yml" build
        docker-compose -f "docker-compose.$env.yml" up -d
        Write-Host "Containers rebuilt for $env."
    }
    default {
        Write-Host "Invalid action: $action"
        exit 1
    }
}