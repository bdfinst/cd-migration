---
title: "Agentic CD"
linkTitle: "Agentic CD"
weight: 8
description: >
  Extend continuous delivery with constraints, first-class artifacts, and practices for AI agent-generated changes.
---

{{% pageinfo %}}
Agentic CD defines the additional constraints and artifacts needed when AI agents contribute to the delivery pipeline. The pipeline must handle agent-generated work with the same rigor applied to human-generated work, and in some cases, more rigor. These constraints assume the team already practices continuous delivery. Without that foundation, the agentic extensions have nothing to extend.
{{% /pageinfo %}}

{{< figure src="/images/CI_before_AI.png" alt="Don't put the AI cart before the CI horse - Integrating AI is software engineering. To be great at this, you need to be great at DevOps and CI." >}}

## What Is Agentic CD?

**An agent-generated change must meet or exceed the same quality bar as a human-generated change.** The pipeline does not care who wrote the code. It cares whether the code is correct, tested, and safe to deploy.

Agentic CD is the application of continuous delivery in environments where software changes are proposed by agents. It exists to reliably constrain agent autonomy without slowing delivery.

Without additional artifacts beyond what human-driven CD requires, agent-generated code accumulates drift, quality issues, and technical debt faster than teams can detect it. By the time test coverage gaps or architectural drift surface in production incidents, the accumulated debt is too large to address incrementally. Six first-class artifacts and eight constraints address this.

Agents introduce unique challenges that require these additional constraints:

- Agents can generate changes faster than humans can review them
- Agents may lack context about organizational norms, business rules, or unstated constraints
- Agents cannot exercise judgment about risk in the same way humans can
- Agents may introduce subtle correctness issues that pass automated tests but violate intent

Before jumping into agentic workflows, ensure your team has the prerequisite delivery practices in place. The [AI Adoption Roadmap](adoption-roadmap/) provides a step-by-step sequence: quality tools, clear requirements, hardened guardrails, and reduced delivery friction, all before accelerating with AI coding.

## What You'll Find in This Section

1. **[AI Adoption Roadmap](adoption-roadmap/)** - the prerequisite sequence before adopting agentic workflows
2. **[Agent-Assisted Specification](agent-assisted-specification/)** - how agents help sharpen intent, draft BDD scenarios, and surface gaps in the specification stages
3. **[The Six First-Class Artifacts](first-class-artifacts/)** - detailed definitions with examples for each artifact that agents and humans must maintain
4. **[Pipeline Enforcement and Expert Agents](pipeline-enforcement/)** - how quality gates and expert validation agents enforce agentic CD constraints automatically
5. **[Pitfalls and Metrics](pitfalls-and-metrics/)** - common failure modes and how to measure whether agentic CD is working

## Agentic Extensions to MinimumCD

Agentic CD *extends* MinimumCD by the following constraints:

1. Explicit, human-owned intent exists for every change
2. Intent and architecture are represented as first-class artifacts
3. All first-class artifacts are versioned and delivered together with the change
4. Intended behavior is represented independently of implementation
5. Consistency between intent, tests, implementation, and architecture is enforced
6. Agent-generated changes must comply with all documented constraints
7. Agents implementing changes must not be able to promote those changes to production
8. While the pipeline is red, agents may only generate changes restoring pipeline health

These constraints are **not mandatory practices.** They describe the *minimum conditions required to sustain delivery pace once agents are making changes* to the system.

## The Six First-Class Artifacts

Every first-class artifact is part of the delivery contract, not a convenience. Agents may read any or all artifacts. Agents may generate some artifacts. Agents may **not** redefine the authority of any artifact. Humans own the accountability.

1. **[Intent Description](first-class-artifacts/#1-intent-description)** - why the change exists (human-owned)
2. **[User-Facing Behavior](first-class-artifacts/#2-user-facing-behavior)** - what users experience (externally observable)
3. **[Feature Description](first-class-artifacts/#3-feature-description)** - architectural trade-offs and constraints (engineering-owned)
4. **[Executable Truth](first-class-artifacts/#4-executable-truth)** - automated tests that make intent falsifiable (pipeline-enforced)
5. **[Implementation](first-class-artifacts/#5-implementation)** - the code (fully constrained by other artifacts)
6. **[System Constraints](first-class-artifacts/#6-system-constraints)** - global invariants (system-level rules)

These artifacts are intentionally **overlapping in content** but **non-overlapping in authority**. When an agent detects a conflict between artifacts, it cannot resolve that conflict by modifying the artifact it does not own. See [The Six First-Class Artifacts](first-class-artifacts/) for the authority hierarchy, detailed definitions, and examples.

## The Agentic CD Workflow

When an AI agent contributes to a CD pipeline, the workflow extends the standard pipeline:

| Stage | Actor | Activity |
|-------|-------|----------|
| Intent Definition | HUMAN | Define Intent Description (why the change exists) |
| Behavior Specification | HUMAN | Define User-Facing Behavior (BDD scenarios, the functional tests) |
| Architecture Specification | HUMAN | Define Feature Description (architecture, constraints, performance budgets) |
| Acceptance Criteria | HUMAN | Define acceptance criteria for non-functional tests (latency thresholds, security requirements, resource limits) |
| Test Generation | AGENT | Generate test code from Behavior Specification, Architecture Specification, and Acceptance Criteria |
| Test Validation | HUMAN → AGENT | Validate test code is decoupled from implementation and faithful to specs |
| Implementation | AGENT | Generate implementation |
| Pipeline Verification | PIPELINE | Validate implementation against executable truth (automated tests) |
| Code Review | HUMAN → AGENT | Review implementation (code review) |
| Deployment | PIPELINE | Deploy (same pipeline as any other change) |

Behavior Specification, Architecture Specification, and Acceptance Criteria together define the complete Executable Truth specification. Behavior Specification covers what the user experiences (BDD scenarios become the functional tests). Architecture Specification and Acceptance Criteria cover what the system must satisfy beyond user-visible behavior: performance budgets, security constraints, architectural boundaries, and operational requirements.

**Key differences from standard CD:**

- The four specification stages (Intent Definition through Acceptance Criteria) happen before any code generation. Specification-first should already be standard practice without agents. Every downstream stage - Test Generation, Implementation, Code Review, and Deployment - depends on the quality of these specifications. With agents, that dependency becomes absolute: an agent cannot compensate for missing or ambiguous specifications the way a human sometimes can. This is not big upfront design. You specify the next small step, not the entire feature set. See [Agent-Assisted Specification](agent-assisted-specification/) for how agents make this work fast.
- Test Generation and Test Validation separate test definition from test code. Teams often conflate the two because they happen at the same time, but they are distinct activities. Defining tests means deciding what scenarios, edge cases, and acceptance criteria to verify. Test code is the machine-runnable implementation of those decisions. Humans define the tests before development begins. Agents generate the test code, which must be validated for behavior focus and spec fidelity before implementation starts.
- System constraints are checked automatically in the pipeline during Pipeline Verification. This is standard CD practice. The difference is that agents require these constraints to be stated explicitly as artifacts rather than carried as team knowledge.

### Migrating Test Validation and Code Review to expert agents

Manual review at Test Validation and Code Review is a deliberate interim state, not the design. Every manual validation creates a [batching point](../migrate-to-cd/migration-path/optimize/small-batches/) - failures become harder to trace, feedback loops extend, and unvalidated changes accumulate. When agents generate changes faster than humans review them, wait time dominates the delivery cycle.

The target state replaces manual review with [expert validation agents](pipeline-enforcement/) using the same [replacement cycle](../migrate-to-cd/brownfield/replacing-manual-validations/) used throughout the CD migration:

| Stage | Starting State | Target State |
|-------|---------------|-------------|
| Test Validation | HUMAN validates test code | **Expert agent** validates test code is decoupled from implementation and faithful to specs; human reviews exceptions |
| Code Review | HUMAN reviews implementation | **Expert agent** validates architectural conformance and intent alignment; human reviews agent-flagged concerns |

1. Start with human validation only (the workflow as shown above)
2. Deploy an expert agent that runs in parallel with the human reviewer
3. Compare results until you are confident the agent matches or exceeds human judgment
4. Shift the human role from "review everything" to "review what the agent flags and spot-check according to risk"

**What does not migrate:** The four specification stages (Intent Definition through Acceptance Criteria) remain human responsibilities. Defining intent, specifying behavior, documenting architecture, and setting acceptance criteria require judgment about what matters to the business and the user. Agents validate whether specifications are met. Humans decide what the specifications should be.

See [Pipeline Enforcement and Expert Agents](pipeline-enforcement/) for the full set of expert agents and how to adopt them.

## Related Content

- [Pipeline Reference Architecture](../pipeline-reference-architecture/) - quality gates sequenced by defect detection priority
- [Replacing Manual Validations](../migrate-to-cd/brownfield/replacing-manual-validations/) - the replacement cycle for adopting expert validation agents
- [Defect Sources](../defect-sources/) - where defects originate, informing executable truth and system constraints
- [Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/) - limiting change size, with extra rigor for agent-generated changes
- [Code Coverage Mandates](../anti-patterns/testing/code-coverage-mandates/) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing](../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - an anti-pattern that agentic CD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests](../symptoms/testing/high-coverage-ineffective-tests/) - a testing symptom that undermines the executable truth agents depend on

---

Content contributed by {{% contributor-credit "michael-kuesters" %}} and {{% contributor-credit "bryan-finster" %}}. Image contributed by {{% contributor-credit "scott-prugh" %}}.
