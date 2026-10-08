# Plan: Apply documentation style rules to content

## Goal

Bring every page under `content/en/` in line with `.claude/skills/tech-writing-review/style-rules.md`. Each change is one small, independent PR.

## Ground rules for every PR

- One rule, one section. Do not mix rules in a PR. Do not touch files outside the batch.
- Exception: a PR that keeps a term or proper noun on purpose also adds it to the allowlist in `scripts/check-style.sh`.
- Do not change meaning. Leave front matter, shortcodes, code blocks, links, and quoted text alone.
- Skip `docs/changelog.md`, because entries are history.
- Before you open the PR, run `npm test`. Then scan the changed files for endashes, emdashes, and emojis.
- Add one changelog entry per phase, not per PR. Phases 1 and 2 are mechanical. A phase 3 PR gets an entry only if it rewrites a lot.
- Any PR can merge in any order within its phase. Step 0.1 must merge before phase 1. Steps 0.2 and 0.3 must merge before phase 2.

## Baseline (2026-10-07)

316 pages. Greppable violations:

| Rule | Files | Hits |
| --- | --- | --- |
| Headings with a capitalized word after the first (includes proper nouns) | 229 | ~2,200 of 3,455 headings |
| Contractions (all, before filtering to procedures and warnings) | 109 | 396 |
| Filler words (`please`, `simply`, `just`, `easy`, `obviously`) | 125 | 227 |
| Inflated words (`utilize`, `initiate`, `leverage`, `facilitate`, `in order to`) | 46 | 68 |
| `e.g.` / `i.e.` | 37 | 68 |
| "here" link text | 0 | 0 |

## Section batches

Use these batches in phases 1 to 3. Each batch has 40 files or fewer. The batches cover 315 pages; the 316th is `docs/changelog.md`, which is skipped.

| ID | Path under `content/en/docs/` | Files |
| --- | --- | --- |
| S1 | `symptoms/flow/` | 39 |
| S2 | `symptoms/deployment/` | 22 |
| S3 | `symptoms/testing/`, `symptoms/visibility/`, `symptoms/_index.md` | 23 |
| A1 | `anti-patterns/organizational-cultural/` | 31 |
| A2 | `anti-patterns/pipeline/`, `anti-patterns/testing/` | 23 |
| A3 | Other `anti-patterns/` folders and `_index.md` | 22 |
| F1 | `foundations/testing-fundamentals/` | 29 |
| F2 | Other `foundations/` | 13 |
| R1 | `reference/` | 40 |
| G1 | `agentic-cd/` | 28 |
| P1 | `assess/`, `pipeline/`, `optimize/`, `continuous-deployment/` | 27 |
| M1 | `brownfield/`, `greenfield/`, `playbook/`, `triage/`, root pages in `docs/` | 18 |

## Phase 0: prerequisites (3 PRs, independent of each other)

**0.1 Add a style check script.** Add `scripts/check-style.sh` and a `npm run style-check` script. The check reports the greppable rules from the baseline table and is advisory (exit 0). Each later PR uses it to find targets and confirm the count dropped. The script must:

- Skip `docs/changelog.md`.
- Ignore proper nouns and acronyms in headings, using an allowlist in the script (for example CD, CI, DORA, Kubernetes, Agentic CD).
- Ignore kept terms from steps 1b and 1c, using the same allowlist (for example "just-in-time", and "leverage" as a term of art).
- Report contractions for information only. A grep cannot tell prose from procedures, so contractions do not count toward done.

**0.2 Convert template headings to sentence case.** Update the heading text that pages must contain in `cd-anti-pattern-page`, `cd-symptom-page`, `cd-guide-page`, `cd-content-audit/SKILL.md`, and `cd-content-audit/page-templates.md`. For example, `## What This Looks Like` becomes `## What this looks like`. Without this change, the audit flags pages that phase 2 fixes.

**0.3 Make the audit accept either case during the change.** In `cd-content-audit`, match required headings without regard to case until phase 2 is complete. Remove this tolerance in step 2.13.

## Phase 1: mechanical word fixes (up to 48 PRs)

One PR per rule per batch. A reviewer reads each PR in a few minutes. Skip a rule/batch pair that has zero hits.

| Step | Rule | What to change |
| --- | --- | --- |
| 1a | `e.g.` / `i.e.` | Change to "for example" / "that is". Rewrite the sentence if the result reads badly. |
| 1b | Inflated words | Change to the plain word: "use", "start", "help", "to". Keep "leverage" only where it is a term of art. |
| 1c | Filler words | Delete or rewrite. Keep a word that does work, for example "just-in-time" or "easy to reverse" as a real contrast. |
| 1d | Contractions | Expand only in procedures (numbered steps) and warnings. Leave them in prose, where Zinsser's "humanity" principle applies. |

Example PR title: `style(S1): replace e.g. and i.e. in symptoms/flow`.

## Phase 2: sentence-case headings (13 PRs)

Steps 2.1 to 2.12 cover one batch each. Step 2.13 removes the audit tolerance from step 0.3 and the template-heading exception in `style-rules.md`.

- Keep proper nouns, acronyms, and product names capitalized: CD, CI, DORA, Kubernetes, Agentic CD.
- A change of case alone does not change the anchor, because Hugo generates lowercase heading IDs. If you change a heading's wording, search all of `content/` for `#old-anchor` links to the page and update them in the same PR. `npm test` catches missed anchors.
- Do not change heading levels or order.

## Phase 3: judgment rewrites (12 PRs, one per batch, split further if needed)

Run `/tech-writing-review rewrite` on the batch. Limit it to the `style-rules.md` rules that phases 1 and 2 do not cover: sentence and paragraph length, voice, precision, and consistent terms. `style-rules.md` holds the limits, so this plan does not repeat them.

If a batch diff is too big to review, split the PR by subfolder. Do not restructure sections. The `principles.md` structural work is out of scope.

## Done when

- `npm run style-check` reports zero for every counted rule, after its allowlist. Contractions are reported for information only.
- `cd-content-audit` passes with sentence-case headings and no case tolerance.
- `npm test` passes on `main`.

When all three are true, delete this plan in the final PR.
