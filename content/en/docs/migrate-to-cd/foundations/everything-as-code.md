---
title: "Everything as Code"
linkTitle: "Everything as Code"
weight: 7
description: >
  Every artifact that defines your system (infrastructure, pipelines, configuration, database schemas, monitoring) belongs in version control and is delivered through pipelines.
---

{{% pageinfo %}}
**Phase 1 - Foundations**

If it is not in version control, it does not exist. If it is not delivered through a [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}), it
is a manual step. Manual steps block [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}). This page establishes the principle that
everything required to build, deploy, and operate your system is defined as code, version
controlled, reviewed, and delivered through the same automated pipelines as your application.
{{% /pageinfo %}}

## One process for every change

When something is defined as code:

- It is **version controlled.** You can see who changed what, when, and why. You can revert any
  change. You can trace any production state to a specific commit.
- It is **reviewed.** Changes go through the same review process as application code. A second
  pair of eyes catches mistakes before they reach production.
- It is **tested.** Automated validation catches errors before deployment. Linting, dry-runs,
  and policy checks apply to infrastructure the same way unit tests apply to application code.
- It is **reproducible.** You can recreate any environment from scratch. Disaster recovery is
  "re-run the pipeline," not "find the person who knows how to configure the server."
- It is **delivered through a pipeline.** No SSH, no clicking through UIs, no manual steps. The
  pipeline is the only path to production for everything, not just application code.

When something is not defined as code, it is a liability. It cannot be reviewed, tested, or
reproduced. It exists only in someone's head, a wiki page that is already outdated, or a
configuration that was applied manually and has drifted from any documented state.

## What belongs in version control

### Application code

Application code in version control is the baseline. If your team is not there yet, start here before reading further.

### Infrastructure

Every server, network, database instance, load balancer, DNS record, and cloud resource should be
defined in code and provisioned through automation.

**What this looks like:**

- Cloud resources defined in Terraform, Pulumi, CloudFormation, or similar tools
- Server configuration managed by Ansible, Chef, Puppet, or container images
- Network topology, firewall rules, and security groups defined declaratively
- Environment creation is a pipeline run, not a ticket to another team

**What this replaces:**

- Clicking through cloud provider consoles to create resources
- SSH-ing into servers to install packages or change configuration
- Filing tickets for another team to provision an environment
- "Snowflake" servers that were configured by hand and nobody knows how to recreate

**Why it matters for CD:** If creating or modifying an environment requires manual steps, your
[deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) is limited by the availability and speed of the person who performs those
steps. If a production server fails and you cannot recreate it from code, your [mean time to
recovery]({{< relref "/docs/reference/glossary#mean-time-to-restore-mttr" >}}) is measured in hours or days instead of minutes.

### Pipeline definitions

Pipeline configuration (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, or equivalent) belongs in the same repository as the code it builds. When pipeline changes go through the same review and automation as application code, teams can modify their own delivery process without tickets or UI-only bottlenecks.

### Database schemas and migrations

Database schema changes should be defined as versioned migration scripts, stored in version
control, and applied through the pipeline.

**What this looks like:**

- Migration scripts in the repository (using tools like Flyway, Liquibase, Alembic, or
  ActiveRecord migrations)
- Every schema change is a numbered, ordered migration that can be applied and rolled back
- Migrations run as part of the deployment pipeline, not as a manual step
- Schema changes follow the expand-then-contract pattern: add the new column, deploy code that
  uses it, then remove the old column in a later migration

**What this replaces:**

- A DBA manually applying SQL scripts during a maintenance window
- Schema changes that are "just done in production" and not tracked anywhere
- Database state that has drifted from what is defined in any migration script

**Why it matters for CD:** Database changes are one of the most common reasons teams cannot deploy
continuously. If schema changes require manual intervention, coordinated downtime, or a separate
approval process, they become a bottleneck that forces batching. Treating schemas as code with
automated migrations removes this bottleneck.

### Application configuration

Environment-specific values (connection strings, API endpoints, [feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}) states, logging levels) should live in a config management system and flow through a pipeline so the same [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) is deployed to every environment. When configuration is committed and reviewed like code, you eliminate drift between environments and "works in staging" surprises. See [Application Config]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}) for detailed guidance.

### Monitoring, alerting, and observability

Dashboards, alert rules, SLO definitions, and logging configuration should be defined as code (Terraform, Prometheus rules, Datadog monitors-as-code, or equivalent). When you deploy frequently, you need to know instantly whether each deployment is healthy. Monitoring defined as code ensures every service has consistent, reviewed, reproducible observability instead of hand-built dashboards and undocumented alert rules.

### Security policies

Security controls (access policies, network rules, secret rotation schedules, compliance
checks) should be defined as code and enforced automatically.

**What this looks like:**

- IAM policies and RBAC rules defined in Terraform or policy-as-code tools (OPA, Sentinel)
- Security scanning integrated into the pipeline (SAST, dependency scanning, container image
  scanning)
- Secret rotation automated and defined in code
- Compliance checks that run on every commit, not once a quarter

**What this replaces:**

- Security reviews that happen at the end of the development cycle
- Access policies configured through UIs and never audited
- Compliance as a manual checklist performed before each release

**Why it matters for CD:** Security and compliance requirements are the most common organizational
blockers for CD. When security controls are defined as code and enforced by the pipeline, you can
prove to auditors that every change passed security checks automatically. This is stronger
evidence than a manual review, and it does not slow down delivery.

## The "One Change, One Process" Test

For every type of artifact in your system, ask:

> If I need to change this, do I commit a code change and let the pipeline deliver it?

If the answer is yes, the artifact is managed as code. If the answer involves SSH, a UI, a
ticket to another team, or a manual step, it is not.

| Artifact | Managed as code? | If not, the risk is... |
|----------|-----------------|----------------------|
| Application source code | Usually yes | - |
| Infrastructure (servers, networks, cloud resources) | Often no | Snowflake environments, slow provisioning, unreproducible disasters |
| Pipeline definitions | Sometimes | Pipeline changes are slow, unreviewed, and risky |
| Database schemas | Sometimes | Schema changes require manual coordination and downtime |
| Application configuration | Sometimes | Config drift between environments, "works in staging" failures |
| Monitoring and alerting | Rarely | Monitoring gaps, unreproducible dashboards, alert fatigue |
| Security policies | Rarely | Security as a gate instead of a guardrail, audit failures |

**The goal is for every row in this table to be "yes."** You will not get there overnight, but every
artifact you move from manual to code-managed removes a bottleneck and a risk.

## How to Get There

### Start with what blocks you most

Do not try to move everything to code at once. Identify the artifact type that causes the most
pain or blocks deployments most frequently:

- If environment provisioning takes days, start with **infrastructure as code.**
- If database changes are the reason you cannot deploy more than once a week, start with
  **schema migrations as code.**
- If pipeline changes require tickets to a platform team, start with **pipeline as code.**
- If configuration drift causes production incidents, start with **configuration as code.**

### Apply the same practices as application code

Once an artifact is defined as code, treat it with the same rigor as application code:

- Store it in version control (ideally in the same repository as the application it supports)
- Review changes before they are applied
- Test changes automatically (linting, dry-runs, policy checks)
- Deliver changes through a pipeline
- Never modify the artifact outside of this process

### Eliminate manual pathways

The hardest part is closing the manual back doors. As long as someone can SSH into a server and
make a change, or click through a UI to modify infrastructure, the code-defined state will drift
from reality.

The principle is the same as [Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}})
for application code: the pipeline is the only way any change reaches production. This applies to
infrastructure, configuration, schemas, monitoring, and policies just as much as it applies to
application code.

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Artifact types managed as code | Count of categories fully code-managed; should increase over time |
| Manual changes to production | Changes made outside a pipeline (SSH, UI, manual scripts); target zero |
| Environment recreation time | Time to recreate a [production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}) from scratch; should shrink steadily |
| Mean time to recovery | [MTTR]({{< relref "/docs/reference/glossary#mean-time-to-restore-mttr" >}}) drops when recovery means "re-run the pipeline" |

## Related Content

- [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}): The build itself must be a single, version-controlled command
- [Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}): The pipeline is the only way changes reach production
- [Application Config]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}): Externalize configuration from artifacts
- [Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}): Same inputs, same outputs, every time
- [Production-Like Environments]({{< relref "/docs/migrate-to-cd/pipeline/production-like-environments" >}}): Infrastructure-as-code enables environment parity
