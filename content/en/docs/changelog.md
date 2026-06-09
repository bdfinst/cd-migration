---
title: "Changelog"
linkTitle: "Changelog"
weight: 99
sidebar_divider_above: true
description: >
  Notable updates to the CD migration guide.
---

## 2026-06-09 - Testing content critical-review fixes

Resolved internal contradictions and weak examples surfaced by a review of the testing content:

- Reconciled when a real database may run in the pre-merge suite. A team-controlled, per-test-isolated testcontainer is now consistently described as in-band and deterministic across [Architecting Tests for CD]({{< relref "/docs/testing" >}}), [Pipeline Test Strategy]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/pipeline-test-strategy" >}}), and [Getting Started]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/getting-started" >}}); only shared or external systems are forbidden in-band. Stopped mislabeling testcontainers as "in-memory fakes."
- Disambiguated the overloaded term "integration test." Added a section to [Integration Tests]({{< relref "/docs/testing/test-types/integration" >}}) distinguishing the out-of-band check from the in-band [adapter integration test]({{< relref "/docs/testing/glossary#adapter-integration-test" >}}), and corrected the in-band pipeline figure caption (contract tests, not integration tests).
- Replaced the Java unit-test example in [Unit Tests]({{< relref "/docs/testing/test-types/unit" >}}) with a sociable test of real domain logic; the previous mock pass-through asserted nothing meaningful.
- Clarified in [Architecting Tests for CD]({{< relref "/docs/testing" >}}) that acceptance gates fire on deterministic thresholds even when the underlying test is statistical, so the "do not gate on non-deterministic tests" rule no longer reads as a contradiction.
- Conditioned the "delete the corresponding E2E tests" migration step in [Testing Antipatterns]({{< relref "/docs/testing/antipatterns" >}}) on the out-of-band double validation actually running.
- Softened the cognitive-science framing in [Test Feedback Speed]({{< relref "/docs/testing/feedback-speed" >}}): the 10-minute target is a CD convention the research aligns with, not a figure derived from it, and Nielsen's thresholds are no longer cited beyond what they measured.
- Made the contract-first example in [Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}) validate against the OpenAPI schema instead of hand-checking fields, and qualified the "always deterministic" and "regression-tested" claims.

## 2026-05-06 - Restructure CD Testing menu into "Testing Tips"

Renamed the testing section's sidebar entry from "CD Testing" to "Testing Tips" and reorganized:

- New [Test Types]({{< relref "/docs/testing/test-types" >}}) subsection containing the six test-type definition pages (unit, component, contract, integration, end-to-end, static analysis).
- Renamed "Improving Existing Test Suites" to [Testing Antipatterns]({{< relref "/docs/testing/antipatterns" >}}).
- Reordered the section sidebar: Feedback Speed first (sets the why), then Test Types, Applied Strategies, Antipatterns, Glossary.
- Folded the standalone Test Doubles page into the [Glossary]({{< relref "/docs/testing/glossary#test-double" >}}) (the five flavours, when to use each) and the [Antipatterns]({{< relref "/docs/testing/antipatterns" >}}) page (over-mocking, complex mock setup). The standalone page is removed; the old URL redirects to the glossary.
- Shortened the testing glossary's sidebar entry from "Testing Glossary" to "Glossary" since the section context already implies "testing."
- Dropped the "Pattern N:" numbering from the eight component-pattern pages in Applied Testing Strategies; titles now read plainly (API Provider, Scheduled Job, etc.). The cross-references in the body and the patterns landing list updated accordingly.

Old URLs (`/docs/testing/unit/`, `/docs/testing/improving-test-suites/`, etc.) redirect via Hugo aliases.

## 2026-05-05 - Add per-pattern coverage diagrams to Applied Testing Strategies

Added a "layers tested by each test type" coverage matrix diagram to each of the eight pattern pages in [Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies/patterns" >}}). Each diagram shows the architectural layers as rows, the relevant test types as columns, and marks each cell as real code under test, doubled, or not exercised, so a reader can see at a glance which tests cover which layers and where doubles need their own validation.

## 2026-05-05 - Reframe in-process / out-of-process as in-band / out-of-band

Replaced the in-process / out-of-process terminology with [in-band](testing/glossary/#in-band-test) / [out-of-band](testing/glossary/#out-of-band-test) throughout Applied Testing Strategies. The new framing centres on [pipeline](reference/glossary/#pipeline) placement (does the test gate delivery?) rather than process boundary (does the SUT run in the test process?), which is the distinction that actually matters for [CD](reference/glossary/#cd-continuous-delivery).

- New glossary entries: [In-Band Test]({{< relref "/docs/testing/glossary#in-band-test" >}}) and [Out-of-Band Test]({{< relref "/docs/testing/glossary#out-of-band-test" >}}).
- Cross-cutting principles 1 and 2 merged into one principle on in-band vs out-of-band.
- "Assembled component (in-process)" / "Assembled component (out-of-process)" rows in pattern tables collapsed into a single [Component test](testing/glossary/#component-test) row.
- Pattern 4 (UI) renamed JSDOM vs headless browser distinction in plain terms.
- Cost and time budget table: "Out-of-process count" column dropped; replaced with explicit in-band suite budgets.

## 2026-05-05 - Break Applied Testing Strategies into a subsection of CD Testing

Broke the long single Applied Testing Strategies page into a subsection of [Architecting Tests for CD]({{< relref "/docs/testing" >}}). New layout:

- [Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}) subsection landing with the three-point goal, terminology, and six cross-cutting principles.
- [Pre-ship Checklist]({{< relref "/docs/testing/applied-testing-strategies/pre-ship-checklist" >}}).
- [Patterns]({{< relref "/docs/testing/applied-testing-strategies/patterns" >}}) sub-subsection with one page per pattern (API provider, API consumer, scheduled job, user interface, event consumer, event producer, CLI/library, stateful service).
- [Cross-cutting Concerns]({{< relref "/docs/testing/applied-testing-strategies/cross-cutting-concerns" >}}) covering authn/authz, database migrations, fixtures, observability, performance, mutation testing, flake handling, and time budgets.

## 2026-05-05 - Restructure Applied Testing Strategies; add Improving Existing Test Suites

Following an editorial review, restructured Applied Testing Strategies for scannability and to remove duplication with neighboring testing pages. Cross-cutting principles compressed to short pointers to the pages that own each topic. The pre-ship checklist moved to the top. Pattern 2's negative test list became a Fault / Expected behavior / Test mechanism table. Patterns 5 to 8 marked as deliberately briefer sketches.

Split the anti-patterns catalog and migration guidance into a new sister page, [Improving Existing Test Suites]({{< relref "/docs/testing/antipatterns" >}}), so that each page has one job: applied-testing-strategies is the pattern reference; improving-test-suites is the rework guide.

## 2026-05-05 - Add Applied Testing Strategies guide

Added [Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}) to the testing section. A practical guide covering positive cases, negative cases, double validation, and [pipeline](reference/glossary/#pipeline) placement for eight common component patterns: API providers, API consumers, scheduled jobs, user interfaces, event consumers, event producers, CLI tools and libraries, and stateful services. Includes seven cross-cutting principles, an anti-patterns catalog, migration guidance for existing test suites, code examples per pattern, cross-cutting concerns (authn/authz, migrations, fixtures, observability, performance, mutation testing, flake handling, time budgets), and a per-component checklist.

## 2026-03-21 - New Section: Evaluation and Quality

Added three new pages under [Evaluation and Quality]({{< relref "/docs/agentic-cd/evaluation" >}}):

- [AI Eval Methodology]({{< relref "/docs/agentic-cd/evaluation/ai-eval-methodology" >}}) - Three-layer grading framework (deterministic, transcript, LLM rubric) and eval development cycle for AI coding tools
- [Team AI Evals]({{< relref "/docs/agentic-cd/evaluation/team-ai-evals" >}}) - Setting up eval infrastructure, writing positive and negative tests, choosing graders, and CI integration for team AI tools
- [Platform AI Evals]({{< relref "/docs/agentic-cd/evaluation/platform-ai-evals" >}}) - Shared eval infrastructure, multi-plugin architecture, and meta-evaluation for AI enablement platforms

## 2026-03-17 - Redesign triage with pain-first guided flow and persona pages

Redesigned the [Multi-Symptom Selector]({{< relref "/docs/triage/multi-symptom" >}}) to use a 3-step pain-first flow: pick high-level pain points, check relevant symptoms (sorted by impact), then see contextual results. Removed the role/persona filter in favor of shared ownership. Added impact indicators to symptoms derived from anti-pattern count. Added [For Agile Coaches]({{< relref "/docs/triage/for-agile-coaches" >}}) curated reading list alongside existing developer and manager lists. Moved all persona pages into [Triage Your Problems]({{< relref "/docs/triage" >}}), renamed the section, and removed redundant triage entry points from the homepage.

## 2026-03-16 - Replace guided triage with multi-symptom selector and team health check

Retired the guided triage questionnaire. [Find Your Problems]({{< relref "/docs/triage" >}}) now offers two self-service tools: a [Multi-Symptom Selector]({{< relref "/docs/triage/multi-symptom" >}}) that lets individuals check symptoms filtered by their role (manager, scrum master, developer) and see ranked anti-patterns, and a [Team Health Check]({{< relref "/docs/triage/health-check" >}}) worksheet organized by seven delivery areas for use in retrospectives and team assessments. Both tools surface anti-patterns without requiring a facilitator.

## 2026-03-13 - Replace triage accordion with interactive questionnaire

Replaced the static nested accordion on [Find Your Symptom]({{< relref "/docs/triage" >}}) with an interactive probing questionnaire. The questionnaire asks about the presenting problem, then probes deeper to surface the real underlying cause before linking to the symptom page. Question tree and results are defined in `data/triage.yaml`; deep linking via URL hash is supported.

## 2026-03-13 - Add DORA benchmarking symptom page

Added [The Team Is Chasing DORA Benchmarks]({{< relref "/docs/symptoms/visibility/chasing-dora-benchmarks" >}}) symptom page covering teams that treat [DORA metrics](reference/glossary/#dora-metrics) as performance targets rather than diagnostic tools.

## 2026-03-12 - Add Team Chatbot page

Added [Team Chatbot]({{< relref "/docs/team-chatbot" >}}) - a downloadable facilitator chatbot setup that teams paste into any LLM to get a [CD](reference/glossary/#cd-continuous-delivery) migration guide that diagnoses their situation and points to relevant site resources.

## 2026-03-12 - Improve leading vs lagging metrics framing across site

Added [DORA Metrics as Delivery Improvement Goals]({{< relref "/docs/anti-patterns/organizational-cultural/planning/dora-metrics-as-goals" >}}) anti-pattern page covering the misuse of DORA metrics as OKRs and performance targets. Updated [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) to lead with [CI](reference/glossary/#ci-continuous-integration) health metrics (leading indicators) before DORA outcome metrics. Updated [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}) and the [Metrics reference index]({{< relref "/docs/reference/metrics" >}}) to distinguish leading indicators from lagging DORA outcome metrics. Updated all eight individual metric reference pages with explicit indicator type labeling.

## 2026-03-12 - Add Improvement Plays section

Added [Improvement Plays]({{< relref "/docs/playbook" >}}) as a new top-level section. Eight standalone plays covering common delivery challenges: [baseline metrics](reference/glossary/#baseline-metrics), story slicing, stopping the line, deleting long-lived branches, test-before-fix, pipeline automation, [WIP](reference/glossary/#wip-work-in-progress) limits, and definition of [deployable](reference/glossary/#deployable).

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

Expanded [Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}) to cover:

- Consumer contract testing - what the consumer is trying to discover (fields I depend on, types, status codes)
- Provider contract testing - what the provider is trying to discover (breaking changes to any consumer)
- Consumer-driven contract development (CDC) - consumers write expectations, providers verify against them
- Contract-first development - contracts defined upfront as formal [artifacts](reference/glossary/#artifact) (OpenAPI, Protobuf), teams develop in parallel
- Guidance on when to prefer each approach

## 2026-03-09 - Testing Taxonomy: E2E Absorbs Integration, Integration Forwarding Page

- [End-to-End Tests]({{< relref "/docs/testing/test-types/e2e" >}}) now covers the full spectrum of tests involving real [external dependencies](reference/glossary/#external-dependency) - from two services with a real database to a full-system browser test. Notes that this is also called "integration testing" in the industry, with a terminology section explaining the naming landscape.
- Added [Integration Tests]({{< relref "/docs/testing/test-types/integration" >}}) as a terminology forwarding page explaining where different uses of "integration test" map in this site's taxonomy.

## 2026-03-09 - Testing Taxonomy: Component Tests, Integration Test Redefinition

Restructured the testing reference section with a clearer taxonomy:

- Added [Component Tests]({{< relref "/docs/testing/test-types/component" >}}) - a new test type covering frontend components and backend services tested through their public interface with test doubles for all external dependencies. Absorbs and replaces the former Functional Tests page (old URL redirects automatically).
- Redefined [Integration Tests]({{< relref "/docs/testing/test-types/integration" >}}) to mean tests against real external dependencies (actual databases, live downstream services) in a controlled environment. Documents the complexity this brings: test data management, non-determinism risks, slower execution, and environment availability. Integration tests only belong in the pipeline if they can be kept deterministic.
- Updated [Unit Tests]({{< relref "/docs/testing/test-types/unit" >}}) to clarify the solitary vs. sociable distinction.
- Added Exploratory Testing and Usability Testing to the architecture table as non-blocking activities.
- Added Component Test, Integration Test, [Sociable Unit Test](testing/glossary/#sociable-unit-test), and [Solitary Unit Test](testing/glossary/#solitary-unit-test) entries to the [Testing Glossary]({{< relref "/docs/testing/glossary" >}}).

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
