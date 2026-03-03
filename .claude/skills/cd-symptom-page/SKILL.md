---
name: cd-symptom-page
description: Generate symptom pages for the CD migration guide following the standard template
user_invocable: true
---

# CD Symptom Page Generator

Role: implementation. This skill generates new content files following
the symptom page template.

Generate a new symptom page for the "Symptoms" section of the CD migration guide.

## Constraints

1. **Follow the template exactly.** Do not invent new sections or skip required ones.
2. **Be concise.** Generate the page and report validation results. No preambles.
3. **Validate before finishing.** Run all validation checks in the instructions before considering the work complete.

## Instructions

1. **Ask the user** which symptom to write if not already specified. Ask which subdirectory it belongs in: `testing/`, `deployment/`, `flow/`, or `visibility/`.
2. **Read a canonical example** at `content/en/docs/symptoms/deployment/fear-of-deploying.md` to calibrate tone, depth, and structure.
3. **Identify related anti-pattern pages** from the list below. Every cause MUST link to an existing anti-pattern page.
4. **Generate the page** following the template below.
5. **Validate before finishing:**
   - Run `/grammar-check` on the generated file to catch and fix any prohibited punctuation.
   - Verify all `**Read more:**` links point to existing anti-pattern pages.
   - Verify all links in "How to narrow it down" point to existing pages.
   - Confirm "Common causes" has 2-5 subsections.
   - Confirm description is under 160 characters.

## Template

```markdown
---
aliases:
  - /docs/symptoms/[slug]/
title: "[Descriptive Title - What the Team Experiences]"
linkTitle: "[Short display title]"
description: >
  [One-to-two sentence description under 160 characters. Describe the observable symptom
  and its immediate impact.]
tags:
  - [tag-1]
  - [tag-2]
---

## What you are seeing

[2-3 paragraphs describing what a team member observes day to day. Be vivid and specific.
Use present tense. Paint a picture the reader recognizes from their own experience.
The goal is for the reader to say "that's us."]

## Common causes

### [Cause Name - Matches Anti-Pattern Title]

[2 paragraphs explaining how this anti-pattern produces the symptom the reader is
experiencing. Be specific about the mechanism. First paragraph describes the cause,
second paragraph describes the healthier alternative or what changes when the
anti-pattern is addressed.]

**Read more:** [Anti-Pattern Title](../../anti-patterns/[category]/[slug]/)

### [Cause Name 2]

[Same structure as above]

**Read more:** [Anti-Pattern Title](../../anti-patterns/[category]/[slug]/)

[2-5 cause subsections total. Each must link to an existing anti-pattern page.]

## How to narrow it down

1. **[Diagnostic question in bold]** [Brief explanation of what the answer tells you.
   Ends with a recommendation to] Start with
   [Anti-Pattern Title](../../anti-patterns/[category]/[slug]/).
2. **[Next diagnostic question]** [Same pattern.]
[One numbered item per cause, in a logical diagnostic order - start with the most
common or easiest to identify.]
```

## Content Guidelines

### Tone
- Direct, specific, and assertive but not preachy
- Write as a practitioner advising a peer, not a consultant lecturing a client
- State what happens and why - let the reader draw conclusions
- Use "you" and "the team" naturally
- Symptom pages are diagnostic: help the reader identify what is going wrong and where to look

### Depth per section
- **What you are seeing:** 2-3 paragraphs. Vivid enough that the reader recognizes their own situation.
- **Common causes:** 2 paragraphs per cause. First describes the mechanism, second the alternative.
- **How to narrow it down:** One numbered item per cause. Each is a yes/no diagnostic question.

### Style rules
- Use sentence-style capitalization in headings (only capitalize first word and proper nouns).
- Keep paragraphs to 3-4 sentences maximum.
- Use active voice.
- Section heading is `## What you are seeing` (lowercase "you"), not "What You Are Seeing".
- Run `/grammar-check` before finishing to catch prohibited punctuation (endashes, emdashes, hyphens used as dashes).

### Key differences from anti-pattern pages
- Symptom pages do NOT have `category`, `risk_level`, or `weight` in front matter.
- Symptom pages do NOT have a `{{% pageinfo %}}` block.
- Symptom pages have `aliases` in front matter for redirect from old URL structure.
- The title should describe what the team experiences (e.g., "The Team Is Afraid to Deploy"), not the root cause.

## Subdirectory Selection

| Subdirectory | When to use |
|-------------|-------------|
| `testing/` | Symptoms related to test suite health, test reliability, test effectiveness |
| `deployment/` | Symptoms related to deployment frequency, deployment risk, release process |
| `flow/` | Symptoms related to work throughput, cycle time, bottlenecks, WIP |
| `visibility/` | Symptoms related to production observability, team health, knowledge gaps |

## Available Anti-Pattern Pages (for cross-referencing)

Every `**Read more:**` link and every "How to narrow it down" link MUST point to one of these pages. Use relative links from the symptom subdirectory: `../../anti-patterns/[category]/[slug]/`

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

## Available Tags

Choose 1-4 tags from this vocabulary:

- `architecture`
- `batch-size`
- `deployment-automation`
- `environment-consistency`
- `integration-frequency`
- `observability`
- `process-gates`
- `team-dynamics`
- `test-strategy`
- `work-decomposition`

## Output

Write the generated page to `content/en/docs/symptoms/[subdirectory]/[slug].md` where `[slug]` is the symptom name in kebab-case.
