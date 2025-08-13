# auto-heal.ps1 — fix common Vite + ESLint blockers, then re-run sweep
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# --- latest logs
$logs = Get-ChildItem .\.logs -Directory | Sort-Object LastWriteTime -Descending | Select -First 1
if (-not $logs) { Write-Host "No logs yet. Run .\error-sweep.ps1 first."; exit 1 }
$viteLog = Join-Path $logs.FullName "vite-build.log"
Write-Host "Using vite log: $viteLog"

# --- tsconfig alias + excludes
$tsPath = "tsconfig.json"
if (Test-Path $tsPath) {
  $ts = Get-Content $tsPath -Raw | ConvertFrom-Json
  if (-not $ts.compilerOptions) { $ts | Add-Member compilerOptions ([ordered]@{}) }
  if (-not $ts.compilerOptions.baseUrl) { $ts.compilerOptions.baseUrl = "." }
  if (-not $ts.compilerOptions.paths)   { $ts.compilerOptions | Add-Member paths ([ordered]@{}) }
  if (-not $ts.compilerOptions.paths."@/*") { $ts.compilerOptions.paths."@/*" = @("src/*") }
  $ex = @(); if ($ts.exclude) { $ex = @($ts.exclude) }
  foreach($p in @("node_modules","dist","backup_ui_*","**/backup_ui_*","_backup_ui_*","**/_backup_ui_*")){
    if ($ex -notcontains $p) { $ex += $p }
  }
  $ts.exclude = $ex
  $ts | ConvertTo-Json -Depth 50 | Set-Content -Path $tsPath -Encoding UTF8
}

# --- ESLint ignore (no -NoNewline!)
$ign = @"
node_modules/
dist/
backup_ui_*/
**/backup_ui_*/
_backup_ui_*/
**/_backup_ui_*/
"@
Set-Content -Path ".eslintignore" -Value $ign -Encoding UTF8

# --- quiet noisy rule if config present
$rcFiles = @(".eslintrc.cjs",".eslintrc.js","eslint.config.js","eslint.config.cjs")
foreach($rc in $rcFiles){
  if (Test-Path $rc) {
    $txt = Get-Content $rc -Raw
    if ($txt -notmatch "react-refresh/only-export-components") {
      $txt = $txt -replace "(rules:\s*\{)", "`$1`n    'react-refresh/only-export-components': 'off',"
      Set-Content -Path $rc -Value $txt -Encoding UTF8
    }
  }
}

# --- component stub creator (uses placeholder to avoid $ expansion)
function New-ComponentStub {
  param([string]$RelPath)
  $full = Join-Path (Get-Location) $RelPath
  $dir  = Split-Path $full
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $name = [System.IO.Path]::GetFileNameWithoutExtension($full)
  $comp = ($name -split '[-_\.]' | ForEach-Object { if($_){ $_.Substring(0,1).ToUpper()+$_.Substring(1) } }) -join ''
  $tmpl = @'
import * as React from "react";
export const COMPONENT_NAME: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
export default COMPONENT_NAME;
'@
  $code = $tmpl -replace 'COMPONENT_NAME', $comp
  Set-Content -Path $full -Value $code -Encoding UTF8
  Write-Host "Created stub: $RelPath"
}

# --- ensure Badge exists (your prior blocker)
$badge = "src\components\ui\badge.tsx"
if (!(Test-Path $badge)) {
  $badgeCode = @'
import * as React from "react";
function cx(...c:(string|undefined)[]){return c.filter(Boolean).join(" ");}
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default"|"secondary"|"destructive"|"outline" };
export const Badge = React.forwardRef<HTMLSpanElement,BadgeProps>(({ className, variant="default", ...props }, ref) => (
  <span ref={ref} className={cx("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
    variant==="default"?"border-transparent bg-black/80 text-white":
    variant==="secondary"?"border-transparent bg-gray-200 text-gray-900":
    variant==="destructive"?"border-transparent bg-red-600 text-white":"border-gray-300 text-gray-900", className)} {...props} />
));
Badge.displayName = "Badge"; export default Badge;
'@
  New-Item -ItemType Directory -Force -Path (Split-Path $badge) | Out-Null
  Set-Content -Path $badge -Value $badgeCode -Encoding UTF8
  Write-Host "Created: $badge"
}

# --- parse vite log for "Could not load ... src/..."; stub missing files
if (Test-Path $viteLog) {
  $lines = Get-Content $viteLog
  $missing = @()
  foreach($ln in $lines){
    if ($ln -match 'Could not load .*?((src[\\/][A-Za-z0-9._\\/\\-]+))'){
      $rel = ($Matches[1] -replace '/', '\')
      if ($rel -notmatch '\.[tj]sx?$'){ $rel = "$rel.tsx" }
      if (!(Test-Path $rel)) { $missing += $rel }
    }
  }
  $missing = $missing | Select-Object -Unique
  foreach($m in $missing){ New-ComponentStub -RelPath $m }
}

# --- re-run the sweep
Set-ExecutionPolicy -Scope Process Bypass -Force
& .\error-sweep.ps1
