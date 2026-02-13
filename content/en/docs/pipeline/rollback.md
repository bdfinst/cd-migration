---
title: "Rollback"
linkTitle: "Rollback"
weight: 8
description: >
  Enable fast recovery from any deployment by maintaining the ability to roll back.
---

{{% pageinfo %}}
**Phase 2 — Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

Rollback is the ability to quickly and safely revert a production deployment to a previous
known-good state. It is the safety net that makes continuous delivery possible: because you
can always undo a deployment, deploying becomes a low-risk, routine operation.

Rollback is not a backup plan for when things go catastrophically wrong. It is a standard
operational capability that should be exercised regularly and trusted completely. Every
deployment to production should be accompanied by a tested, automated, fast rollback
mechanism.

## Why It Matters for CD Migration

Fear of deployment is the single biggest cultural barrier to continuous delivery. Teams
that have experienced painful, irreversible deployments develop a natural aversion to
deploying frequently. They batch changes, delay releases, and add manual approval gates —
all of which slow delivery and increase risk.

Reliable, fast rollback breaks this cycle. When the team knows that any deployment can be
reversed in minutes, the perceived risk of deployment drops dramatically. Smaller, more
frequent deployments become possible. The feedback loop tightens. The entire delivery
system improves.

## Key Principles

### Fast

Rollback must complete in minutes, not hours. A rollback that takes an hour to execute
is not a rollback — it is a prolonged outage with a recovery plan. Target rollback times
of 5 minutes or less for the deployment mechanism itself. If the previous artifact is
already in the artifact repository and the deployment mechanism is automated, there is
no reason rollback should take longer than a fresh deployment.

### Automated

Rollback must be a single command or a single click — or better, fully automated based
on health checks. It should not require:

- SSH access to production servers
- Manual editing of configuration files
- Running scripts with environment-specific parameters from memory
- Coordinating multiple teams to roll back multiple services simultaneously

### Safe

Rollback must not make things worse. This means:

- Rolling back must not lose data
- Rolling back must not corrupt state
- Rolling back must not break other services that depend on the rolled-back service
- Rolling back must not require downtime beyond what the deployment mechanism itself imposes

### Simple

The rollback procedure should be understandable by any team member, including those who
did not perform the original deployment. It should not require specialized knowledge, deep
system understanding, or heroic troubleshooting.

### Tested

Rollback must be tested regularly, not just documented. A rollback procedure that has
never been exercised is a rollback procedure that will fail when you need it most. Include
rollback verification in your [deployable definition](../deployable-definition/) and
practice rollback as part of routine deployment validation.

## Rollback Strategies

### Blue-Green Deployment

Maintain two identical production environments — blue and green. At any time, one is live
(serving traffic) and the other is idle. To deploy, deploy to the idle environment, verify
it, and switch traffic. To roll back, switch traffic back to the previous environment.

**Advantages:**

- Rollback is instantaneous — just a traffic switch
- The previous version remains running and warm
- Zero-downtime deployment and rollback

**Considerations:**

- Requires double the infrastructure (though the idle environment can be scaled down)
- Database changes must be backward-compatible across both versions
- Session state must be externalized so it survives the switch

### Canary Deployment

Deploy the new version to a small subset of production infrastructure (the "canary") and
route a percentage of traffic to it. Monitor the canary for errors, latency, and business
metrics. If the canary is healthy, gradually increase traffic. If problems appear, route
all traffic back to the previous version.

**Advantages:**

- Limits blast radius — problems affect only a fraction of users
- Provides real production data for validation before full rollout
- Rollback is fast — stop sending traffic to the canary

**Considerations:**

- Requires traffic routing infrastructure (service mesh, load balancer configuration)
- Both versions must be able to run simultaneously
- Monitoring must be sophisticated enough to detect subtle problems in the canary

### Feature Flag Rollback

When a deployment introduces new behavior behind a feature flag, rollback can be as
simple as turning off the flag. The code remains deployed, but the new behavior is
disabled. This is the fastest possible rollback — it requires no deployment at all.

**Advantages:**

- Instantaneous — no deployment, no traffic switch
- Granular — roll back a single feature without affecting other changes
- No infrastructure changes required

**Considerations:**

- Requires a feature flag system with runtime toggle capability
- Only works for changes that are behind flags
- Feature flag debt (old flags that are never cleaned up) must be managed

### Database-Safe Rollback with Expand-Contract

Database schema changes are the most common obstacle to rollback. If a deployment changes
the database schema, rolling back the application code may fail if the old code is
incompatible with the new schema.

The expand-contract pattern (also called parallel change) solves this:

1. **Expand** — add new columns, tables, or structures alongside the existing ones. The
   old application code continues to work. Deploy this change.
2. **Migrate** — update the application to write to both old and new structures, and read
   from the new structure. Deploy this change. Backfill historical data.
3. **Contract** — once all application versions using the old structure are retired, remove
   the old columns or tables. Deploy this change.

At every step, the previous application version remains compatible with the current
database schema. Rollback is always safe.

**Anti-pattern:** Destructive schema changes (dropping columns, renaming tables,
changing types) deployed simultaneously with the application code change that requires
them. This makes rollback impossible because the old code cannot work with the new schema.

## Anti-Patterns

### "We'll fix forward"

Relying exclusively on fixing forward (deploying a new fix rather than rolling back) is
dangerous when the system is actively degraded. Fix-forward should be an option when
the issue is well-understood and the fix is quick. Rollback should be the default when
the issue is unclear or the fix will take time. Both capabilities must exist.

### Rollback as a documented procedure only

A rollback procedure that exists only in a runbook, wiki, or someone's memory is not a
reliable rollback capability. Procedures that are not automated and regularly tested will
fail under the pressure of a production incident.

### Coupled service rollbacks

When rolling back service A requires simultaneously rolling back services B and C, you
do not have independent rollback capability. Design services to be backward-compatible
so that each service can be rolled back independently.

### Destructive database migrations

Schema changes that destroy data or break backward compatibility make rollback impossible.
Always use the expand-contract pattern for schema changes.

### Manual rollback requiring specialized knowledge

If only one person on the team knows how to perform a rollback, the team does not have a
rollback capability — it has a single point of failure. Rollback must be simple enough
for any team member to execute.

## Good Patterns

### Automated rollback on health check failure

Configure the deployment system to automatically roll back if the new version fails
health checks within a defined window after deployment. This removes the need for a human
to detect the problem and initiate the rollback.

### Rollback testing in staging

As part of every deployment to staging, deploy the new version, verify it, then roll it
back and verify the rollback. This ensures that rollback works for every release, not
just in theory.

### Artifact retention

Retain previous artifact versions in the artifact repository so that rollback is always
possible. Define a retention policy (for example, keep the last 10 production-deployed
versions) and ensure that rollback targets are always available.

### Deployment log and audit trail

Maintain a clear record of what is currently deployed, what was previously deployed, and
when changes occurred. This makes it easy to identify the correct rollback target and
verify that the rollback was successful.

### Rollback runbook exercises

Regularly practice rollback as a team exercise — not just as part of automated testing,
but as a deliberate drill. This builds team confidence and identifies gaps in the process.

## How to Get Started

### Step 1: Document your current rollback capability

Can you roll back your current production deployment right now? How long would it take?
Who would need to be involved? What could go wrong? Be honest about the answers.

### Step 2: Implement a basic automated rollback

Start with the simplest mechanism available for your deployment platform — redeploying the
previous container image, switching a load balancer target, or reverting a Kubernetes
deployment. Automate this as a single command.

### Step 3: Test the rollback

Deploy a change to staging, then roll it back. Verify that the system returns to its
previous state. Make this a standard part of your deployment validation.

### Step 4: Address database compatibility

Audit your database migration practices. If you are making destructive schema changes,
shift to the expand-contract pattern. Ensure that the previous application version is
always compatible with the current database schema.

### Step 5: Reduce rollback time

Measure how long rollback takes. Identify and eliminate delays — slow artifact downloads,
slow startup times, manual steps. Target rollback completion in under 5 minutes.

### Step 6: Build team confidence

Practice rollback regularly. Demonstrate it during deployment reviews. Make it a normal
part of operations, not an emergency procedure. When the team trusts rollback, they will
trust deployment.

## Connection to the Pipeline Phase

Rollback is the capstone of the Pipeline phase. It is what makes the rest of the phase
safe:

- The [single path to production](../single-path-to-production/) is how rollback is
  deployed — the same pipeline, the same path, in reverse
- [Immutable artifacts](../immutable-artifacts/) are what make rollback reliable — the
  previous artifact is unchanged in the artifact repository, ready to be redeployed
- The [deployable definition](../deployable-definition/) should include rollback
  verification as one of its quality gates
- [Application configuration](../application-config/) separation ensures that rolling
  back the artifact does not require rolling back environment configuration
- [Production-like environments](../production-like-environments/) are where rollback is
  tested before it is needed in production

With rollback in place, the team has the confidence to deploy frequently, which is the
foundation for [Phase 3: Optimize](../../optimize/) and ultimately
[Phase 4: Continuous Deployment](../../continuous-deployment/).

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
