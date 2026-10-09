/**
 * Tests for tests/helpers/content-pages.js, run against a small temporary
 * content tree so each resolver rule is pinned independently of site content.
 * Expected URLs follow Hugo's output for the same tree.
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
  "docs/_index.md": "title: Docs\naliases:\n  - legacy-section",
  "docs/symptoms/fear.md":
    "title: Fear\naliases:\n  - /docs/old/fear/\n  - legacy-fear/",
  "docs/symptoms/Mixed-Case.md": "title: Mixed\naliases:\n  - /Old/Mixed-Case/",
  "docs/symptoms/draft-page.md":
    "title: Draft\ndraft: true\naliases:\n  - /docs/old/draft/",
};

let contentRoot;
let contentIndex;

test.beforeAll(() => {
  contentRoot = fs.mkdtempSync(path.join(os.tmpdir(), "content-pages-"));
  for (const [file, frontMatter] of Object.entries(PAGES)) {
    const full = path.join(contentRoot, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, `---\n${frontMatter}\n---\n\nBody\n`);
  }
  contentIndex = buildContentIndex(contentRoot);
});

test.afterAll(() => {
  fs.rmSync(contentRoot, { recursive: true, force: true });
});

test.describe("isPublishedPage", () => {
  test("resolves a page with or without a trailing slash", () => {
    expect(isPublishedPage(contentIndex, "/docs/symptoms/fear/")).toBe(true);
    expect(isPublishedPage(contentIndex, "/docs/symptoms/fear")).toBe(true);
  });

  test("resolves a section _index.md to its directory path", () => {
    expect(isPublishedPage(contentIndex, "/docs/")).toBe(true);
  });

  test("resolves a mixed-case file name at its lowercased URL", () => {
    expect(isPublishedPage(contentIndex, "/docs/symptoms/mixed-case/")).toBe(
      true,
    );
  });

  test("rejects a path that differs only in case", () => {
    expect(isPublishedPage(contentIndex, "/docs/Symptoms/fear/")).toBe(false);
    expect(isPublishedPage(contentIndex, "/docs/symptoms/Mixed-Case/")).toBe(
      false,
    );
  });

  test("rejects an unknown path", () => {
    expect(isPublishedPage(contentIndex, "/docs/symptoms/no-such-page/")).toBe(
      false,
    );
  });

  test("rejects a draft page", () => {
    expect(isPublishedPage(contentIndex, "/docs/symptoms/draft-page/")).toBe(
      false,
    );
  });

  test("rejects an alias", () => {
    expect(isPublishedPage(contentIndex, "/docs/old/fear/")).toBe(false);
  });
});

test.describe("isPublishedPageOrAlias", () => {
  test("resolves a published page", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/docs/symptoms/fear/")).toBe(
      true,
    );
  });

  test("resolves an absolute alias of a published page", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/docs/old/fear")).toBe(true);
  });

  test("resolves an alias with the case it is written in", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/Old/Mixed-Case/")).toBe(true);
  });

  test("rejects an alias in a different case", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/old/mixed-case/")).toBe(
      false,
    );
  });

  test("resolves a relative page alias against the page directory", () => {
    expect(
      isPublishedPageOrAlias(contentIndex, "/docs/symptoms/legacy-fear/"),
    ).toBe(true);
  });

  test("does not resolve a relative page alias at the site root", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/legacy-fear/")).toBe(false);
  });

  test("resolves a relative section alias against the section parent", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/legacy-section/")).toBe(true);
    expect(isPublishedPageOrAlias(contentIndex, "/docs/legacy-section/")).toBe(
      false,
    );
  });

  test("rejects an alias declared on a draft page", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/docs/old/draft/")).toBe(
      false,
    );
  });

  test("rejects an unknown path", () => {
    expect(isPublishedPageOrAlias(contentIndex, "/docs/nowhere/")).toBe(false);
  });
});

test.describe("buildContentIndex", () => {
  test("names the file when front matter is invalid", () => {
    const badRoot = fs.mkdtempSync(path.join(os.tmpdir(), "content-pages-"));
    try {
      fs.writeFileSync(path.join(badRoot, "bad.md"), "---\ntitle: [\n---\n");
      expect(() => buildContentIndex(badRoot)).toThrow(/bad\.md/);
    } finally {
      fs.rmSync(badRoot, { recursive: true, force: true });
    }
  });
});
