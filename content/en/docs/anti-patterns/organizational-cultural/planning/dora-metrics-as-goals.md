---
title: "DORA Metrics as Delivery Improvement Goals"
linkTitle: "DORA Metrics as Delivery Improvement Goals"
weight: 33
category: "Organizational & Cultural"
risk_level: medium
description: >
  The four DORA key metrics are used as OKRs or management KPIs, directing teams to optimize the numbers rather than the behaviors that cause them to improve.
tags:
  - metrics
  - planning
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

Leadership discovers the DORA research and adds deployment frequency, lead time, change failure
rate, and mean time to restore to the quarterly OKR dashboard. The framing is straightforward:
the research shows that elite-performing organizations hit certain thresholds, so setting those
thresholds as goals should produce elite performance. Engineering teams receive targets. Progress
reviews ask whether the numbers are moving.

Teams respond to the incentive in front of them. Deployment frequency becomes the number to
optimize. The team finds ways to deploy more often without reducing actual batch size: splitting
releases artificially, counting hotfixes, or deploying to staging environments that count as
production for reporting purposes. The metric improves. The underlying problem does not. In some
cases, the push for faster deployments without the quality practices to support them causes
defect rates to climb. When that happens, teams declare that continuous delivery does not work
and revert to longer release cycles.

Meanwhile, the metrics that would catch this early (how often code integrates to trunk, how long
branches live, how quickly the team finishes a story) are not on the dashboard. They are not
in OKRs. They are not in the conversation. By the time DORA numbers drift, the causes have
been accumulating for weeks.

Common variations:

- **Deployment frequency as velocity target.** Teams are told to deploy more often as an end in
  itself, without work decomposition or quality practices to support smaller, safer batches.
- **Counting releasable work, not delivered work.** Teams report changes that passed the pipeline
  as "deployments" whether or not they reached users. Undelivered change is counted as throughput.
- **Cross-team dashboards.** DORA metrics are published in a shared dashboard comparing teams
  against each other. Teams optimize to look better than peers rather than to improve their own
  capability.
- **Transformation theater.** The organization acquires a DORA metrics tool, populates the
  dashboard, and declares it is "measuring delivery performance", without connecting the
  measurements to any improvement experiments or behavior changes.

The telltale sign: teams know their DORA metric numbers and actively manage them toward targets,
but cannot describe the specific behaviors they are working to change.

## Why This Is a Problem

DORA's four key metrics were designed for statistical survey research to identify correlations
between organizational behaviors and outcomes. They were not designed as direct improvement levers.
Using them as targets treats a correlation tool as a causation engine.

### It reduces quality

Deployment frequency is a proxy for batch size. Smaller batches of work are easier to verify,
fail smaller, and amplify feedback loops. That is why high-performing teams deploy often, not
because they have a target to hit, but because they have solved the problems that made deploying
infrequently safer. When a team optimizes for deploy frequency without the supporting practices,
quality suffers. Defects ship more often because each batch has not been adequately verified.
Change failure rates rise. Some organizations respond to this outcome by abandoning [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}})
entirely, treating the deteriorating metrics as evidence that the approach does not work.

Teams that improve quality practices first (building automated tests, reducing story size,
eliminating long-lived branches) find that deployment frequency improves as a side effect.
The metric moves because the underlying constraint was removed, not because the metric was set
as a goal.

### It increases rework

Counting releasable but undelivered changes as "deployments" is a form of moving the goal. A
change that passed the pipeline but is sitting in a feature branch, waiting behind a release
train, or hidden by a feature flag has not delivered value. Treating it as throughput flatters
the metric while actual inventory (and the waste that comes with it) continues to accumulate.
Undelivered change is never an asset. It is a liability that degrades and becomes more expensive
to deliver the longer it sits.

Teams that define "done" as delivered to the end user rather than "passed the pipeline" are
forced to confront the real constraints on their flow. The honest measurement creates pressure
to actually remove those constraints rather than find creative ways to count around them.

### It makes delivery timelines unpredictable

DORA metrics are lagging indicators. They reflect the cumulative effect of many upstream behaviors.
By the time deployment frequency drops or change failure rate climbs, the causes (growing branch
durations, slipping story cycle times, accumulating test debt) have been in place for weeks or
months. Setting DORA metrics as goals does not create an early warning system; it creates a
delayed one. The team receives feedback that something is wrong long after the window to address
it cheaply has closed.

These leading indicators surface problems immediately: [integration frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
branch duration, and build success rate. A branch that has been
open for three days is visible today. A story that has been in development for two weeks is
visible today. Teams that track these signals can intervene before the lag compounds into a
DORA metric problem.

### Impact on continuous delivery

CD depends on a specific set of behaviors: code integrated to trunk at least daily, branches
short-lived, stories small enough to finish in a day or two, quality gates automated and fast,
the pipeline the only path to production. DORA metrics reflect whether those behaviors are
working, but they do not cause them. Setting DORA numbers as targets creates pressure to appear
to exhibit those behaviors without actually exhibiting them. The result is a delivery system
that looks healthy on the dashboard while the underlying capability either stagnates or degrades.
Real improvement requires focusing improvement energy on the behaviors, then observing the DORA
metrics to confirm that the behaviors are having the expected effect.

## How to Fix It

### Step 1: Reclassify DORA metrics as health checks, not goals

Remove DORA metrics from OKRs and management performance dashboards. They are confirmation that
behaviors are working, not levers to pull. If leadership needs delivery visibility, share
trend direction and the specific behaviors being improved, not target thresholds.

Explain the change clearly: DORA metrics are outcome measures that reflect many contributing
behaviors. Setting them as targets produces incentives to optimize the number rather than the
system that generates it.

### Step 2: Introduce leading indicators as the primary improvement focus

Track the metrics that give early feedback on the behaviors [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) requires:

| Metric | Target | Why it matters |
|--------|--------|----------------|
| [Integration frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) | At least once per day per developer | Long gaps indicate large batches and high merge risk |
| Branch duration | Under one day | Long-lived branches are a leading indicator of integration pain |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Stories averaging one day | Stories that take a week reveal work decomposition problems |
| Build success rate | 90% or higher | Frequent red builds block integration and batch changes |
| Time to fix a broken build | Under 10 minutes | Long fix times indicate builds are not treated as stop-the-line events |

These metrics are not contextual to application type or deployment environment. A team always
has full control over how often they integrate and how large their stories are. Improving these
metrics exposes and removes constraints directly, rather than waiting for a lagging signal.

### Step 3: Connect improvement experiments to behaviors, not numbers

Use the [improvement kata]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) to
run improvement experiments against the leading indicators. A hypothesis like "if we decompose
stories to a one-day target, integration frequency will increase because less work will be
batched before integrating" is testable within a week. A hypothesis like "if we improve our
practices, DORA metrics will improve" is testable in months at the earliest and provides no
useful feedback in the interim.

DORA metrics confirm that improvement work is having the right effect at the system level. Use
them as a quarterly health check, not a weekly driver.

### Step 4: Stop comparing teams on delivery metrics

Delivery metrics are tools for a team to understand its own performance and improve against its
own past. Each team has its own deployment context. The cadence that makes sense for a
cloud-hosted web application differs from one for an embedded firmware product. Comparing teams
against each other incentivizes gaming and creates pressure to optimize for the comparison
rather than for actual capability.

If cross-team visibility is needed, share trends and the specific constraints each team is
working to remove, not side-by-side metric tables.

| Objection | Response |
|-----------|----------|
| "How will leadership know if teams are improving?" | Share the specific behaviors being improved and the leading indicators tracking them. Trend direction on integration frequency and development cycle time is more actionable than a deployment count. |
| "DORA research shows elite teams hit specific thresholds. Shouldn't we target those?" | The research shows what elite teams produce, not how to become one. Elite teams hit those thresholds because they exhibit the behaviors that generate them. Targeting the output without the behavior produces gaming, not improvement. |
| "We need measurable goals to drive accountability" | Set goals on behaviors: "every developer integrates to trunk daily," "no branches older than one day," "stories average one day of development." These are measurable, actionable, and directly within the team's control. |
| "We already have a DORA dashboard. Do we throw it away?" | Keep it as a confirmation layer. Stop using it as an accountability tool. It tells you whether your improvement work is having the right long-term effect. That is a useful signal. It is not a useful target. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Integration frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) | Increasing trend as branches shorten and story size decreases |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Stories completing in one to two days rather than one to two weeks |
| Build success rate | Stable at 90% or higher as the team treats broken builds as stop-the-line events |
| Time to fix a broken build | Under 10 minutes as a team norm, not just an average |
| Improvement experiments completed | 2-4 per month, each with a defined hypothesis tied to a leading indicator |
| DORA metrics (confirmation) | Gradual improvement over 3-6 months as the leading indicator improvements compound |

## Related Content

- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - using leading and lagging metrics together in an improvement kata
- [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}) - capturing DORA metrics as a starting point, not a target
- [Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) - the leading indicator most directly tied to CD health
- [Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) - measuring story-level batch size
- [Velocity as a Team Productivity Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-team-metric" >}}) - the same anti-pattern applied to story points
- [Hypothesis-Driven Development]({{< relref "/docs/migrate-to-cd/optimize/hypothesis-driven-development" >}}) - running improvement experiments against leading indicators
