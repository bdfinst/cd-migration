---
title: "Knowledge Silos"
linkTitle: "Knowledge Silos"
weight: 32
category: "Team Workflow"
risk_level: medium
description: >
  Only specific individuals can work on or review certain parts of the codebase. The team's
  capacity is constrained by who knows what.
tags:
  - team-dynamics
  - integration-frequency
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

When a bug appears in the payments module, the team waits for Sarah. She wrote most of it. When
the reporting service needs a change, it goes to Marcus. He is the only one who understands the
data pipeline. Pull requests for the mobile app wait for Priya because she is the only reviewer
who knows the codebase well enough to approve.

Common variations:

- **The sole expert.** One developer owns an entire subsystem. They wrote it, they maintain it,
  and they are the only person the team trusts to review changes to it. When they are on vacation,
  that subsystem is frozen.
- **The original author bottleneck.** PRs are routed to whoever originally wrote the code, not
  to whoever is available. Review queues are uneven - one developer has ten pending reviews while
  others have none.
- **The tribal knowledge problem.** Critical operational knowledge - how to deploy, how to debug
  a specific failure mode, where the configuration lives - exists only in one person's head.
  When that person is unavailable, the team is stuck.
- **The specialization trap.** Each developer is assigned to a specific area of the codebase and
  stays there. Over time, they become the expert and nobody else learns the code. The
  specialization was never intentional - it emerged from habit and was never corrected.

The telltale sign: the team's capacity on any given area is limited to one person, regardless of
team size.

## Why This Is a Problem

Knowledge silos turn individual availability into a team constraint. The team's throughput is
limited not by how many people are available but by whether the right person is available.

### It reduces quality

When only one person understands a subsystem, their work in that area is never meaningfully
reviewed. Reviewers who do not understand the code rubber-stamp the PR or leave only surface-level
comments. Bugs, design problems, and technical debt accumulate without the checks that come from
multiple people understanding the same code.

When multiple developers work across the codebase, every change gets a review from someone who
understands the context. Design problems are caught. Bugs are spotted. The code benefits from
multiple perspectives.

### It increases rework

Knowledge silos create bottlenecks that delay feedback. A PR waiting two days for the one person
who can review it means two days of other work built on potentially flawed assumptions. When the
review finally happens and problems are found, the rework is more expensive because more code
has been built on top.

When any team member can review any code, reviews happen within hours. Problems are caught while
the context is fresh and the cost of change is low.

### It makes delivery timelines unpredictable

One person's vacation, sick day, or meeting schedule can block the entire team's work in a
specific area. The team cannot plan around this because they never know when the bottleneck
person will be unavailable. Delivery timelines depend on individual availability rather than
team capacity.

### Impact on continuous delivery

CD requires that the team can deliver at any time, regardless of who is available. Knowledge
silos make delivery dependent on specific individuals. If the person who knows the deployment
process is out, the team cannot deploy. If the person who can review a critical change is in a
meeting, the change waits.

## How to Fix It

### Step 1: Map the knowledge distribution (Week 1)

Create a simple matrix: subsystems on one axis, team members on the other. For each cell, mark
whether the person can work in that area independently, with guidance, or not at all. The gaps
become visible immediately.

### Step 2: Rotate reviewers deliberately (Week 2)

Stop routing PRs to the original author or designated expert. Configure auto-assignment to
distribute reviews across the team. When a developer reviews unfamiliar code, they learn. The
expert can answer questions, but the review itself is shared.

### Step 3: Pair on siloed areas (Weeks 3-6)

When work comes in for a siloed area, pair the expert with another developer. The expert drives
the first session, the other developer drives the next. Within a few pairing sessions, the
second developer can work in that area independently.

### Step 4: Rotate assignments (Ongoing)

Stop assigning developers to the same areas repeatedly. When someone finishes work in one area,
have them pick up work in an area they are less familiar with. The short-term slowdown is an
investment in long-term team capacity.

| Objection | Response |
|-----------|----------|
| "It's faster if the expert does it" | Faster today, but it deepens the silo. The next time the expert is unavailable, the team is blocked. Investing in cross-training now prevents delays later. |
| "Not everyone can learn every part of the system" | They do not need to be experts in everything. They need to be capable of reviewing and making changes with reasonable confidence. Two people who can work in an area is dramatically better than one. |
| "We tried rotating and velocity dropped" | Velocity drops temporarily during cross-training. It recovers as the team builds shared knowledge, and it becomes more resilient because delivery no longer depends on individual availability. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Knowledge matrix coverage | Each subsystem should have at least two developers who can work in it |
| Review distribution | Reviews should be spread across the team, not concentrated in one or two people |
| Bus factor per subsystem | Should increase from one to at least two |
| Blocked time due to unavailable expert | Should decrease toward zero |

## Related Content

- [Code Review](../../../migrate-to-cd/migration-path/foundations/code-review/) - Review practices that spread knowledge
- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - Team norms for review rotation and pairing
- [Push-Based Work Assignment](../push-based-work-assignment/) - Push assignment reinforces silos by always sending the same work to the same person
