---
title: "Changelog"
linkTitle: "Changelog"
weight: 99
sidebar_divider_above: true
description: >
  Notable updates to the CD migration guide.
---

## 2026-03-14 - New Section: Evaluation and Quality

Added three new pages under [Evaluation and Quality]({{< relref "/docs/agentic-cd/evaluation" >}}):

- [AI Eval Methodology]({{< relref "/docs/agentic-cd/evaluation/ai-eval-methodology" >}}) - Three-layer grading framework (deterministic, transcript, LLM rubric) and eval development cycle for AI coding tools
- [Team AI Evals]({{< relref "/docs/agentic-cd/evaluation/team-ai-evals" >}}) - Setting up eval infrastructure, writing positive and negative tests, choosing graders, and CI integration for team AI tools
- [Platform AI Evals]({{< relref "/docs/agentic-cd/evaluation/platform-ai-evals" >}}) - Shared eval infrastructure, multi-plugin architecture, and meta-evaluation for AI enablement platforms

## 2026-03-13 - Add DORA benchmarking symptom page

Added [The Team Is Chasing DORA Benchmarks]({{< relref "/docs/symptoms/visibility/chasing-dora-benchmarks" >}}) symptom page covering teams that treat DORA metrics as performance targets rather than diagnostic tools.

## 2026-03-12 - Add Team Chatbot page

Added [Team Chatbot]({{< relref "/docs/team-chatbot" >}}) - a downloadable facilitator chatbot setup that teams paste into any LLM to get a CD migration guide that diagnoses their situation and points to relevant site resources.

## 2026-03-12 - Improve leading vs lagging metrics framing across site

Added [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}) anti-pattern page covering the misuse of DORA metrics as OKRs and performance targets. Updated [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) to lead with CI health metrics (leading indicators) before DORA outcome metrics. Updated [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}) and the [Metrics reference index]({{< relref "/docs/reference/metrics" >}}) to distinguish leading indicators from lagging DORA outcome metrics. Updated all eight individual metric reference pages with explicit indicator type labeling.

## 2026-03-12 - Add Improvement Plays section

Added [Improvement Plays]({{< relref "/docs/playbook" >}}) as a new top-level section. Eight standalone plays covering common delivery challenges: baseline metrics, story slicing, stopping the line, deleting long-lived branches, test-before-fix, pipeline automation, WIP limits, and definition of deployable.

## 2026-03-12 - Add symptom page for test automation lag

Added [Test Automation Always Lags Behind Development]({{< relref "/docs/symptoms/testing/test-automation-lags-development" >}}) to the testing symptoms section. Covers the pattern where manual QA runs first and automation is written from those results, including a before/after workflow diagram and causes linked to Testing Only at the End, Siloed QA Team, and Manual Testing Only.

## 2026-03-12 - Systems thinking improvements to Migrate to CD

Applied systems thinking analysis to the Migrate to CD section. Changes across six files:

- Added the fear amplification loop explanation and leadership conditions to the main [Migrate to CD]({{< relref "/docs/migrate-to-cd" >}}) index
- Clarified that phases overlap and are not a strict sequence
- Named DORA metrics explicitly in [Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) and framed them as continuous tracking, not a Phase 3 concern
- Reframed phase gate criteria from "you're ready when" to "start investing when making consistent progress toward" across Phases 1, 2, and 3
- Added a "What to Expect" section to [Brownfield CD]({{< relref "/docs/migrate-to-cd/brownfield" >}}) covering the valley of despair, organizational lag, and the role of metrics in sustaining buy-in

## 2026-03-09 - Add Synthetic Monitoring to Testing Glossary

Added [Synthetic Monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}) definition to the Testing Glossary.

## 2026-03-09 - Testing Section Moved to Top-Level, Renamed "Architecting Tests for CD"

Moved the Testing section from `/docs/reference/testing/` to `/docs/testing/` as a peer of the Reference section, renamed to [Architecting Tests for CD]({{< relref "/docs/testing" >}}). All old URLs redirect via Hugo aliases. Updated all cross-references across the site.

## 2026-03-09 - Contract Testing: Consumer/Provider and CDC vs. Contract-First

Expanded [Contract Tests]({{< relref "/docs/testing/contract" >}}) to cover:

- Consumer contract testing - what the consumer is trying to discover (fields I depend on, types, status codes)
- Provider contract testing - what the provider is trying to discover (breaking changes to any consumer)
- Consumer-driven contract development (CDC) - consumers write expectations, providers verify against them
- Contract-first development - contracts defined upfront as formal artifacts (OpenAPI, Protobuf), teams develop in parallel
- Guidance on when to prefer each approach

## 2026-03-09 - Testing Taxonomy: E2E Absorbs Integration, Integration Forwarding Page

- [End-to-End Tests]({{< relref "/docs/testing/e2e" >}}) now covers the full spectrum of tests involving real external dependencies - from two services with a real database to a full-system browser test. Notes that this is also called "integration testing" in the industry, with a terminology section explaining the naming landscape.
- Added [Integration Tests]({{< relref "/docs/testing/integration" >}}) as a terminology forwarding page explaining where different uses of "integration test" map in this site's taxonomy.

## 2026-03-09 - Testing Taxonomy: Component Tests, Integration Test Redefinition

Restructured the testing reference section with a clearer taxonomy:

- Added [Component Tests]({{< relref "/docs/testing/component" >}}) - a new test type covering frontend components and backend services tested through their public interface with test doubles for all external dependencies. Absorbs and replaces the former Functional Tests page (old URL redirects automatically).
- Redefined [Integration Tests]({{< relref "/docs/testing/integration" >}}) to mean tests against real external dependencies (actual databases, live downstream services) in a controlled environment. Documents the complexity this brings: test data management, non-determinism risks, slower execution, and environment availability. Integration tests only belong in the pipeline if they can be kept deterministic.
- Updated [Unit Tests]({{< relref "/docs/testing/unit" >}}) to clarify the solitary vs. sociable distinction.
- Added Exploratory Testing and Usability Testing to the architecture table as non-blocking activities.
- Added Component Test, Integration Test, Sociable Unit Test, and Solitary Unit Test entries to the [Testing Glossary]({{< relref "/docs/testing/glossary" >}}).

## 2026-03-07 - Agentic CD Glossary Split

- Moved 30 AI and agentic-specific terms from the [main glossary]({{< relref "/docs/reference/glossary" >}}) into a dedicated [Agentic CD Glossary]({{< relref "/docs/agentic-cd/glossary" >}}).
- Main glossary retains stub entries that redirect to the new glossary for each moved term.

## 2026-03-06 - Testing Fundamentals Restructured into Subsection

- Restructured [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) from a single long page into a subsection with four focused child pages: [What to Test]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/what-to-test" >}}), [Pipeline Test Strategy]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/pipeline-test-strategy" >}}), [Getting Started]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/getting-started" >}}), and [Defect Feedback Loop]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/defect-feedback-loop" >}}).
- Added four SVG diagrams to Pipeline Test Strategy showing tests inside the [pipeline](reference/glossary/#pipeline), tests outside the pipeline, the contract test validation loop, and the full pipeline test architecture.

## 2026-03-06 - Repository Readiness for Agentic Development

- Added [Repository Readiness]({{< relref "/docs/agentic-cd/getting-started/repo-readiness" >}}) - a new getting-started page covering readiness scoring, upgrade sequence, agent-friendly test structure, build ergonomics, and the link between repository quality and agent accuracy/[token](reference/glossary/#token) efficiency.

## 2026-03-03 - AI Tech Debt: Layered Detection and Stage 5 Spec References

- Updated [AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}) to describe the two-layer approach for automated structural quality detection: deterministic tools (duplication detection, complexity limits, architecture rules) as the first layer and the semantic review agent with architectural constraints as the second layer.
- Fixed Stage 5 in [The Agentic Development Learning Curve]({{< relref "/docs/agentic-cd/getting-started/learning-curve" >}}) to reference [Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}) and [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) directly from the spec-first workflow description.
- Fixed placeholder `{{< relref "/docs" >}}` links across all Agentic CD pages to point to the correct destinations.

## 2026-03-03 - New Triage Problems: AI Coding and Test Environment Reset

Added four new triage problems with supporting content:

- [AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}) - new symptom page for teams where AI output ships without critical review
- [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}) - new anti-pattern with fix steps for establishing review standards for AI output
- [AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}}) - new symptom page for teams where AI tools add overhead instead of reducing it
- [Test Environments Take Too Long to Reset Between Runs]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}}) - new symptom page for slow environment and database reset blocking regression testing
- [AI Is Generating Technical Debt Faster Than the Team Can Absorb It]({{< relref "/docs/symptoms/flow/developer-experience/ai-accelerated-tech-debt" >}}) - new symptom page for AI-generated structural drift, tied to agentic-cd refactoring guidance

Updated the [triage page]({{< relref "/docs/triage" >}}) with entries for all five problems, including a pointer to existing content for developer assignment to unfamiliar components.

## 2026-03-03 - Glossary: Dependency and External Dependency

Added [Dependency]({{< relref "/docs/reference/glossary#dependency" >}}) and [External Dependency]({{< relref "/docs/reference/glossary#external-dependency" >}}) definitions to the glossary, clarifying the distinction between internal and external dependencies and when test doubles are appropriate.

## 2026-03-03 - Site-Wide Restructure for Navigation and Discoverability

Major reorganization to reduce sidebar depth, group related content, and improve discoverability.

### Migrate to CD

- Flattened the migration path: removed the intermediate `migration-path/` directory so phases (assess, foundations, [pipeline](reference/glossary/#pipeline), optimize, continuous-deployment) are direct children of [Migrate to CD]({{< relref "/docs/migrate-to-cd" >}})

### Symptoms

- Split the 32-page [Flow Symptoms]({{< relref "/docs/symptoms/flow" >}}) section into four subcategories: Integration, Work Management, Developer Experience, and Team Knowledge

### Anti-Patterns

- Split the 26 [Organizational-Cultural]({{< relref "/docs/anti-patterns/organizational-cultural" >}}) anti-patterns into three subcategories: Governance & Process, Team Dynamics, and Planning

### Reference Section

- Created a new [Reference]({{< relref "/docs/reference" >}}) section consolidating practices, metrics, testing, [pipeline](reference/glossary/#pipeline) reference architecture, defect sources, glossary, FAQ, [DORA](reference/glossary/#dora-metrics) capabilities, dependency tree, and resources

### Infrastructure

- Converted approximately 4,000 relative links to Hugo `relref` shortcodes
- Added 100+ permanent redirects for all moved pages
- Updated `content-map.yml` to reflect new structure
- Added organizational/process category to the triage page
- Simplified the docs landing page to minimal routing
- Removed the a11y [CI](reference/glossary/#ci-continuous-integration) job (run on demand locally instead)

## 2026-03-02 - Agentic CD: Sidebar Reorganization

Grouped the 12 flat Agentic [CD](reference/glossary/#cd-continuous-delivery) pages into four subsections for easier navigation:

- **[Getting Started]({{< relref "/docs/agentic-cd/getting-started" >}})** - configuration, learning curve, [prompting disciplines](reference/glossary/#prompting-discipline), and adoption roadmap
- **[Specification & Contracts]({{< relref "/docs/agentic-cd/specification" >}})** - agent [delivery contract](reference/glossary/#delivery-contract) and agent-assisted specification
- **[Agent Architecture]({{< relref "/docs/agentic-cd/architecture" >}})** - architecture patterns, coding and review setup, and small-batch sessions
- **[Operations & Governance]({{< relref "/docs/agentic-cd/operations" >}})** - pipeline enforcement, [tokenomics](reference/glossary/#tokenomics), and pitfalls and metrics

All old URLs redirect to their new locations via Hugo aliases.

## 2026-03-02 - Agentic CD: Prompting Disciplines, Specification Workflow, Terminology Alignment, and Structural Cleanup

### New content

- **[The Four Prompting Disciplines]({{< relref "/docs/agentic-cd/getting-started/prompting-disciplines" >}})** - New page covering the four layers of skill developers must master as AI moves from chat partner to long-running worker: [Prompt Craft](reference/glossary/#prompt-craft), [Context Engineering](reference/glossary/#context-engineering), [Intent Engineering](reference/glossary/#intent-engineering), and [Specification Engineering](reference/glossary/#specification-engineering). Includes the synchronous-to-autonomous skill shift, the self-containment test, the planner-worker architecture, and organizational impact.

- **[The Discovery Loop]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#the-discovery-loop-from-conversation-to-specification" >}})** - New section in Agent-Assisted Specification describing a four-phase conversational workflow for producing structured specifications: Initial Framing, Deep-Dive Interview, Drafting, and Stress-Test Review.

- **[Complete Specification Example]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification#complete-specification-example" >}})** - Full VSM-Automator specification demonstrating what the discovery loop produces: intent description, feature description, task decomposition, [acceptance criteria](reference/glossary/#acceptance-criteria), and [evaluation design](reference/glossary/#evaluation-design).

- **[Acceptance Criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}})** - New glossary entry defining acceptance criteria as concrete expectations usable as fitness functions, executed as deterministic tests or evaluated by review agents.

### Terminology alignment

Standardized [artifact](reference/glossary/#artifact) and workflow stage names across the Agentic CD section so the same concepts use the same terms everywhere:

### Structural cleanup

Reduced duplication and inconsistency across the Agentic CD section. Content that was restated in multiple pages now has a single authoritative source with cross-references:
