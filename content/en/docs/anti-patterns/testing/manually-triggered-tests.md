---
title: "Manually Triggered Tests"
linkTitle: "Manually Triggered Tests"
weight: 106
category: "Testing & Quality"
risk_level: high
description: >
  Tests exist but run only when a human remembers to trigger them, making test execution inconsistent and unreliable.
tags:
  - test-strategy
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What this looks like

Your team has tests that pass when they run, and everyone agrees they are valuable. The problem is that no automated process runs them. Developers are expected to execute the test suite locally before pushing changes, but "expected to" and "actually do" diverge quickly under deadline pressure. A pipeline might exist, but someone must open a UI and click a button to trigger it. That step gets skipped when the fix feels obvious or the deploy is already late.

Test execution becomes a social contract rather than a mechanical guarantee. Some developers run everything religiously, while others run only the tests closest to the code they changed. New team members do not yet know which tests matter. When a build breaks in production, the postmortem reveals that no one ran the full suite before the deploy. It felt redundant, or nobody had documented the manual trigger step anywhere visible.

The pattern often hides behind phrases like "we always test before releasing." The phrase is technically true, because someone will usually run the tests if asked. But "usually" and "when asked" are not the same as "every time, automatically, as a hard gate."

Common variations:

- **Local-only testing.** Developers run tests on their own machines, but no CI system enforces coverage on every push. Divergent environments produce inconsistent results.
- **Optional pipeline jobs.** A CI configuration exists, but the test stage is marked optional or commented out. Deploying without test results is easy.
- **Manual QA handoff.** Automated tests exist for unit coverage. Integration and regression tests require a QA engineer to schedule and run a separate test pass before each release.
- **Ticket-triggered testing.** A separate team owns the test environment. Running tests requires filing a request that might take hours or days to fulfill.

The telltale sign: the team cannot point to a system that blocks deployment when tests failed or did not run in the last pipeline run.

## Why this is a problem

When test execution depends on human initiative, you lose the only property that makes tests useful as a safety net: consistency.

### It reduces quality

A regression ships to production not because the tests would have missed it, but because no one ran them. The postmortem reveals the test existed and would have caught the bug in seconds. Tests that run inconsistently catch bugs inconsistently. A developer who is confident in a small change skips the full suite and ships a regression.

A developer new to the codebase does not know which manual steps to follow. They push code that breaks an integration nobody thought to test locally.

Teams in this state tend to underestimate their actual defect rate. They measure bugs reported in production, but they do not measure the bugs that would have been caught if tests had run on every commit. Over time the test suite itself degrades. Tests that run only sometimes reveal flakiness that nobody bothers to fix. Developers then trust the results less and run the tests less often.

A fully automated pipeline treats tests as a non-negotiable gate. Every commit triggers the same sequence, every developer gets the same feedback, and the suite either passes or it does not. Nobody gets to say "I figured it would be fine."

### It increases rework

A defect introduced on Monday sits in the codebase until Thursday, when someone finally runs the tests. By then, three more developers have committed code that depends on the broken behavior. The fix is no longer a ten-minute correction. It is a multi-commit investigation.

When a bug escapes because nobody ran the tests, it travels further before anyone catches it. By the time it surfaces in staging or production, the fix requires understanding changes across multiple commits from multiple developers. That investigation multiplies the debugging effort.

Manual testing cycles also introduce waiting time. A developer who needs a QA engineer to run the integration suite before merging is blocked for however long that takes. That waiting time is pure waste: the code is written and the developer is ready to move on. But the process cannot proceed until a human completes a step a machine could do in minutes. Those waits compound across a team of ten developers, each waiting multiple times per week.

Automated tests that run on every commit catch regressions at the point of introduction. The developer who wrote the code still has the context needed to fix it quickly.

### It makes delivery timelines unpredictable

A release nominally scheduled for Friday reveals on Thursday afternoon that three tests are failing and two of them touch the payment flow. No one knew because no one had run the full suite since Monday. Because tests run irregularly, the team cannot say with confidence whether the code in the main branch is deployable right now.

Discovering quality problems at release time shrinks the fix window to its smallest possible size. That is exactly when pressure to skip process is highest. Teams respond by either delaying the release or shipping with known failures, both of which erode trust and create follow-on work. Neither outcome would be necessary if the same tests had been running automatically on every commit throughout the sprint.

### Impact on continuous delivery

CD requires that the main branch be releasable at any time. That property cannot be maintained without automated tests running on every commit. Manually triggered tests create gaps in verification that can last hours or days. Between manual runs, the team never knows whether the codebase is deployable.

The feedback loop that CD depends on - commit, verify, fix, repeat - collapses when verification is optional. Developers lose the fast signal that automated tests provide. They make larger changes between test runs to amortize the manual effort, and the batch size of unverified work grows. CD requires small batches and fast feedback; manually triggered tests produce the opposite.

## How to fix it

### Step 1: Audit what tests exist and where they live

Before automating, understand what you have. List every test suite - unit, integration, end-to-end, contract - and document how each one is currently triggered. Note which ones are already in a CI pipeline versus which require manual steps. This inventory becomes the prioritized list for automation.

### Step 2: Wire the fastest tests to every commit

Start with the tests that run in under two minutes - typically unit tests and fast integration tests. Configure your CI system to run these automatically on every push to every branch. The goal is to get the shortest meaningful feedback loop running without any human involvement. Quarantine and fix flaky tests that would slow this feedback loop. Do not ignore them.

### Step 3: Add integration and contract tests to the pipeline (weeks 3-4)

After the fast gate is stable, add the slower test suites as later stages in the pipeline. Run these stages in parallel if needed to keep total pipeline duration reasonable. Make these stages required. Do not let a pipeline run that skips them proceed to deployment.

### Step 4: Remove or deprecate manual triggers

Once the automated pipeline covers what the manual process covered, remove the manual trigger options or mark them clearly as deprecated. The goal is to make "run tests manually" unnecessary, not to maintain it as a parallel path. If stakeholders are accustomed to requesting manual test runs, communicate the change and the new process for reviewing test results.

### Step 5: Enforce the pipeline as the deployment gate

Configure your deployment tooling to require a passing pipeline run before any deployment proceeds. In GitHub-based workflows, use a branch protection rule. In other systems, use a pipeline dependency. The pipeline must be the only path to production - not a recommendation but a hard gate.

| Objection | Response |
|-----------|----------|
| "Our tests take too long to run automatically every time." | Start by automating only the fast tests. Speed up the slow ones over time using parallelization. Running slow tests automatically is still better than running no tests automatically. |
| "Developers should be trusted to run tests before pushing." | Trust is not a reliability mechanism. Automation runs every time without judgment calls about whether it is necessary. |
| "We do not have a CI system set up." | Most source control hosts (GitHub, GitLab, Bitbucket) include CI tooling at no additional cost. Setup time is typically under a day for basic pipelines. |
| "Our tests are flaky and will block everyone if we make them required." | Flaky tests are a separate problem that needs fixing, but that does not mean tests should stay optional. Quarantine known flaky tests and fix them while running the stable ones automatically. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Decreasing as flaky or redundant tests are fixed and parallelized; stable execution time per commit |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Declining trend as automated tests catch regressions before they reach production |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Reduction in the time between commit and deployable state as manual test wait times are eliminated |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Shorter repair cycles because defects are caught earlier when the developer still has context |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Reduced waiting time between code complete and merge as manual QA handoff steps are eliminated |

## Related content

- [Testing fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}})
- [Deterministic pipeline]({{< relref "/docs/pipeline/deterministic-pipeline" >}})
- [Pipeline architecture]({{< relref "/docs/pipeline/pipeline-architecture" >}})
- [Metrics-driven improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}})
