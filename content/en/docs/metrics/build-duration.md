---
title: "Build Duration"
linkTitle: "Build Duration"
weight: 2
description: >
  Time from code commit to a deployable artifact. A critical constraint on feedback speed and mean time to repair.
---

## Definition

Build Duration measures the elapsed time from when a developer pushes a commit
until the [CI](../glossary/#ci-continuous-integration) [pipeline](../glossary/#pipeline) produces a deployable [artifact](../glossary/#artifact) and all automated quality
gates have passed. This includes compilation, unit tests, integration tests, static
analysis, security scans, and artifact packaging.

Build Duration represents the minimum possible time between deciding to make a
change and having that change ready for production. It sets a hard floor on
[Lead Time](../lead-time/) and directly constrains how quickly a team can
respond to production incidents.

{{% code-collapse title="Build Duration formula" %}}
```text
buildDuration = artifactReadyTimestamp - commitPushTimestamp
```
{{% /code-collapse %}}

This metric is sometimes referred to as "pipeline cycle time" or "CI cycle time."
The book *Accelerate* references it as part of "hard lead time."

## How to Measure

1. **Record the commit timestamp.** Capture when the commit arrives at the CI
   server (webhook receipt or pipeline trigger time).
2. **Record the artifact-ready timestamp.** Capture when the final pipeline stage
   completes successfully and the deployable artifact is published.
3. **Calculate the difference.** Subtract the commit timestamp from the
   artifact-ready timestamp.
4. **Track the median and p95.** The median shows typical performance. The 95th
   percentile reveals worst-case builds that block developers.

Most CI platforms expose build duration natively:

- **GitHub Actions:** `createdAt` and `updatedAt` on workflow runs.
- **GitLab CI:** pipeline `created_at` and `finished_at`.
- **Jenkins:** build start time and duration fields.
- **CircleCI:** workflow duration in the Insights dashboard.

Set up alerts when builds exceed your target threshold so the team can investigate
regressions immediately.

## Targets

| Level  | Build Duration     |
|--------|--------------------|
| Low    | More than 30 minutes |
| Medium | 10 to 30 minutes   |
| High   | 5 to 10 minutes    |
| Elite  | Less than 5 minutes |

The ten-minute threshold is a widely recognized guideline. Builds longer than ten
minutes break developer flow, discourage frequent integration, and increase the
cost of fixing failures.

## Common Pitfalls

- **Removing tests to hit targets.** Reducing test count or skipping test types
  (integration, security) lowers build duration but degrades quality. Always pair
  this metric with [Change Fail Rate](../change-fail-rate/) and defect rate.
- **Ignoring queue time.** If builds wait in a queue before execution, the
  developer experiences the queue time as part of the feedback delay even though it
  is not technically "build" time. Measure wall-clock time from commit to result.
- **Optimizing the wrong stage.** Profile the pipeline before optimizing. Often a
  single slow test suite or a sequential step that could run in parallel dominates
  the total duration.
- **Flaky tests.** Tests that intermittently fail cause retries, effectively
  doubling or tripling build duration. Track flake rate alongside build duration.

## Connection to CD

Build Duration is a critical bottleneck in the [Continuous Delivery](../glossary/#cd-continuous-delivery) pipeline:

- **Constrains Mean Time to Repair.** When production is down, the build pipeline
  is the minimum time to get a fix deployed. A 30-minute build means at least 30
  minutes of downtime for any fix, no matter how small. Reducing build duration
  directly improves [MTTR](../mean-time-to-repair/).
- **Enables frequent integration.** Developers are unlikely to integrate multiple
  times per day if each integration takes 30 minutes to validate. Short builds
  encourage higher [Integration Frequency](../integration-frequency/).
- **Shortens feedback loops.** The sooner a developer learns that a change broke
  something, the less context they have lost and the cheaper the fix. Builds under
  ten minutes keep developers in flow.
- **Supports [continuous deployment](../glossary/#continuous-deployment).** Automated deployment pipelines cannot deliver
  changes rapidly if the build stage is slow. Build duration is often the largest
  component of [Lead Time](../lead-time/).

To improve Build Duration:

- **Parallelize stages.** Run unit tests, linting, and security scans concurrently
  rather than sequentially.
- **Replace slow end-to-end tests.** Move heavyweight end-to-end tests to an
  asynchronous post-deploy verification stage. Use contract tests and service
  virtualization in the main pipeline.
- **Decompose large services.** Smaller codebases compile and test faster. If build
  duration is stubbornly high, consider breaking the service into smaller domains.
- **Cache aggressively.** Cache dependencies, Docker layers, and compilation
  artifacts between builds.
- **Set a build time budget.** Alert the team whenever a new test or step pushes
  the build past your target, so test efficiency is continuously maintained.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
