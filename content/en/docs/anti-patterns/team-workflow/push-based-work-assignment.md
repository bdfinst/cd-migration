---
title: "Push-Based Work Assignment"
linkTitle: "Push-Based Work Assignment"
weight: 104
category: "Team Workflow"
risk_level: high
description: >
  Work is assigned to individuals by a manager or lead instead of team members pulling the next
  highest-priority item.
tags:
  - team-dynamics
  - work-decomposition
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A manager, tech lead, or project manager decides who works on what. Assignments happen during
sprint planning, in one-on-ones, or through tickets pre-assigned before the sprint starts. Each
team member has "their" stories for the sprint. The assignment is rarely questioned.

Common variations:

- **Assignment by specialty.** "You're the database person, so you take the database stories." Work
  is routed by perceived expertise rather than team priority.
- **Assignment by availability.** A manager looks at who is "free" and assigns the next item from
  the backlog, regardless of what the team needs finished.
- **Assignment by seniority.** Senior developers get the interesting or high-priority work. Junior
  developers get what's left.
- **Pre-loaded sprints.** Every team member enters the sprint with their work already assigned. The
  sprint board is fully allocated on day one.

The telltale sign: if you ask a developer "what should you work on next?" and the answer is "I
don't know, I need to ask my manager," work is being pushed.

## Why This Is a Problem

Push-based assignment is one of the most quietly destructive practices a team can have. It
undermines nearly every [CD](../../glossary/#cd-continuous-delivery) practice by breaking the connection between the team and the flow of
work. Each of its effects compounds the others.

### It reduces quality

Push assignment makes code review feel like a distraction from "my stories." When every developer
has their own assigned work, reviewing someone else's pull request is time spent not making progress
on your own assignment. Reviews sit for hours or days because the reviewer is busy with their own
work. The same dynamic discourages pairing: spending an hour helping a colleague means falling
behind on your own assignments, so developers don't offer and don't ask.

This means fewer eyes on every change. Defects that a second person would catch in minutes survive
into production. Knowledge stays siloed because there is no reason to look at code outside your
assignment. The team's collective understanding of the codebase narrows over time.

In a pull system, reviewing code and unblocking teammates are the highest-priority activities
because finishing the team's work is everyone's work. Reviews happen quickly because they are not
competing with "my stories" - they are the work. Pairing happens naturally because anyone might
pick up any story, and asking for help is how the team moves its highest-priority item forward.

### It increases rework

Push assignment routes work by specialty: "You're the database person, so you take the database
stories." This creates knowledge silos where only one person understands a part of the system.
When the same person always works on the same area, mistakes go unreviewed by anyone with a fresh
perspective. Assumptions go unchallenged because the reviewer lacks context to question them.

Misinterpretation of requirements also increases. The assigned developer may not have context on why
a story is high priority or what business outcome it serves - they received it as an assignment, not
as a problem to solve. When the result doesn't match what was needed, the story comes back for
rework.

In a pull system, anyone might pick up any story, so knowledge spreads across the team. Fresh eyes
catch assumptions that a domain expert would miss. Developers who pull a story engage with its
priority and purpose because they chose it from the top of the backlog. Rework drops because more
perspectives are involved earlier.

### It makes delivery timelines unpredictable

Push assignment optimizes for utilization - keeping everyone busy - not for flow - getting things
done. Every developer has their own assigned work, so team [WIP](../../glossary/#wip-work-in-progress) is the sum of all individual
assignments. There is no mechanism to say "we have too much in progress, let's finish something
first." WIP limits become meaningless when the person assigning work doesn't see the full picture.

Bottlenecks are invisible because the manager assigns around them instead of surfacing them. If one
area of the system is a [constraint](../../glossary/#constraint), the assigner may not notice because they are looking at people,
not flow. In a pull system, the bottleneck becomes obvious: work piles up in one column and nobody
pulls it because the downstream step is full.

Workloads are uneven because managers cannot perfectly predict how long work will take. Some people
finish early and sit idle or start low-priority work, while others are overloaded. Feedback loops
are slow because the order of work is decided at sprint planning; if priorities change mid-sprint,
the manager must reassign. Throughput becomes erratic - some sprints deliver a lot, others very
little, with no clear pattern.

In a pull system, workloads self-balance: whoever finishes first pulls the next item. Bottlenecks
are visible. WIP limits actually work because the team collectively decides what to start. The team
automatically adapts to priority changes because the next person who finishes simply pulls whatever
is now most important.

### It removes team ownership

Pull systems create shared ownership of the backlog. The team collectively cares about the priority
order because they are collectively responsible for finishing work. Push systems create individual
ownership: "that's not my story." When a developer finishes their assigned work, they wait for more
assignments instead of looking at what the team needs.

This extends beyond task selection. In a push system, developers stop thinking about the team's
goals and start thinking about their own assignments. Swarming - multiple people collaborating to
finish the highest-priority item - is impossible when everyone "has their own stuff." If a story is
stuck, the assigned developer struggles alone while teammates work on their own assignments.

The unavailability problem makes this worse. When each person works in isolation on "their" stories,
the rest of the team has no context on what that person is doing, how the work is structured, or
what decisions have been made. If the assigned person is out sick, on vacation, or leaves the
company, nobody can pick up where they left off. The work either stalls until that person returns or
another developer starts over - rereading requirements, reverse-engineering half-finished code, and
rediscovering decisions that were never shared. In a pull system, the team maintains context on
in-progress work because anyone might have pulled it, standups focus on the work rather than
individual status, and pairing spreads knowledge continuously. When someone is unavailable, the
next person simply picks up the item with enough shared context to continue.

### Impact on continuous delivery

Continuous delivery depends on a steady, predictable flow of small changes through the [pipeline](../../glossary/#pipeline).
Push-based assignment produces the opposite: batch-based assignment at sprint planning, uneven
bursts of activity as different developers finish at different times, blocked work sitting idle
because the assigned person is busy with something else, and no team-level mechanism for optimizing
throughput. You cannot build a continuous flow of work when the assignment model is batch-based and
individually scoped.

## How to Fix It

### Step 1: Order the backlog by priority (Week 1)

Before switching to a pull model, the backlog must have a clear priority order. Without it,
developers will not know what to pull next.

- Work with the product owner to stack-rank the backlog. Every item has a unique position - no
  tied priorities.
- Make the priority visible. The top of the board or backlog is the most important item. There
  is no ambiguity.
- Agree as a team: when you need work, you pull from the top.

### Step 2: Stop pre-assigning work in sprint planning (Week 2)

Change the sprint planning conversation. Instead of "who takes this story," the team:

1. Pulls items from the top of the prioritized backlog into the sprint.
2. Discusses each item enough for anyone on the team to start it.
3. Leaves all items **unassigned**.

The sprint begins with a list of prioritized work and no assignments. This will feel uncomfortable
for the first sprint.

### Step 3: Pull work daily (Week 2+)

At the daily standup (or anytime during the day), a developer who needs work:

1. Looks at the sprint board.
2. Checks if any in-progress item needs help (swarm first, pull second).
3. If nothing needs help and the WIP limit allows, pulls the top unassigned item and assigns
   themselves.

The developer picks up the highest-priority available item, not the item that matches their
specialty. This is intentional - it spreads knowledge, reduces bus factor, and keeps the team
focused on priority rather than comfort.

### Step 4: Address the discomfort (Weeks 3-4)

Expect these objections and plan for them:

| Objection | Response |
|-----------|----------|
| "But only Sarah knows the payment system" | That is a knowledge silo and a risk. Pairing Sarah with someone else on payment stories fixes the silo while delivering the work. |
| "I assigned work because nobody was pulling it" | If nobody pulls high-priority work, that is a signal: either the team doesn't understand the priority, the item is poorly defined, or there is a skill gap. Assignment hides the signal instead of addressing it. |
| "Some developers are faster - I need to assign strategically" | Pull systems self-balance. Faster developers pull more items. Slower developers finish fewer but are never overloaded. The team throughput optimizes naturally. |
| "Management expects me to know who's working on what" | The board shows who is working on what in real time. Pull systems provide more visibility than pre-assignment because assignments are always current, not a stale plan from sprint planning. |

### Step 5: Combine with WIP limits (Week 4+)

Pull-based work and WIP limits reinforce each other:

- WIP limits prevent the team from pulling too much work at once.
- Pull-based assignment ensures that when someone finishes, they pull the next priority - not
  whatever the manager thinks of next.
- Together, they create a system where work flows continuously from backlog to done.

See [Limiting WIP](../../../migrate-to-cd/migration-path/optimize/limiting-wip/) for how to set and enforce WIP limits.

### What managers do instead

Moving to a pull model does not eliminate the need for leadership. It changes the focus:

| Push model (before) | Pull model (after) |
|---------------------|-------------------|
| Decide who works on what | Ensure the backlog is prioritized and refined |
| Balance workloads manually | Coach the team on swarming and collaboration |
| Track individual assignments | Track flow metrics (cycle time, WIP, throughput) |
| Reassign work when priorities change | Update backlog priority and let the team adapt |
| Manage individual utilization | Remove systemic blockers the team cannot resolve |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Percentage of stories pre-assigned at sprint start | Should drop to near zero |
| [Work in progress](../../../metrics/work-in-progress/) | Should decrease as team focuses on finishing |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as swarming increases |
| Stories completed per sprint | Should stabilize or increase despite less "busyness" |
| Rework rate | Stories returned for rework or reopened after completion - should decrease |
| Knowledge distribution | Track who works on which parts of the system - should broaden over time |

## Related Content

- [Everything Started, Nothing Finished](../../../symptoms/flow/too-much-wip/) - High WIP caused by individual assignment queues
- [Pull Requests Sit for Days Waiting for Review](../../../symptoms/flow/prs-waiting-for-review/) - Reviews deprioritized when everyone has their own assigned work
- [Uneven Workloads](../../../symptoms/flow/uneven-workloads/) - Imbalance that self-corrects in a pull system
- [Blocked Work Sits Idle](../../../symptoms/flow/blocked-work-sits-idle/) - Blockers that persist because nobody feels authorized to pick up someone else's story
- [Completed Work Misses the Intent](../../../symptoms/flow/completed-work-misses-intent/) - Rework from developers receiving tickets without business context
- [Limiting WIP](../../../migrate-to-cd/migration-path/optimize/limiting-wip/) - Pull-based work and WIP limits are complementary practices
- [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/) - Pull works best when items are small and well-defined
- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - The team's agreement to pull, not push, should be explicit
