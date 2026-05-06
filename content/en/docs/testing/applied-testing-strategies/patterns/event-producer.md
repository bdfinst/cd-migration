---
title: "Event Producer"
linkTitle: "Event Producer"
weight: 6
description: >
  A service that produces messages to a broker. Often paired with the event consumer pattern in the same service. Brief sketch.
---

The producer side, often paired with the [Event consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-consumer" >}}) pattern in the same service. After a state change, the service publishes a message that downstream consumers depend on.

The hard problems differ from the consumer side: atomicity with persistence (did the DB row commit *and* the message publish?), exactly-once semantics that require an outbox or two-phase commit, and downstream consumer dependence on schema, routing key, and headers.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Outbox / transactional emit | DB write and message emit happen as a unit | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) with real DB + broker double |
| Produced message contract | Schema, headers, routing | [Provider-side contract tests]({{< relref "/docs/testing/glossary#contract-test" >}}) |
| Routing | Right topic and key per event type | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |
| Retry on broker unavailable | Outbox drains once broker recovers | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) with fault-injecting broker client double |
| Trace propagation | Trace context in headers matches the inbound request | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |

{{< inline-svg src="/images/testing/patterns/event-producer-coverage.svg" alt="Layered diagram of an event producer with five architectural layers. The first three (domain emit decision, outbox or transactional emit, broker client) are inside the component boundary. Below the dashed boundary, the external broker and the database used by the outbox are drawn with dashed borders. Solitary unit tests cover the emit decision logic. Component tests cover outbox atomicity, retry on broker unavailable, and trace propagation, run with a real database and a doubled broker. Adapter integration pins the broker protocol against a real broker container. Provider contract verification runs against every consumer's published expectations. Out-of-band synthetic state change confirms the message arrives in the real broker." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **State change**: produces the correct message on the correct topic with the correct routing key, headers, and schema version.
- **Outbox drain**: drains in order.
- **Redelivery**: does not reorder.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **DB commits but broker fails**: the message stays in the outbox and emits on the next drain. No event lost.
- **Broker accepts but DB rolls back**: nothing is emitted. No phantom events.
- **Broker unavailable for an extended period**: the outbox accumulates with bounded growth and alerts at a threshold.
- **Breaking schema change**: fails provider-side contract verification before shipping.

## Test double validation and pipeline placement

The broker double in component tests is validated against a real broker container the team controls in [adapter integration tests]({{< relref "/docs/testing/glossary#adapter-integration-test" >}}). The test asserts the adapter publishes with the right routing key, headers, and serialization - it does not assert which messages downstream consumers happen to read or in what order; those are downstream concerns. Provider-side contract verification runs in this service's [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) against every consumer's published expectations.

Outbox component tests and routing tests run in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1; adapter integration tests against a team-controlled broker container in CI Stage 1 or Stage 2; adapter integration tests against a managed broker the team can't pin run [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) on a schedule. Provider-side contract verification in [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) Stage 1; post-deploy synthetic state change verifies the message arrives with the expected shape.
