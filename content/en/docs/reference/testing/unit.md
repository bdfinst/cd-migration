---
title: "Unit Tests"
linkTitle: "Unit Tests"
weight: 1
description: >
  Fast, deterministic tests that verify individual functions, methods, or components in isolation with test doubles for dependencies.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

A unit test is a deterministic test that exercises a discrete unit of the application -- such as
a function, method, or UI component -- in isolation to determine whether it behaves as expected.
All external dependencies are replaced with [test doubles](../test-doubles/) so the test runs
quickly and produces the same result every time.

When testing the behavior of functions, prefer testing public APIs (methods, interfaces,
exported functions) over private internals. Testing private implementation details creates
change-detector tests that break during routine refactoring without adding safety.

The purpose of unit tests is to:

- Verify the functionality of a single unit (method, class, function) in isolation.
- Cover high-complexity logic where many input permutations exist, such as business rules, calculations, and state transitions.
- Keep cyclomatic complexity visible and manageable through good separation of concerns.

## When to Use

- **During development** -- run the relevant subset of unit tests continuously while writing
  code. TDD (Red-Green-Refactor) is the most effective workflow.
- **On every commit** -- use pre-commit hooks or watch-mode test runners so broken tests never
  reach the remote repository.
- **In CI** -- execute the full unit test suite on every pull request and on the trunk after
  merge to verify nothing was missed locally.

Unit tests are the right choice when the behavior under test can be exercised without network
access, file system access, or database connections. If you need any of those, you likely need
an [integration test](../integration/) or a [functional test](../functional/) instead.

## Characteristics

| Property        | Value                                    |
|-----------------|------------------------------------------|
| **Speed**       | Milliseconds per test                    |
| **Determinism** | Always deterministic                     |
| **Scope**       | Single function, method, or component    |
| **Dependencies**| All replaced with test doubles           |
| **Network**     | None                                     |
| **Database**    | None                                     |
| **Breaks build**| Yes                                      |

## Examples

A JavaScript unit test verifying a pure utility function:

```javascript
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
```

A Java unit test using Mockito to isolate the system under test:

```java
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
```

## Anti-Patterns

- **Testing private methods** -- private implementations are meant to change. Test the public
  interface that calls them instead.
- **No assertions** -- a test that runs code without asserting anything provides false
  confidence. Lint rules like `jest/expect-expect` can catch this.
- **Disabling or skipping tests** -- skipped tests erode confidence over time. Fix or remove
  them.
- **Testing implementation details** -- asserting on internal state or call order rather than
  observable output creates brittle tests that break during refactoring.
- **Ice cream cone testing** -- relying primarily on slow E2E tests while neglecting fast unit
  tests inverts the test pyramid and slows feedback.
- **Chasing coverage numbers** -- gaming coverage metrics (e.g., running code paths without
  meaningful assertions) creates a false sense of confidence. Focus on use-case coverage
  instead.

## Connection to CD Pipeline

Unit tests occupy the base of the test pyramid. They run in the earliest stages of the
[CI/CD pipeline]({{< relref "/docs/migration-path/pipeline" >}}) and provide the fastest feedback loop:

1. **Local development** -- watch mode reruns tests on every save.
2. **Pre-commit** -- hooks run the suite before code reaches version control.
3. **PR verification** -- CI runs the full suite and blocks merge on failure.
4. **Trunk verification** -- CI reruns tests on the merged HEAD to catch integration issues.

Because unit tests are fast and deterministic, they should always break the build on failure.
A healthy CD pipeline depends on a large, reliable unit test suite that gives developers
confidence to ship small changes frequently.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
