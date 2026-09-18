---
title: "Contract Tests"
linkTitle: "Contract Tests"
weight: 2
aliases:
  - /docs/reference/testing/contract/
  - /docs/testing/contract/
description: >
  Deterministic tests that verify interface boundaries with external systems using test doubles. Also called narrow integration tests. Validated by integration tests running against real systems.
---

{{< figure src="/images/testing/contract-test.svg" alt="Consumer-driven contract flow: consumer team runs a component test against a provider test double, generating a contract artifact. The provider team runs a verification step against the real service using the consumer contract. Both sides discover different things: consumers check for fields and types they depend on; providers check they have not broken any consumer." >}}

## Definition

Verification that two separate systems (such as an API provider and its consumers, or a message publisher and subscriber) adhere to a shared, agreed-upon formal specification, the "contract", without requiring both services to run simultaneously in an integrated environment.

## Scope & Boundaries

Targets only the boundary interface: request payloads, query parameters, HTTP headers, response schemas, status codes, or message formats. It does not test internal business logic, database state, or deep end-to-end user journeys; it solely verifies compatibility with the interface schema (e.g., OpenAPI/Swagger, AsyncAPI, Protobuf).

## Characteristics

Fast, independent execution across pipelines, prevents breaking schema changes before deployment, and eliminates the need for expensive, flaky end-to-end integration environments in applications with proper domain separation.

## Good Practices:

- Strict schema adherence: Explicitly define nullability, enums, required fields, and format constraints rather than relying on loose, open schemas.
- Automated breaking-change detection: Integrate tools like oasdiff or buf breaking into CI to catch backwards-incompatible schema changes on pull requests.
- Generate stubs directly from contracts: Use contract-driven mock engines (e.g., Prism, Microcks) so mock behavior automatically updates whenever the contract changes.

## Anti-Patterns:

- Testing business logic via contracts: Attempting to verify authorization rules, complex workflows, or algorithmic computations inside a contract test.
  - Example: testing that a request for a user return a specific user instead of the expected user object.
- Hand-crafted, unverified mock fixtures: Manually updating JSON response stubs in consumer code repos without validating them against the live contract artifact.
- All-or-nothing megaspecs: Coupling unrelated domains or multiple service interfaces into a single monolithic contract document that cannot be versioned or evolved independently.

## Validating the Contract

A contract test only proves your code matches the contract - not that the contract still matches the real system. [Integration tests]({{< relref "/docs/testing/test-types/integration" >}}) close that gap by running against the real dependency. How tightly that loop closes depends on collaboration level: low collaboration means scheduled integration tests against the real system with no shared tooling; high collaboration adds a hosted specification server ([Pact](https://pact.io/), [Pacto](https://thoughtworks.github.io/pacto/)), a specification fetched from a shared or provider repository at build time, or a provider webhook that triggers the consumer's CI when the contract changes.

## Consumer and Provider Perspectives

A contract has two sides asking different questions. The **consumer** asks whether the fields, types, and status codes it depends on still exist. Consumer tests assert only on the subset of the API the consumer actually uses, not the whole response - following Postel's Law, be liberal in what you accept and conservative in what you send.

The **provider** asks whether its changes will break any consumer. A provider test runs every published consumer expectation against the real implementation, catching a removed field, a changed type, or altered error behavior before a consumer deploys and discovers the break.

## Contract-First Development

The interface is defined as a formal artifact - an OpenAPI, Protobuf, or AsyncAPI spec - before either side writes an implementation. Consumer and provider teams build independently against that artifact, then verify conformance to the spec rather than to each other's code. Works best for new APIs and parallel development, where there's no existing implementation to write consumer-driven contracts against.

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
// The OpenAPI document is the source of truth. Validate the whole response
// against the named schema rather than hand-checking individual fields - a
// field-by-field check drifts from the spec the moment the spec changes.
const validator = openApiValidator(openApiSpec);

describe("GET /stock/:id - OpenAPI contract", () => {
  it("should return a response conforming to the published schema", async () => {
    const response = await fetch("http://localhost:3001/stock/item-42");
    const body = await response.json();

    expect(response.status).toBe(200);

    // Asserts structure, types, required fields, and additionalProperties
    // rules exactly as the OpenAPI schema declares them.
    const result = validator.validate(body, "StockResponse");
    expect(result.errors).toEqual([]);
  });
});
{{< /card >}}

## Connection to CD Pipeline

Contract tests run after unit tests in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}):

1. **Local development**: run before committing. Deterministic scope keeps them fast
   enough to run locally without slowing the development loop.
2. **PR verification**: [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) executes the full suite; failures block merge.
3. **Trunk verification**: the same tests run on the merged HEAD to catch conflicts.

They should always halt the [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) pipeline on failure.
