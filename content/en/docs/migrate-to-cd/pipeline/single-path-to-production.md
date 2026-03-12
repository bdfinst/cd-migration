---
title: "Single Path to Production"
linkTitle: "Single Path to Production"
weight: 1
description: >
  All changes reach production through the same automated pipeline - no exceptions.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | {{< scope-label "team-org" >}}
{{% /pageinfo %}}

## Definition

A single path to production means that every change - whether it is a feature, a bug fix,
a configuration update, or an infrastructure change - follows the same automated pipeline
to reach production. There is exactly one route from a developer's commit to a running
production system. No side doors. No emergency shortcuts. No "just this once" manual
deployments.

This is the most fundamental constraint of a [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). If you allow
multiple paths, you cannot reason about the state of production. You lose the ability to
guarantee that every change has been validated, and you undermine every other practice in
this phase.

## Why It Matters for CD Migration

Teams migrating to continuous delivery often carry legacy deployment processes - a manual
runbook for "emergency" fixes, a separate path for database changes, or a distinct
workflow for infrastructure updates. Each additional path is a source of unvalidated risk.

Establishing a single path to production is the first pipeline practice because every
subsequent practice depends on it. A [deterministic pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}})
only works if all changes flow through it. [Immutable artifacts]({{< relref "/docs/migrate-to-cd/pipeline/immutable-artifacts" >}})
are only trustworthy if no other mechanism can alter what reaches production. Your
[deployable definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}) is meaningless if changes can bypass
the gates.

## Key Principles

### One pipeline for all changes

Every type of change uses the same pipeline:

- **Application code** - features, fixes, refactors
- **Infrastructure as Code** - Terraform, CloudFormation, Pulumi, Ansible
- **Pipeline definitions** - the pipeline itself is versioned and deployed through the pipeline
- **Configuration changes** - environment variables, [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}), routing rules
- **Database migrations** - schema changes, data migrations

### Same pipeline for all environments

The pipeline that deploys to development is the same pipeline that deploys to staging and
production. The only difference between environments is the configuration injected at
deployment time. If your staging deployment uses a different mechanism than your production
deployment, you are not testing the deployment process itself.

### No manual deployments

If a human can bypass the pipeline and push a change directly to production, the single
path is broken. This includes:

- SSH access to production servers for ad-hoc changes
- Direct container image pushes outside the pipeline
- Console-based configuration changes that are not captured in version control
- "Break glass" procedures that skip validation stages

## Anti-Patterns

### Integration branches and multi-branch deployment paths

Using separate branches (such as `develop`, `release`, `hotfix`) that each have their own
deployment workflow creates multiple paths. [GitFlow]({{< relref "/docs/reference/glossary#gitflow" >}}) is a common source of this anti-pattern.
When a hotfix branch deploys through a different pipeline than the `develop` branch, you
cannot be confident that the hotfix has undergone the same validation.

**Integration Branch:**

{{< card code=true header="**Integration branch: parallel merge structure alongside trunk**" lang="text" >}}
trunk -> integration <- features
{{< /card >}}

This creates two merge structures instead of one. When trunk changes, you merge to the
integration branch immediately. When features change, you merge to integration at least
daily. The integration branch lives a parallel life to trunk, acting as a temporary
container for partially finished features. This attempts to mimic feature flags to keep
inactive features out of production but adds complexity and accumulates abandoned features
that stay unfinished forever.

**GitFlow (multiple long-lived branches):**

{{< card code=true header="**GitFlow: multiple long-lived branches with different merge paths per change type**" lang="text" >}}
master (production)
  |
develop (integration)
  |
feature branches -> develop
  |
release branches -> master
  |
hotfix branches -> master -> develop
{{< /card >}}

GitFlow creates multiple merge patterns depending on change type:

- Features: feature -> develop -> release -> master
- Hotfixes: hotfix -> master AND hotfix -> develop
- Releases: develop -> release -> master

Different types of changes follow different paths to production. Multiple long-lived
branches (master, develop, release) create merge complexity. Hotfixes have a different
path than features, release branches delay integration and create batch deployments, and
merge conflicts multiply across integration points.

**The correct approach** is direct trunk integration - all work integrates directly to
trunk using the same process:

{{< card code=true header="**Direct trunk integration: all changes follow the same path**" lang="text" >}}
trunk <- features
trunk <- bugfixes
trunk <- hotfixes
{{< /card >}}

### Environment-specific pipelines

Building a separate pipeline for staging versus production - or worse, manually deploying
to staging and only using automation for production - means you are not testing your
deployment process in lower environments.

### "Emergency" manual deployments

The most dangerous anti-pattern is the manual deployment reserved for emergencies. Under
pressure, teams bypass the pipeline "just this once," introducing an unvalidated change
into production. The fix for this is not to allow exceptions - it is to make the pipeline
fast enough that it is always the fastest path to production.

### Separate pipelines for different change types

Having one pipeline for application code, another for infrastructure, and yet another for
database changes means that coordinated changes across these layers are never validated
together.

## Good Patterns

### Feature flags

Use [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}) to decouple deployment from release. Code can be merged and deployed
through the pipeline while the feature remains hidden behind a flag. This eliminates the
need for long-lived branches and separate deployment paths for "not-ready" features.

{{< card code=true header="**Feature flag: deploy code to trunk while hiding it from users**" lang="javascript" >}}
// Feature code lives in trunk, controlled by flags
if (featureFlags.newCheckout) {
  return renderNewCheckout()
}
return renderOldCheckout()
{{< /card >}}

### Branch by abstraction

For large-scale refactors or technology migrations, use branch by abstraction to make
incremental changes that can be deployed through the standard pipeline at every step.
Create an abstraction layer, build the new implementation behind it, switch over
incrementally, and remove the old implementation - all through the same pipeline.

{{< card code=true header="**Branch by abstraction: replace implementation behind a stable interface**" lang="javascript" >}}
// Old behavior behind abstraction
class PaymentProcessor {
  process() {
    // Gradually replace implementation while maintaining interface
  }
}
{{< /card >}}

### Dark launching

Deploy new functionality to production without exposing it to users. The code runs in
production, processes real data, and generates real metrics - but its output is not shown
to users. This validates the change under production conditions while managing risk.

{{< card code=true header="**Dark launching: deploy new API route without exposing it to users**" lang="javascript" >}}
// New API route exists but isn't exposed to users
router.post('/api/v2/checkout', newCheckoutHandler)

// Final commit: update client to use new route
{{< /card >}}

### Connect tests last

When building a new integration, start by deploying the code without connecting it to the
live dependency. Validate the deployment, the configuration, and the basic behavior first.
Connect to the real dependency as the final step. This keeps the change deployable through
the pipeline at every stage of development.

{{< card code=true header="**Connect tests last: build and validate before wiring to UI**" lang="javascript" >}}
// Build new feature code, integrate to trunk
// Connect to UI/API only in final commit
function newCheckoutFlow() {
  // Complete implementation ready
}

// Final commit: wire it up
<button onClick={newCheckoutFlow}>Checkout</button>
{{< /card >}}

## What Your Team Controls vs. What Requires Broader Change

**Your team controls directly:**

- Building and consolidating your own pipeline so all your changes flow through one path
- Replacing multiple branch-based workflows (GitFlow, hotfix branches) with trunk-based
  development and [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}})
- Making your pipeline fast enough to handle urgent fixes without needing a shortcut
- Eliminating environment-specific pipelines within your own service boundary

**Requires broader change:**

- **Revoking direct production access:** Removing SSH access and console-based deployment
  rights requires coordination with security, operations, and often management. Build trust in
  your pipeline before asking for access to be revoked - prove it is reliable first.
- **Compliance-required manual gates:** If an audit or regulatory requirement mandates a human
  sign-off before production deployment, removing that gate requires engaging your compliance or
  security team to find an automated equivalent that satisfies the same requirement.
- **Emergency procedures:** "Break glass" runbooks that allow bypassing the pipeline in
  incidents are usually owned by operations or SRE teams. Work with them to make your pipeline
  the fastest path, so the break-glass procedure is genuinely a last resort.

The organizational steps are harder, but the technical steps - building a reliable, fast
pipeline - are the prerequisite that makes the organizational conversation possible.

## How to Get Started

### Step 1: Map your current deployment paths

Document every way that changes currently reach production. Include manual processes,
scripts, pipelines, direct deployments, and any emergency procedures. You will
likely find more paths than you expected.

### Step 2: Identify the primary path

Choose or build one pipeline that will become the single path. This pipeline should be
the most automated and well-tested path you have. All other paths will converge into it.

### Step 3: Eliminate the easiest alternate paths first

Start by removing the deployment paths that are used least frequently or are easiest to
replace. For each path you eliminate, migrate its changes into the primary pipeline.

### Step 4: Make the pipeline fast enough for emergencies

The most common reason teams maintain manual deployment shortcuts is that the pipeline is
too slow for urgent fixes. If your pipeline takes 45 minutes and an incident requires a
fix in 10, the team will bypass the pipeline. Invest in pipeline speed so that the
automated path is always the fastest option.

### Step 5: Remove break-glass access

Once the pipeline is fast and reliable, remove the ability to deploy outside of it.
Revoke direct production access. Disable manual deployment scripts. Make the pipeline the
only way.

## Example Implementation

### Single Pipeline for Everything

{{< card code=true header="**Single pipeline for everything: GitHub Actions workflow from validate to production**" lang="yaml" >}}
# .github/workflows/deploy.yml
name: Deployment Pipeline

on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger for rollbacks

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run security-scan

  build:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - run: docker build -t app:${{ github.sha }} .
      - run: docker push app:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/app app=app:${{ github.sha }}
      - run: kubectl rollout status deployment/app

  smoke-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - run: npm run smoke-test:staging

  deploy-production:
    needs: smoke-test
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/app app=app:${{ github.sha }}
      - run: kubectl rollout status deployment/app
{{< /card >}}

Every deployment - normal, hotfix, or [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) - uses this pipeline. Consistent, validated,
traceable.

## FAQ

### What if the pipeline is broken and we need to deploy a critical fix?

Fix the pipeline first. If your pipeline is so fragile that it cannot deploy critical
fixes, that is a pipeline problem, not a process problem. Invest in pipeline reliability.

### What about emergency hotfixes that cannot wait for the full pipeline?

The pipeline should be fast enough to handle emergencies. If it is not, optimize the
pipeline. A "fast-track" mode that skips some tests is acceptable, but it must still be
the same pipeline, not a separate manual process.

### Can we manually patch production "just this once"?

No. "Just this once" becomes "just this once again." Manual production changes always
create problems. Commit the fix, push through the pipeline, deploy.

### What if deploying through the pipeline takes too long?

Optimize your pipeline:

1. Parallelize tests
2. Use faster test environments
3. Implement progressive deployment (canary, blue-green)
4. Cache dependencies
5. Optimize build times

A well-optimized pipeline should deploy to production in under 30 minutes.

### Can operators make manual changes for maintenance?

Infrastructure maintenance (patching servers, scaling resources) is separate from
application deployment. However, application deployment must still only happen through the
pipeline.

## Health Metrics

- **Pipeline deployment rate**: Should be 100% (all deployments go through pipeline)
- **Manual override rate**: Should be 0%
- **Hotfix pipeline time**: Should be less than 30 minutes
- **Rollback success rate**: Should be greater than 99%
- **[Deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}})**: Should increase over time as confidence grows

## Connection to the Pipeline Phase

Single path to production is the foundation of Phase 2. Without it, every other pipeline
practice is compromised:

- **Deterministic pipeline** requires all changes to flow through it to provide guarantees
- **Deployable definition** must be enforced by a single set of gates
- **Immutable artifacts** are only trustworthy when produced by a known, consistent process
- **Rollback** relies on the pipeline to deploy the previous version through the same path

Establishing this practice first creates the constraint that makes the rest of the
pipeline meaningful.

## Related Content

- [Coordinated Deployments]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}}) - a symptom that emerges when multiple deployment paths exist
- [Merge Freeze]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}) - a symptom of deployment processes that lack a single, trusted automated path
- [Manual Deployments]({{< relref "/docs/anti-patterns/pipeline/manual-deployments" >}}) - the anti-pattern that a single path to production eliminates
- [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}) - the anti-pattern of having no automated delivery path at all
- [Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}) - the Pipeline practice that makes the single path reliable and trustworthy
- [Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}) - a key metric that improves when all changes follow one automated path
