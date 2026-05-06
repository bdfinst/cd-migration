---
title: "Getting Started"
linkTitle: "Getting Started"
weight: 3
description: >
  Practical steps to audit your test suite, fix flaky tests, decouple from external dependencies, and adopt test-driven development.
---

## Starting Without Full Coverage

Teams often delay adopting [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) because their existing code lacks tests. This is backwards. You do
not need tests for existing code to begin. You need one rule applied without exception:

> **Every new change gets a test. We will not go lower than the current level of code coverage.**

Record your current coverage percentage as a baseline. Configure CI to fail if coverage drops
below that number. This does not mean the baseline is good enough. It means the trend only moves
in one direction. Every bug fix, every new feature, and every refactoring adds tests. Over time,
coverage grows organically in the areas that matter most: the code that is actively changing.

Do not attempt to retrofit tests across the entire codebase before starting CI. That approach
takes months and delivers no incremental value. It also produces low-quality tests written by
developers who are testing code they did not write and do not fully understand.

## Quick-Start Action Plan

If your test suite is not yet ready to support [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}), use this focused action plan to make immediate
progress.

### 1. Audit your current test suite

Assess where you stand before making changes.

**Actions:**

- Run your full test suite 3 times. Note total duration and any tests that pass intermittently
  (flaky tests).
- Count tests by type: unit, integration, functional, end-to-end.
- Identify tests that require [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}) (databases, APIs, file systems) to run.
- Record your baseline: total test count, pass rate, duration, flaky test count.
- Map each test type to a [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) stage. Which tests gate deployment? Which run asynchronously?
  Which tests couple your deployment to external systems?

**Output:** A clear picture of your test distribution and the specific problems to address.

### 2. Fix or remove flaky tests

Flaky tests are worse than no tests. They train developers to ignore failures, which means real
failures also get ignored.

**Actions:**

- Quarantine all flaky tests immediately. Move them to a separate suite that does not block the
  build.
- For each quarantined test, decide: fix it (if the behavior it tests matters) or delete it (if
  it does not).
- Common causes of flakiness: timing dependencies, shared mutable state, reliance on external
  services, test order dependencies.
- Target: zero flaky tests in your main test suite.

### 3. Decouple your pipeline from external dependencies

This is the highest-leverage change for CD. Identify every test that calls a real external service
and replace that dependency with a test double.

**Actions:**

- List every external service your tests depend on: databases, APIs, message queues, file
  storage, third-party services.
- For each dependency, decide the right test double approach:
  - **In-memory fakes** for databases (e.g., SQLite, H2, testcontainers with local instances).
  - **HTTP stubs** for external APIs (e.g., WireMock, nock, MSW).
  - **Fakes** for message queues, email services, and other infrastructure.
- Replace the dependencies in your unit and component tests.
- Move the original tests that hit real services into a separate suite. These become your
  starting contract tests or E2E smoke tests.

**Output:** A test suite where everything that blocks the build is deterministic and runs without
network access to external systems.

### 4. Add component tests for critical paths

If you do not have component tests that exercise your whole service in
isolation, start with the most critical paths.

**Actions:**

- Identify the 3-5 most critical user journeys or API endpoints in your application.
- Write a component test for each: boot the application, stub external dependencies, send a
  real request or simulate a real user action, verify the response.
- Each component test should prove that the feature works correctly assuming external
  dependencies behave as expected (which your test doubles encode).
- Run these in CI on every commit.

**Output:** Component tests covering your critical paths, running in CI on every commit.

### 5. Set up contract tests for your most important dependency

Pick the external dependency that changes most frequently or has caused the most production
issues. Set up a contract test for it.

**Actions:**

- Write a contract test that validates the response structure (types, required fields, status
  codes) of the dependency's API.
- Run it on a schedule (e.g., every hour or daily), not on every commit.
- When it fails, update your test doubles to match the new reality and re-verify your
  component tests.
- If the dependency is owned by another team in your organization, explore consumer-driven
  contracts with a tool like [Pact](https://pact.io/).

**Output:** One contract test running on a schedule, with a process to update test doubles when it fails.

### 6. Adopt TDD for new code

Once your pipeline tests are reliable, adopt [TDD]({{< relref "/docs/reference/glossary#tdd-test-driven-development" >}}) for all new work. TDD is the practice of writing the test before the code. It ensures every
piece of behavior has a corresponding test.

#### The TDD cycle

1. **Red:** Write a failing test that describes the behavior you want.
2. **Green:** Write the minimum code to make the test pass.
3. **Refactor:** Improve the code without changing the behavior. The test ensures you do not
   break anything.

#### Why TDD matters for CD

- Every change is automatically covered by a test
- The test suite grows proportionally with the codebase
- Tests describe behavior, not implementation, making them more resilient to refactoring
- Developers get immediate feedback on whether their change works

TDD is not mandatory for CD, but teams that practice TDD consistently have significantly faster
and more reliable test suites.

**How to start:** Pick one new feature or bug fix this week. Write the test first, watch it
fail, write the code to make it pass, then refactor. Do not try to retroactively TDD your
entire codebase. Apply TDD to new code and to any code you modify.

**Output:** Team members practicing TDD on new work, with at least one completed red-green-refactor cycle.

---

## Related Content

- [Pipeline Test Strategy]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/pipeline-test-strategy" >}}) - Where these tests fit in your pipeline
- [Flaky Tests]({{< relref "/docs/symptoms/testing/flaky-tests" >}}) - Symptom of non-deterministic tests
- [Test Doubles]({{< relref "/docs/testing/glossary#test-double" >}}) - Patterns for isolating dependencies
- [Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}) - Verifying test doubles match reality
- [No Contract Testing Between Services]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}) - The anti-pattern this action plan addresses
- [A Large Codebase Has No Automated Tests]({{< relref "/docs/symptoms/testing/legacy-system-no-tests" >}}) - Starting testing on a brownfield codebase
