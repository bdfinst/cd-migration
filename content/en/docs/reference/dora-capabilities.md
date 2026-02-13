---
title: "DORA Capabilities"
linkTitle: "DORA Capabilities"
weight: 4
description: >
  The capabilities that drive software delivery performance, as identified by DORA research.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

The DevOps Research and Assessment (DORA) research program has identified capabilities that
predict high software delivery performance. These capabilities are not tools or technologies
-- they are practices and cultural conditions that enable teams to deliver software quickly,
reliably, and sustainably.

This page organizes the DORA capabilities by their relevance to each migration phase. Use it
as a reference to understand which capabilities you are building at each stage of your journey
and which ones to focus on next.

## Continuous Delivery Capabilities

These capabilities directly support the mechanics of getting software from commit to production.
They are the primary focus of Phases 1 and 2 of the migration.

### Version Control

All production artifacts -- application code, test code, infrastructure configuration,
deployment scripts, and database schemas -- are stored in version control and can be
reproduced from a single source of truth.

**Migration relevance:** This is a prerequisite for Phase 1. If any part of your delivery
process depends on files stored on a specific person's machine or a shared drive, address that
before beginning the migration.

### Continuous Integration

Developers integrate their work to trunk at least daily. Each integration triggers an
automated build and test process. Broken builds are fixed within minutes.

**Migration relevance:** [Phase 1 -- Foundations](../../migration-path/foundations/). CI is the gateway
capability. Without it, none of the pipeline practices in Phase 2 can function. See
[Build Automation](../../migration-path/foundations/build-automation/) and
[Trunk-Based Development](../../migration-path/foundations/trunk-based-development/).

### Deployment Automation

Deployments are fully automated and can be triggered by anyone on the team. No manual steps
are required between a green pipeline and production.

**Migration relevance:** [Phase 2 -- Pipeline](../../migration-path/pipeline/). Specifically,
[Single Path to Production](../../migration-path/pipeline/single-path-to-production/) and
[Rollback](../../migration-path/pipeline/rollback/).

### Trunk-Based Development

Developers work in small batches and merge to trunk at least daily. Branches, if used, are
short-lived (less than one day). There are no long-lived feature branches.

**Migration relevance:** [Phase 1 -- Trunk-Based Development](../../migration-path/foundations/trunk-based-development/).
This is one of the first capabilities to establish because it enables CI.

### Test Automation

A comprehensive suite of automated tests provides confidence that the software is deployable.
Tests are reliable, fast, and maintained as carefully as production code.

**Migration relevance:** [Phase 1 -- Testing Fundamentals](../../migration-path/foundations/testing-fundamentals/).
Also see the [Testing reference section](../testing/) for guidance on specific test types.

### Test Data Management

Test data is managed in a way that allows automated tests to run independently, repeatably,
and without relying on shared mutable state. Tests can create and clean up their own data.

**Migration relevance:** Becomes critical during [Phase 2](../../migration-path/pipeline/) when you need
production-like environments and deterministic pipeline results.

### Shift Left on Security

Security is integrated into the development process rather than added as a gate at the end.
Automated security checks run in the pipeline. Security requirements are part of the
definition of deployable.

**Migration relevance:** Integrated during [Phase 2 -- Pipeline Architecture](../../migration-path/pipeline/pipeline-architecture/)
as automated quality gates rather than manual review steps.

## Architecture Capabilities

These capabilities address the structural characteristics of your system that enable or prevent
independent, frequent deployment.

### Loosely Coupled Architecture

Teams can deploy their services independently without coordinating with other teams. Changes
to one service do not require changes to other services. APIs have well-defined contracts.

**Migration relevance:** [Phase 3 -- Architecture Decoupling](../../migration-path/optimize/architecture-decoupling/).
This capability becomes critical when optimizing for deployment frequency and small batch
sizes.

### Empowered Teams

Teams choose their own tools, technologies, and approaches within organizational guardrails.
They do not need approval from a central architecture board for implementation decisions.

**Migration relevance:** All phases. Teams that cannot make local decisions about their
pipeline, test strategy, or deployment approach will be unable to iterate quickly enough
to make progress.

## Product and Process Capabilities

These capabilities address how work is planned, prioritized, and delivered.

### Customer Feedback

Product decisions are informed by direct feedback from customers. Teams can observe how
features are used in production and adjust accordingly.

**Migration relevance:** Becomes fully enabled in [Phase 4 -- Deliver on Demand](../../migration-path/continuous-deployment/)
when every change reaches production quickly enough for real customer feedback to inform
the next change.

### Value Stream Visibility

The team has a clear view of the entire delivery process from request to production, including
wait times, handoffs, and rework loops.

**Migration relevance:** [Phase 0 -- Value Stream Mapping](../../migration-path/assess/value-stream-mapping/).
This is the first activity in the migration because it informs every decision that follows.

### Working in Small Batches

Work is broken down into small increments that can be completed, tested, and deployed
independently. Each increment delivers measurable value or validated learning.

**Migration relevance:** Begins in [Phase 1 -- Work Decomposition](../../migration-path/foundations/work-decomposition/)
and is optimized in [Phase 3 -- Small Batches](../../migration-path/optimize/small-batches/).

### Team Experimentation

Teams can try new ideas, tools, and approaches without requiring approval through a lengthy
process. Failed experiments are treated as learning, not as waste.

**Migration relevance:** All phases. The migration itself is an experiment. Teams need the
psychological safety and organizational support to try new practices, fail occasionally, and
adjust.

## Lean Management Capabilities

These capabilities address how work is managed, measured, and improved.

### Limit Work in Progress

Teams have explicit WIP limits that constrain the number of items in any stage of the delivery
process. WIP limits are enforced and respected.

**Migration relevance:** [Phase 3 -- Limiting WIP](../../migration-path/optimize/limiting-wip/). Reducing WIP
is one of the most effective ways to improve lead time and delivery predictability.

### Visual Management

The state of all work is visible to the entire team through dashboards, boards, or other
visual tools. Anyone can see what is in progress, what is blocked, and what has been deployed.

**Migration relevance:** All phases. Visual management supports the identification of
constraints in Phase 0 and the enforcement of WIP limits in Phase 3.

### Monitoring and Observability

Teams have access to production metrics, logs, and traces that allow them to understand system
behavior, detect issues, and diagnose problems quickly.

**Migration relevance:** Critical for [Phase 4 -- Progressive Rollout](../../migration-path/continuous-deployment/progressive-rollout/)
where automated health checks determine whether a deployment proceeds or rolls back. Also
supports fast [mean time to restore](../metrics/mean-time-to-repair/).

### Proactive Notification

Teams are alerted to problems before customers are affected. Monitoring thresholds and
anomaly detection trigger notifications that enable rapid response.

**Migration relevance:** Becomes critical in Phase 4 when deployments are continuous and
automated. Proactive notification is what makes continuous deployment safe.

## Cultural Capabilities

These capabilities address the human and organizational conditions that enable high performance.

### Generative Culture

Following Ron Westrum's organizational typology, a generative culture is characterized by
high cooperation, shared risk, and a focus on the mission. Messengers are not punished.
Failures are treated as learning opportunities. New ideas are welcomed.

**Migration relevance:** All phases. A generative culture is not a phase you implement -- it
is a condition you cultivate continuously. Teams in pathological or bureaucratic cultures will
struggle with every phase of the migration because practices like TBD and CI require trust
and psychological safety.

### Learning Culture

The organization invests in learning. Teams have time for experimentation, training, and
conference attendance. Knowledge is shared across teams.

**Migration relevance:** All phases. The CD migration is a learning journey. Teams need time
and space to learn new practices, make mistakes, and improve.

### Collaboration Among Teams

Development, operations, security, and product teams work together rather than in silos.
Handoffs are minimized. Shared responsibility replaces blame.

**Migration relevance:** All phases, but especially [Phase 2 -- Pipeline](../../migration-path/pipeline/)
where the pipeline must encode the quality criteria from all disciplines (security, testing,
operations) into automated gates.

### Job Satisfaction

Team members find their work meaningful and have the autonomy and resources to do it well.
High job satisfaction predicts high delivery performance (the relationship is bidirectional).

**Migration relevance:** The migration itself should improve job satisfaction by reducing
toil, eliminating painful manual processes, and giving teams faster feedback on their work.
If the migration is experienced as a burden rather than an improvement, something is wrong
with the approach.

### Transformational Leadership

Leaders support the migration with vision, resources, and organizational air cover. They
remove impediments, set direction, and create the conditions for teams to succeed without
micromanaging the details.

**Migration relevance:** All phases. Without leadership support, the migration will stall
when it encounters the first organizational blocker (budget for tools, policy changes for
deployment processes, cross-team coordination).

## Capability Maturity by Phase

The following table maps each DORA capability to the migration phase where it is most actively
developed:

| Capability | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|------------|---------|---------|---------|---------|---------|
| Version control | Prerequisite | | | | |
| Continuous integration | | Primary | | | |
| Deployment automation | | | Primary | | |
| Trunk-based development | | Primary | | | |
| Test automation | | Primary | Expanded | | |
| Test data management | | | Primary | | |
| Shift left on security | | | Primary | | |
| Loosely coupled architecture | | | | Primary | |
| Empowered teams | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Customer feedback | | | | | Primary |
| Value stream visibility | Primary | | | Revisited | |
| Working in small batches | | Started | | Primary | |
| Team experimentation | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Limit WIP | | | | Primary | |
| Visual management | Started | Ongoing | Ongoing | Ongoing | Ongoing |
| Monitoring and observability | | | Started | Expanded | Primary |
| Proactive notification | | | | | Primary |
| Generative culture | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Learning culture | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Collaboration among teams | | Started | Primary | | |
| Job satisfaction | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Transformational leadership | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |

{{% alert title="Using This Table" %}}
"Primary" means the phase where the capability is the main focus of improvement work.
"Ongoing" means the capability is relevant in every phase and should be continuously
nurtured. "Started" or "Expanded" means the capability is introduced or deepened in that
phase. No entry means the capability is not a primary concern in that phase, though it may
still be relevant.
{{% /alert %}}

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
