---
title: "Testing Antipatterns"
linkTitle: "Antipatterns"
weight: 4
aliases:
  - /docs/testing/improving-test-suites/
description: >
  Common testing antipatterns that block CD, plus a migration guide for getting an existing suite back on track.
---

Most teams arrive at this section with a test suite that doesn't match the [Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}) guide. This page covers the failure modes that show up most often and the migration moves that get a suite back on track.

## Common testing anti-patterns

Each entry below is a smell that the suite is testing the wrong thing, will erode trust over time, or will block refactoring instead of enabling it.

### Reflection to reach private members

Using reflection (or language-equivalent escape hatches: `@VisibleForTesting`-only public access, friend classes, `internal` exposed only for tests) to read or invoke private members from a test. This couples the test to the exact internal structure of the class, breaks every time the implementation is refactored, and tests something the caller cannot observe, meaning the test can pass while the actual public behavior is broken.

If a private behavior is worth testing, it's reachable through a public method that exercises it. If no public method exercises it, the private code is dead and should be deleted. Reflection in tests is a signal that either the design needs adjustment (the class is too large and a collaborator wants to come out) or the test is aimed at the wrong abstraction level.

### Testing private methods directly

Same root cause as the reflection anti-pattern, but achieved by making methods package-private, `protected`, or otherwise reachable through a side door specifically so tests can call them. The method's accessibility is now distorted by the test, not by the design. Drive private logic through the public method that uses it, or extract it into a collaborator with its own public surface and test that collaborator through *its* public interface.

### One test class per production class, one test per method

Tests organized as a mirror of the production code structure, such as `OrderServiceTest` with `testProcessPayment`, `testValidateOrder`, `testEmitEvent`, produce a suite that documents the implementation and dies on contact with refactoring. Organize tests by behavior. An `OrderPlacement` test class with `places_order_with_valid_payment`, `rejects_order_when_payment_declined`, `holds_order_when_inventory_unavailable` is what survives, what reads well, and what catches integration bugs between methods.

### Tests that mirror the implementation

A test that asserts "method A is called, then method B is called, then method C is called with these arguments" is testing the implementation, not the behavior. The same outcome could be achieved by a different sequence of calls, and if the test fails when the sequence changes but the outcome doesn't, the test is wrong, not the code. Assert on observable outcomes (returned value, persisted state, emitted event, response status) and use mocks/spies sparingly, only for outbound interactions that are themselves part of the contract.

### Mocking what you don't own

Stubbing a third-party SDK, ORM, HTTP client, or cloud SDK directly in tests. The double is now a claim about a library the team has no control over and incomplete knowledge of. When the library updates or the team upgrades versions, the doubles are silently wrong and the tests still pass. Wrap third-party clients in a thin gateway the team owns, then double the gateway.

### Doubles without validating tests

Any [test double]({{< relref "/docs/testing/glossary#test-double" >}}) that has no corresponding mechanism (contract test, adapter integration test, post-deploy integration check) keeping it honest is a lie waiting to be discovered in production. If a double exists and there's no traceable answer to "how would we know if this stopped matching reality?" that double is a known risk and should be tracked as one.

### Over-mocking

Replacing every collaborator with a mock so the test sees only the system under test in isolation. The test now mirrors the implementation: every refactor that moves a method between collaborators breaks tests that didn't fail for any production reason. Only mock what's necessary to keep the test deterministic. Real in-process collaborators - value objects, domain models, in-memory repositories - belong in the test, not behind a mock.

### Complex mock setup

If a single test needs dozens of lines to set up its mocks, the system under test probably has too many dependencies for one unit of behaviour. Setup complexity is a smell pointing at the production design, not at the test. Refactor the production code (extract a collaborator, narrow the interface, push concerns into separate classes) before adding more mocks.

### Sleeping in tests

`Thread.sleep`, `await sleep(500)`, and friends to "wait for" an asynchronous operation. Sleeps are either too short (flaky) or too long (slow), and they ratchet upward over time as people debug flakes. Use the framework's built-in waiting primitives (Awaitility, `waitFor` from Testing Library, `eventually` blocks) that poll until a condition is true with a bounded timeout. If the system under test depends on real wall-clock time, inject a fake clock. Never sleep.

### Shared mutable state between tests

Tests that depend on the order they run in, or that leak state through static singletons, shared databases without per-test isolation, or module-level caches. Each test should set up the state it needs and tear it down (or use a fresh isolated context). Order-dependent suites fail randomly when run in parallel and produce "works on my machine" failures that erode trust in the suite.

### Skipping or muting tests instead of fixing them

A muted test is a known bug in the test or in the system, hidden. Either fix it now, delete it, or open a ticket and put a deadline on it. Suites with a steady population of `@Ignore`/`@skip`/`xit` decorations end up with a steady population of latent bugs.

### Test code held to lower standards than production code

Copy-pasted setup blocks, string-typed assertions on JSON fragments, magic numbers, no abstractions, no review. Tests are production code. They're how the team learns whether the system works. Refactor them, deduplicate them, name them well, and review them as carefully as the code they protect.

### Testing through the UI when the same behavior is testable lower in the stack

UI tests are the slowest and most fragile layer. Pushing logic-only assertions into UI tests because "that's where we're set up to test" produces a brittle, slow suite that becomes a tax on every change. Test logic where the logic lives. Reserve UI tests for things that can only be observed at the UI layer.

### "We'll add tests later"

Tests added after the code is already in production, written by someone who didn't write the code, asserting only what the code currently does, are not tests of the system's intended behavior. They're a snapshot of the current implementation, including its bugs. The team learns nothing from them and refactoring becomes risky in exactly the way tests are supposed to prevent. Tests written alongside the code (or before it, [TDD]({{< relref "/docs/reference/glossary#tdd-test-driven-development" >}})-style) are the only ones that document intent.

## Migrating an existing suite

The right first move depends on what the suite looks like now. Five common starting points and the first three steps for each:

### If most coverage is end-to-end Selenium or Cypress against real backends

1. Inventory the flows the E2E suite exercises. Pick the top five that fail most often.
2. Build [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) for those flows. Double the backend through the gateway the team owns.
3. Once green, delete the corresponding E2E tests. Don't keep both: duplicated coverage doubles the maintenance cost without doubling the confidence.

### If most "unit" tests mock third-party SDKs

1. Identify the third-party clients (HTTP, DB, cloud SDKs). For each, define a thin gateway interface owned by the team.
2. Replace direct SDK use in production code with the gateway. Tests now double the gateway, which the team controls.
3. Add adapter integration tests against the real [dependency]({{< relref "/docs/reference/glossary#dependency" >}}) (testcontainer, sandbox account). The doubles are now backed by reality.

### If line coverage is high but production keeps breaking

1. Run mutation testing on a high-traffic module. Most surviving mutants are tests that didn't catch the mutation.
2. For each surviving mutant, add a flow-oriented test that would have caught it. Don't add a test of the specific mutation: add the test of the behavior the mutation breaks.
3. Repeat module by module, prioritized by production incident frequency. Coverage % won't change much. Defect-finding will.

### If the suite has six figures of tests and runs for 90 minutes

1. Move tests that need a database or downstream into an integration lane on a different cadence (post-merge or scheduled), not the pre-commit gate.
2. Convert [sociable unit tests]({{< relref "/docs/testing/test-types/unit" >}}) to component tests where they exercise complete flows. Delete redundant unit-level duplicates.
3. Set a budget: deterministic suite under 10 minutes. Non-conforming tests get reviewed; if they can't be made fast, they move to acceptance or get deleted.

### If there are no tests at all

1. Don't try to retrofit unit tests for existing code. You'll write tests that pin the current bugs.
2. Start with a small set of component tests for the highest-value flows. They double as characterization tests for legacy behavior.
3. As the team changes code, write tests for the change first. The test base grows organically with the change set, and the parts of the code that change most are the parts that get tests soonest.

The pattern across all five: don't try to convert the whole suite at once. Move flow by flow, module by module. The test that matters next is the one for the change you're about to make.

## Related Content

- [Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}) - the patterns this page is helping teams migrate toward.
- [Architecting Tests for CD]({{< relref "/docs/testing" >}}) - the section overview, with the do/do-not list this page expands on.
- [Test Double]({{< relref "/docs/testing/glossary#test-double" >}}) - the glossary entry covering the five flavours and when to use each.
