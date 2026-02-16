---
aliases:
  - /docs/symptoms/work-items-take-too-long/
title: "Work Items Take Days or Weeks to Complete"
linkTitle: "Work items take too long"
description: >
  Stories regularly take more than a week from start to done. Developers go days without integrating.
tags:
  - work-decomposition
  - batch-size
---

## What you are seeing

A developer picks up a work item on Monday. By Wednesday, they are still working on it. By
Friday, it is "almost done." The following Monday, they are fixing edge cases. The item finally
moves to review mid-week as a 300-line pull request that the reviewer does not have time to look
at carefully.

Cycle time is measured in weeks, not days. The team commits to work at the start of the sprint
and scrambles at the end. Estimates are off by a factor of two because large items hide unknowns
that only surface mid-implementation.

## Common causes

### Horizontal Slicing

When work is split by technical layer rather than by user-visible behavior, each item spans an
entire layer and takes days to complete. "Build the database schema," "build the API," "build the
UI" are each multi-day items. Nothing is deployable until all layers are done. Vertical slicing
(cutting thin slices through all layers to deliver complete functionality) produces items that
can be finished in one to two days.

**Read more:** [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/)

### Monolithic Work Items

When the team takes requirements as they arrive without breaking them into smaller pieces, work
items are as large as the feature they describe. A ticket titled "Add user profile page" hides
a login form, avatar upload, email verification, notification preferences, and password reset.
Without a decomposition practice during refinement, items arrive at planning already too large
to flow.

**Read more:** [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/)

### Long-Lived Feature Branches

When developers work on branches for days or weeks, the branch and the work item are the same
size: large. The branching model reinforces large items because there is no integration pressure
to finish quickly. Trunk-based development creates natural pressure to keep items small enough to
integrate daily.

**Read more:** [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)

## How to narrow it down

1. **Are work items split by technical layer?** If the board shows items like "backend for
   feature X" and "frontend for feature X," the decomposition is horizontal. Start with
   [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/).
2. **Do items arrive at planning without being broken down?** If items go from "product owner
   describes a feature" to "developer starts coding" without a decomposition step, start with
   [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/).
3. **Do developers work on branches for more than a day?** If yes, the branching model allows
   and encourages large items. Start with
   [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/).

---

## Related Content

- [Everything Started, Nothing Finished](../too-much-wip/) - High WIP and long cycle times reinforce each other
- [Merging Is Painful and Time-Consuming](../painful-merges/) - Long-lived work creates merge pain that further slows delivery
- [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/) - Stories too large to finish quickly
- [Work Decomposition](../../migrate-to-cd/migration-path/foundations/work-decomposition/) - Breaking work into small, deliverable slices
- [Development Cycle Time](../../metrics/development-cycle-time/) - Measure time from first commit to deployable
