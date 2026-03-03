---
title: "Integration Frequency"
linkTitle: "Integration Frequency"
weight: 1
description: >
  How often developers integrate code changes to the trunk. A leading indicator of CI maturity and small batch delivery.
---

## Definition

Integration Frequency measures the average number of production-ready pull requests
a team merges to trunk per day, normalized by team size. On a team of five
developers, healthy [continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) practice produces at least five
integrations per day, roughly one per developer.

This metric is a direct indicator of how well a team practices
[Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html).
Teams that integrate frequently work in small batches, receive fast feedback, and
reduce the risk associated with large, infrequent merges.

{{< card code=true header="**Integration Frequency formula**" lang="text" >}}
integrationFrequency = mergedPullRequests / day / numberOfDevelopers
{{< /card >}}

A value of 1.0 or higher per developer per day indicates that work is being
decomposed into small, independently deliverable increments.

## How to Measure

1. **Count trunk merges.** Track the number of pull requests (or direct commits)
   merged to `main` or `trunk` each day.
2. **Normalize by team size.** Divide the daily count by the number of developers
   actively contributing that day.
3. **Calculate the rolling average.** Use a 5-day or 10-day rolling window to
   smooth daily variation and surface meaningful trends.

Most source control platforms expose this data through their APIs:

- **GitHub:** list merged pull requests via the REST or GraphQL API.
- **GitLab:** query merged merge requests per project.
- **Bitbucket:** use the pull request activity endpoint.

Alternatively, count commits to the default branch if pull requests are not used.

## Targets

| Level  | Integration Frequency (per developer per day) |
|--------|-----------------------------------------------|
| Low    | Less than 1 per week                          |
| Medium | A few times per week                          |
| High   | Once per day                                  |
| Elite  | Multiple times per day                        |

The elite target aligns with [trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}), where developers push small
changes to the trunk multiple times daily and rely on automated testing and feature
flags to manage risk.

## Common Pitfalls

- **Meaningless commits.** Teams may inflate the count by integrating trivial or
  empty changes. Pair this metric with code review quality and defect rate.
- **Breaking the trunk.** Pushing faster without adequate test coverage leads to a
  red build and slows the entire team. Always pair Integration Frequency with build
  success rate and [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}).
- **Counting the wrong thing.** Merges to long-lived feature branches do not count.
  Only merges to the trunk or main integration branch reflect true [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) practice.
- **Ignoring quality.** If [defect rates]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) rise as integration
  frequency increases, the team is skipping quality steps. Use defect rate as a
  guardrail metric.

## Connection to CD

Integration Frequency is the foundational metric for [Continuous Delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}). Without
frequent integration, every downstream metric suffers:

- **Smaller batches reduce risk.** Each integration carries less change, making
  failures easier to diagnose and fix.
- **Faster feedback loops.** Frequent integration means the CI pipeline runs more
  often, catching issues within minutes instead of days.
- **Enables trunk-based development.** High integration frequency is incompatible
  with long-lived branches. Teams naturally move toward short-lived branches or
  direct trunk commits.
- **Reduces merge conflicts.** The longer code stays on a branch, the more likely
  it diverges from trunk. Frequent integration keeps the delta small.
- **Prerequisite for [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}).** You cannot deploy more often than you
  integrate. Improving this metric directly unblocks improvements to
  [Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}).

To improve Integration Frequency:

- Decompose stories into smaller increments using
  [Behavior-Driven Development]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}).
- Use [Test-Driven Development]({{< relref "/docs/reference/glossary#tdd-test-driven-development" >}}) to produce modular, independently testable code.
- Adopt [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}) or branch by abstraction to decouple integration from release.
- Practice [Trunk-Based Development](https://trunkbaseddevelopment.com/) with
  short-lived branches lasting less than one day.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
