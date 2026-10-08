---
title: "Lead Time"
linkTitle: "Lead Time"
weight: 4
description: >
  Total time from when a change is committed until it is running in production. A DORA lagging outcome metric for pipeline efficiency.
---

## Definition

Lead Time measures the total elapsed time from when a developer commits a code change
until that change is successfully running in production.
Lead Time is one of the four key metrics identified by the [DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}}) (DevOps Research and
Assessment) team as a predictor of software delivery performance. Lead Time is a lagging
outcome metric: it reflects the cumulative effect of pipeline automation, work decomposition,
and integration practices. Improving [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) and
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) are the leading indicators to address first.

{{< card code=true header="**Lead Time formula**" lang="text" >}}
leadTime = productionDeployTimestamp - commitTimestamp
{{< /card >}}

In the broader value stream, "lead time" can also refer to the time from a customer
request to delivery. The DORA definition focuses on the segment from commit to
production. The *Accelerate* research calls this segment "[lead time for changes]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}})."
This narrower definition captures the efficiency of your delivery [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) and
deployment process.

Lead Time includes [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) plus any additional time
for deployment, approval gates, environment provisioning, and post-deploy
verification. It is a superset of build time and a subset of
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}), which also includes the
coding phase before the first commit.

## How to measure

1. **Record the commit timestamp.** Use the commit timestamp recorded in source
   control. Use the time the commit was pushed or merged to the trunk, not the
   local author timestamp.
2. **Record the production deployment timestamp.** Capture when the deployment
   containing that commit completes successfully in production.
3. **Calculate the difference.** Subtract the commit time from the deploy time.
4. **Aggregate across commits.** Report the median lead time across all commits
   deployed in a given period (daily, weekly, or per release).

Data sources:

- **Source control:** commit or merge timestamps from Git, GitHub, GitLab, etc.
- **Pipeline platform:** pipeline completion times from Jenkins, GitHub Actions,
  GitLab CI, etc.
- **Deployment tooling:** production deployment timestamps from Argo CD, Spinnaker,
  Flux, or custom scripts.

For teams practicing [continuous deployment]({{< relref "/docs/reference/glossary#continuous-deployment" >}}), lead time might be nearly identical to
build duration. For teams with manual approval gates or scheduled release windows,
lead time is significantly longer.

## Targets

| Level  | Lead Time for Changes    |
|--------|--------------------------|
| Low    | More than 6 months       |
| Medium | 1 to 6 months            |
| High   | 1 day to 1 week          |
| Elite  | Less than 1 hour         |

These levels are drawn from the DORA *State of DevOps* research. Elite performers
deliver changes to production in under an hour from commit, enabled by fully
automated pipelines and continuous deployment.

## Common pitfalls

- **Measuring only build time.** Lead time includes everything after the commit,
  not only the [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) pipeline. Include manual approval gates, scheduled deployment windows,
  and environment provisioning delays.
- **Ignoring waiting time.** A change might sit in a queue for a release train,
  a change advisory board (CAB) review, or a deployment window. Queue wait
  time is part of lead time and often dominates the total.
- **Tracking requests instead of commits.** Some teams measure from customer request
  to delivery. That measure is valuable, but it conflates backlog prioritization with
  delivery efficiency. Keep this metric focused on the commit-to-production segment.
- **Hiding items from the backlog.** Requests tracked in spreadsheets or side
  channels before entering the backlog distort lead time measurements. Ensure all
  work enters the system of record promptly.
- **Reducing quality to reduce lead time.** Shortening approval processes or
  skipping test stages reduces lead time at the cost of quality. Pair this metric
  with [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) as a guardrail.

## Connection to CD

Lead Time is one of the four DORA metrics and a direct measure of your delivery
pipeline's end-to-end efficiency:

- **Reveals pipeline bottlenecks.** A large gap between build duration and lead time
  points to manual processes, approval queues, or deployment delays. The team can
  target those delays for automation.
- **Measures the cost of failure recovery.** When production breaks, lead time is
  the minimum time to deliver a fix (unless you roll back). Lead time is therefore
  a direct input to [Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}).
- **Drives automation.** The primary way to reduce lead time is to automate every
  step between commit and production. Those steps include build, test, security
  scanning, environment provisioning, deployment, and verification.
- **Reflects deployment strategy.** Teams using continuous deployment have lead
  times measured in minutes. Teams using weekly release trains have lead times
  measured in days. The metric makes the cost of batching visible.
- **Connects speed and stability.** The DORA research shows that elite performers
  achieve both low lead time and low [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}).
  Speed and quality are not trade-offs. They reinforce each other when the
  delivery system is well-designed.

To improve Lead Time:

- Automate the deployment pipeline end to end, eliminating manual gates.
- Replace change advisory board (CAB) reviews with automated policy checks and
  peer review.
- Deploy on every successful build rather than batching changes into release trains.
- Reduce [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) to shrink the largest component of
  lead time.
- Monitor and eliminate environment provisioning delays.
