---
title: "Testing Fundamentals"
linkTitle: "Testing Fundamentals"
weight: 2
description: >
  Build a test architecture that gives your pipeline the confidence to deploy any change, even when dependencies outside your control are unavailable.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | Adapted from [Dojo Consortium](https://dojoconsortium.org)

Before you can trust your pipeline, you need a test suite that is fast, deterministic, and catches
real defects. But a collection of tests is not enough. You need a **test architecture** - a
deliberate structure where different types of tests work together to give you the confidence to
deploy every change, regardless of whether external systems are up, slow, or behaving
unexpectedly.
{{% /pageinfo %}}

## Why Testing Is a Foundation

Continuous delivery requires that trunk always be releasable. The only way to know trunk is
releasable is to test it - automatically, on every change. Without a reliable test suite, daily
integration is just daily risk.

In many organizations, testing is the single biggest obstacle to CD adoption. Not because teams
lack tests, but because the tests they have are slow, flaky, poorly structured, and - most
critically - unable to give the pipeline a reliable answer to the question: **is this change safe
to deploy?**

## Testing Goals for CD

Your test suite must meet these criteria before it can support continuous delivery:

| Goal | Target | Why |
|------|--------|-----|
| **Fast** | Full suite completes in under 10 minutes | Developers need feedback before context-switching |
| **Deterministic** | Same code always produces the same test result | Flaky tests destroy trust and get ignored |
| **Catches real bugs** | Tests fail when behavior is wrong, not when implementation changes | Brittle tests create noise, not signal |
| **Independent of external systems** | Pipeline can determine deployability without any dependency being available | Your ability to deploy cannot be held hostage by someone else's outage |

If your test suite does not meet these criteria today, improving it is your highest-priority
foundation work.

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
   These tests use [test doubles](../../../reference/testing/test-doubles/) for anything outside
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

The ice cream cone makes CD impossible. Manual testing gates block every release. End-to-end tests
take hours, fail randomly, and depend on external systems being healthy. The pipeline cannot give
a fast, reliable answer about deployability, so deployments become high-ceremony events.

## What to Test - and What Not To

Before diving into the architecture, internalize the mindset that makes it work. The test
architecture below is not just a structure to follow - it flows from a few principles about
what testing should focus on and what it should ignore.

### Interfaces are the most important thing to test

Most integration failures originate at interfaces - the boundaries where your system talks to
other systems. These boundaries are the highest-risk areas in your codebase, and they deserve
the most testing attention. But testing interfaces does not require integrating with the real
system on the other side.

When you test an interface you consume, the question is: **"Can I understand the response and
act accordingly?"** If you send a request for a user's information, you do not test that you
get that specific user back. You test that you receive and understand the properties you need -
that your code can parse the response structure and make correct decisions based on it. This
distinction matters because it keeps your tests deterministic and focused on what you control.

Use contract mocks, [virtual services](../../../reference/glossary/#virtual-service), or any
test double that faithfully represents the interface contract. The test validates your side of
the conversation, not theirs.

### Frontend and backend follow the same pattern

Both frontend and backend applications provide interfaces to consumers and consume interfaces
from providers. The only difference is the consumer: a frontend provides an interface for
humans, while a backend provides one for machines. The testing strategy is the same.

For a frontend:

- **Validate the interface you provide.** The UI contains the components it should and they
  appear correctly. This is the equivalent of verifying your API returns the right response
  structure.
- **Test behavior isolated from presentation.** Use your unit test framework to test the
  logic that UI controls trigger, separated from the rendering layer. This gives you the same
  speed and control you get from testing backend logic in isolation.
- **Verify that controls trigger the right logic.** Confirm that user actions invoke the
  correct behavior, without needing a running backend or browser-based E2E test.

This approach gives you targeted testing with far more control. Testing exception flows -
what happens when a service returns an error, when a network request times out, when data is
malformed - becomes straightforward instead of requiring elaborate E2E setups that are hard
to make fail on demand.

### If you cannot fix it, do not test for it

This is the principle that most teams get wrong. You should never test the behavior of
services you consume. Testing their behavior is the responsibility of the team that builds
them. If their service returns incorrect data, you cannot fix that - so testing for it is
waste.

What you **should** test is how your system responds when a consumed service is unstable or
unavailable. Can you degrade gracefully? Do you return a meaningful error? Do you retry
appropriately? These are behaviors you own and can fix, so they belong in your test suite.

This principle directly enables the test architecture below. When you stop testing things you
cannot fix, you stop depending on external systems in your pipeline. Your tests become faster,
more deterministic, and more focused on the code your team actually ships.

## Test Architecture for the CD Pipeline

A test architecture is the deliberate structure of how different test types work together across
your pipeline to give you deployment confidence. Each layer has a specific role, and the layers
reinforce each other.

### Layer 1: Unit tests - verify behavior in isolation

Unit tests exercise a unit of behavior - a single meaningful action or decision your code
makes - with all external dependencies replaced by
[test doubles](../../../reference/testing/test-doubles/). They use a
[black box](../../../reference/glossary/#black-box-testing) approach: assert on what the code
produces, not on how it works internally. They are the fastest and most deterministic tests you
have.

**Role in CD:** Catch logic errors, regressions, and edge cases instantly. Provide the tightest
feedback loop - developers should see results in seconds while coding. Because they test
behavior rather than implementation, they survive refactoring without breaking.

**What they cannot do:** Verify that components work together, that your code correctly calls
external services, or that the system behaves correctly as a whole.

See [Unit Tests](../../../reference/testing/unit/) for detailed guidance.

#### Sociable vs solitary unit tests

Unit tests fall into two styles. **Solitary** unit tests replace every collaborator with a test
double so the class under test runs completely alone. **Sociable** unit tests allow the code to
use its real collaborators, only substituting test doubles for external dependencies (databases,
network calls, file systems).

Prefer sociable unit tests as your default. Solitary tests can over-specify internal structure,
tying your tests to implementation details that break during refactoring. Sociable tests exercise
the real interactions between objects, catching integration issues earlier without sacrificing
speed. Reserve solitary tests for cases where a collaborator is expensive, non-deterministic, or
not yet built.

### Layer 2: Integration tests - verify boundaries

Integration tests verify that components interact correctly at their boundaries: database queries
return the expected data, HTTP clients serialize requests correctly, message producers format
messages as expected. External systems are replaced with test doubles, but internal collaborators
are real.

**Role in CD:** Catch the bugs that unit tests miss - mismatched interfaces, serialization errors,
query bugs. These tests are fast enough to run on every commit but realistic enough to catch
real integration failures.

**What they cannot do:** Verify that the system works end-to-end from a user's perspective, or
that your assumptions about external services are still correct.

The line between unit tests and integration tests is often debated. As Ham Vocke writes in
[The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html):
the naming matters less than the discipline. The key question is whether the test is fast,
deterministic, and tests something your unit tests cannot. If yes, it belongs here.

See [Integration Tests](../../../reference/testing/integration/) for detailed guidance.

### Layer 3: Functional tests - verify your system works in isolation

Functional tests (also called component tests) exercise your entire sub-system - your service,
your application - from the outside, as a user or consumer would interact with it. All external
dependencies are replaced with test doubles. The test boots your application, sends real HTTP
requests or simulates real user interactions, and verifies the responses.

**Role in CD:** This is the layer that proves your system works as a complete unit, independent
of everything else. Functional tests answer: "if we deploy this service right now, will it
behave correctly for every interaction that is within our control?" Because all external
dependencies are stubbed, these tests are deterministic and fast. They can run on every commit.

**Why this layer is critical for CD:** Functional tests are what allow you to deploy with
confidence even when dependencies outside your control are unavailable. Your test doubles
simulate the expected behavior of those dependencies. As long as your doubles are accurate (which
is what contract tests verify), your functional tests prove your system handles those interactions
correctly.

See [Functional Tests](../../../reference/testing/functional/) for detailed guidance.

### Layer 4: Contract tests - verify your assumptions about others

Contract tests validate that the test doubles you use in layers 1-3 still accurately represent
the real external systems. They run against live dependencies and check contract format - response
structures, field names, types, and status codes - not specific data values.

**Role in CD:** Contract tests are the bridge between your fast, deterministic test suite and the
real world. Without them, your test doubles can silently drift from reality, and your functional
tests provide false confidence. With them, you know that the assumptions baked into your test
doubles are still correct.

**Consumer-driven contracts** take this further: the consumer of an API publishes expectations
(using tools like [Pact](https://pact.io/)), and the provider runs those expectations as part of
their build. Both teams know immediately when a change would break the contract.

Contract tests are **non-deterministic** because they hit live systems. They should not block
your pipeline. Instead, failures trigger a review: has the contract changed, or was it a transient
network issue? If the contract has changed, update your test doubles and re-verify.

See [Contract Tests](../../../reference/testing/contract/) for detailed guidance.

### Layer 5: End-to-end tests - verify the integrated system post-deployment

End-to-end tests validate complete user journeys through the fully integrated system with no
test doubles. They run against real services, real databases, and real third-party integrations.

**Role in CD:** E2E tests are monitoring, not gating. They run after deployment to verify that
the integrated system works. A small suite of smoke tests can run immediately post-deployment
to catch gross integration failures. Broader E2E suites run on a schedule.

**Why E2E tests should not gate your pipeline:** E2E tests are non-deterministic. They fail for
reasons unrelated to your change - network blips, third-party outages, shared environment
instability. If your pipeline depends on E2E tests passing before you can deploy, your deployment
frequency is limited by the reliability of every system in the chain. This is the opposite of the
independence CD requires.

See [End-to-End Tests](../../../reference/testing/e2e/) for detailed guidance.

### How the layers work together

```
Pipeline stage    Test layer              Deterministic?   Blocks deploy?
─────────────────────────────────────────────────────────────────────────
On every commit   Unit tests              Yes              Yes
                  Integration tests       Yes              Yes
                  Functional tests        Yes              Yes

Asynchronous      Contract tests          No               No (triggers review)

Post-deployment   E2E smoke tests         No               Triggers rollback if critical
                  Synthetic monitoring    No               Triggers alerts
```

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
runs, both of which undermine continuous integration.

**Post-merge** (after code lands on trunk, before or after deployment): Re-run the full
deterministic suite against the integrated trunk to catch merge-order interactions. Run contract
tests, E2E smoke tests, and synthetic monitoring. Target: under 30 minutes for the full
post-merge cycle.

Why re-run pre-merge tests post-merge? Two changes can each pass pre-merge independently but
conflict when combined on trunk. The post-merge run catches these integration effects. If a
post-merge failure occurs, the team fixes it immediately - trunk must always be releasable.

## Starting Without Full Coverage

Teams often delay adopting CI because their existing code lacks tests. This is backwards. You do
not need tests for existing code to begin. You need one rule applied without exception:

> **Every new change gets a test. We will not go lower than the current level of code coverage.**

Record your current coverage percentage as a baseline. Configure CI to fail if coverage drops
below that number. This does not mean the baseline is good enough - it means the trend only moves
in one direction. Every bug fix, every new feature, and every refactoring adds tests. Over time,
coverage grows organically in the areas that matter most: the code that is actively changing.

Do not attempt to retrofit tests across the entire codebase before starting CI. That approach
takes months, delivers no incremental value, and often produces low-quality tests written by
developers who are testing code they did not write and do not fully understand.

## Test Quality Over Coverage Percentage

Code coverage tells you which lines executed during tests. It does not tell you whether the tests
verified anything meaningful. A test suite with 90% coverage and no assertions has high coverage
and zero value.

Better questions than "what is our coverage percentage?":

- When a test fails, does it point directly to the defect?
- When we refactor, do tests break because behavior changed or because implementation details
  shifted?
- Do our tests catch the bugs that actually reach production?
- Can a developer trust a green build enough to deploy immediately?

**Why coverage mandates are harmful.** When teams are required to hit a coverage target, they
write tests to satisfy the metric rather than to verify behavior. This produces tests that
exercise code paths without asserting outcomes, tests that mirror implementation rather than
specify behavior, and tests that inflate the number without improving confidence. The metric goes
up while the defect escape rate stays the same. Worse, meaningless tests add maintenance cost and
slow down the suite.

Instead of mandating a coverage number, set a floor (as described above) and focus team
attention on test quality: mutation testing scores, defect escape rates, and whether developers
actually trust the suite enough to deploy on green.

## Week 1 Action Plan

If your test suite is not yet ready to support CD, use this focused action plan to make immediate
progress.

### Day 1-2: Audit your current test suite

Assess where you stand before making changes.

**Actions:**

- Run your full test suite 3 times. Note total duration and any tests that pass intermittently
  (flaky tests).
- Count tests by type: unit, integration, functional, end-to-end.
- Identify tests that require external dependencies (databases, APIs, file systems) to run.
- Record your baseline: total test count, pass rate, duration, flaky test count.
- Map each test type to a pipeline stage. Which tests gate deployment? Which run asynchronously?
  Which tests couple your deployment to external systems?

**Output:** A clear picture of your test distribution and the specific problems to address.

### Day 2-3: Fix or remove flaky tests

Flaky tests are worse than no tests. They train developers to ignore failures, which means real
failures also get ignored.

**Actions:**

- Quarantine all flaky tests immediately. Move them to a separate suite that does not block the
  build.
- For each quarantined test, decide: fix it (if the behavior it tests matters) or delete it (if
  it does not).
- Common causes of flakiness: timing dependencies, shared mutable state, reliance on external
  services, test order dependencies.
- Target: zero flaky tests in your main test suite by end of week.

### Day 3-4: Decouple your pipeline from external dependencies

This is the highest-leverage change for CD. Identify every test that calls a real external service
and replace that dependency with a test double.

**Actions:**

- List every external service your tests depend on: databases, APIs, message queues, file
  storage, third-party services.
- For each dependency, decide the right test double approach:
  - **In-memory fakes** for databases (e.g., SQLite, H2, testcontainers with local instances).
  - **HTTP stubs** for external APIs (e.g., WireMock, nock, MSW).
  - **Fakes** for message queues, email services, and other infrastructure.
- Replace the dependencies in your unit, integration, and functional tests.
- Move the original tests that hit real services into a separate suite - these become your
  starting contract tests or E2E smoke tests.

**Output:** A test suite where everything that blocks the build is deterministic and runs without
network access to external systems.

### Day 4-5: Add functional tests for critical paths

If you don't have functional tests (component tests) that exercise your whole service in
isolation, start with the most critical paths.

**Actions:**

- Identify the 3-5 most critical user journeys or API endpoints in your application.
- Write a functional test for each: boot the application, stub external dependencies, send a
  real request or simulate a real user action, verify the response.
- Each functional test should prove that the feature works correctly assuming external
  dependencies behave as expected (which your test doubles encode).
- Run these in CI on every commit.

### Day 5: Set up contract tests for your most important dependency

Pick the external dependency that changes most frequently or has caused the most production
issues. Set up a contract test for it.

**Actions:**

- Write a contract test that validates the response structure (types, required fields, status
  codes) of the dependency's API.
- Run it on a schedule (e.g., every hour or daily), not on every commit.
- When it fails, update your test doubles to match the new reality and re-verify your
  functional tests.
- If the dependency is owned by another team in your organization, explore consumer-driven
  contracts with a tool like [Pact](https://pact.io/).

## Test-Driven Development (TDD)

TDD is the practice of writing the test before the code. It is the most effective way to build a
reliable test suite because it ensures every piece of behavior has a corresponding test.

**The TDD cycle:**

1. **Red:** Write a failing test that describes the behavior you want.
2. **Green:** Write the minimum code to make the test pass.
3. **Refactor:** Improve the code without changing the behavior. The test ensures you do not
   break anything.

**Why TDD supports CD:**

- Every change is automatically covered by a test
- The test suite grows proportionally with the codebase
- Tests describe behavior, not implementation, making them more resilient to refactoring
- Developers get immediate feedback on whether their change works

TDD is not mandatory for CD, but teams that practice TDD consistently have significantly faster
and more reliable test suites.

### Getting started with TDD

If your team is new to TDD, start small:

1. Pick one new feature or bug fix this week.
2. Write the test first, watch it fail.
3. Write the code to make it pass.
4. Refactor.
5. Repeat for the next change.

Do not try to retroactively TDD your entire codebase. Apply TDD to new code and to any code you
modify.

## Testing Matrix

Use this reference to decide what type of test to write and where it runs in your pipeline.

| What You Need to Verify | Test Type | Speed | Deterministic? | Blocks Deploy? | See Also |
|--------------------------|-----------|-------|----------------|----------------|----------|
| A function or method behaves correctly | [Unit](../../../reference/testing/unit/) | Milliseconds | Yes | Yes | |
| Components interact correctly at a boundary | [Integration](../../../reference/testing/integration/) | Milliseconds to seconds | Yes | Yes | |
| Your whole service works in isolation | [Functional](../../../reference/testing/functional/) | Seconds | Yes | Yes | |
| Your test doubles match reality | [Contract](../../../reference/testing/contract/) | Seconds | No | No | |
| A critical user journey works end-to-end | [E2E](../../../reference/testing/e2e/) | Minutes | No | No | |
| Code quality, security, and style compliance | [Static Analysis](../../../reference/testing/static/) | Seconds | Yes | Yes | |

## Best Practices Summary

### Do

- **Run tests on every commit.** If tests do not run automatically, they will be skipped.
- **Keep the deterministic suite under 10 minutes.** If it is slower, developers will stop
  running it locally.
- **Fix broken tests immediately.** A broken test is equivalent to a broken build.
- **Delete tests that do not provide value.** A test that never fails and tests trivial behavior
  is maintenance cost with no benefit.
- **Test behavior, not implementation.** Use a
  [black box](../../../reference/glossary/#black-box-testing) approach - verify what the code
  does, not how it does it. As Ham Vocke advises: "if I enter values `x` and `y`, will the
  result be `z`?" - not the sequence of internal calls that produce `z`. Avoid
  [white box testing](../../../reference/glossary/#white-box-testing) that asserts on internals.
- **Use test doubles for external dependencies.** Your deterministic tests should run without
  network access to external systems.
- **Validate test doubles with contract tests.** Test doubles that drift from reality give false
  confidence.
- **Treat test code as production code.** Give it the same care, review, and refactoring
  attention.

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

## Using Tests to Find and Eliminate Defect Sources

A test suite that catches bugs is good. A test suite that helps you **stop producing those bugs**
is transformational. Every test failure is evidence of a defect, and every defect has a source. If
you treat test failures only as things to fix, you are doing rework. If you treat them as
diagnostic data about where your process breaks down, you can make systemic changes that prevent
entire categories of defects from occurring.

This is the difference between a team that writes more tests to catch more bugs and a team that
changes how it works so that fewer bugs are created in the first place.

Two questions sharpen this thinking:

1. **What is the earliest point we can detect this defect?** The later a defect is found, the
   more expensive it is to fix. A requirements defect caught during example mapping costs
   minutes. The same defect caught in production costs days of incident response, rollback,
   and rework.
2. **Can AI help us detect it earlier?** AI-assisted tools can now surface defects at stages
   where only human review was previously possible, shifting detection left without adding
   manual effort.

### Trace every defect to its origin

When a test catches a defect - or worse, when a defect escapes to production - ask: **where was
this defect introduced, and what would have prevented it from being created?**

Defects do not originate randomly. They cluster around specific causes. The
[CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/)
documents over 30 defect types across eight categories, with detection methods, AI
opportunities, and systemic fixes for each. The examples below illustrate the pattern for
the defect sources most commonly encountered during a CD migration.

### Requirements

| | |
|---|---|
| **Example defects** | Building the right thing wrong, or the wrong thing right |
| **Earliest detection** | Discovery - before coding begins, during story refinement or example mapping |
| **Traditional detection** | UX analytics, task completion tracking, A/B testing (all post-deployment) |
| **AI-assisted detection** | LLM review of acceptance criteria to flag ambiguity, missing edge cases, or contradictions before development begins. AI-generated test scenarios from user stories to validate completeness. |
| **Systemic fix** | Acceptance criteria as user outcomes, not implementation tasks. Three Amigos sessions before work starts. Example mapping to surface edge cases before coding begins. |

### Missing domain knowledge

| | |
|---|---|
| **Example defects** | Business rules encoded incorrectly, implicit assumptions, tribal knowledge loss |
| **Earliest detection** | During coding - when the developer writes the logic |
| **Traditional detection** | Magic number detection, knowledge-concentration metrics, bus factor analysis from git history |
| **AI-assisted detection** | Identify undocumented business rules, missing context that a new developer would hit, and knowledge gaps. Compare implementation against domain documentation or specification files. |
| **Systemic fix** | Embed domain rules in code using ubiquitous language (DDD). Pair programming to spread knowledge. Living documentation generated from code. Rotate ownership regularly. |

### Integration boundaries

| | |
|---|---|
| **Example defects** | Interface mismatches, wrong assumptions about upstream behavior, race conditions at service boundaries |
| **Earliest detection** | During design - when defining the interface contract |
| **Traditional detection** | Consumer-driven contract tests, schema validation, chaos engineering, fault injection |
| **AI-assisted detection** | Review code and documentation to identify undocumented behavioral assumptions (timeouts, retries, error semantics). Predict which consumers break from API changes based on usage patterns when formal contracts do not exist. |
| **Systemic fix** | Contract tests mandatory per boundary. API-first design. Document behavioral contracts, not just data schemas. Circuit breakers as default at every external boundary. |

### Untested edge cases

| | |
|---|---|
| **Example defects** | Null handling, boundary values, error paths |
| **Earliest detection** | Pre-commit - through null-safe type systems and static analysis in the IDE |
| **Traditional detection** | Mutation testing, branch coverage thresholds, property-based testing |
| **AI-assisted detection** | Analyze code paths and generate tests for untested boundaries, null paths, and error conditions the developer did not consider. Triage surviving mutants by risk. |
| **Systemic fix** | Require a test for every bug fix. Adopt property-based testing for logic with many input permutations. Boundary value analysis as a standard practice. Enforce null-safe type systems. |

### Unintended side effects

| | |
|---|---|
| **Example defects** | Change to module A breaks module B, unexpected feature interactions |
| **Earliest detection** | At commit time - when CI runs the full test suite |
| **Traditional detection** | Mutation testing, change impact analysis, feature flag interaction matrix |
| **AI-assisted detection** | Reason about semantic change impact beyond syntactic dependencies. Map a diff to affected modules and flag untested downstream paths before the commit reaches CI. |
| **Systemic fix** | Small focused commits. Trunk-based development (integrate daily so side effects surface immediately). Feature flags with controlled rollout. Modular design with clear boundaries. |

### Accumulated complexity

| | |
|---|---|
| **Example defects** | Defects cluster in the most complex, most-changed files |
| **Earliest detection** | Continuously - through static analysis in the IDE and CI |
| **Traditional detection** | Complexity trends, duplication scoring, dependency cycle detection |
| **AI-assisted detection** | Identify architectural drift, abstraction decay, and calcified workarounds that static analysis misses. Cross-reference change frequency with defect history to prioritize refactoring. |
| **Systemic fix** | Refactoring as part of every story, not deferred to a "tech debt sprint." Dedicated complexity budget. Treat rising complexity as a leading indicator. |

### Process and deployment

| | |
|---|---|
| **Example defects** | Long-lived branches causing merge conflicts, manual pipeline steps introducing human error, excessive batching increasing blast radius, weak rollback causing extended outages |
| **Earliest detection** | Pre-commit for branch age; CI for pipeline and batching issues |
| **Traditional detection** | Branch age alerts, merge conflict frequency, pipeline audit for manual gates, changes-per-deploy metrics, rollback testing |
| **AI-assisted detection** | Automated risk scoring from change diffs and deployment history. Blast radius analysis. Auto-approve low-risk changes and flag high-risk with evidence, replacing manual change advisory boards. |
| **Systemic fix** | Trunk-based development. Automate every step from commit to production. Single-piece flow with feature flags. Blue/green or canary as default deployment strategy. |

### Data and state

| | |
|---|---|
| **Example defects** | Null pointer exceptions, schema migration failures, cache invalidation errors, concurrency issues |
| **Earliest detection** | Pre-commit for null safety; CI for schema compatibility |
| **Traditional detection** | Null safety static analysis, schema compatibility checks, migration dry-runs, thread sanitizers |
| **AI-assisted detection** | Predict downstream impact of schema changes by understanding how consumers actually use data. Flag code where optional fields are used without null checks, even in non-strict languages. |
| **Systemic fix** | Enforce null-safe types. Expand-then-contract for all schema changes. Design for idempotency. Short TTLs over complex cache invalidation. |

For the complete catalog covering all defect categories - including product and discovery,
dependency and infrastructure, testing and observability gaps, and more - see the
[CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/).

### Build a defect feedback loop

Knowing the categories is not enough. You need a process that systematically connects test
failures to root causes and root causes to systemic fixes.

**Step 1: Classify every defect.** When a test fails or a bug is reported, tag it with its origin
category from the table above. This takes seconds and builds a dataset over time.

**Step 2: Look for patterns.** Monthly (or during retrospectives), review the defect
classifications. Which categories appear most often? That is where your process is weakest.

**Step 3: Apply the systemic fix, not just the local fix.** When you fix a bug, also ask: what
systemic change would prevent this entire category of bug? If most defects come from integration
boundaries, the fix is not "write more integration tests" - it is "make contract tests mandatory
for every new boundary." If most defects come from untested edge cases, the fix is not "increase
code coverage" - it is "adopt property-based testing as a standard practice."

**Step 4: Measure whether the fix works.** Track defect counts by category over time. If you
applied a systemic fix for integration boundary defects and the count does not drop, the fix is
not working and you need a different approach.

### The test-for-every-bug-fix rule

One of the most effective systemic practices: **every bug fix must include a test that
reproduces the bug before the fix and passes after.** This is non-negotiable for CD because:

- It proves the fix actually addresses the defect (not just the symptom).
- It prevents the same defect from recurring.
- It builds test coverage exactly where the codebase is weakest - the places where bugs actually
  occur.
- Over time, it shifts your test suite from "tests we thought to write" to "tests that cover
  real failure modes."

### Advanced detection techniques

As your test architecture matures, add techniques that find defects humans overlook:

| Technique | What It Finds | When to Adopt |
|-----------|---------------|---------------|
| **Mutation testing** (Stryker, PIT) | Tests that pass but do not actually verify behavior - your test suite's blind spots | When basic coverage is in place but defect escape rate is not dropping |
| **Property-based testing** | Edge cases and boundary conditions across large input spaces that example-based tests miss | When defects cluster around unexpected input combinations |
| **Chaos engineering** | Failure modes in distributed systems - what happens when a dependency is slow, returns errors, or disappears | When you have functional tests and contract tests in place and need confidence in failure handling |
| **Static analysis and linting** | Null safety violations, type errors, security vulnerabilities, dead code | From day one - these are cheap and fast |

For more examples of mapping defect origins to detection methods and systemic corrections, see
the [CD Defect Detection and Remediation Catalog](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/).

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Deterministic suite duration | < 10 minutes | Enables fast feedback loops |
| Flaky test count | 0 in pipeline-gating suite | Maintains trust in test results |
| External dependencies in gating tests | 0 | Ensures deployment independence |
| Test coverage trend | Increasing | Confirms new code is being tested |
| Defect escape rate | Decreasing | Confirms tests catch real bugs |
| Contract test freshness | All passing within last 24 hours | Confirms test doubles are current |

## Next Step

With a reliable test suite in place, automate your build process so that building, testing, and
packaging happens with a single command. Continue to [Build Automation](../build-automation/).

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Additional concepts
> drawn from Ham Vocke,
> [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html),
> and Toby Clemson,
> [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/).

---

## Related Content

- [Flaky Tests](../../../symptoms/testing/flaky-tests/) - Symptom of non-deterministic tests that destroy pipeline trust
- [High Coverage, Ineffective Tests](../../../symptoms/testing/high-coverage-ineffective-tests/) - Symptom where coverage metrics mask poor test quality
- [Refactoring Breaks Tests](../../../symptoms/testing/refactoring-breaks-tests/) - Symptom of white-box tests that assert on implementation details
- [Slow Test Suites](../../../symptoms/testing/slow-test-suites/) - Symptom caused by an inverted test pyramid or missing test doubles
- [Environment-Dependent Failures](../../../symptoms/testing/environment-dependent-failures/) - Symptom of tests coupled to external systems
- [Inverted Test Pyramid](../../../anti-patterns/testing/inverted-test-pyramid/) - Anti-pattern where too many slow E2E tests replace fast unit tests
- [Pressure to Skip Testing](../../../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - Anti-pattern where testing is treated as optional under deadline pressure
