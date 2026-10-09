/**
 * Tests for tests/helpers/content-pages.js, run against a small temporary
 * content tree so each resolver rule is pinned independently of site content.
 */

const { test, expect } = require("@playwright/test");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  buildContentIndex,
  isPublishedPage,
  isPublishedPageOrAlias,
} = require("./helpers/content-pages");

const PAGES = {
  "docs/_index.md": "title: Docs",
  "docs/symptoms/fear.md":
    "title: Fear\naliases:\n  - /docs/old/fear/\n  - legacy-fear/",
  "docs/symptoms/draft-page.md":
    "title: Draft\ndraft: true\naliases:\n  - /docs/old/draft/",
};

let contentRoot;
let index;

test.beforeAll(() => {
  contentRoot = fs.mkdtempSync(path.join(os.tmpdir(), "content-pages-"));
  for (const [file, frontMatter] of Object.entries(PAGES)) {
    const full = path.join(contentRoot, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, `---\n${frontMatter}\n---\n\nBody\n`);
  }
  index = buildContentIndex(contentRoot);
});

test.afterAll(() => {
  fs.rmSync(contentRoot, { recursive: true, force: true });
});

test.describe("isPublishedPage", () => {
  test("resolves a page with or without a trailing slash", () => {
    expect(isPublishedPage(index, "/docs/symptoms/fear/")).toBe(true);
    expect(isPublishedPage(index, "/docs/symptoms/fear")).toBe(true);
  });

  test("resolves a section _index.md to its directory path", () => {
    expect(isPublishedPage(index, "/docs/")).toBe(true);
  });

  test("rejects an unknown path", () => {
    expect(isPublishedPage(index, "/docs/symptoms/no-such-page/")).toBe(false);
  });

  test("rejects a draft page", () => {
    expect(isPublishedPage(index, "/docs/symptoms/draft-page/")).toBe(false);
  });

  test("rejects a path that differs only in case", () => {
    expect(isPublishedPage(index, "/docs/Symptoms/fear/")).toBe(false);
  });

  test("rejects an alias", () => {
    expect(isPublishedPage(index, "/docs/old/fear/")).toBe(false);
  });
});

test.describe("isPublishedPageOrAlias", () => {
  test("resolves a published page", () => {
    expect(isPublishedPageOrAlias(index, "/docs/symptoms/fear/")).toBe(true);
  });

  test("resolves an absolute alias of a published page", () => {
    expect(isPublishedPageOrAlias(index, "/docs/old/fear")).toBe(true);
  });

  test("resolves a relative alias against the page directory", () => {
    expect(isPublishedPageOrAlias(index, "/docs/symptoms/legacy-fear/")).toBe(
      true,
    );
    expect(isPublishedPageOrAlias(index, "/legacy-fear/")).toBe(false);
  });

  test("rejects an alias declared on a draft page", () => {
    expect(isPublishedPageOrAlias(index, "/docs/old/draft/")).toBe(false);
  });

  test("rejects an unknown path", () => {
    expect(isPublishedPageOrAlias(index, "/docs/nowhere/")).toBe(false);
  });
});
