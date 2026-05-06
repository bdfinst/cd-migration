#!/usr/bin/env bash
set -euo pipefail

sed -n 's/^NODE_VERSION = "\(.*\)"/\1/p' netlify.toml > .node-version
sed -n 's/^GO_VERSION = "\(.*\)"/\1/p' netlify.toml > .go-version
