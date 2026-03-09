---
title: "Defect Feedback Loop"
linkTitle: "Defect Feedback Loop"
weight: 4
description: >
  How to trace defects to their origin and make systemic changes that prevent entire categories of bugs from recurring.
---

Treat every test failure as diagnostic data about where your process breaks down, not just as
something to fix. When you identify the systemic source of defects, you can prevent entire
categories from recurring.

Two questions sharpen this thinking:

1. **What is the earliest point we can detect this defect?** The later a defect is found, the
   more expensive it is to fix. A requirements defect caught during example mapping costs
   minutes. The same defect caught in production costs days of incident response, [rollback]({{< relref "/docs/reference/glossary#rollback" >}}),
   and rework.
2. **Can AI help us detect it earlier?** AI-assisted tools can now surface defects at stages
   where only human review was previously possible, shifting detection left without adding
   manual effort.

## Trace Every Defect to Its Origin

When a test catches a defect (or worse, when a defect escapes to production) ask: **where was
this defect introduced, and what would have prevented it from being created?**

Defects do not originate randomly. They cluster around specific causes. The
[CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/)
documents over 30 defect types across eight categories, with detection methods, AI
opportunities, and systemic fixes for each.

| Category | Example Defects | Earliest Detection | Systemic Fix |
|----------|----------------|-------------------|-------------|
| **Requirements** | Building the right thing wrong, or the wrong thing right | Discovery, during story refinement or example mapping | [Acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}}) as user outcomes, Three Amigos sessions, example mapping |
| **Missing domain knowledge** | Business rules encoded incorrectly, tribal knowledge loss | During coding, when the developer writes the logic | Ubiquitous language (DDD), pair programming, rotate ownership |
| **Integration boundaries** | Interface mismatches, wrong assumptions about upstream behavior | During design, when defining the interface contract | Contract tests per boundary, API-first design, circuit breakers |
| **Untested edge cases** | Null handling, boundary values, error paths | Pre-commit, through null-safe type systems and static analysis | Property-based testing, boundary value analysis, test for every bug fix |
| **Unintended side effects** | Change to module A breaks module B | At commit time, when [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) runs the full test suite | Small commits, [trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}), [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}), modular design |
| **Accumulated complexity** | Defects cluster in the most complex, most-changed files | Continuously, through static analysis in the IDE and CI | Refactoring as part of every story, dedicated complexity budget |
| **Process and deployment** | Long-lived branches, manual [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) steps, excessive batching | Pre-commit for branch age; CI for pipeline and batching issues | Trunk-based development, automate every step, [blue/green]({{< relref "/docs/reference/glossary#blue-green-deployment" >}}) or [canary]({{< relref "/docs/reference/glossary#canary-deployment" >}}) deploys |
| **Data and state** | Null pointer exceptions, schema migration failures, concurrency issues | Pre-commit for null safety; CI for schema compatibility | Null-safe types, expand-then-contract for schema changes, design for idempotency |

For the complete catalog covering all defect categories (including product and discovery,
dependency and infrastructure, testing and observability gaps, and more) see the
[CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/).

## Build a Defect Feedback Loop

You need a process that systematically connects test
failures to root causes and root causes to systemic fixes.

1. **Classify every defect.** When a test fails or a bug is reported, tag it with its origin
   category from the tables above. This takes seconds and builds a dataset over time.
2. **Look for patterns.** Monthly (or during retrospectives), review the defect
   classifications. Which categories appear most often? That is where your process is weakest.
3. **Apply the systemic fix, not just the local fix.** When you fix a bug, also ask: what
   systemic change would prevent this entire category of bug? If most defects come from
   integration boundaries, the fix is not "write more integration tests." It is "make contract
   tests mandatory for every new boundary." If most defects come from untested edge cases, the
   fix is not "increase code coverage." It is "adopt property-based testing as a standard
   practice."
4. **Measure whether the fix works.** Track defect counts by category over time. If you
   applied a systemic fix for integration boundary defects and the count does not drop, the fix
   is not working and you need a different approach.

## The Test-for-Every-Bug-Fix Rule

**Every bug fix must include a test that reproduces the bug before the fix and passes after.**
This is non-negotiable for [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) because:

- It proves the fix actually addresses the defect (not just the symptom).
- It prevents the same defect from recurring.
- It builds test coverage exactly where the codebase is weakest: the places where bugs actually
  occur.
- Over time, it shifts your test suite from "tests we thought to write" to "tests that cover
  real failure modes."

## Advanced Detection Techniques

As your test architecture matures, add techniques that catch defects before manual review:

| Technique | What It Finds | When to Adopt |
|-----------|---------------|---------------|
| **Mutation testing** (Stryker, PIT) | Tests that pass but do not actually verify behavior (your test suite's blind spots) | When basic coverage is in place but defect escape rate is not dropping |
| **Property-based testing** | Edge cases and boundary conditions across large input spaces that example-based tests miss | When defects cluster around unexpected input combinations |
| **Chaos engineering** | Failure modes in distributed systems: what happens when a [dependency]({{< relref "/docs/reference/glossary#dependency" >}}) is slow, returns errors, or disappears | When you have component tests and contract tests in place and need confidence in failure handling |
| **Static analysis and linting** | Null safety violations, type errors, security vulnerabilities, dead code | From day one. These are cheap and fast |

For more examples of mapping defect origins to detection methods and systemic corrections, see
the [CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/).

---

## Related Content

- [Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}) - Detailed reference for each defect category
- [High Coverage, Ineffective Tests]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - When tests pass but do not catch real defects
- [Refactoring Breaks Tests]({{< relref "/docs/symptoms/testing/refactoring-breaks-tests" >}}) - Tests that break on implementation changes
- [Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}) - Where defect pattern review fits in the improvement cycle
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - Using defect escape rate as a key metric
