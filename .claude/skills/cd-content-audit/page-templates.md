# Page Templates Reference

Machine-readable reference for the cd-content-audit skill. Defines required structures, canonical values, and validation rules for each page type.

## Page Type Detection

Determine page type from file path:

| Path pattern | Page type |
|-------------|-----------|
| `content/en/docs/anti-patterns/**/*.md` (not `_index.md`) | Anti-pattern |
| `content/en/docs/symptoms/**/*.md` (not `_index.md`, `triage.md`, `for-*.md`) | Symptom |
| `content/en/docs/migrate-to-cd/**/*.md` (not `_index.md`) | Guide |

## Anti-Pattern Page Structure

### Required front matter

| Field | Required | Validation |
|-------|----------|------------|
| `title` | Yes | Non-empty string |
| `linkTitle` | Yes | Non-empty string |
| `weight` | Yes | Positive integer |
| `category` | Yes | One of the 7 canonical categories |
| `risk_level` | Yes | One of: `critical`, `high`, `medium`, `low` |
| `description` | Yes | Under 160 characters |
| `tags` | Yes | Array, each value from allowed tags vocabulary |

### Required heading structure (in order)

```
## What This Looks Like
## Why This Is a Problem
### It reduces quality
### It increases rework
### It makes delivery timelines unpredictable
### [Optional additional subsections]
### Impact on continuous delivery
## How to Fix It
### Step 1: ... (Week ...)
[Additional steps]
## Measuring Progress
## Related Content
```

### Validation rules

- "Why This Is a Problem" MUST have exactly three required H3 subsections plus "Impact on continuous delivery" as the final H3
- Additional H3 subsections between "It makes delivery timelines unpredictable" and "Impact on continuous delivery" are allowed
- "How to Fix It" steps MUST include week numbers in parentheses
- "Measuring Progress" MUST contain a table
- "Related Content" MUST contain at least one link
- The pageinfo block with Category and risk-indicator is required after front matter

## Symptom Page Structure

### Required front matter

| Field | Required | Validation |
|-------|----------|------------|
| `aliases` | Optional | Array of redirect paths |
| `title` | Yes | Non-empty string |
| `linkTitle` | Yes | Non-empty string |
| `description` | Yes | Under 160 characters |
| `tags` | Yes | Array, each value from allowed tags vocabulary |

### Required heading structure (in order)

```
## What you are seeing
## Common causes
### [Cause Name 1]
**Read more:** [link to anti-pattern page]
### [Cause Name 2]
**Read more:** [link to anti-pattern page]
[2-5 cause subsections total]
## How to narrow it down
```

### Validation rules

- "What you are seeing" MUST have 2-3 paragraphs
- "Common causes" MUST have 2-5 H3 subsections
- Each cause subsection MUST end with a `**Read more:**` link to an anti-pattern page
- "How to narrow it down" MUST be a numbered list
- Each numbered item SHOULD end with a link
- Symptom pages do NOT have a pageinfo block, category, or risk_level

## Guide Page Structure

### Required front matter

| Field | Required | Validation |
|-------|----------|------------|
| `title` | Yes | Non-empty string |
| `linkTitle` | Yes | Non-empty string |
| `weight` | Yes | Positive integer |
| `description` | Yes | Under 160 characters |

### Required elements

- `{{% pageinfo %}}` block with phase indicator (e.g., "**Phase 1 - Foundations**")
- At least 3 H2 sections
- Guide pages have flexible structure, but typically include:
  - A "What is" or definition section
  - A "Why it matters" or benefits section
  - An implementation or getting-started section
  - A metrics or measuring section

### Validation rules

- The pageinfo block MUST exist and contain the phase name
- Guide pages do NOT have `category` or `risk_level` in front matter
- Guide pages do NOT have `tags` in front matter

## Canonical Values

### Categories (7)

Used in anti-pattern `category` front matter field:

1. `Architecture`
2. `Branching & Integration`
3. `Monitoring & Observability`
4. `Organizational & Cultural`
5. `Pipeline & Infrastructure`
6. `Team Workflow`
7. `Testing & Quality`

### Risk Levels (4)

Used in anti-pattern `risk_level` front matter field:

| Value | When to use |
|-------|-------------|
| `critical` | Foundational blocker - CD is impossible without fixing this |
| `high` | Significant drag on delivery flow, feedback loops, or quality |
| `medium` | Impedes delivery but less directly tied to core CD gates |
| `low` | Minor friction - worth fixing but not a delivery blocker |

### Tags (11)

Used in anti-pattern and symptom page `tags` front matter field:

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

Note: `tags` is an array. Each page should have 1-4 tags from this list.

### Phases (5)

Used in guide page pageinfo blocks:

1. `Phase 0 - Assess`
2. `Phase 1 - Foundations`
3. `Phase 2 - Pipeline`
4. `Phase 3 - Optimize`
5. `Phase 4 - Continuous Deployment`

Phase is determined by the guide page's directory:

| Directory | Phase |
|-----------|-------|
| `assess/` | Phase 0 - Assess |
| `foundations/` | Phase 1 - Foundations |
| `pipeline/` | Phase 2 - Pipeline |
| `optimize/` | Phase 3 - Optimize |
| `continuous-deployment/` | Phase 4 - Continuous Deployment |

## Existing Pages (for cross-reference validation)

### Anti-Pattern Pages

**Architecture:**
- `architecture/distributed-monolith`
- `architecture/premature-microservices`
- `architecture/tightly-coupled-monolith`

**Branching & Integration:**
- `branching-integration/integration-deferred`
- `branching-integration/long-lived-feature-branches`

**Monitoring & Observability:**
- `monitoring-observability/blind-operations`

**Organizational & Cultural:**
- `organizational-cultural/governance-process/cab-gates`
- `organizational-cultural/planning/deadline-driven-development`
- `organizational-cultural/team-dynamics/missing-product-ownership`
- `organizational-cultural/team-dynamics/pressure-to-skip-testing`
- `organizational-cultural/team-dynamics/thin-spread-teams`
- `organizational-cultural/planning/velocity-as-individual-metric`

**Pipeline & Infrastructure:**
- `pipeline/manual-deployments`
- `pipeline/missing-deployment-pipeline`
- `pipeline/snowflake-environments`

**Team Workflow:**
- `team-workflow/horizontal-slicing`
- `team-workflow/knowledge-silos`
- `team-workflow/monolithic-work-items`
- `team-workflow/push-based-work-assignment`
- `team-workflow/unbounded-wip`
- `team-workflow/undone-work`

**Testing & Quality:**
- `testing/code-coverage-mandates`
- `testing/inverted-test-pyramid`
- `testing/manual-regression-testing-gates`
- `testing/manual-testing-only`

### Symptom Pages

**Testing:**
- `testing/flaky-tests`
- `testing/high-coverage-ineffective-tests`
- `testing/refactoring-breaks-tests`
- `testing/slow-test-suites`
- `testing/environment-dependent-failures`

**Deployment:**
- `deployment/fear-of-deploying`
- `deployment/infrequent-releases`
- `deployment/coordinated-deployments`
- `deployment/merge-freeze`
- `deployment/hardening-sprints`
- `deployment/staging-passes-production-fails`

**Flow:**
- `flow/work-management/too-much-wip`
- `flow/work-management/work-items-take-too-long`
- `flow/integration/prs-waiting-for-review`
- `flow/integration/painful-merges`
- `flow/integration/no-fast-feedback`
- `flow/integration/slow-pipelines`

**Visibility:**
- `visibility/production-issues-found-by-customers`
- `visibility/slow-detection`
- `visibility/works-on-my-machine`
- `visibility/team-burnout`

### Guide Pages

**Assess:**
- `assess/baseline-metrics`
- `assess/current-state-checklist`
- `assess/identify-constraints`
- `assess/value-stream-mapping`

**Foundations:**
- `foundations/build-automation`
- `foundations/code-review`
- `foundations/everything-as-code`
- `foundations/testing-fundamentals`
- `foundations/trunk-based-development`
- `foundations/work-decomposition`
- `foundations/working-agreements`

**Pipeline:**
- `pipeline/application-config`
- `pipeline/deployable-definition`
- `pipeline/deterministic-pipeline`
- `pipeline/immutable-artifacts`
- `pipeline/pipeline-architecture`
- `pipeline/production-like-environments`
- `pipeline/rollback`
- `pipeline/single-path-to-production`

**Optimize:**
- `optimize/architecture-decoupling`
- `optimize/feature-flags`
- `optimize/limiting-wip`
- `optimize/metrics-driven-improvement`
- `optimize/retrospectives`
- `optimize/small-batches`

**Continuous Deployment:**
- `continuous-deployment/agentic-cd`
- `continuous-deployment/deploy-on-demand`
- `continuous-deployment/experience-reports`
- `continuous-deployment/progressive-rollout`
