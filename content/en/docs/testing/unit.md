---
title: "Unit Tests"
linkTitle: "Unit Tests"
weight: 8
aliases:
  - /docs/reference/testing/unit/
description: >
  Fast, deterministic tests that verify a unit of behavior through its public interface, asserting on what the code does rather than how it works.
---

{{< figure src="/images/testing/unit-test.svg" alt="Solitary unit test: test actor sends input to a Unit Under Test; all collaborators are replaced by test doubles. Sociable unit test: test actor sends input to a Unit Under Test that uses real in-process collaborators; only external I/O is replaced by a test double." >}}

## Definition

A unit test is a deterministic test that exercises a **unit of behavior** (a single
meaningful action or decision your code makes) and verifies that the observable outcome is
correct. The "unit" is not a function, method, or class. It is a behavior: given these inputs,
the system produces this result. A single behavior may involve one function or several
collaborating objects. What matters is that the test treats the code as a
[black box]({{< relref "/docs/reference/glossary#black-box-testing" >}}) and asserts only on what it produces,
not on how it produces it.

All external dependencies are replaced with [test doubles]({{< relref "/docs/testing/test-doubles" >}}) so the test runs
quickly and produces the same result every time.

### Solitary vs. sociable unit tests

A **solitary unit test** replaces all collaborators with test doubles and exercises a single
class or function in complete isolation.

A **sociable unit test** allows real in-process collaborators to participate - for example,
a service object calling a real domain model - while still replacing any external I/O (network,
database, file system) with test doubles. Both styles are unit tests as long as no real external
dependency is involved.

When the scope expands to an entire frontend component or a complete backend service exercised
through its public API, that is a [component test]({{< relref "/docs/testing/component" >}}).

[White box testing]({{< relref "/docs/reference/glossary#white-box-testing" >}}) (asserting on internal method
calls, call order, or private state) creates change-detector tests that break during routine
refactoring without catching real defects. Prefer testing through the public interface (methods,
APIs, exported functions) and asserting on return values, state changes visible to consumers,
or observable side effects.

The purpose of unit tests is to:

- Verify that a unit of behavior produces the correct observable outcome.
- Cover high-complexity logic where many input permutations exist, such as business rules, calculations, and state transitions.
- Keep cyclomatic complexity visible and manageable through good separation of concerns.

## When to Use

- **During development**: run the relevant subset of unit tests continuously while writing
  code. [TDD]({{< relref "/docs/reference/glossary#tdd-test-driven-development" >}}) (Red-Green-Refactor) is the most effective workflow.
- **On every commit**: use pre-commit hooks or watch-mode test runners so broken tests never
  reach the remote repository.
- **In [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}})**: execute the full unit test suite on every pull request and on the trunk after
  merge to verify nothing was missed locally.

Unit tests are the right choice when the behavior under test can be exercised without network
access, file system access, or database connections. If you need any of those, you likely need
a [component test]({{< relref "/docs/testing/component" >}}) or an [end-to-end test]({{< relref "/docs/testing/e2e" >}}) instead.

## Characteristics

| Property        | Value                                    |
|-----------------|------------------------------------------|
| **Speed**       | Milliseconds per test                    |
| **Determinism** | Always deterministic                     |
| **Scope**       | A single unit of behavior                |
| **Dependencies**| All replaced with test doubles           |
| **Network**     | None                                     |
| **Database**    | None                                     |
| **Breaks build**| Yes                                      |

## Examples

A JavaScript unit test verifying a pure utility function:

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

A Java unit test using a mocking framework to isolate the system under test:

{{< card code=true header="**Java unit test with mocking framework stub isolating the controller**" lang="java" >}}
@Test
public void shouldReturnUserDetails() {
    // Arrange
    User mockUser = new User("Ada", "Engineering");
    when(userService.getUserInfo("u123")).thenReturn(mockUser);

    // Act
    User result = userController.getUser("u123");

    // Assert
    assertEquals("Ada", result.getName());
    assertEquals("Engineering", result.getDepartment());
}
{{< /card >}}

## Anti-Patterns

- **[White box testing]({{< relref "/docs/reference/glossary#white-box-testing" >}})**: asserting on internal
  state, call order, or private method behavior rather than observable output. These
  change-detector tests break during refactoring without catching real defects. Test through
  the public interface instead.
- **Testing private methods**: private implementations are meant to change. They are
  exercised indirectly through the behavior they support. Test the public interface instead.
- **No assertions**: a test that runs code without asserting anything provides false
  confidence. Lint rules can catch this automatically.
- **Disabling or skipping tests**: skipped tests erode confidence over time. Fix or remove
  them.
- **Confusing "unit" with "function"**: a unit of behavior may span multiple collaborating
  objects. Forcing one-test-per-function creates brittle tests that mirror the implementation
  structure rather than verifying meaningful outcomes.
- **Ice cream cone testing**: relying primarily on slow E2E tests while neglecting fast unit
  tests inverts the test pyramid and slows feedback.
- **Chasing coverage numbers**: gaming coverage metrics (e.g., running code paths without
  meaningful assertions) creates a false sense of confidence. Focus on behavior coverage
  instead.

## Connection to CD Pipeline

Unit tests occupy the base of the test pyramid. They run in the earliest stages of the
[CD pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) and provide the fastest feedback loop:

1. **Local development**: watch mode reruns tests on every save.
2. **Pre-commit**: hooks run the suite before code reaches version control.
3. **PR verification**: CI runs the full suite and blocks merge on failure.
4. **Trunk verification**: CI reruns tests on the merged HEAD to catch integration issues.

Because unit tests are fast and deterministic, they should always break the build on failure.
A healthy [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline depends on a large, reliable suite of
[black box]({{< relref "/docs/reference/glossary#black-box-testing" >}}) unit tests that verify behavior
rather than implementation, giving developers the confidence to refactor freely and ship
small changes frequently.
