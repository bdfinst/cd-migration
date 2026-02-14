---
title: "No WIP Limits"
linkTitle: "No WIP Limits"
weight: 31
category: "Team Workflow"
risk_level: high
description: >
  The team has no constraint on how many items can be in progress at once. Work accumulates
  because there is nothing to stop starting and force finishing.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The team's board has no column limits. Developers pull new items whenever they feel ready -
when they are blocked, waiting for review, or simply between tasks. Nobody stops to ask whether
the team already has too much in flight. The number of items in progress grows without anyone
noticing because there is no signal that says "stop starting, start finishing."

Common variations:

- **The infinite in-progress column.** The board's "In Progress" column has no limit. It expands
  to hold whatever the team starts. Items accumulate until the sprint ends and the team scrambles
  to close them.
- **The per-person queue.** Each developer maintains their own backlog of two or three items,
  cycling between them when blocked. The team's total WIP is the sum of every individual's
  buffer, which nobody tracks.
- **The implicit multitasking norm.** The team believes that working on multiple things
  simultaneously is productive. Starting something new while waiting on a dependency is seen as
  efficient rather than wasteful.

The telltale sign: nobody on the team can say what the WIP limit is, because there is not one.

## Why This Is a Problem

Without an explicit WIP constraint, there is no mechanism to expose bottlenecks, force
collaboration, or keep cycle times short.

### It reduces quality

When developers juggle multiple items, each item gets fragmented attention. A developer working
on three things is not three times as productive - they are one-third as focused on each. Code
written in fragments between context switches contains more defects because the developer cannot
hold the full mental model of any single item.

Teams with WIP limits focus deeply on fewer items. Each item gets sustained attention from start
to finish. The code is more coherent, reviews are smoother, and defects are fewer because the
developer maintained full context throughout.

### It increases rework

High WIP causes items to age. A story that sits at 80% done for three days while the developer
works on something else requires context rebuilding when they return. They re-read the code,
re-examine the requirements, and sometimes re-do work because they forgot where they left off.

Worse, items that age in progress accumulate integration conflicts. The longer an item sits
unfinished, the more trunk diverges from its branch. Merge conflicts at the end mean rework that
would not have happened if the item had been finished quickly.

### It makes delivery timelines unpredictable

Little's Law is a mathematical relationship: cycle time equals work in progress divided by
throughput. If throughput is roughly constant, the only way to reduce cycle time is to reduce
WIP. A team with no WIP limit has no control over cycle time. Items take as long as they take
because nothing constrains the queue.

When leadership asks "when will this be done?" the team cannot give a reliable answer because
their cycle time varies wildly based on how many items happen to be in flight.

### Impact on continuous delivery

CD requires a steady flow of small, finished changes moving through the pipeline. Without WIP
limits, the team produces a wide river of unfinished changes that block each other, accumulate
merge conflicts, and stall in review queues. The pipeline is either idle (nothing is done) or
overwhelmed (everything lands at once).

WIP limits create the flow that CD depends on: a small number of items moving quickly from start
to production, each fully attended to, each integrated before the next begins.

## How to Fix It

### Step 1: Make WIP visible (Week 1)

Count every item currently in progress for the team, including hidden work like production bugs,
support questions, and unofficial side projects. Write this number on the board. Update it daily.
The goal is awareness, not action.

### Step 2: Set an initial WIP limit (Week 2)

Start with N+2, where N is the number of developers. For a team of five, set the limit at seven.
Add the limit to the board as a column constraint. Agree as a team: when the limit is reached,
nobody starts new work. Instead, they help finish something already in progress.

### Step 3: Enforce with swarming (Week 3+)

When the WIP limit is hit, developers who finish an item have two choices: pull the next
highest-priority item if WIP is below the limit, or swarm on an existing item if WIP is at the
limit. Swarming means pairing, reviewing, testing, or unblocking - whatever helps the most
important item finish.

### Step 4: Lower the limit over time (Monthly)

Each month, consider reducing the limit by one. Each reduction exposes constraints that excess
WIP was hiding - slow reviews, environment contention, unclear requirements. Fix those
constraints, then lower again.

| Objection | Response |
|-----------|----------|
| "I'll be idle if I can't start new work" | Idle hands are not the problem - idle work is. Help finish something instead of starting something new. |
| "Management will think we're not working" | Track cycle time and throughput. Both improve with lower WIP. The data speaks for itself. |
| "We have too many priorities to limit WIP" | Having many priorities is exactly why you need a limit. Without one, nothing gets the focus needed to finish. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Work in progress](../../../reference/metrics/work-in-progress/) | Should stay at or below the team's limit |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should decrease as WIP drops |
| Items completed per week | Should stabilize or increase despite starting fewer |
| Time items spend blocked | Should decrease as the team swarms on blockers |

## Related Content

- [Limiting WIP](../../../migrate-to-cd/migration-path/optimize/limiting-wip/) - The practice guide for implementing WIP limits
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - Reducing batch size reinforces low WIP
- [Push-Based Work Assignment](../push-based-work-assignment/) - Push assignment and missing WIP limits are mutually reinforcing
