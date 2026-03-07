---
title: "Pipeline Test Strategy"
linkTitle: "Pipeline Test Strategy"
weight: 2
description: >
  What tests run where in a CD pipeline, how contract tests validate the test doubles used inside the pipeline, and why everything that blocks deployment must be deterministic.
---

**Everything that blocks deployment must be deterministic and under your control.** Everything
that involves external systems runs asynchronously or post-deployment. This gives you the
independence to deploy any time, regardless of the state of the world around you.

## Tests Inside the Pipeline

These tests run on every commit and **block deployment if they fail**. They must be fast,
deterministic, and free of [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}).

{{< figure src="/images/pipeline-tests-inside.svg" alt="Tests inside the pipeline: pre-merge stage runs static analysis, unit tests, integration tests, and functional tests in under 10 minutes. Post-merge re-runs the full deterministic suite. All external dependencies are replaced by test doubles." >}}

Every test in this [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) uses [test doubles]({{< relref "/docs/reference/testing/test-doubles" >}}) for
external dependencies. No test calls a real external API, database, or third-party service. This
means:

- **A downstream outage cannot block your deployment.** Your pipeline runs the same whether
  external systems are healthy or down.
- **Tests are deterministic.** The same code always produces the same result.
- **The suite is fast.** No network latency, no waiting for external systems to respond.

### Why re-run tests post-merge?

Two changes can each pass pre-merge independently but conflict when combined on trunk. The
post-merge run catches these integration effects. If a post-merge failure occurs, the team
fixes it immediately. Trunk must always be releasable.

## Tests Outside the Pipeline

These tests involve real external systems and are therefore **non-deterministic**. They never
block deployment. Instead, they validate assumptions and monitor production health.

{{< figure src="/images/pipeline-tests-outside.svg" alt="Tests outside the pipeline: contract tests run on a schedule to validate test doubles against real APIs. Post-deployment runs E2E smoke tests and synthetic monitoring. Failures trigger test double updates, rollback, or alerts - never block deployment." >}}

| Test Type | When It Runs | What It Does on Failure |
|-----------|-------------|------------------------|
| **Contract tests** | On a schedule (hourly or daily) | Triggers review; team updates test doubles to match new reality |
| **E2E smoke tests** | After each deployment | Triggers [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) if critical path is broken |
| **Synthetic monitoring** | Continuously in production | Triggers alerts for operations |

## How Contract Tests Validate Test Doubles

The pipeline's deterministic tests depend on test doubles to represent external systems. But
test doubles can drift from reality. An API adds a required field, changes a response format,
or deprecates an endpoint. Contract tests close this gap.

{{< figure src="/images/contract-test-validation-loop.svg" alt="How contract tests validate test doubles: inside the pipeline, your code calls test doubles that return canned responses. Outside the pipeline, contract tests send real requests to external APIs and compare the response schema against test double definitions. A match confirms accuracy; a mismatch triggers an alert to update test doubles and re-verify." >}}

1. **Pipeline tests use test doubles** that encode your assumptions about external APIs -
   response schemas, status codes, error formats.
2. **Contract tests run on a schedule** and send real requests to the actual external APIs.
3. **Contract tests compare the real response** against what your test doubles return. They
   check structure and types, not specific data values.
4. **When a contract test passes**, your test doubles are confirmed accurate. The pipeline's
   deterministic tests are trustworthy.
5. **When a contract test fails**, the team is alerted. They update the test doubles to match
   the new reality, then re-run functional tests to verify nothing breaks.

This design means your pipeline never touches external systems, but you still catch when
external systems change. You get both speed and accuracy.

### Consumer-driven contracts

When the external API is owned by another team in your organization, you can go further with
**consumer-driven contracts**. Instead of your team polling their API on a schedule, both teams
share a contract specification (using a tool like [Pact](https://pact.io/)):

- **You (the consumer)** define the requests you send and the responses you expect.
- **They (the provider)** run your contract as part of their build. If a change would break
  your expectations, their build fails before they deploy.
- **Your test doubles are generated from the contract**, guaranteeing they match what the
  provider actually delivers.

This shifts contract validation from "detect and react" to "prevent." See
[Contract Tests]({{< relref "/docs/reference/testing/contract" >}}) for implementation details.

## Summary: All Stages at a Glance

| Stage | Blocks Deployment? | Uses Test Doubles? | Deterministic? |
|-------|-------------------|-------------------|----------------|
| Every Commit | Yes | Yes - all external deps | Yes |
| Post-Merge | Yes | Yes - all external deps | Yes |
| Scheduled (Contract) | No - triggers review | No - hits real APIs | No |
| Post-Deploy (E2E) | No - triggers rollback | No - real system | No |
| Production (Monitoring) | No - triggers alerts | No - real system | No |

The [Testing reference]({{< relref "/docs/reference/testing" >}}) provides detailed documentation
for each test type, including code examples and anti-patterns.

---

## Related Content

- [Testing Reference]({{< relref "/docs/reference/testing" >}}) - Full reference for each test type
- [Test Doubles]({{< relref "/docs/reference/testing/test-doubles" >}}) - Patterns for stubs, mocks, fakes, spies, and dummies
- [Contract Tests]({{< relref "/docs/reference/testing/contract" >}}) - Consumer-driven and provider contracts in detail
- [Test Feedback Speed]({{< relref "/docs/reference/testing/feedback-speed" >}}) - The cognitive science behind the 10-minute target
- [Pipeline Architecture]({{< relref "/docs/migrate-to-cd/pipeline/pipeline-architecture" >}}) - The pipeline structure these tests feed into
- [Pipeline Reference Architecture]({{< relref "/docs/reference/pipeline-reference-architecture" >}}) - Reference diagrams for single-team and multi-team pipelines
