# --- Verify we're in a git repo
git rev-parse --is-inside-work-tree 1>$null 2>$null; if ($LASTEXITCODE -ne 0) { throw "Run this inside your repo (e.g., C:\dev\snaggle)." }

# --- Helpers
function Read-All($p){ Get-Content -Raw -Encoding UTF8 -Path $p }
function Write-All($p,$s){ $s | Set-Content -Encoding UTF8 -Path $p }

$changes = @()

# ---------- 1) Fix EMPTY Props interfaces ----------
$targets = @(Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.mjs,*.cjs | Where-Object { -not ($_.FullName -match "node_modules|dist|out|\.next") })

$emptyPropsPattern = '(?ms)interface\s+([A-Za-z0-9_]+Props)\s*\{\s*\}'
foreach($f in $targets){
  $src = Read-All $f.FullName
  if($src -match $emptyPropsPattern){
    $new = [regex]::Replace($src, $emptyPropsPattern, 'type ${1} = {}')
    if($new -ne $src){
      Write-All $f.FullName $new
      $changes += [pscustomobject]@{ File=$f.FullName; Change="Empty interface → type alias (Props)"; }
    }
  }
}

# ---------- 2) Tailwind: switch require(...) to ESM import & ensure plugins: [animate] ----------
$twConfigs = @(
  Join-Path (Get-Location) "tailwind.config.ts",
  Join-Path (Get-Location) "tailwind.config.js",
  Join-Path (Get-Location) "tailwind.config.mjs",
  Join-Path (Get-Location) "tailwind.config.cjs"
) | Where-Object { Test-Path $_ }

foreach($cfg in $twConfigs){
  $src = Read-All $cfg
  $orig = $src
  $fileExt = [IO.Path]::GetExtension($cfg).ToLower()

  # Remove commonjs animate require lines
  $src = [regex]::Replace($src, '(?m)^\s*(const|var|let)\s+animate\s*=\s*require\(["'']tailwindcss-animate["'']\)\s*;?\s*', '')

  # Ensure ESM import (only once)
  if($fileExt -eq ".ts" -or $fileExt -eq ".mjs" -or ($fileExt -eq ".js" -and ($src -notmatch 'module\.exports'))) {
    if($src -notmatch '(?m)^import\s+animate\s+from\s+["'']tailwindcss-animate["'']\s*;'){
      $src = "import animate from `"tailwindcss-animate`";`n$src"
    }
  } else {
    if($src -notmatch '(?m)^import\s+animate\s+from\s+["'']tailwindcss-animate["'']\s*;'){
      $src = "import animate from `"tailwindcss-animate`";`n$src"
    }
  }

  # Ensure plugins array exists
  if($src -notmatch 'plugins\s*:\s*\['){
    $src = [regex]::Replace($src,
      '(?s)(module\.exports\s*=\s*|export\s+default\s+)\{\s*',
      '${1}{ plugins: [animate], '
    )
  } else {
    $src = [regex]::Replace($src,
      '(?s)(plugins\s*:\s*\[)([^\]]*)\]',
      {
        param($m)
        $prefix = $m.Groups[1].Value
        $inside = $m.Groups[2].Value
        if($inside -notmatch '(^|,)\s*animate(\s|,|$)'){
          return "$prefix$inside, animate]"
        } else {
          return $m.Value
        }
      }
    )
  }

  if($src -ne $orig){
    Write-All $cfg $src
    $changes += [pscustomobject]@{ File=$cfg; Change="Tailwind: ESM impor
