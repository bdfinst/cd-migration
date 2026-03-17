---
title: "Release Frequency"
linkTitle: "Release Frequency"
weight: 7
description: >
  How often changes are deployed to production. A DORA lagging outcome metric that confirms delivery throughput.
---

## Definition

Release Frequency (also called [Deployment Frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}})) measures how often a team
successfully deploys changes to production. It is expressed as deployments per day,
per week, or per month, depending on the team's current cadence.

{{< card code=true header="**Release Frequency formula**" lang="text" >}}
releaseFrequency = productionDeployments / timePeriod
{{< /card >}}

This is one of the four [DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}}) key metrics and a lagging outcome metric. It reflects the
cumulative effect of upstream behaviors: work decomposition, integration practices, test
quality, and pipeline automation. Higher release frequency is a consequence of those behaviors
improving, not a lever to pull directly. To improve release frequency, improve
[Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) and
[Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) first.

Each deployment should deliver a meaningful change. Re-deploying the same artifact
or deploying empty changes does not count.

## How to Measure

1. **Count production deployments.** Record each successful deployment to the
   production environment over a defined period.
2. **Exclude non-changes.** Do not count re-deployments of unchanged artifacts,
   infrastructure-only changes (unless relevant), or deployments to non-production
   environments.
3. **Calculate frequency.** Divide the count by the time period. Express as
   deployments per day (for high performers) or per week/month (for teams earlier
   in their journey).

Data sources:

- **[CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) platforms:** Argo CD, Spinnaker, Flux, Octopus Deploy, or similar tools
  track every deployment.
- **[Pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) logs:** GitHub Actions, GitLab CI, Jenkins, and CircleCI
  record deployment job executions.
- **Cloud provider logs:** AWS CodeDeploy, Azure DevOps, GCP Cloud Deploy, and
  Kubernetes audit logs.
- **Custom deployment scripts:** Add a logging line that records the timestamp,
  service name, and version to a central log or metrics system.

## Targets

| Level  | Release Frequency              |
|--------|--------------------------------|
| Low    | Less than once per 6 months    |
| Medium | Once per month to once per 6 months |
| High   | Once per week to once per month |
| Elite  | Multiple times per day         |

These levels are drawn from the DORA *State of DevOps* research. Elite performers
deploy on demand, multiple times per day, with each deployment containing a small
set of changes.

## Common Pitfalls

- **Counting empty deployments.** Re-deploying the same artifact or building
  artifacts that contain no changes inflates the metric without delivering value.
  Count only deployments with meaningful changes.
- **Ignoring failed deployments.** If you count deployments that are immediately
  rolled back, the frequency looks good but the quality is poor. Pair with
  [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) to get the full picture.
- **Equating frequency with value.** Deploying frequently is a means, not an end.
  Deploying 10 times a day delivers no value if the changes do not meet user needs.
  Release Frequency measures capability, not outcome.
- **Batch releasing to hit a target.** Combining multiple changes into a single
  release to deploy "more often" defeats the purpose. The goal is small, individual
  changes flowing through the pipeline independently.
- **Focusing on speed without quality.** If release frequency increases but
  [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) also increases, the team is releasing
  faster than its quality processes can support. Slow down and improve the pipeline.

## Connection to CD

Release Frequency is the ultimate output metric of a Continuous Delivery pipeline:

- **Validates the entire delivery system.** High release frequency is only possible
  when the pipeline is fast, tests are reliable, deployment is automated, and the
  team has confidence in the process. It is the end-to-end proof that CD is working.
- **Reduces deployment risk.** Each deployment carries less change when deployments
  are frequent. Less change means less risk, easier [rollback]({{< relref "/docs/reference/glossary#rollback" >}}), and simpler
  debugging when something goes wrong.
- **Enables rapid feedback.** Frequent releases get features and fixes in front of
  users sooner. This shortens the feedback loop and allows the team to course-correct
  before investing heavily in the wrong direction.
- **Exercises recovery capability.** Teams that deploy frequently practice the
  deployment process daily. When a production incident occurs, the deployment
  process is well-rehearsed and reliable, directly improving
  [Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}).
- **Decouples deploy from release.** At high frequency, teams separate the act of
  deploying code from the act of enabling features for users. Feature flags,
  progressive delivery, and dark launches become standard practice.

To improve Release Frequency:

- Reduce [Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) by decomposing work
  into smaller increments.
- Remove manual handoffs to other teams (e.g., ops, QA, change management).
- Automate every step of the deployment process, from build through production
  verification.
- Replace manual change approval boards with automated policy checks and peer
  review.
- Convert hard dependencies on other teams or services into soft dependencies using
  feature flags and service virtualization.
- Adopt [Trunk-Based Development](https://trunkbaseddevelopment.com/) so that
  trunk is always in a deployable state.
