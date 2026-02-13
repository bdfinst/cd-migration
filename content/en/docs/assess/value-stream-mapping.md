---
title: "Value Stream Mapping"
linkTitle: "Value Stream Mapping"
weight: 1
description: >
  Visualize your delivery process end-to-end to identify waste and constraints before starting your CD migration.
---

{{% pageinfo %}}
**Phase 0 — Assess** | Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

Before you change anything about how your team delivers software, you need to see how it works
today. Value Stream Mapping (VSM) is the single most effective tool for making your delivery
process visible. It reveals the waiting, the rework, and the handoffs that you have learned to
live with but that are silently destroying your flow.

In the context of a CD migration, a value stream map is not an academic exercise. It is the
foundation for every decision you will make in the phases ahead. It tells you where your time
goes, where quality breaks down, and which constraint to attack first.

## What Is a Value Stream Map?

A value stream map is a visual representation of every step required to deliver a change from
request to production. For each step, you capture:

- **Process time** — the time someone is actively working on that step
- **Wait time** — the time the work sits idle between steps (in a queue, awaiting approval, blocked on an environment)
- **Percent Complete and Accurate (%C/A)** — the percentage of work arriving at this step that is usable without rework

The ratio of process time to total time (process time + wait time) is your **flow efficiency**.
Most teams are shocked to discover that their flow efficiency is below 15%, meaning that for
every hour of actual work, there are nearly six hours of waiting.

## Prerequisites

Before running a value stream mapping session, make sure you have:

- **An established, repeatable process.** You are mapping what actually happens, not what should
  happen. If every change follows a different path, start by agreeing on the current "most common"
  path.
- **All stakeholders in the room.** You need representatives from every group involved in delivery:
  developers, testers, operations, security, product, change management. Each person knows the
  wait times and rework loops in their part of the stream that others cannot see.
- **A shared understanding of wait time vs. process time.** Wait time is when work sits idle. Process
  time is when someone is actively working. A code review that takes "two days" but involves 30
  minutes of actual review has 30 minutes of process time and roughly 15.5 hours of wait time.

## How to Run the Session

### Step 1: Start From Delivery, Work Backward

Begin at the right side of your map — the moment a change reaches production. Then work backward
through every step until you reach the point where a request enters the system. This prevents teams
from getting bogged down in the early stages and never reaching the deployment process, which is
often where the largest delays hide.

Typical steps you will uncover include:

- Request intake and prioritization
- Story refinement and estimation
- Development (coding)
- Code review
- Build and unit tests
- Integration testing
- Manual QA / regression testing
- Security review
- Staging deployment
- User acceptance testing (UAT)
- Change advisory board (CAB) approval
- Production deployment
- Production verification

### Step 2: Capture Process Time and Wait Time for Each Step

For each step on the map, record the process time and the wait time. Use averages if exact numbers
are not available, but prefer real data from your issue tracker, CI system, or deployment logs
when you can get it.

{{% alert title="Migration Tip" %}}
Pay close attention to these migration-critical delays:

- **Handoffs that block flow** — Every time work passes from one team or role to another (dev to QA,
  QA to ops, ops to security), there is a queue. Count the handoffs. Each one is a candidate for
  elimination or automation.
- **Manual gates** — CAB approvals, manual regression testing, sign-off meetings. These often add
  days of wait time for minutes of actual value.
- **Environment provisioning delays** — If developers wait hours or days for a test environment,
  that is a constraint you will need to address in Phase 2.
- **Rework loops** — Any step where work frequently bounces back to a previous step. Track the
  percentage of times this happens. These loops are destroying your cycle time.
{{% /alert %}}

### Step 3: Calculate %C/A at Each Step

Percent Complete and Accurate measures the quality of the handoff. Ask each person: "What
percentage of the work you receive from the previous step is usable without needing clarification,
correction, or rework?"

A low %C/A at a step means the upstream step is producing defective output. This is critical
information for your migration plan because it tells you where quality needs to be built in
rather than inspected after the fact.

### Step 4: Identify Constraints (Kaizen Bursts)

Mark the steps with the largest wait times and the lowest %C/A with a "kaizen burst" — a starburst
symbol indicating an improvement opportunity. These are your constraints. They will become the
focus of your migration roadmap.

Common constraints teams discover during their first value stream map:

| Constraint | Typical Impact | Migration Phase to Address |
|------------|---------------|---------------------------|
| Long-lived feature branches | Days of integration delay, merge conflicts | Phase 1 (Trunk-Based Development) |
| Manual regression testing | Days to weeks of wait time | Phase 1 (Testing Fundamentals) |
| Environment provisioning | Hours to days of wait time | Phase 2 (Production-Like Environments) |
| CAB / change approval boards | Days of wait time per deployment | Phase 2 (Pipeline Architecture) |
| Manual deployment process | Hours of process time, high error rate | Phase 2 (Single Path to Production) |
| Large batch releases | Weeks of accumulation, high failure rate | Phase 3 (Small Batches) |

## Reading the Results

Once your map is complete, calculate these summary numbers:

- **Total lead time** = sum of all process times + all wait times
- **Total process time** = sum of just the process times
- **Flow efficiency** = total process time / total lead time * 100
- **Number of handoffs** = count of transitions between different teams or roles
- **Rework percentage** = percentage of changes that loop back to a previous step

These numbers become part of your [baseline metrics](../baseline-metrics/) and feed directly into
your work to [identify constraints](../identify-constraints/).

## What Good Looks Like

You are not aiming for a perfect value stream map. You are aiming for a shared, honest picture of
reality that the whole team agrees on. The map should be:

- **Visible** — posted on a wall or in a shared digital tool where the team sees it daily
- **Honest** — reflecting what actually happens, including the workarounds and shortcuts
- **Actionable** — with constraints clearly marked so the team knows where to focus

You will revisit and update this map as you progress through each migration phase. It is a living
document, not a one-time exercise.

## Next Step

With your value stream map in hand, proceed to [Baseline Metrics](../baseline-metrics/) to
quantify your current delivery performance.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
