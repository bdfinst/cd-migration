---
title: "Agent-Assisted Specification"
linkTitle: "Agent-Assisted Specification"
weight: 2
description: >
  How to use agents as collaborators during specification and why small-scope specification is not big upfront design.
---

{{% pageinfo %}}
The specification stages of the [ACD workflow](../) (Intent Definition, Behavior Specification, Architecture Specification, and Acceptance Criteria) ask humans to define intent, behavior, architecture, and acceptance criteria before any code generation begins. This page explains how agents accelerate that work and why the effort stays small.
{{% /pageinfo %}}

## This Is Not Big Upfront Design

The specification stages look heavy if you imagine writing them for an entire feature set. That is not what happens.

**You specify the next small step forward in the product roadmap.** A single user story. One thin vertical slice of functionality. The scope stays small because continuous delivery requires it: every change must be small enough to deploy safely and frequently.

There is a deeper reason the scope must stay small. Every feature built but not tested in production increases the risk that you are building the wrong thing, even if you build it the right way. A detailed specification for three months of work does not reduce this risk. It amplifies it. You invest more in the plan, which makes it harder to change direction when production feedback tells you the plan was wrong.

Big upfront design fails because it front-loads decisions and defers feedback. Small-scope specification succeeds because it front-loads clarity on *one* change and gets production feedback before specifying the next.

If your specification effort for a single change takes more than a short conversation, the change is too large. Split it.

## How Agents Help with Intent Definition

The intent description does not need to be perfect on the first draft. Write a rough version and use an agent to sharpen it.

**Ask the agent to find ambiguity.** Give it your draft intent and ask it to identify anything vague, any assumption that a developer might interpret differently than you intended, or any unstated constraint.

Example [prompt](../../glossary/#prompt):

```
Here is the intent description for my next change. Identify any
ambiguity, unstated assumptions, or missing context that could
lead to an implementation that technically satisfies this description
but does not match what I actually want.

[paste intent description]
```

**Ask the agent to suggest edge cases.** Agents are good at generating boundary conditions you might not think of, because they can quickly reason through combinations.

**Ask the agent to simplify.** If the intent covers too much ground, ask the agent to suggest how to split it into smaller, independently deliverable changes.

The human still owns the intent. The agent is a sounding board that catches gaps before they become defects.

## How Agents Help with Behavior Specification

Writing BDD scenarios from scratch is slow. Agents can draft them and surface gaps you would otherwise miss.

**Generate initial scenarios from the intent.** Give the agent your intent description and ask it to produce Gherkin scenarios covering the expected behavior.

Example prompt:

```
Based on this intent description, generate BDD scenarios in Gherkin
format. Cover the primary success path, key error paths, and edge
cases. For each scenario, explain why it matters.

[paste intent description]
```

**Review for completeness, not perfection.** The agent's first draft will cover the obvious paths. Your job is to read through them and ask: "What is missing?" The agent handles volume. You handle judgment.

**Ask the agent to find gaps.** After reviewing the initial scenarios, ask the agent explicitly what scenarios are missing.

Example prompt:

```
Here are the BDD scenarios for this feature. What scenarios are
missing? Consider boundary conditions, concurrent access, failure
modes, and interactions with existing behavior.

[paste scenarios]
```

**Ask the agent to challenge weak scenarios.** Some scenarios may be too vague to constrain an implementation. Ask the agent to identify any scenario where two different implementations could both pass while producing different user-visible behavior.

The human decides which scenarios to keep. The agent ensures you considered more scenarios than you would have on your own.

## How Agents Help with Architecture Specification and Acceptance Criteria

The Architecture Specification and Acceptance Criteria stages define the technical boundaries: where the change fits in the system, what constraints apply, and what non-functional requirements must be met.

**Ask the agent to suggest architectural considerations.** Give it the intent, the BDD scenarios, and a description of the current system architecture. Ask what integration points, dependencies, or constraints you should document.

Example prompt:

```
Given this intent and these BDD scenarios, what architectural
decisions should I document before implementation begins? Consider
where this change fits in the existing system, what components it
touches, and what constraints an implementer needs to know.

Current system context: [brief architecture description]
```

**Ask the agent to draft non-functional acceptance criteria.** Agents can suggest performance thresholds, security requirements, and resource limits based on the type of change and its context.

Example prompt:

```
Based on this feature description, suggest non-functional acceptance
criteria I should define. Consider latency, throughput, security,
resource usage, and operational requirements. For each criterion,
explain why it matters for this specific change.

[paste feature description]
```

**Ask the agent to check consistency.** Once you have the intent, BDD scenarios, feature description, and acceptance criteria, ask the agent to identify any contradictions or gaps between them.

The human makes the architectural decisions and sets the thresholds. The agent makes sure you did not leave anything out.

## The Pattern

Every use of the agent in the specification stages follows the same pattern:

1. **Human drafts** - write the first version based on your understanding
2. **Agent critiques** - ask the agent to find gaps, ambiguity, or inconsistency
3. **Human decides** - accept, reject, or modify the agent's suggestions
4. **Agent refines** - generate an updated version incorporating your decisions

This is not the agent doing specification for you. It is the agent making your specification more thorough than it would be without help, in less time than it would take without help.

## Related Content

- [The ACD Workflow](../) - the full workflow these tips support
- [The Six First-Class Artifacts](../first-class-artifacts/) - detailed definitions of each artifact
- [Small Batches](../../migrate-to-cd/migration-path/optimize/small-batches/) - why changes must stay small enough for frequent, safe deployment
