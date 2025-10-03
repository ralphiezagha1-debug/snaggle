param([switch]$CI)
Set-Location "$PSScriptRoot\..\web"
if (Test-Path "package-lock.json") { npm ci } else { npm install }
npm run build
