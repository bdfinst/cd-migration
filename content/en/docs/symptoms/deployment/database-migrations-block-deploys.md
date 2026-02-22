---
aliases:
  - /docs/symptoms/database-migrations-block-deploys/
title: "Database Migrations Block or Break Deployments"
linkTitle: "Database migrations block deploys"
description: >
  Schema changes require downtime, lock tables, or leave the database in an unknown state when they fail mid-run.
tags:
  - deployment-automation
  - environment-consistency
---

## What you are seeing

Deploying a schema change is a stressful event. The team schedules a maintenance window, notifies users, and runs the migration hoping nothing goes wrong. Some migrations take minutes; others run for hours and lock tables the application needs. When a migration fails halfway through, the database is in an intermediate state that neither the old nor the new version of the application can handle correctly.

The team has developed rituals to cope. Migrations are reviewed by the entire team before running. Someone sits at the database console during the deployment ready to intervene. A migration runbook exists listing each migration and its estimated run time. New features requiring schema changes get batched with the migration to minimize the number of deployment events.

Feature development is constrained by when migrations can safely run. The team avoids schema changes when possible, leading to workarounds and accumulated schema debt. When a migration does run, it is a high-stakes event rather than a routine operation.

## Common causes

### Manual deployments

When deployments are manual, migration execution is manual too. There is no standardized approach to handling migration failures, [rollback](../../glossary/#rollback), or state verification. Each migration is a custom operation executed by whoever is available that day, following a procedure remembered from the last time rather than codified in an automated step.

Automated [pipelines](../../glossary/#pipeline) that run migrations as a defined step - with pre-migration backups, health checks after migration, and defined rollback procedures - replace the maintenance window ritual with a repeatable process. Failures trigger automated alerts rather than requiring someone to sit at the console. When migrations run the same way every time, the team stops batching them to minimize deployment events because each one is no longer a high-stakes manual operation.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Snowflake environments

When environments differ from production in undocumented ways, migrations that pass in staging fail in production. Data volumes are different. Index configurations were set differently. Existing data in production that was not in staging violates a constraint the migration adds. These differences are invisible until the migration runs against real data and fails.

Environments that match production in structure and configuration allow migrations to be validated before the maintenance window. When staging has production-like data volume and index configuration, a migration that completes without locking tables in staging will behave the same way in production. The team stops discovering migration failures for the first time during the deployment that users are waiting on.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

### Missing deployment pipeline

A pipeline can enforce migration ordering and safety practices as part of every deployment. Expand-contract patterns - adding new columns before removing old ones - can be built into the pipeline structure. Pre-migration schema checks and post-migration application health verification become automatic steps.

Without a pipeline, migration ordering is left to whoever is executing the deployment. The right sequence is known by the person who thought through the migration, but that knowledge is not enforced at deployment time - which is why the team schedules reviews and sits someone at the console. The pipeline encodes that knowledge so it runs correctly without anyone needing to supervise it.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Tightly coupled monolith

When a large application shares a single database schema, any migration affects the entire system simultaneously. There is no safe way to migrate incrementally because all code runs against the same schema at the same time. A column rename requires updating every query in every module before the migration runs.

Decomposed services with separate databases can migrate their own schema independently. A migration to the payment service schema does not require coordinating with the user service, scheduling a shared maintenance window, or batching with unrelated changes to amortize the disruption. Each service manages its own schema on its own schedule.

**Read more:** [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

## How to narrow it down

1. **Are migrations run manually during deployment?** If someone executes migration scripts by hand, the process lacks the consistency and failure handling of automation. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Do migrations behave differently in staging versus production?** Environment differences - data volume, configuration, existing data - are the likely cause. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).
3. **Does the deployment pipeline handle migration ordering and validation?** If migrations run outside the pipeline, they lack the pipeline's safety checks. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
4. **Do schema changes require coordination across multiple teams or modules?** If one migration touches code owned by many teams, the coupling is the root issue. Start with [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).

**Ready to fix this?** The most common cause is [Manual deployments](../../anti-patterns/pipeline/manual-deployments/). Start with its [How to Fix It](../../anti-patterns/pipeline/manual-deployments/#how-to-fix-it) section for week-by-week steps.
