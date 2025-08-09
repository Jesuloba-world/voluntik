param (
    [string]$env = "dev",
    [switch]$follow
)

Set-Location -Path "..\docker"

$cmd = "docker-compose -f docker-compose.$env.yml logs"
if ($follow) {
    $cmd += " -f"
}

Invoke-Expression $cmd