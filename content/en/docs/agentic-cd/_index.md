---
title: "Agentic Continuous Delivery (ACD)"
linkTitle: "Agentic CD"
weight: 9
description: >
  Extend continuous delivery with constraints, delivery artifacts, and practices for AI agent-generated changes.
---

{{% pageinfo %}}
Agentic continuous delivery ([ACD](../glossary/#acd-agentic-continuous-delivery)) defines the additional constraints and [artifacts](../glossary/#artifact) needed when AI [agents](../glossary/#agent-ai) contribute to the delivery [pipeline](../glossary/#pipeline). The pipeline must handle agent-generated work with the same rigor applied to human-generated work, and in some cases, more rigor. These constraints assume the team already practices [continuous delivery](../glossary/#cd-continuous-delivery). Without that foundation, the agentic extensions have nothing to extend.
{{% /pageinfo %}}

{{< figure src="/images/CI_before_AI.png" alt="Don't put the AI cart before the CI horse - Integrating AI is software engineering. To be great at this, you need to be great at DevOps and CI." >}}

## What Is ACD?

**An agent-generated change must meet or exceed the same quality bar as a human-generated change.** The pipeline does not care who wrote the code. It cares whether the code is correct, tested, and safe to deploy.

ACD is the application of continuous delivery in environments where software changes are proposed by agents. It exists to reliably constrain agent autonomy without slowing delivery.

Without additional artifacts beyond what human-driven [CD](../glossary/#cd-continuous-delivery) requires, agent-generated code accumulates drift and technical debt faster than teams can detect it. The delivery artifacts and constraints in the [agent delivery contract](specification/first-class-artifacts/) address this.

Agents introduce unique challenges that require these additional constraints:

- Agents can generate changes faster than humans can review them
- Agents cannot read unstated context: business rules, organizational norms, and long-term architectural intent that human developers carry implicitly
- Agents may introduce subtle correctness issues that pass automated tests but violate intent

Before jumping into agentic workflows, ensure your team has the prerequisite delivery practices in place. The [AI Adoption Roadmap](getting-started/adoption-roadmap/) provides a step-by-step sequence: quality tools, clear requirements, hardened guardrails, and reduced delivery friction, all before accelerating with AI coding. The [Learning Curve](getting-started/learning-curve/) describes how developers naturally progress from autocomplete to a multi-agent architecture and what drives each transition.

### Prerequisites

ACD extends continuous delivery. These practices must be working before agents can safely contribute:

- **[Continuous Integration](../practices/continuous-integration/)** - all work integrates to trunk at least daily with automated build and test
- **[Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/)** - a test architecture that properly stress tests every change to ensure it's deliverable on demand.
- **[Build Automation](../migrate-to-cd/migration-path/foundations/build-automation/)** - a single command builds, tests, and packages the application
- **[Work Decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/)** - features broken into increments deliverable in two days or less
- **[Code Review](../migrate-to-cd/migration-path/foundations/code-review/)** - fast feedback without blocking flow
- **[Everything as Code](../migrate-to-cd/migration-path/foundations/everything-as-code/)** - infrastructure, pipelines, configuration, and schemas in version control
- **[Single Path to Production](../migrate-to-cd/migration-path/pipeline/single-path-to-production/)** - all changes reach production through the same automated pipeline
- **[Deterministic Pipeline](../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/)** - same inputs always produce the same outputs

Without these foundations, adding agents amplifies existing problems rather than accelerating delivery.

## What You'll Find in This Section

### [Getting Started](getting-started/)

- **[Configuration Quick Start](getting-started/agent-setup/)** - where to put what: project context file, rules, skills, and hooks mapped to their purpose and time horizon
- **[The Agentic Development Learning Curve](getting-started/learning-curve/)** - how developers progress from autocomplete to multi-agent architecture and what bottleneck drives each transition
- **[The Four Prompting Disciplines](getting-started/prompting-disciplines/)** - the four layers of skill developers must master as AI moves from chat partner to long-running worker
- **[AI Adoption Roadmap](getting-started/adoption-roadmap/)** - covers organizational prerequisites before adopting agentic workflows

### [Specification & Contracts](specification/)

- **[Agent Delivery Contract](specification/first-class-artifacts/)** - defines the artifacts that anchor the ACD workflow and their authority hierarchy
- **[Agent-Assisted Specification](specification/agent-assisted-specification/)** - how agents help sharpen intent, draft [BDD](../glossary/#bdd-behavior-driven-development) scenarios, and surface gaps before any code is written

### [Agent Architecture](architecture/)

- **[Agentic Architecture Patterns](architecture/agentic-architecture/)** - how to structure skills, agents, commands, and hooks in multi-agent systems
- **[Coding & Review Setup](architecture/agent-configuration/)** - provides a concrete [orchestrator](../glossary/#orchestrator), coder, and reviewer agent configuration
- **[Small-Batch Sessions](architecture/small-batch-sessions/)** - how to structure agent sessions so [context](../glossary/#context-llm) stays manageable and commits stay small

### [Operations & Governance](operations/)

- **[Pipeline Enforcement and Expert Agents](operations/pipeline-enforcement/)** - how quality gates and expert validation agents enforce ACD constraints automatically
- **[Tokenomics](operations/tokenomics/)** - how to architect agents and code to minimize unnecessary [token](../glossary/#token) consumption without sacrificing quality
- **[Pitfalls and Metrics](operations/pitfalls-and-metrics/)** - covers common failure modes and how to measure whether ACD is working

## ACD Extensions to MinimumCD

ACD *extends* MinimumCD by the following constraints:

1. Explicit, human-owned intent exists for every change
2. Intent and architecture are represented as delivery artifacts
3. All delivery artifacts are versioned and delivered together with the change
4. Intended behavior is represented independently of implementation
5. Consistency between intent, tests, implementation, and architecture is enforced
6. Agent-generated changes must comply with all documented constraints
7. Agents implementing changes must not be able to promote those changes to production
8. While the pipeline is red, agents may only generate changes restoring pipeline health

These constraints are **not mandatory practices.** They describe the *minimum conditions required to sustain delivery pace once agents are making changes* to the system.

## Agent Delivery Contract

Every ACD change is anchored by [agent delivery contract](specification/first-class-artifacts/) - structured documents that define intent, behavior, constraints, acceptance criteria, and system-level rules. Agents may read and generate artifacts. Agents may **not** redefine the authority of any artifact. Humans own the accountability.

See [Agent Delivery Contract](specification/first-class-artifacts/) for the authority hierarchy, detailed definitions, and examples.

## The ACD Workflow

Humans define specifications. Agents generate tests and implementation. The pipeline enforces correctness. Human review at Test Validation and Code Review is an interim state that [expert validation agents](operations/pipeline-enforcement/) progressively replace using the same [replacement cycle](../migrate-to-cd/brownfield/replacing-manual-validations/) used throughout the CD migration.

The workflow stages, actor responsibilities, and session structure are detailed in [Small-Batch Sessions](architecture/small-batch-sessions/) and [Pipeline Enforcement](operations/pipeline-enforcement/).

## Related Content

- [Pipeline Reference Architecture](../pipeline-reference-architecture/) - quality gates sequenced by defect detection priority
- [Replacing Manual Validations](../migrate-to-cd/brownfield/replacing-manual-validations/) - the replacement cycle for adopting expert validation agents
- [Defect Sources](../defect-sources/) - where defects originate, informing acceptance criteria and system constraints
- [Small Batches](../migrate-to-cd/migration-path/optimize/small-batches/) - limiting change size, with extra rigor for agent-generated changes
- [Code Coverage Mandates](../anti-patterns/testing/code-coverage-mandates/) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing](../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - an anti-pattern that ACD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests](../symptoms/testing/high-coverage-ineffective-tests/) - a testing symptom that undermines the acceptance criteria agents depend on

---

Content contributed by {{% contributor-credit "michael-kuesters" %}} and {{% contributor-credit "bryan-finster" %}}. Image contributed by {{% contributor-credit "scott-prugh" %}}.
