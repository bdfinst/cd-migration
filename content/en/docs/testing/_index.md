---
title: "Architecting Tests for CD"
linkTitle: "Testing Tips"
weight: 16
description: >
  Test architecture, types, and good practices for building confidence in your delivery pipeline.
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

{{< figure src="/images/testing/testing-trophy.svg" class="figure-half" alt="The testing trophy: a trophy-shaped diagram where Component Tests form the large diamond-shaped body, Unit Tests form the narrow stem, Static Analysis forms the base pedestal, and End-to-End tests form a small triangle at the peak." >}}

The testing trophy, popularized by Kent C. Dodds, rebalances the pyramid by putting component tests at the center. Where the pyramid emphasizes unit tests at the base, the trophy argues that [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) give you the most confidence per test because they exercise realistic user behavior through a component's public interface while still using [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) for external dependencies.

The trophy also makes static analysis explicit as the foundation. Linting, type checking, and formatting catch entire categories of defects for free - no test code to write or maintain.

Both models agree on the principle: **keep end-to-end tests few and focused, and maximize fast, deterministic coverage.** The trophy simply shifts where that coverage concentrates. For teams building component-heavy applications, the trophy distribution often produces better results than a strict pyramid.

Teams often miss this underlying principle and treat either shape as a metric. They count tests by type and debate ratios - "do we have enough unit tests?" or "are our integration tests too many?" - when the real question is:

> **Can our pipeline determine that a change is safe to deploy without depending on any system we do not control?**

A pipeline that answers yes can deploy at any time - even when a downstream service is down, a third-party API is slow, or a partner team hasn't shipped yet. That independence is what CD requires, and it is the reason the pyramid favors the base.

### What this looks like in practice

A test architecture that achieves this has three responsibilities:

1. **Fast, deterministic tests** - unit, component, and contract tests - run on every commit using [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) for [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}). They give a reliable go/no-go signal in minutes.
2. **[Acceptance tests]({{< relref "/docs/testing/glossary#functional-acceptance-tests" >}})** validate that a deployed artifact is deliverable. Acceptance testing is not a single test type. It is a pipeline stage that can include component tests, load tests, chaos tests, resilience tests, and compliance tests. Any test that runs after CI to gate promotion to production is an acceptance test.
3. **Integration tests** validate that contract test doubles still match the real external systems. They run in a dedicated test environment with versioned test data, on demand or on a schedule, providing monitoring rather than gating.

### The anti-pattern: the ice cream cone

{{< figure src="/images/ice-cream-cone.svg" class="figure-half" alt="The ice cream cone anti-pattern: an inverted test distribution where most testing effort goes to manual and end-to-end tests at the top, with too few fast unit tests at the bottom" >}}

Most teams that struggle with CD have inverted the pyramid - too many slow, flaky end-to-end tests and too few fast, focused ones. Manual gates block every release. The pipeline cannot give a fast, reliable answer, so deployments become high-ceremony events.

## Test Architecture

A test architecture is the deliberate structure of how different test types work together across
your pipeline to give you deployment confidence. Use the table below to decide what type of test
to write and where it runs. This is not a comprehensive list. It shows how common tests impact
pipeline design and how teams should structure their suites. See the
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}})
for a complete quality gate sequence.

{{< figure src="/images/testing/test-architecture-pipeline.svg" alt="Four-lane CD pipeline diagram. Pipeline lane: Commit triggers pre-merge and CI checks (Static Analysis, Unit Tests, Component Tests, Contract Tests - deterministic, blocks merge), then Build, Deploy to test environment, Acceptance Tests in test environment (Component, Load, Chaos, Resilience, Compliance - gates promotion to production), Deploy to production, and a green Live checkmark. Post-deploy lane: Production Verification (Health Checks, Real User Monitoring, SLO) triggered after production deploy - non-deterministic, triggers alerts, never blocks promotion. Async lane: Integration Tests validate contract test doubles against real systems - non-deterministic, post-deploy, failures trigger review. Continuous lane: Exploratory Testing and Usability Testing run continuously alongside delivery and never block." >}}

| Pipeline Stage | What You Need to Verify | Test Type | Speed | Deterministic? | Blocks Deploy? |
|----------------|-------------------------|-----------|-------|----------------|----------------|
| CI | A function or method behaves correctly | [Unit]({{< relref "/docs/testing/test-types/unit" >}}) | Milliseconds | Yes | {{< blocks-deploy >}} |
| CI | A complete component or service works through its public interface | [Component]({{< relref "/docs/testing/test-types/component" >}}) | Milliseconds to seconds | Yes | {{< blocks-deploy >}} |
| CI | Your code correctly interacts with external system interfaces | [Contract]({{< relref "/docs/testing/test-types/contract" >}}) | Milliseconds to seconds | Yes | {{< blocks-deploy >}} |
| CI | Code quality, security, and style compliance | [Static Analysis]({{< relref "/docs/testing/test-types/static" >}}) | Seconds | Yes | {{< blocks-deploy >}} |
| CI | UI meets WCAG accessibility standards | [Static Analysis]({{< relref "/docs/testing/test-types/static" >}}) + [Component]({{< relref "/docs/testing/test-types/component" >}}) | Seconds | Yes | {{< blocks-deploy >}} |
| Acceptance Testing | Deployed artifact meets [acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}}) | Deploy, Smoke, Load, Resilience, Compliance, etc. | Minutes | No | {{< blocks-deploy >}} - gates production |
| Post-deploy (production) | Critical user journeys work in production | [E2E smoke]({{< relref "/docs/testing/test-types/e2e" >}}) | Seconds to minutes | No | No - triggers [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) |
| Post-deploy (production) | Production health and SLOs | [Synthetic monitoring]({{< relref "/docs/testing/glossary#synthetic-monitoring" >}}) | Continuous | No | No - triggers alerts |
| On demand/scheduled | Contract [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) still match real external systems | [Integration]({{< relref "/docs/testing/test-types/integration" >}}) | Seconds to minutes | No | No - triggers review |
| Continuous | Unexpected behavior, edge cases, real-world workflows | Exploratory Testing | Varies | No | Never |
| Continuous | Real users can accomplish goals effectively | Usability Testing | Varies | No | Never |

The critical insight: **everything that blocks merge is deterministic and under your
control.** Acceptance tests gate production promotion after verifying the deployed artifact.
Everything that involves real external systems runs post-deployment. This is what gives you
the independence to deploy any time, regardless of the state of the world around you.

### Pre-merge vs post-merge

The table maps to two distinct phases of your pipeline, each with different goals and
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

## good practices

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
