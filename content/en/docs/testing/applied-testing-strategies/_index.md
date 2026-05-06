---
title: "Applied Testing Strategies"
linkTitle: "Applied Strategies"
weight: 3
description: >
  Practical guidance for fully testing eight common component patterns: API providers, API consumers, scheduled jobs, user interfaces, event consumers, event producers, CLI tools and libraries, and stateful services.
---

A practical guide for fully testing eight common component patterns. Builds on the test-type definitions in [Architecting Tests for CD]({{< relref "/docs/testing" >}}) and the deterministic-pipeline model used throughout this site.

This is a set of recommended patterns to consider when designing a test suite, not a prescriptive checklist. The patterns describe shapes of components teams commonly build; the lists of positive cases, negative cases, and pipeline placements are common things to consider for that shape, not an all-inclusive set. Use them as a starting point for the conversation about what your component actually needs.

That said, three goals apply to every pattern:

1. **Cover the positive paths** - the component does what it should under expected inputs.
2. **Cover the negative paths** - the component fails safely, predictably, and observably under bad inputs, broken [dependencies]({{< relref "/docs/reference/glossary#dependency" >}}), and adverse conditions.
3. **Validate the test doubles** - every double used to keep deterministic tests fast must be backed by a non-deterministic check that the double still matches reality.

If the third point is missing, the first two lie to you over time.

## How to use this section

- New to the patterns? Start with [Cross-cutting principles](#cross-cutting-principles) below, then [Patterns]({{< relref "/docs/testing/applied-testing-strategies/patterns" >}}).
- Auditing a component before ship? Jump to the [Pre-ship checklist]({{< relref "/docs/testing/applied-testing-strategies/pre-ship-checklist" >}}).
- Looking for a specific concern that crosses every pattern (authn, migrations, fixtures, observability, perf, mutation testing, flake handling, time budgets)? See [Cross-cutting concerns]({{< relref "/docs/testing/applied-testing-strategies/cross-cutting-concerns" >}}).
- Existing suite needs rework first? See [Testing Antipatterns]({{< relref "/docs/testing/antipatterns" >}}).

## Terminology

Two phrases that look similar but mean different things:

- **Gateway integration test** (Toby Clemson's "integration test"): a narrow test of a single gateway (HTTP client, DB query layer, message producer) exercised against the real [external dependency]({{< relref "/docs/reference/glossary#external-dependency" >}}) or a high-fidelity stand-in. Runs [in-band]({{< relref "/docs/testing/glossary#in-band-test" >}}) - in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) - if fast enough. Pin the protocol behavior.
- **Out-of-band integration check** (this site's [Integration Tests]({{< relref "/docs/testing/test-types/integration" >}})): runs [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) on a schedule or post-deploy against real external systems. Confirms that doubles used by in-band tests still match reality. Failures trigger review, not a build break.

When this section says bare "integration test," it's the gateway flavor unless qualified.

## Cross-cutting principles

Six principles apply to every pattern. The first three are short pointers to pages that own the topic; the last three are unique to this section.

### 1. In-band tests are deterministic; out-of-band checks confirm reality

[In-band tests]({{< relref "/docs/testing/glossary#in-band-test" >}}) run in the commit-to-deploy pipeline and gate the build. They must be deterministic, which means [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) replace anything that crosses the component boundary - downstream services, message brokers, schedulers, browsers talking to real backends. [Out-of-band checks]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) run on a schedule or post-deploy against the real systems those doubles stand in for. They confirm the doubles still match reality. Failures trigger review or [rollback]({{< relref "/docs/reference/glossary#rollback" >}}), not a build break. See the architecture in [Architecting Tests for CD]({{< relref "/docs/testing" >}}).

### 2. Test doubles need their own tests

Every double is traceable to a [contract test]({{< relref "/docs/testing/test-types/contract" >}}) pinning its claims and an out-of-band check confirming the claims still hold. The mechanics live in [Test Doubles]({{< relref "/docs/testing/glossary#test-double" >}}).

### 3. Test through the public interface

Public methods for classes; HTTP routing for services; rendered DOM for UIs; the entrypoint the scheduler invokes for jobs. See [Component Tests]({{< relref "/docs/testing/test-types/component" >}}). Reflection, package-private back doors, and asserting on private state are tested-the-wrong-thing in disguise.

### 4. Sociable unit tests dominate; solitary unit tests are the narrow exception

Domain logic in a real system lives in how behaviours collaborate, not in any single class. A [sociable unit test]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) drives the actual collaborators that implement a domain operation - validators, domain services, repositories backed by an in-memory or testcontainer double - and asserts on the observable outcome of that operation: the response, the persisted state, the event emitted. That is the bulk of the suite. [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) are reserved for genuinely complex pure logic with no collaborators worth wiring up - pricing math, parsers, scheduling arithmetic.

Organize the suite around domain operations ("place an order," "cancel a subscription within the grace period"), not around the classes or methods that happen to implement them. Tests written this way survive refactoring, catch bugs that live in the interactions between collaborators, and document what the component does to a stakeholder who can't read the code. Tests written one-class-at-a-time with mocks for every collaborator do none of that.

### 5. Negative paths get equal weight

For every "it works" test, ask: malformed input, dependency timeout, dependency 500, dependency 200-with-malformed-body, slow response, partial write, duplicate request, missing or wrong authn/authz. Negative paths are where production incidents come from.

### 6. Name tests in domain terms, not implementation terms

A test name is documentation. `places_order_with_valid_payment_creates_order_and_emits_OrderPlaced` survives refactoring; `OrderService.processPayment_returns_PaymentResult` does not. The translation rule: if the name only makes sense to someone who has read the code, rewrite it. Highest-ROI change a team can make to an existing suite without any new infrastructure. For more on what to avoid, see [Testing Antipatterns]({{< relref "/docs/testing/antipatterns" >}}).

## Related Content

- [Architecting Tests for CD]({{< relref "/docs/testing" >}}) - the section overview, with the do/do-not list and the architecture diagram.
- [Testing Antipatterns]({{< relref "/docs/testing/antipatterns" >}}) - common testing anti-patterns and a migration guide for teams whose suite needs rework.
- [Test Doubles]({{< relref "/docs/testing/glossary#test-double" >}}) - types, when to use, anti-patterns.
- [Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}) - consumer-driven and contract-first approaches.
- [Component Tests]({{< relref "/docs/testing/test-types/component" >}}) - exercising a [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) through its public interface with doubles for everything outside the boundary.
- [Integration Tests]({{< relref "/docs/testing/test-types/integration" >}}) - the post-deploy check that keeps the deterministic pipeline honest.
- [Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) - quality gates sequenced by defect detection priority.

The layered approach (unit, integration, component, contract, end-to-end) this section builds on comes from Toby Clemson, [Testing Strategies in a Microservice Architecture](https://martinfowler.com/articles/microservice-testing/).
