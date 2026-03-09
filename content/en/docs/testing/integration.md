---
title: "Integration Tests"
linkTitle: "Integration Tests"
weight: 45
aliases:
  - /docs/reference/testing/integration/
description: >
  "Integration test" is an industry term with two distinct meanings. This page maps both to the appropriate test type on this site.
---

"Integration test" is widely used but inconsistently defined. Martin Fowler draws a
useful distinction between two kinds:

### Narrow integration tests

A **narrow integration test** exercises the portion of code that interfaces with an
external system - the HTTP client, the database query layer, the message producer -
with a [test double]({{< relref "/docs/testing/test-doubles" >}}) replacing the real
external system. The test is deterministic and fast because no real network call or
database is involved. The goal is to verify that the boundary layer code behaves
correctly against a controlled stand-in.

This site covers narrow integration tests under
[Component Tests]({{< relref "/docs/testing/component" >}}). A component test exercises
a complete frontend component or backend service through its public interface, with
test doubles for all external dependencies - which includes the boundary layer that
Fowler's narrow integration test focuses on.

### Broad integration tests

A **broad integration test** (also called a wide integration test) wires two or more
real components together - a real database, a live downstream service, a real message
broker - with no test doubles replacing those dependencies. Fowler himself prefers to
call these "system tests" or "end-to-end tests" to avoid confusion with the narrow
kind.

This site covers broad integration tests under
[End-to-End Tests]({{< relref "/docs/testing/e2e" >}}), which covers the full spectrum
from two services calling each other with real dependencies, up to a complete
browser-driven user journey through every layer of the system.

---

If you arrived here looking for tests that use test doubles at the service boundary,
see [Component Tests]({{< relref "/docs/testing/component" >}}).

If you arrived here looking for tests that involve real external dependencies, see
[End-to-End Tests]({{< relref "/docs/testing/e2e" >}}).
