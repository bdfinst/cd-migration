---
title: "Testing Glossary"
linkTitle: "Glossary"
weight: 100
aliases:
  - /docs/reference/testing/glossary/
  - /docs/testing/test-doubles/
  - /docs/reference/testing/test-doubles/
description: >
  Definitions for testing terms as they are used on this site.
---

These definitions reflect how this site uses each term. They are not universal definitions -
other communities may use the same words differently.

### Acceptance Tests {#functional-acceptance-tests}

Automated tests that verify a system behaves as specified. Acceptance tests
exercise user workflows in a
[production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}) and confirm the implementation
matches the acceptance criteria. They answer "did we build what was specified?" rather than
"does the code work?" They do not validate whether the specification itself is correct -
only real user feedback can confirm we are building the right thing.

In CD, acceptance testing is a pipeline stage, not a single test type. It can include
component tests, load tests, chaos tests, resilience tests, and compliance tests. Any test
that runs after CI to gate promotion to production is an acceptance test.

Referenced in:
[CD Testing]({{< relref "/docs/testing" >}}),
[Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}})

### Adapter Integration Test

A narrow test of a single **boundary adapter** - the team's own HTTP client, database query layer, message-broker client, file-system adapter, or similar - exercised against either the real [external dependency]({{< relref "/docs/reference/glossary#external-dependency" >}}) or a high-fidelity stand-in like a testcontainer running the production engine. (Legacy name from Toby Clemson: "gateway integration test.")

#### What the test is for

The test asserts that **the adapter correctly speaks the protocol**: that it serializes the request the way the dependency expects, parses the response shape correctly, maps errors to the right exception types, propagates headers, enforces timeouts, and handles transactional semantics.

#### What the test is *not* for

It does **not** test the behavior of the dependency itself. If the adapter asks for a user, the test validates that the response parses into a valid `User` object - not *which* user comes back, not the dependency's own business rules, not anything that the dependency owns. The dependency's correctness is the dependency's problem; the adapter's job is to speak the protocol faithfully. Conflating the two produces brittle tests that fail on unrelated changes to the dependency's data or logic.

#### Pipeline placement

Runs [in-band](#in-band-test) **only** when both conditions hold:

1. The team has full control over the dependency - a database, broker, or service the team owns and can pin to a known version, typically via a per-test testcontainer.
2. The test is fully deterministic against that controlled instance.

For everything else - third-party APIs, services owned by another team, dependencies whose state the team can't reset between runs - the test runs [out-of-band](#out-of-band-test) on a schedule. Out-of-band placement is the default for any adapter test that touches a system outside the team's full control. Failures trigger review, not a build break. Pulling these tests in-band is the most common cause of flaky pipelines.

#### Distinguishing from neighboring test types

Different from a broader [end-to-end test]({{< relref "/docs/testing/test-types/e2e" >}}): an adapter integration test isolates one boundary adapter, not a flow across multiple components. Different from a [contract test](#contract-test) at the same boundary: contract tests pin shape against doubles in the pipeline; adapter integration tests pin protocol against the real dependency.

Referenced in:
[API Consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}),
[API Provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}),
[Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}),
[Antipatterns]({{< relref "/docs/testing/antipatterns" >}}),
[Event Consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-consumer" >}}),
[Event Producer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-producer" >}}),
[Scheduled Job]({{< relref "/docs/testing/applied-testing-strategies/patterns/scheduled-job" >}}),
[Stateful Service]({{< relref "/docs/testing/applied-testing-strategies/patterns/stateful-service" >}})

### API Surface Test

A test that pins the public-facing API of a library or CLI - the exported symbols, their signatures, the documented arguments and exit codes. Typically a snapshot: the current public surface is captured to a file, and any diff fails the build. Catches accidental breaking changes (a renamed function, a removed flag, a tightened type) before they reach consumers. Distinct from a [contract test](#contract-test), which pins the wire boundary between two services; an API surface test pins the source-level boundary between a library and its callers.

Referenced in:
[CLI Tool or Library]({{< relref "/docs/testing/applied-testing-strategies/patterns/cli-library" >}})

### Black Box Testing

A testing approach where the test exercises code through its public interface and asserts
only on observable outputs - return values, state changes visible to consumers, or side
effects such as messages sent. The test has no knowledge of internal implementation details.
Black box tests are resilient to refactoring because they verify **what** the code does, not
**how** it does it. Contrast with [white box testing](#white-box-testing).

Referenced in:
[CD Testing]({{< relref "/docs/testing" >}}),
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})

### Cluster Test

A test that exercises a stateful service across multiple nodes - replication, leader election, consensus, partition tolerance - against a real multi-node setup, typically via testcontainers running the production consensus library. Cluster tests catch behavior that only appears under a real cluster: split-brain, slow followers, leader transitions, partition reconciliation. Deterministic enough to run [in-band](#in-band-test) but slower than single-node [component tests](#component-test), so usually relegated to a later CI stage.

Referenced in:
[Stateful Service]({{< relref "/docs/testing/applied-testing-strategies/patterns/stateful-service" >}})

### Component Test

A deterministic test that verifies a complete frontend component or backend service through
its public interface, with test doubles for all external dependencies. See
[Component Tests]({{< relref "/docs/testing/test-types/component" >}}) for full definition and examples.

Referenced in:
[Component Tests]({{< relref "/docs/testing/test-types/component" >}}),
[End-to-End Tests]({{< relref "/docs/testing/test-types/e2e" >}}),
[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}),
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})

### Contract Test

A deterministic test that verifies the boundary between two systems using [test doubles](#test-double). Sometimes called a *narrow integration test*. Has two perspectives. A **consumer contract test** asks "do the fields and status codes I depend on still exist?" and asserts only on the subset of the API the consumer actually uses. A **provider contract test** asks "have my changes broken any of my consumers?" and runs every consumer's published expectations against the real provider implementation. The same shape applies to broker topics (a "broker contract") and to source-and-sink schemas in pipelines ("source/sink contract") - the test object is the boundary, the perspective is whichever side the test runs from.

Contract tests are deterministic and run pre-merge as [in-band tests](#in-band-test). They block the build like any other in-band test. See [Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}) for the full discussion of consumer-driven contracts (CDC) and contract-first development.

Referenced in:
[API Consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}),
[API Provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}),
[Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}),
[Event Consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-consumer" >}}),
[Event Producer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-producer" >}})

### Cross-OS Test Matrix

A CI configuration that runs the existing test suite on each supported operating system rather than a separate test type. The matrix catches platform-specific behavior single-OS tests can't: path separators, line endings, signal-handling differences, locale defaults, file-system case sensitivity. Required for any [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) consumed across multiple OSes - CLI tools, libraries, cross-platform desktop or mobile apps.

Referenced in:
[CLI Tool or Library]({{< relref "/docs/testing/applied-testing-strategies/patterns/cli-library" >}})

### Deployed-binary Test

A test that invokes the actual deployed artifact - the same binary, container image, or package the scheduler, orchestrator, or operator will invoke in production - and asserts on observable behavior at startup or first invocation. Catches what in-process [component tests](#component-test) bypass: configuration loading, secret resolution, signal handling, exit codes, lock acquisition, dependency-version mismatches. Usually a small set; the bulk of behavior is tested in component tests against an in-memory assembled app.

Referenced in:
[CLI Tool or Library]({{< relref "/docs/testing/applied-testing-strategies/patterns/cli-library" >}}),
[Scheduled Job]({{< relref "/docs/testing/applied-testing-strategies/patterns/scheduled-job" >}})

### Doctest

An executable test extracted from documentation - typically the README or inline code samples - that runs the documented examples against the real binary or library and fails the build if the examples are broken. Doctests close the gap between "the docs say X works" and "X actually works in the latest build". Most languages have framework support: Python's `doctest` module, Rust's `#[doc]` attribute, and Markdown-based runners for Node and Java.

Referenced in:
[CLI Tool or Library]({{< relref "/docs/testing/applied-testing-strategies/patterns/cli-library" >}})

### In-Band Test

A test that runs **in the delivery pipeline** as part of the commit-to-deploy flow. In-band tests must be deterministic, which means [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) replace anything that crosses the component boundary - downstream services, message brokers, schedulers, browsers talking to real backends. Failures block the build or the deployment.

The bulk of any project's test suite is in-band: unit tests, [component tests](#component-test), [contract tests]({{< relref "/docs/testing/test-types/contract" >}}), and [adapter integration tests](#adapter-integration-test) against team-controlled dependencies (testcontainers running an engine the team pins). Adapter integration tests against third-party services or shared environments run [out-of-band](#out-of-band-test) on a schedule, not in-band. They give a deterministic go/no-go signal in minutes.

Contrast with [out-of-band tests](#out-of-band-test), which run on a schedule against real systems and never gate the build.

Referenced in:
[Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}),
[Architecting Tests for CD]({{< relref "/docs/testing" >}})

### Out-of-Band Test

A test that runs **outside the delivery pipeline** on a schedule or post-deploy, exercising real external systems. Out-of-band tests are non-deterministic by design (they depend on the real world) and never gate a commit or merge. Failures trigger review, alerts, or [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) decisions.

Out-of-band checks are how teams confirm that the doubles used by [in-band tests](#in-band-test) still match reality. Examples: post-deploy [integration tests]({{< relref "/docs/testing/test-types/integration" >}}) against the real downstream, [synthetic monitoring](#synthetic-monitoring) of production, scheduled smoke checks against a sandbox API.

Referenced in:
[Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}),
[Architecting Tests for CD]({{< relref "/docs/testing" >}}),
[Integration Tests]({{< relref "/docs/testing/test-types/integration" >}})

### Soak Test

A long-running test that exercises a deployed service for hours or days under representative load to catch behavior that only appears with time: memory leaks, unbounded growth, replication-lag drift, slow-burn resource exhaustion. Soak tests are [out-of-band](#out-of-band-test) by design - they don't fit a pre-merge budget. Failures trigger review, not a build break. Often paired with chaos testing (deliberate fault injection during the soak) to validate recovery behavior over time.

Referenced in:
[Stateful Service]({{< relref "/docs/testing/applied-testing-strategies/patterns/stateful-service" >}})

### Sociable Unit Test

A [unit test](#solitary-unit-test) that allows real collaborator objects to participate -
for example, a service object calling a real domain model or value object - while still
replacing any external I/O (network, database, file system) with test doubles. The "unit"
being tested is a behavior that spans multiple in-process objects. When the scope expands
to the entire public interface of a frontend component or backend service, that is a
[component test](#component-test).

Referenced in:
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}}),
[Component Tests]({{< relref "/docs/testing/test-types/component" >}})

### Solitary Unit Test

A [unit test]({{< relref "/docs/testing/test-types/unit" >}}) that replaces all collaborators with
[test doubles](#test-double) and exercises a single class or function in complete isolation.
Contrast with [sociable unit test](#sociable-unit-test), which allows real collaborator objects
while still replacing external I/O.

Referenced in:
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})

### Synthetic Monitoring

Automated scripts that continuously execute realistic user journeys or API calls against a
live production (or production-like) environment and alert when those journeys fail or degrade.
Unlike passive monitoring that watches for errors in real user traffic, synthetic monitoring
proactively simulates user behavior on a schedule - so problems are detected even during low
traffic periods. Synthetic monitors are non-deterministic (they depend on live external systems)
and are never a pre-merge gate. Failures trigger alerts or rollback decisions, not build blocks.

Referenced in:
[Architecting Tests for CD]({{< relref "/docs/testing" >}}),
[End-to-End Tests]({{< relref "/docs/testing/test-types/e2e" >}})

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
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})

### Test Double

A stand-in object that replaces a real production [dependency]({{< relref "/docs/reference/glossary#dependency" >}}) during testing. The term comes from the film industry's "stunt double": just as a stunt double replaces an actor for dangerous scenes, a test double replaces a costly or non-deterministic dependency to make tests fast, isolated, and reliable.

Test doubles let you:

- **Remove non-determinism** by replacing network calls, databases, and file systems with predictable substitutes.
- **Control test conditions** by forcing specific states, error conditions, or edge cases that would be hard to reproduce with real dependencies.
- **Increase speed** by eliminating slow I/O.
- **Isolate the system under test** so failures point at the code being tested, not at an [external dependency]({{< relref "/docs/reference/glossary#external-dependency" >}}).

#### Types of test doubles

| Type      | Description | Example use case |
|-----------|-------------|------------------|
| **Dummy** | Passed around but never actually used. Fills parameter lists. | A required logger parameter in a constructor. |
| **Stub**  | Provides canned answers to calls made during the test. Does not respond to anything outside what is programmed. | Returning a fixed user object from a repository. |
| **Spy**   | A stub that also records information about how it was called (arguments, call count, order). | Verifying that an analytics event was sent once. |
| **Mock**  | Pre-programmed with expectations about which calls will be made. Verification happens on the mock itself. | Asserting that `sendEmail()` was called with specific arguments. |
| **Fake**  | Has a working implementation, but takes shortcuts not suitable for production. | An in-memory database replacing PostgreSQL. |

#### Choosing the right double

- Use a **stub** when you need to supply data but don't care how it was requested.
- Use a **spy** when you need to verify call arguments or call count.
- Use a **mock** when the interaction itself is the primary thing being verified.
- Use a **fake** when you need realistic behavior but can't use the real system.
- Use a **dummy** when a parameter is required by the interface but irrelevant to the test.

Test doubles are heaviest in the early [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) stages ([unit]({{< relref "/docs/testing/test-types/unit" >}}), [component]({{< relref "/docs/testing/test-types/component" >}}), [contract]({{< relref "/docs/testing/test-types/contract" >}}) tests) where deterministic speed is the priority. They thin out as you move through the pipeline; [end-to-end tests]({{< relref "/docs/testing/test-types/e2e" >}}) use no doubles by design. The guiding principle from Justin Searls: "Don't poke too many holes in reality." Use a double when you must, and prefer the real implementation when it's fast and deterministic.

Doubles are only as good as the contract they encode. Every double in the suite should trace to a [contract test]({{< relref "/docs/testing/test-types/contract" >}}) pinning its claims and an [out-of-band](#out-of-band-test) check confirming the claims still hold. See the [Antipatterns]({{< relref "/docs/testing/antipatterns" >}}) page for the failure modes of unvalidated doubles.

Referenced in:
[Antipatterns]({{< relref "/docs/testing/antipatterns" >}}),
[Applied Testing Strategies]({{< relref "/docs/testing/applied-testing-strategies" >}}),
[Component Tests]({{< relref "/docs/testing/test-types/component" >}}),
[Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}),
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})

### Virtual Service

A test double that simulates a real external service over the network, responding to HTTP
requests with pre-configured or recorded responses. Unlike in-process stubs or mocks, a
virtual service runs as a standalone process and is accessed via real network calls, making
it suitable for component testing and end-to-end testing where your application needs to
make actual HTTP requests against a dependency. Service virtualization tools can create
virtual services from recorded traffic or API specifications. See
[Test Doubles]({{< relref "/docs/testing/glossary#test-double" >}}).

Referenced in:
[Component Tests]({{< relref "/docs/testing/test-types/component" >}}),
[End-to-End Tests]({{< relref "/docs/testing/test-types/e2e" >}}),
[Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})

### White Box Testing

A testing approach where the test has knowledge of and asserts on internal implementation
details - specific methods called, call order, internal state, or code paths taken. White
box tests verify **how** the code works, not **what** it produces. These tests are fragile
because any refactoring of internals breaks them, even when behavior is unchanged. Avoid
white box testing in unit tests; prefer [black box testing](#black-box-testing) that asserts
on observable outcomes.

Referenced in:
[CD Testing]({{< relref "/docs/testing" >}}),
[Unit Tests]({{< relref "/docs/testing/test-types/unit" >}})
