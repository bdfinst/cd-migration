---
title: "Architecting Tests for CD"
linkTitle: "CD Testing"
weight: 16
description: >
  Test architecture, types, and best practices for building confidence in your delivery pipeline.
aliases:
  - /docs/reference/testing/
---

A test architecture that lets your [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) deploy confidently, regardless of external system availability, is a core [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) capability. The child pages cover each test type.

## Beyond the Test Pyramid

{{< figure src="/images/testing/test-pyramid.svg" class="figure-half" alt="The test pyramid: a triangle with Unit Tests at the wide base (fast, cheap, many), Integration/Component in the middle, and End-to-End at the narrow top (slow, expensive, few). Arrows on the sides indicate cost and speed increase toward the top." >}}

The test pyramid says: write many fast unit tests at the base, fewer integration tests in the middle, and only a handful of end-to-end tests at the top. The underlying principle is sound - **lower-level tests are faster, more deterministic, and cheaper to maintain.**

### Where teams go wrong

The pyramid is often treated as a metric rather than a principle. Teams count tests by type and debate ratios: "do we have enough unit tests?" or "are our integration tests too many?" This misses the point. The distribution is not the goal. The goal is:

> **Can our pipeline determine that a change is safe to deploy without depending on any system we do not control?**

A pipeline that answers yes can deploy at any time - even when a downstream service is down, a third-party API is slow, or a partner team hasn't shipped yet. That independence is what CD requires.

### What actually matters

A test architecture that achieves this has three responsibilities:

1. **Fast, deterministic tests** run on every commit using [test doubles]({{< relref "/docs/testing/test-doubles" >}}) for external dependencies. They give a reliable go/no-go signal in minutes.
2. **Contract tests** verify that those test doubles still match reality, running asynchronously without blocking the pipeline.
3. **A small number of post-deployment tests** validate the integrated system and provide monitoring, not gating.

### The anti-pattern: the ice cream cone

{{< figure src="/images/ice-cream-cone.svg" class="figure-half" alt="The ice cream cone anti-pattern: an inverted test distribution where most testing effort goes to manual and end-to-end tests at the top, with too few fast unit tests at the bottom" >}}

Most teams that struggle with CD have inverted the pyramid - too many slow, flaky end-to-end tests and too few fast, focused ones. Manual gates block every release. The pipeline cannot give a fast, reliable answer, so deployments become high-ceremony events.

## Test Architecture

A test architecture is the deliberate structure of how different test types work together across
your pipeline to give you deployment confidence. Each layer has a specific role, and the layers
reinforce each other.

| Layer | Test Type | Role | Deterministic? | Details |
|-------|-----------|------|----------------|---------|
| 1 | [Unit Tests]({{< relref "/docs/testing/unit" >}}) | Verify behavior in isolation - catch logic errors, regressions, and edge cases instantly | Yes | Fastest feedback loop; use [test doubles]({{< relref "/docs/testing/test-doubles" >}}) for external dependencies |
| 2 | [Component Tests]({{< relref "/docs/testing/component" >}}) | Verify a complete frontend component or backend service through its public interface | Yes | All external dependencies replaced with test doubles; fast enough to run on every commit |
| 3 | [Contract Tests]({{< relref "/docs/testing/contract" >}}) | Verify that your test doubles still match reality | No | Runs asynchronously; failures trigger review, not pipeline blocks |
| 4 | [End-to-End Tests]({{< relref "/docs/testing/e2e" >}}) | Exercise two or more real components up to the full system; also called integration testing | No | Post-deployment; never a pre-merge gate |
| - | Exploratory Testing | Unscripted investigation to discover unexpected behavior, usability issues, and edge cases | No | Never blocks the pipeline; runs continuously alongside delivery |
| - | Usability Testing | Validates that real users can accomplish goals effectively and without confusion | No | Never blocks the pipeline; informs product decisions |

[Static Analysis]({{< relref "/docs/testing/static" >}}) runs alongside layers 1-2, catching code quality, security, and
style issues without executing the code. [Test Doubles]({{< relref "/docs/testing/test-doubles" >}}) are used throughout
layers 1-2 to isolate external dependencies.

### How the layers work together

| Pipeline Stage | Test Layer | Deterministic? | Blocks Deploy? |
|----------------|------------|----------------|----------------|
| On every commit | Unit tests | Yes | Yes |
| On every commit | Component tests | Yes | Yes |
| Asynchronous | Contract tests | No | No - triggers review |
| Post-deployment | E2E smoke tests | No | Triggers rollback if critical |
| Post-deployment | [Synthetic monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}) | No | Triggers alerts |

The critical insight: **everything that blocks deployment is deterministic and under your
control.** Everything that involves external systems runs asynchronously or post-deployment. This
is what gives you the independence to deploy any time, regardless of the state of the world
around you.

### Pre-merge vs post-merge

The table above maps to two distinct phases of your pipeline, each with different goals and
constraints.

**Pre-merge** (before code lands on trunk): Run unit and component tests. These must all be
deterministic and fast. Target: under 10 minutes total. This is the quality gate that every
change must pass. If pre-merge tests are slow, developers batch up changes or skip local runs,
both of which undermine [continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}).

**Post-merge** (after code lands on trunk, before or after deployment): Re-run the full
deterministic suite against the integrated trunk. If integration tests can be kept deterministic,
run them here. Then run contract tests, E2E smoke tests, and [synthetic monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}). Target: under
30 minutes for the full post-merge cycle.

Why re-run pre-merge tests post-merge? Two changes can each pass pre-merge independently but
conflict when combined on trunk. The post-merge run catches these integration effects. If a
post-merge failure occurs, the team fixes it immediately - trunk must always be releasable.

## Testing Matrix

Use this reference to decide what type of test to write and where it runs in your pipeline.

| What You Need to Verify | Test Type | Speed | Deterministic? | Blocks Deploy? |
|--------------------------|-----------|-------|----------------|----------------|
| A function or method behaves correctly | [Unit]({{< relref "/docs/testing/unit" >}}) | Milliseconds | Yes | Yes |
| A complete component or service works through its public interface | [Component]({{< relref "/docs/testing/component" >}}) | Milliseconds to seconds | Yes | Yes |
| Your test doubles match reality | [Contract]({{< relref "/docs/testing/contract" >}}) | Seconds | No | No |
| Two or more real components working together, up to the full system | [E2E / Integration]({{< relref "/docs/testing/e2e" >}}) | Seconds to minutes | No | No |
| Code quality, security, and style compliance | [Static Analysis]({{< relref "/docs/testing/static" >}}) | Seconds | Yes | Yes |
| UI meets WCAG accessibility standards | [Static Analysis]({{< relref "/docs/testing/static" >}}) + [Component]({{< relref "/docs/testing/component" >}}) | Seconds | Yes | Yes |
| Unexpected behavior, edge cases, real-world workflows | Exploratory Testing | Varies | No | Never |
| Real users can accomplish goals effectively | Usability Testing | Varies | No | Never |

## Best Practices

### Do

- **Run tests on every commit.** If tests do not run automatically, they will be skipped.
- **Keep the deterministic suite under 10 minutes.** If it is slower, developers will stop
  running it locally.
- **Fix broken tests immediately.** A broken test is equivalent to a broken build.
- **Delete tests that do not provide value.** A test that never fails and tests trivial behavior
  is maintenance cost with no benefit.
- **Test behavior, not implementation.** Use a
  [black box]({{< relref "/docs/reference/glossary#black-box-testing" >}}) approach - verify what the code
  does, not how it does it. As Ham Vocke advises: "if I enter values `x` and `y`, will the
  result be `z`?" - not the sequence of internal calls that produce `z`. Avoid
  [white box testing]({{< relref "/docs/reference/glossary#white-box-testing" >}}) that asserts on internals.
- **Use test doubles for external dependencies.** Your deterministic tests should run without
  network access to external systems.
- **Validate test doubles with contract tests.** Test doubles that drift from reality give false
  confidence.
- **Treat test code as production code.** Give it the same care, review, and refactoring
  attention.
- **Run automated accessibility checks on every commit.** WCAG compliance scans are fast,
  deterministic, and catch violations that are invisible to sighted developers. Treat them
  like security scans: automate the detectable rules and reserve manual review for
  subjective judgment.

### Do Not

- **Do not tolerate flaky tests.** Quarantine or delete them immediately.
- **Do not gate your pipeline on non-deterministic tests.** E2E and contract test failures
  should trigger review or alerts, not block deployment.
- **Do not couple your deployment to external system availability.** If a third-party API being
  down prevents you from deploying, your test architecture has a critical gap.
- **Do not write tests after the fact as a checkbox exercise.** Tests written without
  understanding the behavior they verify add noise, not value.
- **Do not test private methods directly.** Test the public interface; private methods are tested
  indirectly.
- **Do not share mutable state between tests.** Each test should set up and tear down its own
  state.
- **Do not use sleep/wait for timing-dependent tests.** Use explicit waits, polling, or
  event-driven assertions.
- **Do not require a running database or external service for unit or component tests.** That
  makes them end-to-end (integration) tests - which is fine, but categorize them correctly
  and run them post-deployment, not as a pre-merge gate.
- **Do not make exploratory or usability testing a release gate.** These activities are
  continuous and inform product direction; they are not a pass/fail checkpoint before deployment.

## Test Types

| Type | Purpose |
|------|---------|
| [Unit Tests]({{< relref "/docs/testing/unit" >}}) | Verify individual units of behavior in isolation |
| [Component Tests]({{< relref "/docs/testing/component" >}}) | Verify a complete frontend component or backend service with test doubles for external deps |
| [Contract Tests]({{< relref "/docs/testing/contract" >}}) | Verify API contracts between services |
| [End-to-End Tests]({{< relref "/docs/testing/e2e" >}}) | Exercise two or more real components up to the full system; also called integration testing |
| [Integration Tests]({{< relref "/docs/testing/integration" >}}) | Alias for End-to-End Tests |
| [Static Analysis]({{< relref "/docs/testing/static" >}}) | Catch issues without running code |
| [Test Doubles]({{< relref "/docs/testing/test-doubles" >}}) | Patterns for isolating dependencies in tests |
| [Feedback Speed]({{< relref "/docs/testing/feedback-speed" >}}) | Why test suite speed matters and the cognitive science behind the targets |

## Related Content

- [ACD]({{< relref "/docs/agentic-cd" >}}) - How acceptance criteria make testing the constraint that governs agent-generated code
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Establishing testing practices as part of CD migration
- [High Coverage but Ineffective Tests]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - When tests pass but do not catch real defects

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Additional concepts drawn from Ham Vocke, [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and Toby Clemson, [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/).
