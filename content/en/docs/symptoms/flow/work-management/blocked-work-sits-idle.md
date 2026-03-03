---
title: "Blocked Work Sits Idle Instead of Being Picked Up"
linkTitle: "Blocked work sits idle"
description: >
  When a developer is stuck, the item waits with them rather than being picked up by someone else. The team has no mechanism for redistributing blocked work.
tags:
  - team-dynamics
---

## What you are seeing

A developer opens a ticket on Monday and hits a blocker by Tuesday - a missing dependency, an
unclear requirement, an area of the codebase they don't understand well. They flag it in standup.
The item sits in "in progress" for two more days while they work around the blocker or wait for
it to resolve. Nobody picks it up.

The board shows items stuck in the same column for days. Blockers get noted but rarely acted on
by other team members. At sprint review, several items are "almost done" but not finished - each
stalled at a different blocker that a teammate could have resolved quickly.

## Common causes

### Push-Based Work Assignment

When work belongs to an assigned individual, nobody else feels authorized to touch it. Other team
members see the blocked item but do not pick it up because it is "someone else's story." The
assigned developer is expected to resolve their own blockers, even when a teammate could clear
the issue in minutes. The team's norm is individual ownership, so swarming - the highest-value
response to a blocker - never happens.

**Read more:** [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}})

### Knowledge Silos

When only the assigned developer understands the relevant area of the codebase, other team
members cannot help even when they want to. The blocker persists until the assigned person
resolves it because nobody else has the context to take over. Swarming is not possible because
the knowledge needed to continue the work lives in one person.

**Read more:** [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}})

## How to narrow it down

1. **Does the blocked item sit with the assigned developer rather than being picked up by
   someone else?** If teammates see the blocker flagged in standup and do not act on it, the
   norm of individual ownership is preventing swarming. Start with
   [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}).
2. **Could a teammate help if they had more context about that area of the codebase?** If
   knowledge is too concentrated to allow handoff, silos are compounding the problem. Start with
   [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}).

**Ready to fix this?** The most common cause is [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}) - Idle blocked work drives up cycle time
- [Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - Blocked items accumulate as excess WIP
- [Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}) - Knowledge silos worsen when people leave
- [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}) - Assignment model that prevents swarming
- [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}) - Concentrated knowledge that prevents handoff
- [Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}) - WIP limits make blocked items visible and prompt swarming
