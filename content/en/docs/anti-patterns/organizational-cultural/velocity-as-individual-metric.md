---
title: "Velocity as Individual Metric"
linkTitle: "Velocity as Individual Metric"
weight: 55
category: "Organizational & Cultural"
risk_level: high
description: >
  Story points or velocity are used to evaluate individual performance. Developers game the
  metrics instead of delivering value.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

During sprint review, a manager pulls up a report showing how many story points each developer
completed. Sarah finished 21 points. Marcus finished 13. The manager asks Marcus what happened.
Marcus starts padding his estimates next sprint. Sarah starts splitting her work into more tickets
so the numbers stay high. The team learns that the scoreboard matters more than the outcome.

Common variations:

- **The individual velocity report.** Management tracks story points per developer per sprint and
  uses the trend to evaluate performance. Developers who complete fewer points are questioned in
  one-on-ones or performance reviews.
- **The defensive ticket.** Developers create tickets for every small task (attending a meeting,
  reviewing a PR, answering a question) to prove they are working. The board fills with
  administrative noise that obscures the actual delivery work.
- **The clone-and-close.** When a story rolls over into the next sprint, the developer closes it
  and creates a new one to avoid the appearance of an incomplete sprint. The original story's
  history is lost. The rollover is hidden.
- **The seniority expectation.** Senior developers are expected to complete more points than
  juniors. Seniors avoid helping others because pairing, mentoring, and reviewing do not produce
  points. Knowledge sharing becomes a career risk.

The telltale sign: developers spend time managing how their work appears in Jira rather than
managing the work itself.

## Why This Is a Problem

Velocity was designed as a team planning tool. It helps the team forecast how much work they can
take into a sprint. When management repurposes it as an individual performance metric, every
incentive shifts from delivering outcomes to producing numbers.

### It reduces quality

When developers are measured by points completed, they optimize for throughput over correctness.
Cutting corners on testing, skipping edge cases, and merging code that "works for now" all produce
more points per sprint. Quality gates feel like obstacles to the metric rather than safeguards for
the product.

Teams that measure outcomes instead of output focus on delivering working software. A developer who
spends two days pairing with a colleague to get a critical feature right is contributing more than
one who rushes three low-quality stories to completion.

### It increases rework

Rushed work produces defects. Defects discovered later require context rebuilding and rework that
costs more than doing it right the first time. But the rework appears in a future sprint as new
points, which makes the developer look productive again. The cycle feeds itself: rush, ship
defects, fix defects, claim more points.

When the team owns velocity collectively, the incentive reverses. Rework is a drag on team
velocity, so the team has a reason to prevent it through better testing, review, and collaboration.

### It makes delivery timelines unpredictable

Individual velocity tracking encourages estimate inflation. Developers learn to estimate high so
they can "complete" more points and look productive. Over time, the relationship between story
points and actual effort dissolves. A "5-point story" means whatever the developer needs it to mean
for the scorecard. Sprint planning based on inflated estimates becomes fiction.

When velocity is a team planning tool with no individual consequence, developers estimate honestly
because accuracy helps the team plan, and there is no personal penalty for a lower number.

### It destroys collaboration

Helping a teammate debug their code, pairing on a tricky problem, or doing a thorough code review
all take time away from completing your own stories. When individual points are tracked, every hour
spent helping someone else is an hour that does not appear on your scorecard. The rational response
is to stop helping.

Teams that do not track individual velocity collaborate freely. Swarming on a blocked item is
natural because the team shares a goal (deliver the sprint commitment) rather than competing for
individual credit.

### Impact on continuous delivery

CD depends on a team that collaborates fluidly: reviewing each other's code quickly, swarming on
blockers, sharing knowledge across the codebase. Individual velocity tracking poisons all of these
behaviors. Developers hoard work, avoid reviews, and resist pairing because none of it produces
points. The team becomes a collection of individuals optimizing their own metrics rather than a
unit delivering software together.

## How to Fix It

### Step 1: Stop reporting individual velocity (Week 1)

Remove individual velocity from all dashboards, reports, and one-on-one discussions. Report only
team velocity. This single change removes the incentive to game and restores velocity to its
intended purpose: helping the team plan.

If management needs visibility into individual contribution, use peer feedback, code review
participation, and qualitative assessment rather than story points.

### Step 2: Clean up the board (Week 2)

Remove defensive tickets. If it is not a deliverable work item, it does not belong on the board.
Meetings, PR reviews, and administrative tasks are part of the job, not separate trackable units.
Reduce the board to work that delivers value so the team can see what actually matters.

### Step 3: Redefine what velocity measures (Week 2)

Make it explicit in the team's working agreement: velocity is a team planning tool. It measures
how much work the team can take into a sprint. It is not a performance metric, a productivity
indicator, or a comparison tool. Write this down. Refer to it when old habits resurface.

### Step 4: Measure outcomes instead of output (Week 3+)

Replace individual velocity tracking with outcome-oriented measures:

- How often does the team deliver working software to production?
- How quickly are defects found and fixed?
- How predictable are the team's delivery timelines?

These measures reward collaboration, quality, and sustainable pace rather than individual
throughput.

| Objection | Response |
|-----------|----------|
| "How do we know if someone isn't pulling their weight?" | Peer feedback, code review participation, and retrospective discussions surface contribution problems far more accurately than story points. Points measure estimates, not effort or impact. |
| "We need metrics for performance reviews" | Use qualitative signals: code review quality, mentoring, incident response, knowledge sharing. These measure what actually matters for team performance. |
| "Developers will slack off without accountability" | Teams with shared ownership and clear sprint commitments create stronger accountability than individual tracking. Peer expectations are more motivating than management scorecards. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------:|
| Defensive tickets on the board | Should drop to zero |
| Estimate consistency | Story point meanings should stabilize as gaming pressure disappears |
| Team velocity variance | Should decrease as estimates become honest planning tools |
| Collaboration indicators (pairing, review participation) | Should increase as helping others stops being a career risk |

## Related Content

- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - Making "velocity is a team planning tool" an explicit norm
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Choosing metrics that drive the right behavior
- [Push-Based Work Assignment](../../team-workflow/push-based-work-assignment/) - Individual assignment reinforces individual measurement
- [Knowledge Silos](../../team-workflow/knowledge-silos/) - Individual metrics discourage the cross-training that breaks silos
