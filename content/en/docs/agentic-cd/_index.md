---
title: "Agentic Continuous Delivery (ACD)"
linkTitle: "Agentic CD"
weight: 9
description: >
  Extend continuous delivery with constraints, first-class artifacts, and practices for AI agent-generated changes.
---

{{% pageinfo %}}
Agentic continuous delivery ([ACD](../glossary/#acd-agentic-continuous-delivery)) defines the additional constraints and [artifacts](../glossary/#artifact) needed when AI [agents](../glossary/#agent-ai) contribute to the delivery [pipeline](../glossary/#pipeline). The pipeline must handle agent-generated work with the same rigor applied to human-generated work, and in some cases, more rigor. These constraints assume the team already practices [continuous delivery](../glossary/#cd-continuous-delivery). Without that foundation, the agentic extensions have nothing to extend.
{{% /pageinfo %}}

{{< figure src="/images/CI_before_AI.png" alt="Don't put the AI cart before the CI horse - Integrating AI is software engineering. To be great at this, you need to be great at DevOps and CI." >}}

## What Is ACD?

**An agent-generated change must meet or exceed the same quality bar as a human-generated change.** The pipeline does not care who wrote the code. It cares whether the code is correct, tested, and safe to deploy.

ACD is the application of continuous delivery in environments where software changes are proposed by agents. It exists to reliably constrain agent autonomy without slowing delivery.

Without additional artifacts beyond what human-driven [CD](../glossary/#cd-continuous-delivery) requires, agent-generated code accumulates drift and technical debt faster than teams can detect it. These first-class artifacts and constraints address this.

Agents introduce unique challenges that require these additional constraints:

- Agents can generate changes faster than humans can review them
- Agents may lack context about organizational norms, business rules, or unstated constraints
- Agents cannot read unstated context: business rules, organizational norms, and long-term architectural intent that human developers carry implicitly
- Agents may introduce subtle correctness issues that pass automated tests but violate intent

Before jumping into agentic workflows, ensure your team has the prerequisite delivery practices in place. The [AI Adoption Roadmap](adoption-roadmap/) provides a step-by-step sequence: quality tools, clear requirements, hardened guardrails, and reduced delivery friction, all before accelerating with AI coding. The [Learning Curve](learning-curve/) describes how developers naturally progress from autocomplete to a multi-agent architecture and what drives each transition.

## What You'll Find in This Section

1. **[The Agentic Development Learning Curve](learning-curve/)** - how teams progress from autocomplete to multi-agent architecture and what bottleneck drives each transition
2. **[AI Adoption Roadmap](adoption-roadmap/)** - covers organizational prerequisites before adopting agentic workflows
3. **[The Six First-Class Artifacts](first-class-artifacts/)** - defines the six artifacts that anchor the ACD workflow and their authority hierarchy
4. **[Agentic Architecture Patterns](agentic-architecture/)** - how to structure skills, agents, commands, and hooks in multi-agent systems
5. **[Configuration Quick Start](agent-setup/)** - where to put what: CLAUDE.md, rules, skills, and hooks mapped to their purpose and time horizon
6. **[Coding Agent Configuration](agent-configuration/)** - provides a concrete [orchestrator](../glossary/#orchestrator), coder, and reviewer agent configuration
7. **[Agent-Assisted Specification](agent-assisted-specification/)** - how agents help sharpen intent, draft [BDD](../glossary/#bdd-behavior-driven-development) scenarios, and surface gaps before any code is written
8. **[Small-Batch Sessions](small-batch-sessions/)** - how to structure agent sessions, so [context](../glossary/#context-llm) stays manageable and commits stay small
9. **[Pipeline Enforcement and Expert Agents](pipeline-enforcement/)** - how quality gates and expert validation agents enforce ACD constraints automatically
10. **[Tokenomics](tokenomics/)** - how to architect agents and code to minimize unnecessary [token](../glossary/#token) consumption without sacrificing quality
11. **[Pitfalls and Metrics](pitfalls-and-metrics/)** - covers common failure modes and how to measure whether ACD is working

## ACD Extensions to MinimumCD

ACD *extends* MinimumCD by the following constraints:

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

## The ACD Workflow

When an AI agent contributes to a CD pipeline, the workflow extends the standard pipeline:

| Stage | Actor | Activity |
|-------|-------|----------|
| Intent Definition | Human | Define Intent Description (why the change exists) |
| Behavior Specification | Human | Define User-Facing Behavior (BDD scenarios, the functional tests) |
| Architecture Specification | Human | Define Feature Description (architecture, constraints, performance budgets) |
| Acceptance Criteria | Human | Define acceptance criteria for non-functional tests (latency thresholds, security requirements, resource limits) |
| Test Generation | Agent | Generate test code from Behavior Specification, Architecture Specification, and Acceptance Criteria |
| Test Validation | Human → Agent | Validate test code is decoupled from implementation and faithful to specs |
| Implementation | Agent | Generate implementation |
| Pipeline Verification | Pipeline | Validate implementation against executable truth (automated tests) |
| Code Review | Human → Agent | Review implementation (code review) |
| Deployment | Pipeline | Deploy (same pipeline as any other change) |

Manual review at Test Validation and Code Review is an interim state. Replace it using [expert validation agents](pipeline-enforcement/) and the same [replacement cycle](../migrate-to-cd/brownfield/replacing-manual-validations/) used throughout the CD migration. See [Pipeline Enforcement and Expert Agents](pipeline-enforcement/) for the full set of expert agents and how to adopt them.

## Related Content

- [Pipeline Reference Architecture](../pipeline-reference-architecture/) - quality gates sequenced by defect detection priority
- [Replacing Manual Validations](../migrate-to-cd/brownfield/replacing-manual-validations/) - the replacement cycle for adopting expert validation agents
- [Defect Sources](../defect-sources/) - where defects originate, informing executable truth and system constraints
- [Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/) - limiting change size, with extra rigor for agent-generated changes
- [Code Coverage Mandates](../anti-patterns/testing/code-coverage-mandates/) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing](../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - an anti-pattern that ACD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests](../symptoms/testing/high-coverage-ineffective-tests/) - a testing symptom that undermines the executable truth agents depend on

---

Content contributed by {{% contributor-credit "michael-kuesters" %}} and {{% contributor-credit "bryan-finster" %}}. Image contributed by {{% contributor-credit "scott-prugh" %}}.
