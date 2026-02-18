---
title: "Tokenomics: Optimizing Token Usage in Agent Architecture"
linkTitle: "Tokenomics"
weight: 6
description: >
  How to architect agents and code to minimize unnecessary token consumption without sacrificing quality or capability.
---

{{% pageinfo %}}
Token costs are an architectural constraint, not an afterthought. Treating them as a first-class concern alongside latency, throughput, and reliability prevents runaway costs and context degradation in agentic systems.
{{% /pageinfo %}}

## What Is a Token?

A token is roughly three-quarters of a word in English. Billing, latency, and context limits all depend on token consumption rather than word counts or API call counts. Understanding this unit is the foundation of cost-aware agent architecture.

Three factors determine your token costs:

- **Input vs. output pricing** - Output tokens cost 2-5x more than input tokens because generating tokens is computationally more expensive than reading them. Instructions to "be concise" yield higher returns than most other optimizations because they directly reduce the expensive side of the equation.
- **[Context window](../../glossary/#context-window) size** - Large context windows (150,000+ tokens) create false confidence. Extended contexts increase latency, increase costs, and can degrade model performance when relevant information is buried mid-context.
- **Model tier** - Frontier models cost 10-20x more per token than smaller alternatives. Routing tasks to appropriately sized models is one of the highest-leverage cost decisions.

## How Agentic Systems Multiply Token Costs

Single-turn interactions have predictable, bounded token usage. Agentic systems do not.

Context grows across [orchestrator](../../glossary/#orchestrator) steps. [Sub-agents](../../glossary/#sub-agent) receive oversized context bundles containing everything the orchestrator knows, not just what the sub-agent needs. Retries and branches multiply consumption - a failed step that retries three times costs four times the tokens of a step that succeeds once. Long-running agent sessions accumulate conversation history until the context window fills or performance degrades.

**Every agent boundary is a token budget boundary.** What passes between components represents a cost decision. Designing agent interfaces means deciding what information transfers and what gets left behind.

## Optimization Strategies

### 1. Context Hygiene

Strip context that does not change agent behavior. Common sources of dead weight:

- Verbose examples that could be summarized
- Repeated instructions across [system prompt](../../glossary/#system-prompt) and user turns
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

Natural language prose between agents is expensive and imprecise. JSON or other structured formats reduce token count and eliminate ambiguity in parsing. When one agent's output becomes another agent's input, define a schema for that interface the same way you would define an API contract.

This applies directly to the [six first-class artifacts](../first-class-artifacts/): intent descriptions, feature descriptions, and test specifications passed between agents should be structured documents with defined fields, not open-ended prose.

### 4. Strategic Prompt Caching

[Prompt caching](../../glossary/#prompt-caching) stores stable [prompt](../../glossary/#prompt) sections server-side, reducing input costs on repeated requests. To maximize cache effectiveness:

- Place system prompts, tool definitions, and static instructions at the top of the context
- Group stable content together so cache hits cover the maximum token span
- Keep dynamic content (user input, current state) at the end where it does not invalidate the cached prefix

For agents that run repeatedly against the same codebase or documentation, caching the shared context can reduce effective input costs substantially.

### 5. Model Routing by Task Complexity

Not every task requires a frontier model. Match model tier to task requirements:

| Task type | Appropriate tier |
|-----------|-----------------|
| Classification, routing, extraction | Small model |
| Summarization, formatting, simple Q&A | Small to mid-tier |
| Code generation, complex reasoning | Mid to frontier |
| Architecture review, novel problem solving | Frontier |

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

## Applying Tokenomics to ACD Architecture

Agentic CD (ACD) creates predictable token cost patterns because the workflow is structured. Apply optimization at each stage:

**Specification stages (Intent Definition through Acceptance Criteria):** These are human-authored. Keep them concise and structured. Verbose intent descriptions do not produce better agent outputs - they produce more expensive ones.

**Test Generation:** The agent receives the behavior specification, feature description, and acceptance criteria. Pass only these three artifacts, not the full conversation history or unrelated system context.

**Implementation:** The implementation agent receives the test specification and feature description. It does not need the intent description (that informed the specification). Pass what the agent needs for this step only.

**Expert validation agents:** Validation agents running in parallel as pipeline gates should receive the artifact being validated plus the specification it must conform to - not the complete pipeline context. A test fidelity agent checking whether generated tests match the specification does not need the implementation or deployment history. For a concrete application of model routing, structured outputs, prompt caching, and per-session measurement to a specific agent configuration, see [Agent Configuration](../agent-configuration/).

**Review queues:** Agent-generated change volume can inflate review-time token costs when reviewers use AI-assisted review tools. WIP limits on the agent's change queue ([see Pitfalls](../pitfalls-and-metrics/#2-review-queue-backs-up-from-agent-generated-volume)) also function as a cost control on downstream AI review consumption.

## The Constraint Framing

Tokenomics is a design constraint, not a post-hoc optimization. Teams that treat it as a constraint make different architectural decisions:

- Agent interfaces are designed to pass the minimum necessary context
- Output formats are chosen for machine consumption, not human readability
- Model selection is part of the architecture decision, not the implementation detail
- Cost per workflow execution is a metric with an owner, not a line item on a cloud bill

Ignoring tokenomics produces the same class of problems as ignoring latency: systems that work in development but fail under production load, accumulate costs that outpace value delivered, and require expensive rewrites to fix architectural mistakes.

## Related Content

- [ACD](../) - the framework overview, constraints, and workflow
- [The Six First-Class Artifacts](../first-class-artifacts/) - the structured artifacts that token-efficient inter-agent communication depends on
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - expert agents that run as pipeline gates and whose own token costs should be managed
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - failure modes including review queue backup that compound token costs
- [AI Adoption Roadmap](../adoption-roadmap/) - the sequence of prerequisites before optimizing agentic workflows
- [Agent Configuration](../agent-configuration/) - a concrete application of model routing, structured outputs, prompt caching, and per-session measurement

---

Content contributed by {{% contributor-credit "bryan-finster" %}}
