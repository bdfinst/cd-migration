---
title: "Changelog"
linkTitle: "Changelog"
weight: 99
sidebar_divider_above: true
description: >
  Notable updates to the CD migration guide.
---

## 2026-03-02 - Agentic CD: Prompting Disciplines, Specification Workflow, Terminology Alignment, and Structural Cleanup

### New content

- **[The Four Prompting Disciplines](../agentic-cd/prompting-disciplines/)** - New page covering the four layers of skill developers must master as AI moves from chat partner to long-running worker: Prompt Craft, Context Engineering, Intent Engineering, and Specification Engineering. Includes the synchronous-to-autonomous skill shift, the self-containment test, the planner-worker architecture, and organizational impact.

- **[The Discovery Loop](../agentic-cd/agent-assisted-specification/#the-discovery-loop-from-conversation-to-specification)** - New section in Agent-Assisted Specification describing a four-phase conversational workflow for producing structured specifications: Initial Framing, Deep-Dive Interview, Drafting, and Stress-Test Review.

- **[Complete Specification Example](../agentic-cd/agent-assisted-specification/#complete-specification-example)** - Full VSM-Automator specification demonstrating what the discovery loop produces: intent description, feature description, task decomposition, acceptance criteria, and evaluation design.

- **[Acceptance Criteria](../glossary/#acceptance-criteria)** - New glossary entry defining acceptance criteria as concrete expectations usable as fitness functions, executed as deterministic tests or evaluated by review agents.

### Terminology alignment

Standardized artifact and workflow stage names across the Agentic CD section so the same concepts use the same terms everywhere:

- **Workflow stages now match artifact names.** "Intent Definition" became "Intent Description." "Behavior Specification" became "User-Facing Behavior." "Architecture Specification" became "Feature Description."
- **"Executable Truth" renamed to "Acceptance Criteria."** The old name described the mechanism (tests). The new name describes the purpose (concrete expectations that can be executed or evaluated).
- **Feature Description restructured as Constraint Architecture.** The example now uses Musts, Must Nots, Preferences, and Escalation Triggers to clearly separate hard boundaries from soft preferences.
- **Specification example aligned to artifact names.** "Self-Contained Problem Statement" became "Intent Description." "Constraint Architecture" became "Feature Description." Discovery loop prompt updated to reference the first-class artifact names directly.

### Structural cleanup

Reduced duplication and inconsistency across the Agentic CD section. Content that was restated in multiple pages now has a single authoritative source with cross-references:

- **Renamed "The Six First-Class Artifacts" to "[Agent Delivery Contract](../agentic-cd/first-class-artifacts/)."** Dropped the enumeration and replaced the jargon term with a name that signals what the page delivers: the contract that governs how agents participate in the delivery pipeline.
- **Added User-Facing Behavior to the artifact authority hierarchy.** Previously omitted from the hierarchy table with a footnote. Now a top-level row (priority 2) that feeds into Acceptance Criteria alongside non-functional requirements stated as architectural constraints in the Feature Description.
- **Consolidated context loading order.** The canonical definition lives in [Configuration Quick Start](../agentic-cd/agent-setup/#context-loading-order). Other pages reference it instead of restating it.
- **Consolidated session summary format.** The canonical template lives in [Small-Batch Sessions](../agentic-cd/small-batch-sessions/#the-context-summary). The orchestrator rules and `/end-session` skill reference it instead of duplicating it.
- **Simplified the section index page.** Removed the duplicated artifact definitions and workflow stage table. Replaced with brief orienting text and links to the dedicated pages.
- **Standardized page name cross-references.** All links to the Coding & Review Setup page now use "Coding & Review Setup" consistently. Previously referenced as "Agent Configuration," "Coding Agent Configuration," and "Coding & Review Setup" across different pages.
- **Fixed sidebar weight collisions.** Adoption Roadmap and Prompting Disciplines both had weight 3. Reassigned weights 1-12 to match the section index reading order.
- **Standardized glossary link paths.** Normalized `../../glossary/` to `../glossary/` in pages that used inconsistent relative paths.
- **Removed duplicate skill definitions from Configuration Quick Start.** Replaced four identical tabbed `/start-session` examples with a compact table showing file locations per tool, referencing Coding & Review Setup for the complete definitions.
- **Fixed broken link syntax** in agent-assisted-specification.md (nested markdown link).
- **Fixed broken relative path** in prompting-disciplines.md (work decomposition link was one level short).

### Pages updated

`_index.md`, `first-class-artifacts.md`, `agent-assisted-specification.md`, `learning-curve.md`, `adoption-roadmap.md`, `pipeline-enforcement.md`, `pitfalls-and-metrics.md`, `tokenomics.md`, `small-batch-sessions.md`, `agent-configuration.md`, `agent-setup.md`, `agentic-architecture.md`, `prompting-disciplines.md`, `testing/_index.md`, `symptoms/testing/high-coverage-ineffective-tests.md`, `glossary.md`
