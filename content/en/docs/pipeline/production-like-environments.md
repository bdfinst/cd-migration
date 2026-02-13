---
title: "Production-Like Environments"
linkTitle: "Production-Like Environments"
weight: 6
description: >
  Test in environments that match production to catch environment-specific issues early.
---

{{% pageinfo %}}
**Phase 2 — Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

Production-like environments are pre-production environments that mirror the
infrastructure, configuration, and behavior of production closely enough that passing
tests in these environments provides genuine confidence that the change will work in
production.

"Production-like" does not mean "identical to production" in every dimension. It means
that the aspects of the environment relevant to the tests being run match production
sufficiently to produce a valid signal. A unit test environment needs the right runtime
version. An integration test environment needs the right service topology. A staging
environment needs the right infrastructure, networking, and data characteristics.

## Why It Matters for CD Migration

The gap between pre-production environments and production is where deployment failures
hide. Teams that test in environments that differ significantly from production — in
operating system, database version, network topology, resource constraints, or
configuration — routinely discover issues only after deployment.

For a CD migration, production-like environments are what transform pre-production testing
from "we hope this works" to "we know this works." They close the gap between the
pipeline's quality signal and the reality of production, making it safe to deploy
automatically.

## Key Principles

### Staging reflects production infrastructure

Your staging environment should match production in the dimensions that affect application
behavior:

- **Infrastructure platform** — same cloud provider, same orchestrator, same service mesh
- **Network topology** — same load balancer configuration, same DNS resolution patterns,
  same firewall rules
- **Database engine and version** — same database type, same version, same configuration
  parameters
- **Operating system and runtime** — same OS distribution, same runtime version, same
  system libraries
- **Service dependencies** — same versions of downstream services, or accurate test doubles

Staging does not necessarily need the same scale as production (fewer replicas, smaller
instances), but the architecture must be the same.

### Environments are version controlled

Every aspect of the environment that can be defined in code must be:

- **Infrastructure definitions** — Terraform, CloudFormation, Pulumi, or equivalent
- **Configuration** — Kubernetes manifests, Helm charts, Ansible playbooks
- **Network policies** — security groups, firewall rules, service mesh configuration
- **Monitoring and alerting** — the same observability configuration in all environments

Version-controlled environments can be reproduced, compared, and audited. Manual
environment configuration cannot.

### Ephemeral environments

Ephemeral environments are full-stack, on-demand, short-lived environments spun up for a
specific purpose — a pull request, a test run, a demo — and destroyed when that purpose is
complete.

Key characteristics of ephemeral environments:

- **Full-stack** — they include the application and all of its dependencies (databases,
  message queues, caches, downstream services), not just the application in isolation
- **On-demand** — any developer or pipeline can spin one up at any time without waiting
  for a shared resource
- **Short-lived** — they exist for hours or days, not weeks or months. This prevents
  configuration drift and stale state
- **Version controlled** — the environment definition is in code, and the environment is
  created from a specific version of that code
- **Isolated** — they do not share resources with other environments. No shared databases,
  no shared queues, no shared service instances

Ephemeral environments eliminate the "shared staging" bottleneck where multiple teams
compete for a single pre-production environment and block each other's progress.

### Data is representative

The data in pre-production environments must be representative of production data in
structure, volume, and characteristics. This does not mean using production data directly
(which raises security and privacy concerns). It means:

- **Schema matches production** — same tables, same columns, same constraints
- **Volume is realistic** — tests run against data sets large enough to reveal performance
  issues
- **Data characteristics are representative** — edge cases, special characters,
  null values, and data distributions that match what the application will encounter
- **Data is anonymized** — if production data is used as a seed, all personally
  identifiable information is removed or masked

## Anti-Patterns

### Shared, long-lived staging environments

A single staging environment shared by multiple teams becomes a bottleneck and a source of
conflicts. Teams overwrite each other's changes, queue up for access, and encounter
failures caused by other teams' work. Long-lived environments also drift from production
as manual changes accumulate.

### Environments that differ from production in critical ways

Running a different database version in staging than production, using a different
operating system, or skipping the load balancer that exists in production creates blind
spots where issues hide until they reach production.

### "It works on my laptop" as validation

Developer laptops are the least production-like environment available. They have different
operating systems, different resource constraints, different network characteristics, and
different installed software. Local validation is valuable for fast feedback during
development, but it does not replace testing in a production-like environment.

### Manual environment provisioning

Environments created by manually clicking through cloud consoles, running ad-hoc scripts,
or following runbooks are unreproducible and drift over time. If you cannot destroy and
recreate the environment from code in minutes, it is not suitable for continuous delivery.

### Synthetic-only test data

Using only hand-crafted test data with a few happy-path records misses the issues that
emerge with production-scale data: slow queries, missing indexes, encoding problems, and
edge cases that only appear in real-world data distributions.

## Good Patterns

### Infrastructure as Code for all environments

Define every environment — from local development to production — using the same
Infrastructure as Code templates. The differences between environments are captured in
configuration variables (instance sizes, replica counts, domain names), not in different
templates.

### Environment-per-pull-request

Automatically provision a full-stack ephemeral environment for every pull request. Run the
full test suite against this environment. Tear it down when the pull request is merged or
closed. This provides isolated, production-like validation for every change.

### Production data sampling and anonymization

Build an automated pipeline that samples production data, anonymizes it (removing PII,
masking sensitive fields), and loads it into pre-production environments. This provides
realistic data without security or privacy risks.

### Service virtualization for external dependencies

For external dependencies that cannot be replicated in pre-production (third-party APIs,
partner systems), use service virtualization to create realistic test doubles that mimic
the behavior, latency, and error modes of the real service.

### Environment parity monitoring

Continuously compare pre-production environments against production to detect drift.
Alert when the infrastructure, configuration, or service versions diverge. Tools that
compare Terraform state, Kubernetes configurations, or cloud resource inventories can
automate this comparison.

### Namespaced environments in shared clusters

In Kubernetes or similar platforms, use namespaces to create isolated environments within
a shared cluster. Each namespace gets its own set of services, databases, and
configuration, providing isolation without the cost of separate clusters.

## How to Get Started

### Step 1: Audit environment parity

Compare your current pre-production environments against production across every relevant
dimension: infrastructure, configuration, data, service versions, network topology. List
every difference.

### Step 2: Infrastructure-as-Code your environments

If your environments are not yet defined in code, start here. Define your production
environment in Terraform, CloudFormation, or equivalent. Then create pre-production
environments from the same definitions with different parameter values.

### Step 3: Address the highest-risk parity gaps

From your audit, identify the differences most likely to cause production failures —
typically database version mismatches, missing infrastructure components, or network
configuration differences. Fix these first.

### Step 4: Implement ephemeral environments

Build the tooling to spin up and tear down full-stack environments on demand. Start with
a simplified version (perhaps without full data replication) and iterate toward full
production parity.

### Step 5: Automate data provisioning

Create an automated pipeline for generating or sampling representative test data. Include
anonymization, schema validation, and data refresh on a regular schedule.

### Step 6: Monitor and maintain parity

Set up automated checks that compare pre-production environments to production and alert
on drift. Make parity a continuous concern, not a one-time setup.

## Connection to the Pipeline Phase

Production-like environments are where the pipeline's quality gates run. Without
production-like environments, the [deployable definition](../deployable-definition/)
produces a false signal — tests pass in an environment that does not resemble production,
and failures appear only after deployment.

[Immutable artifacts](../immutable-artifacts/) flow through these environments unchanged,
with only [configuration](../application-config/) varying. This combination — same
artifact, production-like environment, environment-specific configuration — is what gives
the pipeline its predictive power.

Production-like environments also support effective [rollback](../rollback/) testing: you
can validate that a rollback works correctly in a staging environment before relying on it
in production.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
