---
title: "Test Doubles"
linkTitle: "Test Doubles"
weight: 7
description: >
  Patterns for isolating dependencies in tests: stubs, mocks, fakes, spies, and dummies.
---

## Definition

Test doubles are stand-in objects that replace real production dependencies during testing.
The term comes from the film industry's "stunt double." Just as a stunt double replaces an
actor for dangerous scenes, a test double replaces a costly or non-deterministic dependency
to make tests fast, isolated, and reliable.

Test doubles allow you to:

- **Remove non-determinism** by replacing network calls, databases, and file systems with
  predictable substitutes.
- **Control test conditions** by forcing specific states, error conditions, or edge cases that
  would be difficult to reproduce with real dependencies.
- **Increase speed** by eliminating slow I/O operations.
- **Isolate the system under test** so that failures point directly to the code being tested,
  not to an external dependency.

## Types of Test Doubles

| Type      | Description                                                                                   | Example Use Case                                    |
|-----------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------|
| **Dummy** | Passed around but never actually used. Fills parameter lists.                                 | A required logger parameter in a constructor.        |
| **Stub**  | Provides canned answers to calls made during the test. Does not respond to anything outside what is programmed. | Returning a fixed user object from a repository.     |
| **Spy**   | A stub that also records information about how it was called (arguments, call count, order).   | Verifying that an analytics event was sent once.     |
| **Mock**  | Pre-programmed with expectations about which calls will be made. Verification happens on the mock itself. | Asserting that `sendEmail()` was called with specific arguments. |
| **Fake**  | Has a working implementation, but takes shortcuts not suitable for production.                 | An in-memory database replacing PostgreSQL.          |

### Choosing the Right Double

- Use **stubs** when you need to supply data but do not care how it was requested.
- Use **spies** when you need to verify call arguments or call count.
- Use **mocks** when the interaction itself is the primary thing being verified.
- Use **fakes** when you need realistic behavior but cannot use the real system.
- Use **dummies** when a parameter is required by the interface but irrelevant to the test.

## When to Use

Test doubles are used in every layer of deterministic testing:

- **[Unit tests](../unit/)**: nearly all dependencies are replaced with test doubles to
  achieve full isolation.
- **[Integration tests](../integration/)**: external sub-systems (APIs, databases, message
  queues) are replaced, but internal collaborators remain real.
- **[Functional tests](../functional/)**: dependencies that cross the sub-system boundary
  are replaced to maintain determinism.

Test doubles should be used **less** in later [pipeline](../glossary/#pipeline) stages.
[End-to-end tests](../e2e/) use no test doubles by design.

## Examples

A JavaScript stub providing a canned response:

{{< card code=true header="**JavaScript stub returning a fixed user**" lang="javascript" >}}
// Stub: return a fixed user regardless of input
const userRepository = {
  findById: jest.fn().mockResolvedValue({
    id: "u1",
    name: "Ada Lovelace",
    email: "ada@example.com",
  }),
};

const user = await userService.getUser("u1");
expect(user.name).toBe("Ada Lovelace");
{{< /card >}}

A Java spy verifying interaction:

{{< card code=true header="**Java spy verifying call count with Mockito**" lang="java" >}}
@Test
public void shouldCallUserServiceExactlyOnce() {
    UserService spyService = Mockito.spy(userService);
    doReturn(testUser).when(spyService).getUserInfo("u123");

    User result = spyService.getUserInfo("u123");

    verify(spyService, times(1)).getUserInfo("u123");
    assertEquals("Ada", result.getName());
}
{{< /card >}}

A fake in-memory repository:

{{< card code=true header="**JavaScript fake in-memory repository**" lang="javascript" >}}
class FakeUserRepository {
  constructor() {
    this.users = new Map();
  }
  save(user) {
    this.users.set(user.id, user);
  }
  findById(id) {
    return this.users.get(id) || null;
  }
}
{{< /card >}}

## Anti-Patterns

- **Mocking what you do not own**: wrapping a third-party API in a thin adapter and mocking
  the adapter is safer than mocking the third-party API directly. Direct mocks couple your
  tests to the library's implementation.
- **Over-mocking**: replacing every collaborator with a mock turns the test into a mirror of
  the implementation. Tests become brittle and break on every refactor. Only mock what is
  necessary to maintain determinism.
- **Not validating test doubles**: if the real dependency changes its contract, your test
  doubles silently drift. Use [contract tests](../contract/) to keep doubles honest.
- **Complex mock setup**: if setting up mocks requires dozens of lines, the system under test
  may have too many dependencies. Consider refactoring the production code rather than adding
  more mocks.
- **Using mocks to test implementation details**: asserting on the exact sequence and count
  of internal method calls creates change-detector tests. Prefer asserting on observable
  output.

## Connection to CD Pipeline

Test doubles are a foundational technique that enables the fast, deterministic tests required
for [continuous delivery](../glossary/#cd-continuous-delivery):

- **Early pipeline stages** (static analysis, unit tests, integration tests) rely heavily on
  test doubles to stay fast and deterministic. This is where the majority of defects are
  caught.
- **Later pipeline stages** (E2E tests, production monitoring) use fewer or no test doubles,
  trading speed for realism.
- **Contract tests** run asynchronously to validate that test doubles still match reality,
  closing the gap between the deterministic and non-deterministic stages of the pipeline.

The guiding principle from Justin Searls applies: "Don't poke too many holes in reality."
Use test doubles when you must, but prefer real implementations when they are fast and
deterministic.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
