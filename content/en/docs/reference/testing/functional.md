---
title: "Functional Tests"
draft: true
linkTitle: "Functional Tests"
weight: 3
description: >
  Deterministic tests that verify all modules of a sub-system work together from the actor's perspective, using test doubles for external dependencies.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

A functional test is a deterministic test that verifies all modules of a sub-system are
working together. It introduces an actor -- typically a user interacting with the UI or a
consumer calling an API -- and validates the ingress and egress of that actor within the
system boundary. External sub-systems are replaced with [test doubles](../test-doubles/) to
keep the test deterministic.

Functional tests cover broad-spectrum behavior: UI interactions, presentation logic, and
business logic flowing through the full sub-system. They differ from
[end-to-end tests](../e2e/) in that side effects are mocked and never cross boundaries
outside the system's control.

Functional tests are sometimes called **component tests**.

## When to Use

- You need to verify a **complete user-facing feature** from input to output within a single
  deployable unit (e.g., a service or a front-end application).
- You want to test how the **UI, business logic, and data layers** interact without depending
  on live external services.
- You need to simulate realistic user workflows -- filling in forms, navigating pages,
  submitting API requests -- while keeping the test fast and repeatable.
- You are validating **acceptance criteria** for a user story and want a test that maps
  directly to the specified behavior.

If the test needs to reach a live external dependency, it is an [E2E test](../e2e/). If it
tests a single unit in isolation, it is a [unit test](../unit/).

## Characteristics

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Speed**       | Seconds (slower than unit, faster than E2E)        |
| **Determinism** | Always deterministic                               |
| **Scope**       | All modules within a single sub-system             |
| **Dependencies**| External systems replaced with test doubles         |
| **Network**     | Localhost only                                     |
| **Database**    | Localhost / in-memory only                         |
| **Breaks build**| Yes                                                |

## Examples

A functional test for a REST API using an in-process server and mocked downstream services:

```javascript
describe("POST /orders", () => {
  it("should create an order and return 201", async () => {
    // Arrange: mock the inventory service response
    nock("https://inventory.internal")
      .get("/stock/item-42")
      .reply(200, { available: true, quantity: 10 });

    // Act: send a request through the full application stack
    const response = await request(app)
      .post("/orders")
      .send({ itemId: "item-42", quantity: 2 });

    // Assert: verify the user-facing response
    expect(response.status).toBe(201);
    expect(response.body.orderId).toBeDefined();
    expect(response.body.status).toBe("confirmed");
  });

  it("should return 409 when inventory is insufficient", async () => {
    nock("https://inventory.internal")
      .get("/stock/item-42")
      .reply(200, { available: true, quantity: 0 });

    const response = await request(app)
      .post("/orders")
      .send({ itemId: "item-42", quantity: 2 });

    expect(response.status).toBe(409);
    expect(response.body.error).toMatch(/insufficient/i);
  });
});
```

A front-end functional test exercising a login flow with a mocked auth service:

```javascript
describe("Login page", () => {
  it("should redirect to the dashboard after successful login", async () => {
    mockAuthService.login.mockResolvedValue({ token: "abc123" });

    render(<App />);
    await userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "s3cret");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Dashboard")).toBeInTheDocument();
  });
});
```

## Anti-Patterns

- **Using live external services** -- this makes the test non-deterministic and slow. Use test
  doubles for anything outside the sub-system boundary.
- **Testing through the database** -- sharing a live database between tests introduces ordering
  dependencies and flakiness. Use in-memory databases or mocked data layers.
- **Ignoring the actor's perspective** -- functional tests should interact with the system the
  way a user or consumer would. Reaching into internal APIs or bypassing the UI defeats the
  purpose.
- **Duplicating unit test coverage** -- functional tests should focus on feature-level behavior
  and happy/critical paths, not every edge case. Leave permutation testing to unit tests.
- **Slow test setup** -- if spinning up the sub-system takes too long, invest in faster
  bootstrapping (in-memory stores, lazy initialization) rather than skipping functional tests.

## Connection to CD Pipeline

Functional tests run after unit and integration tests in the pipeline, typically as part of
the same CI stage:

1. **PR verification** -- functional tests run against the sub-system in isolation, giving
   confidence that the feature works before merge.
2. **Trunk verification** -- the same tests run on the merged HEAD to catch conflicts.
3. **Pre-deployment gate** -- functional tests can serve as the final deterministic gate before
   a build artifact is promoted to a staging environment.

Because functional tests are deterministic, they **should break the build** on failure.
They are more expensive than unit and integration tests, so teams should focus on
happy-path and critical-path scenarios while keeping the total count manageable.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
