#!/usr/bin/env bash
set -euo pipefail

# Skip the Hugo build if public/ was built within the last 2 minutes.
# This avoids a redundant build when layout-check runs right after npm test.
NEEDS_BUILD=true
if [ -f "public/index.html" ]; then
  LAST_MOD=$(date -r public/index.html +%s 2>/dev/null || stat -c %Y public/index.html 2>/dev/null || echo 0)
  NOW=$(date +%s)
  if [ $(( NOW - LAST_MOD )) -lt 120 ]; then
    NEEDS_BUILD=false
  fi
fi

if [ "$NEEDS_BUILD" = "true" ]; then
  hugo --quiet --minify --baseURL http://localhost:8080/
fi

npx http-server public -p 8080 -s &
SERVER_PID=$!
sleep 1

EXIT=0
BASE_URL=http://localhost:8080 npx playwright test tests/layout.spec.js || EXIT=$?

kill "$SERVER_PID" 2>/dev/null || true
exit "$EXIT"
