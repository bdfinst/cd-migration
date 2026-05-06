---
aliases:
  - /docs/symptoms/refactoring-breaks-tests/
title: "Refactoring Breaks Tests"
linkTitle: "Refactoring breaks tests"
description: >
  Internal code changes that do not alter behavior cause widespread test failures.
tags:
  - test-strategy
  - architecture
---

## What you are seeing

A developer renames a method, extracts a class, or reorganizes modules - changes that should not
affect external behavior. But dozens of tests fail. The failures are not catching real bugs.
They are breaking because the tests depend on implementation details that changed.

Developers start avoiding refactoring because the cost of updating tests is too high. Code
quality degrades over time because cleanup work is too expensive. When someone does refactor,
they spend more time fixing tests than improving the code.

## Common causes

### Inverted Test Pyramid

When the test suite is dominated by end-to-end and integration tests, those tests tend to be
tightly coupled to implementation details - CSS selectors, API response shapes, DOM structure,
or specific sequences of internal calls. A refactoring that changes none of the observable
behavior still breaks these tests because they assert on how the system works rather than what
it does.

Unit tests focused on behavior ("given this input, expect this output") survive refactoring.
Tests coupled to implementation ("this method was called with these arguments") do not.

**Read more:** [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}})

### Tightly Coupled Monolith

When components lack clear interfaces, tests reach into the internals of other modules. A
refactoring in module A breaks tests for module B - not because B's behavior changed, but
because B's tests were calling A's internal methods directly. Without well-defined boundaries,
every internal change ripples across the test suite.

**Read more:** [Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

## How to narrow it down

1. **Do the broken tests assert on internal method calls, mock interactions, or DOM structure?**
   If yes, the tests are coupled to implementation rather than behavior. This is a test design
   issue - start with [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}) for guidance
   on building a behavior-focused test suite.
2. **Are the broken tests end-to-end or UI tests that fail because of layout or selector
   changes?** If yes, you have too many tests at the wrong level of the pyramid. Start with
   [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}).
3. **Do the broken tests span multiple modules - testing code in one area but breaking because
   of changes in another?** If yes, the problem is missing boundaries between components. Start
   with [Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}).

**Ready to fix this?** The most common cause is [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [High Coverage but Tests Miss Defects]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - Tests that verify implementation often create high coverage without catching bugs
- [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}) - Over-reliance on integration and E2E tests amplifies this problem
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Test architecture that supports refactoring
- [Unit Tests]({{< relref "/docs/testing/test-types/unit" >}}) - Black box testing that survives internal changes
- [Test Doubles]({{< relref "/docs/testing/glossary#test-double" >}}) - Using test doubles without coupling to implementation
