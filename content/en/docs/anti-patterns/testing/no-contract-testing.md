---
title: "No Contract Testing Between Services"
linkTitle: "No contract testing between services"
weight: 26
category: "Testing & Quality"
risk_level: high
description: >
  Services test in isolation but break when integrated because there is no agreed API contract
  between teams.
tags:
  - test-strategy
  - architecture
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The orders service and the inventory service are developed and tested by separate teams. Each
service has a comprehensive test suite. Both suites pass on every build. Then the teams deploy
to the shared staging environment and run integration tests. The payment service call to the
inventory service returns an unexpected response format. The field that the payment service
expects as a string is now returned as a number. The deployment blocks. The two teams spend half
a day in meetings tracing when the response format changed and which team is responsible for
fixing it.

This happens because neither team tested the integration point. The inventory team tested that
their service worked correctly. The payment team tested that their service worked correctly -
but against a mock that reflected their own assumption about the response format, not the actual
inventory service behavior. The services were tested in isolation against different assumptions,
and those assumptions diverged without anyone noticing.

Common variations:

- **The stale mock.** One service tests against a mock that was accurate six months ago. The real
  service has been updated several times since then. The mock drifts. The consumer service tests
  pass but the integration fails.
- **The undocumented API.** The service has no formal API specification. Consumers infer the
  contract from the code, from old documentation, or from experimentation. Different consumers
  make different inferences. When the provider changes, the consumers that made the wrong
  inference break.
- **The implicit contract.** The provider team does not think of themselves as maintaining a
  contract. They change the response structure because it suits their internal refactoring. They
  do not notify consumers because they did not know anyone was relying on the exact structure.
- **The integration environment as the only test.** Teams avoid writing contract tests because
  "we can just test in staging." The integration environment is available infrequently, is shared
  among all teams, and is often broken for reasons unrelated to the change being tested. It is
  a poor substitute for fast, isolated contract verification.

The telltale sign: integration failures are discovered in a shared environment rather than in
each team's own [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). The staging environment is the first place where the contract
incompatibility becomes visible.

## Why This Is a Problem

Services that test in isolation but break when integrated have defeated the purpose of both
isolation and integration testing. The isolation provides confidence that each service is
internally correct, but says nothing about whether services work together. The integration testing
catches the problem too late - after both teams have completed their work and scheduled deployments.

### It reduces quality

Integration bugs caught in a shared environment are expensive to diagnose. The failure is
observed by both teams, but the cause could be in either service, in the environment, or in
the network between them. Diagnosing which change caused the regression requires both teams to
investigate, correlate recent changes, and agree on root cause. This is time-consuming even when
both teams cooperate - and the incentive to cooperate can be strained when one team's deployment
is blocking the other's.

Without contract tests, the provider team has no automated feedback about whether their changes
break consumers. They can refactor their internal structures freely because the only check is
an integration test that runs in a shared environment, infrequently, and not on the provider's
own pipeline. By the time the breakage is discovered, the provider team has moved on from the
context of the change.

With contract tests, the provider's pipeline runs consumer expectations against every build.
A change that would break a consumer fails the provider's own build, immediately, in the context
where the breaking change was made. The provider team knows about the breaking change before
it leaves their pipeline.

### It increases rework

Two teams spend half a day in meetings tracing when a response field changed from string to number - work that contract tests would have caught in the provider's pipeline before the consumer team was ever involved. When a contract incompatibility is discovered in a shared environment, the investigation and
fix cycle involves multiple teams. Someone must diagnose the failure. Someone must determine
which side of the interface needs to change. Someone must make the change. The change must be
reviewed, tested, and deployed. If the provider team makes the fix, the consumer team must verify
it. If the consumer team makes the fix, they may be building on incorrect assumptions about the
provider's future behavior.

This multi-team rework cycle is expensive regardless of how well the teams communicate. It
requires context switching from whatever both teams are working on, coordination overhead, and
a second trip through deployment. A consumer change that was ready to deploy is now blocked
while the provider team makes a fix that was not planned in their sprint.

Without contract tests, this rework cycle is the normal mode for discovering interface
incompatibilities. With contract tests, the incompatibility is caught in the provider's pipeline
as a one-team problem, before any consumer is affected.

### It makes delivery timelines unpredictable

Teams that rely on a shared integration environment for contract verification must coordinate
their deployments. Service A cannot deploy until it has been tested with the current version of
Service B in the shared environment. If Service B is broken due to an unrelated issue, Service A
is blocked even though Service A has nothing to do with Service B's problem.

This coupling of deployment schedules eliminates the independent delivery cadences that a
service architecture is supposed to provide. When one service's integration environment test
fails, all services waiting to be tested are delayed. The deployment queue becomes a bottleneck
that grows whenever any component has a problem.

Each integration failure in the shared environment is also an unplanned event. Sprints budget
for development and known testing cycles. They do not budget for multi-team integration
investigations. When an integration failure blocks a deployment, both teams are working on an
unplanned activity with no clear end date. The sprint commitments for both teams are now at risk.

### It defeats the independence benefit of a service architecture

Service B is blocked from deploying because the shared integration environment is broken - not by a problem in Service B, but by an unrelated failure in Service C. Independent deployability in name is not independent deployability in practice. The primary operational benefit of a service architecture is independent deployability: each
service can be deployed on its own schedule by its own team. That benefit is available only if
each team can verify their service's correctness without depending on the availability of all
other services.

Without contract tests, the teams have built isolated development pipelines but must converge on
a shared integration environment before deploying. The integration environment is the coupling
point. It is the equivalent of a shared deployment step in a monolith, except less reliable
because the environment involves real network calls, shared infrastructure, and the simultaneous
states of multiple services.

Contract testing replaces the shared integration environment dependency with a fast, local, team-
owned verification. Each team verifies their side of every contract in their own pipeline.
Integration failures are caught as breaking changes, not as runtime failures in shared
infrastructure.

### Impact on continuous delivery

[CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) requires fast, reliable feedback. A shared integration environment that catches contract
failures is neither fast nor reliable. It is slow because it requires all services to be
deployed to one place and exercised together. It is unreliable because any component failure
degrades confidence in the whole environment.

Without contract tests, teams must either wait for integration environment results before
deploying - limiting frequency to the environment's availability and stability - or accept the
risk that their deployment might break consumers when it reaches production. Neither option
supports continuous delivery. The first caps [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) at integration test cadence.
The second ships contract violations to production.

## How to Fix It

Contract testing is the practice of making API expectations explicit and verifying them
automatically on both the provider and consumer side. The most practical implementation for
most teams is consumer-driven contract testing: consumers publish their expectations, providers
verify their service satisfies them.

### Step 1: Identify the highest-risk integration points

Not all service integrations carry equal risk. Start where contract failures cause the most
pain.

1. List all service-to-service integrations. For each one, identify the last time a contract
   failure occurred and what it blocked.
2. Rank by two factors: frequency of change (integrations between actively developed services)
   and blast radius (integrations where a failure blocks critical paths).
3. Pick the two or three integrations at the top of the ranking. These are the pilot candidates
   for contract testing.

Do not try to add contract tests for every integration at once. A pilot with two integrations
teaches the team the tooling and workflow before scaling.

### Step 2: Choose a contract testing approach

Two common approaches:

Consumer-driven contracts: the consumer writes tests that describe their expectations of the
provider. A tool like Pact captures these expectations as a contract file. The provider runs the
contract file against their service to verify it satisfies the consumer's expectations.

Provider-side contract verification with a schema: the provider publishes an OpenAPI or JSON
Schema specification. Consumers generate test clients from the schema. Both sides regenerate
their artifacts whenever the schema changes and verify their code compiles and passes against it.

Consumer-driven contracts are more precise - they capture exactly what each consumer uses, not
the full API surface. Schema-based approaches are simpler to start and require less tooling.
For most teams starting out, the schema approach is the right entry point.

### Step 3: Write consumer contract tests for the pilot integrations (Weeks 2-3)

For each pilot integration, the consumer team writes tests that explicitly state their
expectations of the provider.

In JavaScript using Pact:

{{< card code=true header="**Consumer contract test for InventoryService using Pact (JavaScript)**" lang="javascript" >}}
const { Pact } = require('@pact-foundation/pact');

const provider = new Pact({
  consumer: 'PaymentService',
  provider: 'InventoryService'
});

describe('Inventory Service contract', () => {
  before(() => provider.setup());
  after(() => provider.finalize());

  it('returns item availability as a boolean', () => {
    provider.addInteraction({
      state: 'item 123 exists',
      uponReceiving: 'a request for item availability',
      withRequest: { method: 'GET', path: '/items/123/available' },
      willRespondWith: {
        status: 200,
        body: { itemId: '123', available: true }
      }
    });
    // assert consumer code handles the response correctly
  });
});
{{< /card >}}

The test documents what the consumer expects and verifies the consumer handles that response
correctly. The Pact file generated by the test is the contract [artifact]({{< relref "/docs/reference/glossary#artifact" >}}).

### Step 4: Add provider verification to the provider's pipeline (Weeks 2-3)

The provider team adds a step to their pipeline that runs the consumer contract files against
their service.

In Java with Pact:

{{< card code=true header="**Provider contract verification test for InventoryService using Pact (Java)**" lang="java" >}}
@Provider("InventoryService")
@PactBroker(url = "http://pact-broker.internal")
public class InventoryServiceContractTest {

    @TestTarget
    public final Target target = new HttpTarget(8080);

    @State("item 123 exists")
    public void setupItemExists() {
        // seed test data
    }
}
{{< /card >}}

When the provider's pipeline runs this test, it fetches the consumer's contract file, sets up
the required state, and verifies that the provider's real response matches the consumer's
expectations. A change that would break the consumer fails the provider's pipeline.

### Step 5: Integrate with a contract broker

For the contract tests to work across team boundaries, contract files must be shared
automatically.

1. Deploy a Pact Broker or use PactFlow (hosted). This is a central store for contract files.
2. Consumer pipelines publish contracts to the broker after tests pass.
3. Provider pipelines fetch consumer contracts from the broker and run verification.
4. The broker tracks which provider versions satisfy which consumer contracts.

With the broker in place, both teams' pipelines are connected through the contract without
requiring any direct coordination. The provider knows immediately when a change breaks a
consumer. The consumer knows when their version of the contract has been verified by the provider.

### Step 6: Use the "can I deploy?" check before every production deployment

The broker provides a query: given the version of Service A I am about to deploy, and the
versions of all other services currently in production, are all contracts satisfied?

Add this check as a pipeline gate before any production deployment. If the check fails, the
service cannot deploy until the contract incompatibility is resolved.

This replaces the shared integration environment as the final contract verification step. The
check is fast, runs against data already collected by previous pipeline runs, and provides a
definitive answer without requiring a live deployment.

| Objection | Response |
|-----------|----------|
| "Contract testing is a lot of setup for simple integrations" | The upfront setup cost is real. Evaluate it against the cost of the integration failures you have had in the last six months. For active services with frequent changes, the setup cost is recovered quickly. For stable services that change rarely, the cost may not be justified - start with the active ones. |
| "The provider team cannot take on more testing work right now" | Start with the consumer side only. Consumer tests that run against mocks provide value immediately, even before the provider adds verification. Add provider verification later when capacity allows. |
| "We use gRPC / GraphQL / event-based messaging - Pact doesn't support that" | Pact supports gRPC and message-based contracts. GraphQL has dedicated contract testing tools. The principle - publish expectations, verify them against the real service - applies to any protocol. |
| "Our integration environment already catches these issues" | It catches them late, blocks multiple teams, and is expensive to diagnose. Contract tests catch the same issues in the provider's pipeline, before any other team is affected. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Integration failures in shared environments | Should decrease as contract tests catch incompatibilities in individual pipelines |
| Time to diagnose integration failures | Should decrease as failures are caught closer to the change that caused them |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as production contract violations are caught by pipeline checks |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as integration verification no longer requires coordination through a shared environment |
| Service-to-service integrations with contract coverage | Should increase as the practice scales from pilot integrations |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Should increase as teams can deploy independently without waiting for integration environment slots |

## Related Content

- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Building the test strategy that includes contract testing
- [Shared Database Across Services]({{< relref "/docs/anti-patterns/architecture/shared-database" >}}) - A common cause of implicit contracts that are hard to version
- [Production-Like Environments]({{< relref "/docs/migrate-to-cd/pipeline/production-like-environments" >}}) - Reducing reliance on shared integration environments
- [Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}) - Designing service boundaries that make contracts stable
- [Pipeline Architecture]({{< relref "/docs/migrate-to-cd/pipeline/pipeline-architecture" >}}) - Incorporating contract verification into the deployment pipeline
