---
title: "Small Batches"
linkTitle: "Small Batches"
weight: 1
description: >
  Deliver smaller, more frequent changes to reduce risk and increase feedback speed.
---

{{% pageinfo %}}
**Phase 3 - Optimize**

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

**Common objections to deploying more often:**

- **"Incomplete features have no value."** Value is not limited to end-user features. Every deployment provides value to other stakeholders: operations verifies that the change is safe, QA confirms quality gates pass, and the team reduces inventory waste by keeping unintegrated work near zero. A partially built feature deployed behind a flag validates the deployment pipeline and reduces the risk of the final release.
- **"Our customers don't want changes that frequently."** CD is not about shipping user-visible changes every hour. It is about maintaining the ability to deploy at any time. That ability is what lets you ship an emergency fix in minutes instead of days, roll out a security patch without a war room, and support production without heroics.

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

> "If a story is going to take more than a day to complete, it is too big."
>
> - Paul Hammant

This target is not aspirational. Teams that adopt hyper-sprints - iterations as short as 2.5 days - find that the discipline of writing one-day stories forces better decomposition and faster feedback. Teams that make this shift routinely see throughput double, not because people work faster, but because smaller stories flow through the system with less wait time, fewer handoffs, and fewer defects.

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

## ATDD: Connecting Scenarios to Daily Integration

BDD scenarios define *what* to build. Acceptance Test-Driven Development (ATDD) defines *how* to build it in small, integrated steps. The workflow is:

1. **Pick one scenario.** Choose the next Given-When-Then from your story.
2. **Write the acceptance test first.** Automate the scenario so it runs against the real system (or a close approximation). It will fail - this is the RED state.
3. **Write just enough code to pass.** Implement the minimum production code to make the acceptance test pass - the GREEN state.
4. **Refactor.** Clean up the code while the test stays green.
5. **Commit and integrate.** Push to trunk. The pipeline verifies the change.
6. **Repeat.** Pick the next scenario.

Each cycle produces a commit that is independently deployable and verified by an automated test. This is how BDD scenarios translate directly into a stream of small, safe integrations rather than a batch of changes delivered at the end of a story.

**Key benefits:**

- Every commit has a corresponding acceptance test, so you know exactly what it does and that it works.
- You never go more than a few hours without integrating to trunk.
- The acceptance tests accumulate into a regression suite that protects future changes.
- If a commit breaks something, the scope of the change is small enough to diagnose quickly.

## Service-Level Decomposition Example

ATDD works at the API and service level, not just at the UI level. Here is an example of building an order history endpoint day by day:

**Day 1 - Return an empty list for a customer with no orders:**

```gherkin
Scenario: Customer with no order history
  Given a customer with no previous orders
  When I request their order history
  Then I receive an empty list with a 200 status
```

Commit: Implement the endpoint, return an empty JSON array. Acceptance test passes.

**Day 2 - Return a single order with basic fields:**

```gherkin
Scenario: Customer with one completed order
  Given a customer with one completed order for $49.99
  When I request their order history
  Then I receive a list with one order showing the total and status
```

Commit: Query the orders table, serialize basic fields. Previous test still passes.

**Day 3 - Return multiple orders sorted by date:**

```gherkin
Scenario: Orders returned in reverse chronological order
  Given a customer with orders placed on Jan 1, Feb 1, and Mar 1
  When I request their order history
  Then the orders are returned with the Mar 1 order first
```

Commit: Add sorting logic and pagination. All three tests pass.

Each day produces a deployable change. The endpoint is usable (though minimal) after day 1. No day requires more than a few hours of coding because the scope is constrained by a single scenario.

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

### Story Slicing Anti-Patterns

These are common ways teams slice stories that undermine the benefits of small batches:

**Wrong: Slice by layer.**
"Story 1: Build the database. Story 2: Build the API. Story 3: Build the UI."
**Right:** Slice vertically so each story touches all layers and delivers observable behavior.

**Wrong: Slice by activity.**
"Story 1: Design. Story 2: Implement. Story 3: Test."
**Right:** Each story includes all activities needed to deliver and verify one behavior.

**Wrong: Create dependent stories.**
"Story 2 cannot start until Story 1 is finished because it depends on the data model."
**Right:** Each story is independently deployable. Use contracts, feature flags, or stubs to break dependencies between stories.

**Wrong: Lose testability.**
"This story just sets up infrastructure - there is nothing to test yet."
**Right:** Every story has at least one automated test that verifies its behavior. If you cannot write a test, the slice does not deliver observable value.

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
| [Development cycle time](../../../metrics/development-cycle-time/) | < 2 days per story | Confirms stories are small enough to complete quickly |
| [Integration frequency](../../../metrics/integration-frequency/) | Multiple times per day | Confirms commits are small and frequent |
| [Release frequency](../../../metrics/release-frequency/) | Daily or more | Confirms deploys are routine |
| [Change fail rate](../../../metrics/change-fail-rate/) | Decreasing | Confirms small changes reduce failure risk |

## Next Step

Small batches often require deploying incomplete features to production. [Feature Flags](../feature-flags/) provide the mechanism to do this safely.

## Related Content

- [Infrequent Releases](../../../symptoms/deployment/infrequent-releases/) - the symptom of deploying too rarely that small batches directly address
- [Hardening Sprints](../../../symptoms/deployment/hardening-sprints/) - a symptom caused by large batch sizes requiring stabilization periods
- [Monolithic Work Items](../../../anti-patterns/team-workflow/monolithic-work-items/) - the anti-pattern of stories too large to deliver in small increments
- [Horizontal Slicing](../../../anti-patterns/team-workflow/horizontal-slicing/) - the anti-pattern of splitting work by layer instead of by value
- [Work Decomposition](../../foundations/work-decomposition/) - the foundational practice for breaking work into small deliverable pieces
- [Feature Flags](../feature-flags/) - the mechanism that makes deploying incomplete small batches safe
