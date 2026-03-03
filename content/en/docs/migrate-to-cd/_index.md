---
title: "Migrate to CD"
linkTitle: "Migrate to CD"
weight: 6
sidebar_divider_above: true
description: >
  A phased approach to adopting continuous delivery, from assessing your current state through full continuous deployment.
---

{{% pageinfo %}}
Choose the path that matches your situation. Brownfield teams migrating existing systems and
greenfield teams building from scratch each have a dedicated guide. The phases below provide
the roadmap both approaches follow.
{{% /pageinfo %}}

## The Phases

| Phase | Focus | Key Question |
|-------|-------|-------------|
| [0 - Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) | Understand your current state | How far are we from [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}})? |
| [1 - Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}) | Daily integration, testing, small batches | Can we integrate safely every day? |
| [2 - Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) | Automated path from commit to production | Can we deploy any commit automatically? |
| [3 - Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}) | Reduce [batch size]({{< relref "/docs/reference/glossary#batch-size" >}}), limit [WIP]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}), measure | Can we deliver small changes quickly? |
| [4 - Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}) | Deploy any change when the business needs it | Can we deliver any change to production when needed? |

## Where to Start

If you are unsure where to begin, start with [Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) to understand your
current state and identify the [constraints]({{< relref "/docs/reference/glossary#constraint" >}}) holding you back.

---

## Related Content

- [For Developers]({{< relref "/docs/symptoms/for-developers" >}}) - Common pain points developers face before CD adoption
- [For Managers]({{< relref "/docs/symptoms/for-managers" >}}) - How delivery problems appear from a management perspective
- [Brownfield CD]({{< relref "/docs/migrate-to-cd/brownfield" >}}) - Migrating an existing system
- [Greenfield CD]({{< relref "/docs/migrate-to-cd/greenfield" >}}) - Building CD from day one
- [FAQ]({{< relref "/docs/reference/faq" >}}) - Frequently asked questions about continuous delivery
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - The research-backed capabilities that drive delivery performance
