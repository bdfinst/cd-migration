---
title: "Small Batches"
linkTitle: "Small Batches"
weight: 1
description: >
  Deliver smaller, more frequent changes to reduce risk and increase feedback speed.
---

{{% pageinfo %}}
**Phase 3 - Optimize** | Adapted from [MinimumCD.org](https://minimumcd.org)

Batch size is the single biggest lever for improving delivery performance. This page covers what batch size means at every level - deploy frequency, commit size, and story size - and provides concrete techniques for reducing it.
{{% /pageinfo %}}

## Why Batch Size Matters

Large batches create large risks. When you deploy 50 changes at once, any failure could be caused by any of those 50 changes. When you deploy 1 change, the cause of any failure is obvious.

This is not a theory. The DORA research consistently shows that elite teams deploy more frequently, with smaller changes, and have **both** higher throughput **and** lower failure rates. Small batches are the mechanism that makes this possible.

> "If it hurts, do it more often, and bring the pain forward."
>
> - Jez Humble, *Continuous Delivery*

## Three Levels of Batch Size

Batch size is not just about deployments. It operates at three distinct levels, and optimizing only one while ignoring the others limits your improvement.

### Level 1: Deploy Frequency

How often you push changes to production.

| State | Deploy Frequency | Risk Profile |
|-------|-----------------|--------------|
| Starting | Monthly or quarterly | Each deploy is a high-stakes event |
| Improving | Weekly | Deploys are planned but routine |
| Optimizing | Daily | Deploys are unremarkable |
| Elite | Multiple times per day | Deploys are invisible |

**How to reduce:** Remove manual gates, automate approval workflows, build confidence through progressive rollout. If your pipeline is reliable (Phase 2), the only thing preventing more frequent deploys is organizational habit.

### Level 2: Commit Size

How much code changes in each commit to trunk.

| Indicator | Too Large | Right-Sized |
|-----------|-----------|-------------|
| Files changed | 20+ files | 1-5 files |
| Lines changed | 500+ lines | Under 100 lines |
| Review time | Hours or days | Minutes |
| Merge conflicts | Frequent | Rare |
| Description length | Paragraph needed | One sentence suffices |

**How to reduce:** Practice TDD (write one test, make it pass, commit). Use feature flags to merge incomplete work. Pair program so review happens in real time.

### Level 3: Story Size

How much scope each user story or work item contains.

A story that takes a week to complete is a large batch. It means a week of work piles up before integration, a week of assumptions go untested, and a week of inventory sits in progress.

**Target:** Every story should be completable - coded, tested, reviewed, and integrated - in two days or less. If it cannot be, it needs to be decomposed further.

## Behavior-Driven Development for Decomposition

BDD provides a concrete technique for breaking stories into small, testable increments. The Given-When-Then format forces clarity about scope.

### The Given-When-Then Pattern

```gherkin
Feature: Shopping cart discount

  Scenario: Apply percentage discount to cart
    Given a cart with items totaling $100
    When I apply a 10% discount code
    Then the cart total should be $90

  Scenario: Reject expired discount code
    Given a cart with items totaling $100
    When I apply an expired discount code
    Then the cart total should remain $100
    And I should see "This discount code has expired"

  Scenario: Apply discount only to eligible items
    Given a cart with one eligible item at $50 and one ineligible item at $50
    When I apply a 10% discount code
    Then the cart total should be $95
```

Each scenario becomes a deliverable increment. You can implement and deploy the first scenario before starting the second. This is how you turn a "discount feature" (large batch) into three independent, deployable changes (small batches).

### Decomposing Stories Using Scenarios

When a story has too many scenarios, it is too large. Use this process:

1. **Write all the scenarios first.** Before any code, enumerate every Given-When-Then for the story.
2. **Group scenarios into deliverable slices.** Each slice should be independently valuable or at least independently deployable.
3. **Create one story per slice.** Each story has 1-3 scenarios and can be completed in 1-2 days.
4. **Order the slices by value.** Deliver the most important behavior first.

**Example decomposition:**

| Original Story | Scenarios | Sliced Into |
|----------------|-----------|-------------|
| "As a user, I can manage my profile" | 12 scenarios covering name, email, password, avatar, notifications, privacy, deactivation | 5 stories: basic info (2 scenarios), password (2), avatar (2), notifications (3), deactivation (3) |

## Vertical Slicing

A vertical slice cuts through all layers of the system to deliver a thin piece of end-to-end functionality. This is the opposite of horizontal slicing, where you build all the database changes, then all the API changes, then all the UI changes.

### Horizontal vs. Vertical Slicing

**Horizontal (avoid):**

```
Story 1: Build the database schema for discounts
Story 2: Build the API endpoints for discounts
Story 3: Build the UI for applying discounts
```

Problems: Story 1 and 2 deliver no user value. You cannot test end-to-end until story 3 is done. Integration risk accumulates.

**Vertical (prefer):**

```
Story 1: Apply a simple percentage discount (DB + API + UI for one scenario)
Story 2: Reject expired discount codes (DB + API + UI for one scenario)
Story 3: Apply discounts only to eligible items (DB + API + UI for one scenario)
```

Benefits: Every story delivers testable, deployable functionality. Integration happens with each story, not at the end. You can ship story 1 and get feedback before building story 2.

### How to Slice Vertically

Ask these questions about each proposed story:

1. **Can a user (or another system) observe the change?** If not, slice differently.
2. **Can I write an end-to-end test for it?** If not, the slice is incomplete.
3. **Does it require all other slices to be useful?** If yes, find a thinner first slice.
4. **Can it be deployed independently?** If not, check whether feature flags could help.

## Practical Steps for Reducing Batch Size

### Week 1-2: Measure Current State

Before changing anything, measure where you are:

- **Average commit size** (lines changed per commit)
- **Average story cycle time** (time from start to done)
- **Deploy frequency** (how often changes reach production)
- **Average changes per deploy** (how many commits per deployment)

### Week 3-4: Introduce Story Decomposition

- Start writing BDD scenarios before implementation
- Split any story estimated at more than 2 days
- Track the number of stories completed per week (expect this to increase as stories get smaller)

### Week 5-8: Tighten Commit Size

- Adopt the discipline of "one logical change per commit"
- Use TDD to create a natural commit rhythm: write test, make it pass, commit
- Track average commit size and set a team target (e.g., under 100 lines)

### Ongoing: Increase Deploy Frequency

- Deploy at least once per day, then work toward multiple times per day
- Remove any batch-oriented processes (e.g., "we deploy on Tuesdays")
- Make deployment a non-event

## Key Pitfalls

### 1. "Small stories take more overhead to manage"

This is true only if your process adds overhead per story (e.g., heavyweight estimation ceremonies, multi-level approval). The solution is to simplify the process, not to keep stories large. Overhead per story should be near zero for a well-decomposed story.

### 2. "Some things can't be done in small batches"

Almost anything can be decomposed further. Database migrations can be done in backward-compatible steps. API changes can use versioning. UI changes can be hidden behind feature flags. The skill is in finding the decomposition, not in deciding whether one exists.

### 3. "We tried small stories but our throughput dropped"

This usually means the team is still working sequentially. Small stories require limiting WIP and swarming - see [Limiting WIP](../limiting-wip/). If the team starts 10 small stories instead of 2 large ones, they have not actually reduced batch size; they have increased WIP.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | < 2 days per story | Confirms stories are small enough to complete quickly |
| [Integration frequency](../../../reference/metrics/integration-frequency/) | Multiple times per day | Confirms commits are small and frequent |
| [Release frequency](../../../reference/metrics/release-frequency/) | Daily or more | Confirms deploys are routine |
| [Change fail rate](../../../reference/metrics/change-fail-rate/) | Decreasing | Confirms small changes reduce failure risk |

## Next Step

Small batches often require deploying incomplete features to production. [Feature Flags](../feature-flags/) provide the mechanism to do this safely.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
