---
title: "Contract Tests"
linkTitle: "Contract Tests"
weight: 5
aliases:
  - /docs/reference/testing/contract/
description: >
  Tests that verify the interface between a consumer and a provider has not broken. Non-deterministic; never a pipeline gate, but essential for keeping component test doubles accurate.
---

{{< figure src="/images/testing/contract-test.svg" alt="Consumer-driven contract flow: consumer team runs a component test against a provider test double, generating a contract artifact. The provider team runs a verification step against the real service using the consumer contract. Both sides discover different things: consumers check for fields and types they depend on; providers check they have not broken any consumer." >}}

## Definition

A contract test verifies that the test doubles used in
[component tests]({{< relref "/docs/testing/component" >}}) still accurately represent the
real external system. It does this by running against the **live** external sub-system
and asserting that the interface structure - response shapes, field names, types, and
status codes - matches what the test doubles expect.

A contract test validates **interface structure, not business behavior**. It answers
"is the shape of this response what we expect?" not "is the logic correct?" Business
logic belongs in component tests.

Because contract tests hit live systems, they are **non-deterministic** and must never
block the pipeline. Failures trigger review, not a build failure.

## Consumer and Provider Perspectives

Every contract has two sides. The questions each side is trying to answer are different.

### Consumer contract testing

The **consumer** is the service or component that depends on an external API. A consumer
contract test asks:

> **"Do the fields I depend on still exist, in the types I expect, with the status codes
> I handle?"**

Consumer tests assert only on the **subset of the API the consumer actually uses** - not
everything the provider exposes. A consumer that only needs `id` and `email` from a user
object should not assert on `address` or `phone`. This allows providers to add new fields
freely without breaking consumers.

Following Postel's Law - "be conservative in what you send, be liberal in what you accept"
- consumer tests should accept any valid response that contains the fields they need, and
tolerate fields they do not use.

What a consumer is trying to discover:
- Has the provider changed or removed a field I depend on?
- Has the provider changed a type I expect (string to integer, object to array)?
- Has the provider changed a status code I handle?
- Does the provider still accept the request format I send?

### Provider contract testing

The **provider** is the service that owns the API. A provider contract test asks:

> **"Have my changes broken any of my consumers?"**

A provider runs contract tests to verify that its API responses still satisfy the
expectations of every known consumer. This gives early warning - before any consumer
deploys and discovers the breakage - that a change is breaking.

What a provider is trying to discover:
- Have I removed or renamed a field that a consumer depends on?
- Have I changed a type in a way that breaks deserialization for a consumer?
- Have I changed error behavior (status codes, error formats) that consumers handle?
- Is my API still backward compatible with all published consumer expectations?

## Approaches to Contract Testing

### Consumer-driven contract development

In **consumer-driven contracts (CDC)**, the consumer writes the contract. The consumer
defines their expectations as executable tests - what request they will send and what
response shape they require. These expectations are published to a shared contract broker and the provider runs them
as part of their own build.

The flow:

1. Consumer team writes tests defining their expectations against a mock provider.
2. The consumer tests generate a contract artifact.
3. The contract is published to a shared contract broker.
4. The provider team runs the consumer's contract expectations against their real
   implementation.
5. If the provider's implementation satisfies the contract, the provider can deploy
   with confidence it will not break this consumer. If not, the teams negotiate before
   merging the breaking change.

CDC works well for **evolving systems**: it grounds the API design in actual consumer
needs rather than the provider's assumptions about what consumers will use.

### Contract-first development

In **contract-first development**, the interface is defined as a formal artifact -
an OpenAPI specification, a Protobuf schema, an Avro schema, or similar - before
any implementation is written. Both the consumer and provider code are generated from
or validated against that artifact.

The flow:

1. Teams agree on the interface contract (usually during design or story refinement).
2. The contract is committed to version control.
3. Consumer and provider teams develop independently, each generating or validating
   their code against the contract.
4. Tests on both sides verify conformance to the contract - not to each other's
   implementation.

Contract-first works well for **new APIs and parallel development**: it lets consumer
and provider teams work simultaneously without waiting for a real implementation, and
makes the interface an explicit design decision rather than an emergent one.

### Choosing between them

| Situation | Prefer |
|-----------|--------|
| Existing API with multiple consumers, evolving over time | Consumer-driven (CDC) |
| New API, teams working in parallel | Contract-first |
| Third-party API you do not control | Consumer-only contract tests (no provider side) |
| Public API with external consumers you cannot reach | Provider tests against published spec |

The two approaches are not mutually exclusive. A team may define an initial contract-first
schema and then adopt CDC tooling as the number of consumers grows.

## Characteristics

| Property        | Value                                             |
|-----------------|---------------------------------------------------|
| **Speed**       | Seconds (depends on network latency)              |
| **Determinism** | Non-deterministic (hits live services)            |
| **Scope**       | Interface boundary between two systems            |
| **Dependencies**| Live external sub-system                          |
| **Network**     | Yes (calls the real dependency or a broker)       |
| **Database**    | Depends on the provider                           |
| **Breaks build**| No - failures trigger review, not build failure   |

## Examples

A consumer contract test using a consumer-driven contract tool:

{{< card code=true header="**Consumer contract test - order service consuming inventory API**" lang="javascript" >}}
describe("Order Service - Inventory Provider Contract", () => {
  it("should receive stock availability in the expected format", async () => {
    // Define what the consumer expects from the provider
    await contractTool.addInteraction({
      state: "item-42 is in stock",
      uponReceiving: "a request for item-42 stock",
      withRequest: { method: "GET", path: "/stock/item-42" },
      willRespondWith: {
        status: 200,
        body: {
          // Only assert on fields the consumer actually uses
          available: matchType(true),   // boolean
          quantity: matchType(10),      // integer
        },
      },
    });

    // Exercise the consumer code against the mock provider
    const result = await inventoryClient.checkStock("item-42");
    expect(result.available).toBe(true);
  });
});
{{< /card >}}

A provider verification test that runs consumer expectations against the real implementation:

{{< card code=true header="**Provider verification - running consumer contracts against the real API**" lang="javascript" >}}
describe("Inventory Service - Provider Verification", () => {
  it("should satisfy all registered consumer contracts", async () => {
    await contractBroker.verifyProvider({
      provider: "InventoryService",
      providerBaseUrl: "http://localhost:3001",
      brokerUrl: "https://contract-broker.internal",
      providerVersion: process.env.GIT_SHA,
    });
  });
});
{{< /card >}}

A contract-first schema validation test verifying a provider response against an OpenAPI spec:

{{< card code=true header="**Contract-first test - OpenAPI schema validation**" lang="javascript" >}}
describe("GET /stock/:id - OpenAPI contract", () => {
  it("should return a response conforming to the published schema", async () => {
    const response = await fetch("http://localhost:3001/stock/item-42");
    const body = await response.json();

    // Validate against the OpenAPI schema, not specific values
    expect(response.status).toBe(200);
    expect(typeof body.available).toBe("boolean");
    expect(typeof body.quantity).toBe("number");
    // Additional fields the consumer does not use are not asserted on
  });
});
{{< /card >}}

## Anti-Patterns

- **Asserting on business logic**: contract tests verify structure, not behavior. A contract
  test that asserts `quantity > 0` when in stock is crossing into business logic territory.
  That belongs in component tests.
- **Asserting on fields the consumer does not use**: over-specified consumer contracts make
  providers brittle. Only assert on what your code actually reads.
- **Testing specific data values**: asserting that `name` equals `"Alice"` makes the test
  brittle. Assert on types, required fields, and status codes instead.
- **Breaking the build on failure**: contract tests hit live systems. A network hiccup is
  not a code quality signal. Treat failures as investigation triggers.
- **Running infrequently**: contract tests should run often enough to catch drift before it
  causes a production incident. High-volatility APIs may need hourly runs.
- **Skipping provider verification in CDC**: publishing consumer expectations is only half
  the pattern. The provider must actually run those expectations for CDC to work.

## Connection to CD Pipeline

Contract tests run **asynchronously** from the main build - on a schedule, on provider
deploy, or triggered by a new consumer contract being published:

{{< card code=true header="**Contract tests in the pipeline**" lang="text" >}}
Stage 1 (every commit)   Unit tests              Deterministic    Blocks
                         Component tests         Deterministic    Blocks

Asynchronous             Consumer contract tests  Non-deterministic   No (triggers review)
                         Provider verification    Non-deterministic   No (triggers negotiation)

Post-deployment          E2E smoke tests          Non-deterministic   Triggers rollback
{{< /card >}}

Contract tests are the bridge that keeps your fast, deterministic component test suite
honest. Without them, the test doubles in your component tests can silently drift from
the real behavior of the systems they replace - giving you false confidence.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
