---
title: "Unit Tests"
linkTitle: "Unit Tests"
weight: 1
description: >
  Fast, deterministic tests that verify a unit of behavior through its public interface, asserting on what the code does rather than how it works.
---

## Definition

A unit test is a deterministic test that exercises a **unit of behavior** (a single
meaningful action or decision your code makes) and verifies that the observable outcome is
correct. The "unit" is not a function, method, or class. It is a behavior: given these inputs,
the system produces this result. A single behavior may involve one function or several
collaborating objects. What matters is that the test treats the code as a
[black box](../../glossary/#black-box-testing) and asserts only on what it produces,
not on how it produces it.

All external dependencies are replaced with [test doubles](../test-doubles/) so the test runs
quickly and produces the same result every time.

[White box testing](../../glossary/#white-box-testing) (asserting on internal method
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
  code. [TDD](../glossary/#tdd-test-driven-development) (Red-Green-Refactor) is the most effective workflow.
- **On every commit**: use pre-commit hooks or watch-mode test runners so broken tests never
  reach the remote repository.
- **In [CI](../glossary/#ci-continuous-integration)**: execute the full unit test suite on every pull request and on the trunk after
  merge to verify nothing was missed locally.

Unit tests are the right choice when the behavior under test can be exercised without network
access, file system access, or database connections. If you need any of those, you likely need
an [integration test](../integration/) or a [functional test](../functional/) instead.

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

{{% code-collapse title="JavaScript unit test for castArray utility" lang="javascript" %}}
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
{{% /code-collapse %}}

A Java unit test using Mockito to isolate the system under test:

{{% code-collapse title="Java unit test with Mockito stub isolating the controller" lang="java" %}}
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
{{% /code-collapse %}}

## Anti-Patterns

- **[White box testing](../../glossary/#white-box-testing)**: asserting on internal
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
[CD pipeline]({{< relref "/docs/migrate-to-cd/migration-path/pipeline" >}}) and provide the fastest feedback loop:

1. **Local development**: watch mode reruns tests on every save.
2. **Pre-commit**: hooks run the suite before code reaches version control.
3. **PR verification**: CI runs the full suite and blocks merge on failure.
4. **Trunk verification**: CI reruns tests on the merged HEAD to catch integration issues.

Because unit tests are fast and deterministic, they should always break the build on failure.
A healthy [CD](../glossary/#cd-continuous-delivery) pipeline depends on a large, reliable suite of
[black box](../../glossary/#black-box-testing) unit tests that verify behavior
rather than implementation, giving developers the confidence to refactor freely and ship
small changes frequently.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
