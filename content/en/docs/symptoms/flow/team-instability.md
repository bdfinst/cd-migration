---
aliases:
  - /docs/symptoms/team-instability/
title: "Team Membership Changes Constantly"
linkTitle: "Team instability"
description: >
  Members are frequently reassigned to other projects. There are no stable working agreements or shared context.
tags:
  - team-dynamics
---

## What you are seeing

The team roster changes every quarter. Engineers are pulled to other projects because they have relevant expertise, or they move to new teams as part of organizational restructuring. New members join but onboarding is informal - there is no written record of how the team works, what decisions were made and why, or what the technical context is.

The [CD](../../glossary/#cd-continuous-delivery) migration effort restarts with every significant roster change. New members bring different mental models and prior experiences. Practices the team adopted with care - [trunk-based development](../../glossary/#tbd-trunk-based-development), [WIP](../../glossary/#wip-work-in-progress) limits, short-lived branches - get questioned by each new cohort who did not experience the problems those practices were designed to solve. The team keeps relitigating settled decisions instead of making progress.

The organizational pattern treats individual contributors as interchangeable resources. An engineer with payment domain expertise can be moved to the infrastructure team because the headcount numbers work out. The cost of that move - lost context, restarted relationships, degraded team performance for months - is invisible to the planning process that made the decision.

## Common causes

### Knowledge silos

When knowledge lives in individuals rather than in team practices, documentation, and code, departures create immediate gaps. The cost of reassignment is higher when the departing person carries critical knowledge that was never externalized. Losing one person does not just reduce capacity by one; it can reduce effective capability by much more if that person was the only one who understood a critical system or practice.

Teams that externalize knowledge into runbooks, architectural decision records, and documented practices distribute the cost of any individual departure. No single person's absence leaves a critical gap. When a new cohort joins, the documented decisions and rationale are already there - the team stops relitigating trunk-based development and WIP limits because the record of why those choices were made is readable, not verbal.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Unbounded WIP

Teams with too much in progress are more likely to have members pulled to other projects, because they appear to have capacity even when they are spread thin. If a developer is working on five things simultaneously, moving them to another project looks like it frees up a resource. The depth of their contribution to each item is invisible to the person making the assignment decision.

WIP limits make the team's actual capacity visible. When each person is focused on one or two things, it is clear that they are fully engaged and that removing them would directly impact those items. The reassignments that have been disrupting the team's CD progress become less frequent because the real cost is finally visible to whoever is making the staffing decision.

**Read more:** [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/)

### Thin-spread teams

When a team's members are already distributed across many responsibilities, any departure creates disproportionate impact. Thin-spread teams have no redundancy to absorb turnover. Each person's departure leaves a hole in a different area of the team's responsibility surface.

Teams with focused, overlapping responsibilities can absorb turnover because multiple people share each area of responsibility. Redundancy is built in rather than assumed to exist. When a member is reassigned, the team's work continues without a collapse in that area - the constant restart cycle that has been stalling the CD migration does not recur with every roster change.

**Read more:** [Thin-spread teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

### Push-Based Work Assignment

When work is assigned by specialty - "you're the database person, so you take the database stories" - knowledge concentrates in individuals rather than spreading across the team. The same person always works the same area, so only they understand it deeply. When that person is reassigned or leaves, no one else can continue their work without starting over. Push-based assignment continuously deepens the knowledge silos that make every roster change more disruptive.

**Read more:** [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

## How to narrow it down

1. **Is critical system knowledge documented or does it live in specific individuals?** If departures create knowledge gaps, the team has knowledge silos regardless of who leaves. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Does the team appear to have capacity because members are spread across many items?** High WIP makes team members look available for reassignment. Start with [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/).
3. **Is each team member the sole owner of a distinct area of the team's work?** If so, any departure leaves an unmanned responsibility. Start with [Thin-spread teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).
4. **Is work assigned by specialty so the same person always works the same area?** If departures leave knowledge gaps in specific parts of the system, assignment by specialty is reinforcing the silos. Start with [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/).

**Ready to fix this?** The most common cause is [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/). Start with its [How to Fix It](../../anti-patterns/team-workflow/knowledge-silos/#how-to-fix-it) section for week-by-week steps.
