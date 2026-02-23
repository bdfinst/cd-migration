#!/usr/bin/env bash
set -euo pipefail

hugo --quiet --minify --baseURL http://localhost:8080/

npx http-server public -p 8080 -s &
SERVER_PID=$!
sleep 1

EXIT=0
BASE_URL=http://localhost:8080 npx playwright test tests/layout.spec.js || EXIT=$?

kill "$SERVER_PID" 2>/dev/null || true
exit "$EXIT"
