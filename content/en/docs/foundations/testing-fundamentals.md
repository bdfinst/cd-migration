---
title: "Testing Fundamentals"
linkTitle: "Testing Fundamentals"
weight: 2
description: >
  Build a fast, reliable test suite that gives you confidence to deploy frequently.
---

{{% pageinfo %}}
**Phase 1 — Foundations** | Adapted from [Dojo Consortium](https://dojoconsortium.org)

Before you can trust your pipeline, you need a test suite that is fast, deterministic, and catches real defects. This page establishes the testing foundation required for continuous delivery — the practices that transform testing from a bottleneck into an accelerator.
{{% /pageinfo %}}

## Why Testing Is a Foundation

Trunk-based development requires that trunk always be releasable. The only way to know trunk is releasable is to test it — automatically, on every change. Without a reliable test suite, daily integration is just daily risk.

In many organizations, testing is the single biggest obstacle to CD adoption. Not because teams lack tests, but because the tests they have are slow, flaky, and poorly structured. This page addresses that directly.

## Testing Goals for CD

Your test suite must meet three criteria before it can support continuous delivery:

| Goal | Target | Why |
|------|--------|-----|
| **Fast** | Full suite completes in under 10 minutes | Developers need feedback before context-switching |
| **Deterministic** | Same code always produces the same test result | Flaky tests destroy trust and get ignored |
| **Catches real bugs** | Tests fail when behavior is wrong, not when implementation changes | Brittle tests create noise, not signal |

If your test suite does not meet these criteria today, improving it is your highest-priority foundation work.

## The Testing Anti-Pattern: The Ice Cream Cone

Most teams that struggle with CD have an inverted test distribution — too many slow, expensive end-to-end tests and too few fast, focused unit tests.

**The Ice Cream Cone (anti-pattern):**

```
        ┌─────────────────────────┐
        │    Manual Testing       │  ← Most testing happens here
        ├─────────────────────────┤
        │   End-to-End Tests      │  ← Slow, flaky, expensive
        ├─────────────────────────┤
        │  Integration Tests      │  ← Some, but not enough
        ├───────────┤
        │Unit Tests │              ← Too few
        └───────────┘
```

**The Right Pattern: The Testing Pyramid**

```
        ┌───────────┐
        │  E2E      │              ← Few, focused on critical paths
        ├───────────────────┤
        │  Integration Tests      │  ← Moderate, test boundaries
        ├─────────────────────────┤
        │      Unit Tests         │  ← Many, fast, focused
        └─────────────────────────┘
```

The testing pyramid is not a rigid ratio. The principle is: **push testing as low as possible**. Every test that can be a unit test should be. Only write integration tests for behavior that spans boundaries. Only write E2E tests for critical user journeys that cannot be verified any other way.

## Week 1 Action Plan

If your test suite is not yet ready to support CD, use this focused action plan to make immediate progress.

### Day 1-2: Audit Your Current Test Suite

Assess where you stand before making changes.

**Actions:**

- Run your full test suite 3 times. Note total duration and any tests that pass intermittently (flaky tests).
- Count tests by type: unit, integration, functional, end-to-end.
- Identify tests that require external dependencies (databases, APIs, file systems) to run.
- Record your baseline: total test count, pass rate, duration, flaky test count.

**Output:** A clear picture of your test distribution and the specific problems to address.

### Day 2-3: Fix or Remove Flaky Tests

Flaky tests are worse than no tests. They train developers to ignore failures, which means real failures also get ignored.

**Actions:**

- Quarantine all flaky tests immediately. Move them to a separate suite that does not block the build.
- For each quarantined test, decide: fix it (if the behavior it tests matters) or delete it (if it does not).
- Common causes of flakiness: timing dependencies, shared mutable state, reliance on external services, test order dependencies.
- Target: zero flaky tests in your main test suite by end of week.

### Day 3-4: Add Missing Integration Tests

Integration tests verify that components work together correctly. They catch the bugs that unit tests cannot — mismatched contracts, serialization issues, database query errors.

**Actions:**

- Identify the critical boundaries in your application: database access, API calls, message queues, file I/O.
- Write integration tests for the most important boundaries. Use [test doubles](../../reference/testing/test-doubles/) for external services you do not control.
- Each integration test should set up its own state, verify the behavior, and clean up afterward. No shared state between tests.

### Day 4-5: Implement Test Doubles for External Dependencies

Tests that call real external services are slow, flaky, and cannot run offline. Replace them with test doubles.

**Types of test doubles:**

| Double | Use When |
|--------|----------|
| **Stub** | You need to provide canned responses to calls made during the test |
| **Mock** | You need to verify that specific calls were made |
| **Fake** | You need a lightweight implementation (e.g., in-memory database) |
| **Spy** | You need to record calls for later verification |

**Actions:**

- Replace direct calls to external APIs with test doubles in your unit and integration tests.
- Use contract tests (see [Contract Tests](../../reference/testing/contract/)) to verify your doubles match the real service behavior.
- Ensure your test doubles are maintained when the real service interface changes.

### Day 5: Reduce E2E Test Scope

End-to-end tests are valuable but expensive. Most teams have too many.

**Actions:**

- Identify your E2E tests. How many do you have? How long do they take?
- Keep only E2E tests that cover critical user journeys — the paths where failure would have the highest business impact (e.g., user signup, payment processing, core workflow).
- For each E2E test you remove, verify the same behavior is covered by a combination of unit and integration tests.
- Target: E2E tests should be less than 10% of your total test count.

## Testing Matrix

Use this reference to decide what type of test to write for a given scenario.

| What You Need to Verify | Test Type | Speed | Reliability | See Also |
|--------------------------|-----------|-------|-------------|----------|
| A single function or method behaves correctly | [Unit](../../reference/testing/unit/) | Milliseconds | Very high | |
| Two components interact correctly | [Integration](../../reference/testing/integration/) | Seconds | High | |
| A user-facing feature works end-to-end | [Functional](../../reference/testing/functional/) | Seconds-minutes | Medium-high | |
| The full system works for a critical user journey | [E2E](../../reference/testing/e2e/) | Minutes | Medium | |
| Your service contract matches the consumer's expectations | [Contract](../../reference/testing/contract/) | Seconds | High | |
| Code quality, security, and style compliance | [Static Analysis](../../reference/testing/static/) | Seconds | Very high | |

## Test-Driven Development (TDD)

TDD is the practice of writing the test before the code. It is the most effective way to build a reliable test suite because it ensures every piece of behavior has a corresponding test.

**The TDD cycle:**

1. **Red:** Write a failing test that describes the behavior you want.
2. **Green:** Write the minimum code to make the test pass.
3. **Refactor:** Improve the code without changing the behavior. The test ensures you do not break anything.

**Why TDD supports CD:**

- Every change is automatically covered by a test
- The test suite grows proportionally with the codebase
- Tests describe behavior, not implementation, making them more resilient to refactoring
- Developers get immediate feedback on whether their change works

TDD is not mandatory for CD, but teams that practice TDD consistently have significantly faster and more reliable test suites.

### Getting Started with TDD

If your team is new to TDD, start small:

1. Pick one new feature or bug fix this week.
2. Write the test first, watch it fail.
3. Write the code to make it pass.
4. Refactor.
5. Repeat for the next change.

Do not try to retroactively TDD your entire codebase. Apply TDD to new code and to any code you modify.

## Best Practices Summary

### Do

- **Run tests on every commit.** If tests do not run automatically, they will be skipped.
- **Keep the test suite under 10 minutes.** If it is slower, developers will stop running it locally.
- **Fix broken tests immediately.** A broken test is equivalent to a broken build.
- **Delete tests that do not provide value.** A test that never fails and tests trivial behavior is maintenance cost with no benefit.
- **Test behavior, not implementation.** Tests should verify what the code does, not how it does it.
- **Use test doubles for external dependencies.** Your tests should run without network access.
- **Maintain the testing pyramid.** Regularly audit your test distribution.

### Do Not

- **Do not tolerate flaky tests.** Quarantine or delete them immediately.
- **Do not write tests after the fact as a checkbox exercise.** Tests written without understanding the behavior they verify add noise, not value.
- **Do not test private methods directly.** Test the public interface; private methods are tested indirectly.
- **Do not share mutable state between tests.** Each test should set up and tear down its own state.
- **Do not use sleep/wait for timing-dependent tests.** Use explicit waits, polling, or event-driven assertions.
- **Do not require a running database or external service for unit tests.** That makes them integration tests — which is fine, but categorize them correctly.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Test suite duration | < 10 minutes | Enables fast feedback loops |
| Flaky test count | 0 in main suite | Maintains trust in test results |
| Test coverage trend | Increasing | Confirms new code is being tested |
| Defect escape rate | Decreasing | Confirms tests catch real bugs |

## Next Step

With a reliable test suite in place, automate your build process so that building, testing, and packaging happens with a single command. Continue to [Build Automation](../build-automation/).

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
