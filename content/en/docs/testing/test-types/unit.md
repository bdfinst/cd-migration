---
title: "Unit Tests"
linkTitle: "Unit Tests"
weight: 8
aliases:
  - /docs/reference/testing/unit/
  - /docs/testing/unit/
description: >
  Fast, deterministic tests that verify a unit of behavior through its public interface, asserting on what the code does rather than how it works.
---

{{< figure src="/images/testing/unit-test.svg" alt="Solitary unit test: test actor sends input to a Unit Under Test; all collaborators are replaced by test doubles. Sociable unit test: test actor sends input to a Unit Under Test that uses real in-process collaborators; only external I/O is replaced by a test double." >}}

## Definition

Verification of the smallest testable piece of code—typically a single function, method, or class—in complete isolation from the rest of the application, network, file system, or external services. [Test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) are used where needed.

## Scope & Boundaries

Execution runs entirely in-memory. All external dependencies (databases, APIs, message brokers, system clocks) are replaced with test doubles (stubs, mocks, or fakes).

## Characteristics

Millisecond execution speeds, highly deterministic (zero flakiness), and pinpoint failure localization.

## Good Practices:
- Test public behavior, not implementation details: Assert on return values and visible side effects rather than internal private state or execution paths.
- Strict isolation: Keep all tests in-memory; mock or stub out network, disk I/O, database, and system time to ensure sub-millisecond execution.
- Single assertion concept: Each test should verify one specific behavior or edge case to maintain pinpoint failure localization.

## Anti-Patterns

- Over-mocking: Mocking domain entities, data transfer objects, or language primitives instead of purely external/infrastructure boundaries.
- Testing private methods: Forcing visibility or coupling tests to internal helper methods, which causes refactoring resistance without increasing behavioral confidence.
- Inter-test dependencies: Letting execution order matter or sharing mutable global state between test cases.

### Solitary vs. sociable unit tests

A [solitary unit test]({{< relref "/docs/testing/glossary#solitary-unit-test" >}}) replaces all collaborators with test doubles. A [sociable unit test]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) allows real in-process collaborators while still replacing any external I/O. Both styles are unit tests as long as no real external dependency is involved.

## When to Run Them

- **During development**: run the relevant subset of unit tests continuously while writing
  code. [TDD]({{< relref "/docs/reference/glossary#tdd-test-driven-development" >}}) (Red-Green-Refactor) is the most effective workflow.
- **On every commit**: use pre-commit hooks or watch-mode test runners so broken tests never
  reach the remote repository.
- **In [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}})**: execute the full unit test suite on every pull request and on the trunk after
  merge to verify nothing was missed locally.

Unit tests are the right choice when the behavior under test can be exercised without network
access, file system access, or database connections. If you need any of those, you likely need
a [component test]({{< relref "/docs/testing/test-types/component" >}}) or an [end-to-end test]({{< relref "/docs/testing/test-types/e2e" >}}) instead.

## Examples

{{< card code=true header="**JavaScript unit test for castArray utility**" lang="javascript" >}}
// castArray.test.js
describe("castArray", () => {
  it("should wrap non-array items in an array", () => {
    expect(castArray(1)).toEqual([1]);
    expect(castArray("a")).toEqual(["a"]);
    expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
  });

  it("should return array values by reference", () => {
    const array = [1];
    expect(castArray(array)).toBe(array);
  });

  it("should return an empty array when no arguments are given", () => {
    expect(castArray()).toEqual([]);
  });
});
{{< /card >}}

A Java sociable unit test exercising real domain logic through its public interface. The
collaborators (the pricing policy and the order model) are real objects, not mocks, and the test
asserts on the observable outcome - the computed total - rather than on which methods were called:

{{< card code=true header="**Java sociable unit test for a bulk-discount pricing rule**" lang="java" >}}
@Test
public void appliesBulkDiscountWhenQuantityReachesThreshold() {
    // Arrange: real collaborators, no test doubles - this is pure in-process logic
    PricingPolicy pricing = new PricingPolicy(
        bulkThreshold(10), bulkDiscountRate(0.15));
    Order order = new Order(new LineItem("widget", money("20.00"), quantity(12)));

    // Act
    Money total = pricing.totalFor(order);

    // Assert: the observable result, not the sequence of internal calls
    // 12 * 20.00 = 240.00, less 15% = 204.00
    assertEquals(money("204.00"), total);
}

@Test
public void chargesFullPriceBelowTheThreshold() {
    PricingPolicy pricing = new PricingPolicy(
        bulkThreshold(10), bulkDiscountRate(0.15));
    Order order = new Order(new LineItem("widget", money("20.00"), quantity(9)));

    assertEquals(money("180.00"), pricing.totalFor(order));
}
{{< /card >}}

## Connection to CD Pipeline

Unit tests run in the earliest stages of the
[CD pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) and provide the fastest feedback loop:

1. **Local development**: watch mode reruns tests on every save.
2. **Pre-commit**: hooks run the suite before code reaches version control.
3. **PR verification**: CI runs the full suite and blocks merge on failure.
4. **Integrated change verification**: CI reruns tests on the merged HEAD to catch integration issues.

They should always halt the [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline on failure.
