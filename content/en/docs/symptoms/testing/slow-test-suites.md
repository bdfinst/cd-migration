---
aliases:
  - /docs/symptoms/slow-test-suites/
title: "Test Suite Is Too Slow to Run"
linkTitle: "Slow test suites"
description: >
  The test suite takes 30 minutes or more. Developers stop running it locally and push without
  verifying.
tags:
  - test-strategy
  - batch-size
---

## What you are seeing

The full test suite takes 30 minutes, an hour, or longer. Developers do not run it locally because
they cannot afford to wait. Instead, they push their changes and let [CI](../../glossary/#ci-continuous-integration) run the tests. Feedback
arrives long after the developer has moved on. If a test fails, the developer must context-switch
back, recall what they were doing, and debug the failure.

Some developers run only a subset of tests locally (the ones for their module) and skip the rest.
This catches some issues but misses integration problems between modules. Others skip local testing
entirely and treat the CI [pipeline](../../glossary/#pipeline) as their test runner, which overloads the shared pipeline and
increases wait times for everyone.

The team has discussed parallelizing the tests, splitting the suite, or adding more CI capacity.
These discussions stall because the root cause is not infrastructure. It is the shape of the test
suite itself.

## Common causes

### Inverted Test Pyramid

When the majority of tests are end-to-end or integration tests, the suite is inherently slow. E2E
tests launch browsers, start services, make network calls, and wait for responses. Each test takes
seconds or minutes instead of milliseconds. A suite of 500 E2E tests will always be slower than a
suite of 5,000 unit tests that verify the same logic at a lower level. The fix is not faster
hardware. It is moving test coverage down the pyramid.

**Read more:** [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/)

### Tightly Coupled Monolith

When the codebase has no clear module boundaries, tests cannot be scoped to individual components.
A test for one feature must set up the entire application because the feature depends on
everything. Test setup and teardown dominate execution time because there is no way to isolate the
system under test.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Manual Testing Only

Sometimes the test suite is slow because the team added automated tests as an afterthought, using
E2E tests to backfill coverage for code that was not designed for unit testing. The resulting suite
is a collection of heavyweight tests that exercise the full stack for every scenario because the
code provides no lower-level testing seams.

**Read more:** [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/)

## How to narrow it down

1. **What is the ratio of unit tests to E2E/integration tests?** If E2E tests outnumber unit
   tests, the test pyramid is inverted and the suite is slow by design. Start with
   [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/).
2. **Can tests be run for a single module in isolation?** If running one module's tests requires
   starting the entire application, the architecture prevents test isolation. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
3. **Were the automated tests added retroactively to a codebase with no testing seams?** If tests
   were bolted on after the fact using E2E tests because the code cannot be unit-tested, the
   codebase needs refactoring for testability. Start with
   [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/).

---

**Ready to fix this?** The most common cause is [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/). Start with its [How to Fix It](../../anti-patterns/testing/inverted-test-pyramid/#how-to-fix-it) section for week-by-week steps.

## Related Content

- [Pipelines Take Too Long](../../symptoms/flow/slow-pipelines/) - Slow tests are the most common cause of slow pipelines
- [Feedback Takes Hours Instead of Minutes](../../symptoms/flow/no-fast-feedback/) - Slow suites force developers into long feedback loops
- [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/) - Too many slow tests at the wrong level
- [Testing Fundamentals](../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Rebalancing the test pyramid for speed
- [Build Duration](../../metrics/build-duration/) - Track pipeline speed as a first-class metric
