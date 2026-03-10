---
title: "Testing & Observability Gap Defects"
linkTitle: "Testing & Observability Gaps"
weight: 5
description: >
  Defects that survive because the safety net has holes. The fix is not more testing - it is better-targeted testing and observability that closes the specific gaps.
---

These defects survive because the safety net has holes. The fix is not more testing: it is
better-targeted testing and observability that closes the specific gaps.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Untested edge cases and error paths | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Mutation testing frameworks, branch coverage thresholds | <span class="ai-high">&#9650;</span> Analyze code paths and generate tests for untested boundaries and error conditions | Property-based testing as standard; boundary value analysis |
| Missing contract tests at boundaries | CI | Boundary inventory versus contract test inventory | <span class="ai-high">&#9650;</span> Identify boundaries lacking tests by understanding semantic service relationships | Mandatory contract tests per new boundary |
| Insufficient monitoring | Design | Observability coverage scoring, health endpoint checks, structured logging verification | <span class="ai-blocked">Current tooling sufficient</span> | Observability as non-functional requirement; SLOs for every user-facing path |
| Test environments don't reflect production | CI | Automated environment parity checks, synthetic transaction comparison, infrastructure-as-code diff tools | <span class="ai-blocked">Current tooling sufficient</span> | Production-like data in staging; test in production with flags |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and good practices
- [Testing Symptoms]({{< relref "/docs/symptoms/testing" >}}) - symptoms caused by testing gaps
- [Visibility Symptoms]({{< relref "/docs/symptoms/visibility" >}}) - symptoms caused by missing observability
