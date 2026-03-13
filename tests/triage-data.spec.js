/**
 * Data integrity tests for data/triage.yaml.
 *
 * These run without a browser - they validate the question/result graph
 * at build time so broken pointers never reach production.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_PATH = path.join(__dirname, '../data/triage.yaml');

let data;
let questions;
let results;
let questionIds;
let resultIds;

test.beforeAll(() => {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  data = yaml.load(raw);
  questions = data.questions || [];
  results = data.results || [];
  questionIds = new Set(questions.map(q => q.id));
  resultIds = new Set(results.map(r => r.id));
});

test.describe('triage.yaml structure', () => {
  test('file loads and has questions and results', () => {
    expect(Array.isArray(questions)).toBe(true);
    expect(Array.isArray(results)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
    expect(results.length).toBeGreaterThan(0);
  });

  test('entry point question "start" exists', () => {
    expect(questionIds.has('start')).toBe(true);
  });

  test('question IDs are unique', () => {
    const ids = questions.map(q => q.id);
    const unique = new Set(ids);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `Duplicate question IDs: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  test('result IDs are unique', () => {
    const ids = results.map(r => r.id);
    const unique = new Set(ids);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates, `Duplicate result IDs: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  test('question and result IDs do not overlap', () => {
    const overlap = [...questionIds].filter(id => resultIds.has(id));
    expect(overlap, `IDs used as both question and result: ${overlap.join(', ')}`).toHaveLength(0);
  });
});

test.describe('triage.yaml required fields', () => {
  test('every question has id, text, and options', () => {
    const missing = questions.filter(q => !q.id || !q.text || !Array.isArray(q.options) || q.options.length === 0);
    const ids = missing.map(q => q.id || '(no id)');
    expect(missing, `Questions missing required fields: ${ids.join(', ')}`).toHaveLength(0);
  });

  test('every question option has label and next', () => {
    const bad = [];
    for (const q of questions) {
      for (const opt of (q.options || [])) {
        if (!opt.label || !opt.next) {
          bad.push(`question "${q.id}" option "${opt.label || '(no label)'}"`)
        }
      }
    }
    expect(bad, `Options missing label or next:\n${bad.join('\n')}`).toHaveLength(0);
  });

  test('every result has id, title, reframe, and symptom_path', () => {
    const missing = results.filter(r => !r.id || !r.title || !r.reframe || !r.symptom_path);
    const ids = missing.map(r => r.id || '(no id)');
    expect(missing, `Results missing required fields: ${ids.join(', ')}`).toHaveLength(0);
  });

  test('symptom_path values start with /', () => {
    const bad = results.filter(r => r.symptom_path && !r.symptom_path.startsWith('/'));
    const ids = bad.map(r => `${r.id}: "${r.symptom_path}"`);
    expect(bad, `Results with relative symptom_path:\n${ids.join('\n')}`).toHaveLength(0);
  });
});

test.describe('triage.yaml graph connectivity', () => {
  test('all "next" pointers resolve to a known question or result', () => {
    const dangling = [];
    for (const q of questions) {
      for (const opt of (q.options || [])) {
        const next = opt.next;
        if (next.startsWith('result:')) {
          const rid = next.slice(7);
          if (!resultIds.has(rid)) {
            dangling.push(`question "${q.id}" → result "${rid}" (not found)`);
          }
        } else {
          if (!questionIds.has(next)) {
            dangling.push(`question "${q.id}" → question "${next}" (not found)`);
          }
        }
      }
    }
    expect(dangling, `Dangling pointers:\n${dangling.join('\n')}`).toHaveLength(0);
  });

  test('all questions are reachable from "start"', () => {
    const questionMap = Object.fromEntries(questions.map(q => [q.id, q]));
    const visited = new Set();

    function visit(id) {
      if (visited.has(id) || !questionMap[id]) return;
      visited.add(id);
      for (const opt of (questionMap[id].options || [])) {
        if (!opt.next.startsWith('result:')) {
          visit(opt.next);
        }
      }
    }

    visit('start');

    const unreachable = [...questionIds].filter(id => !visited.has(id));
    expect(unreachable, `Unreachable questions: ${unreachable.join(', ')}`).toHaveLength(0);
  });

  test('every terminal path ends at a result (no dead-end questions)', () => {
    const questionMap = Object.fromEntries(questions.map(q => [q.id, q]));
    const deadEnds = [];

    // A question is a dead end if all its options loop back to questions and
    // none of the reachable paths from it eventually hit a result.
    function leadsToResult(id, seen = new Set()) {
      if (seen.has(id)) return false; // cycle, no result found
      seen.add(id);
      const q = questionMap[id];
      if (!q) return false;
      return (q.options || []).some(opt => {
        if (opt.next.startsWith('result:')) return true;
        return leadsToResult(opt.next, new Set(seen));
      });
    }

    for (const q of questions) {
      if (!leadsToResult(q.id)) {
        deadEnds.push(q.id);
      }
    }

    expect(deadEnds, `Questions with no path to any result: ${deadEnds.join(', ')}`).toHaveLength(0);
  });

  test('also_see links in results have both path and label', () => {
    const bad = [];
    for (const r of results) {
      for (const link of (r.also_see || [])) {
        if (!link.path || !link.label) {
          bad.push(`result "${r.id}" also_see entry missing path or label`);
        }
      }
    }
    expect(bad, bad.join('\n')).toHaveLength(0);
  });
});
