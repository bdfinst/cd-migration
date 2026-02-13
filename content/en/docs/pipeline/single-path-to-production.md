---
title: "Single Path to Production"
linkTitle: "Single Path to Production"
weight: 1
description: >
  All changes reach production through the same automated pipeline - no exceptions.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

A single path to production means that every change - whether it is a feature, a bug fix,
a configuration update, or an infrastructure change - follows the same automated pipeline
to reach production. There is exactly one route from a developer's commit to a running
production system. No side doors. No emergency shortcuts. No "just this once" manual
deployments.

This is the most fundamental constraint of a continuous delivery pipeline. If you allow
multiple paths, you cannot reason about the state of production. You lose the ability to
guarantee that every change has been validated, and you undermine every other practice in
this phase.

## Why It Matters for CD Migration

Teams migrating to continuous delivery often carry legacy deployment processes - a manual
runbook for "emergency" fixes, a separate path for database changes, or a distinct
workflow for infrastructure updates. Each additional path is a source of unvalidated risk.

Establishing a single path to production is the first pipeline practice because every
subsequent practice depends on it. A [deterministic pipeline](../deterministic-pipeline/)
only works if all changes flow through it. [Immutable artifacts](../immutable-artifacts/)
are only trustworthy if no other mechanism can alter what reaches production. Your
[deployable definition](../deployable-definition/) is meaningless if changes can bypass
the gates.

## Key Principles

### One pipeline for all changes

Every type of change uses the same pipeline:

- **Application code** - features, fixes, refactors
- **Infrastructure as Code** - Terraform, CloudFormation, Pulumi, Ansible
- **Pipeline definitions** - the pipeline itself is versioned and deployed through the pipeline
- **Configuration changes** - environment variables, feature flags, routing rules
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
deployment workflow creates multiple paths. GitFlow is a common source of this anti-pattern.
When a hotfix branch deploys through a different pipeline than the `develop` branch, you
cannot be confident that the hotfix has undergone the same validation.

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

Use feature flags to decouple deployment from release. Code can be merged and deployed
through the pipeline while the feature remains hidden behind a flag. This eliminates the
need for long-lived branches and separate deployment paths for "not-ready" features.

### Branch by abstraction

For large-scale refactors or technology migrations, use branch by abstraction to make
incremental changes that can be deployed through the standard pipeline at every step.
Create an abstraction layer, build the new implementation behind it, switch over
incrementally, and remove the old implementation - all through the same pipeline.

### Dark launching

Deploy new functionality to production without exposing it to users. The code runs in
production, processes real data, and generates real metrics - but its output is not shown
to users. This validates the change under production conditions while managing risk.

### Connect tests last

When building a new integration, start by deploying the code without connecting it to the
live dependency. Validate the deployment, the configuration, and the basic behavior first.
Connect to the real dependency as the final step. This keeps the change deployable through
the pipeline at every stage of development.

## How to Get Started

### Step 1: Map your current deployment paths

Document every way that changes currently reach production. Include manual processes,
scripts, CI/CD pipelines, direct deployments, and any emergency procedures. You will
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

## Connection to the Pipeline Phase

Single path to production is the foundation of Phase 2. Without it, every other pipeline
practice is compromised:

- **Deterministic pipeline** requires all changes to flow through it to provide guarantees
- **Deployable definition** must be enforced by a single set of gates
- **Immutable artifacts** are only trustworthy when produced by a known, consistent process
- **Rollback** relies on the pipeline to deploy the previous version through the same path

Establishing this practice first creates the constraint that makes the rest of the
pipeline meaningful.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
