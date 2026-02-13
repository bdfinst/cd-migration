---
title: "Work Decomposition"
draft: true
linkTitle: "Work Decomposition"
weight: 4
description: >
  Break features into small, deliverable increments that can be completed in 2 days or less.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | Adapted from [Dojo Consortium](https://dojoconsortium.org)

Trunk-based development requires daily integration, and daily integration requires small work. If a feature takes two weeks to build, you cannot integrate it daily without decomposing it first. This page covers the techniques for breaking work into small, deliverable increments that flow through your pipeline continuously.
{{% /pageinfo %}}

## Why Small Work Matters for CD

Continuous delivery depends on a simple equation: **small changes, integrated frequently, are safer than large changes integrated rarely.**

Every practice in Phase 1 reinforces this:

- [Trunk-based development](../trunk-based-development/) requires that you integrate at least daily. You cannot integrate a two-week feature daily unless you decompose it.
- [Testing fundamentals](../testing-fundamentals/) work best when each change is small enough to test thoroughly.
- [Code review](../code-review/) is fast when the change is small. A 50-line change can be reviewed in minutes. A 2,000-line change takes hours - if it gets reviewed at all.

The data supports this. The DORA research consistently shows that smaller batch sizes correlate with higher delivery performance. Small changes have:

- **Lower risk:** If a small change breaks something, the blast radius is limited, and the cause is obvious.
- **Faster feedback:** A small change gets through the pipeline quickly. You learn whether it works today, not next week.
- **Easier rollback:** Rolling back a 50-line change is straightforward. Rolling back a 2,000-line change often requires a new deployment.
- **Better flow:** Small work items move through the system predictably. Large work items block queues and create bottlenecks.

## The 2-Day Rule

**If a work item takes longer than 2 days to complete, it is too big.**

This is not arbitrary. Two days gives you at least one integration to trunk per day (the minimum for TBD) and allows for the natural rhythm of development: plan, implement, test, integrate, move on.

When a developer says "this will take a week," the answer is not "go faster." The answer is "break it into smaller pieces."

### What "Complete" Means

A work item is complete when it is:

- Integrated to trunk
- All tests pass
- The change is deployable (even if the feature is not yet user-visible)
- It meets the [Definition of Done](../working-agreements/)

If a story requires a feature flag to hide incomplete user-facing behavior, that is fine. The code is still integrated, tested, and deployable.

## Story Slicing Techniques

Story slicing is the practice of breaking user stories into the smallest possible increments that still deliver value or make progress toward delivering value.

### The INVEST Criteria

Good stories follow INVEST:

| Criterion | Meaning | Why It Matters for CD |
|-----------|---------|----------------------|
| **I**ndependent | Can be developed and deployed without waiting for other stories | Enables parallel work and avoids blocking |
| **N**egotiable | Details can be discussed and adjusted | Allows the team to find the smallest valuable slice |
| **V**aluable | Delivers something meaningful to the user or the system | Prevents "technical stories" that do not move the product forward |
| **E**stimable | Small enough that the team can reasonably estimate it | Large stories are unestimable because they hide unknowns |
| **S**mall | Completable within 2 days | Enables daily integration and fast feedback |
| **T**estable | Has clear acceptance criteria that can be automated | Supports the testing foundation |

### Vertical Slicing

The most important slicing technique for CD is **vertical slicing**: cutting through all layers of the application to deliver a thin but complete slice of functionality.

**Vertical slice (correct):**

> "As a user, I can log in with my email and password."
>
> This slice touches the UI (login form), the API (authentication endpoint), and the database (user lookup). It is deployable and testable end-to-end.

**Horizontal slice (anti-pattern):**

> "Build the database schema for user accounts."
> "Build the authentication API."
> "Build the login form UI."
>
> Each horizontal slice is incomplete on its own. None is deployable. None is testable end-to-end. They create dependencies between work items and block flow.

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

Each slice is independently deployable, testable, and completable within 2 days. Each delivers incremental value. The feature is built up over a series of small deliveries rather than one large batch.

## BDD as a Decomposition Tool

Behavior-Driven Development (BDD) is not just a testing practice - it is a powerful tool for decomposing work into small, clear increments.

### Three Amigos

Before work begins, hold a brief "Three Amigos" session with three perspectives:

- **Business/Product:** What should this feature do? What is the expected behavior?
- **Development:** How will we build it? What are the technical considerations?
- **Testing:** How will we verify it? What are the edge cases?

This 15-30 minute conversation accomplishes two things:

1. **Shared understanding:** Everyone agrees on what "done" looks like before work begins.
2. **Natural decomposition:** Discussing specific scenarios reveals natural slice boundaries.

### Specification by Example

Write acceptance criteria as concrete examples, not abstract requirements.

**Abstract (hard to slice):**

> "The system should validate user input."

**Concrete (easy to slice):**

> - Given an email field, when the user enters "not-an-email", then the form shows "Please enter a valid email address."
> - Given a password field, when the user enters fewer than 8 characters, then the form shows "Password must be at least 8 characters."
> - Given a name field, when the user leaves it blank, then the form shows "Name is required."

Each concrete example can become its own story or task. The scope is clear, the acceptance criteria are testable, and the work is small.

### Given-When-Then Format

Structure acceptance criteria in Given-When-Then format to make them executable:

```gherkin
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
```

Each scenario is a natural unit of work. Implement one scenario at a time, integrate to trunk after each one.

## Task Decomposition Within Stories

Even well-sliced stories may contain multiple tasks. Decompose stories into tasks that can be completed and integrated independently.

**Example story:** "User can update their name"

**Tasks:**

1. Add the name field to the profile API endpoint (backend change, integration test)
2. Add the name field to the profile form (frontend change, unit test)
3. Connect the form to the API endpoint (integration, E2E test)

Each task results in a commit to trunk. The story is completed through a series of small integrations, not one large merge.

**Guidelines for task decomposition:**

- Each task should take hours, not days
- Each task should leave trunk in a working state after integration
- Tasks should be ordered so that the simplest changes come first
- If a task requires a feature flag or stub to be integrated safely, that is fine

## Common Anti-Patterns

### Horizontal Slicing

**Symptom:** Stories are organized by architectural layer: "build the database schema," "build the API," "build the UI."

**Problem:** No individual slice is deployable or testable end-to-end. Integration happens at the end, which is where bugs are found and schedules slip.

**Fix:** Slice vertically. Every story should touch all the layers needed to deliver a thin slice of complete functionality.

### Technical Stories

**Symptom:** The backlog contains stories like "refactor the database access layer" or "upgrade to React 18" that do not deliver user-visible value.

**Problem:** Technical work is important, but when it is separated from feature work, it becomes hard to prioritize and easy to defer. It also creates large, risky changes.

**Fix:** Embed technical improvements in feature stories. Refactor as you go. If a technical change is necessary, tie it to a specific business outcome and keep it small enough to complete in 2 days.

### Stories That Are Really Epics

**Symptom:** A story has 10+ acceptance criteria, or the estimate is "8 points" or "2 weeks."

**Problem:** Large stories hide unknowns, resist estimation, and cannot be integrated daily.

**Fix:** If a story has more than 3-5 acceptance criteria, it is an epic. Break it into smaller stories using the slicing strategies above.

### Splitting by Role Instead of by Behavior

**Symptom:** Separate stories for "frontend developer builds the UI" and "backend developer builds the API."

**Problem:** This creates handoff dependencies and delays integration. The feature is not testable until both stories are complete.

**Fix:** Write stories from the user's perspective. The same developer (or pair) implements the full vertical slice.

### Deferring "Edge Cases" Indefinitely

**Symptom:** The team builds the happy path and creates a backlog of "handle error case X" stories that never get prioritized.

**Problem:** Error handling is not optional. Unhandled edge cases become production incidents.

**Fix:** Include the most important error cases in the initial story decomposition. Use the "happy path first" slicing strategy, but schedule edge case stories immediately after, not "someday."

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Story cycle time | < 2 days from start to trunk | Confirms stories are small enough |
| [Development cycle time](../../reference/metrics/development-cycle-time/) | Decreasing | Shows improved flow from smaller work |
| Stories completed per week | Increasing (with same team size) | Indicates better decomposition and less rework |
| [Work in progress](../../reference/metrics/work-in-progress/) | Decreasing | Fewer large stories blocking the pipeline |

## Next Step

Small, well-decomposed work flows through the system quickly - but only if code review does not become a bottleneck. Continue to [Code Review](../code-review/) to learn how to keep review fast and effective.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
