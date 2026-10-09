/**
 * Data integrity tests for the finder data files:
 * data/finder-symptoms.yaml, data/finder-antipatterns.yaml, and
 * data/finder-healthcheck.yaml.
 *
 * These run without a browser. The finder shortcodes embed these files at
 * build time and resolve anti-pattern IDs in the browser, so a mistyped ID or
 * path would otherwise ship silently.
 */

const { test, expect } = require("@playwright/test");
const { loadDataFile, findDuplicates } = require("./helpers/data-files");
const {
  buildContentIndex,
  isPublishedPage,
} = require("./helpers/content-pages");

const DATA_FILES = {
  symptoms: "finder-symptoms.yaml",
  antiPatterns: "finder-antipatterns.yaml",
  healthcheck: "finder-healthcheck.yaml",
};

let rawData;
let symptoms;
let antiPatterns;
let healthcheck;
let statements;
let antiPatternIds;
let contentIndex;

// Non-list data becomes [] so only the "loads as a non-empty list" tests
// report a malformed file, instead of every test throwing a TypeError.
function asList(value) {
  return Array.isArray(value) ? value : [];
}

function isBlank(value) {
  return value === null || value === undefined || value === "";
}

test.beforeAll(() => {
  rawData = Object.fromEntries(
    Object.values(DATA_FILES).map((name) => [name, loadDataFile(name)]),
  );
  symptoms = asList(rawData[DATA_FILES.symptoms]);
  antiPatterns = asList(rawData[DATA_FILES.antiPatterns]);
  healthcheck = asList(rawData[DATA_FILES.healthcheck]);
  statements = healthcheck.flatMap((area) =>
    asList(area?.statements).map((statement) => ({
      ...statement,
      area: area.id,
    })),
  );
  antiPatternIds = new Set(antiPatterns.map((antiPattern) => antiPattern?.id));
  contentIndex = buildContentIndex();
});

function missingFields(entries, fields, label) {
  return entries
    .filter((entry) => fields.some((field) => isBlank(entry?.[field])))
    .map(
      (entry) =>
        `${label} "${entry?.id || "(no id)"}" missing one of: ${fields.join(", ")}`,
    );
}

function nonListAntiPatterns(entries, label) {
  return entries
    .filter((entry) => !Array.isArray(entry?.anti_patterns))
    .map(
      (entry) =>
        `${label} "${entry?.id || "(no id)"}" anti_patterns is not a list`,
    );
}

function unknownAntiPatternIds(entries, label) {
  return entries.flatMap((entry) =>
    asList(entry?.anti_patterns)
      .filter((id) => !antiPatternIds.has(id))
      .map((id) => `${label} "${entry.id}" -> "${id}"`),
  );
}

function linkedEntries() {
  return [
    ...symptoms.map((entry) => ({ dataset: "symptoms", entry })),
    ...antiPatterns.map((entry) => ({ dataset: "antipatterns", entry })),
  ];
}

test.describe("finder data structure", () => {
  for (const name of Object.values(DATA_FILES)) {
    test(`${name} loads as a non-empty list`, () => {
      const data = rawData[name];
      expect(Array.isArray(data), `${name} is not a list`).toBe(true);
      expect(data.length, `${name} is empty`).toBeGreaterThan(0);
    });
  }

  test("symptom IDs are unique", () => {
    const duplicates = findDuplicates(symptoms.map((symptom) => symptom?.id));
    expect(
      duplicates,
      `Duplicate symptom IDs: ${duplicates.join(", ")}`,
    ).toHaveLength(0);
  });

  test("anti-pattern IDs are unique", () => {
    const duplicates = findDuplicates(
      antiPatterns.map((antiPattern) => antiPattern?.id),
    );
    expect(
      duplicates,
      `Duplicate anti-pattern IDs: ${duplicates.join(", ")}`,
    ).toHaveLength(0);
  });

  test("health check area IDs are unique", () => {
    const duplicates = findDuplicates(healthcheck.map((area) => area?.id));
    expect(
      duplicates,
      `Duplicate health check area IDs: ${duplicates.join(", ")}`,
    ).toHaveLength(0);
  });

  test("health check statement IDs are unique", () => {
    const duplicates = findDuplicates(
      statements.map((statement) => statement.id),
    );
    expect(
      duplicates,
      `Duplicate health check statement IDs: ${duplicates.join(", ")}`,
    ).toHaveLength(0);
  });
});

test.describe("finder required fields", () => {
  test("every symptom has its required fields", () => {
    const fields = [
      "id",
      "title",
      "path",
      "category",
      "category_label",
      "impact",
      "anti_patterns",
    ];
    const bad = missingFields(symptoms, fields, "symptom");
    expect(bad, bad.join("\n")).toHaveLength(0);
  });

  test("every anti-pattern has id, title, and path", () => {
    const bad = missingFields(
      antiPatterns,
      ["id", "title", "path"],
      "anti-pattern",
    );
    expect(bad, bad.join("\n")).toHaveLength(0);
  });

  test("every health check area has id, title, description, and statements", () => {
    const bad = [
      ...missingFields(healthcheck, ["id", "title", "description"], "area"),
      ...healthcheck
        .filter((area) => asList(area?.statements).length === 0)
        .map((area) => `area "${area?.id}" has no statements`),
    ];
    expect(bad, bad.join("\n")).toHaveLength(0);
  });

  test("every health check statement has id, text, and anti_patterns", () => {
    const bad = missingFields(
      statements,
      ["id", "text", "anti_patterns"],
      "statement",
    );
    expect(bad, bad.join("\n")).toHaveLength(0);
  });

  test("every anti_patterns field is a list", () => {
    const bad = [
      ...nonListAntiPatterns(symptoms, "symptom"),
      ...nonListAntiPatterns(statements, "statement"),
    ];
    expect(bad, bad.join("\n")).toHaveLength(0);
  });
});

test.describe("finder anti-pattern references", () => {
  test("every symptom anti_patterns ID exists in finder-antipatterns.yaml", () => {
    const bad = unknownAntiPatternIds(symptoms, "symptom");
    expect(bad, `Unknown anti-pattern IDs:\n${bad.join("\n")}`).toHaveLength(0);
  });

  test("every health check anti_patterns ID exists in finder-antipatterns.yaml", () => {
    const bad = unknownAntiPatternIds(statements, "statement");
    expect(bad, `Unknown anti-pattern IDs:\n${bad.join("\n")}`).toHaveLength(0);
  });
});

test.describe("finder page paths", () => {
  test("every path starts with /", () => {
    const bad = linkedEntries()
      .filter(
        ({ entry }) =>
          !isBlank(entry?.path) &&
          !(typeof entry.path === "string" && entry.path.startsWith("/")),
      )
      .map(({ dataset, entry }) => `${dataset} "${entry.id}": "${entry.path}"`);
    expect(bad, `Paths not starting with /:\n${bad.join("\n")}`).toHaveLength(
      0,
    );
  });

  test("every path is a published page, not an alias", () => {
    const bad = linkedEntries()
      .filter(
        ({ entry }) =>
          !isBlank(entry?.path) &&
          !isPublishedPage(contentIndex, String(entry.path)),
      )
      .map(({ dataset, entry }) => `${dataset} "${entry.id}": "${entry.path}"`);
    expect(
      bad,
      `Paths with no published page:\n${bad.join("\n")}`,
    ).toHaveLength(0);
  });
});
