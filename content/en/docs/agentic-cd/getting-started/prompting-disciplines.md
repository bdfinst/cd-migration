---
title: "The Four Prompting Disciplines"
linkTitle: "Prompting Disciplines"
weight: 3
description: >
  Four layers of skill that developers must master as AI moves from a chat partner to a long-running worker - and what changes when agents run autonomously.
aliases:
  - /docs/agentic-cd/prompting-disciplines/
---

{{% pageinfo %}}
Most guidance on "prompting" describes Discipline 1: writing clear instructions in a chat window. That is table stakes. Developers working at [Stage 5 or 6](../learning-curve/#stage-5-spec-first-agentic-development) of the agentic learning curve operate across all four disciplines simultaneously. Each discipline builds on the one below it.
{{% /pageinfo %}}

## 1. Prompt Craft (The Foundation)

Synchronous, session-based instructions used in a chat window.

Prompt craft is now considered table stakes, the equivalent of fluent typing. It does not differentiate. Every developer using AI tools will reach baseline proficiency here. The skill is necessary but insufficient for [agentic workflows](../../).

**Key skills:**

- Writing clear, structured instructions
- Including examples and counter-examples
- Setting explicit output formats and guardrails
- Defining how to resolve ambiguity so the model does not guess

**Where it maps on the [learning curve](../learning-curve/):** [Stages 1-2](../learning-curve/#stage-1-autocomplete). Developers at these stages optimize prompt craft and assume that is the ceiling. It is not.

## 2. Context Engineering

Curating the entire information environment (the [tokens](../../glossary/#token)) the [agent](../../glossary/#agent-ai) operates within.

Context engineering is the difference between a developer who writes better [prompts](../../glossary/#prompt) and a developer who builds better scaffolding so the agent starts with everything it needs. The 10x performers are not writing cleverer instructions. They are assembling better [context](../../glossary/#context-llm).

**Key skills:**

- Providing project files, conventions, and [constraints](../../glossary/#constraint) at the start of the session
- Managing context infrastructure: [system prompts](../../glossary/#system-prompt), retrieval pipelines, and memory systems
- Deciding what to include and, more importantly, what to exclude (see [Small-Batch Sessions: context load](../../architecture/small-batch-sessions/#what-to-include-in-the-context-load))

**Where it maps on the learning curve:** [Stage 3-4](../learning-curve/#stage-3-chat-driven-development). The transition from chat-driven development to agentic task completion is driven by context engineering. The agent that navigates the codebase with the right context outperforms the agent that receives pasted excerpts in a chat window.

**Where it shows up in ACD:** The [orchestrator](../../glossary/#orchestrator) assembles context for each session ([Coding & Review Setup](../../architecture/agent-configuration/#the-orchestrator)). The `/start-session` skill encodes context assembly order. [Prompt caching](../../glossary/#prompt-caching) depends on placing stable context before dynamic content ([Tokenomics](../../operations/tokenomics/)).

## 3. Intent Engineering

Encoding organizational purpose, values, and trade-off hierarchies into the agent's operating environment.

Intent engineering tells the agent what to want, not just what to know. An agent given context but no intent will make technically defensible decisions that miss the point. Intent engineering defines the decision boundaries the agent operates within.

**Key skills:**

- Telling the agent what to optimize for, not just what to build
- Defining decision boundaries (for example: "Optimize for customer satisfaction over resolution speed")
- Establishing escalation triggers: conditions under which the agent must stop and ask a human instead of deciding autonomously

**Where it maps on the learning curve:** The transition from [Stage 4](../learning-curve/#stage-4-agentic-task-completion) to [Stage 5](../learning-curve/#stage-5-spec-first-agentic-development). At Stage 4, vague requirements cause drift because the agent fills in intent from its own assumptions. Intent engineering makes those assumptions explicit.

**Where it shows up in ACD:** The [Intent Description](../../specification/first-class-artifacts/#1-intent-description) artifact is the formalized version of intent engineering. It sits at the top of the [artifact authority hierarchy](../../specification/first-class-artifacts/#artifact-authority-hierarchy) because intent governs every downstream decision.

## 4. Specification Engineering (The New Ceiling)

Writing structured documents that agents can execute against over extended timelines.

Specification engineering is the skill that separates Stage 5-6 developers from everyone else. When agents run autonomously for hours, you cannot course-correct in real time. The specification must be complete enough that an independent executor can reach the right outcome without asking questions.

**Key skills:**

- **Self-contained problem statements:** Can the task be solved without the agent fetching additional information?
- **Acceptance criteria:** Writing three sentences that an independent observer could use to verify "done"
- **Decomposition:** Breaking a multi-day project into small subtasks with clear boundaries (see [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/))
- **Evaluation design:** Creating test cases with known-good outputs to catch model regressions

**Where it maps on the learning curve:** [Stage 5-6](../learning-curve/#stage-5-spec-first-agentic-development). Specification engineering is what makes spec-first agentic development and multi-agent architecture possible.

**Where it shows up in ACD:** The [agent delivery contract](../../specification/first-class-artifacts/) are the output of specification engineering. The [agent-assisted specification](../../specification/agent-assisted-specification/) workflow is how agents help produce them. The [discovery loop](../../specification/agent-assisted-specification/#the-discovery-loop-from-conversation-to-specification) shows how to get from a vague idea to a structured specification through conversation, and the [complete specification example](../../specification/agent-assisted-specification/#complete-specification-example) shows what the finished output looks like.

## From Synchronous to Autonomous

Because you cannot course-correct an agent running for hours in real time, you must front-load your oversight. The skill shift looks like this:

| Synchronous skills (Stages 1-3) | Autonomous skills (Stages 5-6) |
|---|---|
| Catching mistakes in real time | Encoding guardrails before the session starts |
| Providing context when asked | Self-contained problem statements |
| Verbal fluency and quick iteration | Completeness of thinking and edge-case anticipation |
| Fixing it in the next chat turn | Structured specifications with acceptance criteria |

This is not a different toolset. It is the same work, front-loaded. Every minute spent on specification saves multiples in review and rework.

### The Self-Containment Test

To practice the shift, take a request like "Update the dashboard" and rewrite it as if the recipient:

1. Has never seen your dashboard
2. Does not know your company's internal acronyms
3. Has zero access to information outside that specific text

If the rewritten request still makes sense and can be acted on, it is ready for an autonomous agent. If it cannot, the missing information is the gap between your current prompt and a specification. This is the same test [agent-assisted specification](../../specification/agent-assisted-specification/) applies: can the agent implement this without asking a clarifying question?

### The Planner-Worker Architecture

Modern agents use a planner model to decompose your specification into a task log, and worker models to execute each task. Your job is to provide the decomposition logic - the rules for how to split work - so the planner can function reliably. This is the [orchestrator pattern](../../architecture/agent-configuration/#the-orchestrator) at its core: the orchestrator routes work to specialized agents, but it can only route well when the specification is structured enough to decompose.

### Organizational Impact

Practicing specification engineering has effects beyond agent workflows:

- **Tighter communication.** Writing self-contained specifications forces you to surface hidden assumptions and unstated disagreements. Memos get clearer. Decision frameworks get sharper.
- **Reduced alignment issues.** When specifications are explicit enough for an agent to execute, they are explicit enough for human team members to align on. Ambiguity that would surface as a week-long misunderstanding surfaces during the specification review instead.
- **Agent-readable documentation.** Documentation that is structured enough for an AI agent to consume is also more useful for human onboarding. Making your knowledge base agent-readable improves it for everyone.

## Related Content

- [The Agentic Development Learning Curve](../learning-curve/) - the six stages these disciplines map to
- [Agent-Assisted Specification](../../specification/agent-assisted-specification/) - how agents help produce specifications, including a [complete example](../../specification/agent-assisted-specification/#complete-specification-example)
- [Agent Delivery Contract](../../specification/first-class-artifacts/) - the structured output of specification engineering
- [Small-Batch Sessions](../../architecture/small-batch-sessions/) - context engineering applied to session structure
- [Coding & Review Setup](../../architecture/agent-configuration/) - where context engineering and intent engineering appear in agent configuration
- [Tokenomics](../../operations/tokenomics/) - why context engineering decisions are also cost decisions
- [AI Adoption Roadmap](../adoption-roadmap/) - the organizational prerequisites before these disciplines can be applied at scale
