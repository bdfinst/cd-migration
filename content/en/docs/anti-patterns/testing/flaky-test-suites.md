---
title: "Flaky Test Suites"
linkTitle: "Flaky Test Suites"
weight: 18
category: "Testing & Quality"
risk_level: high
description: >
  Tests randomly pass or fail. Developers rerun the pipeline until it goes green. Nobody trusts
  the test suite to tell them anything useful.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A developer pushes a change. The pipeline fails. They look at the failure - it is a test they did
not touch, in a module they did not change. They click "rerun." It passes. They merge.

This happens multiple times a day across the team. Nobody investigates failures on the first
occurrence because the odds favor flakiness over a real problem. When someone mentions a test
failure in standup, the first question is "did you rerun it?" not "what broke?"

Common variations:

- **The nightly lottery.** The full suite runs overnight. Every morning, a different random subset
  of tests is red. Someone triages the failures, marks most as flaky, and the team moves on. Real
  regressions hide in the noise.
- **The retry-until-green pattern.** The pipeline configuration automatically reruns failed tests
  two or three times. If a test passes on any attempt, it counts as passed. The team considers
  this solved. In reality, it masks failures and doubles or triples pipeline duration.
- **The "known flaky" tag.** Tests are annotated with a skip or known-flaky marker. The suite
  ignores them. The list grows over time. Nobody goes back to fix them because they are out of
  sight.
- **Environment-dependent failures.** Tests pass on developer machines but fail in CI, or pass in
  CI but fail on Tuesdays. The failures correlate with shared test environments, time-of-day
  load patterns, or external service availability.
- **Test order dependency.** Tests pass when run in a specific order but fail when run in
  isolation or in a different sequence. Shared mutable state from one test leaks into another.

The telltale sign: the team has a shared understanding that the first pipeline failure "doesn't
count." Rerunning the pipeline is a routine step, not an exception.

## Why This Is a Problem

Flaky tests are not a minor annoyance. They systematically destroy the value of the test suite by
making it impossible to distinguish signal from noise. A test suite that sometimes lies is worse
than no test suite at all, because it creates an illusion of safety.

### It reduces quality

When tests fail randomly, developers stop trusting them. The rational response to a flaky suite
is to ignore failures - and that is exactly what happens. A developer whose pipeline fails three
times a week for reasons unrelated to their code learns to click "rerun" without reading the
error message.

This behavior is invisible most of the time. It becomes catastrophic when a real regression
happens. The test that catches the regression fails, the developer reruns because "it's probably
flaky," it passes on the second run because the flaky behavior went the other way, and the
regression ships to production. The test did its job, but the developer's trained behavior
neutralized it.

In a suite with zero flaky tests, every failure demands investigation. Developers read the error,
find the cause, and fix it. Failures are rare and meaningful. The suite functions as a reliable
quality gate.

### It increases rework

Flaky tests cause rework in two ways. First, developers spend time investigating failures that
turn out to be noise. A developer sees a test failure, spends 20 minutes reading the error and
reviewing their change, realizes the failure is unrelated, and reruns. Multiply this by every
developer on the team, multiple times per day.

Second, the retry-until-green pattern extends pipeline duration. A pipeline that should take 8
minutes takes 20 because failed tests are rerun automatically. Developers wait longer for
feedback, context-switch more, and lose more time to task switching.

Teams with deterministic test suites waste zero time investigating flaky failures. Their pipeline
runs once, gives an answer, and the developer acts on it.

### It makes delivery timelines unpredictable

A flaky suite introduces randomness into the delivery process. The same code, submitted twice,
might pass the pipeline on the first attempt or take three reruns. Lead time from commit to merge
varies not because of code quality but because of test noise.

When the team needs to ship urgently, flaky tests become a source of anxiety. "Will the pipeline
pass this time?" The team starts planning around the flakiness - running the pipeline early "in
case it fails," avoiding changes late in the day because there might not be time for reruns. The
delivery process is shaped by the unreliability of the tests rather than by the quality of the
code.

Deterministic tests make delivery time a function of code quality alone. The pipeline is a
predictable step that takes the same amount of time every run. There are no surprises.

### It normalizes ignoring failures

The most damaging effect of flaky tests is cultural. Once a team accepts that test failures are
often noise, the standard for investigating failures drops permanently. New team members learn
from day one that "you just rerun it." The bar for adding a flaky test to the suite is low
because one more flaky test is barely noticeable when there are already dozens.

This normalization extends beyond tests. If the team tolerates unreliable automated checks, they
will tolerate unreliable monitoring, unreliable alerts, and unreliable deploys. Flaky tests teach
the team that automation is not trustworthy - exactly the opposite of what CD requires.

### Impact on continuous delivery

Continuous delivery depends on automated quality gates that the team trusts completely. A flaky
suite is a quality gate with a broken lock - it looks like it is there, but it does not actually
stop anything. Developers bypass it by rerunning. Regressions pass through it by luck.

The pipeline must be a machine that answers one question with certainty: "Is this change safe to
deploy?" A flaky suite answers "probably, maybe, rerun and ask again." That is not a foundation
you can build continuous delivery on.

## How to Fix It

### Step 1: Measure the flakiness (Week 1)

Before fixing anything, quantify the problem:

1. Collect pipeline run data for the last 30 days. Count the number of runs that failed and were
   rerun without code changes.
2. Identify which specific tests failed across those reruns. Rank them by failure frequency.
3. Calculate the pipeline pass rate: what percentage of first-attempt runs succeed?

This gives you a hit list and a baseline. If your first-attempt pass rate is 60%, you know 40% of
pipeline runs are wasted on flaky failures.

### Step 2: Quarantine the worst offenders (Week 1)

Take the top 10 flakiest tests and move them out of the pipeline-gating suite immediately. Do not
fix them yet - just remove them from the critical path.

- Move them to a separate test suite that runs on a schedule (nightly or hourly) but does not
  block merges.
- Create a tracking issue for each quarantined test with its failure rate and the suspected cause.

This immediately improves pipeline reliability. The team sees fewer false failures on day one.

### Step 3: Fix or replace quarantined tests (Weeks 2-4)

Work through the quarantined tests systematically. For each one, identify the root cause:

| Root cause | Fix |
|-----------|-----|
| Shared mutable state (database, filesystem, cache) | Isolate test data. Each test creates and destroys its own state. Use transactions or test containers. |
| Timing dependencies (sleep, setTimeout, polling) | Replace time-based waits with event-based waits. Wait for a condition, not a duration. |
| Test order dependency | Ensure each test is self-contained. Run tests in random order to surface hidden dependencies. |
| External service dependency | Replace with a test double. Validate the double with a contract test. |
| Race conditions in async code | Use deterministic test patterns. Await promises. Avoid fire-and-forget in test code. |
| Resource contention (ports, files, shared environments) | Allocate unique resources per test. Use random ports. Use temp directories. |

For each quarantined test, either fix it and return it to the gating suite or replace it with a
deterministic lower-level test that covers the same behavior.

### Step 4: Prevent new flaky tests from entering the suite (Week 3+)

Establish guardrails so the problem does not recur:

1. Run new tests 10 times in CI before merging them. If any run fails, the test is flaky and must
   be fixed before it enters the suite.
2. Run the full suite in random order. This surfaces order-dependent tests immediately.
3. Track the pipeline first-attempt pass rate as a team metric. Make it visible on a dashboard.
   Set a target (e.g., 95%) and treat drops below the target as incidents.
4. Add a team working agreement: flaky tests are treated as bugs with the same priority as
   production defects.

### Step 5: Eliminate automatic retries (Week 4+)

If the pipeline is configured to automatically retry failed tests, turn it off. Retries mask
flakiness instead of surfacing it. Once the quarantine and prevention steps are in place, the
suite should be reliable enough to run once.

If a test fails, it should mean something. Retries teach the team that failures are meaningless.

| Objection | Response |
|-----------|----------|
| "Retries are fine - they handle transient issues" | Transient issues in a test suite are a symptom of external dependencies or shared state. Fix the root cause instead of papering over it with retries. |
| "We don't have time to fix flaky tests" | Calculate the time the team spends rerunning pipelines and investigating false failures. It is almost always more than the time to fix the flaky tests. |
| "Some flakiness is inevitable with E2E tests" | That is an argument for fewer E2E tests, not for tolerating flakiness. Push the test down to a level where it can be deterministic. |
| "The flaky test sometimes catches real bugs" | A test that catches real bugs 5% of the time and false-alarms 20% of the time is a net negative. Replace it with a deterministic test that catches the same bugs 100% of the time. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Pipeline first-attempt pass rate | Should climb toward 95%+ |
| Number of quarantined tests | Should decrease to zero as tests are fixed or replaced |
| Pipeline reruns per week | Should drop to near zero |
| [Build duration](../../../reference/metrics/build-duration/) | Should decrease as retries are removed |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should decrease as developers stop waiting for reruns |
| Developer trust survey | Ask quarterly: "Do you trust the test suite to catch real problems?" Answers should improve. |

## Related Content

- [Testing Fundamentals](../../../foundations/testing-fundamentals/) - Building a reliable test strategy from the ground up
- [Inverted Test Pyramid](../inverted-test-pyramid/) - Flakiness often stems from too many E2E tests
- [Deterministic Pipeline](../../../pipeline/deterministic-pipeline/) - The pipeline must give the same answer every time
- [Build Automation](../../../foundations/build-automation/) - The pipeline infrastructure tests run in
- [Working Agreements](../../../foundations/working-agreements/) - Team norms for test reliability
