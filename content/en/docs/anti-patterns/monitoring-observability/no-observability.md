---
title: "No Observability"
linkTitle: "No Observability"
weight: 49
category: "Monitoring & Observability"
risk_level: high
description: >
  The team cannot tell if a deployment is healthy. No metrics, no log aggregation, no tracing.
  Issues are discovered when customers call support.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The team deploys a change. Someone asks "is it working?" Nobody knows. There is no dashboard to
check. There are no metrics to compare before and after. The team waits. If nobody complains
within an hour, they assume the deployment was successful.

When something does go wrong, the team finds out from a customer support ticket, a Slack message
from another team, or an executive asking why the site is slow. The investigation starts with
SSH-ing into a server and reading raw log files. Hours pass before anyone understands what
happened, what caused it, or how many users were affected.

Common variations:

- **Logs exist but are not aggregated.** Each server writes its own log files. Debugging requires
  logging into multiple servers and running grep. Correlating a request across services means
  opening terminals to five machines and searching by timestamp.
- **Metrics exist but nobody watches them.** A monitoring tool was set up once. It has default
  dashboards for CPU and memory. Nobody configured application-level metrics. The dashboards show
  that servers are running, not whether the application is working.
- **Alerting is all or nothing.** Either there are no alerts, or there are hundreds of noisy
  alerts that the team ignores. Real problems are indistinguishable from false alarms. The
  on-call person mutes their phone.
- **Observability is someone else's job.** A separate operations or platform team owns the
  monitoring tools. The development team does not have access, does not know what is monitored,
  and does not add instrumentation to their code.
- **Post-deployment verification is manual.** After every deployment, someone clicks through the
  application to check if it works. This takes 15 minutes per deployment. It catches obvious
  failures but misses performance degradation, error rate increases, and partial outages.

The telltale sign: the team's primary method for detecting production problems is waiting for
someone outside the team to report them.

## Why This Is a Problem

Without observability, the team is deploying into a void. They cannot verify that deployments
are healthy, cannot detect problems quickly, and cannot diagnose issues when they arise. Every
deployment is a bet that nothing will go wrong, with no way to check.

### It reduces quality

When the team cannot see the effects of their changes in production, they cannot learn from them.
A deployment that degrades response times by 200 milliseconds goes unnoticed. A change that
causes a 2% increase in error rates is invisible. These small quality regressions accumulate
because nobody can see them.

Without production telemetry, the team also loses the most valuable feedback loop: how the
software actually behaves under real load with real data. A test suite can verify logic, but only
production observability reveals performance characteristics, usage patterns, and failure modes
that tests cannot simulate.

Teams with strong observability catch regressions within minutes of deployment. They see error
rate spikes, latency increases, and anomalous behavior in real time. They roll back or fix the
issue before most users are affected. Quality improves because the feedback loop from deployment
to detection is minutes, not days.

### It increases rework

Without observability, incidents take longer to detect, longer to diagnose, and longer to resolve.
Each phase of the incident lifecycle is extended because the team is working blind.

Detection takes hours or days instead of minutes because the team relies on external reports.
Diagnosis takes hours instead of minutes because there are no traces, no correlated logs, and no
metrics to narrow the search. The team resorts to reading code and guessing. Resolution takes
longer because without metrics, the team cannot verify that their fix actually worked - they
deploy the fix and wait to see if the complaints stop.

A team with observability detects problems in minutes through automated alerts, diagnoses them
in minutes by following traces and examining metrics, and verifies fixes instantly by watching
dashboards. The total incident lifecycle drops from hours to minutes.

### It makes delivery timelines unpredictable

Without observability, the team cannot assess deployment risk. They do not know the current error
rate, the baseline response time, or the system's capacity. Every deployment might trigger an
incident that consumes the rest of the day, or it might go smoothly. The team cannot predict
which.

This uncertainty makes the team cautious. They deploy less frequently because each deployment is
a potential fire. They avoid deploying on Fridays, before holidays, or before important events.
They batch up changes so there are fewer risky deployment moments. Each of these behaviors slows
delivery and increases batch size, which increases risk further.

Teams with observability deploy with confidence because they can verify health immediately. A
deployment that causes a problem is detected and rolled back in minutes. The blast radius is
small because the team catches issues before they spread. This confidence enables frequent
deployment, which keeps batch sizes small, which reduces risk.

### Impact on continuous delivery

Continuous delivery requires fast feedback from production. The deploy-and-verify cycle must be
fast enough that the team can deploy many times per day with confidence. Without observability,
there is no verification step - only hope.

Specifically, CD requires:

- **Automated deployment verification.** After every deployment, the pipeline must verify that the
  new version is healthy before routing traffic to it. This requires health checks, metric
  comparisons, and automated rollback triggers - all of which require observability.
- **Fast incident detection.** If a deployment causes a problem, the team must know within
  minutes, not hours. Automated alerts based on error rates, latency, and business metrics
  are essential.
- **Confident rollback decisions.** When a deployment looks unhealthy, the team must be able to
  compare current metrics to the baseline and make a data-driven rollback decision. Without
  metrics, rollback decisions are based on gut feeling and anecdote.

A team without observability can automate deployment, but they cannot automate verification. That
means every deployment requires manual checking, which caps deployment frequency at whatever pace
the team can manually verify.

## How to Fix It

### Step 1: Add structured logging (Week 1)

Structured logging is the foundation of observability. Without it, logs are unreadable at scale.

1. Replace unstructured log statements (`log("processing order")`) with structured ones
   (`log(event="order.processed", order_id=123, duration_ms=45)`).
2. Include a correlation ID in every log entry so that all log entries for a single request can
   be linked together across services.
3. Send logs to a central aggregation service (Elasticsearch, Datadog, CloudWatch, Loki, or
   similar). Stop relying on SSH and grep.

Focus on the most critical code paths first: request handling, error paths, and external service
calls. You do not need to instrument everything in week one.

### Step 2: Add application-level metrics (Week 2)

Infrastructure metrics (CPU, memory, disk) tell you the servers are running. Application metrics
tell you the software is working. Add the four golden signals:

| Signal | What to measure | Example |
|--------|----------------|---------|
| Latency | How long requests take | p50, p95, p99 response time per endpoint |
| Traffic | How much demand the system handles | Requests per second, messages processed per minute |
| Errors | How often requests fail | Error rate by endpoint, HTTP 5xx count |
| Saturation | How full the system is | Queue depth, connection pool usage, thread count |

Expose these metrics through your application (using Prometheus client libraries, StatsD, or
your platform's metric SDK) and visualize them on a dashboard.

### Step 3: Create a deployment health dashboard (Week 3)

Build a single dashboard that answers: "Is the system healthy right now?"

1. Include the four golden signals from Step 2.
2. Add deployment markers so the team can see when deploys happened and correlate them with
   metric changes.
3. Include business metrics that matter: successful checkouts per minute, sign-ups per hour,
   or whatever your system's key transactions are.

This dashboard becomes the first thing the team checks after every deployment. It replaces the
manual click-through verification.

### Step 4: Add automated alerts for deployment verification (Week 4)

Move from "someone checks the dashboard" to "the system tells us when something is wrong":

1. Set alert thresholds based on your baseline metrics. If the p95 latency is normally 200ms,
   alert when it exceeds 500ms for more than 2 minutes.
2. Set error rate alerts. If the error rate is normally below 1%, alert when it crosses 5%.
3. Connect alerts to the team's communication channel (Slack, PagerDuty, or similar). Alerts
   must reach the people who can act on them.

Start with a small number of high-confidence alerts. Three alerts that fire reliably are worth
more than thirty that the team ignores.

### Step 5: Integrate observability into the deployment pipeline (Week 5+)

Close the loop between deployment and verification:

1. After deploying, the pipeline waits and checks health metrics automatically. If error rates
   spike or latency degrades beyond the threshold, the pipeline triggers an automatic rollback.
2. Add smoke tests that run against the live deployment and report results to the dashboard.
3. Implement canary deployments or progressive rollouts that route a small percentage of traffic
   to the new version and compare its metrics against the baseline before promoting.

This is the point where observability enables continuous delivery. The pipeline can deploy with
confidence because it can verify health automatically.

| Objection | Response |
|-----------|----------|
| "We don't have budget for monitoring tools" | Open-source stacks (Prometheus, Grafana, Loki, Jaeger) provide full observability at zero license cost. The investment is setup time, not money. |
| "We don't have time to add instrumentation" | Start with the deployment health dashboard. One afternoon of work gives the team more production visibility than they have ever had. Build from there. |
| "The ops team handles monitoring" | Observability is a development concern, not just an operations concern. Developers write the code that generates the telemetry. They need access to the dashboards and alerts. |
| "We'll add observability after we stabilize" | You cannot stabilize what you cannot see. Observability is how you find stability problems. Adding it later means flying blind longer. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Mean time to detect (MTTD) | Time from problem occurring to team being aware - should drop from hours to minutes |
| [Mean time to repair](../../../reference/metrics/mean-time-to-repair/) | Should decrease as diagnosis becomes faster |
| Manual verification time per deployment | Should drop to zero as automated checks replace manual click-throughs |
| [Change fail rate](../../../reference/metrics/change-fail-rate/) | Should decrease as deployment verification catches problems before they reach users |
| Alert noise ratio | Percentage of alerts that are actionable - should be above 80% |
| Incidents discovered by customers vs. by the team | Ratio should shift toward team detection |

## Related Content

- [Pipeline Architecture](../../../pipeline/pipeline-architecture/) - Where deployment verification fits in the pipeline
- [Rollback](../../../pipeline/rollback/) - Observability enables data-driven rollback decisions
- [Progressive Rollout](../../../deliver-on-demand/progressive-rollout/) - Canary deployments require metric comparison
- [Metrics-Driven Improvement](../../../optimize/metrics-driven-improvement/) - Using production data to guide improvement
- [Baseline Metrics](../../../assess/baseline-metrics/) - Establishing the numbers you need before you can improve them
