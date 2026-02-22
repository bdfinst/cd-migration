---
title: "Testing"
linkTitle: "Testing"
weight: 12
description: >
  Test architecture, types, and best practices for building confidence in your delivery pipeline.
---

A reliable test suite is essential for [continuous delivery](../glossary/#cd-continuous-delivery). This page describes the test
architecture that gives your [pipeline](../glossary/#pipeline) the confidence to deploy any change - even when
dependencies outside your control are unavailable. The child pages cover each test type
in detail.

## Beyond the Test Pyramid

The test pyramid - many unit tests at the base, fewer integration tests in the middle, a handful
of end-to-end tests at the top - has been the dominant mental model for test strategy since Mike
Cohn introduced it. The core insight is sound: **push testing as low as possible.** Lower-level
tests are faster, more deterministic, and cheaper to maintain. Higher-level tests are slower,
more brittle, and more expensive.

But as a prescriptive model, the pyramid is overly simplistic. Teams that treat it as a rigid
ratio end up in unproductive debates about whether they have "too many" integration tests or "not
enough" unit tests. The shape of your test distribution matters far less than whether your tests,
taken together, give you the confidence to deploy.

### What actually matters

The pyramid's principle - **write tests with different granularity** - remains correct. But for
CD, the question is not "do we have the right pyramid shape?" The question is:

> **Can our pipeline determine that a change is safe to deploy without depending on any system we
> do not control?**

This reframes the testing conversation. Instead of counting tests by type and trying to match a
diagram, you design a test architecture where:

1. **Fast, deterministic tests** catch the vast majority of defects and run on every commit.
   These tests use [test doubles](test-doubles/) for anything outside
   the team's control. They give you a reliable go/no-go signal in minutes.

2. **Contract tests** verify that your test doubles still match reality. They run asynchronously
   and catch drift between your assumptions and the real world - without blocking your pipeline.

3. **A small number of non-deterministic tests** validate that the fully integrated system works.
   These run post-deployment and provide monitoring, not gating.

This structure means your pipeline can confidently say "yes, deploy this" even if a downstream
API is having an outage, a third-party service is slow, or a partner team hasn't deployed their
latest changes yet. Your ability to deliver is decoupled from the reliability of systems you do
not own.

### The anti-pattern: the ice cream cone

Most teams that struggle with CD have an inverted test distribution - too many slow, expensive
end-to-end tests and too few fast, focused tests.

{{< figure src="/images/ice-cream-cone.svg" alt="The ice cream cone anti-pattern: an inverted test distribution where most testing effort goes to manual and end-to-end tests at the top, with too few fast unit tests at the bottom" >}}

The ice cream cone makes CD impossible. Manual testing gates block every release. End-to-end tests
take hours, fail randomly, and depend on external systems being healthy. The pipeline cannot give
a fast, reliable answer about deployability, so deployments become high-ceremony events.

## Test Architecture

A test architecture is the deliberate structure of how different test types work together across
your pipeline to give you deployment confidence. Each layer has a specific role, and the layers
reinforce each other.

| Layer | Test Type | Role | Deterministic? | Details |
|-------|-----------|------|----------------|---------|
| 1 | [Unit Tests](unit/) | Verify behavior in isolation - catch logic errors, regressions, and edge cases instantly | Yes | Fastest feedback loop; use [test doubles](test-doubles/) for external dependencies |
| 2 | [Integration Tests](integration/) | Verify boundaries - catch mismatched interfaces, serialization errors, query bugs | Yes | Fast enough to run on every commit |
| 3 | [Functional Tests](functional/) | Verify your system works as a complete unit in isolation | Yes | Proves the system handles interactions correctly with all external dependencies stubbed |
| 4 | [Contract Tests](contract/) | Verify your test doubles still match reality | No | Runs asynchronously; failures trigger review, not pipeline blocks |
| 5 | [End-to-End Tests](e2e/) | Verify complete user journeys through the fully integrated system | No | Monitoring, not gating - runs post-deployment |

[Static Analysis](static/) runs alongside layers 1-3, catching code quality, security, and
style issues without executing the code. [Test Doubles](test-doubles/) are used throughout
layers 1-3 to isolate external dependencies.

### How the layers work together

{{% code-collapse title="Test layers by pipeline stage" lang="text" %}}
Pipeline stage    Test layer              Deterministic?   Blocks deploy?
─────────────────────────────────────────────────────────────────────────
On every commit   Unit tests              Yes              Yes
                  Integration tests       Yes              Yes
                  Functional tests        Yes              Yes

Asynchronous      Contract tests          No               No (triggers review)

Post-deployment   E2E smoke tests         No               Triggers rollback if critical
                  Synthetic monitoring    No               Triggers alerts
{{% /code-collapse %}}

The critical insight: **everything that blocks deployment is deterministic and under your
control.** Everything that involves external systems runs asynchronously or post-deployment. This
is what gives you the independence to deploy any time, regardless of the state of the world
around you.

### Pre-merge vs post-merge

The table above maps to two distinct phases of your pipeline, each with different goals and
constraints.

**Pre-merge** (before code lands on trunk): Run unit, integration, and functional tests. These
must all be deterministic and fast. Target: under 10 minutes total. This is the quality gate that
every change must pass. If pre-merge tests are slow, developers batch up changes or skip local
runs, both of which undermine [continuous integration](../glossary/#ci-continuous-integration).

**Post-merge** (after code lands on trunk, before or after deployment): Re-run the full
deterministic suite against the integrated trunk to catch merge-order interactions. Run contract
tests, E2E smoke tests, and synthetic monitoring. Target: under 30 minutes for the full
post-merge cycle.

Why re-run pre-merge tests post-merge? Two changes can each pass pre-merge independently but
conflict when combined on trunk. The post-merge run catches these integration effects. If a
post-merge failure occurs, the team fixes it immediately - trunk must always be releasable.

## Testing Matrix

Use this reference to decide what type of test to write and where it runs in your pipeline.

| What You Need to Verify | Test Type | Speed | Deterministic? | Blocks Deploy? |
|--------------------------|-----------|-------|----------------|----------------|
| A function or method behaves correctly | [Unit](unit/) | Milliseconds | Yes | Yes |
| Components interact correctly at a boundary | [Integration](integration/) | Milliseconds to seconds | Yes | Yes |
| Your whole service works in isolation | [Functional](functional/) | Seconds | Yes | Yes |
| Your test doubles match reality | [Contract](contract/) | Seconds | No | No |
| A critical user journey works end-to-end | [E2E](e2e/) | Minutes | No | No |
| Code quality, security, and style compliance | [Static Analysis](static/) | Seconds | Yes | Yes |
| UI meets WCAG accessibility standards | [Static Analysis](static/) + [Functional](functional/) | Seconds | Yes | Yes |

## Best Practices

### Do

- **Run tests on every commit.** If tests do not run automatically, they will be skipped.
- **Keep the deterministic suite under 10 minutes.** If it is slower, developers will stop
  running it locally.
- **Fix broken tests immediately.** A broken test is equivalent to a broken build.
- **Delete tests that do not provide value.** A test that never fails and tests trivial behavior
  is maintenance cost with no benefit.
- **Test behavior, not implementation.** Use a
  [black box](../glossary/#black-box-testing) approach - verify what the code
  does, not how it does it. As Ham Vocke advises: "if I enter values `x` and `y`, will the
  result be `z`?" - not the sequence of internal calls that produce `z`. Avoid
  [white box testing](../glossary/#white-box-testing) that asserts on internals.
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
- **Do not require a running database or external service for unit tests.** That makes them
  integration tests - which is fine, but categorize them correctly.

## Test Types

| Type | Purpose |
|------|---------|
| [Unit Tests](unit/) | Verify individual components in isolation |
| [Integration Tests](integration/) | Verify components work together |
| [Functional Tests](functional/) | Verify user-facing behavior |
| [End-to-End Tests](e2e/) | Verify complete user workflows |
| [Contract Tests](contract/) | Verify API contracts between services |
| [Static Analysis](static/) | Catch issues without running code |
| [Test Doubles](test-doubles/) | Patterns for isolating dependencies in tests |
| [Feedback Speed](feedback-speed/) | Why test suite speed matters and the cognitive science behind the targets |

## Related Content

- [ACD](../agentic-cd/) - How the executable truth artifact makes testing the constraint that governs agent-generated code
- [Testing Fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Establishing testing practices as part of CD migration
- [High Coverage but Ineffective Tests](../symptoms/testing/high-coverage-ineffective-tests/) - When tests pass but do not catch real defects

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Additional concepts drawn from Ham Vocke, [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), and Toby Clemson, [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/).
