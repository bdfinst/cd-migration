---
title: "Testing Glossary"
linkTitle: "Testing Glossary"
weight: 100
description: >
  Definitions for testing terms as they are used on this site.
---

These definitions reflect how this site uses each term. They are not universal definitions -
other communities may use the same words differently.

### Black Box Testing

A testing approach where the test exercises code through its public interface and asserts
only on observable outputs - return values, state changes visible to consumers, or side
effects such as messages sent. The test has no knowledge of internal implementation details.
Black box tests are resilient to refactoring because they verify **what** the code does, not
**how** it does it. Contrast with [white box testing](#white-box-testing).

Referenced in:
[Testing]({{< relref "/docs" >}}),
[Unit Tests]({{< relref "/docs/reference/testing/unit" >}})

### Functional Acceptance Tests

Automated tests that verify a system behaves as specified. Functional acceptance tests
exercise end-to-end user workflows in a
[production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}) and confirm the implementation
matches the acceptance criteria. They answer "did we build what was specified?" rather than
"does the code work?" They do not validate whether the specification itself is correct -
only real user feedback can confirm we are building the right thing.

Referenced in:
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}})

### TDD (Test-Driven Development)

A development practice where tests are written before the production code that makes them
pass. TDD supports CD by ensuring high test coverage, driving simple design, and producing
a fast, reliable test suite. TDD feeds into the [testing fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})
required in Phase 1.

Referenced in:
[CD for Greenfield Projects]({{< relref "/docs/migrate-to-cd/greenfield" >}}),
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}),
[Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}),
[Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}),
[TBD Migration Guide]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/tbd-migration" >}}),
[Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}),
[Unit Tests]({{< relref "/docs/reference/testing/unit" >}})

### Virtual Service

A test double that simulates a real external service over the network, responding to HTTP
requests with pre-configured or recorded responses. Unlike in-process stubs or mocks, a
virtual service runs as a standalone process and is accessed via real network calls, making
it suitable for functional testing and integration testing where your application needs to
make actual HTTP requests against a dependency. Tools such as WireMock, Mountebank, and
Hoverfly can create virtual services from recorded traffic or API specifications. See
[Test Doubles]({{< relref "/docs/reference/testing/test-doubles" >}}).

Referenced in:
[Integration Tests]({{< relref "/docs/reference/testing/integration" >}}),
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})

### White Box Testing

A testing approach where the test has knowledge of and asserts on internal implementation
details - specific methods called, call order, internal state, or code paths taken. White
box tests verify **how** the code works, not **what** it produces. These tests are fragile
because any refactoring of internals breaks them, even when behavior is unchanged. Avoid
white box testing in unit tests; prefer [black box testing](#black-box-testing) that asserts
on observable outcomes.

Referenced in:
[Testing]({{< relref "/docs" >}}),
[Unit Tests]({{< relref "/docs/reference/testing/unit" >}})
