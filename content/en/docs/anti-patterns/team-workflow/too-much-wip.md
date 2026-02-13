---
title: "Too Much Work in Progress"
linkTitle: "Too Much Work in Progress"
weight: 30
description: >
  Every developer is on a different story. Eight items in progress, zero done. Nothing gets the
  focused attention needed to finish.
---

## What This Looks Like

Open the team's board on any given day. Count the items in progress. Now count the team members.
If the first number is significantly higher than the second, the team has a WIP problem.

Common variations:

- **Everyone on a different story.** A team of five has eight or more stories in progress. Nobody
  is working on the same thing. The board is a wide river of half-finished work.
- **Sprint-start explosion.** On the first day of the sprint, every developer pulls a story. By
  mid-sprint, all stories are "in progress" and none are "done." The last day is a scramble to
  close anything.
- **Individual WIP hoarding.** A single developer has three stories assigned: one they're actively
  coding, one waiting for review, and one blocked on a question. They count all three as "in
  progress" and start nothing new - but they also don't help anyone else finish.
- **Hidden WIP.** The board shows five items in progress, but each developer is also investigating
  a production bug, answering questions about a previous story, and prototyping something for next
  sprint. Unofficial work doesn't appear on the board but consumes the same attention.
- **Expedite as default.** Urgent requests arrive mid-sprint. Instead of replacing existing work,
  they stack on top. WIP grows because nothing is removed when something is added.

The telltale sign: the team is busy all the time but finishes very little. Stories take longer and
longer to complete. The sprint ends with a pile of items at 80% done.

## Why This Is a Problem

High WIP is not a sign of a productive team. It is a sign of a team that has optimized for
starting work instead of finishing it. The consequences compound over time.

### It destroys focus and increases context switching

Every item in progress competes for a developer's attention. A developer working on one story can
focus deeply. A developer juggling three stories - one active, one waiting for review, one they
need to answer questions about - is constantly switching context. Research consistently shows that
each additional concurrent task reduces productive time by 20-40%.

The switching cost is not just time. It is cognitive load. Developers lose their mental model of
the code when they switch away, and it takes 15-30 minutes to rebuild it when they switch back.
Multiply this across five context switches per day and the team is spending more time reloading
context than writing code.

In a low-WIP environment, developers finish one thing before starting the next. Deep focus is the
default. Context switching is the exception, not the rule.

### It inflates cycle time

Little's Law is not a suggestion. It is a mathematical relationship: cycle time equals work in
progress divided by throughput. If a team's throughput is roughly constant (and over weeks, it is),
the only way to reduce cycle time is to reduce WIP.

A team of five with a throughput of ten stories per sprint and five stories in progress has an
average cycle time of half a sprint. The same team with fifteen stories in progress has an average
cycle time of 1.5 sprints. The work is not getting done faster because more of it was started. It
is getting done slower because all of it is competing for the same capacity.

Long cycle times create their own problems. Feedback is delayed. Requirements go stale.
Integration conflicts accumulate. The longer a story sits in progress, the more likely it is to
need rework when it finally reaches review or testing.

### It hides bottlenecks

When WIP is high, bottlenecks are invisible. If code reviews are slow, a developer just starts
another story while they wait. If the test environment is broken, they work on something else. The
constraint is never confronted because there is always more work to absorb the slack.

This is comfortable but destructive. The bottleneck does not go away because the team is working
around it. It quietly degrades the system. Reviews pile up. Test environments stay broken. The
team's real throughput is constrained by the bottleneck, but nobody feels the pain because they
are always busy.

When WIP is limited, bottlenecks become immediately visible. A developer who cannot start new work
because the WIP limit is reached has to swarm on something blocked. "I'm idle because my PR has
been waiting for review for two hours" is a problem the team can solve. "I just started another
story while I wait" hides the same problem indefinitely.

### It prevents swarming and collaboration

When every developer has their own work in progress, there is no incentive to help anyone else.
Reviewing a teammate's pull request, pairing on a stuck story, or helping debug a failing test all
feel like distractions from "my work." The result is that every item moves through the pipeline
alone, at the pace of a single developer.

Swarming - multiple team members working together to finish the highest-priority item - is
impossible when everyone has their own stories to protect. If you ask a developer to drop their
current story and help finish someone else's, you are asking them to fall behind on their own work.
The incentive structure is broken.

In a low-WIP environment, finishing the team's most important item is everyone's job. When only
three items are in progress for a team of five, two people are available to pair, review, or
unblock. Collaboration is the natural state, not a special request.

### Impact on continuous delivery

Continuous delivery requires a steady flow of small, finished changes moving through the pipeline.
High WIP produces the opposite: a large batch of unfinished changes sitting in various stages of
completion, blocking each other, accumulating merge conflicts, and stalling in review queues.

A team with fifteen items in progress does not deploy fifteen times as often as a team with one
item in progress. They deploy less frequently because nothing is fully done. Each "almost done"
story is a small batch that has not yet reached the pipeline. The batch keeps growing until
something forces a reckoning - usually the end of the sprint.

The feedback loop breaks too. When changes sit in progress for days, the developer who wrote the
code has moved on by the time the review comes back or the test fails. They have to reload context
to address feedback, which takes more time, which delays the next change, which increases WIP
further. The cycle reinforces itself.

## How to Fix It

### Step 1: Make WIP visible (Week 1)

Before setting any limits, make the current state impossible to ignore.

- Count every item currently in progress for the team. Include stories, bugs, spikes, and any
  unofficial work that is consuming attention.
- Write this number on the board. Update it daily.
- Most teams are shocked. A team of five typically discovers 12-20 items in progress once hidden
  work is included.

Do not try to fix anything yet. The goal is awareness.

### Step 2: Set an initial WIP limit (Week 2)

Use the **N+2 formula** as a starting point, where N is the number of team members actively
working on delivery.

| Team size | Starting WIP limit | Why |
|-----------|--------------------|-----|
| 3 developers | 5 items | One per person plus a buffer for blocked items |
| 5 developers | 7 items | Same ratio |
| 8 developers | 10 items | Buffer shrinks proportionally |

Add the limit to the board as a column header or policy: "In Progress (limit: 7)." Agree as a
team that when the limit is reached, nobody starts new work.

### Step 3: Enforce the limit with swarming (Week 3+)

When the WIP limit is reached and a developer finishes something, they have two options:

1. **Pull the next highest-priority item** if the WIP count is below the limit.
2. **Swarm on an existing item** if the WIP count is at the limit.

Swarming means pairing on a stuck story, reviewing a pull request, writing a test someone needs
help with, or resolving a blocker. The key behavior change: "I have nothing to do" is never the
right response. "What can I help finish?" is.

### Step 4: Lower the limit over time (Monthly)

The initial limit is a starting point. Each month, consider reducing it by one.

| Limit | What it exposes |
|-------|-----------------|
| N+2 | Gross overcommitment. Most teams find this is already a significant reduction. |
| N+1 | Slow reviews, environment contention, unclear requirements. Team starts swarming. |
| N | Every person on one thing. Blocked items get immediate attention. |
| Below N | Team is pairing by default. Cycle time drops sharply. |

Each reduction will feel uncomfortable. That discomfort is the point - it exposes constraints in
the workflow that were hidden by excess WIP.

### Step 5: Address the objections

Expect resistance and prepare for it:

| Objection | Response |
|-----------|----------|
| "I'll be idle if I can't start new work" | Idle hands are not the problem. Idle work is. Help finish something instead of starting something new. |
| "Management will see people not typing and think we're wasting time" | Track cycle time and throughput. When both improve, the data speaks for itself. |
| "We have too many priorities to limit WIP" | Having many priorities is exactly why you need a WIP limit. Without one, nothing gets the focus needed to finish. Everything is "in progress," nothing is done. |
| "What about urgent production issues?" | Keep one expedite slot. If a production issue arrives, it takes the slot. If the slot is full, the new issue replaces the current one. Expedite is not a way to bypass the limit - it is part of the limit. |
| "Our stories are too big to pair on" | That is a separate problem. See [Work Decomposition](../../../migration-path/foundations/work-decomposition/). Stories should be small enough that anyone can pick them up. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Work in progress](../../../reference/metrics/work-in-progress/) | Should stay at or below the team's limit |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should decrease as WIP drops |
| Stories completed per week | Should stabilize or increase despite starting fewer items |
| Time items spend blocked | Should decrease as the team swarms on blockers |
| Sprint-end scramble | Should disappear as work finishes continuously through the sprint |

## Related Content

- [Limiting WIP](../../../migration-path/optimize/limiting-wip/) - The practice guide for implementing WIP limits
- [Small Batches](../../../migration-path/optimize/small-batches/) - Reducing batch size at every level reinforces low WIP
- [Work Decomposition](../../../migration-path/foundations/work-decomposition/) - Stories must be small enough to flow through a WIP-limited system
- [Push-Based Work Assignment](../push-based-work-assignment/) - Push assignment and high WIP are mutually reinforcing anti-patterns
