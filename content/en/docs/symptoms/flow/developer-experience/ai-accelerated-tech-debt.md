---
title: "AI Is Generating Technical Debt Faster Than the Team Can Absorb It"
linkTitle: "AI-accelerated tech debt"
description: >
  AI tools produce working code quickly, but the codebase is accumulating duplication,
  inconsistent patterns, and structural problems faster than the team can address them.
tags:
  - team-dynamics
  - work-decomposition
---

## What you are seeing

The team adopted AI coding tools six months ago. Feature velocity increased. But the codebase
is getting harder to work in. Each AI-assisted session produces code that works - it passes
tests, it satisfies the [acceptance criteria](../../../reference/glossary/#acceptance-criteria) - but it does not account for what already exists.
The AI generates a new utility function that duplicates one three files away. It introduces a
third pattern for error handling in a module that already has two. It copies a data access
approach that the team decided to move away from last quarter.

Nobody catches these issues in review because the review standard is "does it do what it
should and how do we validate it" - which is the right standard for correctness, but it does
not address structural fitness. The acceptance criteria say what the change should do. They do
not say "and it should use the existing error handling pattern" or "and it should not duplicate
the date formatting utility."

The debt is invisible in metrics. Test coverage is stable or improving. [Change failure rate](../../../reference/glossary/#change-failure-rate-cfr) is
flat. But [development cycle time](../../../reference/glossary/#development-cycle-time) is creeping up because every new change must navigate around
the inconsistencies the previous changes introduced. Refactoring is harder because the AI
generated code in patterns the team did not choose and would not have written.

## Common causes

### No Scheduled Refactoring Sessions

AI generates code faster than humans refactor it. Without deliberate maintenance sessions
scoped to cleaning up recently touched files, the codebase drifts toward entropy faster than
it would with human-paced development. The team treats refactoring as something that happens
organically during feature work, but AI-assisted feature sessions are scoped to their
acceptance criteria and do not include cleanup.

The fix is not to allow AI to refactor during feature sessions - that mixes concerns and
makes commits unreviewable. It is to schedule explicit refactoring sessions with their own
intent, [constraints](../../../reference/glossary/#constraint), and acceptance criteria (all existing tests still pass, no behavior
changes).

**Read more:** [Pitfalls and Metrics - Schedule refactoring as explicit sessions]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics#schedule-refactoring-as-explicit-sessions" >}})

### No Review Gate for Structural Quality

The team's review process validates correctness (does it satisfy acceptance criteria?) and
security (does it introduce vulnerabilities?) but not structural fitness (does it fit the
existing codebase?). Standard review [agents](../../../reference/glossary/#agent-ai) check for logic errors, security defects, and
performance issues. None of them check whether the change duplicates existing code, introduces
a third pattern where one already exists, or violates the team's architectural decisions.

Automating structural quality checks requires two layers in the pre-commit gate sequence.

**Layer 1: Deterministic tools**

Deterministic tools run before any AI review and catch mechanical structural problems without
[token](../../../reference/glossary/#token) cost. These run in milliseconds and cannot be confused by plausible-looking but incorrect
code. Add them to the pre-commit hook sequence alongside lint and type checking:

- **Duplication detection** (e.g., jscpd) - flags when the same code block already exists
  elsewhere in the codebase. When AI generates a utility that already exists three files away,
  this catches it before review.
- **Complexity thresholds** (e.g., ESLint complexity rule, lizard) - flags functions that exceed
  a cyclomatic complexity limit. AI-generated code tends toward deeply nested conditionals when
  the [prompt](../../../reference/glossary/#prompt) does not specify a complexity budget.
- **Dependency and architecture rules** (e.g., dependency-cruiser, ArchUnit) - encode module
  boundary constraints as code. When the team decided to move away from a direct database access
  pattern, architecture rules make violations a build failure rather than a code review comment.

These tools encode decisions the team has already made. Each one removes a category of
structural drift from the review queue entirely.

**Layer 2: Semantic review agent with architectural constraints**

The semantic review agent can catch structural drift that deterministic tools cannot detect -
like a third error-handling approach in a module that already has two - but only if the feature
description includes architectural constraints. If the feature description covers only functional
requirements, the agent has no basis for evaluating structural fit.

Add a constraints section to the feature description for every change:

- "Use the existing UserRepository pattern - do not introduce new data access approaches"
- "Error handling in this module follows the Result type pattern - do not introduce exceptions"
- "New utilities belong in the shared/utils directory - do not create module-local utilities"

When the agent generates code that violates a stated constraint, the semantic review agent
flags it. Without stated constraints, the agent cannot distinguish deliberate new patterns
from drift.

The two layers are complementary. Deterministic tools handle mechanical violations fast and
cheaply. The semantic review agent handles intent alignment and pattern consistency, but only
where the feature description defines what those patterns are.

**Read more:** [Coding and Review Agent Configuration - Semantic Review Agent]({{< relref "/docs/agentic-cd/architecture/agent-configuration#semantic-review-agent" >}})

### Rubber-Stamping AI-Generated Code

When developers do not own the change - cannot articulate what it does, what criteria they
verified, or how they would detect a failure - they also do not evaluate whether the change
fits the codebase. Structural quality requires someone to notice that the AI reinvented
something that already exists. That noticing only happens when a human is engaged enough with
the change to compare it against their knowledge of the existing system.

**Read more:** [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}})

## How to narrow it down

1. **Does the pre-commit gate include duplication detection, complexity limits, and
   architecture rules?** If the only automated structural check is lint, the gate catches
   style violations but not structural drift. Add deterministic structural tools to the hook
   sequence described in
   [Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration#hooks" >}}).
2. **Do feature descriptions include architectural constraints, not just functional
   requirements?** If the feature description only says what the change should do but not how
   it should fit structurally, the semantic review agent has no basis for checking pattern
   conformance. Start by adding constraints to the
   [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#3-feature-description-constraint-architecture" >}}).
3. **Is the team scheduling explicit refactoring sessions after feature work?** If cleanup
   only happens incidentally during feature sessions, debt accumulates with every AI-assisted
   change. Start with the
   [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics#after-adoption-sustaining-quality-over-time" >}})
   guidance on scheduling maintenance sessions after every three to five feature sessions.
4. **Can developers identify where a new change duplicates existing code?** If nobody in the
   review process is comparing the AI's output against existing utilities and patterns, the
   team is not engaged enough with the change to catch structural drift. Start with
   [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}).

---

**Ready to fix this?** Start with the pre-commit gate. Add duplication detection and architecture
rules to the hook sequence from [Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration#hooks" >}}),
then add architectural constraints to your feature description template. These two changes automate
detection of the most common structural drift patterns on every change.

## Related Content

- [Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}) - Pre-commit hook sequence and semantic review agent setup
- [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) - Including architectural constraints in feature descriptions
- [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}) - Common failure modes and sustainability practices for AI-assisted development
- [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}) - The review anti-pattern that allows structural drift
- [AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}) - Related symptom where correctness is the gap, not structure
- [Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}) - Session discipline that keeps changes small and reviewable
