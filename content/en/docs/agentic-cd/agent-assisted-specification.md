---
title: "Agent-Assisted Specification"
linkTitle: "Agent-Assisted Specification"
weight: 4
description: >
  How to use agents as collaborators during specification and why small-scope specification is not big upfront design.
---

{{% pageinfo %}}
The specification stages of the [ACD workflow](../) (Intent Definition, Behavior Specification, Architecture Specification, and Acceptance Criteria) ask humans to define intent, behavior, architecture, and acceptance criteria before any code generation begins. This page explains how [agents](../../glossary/#agent-ai) accelerate that work and why the effort stays small.
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

## How Agents Help with Intent Definition

The intent description does not need to be perfect on the first draft. Write a rough version and use an agent to sharpen it.

**Ask the agent to find ambiguity.** Give it your draft intent and ask it to identify anything vague, any assumption that a developer might interpret differently than you intended, or any unstated [constraint](../glossary/#constraint).

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

## How Agents Help with Behavior Specification

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

## How Agents Help with Architecture Specification and Acceptance Criteria

The Architecture Specification and Acceptance Criteria stages define the technical boundaries: where the change fits in the system, what constraints apply, and what non-functional requirements must be met.

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

The four specification stages produce four [artifacts](../glossary/#artifact): intent description, BDD scenarios, feature description, and acceptance criteria. Each can look reasonable in isolation but still conflict with the others. Before moving to test generation and implementation, validate them as a set.

**Use an agent as a specification reviewer.** Give it all four artifacts and ask it to check for internal consistency.

{{% alert title="Specification consistency prompt" color="info" %}}

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

{{% /alert %}}

**The human gates on this review before implementation begins.** If the review agent identifies issues, resolve them before generating any test code or implementation. A conflict caught in specification costs minutes. The same conflict caught during implementation costs a session.

This review is not a bureaucratic checkpoint. It is the last moment where the cost of a change is near zero. After this gate, every issue becomes more expensive to fix.

## Related Content

- [The ACD Workflow](../) - the full workflow these tips support
- [The Six First-Class Artifacts](../first-class-artifacts/) - detailed definitions of each artifact
- [Small Batches](../../migrate-to-cd/migration-path/optimize/small-batches/) - why changes must stay small enough for frequent, safe deployment
