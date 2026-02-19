---
title: "Misaligned Incentives"
linkTitle: "Misaligned Incentives"
weight: 65
category: "Organizational & Cultural"
risk_level: medium
description: >
  Teams are rewarded for shipping features, not for stability or delivery speed, so nobody's goals
  include reducing lead time or increasing deploy frequency.
tags:
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

Performance reviews ask about features delivered. OKRs are written as "ship X, Y, and Z by end of
quarter." Bonuses are tied to project completions. The team is recognized in all-hands meetings
for delivering the annual release on time. Nobody is ever recognized for reducing the mean time to
repair an incident. Nobody has a goal that says "increase deployment frequency from monthly to
weekly." Nobody's review mentions the change fail rate.

The metrics that predict delivery health over time - lead time, deployment frequency, change fail
rate, mean time to repair - are invisible to the incentive system. The metrics that the incentive
system rewards - features shipped, deadlines met, projects completed - measure activity, not
outcomes. A team can hit every OKR and still be delivering slowly, with high failure rates, into
a fragile system.

The mismatch is often not intentional. The people who designed the OKRs were focused on the
product roadmap. They know what features the business needs and wrote goals to get those features
built. The idea of measuring how features get built - the flow, the reliability, the delivery
system itself - was not part of the frame.

Common variations:

- **The ops-dev split.** Development is rewarded for shipping features. Operations is rewarded for
  system stability. These goals conflict: every feature deployment is a stability risk from
  operations' perspective. The result is that operations resists deployments and development
  resists operational feedback. Neither team has an incentive to collaborate on making deployment
  safer.
- **The quantity over quality trap.** Velocity is tracked. Story points per sprint are reported to
  leadership as a productivity metric. The team maximizes story points by cutting quality. A
  2-point story completed quickly beats a 5-point story done right, from a velocity standpoint.
  Defects show up later, in someone else's sprint.
- **The project success illusion.** A project "shipped on time and on budget" is labeled a success
  even when the system it built is slow to change, prone to incidents, and unpopular with users.
  The project metrics rewarded are decoupled from the product outcomes that matter.
- **The hero recognition pattern.** The engineer who stays late to fix the production incident is
  recognized. The engineer who spent three weeks preventing the class of defects that caused
  the incident gets no recognition. Heroic recovery is visible and rewarded. Prevention is
  invisible.

The telltale sign: when asked about delivery speed or deployment frequency, the team lead says
"I don't know, that's not one of our goals."

## Why This Is a Problem

Incentive systems define what people optimize for. When the incentive system rewards feature volume,
people optimize for feature volume. When delivery health metrics are absent from the incentive
system, nobody optimizes for delivery health. The organization's actual delivery capability
slowly degrades, invisibly, because no one has a reason to maintain or improve it.

### It reduces quality

A developer cuts a corner on test coverage to hit the sprint deadline. The defect ships. It shows
up in a different reporting period, gets attributed to operations or to a different team, and costs
twice as much to fix. The developer who made the decision never sees the cost. The incentive system
severs the connection between the decision to cut quality and the consequence.

Teams whose incentives include quality metrics - defect escape rate, change fail rate, production
incident count - make different decisions. When a bug you introduced costs you something in your
own OKR, you have a reason to write the test that prevents it. When it is invisible to your
incentive system, you have no such reason.

### It increases rework

A team spends four hours on manual regression testing every release. Nobody has a goal to automate
it. After twelve months, that is fifty hours of repeated manual work that an automated suite would
have eliminated after week two. The compounded cost dwarfs any single defect repair - but the
automation investment never appears in feature-count OKRs, so it never gets prioritized.

Cutting quality to hit feature goals also produces defects fixed later at higher cost. When no one
is rewarded for improving the delivery system, automation is not built, tests are not written,
pipelines are not maintained. The team continuously re-does the same manual work instead of
investing in automation that would eliminate it.

### It makes delivery timelines unpredictable

A project closes. The team disperses to new work. Six months later, the next project starts with
a codebase that has accumulated unaddressed debt and a pipeline nobody maintained. The first sprint
is slower than expected. The delivery timeline slips. Nobody is surprised - but nobody is
accountable either, because the gap between projects was invisible to the incentive system.

Each project delivery becomes a heroic effort because the delivery system was not kept healthy
between projects. Timelines are unpredictable because the team's actual current capability is
unknown - they know what they delivered on the last project under heroic conditions, not what they
can deliver routinely. Teams with continuous delivery incentives keep their systems healthy
continuously and have much more reliable throughput.

### Impact on continuous delivery

CD is fundamentally about optimizing the delivery system, not just the products the system
produces. The four key metrics - deployment frequency, lead time, change fail rate, mean time to
repair - are measurements of the delivery system's health. If none of these metrics appear in
anyone's performance review, OKR, or team goal, there is no organizational will to improve them.

A CD adoption initiative that does not address the incentive system is building against the
gradient. Engineers are being asked to invest time improving the deployment pipeline, writing
better tests, and reducing batch sizes - investments that do not produce features. If those
engineers are measured on features, every hour spent on pipeline work is an hour they are
failing their OKR. The adoption effort will stall because the incentive system is working
against it.

## How to Fix It

### Step 1: Audit current metrics and OKRs against delivery health (Week 1)

List all current team-level metrics, OKRs, and performance criteria. Mark each one: does it measure
features/output, or does it measure delivery system health? In most organizations, the list will
be almost entirely output measures. Making this visible is the first step - it is hard to argue
for change when people do not see the gap.

### Step 2: Propose adding one delivery health metric per team (Weeks 2-3)

Do not attempt to overhaul the entire incentive system at once. Propose adding one delivery health
metric to each team's OKRs. Good starting options:

- Deployment frequency: how often does the team deploy to production?
- Lead time: how long from code committed to running in production?
- Change fail rate: what percentage of deployments require a rollback or hotfix?

Even one metric creates a reason to discuss delivery system health in planning and review
conversations. It legitimizes the investment of time in CD improvement work.

### Step 3: Make prevention visible alongside recovery (Weeks 2-4)

Change recognition patterns. When the on-call engineer's fix is recognized in a team meeting, also
recognize the engineer who spent time the previous week improving test coverage in the area that
failed. When a deployment goes smoothly because a developer took care to add deployment
verification, note it explicitly. Visible recognition of prevention behavior - not just heroic
recovery - changes the cost-benefit calculation for investing in quality.

### Step 4: Align operations and development incentives (Weeks 4-8)

If development and operations are separate teams with separate OKRs, introduce a shared metric that
both teams own. Change fail rate is a good candidate: development owns the change quality,
operations owns the deployment process, both affect the outcome. A shared metric creates a reason
to collaborate rather than negotiate.

### Step 5: Include delivery system health in planning conversations (Ongoing)

Every planning cycle, include a review of delivery health metrics alongside product metrics. "Our
deployment frequency is monthly; we want it to be weekly" should have the same status in a
planning conversation as "we want to ship Feature X by Q2." This frames delivery system
improvement as legitimate work, not as optional infrastructure overhead.

| Objection | Response |
|-----------|----------|
| "We're a product team, not a platform team. Our job is to ship features." | Shipping features is the goal; delivery system health determines how reliably and sustainably you ship them. A team with a 40% change fail rate is not shipping features effectively, even if the feature count looks good. |
| "Measuring deployment frequency doesn't help the business understand what we delivered" | Both matter. Deployment frequency is a leading indicator of delivery capability. A team that deploys daily can respond to business needs faster than one that deploys monthly. The business benefits from both knowing what was delivered and knowing how quickly future needs can be addressed. |
| "Our OKR process is set at the company level, we can't change it" | You may not control the formal OKR system, but you can control what the team tracks and discusses informally. Start with team-level tracking of delivery health metrics. When those metrics improve, the results are evidence for incorporating them in the formal system. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Percentage of team OKRs that include delivery health metrics | Should increase from near zero to at least one per team |
| [Deployment frequency](../../../metrics/release-frequency/) | Should increase as teams have a goal to improve it |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as teams have a reason to invest in deployment quality |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as prevention is rewarded alongside recovery |
| Ratio of feature work to delivery system investment | Should move toward including measurable delivery improvement time each sprint |

## Related Content

- [Deadline-Driven Development](../deadline-driven-development/) - Deadline incentives are a specific form of misaligned incentives
- [Velocity as Individual Metric](../velocity-as-individual-metric/) - Using velocity as a performance metric creates its own misalignment
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Building the case for delivery health metrics
- [Baseline Metrics](../../../migrate-to-cd/migration-path/assess/baseline-metrics/) - Establishing current delivery health as a foundation for improvement goals
- [Retrospectives](../../../migrate-to-cd/migration-path/optimize/retrospectives/) - The forum for surfacing incentive misalignment and proposing change
