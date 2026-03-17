---
aliases:
  - /docs/symptoms/chasing-dora-benchmarks/
title: "The Team Is Chasing DORA Benchmarks"
linkTitle: "Chasing DORA benchmarks"
description: >
  The team treats DORA metrics as targets to hit rather than signals of delivery health,
  optimizing numbers instead of the practices that drive them.
tags:
  - team-dynamics
  - observability
---

## What you are seeing

The team has started tracking DORA metrics and is now asking which benchmark tier they should
be aiming for. Someone has seen the DORA research showing that elite performers deploy hundreds
of times per day, and the question on the table is: what number should we be hitting? The
conversation focuses on the metric, not on what is making deployments slow or risky.

A related version of this symptom appears when the team debates which metric to "focus on
first" as if improvement is a matter of directing attention at a number. The team wants to
know whether they should prioritize deployment frequency or lead time, without connecting
either metric to the specific practices that would cause them to change.

The metrics are moving in the wrong direction, or not moving at all, and the response is to
look harder at the dashboard. Improvement conversations center on the score rather than the
delivery process. The team knows what the numbers are but not what is causing them.

## Common causes

### DORA metrics used as targets

When DORA metrics are treated as OKRs or performance goals, teams optimize the number rather
than the underlying behavior. Deployment frequency goes up because the team starts deploying
to staging more often or splitting releases artificially. The metric improves. The actual
delivery process does not. Leadership sees progress on the dashboard; the team knows the
progress is not real.

The metrics are designed to be outcomes of good practices, not inputs to be directly
controlled. Deployment frequency rises when the delivery pipeline is fast and reliable enough
that deploying is routine. Lead time shortens when work is small, integrated continuously, and
moving without wait states. The benchmark is a description of what becomes possible once the
practices are in place, not a target to engineer toward.

**Read more:** [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}})

### Proxy metrics substituted for delivery understanding

The DORA benchmark conversation is often a symptom of a broader pattern: using a reported
number as a substitute for understanding what is actually happening in the delivery process.
The same dynamic appears with story points and velocity. When a team optimizes velocity, point
inflation follows. When a team optimizes deployment frequency without improving the pipeline,
deploy theater follows. The metric drifts from the thing it was meant to measure.

The diagnostic question is not "are we hitting the benchmark?" but "are deployments getting
easier, faster, and less risky over time?" A team that deploys twice a week with high
confidence is in a healthier position than one that deploys daily while holding its breath.
The metric is a trailing indicator; the practices come first.

**Read more:** [Velocity as a Team Productivity Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-team-metric" >}})

## How to narrow it down

1. **Are the DORA metrics appearing on a management dashboard or OKR tracker?** If leadership
   is tracking DORA numbers as performance indicators, the team will optimize the number rather
   than the practice. Start with
   [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}).
2. **Is the team asking which metric to improve rather than which practice is limiting them?**
   If the conversation is about which number to focus on rather than what is slowing or
   destabilizing deployments, the metrics have replaced process understanding rather than
   supporting it. Start with
   [Velocity as a Team Productivity Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-team-metric" >}})
   for the pattern, then use the [Metrics reference]({{< relref "/docs/reference/metrics" >}})
   to connect each metric to the practices that drive it.

## Related content

- [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}) - the anti-pattern driving this symptom
- [Metrics reference]({{< relref "/docs/reference/metrics" >}}) - what each metric measures and what causes it to improve
- [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}) - how to use metrics diagnostically at the start of a migration
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - using metrics to guide improvement rather than report progress
