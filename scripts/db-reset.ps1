param (
    [string]$env = "dev"
)

Write-Host "Resetting database for $env environment..."

# Stop backend and frontend to avoid connections
docker-compose -f "..\docker\docker-compose.$env.yml" stop backend frontend

# Drop and recreate database
docker exec -it voluntik-db-$env psql -U voluntik_user -d postgres -c "DROP DATABASE IF EXISTS voluntik_$env;"
docker exec -it voluntik-db-$env psql -U voluntik_user -d postgres -c "CREATE DATABASE voluntik_$env;"

# Apply init.sql
docker cp ..\database\init.sql voluntik-db-$env:/init.sql
docker exec -it voluntik-db-$env psql -U voluntik_user -d voluntik_$env -f /init.sql

# Restart services
docker-compose -f "..\docker\docker-compose.$env.yml" start backend frontend

Write-Host "Database reset complete."