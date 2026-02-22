---
title: "Phase 0: Assess"
linkTitle: "0 - Assess"
weight: 1
description: >
  Understand where you are today. Map your delivery process, measure what matters, and identify the constraints holding you back.
---

{{% pageinfo %}}
**Key question:** "How far are we from [CD](../../../glossary/#cd-continuous-delivery)?"

Before changing anything, you need to understand your current state. This phase helps you
create a clear picture of your delivery process, establish [baseline metrics](../../../glossary/#baseline-metrics), and identify
the [constraints](../../../glossary/#constraint) that will guide your improvement roadmap.
{{% /pageinfo %}}

**Team activity:** The pages in this phase work as a facilitated team exercise. Run [Current State Checklist](current-state-checklist/) as a retrospective to align on where your delivery process stands today before measuring baselines.

## What You'll Do

1. **[Map your value stream](value-stream-mapping/)** - Visualize the flow from idea to production
2. **[Establish baseline metrics](baseline-metrics/)** - Measure your current delivery performance
3. **[Identify constraints](identify-constraints/)** - Find the bottlenecks limiting your flow
4. **[Complete the current-state checklist](current-state-checklist/)** - Self-assess against MinimumCD practices

## Why This Phase Matters

Teams that skip assessment often invest in the wrong improvements. A team with a 3-week manual
testing cycle doesn't need better deployment automation first - they need testing fundamentals.
Understanding your constraints ensures you invest effort where it will have the biggest impact.

## When You're Ready to Move On

You're ready for [Phase 1: Foundations](../foundations/) when you can answer:

- What does our [value stream](../../../glossary/#value-stream-map) look like end-to-end?
- What are our current [lead time](../../../glossary/#lead-time-for-changes), [deployment frequency](../../../glossary/#deployment-frequency), and [change failure rate](../../../glossary/#change-failure-rate-cfr)?
- What are the top 3 constraints limiting our delivery flow?
- Which MinimumCD practices are we missing?

**Next:** [Phase 1 - Foundations](../foundations/) - establish the technical and team practices that make CD possible.

---

## Related Content

- [For Managers](../../../symptoms/for-managers/) - how to recognize delivery problems from a leadership perspective
- [Phase 1: Foundations](../foundations/) - the next phase after assessment is complete
- [DORA Capabilities](../../../dora-capabilities/) - industry-recognized capabilities that underpin delivery performance
- [Deployment Frequency](../../../metrics/release-frequency/) - one of the key metrics you will baseline in this phase
- [Lead Time for Changes](../../../metrics/lead-time/) - the metric that reveals how long changes spend in the system
- [Infrequent Releases](../../../symptoms/deployment/infrequent-releases/) - a common symptom that assessment helps quantify
- [Systemic Defect Sources](../../../defect-sources/) - understand where defects originate before you start measuring them.
