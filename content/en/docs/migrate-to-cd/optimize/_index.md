---
title: "Phase 3: Optimize"
linkTitle: "3 - Optimize"
weight: 4
description: >
  Improve flow by reducing batch size, limiting work in progress, and using metrics to drive improvement.
---

{{% pageinfo %}}
**Key question:** "Can we deliver small changes quickly?"

With a working [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) in place, this phase focuses on optimizing the flow of changes
through it. Smaller batches, [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}), and [WIP]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}) limits reduce risk and increase
delivery frequency.
{{% /pageinfo %}}

## What You'll Do

1. **[Reduce batch size]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}})** - Deliver smaller, more frequent changes
2. **[Use feature flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}})** - Decouple deployment from release
3. **[Limit work in progress]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}})** - Focus on finishing over starting
4. **[Drive improvement with metrics]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}})** - Use [DORA metrics]({{< relref "/docs/reference/glossary#dora-metrics" >}}) and improvement kata
5. **[Run effective retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}})** - Continuously improve the delivery process
6. **[Decouple architecture]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}})** - Enable independent deployment of components
7. **[Align teams to code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}})** - Match team ownership to code boundaries for independent deployment
8. **Build observability** - Structured logging, monitoring, and alerting so you can detect problems and recover quickly

## Why This Phase Matters

Having a pipeline isn't enough. You need to optimize the flow through it. Teams that
deploy weekly with a [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline are missing most of the benefits. Small batches reduce
risk, feature flags enable testing in production, and metrics-driven improvement creates
a virtuous cycle of getting better at getting better.

## When You're Ready to Move On

You're ready for [Phase 4: Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}) when:

- Most changes are small enough to deploy independently
- Feature flags let you deploy incomplete features safely
- Your WIP limits keep work flowing without bottlenecks
- You're measuring and improving your DORA metrics regularly

**Next:** [Phase 4 - Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}) - remove the last manual gates and deploy on demand.

---

## Related Content

- [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) - the previous phase that establishes the deployment pipeline this phase optimizes
- [Phase 4: Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}) - the next phase after flow is optimized
- [Infrequent Releases]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}) - a key symptom that the Optimize phase addresses
- [Too Much WIP]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - a flow symptom targeted by WIP limits and small batches
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - the research-backed capabilities that drive delivery performance
- [Deployment Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) - the primary metric that improves as optimization takes hold
