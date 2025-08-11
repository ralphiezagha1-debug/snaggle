#!/usr/bin/env bash
set -euo pipefail
FILE=".github/workflows/deploy.yml"

if [ ! -f "$FILE" ]; then
  echo "::error::Workflow file missing at $FILE"
  exit 1
fi

# Require these keys to exist:
required=(
  "name:"
  "on:"
  "jobs:"
  "build:"
  "deploy-preview:"
  "promote:"
)

missing=0
for key in "${required[@]}"; do
  if ! grep -qE "^\s*${key}" "$FILE"; then
    echo "::error::Missing key: ${key}"
    missing=1
  fi
done

if [ $missing -ne 0 ]; then
  echo "::error::verify-deploy-yml.sh FAILED"
  exit 1
fi

# Produce a normalized checksum (ignoring comments/blank lines)
checksum=$(grep -vE '^\s*#|^\s*$' "$FILE" | sed 's/[[:space:]]\+/ /g' | sha256sum | awk '{print $1}')
echo "Normalized SHA256: ${checksum}"

echo "verify-deploy-yml.sh PASSED"
