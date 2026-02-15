---
aliases:
  - /docs/symptoms/flaky-tests/
title: "Tests Randomly Pass or Fail"
linkTitle: "Tests randomly pass or fail"
description: >
  The pipeline fails, the developer reruns it without changing anything, and it passes.
tags:
  - test-strategy
  - environment-consistency
---

## What you are seeing

A developer pushes a change. The pipeline fails on a test they did not touch, in a module they
did not change. They click rerun. It passes. They merge. This happens multiple times a day across
the team. Nobody investigates failures on the first occurrence because the odds favor flakiness
over a real problem.

The team has adapted: retry-until-green is a routine step, not an exception. Some pipelines are
configured to automatically rerun failed tests. Tests are tagged as "known flaky" and skipped.
Real regressions hide behind the noise because the team has been trained to ignore failures.

## Common causes

### Inverted Test Pyramid

When the test suite is dominated by end-to-end tests, flakiness is structural. E2E tests depend
on network connectivity, shared test environments, external service availability, and browser
rendering timing. Any of these can produce a different result on each run. A suite built mostly
on E2E tests will always be flaky because it is built on non-deterministic foundations.

Replacing E2E tests with functional tests that use test doubles for external dependencies makes
the suite deterministic by design. The test produces the same result every time because it
controls all its inputs.

**Read more:** [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/)

### Snowflake Environments

When the CI environment is configured differently from other environments - or drifts over time -
tests pass locally but fail in CI, or pass in CI on Tuesday but fail on Wednesday. The
inconsistency is not in the test or the code but in the environment the test runs in.

Tests that depend on specific environment configurations, installed packages, file system layout,
or network access are vulnerable to environment drift. Infrastructure-as-code eliminates this
class of flakiness by ensuring environments are identical and reproducible.

**Read more:** [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/)

### Tightly Coupled Monolith

When components share mutable state - a database, a cache, a filesystem directory - tests that
run concurrently or in a specific order can interfere with each other. Test A writes to a shared
table. Test B reads from the same table and gets unexpected data. The tests pass individually
but fail together, or pass in one order but fail in another.

Without clear component boundaries, tests cannot be isolated. The flakiness is a symptom of
architectural coupling, not a testing problem.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

## How to narrow it down

1. **Do the flaky tests hit real external services or shared environments?** If yes, the tests
   are non-deterministic by design. Start with
   [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/) and replace them with
   functional tests using test doubles.
2. **Do tests pass locally but fail in CI, or vice versa?** If yes, the environments differ.
   Start with [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/).
3. **Do tests pass individually but fail when run together, or fail in a different order?** If
   yes, tests share mutable state. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/) for the
   architectural root cause, and isolate test data as an immediate fix.

---

## Related Content

- [Tests Pass in One Environment but Fail in Another](../environment-dependent-failures/) - Environment differences cause similar non-determinism
- [Test Suite Is Too Slow to Run](../slow-test-suites/) - Flaky tests compound slow feedback loops
- [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/) - The most common structural cause of flaky tests
- [Testing Fundamentals](../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Building a fast, reliable test suite
- [Change Fail Rate](../../reference/metrics/change-fail-rate/) - Track whether test reliability improvements reduce production failures
