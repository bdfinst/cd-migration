---
name: reference-organization
description: Review the reference section and suggest how to organize files for better sidebar menu discoverability
user_invocable: true
---

# Reference Section Organization Review

Role: worker. This skill analyzes reference section structure and
produces reorganization recommendations. It does not modify files.

Analyze the reference section's file structure, front matter weights, and grouping to identify navigation and discoverability problems in the sidebar menu. Produce specific reorganization recommendations.

## Constraints

1. **Read-only.** Do not modify files. Report findings and recommendations only.
2. **Be concise.** Output the report and recommendations. No preambles or per-file narration.
3. **Follow the output format.** Use the structured format below for every review.
4. **Implementable recommendations.** All recommendations must be achievable with front matter changes and file moves only.

## Instructions

1. **Accept an optional scope argument.** One of:
   - `audit` (default) - analyze current structure and recommend changes
   - `weight-map` - output a table of every page's weight, parent, and resulting menu position
   - `compare [proposal]` - compare the current structure against a proposed layout described in the argument
   If no argument is given, default to `audit`.

2. **Read the full reference section** to build a structural model:
   - Root index: `content/en/docs/reference/_index.md`
   - Every `_index.md` in subsections
   - Every leaf page
   - Extract from each file: `title`, `linkTitle`, `weight`, `description`, `draft` status

3. **Read sidebar configuration** from `hugo.toml` to understand Docsy sidebar behavior:
   - `sidebar_menu_compact` and `sidebar_menu_foldable` settings
   - How Docsy orders items: subsections and leaf pages sorted together by weight

4. **Run all checks** from the categories below.

5. **Report findings and recommendations** using the output format at the bottom.

## Context: How Docsy Sidebar Ordering Works

Docsy renders the sidebar by sorting all direct children of a section (both leaf pages and subsections) by their `weight` value. When two items share the same weight, the order is undefined. Subsections appear as expandable folders. Leaf pages appear as flat links. There is no visual distinction in weight between a leaf page and a subsection - they interleave based on weight.

This means:
- A subsection with `weight: 3` and a leaf page with `weight: 3` will collide
- Readers scanning the sidebar see a flat list of links and folders mixed together
- Grouping related items requires intentional weight ranges
- Section landing pages (`_index.md`) control the subsection's position and label

## Check Categories

### 1. Weight conflicts and ordering

Identify problems with how items sort in the sidebar.

- **Weight collisions:** Two or more siblings sharing the same weight under the same parent. These produce unpredictable ordering.
- **Weight gaps:** Large gaps between consecutive weights (e.g., 5 to 10) that waste numbering space and may indicate accidental drift.
- **Leaf-subsection interleaving:** Cases where leaf pages and subsections intermix in a way that makes the sidebar confusing. For example, if standalone pages appear both before and after a subsection folder.
- **Alphabetical assumption violations:** When items are weighted to sort non-alphabetically, check whether the chosen order has a clear rationale (e.g., conceptual progression, frequency of use).

### 2. Grouping and categorization

Evaluate whether related content is grouped logically.

- **Orphaned leaf pages:** Standalone pages at the section root that could belong in a subsection. Ask: would a reader expect to find this page inside one of the existing subsections?
- **Subsection coherence:** Does each subsection contain a coherent set of pages? Are there pages that seem out of place?
- **Missing subsections:** Are there 3+ standalone leaf pages that share a theme and would benefit from being grouped into a new subsection?
- **Subsection size balance:** Are subsections roughly balanced in size, or is one vastly larger than others?
- **Naming clarity:** Do subsection `linkTitle` values clearly communicate what the reader will find inside?

### 3. Sidebar scannability

Evaluate how easy it is to find content by scanning the collapsed sidebar.

- **First-level item count:** How many items appear when the reference section is expanded but subsections are collapsed? More than 7-9 items hurts scannability.
- **Label clarity:** Are `linkTitle` values short enough to display without truncation in a typical sidebar width (roughly 25 characters)?
- **Redundant prefixes:** Do multiple items share a prefix that adds no information (e.g., "CD Dependency Tree", "CD Practices" - the "CD" is implied by the site context)?
- **Action vs. reference naming:** Are pages named as lookup references (nouns: "Glossary", "Metrics") rather than tasks (verbs: "Measure Your Progress")? Reference sections should use noun-based naming.

### 4. Progressive disclosure

Evaluate whether the hierarchy helps readers drill down efficiently.

- **Landing page quality:** Do subsection `_index.md` pages provide a useful overview, or are they just lists of child pages?
- **Depth appropriateness:** Is the nesting depth right? One level of subsections under reference is standard. Two levels would need strong justification.
- **Cross-subsection navigation:** Can a reader in one subsection easily discover related pages in a sibling subsection? (e.g., a metric page linking to the practice it measures)

### 5. Audience alignment

Evaluate whether the organization serves how readers actually use reference material.

- **Lookup patterns:** Reference sections are primarily used for lookup, not sequential reading. Is the organization optimized for "I need to find X" rather than "I want to read everything"?
- **Entry from other sections:** When guide pages or anti-pattern pages link into the reference section, do those links land in a predictable location in the hierarchy?
- **Completeness signals:** Can a reader tell at a glance what the reference section covers? Does the top-level structure communicate scope?

## Output Format

```
# Reference Section Organization Review

## Current Structure

[Tree diagram showing current sidebar order with weights]

## Findings

### 1. Weight Conflicts and Ordering
**Status: [Clean | Has Issues]**
- [Finding with specific file and weight values]
**Impact:** [How this affects the reader's experience]

### 2. Grouping and Categorization
**Status: [Clean | Has Issues]**
- [Finding with specific files]
**Impact:** [How this affects the reader's experience]

### 3. Sidebar Scannability
**Status: [Clean | Has Issues]**
- [Finding]
**Impact:** [How this affects the reader's experience]

### 4. Progressive Disclosure
**Status: [Clean | Has Issues]**
- [Finding]
**Impact:** [How this affects the reader's experience]

### 5. Audience Alignment
**Status: [Clean | Has Issues]**
- [Finding]
**Impact:** [How this affects the reader's experience]

## Recommended Reorganization

### Option A: [Name]
[Description of the approach]

```
Reference (weight: 9)
├── [item] (weight: N)
├── [item] (weight: N)
...
```

**Pros:** [list]
**Cons:** [list]

### Option B: [Name] (if applicable)
[Same format]

## Implementation Steps

- [ ] [Specific file change: path, field, old value -> new value]
- [ ] [Specific file change]
...

## Weight Map (if requested)

| File | Current Weight | Parent | Sidebar Position | Proposed Weight |
|------|---------------|--------|-----------------|-----------------|
| ...  | ...           | ...    | ...             | ...             |
```

## Notes

- This skill is read-only. It does not modify files.
- Recommendations must be implementable with front matter changes and file moves only - no Hugo template changes.
- Respect the site's content style rules: no endashes, no emdashes, no emojis.
- When recommending new subsections, specify the `_index.md` front matter needed.
- Consider that the sidebar is the primary navigation mechanism - the sidebar IS the menu.
- Account for `sidebar_menu_compact: true` behavior: subsections are collapsed by default, so top-level labels must be self-explanatory.
