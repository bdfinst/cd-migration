---
aliases:
  - /docs/symptoms/meaningless-retrospectives/
title: "Retrospectives Produce No Real Change"
linkTitle: "Meaningless retrospectives"
description: >
  The same problems surface every sprint. Action items are never completed. The team has stopped believing improvement is possible.
tags:
  - team-dynamics
---

## What you are seeing

The same themes come up every sprint: too much interruption, unclear requirements, flaky tests, blocked items. The retrospective runs every two weeks. Action items are assigned. Two weeks later, none of them were completed because sprint work took priority. The same themes come up again. Someone adds them to the growing backlog of process improvements.

The team goes through the motions because the meeting is scheduled, not because they believe it will produce change. Participation is minimal. The facilitator works harder each time to generate engagement. The conversation stays surface-level because raising real problems feels pointless - nothing changes anyway.

The dysfunction runs deeper than meeting format. There is no capacity allocated for improvement work. Every sprint is 100% allocated to feature delivery. Action items that require real investment - automated deployment, test infrastructure, architectural cleanup - compete for time against items with committed due dates. The outcome is predetermined: features win.

## Common causes

### Unbounded WIP

When the team has more [work in progress](../../glossary/#wip-work-in-progress) than capacity, every sprint has no slack. Action items from retrospectives require slack to complete. Without slack, improvement work is always displaced by feature work. The team is too busy to get less busy.

Creating and protecting capacity for improvement work is the prerequisite for retrospectives to produce change. Teams that allocate a fixed percentage of each sprint to improvement work - and defend it against feature pressure - actually complete their retrospective action items.

**Read more:** [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/)

### Push-based work assignment

When work is assigned to the team from outside, the team has no authority over their own capacity allocation. They cannot protect time for improvement work because the queue is filled by someone else. Even if the team agrees in the retrospective that test automation is the priority, the next sprint's work arrives already planned with no room for it.

Teams that pull work from a prioritized backlog and control their own capacity can make and honor commitments to improvement work. The retrospective can produce action items that the team has the authority to complete.

**Read more:** [Push-based work assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

### Deadline-driven development

When management drives to fixed deadlines, all available capacity goes toward meeting the deadline. Improvement work that does not advance the deadline has no chance. The retrospective can surface the same problems indefinitely, but if the team has no capacity to address them and no organizational support to get that capacity, improvement is structurally impossible.

**Read more:** [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/)

## How to narrow it down

1. **Are retrospective action items ever completed?** If not, capacity is the first issue to examine. Start with [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/).
2. **Does the team control how their sprint capacity is allocated?** If improvement work must compete against externally assigned feature work, the team lacks the authority to act on retrospective outcomes. Start with [Push-based work assignment](../../anti-patterns/team-workflow/push-based-work-assignment/).
3. **Is the team under sustained deadline pressure with no slack?** If the team is always in crunch, improvement work has no room regardless of capacity or authority. Start with [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/).

**Ready to fix this?** The most common cause is [Unbounded WIP](../../anti-patterns/team-workflow/unbounded-wip/). Start with its [How to Fix It](../../anti-patterns/team-workflow/unbounded-wip/#how-to-fix-it) section for week-by-week steps.
