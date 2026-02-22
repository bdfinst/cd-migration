---
title: "Symptoms for Developers"
linkTitle: "For Developers"
weight: 6
description: >
  Dysfunction symptoms grouped by the friction developers and tech leads experience - from daily
  coding pain to team-level delivery patterns.
---

These are the symptoms you experience while writing, testing, and shipping code. Some you feel
personally. Others you see as patterns across the team. If something on this list sounds
familiar, follow the link to find what is causing it and how to fix it.

## Pushing code and getting feedback

- **[Pipelines Take Too Long](flow/slow-pipelines/)** - You push a change, then wait 30 minutes or more to find out if it passed. [Pipeline](../glossary/#pipeline) duration limits how often the team can integrate.
- **[Feedback Takes Hours Instead of Minutes](flow/no-fast-feedback/)** - You do not learn whether a change works until long after you wrote it. Developers batch changes to avoid the wait.
- **[Pull Requests Sit for Days Waiting for Review](flow/prs-waiting-for-review/)** - Your PR is ready, but no one reviews it for days. You start another branch. Now you have two things in flight and neither is done.

## Tests getting in the way

- **[Tests Randomly Pass or Fail](testing/flaky-tests/)** - You click rerun without investigating because flaky failures are so common. The team ignores failures by default, which masks real regressions.
- **[Refactoring Breaks Tests](testing/refactoring-breaks-tests/)** - You rename a method or restructure a class and 15 tests fail, even though the behavior is correct. Technical debt accumulates because cleanup is too expensive.
- **[Test Suite Is Too Slow to Run](testing/slow-test-suites/)** - Running tests locally is so slow that you skip it and push to [CI](../glossary/#ci-continuous-integration) instead, trading fast feedback for a longer loop.
- **[High Coverage but Tests Miss Defects](testing/high-coverage-ineffective-tests/)** - Coverage is above 80% but bugs still make it to production. The tests check that code runs, not that it works correctly.

## Integrating and merging

- **[Merging Is Painful and Time-Consuming](flow/painful-merges/)** - Your branch has diverged so far from main that merging takes hours of conflict resolution.
- **[Everything Started, Nothing Finished](flow/too-much-wip/)** - The board is full of in-progress items but the done column is empty. The team is busy but throughput is low.
- **[Work Items Take Days or Weeks to Complete](flow/work-items-take-too-long/)** - Cycle time is long and unpredictable. Items sit in progress for days because they are too large or blocked by dependencies.

## Deploying and releasing

- **[The Team Is Afraid to Deploy](deployment/fear-of-deploying/)** - Deployments are treated as high-risk events requiring full-team attention. The team deploys less often, which makes each deployment larger and riskier.
- **[Releases Are Infrequent and Painful](deployment/infrequent-releases/)** - Releases happen monthly or quarterly and require significant coordination, manual testing, and [rollback](../glossary/#rollback) plans.
- **[Merge Freezes Before Deployments](deployment/merge-freeze/)** - The team stops merging to stabilize before each release, creating artificial bottlenecks and deferred work.
- **[Hardening Sprints Are Needed Before Every Release](deployment/hardening-sprints/)** - A dedicated stabilization period is needed before every release because the normal process does not produce releasable code.
- **[Multiple Services Must Be Deployed Together](deployment/coordinated-deployments/)** - Services are coupled so that deploying one requires deploying others at the same time.

## Environment and production surprises

- **[It Works on My Machine](visibility/works-on-my-machine/)** - Code passes all your local tests but fails in CI or production. You cannot reproduce the problem locally.
- **[Tests Pass in One Environment but Fail in Another](testing/environment-dependent-failures/)** - The same test produces different results depending on where it runs.
- **[Staging Passes but Production Fails](deployment/staging-passes-production-fails/)** - The staging environment gives false confidence. Problems that staging should catch reach production.
- **[Production Issues Discovered by Customers](visibility/production-issues-found-by-customers/)** - The team learns about production problems from customer reports instead of monitoring.
- **[Production Problems Are Discovered Hours or Days Late](visibility/slow-detection/)** - Incidents are not detected until the impact has already accumulated.

See [Learning Paths](../learning-paths/) for a structured reading sequence if you want a guided path through diagnosis and fixes.
