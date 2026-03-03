---
title: "Completed Stories Don't Match What Was Needed"
linkTitle: "Completed work misses the intent"
description: >
  Stories are marked done but rejected at review. The developer built what the ticket described, not what the business needed.
tags:
  - team-dynamics
  - work-decomposition
---

## What you are seeing

A developer finishes a story and moves it to done. The product owner reviews it and sends it
back: "This isn't quite what I meant." The implementation is technically correct - it satisfies
the acceptance criteria as written - but it misses the point of the work. The story re-enters
the sprint as rework, consuming time that was not planned for.

This happens repeatedly with the same pattern: the developer built exactly what was described
in the ticket, but the ticket did not capture the underlying need. Stories that seemed clearly
defined come back with significant revisions. The team's velocity looks reasonable but a
meaningful fraction of that work is being done twice.

## Common causes

### Push-Based Work Assignment

When work is assigned rather than pulled, the developer receives a ticket without the context
behind it. They were not in the conversation where the need was identified, the priority was
established, or the trade-offs were discussed. They implement the ticket as written and deliver
something that satisfies the description but not the intent.

In a pull system, developers engage with the backlog before picking up work. Refinement
discussions and Three Amigos sessions happen with the people who will actually do the work, not
with whoever happens to be assigned later. The developer who pulls a story understands why it is
at the top of the backlog and what outcome it is trying to achieve.

**Read more:** [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}})

### Ambiguous Requirements

When acceptance criteria are written as checklists rather than as descriptions of user outcomes,
they can be satisfied without delivering value. A story that specifies "add a confirmation dialog"
can be implemented in a way that technically adds the dialog but makes it unusable. Requirements
that do not express the user's goal leave room for implementations that miss the point.

**Read more:** [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

## How to narrow it down

1. **Did the developer have any interaction with the product owner or user before starting the
   story?** If the developer received only a ticket with no conversation about context or intent,
   the assignment model is isolating them from the information they need. Start with
   [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}).
2. **Are the acceptance criteria expressed as user outcomes or as implementation checklists?**
   If criteria describe what to build rather than what the user should be able to do, the
   requirements do not encode intent. Start with
   [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) and
   look at how stories are written and refined.

**Ready to fix this?** The most common cause is [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - Rework adds unplanned items that inflate WIP
- [Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}) - Rework loops extend cycle time
- [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}) - Assignment without context leads to intent mismatch
- [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - Breaking work into slices with clear, outcome-focused acceptance criteria
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Team norms for refinement and Three Amigos sessions
