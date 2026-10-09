---
title: "Glossary"
linkTitle: "Glossary"
weight: 15
description: >
  Key terms and definitions used throughout this guide.
---

This glossary defines the terms used across every phase of the CD migration guide. Where a term
has a specific meaning within a migration phase, the entry names the relevant phase.

For terms related to agentic continuous delivery, AI agents, and LLMs, see the
[Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary" >}}).

## A

### Acceptance criteria

Concrete expectations for a change, expressed as observable outcomes. Teams use them as fitness
functions, executed as deterministic tests or evaluated by review [agents](#agent-ai). In
[ACD](#acd-agentic-continuous-delivery), acceptance criteria include a done definition (what
"done" looks like from an observer's perspective) and an evaluation design (test cases with
known-good outputs). Acceptance criteria constrain the agent: comprehensive criteria prevent incorrect code
from passing, while shallow criteria allow code that passes tests but violates intent. See
[Acceptance Criteria]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}),
[AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}),
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[Find Your Symptom]({{< relref "/docs/triage" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

### ACD (Agentic Continuous Delivery)

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#acd-agentic-continuous-delivery" >}}).

### Agent (AI)

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#agent-ai" >}}).

### Agent loop

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#agent-loop" >}}).

### Agent session

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#agent-session" >}}).

### Agent team

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#agent-team" >}}).

### Artifact

A packaged, versioned output of a build process (for example, a container image, JAR file, or binary).
In a CD pipeline, artifacts are built once and promoted through environments without
modification. See [Immutable Artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[Build Automation]({{< relref "/docs/foundations/build-automation" >}}),
[Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Deterministic Pipeline]({{< relref "/docs/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[End-to-End Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/e2e" >}}),
[Environments Run Different Code]({{< relref "/docs/symptoms/deployment/environments-run-different-code" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Component Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[No Contract Testing Between Services]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}),
[No Evidence of What Was Deployed or When]({{< relref "/docs/symptoms/deployment/no-deployment-audit-trail" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Rollback]({{< relref "/docs/pipeline/rollback" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Build Runs Again for Every Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[The Team Ignores Alerts Because There Are Too Many]({{< relref "/docs/symptoms/visibility/alert-fatigue" >}}),
[The Team Is Afraid to Deploy]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

## B

### Black box testing

See [Testing Glossary]({{< relref "/docs/foundations/testing-fundamentals/glossary#black-box-testing" >}}).

### Baseline metrics

The set of delivery measurements taken before beginning a migration, used as the benchmark
against which improvement is tracked. See [Phase 0 - Baseline Metrics]({{< relref "/docs/assess/baseline-metrics" >}}).

Referenced in:
[Phase 0: Assess]({{< relref "/docs/assess" >}})

### Batch size

The amount of change included in a single deployment. Smaller batches reduce risk, simplify
debugging, and shorten feedback loops. Reducing batch size is a core focus of
[Phase 3 - Small Batches]({{< relref "/docs/optimize/small-batches" >}}).

Referenced in:
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[New Releases Introduce Regressions in Previously Working Functionality]({{< relref "/docs/symptoms/deployment/regressions-on-release" >}}),
[Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}})

### BDD (behavior-driven development)

A collaboration practice where developers, testers, and product representatives define expected
behavior using structured examples before code is written. BDD produces executable
specifications that serve as both documentation and automated tests. BDD supports effective
[work decomposition]({{< relref "/docs/foundations/work-decomposition" >}}) by forcing clarity about what a
story actually means before development begins.

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Knowledge & Communication Defects]({{< relref "/docs/reference/defect-sources/knowledge-and-communication" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}})

### Blue-green deployment

A deployment strategy that maintains two identical production environments. New code is deployed
to the inactive environment, verified, and then traffic is switched. See
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}).

Referenced in:
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}})

### Branch by abstraction

An [evolutionary coding technique]({{< relref "/docs/foundations/evolutionary-coding" >}})
that introduces an interface over an existing implementation and builds a new implementation
behind it. When the new implementation is ready, you switch the binding. All of the work happens
in small commits on trunk. Branch by abstraction replaces a long-lived branch with an abstraction layer that has two implementations,
one of which is live. See
[Branch by Abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}})

### Branch lifetime

The elapsed time between creating a branch and merging it to trunk. CD requires branch lifetimes
measured in hours, not days or weeks. Long branch lifetimes are a symptom of poor work
decomposition or slow code review. See [Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}})

## C

### Canary deployment

A deployment strategy where a new version is rolled out to a small subset of users or servers
before full rollout. If the canary shows no issues, the deployment proceeds to 100%. See
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}).

Referenced in:
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}})

### CD (continuous delivery)

The practice of keeping every change to the codebase in a deployable state. You can release any
change to production at any time through a fully automated pipeline. Continuous
delivery does not require that every change is deployed automatically, but it requires that
every change *could be* deployed automatically. Continuous delivery is the primary goal of this
migration guide.

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Deterministic Pipeline]({{< relref "/docs/pipeline/deterministic-pipeline" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Learning Paths]({{< relref "/docs/learning-paths" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}}),
[Phase 1: Foundations]({{< relref "/docs/foundations" >}}),
[Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}),
[Phase 3: Optimize]({{< relref "/docs/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[Test Doubles]({{< relref "/docs/foundations/testing-fundamentals/glossary#test-double" >}}),
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}),
[The Deployment Target Does Not Support Modern CI/CD Tooling]({{< relref "/docs/symptoms/flow/developer-experience/mainframe-constraints" >}}),
[Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Unit Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/unit" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}})

### Change failure rate (CFR)

The percentage of deployments to production that result in a degraded service and require
remediation (for example, rollback, hotfix, or patch). One of the four DORA metrics. See
[Metrics - Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}})

### CI (continuous integration)

The practice of integrating code changes to a shared trunk at least once per day. An automated
build and test suite verifies each integration. CI is a prerequisite for CD, not
a synonym. A team that runs automated builds on feature branches but merges weekly is not doing
CI. See [Build Automation]({{< relref "/docs/foundations/build-automation" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Data & State Defects]({{< relref "/docs/reference/defect-sources/data-and-state" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Dependency & Infrastructure Defects]({{< relref "/docs/reference/defect-sources/dependency-and-infrastructure" >}}),
[Deterministic Pipeline]({{< relref "/docs/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Component Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}),
[Integration & Boundaries Defects]({{< relref "/docs/reference/defect-sources/integration-and-boundaries" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[It Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Evidence of What Was Deployed or When]({{< relref "/docs/symptoms/deployment/no-deployment-audit-trail" >}}),
[Performance & Resilience Defects]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Security & Compliance Defects]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Services Reach Production with No Health Checks or Alerting]({{< relref "/docs/symptoms/deployment/services-without-health-checks" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Symptoms for Developers]({{< relref "/docs/triage/for-developers" >}}),
[Test Suite Is Too Slow to Run]({{< relref "/docs/symptoms/testing/slow-test-suites" >}}),
[Testing & Observability Gap Defects]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}),
[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}}),
[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}),
[The Development Workflow Has Friction at Every Step]({{< relref "/docs/symptoms/flow/developer-experience/inadequate-tooling" >}}),
[Unit Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/unit" >}})

### Constraint

In the Theory of Constraints, the single factor most limiting the throughput of a system.
During a CD migration, your job is to find and fix constraints in order of impact. See
[Identify Constraints]({{< relref "/docs/assess/identify-constraints" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}),
[Baseline Metrics]({{< relref "/docs/assess/baseline-metrics" >}}),
[Build Automation]({{< relref "/docs/foundations/build-automation" >}}),
[Current State Checklist]({{< relref "/docs/assess/current-state-checklist" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Identify Constraints]({{< relref "/docs/assess/identify-constraints" >}}),
[Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}),
[Learning Paths]({{< relref "/docs/learning-paths" >}}),
[Migrate to CD]({{< relref "/docs/migrate-to-cd" >}}),
[Migrating Brownfield to CD]({{< relref "/docs/brownfield" >}}),
[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Sprint Planning Is Dominated by Dependency Negotiation]({{< relref "/docs/symptoms/flow/work-management/dependency-heavy-planning" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Untestable Architecture]({{< relref "/docs/anti-patterns/architecture/untestable-architecture" >}}),
[Value Stream Mapping]({{< relref "/docs/assess/value-stream-mapping" >}})

### Context (LLM)

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#context-llm" >}}).

### Context window

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#context-window" >}}).

### Context engineering

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#context-engineering" >}}).

### Continuous deployment

An extension of continuous delivery where every change that passes the automated pipeline is
deployed to production without manual intervention. Continuous delivery ensures every change
*can* be deployed; continuous deployment ensures every change *is* deployed. See
[Phase 4 - Deliver on Demand]({{< relref "/docs/continuous-deployment" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

## D

### Dark code

An [evolutionary coding technique]({{< relref "/docs/foundations/evolutionary-coding" >}})
where you build, test, and deploy new logic to production before anything calls it. No route,
UI trigger, or message consumer references the new logic yet. Dark code carries zero release risk because it is
unreachable until a final commit wires it in. Also called "connect tests last" or a dark launch
of code. See
[Dark Code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}).

Referenced in:
[Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}})

### Deployable

A change that has passed all automated quality gates defined by the team and is ready for
production deployment. The pipeline codifies the definition of deployable, not decided
by a person at deployment time. See [Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}),
[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Component Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Team Alignment to Code]({{< relref "/docs/optimize/team-alignment" >}}),
[Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}),
[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

### Deployment frequency

How often an organization successfully deploys to production. One of the four DORA metrics.
See [Metrics - Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Contract Testing Between Services]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Untestable Architecture]({{< relref "/docs/anti-patterns/architecture/untestable-architecture" >}})

### Development cycle time

The elapsed time from the first commit on a change to that change being deployable. Development
cycle time measures the efficiency of your development and pipeline process, excluding upstream wait times.
See [Metrics - Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}).

### Dependency

Code, service, or resource whose behavior is not defined in the current module. Dependencies
vary by location and ownership:

- **Internal dependency** - code in another file or module within the same repository, or in
  another repository your team controls. Internal dependencies share your release cycle and
  your team can change them directly.
- **[External dependency](#external-dependency)** - a third-party library, external API, or
  managed service outside your team's direct control.

The distinction matters for testing. Internal dependencies are part of your own codebase and
should be exercised through real code paths in tests. Replacing them with
[test doubles]({{< relref "/docs/foundations/testing-fundamentals/glossary#test-double" >}}) couples your tests to
implementation details and causes rippling failures during routine refactoring. Reserve test
doubles for [external dependencies](#external-dependency) and runtime connections where real
invocation is impractical or non-deterministic.

See also: [Hard Dependency](#hard-dependency), [Soft Dependency](#soft-dependency).

Referenced in:
[Defect Feedback Loop]({{< relref "/docs/foundations/testing-fundamentals/defect-feedback-loop" >}}),
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}})

### Declarative agent

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#declarative-agent" >}}).

### Delivery contract

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#delivery-contract" >}}).

### Done definition

The observable outcomes portion of [acceptance criteria](#acceptance-criteria). A done definition
describes what "done" looks like from an independent observer's perspective - someone who was
not involved in the implementation. Combined with an [evaluation design]({{< relref "/docs/agentic-cd/glossary#evaluation-design" >}}),
done definitions form the testable boundary of a [delivery contract]({{< relref "/docs/agentic-cd/glossary#delivery-contract" >}}). See
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}).

Referenced in:
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}})

### DORA metrics

The four key metrics that the DORA (DevOps Research and Assessment) research program
identified as predictive of software delivery performance. The metrics are deployment frequency,
lead time for changes, change failure rate, and mean time to restore service. See [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Phase 3: Optimize]({{< relref "/docs/optimize" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}})

## E

### Expand and contract

An [evolutionary coding technique]({{< relref "/docs/foundations/evolutionary-coding" >}})
for evolving a shared database schema or API contract across non-breaking phases. First, expand
the contract to support both the old and new shape. Next, dual-write and backfill, and switch
reads to the new shape. Finally, contract by removing the old shape (also called parallel change). See
[Expand and Contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}).

Referenced in:
[Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}})

### External dependency

A [dependency](#dependency) on code or services outside your team's direct control. External
dependencies include third-party libraries, public APIs, managed cloud services, and any
resource whose release cycle and availability your team cannot influence.

External dependencies are the primary case where test doubles add value. A test double for an
external API verifies your integration logic without relying on network availability or
third-party rate limits. By contrast, mocking internal code creates fragile tests. Internal
code is another class in the same repository or a module your team owns. Tests that mock it
break whenever the internal implementation changes, even when the behavior is correct.

To decide whether to mock something, ask: "Can my team change this code and release it
in our pipeline?" If yes, the code is an internal dependency. Test it through real code
paths. If no, the code is an external dependency and a test double is appropriate.

See also: [Dependency](#dependency), [Hard Dependency](#hard-dependency).

Referenced in:
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}})

### Evaluation design

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#evaluation-design" >}}).

### Expert agent

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#expert-agent" >}}).

## F

### Feature team

A team organized around user-facing features or customer journeys rather than owned product
subdomains. A feature team is cross-functional and has the skills to deliver a feature
end-to-end. It does not own a stable domain of code. Multiple feature teams may modify
the same components, with no single team accountable for quality or consistency within them.

In practice, feature teams must re-orient on code they do not continuously maintain each time
a feature requires it. The team cannot enforce quality agreements because other teams also
modify the same code. Feature teams appear to minimize inter-team dependencies, but they produce
the opposite. Everyone who can change a component is effectively on the same large, loosely
communicating team. Feature teams are structurally equivalent to long-lived project teams.

Contrast with [full-stack product team](#full-stack-product-team) and
[subdomain product team](#subdomain-product-team), which achieve cross-functional delivery
through stable domain ownership rather than feature-by-feature assembly.

Referenced in:
[Team Alignment to Code]({{< relref "/docs/optimize/team-alignment" >}})

### Feature flag

A mechanism that allows code to be deployed to production with new functionality disabled,
then selectively enabled for specific users, percentages of traffic, or environments. Feature
flags decouple deployment from release. See [Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deploying Stateful Services Causes Outages]({{< relref "/docs/symptoms/deployment/stateful-service-deployment-outages" >}}),
[Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Hard-Coded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Phase 3: Optimize]({{< relref "/docs/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}),
[Rollback]({{< relref "/docs/pipeline/rollback" >}}),
[Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Teams Cannot Change Their Own Pipeline Without Another Team]({{< relref "/docs/symptoms/deployment/pipeline-changes-require-another-team" >}}),
[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}}),
[Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}),
[Vendor Release Cycles Constrain the Team's Deployment Frequency]({{< relref "/docs/symptoms/flow/work-management/third-party-dependency-constraints" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}),
[Work Requires Sign-Off from Teams Not Involved in Delivery]({{< relref "/docs/symptoms/deployment/waiting-for-cross-team-approval" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

### Flow efficiency

The ratio of active work time to total elapsed time in a delivery process. A flow efficiency of
15% means that for every hour of actual work, roughly 5.7 hours are spent waiting. Value stream
mapping reveals your flow efficiency. See [Value Stream Mapping]({{< relref "/docs/assess/value-stream-mapping" >}}).

Referenced in:
[Value Stream Mapping]({{< relref "/docs/assess/value-stream-mapping" >}})

### Full-stack product team

A team that owns every layer of a user-facing capability: UI, API, and data store. Its
public interface is designed for human users. A vertical slice for a full-stack product team
delivers one observable behavior from the user interface through to the database. The slice is
done when a user can observe the behavior through that interface. Contrast with
[subdomain product team](#subdomain-product-team).

Referenced in:
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches#vertical-slicing-in-distributed-systems" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition#vertical-slicing-in-distributed-systems" >}})

## G

### Guardrail

A safety constraint encoded in a [pipeline](#pipeline), [system prompt](#system-prompt), or
[hook](#hook-agent) that limits what an [agent](#agent-ai) can do. Guardrails are deterministic
boundaries, not suggestions.

Examples include pre-commit hooks that block secrets from being committed and pipeline gates
that reject changes exceeding a complexity threshold. System prompt rules that stop an agent
from modifying test specifications are guardrails too. Guardrails protect
against both agent errors and [hallucinations](#hallucination) without requiring human
intervention on every change. See
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### GitFlow

A branching model created by Vincent Driessen in 2010 that uses multiple long-lived branches
(`main`, `develop`, `release/*`, `hotfix/*`, `feature/*`) with specific merge rules and
directions. GitFlow was designed for infrequent, scheduled releases. It is fundamentally
incompatible with continuous delivery because it defers integration, creates multiple paths
to production, and adds merge complexity. See the
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}})
for a step-by-step path from GitFlow to trunk-based development.

Referenced in:
[Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Trunk-Based Development]({{< relref "/docs/reference/practices/trunk-based-development" >}})

## H

### Hard dependency

A dependency that must be resolved before work can proceed. In delivery, hard dependencies
include things like waiting for another team's API, a shared database migration, or an
infrastructure provisioning request. Hard dependencies create queues and increase lead time.
Eliminating hard dependencies is a focus of
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}).

Referenced in:
[Team Alignment to Code]({{< relref "/docs/optimize/team-alignment" >}})

### Hallucination

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#hallucination" >}}).

### Hardening sprint

A sprint dedicated to stabilizing and fixing defects before a release. Hardening sprints are a
strong signal that the team does not build quality in during regular development. Teams practicing CD do not need hardening sprints because every commit is
deployable. See [Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}).

Referenced in:
[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}})

### Hook (agent)

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#hook-agent" >}}).

### Hypothesis-driven development

An approach that frames every change as an experiment with a predicted outcome. The team does
not specify a change as a requirement to implement. Instead, it states a hypothesis: "We believe
[this change] will produce [this outcome] because [this reason]." After deployment, the team
validates whether the predicted outcome occurred. Changes that confirm the hypothesis build
confidence. Changes that refute it produce learning that informs the next hypothesis.

The result is a feedback loop where every deployed change generates a signal, whether it "succeeds"
or not. See [Hypothesis-Driven Development]({{< relref "/docs/optimize/hypothesis-driven-development" >}})
for the full lifecycle and
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#1-intent-description" >}})
for how hypotheses integrate with specification artifacts.

Referenced in:
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}})

## I

### Immutable artifact

A build artifact that is never modified after creation. The artifact the pipeline tests is the
exact artifact you deploy to production. Configuration differences between environments live
outside the artifact. See [Immutable Artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}}).

Referenced in:
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}})

### Intent engineering

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#intent-engineering" >}}).

### Integration frequency

How often a developer integrates code to the shared trunk. CD requires at least daily
integration. See [Metrics - Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}).

Referenced in:
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})

## L

### Lead time for changes

The elapsed time from when a developer makes a commit to when that commit is successfully running in production.
One of the four DORA metrics. See [Metrics - Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

## M

### Mean time to restore (MTTR)

The elapsed time from when a production incident is detected to when service is restored. One
of the four DORA metrics. Teams practicing CD have short MTTR because deployments are small,
rollback is automated, and the cause of failure is easy to identify. See
[Metrics - Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}})

### Model routing

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#model-routing" >}}).

### Modular monolith

A single deployable application whose codebase is organized into well-defined modules with
explicit boundaries. Each module encapsulates a bounded domain. It communicates with other
modules through defined interfaces, not by reaching into shared database tables or calling
internal methods directly. The application deploys as one unit, but its internal structure
allows teams to reason about, test, and change one module independently. See
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) and
[Premature Microservices]({{< relref "/docs/anti-patterns/architecture/premature-microservices" >}}).

Referenced in:
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[Team Alignment to Code]({{< relref "/docs/optimize/team-alignment" >}})

## O

### Orchestrator

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#orchestrator" >}}).

## P

### Parallel run

An [evolutionary coding technique]({{< relref "/docs/foundations/evolutionary-coding" >}})
where a new implementation runs alongside the current one against the same production input.
The caller never receives the new implementation's result. You measure mismatches before you
trust the new implementation. Also called shadowing or a dark launch of logic. See
[Parallel Run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}).

Referenced in:
[Branch by Abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}),
[Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}})

### Pipeline

The automated sequence of build, test, and deployment stages that every change passes through
on its way to production. See [Phase 2 - Pipeline]({{< relref "/docs/pipeline" >}}).

Referenced in:
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deploying Stateful Services Causes Outages]({{< relref "/docs/symptoms/deployment/stateful-service-deployment-outages" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Deterministic Pipeline]({{< relref "/docs/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Each Language Has Its Own Ad Hoc Pipeline]({{< relref "/docs/symptoms/flow/integration/polyglot-stack-no-pipeline-standards" >}}),
[Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}),
[Environments Run Different Code]({{< relref "/docs/symptoms/deployment/environments-run-different-code" >}}),
[Every Change Rebuilds the Entire Repository]({{< relref "/docs/symptoms/flow/integration/monorepo-without-tooling" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Component Tests]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}),
[Getting a Test Environment Requires Filing a Ticket]({{< relref "/docs/symptoms/flow/developer-experience/lack-of-self-service-environments" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[High Coverage but Tests Miss Defects]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Evidence of What Was Deployed or When]({{< relref "/docs/symptoms/deployment/no-deployment-audit-trail" >}}),
[Phase 1: Foundations]({{< relref "/docs/foundations" >}}),
[Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}),
[Phase 3: Optimize]({{< relref "/docs/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Production Issues Discovered by Customers]({{< relref "/docs/symptoms/visibility/production-issues-found-by-customers" >}}),
[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Recommended Patterns for Agentic Workflow Architecture]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Services in the Same Portfolio Have Wildly Different Maturity Levels]({{< relref "/docs/symptoms/flow/work-management/uneven-service-maturity" >}}),
[Services Reach Production with No Health Checks or Alerting]({{< relref "/docs/symptoms/deployment/services-without-health-checks" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}),
[Staging Passes but Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}}),
[Symptoms for Developers]({{< relref "/docs/triage/for-developers" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Team Alignment to Code]({{< relref "/docs/optimize/team-alignment" >}}),
[Teams Cannot Change Their Own Pipeline Without Another Team]({{< relref "/docs/symptoms/deployment/pipeline-changes-require-another-team" >}}),
[Test Doubles]({{< relref "/docs/foundations/testing-fundamentals/glossary#test-double" >}}),
[Test Environments Take Too Long to Reset Between Runs]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}}),
[Test Suite Is Too Slow to Run]({{< relref "/docs/symptoms/testing/slow-test-suites" >}}),
[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}}),
[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Build Runs Again for Every Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}),
[The Deployment Target Does Not Support Modern CI/CD Tooling]({{< relref "/docs/symptoms/flow/developer-experience/mainframe-constraints" >}}),
[The Development Workflow Has Friction at Every Step]({{< relref "/docs/symptoms/flow/developer-experience/inadequate-tooling" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[The Team Ignores Alerts Because There Are Too Many]({{< relref "/docs/symptoms/visibility/alert-fatigue" >}}),
[The Team Is Afraid to Deploy]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}}),
[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}}),
[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}}),
[Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Vendor Release Cycles Constrain the Team's Deployment Frequency]({{< relref "/docs/symptoms/flow/work-management/third-party-dependency-constraints" >}}),
[Work Requires Sign-Off from Teams Not Involved in Delivery]({{< relref "/docs/symptoms/deployment/waiting-for-cross-team-approval" >}}),
[Your Migration Journey]({{< relref "/docs" >}})

### Production-like environment

A test or staging environment that matches production in configuration, infrastructure, and
data characteristics. Testing in environments that differ from production is a common source
of deployment failures. See [Production-Like Environments]({{< relref "/docs/reference/practices/production-like-environments" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Hard-Coded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}),
[Stakeholders See Working Software Only at Release Time]({{< relref "/docs/symptoms/flow/work-management/delayed-stakeholder-feedback" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}})

### Prompt

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#prompt" >}}).

### Prompt caching

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#prompt-caching" >}}).

### Prompt craft

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#prompt-craft" >}}).

### Prompting discipline

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#prompting-discipline" >}}).

### Programmatic agent

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#programmatic-agent" >}}).

## R

### Rollback

The ability to revert a production deployment to a previous known-good state. CD requires
automated rollback that takes minutes, not hours. See [Rollback]({{< relref "/docs/pipeline/rollback" >}}).

Referenced in:
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Deployment Health Checks]({{< relref "/docs/anti-patterns/pipeline/no-deployment-health-checks" >}}),
[Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}}),
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}}),
[Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}),
[Symptoms for Developers]({{< relref "/docs/triage/for-developers" >}}),
[Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}})

### Repository readiness

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#repository-readiness" >}}).

## S

### Skill (agent)

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#skill-agent" >}}).

### Soft dependency

A dependency that can be worked around or deferred. Unlike hard dependencies, soft dependencies
do not block work but may influence sequencing or design decisions. Feature flags can turn many
hard dependencies into soft dependencies by allowing incomplete integrations to be deployed in
a disabled state.

### Specification engineering

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#specification-engineering" >}}).

### Story points

A relative estimation unit used by some teams to forecast effort. Story points are frequently
misused as a productivity metric, which creates perverse incentives to inflate estimates and
discourages the small work decomposition that CD requires. If your organization uses story
points as a velocity target, see [Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}).

Referenced in:
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Some Developers Are Overloaded While Others Wait for Work]({{< relref "/docs/symptoms/flow/work-management/uneven-workloads" >}}),
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Velocity as Individual Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-individual-metric" >}})

### Sub-agent

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#sub-agent" >}}).

### Subdomain product team

A team that owns a bounded subdomain within a larger distributed system. The team is full-stack
within its service (API, business logic, data store) but not directly user-facing. Its public
interface is designed for machines: other services or teams consume it through a defined API
contract.

A vertical slice for a subdomain product team delivers one observable behavior
through that contract. The slice is done when the API satisfies the agreed behavior for its
service consumers. Contrast with [full-stack product team](#full-stack-product-team).

Referenced in:
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches#vertical-slicing-in-distributed-systems" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition#vertical-slicing-in-distributed-systems" >}})

### System prompt

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#system-prompt" >}}).

## T

### TBD (trunk-based development)

A source-control branching model where all developers integrate to a single shared branch
(trunk) at least once per day. Short-lived feature branches (less than a day) are acceptable.
Long-lived feature branches are not. TBD is a prerequisite for CI, which is in turn a
prerequisite for CD. See [Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}).

Referenced in:
[Build Automation]({{< relref "/docs/foundations/build-automation" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}),
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Phase 1: Foundations]({{< relref "/docs/foundations" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}}),
[Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}),
[Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}),
[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

### TDD (test-driven development)

See [Testing Glossary]({{< relref "/docs/foundations/testing-fundamentals/glossary#tdd-test-driven-development" >}}).

Referenced in:
[Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}})

### Token

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#token" >}}).

### Tokenomics

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#tokenomics" >}}).

### Tool use

See [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary#tool-use" >}}).

### Toil

Repetitive, manual work related to maintaining a production service that is automatable, has
no lasting value, and scales linearly with service size. Examples include manual deployments,
manual environment provisioning, and manual test execution. Eliminating toil is a primary
benefit of building a CD pipeline.

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Progressive Rollout]({{< relref "/docs/continuous-deployment/progressive-rollout" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Your Migration Journey]({{< relref "/docs" >}})

## U

### Unplanned work

Work that arrives outside the planned backlog - production incidents, urgent bug fixes,
ad hoc requests. High levels of unplanned work indicate systemic quality or operational
problems. Teams with high change failure rates generate their own unplanned work through
failed deployments. Reducing unplanned work is a natural outcome of improving change failure
rate through CD practices.

Referenced in:
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}})

## V

### Virtual service

See [Testing Glossary]({{< relref "/docs/foundations/testing-fundamentals/glossary#virtual-service" >}}).

Referenced in:
[Test Environments Take Too Long to Reset Between Runs]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}})

### Value stream map

A visual representation of every step required to deliver a change from request to production.
The map shows process time, wait time, and percent complete and accurate at each step. The
foundational tool for [Phase 0 - Assess]({{< relref "/docs/assess/value-stream-mapping" >}}).

Referenced in:
[FAQ]({{< relref "/docs/reference/faq" >}}),
[Phase 0: Assess]({{< relref "/docs/assess" >}})

### Vertical sliced story

A user story that delivers a thin slice of functionality across all layers of the system
(UI, API, database, etc.). A horizontal slice, by contrast, implements one layer completely.
Vertical slices are independently deployable and testable, which is essential for CD. Vertical
slicing is a core technique in [Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/greenfield" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Sprint Planning Is Dominated by Dependency Negotiation]({{< relref "/docs/symptoms/flow/work-management/dependency-heavy-planning" >}}),
[Stakeholders See Working Software Only at Release Time]({{< relref "/docs/symptoms/flow/work-management/delayed-stakeholder-feedback" >}})

## W

### WIP (work in progress)

The number of work items that have been started but not yet completed. High WIP increases lead
time, reduces focus, and increases context-switching overhead. Limiting WIP is a key practice
in [Phase 3 - Limiting WIP]({{< relref "/docs/optimize/limiting-wip" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}),
[Experience Reports]({{< relref "/docs/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}),
[Phase 3: Optimize]({{< relref "/docs/optimize" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}),
[Retrospectives Produce No Real Change]({{< relref "/docs/symptoms/flow/team-knowledge/meaningless-retrospectives" >}}),
[Small Batches]({{< relref "/docs/optimize/small-batches" >}}),
[Symptoms for Managers]({{< relref "/docs/triage/for-managers" >}}),
[TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}),
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}),
[Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}),
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}})

### White box testing

See [Testing Glossary]({{< relref "/docs/foundations/testing-fundamentals/glossary#white-box-testing" >}}).

### Working agreement

An explicit, documented set of team norms covering how work is defined, reviewed, tested, and
deployed. Working agreements create shared expectations and reduce friction. See
[Working Agreements]({{< relref "/docs/foundations/working-agreements" >}}).

Referenced in:
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})
