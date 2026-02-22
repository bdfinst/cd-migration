---
title: "Change Fail Rate"
linkTitle: "Change Fail Rate"
weight: 5
description: >
  Percentage of production deployments that cause a failure or require remediation. A DORA key metric for delivery stability.
---

## Definition

Change Fail Rate measures the percentage of deployments to production that result
in degraded service, negative customer impact, or require immediate remediation
such as a [rollback](../glossary/#rollback), hotfix, or patch.

{{% code-collapse title="Change Fail Rate formula" lang="text" %}}
changeFailRate = failedChangeCount / totalChangeCount * 100
{{% /code-collapse %}}

A "failed change" includes any deployment that:

- Is rolled back.
- Requires a hotfix deployed within a short window (commonly 24 hours).
- Triggers a production incident attributed to the change.
- Requires manual intervention to restore service.

This is one of the four [DORA](../glossary/#dora-metrics) key metrics. It measures the stability side of
delivery performance, complementing the throughput metrics of
[Lead Time](../lead-time/) and [Release Frequency](../release-frequency/).

## How to Measure

1. **Count total production deployments** over a defined period (weekly, monthly).
2. **Count deployments classified as failures** using the criteria above.
3. **Divide failures by total deployments** and express as a percentage.

Data sources:

- **Deployment logs:** total deployment count from your [CD](../glossary/#cd-continuous-delivery) platform.
- **Incident management:** incidents linked to specific deployments (PagerDuty,
  Opsgenie, ServiceNow).
- **Rollback records:** deployments that were reverted, either manually or by
  automated rollback.
- **Hotfix tracking:** deployments tagged as hotfixes or emergency changes.

Automate the classification where possible. For example, if a deployment is
followed by another deployment of the same service within a defined window (e.g.,
one hour), flag the original as a potential failure for review.

## Targets

| Level  | Change Fail Rate |
|--------|------------------|
| Low    | 46 to 60%        |
| Medium | 16 to 45%        |
| High   | 0 to 15%         |
| Elite  | 0 to 5%          |

These levels are drawn from the DORA *State of DevOps* research. Elite performers
maintain a change fail rate below 5%, meaning fewer than 1 in 20 deployments causes
a problem.

## Common Pitfalls

- **Not recording failures.** Deploying fixes without logging the original failure
  understates the true rate. Ensure every incident and rollback is tracked.
- **Reclassifying defects.** Creating review processes that reclassify production
  defects as "feature requests" or "known limitations" hides real failures.
- **Inflating deployment count.** Re-deploying the same working version to increase
  the denominator artificially lowers the rate. Only count deployments that contain
  new changes.
- **Pursuing zero defects at the cost of speed.** An obsessive focus on eliminating
  all failures can slow [Release Frequency](../release-frequency/) to a crawl. A
  small failure rate with fast recovery is preferable to near-zero failures with
  monthly deployments.
- **Ignoring near-misses.** Changes that cause degraded performance but do not
  trigger a full incident are still failures. Define clear criteria for what
  constitutes a failed change and apply them consistently.

## Connection to CD

Change Fail Rate is the primary quality signal in a Continuous Delivery [pipeline](../glossary/#pipeline):

- **Validates pipeline quality gates.** A rising change fail rate indicates that
  the automated tests, security scans, and quality checks in the pipeline are not
  catching enough defects. Each failure is an opportunity to add or improve a
  quality gate.
- **Enables confidence in frequent releases.** Teams will only deploy frequently
  if they trust the pipeline. A low change fail rate builds this trust and
  supports higher [Release Frequency](../release-frequency/).
- **Smaller changes fail less.** The DORA research consistently shows that smaller,
  more frequent deployments have lower failure rates than large, infrequent
  releases. Improving [Integration Frequency](../integration-frequency/) naturally
  improves this metric.
- **Drives root cause analysis.** Each failed change should trigger a blameless
  investigation: what automated check could have caught this? The answers feed
  directly into pipeline improvements.
- **Balances throughput metrics.** Change Fail Rate is the essential guardrail for
  [Lead Time](../lead-time/) and [Release Frequency](../release-frequency/). If
  those metrics improve while change fail rate worsens, the team is trading quality
  for speed.

To improve Change Fail Rate:

- Deploy smaller changes more frequently to reduce the blast radius of failures.
- Identify the root cause of each failure and add automated checks to prevent
  recurrence.
- Strengthen the test suite, particularly integration and contract tests that
  validate interactions between services.
- Implement progressive delivery (canary releases, [feature flags](../glossary/#feature-flag)) to limit the
  impact of defective changes before they reach all users.
- Conduct blameless post-incident reviews and feed learnings back into the
  delivery pipeline.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
