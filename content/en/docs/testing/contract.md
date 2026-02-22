---
title: "Contract Tests"
linkTitle: "Contract Tests"
weight: 5
description: >
  Non-deterministic tests that validate test doubles by verifying API contract format against live external systems.
---

## Definition

A contract test validates that the test doubles used in
[integration tests](../integration/) still accurately represent the real external system.
Contract tests run against the **live** external sub-system and exercise the portion of the
code that interfaces with it. Because they depend on live services, contract tests are
**non-deterministic** and should not break the build. Instead, failures should trigger a
review to determine whether the contract has changed and the test doubles need updating.

A contract test validates **contract format, not specific data**. It verifies that response
structures, field names, types, and status codes match expectations, not that particular
values are returned.

Contract tests have two perspectives:

- **Provider**: the team that owns the API verifies that all changes are backwards compatible
  (unless a new API version is introduced). Every build should validate the provider contract.
- **Consumer**: the team that depends on the API verifies that they can still consume the
  properties they need, following
  [Postel's Law](https://en.wikipedia.org/wiki/Robustness_principle): "Be conservative in
  what you do, be liberal in what you accept from others."

## When to Use

- You have [integration tests](../integration/) that use test doubles (mocks, stubs, recorded
  responses) to represent external services, and you need assurance those doubles remain
  accurate.
- You consume a **third-party or cross-team API** that may change without notice.
- You provide an API to other teams and want to ensure that your changes do not break their
  expectations (**consumer-driven contracts**).
- You are adopting **contract-driven development**, where contracts are defined during design
  so that provider and consumer teams can work in parallel using shared mocks and fakes.

## Characteristics

| Property        | Value                                             |
|-----------------|---------------------------------------------------|
| **Speed**       | Seconds (depends on network latency)              |
| **Determinism** | Non-deterministic (hits live services)             |
| **Scope**       | Interface boundary between two systems             |
| **Dependencies**| Live external sub-system                           |
| **Network**     | Yes (calls the real dependency)                    |
| **Database**    | Depends on the provider                            |
| **Breaks build**| No (failures trigger review, not build failure)    |

## Examples

A provider contract test verifying that an API response matches the expected schema:

{{% code-collapse title="Provider contract test - schema validation" %}}
```javascript
describe("GET /users/:id contract", () => {
  it("should return a response matching the user schema", async () => {
    const response = await fetch("https://api.partner.com/users/1");
    const body = await response.json();

    // Validate structure, not specific data
    expect(response.status).toBe(200);
    expect(body).toHaveProperty("id");
    expect(typeof body.id).toBe("number");
    expect(body).toHaveProperty("name");
    expect(typeof body.name).toBe("string");
    expect(body).toHaveProperty("email");
    expect(typeof body.email).toBe("string");
  });
});
```
{{% /code-collapse %}}

A consumer-driven contract test using Pact:

{{% code-collapse title="Consumer-driven contract test with Pact" %}}
```javascript
describe("Order Service - Inventory Provider Contract", () => {
  it("should receive stock availability in the expected format", async () => {
    // Define the expected interaction
    await provider.addInteraction({
      state: "item-42 is in stock",
      uponReceiving: "a request for item-42 stock",
      withRequest: { method: "GET", path: "/stock/item-42" },
      willRespondWith: {
        status: 200,
        body: {
          available: Matchers.boolean(true),
          quantity: Matchers.integer(10),
        },
      },
    });

    // Exercise the consumer code against the mock provider
    const result = await inventoryClient.checkStock("item-42");
    expect(result.available).toBe(true);
  });
});
```
{{% /code-collapse %}}

## Anti-Patterns

- **Using contract tests to validate business logic**: contract tests verify structure and
  format, not behavior. Business logic belongs in [functional tests](../functional/).
- **Breaking the build on contract test failure**: because these tests hit live systems,
  failures may be caused by network issues or temporary outages, not actual contract changes.
  Treat failures as signals to investigate.
- **Neglecting to update test doubles**: when a contract test fails because the upstream API
  changed, the test doubles in your integration tests must be updated to match. Ignoring
  failures defeats the purpose.
- **Running contract tests too infrequently**: the frequency should be proportional to the
  volatility of the interface. Highly active APIs need more frequent contract validation.
- **Testing specific data values**: asserting that `name` equals `"Alice"` makes the test
  brittle. Assert on types, required fields, and response codes instead.

## Connection to CD Pipeline

Contract tests run **asynchronously** from the main [CI](../glossary/#ci-continuous-integration) build, typically on a schedule:

1. **Provider side**: provider contract tests (schema validation, response code checks) are
   often implemented as deterministic unit tests and run on every commit as part of the
   provider's CI [pipeline](../glossary/#pipeline).
2. **Consumer side**: consumer contract tests run on a schedule (e.g., hourly or daily)
   against the live provider. Failures are reviewed and may trigger updates to test doubles
   or conversations between teams.
3. **Consumer-driven contracts**: when using tools like Pact, the consumer publishes
   contract expectations and the provider runs them continuously. Both teams communicate when
   contracts break.

Contract tests are the bridge that keeps your fast, deterministic integration test suite
honest. Without them, test doubles can silently drift from reality, and your integration
tests provide false confidence.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
