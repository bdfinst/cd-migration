---
title: "Change & Complexity Defects"
linkTitle: "Change & Complexity"
weight: 4
description: >
  Defects caused by the act of changing existing code. The larger the change and the longer it lives outside trunk, the higher the risk.
---

These defects are caused by the act of changing existing code. The larger the change and the
longer it lives outside trunk, the higher the risk.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Unintended side effects | [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) | Automated test suites, mutation testing frameworks, change impact analysis | <span class="ai-high">&#9650;</span> Reason about semantic change impact beyond syntactic dependencies; automated blast radius analysis | Small focused commits; [trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}); [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}) |
| Accumulated technical debt | CI | Complexity trends, duplication scoring, dependency cycle detection, quality gates | <span class="ai-high">&#9650;</span> Identify architectural drift, abstraction decay, and calcified workarounds | Refactoring as part of every story; dedicated debt budget |
| Unanticipated feature interactions | Acceptance Tests | Combinatorial and pairwise testing, feature flag interaction matrix | Reason about feature interactions semantically; flag conflicts testing matrices miss | Feature flags with controlled rollout; modular design; [canary deployments]({{< relref "/docs/reference/glossary#canary-deployment" >}}) |
| Configuration drift | CI | Infrastructure-as-code drift detection, environment diffing | <span class="ai-blocked">Current tooling sufficient</span> | Infrastructure as code; immutable infrastructure; GitOps |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and good practices
- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - patterns that undermine delivery performance
