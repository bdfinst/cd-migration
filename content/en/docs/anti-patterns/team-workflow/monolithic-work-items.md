---
title: "Monolithic Work Items"
linkTitle: "Monolithic Work Items"
weight: 29
category: "Team Workflow"
risk_level: high
description: >
  Work items go from product request to developer without being broken into smaller pieces.
  Items are as large as the feature they describe.
tags:
  - work-decomposition
  - batch-size
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The product owner describes a feature. The team discusses it briefly. Someone creates a ticket
with the feature title - "Add user profile page" - and it goes into the backlog. When a
developer pulls it, they discover it involves a login form, avatar upload, email verification,
notification preferences, and password reset. The ticket is one item. The work is six items.

Common variations:

- **The feature-as-ticket.** Every work item maps to a user-facing feature. There is no
  breakdown step between "product wants this" and "developer builds this." Items are estimated
  at 8 or 13 points without anyone questioning whether they should be decomposed.
- **The spike that became a feature.** A time-boxed investigation turns into an implementation
  because the developer has momentum. The result is a large, unplanned change that was never
  decomposed or estimated.
- **The acceptance criteria dump.** A single ticket has 10 or more acceptance criteria. Each
  criterion is an independent behavior that could be its own item, but nobody splits them
  because the feature "makes sense as a whole."
- **The refinement skip.** The team does not have a regular refinement practice, or refinement
  consists of estimation without decomposition. Items enter the sprint at whatever size the
  product owner wrote them.

The telltale sign: items regularly take five or more days from start to done, and the team treats
this as normal.

## Why This Is a Problem

Without decomposition, work items are too large to flow through the delivery system efficiently.
Every downstream practice - integration, review, testing, deployment - suffers.

### It reduces quality

Large items hide unknowns. A developer makes dozens of decisions over several days in isolation.
Nobody sees those decisions until the code review, which happens after all the work is done. When
the reviewer disagrees with a choice made on day one, five days of work are built on top of it.
The team either rewrites or accepts a suboptimal decision because the cost of changing it is too
high.

Small items surface decisions quickly. A one-day item produces a small PR that is reviewed within
hours. Fundamental design problems are caught early, before layers of code are built on top.

### It increases rework

Large items create large pull requests. Large PRs get superficial reviews because reviewers do
not have time to review 300 lines carefully. Defects that a thorough review would catch slip
through. The defects are discovered later - in testing, in production, or by the next developer
who touches the code - and the fix costs more than it would have if the work had been reviewed in
small increments.

### It makes delivery timelines unpredictable

A large item estimated at five days might take three days or three weeks depending on what the
developer discovers along the way. The estimate is a guess. Plans built on large items are
unreliable because the variance of each item is high.

Small items have narrow estimation variance. Even if the estimate is off, it is off by hours, not
weeks.

### Impact on continuous delivery

CD requires small, frequent changes flowing through the pipeline. Large work items produce the
opposite: infrequent, high-risk changes that batch up in branches and land as large merges. A
team working on five large items has zero deployable changes for days at a time.

Work decomposition is the practice that creates the small units of work that CD needs to flow.

## How to Fix It

### Step 1: Establish the 2-day rule (Week 1)

Agree as a team: no work item should take longer than two days from start to integrated on
trunk. This is a constraint on item size, not a velocity target. When an item cannot be completed
in two days, decompose it before pulling it into the sprint.

### Step 2: Decompose during refinement (Week 2)

Build decomposition into the refinement process:

1. Product owner presents the feature or outcome.
2. Team writes acceptance criteria in Given-When-Then format.
3. If the item has more than three to five criteria, split it.
4. Each resulting item is estimated. Any item over two days is split again.
5. Items enter the sprint already small enough to flow.

### Step 3: Use acceptance criteria as splitting boundaries (Week 2+)

Each acceptance criterion or small group of criteria is a natural decomposition boundary:

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

### Step 4: Combine with vertical slicing (Week 3+)

Decomposition and vertical slicing work together. Decomposition breaks features into small
pieces. Vertical slicing ensures each piece cuts through all technical layers to deliver complete
functionality. A decomposed, vertically sliced item is independently deployable and testable.

| Objection | Response |
|-----------|----------|
| "Splitting creates too many items" | Small items are easier to manage. They have clear scope, predictable timelines, and simple reviews. |
| "Some things can't be done in two days" | Almost anything can be decomposed further. Database migrations can be backward-compatible steps. UI changes can hide behind feature flags. |
| "Product doesn't want partial features" | Feature flags let you deploy incomplete features without exposing them. The code is integrated continuously, but the feature is toggled on when all slices are done. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Item cycle time | Should be two days or less from start to trunk |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as items get smaller |
| Items completed per week | Should increase |
| [Integration frequency](../../../metrics/integration-frequency/) | Should increase as developers integrate daily |

## Related Content

- [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/) - The practice guide for breaking work into small increments
- [Horizontal Slicing](../horizontal-slicing/) - Decomposition without vertical slicing still produces items that cannot flow independently
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - Batch size reduction at every level
