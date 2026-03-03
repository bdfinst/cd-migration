---
aliases:
  - /docs/symptoms/alert-fatigue/
title: "The Team Ignores Alerts Because There Are Too Many"
linkTitle: "Alert fatigue"
description: >
  Alert volume is so high that pages fire for non-issues. Real problems are lost in the noise.
tags:
  - observability
---

## What you are seeing

The on-call phone goes off fourteen times this week. Eight of the pages were non-issues that resolved on their own. Three were false positives from a known monitoring misconfiguration that nobody has prioritized fixing. One was a real problem. The on-call engineer, conditioned by a week of false positives, dismisses the real page as another false alarm. The real problem goes unaddressed for four hours.

The team has more alerts than they can respond to meaningfully. Every metric has an alert. The thresholds were set during a brief period when everything was running smoothly and nobody has touched them since. When a database is slow, thirty alerts fire simultaneously for every downstream metric that depends on database performance. The alert storm is worse than the underlying problem.

Alert fatigue develops slowly. It starts with a few noisy alerts that are tolerated because fixing them is less urgent than current work. Each new service adds more alerts calibrated optimistically. Over time, the signal disappears in the noise, and the on-call rotation becomes a form of learned helplessness. Real incidents are discovered by users before they are discovered by the team.

## Common causes

### Blind operations

Teams that have not developed observability as a discipline often configure alerts as an afterthought. Every metric gets an alert, thresholds are guessed rather than calibrated, and alert correlation - multiple alerts from one underlying cause - is never considered. This approach produces alert storms, not actionable signals.

Good alerting requires deliberate design: alerts should be tied to user-visible symptoms rather than internal metrics, thresholds should be calibrated to real traffic patterns, and correlated alerts should suppress to a single notification. This design requires treating observability as a continuous practice rather than a one-time setup.

**Read more:** [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}})

### Missing deployment pipeline

A [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) provides a natural checkpoint for validating monitoring configuration as part of each deployment. Without a pipeline, monitoring is configured manually at deployment time and never revisited in a structured way. Alert thresholds set at initial deployment are never recalibrated as traffic patterns change.

A pipeline that includes monitoring configuration as code - alert thresholds defined alongside the service code they monitor - makes alert configuration a versioned, reviewable [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) rather than a manual configuration that drifts.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

## How to narrow it down

1. **What percentage of pages this week required action?** If less than half required action, the alert signal-to-noise ratio is too low. Start with [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}).
2. **Are alert thresholds defined as code or set manually in a UI?** Manual threshold configuration drifts and is never revisited. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
3. **Do alerts fire at the symptom level (user-visible problems) or the metric level (internal system measurements)?** Metric-level alerts create alert storms when one root cause affects many metrics. Start with [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}).

**Ready to fix this?** The most common cause is [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations#how-to-fix-it" >}}) section for week-by-week steps.
