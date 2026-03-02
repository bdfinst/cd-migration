---
title: "Changelog"
linkTitle: "Changelog"
weight: 99
sidebar_divider_above: true
description: >
  Notable updates to the CD migration guide.
---

## 2026-03-02 - Agentic CD: Prompting Disciplines, Specification Workflow, and Terminology Alignment

### New content

- **[The Four Prompting Disciplines](../agentic-cd/prompting-disciplines/)** - New page covering the four layers of skill developers must master as AI moves from chat partner to long-running worker: Prompt Craft, Context Engineering, Intent Engineering, and Specification Engineering. Includes the synchronous-to-autonomous skill shift, the self-containment test, the planner-worker architecture, and organizational impact.

- **[The Discovery Loop](../agentic-cd/agent-assisted-specification/#the-discovery-loop-from-conversation-to-specification)** - New section in Agent-Assisted Specification describing a four-phase conversational workflow for producing structured specifications: Initial Framing, Deep-Dive Interview, Drafting, and Stress-Test Review.

- **[Complete Specification Example](../agentic-cd/agent-assisted-specification/#complete-specification-example)** - Full VSM-Automator specification demonstrating what the discovery loop produces: self-contained problem statement, constraint architecture, task decomposition, acceptance criteria, and evaluation design.

- **[Acceptance Criteria](../glossary/#acceptance-criteria)** - New glossary entry defining acceptance criteria as concrete expectations usable as fitness functions, executed as deterministic tests or evaluated by review agents.

### Terminology alignment

Standardized artifact and workflow stage names across the Agentic CD section so the same concepts use the same terms everywhere:

- **Workflow stages now match artifact names.** "Intent Definition" became "Intent Description." "Behavior Specification" became "User-Facing Behavior." "Architecture Specification" became "Feature Description."
- **"Executable Truth" renamed to "Acceptance Criteria."** The old name described the mechanism (tests). The new name describes the purpose (concrete expectations that can be executed or evaluated).
- **Feature Description restructured as Constraint Architecture.** The example now uses Musts, Must Nots, Preferences, and Escalation Triggers to clearly separate hard boundaries from soft preferences.

### Pages updated

`_index.md`, `first-class-artifacts.md`, `agent-assisted-specification.md`, `learning-curve.md`, `adoption-roadmap.md`, `pipeline-enforcement.md`, `pitfalls-and-metrics.md`, `tokenomics.md`, `small-batch-sessions.md`, `agent-configuration.md`, `testing/_index.md`, `symptoms/testing/high-coverage-ineffective-tests.md`, `glossary.md`
