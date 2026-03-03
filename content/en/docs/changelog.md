---
title: "Changelog"
linkTitle: "Changelog"
weight: 99
sidebar_divider_above: true
description: >
  Notable updates to the CD migration guide.
---

## 2026-03-03 - Site-Wide Restructure for Navigation and Discoverability

Major reorganization to reduce sidebar depth, group related content, and improve discoverability.

### Migrate to CD

- Flattened the migration path: removed the intermediate `migration-path/` directory so phases (assess, foundations, pipeline, optimize, continuous-deployment) are direct children of [Migrate to CD]({{< relref "/docs/migrate-to-cd" >}})

### Symptoms

- Split the 32-page [Flow Symptoms]({{< relref "/docs/symptoms/flow" >}}) section into four subcategories: Integration, Work Management, Developer Experience, and Team Knowledge

### Anti-Patterns

- Split the 26 [Organizational-Cultural]({{< relref "/docs/anti-patterns/organizational-cultural" >}}) anti-patterns into three subcategories: Governance & Process, Team Dynamics, and Planning

### Reference Section

- Created a new [Reference]({{< relref "/docs/reference" >}}) section consolidating practices, metrics, testing, pipeline reference architecture, defect sources, glossary, FAQ, [DORA](reference/glossary/#dora-metrics) capabilities, dependency tree, and resources

### Infrastructure

- Converted approximately 4,000 relative links to Hugo `relref` shortcodes
- Added 100+ permanent redirects for all moved pages
- Updated `content-map.yml` to reflect new structure
- Added organizational/process category to the triage page
- Simplified the docs landing page to minimal routing
- Removed the a11y [CI](reference/glossary/#ci-continuous-integration) job (run on demand locally instead)

## 2026-03-02 - Agentic CD: Sidebar Reorganization

Grouped the 12 flat Agentic CD pages into four subsections for easier navigation:

- **[Getting Started]({{< relref "/docs/agentic-cd/getting-started" >}})** - configuration, learning curve, prompting disciplines, and adoption roadmap
- **[Specification & Contracts]({{< relref "/docs/agentic-cd/specification" >}})** - agent delivery contract and agent-assisted specification
- **[Agent Architecture]({{< relref "/docs/agentic-cd/architecture" >}})** - architecture patterns, coding and review setup, and small-batch sessions
- **[Operations & Governance]({{< relref "/docs/agentic-cd/operations" >}})** - pipeline enforcement, tokenomics, and pitfalls and metrics

All old URLs redirect to their new locations via Hugo aliases.

## 2026-03-02 - Agentic CD: Prompting Disciplines, Specification Workflow, Terminology Alignment, and Structural Cleanup

### New content

- **[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})** - New page covering the four layers of skill developers must master as AI moves from chat partner to long-running worker: Prompt Craft, Context Engineering, Intent Engineering, and Specification Engineering. Includes the synchronous-to-autonomous skill shift, the self-containment test, the planner-worker architecture, and organizational impact.

- **[The Discovery Loop]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#the-discovery-loop-from-conversation-to-specification" >}})** - New section in Agent-Assisted Specification describing a four-phase conversational workflow for producing structured specifications: Initial Framing, Deep-Dive Interview, Drafting, and Stress-Test Review.

- **[Complete Specification Example]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#complete-specification-example" >}})** - Full VSM-Automator specification demonstrating what the discovery loop produces: intent description, feature description, task decomposition, acceptance criteria, and evaluation design.

- **[Acceptance Criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}})** - New glossary entry defining acceptance criteria as concrete expectations usable as fitness functions, executed as deterministic tests or evaluated by review agents.

### Terminology alignment

Standardized artifact and workflow stage names across the Agentic CD section so the same concepts use the same terms everywhere:

### Structural cleanup

Reduced duplication and inconsistency across the Agentic CD section. Content that was restated in multiple pages now has a single authoritative source with cross-references:
