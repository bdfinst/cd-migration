---
title: "Development Cycle Time"
linkTitle: "Development Cycle Time"
weight: 3
description: >
  Average time from when work starts until it is running in production. A key flow metric for identifying delivery bottlenecks.
---

## Definition

Development Cycle Time measures the elapsed time from when a developer begins work
on a story or task until that work is deployed to production and available to users.
It captures the full construction phase of delivery: coding, code review, testing,
integration, and deployment.

{{< card code=true header="**Development Cycle Time formula**" lang="text" >}}
developmentCycleTime = productionDeployTimestamp - workStartedTimestamp
{{< /card >}}

This is distinct from [Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}), which includes the time a request
spends waiting in the backlog before work begins. Development Cycle Time focuses
exclusively on the active delivery phase.

The *Accelerate* research uses "[lead time for changes]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}})" (measured from commit to
production) as a key [DORA]({{< relref "/docs/reference/glossary#dora-metrics" >}}) metric. Development Cycle Time extends this slightly
further back to when work starts, capturing the full development process including
any time between starting work and the first commit.

## How to Measure

1. **Record when work starts.** Capture the timestamp when a story moves to
   "In Progress" in your issue tracker, or when the first commit for the story
   appears.
2. **Record when work reaches production.** Capture the timestamp of the
   production deployment that includes the completed story.
3. **Calculate the difference.** Subtract the start time from the production
   deploy time.
4. **Report the median and distribution.** The median provides a typical value.
   The distribution (or a control chart) reveals variability and outliers that
   indicate process problems.

Sources for this data include:

- **Issue trackers** (Jira, GitHub Issues, Azure Boards): status transition
  timestamps.
- **Source control:** first commit timestamp associated with a story.
- **Deployment logs:** timestamp of production deployments linked to stories.

Linking stories to deployments is essential. Use commit message conventions (e.g.,
story IDs in commit messages) or deployment metadata to create this connection.

## Targets

| Level  | Development Cycle Time |
|--------|------------------------|
| Low    | More than 2 weeks      |
| Medium | 1 to 2 weeks           |
| High   | 2 to 7 days            |
| Elite  | Less than 2 days       |

Elite teams deliver completed work to production within one to two days of starting
it. This is achievable only when work is decomposed into small increments, the
[pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) is fast, and deployment is automated.

## Common Pitfalls

- **Marking work "Done" before it reaches production.** If "Done" means "code
  complete" rather than "deployed," the metric understates actual cycle time. The
  Definition of Done must include production deployment.
- **Skipping the backlog.** Moving items from "Backlog" directly to "Done" after
  deploying hides the true wait time and development duration. Ensure stories pass
  through the standard workflow stages.
- **Splitting work into functional tasks.** Breaking a story into separate
  "development," "testing," and "deployment" tasks obscures the end-to-end cycle
  time. Measure at the story or feature level.
- **Ignoring variability.** A low average can hide a bimodal distribution where
  some stories take hours and others take weeks. Use a control chart or histogram
  to expose the full picture.
- **Optimizing for speed without quality.** If cycle time drops but
  [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) rises, the team is cutting corners.
  Use quality metrics as guardrails.

## Connection to CD

Development Cycle Time is the most comprehensive measure of delivery flow and sits
at the heart of [Continuous Delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}):

- **Exposes bottlenecks.** A long cycle time reveals where work gets stuck:
  waiting for code review, queued for testing, blocked by a manual approval, or
  delayed by a slow pipeline. Each bottleneck is a target for improvement.
- **Drives smaller batches.** The only way to achieve a cycle time under two days
  is to decompose work into very small increments. This naturally leads to smaller
  changes, less risk, and faster feedback.
- **Reduces waste from changing priorities.** Long cycle times mean [work in progress]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}})
  is exposed to priority changes, context switches, and scope creep. Shorter cycles
  reduce the window of vulnerability.
- **Improves feedback quality.** The sooner a change reaches production, the sooner
  the team gets real user feedback. Short cycle times enable rapid learning and
  course correction.
- **Subsumes other metrics.** Cycle time is affected by [Integration
  Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}), [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}),
  and [Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}). Improving any of these upstream
  metrics will reduce cycle time.

To improve Development Cycle Time:

- Decompose work into stories that can be completed and deployed within one to two
  days.
- Remove handoffs between teams (e.g., separate dev and QA teams).
- Automate the build and deploy pipeline to eliminate manual steps.
- Improve test design so the pipeline runs faster without sacrificing coverage.
- Limit [Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) so the team focuses on finishing
  work rather than starting new items.
