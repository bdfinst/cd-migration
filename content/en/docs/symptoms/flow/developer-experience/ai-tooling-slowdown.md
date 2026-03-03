---
title: "AI Tooling Slows You Down Instead of Speeding You Up"
linkTitle: "AI tooling slowdown"
description: >
  It takes longer to explain the task to the AI, review the output, and fix the mistakes than it
  would to write the code directly.
tags:
  - team-dynamics
  - work-decomposition
---

## What you are seeing

A developer opens an AI chat window to implement a function. They spend ten minutes writing a
[prompt](../../../reference/glossary/#prompt) that describes the requirements, the constraints, the existing patterns in the codebase,
and the edge cases. The AI generates code. The developer reads through it line by line because
they have no [acceptance criteria](../../../reference/glossary/#acceptance-criteria) to verify against. They spot that it uses a different pattern
than the rest of the codebase and misses a constraint they mentioned. They refine the prompt.
The AI produces a second version. It is better but still wrong in a subtle way. The developer
fixes it by hand. Total time: forty minutes. Writing it themselves would have taken fifteen.

This is not a one-time learning curve. It happens repeatedly, on different tasks, across the
team. Developers report that AI tools help with boilerplate and unfamiliar syntax but actively
slow them down on tasks that require domain knowledge, codebase-specific patterns, or
non-obvious constraints. The promise of "10x productivity" collides with the reality that
without clear acceptance criteria, reviewing AI output means auditing the implementation
detail by detail - which is often harder than writing the code from scratch.

## Common causes

### Poor Work Decomposition for AI

AI assistants work best on small, well-defined tasks with clear acceptance criteria. When
developers hand the AI a large, underspecified task - "implement the billing reconciliation
feature" - the AI produces a large, plausible-looking implementation that has no clear
criteria to verify against. The developer falls into reviewing implementation line by line
because they have no checklist of expected behaviors to test. The time spent prompting,
reviewing, and fixing exceeds the time to implement incrementally.

The fix is not to stop using AI. It is to decompose work into pieces small enough that
acceptance criteria are obvious and the developer can verify the output against them quickly.

**Read more:** [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}})

### Missing Working Agreements on AI Usage

When the team has no shared understanding of which tasks benefit from AI and which do not,
developers default to using AI on everything. Some tasks - writing a parser for a well-defined
format, generating test fixtures, scaffolding boilerplate - are good AI targets. Other tasks -
implementing complex business rules, debugging production issues, refactoring code with
implicit constraints - are poor AI targets because the context transfer cost exceeds the
implementation cost.

Without a shared agreement, each developer discovers this boundary independently through wasted
time.

**Read more:** [No Shared Workflow Expectations]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})

### Knowledge Silos

When domain knowledge is concentrated in a few people, the acceptance criteria for domain-heavy
work exist only in those people's heads. They can implement the feature faster than they can
articulate the criteria for an AI prompt. For developers who do not have the domain knowledge,
using AI is equally slow because they lack the criteria to validate the output against. Both
situations produce slowdowns for different reasons - and both trace back to domain knowledge
that has not been made explicit.

**Read more:** [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}})

## How to narrow it down

1. **Are developers spending more time writing prompts and reviewing AI output than they would
   spend writing the code?** If the prompting-reviewing-fixing cycle consistently takes longer
   than direct implementation, the tasks being delegated to AI are too large or too
   domain-specific. Start with
   [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}) and decompose
   work into smaller pieces before involving AI.
2. **Does the team have a shared understanding of which tasks are good AI targets?** If
   individual developers are discovering this through trial and error, the team needs [working
   agreements](../../../reference/glossary/#working-agreement). Start with the
   [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) to identify
   appropriate use cases.
3. **Are the slowest AI interactions on tasks that require deep domain knowledge?** If AI
   struggles most where implicit business rules govern the implementation, the problem is
   not the AI tool but the knowledge distribution. Start with
   [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}).

---

**Ready to fix this?** Start with the [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) to identify which tasks benefit from AI and which do not, then decompose work accordingly.

## Related Content

- [AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}) - Related symptom where AI speed comes at the cost of comprehension
- [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}) - Common failure modes when teams adopt AI coding tools
- [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) - Staged approach to adopting AI tools safely
- [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - Breaking work into pieces small enough for fast feedback
- [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}) - The anti-pattern of large, underspecified tasks
