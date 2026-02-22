---
aliases:
  - /docs/symptoms/monorepo-without-tooling/
title: "Every Change Rebuilds the Entire Repository"
linkTitle: "Monorepo without proper tooling"
description: >
  A single repository with multiple applications and no selective build tooling. Any commit triggers a full rebuild of everything.
tags:
  - deployment-automation
  - batch-size
---

## What you are seeing

The [CI](../../glossary/#ci-continuous-integration) build takes 45 minutes for every commit because the [pipeline](../../glossary/#pipeline) rebuilds every application and runs every test regardless of what changed. The team chose a monorepo for good reasons - code sharing is simpler, cross-cutting changes are atomic, and dependency management is more coherent - but the pipeline has no awareness of what actually changed. Changing a comment in Service A triggers a full rebuild of Services B, C, D, and E.

Developers have adapted by batching changes to reduce the number of CI runs they wait through. One CI run per hour instead of one per commit. The batching reintroduces the integration problems the monorepo was supposed to solve: multiple changes combined in a single commit lose the ability to bisect failures to any individual change.

The build system treats the entire repository as a single unit. Service owners have added scripts to skip unmodified services, but the scripts are fragile and not consistently maintained. The CI system was not designed for selective builds, so every workaround is an unsupported hack on top of an ill-fitting tool.

## Common causes

### Missing deployment pipeline

Pipelines that understand which services changed - using build tools that model the dependency graph or change detection based on file paths - can selectively build and test only what was affected by a commit. Without this investment, pipelines treat the monorepo as a single unit and rebuild everything.

Tools like Nx, Bazel, or Turborepo provide dependency graph awareness for monorepos. A pipeline built on these tools builds only what needs to be rebuilt and runs only the tests that could be affected by the change. Feedback loops shorten from 45 minutes to 5.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Manual deployments

When deployment is manual, there is no automated mechanism to determine which services changed and which need to be deployed. Manual review determines what to deploy, which is slow and inconsistent. Inconsistency leads to either over-deploying (deploying everything to be safe) or under-deploying (missing services that changed).

Automated deployment pipelines with change detection deploy exactly the services that changed, with evidence of what changed and why.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **Does the pipeline build and test only the services affected by a change?** If every commit triggers a full rebuild, change detection is not implemented. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **How long does a typical CI run take?** If it takes more than 10 minutes regardless of what changed, the pipeline is not leveraging the monorepo's dependency information. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Can the team deploy a single service from the monorepo without triggering deployments of all services?** If not, deployment automation does not understand the monorepo structure. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).

**Ready to fix this?** The most common cause is [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/). Start with its [How to Fix It](../../anti-patterns/pipeline/missing-deployment-pipeline/#how-to-fix-it) section for week-by-week steps.
