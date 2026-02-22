---
title: "Phase 3: Optimize"
linkTitle: "3 - Optimize"
weight: 4
description: >
  Improve flow by reducing batch size, limiting work in progress, and using metrics to drive improvement.
---

{{% pageinfo %}}
**Key question:** "Can we deliver small changes quickly?"

With a working [pipeline](../../../glossary/#pipeline) in place, this phase focuses on optimizing the flow of changes
through it. Smaller batches, [feature flags](../../../glossary/#feature-flag), and [WIP](../../../glossary/#wip-work-in-progress) limits reduce risk and increase
delivery frequency.
{{% /pageinfo %}}

## What You'll Do

1. **[Reduce batch size](small-batches/)** - Deliver smaller, more frequent changes
2. **[Use feature flags](feature-flags/)** - Decouple deployment from release
3. **[Limit work in progress](limiting-wip/)** - Focus on finishing over starting
4. **[Drive improvement with metrics](metrics-driven-improvement/)** - Use [DORA metrics](../../../glossary/#dora-metrics) and improvement kata
5. **[Run effective retrospectives](retrospectives/)** - Continuously improve the delivery process
6. **[Decouple architecture](architecture-decoupling/)** - Enable independent deployment of components

## Why This Phase Matters

Having a pipeline isn't enough - you need to optimize the flow through it. Teams that
deploy weekly with a [CD](../../../glossary/#cd-continuous-delivery) pipeline are missing most of the benefits. Small batches reduce
risk, feature flags enable testing in production, and metrics-driven improvement creates
a virtuous cycle of getting better at getting better.

## When You're Ready to Move On

You're ready for [Phase 4: Deliver on Demand](../continuous-deployment/) when:

- Most changes are small enough to deploy independently
- Feature flags let you deploy incomplete features safely
- Your WIP limits keep work flowing without bottlenecks
- You're measuring and improving your DORA metrics regularly

**Next:** [Phase 4 - Continuous Deployment](../continuous-deployment/) - remove the last manual gates and deploy on demand.

---

## Related Content

- [Phase 2: Pipeline](../pipeline/) - the previous phase that establishes the deployment pipeline this phase optimizes
- [Phase 4: Deliver on Demand](../continuous-deployment/) - the next phase after flow is optimized
- [Infrequent Releases](../../../symptoms/deployment/infrequent-releases/) - a key symptom that the Optimize phase addresses
- [Too Much WIP](../../../symptoms/flow/too-much-wip/) - a flow symptom targeted by WIP limits and small batches
- [DORA Capabilities](../../../dora-capabilities/) - the research-backed capabilities that drive delivery performance
- [Deployment Frequency](../../../metrics/release-frequency/) - the primary metric that improves as optimization takes hold
