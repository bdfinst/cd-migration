---
title: "Cross-cutting Concerns"
linkTitle: "Cross-cutting Concerns"
weight: 3
description: >
  Concerns that cut across every pattern: authn/authz, database migrations, fixtures, observability, performance, mutation testing, flake handling, and time budgets.
---

The [patterns]({{< relref "/docs/testing/applied-testing-strategies/patterns" >}}) describe testing organized by component shape. The concerns below cut across all patterns and deserve dedicated coverage in any non-trivial system.

## Authn and authz testing

Authentication and authorization deserve dedicated, exhaustive coverage. They are a major source of high-impact incidents and the failure modes are predictable:

- **Tenant isolation**: tenant A's queries never return tenant B's data. Test every read path. Multi-tenant SaaS bugs are almost always missing isolation tests.
- **Scope or role escalation**: a token with `read:orders` cannot perform `write:orders`. Test the matrix of scope and endpoint.
- **Expired tokens**: rejected even if cached locally. Clock-skew tolerance is a property of the verifier, not a license to skip the test.
- **Forged tokens**: signature validation actually validates. The classic JWT `alg: none` bug still ships periodically.
- **Missing auth**: every protected endpoint returns 401, never 500 (information leak) and never 200 (catastrophic).
- **Service-to-service auth**: machine identities respected, mTLS validated, token-swapping attacks detected.

The pattern: a parameterized test that takes (endpoint, method, expected-status-when-no-token, expected-status-when-wrong-scope) and runs across every endpoint in the OpenAPI or schema definition. New endpoints are covered automatically.

## Database migrations

Migrations have their own discipline. For every migration:

- **Forward** on representative data: produces the expected schema and data.
- **Backward** (where supported): returns to the previous schema with no data loss. Expand-contract migrations may not roll back; that's a design choice the test pins.
- **Forward + backward + forward**: idempotent.
- **Time on production-scale data**: budget assertion. A 30-minute migration on a 50M-row table needs a different deploy strategy than a 30-second one.
- **Under traffic**: the expand-contract pattern doesn't break in-flight transactions.

Test against the real production database engine and version using testcontainers. SQLite-against-Postgres is a frequent source of "passed in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}), broke at 02:00 in prod" incidents.

## Test data and fixtures

Fixtures rot faster than the code that uses them. Two principles keep them honest:

1. **Generate fixtures from the schema, not by hand.** When the schema is the source of truth (Avro, OpenAPI, SQL DDL, Protobuf), generate fixture builders from it. A type change breaks the build, not production.
2. **Use Object Mother or builder patterns, not raw inline literals.** A test that says `placeOrder(buildValidOrder().withItem("A1", 2).build())` survives a schema change because the builder updates centrally. A test with 30 lines of raw JSON inline does not.

Avoid shared global fixtures that tests mutate. Each test creates the state it needs, names what is essential about that state, and discards the rest.

## Observability as a tested artifact

Logs, metrics, and traces are part of a service's contract with operators. If an alert depends on a metric, the test for the failure path should assert the metric is emitted. If a runbook depends on a structured log line, the test should assert the line is produced with the right fields and correlation ID.

The pattern: in [component tests]({{< relref "/docs/testing/test-types/component" >}}), attach a metrics collector and a log capture to the assembled component. Failure-path tests assert three things at once:

1. The response status is correct.
2. The error metric is incremented with the right labels.
3. The structured log line is emitted with correlation ID, error code, and any fields the runbook depends on.

This prevents silent regressions where the code "works" but the operator can't see what's happening when it doesn't.

## Performance and load testing

Three classes of perf tests, each with a different home in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}):

1. **Per-endpoint perf budgets** in component tests. Simple latency assertion under no load (`assertThat(p99).isLessThan(50ms)`). Catches algorithmic regressions cheaply. Fits in CI Stage 1 if the assertions are tight and the runtime is stable.
2. **Load tests** in [acceptance]({{< relref "/docs/testing/glossary#functional-acceptance-tests" >}}). k6, Gatling, or Locust against a deployed instance. Validate p99 latency, throughput, and error rate at expected production load. Gates production promotion.
3. **[Soak tests]({{< relref "/docs/testing/glossary#soak-test" >}})** out of pipeline. Long-running load to catch memory leaks, file handle leaks, and slow drift. Scheduled, non-blocking.

A perf regression that breaches a documented budget should block deploy. A regression within budget but worse than baseline should generate a finding for review, not a build failure: noisy alerts get ignored.

## Mutation testing

Coverage % tells you what code ran. Mutation testing tells you whether the tests would have failed if the code had been wrong. Tools (Stryker for JS, PIT for Java) systematically change operators, return values, and conditionals, then re-run the test suite. Surviving mutants are tests that didn't catch the mutation.

Each surviving mutant is one of three things:

- **A real test gap.** Add a flow-oriented test that would have failed when the mutation was applied.
- **An equivalent mutant**, semantically identical to the original. Mark and move on.
- **A trivially equivalent mutant** (logging change, assertion message tweak). Configure the tool to skip.

Mutation testing is too slow to run on every commit. Run it nightly or weekly on the highest-value modules. Treat it as a periodic audit of test quality, not a gating check.

## Flake handling protocol

A flaky test is a known unknown. Three rules keep flakes from rotting the suite:

1. **Quarantine on detection.** First flake gets the test moved to a quarantine lane that doesn't block the build. Don't ignore it; don't keep failing builds for unrelated reasons.
2. **Time-boxed remediation.** Quarantined tests have a deadline (e.g., five business days) and an owner. After the deadline, fix or delete. No silent quarantine.
3. **Track the cause.** Most flakes share root causes: timing, shared state, network, ordering. The fix is usually structural (eliminate the timing dependency) rather than local (add a longer sleep).

A suite with a permanent quarantine list has lost its [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}})-ready quality. See also [Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}).

## Cost and time budgets

Empirical starting points for [in-band]({{< relref "/docs/testing/glossary#in-band-test" >}}) test budgets, based on typical service complexity. Adjust for your codebase, language, framework, and the size of the component under test.

| Pattern | In-band suite budget | Notes |
| --- | --- | --- |
| 1 (API provider) | < 5 min | Most logic in unit and component tests |
| 2 (API consumer) | < 5 min | More gateway and resilience tests than 1 |
| 3 (scheduled job) | < 3 min | Plus a small set of tests that exercise the deployed binary |
| 4 (UI) | < 8 min | Component tests in headless browser via Playwright + the team's unit-testing framework |
| 5 (event consumer) | < 5 min | Real broker container for gateway tests |
| 6 (event producer) | < 5 min | Same |
| 7 (CLI / library) | < 3 min | One pass per supported OS in CI matrix |
| 8 (stateful service) | < 8 min | Real persistence; [cluster tests]({{< relref "/docs/testing/glossary#cluster-test" >}}) in Stage 2 |

The total CD pipeline in-band suite under 10 minutes is the gating [constraint]({{< relref "/docs/reference/glossary#constraint" >}}) at the team level. The first lever for hitting that budget is **parallel execution**: the suite should fan out across cores or runners, not run serially. Parallelism only works when tests are independent of each other - no shared mutable state, no ordering dependencies, no global fixtures that one test mutates and another reads. Decoupling tests is a prerequisite for speed, not an optimization on top of it.

If a component's tests still can't fit the budget after the suite is running in parallel, the goal is to remediate the underlying cause - slow component startup, oversize fixtures, expensive setup duplicated per test, hidden serialization through a shared resource - not to declare the budget unreachable. While the remediation is underway, moving the offending tests [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) on a schedule is a reasonable stopgap so the in-band suite stays fast. Out-of-band placement here is a temporary mitigation, not the destination: those tests should come back in-band once the underlying speed issue is fixed.
