---
title: "Phase 2: Pipeline"
linkTitle: "2 - Pipeline"
weight: 3
description: >
  Build the automated path from commit to production: a single, deterministic pipeline that deploys immutable artifacts.
---

{{% pageinfo %}}
**Key question:** "Can we deploy any commit automatically?"

This phase creates the delivery [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) - the automated path that takes every commit
through build, test, and deployment stages. When done right, the pipeline is the only
way changes reach production.
{{% /pageinfo %}}

## What You'll Do

1. **[Establish a single path to production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}})** - One pipeline for all changes
2. **[Make the pipeline deterministic]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}})** - Same inputs always produce same outputs
3. **[Define "deployable"]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}})** - Clear criteria for what's ready to ship
4. **[Use immutable artifacts]({{< relref "/docs/migrate-to-cd/pipeline/immutable-artifacts" >}})** - Build once, deploy everywhere
5. **[Externalize application config]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}})** - Separate config from code
6. **[Use production-like environments]({{< relref "/docs/migrate-to-cd/pipeline/production-like-environments" >}})** - Test in environments that match production
7. **[Design your pipeline architecture]({{< relref "/docs/migrate-to-cd/pipeline/pipeline-architecture" >}})** - Efficient quality gates for your context
8. **[Enable rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}})** - Fast recovery from any deployment
9. **Integrate security scanning** - Dependency checks, secret detection, and static analysis as pipeline quality gates

## Why This Phase Matters

The pipeline is the backbone of [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}). It replaces manual handoffs with
automated quality gates, ensures every change goes through the same validation process,
and makes deployment a routine, low-risk event.

## When You're Ready to Move On

Start investing in [Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}) when you are making
consistent progress toward these - don't wait for every criterion to be perfect:

- Every change reaches production through the same automated pipeline
- The pipeline produces the same result for the same inputs
- You can deploy any green build to production with confidence
- [Rollback]({{< relref "/docs/reference/glossary#rollback" >}}) takes minutes, not hours

**Next:** [Phase 3 - Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}) - reduce [batch size]({{< relref "/docs/reference/glossary#batch-size" >}}), improve flow, and make deployment routine.

---

## Related Content

- [Phase 1: Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}) - prerequisites to complete before starting the Pipeline phase
- [Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}) - the next phase after Pipeline is established
- [Slow Pipelines]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}) - a common symptom that pipeline architecture improvements address
- [Fear of Deploying]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}}) - a cultural symptom that reliable rollback and automated pipelines help resolve
- [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}) - the anti-pattern this entire phase eliminates
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - industry-recognized capabilities that pipeline practices support
- [Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) - concrete quality gate patterns organized by defect detection priority.
