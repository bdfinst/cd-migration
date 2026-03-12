---
title: "Baseline Metrics"
linkTitle: "Baseline Metrics"
weight: 2
description: >
  Capture baseline CI and DORA metrics before making any changes so you have an honest starting point and can measure progress.
---

{{% pageinfo %}}
**Phase 0 - Assess** | {{< scope-label "team" >}}
{{% /pageinfo %}}

You cannot improve what you have not measured. Before making any changes to your delivery process,
capture two types of baseline measurements: CI health metrics and DORA outcome metrics.

- **CI health metrics** are leading indicators. They reflect current team behaviors and move
  immediately when those behaviors change. Use them to drive improvement experiments throughout
  the migration.
- **DORA metrics** are lagging outcome metrics. They reflect the cumulative effect of many upstream
  behaviors and move slowly. Capture them now as your honest "before" picture for reporting
  progress to leadership.

Without baselines, you cannot prove improvement, cannot detect regression, and default to fixing
what is visible rather than what is the actual
[constraint]({{< relref "/docs/reference/glossary#constraint" >}}).

## CI Health Metrics

These three metrics tell you whether your team's integration practices are healthy. They surface
problems immediately and are your primary signal during the migration.

### Integration Frequency

**What it measures:** How often developers commit and integrate to trunk per day.

**How to capture it:** Count commits merged to trunk over the last 10 working days. Divide by the
number of active developers and by 10.

| Frequency | What It Suggests |
|-----------|------------------|
| 2 or more per developer per day | Small batches, fast feedback |
| 1 per developer per day | Reasonable starting point |
| Less than 1 per developer per day | Long-lived branches or large work items |

**Record your number:** ______ average commits to trunk per developer per day.

### Build Success Rate

**What it measures:** The percentage of CI builds that pass on the first attempt.

**How to capture it:** Pull the last 30 days of CI build history from your pipeline tool. Divide
passing builds by total builds.

| Success Rate | What It Suggests |
|--------------|------------------|
| 90% or higher | Reliable pipeline; developers integrate with confidence |
| 70-90% | Flaky tests or inconsistent local validation before pushing |
| Below 70% | Broken build is normalized; integration discipline is low |

**Record your number:** ______ % of CI builds that pass on first attempt.

### Time to Fix a Broken Build

**What it measures:** The elapsed time from a build breaking on trunk to the next green build.

**How to capture it:** Identify build failures on trunk over the last 30 days. For each failure,
record the time from first red build to next green build. Take the median.

| Time to Fix | What It Suggests |
|-------------|------------------|
| Less than 10 minutes | Team treats broken builds as stop-the-line |
| 10-60 minutes | Manual but fast response |
| More than 1 hour | Broken build is not treated as urgent |

**Record your number:** ______ median time to fix a broken build.

## DORA Metrics

The [DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}}) research program (now part of Google Cloud) identified four metrics that predict
software delivery performance and organizational outcomes. These are lagging indicators -
they confirm that improvement work is compounding into better delivery outcomes.

Do not use these as improvement targets. See
[DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}).

### Deployment Frequency

**What it measures:** How often your team deploys to production.

**How to capture it:** Count the number of production deployments in the last 30 days. Check
your pipeline system, deployment logs, or change management records.

| Frequency | What It Suggests |
|-----------|------------------|
| Multiple times per day | You may already be practicing [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) |
| Once per week | Regular cadence but likely batch changes |
| Once per month or less | Large batches, high risk per deployment, likely manual process |

**Record your number:** ______ deployments in the last 30 days.

### Lead Time for Changes

**What it measures:** The elapsed time from when code is committed to trunk to when it is
running in production.

**How to capture it:** Pick your last 5-10 production deployments. For each one, find the merge
timestamp of the oldest change included and subtract it from the deployment timestamp. Take
the median.

| Lead Time | What It Suggests |
|-----------|------------------|
| Less than 1 hour | Fast flow, small batches, good automation |
| 1 day to 1 week | Reasonable with room for improvement |
| 1 week to 1 month | Significant queuing or manual gates |
| More than 1 month | Major constraints in testing, approval, or deployment |

**Record your number:** ______ median lead time for changes.

### Change Failure Rate

**What it measures:** The percentage of deployments to production that result in a degraded
service requiring remediation ([rollback]({{< relref "/docs/reference/glossary#rollback" >}}), hotfix, or patch).

**How to capture it:** Look at your last 20-30 production deployments. Count how many caused an
incident, required a rollback, or needed an immediate hotfix. Divide by total deployments.

| Failure Rate | What It Suggests |
|--------------|------------------|
| 0-15% | Strong quality practices and small change sets |
| 16-30% | Typical for teams with some automation |
| Above 30% | Systemic quality problems |

**Record your number:** ______ % of deployments that required remediation.

### Mean Time to Restore (MTTR)

**What it measures:** How long it takes to restore service after a production failure caused by
a deployment.

**How to capture it:** Look at your production incidents from the last 3-6 months. For each
incident caused by a deployment, record the time from detection to resolution. Take the median.

| MTTR | What It Suggests |
|------|------------------|
| Less than 1 hour | Good incident response, likely automated rollback |
| 1-4 hours | Manual but practiced recovery process |
| 4-24 hours | Significant manual intervention required |
| More than 1 day | Serious gaps in observability or rollback capability |

**Record your number:** ______ median time to restore service.

## What Your Baselines Tell You

Your numbers point toward specific constraints:

| Signal | Likely Constraint | Where to Look |
|--------|-------------------|---------------|
| Low integration frequency | Long-lived branches or large work items | [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) |
| Low build success rate | Flaky tests or insufficient local validation | [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) |
| Long time to fix broken builds | No stop-the-line culture | [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) |
| Low [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) + long lead time | Large batches or manual gates | [Value Stream Map]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}}) |
| High [change failure rate]({{< relref "/docs/reference/glossary#change-failure-rate-cfr" >}}) | Insufficient testing | [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) |
| Long [MTTR]({{< relref "/docs/reference/glossary#mean-time-to-restore-mttr" >}}) | No rollback capability or poor observability | [Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}) |

Use these signals alongside your [value stream map]({{< relref "/docs/reference/glossary#value-stream-map" >}}) to [identify your top constraints]({{< relref "/docs/migrate-to-cd/assess/identify-constraints" >}}).

{{% alert title="Goodhart's Law" color="warning" %}}
"When a measure becomes a target, it ceases to be a good measure."

These metrics are diagnostic tools, not performance targets. Use them within the team, for the
team. Never use them to rank individuals or compare teams.
{{% /alert %}}

## Next Step

With your baselines recorded, proceed to [Identify Constraints]({{< relref "/docs/migrate-to-cd/assess/identify-constraints" >}}) to
determine which bottleneck to address first.

---

## Related Content

- [Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) - how often developers integrate to trunk
- [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) - pipeline speed as a feedback signal
- [Deployment Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) - how often you deploy to production
- [Lead Time for Changes]({{< relref "/docs/reference/metrics/lead-time" >}}) - time from commit to production
- [Change Failure Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) - percentage of deployments that cause failures
- [Mean Time to Restore]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) - recovery speed after production incidents
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - how to use these metrics to drive improvement in Phase 3
- [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}) - why not to use these as targets
