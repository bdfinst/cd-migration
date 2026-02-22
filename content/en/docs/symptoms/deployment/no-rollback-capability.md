---
aliases:
  - /docs/symptoms/no-rollback-capability/
title: "Deployments Are One-Way Doors"
linkTitle: "No rollback capability"
description: >
  If a deployment breaks production, the only option is a forward fix under pressure. Rolling back has never been practiced or tested.
tags:
  - deployment-automation
  - observability
---

## What you are seeing

When something breaks in production, the only option is a forward fix. [Rolling back](../../glossary/#rollback) has never been practiced and there is no defined procedure for it. The previous version [artifacts](../../glossary/#artifact) may not exist. Nobody is sure of the exact steps. The unspoken understanding is that deployments only go forward.

There is no defined reversal procedure. Database migrations run during deployment but [rollback](../../glossary/#rollback) migrations were never written. The build server from the previous deployment was recycled. Configuration was updated in place. Even if someone wanted to roll back, they would need to reconstruct the previous state from memory - and that assumes the database is in a compatible state, which it often is not.

The team compensates by delaying deployments, adding more manual verification before each one, and keeping deployments large so there are fewer of them. Each of these adaptations makes deployments larger and riskier - exactly the opposite of what reduces the risk.

## Common causes

### Manual deployments

When deployment is a manual process, there is no corresponding automated rollback procedure. The operator who ran the deployment must figure out how to reverse each step under pressure, without having practiced the reversal. The steps that were run forward must be recalled and undone in the right order, often by someone who was not the original operator.

With automated deployments, rollback is the same procedure as a deployment - just pointed at the previous artifact. The team practices rollback every time they deploy, so when they need it, the steps are known and the process works. There is no scramble to reconstruct what the previous state was.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing deployment pipeline

A [pipeline](../../glossary/#pipeline) creates a versioned artifact from a specific commit and promotes it through environments. That artifact can be redeployed to roll back. Without a pipeline, there is no defined artifact to restore, no promotion history to reverse, and no guarantee that a previous build can be reproduced.

When the pipeline exists, every previous artifact is stored and addressable. Rolling back means redeploying a known artifact through the same automated process used to deploy new versions. The team no longer faces the situation of needing to reconstruct a previous state from memory under pressure.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Blind operations

If the team cannot detect a bad deployment within minutes, they face a choice: roll back something that might be fine, or wait until the damage is certain. When detection takes hours, forward state has accumulated - new database writes, customer actions, downstream events - to the point where rollback is impractical even if someone wanted to do it.

Fast detection changes the math. When the team knows within five minutes that a deployment caused a spike in errors, rollback is still a viable option. The window for clean rollback is open. Monitoring and health checks that fire immediately after deployment keep that window open long enough to use.

**Read more:** [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Snowflake environments

When production is a hand-configured environment, "previous state" is not a well-defined concept. There is no snapshot to restore, no configuration-as-code to check out at a previous revision. Rolling back would require manually reconstructing the previous configuration from memory.

Environments defined as code have a previous state by definition: the previous commit to the infrastructure repository. Rolling back the environment means checking out that commit and applying it. The team no longer faces the situation where "previous state" is something they would have to reconstruct from memory - it is in version control and can be restored.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

## How to narrow it down

1. **Is the deployment process automated?** If not, rollback requires the same manual execution under pressure - without practice. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does the team have an artifact registry retaining previous versions?** If not, even attempting rollback requires reconstructing a previous build. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **How quickly does the team detect deployment problems?** If detection takes more than 30 minutes, rollback is often impractical by the time it is considered. Start with [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/).
4. **Can the team recreate a previous environment state from code?** If environments are hand-configured, there is no defined previous state to return to. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).

**Ready to fix this?** The most common cause is [Manual deployments](../../anti-patterns/pipeline/manual-deployments/). Start with its [How to Fix It](../../anti-patterns/pipeline/manual-deployments/#how-to-fix-it) section for week-by-week steps.
