---
aliases:
  - /docs/symptoms/merge-freeze/
title: "Merge Freezes Before Deployments"
linkTitle: "Merge freezes before deploys"
description: >
  Developers announce merge freezes because the integration process is fragile. Deploying requires
  coordination in chat.
tags:
  - process-gates
  - integration-frequency
---

## What you are seeing

A message appears in the team chat: "Please don't merge to main, I'm about to deploy." The
deployment process requires the main branch to be stable and unchanged for the duration of the
deploy. Any merge during that window could invalidate the tested [artifact](../../glossary/#artifact), break the build, or
create an inconsistent state between what was tested and what ships.

Other developers queue up their PRs and wait. If the deployment hits a problem, the freeze
extends. Sometimes the freeze lasts hours. In the worst cases, the team informally agrees on
"deployment windows" where merging is allowed at certain times and deployments happen at others.

The merge freeze is a coordination tax. Every deployment interrupts the entire team's workflow.
Developers learn to time their merges around deploy schedules, adding mental overhead to routine
work.

## Common causes

### Manual Deployments

When deployment is a manual process (running scripts, clicking through UIs, executing a runbook),
the person deploying needs the environment to hold still. Any change to main during the deployment
window could mean the deployed artifact does not match what was tested. Automated deployments that
build, test, and deploy atomically eliminate this window because the [pipeline](../../glossary/#pipeline) handles the full
sequence without requiring a stable pause.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

### Integration Deferred

When the team does not have a reliable [CI](../../glossary/#ci-continuous-integration) process, merging to main is itself risky. If the build
breaks after a merge, the deployment is blocked. The team freezes merges not just to protect the
deployment but because they lack confidence that any given merge will keep main green. If CI were
reliable, merging and deploying could happen concurrently because main would always be [deployable](../../glossary/#deployable).

**Read more:** [Integration Deferred](../../anti-patterns/branching-integration/integration-deferred/)

### Missing Deployment Pipeline

When there is no pipeline that takes a specific commit through build, test, and deploy as a single
atomic operation, the team must manually coordinate which commit gets deployed. A pipeline pins
the deployment to a specific artifact built from a specific commit. Without it, the team must
freeze merges to prevent the target from moving while they deploy.

**Read more:** [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

## How to narrow it down

1. **Is the deployment process automated end-to-end?** If a human executes deployment steps, the
   freeze protects against variance in the manual process. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does the team trust that main is always deployable?** If merges to main sometimes break the
   build, the freeze protects against unreliable integration. Start with
   [Integration Deferred](../../anti-patterns/branching-integration/integration-deferred/).
3. **Does the pipeline deploy a specific artifact from a specific commit?** If there is no
   pipeline that pins the deployment to an [immutable artifact](../../glossary/#immutable-artifact), the team must manually ensure the
   target does not move. Start with
   [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).

---

**Ready to fix this?** The most common cause is [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/). Start with its [How to Fix It](../../anti-patterns/pipeline/manual-deployments/#how-to-fix-it) section for week-by-week steps.

## Related Content

- [Hardening Sprints Are Needed Before Every Release](../hardening-sprints/) - Freezes and hardening sprints often go together
- [Releases Are Infrequent and Painful](../infrequent-releases/) - Freezes are a symptom of high-risk release processes
- [Integration Deferred](../../anti-patterns/branching-integration/integration-deferred/) - Batching integration creates the instability that freezes try to control
- [Trunk-Based Development](../../migrate-to-cd/migration-path/foundations/trunk-based-development/) - Continuous integration eliminates the need for freezes
- [Integration Frequency](../../metrics/integration-frequency/) - Track how often the team integrates to trunk
