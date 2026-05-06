---
title: "Component Tests"
linkTitle: "Component Tests"
weight: 1
aliases:
  - /docs/reference/testing/functional/
  - /docs/reference/testing/component/
  - /docs/testing/component/
description: >
  Deterministic tests that exercise a single component through its public interface, with systems the team doesn't control replaced by test doubles.
---

{{< figure src="/images/testing/component-test.svg" alt="Component test pattern: a test actor hits the public interface of a component boundary. Inside the boundary, real internal modules (API Layer, Business Logic, Data Adapter) are wired together. Outside the boundary, a Database and External API are represented by test doubles." >}}

## Definition

A component test exercises **one component** through its public interface: one backend service through its HTTP, gRPC, or GraphQL API, or one frontend component (or app shell) through its rendered DOM. The test treats that component as a [black box]({{< relref "/docs/reference/glossary#black-box-testing" >}}): inputs go in through the public interface, observable outputs come out (response, persisted state, emitted event, rendered DOM, side effect), and the test asserts only on those outputs.

The component's real internal modules are wired together - routing, validation, business logic, and persistence in a backend, or rendering, state management, and event handling in a UI. What gets replaced is whatever crosses the component's boundary into a system the team doesn't control: third-party APIs, downstream services owned by other teams, message brokers. Those become [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}).

The component's **own** persistence layer is the boundary that admits a choice. Two configurations are both valid component tests:

- **Doubled persistence**: an in-memory repository or fake stands in for the database. Tests are fastest. Good for backend logic that doesn't depend on SQL semantics.
- **Real production engine in a testcontainer**: Postgres, MySQL, or whatever the production engine is, run in a per-test container or a transaction that rolls back at teardown. Slightly slower but exercises the real query plan, real constraints, real migration. The page on the [API provider pattern]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) covers when to prefer each.

A component test does **not** exercise more than one component end-to-end. A test that drives a UI which calls a real backend which writes to a real database is a fullstack flow - that's an [end-to-end test]({{< relref "/docs/testing/test-types/e2e" >}}). Each component gets its own component tests at its own boundary; the frontend has its tests against a doubled backend, the backend has its tests against a doubled downstream and a real-or-doubled DB.

This is broader than a [sociable unit test]({{< relref "/docs/testing/test-types/unit#solitary-vs-sociable-unit-tests" >}}): a sociable unit test exercises a single behaviour through a few collaborators; a component test exercises the entire assembled component through its public interface.

## When component tests earn their keep

A component test overlaps with the combination of provider [contract tests]({{< relref "/docs/testing/test-types/contract" >}}), [sociable unit tests]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}), and spies on collaborators. Each of those layers covers part of what a component test asserts. Component tests pull their weight when they catch something the other layers can't, or when they let a single test answer a single user-story-level question.

They earn their keep when the component has:

- **Cross-cutting behaviour at the seams.** Auth, multi-tenancy, persistence, and event emission interacting on a single request is where production bugs live. Each layer in isolation may pass; the seam between them is what a component test exercises.
- **Non-trivial framework wiring.** Middleware ordering, error-handler mapping (does a domain exception become 409 or 500?), DI-container configuration, request-body limits. Spy-based unit tests bypass all of this. Contract tests bypass it unless they exercise the fully booted app.
- **[Acceptance criteria]({{< relref "/docs/reference/glossary#acceptance-criteria" >}}) you want to map 1:1 to tests.** A test that says "POST /orders with valid payment returns 201 and emits `OrderPlaced`" reads as the user story. The fragmented equivalent (contract test for shape + unit test for domain + spy for delegation + unit test for emission) covers the same ground but no single test reads as the story.
- **Realistic UI flows.** Keyboard navigation, focus management, and screen-reader announcements need the rendered DOM, not a unit test of a component class.

They overlap heavily with other layers when the component is:

- **Thin CRUD with no middleware to speak of.** Provider contract verification against a booted app plus sociable unit tests of the domain cover most of what a component test would. Keep one per critical flow as smoke coverage; skip exhaustive component coverage.
- **Pure transformation logic.** Parsers, calculators, scheduling math. Unit tests give better coverage per unit of effort.

If you're choosing between an extra component test and an extra unit test for the same behaviour, the unit test is cheaper to write, run, and maintain. Component tests earn their keep at the seams between layers, not in repeating ground that unit tests already cover.

Two boundary cases worth naming:

- A test that needs to **span more than one component** (a real frontend driving a real backend) is an [end-to-end test]({{< relref "/docs/testing/test-types/e2e" >}}), not a component test.
- A test that exercises **a single unit of behaviour** through a few collaborators is a [unit test]({{< relref "/docs/testing/test-types/unit" >}}), not a component test.

## Characteristics

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Speed**       | Milliseconds to seconds                            |
| **Determinism** | Always deterministic                               |
| **Scope**       | One backend service or one frontend component      |
| **Dependencies**| Systems the team doesn't control are doubled       |
| **Network**     | Localhost only (testcontainers permitted)          |
| **Database**    | Doubled (in-memory) or production engine in a per-test testcontainer |
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

- **Calling a live external service the team doesn't own**: real network calls to a third-party API or another team's service make the test non-deterministic and slow. Replace anything across the component boundary with a [test double]({{< relref "/docs/testing/glossary#test-double" >}}) of a thin gateway you own.
- **Spanning more than one component**: a test that drives a UI, makes a real network call to a backend, and waits for a real DB write is a fullstack flow, not a component test. Each component gets its own component tests at its own boundary; the cross-component flow belongs in [end-to-end tests]({{< relref "/docs/testing/test-types/e2e" >}}), and only for the few cases that can't be covered any other way.
- **Sharing a live, mutable database between tests**: leftover state and ordering dependencies produce flakes and "works on my machine" failures. The fix isn't necessarily "no real DB". A per-test testcontainer or a per-test transaction with [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) gives you the production engine and isolation. The anti-pattern is the *shared, mutable* part.
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

Component tests run after unit tests in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) and provide the broadest fast,
deterministic feedback before code is promoted:

1. **Local development**: run before committing. Deterministic scope keeps them fast
   enough to run locally without slowing the development loop.
2. **PR verification**: [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) executes the full suite; failures block merge.
3. **Trunk verification**: the same tests run on the merged HEAD to catch conflicts.
4. **Pre-deployment gate**: component tests can serve as the final deterministic gate
   before a [build artifact]({{< relref "/docs/reference/glossary#artifact" >}}) is promoted.

Because component tests are deterministic, they **should always break the build** on
failure. A healthy [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline relies
on a strong component test suite to verify assembled behavior - not just individual
units - before any code reaches an environment with real dependencies.
