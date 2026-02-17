#!/usr/bin/env bash
set -euo pipefail

# Auto-detect Chrome when PUPPETEER_EXECUTABLE_PATH is not set
if [ -z "${PUPPETEER_EXECUTABLE_PATH:-}" ]; then
  if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  elif command -v google-chrome-stable >/dev/null 2>&1; then
    export PUPPETEER_EXECUTABLE_PATH="$(command -v google-chrome-stable)"
  elif command -v google-chrome >/dev/null 2>&1; then
    export PUPPETEER_EXECUTABLE_PATH="$(command -v google-chrome)"
  elif command -v chromium >/dev/null 2>&1; then
    export PUPPETEER_EXECUTABLE_PATH="$(command -v chromium)"
  fi
fi

hugo --quiet --minify --baseURL http://localhost:8080/

npx http-server public -p 8080 -s &
SERVER_PID=$!
sleep 1

EXIT=0
npx pa11y-ci --sitemap http://localhost:8080/sitemap.xml || EXIT=$?

kill "$SERVER_PID" 2>/dev/null || true
exit "$EXIT"
