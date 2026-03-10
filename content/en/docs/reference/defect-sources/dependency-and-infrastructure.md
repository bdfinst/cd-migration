---
title: "Dependency & Infrastructure Defects"
linkTitle: "Dependency & Infrastructure"
weight: 8
description: >
  Defects that originate outside your codebase but break your system. The fix is to treat external dependencies as untrusted boundaries.
---

These defects originate outside your codebase but break your system. The fix is to treat
external dependencies as untrusted boundaries.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Third-party library breaking changes | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Dependency update automation, software composition analysis for breaking versions | Review changelogs and API diffs to assess breaking change risk; predict compatibility issues | Pin dependencies; automated upgrade PRs with test gates |
| Infrastructure differences across environments | CI | Infrastructure-as-code drift detection, config comparison, environment parity scoring | <span class="ai-blocked">IaC and GitOps, not AI</span> | Single source of truth for all environments; containerization |
| Network partitions and partial failures handled wrong | Acceptance Tests | Chaos engineering platforms, synthetic transaction monitoring | Review architectures for missing failure handling patterns | Circuit breakers; retries; bulkheads as defaults; test failure modes explicitly |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and good practices
