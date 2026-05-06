---
title: "API Consumer"
linkTitle: "API Consumer"
weight: 2
description: >
  An API provider that also consumes one or more upstream APIs. The most failure-prone pattern in distributed systems and the one that gets the most testing attention.
---

Same as [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}), plus outbound HTTP/gRPC calls to services the team does not own (or does own but deploys independently). This is the most failure-prone pattern in distributed systems and gets the most testing attention.

## What needs covered

Everything from the [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) pattern, plus:

| Layer | Concern | Test type |
| --- | --- | --- |
| Outbound gateway | Request shape, response parsing, status code handling, header propagation, timeout enforcement | Gateway integration tests (against WireMock or, periodically, the real downstream) |
| Outbound contract | The fields and status codes the consumer depends on | [Consumer-side contract tests]({{< relref "/docs/testing/test-types/contract" >}}) |
| Resilience under degraded [dependencies]({{< relref "/docs/reference/glossary#dependency" >}}) | Retries, circuit breaking, backoff, fallback, partial-failure compensation | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) with fault-injecting gateway doubles |
| Composite behavior | The service still returns useful responses when downstreams misbehave | Component tests |

{{< figure src="/images/testing/patterns/api-consumer-coverage.svg" alt="Coverage matrix for an API consumer. Rows are HTTP and API surface, domain logic and orchestration, resilience policy (retry, circuit breaker, timeout, fallback), outbound HTTP gateway, persistence adapter, the external database, and the external downstream service. Columns are solitary unit, sociable unit, component (in-band, with fault-injecting gateway doubles), gateway integration, consumer contract, and out-of-band integration. Component tests cover every internal layer including resilience, with both downstream service and database doubled. Gateway integration tests pin the outbound and persistence protocols against real containers. Consumer contract tests pin what the service sends and depends on at the outbound boundary. Out-of-band integration confirms the doubles still match the real downstream services." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Outbound call**: constructs the right URL, headers, body, auth, and timeout.
- **Success response**: parsed correctly, including optional fields and unknown fields per Postel's Law.
- **Multi-call composition**: multiple downstream calls in sequence or parallel produce the documented composite response.
- **Caching**: returns the cached value within TTL and refreshes after.
- **Trace context**: propagates downstream.

## Negative test cases

Common cases to consider, not an exhaustive list. The bulk of the negative testing happens here, and it's where most production incidents originate. Drive each failure mode through a gateway double that simulates it.

- **Timeout** (downstream exceeds configured deadline): the deadline enforces; the upstream caller gets the documented response (e.g., 504); no partial state is committed. Use a gateway double that delays past the deadline.
- **Connection refused**: retry policy executes the documented count and backoff; falls over to fallback or returns an error. Use a gateway double that rejects the connection.
- **5xx responses** (500, 502, 503): retry only on retryable codes. Use a gateway double that returns 5xx.
- **4xx responses** (400, 401, 403, 404, 409, 422, 429): each maps to documented behaviour; 4xx generally not retried; 429 respects `Retry-After`. Use a gateway double that returns each code.
- **Slow response within timeout**: performance-budget assertions hold if the service has SLO commitments. Use a gateway double that delays within the deadline.
- **Malformed response body**: the response is rejected, not silently coerced. Use a gateway double that returns a truncated or wrong-type body.
- **Schema drift** (extra or missing fields): extra fields tolerated; missing required fields detected with a clear error. Use a gateway double that returns a drifted body.
- **Wrong status code** (200 with error body, 500 with success body): the client trusts the status code, not the body. Use a gateway double that returns mismatched status and body.
- **Circuit open**: the circuit opens under sustained failure; fast-fails subsequent calls; recovers on a half-open probe. Use a gateway double that sustains failures.
- **Partial multi-call failure**: compensation, [rollback]({{< relref "/docs/reference/glossary#rollback" >}}), or documented partial-success behaviour. First gateway double succeeds, second fails.

## Test double validation

This is where the "doubles need tests" rule lives or dies. Four layers:

1. **Consumer-side contract tests** run in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) on every commit using doubles. They pin the request the consumer sends and the response shape the consumer depends on. Contract artifacts are published to a broker. Fast, deterministic, blocks the build.
2. **Gateway integration tests** exercise the outbound gateway against either WireMock loaded with provider-supplied fixtures, or, for in-house dependencies, against a containerized instance of the real provider in a known state. These verify the gateway code correctly speaks the protocol: serialization, deserialization, header handling, timeout behavior, error mapping.
3. **Provider-side contract verification** runs in the *provider's* pipeline. The provider executes every consumer's published contract against the real provider implementation. Breaking changes are caught at the source before the provider deploys.
4. **Post-deploy integration check** runs periodically against the real downstream in a non-production environment. Same fixtures used in contract tests. Catches drift in fields the contract didn't pin, version skew, environment differences. Failures trigger review, not a build break. See [Out-of-Pipeline Verification]({{< relref "/docs/reference/pipeline-reference-architecture" >}}#out-of-pipeline-verification).

For **third-party APIs** you do not control, there is no provider verification step. The post-deploy check against the live (or sandbox) API is the only mechanism keeping doubles honest. Run it more often than for in-house dependencies. Daily at minimum.

The anti-pattern to avoid: stubbing the third-party SDK directly. Always wrap third-party clients in a thin adapter the team owns, then double the adapter. This is called out explicitly as [Mocking what you don't own]({{< relref "/docs/testing/antipatterns#mocking-what-you-dont-own" >}}) and is the single most common source of "but it worked in tests" incidents.

## Pipeline placement

Same as the [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) pattern, plus:

- Consumer-side contract tests: pre-commit and [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1.
- Outbound gateway integration tests (against WireMock or testcontainer): CI Stage 1 or Stage 2.
- Resilience component tests with fault injection: CI Stage 1.
- Post-deploy integration checks against real downstreams: out of pipeline, on a schedule.

## Example: fault injection at the gateway double

A negative-path test for downstream timeout. The payment gateway double simulates a slow response, the test asserts the deadline enforces and the upstream caller gets the documented error envelope:

```javascript
test("returns 504 when payment service exceeds deadline", async () => {
  const slowPayments = {
    charge: () => new Promise((_, reject) => {
      setTimeout(() => reject(new TimeoutError("payments")), 50);
    })
  };
  const orderRepo = new InMemoryOrderRepo();
  const app = buildApp({ orderRepo, payments: slowPayments, deadlineMs: 30 });

  const res = await request(app)
    .post("/orders")
    .set("Authorization", "Bearer tok_valid")
    .send({ items: [{ sku: "A1", qty: 1 }], paymentToken: "pm_ok" });

  expect(res.status).toBe(504);
  expect(res.body.error.code).toBe("UPSTREAM_TIMEOUT");
  expect(orderRepo.all()).toHaveLength(0);
});
```

The test verifies three things at once: the documented status code, the structured error body the API contract promises, and that no partial state was committed.
