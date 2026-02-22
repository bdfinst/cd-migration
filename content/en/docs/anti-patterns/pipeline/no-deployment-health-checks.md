---
title: "No Deployment Health Checks"
linkTitle: "No Deployment Health Checks"
weight: 51
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  After deploying, there is no automated verification that the new version is working. The team waits and watches rather than verifying.
tags:
  - deployment-automation
  - observability
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The deployment completes. The [pipeline](../../glossary/#pipeline) shows green. The release engineer posts in Slack: "Deploy
done, watching for issues." For the next fifteen minutes, someone is refreshing the monitoring
dashboard, clicking through the application manually, and checking error logs by eye. If nothing
obviously explodes, they declare success and move on. If something does explode, they are already
watching and respond immediately - which feels efficient until the day they step away for coffee
and the explosion happens while nobody is watching.

The "wait and watch" ritual is a substitute for automation that nobody ever got around to
building. The team knows they should have health checks. They have talked about it. Someone
opened a ticket for it last quarter. The ticket is still open because automated health checks
feel less urgent than the next feature. Besides, the current approach has worked fine so far -
or seemed to, because most bad deployments have been caught within the watching window.

What the team does not see is the category of failures that land outside the watching window.
A deployment that causes a slow memory leak shows normal metrics for thirty minutes and then
degrades over two hours. A change that breaks a nightly batch job is not caught by fifteen
minutes of manual watching. A failure in an infrequently-used code path - the password reset
flow, the report export, the API endpoint that only enterprise customers use - will not appear
during a short manual verification session.

Common variations:

- **The smoke test checklist.** Someone manually runs through a list of screens or API calls
  after deployment and marks each one as "OK." The checklist was created once and has not been
  updated as the application grew. It misses large portions of functionality.
- **The log watcher.** The release engineer reads the last 200 lines of application logs after
  deployment and looks for obvious error messages. Error patterns that are normal noise get
  ignored. New error patterns that blend in get missed.
- **The "users will tell us" approach.** No active verification happens at all. If something
  is wrong, a support ticket will arrive within a few hours. This is treated as acceptable
  because the team has learned that most deployments are fine, not because they have verified
  this one is.
- **The monitoring dashboard glance.** Someone looks at the monitoring system after deployment
  and sees that the graphs look similar to before deployment. Graphs that require minutes to
  show trends - error rates, latency percentiles - are not given enough time to reveal problems
  before the watcher moves on.

The telltale sign: the person who deployed cannot describe specifically what would need to happen
in the monitoring system for them to declare the deployment failed and trigger a [rollback](../../glossary/#rollback).

## Why This Is a Problem

Without automated health checks, the deployment pipeline ends before the deployment is actually
verified. The team is flying blind for a period after every deployment, relying on manual
attention that is inconsistent, incomplete, and unavailable at 3 AM.

### It reduces quality

Automated health checks verify that specific, concrete conditions are met after deployment.
Error rate is below the baseline. Latency is within normal range. Health endpoints return 200.
Key user flows complete successfully. These are precise, repeatable checks that evaluate the
same conditions every time.

Manual watching cannot match this precision. A human watching a dashboard will notice a 50%
spike in errors. They may not notice a 15% increase that nonetheless indicates a serious
regression. They cannot consistently evaluate P99 latency trends during a fifteen-minute watch
window. They cannot check ten different functional flows across the application in the same
time an automated suite can.

The quality of deployment verification is highest immediately after deployment, when the team's
attention is focused. But even at peak attention, humans check fewer things less consistently
than automation. As the watch window extends and attention wanders, the quality of verification
drops further. After an hour, nobody is watching. A health check failure at ninety minutes goes
undetected until a user reports it.

### It increases rework

When a bad deployment is not caught immediately, the window for identifying the cause grows.
A deployment that introduces a problem and is caught ten minutes later is trivially explained:
the most recent deployment is the cause. A deployment that introduces a problem caught two
hours later requires investigation. The team must rule out other changes, check logs from the
right time window, and reconstruct what was different at the time the problem started.

Without automated rollback triggered by health check failures, every bad deployment requires
manual recovery. Someone must identify the failure, decide to roll back, execute the rollback,
and then verify that the rollback restored service. This process takes longer than automated
rollback and is more error-prone under the pressure of a live incident.

Failed deployments that require manual recovery also disrupt the entire delivery pipeline.
While the team works the incident, nothing else deploys. The queue of commits waiting for
deployment grows. When the incident is resolved, deploying the queued changes is higher-risk
because more changes have accumulated.

### It makes delivery timelines unpredictable

Manual post-deployment watching creates a variable time tax on every deployment. Someone must
be available, must remain focused, and must be willing to declare failure if things go wrong.
In practice, the watching period ends when the watcher decides they have seen enough - a
judgment call that varies by person, time of day, and how busy they are with other things.

This variability makes deployment scheduling unreliable. A team that wants to deploy multiple
times per day cannot staff a thirty-minute watching window for every deployment. As deployment
frequency aspirations increase, the manual watching approach becomes a hard ceiling. The team
can only deploy as often as they can spare someone to watch.

Deployments scheduled to avoid risk - late at night, early in the morning, on quiet Tuesdays -
take the watching requirement even further from normal working hours. The engineers watching
2 AM deployments are tired. Tired engineers make different judgments about what "looks fine"
than alert engineers would.

### Impact on continuous delivery

[Continuous delivery](../../glossary/#cd-continuous-delivery) means any commit that passes the pipeline can be released to production
with confidence. The confidence comes from automated validation, not human belief that things
probably look fine. Without automated health checks, the "with confidence" qualifier is hollow.
The team is not confident - they are hopeful.

Health checks are not a nice-to-have addition to the deployment pipeline. They are the
mechanism that closes the loop. The pipeline validates the code before deployment. Health checks
validate the running system after deployment. Without both, the pipeline is only half-complete.
A pipeline without health checks is a launch facility with no telemetry: it gets the rocket off
the ground but has no way to know whether it reached orbit.

High-performing delivery teams deploy frequently precisely because they have confidence in their
health checks and rollback automation. Every deployment is verified by the same automated
criteria. If those criteria are not met, rollback is triggered automatically. The human monitors
the health check results, not the application itself. This is the difference between deploying
with confidence and deploying with hope.

## How to Fix It

### Step 1: Define what "healthy" means for each service (Week 1)

Agree on the criteria for a healthy deployment before writing any checks:

1. List the key behaviors of the service: which endpoints must return success, which user
   flows must complete, which background jobs must run.
2. Identify the [baseline metrics](../../glossary/#baseline-metrics) for the service: typical error rate, typical P95 latency,
   typical throughput. These become the comparison baselines for post-deployment checks.
3. Define the threshold for rollback: for example, error rate more than 2x baseline for more
   than two minutes, or P95 latency above 2000ms, or health endpoint returning non-200.
4. Write these criteria down before writing any code. The criteria define what the automation
   will implement.

### Step 2: Add a liveness and readiness endpoint (Week 1-2)

If the service does not already have health endpoints, add them:

- A liveness endpoint returns 200 if the process is running and responsive. It should be
  fast and should not depend on external systems.
- A readiness endpoint returns 200 only when the service is ready to receive traffic. It
  checks critical dependencies: can the service connect to the database, can it reach its
  downstream services?

{{% code-collapse title="Readiness endpoint checking database and cache (Spring Boot)" %}}
```java
// Example readiness endpoint (Spring Boot)
@GetMapping("/actuator/health/readiness")
public ResponseEntity<Map<String, String>> readiness() {
    boolean dbReachable = dataSource.isValid(1);
    boolean cacheReachable = cacheClient.ping();
    if (dbReachable && cacheReachable) {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }
    return ResponseEntity.status(503).body(Map.of("status", "DOWN"));
}
```
{{% /code-collapse %}}

The pipeline uses the readiness endpoint to confirm that the new version is accepting traffic
before declaring the deployment complete.

### Step 3: Add automated post-deployment smoke tests (Weeks 2-3)

After the readiness check confirms the service is up, run a suite of lightweight functional
smoke tests:

1. Write tests that exercise the most critical paths through the application. Not exhaustive
   coverage - the test suite already provides that. These are deployment verification tests
   that confirm the key flows work in the deployed environment.
2. Run these tests against the production (or staging) environment immediately after deployment.
3. If any smoke test fails, trigger rollback automatically.

Smoke tests should run in under two minutes. They are not a substitute for the full test
suite - they are a fast deployment-specific verification layer.

### Step 4: Add metric-based deployment gates (Weeks 3-4)

Connect the deployment pipeline to the monitoring system so that real traffic metrics can
determine deployment success:

1. After deployment, poll the monitoring system for five to ten minutes.
2. Compare error rate, latency, and any business metrics against the pre-deployment baseline.
3. If metrics degrade beyond the thresholds defined in Step 1, trigger automated rollback.

Most modern deployment platforms support this pattern. Kubernetes deployments can be gated
by custom metrics. Deployment tools like Spinnaker, Argo Rollouts, and Flagger have native
support for metric-based promotion and rollback. Cloud provider deployment services often
include built-in alarm-based rollback.

### Step 5: Implement automated rollback (Weeks 3-5)

Wire automated rollback directly into the health check mechanism. If the health check fails
but the team must manually decide to roll back and then execute the rollback, the benefit is
limited. The rollback trigger and the health check must be part of the same automated flow:

1. Deploy the new version.
2. Run readiness checks until the new version is ready or a timeout is reached.
3. Run smoke tests. If they fail, roll back automatically.
4. Monitor metrics for the defined observation window. If metrics degrade beyond thresholds,
   roll back automatically.
5. Only after the observation window passes with healthy metrics is the deployment declared
   successful.

The team should be notified of the rollback immediately, with the health check failure that
triggered it included in the notification.

### Step 6: Extend to progressive delivery (Weeks 6-8)

Once automated health checks and rollback are established, consider progressive delivery to
further reduce deployment risk:

- [Canary deployments](../../glossary/#canary-deployment): route a small percentage of traffic to the new version first. Apply
  health checks to the canary traffic. Only expand to full traffic if the canary is healthy.
- [Blue-green deployments](../../glossary/#blue-green-deployment): deploy the new version in parallel with the old. Switch traffic
  after health checks pass. Rollback is instantaneous - switch traffic back.

Progressive delivery reduces blast radius for bad deployments. Health checks still determine
whether to promote or roll back, but only a fraction of users are affected during the validation
window.

| Objection | Response |
|-----------|----------|
| "Our application is stateful - rollback is complicated" | Start with manual rollback alerts. Define backward-compatible migration and dual-write strategies, then automate rollback once those patterns are in place. |
| "We do not have access to production metrics from the pipeline" | This is a tooling gap to fix. The monitoring system should have an API. Most observability platforms (Datadog, New Relic, Prometheus, CloudWatch) expose query APIs. Pipeline tools can call these APIs post-deployment. |
| "Our smoke tests will be unreliable in production" | Tests that are unreliable in production are unreliable in staging too - they are just failing quietly. Fix the test reliability problem. A flaky smoke test that occasionally triggers false rollbacks is better than no smoke test that misses real failures. |
| "We cannot afford the development time to write smoke tests" | The cost of writing smoke tests is far less than the cost of even one undetected bad deployment that causes a lengthy incident. Estimate the cost of the last three production incidents that a post-deployment health check would have caught, and compare. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Time to detect post-deployment failures | Should drop from hours (user reports) to minutes (automated detection) |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as automated rollback replaces manual recovery |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as health-check-triggered rollbacks prevent bad deployments from affecting users for extended periods |
| [Release frequency](../../../metrics/release-frequency/) | Should increase as deployment confidence grows and the team deploys more often |
| Rollback time | Should drop to under five minutes with automated rollback |
| Post-deployment watching time (human hours) | Should reach zero as automated checks replace manual watching |

## Related Content

- [Rollback](../../../migrate-to-cd/migration-path/pipeline/rollback/) - Automated rollback is the other half of automated health checks
- [Production-Like Environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Health checks must run in environments that reflect production behavior
- [Single Path to Production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - Health checks belong at the end of the single automated path
- [Deterministic Pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - Smoke tests must be reliable to serve as health gates
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Use deployment health data to drive improvement decisions
