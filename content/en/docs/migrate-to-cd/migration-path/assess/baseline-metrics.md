---
title: "Baseline Metrics"
linkTitle: "Baseline Metrics"
weight: 2
description: >
  Establish baseline measurements for your current delivery performance before making any changes.
---

{{% pageinfo %}}
**Phase 0 - Assess** | Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

You cannot improve what you have not measured. Before making any changes to your delivery process,
you need to capture baseline measurements of your current performance. These baselines serve two
purposes: they help you identify where to focus your migration effort, and they give you an
honest "before" picture so you can demonstrate progress as you improve.

This is not about building a sophisticated metrics dashboard. It is about getting four numbers
written down so you have a starting point.

## Why Measure Before Changing

Teams that skip baseline measurement fall into predictable traps:

- **They cannot prove improvement.** Six months into a migration, leadership asks "What has gotten
  better?" Without a baseline, the answer is a shrug and a feeling.
- **They optimize the wrong thing.** Without data, teams default to fixing what is most visible or
  most annoying rather than what is the actual constraint.
- **They cannot detect regression.** A change that feels like an improvement may actually make
  things worse in ways that are not immediately obvious.

Baselines do not need to be precise to the minute. A rough but honest measurement is vastly more
useful than no measurement at all.

## The Four Essential Metrics

The DORA research program (now part of Google Cloud) identified four key metrics that predict
software delivery performance and organizational outcomes. These are the metrics you should
baseline first.

### 1. Deployment Frequency

**What it measures:** How often your team deploys to production.

**How to capture it:** Count the number of production deployments in the last 30 days. Check your
deployment logs, pipeline system, or change management records. If deployments are rare enough that
you remember each one, count from memory.

**What it tells you:**

| Frequency | What It Suggests |
|-----------|------------------|
| Multiple times per day | You may already be practicing continuous delivery |
| Once per week | You have a regular cadence but likely batch changes |
| Once per month or less | Large batches, high risk per deployment, likely manual process |
| Varies wildly | No consistent process; deployments are event-driven |

**Record your number:** ______ deployments in the last 30 days.

### 2. Lead Time for Changes

**What it measures:** The elapsed time from when code is committed to when it is running in
production.

**How to capture it:** Pick your last 5-10 production deployments. For each one, find the commit
timestamp of the oldest change included in that deployment and subtract it from the deployment
timestamp. Take the median.

If your team uses feature branches, the clock starts at the first commit on the branch, not when
the branch is merged. This captures the true elapsed time the change spent in the system.

**What it tells you:**

| Lead Time | What It Suggests |
|-----------|------------------|
| Less than 1 hour | Fast flow, likely small batches and good automation |
| 1 day to 1 week | Reasonable but with room for improvement |
| 1 week to 1 month | Significant queuing, likely large batches or manual gates |
| More than 1 month | Major constraints in testing, approval, or deployment |

**Record your number:** ______ median lead time for changes.

### 3. Change Failure Rate

**What it measures:** The percentage of deployments to production that result in a degraded
service requiring remediation (rollback, hotfix, patch, or incident).

**How to capture it:** Look at your last 20-30 production deployments. Count how many caused an
incident, required a rollback, or needed an immediate hotfix. Divide by the total number of
deployments.

**What it tells you:**

| Failure Rate | What It Suggests |
|--------------|------------------|
| 0-5% | Strong quality practices and small change sets |
| 5-15% | Typical for teams with some automation |
| 15-30% | Quality gaps, likely insufficient testing or large batches |
| Above 30% | Systemic quality problems; changes are frequently broken |

**Record your number:** ______ % of deployments that required remediation.

### 4. Mean Time to Restore (MTTR)

**What it measures:** How long it takes to restore service after a production failure caused by a
deployment.

**How to capture it:** Look at your production incidents from the last 3-6 months. For each
incident caused by a deployment, note the time from detection to resolution. Take the median.
If you have not had any deployment-caused incidents, note that - it either means your quality
is excellent or your deployment frequency is so low that you have insufficient data.

**What it tells you:**

| MTTR | What It Suggests |
|------|------------------|
| Less than 1 hour | Good incident response, likely automated rollback |
| 1-4 hours | Manual but practiced recovery process |
| 4-24 hours | Significant manual intervention required |
| More than 1 day | Serious gaps in observability or rollback capability |

**Record your number:** ______ median time to restore service.

## Capturing Your Baselines

You do not need specialized tooling to capture these four numbers. Here is a practical approach:

1. **Check your pipeline system.** Most pipeline tools (Jenkins, GitHub Actions, GitLab CI, Azure
   DevOps) have deployment history. Export the last 30-90 days of deployment records.
2. **Check your incident tracker.** Pull incidents from the last 3-6 months and filter for
   deployment-caused issues.
3. **Check your version control.** Git log data combined with deployment timestamps gives you
   lead time.
4. **Ask the team.** If data is scarce, have a conversation with the team. Experienced team
   members can provide reasonable estimates for all four metrics.

Record these numbers somewhere the whole team can see them. A wiki page, a whiteboard, a shared
document - the format does not matter. What matters is that they are written down and dated.

{{% alert title="What About Automation?" %}}
If you already have a pipeline system that tracks deployments, you can extract most of these numbers
programmatically. But do not let the pursuit of automation delay your baseline. A spreadsheet
with manually gathered numbers is perfectly adequate for Phase 0. You will build more
sophisticated measurement into your pipeline in [Phase 2](../../pipeline/).
{{% /alert %}}

## What Your Baselines Tell You About Where to Focus

Your baseline metrics point toward specific constraints:

| Signal | Likely Constraint | Where to Look |
|--------|-------------------|---------------|
| Low deployment frequency + high lead time | Large batches, manual process | [Value Stream Map](../value-stream-mapping/) for queue times |
| High change failure rate | Insufficient testing, poor quality practices | [Testing Fundamentals](../../foundations/testing-fundamentals/) |
| High MTTR | No rollback capability, poor observability | [Rollback](../../pipeline/rollback/) |
| High lead time + low change failure rate | Excessive manual gates adding delay but not value | [Identify Constraints](../identify-constraints/) |

Use these signals alongside your value stream map to [identify your top constraints](../identify-constraints/).

## A Warning About Metrics

{{% alert title="Goodhart's Law" color="warning" %}}
"When a measure becomes a target, it ceases to be a good measure."

These metrics are diagnostic tools, not performance targets. The moment you use them to compare
teams, rank individuals, or set mandated targets, people will optimize for the metric rather
than for actual delivery improvement. A team can trivially improve their deployment frequency
number by deploying empty changes, or reduce their change failure rate by never deploying anything
risky.

Use these metrics within the team, for the team. Share trends with leadership if needed, but
never publish team-level metrics as a leaderboard. The goal is to help each team understand
their own delivery health, not to create competition.
{{% /alert %}}

## Next Step

With your baselines recorded, proceed to [Identify Constraints](../identify-constraints/) to
determine which bottleneck to address first.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## Related Content

- [Deployment Frequency](../../../reference/metrics/release-frequency/) - detailed guidance on measuring how often you deploy
- [Lead Time for Changes](../../../reference/metrics/lead-time/) - how to measure the time from commit to production
- [Change Failure Rate](../../../reference/metrics/change-fail-rate/) - measuring the percentage of deployments that cause failures
- [Mean Time to Restore](../../../reference/metrics/mean-time-to-repair/) - measuring recovery speed after production incidents
- [DORA Capabilities](../../../reference/dora-capabilities/) - the research-backed capabilities these metrics reflect
- [Infrequent Releases](../../../symptoms/deployment/infrequent-releases/) - a symptom that low deployment frequency baselines often reveal
