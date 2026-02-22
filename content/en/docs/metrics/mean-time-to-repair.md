---
title: "Mean Time to Repair"
linkTitle: "Mean Time to Repair"
weight: 6
description: >
  Average time from when a production incident is detected until service is restored. A DORA key metric for recovery capability.
---

## Definition

Mean Time to Repair (MTTR) measures the average elapsed time between when a
production incident is detected and when it is fully resolved and service is
restored to normal operation.

{{% code-collapse title="Mean Time to Repair formula" %}}
```text
mttr = sum(resolvedTimestamp - detectedTimestamp) / incidentCount
```
{{% /code-collapse %}}

MTTR reflects an organization's ability to recover from failure. It encompasses
detection, diagnosis, fix development, build, deployment, and verification. A
short MTTR depends on the entire delivery system working well: fast builds,
automated deployments, good observability, and practiced incident response.

The *Accelerate* research identifies MTTR as one of the four key [DORA metrics](../glossary/#dora-metrics) and
notes that "software delivery performance is a combination of lead time, release
frequency, and MTTR." It is the stability counterpart to the throughput metrics.

## How to Measure

1. **Record the detection timestamp.** This is when the team first becomes aware of
   the incident, typically when an alert fires, a customer reports an issue, or
   monitoring detects an anomaly.
2. **Record the resolution timestamp.** This is when the incident is resolved and
   service is confirmed to be operating normally. Resolution means the customer
   impact has ended, not merely that a fix has been deployed.
3. **Calculate the duration** for each incident.
4. **Compute the average** across all incidents in a given period.

Data sources:

- **Incident management platforms:** PagerDuty, Opsgenie, ServiceNow, or
  Statuspage provide incident lifecycle timestamps.
- **Monitoring and alerting:** alert trigger times from Datadog, Prometheus
  Alertmanager, CloudWatch, or equivalent.
- **Deployment logs:** timestamps of [rollbacks](../glossary/#rollback) or hotfix deployments.

Report both the mean and the median. The mean can be skewed by a single long
outage, so the median gives a better sense of typical recovery time. Also track
the maximum MTTR per period to highlight worst-case incidents.

## Targets

| Level  | Mean Time to Repair |
|--------|---------------------|
| Low    | More than 1 week    |
| Medium | 1 day to 1 week     |
| High   | Less than 1 day     |
| Elite  | Less than 1 hour    |

Elite performers restore service in under one hour. This requires automated
rollback or roll-forward capability, fast build pipelines, and well-practiced
incident response processes.

## Common Pitfalls

- **Closing incidents prematurely.** Marking an incident as resolved before the
  customer impact has actually ended artificially deflates MTTR. Define "resolved"
  clearly and verify that service is truly restored.
- **Not counting detection time.** If the team discovers a problem informally
  (e.g., a developer notices something odd) and fixes it before opening an
  incident, the time is not captured. Encourage consistent incident reporting.
- **Ignoring recurring incidents.** If the same issue keeps reappearing, each
  individual MTTR may be short, but the cumulative impact is high. Track recurrence
  as a separate quality signal.
- **Conflating MTTR with MTTD.** Mean Time to Detect (MTTD) and Mean Time to
  Repair overlap but are distinct. If you only measure from alert to resolution,
  you miss the detection gap, the time between when the problem starts and when
  it is detected. Both matter.
- **Optimizing MTTR without addressing root causes.** Getting faster at fixing
  recurring problems is good, but preventing those problems in the first place is
  better. Pair MTTR with [Change Fail Rate](../change-fail-rate/) to ensure the
  number of incidents is also decreasing.

## Connection to CD

MTTR is a direct measure of how well the entire [Continuous Delivery](../glossary/#cd-continuous-delivery) system supports
recovery:

- **[Pipeline](../glossary/#pipeline) speed is the floor.** The minimum possible MTTR for a roll-forward
  fix is the [Build Duration](../build-duration/) plus deployment time. A 30-minute
  build means you cannot restore service via a code fix in less than 30 minutes.
  Reducing build duration directly reduces MTTR.
- **Automated deployment enables fast recovery.** Teams that can deploy with one
  click or automatically can roll back or roll forward in minutes. Manual
  deployment processes add significant time to every incident.
- **[Feature flags](../glossary/#feature-flag) accelerate mitigation.** If a failing change is behind a feature
  flag, the team can disable it in seconds without deploying new code. This can
  reduce MTTR from minutes to seconds for flag-protected changes.
- **Observability shortens detection and diagnosis.** Good logging, metrics, and
  tracing help the team identify the cause of an incident quickly. Without
  observability, diagnosis dominates the repair timeline.
- **Practice improves performance.** Teams that deploy frequently have more
  experience responding to issues. High [Release Frequency](../release-frequency/)
  correlates with lower MTTR because the team has well-rehearsed recovery
  procedures.
- **Trunk-based development simplifies rollback.** When trunk is always deployable,
  the team can roll back to the previous commit. Long-lived branches and complex
  merge histories make rollback risky and slow.

To improve MTTR:

- Keep the pipeline always deployable so a fix can be deployed at any time.
- Reduce [Build Duration](../build-duration/) to enable faster roll-forward.
- Implement feature flags for large changes so they can be disabled without
  redeployment.
- Invest in observability: structured logging, distributed tracing, and
  meaningful alerting.
- Practice incident response regularly, including deploying rollbacks and hotfixes.
- Conduct blameless post-incident reviews and feed learnings back into the pipeline
  and monitoring.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
