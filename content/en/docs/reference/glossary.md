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

### Acceptance Criteria

Concrete expectations for a change, expressed as observable outcomes that can be used as fitness
functions - executed as deterministic tests or evaluated by review [agents](#agent-ai). In
[ACD](#acd-agentic-continuous-delivery), acceptance criteria include a done definition (what
"done" looks like from an observer's perspective) and an evaluation design (test cases with
known-good outputs). They constrain the agent: comprehensive criteria prevent incorrect code
from passing, while shallow criteria allow code that passes tests but violates intent. See
[Acceptance Criteria]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}),
[AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}),
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[Find Your Symptom]({{< relref "/docs/triage" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

### ACD (Agentic Continuous Delivery)

The application of continuous delivery in environments where software changes are proposed by
AI agents. ACD extends CD with additional constraints, delivery artifacts, and pipeline
enforcement to reliably constrain agent autonomy without slowing delivery. ACD assumes the
team already practices continuous delivery. Without that foundation, the agentic extensions
have nothing to extend. See [Agentic Continuous Delivery]({{< relref "/docs/agentic-cd" >}}).

Referenced in:
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Your Migration Journey]({{< relref "/docs" >}})

### Agent (AI)

An AI system that uses tool calls in a loop to complete multi-step tasks autonomously. Unlike a
single LLM call that returns a response, an agent can invoke tools, observe results, and decide
what to do next until a goal is met or a stopping condition is reached. An agent's behavior is
shaped by its prompt - the complete set of instructions, context, and constraints it receives at
the start of a session. See [Agentic CD]({{< relref "/docs/agentic-cd" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Learning Paths]({{< relref "/docs/learning-paths" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Agent Loop

The iterative cycle an [agent](#agent-ai) follows during execution: receive a goal, invoke a
tool, observe the result, decide the next action, repeat until done or a stopping condition is
reached. Each iteration consumes [tokens](#token) for both the accumulated context and the new
output. Long agent loops increase cost and latency, which is why [small-batch sessions](#agent-session)
bound each loop to a single [BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}})
scenario. See [Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}).

Referenced in:
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Agent Session

A bounded [agent](#agent-ai) invocation that implements exactly one
[BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}}) scenario and ends
with a commit. Each session starts with a curated context load, produces a tested change, and
closes with a context summary that replaces the full conversation for future sessions. Bounding
sessions to a single scenario keeps context small, costs predictable, and commits reviewable.
See [Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Artifact

A packaged, versioned output of a build process (e.g., a container image, JAR file, or binary).
In a CD pipeline, artifacts are built once and promoted through environments without
modification. See [Immutable Artifacts]({{< relref "/docs/migrate-to-cd/pipeline/immutable-artifacts" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}),
[Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Deployable Definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[End-to-End Tests]({{< relref "/docs/reference/testing/e2e" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Functional Tests]({{< relref "/docs/reference/testing/functional" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[No Contract Testing Between Services]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}),
[No Evidence of What Was Deployed or When]({{< relref "/docs/symptoms/deployment/no-deployment-audit-trail" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Build Runs Again for Every Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[The Team Ignores Alerts Because There Are Too Many]({{< relref "/docs/symptoms/visibility/alert-fatigue" >}}),
[The Team Is Afraid to Deploy]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

## B

### Black Box Testing

See [Testing Glossary]({{< relref "/docs/reference/testing/glossary#black-box-testing" >}}).

### Baseline Metrics

The set of delivery measurements taken before beginning a migration, used as the benchmark
against which improvement is tracked. See [Phase 0 - Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}).

Referenced in:
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}})

### Batch Size

The amount of change included in a single deployment. Smaller batches reduce risk, simplify
debugging, and shorten feedback loops. Reducing batch size is a core focus of
[Phase 3 - Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}).

Referenced in:
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[New Releases Introduce Regressions in Previously Working Functionality]({{< relref "/docs/symptoms/deployment/regressions-on-release" >}}),
[Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}})

### BDD (Behavior-Driven Development)

A collaboration practice where developers, testers, and product representatives define expected
behavior using structured examples before code is written. BDD produces executable
specifications that serve as both documentation and automated tests. BDD supports effective
[work decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) by forcing clarity about what a
story actually means before development begins.

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Knowledge & Communication Defects]({{< relref "/docs/reference/defect-sources/knowledge-and-communication" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

### Blue-Green Deployment

A deployment strategy that maintains two identical production environments. New code is deployed
to the inactive environment, verified, and then traffic is switched. See
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}).

Referenced in:
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}})

### Branch Lifetime

The elapsed time between creating a branch and merging it to trunk. CD requires branch lifetimes
measured in hours, not days or weeks. Long branch lifetimes are a symptom of poor work
decomposition or slow code review. See [Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}})

## C

### Canary Deployment

A deployment strategy where a new version is rolled out to a small subset of users or servers
before full rollout. If the canary shows no issues, the deployment proceeds to 100%. See
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}).

Referenced in:
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}})

### CD (Continuous Delivery)

The practice of ensuring that every change to the codebase is always in a deployable state and
can be released to production at any time through a fully automated pipeline. Continuous
delivery does not require that every change is deployed automatically, but it requires that
every change *could be* deployed automatically. This is the primary goal of this migration
guide.

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Learning Paths]({{< relref "/docs/learning-paths" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}),
[Phase 1: Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}),
[Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}),
[Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[Test Doubles]({{< relref "/docs/reference/testing/test-doubles" >}}),
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}),
[The Deployment Target Does Not Support Modern CI/CD Tooling]({{< relref "/docs/symptoms/flow/developer-experience/mainframe-constraints" >}}),
[Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Unit Tests]({{< relref "/docs/reference/testing/unit" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

### Change Failure Rate (CFR)

The percentage of deployments to production that result in a degraded service and require
remediation (e.g., rollback, hotfix, or patch). One of the four DORA metrics. See
[Metrics - Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}})

### CI (Continuous Integration)

The practice of integrating code changes to a shared trunk at least once per day, where each
integration is verified by an automated build and test suite. CI is a prerequisite for CD, not
a synonym. A team that runs automated builds on feature branches but merges weekly is not doing
CI. See [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Data & State Defects]({{< relref "/docs/reference/defect-sources/data-and-state" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Dependency & Infrastructure Defects]({{< relref "/docs/reference/defect-sources/dependency-and-infrastructure" >}}),
[Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Functional Tests]({{< relref "/docs/reference/testing/functional" >}}),
[Integration & Boundaries Defects]({{< relref "/docs/reference/defect-sources/integration-and-boundaries" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[It Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
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
[Symptoms for Developers]({{< relref "/docs/symptoms/for-developers" >}}),
[Test Suite Is Too Slow to Run]({{< relref "/docs/symptoms/testing/slow-test-suites" >}}),
[Testing & Observability Gap Defects]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}),
[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}}),
[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}),
[The Development Workflow Has Friction at Every Step]({{< relref "/docs/symptoms/flow/developer-experience/inadequate-tooling" >}}),
[Unit Tests]({{< relref "/docs/reference/testing/unit" >}})

### Constraint

In the Theory of Constraints, the single factor most limiting the throughput of a system.
During a CD migration, your job is to find and fix constraints in order of impact. See
[Identify Constraints]({{< relref "/docs/migrate-to-cd/assess/identify-constraints" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}),
[Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}),
[Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}),
[Current State Checklist]({{< relref "/docs/migrate-to-cd/assess/current-state-checklist" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Identify Constraints]({{< relref "/docs/migrate-to-cd/assess/identify-constraints" >}}),
[Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}),
[Learning Paths]({{< relref "/docs/learning-paths" >}}),
[Migrate to CD]({{< relref "/docs/migrate-to-cd" >}}),
[Migrating Brownfield to CD]({{< relref "/docs/migrate-to-cd/brownfield" >}}),
[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}}),
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Sprint Planning Is Dominated by Dependency Negotiation]({{< relref "/docs/symptoms/flow/work-management/dependency-heavy-planning" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Untestable Architecture]({{< relref "/docs/anti-patterns/architecture/untestable-architecture" >}}),
[Value Stream Mapping]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}})

### Context (LLM)

The complete assembled input provided to an LLM for a single inference call. Context includes
the system prompt, tool definitions, any reference material or documents, conversation history,
and the current user request. "Context" and "prompt" are often used interchangeably; the
distinction is that "context" emphasizes what information is present, while "prompt" emphasizes
the structured input as a whole. Context is measured in [tokens](#token). As context grows, costs
and latency increase and performance can degrade when relevant information is buried far from
the end of the context. See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Context Window

The maximum number of tokens an LLM can process in a single call, spanning both input and
output. The context window is a hard limit; exceeding it requires truncation or a redesigned
approach. Large context windows (150,000+ tokens) create false confidence - more available
space does not mean better performance, and filling the window increases both latency and cost.
See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Context Engineering

The practice of curating the complete information environment an [agent](#agent-ai) operates
within. Context engineering goes beyond writing better [prompts](#prompt) - it means assembling
the right project files, conventions, [constraints](#constraint), and prior session state so
the agent starts each [session](#agent-session) with everything it needs and nothing it does
not. See
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines#2-context-engineering" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Continuous Deployment

An extension of continuous delivery where every change that passes the automated pipeline is
deployed to production without manual intervention. Continuous delivery ensures every change
*can* be deployed; continuous deployment ensures every change *is* deployed. See
[Phase 4 - Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

## D

### Deployable

A change that has passed all automated quality gates defined by the team and is ready for
production deployment. The definition of deployable is codified in the pipeline, not decided
by a person at deployment time. See [Deployable Definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Deployable Definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}),
[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Functional Tests]({{< relref "/docs/reference/testing/functional" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Team Alignment to Code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}}),
[Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}),
[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

### Deployment Frequency

How often an organization successfully deploys to production. One of the four DORA metrics.
See [Metrics - Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Contract Testing Between Services]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}),
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Untestable Architecture]({{< relref "/docs/anti-patterns/architecture/untestable-architecture" >}})

### Development Cycle Time

The elapsed time from the first commit on a change to that change being deployable. This
measures the efficiency of your development and pipeline process, excluding upstream wait times.
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
[test doubles]({{< relref "/docs/reference/testing/test-doubles" >}}) couples your tests to
implementation details and causes rippling failures during routine refactoring. Reserve test
doubles for [external dependencies](#external-dependency) and runtime connections where real
invocation is impractical or non-deterministic.

See also: [Hard Dependency](#hard-dependency), [Soft Dependency](#soft-dependency).

Referenced in:
[Defect Feedback Loop]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/defect-feedback-loop" >}}),
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

### Declarative Agent

An [agent](#agent-ai) defined entirely as markdown documents - [skills](#skill-agent),
[system prompts](#system-prompt), and rules files - that runs inside an existing agent runtime
(Claude Code, Cursor, or similar). The runtime provides the [agent loop](#agent-loop), tool
execution, and context management. Use declarative agents when a developer is present and the
runtime provides the tools needed. See
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture#declarative-agents-vs-programmatic-agents" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}})

### Delivery Contract

The set of structured specification documents that anchor an [ACD](#acd-agentic-continuous-delivery)
workflow. A delivery contract typically includes four artifacts arranged in an authority hierarchy:
an intent description (what and why), user-facing behavior expressed as
[BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}}) scenarios (observable
outcomes), a feature description (architectural constraints, musts, must-nots), and
[acceptance criteria](#acceptance-criteria) (done definition and evaluation design). When an
[agent](#agent-ai) detects a conflict between artifacts, the higher-authority artifact wins.
See [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Done Definition

The observable outcomes portion of [acceptance criteria](#acceptance-criteria). A done definition
describes what "done" looks like from an independent observer's perspective - someone who was
not involved in the implementation. Combined with an [evaluation design](#evaluation-design),
done definitions form the testable boundary of a [delivery contract](#delivery-contract). See
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}).

Referenced in:
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}})

### DORA Metrics

The four key metrics identified by the DORA (DevOps Research and Assessment) research program
as predictive of software delivery performance: deployment frequency, lead time for changes,
change failure rate, and mean time to restore service. See [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

## E

### External Dependency

A [dependency](#dependency) on code or services outside your team's direct control. External
dependencies include third-party libraries, public APIs, managed cloud services, and any
resource whose release cycle and availability your team cannot influence.

External dependencies are the primary case where test doubles add value. A test double for an
external API verifies your integration logic without relying on network availability or
third-party rate limits. By contrast, mocking internal code - another class in the same
repository or a module your team owns - creates fragile tests that break whenever the internal
implementation changes, even when the behavior is correct.

When evaluating whether to mock something, ask: "Can my team change this code and release it
in our pipeline?" If yes, it is an internal dependency and should be tested through real code
paths. If no, it is an external dependency and a test double is appropriate.

See also: [Dependency](#dependency), [Hard Dependency](#hard-dependency).

Referenced in:
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})

### Evaluation Design

The test-cases-with-known-good-outputs portion of [acceptance criteria](#acceptance-criteria).
An evaluation design specifies concrete inputs and their expected outputs so that both humans
and [agents](#agent-ai) can verify whether code satisfies the [done definition](#done-definition).
Shallow evaluation designs (few cases, no edge coverage) allow code that passes tests but
violates intent. Thorough evaluation designs catch model regressions before they reach
production. See
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}).

Referenced in:
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Expert Agent

A specialized [agent](#agent-ai) that runs as a [pipeline](#pipeline) gate to validate a
specific concern such as test fidelity, security patterns, architectural compliance, or intent
alignment. Expert agents extend traditional pipeline tooling by catching semantic defects that
linters and static analyzers cannot detect. They are adopted in parallel with human review and
replace the human gate only after demonstrating a low false-positive rate.
See [Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}})

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
[Team Alignment to Code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}})

### Feature Flag

A mechanism that allows code to be deployed to production with new functionality disabled,
then selectively enabled for specific users, percentages of traffic, or environments. Feature
flags decouple deployment from release. See [Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deploying Stateful Services Causes Outages]({{< relref "/docs/symptoms/deployment/stateful-service-deployment-outages" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Hard-Coded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}),
[Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}),
[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Teams Cannot Change Their Own Pipeline Without Another Team]({{< relref "/docs/symptoms/deployment/pipeline-changes-require-another-team" >}}),
[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}}),
[Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}),
[Vendor Release Cycles Constrain the Team's Deployment Frequency]({{< relref "/docs/symptoms/flow/work-management/third-party-dependency-constraints" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}),
[Work Requires Sign-Off from Teams Not Involved in Delivery]({{< relref "/docs/symptoms/deployment/waiting-for-cross-team-approval" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

### Flow Efficiency

The ratio of active work time to total elapsed time in a delivery process. A flow efficiency of
15% means that for every hour of actual work, roughly 5.7 hours are spent waiting. Value stream
mapping reveals your flow efficiency. See [Value Stream Mapping]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}}).

Referenced in:
[Value Stream Mapping]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}})

### Full-Stack Product Team

A team that owns every layer of a user-facing capability - UI, API, and data store - and whose
public interface is designed for human users. A vertical slice for a full-stack product team
delivers one observable behavior from the user interface through to the database. The slice is
done when a user can observe the behavior through that interface. Contrast with
[subdomain product team](#subdomain-product-team).

Referenced in:
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches#vertical-slicing-in-distributed-systems" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition#vertical-slicing-in-distributed-systems" >}})

### Functional Acceptance Tests

See [Testing Glossary]({{< relref "/docs/reference/testing/glossary#functional-acceptance-tests" >}}).

## G

### Guardrail

A safety constraint encoded in a [pipeline](#pipeline), [system prompt](#system-prompt), or
[hook](#hook-agent) that limits what an [agent](#agent-ai) can do. Guardrails are deterministic
boundaries, not suggestions. Examples include pre-commit hooks that block secrets from being
committed, pipeline gates that reject changes exceeding a complexity threshold, and system
prompt rules that prevent an agent from modifying test specifications. Guardrails protect
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
directions. GitFlow was designed for infrequent, scheduled releases and is fundamentally
incompatible with continuous delivery because it defers integration, creates multiple paths
to production, and adds merge complexity. See the
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}})
for a step-by-step path from GitFlow to trunk-based development.

Referenced in:
[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Trunk-Based Development]({{< relref "/docs/reference/practices/trunk-based-development" >}})

## H

### Hard Dependency

A dependency that must be resolved before work can proceed. In delivery, hard dependencies
include things like waiting for another team's API, a shared database migration, or an
infrastructure provisioning request. Hard dependencies create queues and increase lead time.
Eliminating hard dependencies is a focus of
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}).

Referenced in:
[Team Alignment to Code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}})

### Hallucination

A predictable defect mode - not a rare failure - where an LLM generates plausible-looking but
incorrect output: code that references APIs that do not exist, tests that assert the wrong
behavior, or architectural claims that contradict the actual codebase. Hallucinations are more
likely when the [agent](#agent-ai) lacks sufficient [context](#context-llm) about the project,
which is why [context engineering](#context-engineering) and
[repository readiness](#repository-readiness) reduce hallucination rates. Pipeline
[guardrails](#guardrail) and [review sub-agents](#sub-agent) catch hallucinations that slip
past the implementation agent. See
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}})

### Hardening Sprint

A sprint dedicated to stabilizing and fixing defects before a release. The existence of
hardening sprints is a strong signal that quality is not being built in during regular
development. Teams practicing CD do not need hardening sprints because every commit is
deployable. See [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}).

Referenced in:
[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}})

### Hook (Agent)

A deterministic, automated action that runs in response to a specific event during an
[agent session](#agent-session). Pre-hooks validate inputs before the agent acts (e.g., lint,
type-check, secret scan). Post-hooks validate outputs after the agent finishes (e.g., SAST,
test execution). Hooks execute standard tooling - fast, free of AI cost, and repeatable. They
run before the [review orchestrator](#orchestrator), so AI review tokens are spent only on
changes that already pass mechanical checks. See
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration#hooks" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}})

### Hypothesis-Driven Development

An approach that frames every change as an experiment with a predicted outcome. Instead of
specifying a change as a requirement to implement, the team states a hypothesis: "We believe
[this change] will produce [this outcome] because [this reason]." After deployment, the team
validates whether the predicted outcome occurred. Changes that confirm the hypothesis build
confidence. Changes that refute it produce learning that informs the next hypothesis. This
creates a feedback loop where every deployed change generates a signal, whether it "succeeds"
or not. See [Hypothesis-Driven Development]({{< relref "/docs/migrate-to-cd/optimize/hypothesis-driven-development" >}})
for the full lifecycle and
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#1-intent-description" >}})
for how hypotheses integrate with specification artifacts.

Referenced in:
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}})

## I

### Immutable Artifact

A build artifact that is never modified after creation. The same artifact that is tested in the
pipeline is the exact artifact that is deployed to production. Configuration differences between
environments are handled externally. See [Immutable Artifacts]({{< relref "/docs/migrate-to-cd/pipeline/immutable-artifacts" >}}).

Referenced in:
[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}})

### Intent Engineering

The practice of encoding organizational purpose, values, and trade-off hierarchies into an
[agent's](#agent-ai) operating environment. An agent given [context](#context-llm) but no intent
will make technically defensible decisions that miss the point. Intent engineering defines the
decision boundaries the agent operates within - what to optimize for, when to escalate to a
human, and which trade-offs are acceptable. The formalized output of intent engineering is
the intent description in the [delivery contract](#delivery-contract). See
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines#3-intent-engineering" >}}).

Referenced in:
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Integration Frequency

How often a developer integrates code to the shared trunk. CD requires at least daily
integration. See [Metrics - Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}).

Referenced in:
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})

## L

### Lead Time for Changes

The elapsed time from when a commit is made to when it is successfully running in production.
One of the four DORA metrics. See [Metrics - Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Security Review Is a Gate, Not a Guardrail]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

## M

### Mean Time to Restore (MTTR)

The elapsed time from when a production incident is detected to when service is restored. One
of the four DORA metrics. Teams practicing CD have short MTTR because deployments are small,
rollback is automated, and the cause of failure is easy to identify. See
[Metrics - Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}})

### Model Routing

Assigning tasks to appropriately-sized LLMs based on task complexity rather than using a single
frontier model for everything. Routing, context assembly, and aggregation tasks require minimal
reasoning and run cheaply on small models. Code generation and semantic review require strong
reasoning and justify frontier model costs. Model routing treats [token](#token) cost as a
first-class design constraint alongside latency and reliability. See
[Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Modular Monolith

A single deployable application whose codebase is organized into well-defined modules with
explicit boundaries. Each module encapsulates a bounded domain and communicates with other
modules through defined interfaces, not by reaching into shared database tables or calling
internal methods directly. The application deploys as one unit, but its internal structure
allows teams to reason about, test, and change one module independently. See
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) and
[Premature Microservices]({{< relref "/docs/anti-patterns/architecture/premature-microservices" >}}).

Referenced in:
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[Team Alignment to Code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}})

## O

### Orchestrator

An agent that coordinates the work of other agents. The orchestrator receives a high-level goal,
breaks it into sub-tasks, delegates those sub-tasks to specialized [sub-agents](#sub-agent), and
assembles the results. Because orchestrators accumulate context across multiple steps, context
hygiene at agent boundaries is especially important - what the orchestrator passes to each
sub-agent is a cost and quality decision. See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

## P

### Pipeline

The automated sequence of build, test, and deployment stages that every change passes through
on its way to production. See [Phase 2 - Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}).

Referenced in:
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deploying Stateful Services Causes Outages]({{< relref "/docs/symptoms/deployment/stateful-service-deployment-outages" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}),
[Developers Cannot Run the Pipeline Locally]({{< relref "/docs/symptoms/flow/developer-experience/no-local-pipeline-execution" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Each Language Has Its Own Ad Hoc Pipeline]({{< relref "/docs/symptoms/flow/integration/polyglot-stack-no-pipeline-standards" >}}),
[Every Change Rebuilds the Entire Repository]({{< relref "/docs/symptoms/flow/integration/monorepo-without-tooling" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Every Deployment Is Immediately Visible to All Users]({{< relref "/docs/symptoms/deployment/deploy-release-coupled" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}),
[Functional Tests]({{< relref "/docs/reference/testing/functional" >}}),
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
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Evidence of What Was Deployed or When]({{< relref "/docs/symptoms/deployment/no-deployment-audit-trail" >}}),
[Phase 1: Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}),
[Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}),
[Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Product & Discovery Defects]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}),
[Production Issues Discovered by Customers]({{< relref "/docs/symptoms/visibility/production-issues-found-by-customers" >}}),
[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
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
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}),
[Staging Passes but Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}}),
[Symptoms for Developers]({{< relref "/docs/symptoms/for-developers" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Team Alignment to Code]({{< relref "/docs/migrate-to-cd/optimize/team-alignment" >}}),
[Teams Cannot Change Their Own Pipeline Without Another Team]({{< relref "/docs/symptoms/deployment/pipeline-changes-require-another-team" >}}),
[Test Doubles]({{< relref "/docs/reference/testing/test-doubles" >}}),
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

### Production-Like Environment

A test or staging environment that matches production in configuration, infrastructure, and
data characteristics. Testing in environments that differ from production is a common source
of deployment failures. See [Production-Like Environments]({{< relref "/docs/reference/practices/production-like-environments" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Hard-Coded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}),
[Stakeholders See Working Software Only at Release Time]({{< relref "/docs/symptoms/flow/work-management/delayed-stakeholder-feedback" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}})

### Prompt

The complete structured input provided to an LLM for a single inference call. A prompt is not
a one- or two-sentence question. In production agentic systems, a prompt is a composed document
that typically includes: a system instruction block (role definition, constraints, output format
requirements), tool definitions, relevant context (documents, code, conversation history), and
the user's request or task description. The system instruction block and tool definitions alone
can consume thousands of tokens before any user content is included. Understanding what a prompt
actually contains is a prerequisite for effective tokenomics. See
[Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Prompt Caching

A server-side optimization where stable portions of a prompt are stored and reused across
repeated calls instead of being processed as new input each time. Effective caching requires
placing static content (system instructions, tool definitions, reference documents) at the
beginning of the prompt so cache hits cover the maximum token span. Dynamic content (user
request, current state) goes at the end where it does not invalidate the cached prefix.
See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Prompt Craft

Synchronous, session-based instruction writing in a chat window. Prompt craft is the foundation
of the four [prompting disciplines](#prompting-discipline) - writing clear, structured
instructions with examples, counter-examples, explicit output formats, and rules for resolving
ambiguity. It is now considered table stakes, equivalent to fluent typing. Every developer
using AI tools reaches baseline proficiency here. The skill is necessary but insufficient for
agentic workflows, which require [context engineering](#context-engineering),
[intent engineering](#intent-engineering), and
[specification engineering](#specification-engineering). See
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines#1-prompt-craft-the-foundation" >}}).

Referenced in:
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Prompting Discipline

The four-layer skill framework developers master as AI moves from a chat partner to a
long-running worker. The four disciplines, in order from foundation to ceiling:
[prompt craft](#prompt-craft), [context engineering](#context-engineering),
[intent engineering](#intent-engineering), and
[specification engineering](#specification-engineering). Each layer builds on the one below it.
Developers at Stage 5-6 of the agentic learning curve operate across all four simultaneously.
See [The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Programmatic Agent

An [agent](#agent-ai) implemented as a standalone program (typically JavaScript or Java) that
calls the LLM API directly and manages its own [agent loop](#agent-loop), tool definitions,
error handling, and context assembly. Unlike a [declarative agent](#declarative-agent), a
programmatic agent does not depend on an interactive runtime. Use programmatic agents when the
agent must run without a developer present: CI/CD pipeline gates, scheduled audits, event-driven
triggers, or parallel fan-out across repositories. The [model-agnostic abstraction layer]({{< relref "/docs/agentic-cd/architecture/agentic-architecture#model-agnostic-abstraction-layer" >}})
is the minimum infrastructure a programmatic agent system needs. See
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture#declarative-agents-vs-programmatic-agents" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}})

## R

### Rollback

The ability to revert a production deployment to a previous known-good state. CD requires
automated rollback that takes minutes, not hours. See [Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}).

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}),
[Data Pipelines and ML Models Have No Deployment Automation]({{< relref "/docs/symptoms/flow/developer-experience/ml-pipeline-deployment-gaps" >}}),
[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}}),
[Deployable Definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}),
[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}}),
[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}),
[No Deployment Health Checks]({{< relref "/docs/anti-patterns/pipeline/no-deployment-health-checks" >}}),
[Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}}),
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}),
[Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}),
[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}}),
[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}),
[Symptoms for Developers]({{< relref "/docs/symptoms/for-developers" >}}),
[Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

### Repository Readiness

The degree to which a repository is prepared for [agent](#agent-ai)-driven development. A
repository scores high on readiness when an agent can clone it, install dependencies, build,
run tests, and iterate without human intervention. Key factors include deterministic builds,
fast test suites, clear naming conventions, consistent project structure, and machine-readable
documentation. Low repository readiness is the most common reason agents produce poor results,
because the agent spends its [context](#context-llm) and [tokens](#token) navigating ambiguity
instead of solving the problem. See
[Repository Readiness]({{< relref "/docs/agentic-cd/getting-started/repo-readiness" >}}).

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Repository Readiness]({{< relref "/docs/agentic-cd/getting-started/repo-readiness" >}})

## S

### Skill (Agent)

A reusable, named session procedure defined as a markdown document that an [agent](#agent-ai)
or [orchestrator](#orchestrator) invokes by name (e.g., `/start-session`, `/review`,
`/end-session`). Skills encode the session discipline from
[agent sessions](#agent-session) so the orchestrator does not re-derive the workflow each time.
Skills are not executable code; they are structured instructions. See
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration#skills" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}})

### Soft Dependency

A dependency that can be worked around or deferred. Unlike hard dependencies, soft dependencies
do not block work but may influence sequencing or design decisions. Feature flags can turn many
hard dependencies into soft dependencies by allowing incomplete integrations to be deployed in
a disabled state.

### Specification Engineering

The practice of writing structured documents that [agents](#agent-ai) can execute against over
extended timelines. Specification engineering is the skill that separates developers at Stage
5-6 of the agentic learning curve from everyone else. When agents run autonomously for hours,
you cannot course-correct in real time - the specification must be complete enough that an
independent executor reaches the right outcome without asking questions. Key skills include
writing self-contained problem statements, [acceptance criteria](#acceptance-criteria) with
[done definitions](#done-definition), [evaluation designs](#evaluation-design), and
decomposing large projects into small, bounded subtasks. The output of specification
engineering is the [delivery contract](#delivery-contract). See
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines#4-specification-engineering-the-new-ceiling" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}),
[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})

### Story Points

A relative estimation unit used by some teams to forecast effort. Story points are frequently
misused as a productivity metric, which creates perverse incentives to inflate estimates and
discourages the small work decomposition that CD requires. If your organization uses story
points as a velocity target, see [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}).

Referenced in:
[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}}),
[Some Developers Are Overloaded While Others Wait for Work]({{< relref "/docs/symptoms/flow/work-management/uneven-workloads" >}}),
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Velocity as Individual Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-individual-metric" >}})

### Sub-agent

A specialized agent invoked by an [orchestrator](#orchestrator) to perform a specific,
well-defined task. Sub-agents should receive only the context relevant to their task - not
the orchestrator's full accumulated context. Passing oversized context bundles to sub-agents
is a common source of unnecessary token consumption and can degrade performance by burying
relevant information. See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Subdomain Product Team

A team that owns a bounded subdomain within a larger distributed system - full-stack within
their service (API, business logic, data store) but not directly user-facing. Their public
interface is designed for machines: other services or teams consume it through a defined API
contract. A vertical slice for a subdomain product team delivers one observable behavior
through that contract. The slice is done when the API satisfies the agreed behavior for its
service consumers. Contrast with [full-stack product team](#full-stack-product-team).

Referenced in:
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches#vertical-slicing-in-distributed-systems" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition#vertical-slicing-in-distributed-systems" >}})

### System Prompt

The static, stable instruction block placed at the start of a [prompt](#prompt) that establishes
the model's role, constraints, output format requirements, and tool definitions. Unlike the
user-provided portion of the prompt, system prompts change rarely between calls and are the
primary candidates for [prompt caching](#prompt-caching). Keeping the system prompt concise and
placing it first maximizes cache effectiveness and reduces per-call input costs.
See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

## T

### TBD (Trunk-Based Development)

A source-control branching model where all developers integrate to a single shared branch
(trunk) at least once per day. Short-lived feature branches (less than a day) are acceptable.
Long-lived feature branches are not. TBD is a prerequisite for CI, which is in turn a
prerequisite for CD. See [Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}).

Referenced in:
[Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Change & Complexity Defects]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}}),
[Phase 1: Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}),
[Process & Deployment Defects]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}}),
[Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}),
[Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}),
[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

### TDD (Test-Driven Development)

See [Testing Glossary]({{< relref "/docs/reference/testing/glossary#tdd-test-driven-development" >}}).

Referenced in:
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})

### Token

The billing and capacity unit for LLMs. A token is roughly three-quarters of an English word.
All LLM costs, latency, and context limits are measured in tokens, not words, sentences, or
API calls. Input and output tokens are priced and counted separately. Output tokens typically
cost 2-5x more than input tokens because generating tokens is computationally more expensive
than reading them. Frontier models cost 10-20x more per token than smaller alternatives.
See [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Getting Started: Where to Put What]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Tokenomics

The architectural discipline of treating [token](#token) cost as a first-class design constraint
alongside latency and reliability. Tokenomics applies five strategies:

- **Context hygiene:** strip what does not change [agent](#agent-ai) behavior
- **[Model routing](#model-routing):** match model tier to task complexity
- **Structured output:** JSON between agents, not prose
- **[Prompt caching](#prompt-caching):** stable content first, dynamic content last
- **Batch-size control:** bound [sessions](#agent-session) to limit accumulated context

Tokenomics is not about spending less - it is about spending tokens where they produce value
and cutting waste where they do not. See
[Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

Referenced in:
[Agentic Continuous Delivery (ACD)]({{< relref "/docs/agentic-cd" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})

### Tool Use

The mechanism by which an [agent](#agent-ai) interacts with external systems during its
[agent loop](#agent-loop). On each iteration, the agent can invoke a tool (read a file, run a
test, execute a shell command, call an API), observe the result, and decide its next action.
Tool use is what distinguishes an agent from a single LLM call - the ability to act on the
environment, not just generate text. Each tool call adds [tokens](#token) to the context
(the call itself plus the result), which is why [context engineering](#context-engineering)
and [tokenomics](#tokenomics) account for tool-call overhead.

Referenced in:
[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}}),
[Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}),
[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}})

### Toil

Repetitive, manual work related to maintaining a production service that is automatable, has
no lasting value, and scales linearly with service size. Examples include manual deployments,
manual environment provisioning, and manual test execution. Eliminating toil is a primary
benefit of building a CD pipeline.

Referenced in:
[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}),
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}),
[Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}),
[Deployable Definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}),
[Progressive Rollout]({{< relref "/docs/migrate-to-cd/continuous-deployment/progressive-rollout" >}}),
[Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}),
[Your Migration Journey]({{< relref "/docs" >}})

## U

### Unplanned Work

Work that arrives outside the planned backlog - production incidents, urgent bug fixes,
ad hoc requests. High levels of unplanned work indicate systemic quality or operational
problems. Teams with high change failure rates generate their own unplanned work through
failed deployments. Reducing unplanned work is a natural outcome of improving change failure
rate through CD practices.

Referenced in:
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Thin-Spread Teams]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/thin-spread-teams" >}})

## V

### Virtual Service

See [Testing Glossary]({{< relref "/docs/reference/testing/glossary#virtual-service" >}}).

Referenced in:
[Test Environments Take Too Long to Reset Between Runs]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}})

### Value Stream Map

A visual representation of every step required to deliver a change from request to production,
showing process time, wait time, and percent complete and accurate at each step. The
foundational tool for [Phase 0 - Assess]({{< relref "/docs/migrate-to-cd/assess/value-stream-mapping" >}}).

Referenced in:
[Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}})

### Vertical Sliced Story

A user story that delivers a thin slice of functionality across all layers of the system
(UI, API, database, etc.) rather than a horizontal slice that implements one layer completely.
Vertical slices are independently deployable and testable, which is essential for CD. Vertical
slicing is a core technique in [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}).

Referenced in:
[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}),
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}),
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}),
[Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}),
[Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}),
[Sprint Planning Is Dominated by Dependency Negotiation]({{< relref "/docs/symptoms/flow/work-management/dependency-heavy-planning" >}}),
[Stakeholders See Working Software Only at Release Time]({{< relref "/docs/symptoms/flow/work-management/delayed-stakeholder-feedback" >}})

## W

### WIP (Work in Progress)

The number of work items that have been started but not yet completed. High WIP increases lead
time, reduces focus, and increases context-switching overhead. Limiting WIP is a key practice
in [Phase 3 - Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}).

Referenced in:
[Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}),
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}),
[DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}),
[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}),
[Experience Reports]({{< relref "/docs/migrate-to-cd/continuous-deployment/experience-reports" >}}),
[Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}),
[Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}),
[Phase 3: Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}),
[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}),
[Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}),
[Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}),
[Retrospectives Produce No Real Change]({{< relref "/docs/symptoms/flow/team-knowledge/meaningless-retrospectives" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[Symptoms for Managers]({{< relref "/docs/symptoms/for-managers" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}}),
[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}),
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}}),
[Tokenomics: Optimizing Token Usage in Agent Architecture]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}),
[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}),
[Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}),
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})

### White Box Testing

See [Testing Glossary]({{< relref "/docs/reference/testing/glossary#white-box-testing" >}}).

### Working Agreement

An explicit, documented set of team norms covering how work is defined, reviewed, tested, and
deployed. Working agreements create shared expectations and reduce friction. See
[Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}).

Referenced in:
[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}),
[Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}}),
[Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}),
[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
