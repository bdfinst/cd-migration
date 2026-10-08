---
aliases:
  - /docs/symptoms/services-without-health-checks/
title: "Services Reach Production with No Health Checks or Alerting"
linkTitle: "Services without health checks"
description: >
  No criteria exist for what a service needs before going live. New services deploy to production with no observability in place.
tags:
  - observability
  - deployment-automation
---

## What you are seeing

A new service ships and the team moves on. Three weeks later, an on-call engineer is paged for a production incident involving that service. They open the monitoring dashboard and find nothing. No metrics, no alerts, no logs aggregation, no health endpoint. The service has been running in production for three weeks without anyone being able to tell whether it was healthy.

The problem is not that engineers forgot. Nothing prevented shipping without observability.

"Ready to deploy" means the feature is complete and tests pass. That definition does not require a health endpoint or published metrics. It also does not require alerts for error rate and latency, or an entry in the on-call runbook. These are treated as optional improvements to add later, and later rarely comes.

As the team owns more services, the operational burden grows unevenly. Some services have mature observability built over years of incidents. Others are invisible. On-call engineers learn which services are opaque and dread incidents that involve them. The services most likely to cause undiscovered problems are exactly the ones hardest to observe when problems occur.

## Common causes

### Blind operations

When observability is not a team-wide practice and value, it does not get built into new services by default. Services are built to the standard in place when they were written. If the team did not have a culture of shipping with health checks and alerting, early services were shipped without them. Each new service follows the existing pattern.

Make observability a first-class delivery requirement, part of the definition of done for any service. New services then ship with production readiness built in rather than bolted on after the first incident. Services stop running unmonitored in production for weeks because no service can reach production without meeting the standard.

**Read more:** [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}})

### Missing deployment pipeline

A [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) can enforce deployment standards as a condition of promotion to production. A pipeline stage can check for a functioning health endpoint, at least one defined alert, and a runbook entry. That stage prevents services from bypassing the standard. When the check fails, the deployment fails, and the engineer must add the missing observability before proceeding.

Without this gate in the pipeline, observability requirements are advisory. Engineers who are under deadline pressure deploy without meeting them. The standard becomes aspirational rather than enforced.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

## How to narrow it down

1. **Does the deployment pipeline check for a functioning health endpoint before production deployment?** If not, services can ship without health checks and nobody knows until an incident. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
2. **Does the team have an explicit standard for what a service needs before production?** If no standard exists or nobody enforces it, services reflect individual habits rather than a team baseline. Start with [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}).
3. **Are there services in production with no associated alerts?** If yes, the team learns about incidents in those services from user reports rather than monitoring. Start with [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}).

**Ready to fix this?** The most common cause is [Blind operations]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/monitoring-observability/blind-operations#how-to-fix-it" >}}) section for week-by-week steps.
