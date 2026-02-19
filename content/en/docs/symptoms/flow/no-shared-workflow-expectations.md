---
aliases:
  - /docs/symptoms/no-shared-workflow-expectations/
title: "The Team Has No Shared Agreements About How to Work"
linkTitle: "No shared workflow expectations"
description: >
  No explicit agreements on branch lifetime, review turnaround, WIP limits, or coding standards. Everyone does their own thing.
tags:
  - team-dynamics
  - integration-frequency
---

## What you are seeing

Half the team uses feature branches; half commit directly to main. Some developers expect code reviews to happen within a few hours; others consider three days fast. Some engineers put every change through a full review; others self-merge small fixes. The WIP limit is nominally three items per person but nobody enforces it and most people carry five or six.

These inconsistencies create friction that is hard to name. Pull requests sit because there is no shared expectation for turnaround. Work items age because there is no agreement about WIP limits. Code quality varies because there is no agreement about review standards. The team functions, but at a lower level of coordination than it could with explicit norms.

The problem compounds as the team grows or becomes more distributed. A two-person co-located team can operate on implicit norms that emerge from constant communication. A six-person distributed team cannot. Without explicit agreements, each person operates on different mental models formed by prior team experiences.

## Common causes

### Push-based work assignment

When work is assigned to individuals by a manager or lead, team members operate as independent contributors rather than as a team managing flow together. Shared workflow norms only emerge meaningfully when the team experiences work as a shared responsibility - when they pull from a common queue, track shared flow metrics, and collectively own the delivery outcome.

Teams that pull work from a shared backlog develop shared norms because they need those norms to function - without agreement on review turnaround and WIP limits, pulling from the same queue becomes chaotic. When work is individually assigned, each person optimizes for their assigned items, not for team flow, and the shared agreements never form.

**Read more:** [Push-based work assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

### Unbounded WIP

When there are no WIP limits, every norm around flow is implicitly optional. If work can always be added without limit, discipline around individual items erodes. "I'll review that PR later" is always a reasonable response when there is always more work competing for attention.

WIP limits create the conditions where norms matter. When the team is committed to a WIP limit, review turnaround, merge cadence, and integration frequency become practical necessities rather than theoretical preferences.

**Read more:** [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/)

### Thin-spread teams

Teams spread across many responsibilities often lack the continuous interaction needed to develop and maintain shared norms. Each member is operating in a different context, interacting with different parts of the codebase, working with different constraints. Common ground for shared agreements is harder to establish when everyone's daily experience is different.

**Read more:** [Thin-spread teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

## How to narrow it down

1. **Does the team have written working agreements that everyone follows?** If agreements are verbal or assumed, they will diverge under pressure. The absence of written agreements is the starting point.
2. **Do team members pull from a shared queue or receive individual assignments?** Individual assignment reduces team-level flow ownership. Start with [Push-based work assignment](../../anti-patterns/team-workflow/push-based-work-assignment/).
3. **Does the team enforce WIP limits?** Without enforced limits, work accumulates until norms break down. Start with [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/).
