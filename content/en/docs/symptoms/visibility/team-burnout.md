---
aliases:
  - /docs/symptoms/team-burnout/
title: "Team Burnout and Unsustainable Pace"
linkTitle: "Burnout and unsustainable pace"
description: >
  The team is exhausted. Every sprint is a crunch sprint. There is no time for learning,
  improvement, or recovery.
tags:
  - team-dynamics
  - process-gates
---

## What you are seeing

The team is always behind. Sprint commitments are missed or met only through overtime. Developers
work evenings and weekends to hit deadlines, then start the next sprint already tired. There is no
buffer for [unplanned work]({{< relref "/docs/reference/glossary#unplanned-work" >}}), so every production incident or stakeholder escalation blows up the
plan.

Nobody has time for learning, experimentation, or process improvement. Suggestions like "let's
improve our test suite" or "let's automate that deployment" are met with "we don't have time."
The irony is that the manual work those improvements would eliminate is part of what keeps the
team too busy.

Attrition risk is high. The most experienced developers leave first because they have options.
Their departure increases the load on whoever remains, accelerating the cycle.

## Common causes

### Thin-Spread Teams

When a small team owns too many products, every developer is stretched across multiple codebases.
Context switching consumes 20 to 40 percent of their capacity. The team looks fully utilized but
delivers less than a focused team half its size. The utilization trap ("keep everyone busy") masks
the real problem: the team has more responsibilities than it can sustain.

**Read more:** [Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}})

### Deadline-Driven Development

When every sprint is driven by an arbitrary deadline, the team never operates at a sustainable
pace. There is no recovery period after a crunch because the next deadline starts immediately.
Quality is the first casualty, which creates rework, which consumes future capacity, which makes
the next deadline even harder to meet. The cycle accelerates until the team collapses.

**Read more:** [Deadline-Driven Development]({{< relref "/docs/anti-patterns/organizational-cultural/planning/deadline-driven-development" >}})

### Unbounded WIP

When there is no limit on [work in progress]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}), the team starts many things and finishes few. Every
developer juggles multiple items, each getting fragmented attention. The sensation of being
constantly busy but never finishing anything is a direct contributor to burnout. The team is
working hard on everything and completing nothing.

**Read more:** [Unbounded WIP]({{< relref "/docs/anti-patterns/team-workflow/unbounded-wip" >}})

### Push-Based Work Assignment

When work is assigned to individuals, asking for help carries a cost: it pulls a teammate away
from their own assigned stories. So developers struggle alone rather than swarming. Workloads are
also uneven because managers cannot precisely predict how long work will take at assignment time.
Some people finish early and wait for reassignment; others are chronically overloaded. The
overloaded developers cannot refuse new assignments without appearing unproductive, so the pace
becomes unsustainable for the people carrying the heaviest loads.

**Read more:** [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}})

### Velocity as Individual Metric

When individual [story points]({{< relref "/docs/reference/glossary#story-points" >}}) are tracked, developers cannot afford to help each other, take time
to learn, or invest in quality. Every hour must produce measurable output. The pressure to perform
individually eliminates the slack that teams need to stay healthy. Helping a teammate, mentoring
a junior developer, or improving a build script all become career risks because they do not
produce points.

**Read more:** [Velocity as Individual Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-individual-metric" >}})

## How to narrow it down

1. **Is the team responsible for more products than it can sustain?** If developers are spread
   across many products with constant context switching, the workload exceeds what the team
   structure can handle. Start with
   [Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}).
2. **Is every sprint driven by an external deadline?** If the team has not had a sprint without
   deadline pressure in months, the pace is unsustainable by design. Start with
   [Deadline-Driven Development]({{< relref "/docs/anti-patterns/organizational-cultural/planning/deadline-driven-development" >}}).
3. **Does the team have more items in progress than team members?** If WIP is unbounded and
   developers juggle multiple items, the team is thrashing rather than delivering. Start with
   [Unbounded WIP]({{< relref "/docs/anti-patterns/team-workflow/unbounded-wip" >}}).
4. **Are individuals measured by story points or velocity?** If developers feel pressure to
   maximize personal output at the expense of collaboration and sustainability, the measurement
   system is contributing to burnout. Start with
   [Velocity as Individual Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-individual-metric" >}}).
5. **Are workloads distributed unevenly, with some people chronically overloaded while others
   wait for new assignments?** If the team cannot self-balance because work is assigned rather
   than pulled, the assignment model is driving the unsustainable pace. Start with
   [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}).

**Ready to fix this?** The most common cause is [Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - High WIP is a direct contributor to burnout
- [Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}}) - Blocked work creates frustration and context switching
- [Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}) - Teams spread across too many responsibilities
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Explicit team norms that protect sustainable pace
- [Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}) - Reducing overload by constraining work in progress
- [Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) - Track WIP as a leading indicator of team health
