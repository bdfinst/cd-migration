---
title: "Work in Progress"
draft: true
linkTitle: "Work in Progress"
weight: 8
description: >
  Number of work items started but not yet completed -- a leading indicator of flow problems, context switching, and delivery delays.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

Work in Progress (WIP) is the total count of work items that have been started but
not yet completed and delivered to production. This includes all types of work:
stories, defects, tasks, spikes, and any other items that a team member has begun
but not finished.

```text
wip = countOf(items where status is between "started" and "done")
```

WIP is a leading indicator from Lean manufacturing. Unlike trailing metrics such as
[Development Cycle Time](../development-cycle-time/) or
[Lead Time](../lead-time/), WIP tells you about problems that are happening right
now. High WIP predicts future delivery delays, increased cycle time, and lower
quality.

Little's Law provides the mathematical relationship:

```text
cycleTime = wip / throughput
```

If throughput (the rate at which items are completed) stays constant, increasing WIP
directly increases cycle time. The only way to reduce cycle time without working
faster is to reduce WIP.

## How to Measure

1. **Count all in-progress items.** At a regular cadence (daily or at each standup),
   count the number of items in any active state on your team's board. Include
   everything between "To Do" and "Done."
2. **Normalize by team size.** Divide WIP by the number of team members to get a
   per-person ratio. This makes the metric comparable across teams of different sizes.
3. **Track over time.** Record the WIP count daily and observe trends. A rising WIP
   count is an early warning of delivery problems.

Data sources:

- **Kanban boards** -- Jira, Azure Boards, Trello, GitHub Projects, or physical
  boards. Count cards in any column between the backlog and done.
- **Issue trackers** -- Query for items with an "In Progress," "In Review,"
  "In QA," or equivalent active status.
- **Manual count** -- At standup, ask: "How many things are we actively working on
  right now?"

The simplest and most effective approach is to make WIP visible by keeping the team
board up to date and counting active items daily.

## Targets

| Level  | WIP per Team                     |
|--------|----------------------------------|
| Low    | More than 2x team size           |
| Medium | Between 1x and 2x team size     |
| High   | Equal to team size               |
| Elite  | Less than team size (ideally half) |

The guiding principle is that WIP should never exceed team size. A team of five
should have at most five items in progress at any time. Elite teams often work
in pairs, bringing WIP to roughly half the team size.

## Common Pitfalls

- **Hiding work.** Not moving items to "In Progress" when working on them keeps
  WIP artificially low. The board must reflect reality. If someone is working on
  it, it should be visible.
- **Marking items done prematurely.** Moving items to "Done" before they are
  deployed to production understates WIP. The Definition of Done must include
  production deployment.
- **Creating micro-tasks.** Splitting a single story into many small tasks
  (development, testing, code review, deployment) and tracking each separately
  inflates the item count without changing the actual work. Measure WIP at the
  story or feature level.
- **Ignoring unplanned work.** Production support, urgent requests, and
  interruptions consume capacity but are often not tracked on the board. If the
  team is spending time on it, it is WIP and should be visible.
- **Setting WIP limits but not enforcing them.** WIP limits only work if the team
  actually stops starting new work when the limit is reached. Treat WIP limits as
  a hard constraint, not a suggestion.

## Connection to CD

WIP is the most actionable flow metric and directly impacts every aspect of
Continuous Delivery:

- **Predicts cycle time.** Per Little's Law, WIP and cycle time are directly
  proportional. Reducing WIP is the fastest way to reduce
  [Development Cycle Time](../development-cycle-time/) without changing anything
  else about the delivery process.
- **Reduces context switching.** When developers juggle multiple items, they lose
  time switching between contexts. Research consistently shows that each additional
  item in progress reduces effective productivity. Low WIP means more focus and
  faster completion.
- **Exposes blockers.** When WIP limits are in place and an item gets blocked, the
  team cannot simply start something new. They must resolve the blocker first. This
  forces the team to address systemic problems rather than working around them.
- **Enables continuous flow.** CD depends on a steady flow of small changes moving
  through the pipeline. High WIP creates irregular, bursty delivery. Low WIP
  creates smooth, predictable flow.
- **Improves quality.** When teams focus on fewer items, each item gets more
  attention. Code reviews happen faster, testing is more thorough, and defects are
  caught sooner. This naturally reduces [Change Fail Rate](../change-fail-rate/).
- **Supports trunk-based development.** High WIP often correlates with many
  long-lived branches. Reducing WIP encourages developers to complete and integrate
  work before starting something new, which aligns with
  [Integration Frequency](../integration-frequency/) goals.

To reduce WIP:

- Set explicit WIP limits for the team and enforce them. Start with a limit equal
  to team size and reduce it over time.
- Prioritize finishing work over starting new work. At standup, ask "What can I
  help finish?" before "What should I start?"
- Prioritize code review and pairing to unblock teammates over picking up new items.
- Make the board visible and accurate. Use it as the single source of truth for
  what the team is working on.
- Identify and address recurring blockers that cause items to stall in progress.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
