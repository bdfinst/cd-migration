---
title: "Push-Based Work Assignment"
linkTitle: "Push-Based Work Assignment"
weight: 104
description: >
  Work is assigned to individuals by a manager or lead instead of team members pulling the next
  highest-priority item.
---

{{% pageinfo %}}
**Category:** Team Workflow
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
undermines nearly every CD practice by breaking the connection between the team and the flow of
work.

### It hides bottlenecks

When work is assigned, the assigner decides the order and distribution. If one area of the system
is a bottleneck, the assigner may not see it because they are looking at people, not flow. In a
pull system, the bottleneck becomes obvious: work piles up in one column and nobody pulls it
because the downstream step is full.

### It defeats WIP limits

WIP limits only work when the team collectively decides what to work on next. If a manager assigns
work to individuals, the team's WIP is the sum of all assignments - there is no mechanism to say
"we have too much in progress, let's finish something first." The assigner optimizes for
utilization (keeping everyone busy), not for flow (getting things done).

### It kills swarming

When everyone has their own assigned work, there is no incentive to help someone else finish
theirs. If a story is stuck, the assigned developer struggles alone while teammates work on their
own assignments. Swarming - multiple people collaborating to finish the highest-priority item - is
impossible when everyone "has their own stuff."

### It makes code review and helping teammates feel like a distraction

When every developer has their own assigned work, reviewing someone else's pull request is time
spent not making progress on your own assignment. Code reviews get deprioritized - they sit for
hours or days because the reviewer is "busy with my stories." The same dynamic discourages helping
a teammate who is stuck. Spending an hour pairing with a colleague to unblock them means falling
behind on your own assignments, so developers don't offer and don't ask.

This is corrosive. Code review is not a favor - it is how the team maintains quality and shares
knowledge. Helping a teammate is not a distraction - it is how the team finishes work. But push
assignment frames both as competing with "real work." In a pull system, reviewing code and
unblocking teammates are the highest-priority activities because they move the team's work forward,
and the team's work is everyone's work.

### It removes team ownership

Pull systems create shared ownership of the backlog. The team collectively cares about the priority
order because they are collectively responsible for finishing work. Push systems create individual
ownership: "that's not my story." When a developer finishes their assigned work, they wait for more
assignments instead of looking at what the team needs.

### It creates uneven workloads

Managers cannot perfectly predict how long work will take. Pushing work to individuals means some
people finish early and sit idle (or start low-priority work), while others are overloaded. A pull
system self-balances: whoever finishes first pulls the next item.

### It slows feedback loops

In a push system, the order of work is decided in advance (usually at sprint planning). If
priorities change mid-sprint, the manager must reassign work. In a pull system, the team
automatically adapts: the next person who finishes simply pulls whatever is now highest priority.

### Impact on CD specifically

Continuous delivery depends on a steady, predictable flow of small changes through the pipeline.
Push-based assignment produces the opposite: uneven bursts of activity, blocked work sitting idle,
and no team-level mechanism for optimizing throughput. You cannot build a continuous flow of work
when the assignment model is batch-based.

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

See [Limiting WIP](../../optimize/limiting-wip/) for how to set and enforce WIP limits.

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
| [Work in progress](../../reference/metrics/work-in-progress/) | Should decrease as team focuses on finishing |
| [Development cycle time](../../reference/metrics/development-cycle-time/) | Should decrease as swarming increases |
| Stories completed per sprint | Should stabilize or increase despite less "busyness" |
| Knowledge distribution | Track who works on which parts of the system - should broaden over time |

## Related Content

- [Limiting WIP](../../optimize/limiting-wip/) - Pull-based work and WIP limits are complementary practices
- [Work Decomposition](../../foundations/work-decomposition/) - Pull works best when items are small and well-defined
- [Working Agreements](../../foundations/working-agreements/) - The team's agreement to pull, not push, should be explicit
- [Common Blockers](../../reference/common-blockers/) - Push-based assignment contributes to several listed blockers
