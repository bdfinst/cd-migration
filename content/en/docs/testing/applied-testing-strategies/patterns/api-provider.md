---
title: "API Provider"
linkTitle: "API Provider"
weight: 1
description: >
  A backend service that exposes an HTTP/gRPC/GraphQL API and owns its own data. No outbound calls to other services in your control.
---

A backend service that exposes an HTTP/gRPC/GraphQL API and owns its own data. No outbound calls to other services in your control.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Domain logic | Business rules, invariants, state transitions | [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) |
| Module collaboration | Validators + repositories + domain working together | [Sociable unit tests]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) |
| Persistence gateway | Query correctness, transaction boundaries, migrations against the real DB engine | Gateway integration tests (testcontainers running production engine and version) |
| Assembled component | Routing, validation, business logic, and persistence wired together through the controller layer | [Component tests]({{< relref "/docs/testing/test-types/component" >}}) with persistence either real (testcontainers) or doubled (in-memory repository) |
| Consumer expectations | What downstream consumers depend on | [Provider-side contract tests]({{< relref "/docs/testing/test-types/contract" >}}) |

{{< figure src="/images/testing/patterns/api-provider-coverage.svg" alt="Coverage matrix showing which architectural layers each test type covers for an API provider. Rows are HTTP and API surface, domain logic, persistence adapter, and the external database. Columns are solitary unit, sociable unit, component (in-band), gateway integration, and provider contract. Solitary unit tests cover only domain logic. Sociable unit tests cover domain plus persistence adapter. Component tests cover all three internal layers with the database doubled. Gateway integration exercises the persistence adapter against the real database engine. Provider contract verifies the HTTP API surface against published consumer expectations." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Documented endpoints**: return the expected shape and status for valid input.
- **Auth**: succeeds for valid credentials and tokens.
- **Pagination, filtering, sorting**: all return the documented results.
- **Idempotency**: idempotent operations are idempotent; non-idempotent operations create exactly one record.
- **Success-path side effects**: events emitted and audit log entries happen on the success path.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Malformed body**: bad JSON, missing required fields, wrong types, extra fields handled per the documented policy (reject vs. ignore).
- **Out-of-range values**: negatives where positives are expected, oversize strings, unicode edge cases.
- **Auth failures**: missing token, expired token, valid token with insufficient scope, valid token for a different tenant.
- **Authorization boundaries**: user A cannot read or modify user B's resources.
- **Resource not found**: referenced IDs don't exist, return 404 not 500.
- **Concurrency**: two writes to the same resource at once, optimistic-lock conflict handled with the documented status code.
- **Persistence failure**: DB unavailable, deadlock, constraint violation. The error envelope is correct and no partial state is committed.
- **Rate limiting and request size limits**: both enforce as documented.
- **Idempotency under retry**: same idempotency key within the window returns the original result, not a duplicate write.

## Test double validation

Doubles in this pattern are mostly around persistence. Two layers keep them honest:

1. **Gateway integration tests run against a real instance of your production database engine** (the same major version, same extensions). If component tests use an in-memory SQLite shim while production runs Postgres, the shim is the lie. The gateway integration test exercises every query and migration against a Postgres testcontainer in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}).
2. **Provider-side contract tests** verify the API still satisfies every published consumer expectation. See [Consumer and Provider Perspectives]({{< relref "/docs/testing/test-types/contract" >}}#consumer-and-provider-perspectives). Provider verification is where you discover that a "harmless" field rename broke a consumer before that consumer deploys.

## Pipeline placement

- Unit + sociable unit tests: pre-commit and CI Stage 1.
- Gateway integration tests against testcontainers: CI Stage 1 if fast, Stage 2 otherwise.
- Component tests: CI Stage 1.
- Provider-side contract verification: [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) Stage 1 (Contract and Boundary Validation).

## Example: component test

A flow-oriented component test for an order-placement endpoint. The full app is assembled with an in-memory order repository and an in-memory event bus. The test drives the assembled component through its HTTP handlers via supertest, and asserts on observable outcomes (status, persisted state, emitted event):

```javascript
import request from "supertest";
import { buildApp } from "./app.js";
import { InMemoryOrderRepo } from "./test/in-memory-order-repo.js";
import { InMemoryEventBus } from "./test/in-memory-event-bus.js";

test("places order with valid payment creates order and emits OrderPlaced", async () => {
  const orderRepo = new InMemoryOrderRepo();
  const events = new InMemoryEventBus();
  const app = buildApp({ orderRepo, events });

  const res = await request(app)
    .post("/orders")
    .set("Authorization", "Bearer tok_valid")
    .send({ items: [{ sku: "A1", qty: 2 }], paymentToken: "pm_ok" });

  expect(res.status).toBe(201);
  expect(orderRepo.findById(res.body.id)).toBeDefined();
  expect(events.published).toContainEqual(
    expect.objectContaining({ type: "OrderPlaced", orderId: res.body.id })
  );
});
```

The test asserts on what a real caller can observe, not on private methods or call sequences inside the controller.
