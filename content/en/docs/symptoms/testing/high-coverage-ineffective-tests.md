---
aliases:
  - /docs/symptoms/high-coverage-ineffective-tests/
title: "High Coverage but Tests Miss Defects"
linkTitle: "High coverage, tests miss defects"
description: >
  Test coverage numbers look healthy but defects still reach production.
tags:
  - test-strategy
---

## What you are seeing

Your dashboard shows 80% or 90% code coverage, but bugs keep getting through. Defects show up
in production that feel like they should have been caught. The team points to the coverage
number as proof that testing is solid, yet the results tell a different story.

People start losing trust in the test suite. Some developers stop running tests locally because
they do not believe the tests will catch anything useful. Others add more tests, pushing
coverage higher, without the defect rate improving.

## Common causes

### Inverted Test Pyramid

When most of your tests are end-to-end or integration tests, they exercise many code paths in a
single run - which inflates coverage numbers. But these tests often verify that a workflow
completes without errors, not that each piece of logic produces the correct result. A test that
clicks through a form and checks for a success message covers dozens of functions without
validating any of them in detail.

**Read more:** [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}})

### Pressure to Skip Testing

When teams face pressure to hit a coverage target, testing becomes theater. Developers write
tests with trivial assertions - checking that a function returns without throwing, or that a
value is not null - just to get the number up. The coverage metric looks healthy, but the tests
do not actually verify behavior. They exist to satisfy a gate, not to catch defects.

**Read more:** [Pressure to Skip Testing]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/pressure-to-skip-testing" >}})

### Code Coverage Mandates

When the organization gates the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) on a coverage target, teams optimize for the number
rather than for defect detection. Developers write assertion-free tests, cover trivial code, or
add single integration tests that execute hundreds of lines without validating any of them. The
coverage metric rises while the tests remain unable to catch meaningful defects.

**Read more:** [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}})

### Manual Testing Only

When test automation is absent or minimal, teams sometimes generate superficial tests or rely on
coverage from integration-level runs that touch many lines without asserting meaningful outcomes.
The coverage tool counts every line that executes, regardless of whether any test validates the
result.

**Read more:** [Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}})

## How to narrow it down

1. **Do most tests assert on behavior and expected outcomes, or do they just verify that code
   runs without errors?** If tests mostly check for no-exceptions or non-null returns, the
   problem is testing theater - tests written to hit a number, not to catch defects. Start with
   [Pressure to Skip Testing]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/pressure-to-skip-testing" >}}).
2. **Are the majority of your tests end-to-end or integration tests?** If most of the suite runs
   through a browser, API, or multi-service flow rather than testing units of logic directly,
   start with [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}).
3. **Does the pipeline gate on a specific coverage percentage?** If the team writes tests
   primarily to keep coverage above a mandated threshold, start with
   [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}}).
4. **Were tests added retroactively to meet a coverage target?** If the bulk of tests were
   written after the code to satisfy a coverage gate rather than to verify design decisions,
   start with
   [Pressure to Skip Testing]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/pressure-to-skip-testing" >}}).

**Ready to fix this?** The most common cause is [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Refactoring Breaks Tests]({{< relref "/docs/symptoms/testing/refactoring-breaks-tests" >}}) - Another sign that tests verify implementation instead of behavior
- [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}}) - When coverage targets incentivize the wrong testing behavior
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Building tests that catch real defects
- [Unit Tests]({{< relref "/docs/testing/unit" >}}) - Writing fast, behavior-focused tests
- [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) - Measure defect escape rate instead of coverage percentage
- [ACD]({{< relref "/docs/agentic-cd" >}}) - How ineffective tests undermine the acceptance criteria that agents depend on
