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
intent, constraints, and acceptance criteria (all existing tests still pass, no behavior
changes).

**Read more:** [Pitfalls and Metrics - Schedule refactoring as explicit sessions]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics#schedule-refactoring-as-explicit-sessions" >}})

### No Review Gate for Structural Quality

The team's review process validates correctness (does it satisfy acceptance criteria?) and
security (does it introduce vulnerabilities?) but not structural fitness (does it fit the
existing codebase?). Standard review agents check for logic errors, security defects, and
performance issues. None of them check whether the change duplicates existing code, introduces
a third pattern where one already exists, or violates the team's architectural decisions.

A semantic review agent configured to check intent alignment can partially address this if the
feature description includes architectural constraints. But if the feature description only
covers functional requirements, structural drift will not be flagged.

**Read more:** [Coding and Review Agent Configuration - Semantic Review Agent]({{< relref "/docs/agentic-cd/architecture/agent-configuration#semantic-review-agent" >}})

### Rubber-Stamping AI-Generated Code

When developers do not own the change - cannot articulate what it does, what criteria they
verified, or how they would detect a failure - they also do not evaluate whether the change
fits the codebase. Structural quality requires someone to notice that the AI reinvented
something that already exists. That noticing only happens when a human is engaged enough with
the change to compare it against their knowledge of the existing system.

**Read more:** [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}})

## How to narrow it down

1. **Is the team scheduling explicit refactoring sessions after feature work?** If cleanup
   only happens incidentally during feature sessions, debt accumulates with every AI-assisted
   change. Start with the
   [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics#after-adoption-sustaining-quality-over-time" >}})
   guidance on scheduling maintenance sessions after every three to five feature sessions.
2. **Do feature descriptions include architectural constraints, not just functional
   requirements?** If the feature description only says what the change should do but not how
   it should fit structurally, the AI has no basis for matching existing patterns. Start by
   adding constraints to the
   [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts#3-feature-description-constraint-architecture" >}}).
3. **Can developers identify where a new change duplicates existing code?** If nobody in the
   review process is comparing the AI's output against existing utilities and patterns, the
   team is not engaged enough with the change to catch structural drift. Start with
   [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}).

---

**Ready to fix this?** Start with the [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics#after-adoption-sustaining-quality-over-time" >}}) guidance on sustaining quality after AI adoption. The scheduled refactoring pattern addresses the accumulation directly.

## Related Content

- [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}) - Common failure modes and sustainability practices for AI-assisted development
- [Coding and Review Agent Configuration]({{< relref "/docs/agentic-cd/architecture/agent-configuration" >}}) - Review agent setup including semantic review for intent alignment
- [Agent Delivery Contract]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) - Including architectural constraints in feature descriptions
- [Rubber-Stamping AI-Generated Code]({{< relref "/docs/anti-patterns/testing/rubber-stamping-ai-code" >}}) - The review anti-pattern that allows structural drift
- [AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}) - Related symptom where correctness is the gap, not structure
- [Small-Batch Agent Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}) - Session discipline that keeps changes small and reviewable
