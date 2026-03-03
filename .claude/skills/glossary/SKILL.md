---
name: glossary
description: Add or update glossary entries and keep "Referenced in" index links current across all glossary items
user_invocable: true
---

# Glossary Manager

Role: implementation. This skill modifies the glossary file to keep
entries and "Referenced in" links accurate.

Maintain the glossary at `content/en/docs/glossary.md` and keep its "Referenced in" index links accurate.

## Constraints

1. **Minimal changes.** Only update "Referenced in" lines, add requested entries, and fix ordering. Do not rewrite existing definitions.
2. **Be concise.** Output a summary of changes made. No preambles.
3. **Validate after changes.** Run all validation checks in step 5 before considering the work complete.

## Arguments

Accept one of:
- No argument: audit and update all "Referenced in" lines
- `add [term]`: add a new glossary entry
- File paths: update "Referenced in" for terms referenced in those files

## When to Run

- After adding or removing a link to a glossary anchor (e.g., `glossary/#some-term`) in any content file.
- After adding a new glossary entry.
- When the user invokes `/glossary` to audit or update the glossary index.

## Instructions

### 1. Identify all glossary anchors in use

Search every content file under `content/en/` for links that target the glossary:

```
pattern: glossary/#[\w-]+
```

Collect each unique anchor and the file(s) that reference it.

### 2. Build the expected "Referenced in" block for each entry

For each glossary term that is referenced by at least one content page, build a line:

```
Referenced in: [Page Title](relative-link), [Page Title](relative-link)
```

- Use the page's `title` from front matter for the link text.
- Use a relative path from the glossary file to the referencing page.
- Sort references alphabetically by page title.
- If a glossary term has zero references from content pages, remove any existing "Referenced in" line.

### 3. Update the glossary file

For each glossary entry:

- If the entry already has a "Referenced in" line, replace it with the freshly built one.
- If the entry needs one but does not have it, add it as the last line of the entry (before the next `###` heading or `## ` section heading).
- If the entry has a "Referenced in" line but no content pages reference it, remove the line.

### 4. Add new glossary entries (when requested)

When the user asks to add a new term:

1. Place it in the correct alphabetical position under the right letter heading.
2. If the letter heading does not exist, create it (e.g., `## X`).
3. Write a concise definition (2-4 sentences).
4. Include a "See [relevant page]" link if a dedicated reference page exists.
5. Search content files for any existing references to the term and add the "Referenced in" line.

### 5. Validate

- No endashes or emdashes in the glossary file.
- No emojis.
- All relative links resolve to existing files (spot-check at minimum).
- Entries are in alphabetical order within their letter section.

## Output Format

After processing, report:

```
## Glossary Update Summary

Updated N "Referenced in" lines:
- [term]: added [page title], removed [page title]

Added N new entries:
- [term]

No changes needed for N entries.
```

## Glossary File Location

`content/en/docs/glossary.md`

## Content Directory

`content/en/`

## Link Pattern to Search

References to glossary entries use this pattern in content files:

```
glossary/#term-slug
```

where `term-slug` is the lowercase, hyphenated version of the heading (Hugo's auto-anchor behavior).
