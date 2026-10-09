/**
 * Data integrity tests for the finder data files:
 * data/finder-symptoms.yaml, data/finder-antipatterns.yaml, and
 * data/finder-healthcheck.yaml.
 *
 * These run without a browser. The finder shortcodes look up anti-pattern IDs
 * at build time, so a mistyped ID or path would otherwise ship silently.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { pageExists } = require('./helpers/content-pages');

function load(name) {
  return yaml.load(fs.readFileSync(path.join(__dirname, '../data', name), 'utf8')) || [];
}

function duplicates(ids) {
  return ids.filter((id, i) => ids.indexOf(id) !== i);
}

let symptoms;
let antiPatterns;
let healthcheck;
let statements;
let antiPatternIds;

test.beforeAll(() => {
  symptoms = load('finder-symptoms.yaml');
  antiPatterns = load('finder-antipatterns.yaml');
  healthcheck = load('finder-healthcheck.yaml');
  statements = healthcheck.flatMap(c => (c.statements || []).map(s => ({ ...s, category: c.id })));
  antiPatternIds = new Set(antiPatterns.map(a => a.id));
});

test.describe('finder data structure', () => {
  test('files load and are non-empty lists', () => {
    for (const list of [symptoms, antiPatterns, healthcheck]) {
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    }
  });

  test('symptom IDs are unique', () => {
    const dupes = duplicates(symptoms.map(s => s.id));
    expect(dupes, `Duplicate symptom IDs: ${dupes.join(', ')}`).toHaveLength(0);
  });

  test('anti-pattern IDs are unique', () => {
    const dupes = duplicates(antiPatterns.map(a => a.id));
    expect(dupes, `Duplicate anti-pattern IDs: ${dupes.join(', ')}`).toHaveLength(0);
  });

  test('health check category IDs are unique', () => {
    const dupes = duplicates(healthcheck.map(c => c.id));
    expect(dupes, `Duplicate health check category IDs: ${dupes.join(', ')}`).toHaveLength(0);
  });

  test('health check statement IDs are unique', () => {
    const dupes = duplicates(statements.map(s => s.id));
    expect(dupes, `Duplicate health check statement IDs: ${dupes.join(', ')}`).toHaveLength(0);
  });
});

test.describe('finder anti-pattern references', () => {
  test('every symptom anti_patterns ID exists in finder-antipatterns.yaml', () => {
    const bad = [];
    for (const s of symptoms) {
      for (const id of (s.anti_patterns || [])) {
        if (!antiPatternIds.has(id)) bad.push(`symptom "${s.id}" -> "${id}"`);
      }
    }
    expect(bad, `Unknown anti-pattern IDs:\n${bad.join('\n')}`).toHaveLength(0);
  });

  test('every health check anti_patterns ID exists in finder-antipatterns.yaml', () => {
    const bad = [];
    for (const s of statements) {
      for (const id of (s.anti_patterns || [])) {
        if (!antiPatternIds.has(id)) bad.push(`statement "${s.category}/${s.id}" -> "${id}"`);
      }
    }
    expect(bad, `Unknown anti-pattern IDs:\n${bad.join('\n')}`).toHaveLength(0);
  });
});

test.describe('finder page paths', () => {
  test('every path starts with / and resolves to a page', () => {
    const bad = [];
    for (const [file, list] of [['symptoms', symptoms], ['antipatterns', antiPatterns]]) {
      for (const entry of list) {
        if (!entry.path || !entry.path.startsWith('/')) {
          bad.push(`${file} "${entry.id}": path "${entry.path}" does not start with /`);
        } else if (!pageExists(entry.path)) {
          bad.push(`${file} "${entry.id}": no page for "${entry.path}"`);
        }
      }
    }
    expect(bad, bad.join('\n')).toHaveLength(0);
  });
});
