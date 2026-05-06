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

"Integration test" is widely used but inconsistently defined. On this site, **integration
tests** are tests that involve **real [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}})** - actual databases, live
downstream services, real message brokers, or third-party APIs. They are non-deterministic
because those dependencies introduce timing, state, and availability factors outside the
test's control.

Integration tests serve a specific role in the test architecture: they **validate that the
[test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) used in your
[contract tests]({{< relref "/docs/testing/test-types/contract" >}}) still match reality**. Without
integration tests, contract test doubles can silently drift from the real behavior of the
systems they simulate - giving false confidence.

Because integration tests depend on live systems, they run **post-deployment** or on a
schedule - never as a pre-merge gate. Failures trigger review or [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) decisions, not
build failures.

For tests that validate interface boundaries using test doubles (deterministic), see
[Contract Tests]({{< relref "/docs/testing/test-types/contract" >}}).

For full-system browser tests and multi-service smoke tests, see
[End-to-End Tests]({{< relref "/docs/testing/test-types/e2e" >}}).
