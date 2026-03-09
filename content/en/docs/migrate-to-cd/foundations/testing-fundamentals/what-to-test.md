---
title: "What to Test - and What Not To"
linkTitle: "What to Test"
weight: 1
description: >
  The principles that determine what belongs in your test suite and what does not - focusing on interfaces, isolating what you control, and applying the same pattern to frontend and backend.
---

Three principles determine what belongs in your test suite and what does not.

## If you cannot fix it, do not test for it

You should never test the behavior of
services you consume. Testing their behavior is the responsibility of the team that builds
them. If their service returns incorrect data, you cannot fix that, so testing for it is
waste.

What you **should** test is how your system responds when a consumed service is unstable or
unavailable. Can you degrade gracefully? Do you return a meaningful error? Do you retry
appropriately? These are behaviors you own and can fix, so they belong in your test suite.

This principle directly enables the [pipeline test strategy]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/pipeline-test-strategy" >}}). When you stop testing things you
cannot fix, you stop depending on external systems in your [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). Your tests become faster,
more deterministic, and more focused on the code your team actually ships.

## Test interfaces first

Most integration failures originate at interfaces, the boundaries where your system talks to
other systems. These boundaries are the highest-risk areas in your codebase, and they deserve
the most testing attention. But testing interfaces does not require integrating with the real
system on the other side.

When you test an interface you consume, the question is: **"Can I understand the response and
act accordingly?"** If you send a request for a user's information, you do not test that you
get that specific user back. You test that you receive and understand the properties you need -
that your code can parse the response structure and make correct decisions based on it. This
distinction matters because it keeps your tests deterministic and focused on what you control.

Use contract mocks, [virtual services]({{< relref "/docs/reference/glossary#virtual-service" >}}), or any
test double that faithfully represents the interface contract. The test validates your side of
the conversation, not theirs.

## Frontend and backend follow the same pattern

Both frontend and backend applications provide interfaces to consumers and consume interfaces
from providers. The only difference is the consumer: a frontend provides an interface for
humans, while a backend provides one for machines. The testing strategy is the same.

Test frontend code the same way you test backend code: validate the interface you provide,
test logic in isolation, and verify that user actions trigger the correct behavior. The only
difference is the consumer (a human instead of a machine).

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
malformed, becomes straightforward instead of requiring elaborate E2E setups that are hard
to make fail on demand.

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

### Why coverage mandates are harmful

When teams are required to hit a coverage target, they
write tests to satisfy the metric rather than to verify behavior. This produces:

- Tests that exercise code paths without asserting outcomes
- Tests that mirror implementation rather than specify behavior
- Tests that inflate the number without improving confidence

The metric goes up while the defect escape rate stays the same. Worse, meaningless tests add
maintenance cost and slow down the suite.

Instead of mandating a coverage number, set a coverage floor (see
[Getting Started]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals/getting-started" >}}))
and focus team attention on test quality: mutation testing scores, defect escape rates, and
whether developers actually trust the suite enough to deploy on green.

---

## Related Content

- [High Coverage, Ineffective Tests]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}}) - When coverage metrics mask poor test quality
- [Refactoring Breaks Tests]({{< relref "/docs/symptoms/testing/refactoring-breaks-tests" >}}) - Tests that assert on implementation details instead of behavior
- [Code Coverage Mandates]({{< relref "/docs/anti-patterns/testing/code-coverage-mandates" >}}) - The anti-pattern of mandating coverage targets
- [Test Doubles]({{< relref "/docs/testing/test-doubles" >}}) - Patterns for isolating dependencies in tests
- [Contract Tests]({{< relref "/docs/testing/contract" >}}) - Verifying that test doubles match reality
