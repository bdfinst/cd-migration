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

A CD pipeline's job is to force every [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) to prove it is worthy of delivery. That proof only works when **test changes ship with the code they validate.** If a developer adds a feature but the corresponding tests arrive in a later commit, the pipeline approved an artifact it never actually verified. That is not a CD pipeline. It is a [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) pipeline with a deploy step. Tests and production code must always travel together through the pipeline as a single unit of change.

## Beyond the Test Pyramid

{{< figure src="/images/testing/test-pyramid.svg" class="figure-half" alt="The test pyramid: a triangle with Unit Tests at the wide base (fast, cheap, many), Integration/Component in the middle, and End-to-End at the narrow top (slow, expensive, few). Arrows on the sides indicate cost and speed increase toward the top." >}}

The test pyramid says: write many fast unit tests at the base, fewer integration tests in the middle, and only a handful of end-to-end tests at the top. The underlying principle is sound - **lower-level tests are faster, more deterministic, and cheaper to maintain.**

### The principle behind the shape

The pyramid's shape communicates a principle: **prefer fast, deterministic tests that you fully control.** Tests at the
base are cheap to write, fast to run, and reliable. Tests at the top are slow, expensive, and depend on systems outside
your control. The more weight you put at the base, the faster and more reliable your pipeline becomes - to a point. We also have the engineering goal of achieving the most functional coverage with the fewest number of tests. Every test costs money to maintain and adds time to the pipeline.

### The testing trophy

{{< figure src="/images/testing/testing-trophy.svg" class="figure-half" alt="The testing trophy: a trophy-shaped diagram where Component Tests form the large dominant bowl, Unit Tests form the narrow stem, Static Analysis forms the base pedestal, and End-to-End tests form a narrow band at the top rim." >}}

The testing trophy, popularized by Kent C. Dodds, rebalances the pyramid by putting component tests at the center. Where the pyramid emphasizes unit tests at the base, the trophy argues that component tests give you the most confidence per test because they exercise realistic user behavior through a component's public interface while still using [test doubles]({{< relref "/docs/testing/test-doubles" >}}) for external dependencies.

The trophy also makes static analysis explicit as the foundation. Linting, type checking, and formatting catch entire categories of defects for free - no test code to write or maintain.

Both models agree on the principle: **keep end-to-end tests few and focused, and maximize fast, deterministic coverage.** The trophy simply shifts where that coverage concentrates. For teams building component-heavy applications, the trophy distribution often produces better results than a strict pyramid.

Teams often miss this underlying principle and treat either shape as a metric. They count tests by type and debate ratios - "do we have enough unit tests?" or "are our integration tests too many?" - when the real question is:

> **Can our pipeline determine that a change is safe to deploy without depending on any system we do not control?**

A pipeline that answers yes can deploy at any time - even when a downstream service is down, a third-party API is slow, or a partner team hasn't shipped yet. That independence is what CD requires, and it is the reason the pyramid favors the base.

### What this looks like in practice

A test architecture that achieves this has three responsibilities:

1. **Fast, deterministic tests** - unit, component, and contract tests - run on every commit using [test doubles]({{< relref "/docs/testing/test-doubles" >}}) for [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}). They give a reliable go/no-go signal in minutes.
2. **Acceptance tests** validate that a deployed artifact is deliverable. Acceptance testing is not a single test type. It is a pipeline stage that can include component tests, load tests, chaos tests, resilience tests, and compliance tests. Any test that runs after CI to gate promotion to production is an acceptance test.
3. **Integration tests** validate that contract test doubles still match the real external systems. They run in a dedicated test environment with versioned test data, on demand or on a schedule, providing monitoring rather than gating.

### The anti-pattern: the ice cream cone

{{< figure src="/images/ice-cream-cone.svg" class="figure-half" alt="The ice cream cone anti-pattern: an inverted test distribution where most testing effort goes to manual and end-to-end tests at the top, with too few fast unit tests at the bottom" >}}

Most teams that struggle with CD have inverted the pyramid - too many slow, flaky end-to-end tests and too few fast, focused ones. Manual gates block every release. The pipeline cannot give a fast, reliable answer, so deployments become high-ceremony events.

## Test Architecture

A test architecture is the deliberate structure of how different test types work together across
your pipeline to give you deployment confidence. Each layer has a specific role, and the layers
reinforce each other.

{{< figure src="/images/testing/test-architecture-pipeline.svg" alt="Four-lane CD pipeline diagram. Pipeline lane: Commit triggers pre-merge and CI checks (Static Analysis, Unit Tests, Component Tests, Contract Tests - deterministic, blocks merge), then Build, Deploy to test environment, Acceptance Tests in test environment (Component, Load, Chaos, Resilience, Compliance - gates promotion to production), Deploy to production, and a green Live checkmark. Post-deploy lane: Production Verification (Health Checks, Real User Monitoring, SLO) triggered after production deploy - non-deterministic, triggers alerts, never blocks promotion. Async lane: Integration Tests validate contract test doubles against real systems - non-deterministic, post-deploy, failures trigger review. Continuous lane: Exploratory Testing and Usability Testing run continuously alongside delivery and never block." >}}

| Layer | Test Type | Role | Deterministic? | Details |
|-------|-----------|------|----------------|---------|
| 1 | [Unit Tests]({{< relref "/docs/testing/unit" >}}) | Verify behavior in isolation - catch logic errors, regressions, and edge cases instantly | Yes | Fastest feedback loop; use [test doubles]({{< relref "/docs/testing/test-doubles" >}}) for external dependencies |
| 2 | [Component Tests]({{< relref "/docs/testing/component" >}}) | Verify a complete frontend component or backend service through its public interface | Yes | All external dependencies replaced with test doubles; fast enough to run on every commit |
| 3 | [Contract Tests]({{< relref "/docs/testing/contract" >}}) | Verify interface boundaries with external systems using test doubles | Yes | Also called narrow integration tests; validated by [integration tests]({{< relref "/docs/testing/integration" >}}) |
| 4 | Acceptance Tests | Validate that a deployed artifact is deliverable - a pipeline stage, not a single test type | No | Includes component, load, chaos, resilience, compliance; gates production deploy |
| 5 | [Integration Tests]({{< relref "/docs/testing/integration" >}}) | Validate that contract test doubles still match real external systems | No | Run in a test environment with versioned test data; on demand or scheduled; failures trigger review |
| 6 | [End-to-End Tests]({{< relref "/docs/testing/e2e" >}}) | Exercise user journeys or multi-service flows through real systems | No | Post-deployment smoke tests; triggers rollback; never a pre-merge gate |
| - | Exploratory Testing | Unscripted investigation to discover unexpected behavior, usability issues, and edge cases | No | Never blocks the pipeline; runs continuously alongside delivery |
| - | Usability Testing | Validates that real users can accomplish goals effectively and without confusion | No | Never blocks the pipeline; informs product decisions |

[Static Analysis]({{< relref "/docs/testing/static" >}}) runs alongside layers 1-2, catching code quality, security, and
style issues without executing the code. [Test Doubles]({{< relref "/docs/testing/test-doubles" >}}) are used throughout
layers 1-2 to isolate external dependencies.

### How the layers work together

| Pipeline Stage | Test Layer | Deterministic? | Blocks Deploy? |
|----------------|------------|----------------|----------------|
| On every commit | Unit tests | Yes | {{< blocks-deploy >}} |
| On every commit | Component tests | Yes | {{< blocks-deploy >}} |
| On every commit | Contract tests | Yes | {{< blocks-deploy >}} |
| Post-deploy (test env) | Acceptance tests | No | {{< blocks-deploy >}} - gates production |
| Test environment (on demand/scheduled) | Integration tests | No | No - triggers review |
| Post-deploy (production) | E2E smoke tests | No | No - triggers [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) |
| Post-deploy (production) | [Synthetic monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}) | No | No - triggers alerts |

The critical insight: **everything that blocks merge is deterministic and under your
control.** Acceptance tests gate production promotion after verifying the deployed artifact.
Everything that involves real external systems runs post-deployment. This is what gives you
the independence to deploy any time, regardless of the state of the world around you.

### Pre-merge vs post-merge

The table above maps to two distinct phases of your pipeline, each with different goals and
constraints.

**Pre-merge** (before code lands on trunk): Run unit, component, and contract tests. These must all be
deterministic and fast. Target: under 10 minutes total. This is the quality gate that every
change must pass. If pre-merge tests are slow, developers batch up changes or skip local runs,
both of which undermine [continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}).

**Post-merge** (after code lands on trunk, before or after deployment): Re-run the full
deterministic suite against the integrated trunk. Then run acceptance tests, E2E smoke tests, and
[synthetic monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}) post-deploy.
Integration tests run separately in a test environment, on demand or on a schedule. Target: under
60 minutes for the full post-merge cycle.

Why re-run pre-merge tests post-merge? Two changes can each pass pre-merge independently but
conflict when combined on trunk. The post-merge run catches these integration effects.

> **If a post-merge failure occurs, the team fixes it immediately. Trunk must always be releasable.**

This post-merge re-run is what teams traditionally call **regression testing**: running all previous tests against the current artifact to confirm that existing behavior still works after a change. In CD, regression testing is not a separate test type or a special suite. Every test in the pipeline is a regression test. The deterministic suite runs on every commit, and the full suite runs post-merge. If all tests pass, the artifact has been regression-tested.

## Testing Matrix

Use this reference to decide what type of test to write and where it runs in your pipeline. This is not a comprehensive list of all test types. It shows how common tests impact pipeline design decisions and how teams should structure their suites. See the [Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) for a complete quality gate sequence.

| What You Need to Verify                                            | Test Type                                                                                                        | Speed                   | Deterministic? | Blocks Deploy?                 |
|--------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------|----------------|--------------------------------|
| A function or method behaves correctly                             | [Unit]({{< relref "/docs/testing/unit" >}})                                                                      | Milliseconds            | Yes            | {{< blocks-deploy >}}         |
| A complete component or service works through its public interface | [Component]({{< relref "/docs/testing/component" >}})                                                            | Milliseconds to seconds | Yes            | {{< blocks-deploy >}}         |
| Your code correctly interacts with external system interfaces      | [Contract]({{< relref "/docs/testing/contract" >}})                                                              | Milliseconds to seconds | Yes            | {{< blocks-deploy >}}         |
| Code quality, security, and style compliance                       | [Static Analysis]({{< relref "/docs/testing/static" >}})                                                         | Seconds                 | Yes            | {{< blocks-deploy >}}         |
| UI meets WCAG accessibility standards                              | [Static Analysis]({{< relref "/docs/testing/static" >}}) + [Component]({{< relref "/docs/testing/component" >}}) | Seconds                 | Yes            | {{< blocks-deploy >}}         |
| Deployed artifact meets [acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}})                        | Acceptance (functional, load, chaos, resilience, compliance)                                                     | Minutes                 | No             | {{< blocks-deploy >}} - gates production |
| Contract test doubles still match real external systems            | [Integration]({{< relref "/docs/testing/integration" >}})                                                        | Seconds to minutes      | No             | No                             |
| User journeys or multi-service flows through real systems          | [E2E]({{< relref "/docs/testing/e2e" >}})                                                                        | Seconds to minutes      | No             | No                             |
| Unexpected behavior, edge cases, real-world workflows              | Exploratory Testing                                                                                              | Varies                  | No             | Never                          |
| Real users can accomplish goals effectively                        | Usability Testing                                                                                                | Varies                  | No             | Never                          |

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
- **Do not gate your pipeline on non-deterministic tests.** E2E and integration test failures
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
  makes them integration or end-to-end tests - which is fine, but categorize them correctly
  and run them post-deployment, not as a pre-merge gate.
- **Do not make exploratory or usability testing a release gate.** These activities are
  continuous and inform product direction; they are not a pass/fail checkpoint before deployment.

## Related Content

- [ACD]({{< relref "/docs/agentic-cd" >}}) - How acceptance criteria make testing the constraint that governs agent-generated code
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Establishing testing practices as part of CD migration
- [High Coverage but Ineffective Tests]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - When tests pass but do not catch real defects

 Additional concepts drawn from Ham Vocke, [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and Toby Clemson, [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/).
