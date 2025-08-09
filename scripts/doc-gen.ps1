$readmePath = "..\..\README.md"

$content = @"
# Voluntik Project

## Overview
Voluntik is a platform for [brief description].

## Setup
- Backend: Go
- Frontend: Next.js
- Database: PostgreSQL with PgBouncer
- Cache: Redis

## Scripts
- setup.ps1: Setup environment
- db-reset.ps1: Reset database
- container-manage.ps1: Manage containers
- logs.ps1: View logs
- backup.ps1: Backup database
- restore.ps1: Restore database
- doc-gen.ps1: Generate this README
"@

Set-Content -Path $readmePath -Value $content

Write-Host "README.md updated."