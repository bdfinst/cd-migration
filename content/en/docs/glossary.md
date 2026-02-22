---
title: "Glossary"
linkTitle: "Glossary"
weight: 15
description: >
  Key terms and definitions used throughout this guide.
---

This glossary defines the terms used across every phase of the CD migration guide. Where a term
has a specific meaning within a migration phase, the relevant phase is noted.

## A

### ACD (Agentic Continuous Delivery)

The application of continuous delivery in environments where software changes are proposed by
AI agents. ACD extends CD with additional constraints, first-class artifacts, and pipeline
enforcement to reliably constrain agent autonomy without slowing delivery. ACD assumes the
team already practices continuous delivery. Without that foundation, the agentic extensions
have nothing to extend. See [Agentic Continuous Delivery](../agentic-cd/).

Referenced in:
[ACD](../agentic-cd/),
[Learning Curve](../agentic-cd/learning-curve/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/)

### Agent (AI)

An AI system that uses tool calls in a loop to complete multi-step tasks autonomously. Unlike a
single LLM call that returns a response, an agent can invoke tools, observe results, and decide
what to do next until a goal is met or a stopping condition is reached. An agent's behavior is
shaped by its prompt - the complete set of instructions, context, and constraints it receives at
the start of a session. See [Agentic CD](../agentic-cd/).

Referenced in:
[ACD](../agentic-cd/),
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Learning Curve](../agentic-cd/learning-curve/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/)

### Artifact

A packaged, versioned output of a build process (e.g., a container image, JAR file, or binary).
In a CD pipeline, artifacts are built once and promoted through environments without
modification. See [Immutable Artifacts](../migrate-to-cd/migration-path/pipeline/immutable-artifacts/).

Referenced in:
[ACD](../agentic-cd/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Learning Curve](../agentic-cd/learning-curve/)

## B

### Black Box Testing

A testing approach where the test exercises code through its public interface and asserts
only on observable outputs - return values, state changes visible to consumers, or side
effects such as messages sent. The test has no knowledge of internal implementation details.
Black box tests are resilient to refactoring because they verify **what** the code does, not
**how** it does it. Contrast with [white box testing](#white-box-testing).

Referenced in:
[Testing](../testing/),
[Unit Tests](../testing/unit/),
[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)

### Baseline Metrics

The set of delivery measurements taken before beginning a migration, used as the benchmark
against which improvement is tracked. See [Phase 0 - Baseline Metrics](../migrate-to-cd/migration-path/assess/baseline-metrics/).

Referenced in:
[Assess Phase](../migrate-to-cd/migration-path/assess/),
[Metrics-Driven Improvement](../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/)

### Batch Size

The amount of change included in a single deployment. Smaller batches reduce risk, simplify
debugging, and shorten feedback loops. Reducing batch size is a core focus of
[Phase 3 - Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/).

Referenced in:
[New Releases Introduce Regressions in Previously Working Functionality](../symptoms/deployment/regressions-on-release/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/)

### BDD (Behavior-Driven Development)

A collaboration practice where developers, testers, and product representatives define expected
behavior using structured examples before code is written. BDD produces executable
specifications that serve as both documentation and automated tests. BDD supports effective
[work decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/) by forcing clarity about what a
story actually means before development begins.

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Systemic Defect Fixes](../defect-sources/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

### Blue-Green Deployment

A deployment strategy that maintains two identical production environments. New code is deployed
to the inactive environment, verified, and then traffic is switched. See
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/).

Referenced in:
[Rollback (Practice)](../practices/rollback/),
[Single Path to Production](../migrate-to-cd/migration-path/pipeline/single-path-to-production/),
[Systemic Defect Fixes](../defect-sources/)

### Branch Lifetime

The elapsed time between creating a branch and merging it to trunk. CD requires branch lifetimes
measured in hours, not days or weeks. Long branch lifetimes are a symptom of poor work
decomposition or slow code review. See [Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/).

Referenced in:
[Integration Deferred](../anti-patterns/branching-integration/integration-deferred/),
[TBD Migration](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/)

## C

### Canary Deployment

A deployment strategy where a new version is rolled out to a small subset of users or servers
before full rollout. If the canary shows no issues, the deployment proceeds to 100%. See
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/).

Referenced in:
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/),
[Systemic Defect Fixes](../defect-sources/)

### CD (Continuous Delivery)

The practice of ensuring that every change to the codebase is always in a deployable state and
can be released to production at any time through a fully automated pipeline. Continuous
delivery does not require that every change is deployed automatically, but it requires that
every change *could be* deployed automatically. This is the primary goal of this migration
guide.

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Systemic Defect Fixes](../defect-sources/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

### Change Failure Rate (CFR)

The percentage of deployments to production that result in a degraded service and require
remediation (e.g., rollback, hotfix, or patch). One of the four DORA metrics. See
[Metrics - Change Fail Rate](../metrics/change-fail-rate/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/)

### CI (Continuous Integration)

The practice of integrating code changes to a shared trunk at least once per day, where each
integration is verified by an automated build and test suite. CI is a prerequisite for CD, not
a synonym. A team that runs automated builds on feature branches but merges weekly is not doing
CI. See [Build Automation](../migrate-to-cd/migration-path/foundations/build-automation/).

Referenced in:
[Systemic Defect Fixes](../defect-sources/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/)

### Constraint

In the Theory of Constraints, the single factor most limiting the throughput of a system.
During a CD migration, your job is to find and fix constraints in order of impact. See
[Identify Constraints](../migrate-to-cd/migration-path/assess/identify-constraints/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Knowledge Silos](../anti-patterns/team-workflow/knowledge-silos/),
[Learning Curve](../agentic-cd/learning-curve/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/)

### Context (LLM)

The complete assembled input provided to an LLM for a single inference call. Context includes
the system prompt, tool definitions, any reference material or documents, conversation history,
and the current user request. "Context" and "prompt" are often used interchangeably; the
distinction is that "context" emphasizes what information is present, while "prompt" emphasizes
the structured input as a whole. Context is measured in [tokens](#token). As context grows, costs
and latency increase and performance can degrade when relevant information is buried far from
the end of the context. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Learning Curve](../agentic-cd/learning-curve/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/)

### Context Window

The maximum number of tokens an LLM can process in a single call, spanning both input and
output. The context window is a hard limit; exceeding it requires truncation or a redesigned
approach. Large context windows (150,000+ tokens) create false confidence - more available
space does not mean better performance, and filling the window increases both latency and cost.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Tokenomics](../agentic-cd/tokenomics/)

### Continuous Deployment

An extension of continuous delivery where every change that passes the automated pipeline is
deployed to production without manual intervention. Continuous delivery ensures every change
*can* be deployed; continuous deployment ensures every change *is* deployed. See
[Phase 4 - Deliver on Demand](../migrate-to-cd/migration-path/continuous-deployment/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/),
[Deploy on Demand](../migrate-to-cd/migration-path/continuous-deployment/deploy-on-demand/)

## D

### Deployable

A change that has passed all automated quality gates defined by the team and is ready for
production deployment. The definition of deployable is codified in the pipeline, not decided
by a person at deployment time. See [Deployable Definition](../migrate-to-cd/migration-path/pipeline/deployable-definition/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Work Items Take Days or Weeks to Complete](../symptoms/flow/work-items-take-too-long/)

### Deployment Frequency

How often an organization successfully deploys to production. One of the four DORA metrics.
See [Metrics - Release Frequency](../metrics/release-frequency/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Systemic Defect Fixes](../defect-sources/)

### Development Cycle Time

The elapsed time from the first commit on a change to that change being deployable. This
measures the efficiency of your development and pipeline process, excluding upstream wait times.
See [Metrics - Development Cycle Time](../metrics/development-cycle-time/).

Referenced in:
[Baseline Metrics](../migrate-to-cd/migration-path/assess/baseline-metrics/)

### DORA Metrics

The four key metrics identified by the DORA (DevOps Research and Assessment) research program
as predictive of software delivery performance: deployment frequency, lead time for changes,
change failure rate, and mean time to restore service. See [DORA Capabilities](../dora-capabilities/).

Referenced in:
[Systemic Defect Fixes](../defect-sources/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

## F

### Feature Team

A team organized around user-facing features or customer journeys rather than owned product
subdomains. A feature team is cross-functional - it contains the skills to deliver a feature
end-to-end - but it does not own a stable domain of code. Multiple feature teams may modify
the same components, with no single team accountable for quality or consistency within them.

In practice: feature teams must re-orient on code they do not continuously maintain each time
a feature requires it; quality agreements cannot be enforced within the team because other
teams also modify the same code; and while feature teams appear to minimize inter-team
dependencies, they produce the opposite - everyone who can change a component is effectively
on the same large, loosely communicating team. Feature teams are structurally equivalent to
long-lived project teams.

Contrast with [full-stack product team](#full-stack-product-team) and
[subdomain product team](#subdomain-product-team), which achieve cross-functional delivery
through stable domain ownership rather than feature-by-feature assembly.

### Feature Flag

A mechanism that allows code to be deployed to production with new functionality disabled,
then selectively enabled for specific users, percentages of traffic, or environments. Feature
flags decouple deployment from release. See [Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/).

Referenced in:
[Systemic Defect Fixes](../defect-sources/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

### Flow Efficiency

The ratio of active work time to total elapsed time in a delivery process. A flow efficiency of
15% means that for every hour of actual work, roughly 5.7 hours are spent waiting. Value stream
mapping reveals your flow efficiency. See [Value Stream Mapping](../migrate-to-cd/migration-path/assess/value-stream-mapping/).

Referenced in:
[Assess Phase](../migrate-to-cd/migration-path/assess/),
[Value Stream Mapping](../migrate-to-cd/migration-path/assess/value-stream-mapping/)

### Full-Stack Product Team

A team that owns every layer of a user-facing capability - UI, API, and data store - and whose
public interface is designed for human users. A vertical slice for a full-stack product team
delivers one observable behavior from the user interface through to the database. The slice is
done when a user can observe the behavior through that interface. Contrast with
[subdomain product team](#subdomain-product-team).

Referenced in:
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/#vertical-slicing-in-distributed-systems),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/)

## G

### GitFlow

A branching model created by Vincent Driessen in 2010 that uses multiple long-lived branches
(`main`, `develop`, `release/*`, `hotfix/*`, `feature/*`) with specific merge rules and
directions. GitFlow was designed for infrequent, scheduled releases and is fundamentally
incompatible with continuous delivery because it defers integration, creates multiple paths
to production, and adds merge complexity. See the
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/)
for a step-by-step path from GitFlow to trunk-based development.

Referenced in:
[TBD Migration](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Single Path to Production](../migrate-to-cd/migration-path/pipeline/single-path-to-production/),
[Trunk-Based Development (Practice)](../practices/trunk-based-development/)

## H

### Hard Dependency

A dependency that must be resolved before work can proceed. In delivery, hard dependencies
include things like waiting for another team's API, a shared database migration, or an
infrastructure provisioning request. Hard dependencies create queues and increase lead time.
Eliminating hard dependencies is a focus of
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/).

Referenced in:
[Release Frequency](../metrics/release-frequency/)

### Hardening Sprint

A sprint dedicated to stabilizing and fixing defects before a release. The existence of
hardening sprints is a strong signal that quality is not being built in during regular
development. Teams practicing CD do not need hardening sprints because every commit is
deployable. See [Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/).

Referenced in:
[Hardening Sprints (Symptom)](../symptoms/deployment/hardening-sprints/),
[Merge Freeze](../symptoms/deployment/merge-freeze/)

## I

### Immutable Artifact

A build artifact that is never modified after creation. The same artifact that is tested in the
pipeline is the exact artifact that is deployed to production. Configuration differences between
environments are handled externally. See [Immutable Artifacts](../migrate-to-cd/migration-path/pipeline/immutable-artifacts/).

Referenced in:
[Immutable Artifacts (Practice)](../practices/immutable-artifacts/),
[Build Automation](../migrate-to-cd/migration-path/foundations/build-automation/),
[Pipeline Phase](../migrate-to-cd/migration-path/pipeline/)

### Integration Frequency

How often a developer integrates code to the shared trunk. CD requires at least daily
integration. See [Metrics - Integration Frequency](../metrics/integration-frequency/).

Referenced in:
[Integration Deferred](../anti-patterns/branching-integration/integration-deferred/),
[Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/)

## L

### Lead Time for Changes

The elapsed time from when a commit is made to when it is successfully running in production.
One of the four DORA metrics. See [Metrics - Lead Time](../metrics/lead-time/).

Referenced in:
[For Managers](../symptoms/for-managers/),
[Systemic Defect Fixes](../defect-sources/)

## M

### Mean Time to Restore (MTTR)

The elapsed time from when a production incident is detected to when service is restored. One
of the four DORA metrics. Teams practicing CD have short MTTR because deployments are small,
rollback is automated, and the cause of failure is easy to identify. See
[Metrics - Mean Time to Repair](../metrics/mean-time-to-repair/).

Referenced in:
[Rollback (Practice)](../practices/rollback/),
[Baseline Metrics](../migrate-to-cd/migration-path/assess/baseline-metrics/)

### Modular Monolith

A single deployable application whose codebase is organized into well-defined modules with
explicit boundaries. Each module encapsulates a bounded domain and communicates with other
modules through defined interfaces, not by reaching into shared database tables or calling
internal methods directly. The application deploys as one unit, but its internal structure
allows teams to reason about, test, and change one module independently. See
[Pipeline Reference Architecture](../pipeline-reference-architecture/) and
[Premature Microservices](../anti-patterns/architecture/premature-microservices/).

Referenced in:
[Pipeline Reference Architecture](../pipeline-reference-architecture/),
[Single-Team Pipeline](../pipeline-reference-architecture/single-team/),
[Multi-Team Pipeline](../pipeline-reference-architecture/multi-team/),
[Premature Microservices](../anti-patterns/architecture/premature-microservices/)

## O

### Orchestrator

An agent that coordinates the work of other agents. The orchestrator receives a high-level goal,
breaks it into sub-tasks, delegates those sub-tasks to specialized [sub-agents](#sub-agent), and
assembles the results. Because orchestrators accumulate context across multiple steps, context
hygiene at agent boundaries is especially important - what the orchestrator passes to each
sub-agent is a cost and quality decision. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Learning Curve](../agentic-cd/learning-curve/),
[Tokenomics](../agentic-cd/tokenomics/)

## P

### Pipeline

The automated sequence of build, test, and deployment stages that every change passes through
on its way to production. See [Phase 2 - Pipeline](../migrate-to-cd/migration-path/pipeline/).

Referenced in:
[ACD](../agentic-cd/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Learning Curve](../agentic-cd/learning-curve/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Systemic Defect Fixes](../defect-sources/),
[Teams Cannot Change Their Own Pipeline Without Another Team](../symptoms/deployment/pipeline-changes-require-another-team/),
[Thin-Spread Teams](../anti-patterns/organizational-cultural/thin-spread-teams/),
[Work Requires Sign-Off from Teams Not Involved in Delivery](../symptoms/deployment/waiting-for-cross-team-approval/)

### Production-Like Environment

A test or staging environment that matches production in configuration, infrastructure, and
data characteristics. Testing in environments that differ from production is a common source
of deployment failures. See [Production-Like Environments](../practices/production-like-environments/).

Referenced in:
[Staging Passes, Production Fails](../symptoms/deployment/staging-passes-production-fails/),
[Environment-Dependent Failures](../symptoms/testing/environment-dependent-failures/)

### Prompt

The complete structured input provided to an LLM for a single inference call. A prompt is not
a one- or two-sentence question. In production agentic systems, a prompt is a composed document
that typically includes: a system instruction block (role definition, constraints, output format
requirements), tool definitions, relevant context (documents, code, conversation history), and
the user's request or task description. The system instruction block and tool definitions alone
can consume thousands of tokens before any user content is included. Understanding what a prompt
actually contains is a prerequisite for effective tokenomics. See
[Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[Tokenomics](../agentic-cd/tokenomics/)

### Prompt Caching

A server-side optimization where stable portions of a prompt are stored and reused across
repeated calls instead of being processed as new input each time. Effective caching requires
placing static content (system instructions, tool definitions, reference documents) at the
beginning of the prompt so cache hits cover the maximum token span. Dynamic content (user
request, current state) goes at the end where it does not invalidate the cached prefix.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Tokenomics](../agentic-cd/tokenomics/)

## R

### Rollback

The ability to revert a production deployment to a previous known-good state. CD requires
automated rollback that takes minutes, not hours. See [Rollback](../migrate-to-cd/migration-path/pipeline/rollback/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Systemic Defect Fixes](../defect-sources/)

## S

### Soft Dependency

A dependency that can be worked around or deferred. Unlike hard dependencies, soft dependencies
do not block work but may influence sequencing or design decisions. Feature flags can turn many
hard dependencies into soft dependencies by allowing incomplete integrations to be deployed in
a disabled state.

Referenced in:
[Release Frequency](../metrics/release-frequency/)

### Story Points

A relative estimation unit used by some teams to forecast effort. Story points are frequently
misused as a productivity metric, which creates perverse incentives to inflate estimates and
discourages the small work decomposition that CD requires. If your organization uses story
points as a velocity target, see [Metrics-Driven Improvement](../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/).

Referenced in:
[Velocity as Individual Metric](../anti-patterns/organizational-cultural/velocity-as-individual-metric/),
[Team Burnout](../symptoms/visibility/team-burnout/)

### Sub-agent

A specialized agent invoked by an [orchestrator](#orchestrator) to perform a specific,
well-defined task. Sub-agents should receive only the context relevant to their task - not
the orchestrator's full accumulated context. Passing oversized context bundles to sub-agents
is a common source of unnecessary token consumption and can degrade performance by burying
relevant information. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[ACD](../agentic-cd/),
[Tokenomics](../agentic-cd/tokenomics/)

### Subdomain Product Team

A team that owns a bounded subdomain within a larger distributed system - full-stack within
their service (API, business logic, data store) but not directly user-facing. Their public
interface is designed for machines: other services or teams consume it through a defined API
contract. A vertical slice for a subdomain product team delivers one observable behavior
through that contract. The slice is done when the API satisfies the agreed behavior for its
service consumers. Contrast with [full-stack product team](#full-stack-product-team).

Referenced in:
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/#vertical-slicing-in-distributed-systems),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/)

### System Prompt

The static, stable instruction block placed at the start of a [prompt](#prompt) that establishes
the model's role, constraints, output format requirements, and tool definitions. Unlike the
user-provided portion of the prompt, system prompts change rarely between calls and are the
primary candidates for [prompt caching](#prompt-caching). Keeping the system prompt concise and
placing it first maximizes cache effectiveness and reduces per-call input costs.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Tokenomics](../agentic-cd/tokenomics/)

## T

### TBD (Trunk-Based Development)

A source-control branching model where all developers integrate to a single shared branch
(trunk) at least once per day. Short-lived feature branches (less than a day) are acceptable.
Long-lived feature branches are not. TBD is a prerequisite for CI, which is in turn a
prerequisite for CD. See [Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/).

Referenced in:
[Systemic Defect Fixes](../defect-sources/),
[TBD Migration](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/),
[Trunk-Based Development (Practice)](../practices/trunk-based-development/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/),
[Work Items Take Days or Weeks to Complete](../symptoms/flow/work-items-take-too-long/)

### TDD (Test-Driven Development)

A development practice where tests are written before the production code that makes them
pass. TDD supports CD by ensuring high test coverage, driving simple design, and producing
a fast, reliable test suite. TDD feeds into the [testing fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)
required in Phase 1.

Referenced in:
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)

### Token

The billing and capacity unit for LLMs. A token is roughly three-quarters of an English word.
All LLM costs, latency, and context limits are measured in tokens, not words, sentences, or
API calls. Input and output tokens are priced and counted separately. Output tokens typically
cost 2-5x more than input tokens because generating tokens is computationally more expensive
than reading them. Frontier models cost 10-20x more per token than smaller alternatives.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Learning Curve](../agentic-cd/learning-curve/)

### Toil

Repetitive, manual work related to maintaining a production service that is automatable, has
no lasting value, and scales linearly with service size. Examples include manual deployments,
manual environment provisioning, and manual test execution. Eliminating toil is a primary
benefit of building a CD pipeline.

Referenced in:
[DORA Capabilities](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/)

## U

### Unplanned Work

Work that arrives outside the planned backlog - production incidents, urgent bug fixes,
ad hoc requests. High levels of unplanned work indicate systemic quality or operational
problems. Teams with high change failure rates generate their own unplanned work through
failed deployments. Reducing unplanned work is a natural outcome of improving change failure
rate through CD practices.

Referenced in:
[Team Burnout](../symptoms/visibility/team-burnout/),
[Thin-Spread Teams](../anti-patterns/organizational-cultural/thin-spread-teams/),
[Work in Progress (Metric)](../metrics/work-in-progress/)

## V

### Virtual Service

A test double that simulates a real external service over the network, responding to HTTP
requests with pre-configured or recorded responses. Unlike in-process stubs or mocks, a
virtual service runs as a standalone process and is accessed via real network calls, making
it suitable for functional testing and integration testing where your application needs to
make actual HTTP requests against a dependency. Tools such as WireMock, Mountebank, and
Hoverfly can create virtual services from recorded traffic or API specifications. See
[Test Doubles](../testing/test-doubles/).

Referenced in:
[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/),
[Integration Tests](../testing/integration/)

### Value Stream Map

A visual representation of every step required to deliver a change from request to production,
showing process time, wait time, and percent complete and accurate at each step. The
foundational tool for [Phase 0 - Assess](../migrate-to-cd/migration-path/assess/value-stream-mapping/).

Referenced in:
[FAQ](../faq/),
[Brownfield Migration](../migrate-to-cd/brownfield/)

### Vertical Sliced Story

A user story that delivers a thin slice of functionality across all layers of the system
(UI, API, database, etc.) rather than a horizontal slice that implements one layer completely.
Vertical slices are independently deployable and testable, which is essential for CD. Vertical
slicing is a core technique in [Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[CD Dependency Tree](../cd-dependency-tree/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/)

## W

### WIP (Work in Progress)

The number of work items that have been started but not yet completed. High WIP increases lead
time, reduces focus, and increases context-switching overhead. Limiting WIP is a key practice
in [Phase 3 - Limiting WIP](../migrate-to-cd/migration-path/optimize/limiting-wip/).

Referenced in:
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Team Burnout and Unsustainable Pace](../symptoms/visibility/team-burnout/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/)

### White Box Testing

A testing approach where the test has knowledge of and asserts on internal implementation
details - specific methods called, call order, internal state, or code paths taken. White
box tests verify **how** the code works, not **what** it produces. These tests are fragile
because any refactoring of internals breaks them, even when behavior is unchanged. Avoid
white box testing in unit tests; prefer [black box testing](#black-box-testing) that asserts
on observable outcomes.

Referenced in:
[Testing](../testing/),
[Unit Tests](../testing/unit/),
[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)

### Working Agreement

An explicit, documented set of team norms covering how work is defined, reviewed, tested, and
deployed. Working agreements create shared expectations and reduce friction. See
[Working Agreements](../migrate-to-cd/migration-path/foundations/working-agreements/).

Referenced in:
[Continuous Integration (Practice)](../practices/continuous-integration/),
[Integration Deferred](../anti-patterns/branching-integration/integration-deferred/)

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
