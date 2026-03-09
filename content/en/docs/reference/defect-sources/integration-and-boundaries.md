---
title: "Integration & Boundaries Defects"
linkTitle: "Integration & Boundaries"
weight: 2
description: >
  Defects at system boundaries that are invisible to unit tests and often survive until production. Contract testing and deliberate boundary design are the primary defenses.
---

Defects at system boundaries are invisible to unit tests and often survive until production.
Contract testing and deliberate boundary design are the primary defenses.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Interface mismatches | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Consumer-driven contract tests, API schema validators | Predict which consumers break from API changes based on usage patterns | Mandatory contract tests per boundary; API-first with generated clients |
| Wrong assumptions about upstream/downstream | Design | Chaos engineering platforms, synthetic transactions, fault injection | <span class="ai-high">&#9650;</span> Review code and docs to identify undocumented behavioral assumptions | Document behavioral contracts; defensive coding at boundaries |
| Race conditions | Pre-commit | Thread sanitizers, race detectors, formal verification tools, fuzz testing | Flag concurrency anti-patterns but cannot replace formal detection tools | Idempotent design; queues over shared mutable state |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and best practices
- [Contract Tests]({{< relref "/docs/testing/contract" >}}) - verify that your test doubles still match reality
