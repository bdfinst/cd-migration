---
title: "Integration Tests"
linkTitle: "Integration Tests"
weight: 5
aliases:
  - /docs/reference/testing/integration/
  - /docs/testing/integration/
description: >
  Tests that exercise real external dependencies to validate that contract test doubles still match reality. Non-deterministic; never a pre-merge gate.
---

## Definition

Verification that two or more distinct architectural subsystems or external dependencies interact correctly across their transport layer and data boundaries.

## Scope & Boundaries

Broader than a component test because it explicitly validates communication with real external systems (such as a database, message queue, cache, or filesystem), but narrower than a full end-to-end test because it targets a specific integration boundary rather than complete multi-service user workflows.

## Core Characteristics

Detects driver/dialect mismatches, schema serialization issues, connection pooling misconfigurations, and ORM/SQL query errors that mock-heavy tests overlook.

## Good Practices

- Use disposable, ephemeral infrastructure: Spin up real databases and queues using container tooling (e.g., Testcontainers) rather than using shared, persistent static environments.
- Verify transport-level error handling: Intentionally test connection timeouts, pool exhaustion, network blips, and transaction rollbacks.
- Run tests against clean boundary state: Truncate tables, flush caches, and clear queues between test runs to guarantee deterministic execution.

## Anti-Patterns

-	Using shared remote environments: Pointing integration test suites to shared dev/staging databases, causing data collisions and race conditions between concurrent CI jobs.
-	Testing business permutations: Testing dozens of conditional logic branches through real databases instead of pushing that logic down to fast unit tests or leveraging component tests.
-	Ignoring production parity: Testing against an SQLite in-memory database locally when production runs Postgres, masking dialect, constraint, and indexing differences.

## Weaknesses & Challenges

-	Infrastructure Orchestration Overhead: Requires managing real databases, message brokers, and caches inside the test execution context. Maintaining container definitions (e.g., Docker/Testcontainers) and keeping schema migrations up to date adds operational burden to developers.
-	Test Isolation and State Contamination: When tests write real rows to a database or publish messages to an active broker, dirty state from one test can bleed into another. Cleaning, truncating, or rolling back transactions between runs adds latency and complexity.
-	Slow Pipeline Feedback Cycles: Because integration tests involve real I/O, network socket handshakes, and disk writes, they are orders of magnitude slower than in-memory unit tests. Over-relying on them severely bloats commit-stage feedback loops.
-	Local vs. Production Discrepancies: Test-specific database configurations, lightweight containerized replicas, or local mocks often mask subtle production issues—such as database clustering behavior, regional latency, connection pool limits, or privilege boundaries.

## Examples

{{< card code=true header="**Python Example (Repository-to-Database Integration):**" lang="javascript" >}}
import pytest
from sqlalchemy import create_engine
from myapp.storage import OrderRepository, Order

# Runs against an actual ephemeral Postgres container, not an in-memory mock
def test_order_repository_persists_and_retrieves_roundtrip(real_pg_session):
    repo = OrderRepository(session=real_pg_session)
    new_order = Order(order_id=101, customer_id="cust_abc", total=49.99)

    repo.save(new_order)
    retrieved = repo.find_by_id(101)

    assert retrieved is not None
    assert retrieved.customer_id == "cust_abc"
    assert retrieved.total == 49.99
{{< /card >}}

## Connection to CD Pipeline

Integration tests should only run in the pipeline as part of the longer running acceptance tests if they can be made dependable and deterministic. Otherwise, they should be run on a schedule and not act as a delivery decision.
