---
title: "Performance & Resilience Defects"
linkTitle: "Performance & Resilience"
weight: 10
description: >
  Performance defects degrade gradually, often hiding behind averages until a threshold tips and the system fails under real load. Detection requires baselines, budgets, and automated enforcement - not periodic manual testing.
---

Performance defects are rarely binary. They degrade gradually, often hiding behind averages
until a threshold tips and the system fails under real load. Detection requires baselines,
budgets, and automated enforcement - not periodic manual testing.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Performance regressions | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Automated benchmark suites, performance budget enforcement in CI | <span class="ai-high">&#9650;</span> Identify code changes likely to degrade performance from structural analysis before benchmarks run | Performance budgets enforced in CI; benchmark suite runs on every commit |
| Resource leaks | CI | Memory and connection pool profilers, leak detection in automated test runs | Flag allocation patterns without corresponding cleanup in code review | Resource management via language-level constructs (try-with-resources, RAII, using); pool size alerts |
| Unknown capacity limits | Acceptance Tests | Load testing frameworks, capacity threshold monitoring, saturation alerts | Predict capacity bottlenecks from architecture and traffic patterns | Regular automated load tests; capacity model updated with every architecture change |
| Missing timeout and deadline enforcement | Pre-commit | Static analysis for unbounded calls, integration test timeout verification | <span class="ai-high">&#9650;</span> Identify call chains with missing or inconsistent timeout propagation | Default timeouts on all external calls; deadline propagation across service boundaries |
| Slow user-facing response times | CI | Real user monitoring, synthetic transaction baselines, web vitals tracking | Correlate frontend and backend telemetry to pinpoint latency sources | Response time SLOs per user-facing path; performance budgets for page weight and API latency |
| Missing graceful degradation | Design | Chaos engineering platforms, failure injection, circuit breaker verification | <span class="ai-high">&#9650;</span> Review architectures for single points of failure and missing fallback paths | Design for partial failure; circuit breakers and fallbacks as defaults; game day exercises |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/reference/testing" >}}) - testing types and best practices
- [Visibility Symptoms]({{< relref "/docs/symptoms/visibility" >}}) - symptoms caused by missing observability
