#!/usr/bin/env bash
# Fails if any content file contains an absolute self-link to beyond.minimumcd.org.
# Internal links must use relative paths or Hugo relref shortcodes.
set -euo pipefail

matches=$(grep -rn "beyond\.minimumcd\.org" content/ 2>/dev/null || true)

if [[ -n "$matches" ]]; then
  echo "ERROR: absolute self-links found in content files."
  echo "Use relative paths or {{< relref >}} shortcodes instead."
  echo ""
  echo "$matches"
  exit 1
fi
