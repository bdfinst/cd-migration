---
name: cd-guide-page
description: Generate guide pages for the Migrate to CD section following the standard template
user_invocable: true
---

# CD Guide Page Generator

Generate a new guide page for the "Migrate to CD" section of the CD migration guide.

## Instructions

1. **Ask the user** which practice or topic to write if not already specified. Ask which phase it belongs to: Assess, Foundations, Pipeline, Optimize, or Continuous Deployment.
2. **Read a canonical example** at `content/en/docs/migrate-to-cd/migration-path/foundations/trunk-based-development.md` to calibrate tone, depth, and structure.
3. **Identify related anti-pattern and symptom pages** from the lists below for cross-referencing.
4. **Generate the page** following the template below.
5. **Validate before finishing:**
   - Run `/grammar-check` on the generated file to catch and fix any prohibited punctuation.
   - Verify all internal links point to existing pages.
   - Confirm the pageinfo block contains the correct phase indicator.
   - Confirm description is under 160 characters.

## Template

```markdown
---
title: "[Practice or Topic Name]"
linkTitle: "[Practice or Topic Name]"
weight: [number - position within the phase section]
description: >
  [One sentence description under 160 characters. State what the practice is and
  what it enables.]
---

{{% pageinfo %}}
**[Phase Name]** | Adapted from [source if applicable]

[1-2 sentence summary of why this practice matters and where it fits in the
migration path.]
{{% /pageinfo %}}

## What Is [Practice Name]?

[2-3 paragraphs defining the practice. Be precise about what it is and what it is not.
Include a blockquote if there is an authoritative definition worth citing.]

### What [Practice Name] Is Not

[Bullet list clarifying common misconceptions. This subsection is optional but
recommended when the practice is frequently misunderstood.]

## What [Practice Name] Improves

[Table showing problems and how the practice addresses them. Optional but effective
for practices that address multiple symptoms.]

| Problem | How [Practice] Helps |
|---------|---------------------|
| [Problem] | [How it helps] |

## [Implementation Section - Title Varies by Topic]

[This is the core section. Structure depends on the topic. Options include:]

[Option A: Migration paths - when there are multiple valid approaches]
### Path 1: [Approach Name]
### Path 2: [Approach Name]
### How to Choose Your Path

[Option B: Step-by-step guide - when there is one clear approach]
### Step 1: [Action] (Week N)
### Step 2: [Action] (Week N)

[Option C: Practice areas - when the topic has multiple facets]
### [Facet 1]
### [Facet 2]

## Essential Supporting Practices

[Describe practices that must be in place for this one to work. Link to their
guide pages. Optional - include when dependencies are important.]

## Getting Started: A Tactical Guide

[Time-boxed weekly steps for adopting the practice. Similar to "How to Fix It"
in anti-pattern pages but framed positively as adoption rather than correction.]

### Step 1: [Action] (Week 1)
### Step 2: [Action] (Week 2-3)
### Step 3: [Action] (Week 4+)

## Key Pitfalls

[Numbered list of common mistakes when adopting this practice. Each with a bold
title and 1-2 paragraph explanation.]

### 1. "[Common mistake in quotes]"
### 2. "[Common mistake in quotes]"

## Measuring Success

[Table of metrics with targets and rationale.]

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Metric] | [Target] | [Why] |

## Further Reading

[Links to external authoritative sources. Include attribution if content is adapted.]

## Next Step

[One sentence pointing to the next logical practice in the migration path, with a link.]
```

## Content Guidelines

### Tone
- Direct, specific, and educational
- More narrative and explanatory than anti-pattern pages
- Write as a practitioner sharing proven approaches, not a vendor selling a tool
- Use "you" and "your team" naturally
- Guide pages teach and enable; anti-pattern pages diagnose and correct

### Depth
- Guide pages are the longest page type (typically 150-250 lines)
- Definitions should be precise enough to resolve debates ("is this TBD or not?")
- Implementation guidance should be concrete enough to start Monday morning
- Include code examples where they clarify the practice
- Use tables for comparisons and metrics

### Style rules
- Use sentence-style capitalization in headings (only capitalize first word and proper nouns).
- Keep paragraphs to 3-4 sentences maximum.
- Use active voice.
- Run `/grammar-check` before finishing to catch prohibited punctuation (endashes, emdashes, hyphens used as dashes).

### Key differences from other page types
- Guide pages have a `{{% pageinfo %}}` block with the phase indicator
- Guide pages do NOT have `category`, `risk_level`, or `tags` in front matter
- Guide pages have `weight` for ordering within a phase section
- Guide pages have flexible H2 structure (not a rigid template like anti-patterns)
- Guide pages may include code examples, comparison tables, and blockquotes
- Guide pages link to anti-patterns (as things to avoid) and symptoms (as things the practice resolves)

## Phase Assignment

The phase determines the output directory and the pageinfo label.

| Phase | Directory | Pageinfo label |
|-------|-----------|---------------|
| Phase 0 - Assess | `assess/` | `**Phase 0 - Assess**` |
| Phase 1 - Foundations | `foundations/` | `**Phase 1 - Foundations**` |
| Phase 2 - Pipeline | `pipeline/` | `**Phase 2 - Pipeline**` |
| Phase 3 - Optimize | `optimize/` | `**Phase 3 - Optimize**` |
| Phase 4 - Continuous Deployment | `continuous-deployment/` | `**Phase 4 - Continuous Deployment**` |

## Available Anti-Pattern Pages (for cross-referencing)

Use relative links from guide page directories: `../../../anti-patterns/[category]/[slug]/`

**Architecture:**
- `architecture/distributed-monolith` - Distributed Monolith
- `architecture/premature-microservices` - Premature Microservices
- `architecture/tightly-coupled-monolith` - Tightly Coupled Monolith

**Branching & Integration:**
- `branching-integration/integration-deferred` - Integration Deferred
- `branching-integration/long-lived-feature-branches` - Long-Lived Feature Branches

**Monitoring & Observability:**
- `monitoring-observability/blind-operations` - Blind Operations

**Organizational & Cultural:**
- `organizational-cultural/cab-gates` - CAB Gates
- `organizational-cultural/deadline-driven-development` - Deadline-Driven Development
- `organizational-cultural/missing-product-ownership` - Missing Product Ownership
- `organizational-cultural/pressure-to-skip-testing` - Pressure to Skip Testing
- `organizational-cultural/thin-spread-teams` - Thin-Spread Teams
- `organizational-cultural/velocity-as-individual-metric` - Velocity as Individual Metric

**Pipeline & Infrastructure:**
- `pipeline/manual-deployments` - Manual Deployments
- `pipeline/missing-deployment-pipeline` - Missing Deployment Pipeline
- `pipeline/snowflake-environments` - Snowflake Environments

**Team Workflow:**
- `team-workflow/horizontal-slicing` - Horizontal Slicing
- `team-workflow/knowledge-silos` - Knowledge Silos
- `team-workflow/monolithic-work-items` - Monolithic Work Items
- `team-workflow/push-based-work-assignment` - Push-Based Work Assignment
- `team-workflow/unbounded-wip` - Unbounded WIP
- `team-workflow/undone-work` - Undone Work

**Testing & Quality:**
- `testing/code-coverage-mandates` - Code Coverage Mandates
- `testing/inverted-test-pyramid` - Inverted Test Pyramid
- `testing/manual-regression-testing-gates` - Manual Regression Testing Gates
- `testing/manual-testing-only` - Manual Testing Only

## Available Symptom Pages (for cross-referencing)

Use relative links from guide page directories: `../../../symptoms/[subdirectory]/[slug]/`

**Testing:**
- `testing/flaky-tests` - Flaky Tests
- `testing/high-coverage-ineffective-tests` - High Coverage, Ineffective Tests
- `testing/refactoring-breaks-tests` - Refactoring Breaks Tests
- `testing/slow-test-suites` - Slow Test Suites
- `testing/environment-dependent-failures` - Environment-Dependent Failures

**Deployment:**
- `deployment/fear-of-deploying` - Fear of Deploying
- `deployment/infrequent-releases` - Infrequent Releases
- `deployment/coordinated-deployments` - Coordinated Deployments
- `deployment/merge-freeze` - Merge Freeze
- `deployment/hardening-sprints` - Hardening Sprints
- `deployment/staging-passes-production-fails` - Staging Passes, Production Fails

**Flow:**
- `flow/too-much-wip` - Too Much WIP
- `flow/work-items-take-too-long` - Work Items Take Too Long
- `flow/prs-waiting-for-review` - PRs Waiting for Review
- `flow/painful-merges` - Painful Merges
- `flow/no-fast-feedback` - No Fast Feedback
- `flow/slow-pipelines` - Slow Pipelines

**Visibility:**
- `visibility/production-issues-found-by-customers` - Production Issues Found by Customers
- `visibility/slow-detection` - Slow Detection
- `visibility/works-on-my-machine` - Works on My Machine
- `visibility/team-burnout` - Team Burnout

## Available Guide Pages (for linking to sibling practices)

Use relative links: `../[slug]/` for same phase, `../../[phase]/[slug]/` for different phase.

**Assess:**
- `baseline-metrics`, `current-state-checklist`, `identify-constraints`, `value-stream-mapping`

**Foundations:**
- `build-automation`, `code-review`, `everything-as-code`, `testing-fundamentals`, `trunk-based-development`, `work-decomposition`, `working-agreements`

**Pipeline:**
- `application-config`, `deployable-definition`, `deterministic-pipeline`, `immutable-artifacts`, `pipeline-architecture`, `production-like-environments`, `rollback`, `single-path-to-production`

**Optimize:**
- `architecture-decoupling`, `feature-flags`, `limiting-wip`, `metrics-driven-improvement`, `retrospectives`, `small-batches`

**Continuous Deployment:**
- `agentic-cd`, `deploy-on-demand`, `experience-reports`, `progressive-rollout`

## Available Metrics Pages (for linking)

Use relative links: `../../../reference/metrics/[slug]/`

- `build-duration`, `change-fail-rate`, `development-cycle-time`, `integration-frequency`, `lead-time`, `mean-time-to-repair`, `release-frequency`, `work-in-progress`

## Output

Write the generated page to `content/en/docs/migrate-to-cd/migration-path/[phase-directory]/[slug].md` where `[slug]` is the practice name in kebab-case.
