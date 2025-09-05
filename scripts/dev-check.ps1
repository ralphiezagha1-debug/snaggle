#!/usr/bin/env pwsh

<#
    Runs a series of checks for both the frontend and Cloud Functions.  This script
    assumes you are in the repository root. It installs dependencies and then
    executes the lint, typecheck and build tasks for the web app and the
    Cloud Functions. If any command fails, the script will stop and return
    a non‑zero exit code.
#>

Set-StrictMode -Version Latest
function RunOrThrow($cmd) {
    Write-Host "Running: $cmd"
    $process = Start-Process pwsh -ArgumentList "-NoLogo", "-NoProfile", "-Command", $cmd -NoNewWindow -Wait -PassThru
    if ($process.ExitCode -ne 0) {
        throw "Command failed: $cmd"
    }
}

try {
    # Install root dependencies
    RunOrThrow "npm ci"

    # Install and test functions
    RunOrThrow "npm ci --prefix functions"
    RunOrThrow "npm run typecheck --prefix functions"
    RunOrThrow "npm run build --prefix functions"

    # Run root checks
    RunOrThrow "npm run lint --if-present"
    RunOrThrow "npm run typecheck --if-present"
    RunOrThrow "npm run build --if-present"

    Write-Host "✅ Dev checks completed successfully"
} catch {
    Write-Error $_
    exit 1
}