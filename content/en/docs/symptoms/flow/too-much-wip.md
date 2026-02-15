---
aliases:
  - /docs/symptoms/too-much-wip/
title: "Everything Started, Nothing Finished"
linkTitle: "Everything started, nothing finished"
description: >
  The board shows many items in progress but few reaching done. The team is busy but not delivering.
tags:
  - work-decomposition
  - batch-size
  - team-dynamics
---

## What you are seeing

Open the team's board on any given day. Count the items in progress. Count the team members. If
the first number is significantly higher than the second, the team has a WIP problem. Every
developer is working on a different story. Eight items in progress, zero done. Nothing gets the
focused attention needed to finish.

At the end of the sprint, there is a scramble to close anything. Stories that were "almost done"
for days finally get pushed through. Cycle time is long and unpredictable. The team is busy all
the time but finishes very little.

## Common causes

### Push-Based Work Assignment

When managers assign work to individuals rather than letting the team pull from a prioritized
backlog, each person ends up with their own queue of assigned items. WIP grows because work is
distributed across individuals rather than flowing through the team. Nobody swarms on blocked
items because everyone is busy with "their" assigned work.

**Read more:** [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

### Horizontal Slicing

When work is split by technical layer ("build the database schema," "build the API," "build the
UI"), each layer must be completed before anything is deployable. Multiple developers work on
different layers of the same feature simultaneously, all "in progress," none independently done.
WIP is high because the decomposition prevents any single item from reaching completion quickly.

**Read more:** [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/)

### Unbounded WIP

When the team has no explicit constraint on how many items can be in progress simultaneously,
there is nothing to prevent WIP from growing. Developers start new work whenever they are
blocked, waiting for review, or between tasks. Without a limit, the natural tendency is to stay
busy by starting things rather than finishing them.

**Read more:** [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/)

## How to narrow it down

1. **Does each developer have their own assigned backlog of work?** If yes, the assignment model
   prevents swarming and drives individual queues. Start with
   [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/).
2. **Are work items split by technical layer rather than by user-visible behavior?** If yes,
   items cannot be completed independently. Start with
   [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/).
3. **Is there any explicit limit on how many items can be in progress at once?** If no, the team
   has no mechanism to stop starting and start finishing. Start with
   [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/).
