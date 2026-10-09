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

let symptoms;
let antiPatterns;
let healthcheck;
let statements;
let antiPatternIds;
let contentIndex;

test.beforeAll(() => {
  symptoms = loadDataFile(DATA_FILES.symptoms);
  antiPatterns = loadDataFile(DATA_FILES.antiPatterns);
  healthcheck = loadDataFile(DATA_FILES.healthcheck);
  statements = (Array.isArray(healthcheck) ? healthcheck : []).flatMap((area) =>
    (area.statements || []).map((statement) => ({
      ...statement,
      area: area.id,
    })),
  );
  antiPatternIds = new Set(
    (antiPatterns || []).map((antiPattern) => antiPattern.id),
  );
  contentIndex = buildContentIndex();
});

function missingFields(entries, fields, label) {
  return entries
    .filter((entry) =>
      fields.some((field) => entry[field] === undefined || entry[field] === ""),
    )
    .map(
      (entry) =>
        `${label} "${entry.id || "(no id)"}" missing one of: ${fields.join(", ")}`,
    );
}

function unknownAntiPatternIds(entries, label) {
  return entries.flatMap((entry) =>
    (entry.anti_patterns || [])
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
  for (const [key, name] of Object.entries(DATA_FILES)) {
    test(`${name} loads as a non-empty list`, () => {
      const list = { symptoms, antiPatterns, healthcheck }[key];
      expect(Array.isArray(list), `${name} is not a list`).toBe(true);
      expect(list.length, `${name} is empty`).toBeGreaterThan(0);
    });
  }

  test("symptom IDs are unique", () => {
    const dupes = findDuplicates(symptoms.map((symptom) => symptom.id));
    expect(dupes, `Duplicate symptom IDs: ${dupes.join(", ")}`).toHaveLength(0);
  });

  test("anti-pattern IDs are unique", () => {
    const dupes = findDuplicates(
      antiPatterns.map((antiPattern) => antiPattern.id),
    );
    expect(
      dupes,
      `Duplicate anti-pattern IDs: ${dupes.join(", ")}`,
    ).toHaveLength(0);
  });

  test("health check area IDs are unique", () => {
    const dupes = findDuplicates(healthcheck.map((area) => area.id));
    expect(
      dupes,
      `Duplicate health check area IDs: ${dupes.join(", ")}`,
    ).toHaveLength(0);
  });

  test("health check statement IDs are unique within each area", () => {
    const dupes = findDuplicates(
      statements.map((statement) => `${statement.area}/${statement.id}`),
    );
    expect(
      dupes,
      `Duplicate health check statement IDs: ${dupes.join(", ")}`,
    ).toHaveLength(0);
  });
});

test.describe("finder required fields", () => {
  test("every symptom has the fields the selector reads", () => {
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
        .filter(
          (area) =>
            !Array.isArray(area.statements) || area.statements.length === 0,
        )
        .map((area) => `area "${area.id}" has no statements`),
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
      .filter(({ entry }) => entry.path && !entry.path.startsWith("/"))
      .map(({ dataset, entry }) => `${dataset} "${entry.id}": "${entry.path}"`);
    expect(bad, `Paths not starting with /:\n${bad.join("\n")}`).toHaveLength(
      0,
    );
  });

  test("every path is a published page, not an alias", () => {
    const bad = linkedEntries()
      .filter(
        ({ entry }) => entry.path && !isPublishedPage(contentIndex, entry.path),
      )
      .map(({ dataset, entry }) => `${dataset} "${entry.id}": "${entry.path}"`);
    expect(
      bad,
      `Paths with no published page:\n${bad.join("\n")}`,
    ).toHaveLength(0);
  });
});
