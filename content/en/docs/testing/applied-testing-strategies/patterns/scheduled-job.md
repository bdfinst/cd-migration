---
title: "Scheduled Job"
linkTitle: "Scheduled Job"
weight: 3
description: >
  A service triggered on a cron, queue, or external scheduler. Reads from data sources, writes reports or updates state.
---

A job that runs on a cron, queue, or external scheduler. Reads from data sources, writes reports or updates state. Often has no inbound API surface. The entrypoint is the scheduler.

This pattern has two test design challenges that the [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) and [API consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}) patterns don't have: time and data volume.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Pure transformation logic | The data calculation itself, with no I/O | [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) |
| Source/sink gateways | Reading from sources, writing to sinks: protocol correctness, error mapping | Gateway integration tests against real source/sink containers or WireMock |
| Job orchestration | Idempotency, partial failure recovery, checkpointing, locking, time-window logic | [Component tests]({{< relref "/docs/testing/test-types/component" >}}) through the job's invocation entrypoint, with gateway doubles, source/sink doubles, and an injected clock |
| Process startup | Exit codes, signal handling, configuration loading, real environment wiring | A small set of component tests that invoke the deployed job binary |
| Scheduling integration | The scheduler triggers the right entrypoint with the right arguments, environment, secrets, and concurrency settings | Post-deploy integration check against the real scheduler in a non-prod environment |
| Observability | Job ran, succeeded/failed, duration, records processed, error count | Assertions in component tests |

{{< figure src="/images/testing/patterns/scheduled-job-coverage.svg" alt="Coverage matrix for a scheduled job. Rows are pure transformation logic, job orchestration (idempotency, locking, time windows, checkpointing), source and sink gateways, process startup, and the external scheduler, system clock, source, and sink. Columns are solitary unit, component (in-band, with an injected clock and source and sink doubles), gateway integration, source and sink contract, deployed-binary tests, and out-of-band integration. Solitary unit tests cover pure transformation logic. Component tests cover orchestration with the clock and gateways doubled. Gateway integration exercises source and sink gateways against real containers. Deployed-binary tests cover process startup, configuration loading, and exit codes on the actual artifact the scheduler will invoke. The out-of-band check is what catches scheduler typos, secret resolution failures, and time-zone mismatches between the test clock and production wiring." >}}

Process startup matters more here than for an API service, because scheduled jobs typically have non-trivial startup behavior (config loading, secret resolution, lock acquisition) that a component test with the SUT in-memory can bypass. The right shape is many component tests for behavior, plus one or two tests that invoke the actual deployed binary the scheduler will invoke.

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **End-to-end run**: with representative input, produces the expected output (report file, database update, message published).
- **Idempotency**: running the job twice for the same logical period produces the same result, not duplicates.
- **Checkpointing**: a job that processes a stream resumes from the last checkpoint, not from scratch.
- **Time windows**: "yesterday's data" computes correctly for various reference times, especially around DST, month boundaries, and year boundaries.
- **Empty input**: zero records produces a valid empty report, not an error.
- **Output format**: the report or message conforms to the documented schema.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Source unavailable**: DB down, source API returning 5xx. Verify the job fails cleanly with a documented exit code/status, doesn't write partial output, and is safely re-runnable.
- **Sink unavailable**: destination DB or message broker rejects writes. Verify no source state changes (e.g., "marked as processed") happen if the sink fails.
- **Partial-write failure**: half the batch writes successfully, then the connection drops. Verify the next run reprocesses the failed half without duplicating the successful half. This is where idempotency keys, transactional outboxes, or compensating reads earn their keep.
- **Slow job**: job exceeds its expected runtime. Verify it surfaces as alertable, doesn't silently overlap with the next scheduled run, and that the lock prevents concurrent execution.
- **Malformed source data**: null where non-null was expected, wrong type, encoding issues. Verify the bad record is logged with enough context to investigate, and the job decides per its policy: skip, dead-letter, or fail the whole run. The choice is design; the test pins it.
- **Time-zone bugs**: the job runs at 02:30 UTC for a "daily" report. What does it do on the day clocks shift? Test it. Use the injected clock so the test deterministically simulates the boundary.
- **Concurrent run**: the previous run hadn't finished when the next was triggered. Verify the lock prevents overlap or, if overlap is acceptable, that the work is partitioned correctly.
- **Crash mid-run**: kill -9 in the middle of processing. Verify on restart the job resumes from a consistent state.
- **Schema drift on source**: a new field appears or a field changes type. Verify per the contract policy.

## Test double validation

Three classes of doubles need validation, each through a different mechanism:

1. **The injected clock.** Every [in-band test]({{< relref "/docs/testing/glossary#in-band-test" >}}) that depends on "now" uses an injected clock. Validate it with one [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) check that runs against the real system clock, exercises a known time-window calculation, and confirms the production wiring of the clock [dependency]({{< relref "/docs/reference/glossary#dependency" >}}) is correct. This catches the "tests use UTC, prod uses container local time" class of bug.
2. **Source and sink gateways.** Same model as the [API consumer pattern]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}). Gateway integration tests in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) exercise each gateway against a real source/sink container or WireMock. Contract tests pin the shape. Post-deploy integration checks confirm the doubles still match the real systems on a schedule.
3. **The scheduler trigger.** The doubled trigger in component tests must match what the real scheduler invokes. Verify with a post-deploy integration check that runs the real scheduler against a deployed instance in a non-prod environment and confirms the entrypoint is found, the cron expression fires at the expected times, environment variables and secrets resolve, and the concurrency policy holds. This is the test that catches "passed in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}), didn't run in prod because the cron expression had a typo."

## Pipeline placement

- Unit and component tests: CI Stage 1.
- Source/sink gateway integration tests: CI Stage 1 or Stage 2.
- Contract tests for each source and sink: CI Stage 1.
- Component tests of the deployed binary (small set): CI Stage 1 or Stage 2.
- Real-clock and real-scheduler integration check: out of pipeline, scheduled, against a non-prod environment.
- Post-deploy: a synthetic invocation of the job in production that verifies it ran, processed records, and met its SLO.

## Example: time-window logic with an injected clock

A test that pins the daily-report window calculation around a DST boundary. The clock is injected so the test deterministically simulates the moment of interest. `sourceDouble` and `sinkDouble` are field-level fakes set up in the test class; assertions use AssertJ:

```java
@Test
void daily_report_run_after_DST_spring_forward_uses_correct_window() {
  // sourceDouble and sinkDouble are InMemoryReportSource / InMemoryReportSink
  // initialized in @BeforeEach with seeded data for 2026-03-08 and 2026-03-09.
  Clock fixedClock = Clock.fixed(
      Instant.parse("2026-03-09T07:30:00Z"),
      ZoneOffset.UTC);
  ReportJob job = new ReportJob(fixedClock, sourceDouble, sinkDouble);

  job.run();

  Report emitted = sinkDouble.lastReport();
  assertThat(emitted.windowStart())
      .isEqualTo(Instant.parse("2026-03-08T05:00:00Z"));
  assertThat(emitted.windowEnd())
      .isEqualTo(Instant.parse("2026-03-09T05:00:00Z"));
  assertThat(emitted.recordsProcessed())
      .isEqualTo(sourceDouble.recordsForDay("2026-03-08"));
}
```

A separate [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) check runs the deployed binary against the real system clock once, to verify the production wiring of the clock dependency matches the doubled clock used here.
