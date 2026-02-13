---
title: "Phase 4: Continuous Deployment"
linkTitle: "4 - Continuous Deployment"
weight: 5
description: >
  Deploy every change on demand with progressive rollout strategies and full confidence.
---

{{% pageinfo %}}
**Key question:** "Can we deploy every change?"

This is the destination: every change that passes the pipeline is automatically deployed
to production. This phase introduces progressive rollout strategies and addresses the
organizational patterns that make continuous deployment sustainable.
{{% /pageinfo %}}

## What You'll Do

1. **[Deploy on demand](deploy-on-demand/)** - Remove the last manual gates
2. **[Use progressive rollout](progressive-rollout/)** - Canary, blue-green, and percentage-based deployments
3. **[Explore agentic CD](agentic-cd/)** - AI-assisted continuous deployment patterns
4. **[Learn from experience reports](experience-reports/)** - How other teams made the journey

## Why This Phase Matters

Continuous deployment is the natural culmination of all previous phases. When your
foundations are solid, your pipeline is reliable, and your batch sizes are small,
deploying every change becomes the lowest-risk option. Holding changes back in a
queue actually increases risk.

## Signs You've Arrived

- Every commit that passes the pipeline deploys to production automatically
- Deployments happen multiple times per day with no drama
- Mean time to recovery is measured in minutes
- The team has confidence that any deployment can be safely rolled back
- New team members can deploy on their first day
