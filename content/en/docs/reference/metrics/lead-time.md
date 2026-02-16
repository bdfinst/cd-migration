---
title: "Lead Time"
linkTitle: "Lead Time"
weight: 4
description: >
  Total time from when a change is committed until it is running in production -- a DORA key metric for delivery throughput.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

Lead Time measures the total elapsed time from when a code change is committed to
the version control system until that change is successfully running in production.
This is one of the four key metrics identified by the DORA (DevOps Research and
Assessment) team as a predictor of software delivery performance.

```text
leadTime = productionDeployTimestamp - commitTimestamp
```

In the broader value stream, "lead time" can also refer to the time from a customer
request to delivery. The DORA definition focuses specifically on the segment from
commit to production, which the *Accelerate* research calls "lead time for changes."
This narrower definition captures the efficiency of your delivery pipeline and
deployment process.

Lead Time includes [Build Duration](../build-duration/) plus any additional time
for deployment, approval gates, environment provisioning, and post-deploy
verification. It is a superset of build time and a subset of
[Development Cycle Time](../development-cycle-time/), which also includes the
coding phase before the first commit.

## How to Measure

1. **Record the commit timestamp.** Use the timestamp of the commit as recorded in
   source control (not the local author timestamp, but the time it was pushed or
   merged to the trunk).
2. **Record the production deployment timestamp.** Capture when the deployment
   containing that commit completes successfully in production.
3. **Calculate the difference.** Subtract the commit time from the deploy time.
4. **Aggregate across commits.** Report the median lead time across all commits
   deployed in a given period (daily, weekly, or per release).

Data sources:

- **Source control** -- commit or merge timestamps from Git, GitHub, GitLab, etc.
- **Pipeline platform** -- pipeline completion times from Jenkins, GitHub Actions,
  GitLab CI, etc.
- **Deployment tooling** -- production deployment timestamps from Argo CD, Spinnaker,
  Flux, or custom scripts.

For teams practicing continuous deployment, lead time may be nearly identical to
build duration. For teams with manual approval gates or scheduled release windows,
lead time will be significantly longer.

## Targets

| Level  | Lead Time for Changes    |
|--------|--------------------------|
| Low    | More than 6 months       |
| Medium | 1 -- 6 months            |
| High   | 1 day -- 1 week          |
| Elite  | Less than 1 hour         |

These levels are drawn from the DORA *State of DevOps* research. Elite performers
deliver changes to production in under an hour from commit, enabled by fully
automated pipelines and continuous deployment.

## Common Pitfalls

- **Measuring only build time.** Lead time includes everything after the commit,
  not just the CI pipeline. Manual approval gates, scheduled deployment windows,
  and environment provisioning delays must all be included.
- **Ignoring waiting time.** A change may sit in a queue waiting for a release
  train, a change advisory board (CAB) review, or a deployment window. This wait
  time is part of lead time and often dominates the total.
- **Tracking requests instead of commits.** Some teams measure from customer request
  to delivery. While valuable, this conflates backlog prioritization with delivery
  efficiency. Keep this metric focused on the commit-to-production segment.
- **Hiding items from the backlog.** Requests tracked in spreadsheets or side
  channels before entering the backlog distort lead time measurements. Ensure all
  work enters the system of record promptly.
- **Reducing quality to reduce lead time.** Shortening approval processes or
  skipping test stages reduces lead time at the cost of quality. Pair this metric
  with [Change Fail Rate](../change-fail-rate/) as a guardrail.

## Connection to CD

Lead Time is one of the four DORA metrics and a direct measure of your delivery
pipeline's end-to-end efficiency:

- **Reveals pipeline bottlenecks.** A large gap between build duration and lead time
  points to manual processes, approval queues, or deployment delays that the team
  can target for automation.
- **Measures the cost of failure recovery.** When production breaks, lead time is
  the minimum time to deliver a fix (unless you roll back). This makes lead time
  a direct input to [Mean Time to Repair](../mean-time-to-repair/).
- **Drives automation.** The primary way to reduce lead time is to automate every
  step between commit and production: build, test, security scanning, environment
  provisioning, deployment, and verification.
- **Reflects deployment strategy.** Teams using continuous deployment have lead
  times measured in minutes. Teams using weekly release trains have lead times
  measured in days. The metric makes the cost of batching visible.
- **Connects speed and stability.** The DORA research shows that elite performers
  achieve both low lead time and low [Change Fail Rate](../change-fail-rate/).
  Speed and quality are not trade-offs -- they reinforce each other when the
  delivery system is well-designed.

To improve Lead Time:

- Automate the deployment pipeline end to end, eliminating manual gates.
- Replace change advisory board (CAB) reviews with automated policy checks and
  peer review.
- Deploy on every successful build rather than batching changes into release trains.
- Reduce [Build Duration](../build-duration/) to shrink the largest component of
  lead time.
- Monitor and eliminate environment provisioning delays.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
