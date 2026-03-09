---
title: "DORA Recommended Practices"
linkTitle: "DORA Recommended Practices"
weight: 13
description: >
  The practices that drive software delivery performance, as identified by DORA research.
---

The DevOps Research and Assessment ([DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}})) research program has identified practices that
predict high software delivery performance. These practices are not tools or technologies.
They are cultural conditions and behaviors that enable teams to deliver software quickly,
reliably, and sustainably.

This page organizes the DORA recommended practices by their relevance to each migration phase. Use it
as a reference to understand which practices you are building at each stage of your journey
and which ones to focus on next.

{{% alert title="Using This Table" %}}
"Primary" means the phase where the practice is the main focus of improvement work.
"Ongoing" means the practice is relevant in every phase and should be continuously
nurtured. "Started" or "Expanded" means the practice is introduced or deepened in that
phase. No entry means the practice is not a primary concern in that phase, though it may
still be relevant.
{{% /alert %}}

## Practice Maturity by Phase

| Practice | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|----------|---------|---------|---------|---------|---------|
| Version control | Prerequisite | | | | |
| [Continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | | Primary | | | |
| Deployment automation | | | Primary | | |
| [Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}) | | Primary | | | |
| Test automation | | Primary | Expanded | | |
| Test data management | | | Primary | | |
| Shift left on security | | | Primary | | |
| Loosely coupled architecture | | | | Primary | |
| Empowered teams | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Customer feedback | | | | | Primary |
| Value stream visibility | Primary | | | Revisited | |
| Working in small batches | | Started | | Primary | |
| Team experimentation | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Limit [WIP]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}) | | | | Primary | |
| Visual management | Started | Ongoing | Ongoing | Ongoing | Ongoing |
| Monitoring and observability | | | Started | Expanded | Primary |
| Proactive notification | | | | | Primary |
| Generative culture | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Learning culture | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Collaboration among teams | | Started | Primary | | |
| Job satisfaction | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |
| Transformational leadership | Ongoing | Ongoing | Ongoing | Ongoing | Ongoing |

## Continuous Delivery Practices

These practices directly support the mechanics of getting software from commit to production.
They are the primary focus of Phases 1 and 2 of the migration.

### Version Control

All production [artifacts]({{< relref "/docs/reference/glossary#artifact" >}}) (application code, test code, infrastructure configuration,
deployment scripts, and database schemas) are stored in version control and can be
reproduced from a single source of truth.

**Migration relevance:** This is a prerequisite for Phase 1. If any part of your delivery
process depends on files stored on a specific person's machine or a shared drive, address that
before beginning the migration.

### Continuous Integration

Developers integrate their work to trunk at least daily. Each integration triggers an
automated build and test process. Broken builds are fixed within minutes.

**Migration relevance:** [Phase 1: Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}). CI is the gateway
practice. Without it, none of the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) practices in Phase 2 can function. See
[Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}) and
[Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}).

### Deployment Automation

Deployments are fully automated and can be triggered by anyone on the team. No manual steps
are required between a green pipeline and production.

**Migration relevance:** [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}). Specifically,
[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}) and
[Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}).

### Trunk-Based Development

Developers work in small batches and merge to trunk at least daily. Branches, if used, are
short-lived (less than one day). There are no long-lived feature branches.

**Migration relevance:** [Phase 1: Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}).
This is one of the first practices to establish because it enables CI.

### Test Automation

A comprehensive suite of automated tests provides confidence that the software is [deployable]({{< relref "/docs/reference/glossary#deployable" >}}).
Tests are reliable, fast, and maintained as carefully as production code.

**Migration relevance:** [Phase 1: Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}).
Also see the [Testing reference section]({{< relref "/docs/testing" >}}) for guidance on specific test types.

### Test Data Management

Test data is managed in a way that allows automated tests to run independently, repeatably,
and without relying on shared mutable state. Tests can create and clean up their own data.

**Migration relevance:** Becomes critical during [Phase 2]({{< relref "/docs/migrate-to-cd/pipeline" >}}) when you need
[production-like environments]({{< relref "/docs/reference/glossary#production-like-environment" >}}) and deterministic pipeline results.

### Shift Left on Security

Security is integrated into the development process rather than added as a gate at the end.
Automated security checks run in the pipeline. Security requirements are part of the
definition of deployable.

**Migration relevance:** Integrated during [Phase 2: Pipeline Architecture]({{< relref "/docs/migrate-to-cd/pipeline/pipeline-architecture" >}})
as automated quality gates rather than manual review steps.

## Architecture Practices

These practices address the structural characteristics of your system that enable or prevent
independent, frequent deployment.

### Loosely Coupled Architecture

Teams can deploy their services independently without coordinating with other teams. Changes
to one service do not require changes to other services. APIs have well-defined contracts.

**Migration relevance:** [Phase 3: Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}).
This practice becomes critical when optimizing for [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) and small [batch sizes]({{< relref "/docs/reference/glossary#batch-size" >}}).

## Product and Process Practices

These practices address how work is planned, prioritized, and delivered.

### Customer Feedback

Product decisions are informed by direct feedback from customers. Teams can observe how
features are used in production and adjust accordingly.

**Migration relevance:** Becomes fully enabled in [Phase 4: Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}})
when every change reaches production quickly enough for real customer feedback to inform
the next change.

### Value Stream Visibility

The team has a clear view of the entire delivery process from request to production, including
wait times, handoffs, and rework loops.

**Migration relevance:** [Phase 0: Value Stream Mapping]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}}).
This is the first activity in the migration because it informs every decision that follows.

### Working in Small Batches

Work is broken down into small increments that can be completed, tested, and deployed
independently. Each increment delivers measurable value or validated learning.

**Migration relevance:** Begins in [Phase 1: Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})
and is optimized in [Phase 3: Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}).

### Limit Work in Progress

Teams have explicit WIP limits that constrain the number of items in any stage of the delivery
process. WIP limits are enforced and respected.

**Migration relevance:** [Phase 3: Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}). Reducing WIP
is one of the most effective ways to improve lead time and delivery predictability.

### Visual Management

The state of all work is visible to the entire team through dashboards, boards, or other
visual tools. Anyone can see what is in progress, what is blocked, and what has been deployed.

**Migration relevance:** All phases. Visual management supports the identification of
[constraints]({{< relref "/docs/reference/glossary#constraint" >}}) in Phase 0 and the enforcement of WIP limits in Phase 3.

### Monitoring and Observability

Teams have access to production metrics, logs, and traces that allow them to understand system
behavior, detect issues, and diagnose problems quickly.

**Migration relevance:** Critical for [Phase 4: Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}})
where automated health checks determine whether a deployment proceeds or rolls back. Also
supports fast [mean time to restore]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}).

### Proactive Notification

Teams are alerted to problems before customers are affected. Monitoring thresholds and
anomaly detection trigger notifications that enable rapid response.

**Migration relevance:** Becomes critical in Phase 4 when deployments are continuous and
automated. Proactive notification is what makes [continuous deployment]({{< relref "/docs/reference/glossary#continuous-deployment" >}}) safe.

### Collaboration Among Teams

Development, operations, security, and product teams work together rather than in silos.
Handoffs are minimized. Shared responsibility replaces blame.

**Migration relevance:** All phases, but especially [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}})
where the pipeline must encode the quality criteria from all disciplines (security, testing,
operations) into automated gates.

## Practices Relevant in Every Phase

The following practices are not tied to a specific migration phase. They are conditions
that support every phase and should be cultivated continuously throughout the migration.

**Empowered Teams.** Teams choose their own tools, technologies, and approaches within
organizational guardrails. Teams that cannot make local decisions about their pipeline, test
strategy, or deployment approach will be unable to iterate quickly enough to make progress.

**Team Experimentation.** Teams can try new ideas, tools, and approaches without requiring
lengthy approval. Failed experiments are treated as learning, not waste. The migration itself
is an experiment that requires psychological safety and organizational support.

**Generative Culture.** Following Ron Westrum's typology, a generative culture is characterized
by high cooperation, shared risk, and focus on the mission. Teams in pathological or
bureaucratic cultures will struggle with every phase because practices like TBD and CI require
trust and psychological safety.

**Learning Culture.** The organization invests in learning. Teams have time for experimentation,
training, and knowledge sharing. The [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) migration is a learning journey that requires time and
space to learn new practices, make mistakes, and improve.

**Job Satisfaction.** Team members find their work meaningful and have the autonomy and resources
to do it well. The migration should improve job satisfaction by reducing
[toil]({{< relref "/docs/reference/glossary#toil" >}}) and giving teams faster feedback. If the migration is experienced as a
burden, something is wrong with the approach.

**Transformational Leadership.** Leaders support the migration with vision, resources, and
organizational air cover. Without leadership support, the migration will stall when it
encounters the first organizational blocker.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
