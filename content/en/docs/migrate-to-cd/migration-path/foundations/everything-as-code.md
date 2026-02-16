---
title: "Everything as Code"
linkTitle: "Everything as Code"
weight: 7
description: >
  Every artifact that defines your system - infrastructure, pipelines, configuration, database schemas, monitoring - belongs in version control and is delivered through pipelines.
---

{{% pageinfo %}}
**Phase 1 - Foundations**

If it is not in version control, it does not exist. If it is not delivered through a pipeline, it
is a manual step. Manual steps block continuous delivery. This page establishes the principle that
everything required to build, deploy, and operate your system is defined as code, version
controlled, reviewed, and delivered through the same automated pipelines as your application.
{{% /pageinfo %}}

## The Principle

Continuous delivery requires that any change to your system - application code, infrastructure,
pipeline configuration, database schema, monitoring rules, security policies - can be made through
a single, consistent process: change the code, commit, let the pipeline deliver it.

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

## What "Everything" Means

### Application code

This is where most teams start, and it is the least controversial. Your application source code
is in version control, built and tested by a pipeline, and deployed as an immutable artifact.

If your application code is not in version control, start here. Nothing else in this page matters
until this is in place.

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
deployment frequency is limited by the availability and speed of the person who performs those
steps. If a production server fails and you cannot recreate it from code, your mean time to
recovery is measured in hours or days instead of minutes.

### Pipeline definitions

Your pipeline configuration belongs in the same repository as the code it builds and
deploys. The pipeline is code, not a configuration applied through a UI.

**What this looks like:**

- Pipeline definitions in `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, or equivalent
- Pipeline changes go through the same review process as application code
- Pipeline behavior is deterministic - the same commit always produces the same pipeline behavior
- Teams can modify their own pipelines without filing tickets

**What this replaces:**

- Pipeline configuration maintained through a Jenkins UI that nobody is allowed to touch
- A "platform team" that owns all pipeline definitions and queues change requests
- Pipeline behavior that varies depending on server state or installed plugins

**Why it matters for CD:** The pipeline is the path to production. If the pipeline itself cannot
be changed through a reviewed, automated process, it becomes a bottleneck and a risk. Pipeline
changes should flow with the same speed and safety as application changes.

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

Environment-specific configuration - database connection strings, API endpoints, feature flag
states, logging levels - should be defined as code and managed through version control.

**What this looks like:**

- Configuration values stored in a config management system (Consul, AWS Parameter Store,
  environment variable definitions in infrastructure code)
- Configuration changes are committed, reviewed, and deployed through a pipeline
- The same application artifact is deployed to every environment; only the configuration differs

**What this replaces:**

- Configuration files edited manually on servers
- Environment variables set by hand and forgotten
- Configuration that exists only in a deployment runbook

See [Application Config](../../pipeline/application-config/) for detailed guidance on
externalizing configuration.

### Monitoring, alerting, and observability

Dashboards, alert rules, SLO definitions, and logging configuration should be defined as code.

**What this looks like:**

- Alert rules defined in Terraform, Prometheus rules files, or Datadog monitors-as-code
- Dashboards defined as JSON or YAML, not built by hand in a UI
- SLO definitions tracked in version control alongside the services they measure
- Logging configuration (what to log, where to send it, retention policies) in code

**What this replaces:**

- Dashboards built manually in a monitoring UI that nobody knows how to recreate
- Alert rules that were configured by hand during an incident and never documented
- Monitoring configuration that exists only on the monitoring server

**Why it matters for CD:** If you deploy ten times a day, you need to know instantly whether each
deployment is healthy. If your monitoring and alerting configuration is manual, it will drift,
break, or be incomplete. Monitoring-as-code ensures that every service has consistent, reviewed,
reproducible observability.

### Security policies

Security controls - access policies, network rules, secret rotation schedules, compliance
checks - should be defined as code and enforced automatically.

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

The goal is for every row in this table to be "yes." You will not get there overnight, but every
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

The principle is the same as [Single Path to Production](../../pipeline/single-path-to-production/)
for application code: the pipeline is the only way any change reaches production. This applies to
infrastructure, configuration, schemas, monitoring, and policies just as much as it applies to
application code.

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Artifact types managed as code | Track how many of the categories above are fully code-managed. The number should increase over time. |
| Manual changes to production | Count any change made outside of a pipeline (SSH, UI clicks, manual scripts). Target: zero. |
| Environment recreation time | How long does it take to recreate a production-like environment from scratch? Should decrease as more infrastructure moves to code. |
| Mean time to recovery | When infrastructure-as-code is in place, recovery from failures is "re-run the pipeline." MTTR drops dramatically. |

## Related Content

- [Build Automation](../build-automation/) - The build itself must be a single, version-controlled command
- [Single Path to Production](../../pipeline/single-path-to-production/) - The pipeline is the only way changes reach production
- [Application Config](../../pipeline/application-config/) - Externalize configuration from artifacts
- [Deterministic Pipeline](../../pipeline/deterministic-pipeline/) - Same inputs, same outputs, every time
- [Production-Like Environments](../../pipeline/production-like-environments/) - Infrastructure-as-code enables environment parity
