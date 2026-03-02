---
title: "Pipeline Enforcement and Expert Agents"
linkTitle: "Pipeline Enforcement"
weight: 10
description: >
  How quality gates enforce ACD constraints and how expert validation agents extend the pipeline beyond standard tooling.
---

{{% pageinfo %}}
The [pipeline](../glossary/#pipeline) is the enforcement mechanism for [agentic continuous delivery](../glossary/#acd-agentic-continuous-delivery) (ACD). Standard quality gates handle mechanical checks. Expert validation [agents](../glossary/#agent-ai) handle the judgment calls that standard tools cannot make.

For the framework overview, see [ACD](../). For the [artifacts](../glossary/#artifact) the pipeline enforces, see [Agent Delivery Contract](../first-class-artifacts/).
{{% /pageinfo %}}

## How Quality Gates Enforce ACD

The Pipeline Verification and Deployment stages of the [ACD workflow](../) are where the [Pipeline Reference Architecture](../../pipeline-reference-architecture/) does the heavy lifting. Each pipeline stage enforces a specific [ACD](../glossary/#acd-agentic-continuous-delivery) constraint:

- **Pre-commit gates** (linting, type checking, secret scanning, SAST) catch the mechanical errors agents produce most often: style violations, type mismatches, and accidentally embedded secrets. These run in seconds and give the agent immediate feedback.
- **[CI](../glossary/#ci-continuous-integration) Stage 1** (build + unit tests) validates the acceptance criteria. If human-defined tests fail, the agent's implementation is wrong regardless of how plausible the code looks.
- **CD Stage 1** (contract + schema tests) enforces the system constraints artifact at integration boundaries. Agent-generated code is particularly prone to breaking implicit contracts between modules or services.
- **CD Stage 2** (mutation testing, performance benchmarks, security integration tests) catches the subtle correctness issues that agents introduce: code that passes tests but violates non-functional requirements or leaves untested edge cases.
- **Acceptance tests** validate the user-facing behavior artifact in a [production-like environment](../glossary/#production-like-environment). This is where the [BDD](../glossary/#bdd-behavior-driven-development) scenarios become automated verification.
- **Production verification** ([canary deployment](../glossary/#canary-deployment), health checks, SLO monitors with auto-rollback) provides the final safety net. If agent-generated code degrades production metrics, it rolls back automatically.

### The Pre-Feature Baseline

The [pre-feature baseline](../../pipeline-reference-architecture/#pre-feature-baseline) lists the required baseline gates that must be active before any feature work begins. These are a prerequisite for ACD. Without them passing on every commit, agent-generated changes bypass the minimum safety net.

See the pipeline patterns for concrete architectures that implement these gates:

- [Single-team pipeline](../../pipeline-reference-architecture/single-team/)
- [Multi-team pipeline](../../pipeline-reference-architecture/multi-team/)
- [Independent-team pipeline](../../pipeline-reference-architecture/independent-teams/)

## Expert Validation Agents

Standard quality gates cover what conventional tooling can verify: linting, type checking, test execution, vulnerability scanning. But ACD introduces validation needs that standard tools cannot address. No conventional tool can verify that test code faithfully implements a human-defined test specification. No conventional tool can verify that an agent-generated implementation matches the architectural intent in a feature description.

Expert validation agents fill this gap. These are AI agents dedicated to a specific validation concern, running as pipeline gates alongside standard tools:

| Expert Agent | What It Validates | Catches | Artifact It Enforces |
|-------------|-------------------|---------|---------------------|
| **Test fidelity agent** | Test code exercises the scenarios, edge cases, and assertions defined in the test specification | Agent-generated tests that omit edge cases or weaken assertions | Acceptance Criteria |
| **Implementation coupling agent** | Test code verifies observable behavior, not internal implementation details | Tests that break when implementation is refactored without any behavior change | Acceptance Criteria |
| **Architectural conformance agent** | Implementation follows the constraints in the feature description | Code that crosses a module boundary or uses a prohibited dependency | Feature Description |
| **Intent alignment agent** | The combined change addresses the problem stated in the intent description | Implementations that are technically correct but solve the wrong problem | Intent Description |
| **Constraint compliance agent** | Code respects system constraints that static analysis cannot check | Violations of logging standards, [feature flag](../glossary/#feature-flag) requirements, or audit rules | System Constraints |

## Adopting Expert Agents: The Same Replacement Cycle

**Do not deploy expert agents and immediately reduce human review.** Expert validation agents need calibration before they can replace human judgment. An agent that flags too many false positives trains the team to ignore it. An agent that misses real issues creates false confidence. Run expert agents in parallel with human review for at least 20 cycles before any reduction in human coverage.

Expert validation agents are new automated checks. Adopt them using the same [replacement cycle](../../migrate-to-cd/brownfield/replacing-manual-validations/) that drives every brownfield [CD](../glossary/#cd-continuous-delivery) migration:

1. **Identify** a manual validation currently performed by a human reviewer. For example, checking whether test code actually tests what the specification requires.
2. **Automate** the check by deploying an expert agent as a pipeline gate. The agent runs on every change and produces a pass/fail result with reasoning.
3. **Validate** by running the expert agent in parallel with the existing human review. Compare results across at least 20 review cycles. If the agent matches human decisions on 90%+ of cases and catches at least one issue the human missed, proceed to the removal step.
4. **Remove** the manual check once the expert agent has proven at least as effective as the human review it replaces.

Expert validation agents run on every change, immediately, eliminating the batching that manual review imposes. Humans steer; agents validate at pipeline speed.

With the pipeline and expert agents in place, the next question is what goes wrong and how to measure progress. See [Pitfalls and Metrics](../pitfalls-and-metrics/).

## Related Content

- [Agentic Architecture Patterns](../agentic-architecture/) - multi-agent pipeline patterns and hook design for enforcement workflows
- [ACD](../) - the framework overview, eight constraints, and workflow
- [Agent Delivery Contract](../first-class-artifacts/) - the artifacts the pipeline enforces
- [Pipeline Reference Architecture](../../pipeline-reference-architecture/) - the full quality gate sequence
- [Replacing Manual Validations](../../migrate-to-cd/brownfield/replacing-manual-validations/) - the replacement cycle for adopting automated checks
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - what goes wrong and how to measure progress
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence, especially Harden Guardrails and Reduce Delivery Friction
