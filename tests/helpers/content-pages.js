/**
 * Resolves site URL paths (e.g. /docs/symptoms/foo/) to content files under
 * content/en, including Hugo `aliases` entries, so data specs can verify that
 * links stored in YAML point at real, published pages.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_ROOT = path.join(__dirname, '../../content/en');

function normalize(urlPath) {
  return '/' + urlPath.replace(/^\/+|\/+$/g, '');
}

function readFrontMatter(file) {
  const match = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? yaml.load(match[1]) || {} : {};
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

let aliasIndex;

function aliases() {
  if (!aliasIndex) {
    aliasIndex = new Set();
    for (const file of walk(CONTENT_ROOT)) {
      const fm = readFrontMatter(file);
      if (fm.draft) continue;
      for (const alias of (fm.aliases || [])) aliasIndex.add(normalize(alias));
    }
  }
  return aliasIndex;
}

/**
 * Returns true when the URL path maps to a non-draft page (`<path>.md` or
 * `<path>/_index.md`) or to a Hugo alias. Trailing slashes are ignored.
 */
function pageExists(urlPath) {
  const p = normalize(urlPath);
  const candidates = [
    path.join(CONTENT_ROOT, `${p}.md`),
    path.join(CONTENT_ROOT, p, '_index.md'),
  ];
  const file = candidates.find(f => fs.existsSync(f));
  if (file) return !readFrontMatter(file).draft;
  return aliases().has(p);
}

module.exports = { pageExists };
