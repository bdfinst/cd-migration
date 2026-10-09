/**
 * Builds an index of the page and alias URL paths Hugo publishes from
 * content/en Markdown files, so data specs can verify that links stored in
 * YAML point at real, published pages.
 *
 * Supported content shapes: `<path>.md` pages, `<path>/_index.md` sections,
 * YAML front matter, and front matter `aliases`. HTML content such as the
 * home page (`_index.html`) is not indexed. Draft pages and their aliases are
 * excluded.
 *
 * URL rules match Hugo's output (checked against a scratch build):
 * - page paths are lowercased; alias paths keep the case they are written in
 * - a relative alias resolves against the parent of the page URL, so
 *   `legacy` on docs/sub/page.md is /docs/sub/legacy and on docs/_index.md
 *   is /legacy
 * Lookups compare exactly, so a case typo in a data file fails even on a
 * case-insensitive filesystem.
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const CONTENT_ROOT = path.join(__dirname, "../../content/en");

function normalizeUrlPath(urlPath) {
  return "/" + urlPath.replace(/^\/+|\/+$/g, "");
}

function readFrontMatter(file) {
  const match = fs
    .readFileSync(file, "utf8")
    .match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return yaml.load(match[1]) || {};
  } catch (error) {
    throw new Error(`Invalid front matter in ${file}: ${error.message}`);
  }
}

function collectMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectMarkdownFiles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function pageUrlPath(contentRoot, file) {
  const relative = path.relative(contentRoot, file).split(path.sep).join("/");
  return normalizeUrlPath(
    relative.replace(/(^|\/)_index\.md$/, "").replace(/\.md$/, ""),
  ).toLowerCase();
}

function resolveAlias(pageUrlPath, alias) {
  const resolved = alias.startsWith("/")
    ? alias
    : path.posix.join(path.posix.dirname(pageUrlPath), alias);
  return normalizeUrlPath(resolved);
}

/**
 * Reads every page under contentRoot once and returns the set of published
 * page URL paths and the set of alias URL paths that redirect to them.
 */
function buildContentIndex(contentRoot = CONTENT_ROOT) {
  const published = collectMarkdownFiles(contentRoot)
    .map((file) => ({
      urlPath: pageUrlPath(contentRoot, file),
      frontMatter: readFrontMatter(file),
    }))
    .filter((page) => !page.frontMatter.draft);
  return {
    pages: new Set(published.map((page) => page.urlPath)),
    aliases: new Set(
      published.flatMap((page) =>
        (page.frontMatter.aliases || []).map((alias) =>
          resolveAlias(page.urlPath, alias),
        ),
      ),
    ),
  };
}

/** True when the URL path is a published page. Trailing slashes are ignored. */
function isPublishedPage(contentIndex, urlPath) {
  return contentIndex.pages.has(normalizeUrlPath(urlPath));
}

/** True when the URL path is a published page or an alias that redirects to one. */
function isPublishedPageOrAlias(contentIndex, urlPath) {
  return (
    isPublishedPage(contentIndex, urlPath) ||
    contentIndex.aliases.has(normalizeUrlPath(urlPath))
  );
}

module.exports = { buildContentIndex, isPublishedPage, isPublishedPageOrAlias };
