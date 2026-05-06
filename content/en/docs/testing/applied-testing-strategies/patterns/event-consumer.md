---
title: "Event Consumer"
linkTitle: "Event Consumer"
weight: 5
description: >
  A service that consumes messages from a broker (Kafka, SQS, RabbitMQ, Pub/Sub). Brief sketch.
---

A consumer of messages from Kafka, SQS, RabbitMQ, Pub/Sub, or similar. Reads messages, processes them, often updates state and produces downstream messages. The "public interface" is the topic or queue and the schema of messages on it.

This pattern has problems the [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) and [API consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}) patterns don't have: ordering, replay, poison messages, dead-letter queues, and delivery semantics (at-most-once, at-least-once, exactly-once-with-effort).

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Message handler | Pure transformation per message | [Solitary unit tests]({{< relref "/docs/testing/glossary#solitary-unit-test" >}}) |
| Idempotency | Same message twice produces the same effect | In-process [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |
| Poison message handling | Malformed message goes to DLQ, doesn't crash the consumer | In-process [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |
| Ordering | Out-of-order messages produce documented outcomes | In-process [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |
| Backpressure | Consumer slows when downstream is slow | Resilience [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) |
| Broker contract | Topic, schema, headers | [Contract tests]({{< relref "/docs/testing/glossary#contract-test" >}}) |
| Broker client | Real protocol behavior, offset commits, consumer group rebalancing | [Gateway integration tests]({{< relref "/docs/testing/glossary#gateway-integration-test" >}}) against a real broker container |

{{< inline-svg src="/images/testing/patterns/event-consumer-coverage.svg" alt="Layered diagram of an event consumer with six architectural layers. The first five (message handler logic, idempotency and ordering, dead-letter and poison-message handling, backpressure, broker client) are inside the component boundary. Below the dashed boundary, the external broker and schema registry are drawn with a dashed border. Solitary unit tests cover handler logic. Component tests cover idempotency, dead-letter handling, ordering, and backpressure with the broker doubled. Gateway integration tests pin the broker protocol against a real broker container. Broker contract tests pin the topic, schema, and headers. Out-of-band synthetic publish confirms the doubles still match the real broker." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Well-formed message**: produces the expected state change and the documented downstream events.
- **Batch processing**: processes per documented policy.
- **Replay from offset**: reproduces the same end state.
- **Documented schema versions**: are accepted.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Malformed message**: routes to the DLQ with a correlation ID; the consumer survives.
- **Duplicate delivery**: absorbed by idempotency.
- **Out-of-order delivery**: follows the documented behaviour.
- **Mid-batch downstream failure**: the offset is left uncommitted.
- **Schema-version skew**: handled per the documented policy.
- **Slow downstream**: applies backpressure rather than OOM.
- **Consumer-group rebalance during processing**: no in-flight messages are stranded.

## Test double validation and pipeline placement

The broker double in component tests is validated by gateway integration tests against a real broker container (Kafka in Docker, ElasticMQ for SQS). Schema registry double is validated by contract tests pinning each version, plus a post-deploy check against the real registry. Post-deploy synthetic publishes a known message to the real topic in a non-prod environment.

Handler unit tests and component tests run in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1; gateway integration tests in CI Stage 1 or Stage 2; post-deploy synthetic on a schedule.

## Example: idempotency under duplicate delivery

`Money.usd` takes minor units (cents); 4250 represents $42.50.

{{< tabpane >}}
{{< tab header="Java" lang="java" >}}
@Test
void same_message_processed_twice_creates_one_payment_record() {
  PaymentEvent event = new PaymentEvent(
      "evt-9f12", OrderId.of("ord-001"), Money.usd(4250));
  PaymentRepo repo = new InMemoryPaymentRepo();
  PaymentEventHandler handler = new PaymentEventHandler(repo);

  handler.handle(event);
  handler.handle(event);

  assertThat(repo.findByEventId("evt-9f12")).hasSize(1);
  assertThat(repo.totalForOrder(OrderId.of("ord-001"))).isEqualTo(Money.usd(4250));
}
{{< /tab >}}
{{< tab header="C#" lang="csharp" >}}
[Fact]
public void Same_message_processed_twice_creates_one_payment_record()
{
    var evt = new PaymentEvent("evt-9f12", OrderId.Of("ord-001"), Money.Usd(4250));
    var repo = new InMemoryPaymentRepo();
    var handler = new PaymentEventHandler(repo);

    handler.Handle(evt);
    handler.Handle(evt);

    repo.FindByEventId("evt-9f12").Should().HaveCount(1);
    repo.TotalForOrder(OrderId.Of("ord-001")).Should().Be(Money.Usd(4250));
}
{{< /tab >}}
{{< tab header="JavaScript" lang="javascript" >}}
test("same message processed twice creates one payment record", () => {
  const event = new PaymentEvent(
    "evt-9f12", OrderId.of("ord-001"), Money.usd(4250));
  const repo = new InMemoryPaymentRepo();
  const handler = new PaymentEventHandler(repo);

  handler.handle(event);
  handler.handle(event);

  expect(repo.findByEventId("evt-9f12")).toHaveLength(1);
  expect(repo.totalForOrder(OrderId.of("ord-001"))).toEqual(Money.usd(4250));
});
{{< /tab >}}
{{< /tabpane >}}
