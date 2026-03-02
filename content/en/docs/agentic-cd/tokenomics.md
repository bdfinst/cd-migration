---
title: "Tokenomics: Optimizing Token Usage in Agent Architecture"
linkTitle: "Tokenomics"
weight: 11
description: >
  How to architect agents and code to minimize unnecessary token consumption without sacrificing quality or capability.
---

{{% pageinfo %}}
[Token](../glossary/#token) costs are an architectural constraint, not an afterthought. Treating them as a first-class concern alongside latency, throughput, and reliability prevents runaway costs and [context](../glossary/#context-llm) degradation in agentic systems.
{{% /pageinfo %}}

**Every [agent](../glossary/#agent-ai) boundary is a token budget boundary.** What passes between components represents a cost decision. Designing agent interfaces means deciding what information transfers and what gets left behind.

## What Is a Token?

A token is roughly three-quarters of a word in English. Billing, latency, and context limits all depend on token consumption rather than word counts or API call counts. Three factors determine your costs:

- **Input vs. output pricing** - Output tokens cost 2-5x more than input tokens because generating tokens is computationally more expensive than reading them. Instructions to "be concise" yield higher returns than most other optimizations because they directly reduce the expensive side of the equation.
- **[Context window](../glossary/#context-window) size** - Large context windows (150,000+ tokens) create false confidence. Extended contexts increase latency, increase costs, and can degrade model performance when relevant information is buried mid-context.
- **Model tier** - Frontier models cost 10-20x more per token than smaller alternatives. Routing tasks to appropriately sized models is one of the highest-leverage cost decisions.

## How Agentic Systems Multiply Token Costs

Single-turn interactions have predictable, bounded token usage. Agentic systems do not.

[Context](../glossary/#context-llm) grows across [orchestrator](../glossary/#orchestrator) steps. [Sub-agents](../glossary/#sub-agent) receive oversized context bundles containing everything the orchestrator knows, not just what the sub-agent needs. Retries and branches multiply consumption - a failed step that retries three times costs four times the tokens of a step that succeeds once. Long-running agent sessions accumulate conversation history until the context window fills or performance degrades.

## Optimization Strategies

### 1. Context Hygiene

Strip context that does not change agent behavior. Common sources of dead weight:

- Verbose examples that could be summarized
- Repeated instructions across [system prompt](../glossary/#system-prompt) and user turns
- Full conversation history when only recent turns are relevant
- Raw data dumps when a structured summary would serve

Test whether removing content changes outputs. If behavior is identical with less context, the removed content was not contributing.

### 2. Target Output Verbosity

Output costs more than input, so reducing output verbosity has compounding returns. Instructions to agents should specify:

- The response format (structured data beats prose for machine-readable outputs)
- The required level of detail
- What to omit

A code generation agent that returns code plus explanation plus rationale plus alternatives costs significantly more than one that returns only code. Add the explanation when needed; do not add it by default.

### 3. Structured Outputs for Inter-Agent Communication

Natural language prose between agents is expensive and imprecise. JSON or other structured formats reduce token count and eliminate ambiguity in parsing. Compare the two representations of the same finding:

{{< code-collapse title="Natural language vs. structured JSON for inter-agent communication" lang="text" >}}
# Natural language (expensive, ambiguous)
"The function on line 42 of auth.ts does not validate the user ID before
querying the database, which could allow unauthorized access."

# Structured JSON (efficient, parseable)
{"file": "auth.ts", "line": 42, "issue": "missing user ID validation before DB query", "why": "unauthorized access"}
{{< /code-collapse >}}

The JSON version conveys the same information in a fraction of the tokens and requires no natural language parsing step. When one agent's output becomes another agent's input, define a schema for that interface the same way you would define an API contract.

This applies directly to the [first-class artifacts](../first-class-artifacts/): intent descriptions, feature descriptions, test specifications, and other artifacts passed between agents should be structured documents with defined fields, not open-ended prose.

### 4. Strategic Prompt Caching

[Prompt caching](../glossary/#prompt-caching) stores stable [prompt](../glossary/#prompt) sections server-side, reducing input costs on repeated requests. To maximize cache effectiveness:

- Place system prompts, tool definitions, and static instructions at the top of the context
- Group stable content together so cache hits cover the maximum token span
- Keep dynamic content (user input, current state) at the end where it does not invalidate the cached prefix

For agents that run repeatedly against the same codebase or documentation, caching the shared context can reduce effective input costs substantially.

### 5. Model Routing by Task Complexity

Not every task requires a frontier model. Match model tier to task requirements:

| Task type | Appropriate tier | Relative cost |
|-----------|-----------------|---------------|
| Classification, routing, extraction | Small model | 1x |
| Summarization, formatting, simple Q&A | Small to mid-tier | 2-5x |
| Code generation, complex reasoning | Mid to frontier | 10-20x |
| Architecture review, novel problem solving | Frontier | 15-30x |

An orchestrator using a frontier model to decide which sub-agent to call, when a small classifier would suffice, wastes tokens on both the decision and the overhead of a larger model.

### 6. Summarization Cadence

Long-running agents accumulate conversation history. Rather than passing the full transcript to each step, replace completed work with a compact summary:

- Summarize completed steps before starting the next phase
- Archive raw history but pass only the summary forward
- Include only the summary plus current task context in each agent call

This limits context growth without losing the information needed for the next step. Apply this pattern whenever an agent session spans more than a few turns.

### 7. Workflow-Level Measurement

Per-call token counts hide the true cost drivers. Measure token spend at the workflow level - aggregate consumption for a complete execution from trigger to completion.

Workflow-level metrics expose:

- Which orchestration steps consume disproportionate tokens
- Whether retry rates are multiplying costs
- Which sub-agents receive more context than their output justifies
- How costs scale with input complexity

Track cost per workflow execution the same way you track latency and error rates. Set budgets and alert when executions exceed them. A workflow that occasionally costs 10x the average is a design problem, not a billing detail.

### 8. Code Quality as a Token Cost Driver

Poorly structured or poorly named code is expensive in both token cost and output quality. When code does not express intent, agents must infer it from surrounding code, comments, and call sites - all of which consume context budget. The worse the naming and structure, the more context must load before the agent can do useful work.

**Naming as context compression:**

- A function named `processData` requires surrounding code, comments, and call sites before an agent can understand its purpose. A function named `calculateOrderTax` is self-documenting - intent is resolved by the name, not from the context budget.
- Generic names (`temp`, `result`, `data`) and single-letter variables shift the cost of understanding from the identifier to the surrounding code. That surrounding code must load into every prompt that touches the function.
- Inconsistent terminology across a codebase - the same concept called `user`, `account`, `member`, or `customer` in different files - forces agents to spend tokens reconciling vocabulary before applying logic.

**Structure as context scope:**

- Large functions that do many things cannot be understood in isolation. The agent must load more of the file, and often more files, to reason about a single change.
- Deep nesting and high cyclomatic complexity require agents to track multiple branches simultaneously, consuming context budget that would otherwise go toward the actual task.
- Tight coupling between modules means a change to one file requires loading several others to understand impact. A loosely coupled module can be provided as complete, self-contained context.
- Duplicate logic scattered across the codebase forces agents to either load redundant context or miss instances when making changes.

**The correction loop multiplier:**

A correction loop where the agent's first output is wrong, reviewed, and re-prompted uses roughly three times the tokens of a successful first attempt. Poor code quality increases agent error rates, multiplying both the per-request token cost and the number of iterations required.

**Refactoring for token efficiency:**

Refactoring for human readability and refactoring for token efficiency are the same work. The changes that help a human understand code at a glance help an agent understand it with minimal context.

- Use domain language in identifiers. Names should match the language of the business domain. `calculateMonthlyPremium` is better than `calcPrem` or `compute`.
- Establish a ubiquitous language - a consistent glossary of terms used uniformly across code, tests, tickets, and documentation. Agents generalize more accurately when terminology is consistent.
- Extract functions until each has a single, nameable purpose. A function that can be described in one sentence can usually be understood without loading its callers.
- Apply responsibility separation at the module level. A module that owns one concept can be passed to an agent as complete, self-contained context.
- Define explicit interfaces at module boundaries. An agent working inside a module needs only the interface contract for its dependencies, not the implementation.
- Consolidate duplicate logic into one authoritative location. One definition is one context load; ten copies are ten opportunities for inconsistency.

Treat AI interaction quality as feedback on code quality. When an interaction requires more context than expected or produces worse output than expected, treat that as a signal that the code needs naming or structure improvement. Prioritize the most frequently changed files - use code churn data to identify where structural investment has the highest leverage.

**Enforcing these improvements through the pipeline:**

Structural and naming improvements degrade without enforcement. Two pipeline mechanisms
keep them from slipping back:

- The [architectural conformance agent](../pipeline-enforcement/#expert-validation-agents)
  catches code that crosses module boundaries or introduces prohibited dependencies.
  Running it as a pipeline gate means architecture decisions made during refactoring
  are protected on every subsequent change, not just until the next deadline.
- Pre-commit linting and style enforcement (part of the
  [pre-feature baseline](../../pipeline-reference-architecture/#pre-feature-baseline))
  catches naming violations before they reach review. Rules can encode domain language
  standards - rejecting generic names, enforcing consistent terminology - so that the
  ubiquitous language is maintained automatically rather than by convention.

Without pipeline enforcement, naming and structure improvements are temporary. With it,
the token cost reductions they deliver compound over the lifetime of the codebase.

**Self-correction through gate feedback:**

When an [agent](../glossary/#agent-ai) generates code, gate failures from the
architectural conformance agent or linting checks become structured feedback the agent
can act on directly. Rather than routing violations to a human reviewer, the pipeline
returns the failure reason to the agent, which corrects the violation and resubmits.
This self-correction cycle keeps naming and structure improvements in place without
human intervention on each change - the pipeline teaches the agent what the codebase
standards require, one correction at a time. Over repeated cycles, the correction
rate drops as the agent internalizes the constraints, reducing both rework tokens and
review burden.

## Applying Tokenomics to ACD Architecture

Agentic CD ([ACD](../glossary/#acd-agentic-continuous-delivery)) creates predictable token cost patterns because the workflow is structured. Apply optimization at each stage:

**Specification stages (Intent Description through Acceptance Criteria):** These are human-authored. Keep them concise and structured. Verbose intent descriptions do not produce better agent outputs - they produce more expensive ones. A bloated intent description that takes 2,000 tokens to say what 200 tokens would cover costs 10x more at every downstream stage that receives it.

**Test Generation:** The agent receives the user-facing behavior, feature description, and acceptance criteria. Pass only these three [artifacts](../glossary/#artifact), not the full conversation history or unrelated system context. An agent that receives the full conversation history instead of just the three specification artifacts consumes 3-5x more tokens with no quality improvement.

**Implementation:** The implementation agent receives the test specification and feature description. It does not need the intent description (that informed the specification). Pass what the agent needs for this step only.

**Expert validation agents:** Validation agents running in parallel as [pipeline](../glossary/#pipeline) gates should receive the artifact being validated plus the specification it must conform to - not the complete pipeline context. A test fidelity agent checking whether generated tests match the specification does not need the implementation or deployment history. For a concrete application of model routing, structured outputs, prompt caching, and per-session measurement to a specific agent configuration, see [Coding & Review Setup](../agent-configuration/).

**Review queues:** Agent-generated change volume can inflate review-time token costs when reviewers use AI-assisted review tools. [WIP](../glossary/#wip-work-in-progress) limits on the agent's change queue ([see Pitfalls](../pitfalls-and-metrics/#2-review-queue-backs-up-from-agent-generated-volume)) also function as a cost control on downstream AI review consumption.

## The Constraint Framing

**Tokenomics is a design constraint, not a post-hoc optimization.** Teams that treat it as a constraint make different architectural decisions:

- Agent interfaces are designed to pass the minimum necessary context
- Output formats are chosen for machine consumption, not human readability
- Model selection is part of the architecture decision, not the implementation detail
- Cost per workflow execution is a metric with an owner, not a line item on a cloud bill

**Ignoring tokenomics produces the same class of problems as ignoring latency:** systems that work in development but fail under production load, accumulate costs that outpace value delivered, and require expensive rewrites to fix architectural mistakes.

## Related Content

- [Agentic Architecture Patterns](../agentic-architecture/) - cross-cutting concerns including idempotency, model-agnostic abstraction, and structured inter-agent communication
- [ACD](../) - the framework overview, constraints, and workflow
- [First-Class Artifacts](../first-class-artifacts/) - the structured artifacts that token-efficient inter-agent communication depends on
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - expert agents that run as pipeline gates and whose own token costs should be managed
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - failure modes including review queue backup that compound token costs
- [AI Adoption Roadmap](../adoption-roadmap/) - the sequence of prerequisites before optimizing agentic workflows
- [Coding & Review Setup](../agent-configuration/) - a concrete application of model routing, structured outputs, prompt caching, and per-session measurement

---

Content contributed by {{% contributor-credit "bryan-finster" %}}
