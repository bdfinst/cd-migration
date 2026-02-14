---
title: "Production Issues Discovered by Customers"
linkTitle: "Issues found by customers"
weight: 80
description: >
  The team finds out about production problems from support tickets, not alerts.
---

## What you are seeing

The team deploys a change. Someone asks "is it working?" Nobody knows. There is no dashboard to
check. There are no metrics to compare before and after. The team waits. If nobody complains
within an hour, they assume the deployment was successful.

When something does go wrong, the team finds out from a customer support ticket, a Slack message
from another team, or an executive asking why the site is slow. The investigation starts with
SSH-ing into a server and reading raw log files. Hours pass before anyone understands what
happened, what caused it, or how many users were affected.

## Common causes

### Blind Operations

The team has no application-level metrics, no centralized logging, and no alerting. The
infrastructure may report that servers are running, but nobody can tell whether the application
is actually working correctly. Without instrumentation, the only way to discover a problem is to
wait for someone to experience it and report it.

**Read more:** [Blind Operations](../anti-patterns/monitoring-observability/blind-operations/)

### Manual Deployments

When deployments involve human steps (running scripts by hand, clicking through a console),
there is no automated verification step. The deployment process ends when the human finishes the
steps, not when the system confirms it is healthy. Without an automated pipeline that checks
health metrics after deploying, verification falls to manual spot-checking or waiting for
complaints.

**Read more:** [Manual Deployments](../anti-patterns/pipeline/manual-deployments/)

### Missing Deployment Pipeline

When there is no automated path from commit to production, there is nowhere to integrate
automated health checks. A deployment pipeline can include post-deploy verification that
compares metrics before and after. Without a pipeline, verification is entirely manual and
usually skipped under time pressure.

**Read more:** [Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/)

## How to narrow it down

1. **Does the team have application-level metrics and alerts?** If no, the team has no way to
   detect problems automatically. Start with
   [Blind Operations](../anti-patterns/monitoring-observability/blind-operations/).
2. **Is the deployment process automated with health checks?** If deployments are manual or
   automated without post-deploy verification, problems go undetected until users report them.
   Start with [Manual Deployments](../anti-patterns/pipeline/manual-deployments/) or
   [Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Does the team check a dashboard after every deployment?** If the answer is "sometimes" or
   "we click through the app manually," the verification step is unreliable. Start with
   [Blind Operations](../anti-patterns/monitoring-observability/blind-operations/) to build
   automated verification.
