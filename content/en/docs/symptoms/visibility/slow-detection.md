---
aliases:
  - /docs/symptoms/slow-detection/
title: "Production Problems Are Discovered Hours or Days Late"
linkTitle: "Slow problem detection"
description: >
  Issues in production are not discovered until users report them. There is no automated detection
  or alerting.
tags:
  - observability
---

## What you are seeing

A deployment goes out on Tuesday. On Thursday, a support ticket comes in: a feature is broken for
a subset of users. The team investigates and discovers the problem was introduced in Tuesday's
deploy. For two days, users experienced the issue while the team had no idea.

Or a performance degradation appears gradually. Response times creep up over a week. Nobody
notices until a customer complains or a business metric drops. The team checks the dashboards and
sees the degradation started after a specific deploy, but the deploy was days ago and the trail is
cold.

The team deploys carefully and then "watches for a while." Watching means checking a few URLs
manually or refreshing a dashboard for 15 minutes. If nothing obviously breaks in that window, the
deployment is declared successful. Problems that manifest slowly, affect a subset of users, or
appear under specific conditions go undetected.

## Common causes

### Blind Operations

When the team has no monitoring, no alerting, and no aggregated logging, production is a black
box. The only signal that something is wrong comes from users, support staff, or business reports.
The team cannot detect problems because they have no instruments to detect them with. Adding
observability (metrics, structured logging, distributed tracing, alerting) gives the team eyes on
production.

**Read more:** [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Undone Work

When the team's definition of done does not include post-deployment verification, nobody is
responsible for confirming that the deployment is healthy. The story is "done" when the code is
merged or deployed, not when it is verified in production. Health checks, smoke tests, and canary
analysis are not part of the workflow because the workflow ends before production.

**Read more:** [Undone Work](../../anti-patterns/team-workflow/undone-work/)

### Manual Deployments

When deployments are manual, there is no automated post-deploy verification step. An automated
pipeline can include health checks, smoke tests, and rollback triggers as part of the deployment
sequence. A manual deployment ends when the human finishes the runbook. Whether the deployment is
actually healthy is a separate question that may or may not get answered.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **Does the team have production monitoring with alerting thresholds?** If not, the team cannot
   detect problems that users do not report. Start with
   [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/).
2. **Does the team's definition of done include post-deploy verification?** If stories are closed
   before production health is confirmed, nobody owns the detection step. Start with
   [Undone Work](../../anti-patterns/team-workflow/undone-work/).
3. **Does the deployment process include automated health checks?** If deployments end when the
   human finishes the script, there is no automated verification. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).

---

## Related Content

- [Production Issues Discovered by Customers](../production-issues-found-by-customers/) - The next stage of the same problem: customers become the monitoring
- [The Team Is Afraid to Deploy](../../symptoms/deployment/fear-of-deploying/) - Slow detection makes deployments feel riskier
- [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/) - The root cause when no automated detection exists
- [Pipeline Architecture](../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - Embedding health checks into the deployment process
- [Progressive Rollout](../../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/) - Automated rollback on health check failure
- [Mean Time to Repair](../../reference/metrics/mean-time-to-repair/) - Track detection and recovery speed
