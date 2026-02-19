---
aliases:
  - /docs/symptoms/lack-of-self-service-environments/
title: "Getting a Test Environment Requires Filing a Ticket"
linkTitle: "Lack of self-service environments"
description: >
  Test environments are a scarce, contended resource. Provisioning takes days and requires another team's involvement.
tags:
  - environment-consistency
  - deployment-automation
---

## What you are seeing

A developer needs a clean environment to reproduce a bug. They file a ticket with the infrastructure team requesting environment access. The ticket enters a queue. Two days later, the environment is provisioned. By that time the developer has moved on to other work, the context for the bug is cold, and the urgency has faded.

Test environments are scarce because they are expensive to create manually. The infrastructure team provisions each one by hand: configuring servers, installing dependencies, seeding databases, updating DNS. The process takes hours of skilled work. Because it takes hours, environments are treated as long-lived shared resources rather than disposable per-task resources. Multiple teams share the same staging environment, which creates contention, coordination overhead, and mysterious failures when two teams' work interacts unexpectedly.

The team has adapted by scheduling environment usage in advance and batching testing work. These adaptations work until there is a deadline, at which point contention over shared environments becomes a delivery risk.

## Common causes

### Snowflake environments

When environments are configured by hand, they cannot be created on demand. The cost of creating a new environment is the same as the cost of the initial configuration: hours of skilled work. This cost makes environments permanent rather than ephemeral. Infrastructure as code and containerization make environment creation a fast, automated operation that any team member can trigger.

When environments can be created in minutes from code, they stop being scarce. A developer who needs an environment can create one, use it, and destroy it. Two teams working on conflicting features each have their own environment. Contention disappears.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

### Missing deployment pipeline

Pipelines that include environment provisioning steps can spin up, run tests against, and tear down ephemeral environments as part of every run. The environment is created fresh for each test run and destroyed when the run completes. Without this capability, environments are managed manually outside the pipeline and must be shared.

A pipeline with environment provisioning gives every commit its own isolated environment. There is no ticket to file, no queue to wait in, no contention with other teams - the environment exists for the duration of the run and is gone when the run completes.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Knowledge silos

The knowledge of how to provision an environment lives in the infrastructure team. Until that knowledge is codified as scripts or infrastructure code, environment creation requires a human from that team. The infrastructure team becomes a bottleneck even when they are working as fast as they can.

Externalizing environment provisioning knowledge into code - reproducible, runnable by anyone - removes the dependency on the infrastructure team for routine environment needs.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Can a developer create a new isolated test environment without filing a ticket?** If not, environment creation is not self-service. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).
2. **Do multiple teams share a single staging environment?** Shared environments create contention and interference. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Is environment provisioning knowledge documented as runnable code?** If provisioning requires knowing undocumented manual steps, the knowledge is siloed. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
