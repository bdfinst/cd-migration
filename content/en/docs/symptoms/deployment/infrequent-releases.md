---
aliases:
  - /docs/symptoms/infrequent-releases/
title: "Releases Are Infrequent and Painful"
linkTitle: "Infrequent, painful releases"
description: >
  Deploying happens monthly, quarterly, or less. Each release is a large, risky event that
  requires war rooms and weekend work.
tags:
  - deployment-automation
  - batch-size
  - process-gates
---

## What you are seeing

The team deploys once a month, once a quarter, or on some irregular cadence that nobody can
predict. Each release is a significant event. There is a release planning meeting, a deployment
runbook, a designated release manager, and often a war room during the actual deploy. People
cancel plans for release weekends.

Between releases, changes pile up. By the time the release goes out, it contains dozens or
hundreds of changes from multiple developers. Nobody can confidently say what is in the release
without checking a spreadsheet or release notes document. When something breaks in production, the
team spends hours narrowing down which of the many changes caused the problem.

The team wants to release more often but feels trapped. Each release is so painful that adding
more releases feels like adding more pain.

## Common causes

### Manual Deployments

When deployment requires a human to execute steps (SSH into servers, run scripts, click through a
console), the process is slow, error-prone, and dependent on specific people being available. The
cost of each deployment is high enough that the team batches changes to amortize it. The batch
grows, the risk grows, and the release becomes an event rather than a routine.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing Deployment Pipeline

When there is no automated path from commit to production, every release requires manual
coordination of builds, tests, and deployments. Without a pipeline, the team cannot deploy on
demand because the process itself does not exist in a repeatable form.

**Read more:** [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### CAB Gates

When every production change requires committee approval, the approval cadence sets the release
cadence. If the Change Advisory Board meets weekly, releases happen weekly at best. If the meeting
is biweekly, releases are biweekly. The team cannot deploy faster than the approval process
allows, regardless of technical capability.

**Read more:** [CAB Gates](../../anti-patterns/organizational-cultural/cab-gates/)

### Monolithic Work Items

When work is not decomposed into small, independently deployable increments, each "feature" is a
large batch of changes that takes weeks to complete. The team cannot release until the feature is
done, and the feature is never done quickly because it was scoped too large. Small batches enable
frequent releases. Large batches force infrequent ones.

**Read more:** [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/)

### Manual Regression Testing Gates

When every release requires a manual test pass that takes days or weeks, the testing cadence
limits the release cadence. The team cannot release until QA finishes, and QA cannot finish faster
because the test suite is manual and grows with every feature.

**Read more:** [Manual Regression Testing Gates](../../anti-patterns/testing/manual-regression-testing-gates/)

## How to narrow it down

1. **Is the deployment process automated?** If deploying requires human steps beyond pressing a
   button, the process itself is the bottleneck. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does a pipeline exist that can take code from commit to production?** If not, the team cannot
   release on demand because the infrastructure does not exist. Start with
   [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Does a committee or approval board gate production changes?** If releases wait for scheduled
   approval meetings, the approval cadence is the constraint. Start with
   [CAB Gates](../../anti-patterns/organizational-cultural/cab-gates/).
4. **How large is the typical work item?** If features take weeks and are delivered as single
   units, the batch size is the constraint. Start with
   [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/).
5. **Does a manual test pass gate every release?** If QA takes days per release, the testing
   process is the constraint. Start with
   [Manual Regression Testing Gates](../../anti-patterns/testing/manual-regression-testing-gates/).
