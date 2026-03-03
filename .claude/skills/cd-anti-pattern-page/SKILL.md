---
name: cd-anti-pattern-page
description: Generate anti-pattern pages for the CD migration guide following the standard template
user_invocable: true
---

# CD Anti-Pattern Page Generator

Generate a new anti-pattern page for the "Quality and Delivery Anti-Patterns" section of the CD migration guide.

## Instructions

1. **Read the canonical example** at `content/en/docs/problems/push-based-work-assignment.md` to calibrate tone, depth, and structure.
2. **Read `common-issues.md`** at the repo root to find the issue description if the user references an issue number or name.
3. **Ask the user** which anti-pattern to write if not already specified.
4. **Generate the page** following the template below.
5. **Validate before finishing:**
   - Run `/grammar-check` on the generated file to catch and fix any prohibited punctuation.
   - Verify all internal links point to existing pages.
   - Confirm the "Why This Is a Problem" section has all three required subsections plus the CD impact closing subsection.

## Template

```markdown
---
title: "[Anti-Pattern Name]"
linkTitle: "[Anti-Pattern Name]"
weight: [number matching common-issues.md issue number]
description: >
  [One-sentence description of the anti-pattern]
---

{{% pageinfo %}}
**Category:** [Category Name] | {{% risk-indicator level="[critical|high|medium|low]" %}}
{{% /pageinfo %}}

## What This Looks Like

[2-3 paragraphs describing observable symptoms. Be specific and concrete - describe what a team
member would actually see, hear, or experience. Use present tense.]

Common variations:

- **[Variation name].** [Description]
- **[Variation name].** [Description]

[Telltale sign paragraph: "The telltale sign: ..."]

## Why This Is a Problem

[1-2 sentence framing paragraph that sets up the subsections below.]

### It reduces quality

[How this anti-pattern degrades quality. Be specific about the mechanism. Contrast with the
healthier alternative in the final paragraph of this subsection.]

### It increases rework

[How this anti-pattern causes wasted or duplicated effort. Contrast with the healthier
alternative.]

### It makes delivery timelines unpredictable

[How this anti-pattern disrupts flow and predictability. Contrast with the healthier alternative.]

### [Optional: context-specific impact subsection]

[Additional impacts that don't fit the three required dimensions above. Use when the anti-pattern
has a distinctive effect worth calling out separately. Skip if the three required subsections
already cover the key impacts.]

### Impact on continuous delivery

[How this specifically blocks CD adoption or practices. This is always the final subsection.
Connect back to the core CD requirements: steady flow of small changes, fast feedback, predictable
delivery.]

## How to Fix It

### Step 1: [Action verb]

[Concrete first step. Include specific actions the team should take.]

### Step 2: [Action verb]

[Continue with weekly steps. Each step should build on the previous one.]

[Include an objection-handling table if the anti-pattern has common pushback:]

| Objection | Response |
|-----------|----------|
| "[Common pushback]" | [Concrete response that addresses the concern] |

[Include a role transition table if applicable:]

| Before | After |
|--------|-------|
| [Old behavior] | [New behavior] |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Metric name] | [What improvement looks like] |

## Related Content

- [Links to relevant guide pages in the site]
```

## Content Guidelines

### Tone
- Direct, specific, and assertive but not preachy
- Write as a practitioner advising a peer, not a consultant lecturing a client
- State what happens and why it matters - let the reader draw conclusions
- Use "you" and "the team" naturally

### Depth per section
- **What This Looks Like:** 2-3 paragraphs plus variations. Enough detail that a reader says "that's us."
- **Why This Is a Problem subsections:** 2-4 paragraphs each. Each subsection should have a clear mechanism (how the anti-pattern causes this effect) and a contrast with the healthier alternative.
- **How to Fix It steps:** 3-6 steps, each with a week number. Concrete enough to start Monday morning.
- **Measuring Progress:** 4-6 metrics. Link to reference metric pages where one exists.
- **Related Content:** 3-5 links to existing guide pages.

### Style rules
- Use sentence-style capitalization in headings (only capitalize the first word and proper nouns).
- Keep paragraphs to 3-4 sentences maximum.
- Use active voice.
- Run `/grammar-check` before finishing to catch prohibited punctuation (endashes, emdashes, hyphens used as dashes).

### Subsection conventions
- "Why This Is a Problem" always has three required subsections: "It reduces quality", "It increases rework", "It makes delivery timelines unpredictable"
- Optional extra subsections go between "delivery timelines" and "Impact on continuous delivery"
- "Impact on continuous delivery" is always the final subsection
- Each subsection contrasts the anti-pattern with the healthier alternative
- "How to Fix It" uses time-boxed weekly steps

## Quality Impact Levels

Each anti-pattern gets a risk indicator badge. Choose the level based on how directly the anti-pattern blocks continuous delivery:

| Level | When to use |
|-------|-------------|
| Critical | Foundational blocker - CD is impossible without fixing this (e.g., no CI, no pipeline) |
| High | Significant drag on delivery flow, feedback loops, or quality (e.g., PR bottlenecks, too much WIP) |
| Medium | Impedes delivery but less directly tied to core CD gates (e.g., no vertical slicing) |
| Low | Minor friction - worth fixing but not a delivery blocker |

## Categories

These match the categories in `common-issues.md`:

1. Delivery Speed & Frequency (issues 1-8)
2. Branching & Integration (issues 9-15)
3. Testing & Quality (issues 16-27)
4. Work Decomposition & Planning (issues 28-35)
5. Pipeline & Infrastructure (issues 36-48)
6. Monitoring & Observability (issues 49-54)
7. Organizational & Cultural (issues 55-69)
8. Compliance & Security (issues 70-75)
9. Architecture (issues 76-83)
10. Developer Experience (issues 84-90)
11. Legacy & Migration-Specific (issues 91-97)
12. Missing Practices (issues 98-105)

## Available Metrics Pages (for linking)

Use relative links from the problems directory: `../../reference/metrics/[page]/`

- `build-duration` - Build Duration
- `change-fail-rate` - Change Fail Rate
- `development-cycle-time` - Development Cycle Time
- `integration-frequency` - Integration Frequency
- `lead-time` - Lead Time
- `mean-time-to-repair` - Mean Time to Repair
- `release-frequency` - Release Frequency
- `work-in-progress` - Work in Progress

## Available Guide Pages (for Related Content links)

Use relative links from the problems directory: `../../[section]/[page]/`

**Assess:**
- `assess/baseline-metrics` - Baseline Metrics
- `assess/current-state-checklist` - Current State Checklist
- `assess/identify-constraints` - Identify Constraints
- `assess/value-stream-mapping` - Value Stream Mapping

**Foundations:**
- `foundations/build-automation` - Build Automation
- `foundations/code-review` - Code Review
- `foundations/everything-as-code` - Everything as Code
- `foundations/testing-fundamentals` - Testing Fundamentals
- `foundations/trunk-based-development` - Trunk-Based Development
- `foundations/work-decomposition` - Work Decomposition
- `foundations/working-agreements` - Working Agreements

**Pipeline:**
- `pipeline/application-config` - Application Config
- `pipeline/deployable-definition` - Deployable Definition
- `pipeline/deterministic-pipeline` - Deterministic Pipeline
- `pipeline/immutable-artifacts` - Immutable Artifacts
- `pipeline/pipeline-architecture` - Pipeline Architecture
- `pipeline/production-like-environments` - Production-Like Environments
- `pipeline/rollback` - Rollback
- `pipeline/single-path-to-production` - Single Path to Production

**Optimize:**
- `optimize/architecture-decoupling` - Architecture Decoupling
- `optimize/feature-flags` - Feature Flags
- `optimize/limiting-wip` - Limiting WIP
- `optimize/metrics-driven-improvement` - Metrics-Driven Improvement
- `optimize/retrospectives` - Retrospectives
- `optimize/small-batches` - Small Batches

**Continuous Deployment:**
- `continuous-deployment/agentic-cd` - Agentic CD
- `continuous-deployment/deploy-on-demand` - Deploy on Demand
- `continuous-deployment/experience-reports` - Experience Reports
- `continuous-deployment/progressive-rollout` - Progressive Rollout

**Reference:**
- `reference/cd-dependency-tree` - CD Dependency Tree
- `reference/common-blockers` - Common Blockers
- `reference/dora-capabilities` - DORA Capabilities
- `reference/glossary` - Glossary
- `reference/resources` - Resources

## Output

Write the generated page to `content/en/docs/problems/[slug].md` where `[slug]` is the anti-pattern name in kebab-case.
