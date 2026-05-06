---
title: "Stateful Service"
linkTitle: "Stateful Service"
weight: 8
description: >
  A service that maintains long-lived in-memory state: caches, in-memory aggregates, leader-elected coordinators, websocket gateways, real-time engines. Brief sketch.
---

A service that maintains long-lived in-memory state: caches, in-memory aggregates, leader-elected coordinators, websocket gateways, real-time engines, sticky-session servers.

The hard problems are concurrency, recovery, and unbounded growth. Stateful services fail in ways stateless services do not.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| State machine logic | Pure transitions | [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) |
| Persistence and checkpointing | State survives restart or rebuilds correctly | [Component tests]({{< relref "/docs/testing/test-types/component" >}}) with real persistence |
| Recovery from crash | Restart converges to a consistent state | Tests that simulate crash mid-write |
| Leader election | Only one leader; transitions are observable; split-brain is impossible | Cluster tests with real consensus library |
| Replication | Followers stay in sync; backpressure is documented | Cluster tests |
| Memory bounds | State doesn't grow unbounded; eviction policy holds | Long-running soak tests |
| Connection lifecycle | Sessions clean up on disconnect; reconnect is documented | Component tests |

{{< figure src="/images/testing/patterns/stateful-service-coverage.svg" alt="Coverage matrix for a stateful service. Rows are state machine logic, persistence and recovery, single-node concurrency, replication and leader election, memory bounds and long-run behavior, and the persistence engine (external). Columns are solitary unit, component (in-band, single-node), gateway integration, cluster tests, and out-of-band soak and chaos. Solitary unit tests cover state transitions. Component tests cover persistence, recovery, and single-node concurrency. Gateway integration tests pin the persistence protocol against the real production engine. Cluster tests exercise replication and leader election against a multi-node testcontainer setup with the real consensus library. Out-of-band soak and chaos catch unbounded growth, slow leaks, and replication-lag drift over hours or days against a deployed instance." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **State transitions**: follow the documented machine.
- **Restart**: state rebuilds and behaviour matches pre-restart.
- **Replication lag under expected load**: stays within budget.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Crash mid-write**: consistent state on restart. No torn writes.
- **Network partition**: minority replicas step down with documented reconciliation on heal.
- **Slow replication**: applies backpressure rather than silent divergence.
- **Memory pressure**: evicts oldest entries per policy without OOM.
- **Idle long-running connections**: close cleanly with documented reconnect behaviour.
- **Concurrent state mutations**: serialize without lost updates.

## Test double validation and pipeline placement

Persistence doubles validated by gateway integration tests against the real production engine. Consensus library doubles validated by cluster tests against a multi-node testcontainer setup. Soak tests run out of [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) against a deployed instance to catch slow leaks and unbounded growth.

State machine unit tests, recovery component tests, and single-node concurrency tests run in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1; cluster tests with real consensus library in CI Stage 2; soak and chaos tests out of pipeline.
