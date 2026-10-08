---
title: "Environments Run Different Code"
linkTitle: "Environments run different code"
description: >
  A feature works in one environment and is missing in another because the code differs, and nobody can say which changes are deployed where.
tags:
  - environment-consistency
  - deployment-automation
---

## What you are seeing

A feature is live in dev but missing in uat. The developer swears it was merged. The tester sees nothing. Someone checks what was deployed to uat and finds the change is not there yet, or it was there and got lost along the way.

Nobody can say with confidence which changes are deployed in which environment. Answering "is my change in uat?" means digging through branch or build history or asking whoever last ran a merge. The answer is often "I think so" or "let me check."

Defects reproduce in one environment but not another, and the cause is not configuration. The code itself differs. The team debugs a failure in uat that cannot happen in dev, because dev contains a fix that uat never received.

## Common causes

### Environment Branches

When each environment deploys from its own long-lived branch (dev, uat, master), code reaches an environment only when someone merges it into that environment's branch. Each merge is a separate manual decision, made at a different time, with its own conflicts and its own mistakes. The branches drift apart. A fix lands in one branch and not another, and the environments run different code.

Deploying one [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) built from a single trunk, with the same code in every environment, removes the question. Environments differ only in configuration, and "is my change in uat?" has a one-line answer: compare artifact versions.

**Read more:** [Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}})

### Missing Deployment Pipeline

Without a [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) that promotes one artifact through each environment, every environment gets its own build. Each build captures whatever code and dependencies are available at that moment, so two environments can end up running different code even when they started from the same source. Nothing records which version went where.

A pipeline builds once, stores the artifact under a version identifier, and deploys that exact artifact to each environment in turn. The version in each environment is visible and comparable. If the repeated builds are the main problem, see [Artifacts Rebuilt per Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}).

**Read more:** [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

## How to narrow it down

1. **Does each environment deploy from its own long-lived branch?** If dev, uat, and master each have a branch that changes must be merged into, start with [Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}).
2. **Is a separate build run for each environment?** If uat and production are built independently rather than promoted from one artifact, start with [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
3. **Can the team name the exact version running in each environment without checking branches?** If not, there is no record of what went where. Start with [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).

**Ready to fix this?** The most common cause is [Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/branching-integration/environment-branches#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related content

- [Staging Passes but Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}}) - Production behaves differently from staging, usually because of configuration or infrastructure drift
- [Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}}) - Test environment drift, not different code per environment
- [Artifacts Rebuilt per Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}) - The build runs again for each environment, so the artifact itself differs
- [Immutable Artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}}) - Build once and promote the same artifact to every environment

Content contributed by {{% contributor-credit "jun-jose" %}}
