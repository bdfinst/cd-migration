---
title: "Phase 4: Deliver on Demand"
linkTitle: "4 - Deliver on Demand"
weight: 25
description: >
  The capability to deploy any change to production at any time, using the delivery strategy that fits your context.
aliases:
  - /docs/migrate-to-cd/continuous-deployment/
---

{{% pageinfo %}}
**Key question:** "Can we deliver any change to production when the business needs it?"

Phase 4 is the destination: you can deploy any change that passes the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) to production
whenever you choose. Some teams will auto-deploy every commit ([continuous deployment]({{< relref "/docs/reference/glossary#continuous-deployment" >}})). Others
will deploy on demand when the business is ready. Both are valid - the capability is what
matters, not the trigger.
{{% /pageinfo %}}

## What you'll do

1. **[Deploy on demand]({{< relref "/docs/continuous-deployment/deploy-on-demand" >}})** - Remove the last manual gates so any green build can reach production
2. **[Use progressive rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}})** - [Canary]({{< relref "/docs/reference/glossary#canary-deployment" >}}), [blue-green]({{< relref "/docs/reference/glossary#blue-green-deployment" >}}), and percentage-based deployments
3. **[Explore ACD]({{< relref "/docs/agentic-cd" >}})** - AI-assisted [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) patterns
4. **[Learn from experience reports]({{< relref "/docs/continuous-deployment/experience-reports" >}})** - How other teams made the journey

## Continuous delivery vs. continuous deployment

These terms are often confused. The distinction matters for this phase:

- **Continuous delivery** means every commit that passes the pipeline *could* be deployed to
  production at any time. The capability exists. A human or business process decides when.
- **Continuous deployment** means every commit that passes the pipeline *is* deployed to
  production automatically. No human decision is involved.

Continuous delivery is the goal of this migration guide. Continuous deployment is one delivery
strategy that works well for certain contexts - SaaS products, internal tools, services behind
[feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}). Continuous deployment is not a higher level of maturity. A team that deploys on demand with a
one-click deploy is as capable as a team that auto-deploys every commit.

## Why this phase matters

When your foundations are solid, your pipeline is reliable, and your [batch sizes]({{< relref "/docs/reference/glossary#batch-size" >}}) are small,
deploying any change becomes low-risk. The remaining barriers are organizational, not
technical: approval processes, change windows, release coordination. This phase addresses those
barriers so the team has the *option* to deploy whenever the business needs it.

## Signs you've arrived

- Any commit that passes the pipeline can reach production within minutes
- The team deploys frequently (daily or more) with no drama
- Mean time to recovery is measured in minutes
- The team has confidence that any deployment can be safely rolled back
- New team members can deploy on their first day
- The deployment strategy (on-demand or automatic) is a team choice, not a constraint

---

## Related content

- [Phase 3: Optimize]({{< relref "/docs/optimize" >}}) - the previous phase that establishes small batches, feature flags, and flow improvements
- [Fear of Deploying]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}}) - a deployment symptom that this phase eliminates by making deployment routine and low-risk
- [Infrequent Releases]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}) - a symptom directly addressed by delivering on demand
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - the research-backed capabilities that underpin delivery performance
- [Deployment Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) - the primary metric that reflects delivery-on-demand capability
- [Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) - the recovery metric that progressive rollout and automated rollback improve
