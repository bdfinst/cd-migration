---
title: "Undone Work"
linkTitle: "Undone Work"
weight: 33
category: "Team Workflow"
risk_level: high
description: >
  Work is marked complete before it is truly done. Hidden steps remain after the story is
  closed, including testing, validation, or deployment that someone else must finish.
tags:
  - process-gates
  - work-decomposition
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A developer moves a story to "Done." The code is merged. The pull request is closed. But the
feature is not actually in production. It is waiting for a downstream team to validate. Or it is
waiting for a manual deployment. Or it is waiting for a QA sign-off that happens next week. The
board says "Done." The software says otherwise.

Common variations:

- **The external validation queue.** The team's definition of done ends at "code merged to main."
  A separate team (QA, data validation, security review) must approve before the change reaches
  production. Stories sit in a hidden queue between "developer done" and "actually done" with no
  visibility on the board.
- **The merge-without-testing pattern.** Code merges to the main branch before all testing is
  complete. The team considers the story done when the PR merges, but integration tests, end-to-end
  tests, or manual verification happen later (or never).
- **The deployment gap.** The code is merged and tested but not deployed. Deployment happens on a
  schedule (weekly, monthly) or requires a separate team to execute. The feature is "done" in the
  codebase but does not exist for users.
- **The silent handoff.** The story moves to done, but the developer quietly tells another team
  member, "Can you check this in staging when you get a chance?" The remaining work is informal,
  untracked, and invisible.

The telltale sign: the team's velocity (stories closed per sprint) looks healthy, but the number
of features actually reaching users is much lower.

## Why This Is a Problem

Undone work creates a gap between what the team reports and what the team has actually delivered.
This gap hides risk, delays feedback, and erodes trust in the team's metrics.

### It reduces quality

When the definition of done does not include validation and deployment, those steps are treated
as afterthoughts. Testing that happens days after the code was written is less effective because
the developer's context has faded. Validation by an external team that did not participate in the
development catches surface issues but misses the subtle defects that only someone with full
context would spot.

When done means "in production and verified," the team builds validation into their workflow
rather than deferring it. Quality checks happen while context is fresh, and the team owns the full
outcome.

### It increases rework

The longer the gap between "developer done" and "actually done," the more risk accumulates. A
story that sits in a validation queue for a week may conflict with other changes merged in the
meantime. When the validation team finally tests it, they find issues that require the developer
to context-switch back to work they finished days ago.

If the validation fails, the rework is more expensive because the developer has moved on. They
must reload the mental model, re-read the code, and understand what changed in the codebase since
they last touched it.

### It makes delivery timelines unpredictable

The team reports velocity based on stories they marked as done. But the actual delivery to users
lags behind because of the hidden validation and deployment queues. Leadership sees healthy
velocity and expects features to be available. When they discover the gap, trust erodes.

The hidden queue also makes cycle time measurements unreliable. The team measures from "started"
to "moved to done" but ignores the days or weeks the story spends in validation or waiting for
deployment. True cycle time (from start to production) is much longer than reported.

### Impact on continuous delivery

CD requires that every change the team completes is genuinely deployable. Undone work breaks this
by creating a backlog of changes that are "finished" but not deployed. The pipeline may be
technically capable of deploying at any time, but the changes in it have not been validated. The
team cannot confidently deploy because they do not know if the "done" code actually works.

CD also requires that done means done. If the team's definition of done does not include
deployment and verification, the team is practicing continuous integration at best, not continuous
delivery.

## How to Fix It

### Step 1: Define done to include production (Week 1)

Write a definition of done that ends with the change running in production and verified. Include
every step: code review, all testing (automated and any required manual verification),
deployment, and post-deploy health check. If a step is not complete, the story is not done.

### Step 2: Make the hidden queues visible (Week 1)

Add columns to the board for every step between "developer done" and "in production." If there
is an external validation queue, it gets a column. If there is a deployment wait, it gets a
column. Make the work-in-progress in these hidden stages visible so the team can see where work
is actually stuck.

### Step 3: Pull validation into the team (Week 2-4)

If external validation is a bottleneck, bring the validators onto the team or teach the team to
do the validation themselves. The goal is to eliminate the handoff. When the developer who wrote
the code also validates it (or pairs with someone who can), the feedback loop is immediate and
the hidden queue disappears.

If the external team cannot be embedded, negotiate a service-level agreement for validation
turnaround and add the expected wait time to the team's planning. Do not mark stories done until
validation is complete.

### Step 4: Automate the remaining steps (Week 3+)

Every manual step between "code merged" and "in production" is a candidate for automation.
Automated testing in the pipeline replaces manual QA sign-off. Automated deployment replaces
waiting for a deployment window. Automated health checks replace manual post-deploy verification.

Each step that is automated eliminates a hidden queue and brings "developer done" closer to
"actually done."

| Objection | Response |
|-----------|----------|
| "We can't deploy until the validation team approves" | Then the story is not done until they approve. Include their approval time in your cycle time measurement and your sprint planning. If the wait is unacceptable, work with the validation team to reduce it or automate it. |
| "Our velocity will drop if we include deployment in done" | Your velocity has been inflated by excluding deployment. The real throughput (features reaching users) has always been lower. Honest velocity enables honest planning. |
| "The deployment schedule is outside our control" | Measure the wait time and make it visible. If a story waits five days for deployment after the code is ready, that is five days of lead time the team is absorbing silently. Making it visible creates pressure to fix the process. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------:|
| Gap between "developer done" and "in production" | Should decrease toward zero |
| Stories in hidden queues (validation, deployment) | Should decrease as queues are eliminated or automated |
| [Lead time](../../../reference/metrics/lead-time/) | Should decrease as the full path from commit to production shortens |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should become more accurate as it measures the real end-to-end time |

## Related Content

- [Monolithic Work Items](../monolithic-work-items/) - Large items are more likely to have undone work because they take longer to validate
- [Manual Deployments](../../pipeline/manual-deployments/) - Manual deployment processes create the deployment gap
- [Manual Regression Testing Gates](../../testing/manual-regression-testing-gates/) - Manual testing gates create the validation queue
- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - The definition of done is a working agreement the team owns
