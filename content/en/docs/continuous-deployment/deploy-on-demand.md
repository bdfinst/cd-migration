---
title: "Deploy on Demand"
draft: true
linkTitle: "Deploy on Demand"
weight: 1
description: >
  Remove the last manual gates and deploy every change that passes the pipeline.
---

{{% pageinfo %}}
**Phase 4 - Continuous Deployment** | Original content

Deploy on demand means that any change which passes the full automated pipeline can reach production without waiting for a human to press a button, open a ticket, or schedule a window. This page covers the prerequisites, the transition from continuous delivery to continuous deployment, and how to address the organizational concerns that are the real barriers.
{{% /pageinfo %}}

## Continuous Delivery vs. Continuous Deployment

These two terms are often confused. The distinction matters:

- **Continuous Delivery:** Every commit that passes the pipeline *could* be deployed to production. A human decides when to deploy.
- **Continuous Deployment:** Every commit that passes the pipeline *is* deployed to production. No human decision is required.

If you have completed Phases 1-3 of this migration, you have continuous delivery. This page is about removing that last manual decision and moving to continuous deployment.

## Why Remove the Last Gate?

The manual deployment decision feels safe. It gives someone a chance to "eyeball" the change before it goes to production. In practice, it does the opposite.

### The Problems with Manual Gates

| Problem | Why It Happens | Impact |
|---------|---------------|--------|
| **Batching** | If deploys are manual, teams batch changes to reduce the number of deploy events | Larger batches increase risk and make rollback harder |
| **Delay** | Changes wait for someone to approve, which may take hours or days | Longer lead time, delayed feedback |
| **False confidence** | The approver cannot meaningfully review what the automated pipeline already tested | The gate provides the illusion of safety without actual safety |
| **Bottleneck** | One person or team becomes the deploy gatekeeper | Creates a single point of failure for the entire delivery flow |
| **Deploy fear** | Infrequent deploys mean each deploy is higher stakes | Teams become more cautious, batches get larger, risk increases |

### The Paradox of Manual Safety

The more you rely on manual deployment gates, the less safe your deployments become. This is because manual gates lead to batching, batching increases risk, and increased risk justifies more manual gates. It is a vicious cycle.

Continuous deployment breaks this cycle. Small, frequent, automated deployments are individually low-risk. If one fails, the blast radius is small and recovery is fast.

## Prerequisites for Deploy on Demand

Before removing manual gates, verify that these conditions are met. Each one is covered in earlier phases of this migration.

### Non-Negotiable Prerequisites

| Prerequisite | What It Means | Where to Build It |
|-------------|---------------|-------------------|
| **Comprehensive automated tests** | The test suite catches real defects, not just trivial cases | [Testing Fundamentals](../../foundations/testing-fundamentals/) |
| **Fast, reliable pipeline** | The pipeline completes in under 15 minutes and rarely fails for non-code reasons | [Deterministic Pipeline](../../pipeline/deterministic-pipeline/) |
| **Automated rollback** | You can roll back a bad deployment in minutes without manual intervention | [Rollback](../../pipeline/rollback/) |
| **Feature flags** | Incomplete features are hidden from users via flags, not deployment timing | [Feature Flags](../../optimize/feature-flags/) |
| **Small batch sizes** | Each deployment contains 1-3 small changes, not dozens | [Small Batches](../../optimize/small-batches/) |
| **Production-like environments** | Test environments match production closely enough that test results are trustworthy | [Production-Like Environments](../../pipeline/production-like-environments/) |
| **Observability** | You can detect production issues within minutes through monitoring and alerting | [Metrics-Driven Improvement](../../optimize/metrics-driven-improvement/) |

### Assessment: Are You Ready?

Answer these questions honestly:

1. **When was the last time your pipeline caught a real bug?** If the answer is "I don't remember," your test suite may not be trustworthy enough.
2. **How long does a rollback take?** If the answer is more than 15 minutes, automate it first.
3. **Do deploys ever fail for non-code reasons?** (Environment issues, credential problems, network flakiness.) If yes, stabilize your pipeline first.
4. **Does the team trust the pipeline?** If team members regularly say "let me check one more thing before we deploy," trust is not there yet. Build it through [retrospectives](../../optimize/retrospectives/) and transparent metrics.

## The Transition: Three Approaches

### Approach 1: Shadow Mode

Run continuous deployment alongside manual deployment. Every change that passes the pipeline is automatically deployed to a shadow production environment (or a canary group). A human still approves the "real" production deployment.

**Duration:** 2-4 weeks.

**What you learn:** How often the automated deployment would have been correct. If the answer is "every time" (or close to it), the manual gate is not adding value.

**Transition:** Once the team sees that the shadow deployments are consistently safe, remove the manual gate.

### Approach 2: Opt-In per Team

Allow individual teams to adopt continuous deployment while others continue with manual gates. This works well in organizations with multiple teams at different maturity levels.

**Duration:** Ongoing. Teams opt in when they are ready.

**What you learn:** Which teams are ready and which need more foundation work. Early adopters demonstrate the pattern for the rest of the organization.

**Transition:** As more teams succeed, continuous deployment becomes the default. Remaining teams are supported in reaching readiness.

### Approach 3: Direct Switchover

Remove the manual gate for all teams at once. This is appropriate when the organization has high confidence in its pipeline and all teams have completed Phases 1-3.

**Duration:** Immediate.

**What you learn:** Quickly reveals any hidden dependencies on the manual gate (e.g., deploy coordination between teams, configuration changes that ride along with deployments).

**Transition:** Be prepared to temporarily revert if unforeseen issues arise. Have a clear rollback plan for the process change itself.

## Addressing Organizational Concerns

The technical prerequisites are usually met before the organizational ones. These are the conversations you will need to have.

### "What about change management / ITIL?"

Change management frameworks like ITIL define a "standard change" category: a pre-approved, low-risk, well-understood change that does not require a Change Advisory Board (CAB) review. Continuous deployment changes qualify as standard changes because they are:

- Small (one to a few commits)
- Automated (same pipeline every time)
- Reversible (automated rollback)
- Well-tested (comprehensive automated tests)

Work with your change management team to classify pipeline-passing deployments as standard changes. This preserves the governance framework while removing the bottleneck.

### "What about compliance and audit?"

Continuous deployment does not eliminate audit trails - it strengthens them. Every deployment is:

- **Traceable:** Tied to a specific commit, which is tied to a specific story or ticket
- **Reproducible:** The same pipeline produces the same result every time
- **Recorded:** Pipeline logs capture every test that passed, every approval that was automated
- **Reversible:** Rollback history shows when and why a deployment was reverted

Provide auditors with access to pipeline logs, deployment history, and the automated test suite. This is a more complete audit trail than a manual approval signature.

### "What about database migrations?"

Database migrations require special care in continuous deployment because they cannot be rolled back as easily as code changes.

**Rules for database migrations in CD:**

1. **Migrations must be backward-compatible.** The previous version of the code must work with the new schema.
2. **Use expand/contract pattern.** First deploy the new column/table (expand). Then deploy the code that uses it. Then remove the old column/table (contract). Each step is a separate deployment.
3. **Never drop a column in the same deployment that stops using it.** There is always a window where both old and new code run simultaneously.
4. **Test migrations in production-like environments** before they reach production.

### "What if we deploy a breaking change?"

This is why you have automated rollback and observability. The sequence is:

1. Deployment happens automatically
2. Monitoring detects an issue (error rate spike, latency increase, health check failure)
3. Automated rollback triggers (or on-call engineer triggers manual rollback)
4. The team investigates and fixes the issue
5. The fix goes through the pipeline and deploys automatically

The key insight: this sequence takes minutes with continuous deployment. With manual deployment on a weekly schedule, the same breaking change would take days to detect and fix.

## After the Transition

### What Changes for the Team

| Before | After |
|--------|-------|
| "Are we deploying today?" | Deploys happen automatically, all the time |
| "Who's doing the deploy?" | Nobody - the pipeline does it |
| "Can I get this into the next release?" | Every merge to trunk is the next release |
| "We need to coordinate the deploy with team X" | Teams deploy independently |
| "Let's wait for the deploy window" | There are no deploy windows |

### What Stays the Same

- Code review still happens (before merge to trunk)
- Automated tests still run (in the pipeline)
- Feature flags still control feature visibility (decoupling deploy from release)
- Monitoring still catches issues (but now recovery is faster)
- The team still owns its deployments (but the manual step is gone)

### The First Week

The first week of continuous deployment will feel uncomfortable. This is normal. The team will instinctively want to "check" deployments that happen automatically. Resist the urge to add manual checks back. Instead:

- Watch the monitoring dashboards more closely than usual
- Have the team discuss each automatic deployment in standup for the first week
- Celebrate the first deployment that goes out without anyone noticing - that is the goal

## Key Pitfalls

### 1. "We adopted continuous deployment but kept the approval step 'just in case'"

If the approval step exists, it will be used, and you have not actually adopted continuous deployment. Remove the gate completely. If something goes wrong, use rollback - do not use a pre-deployment gate.

### 2. "Our deploy cadence didn't actually increase"

Continuous deployment only increases deploy frequency if the team is integrating to trunk frequently. If the team still merges weekly, they will deploy weekly - automatically, but still weekly. Revisit [Trunk-Based Development](../../foundations/trunk-based-development/) and [Small Batches](../../optimize/small-batches/).

### 3. "We have continuous deployment for the application but not the database/infrastructure"

Partial continuous deployment creates a split experience: application changes flow freely but infrastructure changes still require manual coordination. Extend the pipeline to cover infrastructure as code, database migrations, and configuration changes.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Deployment frequency](../../reference/metrics/release-frequency/) | Multiple per day | Confirms the pipeline is deploying every change |
| [Lead time](../../reference/metrics/lead-time/) | < 1 hour from commit to production | Confirms no manual gates are adding delay |
| Manual interventions per deploy | Zero | Confirms the process is fully automated |
| [Change failure rate](../../reference/metrics/change-fail-rate/) | Stable or improving | Confirms automation is not introducing new failures |
| [MTTR](../../reference/metrics/mean-time-to-repair/) | < 15 minutes | Confirms automated rollback is working |

## Next Step

Continuous deployment deploys every change, but not every change needs to go to every user at once. [Progressive Rollout](../progressive-rollout/) strategies let you control who sees a change and how quickly it spreads.
