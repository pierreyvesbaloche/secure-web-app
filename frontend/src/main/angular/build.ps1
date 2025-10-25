$ErrorActionPreference = "Stop"

# Add node directory to PATH
$env:PATH = "$PWD\node;$env:PATH"

Write-Host "Installing dependencies..."
.\node\npm.cmd install --legacy-peer-deps

Write-Host "Building the application..."
.\node\npx.cmd ng build

Write-Host "Running tests..."
.\node\npx.cmd ng test --watch=false