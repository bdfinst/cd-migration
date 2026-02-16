---
title: "Pipeline Architecture"
linkTitle: "Pipeline Architecture"
weight: 7
description: >
  Design efficient quality gates for your delivery system's context.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

Pipeline architecture is the structural design of your delivery pipeline - how stages are
organized, how quality gates are sequenced, how feedback loops operate, and how the
pipeline evolves over time. It encompasses both the technical design of the pipeline and
the improvement journey that a team follows from an initial, fragile pipeline to a mature,
resilient delivery system.

Good pipeline architecture is not achieved in a single step. Teams progress through
recognizable states, applying the Theory of Constraints to systematically identify and
resolve bottlenecks. The goal is a loosely coupled architecture where independent services
can be built, tested, and deployed independently through their own pipelines.

## Why It Matters for CD Migration

Most teams beginning a CD migration have a pipeline that is somewhere between "barely
functional" and "works most of the time." The pipeline may be slow, fragile, or tightly
coupled to other systems. Improving it requires a deliberate architectural approach - not
just adding more stages or more tests, but designing the pipeline for the flow
characteristics that continuous delivery demands.

Understanding where your pipeline architecture currently stands, and what the next
improvement looks like, prevents teams from either stalling at a "good enough" state or
attempting to jump directly to a target state that their context cannot support.

## Three Architecture States

Teams typically progress through three recognizable states on their journey to mature
pipeline architecture. Understanding which state you are in determines what improvements
to prioritize.

### Entangled (Requires Remediation)

In the entangled state, the pipeline has significant structural problems that prevent
reliable delivery:

- **Multiple applications share a single pipeline** - a change to one application triggers
  builds and tests for all applications, causing unnecessary delays and false failures
- **Shared, mutable infrastructure** - pipeline stages depend on shared databases, shared
  environments, or shared services that introduce coupling and contention
- **Manual stages interrupt automated flow** - manual approval gates, manual test
  execution, or manual environment provisioning block the pipeline for hours or days
- **No clear ownership** - the pipeline is maintained by a central team, and application
  teams cannot modify it without filing tickets and waiting
- **Build times measured in hours** - the pipeline is so slow that developers batch
  changes and avoid running it
- **Flaky tests are accepted** - the team routinely re-runs failed pipelines, and failures
  are assumed to be transient

**Remediation priorities:**

1. Separate pipelines for separate applications
2. Remove manual stages or parallelize them out of the critical path
3. Fix or remove flaky tests
4. Establish clear pipeline ownership with the application team

### Tightly Coupled (Transitional)

In the tightly coupled state, each application has its own pipeline, but pipelines depend
on each other or on shared resources:

- **Integration tests span multiple services** - a pipeline for service A runs integration
  tests that require service B, C, and D to be deployed in a specific state
- **Shared test environments** - multiple pipelines deploy to the same staging environment,
  creating contention and sequencing constraints
- **Coordinated deployments** - deploying service A requires simultaneously deploying
  service B, which requires coordinating two pipelines
- **Shared build infrastructure** - pipelines compete for limited build agent capacity,
  causing queuing delays
- **Pipeline definitions are centralized** - a shared pipeline library controls the
  structure, and application teams cannot customize it for their needs

**Improvement priorities:**

1. Replace cross-service integration tests with contract tests
2. Implement ephemeral environments to eliminate shared environment contention
3. Decouple service deployments using backward-compatible changes and feature flags
4. Give teams ownership of their pipeline definitions
5. Scale build infrastructure to eliminate queuing

### Loosely Coupled (Goal)

In the loosely coupled state, each service has an independent pipeline that can build,
test, and deploy without depending on other services' pipelines:

- **Independent deployability** - any service can be deployed at any time without
  coordinating with other teams
- **Contract-based integration** - services verify their interactions through contract
  tests, not cross-service integration tests
- **Ephemeral, isolated environments** - each pipeline creates its own test environment
  and tears it down when done
- **Team-owned pipelines** - each team controls their pipeline definition and can optimize
  it for their service's needs
- **Fast feedback** - the pipeline completes in minutes, providing rapid feedback to
  developers
- **Self-service infrastructure** - teams provision their own pipeline infrastructure
  without waiting for a central team

## Applying the Theory of Constraints

Pipeline improvement follows the Theory of Constraints: identify the single biggest
bottleneck, resolve it, and repeat. The key steps:

### Step 1: Identify the constraint

Measure where time is spent in the pipeline. Common constraints include:

- **Slow test suites** - tests that take 30+ minutes dominate the pipeline duration
- **Queuing for shared resources** - pipelines waiting for build agents, shared
  environments, or manual approvals
- **Flaky failures and re-runs** - time lost to investigating and re-running non-deterministic
  failures
- **Large batch sizes** - pipelines triggered by large, infrequent commits that take
  longer to build and are harder to debug when they fail

### Step 2: Exploit the constraint

Get the maximum throughput from the current constraint without changing the architecture:

- Parallelize test execution across multiple agents
- Cache dependencies to speed up the build stage
- Prioritize pipeline runs (trunk commits before branch builds)
- Deduplicate unnecessary work (skip unchanged modules)

### Step 3: Subordinate everything else to the constraint

Ensure that other parts of the system do not overwhelm the constraint:

- If the test stage is the bottleneck, do not add more tests without first making
  existing tests faster
- If the build stage is the bottleneck, do not add more build steps without first
  optimizing the build

### Step 4: Elevate the constraint

If exploiting the constraint is not sufficient, invest in removing it:

- Rewrite slow tests to be faster
- Replace shared environments with ephemeral environments
- Replace manual gates with automated checks
- Split monolithic pipelines into independent service pipelines

### Step 5: Repeat

Once a constraint is resolved, a new constraint will emerge. This is expected. The
pipeline improves through continuous iteration, not through a single redesign.

## Key Design Principles

### Fast feedback first

Organize pipeline stages so that the fastest checks run first. A developer should know
within minutes if their change has an obvious problem (compilation failure, linting error,
unit test failure). Slower checks (integration tests, security scans, performance tests)
run after the fast checks pass.

### Fail fast, fail clearly

When the pipeline fails, it should fail as early as possible and produce a clear, actionable
error message. A developer should be able to read the failure output and know exactly what
to fix without digging through logs.

### Parallelize where possible

Stages that do not depend on each other should run in parallel. Security scans can run
alongside integration tests. Linting can run alongside compilation. Parallelization is the
most effective way to reduce pipeline duration without removing checks.

### Pipeline as code

The pipeline definition lives in the same repository as the application it builds and
deploys. This gives the team full ownership and allows the pipeline to evolve alongside
the application.

### Observability

Instrument the pipeline itself with metrics and monitoring. Track:

- **Lead time** - time from commit to production deployment
- **Pipeline duration** - time from pipeline start to completion
- **Failure rate** - percentage of pipeline runs that fail
- **Recovery time** - time from failure detection to successful re-run
- **Queue time** - time spent waiting before the pipeline starts

These metrics identify bottlenecks and measure improvement over time.

## Anti-Patterns

### The "grand redesign"

Attempting to redesign the entire pipeline at once, rather than iteratively improving the
biggest constraint, is a common failure mode. Grand redesigns take too long, introduce too
much risk, and often fail to address the actual problems.

### Central pipeline teams that own all pipelines

A central team that controls all pipeline definitions creates a bottleneck. Application
teams wait for changes, cannot customize pipelines for their context, and are disconnected
from their own delivery process.

### Optimizing non-constraints

Speeding up a pipeline stage that is not the bottleneck does not improve overall delivery
time. Measure before optimizing.

### Monolithic pipeline for microservices

Running all microservices through a single pipeline that builds and deploys everything
together defeats the purpose of a microservice architecture. Each service should have its
own independent pipeline.

## How to Get Started

### Step 1: Assess your current state

Determine which architecture state - entangled, tightly coupled, or loosely coupled -
best describes your current pipeline. Be honest about where you are.

### Step 2: Measure your pipeline

Instrument your pipeline to measure duration, failure rates, queue times, and
bottlenecks. You cannot improve what you do not measure.

### Step 3: Identify the top constraint

Using your measurements, identify the single biggest bottleneck in your pipeline. This is
where you focus first.

### Step 4: Apply the Theory of Constraints cycle

Exploit, subordinate, and if necessary elevate the constraint. Then measure again and
identify the next constraint.

### Step 5: Evolve toward loose coupling

With each improvement cycle, move toward independent, team-owned pipelines that can
build, test, and deploy services independently. This is a journey of months or years,
not days.

## Connection to the Pipeline Phase

Pipeline architecture is where all the other practices in this phase come together. The
[single path to production](../single-path-to-production/) defines the route. The
[deterministic pipeline](../deterministic-pipeline/) ensures reliability. The
[deployable definition](../deployable-definition/) defines the quality gates. The
architecture determines how these elements are organized, sequenced, and optimized for
flow.

As teams mature their pipeline architecture toward loose coupling, they build the
foundation for [Phase 3: Optimize](../../optimize/) - where the focus shifts from building
the pipeline to improving its speed and reliability.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Related Content

- [Slow Pipelines](../../../symptoms/flow/slow-pipelines/) - a symptom directly addressed by applying the Theory of Constraints to pipeline architecture
- [Coordinated Deployments](../../../symptoms/deployment/coordinated-deployments/) - a symptom of tightly coupled pipeline architecture
- [No Fast Feedback](../../../symptoms/flow/no-fast-feedback/) - a symptom that pipeline architecture improvements resolve through stage ordering and parallelization
- [Missing Deployment Pipeline](../../../anti-patterns/pipeline/missing-deployment-pipeline/) - the anti-pattern that pipeline architecture replaces
- [Release Frequency](../../../metrics/release-frequency/) - a key metric that improves as pipeline architecture matures toward loose coupling
- [Phase 3: Optimize](../../optimize/) - the next phase, which builds on mature pipeline architecture
