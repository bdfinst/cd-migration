---
title: "Agentic Continuous Delivery (ACD)"
linkTitle: "Agentic CD"
weight: 9
description: >
  Extend continuous delivery with constraints, delivery artifacts, and practices for AI agent-generated changes.
---

{{% pageinfo %}}
Agentic continuous delivery ([ACD]({{< relref "/docs/reference/glossary#acd-agentic-continuous-delivery" >}})) defines the additional constraints and [artifacts]({{< relref "/docs/reference/glossary#artifact" >}}) needed when AI [agents]({{< relref "/docs/reference/glossary#agent-ai" >}}) contribute to the delivery [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). The pipeline must handle agent-generated work with the same rigor applied to human-generated work, and in some cases, more rigor. These constraints assume the team already practices [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}). Without that foundation, the agentic extensions have nothing to extend.
{{% /pageinfo %}}

{{< figure src="/images/CI_before_AI.png" alt="Don't put the AI cart before the CI horse - Integrating AI is software engineering. To be great at this, you need to be great at DevOps and CI." >}}

## Diagnose Before You Accelerate

When coding is nearly free, the constraint moves to the work around the code: the coordination,
safety, and delivery architecture that decides whether faster creation becomes faster value. AI's
first gift is not speed. It is visibility into where that work waits. Before extending CD for agents,
read [Diagnose First]({{< relref "/docs/agentic-cd/diagnose" >}}): it gives the physics of the new
bottleneck, a map of where it moves, and a repeatable loop for removing it. **Improve everything
around development first; then accelerate.** This page covers the engineering half of that work, the
constraints that keep agent-generated changes safe.

## What Is ACD?

**An agent-generated change must meet or exceed the same quality bar as a human-generated change.** The pipeline does not care who wrote the code. It cares whether the code is correct, tested, and safe to deploy.

ACD is the application of continuous delivery in environments where software changes are proposed by agents. It exists to reliably constrain agent autonomy without slowing delivery.

Without additional artifacts beyond what human-driven [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) requires, agent-generated code accumulates drift and technical debt faster than teams can detect it. The delivery artifacts and constraints in the [agent delivery contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) address this.

Agents introduce unique challenges that require these additional constraints:

- Agents can generate changes faster than humans can review them
- Agents cannot read unstated context: business rules, organizational norms, and long-term architectural intent that human developers carry implicitly
- Agents may introduce subtle correctness issues that pass automated tests but violate intent

Before jumping into agentic workflows, ensure your team has the prerequisite delivery practices in place. The [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) provides a step-by-step sequence: quality tools, clear requirements, hardened guardrails, and reduced delivery friction, all before accelerating with AI coding. The [Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}) describes how developers naturally progress from autocomplete to a multi-agent architecture and what drives each transition.

### Prerequisites

ACD extends continuous delivery. These practices must be working before agents can safely contribute:

- **[Continuous Integration]({{< relref "/docs/reference/practices/continuous-integration" >}})** - all work integrates to trunk at least daily with automated build and test
- **[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})** - a test architecture that properly stress tests every change to ensure it's deliverable on demand.
- **[Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}})** - a single command builds, tests, and packages the application
- **[Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})** - features broken into increments deliverable in two days or less
- **[Code Review]({{< relref "/docs/migrate-to-cd/foundations/code-review" >}})** - fast feedback without blocking flow
- **[Everything as Code]({{< relref "/docs/migrate-to-cd/foundations/everything-as-code" >}})** - infrastructure, pipelines, configuration, and schemas in version control
- **[Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}})** - all changes reach production through the same automated pipeline
- **[Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}})** - same inputs always produce the same outputs

Without these foundations, adding agents amplifies existing problems rather than accelerating delivery.

## What You'll Find in This Section

### [Getting Started]({{< relref "/docs/agentic-cd/getting-started" >}})

- **[Configuration Quick Start]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}})** - where to put what: project context file, rules, skills, and hooks mapped to their purpose and time horizon
- **[The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}})** - how developers progress from autocomplete to multi-agent architecture and what bottleneck drives each transition
- **[Repository Readiness]({{< relref "/docs/agentic-cd/getting-started/repo-readiness" >}})** - how to assess and upgrade a repository so agents can clone, build, test, and iterate without human intervention
- **[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})** - the four layers of skill developers must master as AI moves from chat partner to long-running worker
- **[AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}})** - covers organizational prerequisites before adopting agentic workflows

### [Specification & Contracts]({{< relref "/docs/agentic-cd/specification" >}})

- **[Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}})** - defines the artifacts that anchor the ACD workflow and their authority hierarchy
- **[Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}})** - how agents help sharpen intent, draft [BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}}) scenarios, and surface gaps before any code is written

### [Agent Architecture]({{< relref "/docs/agentic-cd/architecture" >}})

- **[Agentic Architecture Patterns]({{< relref "/docs/agentic-cd/architecture/agentic-architecture" >}})** - how to structure skills, agents, commands, and hooks in multi-agent systems
- **[Coding & Review Setup]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}})** - provides a concrete [orchestrator]({{< relref "/docs/reference/glossary#orchestrator" >}}), coder, and reviewer agent configuration
- **[Small-Batch Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}})** - how to structure agent sessions so [context]({{< relref "/docs/reference/glossary#context-llm" >}}) stays manageable and commits stay small

### [Operations & Governance]({{< relref "/docs/agentic-cd/operations" >}})

- **[Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}})** - how quality gates and expert validation agents enforce ACD constraints automatically
- **[Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}})** - how to architect agents and code to minimize unnecessary [token]({{< relref "/docs/reference/glossary#token" >}}) consumption without sacrificing quality
- **[Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}})** - covers common failure modes and how to measure whether ACD is working

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

Every ACD change is anchored by [agent delivery contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) - structured documents that define intent, behavior, constraints, [acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}}), and system-level rules. Agents may read and generate artifacts. Agents may **not** redefine the authority of any artifact. Humans own the accountability.

See [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) for the authority hierarchy, detailed definitions, and examples.

## The ACD Workflow

Humans own the specifications. Agents collaborate during specification and own test generation and implementation. The pipeline enforces correctness. At every specification stage, the [four-step cycle]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#the-pattern" >}}) applies: human drafts, agent critiques, human decides, agent refines.

| Stage | Human | Agent | Pipeline |
|-------|-------|-------|----------|
| [Intent Description]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#1-intent-description" >}}) | Draft and own the problem statement and hypothesis | Find ambiguity, suggest edge cases, sharpen hypothesis | |
| [User-Facing Behavior]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#2-user-facing-behavior" >}}) | Define and approve BDD scenarios | Generate scenario drafts, find gaps and weak scenarios | |
| [Feature Description]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#3-feature-description-constraint-architecture" >}}) | Set constraints and architectural boundaries | Suggest architectural considerations and integration points | |
| [Acceptance Criteria]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#4-acceptance-criteria" >}}) | Define thresholds and evaluation design | Draft non-functional criteria, check cross-artifact consistency | |
| [Specification Validation]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#validating-the-complete-specification-set" >}}) | Gate before implementation begins | Review all four artifacts for conflicts, gaps, and ambiguity | |
| Test Generation | | Generate test code from BDD scenarios, feature description, and acceptance criteria | |
| Test Validation | Review (interim) | [Expert validation agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) progressively replace human review | |
| [Implementation]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions#session-structure" >}}) | | Generate production code within one [small-batch session]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}) per scenario | |
| Pipeline Verification | | | Run all tests; all scenarios implemented so far must pass |
| Code Review | Review (interim) | [Expert validation agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) progressively replace human review | |
| Deployment | | | Deploy through the same pipeline as any other change |

Human review at Test Validation and Code Review is an interim state. Replace it using the same [replacement cycle]({{< relref "/docs/migrate-to-cd/brownfield/replacing-manual-validations" >}}) used throughout the CD migration. See [Pipeline Enforcement]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) for the full set of expert agents and how to adopt them.

## Related Content

- [Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) - quality gates sequenced by defect detection priority
- [Replacing Manual Validations]({{< relref "/docs/migrate-to-cd/brownfield/replacing-manual-validations" >}}) - the replacement cycle for adopting expert validation agents
- [Defect Sources]({{< relref "/docs/reference/defect-sources" >}}) - where defects originate, informing acceptance criteria and system constraints
- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - limiting change size, with extra rigor for agent-generated changes
- [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}}) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/pressure-to-skip-testing" >}}) - an anti-pattern that ACD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - a testing symptom that undermines the acceptance criteria agents depend on

---

Content contributed by {{% contributor-credit "michael-kuesters" %}} and {{% contributor-credit "bryan-finster" %}}. Image contributed by {{% contributor-credit "scott-prugh" %}}.
