---
title: "Security & Compliance Defects"
linkTitle: "Security & Compliance"
weight: 9
description: >
  Security and compliance defects are silent until they are catastrophic. The gap between what the code does and what policy requires is invisible without deliberate, automated verification at every stage.
---

Security and compliance defects are silent until they are catastrophic. They share a pattern:
the gap between what the code does and what policy requires is invisible without deliberate,
automated verification at every stage.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Known vulnerabilities in dependencies | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Software composition analysis, CVE database scanning, dependency lock file auditing | <span class="ai-high">&#9650;</span> Correlate vulnerability advisories with actual usage paths to prioritize exploitable risks over theoretical ones | Automated dependency updates with test gates; pin and audit all transitive dependencies |
| Secrets committed to source control | Pre-commit | Pre-commit secret scanners, entropy-based detection, git history auditing tools | Flag patterns that resemble credentials in code, config, and documentation | Secrets management platform; inject at runtime, never store in repo |
| Authentication and authorization gaps | Design | Security-focused integration tests, RBAC policy validators, access matrix verification | <span class="ai-high">&#9650;</span> Review code paths for missing authorization checks and privilege escalation patterns | Centralized auth framework; deny-by-default access policies; automated access matrix tests |
| Injection vulnerabilities | Pre-commit | SAST tools, taint analysis, parameterized query enforcement | <span class="ai-high">&#9650;</span> Identify subtle injection vectors that pattern-matching rules miss, including second-order injection | Input validation at boundaries; parameterized queries as default; content security policies |
| Regulatory requirement gaps | Requirements | Compliance-as-code policy engines, automated control mapping | <span class="ai-high">&#9650;</span> Map regulatory requirements to implementation artifacts and flag uncovered controls | Compliance requirements as acceptance criteria; automated evidence collection |
| Missing audit trails | Design | Structured logging verification, audit event coverage scoring | Review code for state-changing operations that lack audit logging | Audit logging as a framework default; every state change emits a structured event |
| License compliance violations | CI | License scanning tools, SBOM generation and policy evaluation | Review license compatibility across the full dependency graph | Approved license allowlist enforced in CI; SBOM generated on every build |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and best practices
- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - patterns that undermine delivery performance
