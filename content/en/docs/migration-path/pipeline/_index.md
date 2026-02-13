---
title: "Phase 2: Pipeline"
linkTitle: "2 - Pipeline"
weight: 3
description: >
  Build the automated path from commit to production: a single, deterministic pipeline that deploys immutable artifacts.
---

{{% pageinfo %}}
**Key question:** "Can we deploy any commit automatically?"

This phase creates the delivery pipeline - the automated path that takes every commit
through build, test, and deployment stages. When done right, the pipeline is the only
way changes reach production.
{{% /pageinfo %}}

## What You'll Do

1. **[Establish a single path to production](single-path-to-production/)** - One pipeline for all changes
2. **[Make the pipeline deterministic](deterministic-pipeline/)** - Same inputs always produce same outputs
3. **[Define "deployable"](deployable-definition/)** - Clear criteria for what's ready to ship
4. **[Use immutable artifacts](immutable-artifacts/)** - Build once, deploy everywhere
5. **[Externalize application config](application-config/)** - Separate config from code
6. **[Use production-like environments](production-like-environments/)** - Test in environments that match production
7. **[Design your pipeline architecture](pipeline-architecture/)** - Efficient quality gates for your context
8. **[Enable rollback](rollback/)** - Fast recovery from any deployment

## Why This Phase Matters

The pipeline is the backbone of continuous delivery. It replaces manual handoffs with
automated quality gates, ensures every change goes through the same validation process,
and makes deployment a routine, low-risk event.

## When You're Ready to Move On

You're ready for [Phase 3: Optimize](../optimize/) when:

- Every change reaches production through the same automated pipeline
- The pipeline produces the same result for the same inputs
- You can deploy any green build to production with confidence
- Rollback takes minutes, not hours
