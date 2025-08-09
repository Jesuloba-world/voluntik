param (
    [string]$env = "dev",
    [string]$backupDir = "..\backups"
)

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupDir\voluntik_$env_$timestamp.sql"

docker exec -it voluntik-db-$env pg_dump -U voluntik_user -d voluntik_$env > $backupFile

Write-Host "Backup created: $backupFile"