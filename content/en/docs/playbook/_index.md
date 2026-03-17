---
title: "Improvement Plays"
linkTitle: "Improvement Plays"
weight: 7
description: >
  Focused, standalone improvement plays teams can run independently or as part of a larger CD migration.
---

{{% pageinfo %}}
Each play targets a common delivery challenge. You can run any play in isolation or stack several as part of a broader improvement push. Most take one sprint or less to get the first results.
{{% /pageinfo %}}

## Baseline Your Delivery Metrics

**What:** Capture two sets of numbers before making any other changes: CI health metrics
([integration frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}), build success rate, time to fix a broken build) and the four
[DORA metrics]({{< relref "/docs/reference/glossary#dora-metrics" >}}) ([deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}), [lead time for changes]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}}), [change failure rate]({{< relref "/docs/reference/glossary#change-failure-rate-cfr" >}}), [mean time to restore]({{< relref "/docs/reference/glossary#mean-time-to-restore-mttr" >}})).

**Why:** CI health metrics are leading indicators - they move immediately when team behaviors change
and surface problems while they are still small. DORA metrics are lagging outcomes - they confirm
that improvement is compounding into better delivery performance. You need both.

**How to measure success:** You have numbers for all seven metrics written down and dated. The team
tracks CI health metrics weekly to drive improvement experiments. DORA metrics are reviewed monthly
to confirm progress.

**Resources:** [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}) - [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - [DORA Metrics Reference]({{< relref "/docs/reference/metrics" >}})

---

## Run a Story Slicing Workshop

**What:** In one sprint planning session, take every story estimated at more than 2 days and break it into vertical slices that each deliver testable behavior. Do not start any story that fails this check.

**Why:** Large stories are the hidden root cause of delayed integration, painful code reviews, and long lead times. A team that cannot slice stories cannot do CD. This is the foundational skill.

**How to measure success:** Average story cycle time drops below 2 days within two sprints. [Work in progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) count decreases.

**Resources:** [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}) - [Horizontal Slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}})

---

## Stop the Line on a Broken Pipeline

**What:** For one sprint, enforce a team rule: nothing moves forward when the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) is red. The whole team stops and fixes it before picking up new work.

**Why:** A pipeline that is sometimes broken is untrustworthy. Teams learn to ignore failures, which means they learn to ignore feedback. A consistently green pipeline is the foundation [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) depends on.

**How to measure success:** Pipeline failure time (time the pipeline spends red) drops to near zero. Time-to-fix when failures do occur shortens to under 10 minutes.

**Resources:** [Flaky Tests]({{< relref "/docs/symptoms/testing/flaky-tests" >}}) - [Slow Pipelines]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}) - [Deterministic Pipeline]({{< relref "/docs/reference/practices/deterministic-pipeline" >}})

---

## Delete Your Long-Lived Branches

**What:** Identify every branch that has been open for more than 3 days. Merge or delete each one this week. Going forward, set a team rule that no branch lives longer than one day before integrating to trunk.

**Why:** Long-lived branches are integration debt. Every day a branch stays open, merging it back gets more expensive. The pain is not caused by merging - it is caused by waiting to merge.

**How to measure success:** No branches older than 1 day. Merge conflict time drops to near zero. [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) decreases.

**Resources:** [Trunk-Based Development]({{< relref "/docs/reference/practices/trunk-based-development" >}}) - [Merging Is Painful]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}}) - [Resistance to Trunk-Based Development]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}})

---

## Add a Test Before Fixing the Next Bug

**What:** Before fixing any bug, write a failing automated test that reproduces it first. Then make the test pass. Apply this rule to every bug fixed from this point forward.

**Why:** Bugs without tests get reintroduced. This builds test coverage organically where it matters most - in the failure modes your system has already demonstrated. It requires no upfront investment and delivers immediate value.

**How to measure success:** Defect recurrence rate drops. The team can point to a test for every recent bug fix. Coverage grows on critical paths without a dedicated "write tests" project.

**Resources:** [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - [Legacy System With No Tests]({{< relref "/docs/symptoms/testing/legacy-system-no-tests" >}}) - [High Coverage but Tests Miss Defects]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}})

---

## Remove One Manual Step from Your Pipeline

**What:** Map every step in your deployment process. Pick the one manual step that takes the most time or requires the most coordination. Automate it this sprint.

**Why:** Manual steps create friction, variation, and key-person dependencies. Each one is a deployment delay that compounds over time. Removing one makes the next one easier to see and remove.

**How to measure success:** That deployment step no longer requires a person. Deployment time decreases. The specific bottleneck person is no longer needed for that step.

**Resources:** [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) - [Single Path to Production]({{< relref "/docs/reference/practices/single-path-to-production" >}}) - [Release Manager Bottleneck]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}})

---

## Limit Work in Progress

**What:** For one sprint, enforce a rule: each developer works on one story at a time to completion before starting another. No story is in progress unless someone is actively working on it right now.

**Why:** [WIP]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}) is the primary driver of long lead times. Every item sitting in-progress but not being worked on extends the queue for everything behind it. Reducing WIP is often the fastest path to faster delivery.

**How to measure success:** [Lead time for changes]({{< relref "/docs/reference/metrics/lead-time" >}}) decreases within 2-3 sprints. Fewer stories carry over between sprints.

**Resources:** [Too Much WIP]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - [Work in Progress Metric]({{< relref "/docs/reference/metrics/work-in-progress" >}}) - [Work Items Take Too Long]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}})

---

## Switch from Assigning Work to Pulling Work

**What:** Stop pre-assigning stories to individuals at sprint planning. Instead, order the backlog
by priority, leave all items unassigned, and have developers pull the top available item whenever
they need work - swarming to help finish in-progress items before starting anything new.

**Why:** Push-based assignment optimizes for keeping individuals busy, not for finishing work.
It creates knowledge silos, hides bottlenecks, and makes code review feel like a distraction
from "my stories." Pull-based work makes bottlenecks visible, self-balances workloads, and
aligns the whole team around completing the highest-priority item.

**How to measure success:** Pre-assigned stories at sprint start drops to near zero. [Work in
progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) decreases. [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) shortens within 2-3 sprints as
swarming increases. Knowledge of the codebase broadens across the team over time.

**Resources:** [Push-Based Work Assignment]({{< relref "/docs/anti-patterns/team-workflow/push-based-work-assignment" >}}) - [Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}) - [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})

---

## Write Your Definition of Deployable

**What:** As a team, decide and document exactly what "ready to deploy to production" means. List every criterion. Automate as many as possible as pipeline gates.

**Why:** Without a shared definition, "deployable" means whatever the most risk-averse person in the room decides at the moment. This creates deployment anxiety and inconsistency that blocks CD. A written, automated definition removes the ambiguity.

**How to measure success:** Deployment decisions are consistent across team members. No deployment is blocked by a subjective manual checklist. The criteria are enforced in the pipeline, not in a meeting.

**Resources:** [Definition of Deployable]({{< relref "/docs/reference/practices/definition-of-deployable" >}}) - [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - [Change Management Overhead]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}})
