---
title: "Pipeline Enforcement and Expert Agents"
linkTitle: "Pipeline Enforcement"
weight: 3
description: >
  How quality gates enforce agentic CD constraints and how expert validation agents extend the pipeline beyond standard tooling.
---

{{% pageinfo %}}
The pipeline is the enforcement mechanism for agentic CD. Standard quality gates handle mechanical checks. Expert validation agents handle the judgment calls that standard tools cannot make.

For the framework overview, see [Agentic CD](../). For the artifacts the pipeline enforces, see [The Six First-Class Artifacts](../first-class-artifacts/).
{{% /pageinfo %}}

## How Quality Gates Enforce Agentic CD

Steps 8 and 10 of the [agentic CD workflow](../) are where the [Pipeline Reference Architecture](../../pipeline-reference-architecture/) does the heavy lifting. Each pipeline stage enforces a specific agentic CD constraint:

- **Pre-commit gates** (linting, type checking, secret scanning, SAST) catch the mechanical errors agents produce most often: style violations, type mismatches, and accidentally embedded secrets. These run in seconds and give the agent immediate feedback.
- **CI Stage 1** (build + unit tests) validates the executable truth artifact. If human-defined tests fail, the agent's implementation is wrong regardless of how plausible the code looks.
- **CI Stage 2** (contract + schema tests) enforces the system constraints artifact at integration boundaries. Agent-generated code is particularly prone to breaking implicit contracts between modules or services.
- **CI Stage 3** (mutation testing, performance benchmarks, security integration tests) catches the subtle correctness issues that agents introduce: code that passes tests but violates non-functional requirements or leaves untested edge cases.
- **Acceptance tests** validate the user-facing behavior artifact in a production-like environment. This is where the BDD scenarios from the workflow's Step 2 become automated verification.
- **Production verification** (canary deployment, health checks, SLO monitors with auto-rollback) provides the final safety net. If agent-generated code degrades production metrics, it rolls back automatically.

### The Pre-Feature Baseline

The [pre-feature baseline](../../pipeline-reference-architecture/#pre-feature-baseline) lists nine gates that must be active before any feature work begins. These are a prerequisite for agentic CD. Without them passing on every commit, agent-generated changes bypass the minimum safety net.

See the pipeline patterns for concrete architectures that implement these gates:

- [Single-team pipeline](../../pipeline-reference-architecture/single-team/)
- [Multi-team pipeline](../../pipeline-reference-architecture/multi-team/)
- [Independent-team pipeline](../../pipeline-reference-architecture/independent-teams/)

## Expert Validation Agents

Standard quality gates cover what conventional tooling can verify: linting, type checking, test execution, vulnerability scanning. But agentic CD introduces validation needs that standard tools cannot address. No conventional tool can verify that test code faithfully implements a human-defined test specification. No conventional tool can verify that an agent-generated implementation matches the architectural intent in a feature description.

Expert validation agents fill this gap. These are AI agents dedicated to a specific validation concern, running as pipeline gates alongside standard tools:

| Expert Agent | What It Validates | Artifact It Enforces |
|-------------|-------------------|---------------------|
| **Test fidelity agent** | Test code exercises the scenarios, edge cases, and assertions defined in the test specification | Executable Truth |
| **Implementation coupling agent** | Test code verifies observable behavior, not internal implementation details | Executable Truth |
| **Architectural conformance agent** | Implementation follows the constraints in the feature description | Feature Description |
| **Intent alignment agent** | The combined change addresses the problem stated in the intent description | Intent Description |
| **Constraint compliance agent** | Code respects system constraints that static analysis cannot check | System Constraints |

## Adopting Expert Agents: The Same Replacement Cycle

Expert validation agents are new automated checks. Adopt them using the same [replacement cycle](../../migrate-to-cd/brownfield/replacing-manual-validations/) that drives every brownfield CD migration:

1. **Identify** a manual validation currently performed by a human reviewer. For example, checking whether test code actually tests what the specification requires.
2. **Automate** the check by deploying an expert agent as a pipeline gate. The agent runs on every change and produces a pass/fail result with reasoning.
3. **Validate** by running the expert agent in parallel with the existing human review. Compare results across at least 20 review cycles. If the agent matches human decisions on 90%+ of cases and catches at least one issue the human missed, proceed to Step 4.
4. **Remove** the manual check once the expert agent has proven at least as effective as the human review it replaces.

**Do not skip the parallel run.** Expert validation agents need calibration. An agent that flags too many false positives trains the team to ignore it. An agent that misses real issues creates false confidence. The parallel run is where you tune the agent's prompts, context, and thresholds until its judgment matches or exceeds human review.

Expert validation agents run on every change, immediately, eliminating the batching that manual review imposes. Humans steer; agents validate at pipeline speed.

With the pipeline and expert agents in place, the next question is what goes wrong and how to measure progress. See [Pitfalls and Metrics](../pitfalls-and-metrics/).

## Related Content

- [Agentic CD](../) - the framework overview, eight constraints, and workflow
- [The Six First-Class Artifacts](../first-class-artifacts/) - the artifacts the pipeline enforces
- [Pipeline Reference Architecture](../../pipeline-reference-architecture/) - the full quality gate sequence
- [Replacing Manual Validations](../../migrate-to-cd/brownfield/replacing-manual-validations/) - the replacement cycle for adopting automated checks
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - what goes wrong and how to measure progress
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence, especially Steps 3 and 4
