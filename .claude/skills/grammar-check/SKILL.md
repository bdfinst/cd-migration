---
name: grammar-check
description: Scan content files for prohibited punctuation (hyphens as dashes, endashes, emdashes) and rewrite using preferred alternatives
user_invocable: true
---

# Grammar and Punctuation Check

Role: implementation. This skill modifies content files to fix
prohibited dash punctuation.

Scan content files for prohibited dash-like punctuation and rewrite sentences to use preferred grammar marks instead.

## Constraints

1. **Minimal changes.** Only rewrite sentences containing prohibited punctuation. Do not reformat or improve surrounding content.
2. **Be concise.** Output the change summary. No preambles.
3. **Preserve meaning.** Rewrites must preserve the original meaning of every sentence.
4. **Validate after changes.** Re-scan the file after edits to confirm no violations remain.

## Prohibited Characters

These characters must NEVER appear as grammatical punctuation in content files:

| Character | Name | Example of violation |
|-----------|------|---------------------|
| `-` | Hyphen used as a dash | `The team ships - when ready` |
| `--` | Double hyphen | `The team ships -- when ready` |
| `–` | Endash (U+2013) | `The team ships – when ready` |
| `—` | Emdash (U+2014) | `The team ships — when ready` |

**Hyphens are allowed** in these non-dash contexts:
- Compound modifiers before a noun: `domain-aligned teams`, `well-defined APIs`, `cross-team coordination`
- Prefixed words: `re-examine`, `pre-commit`
- Technical terms and slugs: `trunk-based-development`, `risk_level: high`
- YAML front matter values
- Mermaid diagram syntax
- Code blocks and inline code
- List item markers at the start of a line (`- item`)

## Preferred Alternatives

When you find a dash used as grammatical punctuation, rewrite using one of these:

### 1. Split into two sentences (preferred for most cases)
- Before: `CI requires daily integration - without it, branches diverge`
- After: `CI requires daily integration. Without it, branches diverge.`

### 2. Use a colon for elaboration or lists
- Before: `The result is predictable - slower delivery`
- After: `The result is predictable: slower delivery`

### 3. Use parentheses for asides
- Before: `The team - all five members - agreed`
- After: `The team (all five members) agreed`

### 4. Use a comma for light pauses
- Before: `The pipeline runs - then stops`
- After: `The pipeline runs, then stops`

### 5. Restructure the sentence
- Before: `Architecture decoupling - through APIs and contracts - enables independent deployment`
- After: `Architecture decoupling through APIs and contracts enables independent deployment`

## Instructions

When this skill is invoked:

1. **Accept file paths as arguments.** If no arguments are given, ask which files to check.
2. **Read each file.**
3. **Skip** YAML front matter, code blocks (fenced with triple backticks), inline code (backticks), Mermaid diagrams, and list markers.
4. **Find every instance** of a hyphen, double hyphen, endash, or emdash used as grammatical punctuation (surrounded by spaces, or at sentence boundaries).
5. **Rewrite each violation** using one of the preferred alternatives above. Choose the alternative that best preserves the original meaning and reads most naturally.
6. **Apply the edits** to the file.
7. **Report** what was changed: line number, original text, replacement text.

## Pattern Matching

To distinguish dash-as-punctuation from legitimate hyphens:

- ` - ` (space-hyphen-space) in running text is almost always a dash. Exception: list continuation lines where ` - ` starts a sub-item.
- ` -- ` (space-double-hyphen-space) is always a dash.
- `–` and `—` are always prohibited regardless of context.
- Hyphens between words with no spaces (`domain-aligned`, `re-examine`) are compound modifiers and are allowed.
- Hyphens at the start of a line followed by a space are list markers and are allowed.

## Output

After fixing all violations, report a summary:
```
Fixed N violations in [file]:
- Line X: "original text" -> "replacement text"
```

If no violations are found, report: `No dash punctuation violations found in [file].`
