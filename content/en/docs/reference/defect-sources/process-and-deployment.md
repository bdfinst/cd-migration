---
title: "Process & Deployment Defects"
linkTitle: "Process & Deployment"
weight: 6
description: >
  Defects caused by the delivery process itself. Manual steps, large batches, and slow feedback loops create the conditions for failure.
---

These defects are caused by the delivery process itself. Manual steps, large batches, and
slow feedback loops create the conditions for failure.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Long-lived branches | Pre-commit | Branch age alerts, merge conflict frequency, [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) dashboard for branch count | <span class="ai-blocked">Process change, not AI</span> | [Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}); merge at least daily |
| Manual [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) steps | CI | Pipeline audit for manual gates, deployment lead time analysis | <span class="ai-blocked">Automation, not AI</span> | Automate every step commit-to-production |
| Batching too many changes per release | CI | Changes-per-deploy metrics, [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) tracking | <span class="ai-blocked">[CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) practice, not AI</span> | Every commit is a release candidate; single-piece flow |
| Inadequate [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) capability | CI | Automated rollback testing in CI, mean time to rollback measurement | <span class="ai-blocked">Deployment patterns, not AI</span> | [Blue/green]({{< relref "/docs/reference/glossary#blue-green-deployment" >}}) or [canary deployments]({{< relref "/docs/reference/glossary#canary-deployment" >}}); auto-rollback on health failure |
| Reliance on human review to catch preventable defects | Coding | Linters, static analysis security testing, type systems, complexity scoring | <span class="ai-high">&#9650;</span> Semantic code review for logic errors and missing edge cases that automated rules cannot express | Reserve human review for knowledge transfer and design decisions |
| Manual review of risks and compliance (CAB) | Design | Change lead time analysis, CAB effectiveness metrics | <span class="ai-high">&#9650;</span> Automated change risk scoring from change diff and deployment history; blast radius analysis | Replace CAB with automated progressive delivery |
| Work stacking on individuals; [everything started, nothing finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}); [PRs waiting days for review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}}); [uneven workloads]({{< relref "/docs/symptoms/flow/work-management/uneven-workloads" >}}); [blocked work sits idle]({{< relref "/docs/symptoms/flow/work-management/blocked-work-sits-idle" >}}); [completed work misses the intent]({{< relref "/docs/symptoms/flow/work-management/completed-work-misses-intent" >}}) | CI | Issue tracker reports where individuals have multiple items assigned simultaneously | <span class="ai-blocked">Process change, not AI</span> | [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}) anti-pattern |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Deployment Symptoms]({{< relref "/docs/symptoms/deployment" >}}) - symptoms caused by deployment process problems
- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - patterns that undermine delivery performance
