---
title: "Work Items Too Large"
linkTitle: "Work Items Too Large"
weight: 28
description: >
  Work items regularly take more than a week. Developers work on a single item for days
  without integrating.
---

## What This Looks Like

A developer picks up a work item on Monday. By Wednesday, they are still working on it. By Friday,
it is "almost done." The following Monday, they are fixing edge cases. The item finally moves to
review mid-week - a 300-line pull request that the reviewer does not have time to look at
carefully.

Common variations:

- **The week-long item.** Work items routinely take five or more days. Developers work on a single
  item for an entire sprint without integrating to trunk. The branch diverges further every day.
- **The "it's really just one thing" item.** A ticket titled "Add user profile page" hides a
  login form, avatar upload, email verification, notification preferences, and password reset.
  It looks like one feature to the product owner. It is six features to the developer.
- **The point-inflated item.** The team estimates work at 8 or 13 points. Nobody questions
  whether an 8-point item should be decomposed. High estimates are treated as a property of the
  work rather than a signal that the work is too big.
- **The "spike that became a feature."** A time-boxed investigation turns into an implementation.
  The developer keeps going because they have momentum, and the result is a large, unreviewed
  change that was never planned or decomposed.
- **The horizontal slice.** Work is split by technical layer: "build the database schema,"
  "build the API," "build the UI." Each item takes days because it spans the entire layer.
  Nothing is deployable until all three are done.

The telltale sign: look at the team's cycle time distribution. If work items regularly take five
or more days from start to done, the items are too large.

## Why This Is a Problem

Large work items are not just slow. They are a compounding force that makes every other part of
the delivery process worse.

### They prevent daily integration

Trunk-based development requires integrating to trunk at least once per day. A work item that
takes a week to complete cannot be integrated daily unless it is decomposed into smaller pieces
that are each independently integrable. Most teams with large work items do not decompose them -
they work on a branch for the full duration and merge at the end.

This means a week of work is invisible to the rest of the team until it lands as a single large
merge. A week of assumptions go untested against the real state of trunk. A week of potential
merge conflicts accumulate silently.

When work items are small enough to complete in one to two days, each item is a natural
integration point. The developer finishes the item, integrates to trunk, and the change is
tested, reviewed, and deployed before the next item begins.

### They make estimation meaningless

Large work items hide unknowns. An item estimated at 8 points might take three days or three
weeks depending on what the developer discovers along the way. The estimate is a guess wrapped in
false precision.

This makes planning unreliable. The team commits to a set of large items, discovers mid-sprint
that one of them is twice as big as expected, and scrambles at the end. The retrospective
identifies "estimation accuracy" as the problem, but the real problem is that the items were too
big to estimate accurately in the first place.

Small work items are inherently more predictable. An item that takes one to two days has a narrow
range of uncertainty. Even if the estimate is off, it is off by hours, not weeks. Plans built
from small items are more reliable because the variance of each item is small.

### They increase rework

A developer working on a large item makes dozens of decisions over several days: architectural
choices, naming conventions, error handling approaches, API contracts. These decisions are made in
isolation. Nobody sees them until the code review, which happens after all the work is done.

When the reviewer disagrees with a fundamental decision made on day one, the developer has built
five days of work on top of it. The rework cost is enormous. They either rewrite large portions
of the code or the team accepts a suboptimal decision because the cost of changing it is too high.

With small items, decisions surface quickly. A one-day item produces a small pull request that is
reviewed within hours. If the reviewer disagrees with an approach, the cost of changing it is a
few hours of work, not a week. Fundamental design problems are caught early, before layers of
code are built on top of them.

### They hide risk until the end

A large work item carries risk that is invisible until late in its lifecycle. The developer might
discover on day four that the chosen approach does not work, that an API they depend on behaves
differently than documented, or that the database cannot handle the query pattern they assumed.

When this discovery happens on day four of a five-day item, the options are bad: rush a fix, cut
scope, or miss the sprint commitment. The team had no visibility into the risk because the work
was a single opaque block on the board.

Small items surface risk early. If the approach does not work, the team discovers it on day one
of a one-day item. The cost of changing direction is minimal. The risk is contained to a small
unit of work rather than spreading across an entire feature.

### Impact on continuous delivery

Continuous delivery is built on small, frequent, low-risk changes flowing through the pipeline.
Large work items produce the opposite: infrequent, high-risk changes that batch up in branches
and land as large merges.

A team with five developers working on five large items has zero deployable changes for days at a
time. Then several large changes land at once, the pipeline is busy for hours, and conflicts
between the changes create unexpected failures. This is batch-and-queue delivery wearing agile
clothing.

The feedback loop is broken too. A small change deployed to production gives immediate signal:
does the change work? Does it affect performance? Do users behave as expected? A large change
deployed after a week gives noisy signal: something changed, but which of the fifty modifications
caused the issue?

## How to Fix It

### Step 1: Establish the 2-day rule (Week 1)

Agree as a team: **no work item should take longer than two days from start to integrated on
trunk.**

This is not a velocity target. It is a constraint on item size. If an item cannot be completed
in two days, it must be decomposed before it is pulled into the sprint.

Write this as a working agreement and enforce it during planning. When someone estimates an item
at more than two days, the response is "how do we split this?" - not "who can do it faster?"

### Step 2: Learn vertical slicing (Week 2)

The most common decomposition mistake is horizontal slicing - splitting by technical layer instead
of by user-visible behavior. Train the team on vertical slicing:

**Horizontal (avoid):**

| Work item | Deployable? | Testable end-to-end? |
|-----------|------------|---------------------|
| Build the database schema for orders | No | No |
| Build the API for orders | No | No |
| Build the UI for orders | Only after all three are done | Only after all three are done |

**Vertical (prefer):**

| Work item | Deployable? | Testable end-to-end? |
|-----------|------------|---------------------|
| User can create a basic order (DB + API + UI) | Yes | Yes |
| User can add a discount to an order | Yes | Yes |
| User can view order history | Yes | Yes |

Each vertical slice cuts through all layers to deliver a thin piece of complete functionality.
Each is independently deployable and testable. Each gives feedback before the next slice begins.

### Step 3: Use acceptance criteria as a splitting signal (Week 2+)

Count the acceptance criteria on each work item. If an item has more than three to five acceptance
criteria, it is probably too big. Each criterion or small group of criteria can become its own
item.

Write acceptance criteria in concrete Given-When-Then format. Each scenario is a natural
decomposition boundary:

```gherkin
Scenario: Apply percentage discount
  Given a cart with items totaling $100
  When I apply a 10% discount code
  Then the cart total should be $90

Scenario: Reject expired discount code
  Given a cart with items totaling $100
  When I apply an expired discount code
  Then the cart total should remain $100
```

Each scenario can be implemented, integrated, and deployed independently.

### Step 4: Decompose during refinement, not during the sprint (Week 3+)

Work items should arrive at planning already decomposed. If the team is splitting items
mid-sprint, refinement is not doing its job.

During backlog refinement:

1. Product owner presents the feature or outcome.
2. Team discusses the scope and writes acceptance criteria.
3. If the item has more than three to five criteria, split it immediately.
4. Each resulting item is estimated. Any item over two days is split again.
5. Items enter the sprint already small enough to flow.

### Step 5: Address the objections

| Objection | Response |
|-----------|----------|
| "Splitting creates too many items to manage" | Small items are easier to manage, not harder. They have clear scope, predictable timelines, and simple reviews. The overhead per item should be near zero. If it is not, simplify your process. |
| "Some things can't be done in two days" | Almost anything can be decomposed further. Database migrations can be done in backward-compatible steps. UI changes can be hidden behind feature flags. The skill is finding the decomposition, not deciding whether one exists. |
| "We'll lose the big picture if we split too much" | The epic or feature still exists as an organizing concept. Small items are not independent fragments - they are ordered steps toward a defined outcome. Use an epic to track the overall feature and individual items to track the increments. |
| "Product doesn't want partial features" | Feature flags let you deploy incomplete features without exposing them to users. The code is integrated and tested continuously, but the user-facing feature is toggled on only when all slices are done. |
| "Our estimates are fine, items just take longer than expected" | That is the definition of items being too big. Small items have narrow estimation variance. If a one-day item takes two days, you are off by a day. If a five-day item takes ten, you have lost a sprint. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Item cycle time | Should be two days or less from start to trunk |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should decrease as items get smaller |
| Items completed per week | Should increase even if total output stays the same |
| [Integration frequency](../../../reference/metrics/integration-frequency/) | Should increase as developers integrate completed items daily |
| Items that exceed the 2-day rule | Track violations and discuss in retrospectives |
| [Work in progress](../../../reference/metrics/work-in-progress/) | Should decrease as smaller items flow through faster |

## Related Content

- [Work Decomposition](../../../migration-path/foundations/work-decomposition/) - The practice guide for breaking work into small increments
- [Small Batches](../../../migration-path/optimize/small-batches/) - Batch size reduction at every level, from stories to commits to deploys
- [Too Much Work in Progress](../too-much-wip/) - Large items inflate WIP because they occupy a slot for days
- [PR Review Bottlenecks](../pr-review-bottlenecks/) - Large items produce large PRs that reviewers avoid
- [Trunk-Based Development](../../../migration-path/foundations/trunk-based-development/) - Daily integration requires items small enough to finish in a day or two
