---
name: cd-discoverability
description: Audit and improve the CD migration site for discoverability, self-guided learning, and audience-appropriate navigation for developers and managers
user_invocable: true
---

# CD Discoverability and Self-Guided Learning Audit

Role: worker. This skill audits site discoverability and produces
recommendations. It does not modify files.

Analyze the CD migration site and recommend improvements that make it easier for developers and managers to find relevant content, follow a learning path, and use the site as educational material for their teams.

## Constraints

1. **Read-only.** Do not modify files. Report findings and recommendations only.
2. **Be concise.** Focus on actionable findings. No preambles or restating what was checked.
3. **Follow the output format.** Use the structured format below for every audit.
4. **Delegate out-of-scope concerns.** Do not check structural compliance (`cd-content-audit`) or writing quality (`tech-writing-review`).

## Instructions

1. **Accept a scope as argument.** One of:
   - `full` - audit the entire site
   - `section [path]` - audit a specific section (e.g., `section anti-patterns`)
   - `page [path]` - audit a specific page for discoverability
   - `audience [developer|manager]` - audit from a specific audience perspective
   - `learning-path [topic]` - trace and evaluate a learning path through the site
   If no argument is given, default to `full`.

2. **Read the site structure** to understand what exists:
   - Home page: `content/en/_index.html`
   - Docs landing: `content/en/docs/_index.md`
   - Symptom pages: `content/en/docs/symptoms/` (4 subdirectories: testing, deployment, flow, visibility)
   - Anti-pattern pages: `content/en/docs/anti-patterns/` (7 subdirectories)
   - Guide pages: `content/en/docs/migrate-to-cd/`
   - Reference: `content/en/docs/reference/`
   - Triage page: `content/en/docs/symptoms/triage.md`
   - For Developers: `content/en/docs/symptoms/for-developers.md`
   - For Managers: `content/en/docs/symptoms/for-managers.md`
   - AI Adoption Roadmap: `content/en/docs/ai-adoption-roadmap.md`
   - Defect Detection: `content/en/docs/defect-sources.md`
   - FAQ: `content/en/docs/faq.md`

3. **Run all applicable checks** from the categories below.

4. **Report findings and recommendations** using the output format at the bottom.

## Audience Model

The site serves two primary audiences with different entry patterns:

### Developers
- **Entry point:** A specific pain point ("my tests are flaky", "merges are painful")
- **Reading pattern:** Symptom -> root cause anti-pattern -> fix steps -> related guide page
- **Success metric:** Can they get from "I have this problem" to "here's what to do Monday morning" in under 3 clicks?
- **Vocabulary:** Technical terms, tool names, code examples, CLI commands
- **Trust signal:** Specific, concrete, experience-backed advice with no hand-waving

### Managers
- **Entry point:** A business outcome ("we can't release faster", "quality is unpredictable")
- **Reading pattern:** For Managers page -> relevant symptoms -> anti-patterns with metrics -> migration phases
- **Success metric:** Can they build a case for change? Can they understand what the team needs without deep technical knowledge?
- **Vocabulary:** Metrics, business impact, risk, timelines, team dynamics
- **Trust signal:** Data, DORA research references, before/after comparisons

## Check Categories

### 1. Entry point accessibility

Evaluate how easily each audience finds their starting point.

- **Home page clarity:** Does the home page clearly route developers and managers to their respective entry points?
- **Triage effectiveness:** Does the triage page ask the right questions to route to the right content?
- **"For Developers" page:** Does it cover the most common developer pain points? Does each point link to deeper content?
- **"For Managers" page:** Does it frame problems in business terms? Does it link to metrics and evidence?
- **Search/browse:** Can a user who knows their problem name find it through sidebar navigation without knowing the site taxonomy?

### 2. Cross-linking density

Evaluate whether pages link to all relevant related content.

- **Symptom -> Anti-pattern links:** Every symptom page should link to the anti-pattern(s) that cause it
- **Anti-pattern -> Guide links:** Every anti-pattern page should link to the guide page(s) that fix it
- **Guide -> Metric links:** Guide pages should link to metrics that measure success
- **Bidirectional linking:** If page A links to page B, does page B link back to page A?
- **Orphan pages:** Pages with no inbound links from other content pages
- **Dead-end pages:** Pages with no outbound links to next steps

### 3. Learning path continuity

Evaluate whether a reader can follow a coherent path through the site.

- **Problem-to-solution path:** Symptom -> Anti-pattern -> Guide -> Metrics. Is every path complete, or are there gaps?
- **Phase progression:** Within the migration path, does each page clearly point to the next step?
- **"What to read next" signals:** Does every page end with a clear next action? (Related Content section, "Next Step" link, or similar)
- **Circular paths:** Are there loops where content references itself without providing new information?
- **Prerequisite clarity:** When a guide page depends on another practice being in place, is that stated and linked?

### 4. Self-guided learning features

Evaluate features that help readers learn independently.

- **Progressive disclosure:** Can readers start with a summary and drill deeper? (overview pages -> detail pages)
- **Glossary integration:** Are technical terms linked to glossary definitions where they first appear?
- **"How to use this section" guidance:** Do section landing pages explain what's in the section and how to navigate it?
- **Reading time signals:** Are reading time estimates present on content pages?
- **Difficulty signals:** Is it clear which content is introductory vs. advanced?
- **Checklists and actionable steps:** Do guide pages include concrete "do this Monday morning" steps?

### 5. Educational packaging

Evaluate how well the site works as training or workshop material.

- **Standalone sections:** Can a team lead pull out a section (e.g., "Testing") and use it as a workshop module?
- **Assessment integration:** Does the Assess phase content work as a self-assessment tool?
- **Before/after framing:** Do anti-pattern pages clearly show what "before" and "after" look like?
- **Metric-driven progress:** Can teams track their improvement using the metrics the site defines?
- **Team discussion prompts:** Do pages include questions or exercises teams can use in retrospectives?
- **Print-friendliness:** Does the print layout work for offline workshops?

### 6. SEO and LLM discoverability

Evaluate technical discoverability for search engines and AI assistants.

- **Description quality:** Are front matter descriptions under 160 characters and meaningful for search?
- **Title specificity:** Do page titles include the problem or practice name (not generic titles)?
- **Tag coverage:** Are tags applied consistently across symptom and anti-pattern pages?
- **llms.txt coverage:** Will the auto-generated llms.txt include all important pages?
- **Heading hierarchy:** Are H2/H3 headings descriptive enough to serve as search snippets?
- **Internal link anchor text:** Are link texts descriptive (not "click here" or "read more")?

## Output Format

```
# Discoverability Audit: [scope]

## Executive Summary
[2-3 sentences on the overall state of discoverability]

## Findings by Category

### 1. Entry Point Accessibility
**Score: [Strong | Adequate | Needs Work]**
- [Finding with specific page reference]
- [Finding with specific page reference]
**Recommendations:**
- [ ] [Specific actionable recommendation]
- [ ] [Specific actionable recommendation]

### 2. Cross-Linking Density
**Score: [Strong | Adequate | Needs Work]**
[Same format]

### 3. Learning Path Continuity
**Score: [Strong | Adequate | Needs Work]**
[Same format]

### 4. Self-Guided Learning Features
**Score: [Strong | Adequate | Needs Work]**
[Same format]

### 5. Educational Packaging
**Score: [Strong | Adequate | Needs Work]**
[Same format]

### 6. SEO and LLM Discoverability
**Score: [Strong | Adequate | Needs Work]**
[Same format]

## Priority Actions

### Quick Wins (< 1 hour each)
- [ ] [Action with specific file path]

### Medium Effort (1-4 hours each)
- [ ] [Action with specific file paths]

### Larger Initiatives
- [ ] [Action with scope description]

## Learning Path Map

[For `full` and `learning-path` audits, include a text diagram showing
the main paths through the site for each audience]

### Developer Path
Symptom -> Anti-Pattern -> Guide -> Metrics
[List specific paths that work and paths with gaps]

### Manager Path
For Managers -> Symptoms -> Anti-Patterns (metrics) -> Migration Phases
[List specific paths that work and paths with gaps]
```

## Notes

- This skill is read-only. It does not modify files.
- When recommending new cross-links, provide the exact markdown link syntax.
- When identifying orphan or dead-end pages, check both the content body and the Related Content section.
- Consider mobile readers - navigation that works on desktop may not work on mobile.
- The site uses Hugo with Docsy theme. Recommendations should be implementable within that framework.
- Respect the site's content style rules: no endashes, no emdashes, no emojis.
