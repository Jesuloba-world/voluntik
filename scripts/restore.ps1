param (
    [string]$env = "dev",
    [string]$backupFile
)

if (-not $backupFile -or -not (Test-Path $backupFile)) {
    Write-Host "Please provide a valid backup file path."
    exit 1
}

Write-Host "Restoring database from $backupFile..."

# Stop services
docker-compose -f "..\docker\docker-compose.$env.yml" stop backend frontend

# Drop and recreate database
docker exec -it voluntik-db-$env psql -U voluntik_user -d postgres -c "DROP DATABASE IF EXISTS voluntik_$env;"
docker exec -it voluntik-db-$env psql -U voluntik_user -d postgres -c "CREATE DATABASE voluntik_$env;"

# Restore from backup
docker cp $backupFile voluntik-db-$env:/backup.sql
docker exec -it voluntik-db-$env psql -U voluntik_user -d voluntik_$env -f /backup.sql

# Restart services
docker-compose -f "..\docker\docker-compose.$env.yml" start backend frontend

Write-Host "Database restored."