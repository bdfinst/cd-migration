---
title: "Testing Glossary"
linkTitle: "Testing Glossary"
weight: 100
aliases:
  - /docs/reference/testing/glossary/
description: >
  Definitions for testing terms as they are used on this site.
---

These definitions reflect how this site uses each term. They are not universal definitions -
other communities may use the same words differently.

### Component Test

A deterministic test that verifies a complete frontend component or backend service through
its public interface, with [test doubles]({{< relref "/docs/testing/test-doubles" >}}) replacing
all external dependencies. No real databases, downstream services, or network calls leave
the process. Component tests cover the assembled behavior of a unit - how its internal
modules, business logic, and interface layer work together - without depending on any system
the team does not control. Sometimes called a sociable unit test when the scope covers multiple
collaborating objects within the component boundary. Contrast with
[end-to-end tests]({{< relref "/docs/testing/e2e" >}}) which use real external dependencies.

Referenced in:
[Unit Tests]({{< relref "/docs/testing/unit" >}}),
[Component Tests]({{< relref "/docs/testing/component" >}}),
[End-to-End Tests]({{< relref "/docs/testing/e2e" >}})

### Black Box Testing

A testing approach where the test exercises code through its public interface and asserts
only on observable outputs - return values, state changes visible to consumers, or side
effects such as messages sent. The test has no knowledge of internal implementation details.
Black box tests are resilient to refactoring because they verify **what** the code does, not
**how** it does it. Contrast with [white box testing](#white-box-testing).

Referenced in:
[Testing]({{< relref "/docs" >}}),
[Unit Tests]({{< relref "/docs/testing/unit" >}})

### Functional Acceptance Tests

Automated tests that verify a system behaves as specified. Functional acceptance tests
exercise end-to-end user workflows in a
[production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}) and confirm the implementation
matches the acceptance criteria. They answer "did we build what was specified?" rather than
"does the code work?" They do not validate whether the specification itself is correct -
only real user feedback can confirm we are building the right thing.

Referenced in:
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}})

### Sociable Unit Test

A [unit test](#solitary-unit-test) that allows real in-process collaborators to participate -
for example, a service object calling a real domain model or value object - while still
replacing any external I/O (network, database, file system) with test doubles. The "unit"
being tested is a behavior that spans multiple in-process objects. When the scope expands
to the entire public interface of a frontend component or backend service, that is a
[component test](#component-test).

Referenced in:
[Unit Tests]({{< relref "/docs/testing/unit" >}}),
[Component Tests]({{< relref "/docs/testing/component" >}})

### Solitary Unit Test

A [unit test]({{< relref "/docs/testing/unit" >}}) that replaces all collaborators with
[test doubles]({{< relref "/docs/testing/test-doubles" >}}) and exercises a single class or
function in complete isolation. Contrast with [sociable unit test](#sociable-unit-test),
which allows real in-process collaborators while still replacing external I/O.

Referenced in:
[Unit Tests]({{< relref "/docs/testing/unit" >}})

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
[Unit Tests]({{< relref "/docs/testing/unit" >}})

### Synthetic Monitoring

Automated scripts that continuously execute realistic user journeys or API calls against a
live production (or production-like) environment and alert when those journeys fail or degrade.
Unlike passive monitoring that watches for errors in real user traffic, synthetic monitoring
proactively simulates user behavior on a schedule - so problems are detected even during low
traffic periods. Synthetic monitors are non-deterministic (they depend on live external systems)
and are never a pre-merge gate. Failures trigger alerts or rollback decisions, not build blocks.

Referenced in:
[Architecting Tests for CD]({{< relref "/docs/testing" >}}),
[End-to-End Tests]({{< relref "/docs/testing/e2e" >}})

### Virtual Service

A test double that simulates a real external service over the network, responding to HTTP
requests with pre-configured or recorded responses. Unlike in-process stubs or mocks, a
virtual service runs as a standalone process and is accessed via real network calls, making
it suitable for component testing and end-to-end testing where your application needs to
make actual HTTP requests against a dependency. Service virtualization tools can create
virtual services from recorded traffic or API specifications. See
[Test Doubles]({{< relref "/docs/testing/test-doubles" >}}).

Referenced in:
[Component Tests]({{< relref "/docs/testing/component" >}}),
[End-to-End Tests]({{< relref "/docs/testing/e2e" >}}),
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
[Unit Tests]({{< relref "/docs/testing/unit" >}})
