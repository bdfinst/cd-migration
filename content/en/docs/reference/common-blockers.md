---
title: "Common Blockers"
draft: true
linkTitle: "Common Blockers"
weight: 3
description: >
  Frequently encountered obstacles on the path to CD and how to address them.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

Every team migrating to continuous delivery will encounter obstacles. Some are technical. Most
are not. The blockers listed here are drawn from patterns observed across hundreds of teams
attempting the journey to CD. Recognizing them early helps you address root causes rather than
fight symptoms.

## Work Breakdown Problems

### Stories Too Large

**What it looks like:** User stories regularly take more than a week to complete. Developers
work on a single story for days without integrating. Sprint commitments are frequently missed
because "the story was bigger than we thought."

**Why it blocks CD:** Large stories mean large batches. Large batches mean infrequent
integration. Infrequent integration means painful merges, delayed feedback, and high-risk
deployments. You cannot practice continuous integration -- the prerequisite for CD -- if your
work items take a week.

**What to do:** Adopt vertical slicing. Every story should deliver a thin slice of user-visible
functionality across all layers of the system. Target a maximum of two days from start to
done. See [Work Decomposition](../../foundations/work-decomposition/).

### No Vertical Slicing

**What it looks like:** Stories are organized by technical layer ("build the API," "build the
database schema," "build the UI") rather than by user-visible behavior. Multiple stories must
be completed before anything is demonstrable or testable end-to-end.

**Why it blocks CD:** Horizontal slices cannot be independently deployed or tested. They create
hard dependencies between stories and teams. Nothing is deployable until all layers are
assembled, which forces large-batch releases.

**What to do:** Rewrite stories as vertical slices that deliver end-to-end functionality,
even if the initial slice is minimal. A single form field that saves to the database and
displays a confirmation is a vertical slice. An entire database schema with no UI is not.

## Team Workflow Problems

### Too Much Work in Progress

**What it looks like:** Every developer is working on a different story. The team has 8 items
in progress and 0 items done. Standup meetings are long because everyone has a different
context to report on. Nothing is finished, but everything is started.

**Why it blocks CD:** High WIP destroys flow. When everything is in progress, nothing gets the
focused attention needed to finish. Context switching between items adds overhead. The
delivery pipeline sees sporadic, large commits rather than a steady stream of small ones.

**What to do:** Set explicit WIP limits. A team of 6 developers should have no more than 3-4
items in progress at any time. The goal is to finish work, not to start it. See
[Limiting WIP](../../optimize/limiting-wip/).

### Distant Date Commitments

**What it looks like:** The team has committed to delivering a specific scope by a date months
in the future. The commitment was made before the work was understood. Progress is tracked
against the original plan, and "falling behind" triggers pressure to cut corners.

**Why it blocks CD:** Fixed-scope, fixed-date commitments incentivize large batches. Teams
hoard changes until the deadline, then deploy everything at once. There is no incentive to
deliver incrementally because the commitment is about the whole scope, not about continuous
flow. When the deadline pressure mounts, testing is the first thing cut.

**What to do:** Shift to continuous delivery of small increments. Report progress by showing
working software in production, not by comparing actuals to a Gantt chart. If date commitments
are required by the organization, negotiate on scope rather than on quality.

### Velocity Used as a Productivity Metric

**What it looks like:** Management tracks story points completed per sprint as a measure of
team productivity. Teams are compared by velocity. There is pressure to increase velocity
every sprint.

**Why it blocks CD:** When velocity is a target, it ceases to be a useful measure (Goodhart's
Law). Teams inflate estimates to look productive. Stories get larger because larger stories
have more points. The incentive is to maximize points, not to deliver small, frequent, valuable
changes to production.

**What to do:** Replace velocity with [DORA metrics](../dora-capabilities/) -- deployment
frequency, lead time, change failure rate, and mean time to restore. These measure delivery
outcomes rather than output volume.

## Manual Testing Gates

### Hardening Sprints

**What it looks like:** The team allocates one or more sprints after "feature complete" to
stabilize, fix bugs, and prepare for release. Code is frozen during hardening. Testers run
manual regression suites. Bug counts are tracked on a burndown chart.

**Why it blocks CD:** A hardening sprint is an admission that the normal development process
does not produce deployable software. If you need a dedicated period to make code
production-ready, you are not continuously delivering -- you are doing waterfall with shorter
phases. Hardening sprints add weeks of delay and encourage teams to accumulate technical debt
during feature sprints because "we'll fix it in hardening."

**What to do:** Eliminate the need for hardening by building quality in. Adopt TDD to ensure
test coverage. Use a CI pipeline that runs the full test suite on every commit. Define
"deployable" as an automated pipeline outcome, not as a manual assessment. See
[Testing Fundamentals](../../foundations/testing-fundamentals/) and
[Deployable Definition](../../pipeline/deployable-definition/).

### Manual Regression Testing

**What it looks like:** Every release requires a manual regression test cycle that takes days
or weeks. Testers execute scripted test cases against the application. New features are tested
manually before they are considered done.

**Why it blocks CD:** Manual regression testing scales linearly with application size and
inversely with delivery frequency. The more features you add, the longer regression takes.
The longer regression takes, the less frequently you can deploy. This is the opposite of CD.

**What to do:** Automate regression tests. Not all at once -- start with the highest-risk
areas and the tests that block deployments most frequently. Your automated test suite should
give you the same confidence as manual regression, but in minutes rather than days. See
[Testing Fundamentals](../../foundations/testing-fundamentals/).

## Organizational Anti-Patterns

### Meaningless Retrospectives

**What it looks like:** Retrospectives happen on schedule, but action items are never
completed. The same problems surface every sprint. The team has stopped believing that
retrospectives lead to change.

**Why it blocks CD:** CD requires continuous improvement. If the mechanism for identifying and
addressing process problems is broken, systemic issues accumulate. The same blockers will
persist indefinitely.

**What to do:** Limit retrospective action items to one or two per sprint and track them as
work items with the same visibility as feature work. Make the action items specific and
completable. "Improve testing" is not an action item. "Automate the login flow regression
test" is. See [Retrospectives](../../optimize/retrospectives/).

### Team Instability

**What it looks like:** Team members are frequently reassigned to other projects. New people
join and leave every few sprints. The team never builds shared context or working agreements.

**Why it blocks CD:** CD practices depend on team discipline and shared understanding. TBD
requires trust between developers. Code review speed depends on familiarity with the codebase.
Working agreements require a stable group to establish and maintain. Constantly reshuffling
teams means constantly restarting the journey.

**What to do:** Advocate for stable, long-lived teams. The team should own a product or service
for its full lifecycle, not be assembled for a project and disbanded when it ends.

### One Delivery per Sprint

**What it looks like:** The team delivers to production once per sprint, typically at the end.
All stories from the sprint are bundled into a single release. The "sprint demo" is the first
time stakeholders see working software.

**Why it blocks CD:** One delivery per sprint is not continuous delivery. It is a two-week batch
release with Agile terminology. If something breaks in the batch, any of the changes could be
the cause. Rollback means losing the entire sprint's work. Feedback is delayed by weeks.

**What to do:** Start deploying individual stories as they are completed, not at the end of
the sprint. This requires a working CI pipeline, trunk-based development, and the ability to
deploy independently. These are the outcomes of [Phase 1](../../foundations/) and
[Phase 2](../../pipeline/).

## Anti-Patterns Summary

The table below maps each common blocker to its root cause and the migration phase that
addresses it.

| Blocker | Root Cause | Migration Phase |
|---------|-----------|-----------------|
| Stories take a week or more | No vertical slicing discipline | [Phase 1 -- Work Decomposition](../../foundations/work-decomposition/) |
| Too much WIP | No WIP limits; starting over finishing | [Phase 3 -- Limiting WIP](../../optimize/limiting-wip/) |
| Hardening sprints | Quality not built in during development | [Phase 1 -- Testing Fundamentals](../../foundations/testing-fundamentals/) |
| Manual regression testing | Test automation insufficient | [Phase 1 -- Testing Fundamentals](../../foundations/testing-fundamentals/) |
| One delivery per sprint | Batch mindset; no pipeline | [Phase 2 -- Pipeline](../../pipeline/) |
| Meaningless retrospectives | No accountability for improvement actions | [Phase 3 -- Retrospectives](../../optimize/retrospectives/) |
| Velocity as productivity metric | Measuring output instead of outcomes | [Phase 3 -- Metrics-Driven Improvement](../../optimize/metrics-driven-improvement/) |
| Team instability | Organizational project-based staffing | Organizational change (all phases) |
| Distant date commitments | Fixed-scope commitments made too early | Incremental delivery + stakeholder education |
| Flaky tests tolerated | Tests not maintained as production code | [Phase 1 -- Testing Fundamentals](../../foundations/testing-fundamentals/) |
| Long-lived feature branches | No TBD practice | [Phase 1 -- Trunk-Based Development](../../foundations/trunk-based-development/) |
| Manual deployments | No deployment automation | [Phase 2 -- Single Path to Production](../../pipeline/single-path-to-production/) |

{{% alert title="Where to Start" %}}
If you recognize many of these blockers in your team, do not try to address them all at once.
Use the [CD Dependency Tree](../cd-dependency-tree/) to understand which practices are
prerequisite to others, and use your [value stream map](../../assess/value-stream-mapping/)
to identify which blocker is the current constraint. Fix the biggest constraint first, then
move to the next.
{{% /alert %}}

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
