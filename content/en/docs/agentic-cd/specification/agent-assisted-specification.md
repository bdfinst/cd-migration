---
title: "Agent-Assisted Specification"
linkTitle: "Agent-Assisted Specification"
weight: 2
description: >
  How to use agents as collaborators during specification and why small-scope specification is not big upfront design.
aliases:
  - /docs/agentic-cd/agent-assisted-specification/
---

{{% pageinfo %}}
The specification stages of the [ACD workflow](../../) (Intent Description, User-Facing Behavior, Feature Description, and Acceptance Criteria) ask humans to define intent, behavior, constraints, and acceptance criteria before any code generation begins. This page explains how [agents](../../glossary/#agent-ai) accelerate that work and why the effort stays small.
{{% /pageinfo %}}

## The Pattern

Every use of an agent in the specification stages follows the same four-step cycle:

1. **Human drafts** - write the first version based on your understanding
2. **Agent critiques** - ask the agent to find gaps, ambiguity, or inconsistency
3. **Human decides** - accept, reject, or modify the agent's suggestions
4. **Agent refines** - generate an updated version incorporating your decisions

This is not the agent doing specification for you. It is the agent making your specification more thorough than it would be without help, in less time than it would take without help. The sections below show how this cycle applies at each specification stage.

## This Is Not Big Upfront Design

The specification stages look heavy if you imagine writing them for an entire feature set. That is not what happens.

**You specify the next single unit of work.** One thin [vertical slice](../../glossary/#vertical-sliced-story) of functionality - a single scenario, a single behavior. A user story may decompose into multiple such units worked in parallel across services. The scope of each unit stays small because [continuous delivery](../../glossary/#cd-continuous-delivery) requires it: every change must be small enough to deploy safely and frequently. A detailed specification for three months of work does not reduce risk - it amplifies it. Small-scope specification front-loads clarity on *one* change and gets production feedback before specifying the next.

If your specification effort for a single change takes more than 15 minutes, the change is too large. Split it.

## How Agents Help with the Intent Description

The intent description does not need to be perfect on the first draft. Write a rough version and use an agent to sharpen it.

**Ask the agent to find ambiguity.** Give it your draft intent and ask it to identify anything vague, any assumption that a developer might interpret differently than you intended, or any unstated [constraint](../../glossary/#constraint).

Example [prompt](../../glossary/#prompt):

{{< code-collapse title="Prompt: identify ambiguity in intent description" >}}
Here is the intent description for my next change. Identify any
ambiguity, unstated assumptions, or missing context that could
lead to an implementation that technically satisfies this description
but does not match what I actually want.

[paste intent description]
{{< /code-collapse >}}

**Ask the agent to suggest edge cases.** Agents are good at generating boundary conditions you might not think of, because they can quickly reason through combinations.

**Ask the agent to simplify.** If the intent covers too much ground, ask the agent to suggest how to split it into smaller, independently deliverable changes.

The human still owns the intent. The agent is a sounding board that catches gaps before they become defects.

## How Agents Help with User-Facing Behavior

Writing [BDD](../../glossary/#bdd-behavior-driven-development) scenarios from scratch is slow. Agents can draft them and surface gaps you would otherwise miss.

**Generate initial scenarios from the intent.** Give the agent your intent description and ask it to produce Gherkin scenarios covering the expected behavior.

Example prompt:

{{< code-collapse title="Prompt: generate BDD scenarios from intent description" >}}
Based on this intent description, generate BDD scenarios in Gherkin
format. Cover the primary success path, key error paths, and edge
cases. For each scenario, explain why it matters.

[paste intent description]
{{< /code-collapse >}}

**Review for completeness, not perfection.** The agent's first draft will cover the obvious paths. Your job is to read through them and ask: "What is missing?" The agent handles volume. You handle judgment.

**Ask the agent to find gaps.** After reviewing the initial scenarios, ask the agent explicitly what scenarios are missing.

Example prompt:

{{< code-collapse title="Prompt: identify missing BDD scenarios" >}}
Here are the BDD scenarios for this feature. What scenarios are
missing? Consider boundary conditions, concurrent access, failure
modes, and interactions with existing behavior.

[paste scenarios]
{{< /code-collapse >}}

**Ask the agent to challenge weak scenarios.** Some scenarios may be too vague to constrain an implementation. Ask the agent to identify any scenario where two different implementations could both pass while producing different user-visible behavior.

The human decides which scenarios to keep. The agent ensures you considered more scenarios than you would have on your own.

## How Agents Help with the Feature Description and Acceptance Criteria

The Feature Description and Acceptance Criteria stages define the technical boundaries: where the change fits in the system, what constraints apply, and what non-functional requirements must be met.

**Ask the agent to suggest architectural considerations.** Give it the intent, the BDD scenarios, and a description of the current system architecture. Ask what integration points, dependencies, or constraints you should document.

Example prompt:

{{< code-collapse title="Prompt: identify architectural considerations before implementation" >}}
Given this intent and these BDD scenarios, what architectural
decisions should I document before implementation begins? Consider
where this change fits in the existing system, what components it
touches, and what constraints an implementer needs to know.

Current system context: [brief architecture description]
{{< /code-collapse >}}

**Ask the agent to draft non-functional acceptance criteria.** Agents can suggest performance thresholds, security requirements, and resource limits based on the type of change and its context.

Example prompt:

{{< code-collapse title="Prompt: draft non-functional acceptance criteria" >}}
Based on this feature description, suggest non-functional acceptance
criteria I should define. Consider latency, throughput, security,
resource usage, and operational requirements. For each criterion,
explain why it matters for this specific change.

[paste feature description]
{{< /code-collapse >}}

**Ask the agent to check consistency.** Once you have the intent, BDD scenarios, feature description, and acceptance criteria, ask the agent to identify any contradictions or gaps between them.

The human makes the architectural decisions and sets the thresholds. The agent makes sure you did not leave anything out.

## Validating the Complete Specification Set

The four specification stages produce four [artifacts](../../glossary/#artifact): intent description, user-facing behavior (BDD scenarios), feature description (constraint architecture), and [acceptance criteria](../../glossary/#acceptance-criteria). Each can look reasonable in isolation but still conflict with the others. Before moving to test generation and implementation, validate them as a set.

**Use an agent as a specification reviewer.** Give it all four artifacts and ask it to check for internal consistency.

{{< alert title="Specification consistency prompt" color="info" >}}
{{< code-collapse title="Prompt: validate specification set for internal consistency" >}}
Review these four specification artifacts for internal consistency
before implementation begins. Check:
- Clarity: is the intent unambiguous? Could it be read differently by two developers?
- Testability: does every BDD scenario have clear, observable outcomes?
- Scope: does the feature description constrain the implementation to what the intent requires, without over-engineering?
- Terminology: are the same concepts named consistently across all four artifacts?
- Completeness: are there behaviors implied by the intent that have no corresponding BDD scenario?
- Conflict: does anything in one artifact contradict anything in another?

[paste all four artifacts]
{{< /code-collapse >}}
{{< /alert >}}

**The human gates on this review before implementation begins.** If the review agent identifies issues, resolve them before generating any test code or implementation. A conflict caught in specification costs minutes. The same conflict caught during implementation costs a session.

This review is not a bureaucratic checkpoint. It is the last moment where the cost of a change is near zero. After this gate, every issue becomes more expensive to fix.

## The Discovery Loop: From Conversation to Specification

The prompts above work well when you already know what to specify. When you do not, you need a different starting point. Instead of writing a draft and asking the agent to critique it, treat the agent as a principal architect who interviews you to extract context you did not know was missing.

This is the shift from "order taker" to "architectural interview." The sections above describe what to do at each specification stage. The discovery loop describes how to get there through conversation when you are starting from a vague idea.

### Phase 1: Initial Framing (Intent)

Describe the outcome, not the application. Set the agent's role and the goal of the conversation explicitly.

{{< code-collapse title="Prompt: start the discovery loop" >}}
I want to build a Software Value Stream Mapping application. Before we
write a single line of code, I want you to act as a Principal Architect.
Your goal is to help me write a self-contained specification that an
autonomous agent can execute. Do not start writing the spec yet. First,
interview me to uncover the technical implementation details, edge cases,
and trade-offs I have not considered.
{{< /code-collapse >}}

This prompt does three things: it states intent, it assigns a role that produces the right kind of questions, and it prevents the agent from jumping to implementation.

### Phase 2: Deep-Dive Interview (Context)

Let the agent ask three to five high-signal questions at a time. The goal is to surface the implicit knowledge in your head: domain definitions, data schemas, failure modes, and trade-off preferences.

**What the agent should ask:** "How are we defining Lead Time versus Cycle Time for this specific organization? What is the schema of the incoming JSON? How should the system handle missing data points?"

**Your role:** Answer with as much raw context as possible. Do not worry about formatting. Get the "why" and "how" out. The agent will structure it later.

This is [context engineering](../../getting-started/prompting-disciplines/#2-context-engineering) in practice: you are building the information environment the specification will formalize.

### Phase 3: Drafting (Specification)

Once the agent has enough context, ask it to synthesize the conversation into a structured specification.

{{< code-collapse title="Prompt: synthesize into specification" >}}
Based on our discussion, generate the first draft of the specification
document. Structure it as: Intent Description, User-Facing Behavior
(BDD scenarios), Feature Description (architectural constraints),
Task Decomposition, and Acceptance Criteria (including evaluation
design with test cases). Ensure the Task Decomposition follows a
planner-worker pattern where tasks are broken into sub-two-hour chunks.
{{< /code-collapse >}}

The sections map to the [agent delivery contract](../first-class-artifacts/) and the [specification engineering](../../getting-started/prompting-disciplines/#4-specification-engineering-the-new-ceiling) skill set. The agent drafts. You review using the same [four-step cycle](#the-pattern) described at the top of this page.

### Phase 4: Stress-Test Review

Before finalizing, ask the agent to find gaps in its own output.

{{< code-collapse title="Prompt: stress-test the specification" >}}
Critique this specification. Where would a junior developer or an
autonomous agent get confused? What constraints are still too vague?
What edge cases are missing from the evaluation design?
{{< /code-collapse >}}

This is the same validation step as the [specification consistency check](#validating-the-complete-specification-set), applied to the discovery loop's output.

### How This Differs from Turn-by-Turn Prompting

| Step | Turn-by-turn prompting | Discovery loop |
|------|----------------------|----------------|
| Beginning | Write a long prompt and hope for the best | State a high-level goal and ask to be interviewed |
| Development | Fix the agent's code mistakes turn by turn | Fix the specification until it is agent-proof |
| Quality | Eyeball the result | Define evaluation design (test cases) up front |
| Hand-off | Copy-paste code into the editor | Hand the specification to a long-running worker |

The discovery loop front-loads the work where it is cheapest: in conversation, before any code exists.

{{% alert title="Tip: the running context log" color="info" %}}
During long discovery conversations, ask the agent to maintain a running context log of key decisions. This prevents core decisions from getting lost in the middle of the [context window](../../glossary/#context-window) as the conversation grows. The context log becomes the raw material for Phase 3.
{{% /alert %}}

The [complete specification example](#complete-specification-example) below shows the output this workflow produces.

## Complete Specification Example

The four specification stages produce concise, structured documents. The example below shows what a complete specification looks like when all four disciplines from [The Four Prompting Disciplines](../../getting-started/prompting-disciplines/) are applied. This is a real-scale example, not a simplified illustration.

Notice what makes this specification agent-executable: every section is self-contained, acceptance criteria are verifiable by an independent observer, the decomposition defines clear module boundaries, and test cases include known-good outputs.

{{< alert title="Full specification: VSM-Automator (Alpha)" color="info" >}}
{{< code-collapse title="Complete specification example: VSM-Automator" lang="markdown" >}}
# Specification: VSM-Automator (Alpha)

## 1. Intent Description

The goal is to build a web-based tool that visualizes the flow of software
delivery from "Commit" to "Production." The application must consume a
standardized JSON export of DORA metrics and Git events to render a horizontal
chevron-style map. It must calculate Lead Time, Cycle Time, and Process
Efficiency without manual data entry for the calculations.

## 2. Feature Description

**Musts:**

- Use TypeScript and React for the frontend to ensure type safety
- Implement D3.js or Mermaid.js for the flow visualization
- Data must stay in the local browser session (no external database for Alpha)

**Must Nots:**

- Do not use proprietary UI libraries (keep it to Tailwind CSS)
- Do not allow data uploads exceeding 10MB

**Preferences:**

- Prefer functional programming patterns over class-based components
- Prioritize dark mode as the default UI

**Escalation Triggers:**

- If the provided JSON schema is missing "Deployment Frequency" data, stop and
  ask the user for a fallback mapping strategy

## 3. Task Decomposition

This project is decomposed into four independent executable modules:

**Module A: Data Parsing and Normalization**

- Input: Raw JSON blob
- Output: A normalized ValueStream object containing an array of Stage objects
- Requirement: Handle date-string conversion to Unix timestamps for math
  operations

**Module B: Calculation Engine**

- Input: ValueStream object
- Logic:
  - Lead Time = Deployment Timestamp - First Commit Timestamp
  - Process Efficiency = (Active Work Time / Total Lead Time) x 100
- Output: Summary statistics object

**Module C: Visualization Layer**

- Input: Summary statistics and normalized stages
- Requirement: Render a responsive SVG where the width of each chevron is
  proportional to the time spent in that stage (logarithmic scale preferred
  if outliers exist)

**Module D: Export/Reporting**

- Input: Rendered SVG
- Output: Downloadable PNG or PDF report

## 4. Acceptance Criteria

1. The user can drag and drop a sample_data.json file, and a map renders in
   under 500ms
2. The calculated "Lead Time" on the screen matches the manual calculation of
   (TotalTime / NumberOfItems) within a 1% margin of error
3. Clicking a "Stage" chevron displays a modal showing the specific Git SHAs
   or Jira IDs associated with that bottleneck

## 5. Evaluation Design

**Test Case 1 (The Happy Path):** Upload a 5-stage pipeline with linear
timestamps. Result: Map renders correctly with 20% Process Efficiency.

**Test Case 2 (The Bottleneck):** Upload data where "Testing" takes 90% of
the total time. Result: The "Testing" chevron visually dominates the UI and
is highlighted in red.

**Test Case 3 (The Null Set):** Upload an empty JSON array. Result: System
displays a graceful "No Data Found" state rather than crashing.
{{< /code-collapse >}}
{{< /alert >}}

**What to notice:**

- **Self-contained:** An agent receiving only this document can implement without asking clarifying questions. That is the [self-containment test](../../getting-started/prompting-disciplines/#the-self-containment-test).
- **Decomposed with boundaries:** Each module has explicit inputs and outputs. An [orchestrator](../../glossary/#orchestrator) can route each module to a separate agent session (see [Small-Batch Sessions](../../architecture/small-batch-sessions/)).
- **Acceptance criteria are observable:** Each criterion describes a user-visible outcome, not an internal implementation detail. These map directly to [Acceptance Criteria](../first-class-artifacts/#4-acceptance-criteria).
- **Test cases include expected outputs:** The evaluation design gives the agent known-good results to verify against, which is the [specification engineering](../../getting-started/prompting-disciplines/#4-specification-engineering-the-new-ceiling) skill of evaluation design.

## Related Content

- [The ACD Workflow](../../) - the full workflow these tips support
- [Agent Delivery Contract](../first-class-artifacts/) - detailed definitions of each artifact
- [The Four Prompting Disciplines](../../getting-started/prompting-disciplines/) - the skill framework that produces specifications like the example above
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - why changes must stay small enough for frequent, safe deployment
