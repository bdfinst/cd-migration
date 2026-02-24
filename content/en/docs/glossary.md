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
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/),
[Your Migration Journey](../)

### Agent (AI)

An AI system that uses tool calls in a loop to complete multi-step tasks autonomously. Unlike a
single LLM call that returns a response, an agent can invoke tools, observe results, and decide
what to do next until a goal is met or a stopping condition is reached. An agent's behavior is
shaped by its prompt - the complete set of instructions, context, and constraints it receives at
the start of a session. See [Agentic CD](../agentic-cd/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[Learning Paths](../learning-paths/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Artifact

A packaged, versioned output of a build process (e.g., a container image, JAR file, or binary).
In a CD pipeline, artifacts are built once and promoted through environments without
modification. See [Immutable Artifacts](../migrate-to-cd/migration-path/pipeline/immutable-artifacts/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Data Pipelines and ML Models Have No Deployment Automation](../symptoms/flow/ml-pipeline-deployment-gaps/),
[Deployments Are One-Way Doors](../symptoms/deployment/no-rollback-capability/),
[Deterministic Pipeline](../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/),
[Developers Cannot Run the Pipeline Locally](../symptoms/flow/no-local-pipeline-execution/),
[DORA Recommended Practices](../dora-capabilities/),
[Every Change Requires a Ticket and Approval Chain](../symptoms/deployment/change-management-overhead/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Independent Teams, Independent Deployables](../pipeline-reference-architecture/independent-teams/),
[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[No Evidence of What Was Deployed or When](../symptoms/deployment/no-deployment-audit-trail/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[The Build Runs Again for Every Environment](../symptoms/deployment/artifacts-rebuilt-per-environment/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[The Team Ignores Alerts Because There Are Too Many](../symptoms/visibility/alert-fatigue/),
[The Team Is Afraid to Deploy](../symptoms/deployment/fear-of-deploying/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

## B

### Black Box Testing

A testing approach where the test exercises code through its public interface and asserts
only on observable outputs - return values, state changes visible to consumers, or side
effects such as messages sent. The test has no knowledge of internal implementation details.
Black box tests are resilient to refactoring because they verify **what** the code does, not
**how** it does it. Contrast with [white box testing](#white-box-testing).

Referenced in:
[Testing](../testing/),
[Unit Tests](../testing/unit/)

### Baseline Metrics

The set of delivery measurements taken before beginning a migration, used as the benchmark
against which improvement is tracked. See [Phase 0 - Baseline Metrics](../migrate-to-cd/migration-path/assess/baseline-metrics/).

Referenced in:
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/)

### Batch Size

The amount of change included in a single deployment. Smaller batches reduce risk, simplify
debugging, and shorten feedback loops. Reducing batch size is a core focus of
[Phase 3 - Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/).

Referenced in:
[DORA Recommended Practices](../dora-capabilities/),
[Hardening Sprints Are Needed Before Every Release](../symptoms/deployment/hardening-sprints/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[New Releases Introduce Regressions in Previously Working Functionality](../symptoms/deployment/regressions-on-release/),
[Phase 2: Pipeline](../migrate-to-cd/migration-path/pipeline/),
[Releases Are Infrequent and Painful](../symptoms/deployment/infrequent-releases/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/)

### BDD (Behavior-Driven Development)

A collaboration practice where developers, testers, and product representatives define expected
behavior using structured examples before code is written. BDD produces executable
specifications that serve as both documentation and automated tests. BDD supports effective
[work decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/) by forcing clarity about what a
story actually means before development begins.

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[Knowledge & Communication Defects](../defect-sources/knowledge-and-communication/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

### Blue-Green Deployment

A deployment strategy that maintains two identical production environments. New code is deployed
to the inactive environment, verified, and then traffic is switched. See
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/).

Referenced in:
[Every Deployment Is Immediately Visible to All Users](../symptoms/deployment/deploy-release-coupled/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/)

### Branch Lifetime

The elapsed time between creating a branch and merging it to trunk. CD requires branch lifetimes
measured in hours, not days or weeks. Long branch lifetimes are a symptom of poor work
decomposition or slow code review. See [Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/).

Referenced in:
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Feedback Takes Hours Instead of Minutes](../symptoms/flow/no-fast-feedback/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Merging Is Painful and Time-Consuming](../symptoms/flow/painful-merges/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/)

## C

### Canary Deployment

A deployment strategy where a new version is rolled out to a small subset of users or servers
before full rollout. If the canary shows no issues, the deployment proceeds to 100%. See
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/).

Referenced in:
[Change & Complexity Defects](../defect-sources/change-and-complexity/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/)

### CD (Continuous Delivery)

The practice of ensuring that every change to the codebase is always in a deployable state and
can be released to production at any time through a fully automated pipeline. Continuous
delivery does not require that every change is deployed automatically, but it requires that
every change *could be* deployed automatically. This is the primary goal of this migration
guide.

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Data Pipelines and ML Models Have No Deployment Automation](../symptoms/flow/ml-pipeline-deployment-gaps/),
[Deterministic Pipeline](../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Independent Teams, Independent Deployables](../pipeline-reference-architecture/independent-teams/),
[Inverted Test Pyramid](../anti-patterns/testing/inverted-test-pyramid/),
[Knowledge Silos](../anti-patterns/team-workflow/knowledge-silos/),
[Leadership Sees CD as a Technical Nice-to-Have](../symptoms/visibility/no-leadership-buy-in/),
[Learning Paths](../learning-paths/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Manual Testing Only](../anti-patterns/testing/manual-testing-only/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/),
[Phase 1: Foundations](../migrate-to-cd/migration-path/foundations/),
[Phase 2: Pipeline](../migrate-to-cd/migration-path/pipeline/),
[Phase 3: Optimize](../migrate-to-cd/migration-path/optimize/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/),
[Test Doubles](../testing/test-doubles/),
[The Deployment Target Does Not Support Modern CI/CD Tooling](../symptoms/flow/mainframe-constraints/),
[Thin-Spread Teams](../anti-patterns/organizational-cultural/thin-spread-teams/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/),
[Unit Tests](../testing/unit/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

### Change Failure Rate (CFR)

The percentage of deployments to production that result in a degraded service and require
remediation (e.g., rollback, hotfix, or patch). One of the four DORA metrics. See
[Metrics - Change Fail Rate](../metrics/change-fail-rate/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/)

### CI (Continuous Integration)

The practice of integrating code changes to a shared trunk at least once per day, where each
integration is verified by an automated build and test suite. CI is a prerequisite for CD, not
a synonym. A team that runs automated builds on feature branches but merges weekly is not doing
CI. See [Build Automation](../migrate-to-cd/migration-path/foundations/build-automation/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change & Complexity Defects](../defect-sources/change-and-complexity/),
[Data & State Defects](../defect-sources/data-and-state/),
[Data Pipelines and ML Models Have No Deployment Automation](../symptoms/flow/ml-pipeline-deployment-gaps/),
[Dependency & Infrastructure Defects](../defect-sources/dependency-and-infrastructure/),
[Deterministic Pipeline](../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/),
[Developers Cannot Run the Pipeline Locally](../symptoms/flow/no-local-pipeline-execution/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feedback Takes Hours Instead of Minutes](../symptoms/flow/no-fast-feedback/),
[Functional Tests](../testing/functional/),
[Integration & Boundaries Defects](../defect-sources/integration-and-boundaries/),
[Inverted Test Pyramid](../anti-patterns/testing/inverted-test-pyramid/),
[It Works on My Machine](../symptoms/visibility/works-on-my-machine/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Manual Testing Only](../anti-patterns/testing/manual-testing-only/),
[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/),
[Merging Is Painful and Time-Consuming](../symptoms/flow/painful-merges/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[No Evidence of What Was Deployed or When](../symptoms/deployment/no-deployment-audit-trail/),
[Performance & Resilience Defects](../defect-sources/performance-and-resilience/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Security & Compliance Defects](../defect-sources/security-and-compliance/),
[Security Review Is a Gate, Not a Guardrail](../symptoms/deployment/security-review-bottleneck/),
[Services Reach Production with No Health Checks or Alerting](../symptoms/deployment/services-without-health-checks/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[Symptoms for Developers](../symptoms/for-developers/),
[Test Suite Is Too Slow to Run](../symptoms/testing/slow-test-suites/),
[Testing & Observability Gap Defects](../defect-sources/testing-and-observability-gaps/),
[Tests Pass in One Environment but Fail in Another](../symptoms/testing/environment-dependent-failures/),
[Tests Randomly Pass or Fail](../symptoms/testing/flaky-tests/),
[The Development Workflow Has Friction at Every Step](../symptoms/flow/inadequate-tooling/),
[Unit Tests](../testing/unit/)

### Constraint

In the Theory of Constraints, the single factor most limiting the throughput of a system.
During a CD migration, your job is to find and fix constraints in order of impact. See
[Identify Constraints](../migrate-to-cd/migration-path/assess/identify-constraints/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[Build Automation](../migrate-to-cd/migration-path/foundations/build-automation/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Knowledge Silos](../anti-patterns/team-workflow/knowledge-silos/),
[Learning Paths](../learning-paths/),
[Multiple Services Must Be Deployed Together](../symptoms/deployment/coordinated-deployments/),
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Releases Are Infrequent and Painful](../symptoms/deployment/infrequent-releases/),
[Releases Depend on One Person](../symptoms/deployment/release-manager-bottleneck/),
[Security Review Is a Gate, Not a Guardrail](../symptoms/deployment/security-review-bottleneck/),
[Sprint Planning Is Dominated by Dependency Negotiation](../symptoms/flow/dependency-heavy-planning/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[Untestable Architecture](../anti-patterns/architecture/untestable-architecture/)

### Context (LLM)

The complete assembled input provided to an LLM for a single inference call. Context includes
the system prompt, tool definitions, any reference material or documents, conversation history,
and the current user request. "Context" and "prompt" are often used interchangeably; the
distinction is that "context" emphasizes what information is present, while "prompt" emphasizes
the structured input as a whole. Context is measured in [tokens](#token). As context grows, costs
and latency increase and performance can degrade when relevant information is buried far from
the end of the context. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Context Window

The maximum number of tokens an LLM can process in a single call, spanning both input and
output. The context window is a hard limit; exceeding it requires truncation or a redesigned
approach. Large context windows (150,000+ tokens) create false confidence - more available
space does not mean better performance, and filling the window increases both latency and cost.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Continuous Deployment

An extension of continuous delivery where every change that passes the automated pipeline is
deployed to production without manual intervention. Continuous delivery ensures every change
*can* be deployed; continuous deployment ensures every change *is* deployed. See
[Phase 4 - Deliver on Demand](../migrate-to-cd/migration-path/continuous-deployment/).

Referenced in:
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/)

## D

### Deployable

A change that has passed all automated quality gates defined by the team and is ready for
production deployment. The definition of deployable is codified in the pipeline, not decided
by a person at deployment time. See [Deployable Definition](../migrate-to-cd/migration-path/pipeline/deployable-definition/).

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[DORA Recommended Practices](../dora-capabilities/),
[Deployable Definition](../migrate-to-cd/migration-path/pipeline/deployable-definition/),
[Everything Started, Nothing Finished](../symptoms/flow/too-much-wip/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Functional Tests](../testing/functional/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Independent Teams, Independent Deployables](../pipeline-reference-architecture/independent-teams/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/),
[Monolithic Work Items](../anti-patterns/team-workflow/monolithic-work-items/),
[Multiple Services Must Be Deployed Together](../symptoms/deployment/coordinated-deployments/),
[Multiple Teams, Single Deployable](../pipeline-reference-architecture/multi-team/),
[Releases Are Infrequent and Painful](../symptoms/deployment/infrequent-releases/),
[Team Alignment to Code](../migrate-to-cd/migration-path/optimize/team-alignment/),
[Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/),
[Work Items Take Days or Weeks to Complete](../symptoms/flow/work-items-take-too-long/),
[Working Agreements](../migrate-to-cd/migration-path/foundations/working-agreements/)

### Deployment Frequency

How often an organization successfully deploys to production. One of the four DORA metrics.
See [Metrics - Release Frequency](../metrics/release-frequency/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Leadership Sees CD as a Technical Nice-to-Have](../symptoms/visibility/no-leadership-buy-in/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[The Team Is Caught Between Shipping Fast and Not Breaking Things](../symptoms/flow/speed-vs-stability-tension/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/)

### Development Cycle Time

The elapsed time from the first commit on a change to that change being deployable. This
measures the efficiency of your development and pipeline process, excluding upstream wait times.
See [Metrics - Development Cycle Time](../metrics/development-cycle-time/).

### DORA Metrics

The four key metrics identified by the DORA (DevOps Research and Assessment) research program
as predictive of software delivery performance: deployment frequency, lead time for changes,
change failure rate, and mean time to restore service. See [DORA Recommended Practices](../dora-capabilities/).

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Product & Discovery Defects](../defect-sources/product-and-discovery/),
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

Referenced in:
[Team Alignment to Code](../migrate-to-cd/migration-path/optimize/team-alignment/)

### Feature Flag

A mechanism that allows code to be deployed to production with new functionality disabled,
then selectively enabled for specific users, percentages of traffic, or environments. Feature
flags decouple deployment from release. See [Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change & Complexity Defects](../defect-sources/change-and-complexity/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Database Migrations Block or Break Deployments](../symptoms/deployment/database-migrations-block-deploys/),
[Deploying Stateful Services Causes Outages](../symptoms/deployment/stateful-service-deployment-outages/),
[Every Change Requires a Ticket and Approval Chain](../symptoms/deployment/change-management-overhead/),
[Every Deployment Is Immediately Visible to All Users](../symptoms/deployment/deploy-release-coupled/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Phase 3: Optimize](../migrate-to-cd/migration-path/optimize/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Product & Discovery Defects](../defect-sources/product-and-discovery/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Teams Cannot Change Their Own Pipeline Without Another Team](../symptoms/deployment/pipeline-changes-require-another-team/),
[The Team Resists Merging to the Main Branch](../symptoms/flow/resistance-to-trunk-based-development/),
[Vendor Release Cycles Constrain the Team's Deployment Frequency](../symptoms/flow/third-party-dependency-constraints/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/),
[Work Requires Sign-Off from Teams Not Involved in Delivery](../symptoms/deployment/waiting-for-cross-team-approval/)

### Flow Efficiency

The ratio of active work time to total elapsed time in a delivery process. A flow efficiency of
15% means that for every hour of actual work, roughly 5.7 hours are spent waiting. Value stream
mapping reveals your flow efficiency. See [Value Stream Mapping](../migrate-to-cd/migration-path/assess/value-stream-mapping/).

Referenced in:
[Value Stream Mapping](../migrate-to-cd/migration-path/assess/value-stream-mapping/)

### Full-Stack Product Team

A team that owns every layer of a user-facing capability - UI, API, and data store - and whose
public interface is designed for human users. A vertical slice for a full-stack product team
delivers one observable behavior from the user interface through to the database. The slice is
done when a user can observe the behavior through that interface. Contrast with
[subdomain product team](#subdomain-product-team).

Referenced in:
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/#vertical-slicing-in-distributed-systems),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems)

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
[Single Path to Production](../migrate-to-cd/migration-path/pipeline/single-path-to-production/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Trunk-Based Development](../practices/trunk-based-development/)

## H

### Hard Dependency

A dependency that must be resolved before work can proceed. In delivery, hard dependencies
include things like waiting for another team's API, a shared database migration, or an
infrastructure provisioning request. Hard dependencies create queues and increase lead time.
Eliminating hard dependencies is a focus of
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/).

Referenced in:
[Team Alignment to Code](../migrate-to-cd/migration-path/optimize/team-alignment/)

### Hardening Sprint

A sprint dedicated to stabilizing and fixing defects before a release. The existence of
hardening sprints is a strong signal that quality is not being built in during regular
development. Teams practicing CD do not need hardening sprints because every commit is
deployable. See [Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/).

Referenced in:
[Hardening Sprints Are Needed Before Every Release](../symptoms/deployment/hardening-sprints/)

## I

### Immutable Artifact

A build artifact that is never modified after creation. The same artifact that is tested in the
pipeline is the exact artifact that is deployed to production. Configuration differences between
environments are handled externally. See [Immutable Artifacts](../migrate-to-cd/migration-path/pipeline/immutable-artifacts/).

Referenced in:
[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/)

### Integration Frequency

How often a developer integrates code to the shared trunk. CD requires at least daily
integration. See [Metrics - Integration Frequency](../metrics/integration-frequency/).

Referenced in:
[The Team Has No Shared Agreements About How to Work](../symptoms/flow/no-shared-workflow-expectations/)

## L

### Lead Time for Changes

The elapsed time from when a commit is made to when it is successfully running in production.
One of the four DORA metrics. See [Metrics - Lead Time](../metrics/lead-time/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Development Cycle Time](../metrics/development-cycle-time/),
[Lead Time](../metrics/lead-time/),
[Leadership Sees CD as a Technical Nice-to-Have](../symptoms/visibility/no-leadership-buy-in/),
[Manual Testing Only](../anti-patterns/testing/manual-testing-only/),
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/),
[Security Review Is a Gate, Not a Guardrail](../symptoms/deployment/security-review-bottleneck/),
[Working Agreements](../migrate-to-cd/migration-path/foundations/working-agreements/)

## M

### Mean Time to Restore (MTTR)

The elapsed time from when a production incident is detected to when service is restored. One
of the four DORA metrics. Teams practicing CD have short MTTR because deployments are small,
rollback is automated, and the cause of failure is easy to identify. See
[Metrics - Mean Time to Repair](../metrics/mean-time-to-repair/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/)

### Modular Monolith

A single deployable application whose codebase is organized into well-defined modules with
explicit boundaries. Each module encapsulates a bounded domain and communicates with other
modules through defined interfaces, not by reaching into shared database tables or calling
internal methods directly. The application deploys as one unit, but its internal structure
allows teams to reason about, test, and change one module independently. See
[Pipeline Reference Architecture](../pipeline-reference-architecture/) and
[Premature Microservices](../anti-patterns/architecture/premature-microservices/).

Referenced in:
[Multiple Teams, Single Deployable](../pipeline-reference-architecture/multi-team/),
[Pipeline Reference Architecture](../pipeline-reference-architecture/),
[Single Team, Single Deployable](../pipeline-reference-architecture/single-team/),
[Team Alignment to Code](../migrate-to-cd/migration-path/optimize/team-alignment/)

## O

### Orchestrator

An agent that coordinates the work of other agents. The orchestrator receives a high-level goal,
breaks it into sub-tasks, delegates those sub-tasks to specialized [sub-agents](#sub-agent), and
assembles the results. Because orchestrators accumulate context across multiple steps, context
hygiene at agent boundaries is especially important - what the orchestrator passes to each
sub-agent is a cost and quality decision. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

## P

### Pipeline

The automated sequence of build, test, and deployment stages that every change passes through
on its way to production. See [Phase 2 - Pipeline](../migrate-to-cd/migration-path/pipeline/).

Referenced in:
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Data Pipelines and ML Models Have No Deployment Automation](../symptoms/flow/ml-pipeline-deployment-gaps/),
[Database Migrations Block or Break Deployments](../symptoms/deployment/database-migrations-block-deploys/),
[Deploying Stateful Services Causes Outages](../symptoms/deployment/stateful-service-deployment-outages/),
[Deployments Are One-Way Doors](../symptoms/deployment/no-rollback-capability/),
[Deterministic Pipeline](../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/),
[Developers Cannot Run the Pipeline Locally](../symptoms/flow/no-local-pipeline-execution/),
[DORA Recommended Practices](../dora-capabilities/),
[Each Language Has Its Own Ad Hoc Pipeline](../symptoms/flow/polyglot-stack-no-pipeline-standards/),
[Every Change Rebuilds the Entire Repository](../symptoms/flow/monorepo-without-tooling/),
[Every Change Requires a Ticket and Approval Chain](../symptoms/deployment/change-management-overhead/),
[Every Deployment Is Immediately Visible to All Users](../symptoms/deployment/deploy-release-coupled/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feedback Takes Hours Instead of Minutes](../symptoms/flow/no-fast-feedback/),
[Functional Tests](../testing/functional/),
[Getting a Test Environment Requires Filing a Ticket](../symptoms/flow/lack-of-self-service-environments/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[High Coverage but Tests Miss Defects](../symptoms/testing/high-coverage-ineffective-tests/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Independent Teams, Independent Deployables](../pipeline-reference-architecture/independent-teams/),
[Inverted Test Pyramid](../anti-patterns/testing/inverted-test-pyramid/),
[Leadership Sees CD as a Technical Nice-to-Have](../symptoms/visibility/no-leadership-buy-in/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Manual Testing Only](../anti-patterns/testing/manual-testing-only/),
[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[No Evidence of What Was Deployed or When](../symptoms/deployment/no-deployment-audit-trail/),
[Phase 1: Foundations](../migrate-to-cd/migration-path/foundations/),
[Phase 2: Pipeline](../migrate-to-cd/migration-path/pipeline/),
[Phase 3: Optimize](../migrate-to-cd/migration-path/optimize/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pipeline Reference Architecture](../pipeline-reference-architecture/),
[Pipelines Take Too Long](../symptoms/flow/slow-pipelines/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Product & Discovery Defects](../defect-sources/product-and-discovery/),
[Production Issues Discovered by Customers](../symptoms/visibility/production-issues-found-by-customers/),
[Production Problems Are Discovered Hours or Days Late](../symptoms/visibility/slow-detection/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Recommended Patterns for Agentic Workflow Architecture](../agentic-cd/workflow-architecture/),
[Releases Are Infrequent and Painful](../symptoms/deployment/infrequent-releases/),
[Releases Depend on One Person](../symptoms/deployment/release-manager-bottleneck/),
[Security Review Is a Gate, Not a Guardrail](../symptoms/deployment/security-review-bottleneck/),
[Services in the Same Portfolio Have Wildly Different Maturity Levels](../symptoms/flow/uneven-service-maturity/),
[Services Reach Production with No Health Checks or Alerting](../symptoms/deployment/services-without-health-checks/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[Staging Passes but Production Fails](../symptoms/deployment/staging-passes-production-fails/),
[Symptoms for Developers](../symptoms/for-developers/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Team Alignment to Code](../migrate-to-cd/migration-path/optimize/team-alignment/),
[Teams Cannot Change Their Own Pipeline Without Another Team](../symptoms/deployment/pipeline-changes-require-another-team/),
[Test Doubles](../testing/test-doubles/),
[Test Suite Is Too Slow to Run](../symptoms/testing/slow-test-suites/),
[Tests Pass in One Environment but Fail in Another](../symptoms/testing/environment-dependent-failures/),
[Tests Randomly Pass or Fail](../symptoms/testing/flaky-tests/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[The Build Runs Again for Every Environment](../symptoms/deployment/artifacts-rebuilt-per-environment/),
[The Deployment Target Does Not Support Modern CI/CD Tooling](../symptoms/flow/mainframe-constraints/),
[The Development Workflow Has Friction at Every Step](../symptoms/flow/inadequate-tooling/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[The Team Ignores Alerts Because There Are Too Many](../symptoms/visibility/alert-fatigue/),
[The Team Is Afraid to Deploy](../symptoms/deployment/fear-of-deploying/),
[The Team Is Caught Between Shipping Fast and Not Breaking Things](../symptoms/flow/speed-vs-stability-tension/),
[The Team Resists Merging to the Main Branch](../symptoms/flow/resistance-to-trunk-based-development/),
[Thin-Spread Teams](../anti-patterns/organizational-cultural/thin-spread-teams/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/),
[Vendor Release Cycles Constrain the Team's Deployment Frequency](../symptoms/flow/third-party-dependency-constraints/),
[Work Requires Sign-Off from Teams Not Involved in Delivery](../symptoms/deployment/waiting-for-cross-team-approval/),
[Your Migration Journey](../)

### Production-Like Environment

A test or staging environment that matches production in configuration, infrastructure, and
data characteristics. Testing in environments that differ from production is a common source
of deployment failures. See [Production-Like Environments](../practices/production-like-environments/).

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[DORA Recommended Practices](../dora-capabilities/),
[Hard-Coded Environment Assumptions](../anti-patterns/pipeline/hardcoded-environment-assumptions/),
[Pipeline Enforcement and Expert Agents](../agentic-cd/pipeline-enforcement/),
[Pipeline Reference Architecture](../pipeline-reference-architecture/),
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/),
[Stakeholders See Working Software Only at Release Time](../symptoms/flow/delayed-stakeholder-feedback/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/)

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
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/),
[The Six First-Class Artifacts](../agentic-cd/first-class-artifacts/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Prompt Caching

A server-side optimization where stable portions of a prompt are stored and reused across
repeated calls instead of being processed as new input each time. Effective caching requires
placing static content (system instructions, tool definitions, reference documents) at the
beginning of the prompt so cache hits cover the maximum token span. Dynamic content (user
request, current state) goes at the end where it does not invalidate the cached prefix.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

## R

### Rollback

The ability to revert a production deployment to a previous known-good state. CD requires
automated rollback that takes minutes, not hours. See [Rollback](../migrate-to-cd/migration-path/pipeline/rollback/).

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Change Fail Rate](../metrics/change-fail-rate/),
[Data Pipelines and ML Models Have No Deployment Automation](../symptoms/flow/ml-pipeline-deployment-gaps/),
[Database Migrations Block or Break Deployments](../symptoms/deployment/database-migrations-block-deploys/),
[Deployable Definition](../migrate-to-cd/migration-path/pipeline/deployable-definition/),
[Deployments Are One-Way Doors](../symptoms/deployment/no-rollback-capability/),
[Every Change Requires a Ticket and Approval Chain](../symptoms/deployment/change-management-overhead/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Mean Time to Repair](../metrics/mean-time-to-repair/),
[Missing Deployment Pipeline](../anti-patterns/pipeline/missing-deployment-pipeline/),
[No Deployment Health Checks](../anti-patterns/pipeline/no-deployment-health-checks/),
[Phase 2: Pipeline](../migrate-to-cd/migration-path/pipeline/),
[Pipeline Reference Architecture](../pipeline-reference-architecture/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Production Problems Are Discovered Hours or Days Late](../symptoms/visibility/slow-detection/),
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/),
[Release Frequency](../metrics/release-frequency/),
[Releases Depend on One Person](../symptoms/deployment/release-manager-bottleneck/),
[Single Path to Production](../migrate-to-cd/migration-path/pipeline/single-path-to-production/),
[Symptoms for Developers](../symptoms/for-developers/),
[Systemic Defect Fixes](../defect-sources/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[The Team Is Caught Between Shipping Fast and Not Breaking Things](../symptoms/flow/speed-vs-stability-tension/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)

## S

### Soft Dependency

A dependency that can be worked around or deferred. Unlike hard dependencies, soft dependencies
do not block work but may influence sequencing or design decisions. Feature flags can turn many
hard dependencies into soft dependencies by allowing incomplete integrations to be deployed in
a disabled state.

### Story Points

A relative estimation unit used by some teams to forecast effort. Story points are frequently
misused as a productivity metric, which creates perverse incentives to inflate estimates and
discourages the small work decomposition that CD requires. If your organization uses story
points as a velocity target, see [Metrics-Driven Improvement](../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/).

Referenced in:
[Leadership Sees CD as a Technical Nice-to-Have](../symptoms/visibility/no-leadership-buy-in/),
[Some Developers Are Overloaded While Others Wait for Work](../symptoms/flow/uneven-workloads/),
[Team Burnout and Unsustainable Pace](../symptoms/visibility/team-burnout/),
[Velocity as Individual Metric](../anti-patterns/organizational-cultural/velocity-as-individual-metric/)

### Sub-agent

A specialized agent invoked by an [orchestrator](#orchestrator) to perform a specific,
well-defined task. Sub-agents should receive only the context relevant to their task - not
the orchestrator's full accumulated context. Passing oversized context bundles to sub-agents
is a common source of unnecessary token consumption and can degrade performance by burying
relevant information. See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Subdomain Product Team

A team that owns a bounded subdomain within a larger distributed system - full-stack within
their service (API, business logic, data store) but not directly user-facing. Their public
interface is designed for machines: other services or teams consume it through a defined API
contract. A vertical slice for a subdomain product team delivers one observable behavior
through that contract. The slice is done when the API satisfies the agreed behavior for its
service consumers. Contrast with [full-stack product team](#full-stack-product-team).

Referenced in:
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/#vertical-slicing-in-distributed-systems),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems)

### System Prompt

The static, stable instruction block placed at the start of a [prompt](#prompt) that establishes
the model's role, constraints, output format requirements, and tool definitions. Unlike the
user-provided portion of the prompt, system prompts change rarely between calls and are the
primary candidates for [prompt caching](#prompt-caching). Keeping the system prompt concise and
placing it first maximizes cache effectiveness and reduces per-call input costs.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

## T

### TBD (Trunk-Based Development)

A source-control branching model where all developers integrate to a single shared branch
(trunk) at least once per day. Short-lived feature branches (less than a day) are acceptable.
Long-lived feature branches are not. TBD is a prerequisite for CI, which is in turn a
prerequisite for CD. See [Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/).

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Change & Complexity Defects](../defect-sources/change-and-complexity/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Phase 1: Foundations](../migrate-to-cd/migration-path/foundations/),
[Process & Deployment Defects](../defect-sources/process-and-deployment/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/),
[The Team Resists Merging to the Main Branch](../symptoms/flow/resistance-to-trunk-based-development/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/),
[Work Items Take Days or Weeks to Complete](../symptoms/flow/work-items-take-too-long/)

### TDD (Test-Driven Development)

A development practice where tests are written before the production code that makes them
pass. TDD supports CD by ensuring high test coverage, driving simple design, and producing
a fast, reliable test suite. TDD feeds into the [testing fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)
required in Phase 1.

Referenced in:
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Unit Tests](../testing/unit/)

### Token

The billing and capacity unit for LLMs. A token is roughly three-quarters of an English word.
All LLM costs, latency, and context limits are measured in tokens, not words, sentences, or
API calls. Input and output tokens are priced and counted separately. Output tokens typically
cost 2-5x more than input tokens because generating tokens is computationally more expensive
than reading them. Frontier models cost 10-20x more per token than smaller alternatives.
See [Tokenomics](../agentic-cd/tokenomics/).

Referenced in:
[Agentic Architecture Patterns](../agentic-cd/agentic-architecture/),
[Agentic Continuous Delivery (ACD)](../agentic-cd/),
[Coding and Review Agent Configuration](../agentic-cd/agent-configuration/),
[Getting Started: Where to Put What](../agentic-cd/agent-setup/),
[The Agentic Development Learning Curve](../agentic-cd/learning-curve/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/)

### Toil

Repetitive, manual work related to maintaining a production service that is automatable, has
no lasting value, and scales linearly with service size. Examples include manual deployments,
manual environment provisioning, and manual test execution. Eliminating toil is a primary
benefit of building a CD pipeline.

Referenced in:
[AI Adoption Roadmap](../agentic-cd/adoption-roadmap/),
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[Build Duration](../metrics/build-duration/),
[Change Advisory Board Gates](../anti-patterns/organizational-cultural/cab-gates/),
[Deployable Definition](../migrate-to-cd/migration-path/pipeline/deployable-definition/),
[DORA Recommended Practices](../dora-capabilities/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Lead Time](../metrics/lead-time/),
[Progressive Rollout](../migrate-to-cd/migration-path/continuous-deployment/progressive-rollout/),
[Tightly Coupled Monolith](../anti-patterns/architecture/tightly-coupled-monolith/),
[Your Migration Journey](../)

## U

### Unplanned Work

Work that arrives outside the planned backlog - production incidents, urgent bug fixes,
ad hoc requests. High levels of unplanned work indicate systemic quality or operational
problems. Teams with high change failure rates generate their own unplanned work through
failed deployments. Reducing unplanned work is a natural outcome of improving change failure
rate through CD practices.

Referenced in:
[Team Burnout and Unsustainable Pace](../symptoms/visibility/team-burnout/),
[Thin-Spread Teams](../anti-patterns/organizational-cultural/thin-spread-teams/)

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
[Integration Tests](../testing/integration/),
[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)

### Value Stream Map

A visual representation of every step required to deliver a change from request to production,
showing process time, wait time, and percent complete and accurate at each step. The
foundational tool for [Phase 0 - Assess](../migrate-to-cd/migration-path/assess/value-stream-mapping/).

Referenced in:
[Phase 0: Assess](../migrate-to-cd/migration-path/assess/)

### Vertical Sliced Story

A user story that delivers a thin slice of functionality across all layers of the system
(UI, API, database, etc.) rather than a horizontal slice that implements one layer completely.
Vertical slices are independently deployable and testable, which is essential for CD. Vertical
slicing is a core technique in [Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/).

Referenced in:
[Agent-Assisted Specification](../agentic-cd/agent-assisted-specification/),
[CD Dependency Tree](../cd-dependency-tree/),
[CD for Greenfield Projects](../migrate-to-cd/greenfield/),
[Horizontal Slicing](../anti-patterns/team-workflow/horizontal-slicing/),
[Long-Lived Feature Branches](../anti-patterns/branching-integration/long-lived-feature-branches/),
[Small-Batch Agent Sessions](../agentic-cd/small-batch-sessions/)

## W

### WIP (Work in Progress)

The number of work items that have been started but not yet completed. High WIP increases lead
time, reduces focus, and increases context-switching overhead. Limiting WIP is a key practice
in [Phase 3 - Limiting WIP](../migrate-to-cd/migration-path/optimize/limiting-wip/).

Referenced in:
[Architecture Decoupling](../migrate-to-cd/migration-path/optimize/architecture-decoupling/),
[Development Cycle Time](../metrics/development-cycle-time/),
[DORA Recommended Practices](../dora-capabilities/),
[Everything Started, Nothing Finished](../symptoms/flow/too-much-wip/),
[Experience Reports](../migrate-to-cd/migration-path/continuous-deployment/experience-reports/),
[Feature Flags](../migrate-to-cd/migration-path/optimize/feature-flags/),
[Phase 3: Optimize](../migrate-to-cd/migration-path/optimize/),
[Pitfalls and Metrics](../agentic-cd/pitfalls-and-metrics/),
[Push-Based Work Assignment](../anti-patterns/team-workflow/push-based-work-assignment/),
[Retrospectives Produce No Real Change](../symptoms/flow/meaningless-retrospectives/),
[Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/),
[Symptoms for Managers](../symptoms/for-managers/),
[TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/),
[Team Burnout and Unsustainable Pace](../symptoms/visibility/team-burnout/),
[Team Membership Changes Constantly](../symptoms/flow/team-instability/),
[The Team Has No Shared Agreements About How to Work](../symptoms/flow/no-shared-workflow-expectations/),
[Tokenomics: Optimizing Token Usage in Agent Architecture](../agentic-cd/tokenomics/),
[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/),
[Work in Progress](../metrics/work-in-progress/),
[Working Agreements](../migrate-to-cd/migration-path/foundations/working-agreements/)

### White Box Testing

A testing approach where the test has knowledge of and asserts on internal implementation
details - specific methods called, call order, internal state, or code paths taken. White
box tests verify **how** the code works, not **what** it produces. These tests are fragile
because any refactoring of internals breaks them, even when behavior is unchanged. Avoid
white box testing in unit tests; prefer [black box testing](#black-box-testing) that asserts
on observable outcomes.

Referenced in:
[Testing](../testing/),
[Unit Tests](../testing/unit/)

### Working Agreement

An explicit, documented set of team norms covering how work is defined, reviewed, tested, and
deployed. Working agreements create shared expectations and reduce friction. See
[Working Agreements](../migrate-to-cd/migration-path/foundations/working-agreements/).

Referenced in:
[Pull Requests Sit for Days Waiting for Review](../symptoms/flow/prs-waiting-for-review/),
[The Team Has No Shared Agreements About How to Work](../symptoms/flow/no-shared-workflow-expectations/)

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
