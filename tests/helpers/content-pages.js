/**
 * Builds an index of the URL paths Hugo publishes from content/en, so data
 * specs can verify that links stored in YAML point at real, published pages.
 *
 * Supported content shapes: `<path>.md` pages, `<path>/_index.md` sections,
 * YAML front matter, and front matter `aliases` (absolute or page-relative).
 * Draft pages and their aliases are excluded. URL paths are compared exactly,
 * after lowercasing the published side the way Hugo does, so a case typo in
 * a data file fails even on a case-insensitive filesystem.
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
  return match ? yaml.load(match[1]) || {} : {};
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

function resolveAlias(pageUrl, alias) {
  const resolved = alias.startsWith("/")
    ? alias
    : path.posix.join(path.posix.dirname(pageUrl), alias);
  return normalizeUrlPath(resolved).toLowerCase();
}

/**
 * Reads every page under contentRoot once and returns the set of published
 * page URL paths and the set of alias URL paths that redirect to them.
 */
function buildContentIndex(contentRoot = CONTENT_ROOT) {
  const published = collectMarkdownFiles(contentRoot)
    .map((file) => ({
      url: pageUrlPath(contentRoot, file),
      frontMatter: readFrontMatter(file),
    }))
    .filter((page) => !page.frontMatter.draft);
  return {
    pages: new Set(published.map((page) => page.url)),
    aliases: new Set(
      published.flatMap((page) =>
        (page.frontMatter.aliases || []).map((alias) =>
          resolveAlias(page.url, alias),
        ),
      ),
    ),
  };
}

/** True when the URL path is a published page. Trailing slashes are ignored. */
function isPublishedPage(index, urlPath) {
  return index.pages.has(normalizeUrlPath(urlPath));
}

/** True when the URL path is a published page or an alias that redirects to one. */
function isPublishedPageOrAlias(index, urlPath) {
  return (
    isPublishedPage(index, urlPath) ||
    index.aliases.has(normalizeUrlPath(urlPath))
  );
}

module.exports = { buildContentIndex, isPublishedPage, isPublishedPageOrAlias };
