---
aliases:
  - /docs/symptoms/stateful-service-deployment-outages/
title: "Deploying Stateful Services Causes Outages"
linkTitle: "Stateful service deployment outages"
description: >
  Services holding in-memory state drop connections, lose sessions, or cause cache invalidation spikes on every redeployment.
tags:
  - deployment-automation
  - environment-consistency
---

## What you are seeing

Deploying the session service drops active user sessions. Deploying the WebSocket server disconnects every connected client. Deploying the in-memory cache causes a cold-start period where every request misses cache for the next thirty minutes. The team knows which services are stateful and has developed rituals around deploying them: off-peak deployment windows, user notifications, manual drain procedures, runbooks specifying exact steps.

The rituals work until they do not. Someone deploys without the drain procedure because it was not enforced. A hotfix has to go out on a Tuesday afternoon because a security vulnerability was disclosed. The "we only deploy stateful services on weekends" policy conflicts with "we need to fix this now." Users notice.

The underlying issue is that the deployment process does not account for the service's stateful nature. There is no automated drain, no graceful shutdown that allows in-flight requests to complete, no mechanism for the new instance to warm up before the old one is terminated. The service was designed and deployed with no thought given to how it would be upgraded without interruption.

## Common causes

### Manual deployments

Stateful service deployments require precise sequencing: drain connections, allow in-flight requests to complete, terminate the old instance, start the new one, allow it to warm up before accepting traffic. Manual deployments rely on humans executing this sequence correctly under time pressure, from memory, without making mistakes.

Automated deployment pipelines that include graceful shutdown hooks, configurable drain timeouts, and health check gates before traffic routing eliminate the human sequencing requirement. The procedure is defined once, tested in lower environments, and executed consistently in production. Deployments that previously caused dropped sessions or cold-start spikes complete without service interruption because the sequencing is never skipped.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing deployment pipeline

A pipeline can enforce graceful shutdown logic, connection drain periods, and health check gates as part of every deployment. Blue-green deployments - starting the new instance alongside the old one, waiting for it to become healthy, then shifting traffic - eliminate the downtime window entirely for stateless services and reduce it dramatically for stateful ones.

Without a pipeline, each deployment is a custom procedure executed by the operator on duty. The procedure may exist in a runbook, but runbooks are not enforced - they are consulted selectively and executed inconsistently.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Snowflake environments

When staging environments do not replicate the stateful characteristics of production - connection volumes, session counts, cache sizes, WebSocket concurrency - the drain procedure validated in staging does not reliably translate to production behavior. A drain that completes in 30 seconds in staging may take 10 minutes in production under load.

Environments that match production in scale and configuration allow stateful deployment procedures to be validated with confidence. The drain timing is calibrated to real traffic patterns, so the procedure that completes cleanly in staging also completes cleanly in production - and deployments stop causing outages that only surface under real load.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

## How to narrow it down

1. **Is there an automated drain and graceful shutdown procedure for stateful services?** If drain is manual or undocumented, the deployment will cause interruptions whenever the procedure is not followed perfectly. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does the pipeline include health check gates before routing traffic to the new instance?** If traffic switches before the new instance is healthy, users hit the new instance while it is still warming up. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Do staging environments match production in connection volume and load characteristics?** If not, drain timing and warm-up behavior validated in staging will not generalize. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).
