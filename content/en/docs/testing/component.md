---
title: "Component Tests"
linkTitle: "Component Tests"
weight: 2
aliases:
  - /docs/reference/testing/functional/
  - /docs/reference/testing/component/
description: >
  Deterministic tests that verify a complete frontend component or backend service through its public interface, using test doubles for all external dependencies.
---

{{< figure src="/images/testing/component-test.svg" alt="Component test pattern: a test actor hits the public interface of a component boundary. Inside the boundary, real internal modules (API Layer, Business Logic, Data Adapter) are wired together. Outside the boundary, a Database and External API are represented by test doubles." >}}

## Definition

A component test verifies a complete component - either a frontend component rendered
in isolation, or a backend service exercised through its public interface - with
[test doubles]({{< relref "/docs/testing/test-doubles" >}}) replacing all external dependencies.
No real databases, downstream services, or network calls leave the process. The test
treats the component as a [black box]({{< relref "/docs/reference/glossary#black-box-testing" >}}):
inputs go in through the public interface (API endpoint, rendered UI), observable
outputs come out, and the test asserts only on those outputs.

This is sometimes called a **sociable unit test**: the test allows real collaborators
to interact within the component boundary while replacing everything outside that
boundary with doubles.

The goal is to verify the assembled behavior of a component - that its modules,
business logic, and interface layer work together correctly - without depending on
any system the team does not control.

## When to Use

- You need to verify a **complete user-facing feature** from input to output within
  a single [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) unit.
- You want to test how the **UI, business logic, and data layer** collaborate without
  depending on live external services or databases.
- You need to simulate realistic user workflows (filling in forms, navigating pages,
  submitting API requests) while keeping the test fast and repeatable.
- You are validating **acceptance criteria** for a user story and want a test that
  maps directly to the specified behavior.
- You need to verify **keyboard navigation, focus management, and screen reader
  announcements** as part of feature verification.

If the test needs a real external dependency (live database, live downstream service),
it is an [end-to-end test]({{< relref "/docs/testing/e2e" >}}). If it tests a single
unit in isolation, it is a [unit test]({{< relref "/docs/testing/unit" >}}).

## Characteristics

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Speed**       | Milliseconds to seconds                            |
| **Determinism** | Always deterministic                               |
| **Scope**       | A complete frontend component or backend service   |
| **Dependencies**| All external systems replaced with test doubles    |
| **Network**     | Localhost only                                     |
| **Database**    | None or in-memory only                             |
| **Breaks build**| Yes                                                |

## Examples

### Backend Service

A component test for a REST API, exercising the full application stack with the
downstream inventory service replaced by a test double:

{{< card code=true header="**Backend component test - order creation with mocked inventory service**" lang="javascript" >}}
describe("POST /orders", () => {
  it("should create an order and return 201", async () => {
    // Arrange: mock the inventory service response
    httpMock("https://inventory.internal")
      .onGet("/stock/item-42")
      .reply(200, { available: true, quantity: 10 });

    // Act: send a request through the full application stack
    const response = await request(app)
      .post("/orders")
      .send({ itemId: "item-42", quantity: 2 });

    // Assert: verify the public interface response
    expect(response.status).toBe(201);
    expect(response.body.orderId).toBeDefined();
    expect(response.body.status).toBe("confirmed");
  });

  it("should return 409 when inventory is insufficient", async () => {
    httpMock("https://inventory.internal")
      .onGet("/stock/item-42")
      .reply(200, { available: true, quantity: 0 });

    const response = await request(app)
      .post("/orders")
      .send({ itemId: "item-42", quantity: 2 });

    expect(response.status).toBe(409);
    expect(response.body.error).toMatch(/insufficient/i);
  });
});
{{< /card >}}

### Frontend Component

A component test exercising a login flow with a mocked authentication service:

{{< card code=true header="**Frontend component test - login flow with mocked auth service**" lang="javascript" >}}
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
{{< /card >}}

### Accessibility Verification

Component tests already exercise the UI from the actor's perspective, making them the
natural place to verify that interactions work for all users. Accessibility assertions
fit alongside existing assertions rather than in a separate test suite.

{{< card code=true header="**Accessibility component test - keyboard navigation and WCAG assertions**" lang="javascript" >}}
// accessibility scanner setup

describe("Checkout flow", () => {
  it("should be completable using only the keyboard", async () => {
    render(<CheckoutPage />);

    await userEvent.tab();
    expect(screen.getByLabelText("Card number")).toHaveFocus();

    await userEvent.type(screen.getByLabelText("Card number"), "4111111111111111");
    await userEvent.tab();
    await userEvent.type(screen.getByLabelText("Expiry"), "12/27");
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    expect(await screen.findByText("Order confirmed")).toBeInTheDocument();

    const results = await accessibilityScanner(document.body);
    expect(results).toHaveNoViolations();
  });
});
{{< /card >}}

## Anti-Patterns

- **Using live external services**: making real network calls to external systems makes
  the test non-deterministic and slow. Replace everything outside the component boundary
  with test doubles.
- **Using a live database**: a live database introduces ordering dependencies and shared
  state between tests. Use in-memory databases or mocked data layers.
- **Ignoring the actor's perspective**: component tests should interact with the system
  the way a user or API consumer would. Reaching into internal state or bypassing the
  public interface defeats the purpose.
- **Duplicating unit test coverage**: component tests should focus on feature-level
  behavior and happy/critical paths. Leave exhaustive edge case and permutation testing
  to unit tests.
- **Slow test setup**: if bootstrapping the component takes too long, invest in faster
  initialization (in-memory stores, lazy loading) rather than skipping component tests.
- **Deferring accessibility testing to manual audits**: automated WCAG checks in
  component tests catch violations on every commit. Quarterly audits find problems that
  are weeks old.

## Connection to CD Pipeline

Component tests run after unit tests in the pipeline and provide the broadest fast,
deterministic feedback before code is promoted:

1. **Local development**: run before committing. Deterministic scope keeps them fast
   enough to run locally without slowing the development loop.
2. **PR verification**: CI executes the full suite; failures block merge.
3. **Trunk verification**: the same tests run on the merged HEAD to catch conflicts.
4. **Pre-deployment gate**: component tests can serve as the final deterministic gate
   before a [build artifact]({{< relref "/docs/reference/glossary#artifact" >}}) is promoted.

Because component tests are deterministic, they **should always break the build** on
failure. A healthy [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline relies
on a strong component test suite to verify assembled behavior - not just individual
units - before any code reaches an environment with real dependencies.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
