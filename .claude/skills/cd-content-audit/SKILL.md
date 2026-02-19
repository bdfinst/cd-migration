---
name: cd-content-audit
description: Validate structure, voice, front matter, and cross-references for CD migration site content pages
user_invocable: true
---

# CD Content Audit

Validate content pages for structural compliance, front matter correctness, tone and voice, cross-references, and terminology consistency.

## Instructions

1. **Accept file paths or globs as arguments.** If no arguments are given, ask which files to audit.
2. **Read `page-templates.md`** in this skill directory for canonical values and page structures.
3. **Detect page type** from the file path (anti-pattern, symptom, or guide). If the file does not match a known page type, report it and skip.
4. **For each file, run all checks** described below.
5. **Report findings** grouped by file, then by check category. Use severity levels: `ERROR` (must fix), `WARNING` (should fix), `INFO` (awareness only).

## Check Categories

### 1. Structure compliance

Compare the file's heading structure against the required template for its page type.

**Anti-pattern pages:**
- `## What This Looks Like` exists
- `## Why This Is a Problem` exists with required H3 subsections in order:
  - `### It reduces quality`
  - `### It increases rework`
  - `### It makes delivery timelines unpredictable`
  - Zero or more optional H3 subsections
  - `### Impact on continuous delivery` (must be last H3 under this H2)
- `## How to Fix It` exists with at least one `### Step N:` subsection containing a week number
- `## Measuring Progress` exists and contains a table
- `## Related Content` exists and contains at least one link
- `{{% pageinfo %}}` block exists after front matter

**Symptom pages:**
- `## What you are seeing` exists (note lowercase)
- `## Common causes` exists with 2-5 H3 subsections
- Each H3 under "Common causes" ends with `**Read more:**` followed by a link
- `## How to narrow it down` exists with a numbered list

**Guide pages:**
- `{{% pageinfo %}}` block exists with phase indicator
- At least 3 H2 sections exist

**Severity:** Missing required sections are `ERROR`. Missing optional elements are `WARNING`.

### 2. Front matter validation

**Anti-pattern pages:**
- `title`: required, non-empty - `ERROR` if missing
- `linkTitle`: required, non-empty - `ERROR` if missing
- `weight`: required, positive integer - `ERROR` if missing
- `category`: required, must be one of 7 canonical values - `ERROR` if missing or invalid
- `risk_level`: required, must be one of `critical`, `high`, `medium`, `low` - `ERROR` if missing or invalid
- `description`: required, under 160 characters - `ERROR` if missing, `WARNING` if over 160 chars
- `tags`: required, array, each from allowed vocabulary of 11 tags - `ERROR` if missing, `WARNING` if tag not in vocabulary

**Symptom pages:**
- `title`: required - `ERROR` if missing
- `linkTitle`: required - `ERROR` if missing
- `description`: required, under 160 characters - `ERROR` if missing, `WARNING` if over 160 chars
- `tags`: required, array, each from allowed vocabulary - `ERROR` if missing, `WARNING` if tag not in vocabulary
- Should NOT have `category` or `risk_level` - `WARNING` if present

**Guide pages:**
- `title`: required - `ERROR` if missing
- `linkTitle`: required - `ERROR` if missing
- `weight`: required - `ERROR` if missing
- `description`: required, under 160 characters - `ERROR` if missing, `WARNING` if over 160 chars
- Should NOT have `category`, `risk_level`, or `tags` - `WARNING` if present

### 3. Cross-references

- **Relative links** - For each relative link in the body, check that the target file exists. Severity: `ERROR` if target does not exist.
- **"Read more" links** (symptom pages) - Verify they point to files under `anti-patterns/`. Severity: `ERROR` if pointing elsewhere.
- **"Related Content" links** (anti-pattern pages) - Verify they point to guide pages under `migrate-to-cd/` or `reference/`. Severity: `WARNING` if pointing to other anti-pattern or symptom pages (these are not wrong but may indicate a missed guide link).
- **Under-construction links** - Flag any link to `under-construction/`. Severity: `INFO` (these are intentional drafts, just surface them).
- **External links** - Do not validate external URLs, just note their presence. Severity: none.

### 4. Terminology consistency

Scan for inconsistent usage within each file:

- **"continuous delivery" vs "CD"** - Both are fine, but "Continuous Delivery" (capitalized) mid-sentence is wrong. Only capitalize at the start of a sentence or in a heading. Severity: `WARNING`
- **"trunk" vs "main branch"** - Flag if both terms appear in the same file without explanation. Severity: `INFO`
- **Endash and emdash** - Flag any `\u2013` (endash) or `\u2014` (emdash) characters. Severity: `ERROR`
- **Emoji** - Flag any emoji characters. Severity: `ERROR`

## Output Format

For each file, report:

```
## [file path]

Page type: [anti-pattern | symptom | guide]

### Errors (N)
- [CHECK_CATEGORY] description of issue (line N)

### Warnings (N)
- [CHECK_CATEGORY] description of issue (line N)

### Info (N)
- [CHECK_CATEGORY] description of issue (line N)

---
```

If a file has no findings at any severity level, report:

```
## [file path]

Page type: [type]
No issues found.
```

At the end, report a summary:

```
## Summary

Files audited: N
Errors: N (across N files)
Warnings: N (across N files)
Info: N (across N files)
```

## Notes

- Do NOT modify files. This skill is read-only.
- When auditing multiple files, process them in alphabetical order.
- For glob patterns, expand them and process each matching file.
- Skip `_index.md` files, `triage.md`, and `for-*.md` files (these have different structures).
- Line numbers in reports should reference the actual file line numbers.
- For tone and writing quality issues beyond endash/emdash/emoji, use `/tech-writing-review` - that skill handles passive voice, hedging, paragraph length, and reader experience.
