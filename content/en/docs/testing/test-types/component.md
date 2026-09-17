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

Verification of a coherent structural unit (such as an entire microservice, UI component, or self-contained subsystem) against its specific contract and internal logic, while keeping interactions beyond that component's boundary mocked or stubbed.

## Scope & Boundaries

Broader than a unit test, but strictly narrower than an end-to-end (E2E) integration test. It tests the interplay of multiple internal classes/modules working together within that component. Out-of-process network calls and external downstream services are replaced by API wire-level stubs or in-memory equivalents (e.g., WireMock, MSW, ephemeral test containers).

## Core Characteristics

Validates state management, internal workflows, data transformations, and edge-to-edge behavior within a bounded context without taking dependencies on third-party uptime or network latency.

## Good Practices

- Mock only at boundary borders: Exercise the component's internal routing, controllers, domain models, and data mappers together; only mock external HTTP APIs, message brokers, or remote databases.
- Use ephemeral infrastructure: Use fast, disposable local resources (e.g., local SQLite/Postgres in Docker, local WireMock) to mirror real component runtime characteristics.
- Versioned, repeatable test data.
- Verify contract-to-state workflows: Validate that boundary inputs result in the correct local state changes and expected outgoing network payloads.

## Anti-Patterns

- E2E scope creep: Allowing the test to call live third-party services or dependent microservices instead of wire-level stubs.
- Re-testing granular unit logic: Writing dozens of micro-permutations of input edge cases at the component level instead of covering them in fast unit tests.
- Leaky test harness state: Failing to purge in-memory databases or reset wire stubs between runs, leading to non-deterministic test flakiness.

## When to Avoid

They overlap heavily with other layers when the component is:

- **Thin CRUD with no middleware to speak of.** Provider contract verification against a booted app plus sociable unit tests of the domain cover most of what a component test would. Keep one per critical flow as smoke coverage; skip exhaustive component coverage.
- **Utility libraries** are effectively multiple small components in as a single consumable dependency.
- **Pure transformation logic.** Parsers, calculators, scheduling math. Unit tests give better coverage per unit of effort.

If you're choosing between an extra component test and an extra unit test for the same behavior, the unit test is cheaper to write, run, and maintain. Component tests earn their keep at the seams between layers, not in repeating ground that unit tests already cover.

## Examples

### Backend Service

A component test for a REST API, exercising the full application stack with the
downstream inventory service replaced by a test double:

{{< card code=true header="**Backend component test - order creation with stubbed inventory service**" lang="javascript" >}}
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

A component test exercising a login flow with a stubbed authentication service:

{{< card code=true header="**Frontend component test - login flow with stubbed auth service**" lang="javascript" >}}
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

This is the second of three tiers in the
[Accessibility testing]({{< relref "/docs/testing/applied-testing-strategies/cross-cutting-concerns#accessibility-testing" >}})
strategy: static-analysis linting catches structural violations in source, component tests catch
the rendered-only ones (computed contrast, focus order, keyboard operability), and manual audits
cover the subjective remainder.

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

## Connection to CD Pipeline

Component tests run after unit tests in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}), but before longer running acceptance tests, and provide the broadest fast,
deterministic feedback:

1. **Local development**: run before committing. Deterministic scope keeps them fast
   enough to run locally without slowing the development loop.
2. **PR verification**: [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) executes the full suite; failures block merge.
3. **Trunk verification**: the same tests run on the merged HEAD to catch conflicts.

They should always halt the [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline on failure.
