---
title: "FAQ"
linkTitle: "FAQ"
weight: 5
description: >
  Frequently asked questions about continuous delivery and this migration guide.
---

{{% pageinfo %}}
Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## About This Guide

### Why does this migration guide exist?

Many teams say they want to adopt continuous delivery but do not know where to start. The CD
landscape is full of tools, frameworks, and advice, but there is no clear, sequenced path from
"we deploy monthly" to "we can deploy any change at any time." This guide provides that path.

It is built on the [MinimumCD](https://minimumcd.org) definition of continuous delivery and
draws on practices from the [Dojo Consortium](https://dojoconsortium.org) and the
[DORA research](https://dora.dev). The content is organized as a migration -- a phased journey
from your current state to continuous delivery -- rather than as a description of what CD looks
like when you are already there.

### Who is this guide for?

This guide is for development teams, tech leads, and engineering managers who want to improve
their software delivery practices. It is designed for teams that are currently deploying
infrequently (monthly, quarterly, or less) and want to reach a state where any change can be
deployed to production at any time.

You do not need to be starting from zero. If your team already has CI in place, you can begin
with [Phase 2 -- Pipeline](../migration-path/pipeline/). If you have a pipeline but deploy infrequently, start
with [Phase 3 -- Optimize](../migration-path/optimize/). Use the [Phase 0 assessment](../migration-path/assess/) to find your
starting point.

### Should we adopt this guide as an organization or as a team?

Start with a single team. CD adoption works best when a team can experiment, learn, and iterate
without waiting for organizational consensus. Once one team demonstrates results -- shorter lead
times, lower change failure rate, more frequent deployments -- other teams will have a concrete
example to follow.

Organizational adoption comes after team adoption, not before. The role of organizational
leadership is to create the conditions for teams to succeed: stable team composition, tool
funding, policy flexibility for deployment processes, and protection from pressure to cut
corners on quality.

### How do we use this guide for improvement?

Start with [Phase 0 -- Assess](../migration-path/assess/). Map your value stream, measure your current
performance, and identify your top constraints. Then work through the phases in order, focusing
on one constraint at a time.

The guide is not a checklist to complete in sequence. It is a reference that helps you decide
what to work on next. Some teams will spend months in Phase 1 building testing fundamentals.
Others will move quickly to Phase 2 because they already have strong development practices.
Your value stream map and metrics tell you where to invest.

Revisit your assessment periodically. As you improve, new constraints will emerge. The phases
give you a framework for addressing them.

## Continuous Delivery Concepts

### What is the difference between continuous delivery and continuous deployment?

**Continuous delivery** means every change to the codebase is always in a deployable state and
can be released to production at any time through a fully automated pipeline. The decision to
deploy may still be made by a human, but the capability to deploy is always present.

**Continuous deployment** is an extension of continuous delivery where every change that passes
the automated pipeline is deployed to production without manual intervention.

This migration guide takes you through continuous delivery (Phases 0-3) and then to continuous
deployment (Phase 4). Continuous delivery is the prerequisite. You cannot safely automate
deployment decisions until your pipeline reliably determines what is deployable.

### Is continuous delivery the same as having a CI/CD pipeline?

No. Many teams have a CI/CD pipeline tool (Jenkins, GitHub Actions, GitLab CI, etc.) but are
not practicing continuous delivery. A pipeline tool is necessary but not sufficient.

Continuous delivery requires:

- **Trunk-based development** -- all developers integrating to trunk at least daily
- **Comprehensive test automation** -- fast, reliable tests that catch real defects
- **A single path to production** -- every change goes through the same automated pipeline
- **Immutable artifacts** -- build once, deploy the same artifact everywhere
- **The ability to deploy any green build** -- not just special "release" builds

If your team has a pipeline but uses long-lived feature branches, deploys only at the end of a
sprint, or requires manual testing before a release, you have a pipeline tool but you are not
practicing continuous delivery. The [current-state checklist](../migration-path/assess/current-state-checklist/)
in Phase 0 helps you assess the gap.

### What does "the pipeline is the only path to production" mean?

It means there is exactly one way for any change to reach production: through the automated
pipeline. No one can SSH into a server and make a change. No one can skip the test suite for
an "urgent" fix. No one can deploy from their local machine.

This constraint is what gives you confidence. If every change in production has been through
the same build, test, and deployment process, you know what is running and how it got there.
If exceptions are allowed, you lose that guarantee, and your ability to reason about production
state degrades.

During your migration, establishing this single path is a key milestone in
[Phase 2](../migration-path/pipeline/single-path-to-production/).

### What does "application configuration" mean in the context of CD?

Application configuration refers to values that change between environments but are not part of
the application code: database connection strings, API endpoints, feature flag states, logging
levels, and similar settings.

In a CD pipeline, configuration is externalized -- it lives outside the artifact and is injected
at deployment time. This is what makes [immutable artifacts](../migration-path/pipeline/immutable-artifacts/)
possible. You build the artifact once and deploy it to any environment by providing the
appropriate configuration.

If configuration is embedded in the artifact (for example, hardcoded URLs or environment-specific
config files baked into a container image), you must rebuild the artifact for each environment,
which means the artifact you tested is not the artifact you deploy. This breaks the immutability
guarantee. See [Application Config](../migration-path/pipeline/application-config/).

### What is an "immutable artifact" and why does it matter?

An immutable artifact is a build output (container image, binary, package) that is never
modified after it is created. The exact artifact that passes your test suite is the exact
artifact that is deployed to staging, and then to production. Nothing is recompiled, repackaged,
or patched between environments.

This matters because it eliminates an entire category of deployment failures: "it worked in
staging but not in production" caused by differences in the build. If the same bytes are
deployed everywhere, build-related discrepancies are impossible.

Immutability requires externalizing configuration (see above) and storing artifacts in a
registry or repository. See [Immutable Artifacts](../migration-path/pipeline/immutable-artifacts/).

### What does "deployable" mean?

A change is deployable when it has passed all automated quality gates defined in the pipeline.
The definition is codified in the pipeline itself, not decided by a person at deployment time.

A typical deployable definition includes:

- All unit tests pass
- All integration tests pass
- All functional tests pass
- Static analysis checks pass (linting, security scanning)
- The artifact is built and stored in the artifact registry
- Deployment to a production-like environment succeeds
- Smoke tests in the production-like environment pass

If any of these gates fail, the change is not deployable. The pipeline makes this determination
automatically and consistently. See [Deployable Definition](../migration-path/pipeline/deployable-definition/).

### What is the difference between deployment and release?

**Deployment** is the act of putting code into a production environment.

**Release** is the act of making functionality available to users.

These are different events, and decoupling them is one of the most powerful techniques in CD.
You can deploy code to production without releasing it to users by using
[feature flags](../migration-path/optimize/feature-flags/). The code is running in production, but the new
functionality is disabled. When you are ready, you enable the flag and the feature is released.

This decoupling is important because it separates the technical risk (will the deployment
succeed?) from the business risk (will users like the feature?). You can manage each risk
independently. Deployments become routine technical events. Releases become deliberate business
decisions.

## Migration Questions

### How long does the migration take?

It depends on where you start and how much organizational support you have. As a rough guide:

- **Phase 0 (Assess):** 1-2 weeks
- **Phase 1 (Foundations):** 1-6 months, depending on current testing and TBD maturity
- **Phase 2 (Pipeline):** 1-3 months
- **Phase 3 (Optimize):** 2-6 months
- **Phase 4 (Continuous Deployment):** 1-3 months

These ranges assume a single team working on the migration alongside regular delivery work.
The biggest variable is Phase 1: teams with no test automation or TBD practice will spend
longer building foundations than teams that already have these in place.

Do not treat these timelines as commitments. The migration is an iterative improvement process,
not a project with a deadline.

### Do we stop delivering features during the migration?

No. The migration is done alongside regular delivery work, not instead of it. Each migration
practice is adopted incrementally: you do not stop the world to rewrite your test suite or
redesign your pipeline.

For example, in Phase 1 you adopt trunk-based development by reducing branch lifetimes
gradually -- from two weeks to one week to two days to same-day. You add automated tests
incrementally, starting with the highest-risk code paths. You decompose work into smaller
stories one sprint at a time.

The migration practices themselves improve your delivery speed, so the investment pays off
as you go. Teams that have completed Phase 1 typically report delivering features faster than
before, not slower.

### What if our organization requires manual change approval (CAB)?

Many organizations have Change Advisory Board (CAB) processes that require manual approval
before production deployments. This is one of the most common organizational blockers for CD.

The path forward is to replace the manual approval with automated evidence. A CAB exists
because the organization lacks confidence that changes are safe. Your CD pipeline, when mature,
provides stronger evidence of safety than a committee meeting:

- Every change has passed comprehensive automated tests
- The exact artifact that was tested is the one being deployed
- Rollback is automated and takes minutes
- Deployment is a routine event that happens many times per week

Use your DORA metrics to demonstrate that automated pipelines produce lower change failure
rates than manual approval processes. Most CAB processes were designed for a world of monthly
releases with hundreds of changes per batch. When you deploy daily with one or two changes per
deployment, the risk profile is fundamentally different.

This is a gradual conversation, not a one-time negotiation. Start by inviting CAB
representatives to observe your pipeline. Show them the test results, the deployment logs,
the rollback capability. Build trust through evidence.

### What if we have a monolithic architecture?

You can practice continuous delivery with a monolith. CD does not require microservices. Many
of the highest-performing teams in the DORA research deploy monolithic applications multiple
times per day.

What matters is that your architecture supports independent testing and deployment. A
well-structured monolith with a comprehensive test suite and a reliable pipeline can achieve
CD. A poorly structured collection of microservices with shared databases and coordinated
releases cannot.

Architecture decoupling is addressed in [Phase 3](../migration-path/optimize/architecture-decoupling/), but
it is about enabling independent deployment and reducing coordination costs, not about adopting
any particular architectural style.

### What if our tests are slow or unreliable?

This is one of the most common starting conditions. A slow or flaky test suite undermines
every CD practice: developers stop trusting the tests, broken builds are ignored, and the
pipeline becomes a bottleneck rather than an enabler.

The solution is incremental, not wholesale:

1. **Delete or quarantine flaky tests.** A test that sometimes passes and sometimes fails
   provides no signal. Remove it from the pipeline and fix it or replace it.
2. **Parallelize what you can.** Many test suites are slow because they run sequentially.
   Parallelization is often the fastest way to reduce pipeline duration.
3. **Rebalance the test pyramid.** If most of your automated tests are end-to-end or UI
   tests, they will be slow and brittle. Invest in unit and integration tests that run in
   milliseconds and reserve end-to-end tests for critical paths only.
4. **Set a time budget.** Your full pipeline -- build, test, deploy to a staging environment
   -- should complete in under 10 minutes. If it takes longer, that is a constraint to address.

See [Testing Fundamentals](../migration-path/foundations/testing-fundamentals/) and the
[Testing reference section](../reference/testing/) for detailed guidance.

### Where do I start if I am not sure which phase applies to us?

Start with [Phase 0 -- Assess](../migration-path/assess/). Complete the
[value stream mapping](../migration-path/assess/value-stream-mapping/) exercise, take
[baseline metrics](../migration-path/assess/baseline-metrics/), and fill out the
[current-state checklist](../migration-path/assess/current-state-checklist/). These activities will tell you
exactly where you stand and which phase to begin with.

If you do not have time for a full assessment, ask yourself these questions:

- **Do all developers integrate to trunk at least daily?** If no, start with [Phase 1](../migration-path/foundations/).
- **Do you have a single automated pipeline that every change goes through?** If no, start with [Phase 2](../migration-path/pipeline/).
- **Can you deploy any green build to production on demand?** If no, focus on the gap between your current state and [Phase 2](../migration-path/pipeline/) completion criteria.
- **Do you deploy at least weekly?** If no, look at [Phase 3](../migration-path/optimize/) for batch size and flow optimization.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
