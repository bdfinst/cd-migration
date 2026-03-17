---
title: "Work Decomposition"
linkTitle: "Work Decomposition"
weight: 4
description: >
  Break features into small, deliverable increments that can be completed in 2 days or less.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

[Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}) requires daily integration, and daily integration requires small work. This page covers the techniques for breaking work into small, deliverable increments that flow through your [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) continuously.
{{% /pageinfo %}}

## Why Small Work Matters for CD

[Continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) depends on a core principle: **small changes, integrated frequently, are safer than large changes integrated rarely.**

Every practice in Phase 1 reinforces this:

- [Trunk-based development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}) requires that you integrate at least daily. You cannot integrate a two-week feature daily unless you decompose it.
- [Testing fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) work best when each change is small enough to test thoroughly.
- [Code review]({{< relref "/docs/migrate-to-cd/foundations/code-review" >}}) is fast when the change is small. A 50-line change can be reviewed in minutes. A 2,000-line change takes hours - if it gets reviewed at all.

The [DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}}) research consistently shows that smaller [batch sizes]({{< relref "/docs/reference/glossary#batch-size" >}}) correlate with higher delivery performance. Small changes have:

- **Lower risk:** If a small change breaks something, the blast radius is limited, and the cause is obvious.
- **Faster feedback:** A small change gets through the pipeline quickly. You learn whether it works today, not next week.
- **Easier [rollback]({{< relref "/docs/reference/glossary#rollback" >}}):** Rolling back a 50-line change is straightforward. Rolling back a 2,000-line change often requires a new deployment.
- **Better flow:** Small work items move through the system predictably. Large work items block queues and create bottlenecks.

## The 2-Day Rule

**If a work item takes longer than 2 days to complete, it is too big.**

Two days gives you at least one integration to trunk per day (the minimum for [TBD]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}})) and allows for the natural rhythm of development: plan, implement, test, integrate, move on.

When a developer says "this will take a week," the answer is not "go faster." The answer is "break it into smaller pieces."

### What "Complete" Means

A work item is complete when it is:

- Integrated to trunk
- All tests pass
- The change is [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) (even if the feature is not yet user-visible)
- It meets the [Definition of Done]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

If a story requires a [feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}) to hide incomplete user-facing behavior, that is fine. The code is still integrated, tested, and deployable.

## Story Slicing Techniques

### The INVEST Criteria

Good stories follow INVEST:

| Criterion | Meaning | Why It Matters for CD |
|-----------|---------|----------------------|
| **I**ndependent | Can be developed and deployed without waiting for other stories | Enables parallel work |
| **N**egotiable | Details can be discussed and adjusted | Helps find the smallest valuable slice |
| **V**aluable | Delivers something meaningful to the user or the system | Prevents technical stories that stall the product |
| **E**stimable | Small enough that the team can reasonably estimate it | Large stories hide unknowns |
| **S**mall | Completable within 2 days | Enables daily integration |
| **T**estable | Has clear [acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}}) that can be automated | Supports the testing foundation |

### Vertical Slicing

The most important slicing technique for CD is **[vertical slicing]({{< relref "/docs/reference/glossary#vertical-sliced-story" >}})**: cutting through all layers of the application to deliver a thin but complete slice of functionality.

**Vertical slice (correct):**

> "As a user, I can log in with my email and password."
>
> This slice touches the UI (login form), the API (authentication endpoint), and the database (user lookup). It is deployable and testable end-to-end.

**Horizontal slice (anti-pattern):**

> "Build the database schema for user accounts."
> "Build the authentication API."
> "Build the login form UI."
>
> Each horizontal slice is incomplete on its own. None is deployable. None is testable end-to-end. They create [dependencies]({{< relref "/docs/reference/glossary#dependency" >}}) between work items and block flow.

### Vertical slicing in distributed systems

Not every team owns the full stack from UI to database. A [subdomain product team]({{< relref "/docs/reference/glossary#subdomain-product-team" >}}) may own a service whose consumers are other services, not humans. The principle still applies: a vertical slice cuts through all layers your team owns and delivers complete, observable behavior through your team's public interface.

**Does this change deliver complete behavior through the interface your team owns?** For a [full-stack product team]({{< relref "/docs/reference/glossary#full-stack-product-team" >}}), that interface is a UI. For a subdomain team, it is an API contract. If the change only touches one layer beneath that interface, it is a horizontal slice regardless of how you label it.

See [Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}) for how layer-by-layer splitting fails in distributed systems.

### Slicing Strategies

When a story feels too big, apply one of these strategies:

| Strategy | How It Works | Example |
|----------|-------------|---------|
| **By workflow step** | Implement one step of a multi-step process | "User can add items to cart" (before "user can checkout") |
| **By business rule** | Implement one rule at a time | "Orders over $100 get free shipping" (before "orders ship to international addresses") |
| **By data variation** | Handle one data type first | "Support credit card payments" (before "support PayPal") |
| **By operation** | Implement CRUD operations separately | "Create a new customer" (before "edit customer" or "delete customer") |
| **By performance** | Get it working first, optimize later | "Search returns results" (before "search returns results in under 200ms") |
| **By platform** | Support one platform first | "Works on desktop web" (before "works on mobile") |
| **Happy path first** | Implement the success case first | "User completes checkout" (before "user sees error when payment fails") |

### Example: Decomposing a Feature

**Original story (too big):**

> "As a user, I can manage my profile including name, email, avatar, password, notification preferences, and two-factor authentication."

**Decomposed into vertical slices:**

1. "User can view their current profile information" (read-only display)
2. "User can update their name" (simplest edit)
3. "User can update their email with verification" (adds email flow)
4. "User can upload an avatar image" (adds file handling)
5. "User can change their password" (adds security validation)
6. "User can configure notification preferences" (adds preferences)
7. "User can enable two-factor authentication" (adds 2FA flow)

Each slice is independently deployable, testable, and completable within 2 days.

### Use BDD scenarios to find slice boundaries

[BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}}) scenarios are the most reliable way to find slice boundaries. Each Given-When-Then scenario becomes a candidate work item with clear scope and testable acceptance criteria. A brief "Three Amigos" conversation (business, development, testing perspectives) before work begins surfaces these scenarios naturally.

{{< card code=true header="**Given-When-Then: user login scenarios**" lang="gherkin" >}}
Feature: User login

  Scenario: Successful login with valid credentials
    Given a registered user with email "user@example.com"
    When they enter their correct password and click "Log in"
    Then they are redirected to the dashboard

  Scenario: Failed login with wrong password
    Given a registered user with email "user@example.com"
    When they enter an incorrect password and click "Log in"
    Then they see the message "Invalid email or password"
    And they remain on the login page
{{< /card >}}

Each scenario is a natural unit of work. Implement one scenario at a time, integrate to trunk after each one.

## Task Decomposition Within Stories

Even well-sliced stories may contain multiple tasks. Decompose stories into tasks that can be completed and integrated independently.

**Example story:** "User can update their name"

**Tasks:**

1. Display the current name on the profile page (read-only, end-to-end through UI and API, integration test)
2. Add an editable name field that saves successfully (UI, API, and persistence in one pass, E2E test)
3. Show a validation error when the name is blank (adds one business rule across all layers, unit and E2E test)

Each task delivers a thin vertical slice of behavior and results in a commit to trunk. The story is completed through a series of small integrations, not one large merge.

**Guidelines for task decomposition:**

- Each task should take hours, not days
- Each task should leave trunk in a working state after integration
- Tasks should be ordered so that the simplest changes come first
- If a task requires a feature flag or stub to be integrated safely, that is fine

## Common Anti-Patterns

- **[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}):** Stories organized by layer ("build the schema," "build the API," "build the UI"). No individual slice is deployable.
- **[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}):** Stories with 10+ acceptance criteria or multi-week estimates. Break them into smaller stories using the slicing strategies above.
- **Technical stories without business context:** Backlog items like "refactor the database access layer" that do not tie to a business outcome. Embed technical improvements in feature stories and keep them under 2 days.
- **Splitting by role instead of by behavior:** Separate stories for "frontend developer builds the UI" and "backend developer builds the API" create handoff dependencies and delay integration. Write stories from the user's perspective so the same developer (or pair) implements the full vertical slice.
- **Deferring edge cases indefinitely:** Building the happy path and creating a backlog of "handle error case X" stories that never get prioritized. Error handling is not optional. Include the most important error cases in the initial decomposition and schedule them immediately after the happy path, not "someday."

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Story cycle time | < 2 days from start to trunk | Confirms stories are small enough |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Decreasing | Shows improved flow from smaller work |
| Stories completed per week | Increasing (with same team size) | Indicates better decomposition and less rework |
| [Work in progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) | Decreasing | Fewer large stories blocking the pipeline |

## Next Step

Continue to [Code Review]({{< relref "/docs/migrate-to-cd/foundations/code-review" >}}) to learn how to keep review fast and effective without becoming a bottleneck.

---

## Related Content

- [Too Much WIP]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - Symptom caused by large work items that block the pipeline
- [Work Items Take Too Long]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}) - Symptom that smaller decomposition directly addresses
- [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}) - Anti-pattern where stories are too large to integrate daily
- [Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}) - Anti-pattern where work is split by layer instead of by user value
- [Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) - Metric that improves with smaller work items
- [Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) - Metric for tracking WIP limits and flow
