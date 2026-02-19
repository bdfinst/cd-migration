---
name: glossary-link
description: Review content files for unlinked glossary terms and add links to the glossary
user_invocable: true
---

# Glossary Link Review Agent

Scan content files for uses of defined glossary terms that are not yet linked to the glossary,
and add links to the first occurrence of each term in each file.

## Glossary File Location

`content/en/docs/glossary.md`

## Instructions

### 1. Extract all glossary terms

Read `content/en/docs/glossary.md`. For each `### Heading` entry, record:

- **Display name**: the heading text exactly as written (e.g., `Full-Stack Product Team`)
- **Anchor**: Hugo's auto-anchor format - lowercase, spaces replaced with hyphens, special
  characters stripped (e.g., `full-stack-product-team`)
- **Alternate forms**: variations to match in content. For each term, generate:
  - Exact heading text: `Full-Stack Product Team`
  - Lowercase: `full-stack product team`
  - Acronym if the heading contains one in parens, e.g., `BDD` from `BDD (Behavior-Driven Development)`

Example term table:

| Heading | Anchor | Match forms |
|---------|--------|-------------|
| `ACD (Agentic Continuous Delivery)` | `acd-agentic-continuous-delivery` | `ACD`, `agentic continuous delivery`, `Agentic Continuous Delivery` |
| `Feature Team` | `feature-team` | `feature team`, `feature teams`, `Feature Team`, `Feature Teams` |
| `Full-Stack Product Team` | `full-stack-product-team` | `full-stack product team`, `full-stack product teams`, `Full-Stack Product Team` |
| `TBD (Trunk-Based Development)` | `tbd-trunk-based-development` | `TBD`, `trunk-based development`, `Trunk-Based Development` |

For plural forms: if the term ends in a word that pluralizes with `s`, also match the plural.

### 2. Calculate the relative path to the glossary

The glossary is at `content/en/docs/glossary.md`. For a content file at path P, count the
number of directory segments between P and `content/en/docs/`:

- `content/en/docs/agentic-cd/small-batch-sessions.md` → 1 level deep → `../glossary/`
- `content/en/docs/anti-patterns/team-workflow/horizontal-slicing.md` → 2 levels deep → `../../glossary/`
- `content/en/docs/migrate-to-cd/migration-path/foundations/work-decomposition.md` → 3 levels deep → `../../../glossary/`

The full link format: `[term text](RELATIVE_PATH#anchor)`

### 3. Read each content file

Accept file paths as arguments. If no arguments given, ask which files to process.

For each file:

1. Read the full contents.
2. Identify **skip zones** where terms must not be linked:
   - YAML front matter (between opening and closing `---`)
   - Fenced code blocks (between triple backtick lines)
   - Inline code (between single backticks)
   - Mermaid diagrams
   - Existing markdown links: `[...](...)`  - do not re-link text that is already a link
   - Heading lines (lines starting with `#`)
   - The "Related Content" section and any section that is already a list of links

### 4. Find unlinked term occurrences

For each glossary term, scan the non-skip-zone text for matches (case-insensitive for most
terms, exact case for acronyms like `ACD`, `CI`, `CD`, `TBD`, `BDD`, `ATDD`, `DORA`).

Track per-file state: once a term is linked on a page, do not link it again on that page.
Link only the **first occurrence** of each term in each file.

**Do not link a term** if:
- It is already part of a markdown link: `[...glossary/#term...]` or `[term](any-path)`
- It appears in a heading
- It appears in front matter
- It appears in a code block
- The match is a substring of a longer word (e.g., do not match `CI` inside `CI/CD pipeline`
  unless `CI/CD` is not itself a glossary term; do not match `CD` in `CDN`)

### 5. Apply links

For each first unlinked occurrence found, replace the matched text with a markdown link:

```
[matched text](../glossary/#anchor)
```

Preserve the original capitalization of the matched text - use it as the link label.

Example: if the file contains `trunk-based development` and the glossary term is
`TBD (Trunk-Based Development)`, replace with `[trunk-based development](../glossary/#tbd-trunk-based-development)`.

### 6. Report changes

After processing each file, report:

```
## [file path]

Linked N terms:
- Line X: "original text" → "[original text](path#anchor)"
- ...

Already linked (skipped):
- term1, term2, ...

No match found:
- term1, term2, ...
```

If no changes were made: `No unlinked glossary terms found in [file].`

## Priority Terms

When processing a file, prioritize linking these terms first (they have the most cross-page
value):

1. `CD` / `continuous delivery`
2. `CI` / `continuous integration`
3. `TBD` / `trunk-based development`
4. `BDD` / `behavior-driven development`
5. `ATDD`
6. `ACD` / `agentic continuous delivery`
7. `Feature Team` / `feature teams`
8. `Full-Stack Product Team`
9. `Subdomain Product Team`
10. `Batch Size`
11. `Feature Flag`
12. `DORA`
13. `Black Box Testing`
14. `Vertical Slice` (if added to glossary)

## Special Cases

### Acronyms defined in parentheses
If a term heading is `BDD (Behavior-Driven Development)`, match both `BDD` and
`behavior-driven development` (and `Behavior-Driven Development`). When linking a standalone
`BDD` usage, use `[BDD](path#bdd-behavior-driven-development)`.

### "CD" ambiguity
Match `CD` only when it clearly means continuous delivery - i.e., when it appears in a
delivery/pipeline context. Do not match `CD` in phrases like `CD player`, `CD-ROM`, or
`/cd ` (shell command).

### Terms that are substrings of other terms
If `CI` is a glossary term and `CI/CD` is also a glossary term, prefer linking the longer
term `CI/CD` if both are defined. If only `CI` is defined, link `CI` even within `CI/CD`.

## Validation After Applying Links

After editing, verify:
- No endash or emdash characters introduced
- No broken markdown link syntax (unclosed brackets, etc.)
- All inserted links use the correct relative path for the file's depth
- The file is otherwise unchanged (no whitespace added, no lines reordered)

## After Running This Skill

Run `/glossary` on any files you modified. This skill adds links to content files; the glossary skill updates the "Referenced in" index blocks in the glossary itself. The two skills do not automatically coordinate - both steps are needed for the glossary to stay accurate.
