---
title: "Some Developers Are Overloaded While Others Wait for Work"
linkTitle: "Uneven workloads"
description: >
  Work is distributed unevenly across the team. Some developers are chronically overloaded while others finish early and wait for new assignments.
tags:
  - team-dynamics
  - work-decomposition
---

## What you are seeing

Sprint planning ends with everyone assigned roughly the same number of [story points](../../glossary/#story-points). By midweek,
two developers have finished their work and are waiting for something new, while three others are
behind and working evenings to catch up. The imbalance repeats every sprint, but the people who
are overloaded shift unpredictably.

At standup, some developers report being blocked or overwhelmed while others report nothing to
do. Managers respond by reassigning work in flight, which disrupts both the giver and the
receiver. The team's throughput is limited by the most overloaded members even when others have
capacity.

## Common causes

### Push-Based Work Assignment

When managers distribute work at sprint planning, they are estimating in advance how long each
item will take and who is the right person for it. Those estimates are routinely wrong. Some
items take twice as long as expected; others finish in half the time. Because work was
pre-assigned, there is no mechanism for the team to self-balance. Fast finishers wait for new
assignments while slow finishers fall behind, regardless of available team capacity.

In a pull system, workloads balance automatically: whoever finishes first pulls the next
highest-priority item. No manager needs to predict durations or redistribute work mid-sprint.

**Read more:** [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

### Thin-Spread Teams

When a team is responsible for too many products or codebases, workload spikes in one area
cannot be absorbed by people working in another. Each developer is already committed to their
domain. The team cannot rebalance because work is siloed by system ownership rather than
flowing to whoever has capacity.

**Read more:** [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

## How to narrow it down

1. **Does work get assigned at sprint planning and rarely change hands afterward?** If
   assignments are fixed at the start of the sprint and the team has no mechanism for
   rebalancing mid-sprint, the assignment model is the root cause. Start with
   [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/).
2. **Are developers unable to help with overloaded areas because they don't know the codebase?**
   If the team cannot rebalance because knowledge is siloed, people are locked into their
   assigned domain even when they have capacity. Start with
   [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/) and
   [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).

**Ready to fix this?** The most common cause is [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/). Start with its [How to Fix It](../../anti-patterns/team-workflow/push-based-work-assignment/#how-to-fix-it) section for week-by-week steps.

---

## Related Content

- [Everything Started, Nothing Finished](../too-much-wip/) - High WIP and uneven workloads reinforce each other
- [Burnout and Unsustainable Pace](../../symptoms/visibility/team-burnout/) - Chronically overloaded developers burn out
- [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/) - Assignment model that prevents self-balancing
- [Limiting WIP](../../migrate-to-cd/migration-path/optimize/limiting-wip/) - Constraints that make imbalance visible
- [Work in Progress](../../metrics/work-in-progress/) - Track per-person WIP to surface imbalance
