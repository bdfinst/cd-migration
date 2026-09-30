#!/usr/bin/env bash
# Verify SEO and LLM outputs in the built site (default: public/).
set -euo pipefail
dir="${1:-public}"
fail=0
[ -s "$dir/robots.txt" ] && grep -q '^Sitemap: ' "$dir/robots.txt" || { echo "robots.txt missing or has no Sitemap line"; fail=1; }
[ -s "$dir/llms.txt" ] || { echo "llms.txt missing"; fail=1; }
if grep -rl '0001-01-01' "$dir" --include=index.html >/dev/null 2>&1; then echo "placeholder 0001-01-01 date found in HTML"; fail=1; fi
if grep -q '{{[<%]' "$dir/llms-full.txt" 2>/dev/null; then echo "unrendered shortcodes in llms-full.txt"; fail=1; fi
exit $fail
