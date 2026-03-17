---
title: "Symptoms for Developers"
linkTitle: "For Developers"
weight: 3
aliases:
  - /docs/symptoms/for-developers/
description: >
  Dysfunction symptoms grouped by the friction developers and tech leads experience - from daily
  coding pain to team-level delivery patterns.
---

These are the symptoms you experience while writing, testing, and shipping code. Some you feel
personally. Others you see as patterns across the team. If something on this list sounds
familiar, follow the link to find what is causing it and how to fix it.

## Pushing code and getting feedback

- **[Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}})** - You push a change, then wait 30 minutes or more to find out if it passed. [Pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) duration limits how often the team can integrate.
- **[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}})** - You do not learn whether a change works until long after you wrote it. Developers batch changes to avoid the wait.
- **[Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}})** - Your PR is ready, but no one reviews it for days. You start another branch. Now you have two things in flight and neither is done.

## Tests getting in the way

- **[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}})** - You click rerun without investigating because flaky failures are so common. The team ignores failures by default, which masks real regressions.
- **[Refactoring Breaks Tests]({{< relref "/docs/symptoms/testing/refactoring-breaks-tests" >}})** - You rename a method or restructure a class and 15 tests fail, even though the behavior is correct. Technical debt accumulates because cleanup is too expensive.
- **[Test Suite Is Too Slow to Run]({{< relref "/docs/symptoms/testing/slow-test-suites" >}})** - Running tests locally is so slow that you skip it and push to [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) instead, trading fast feedback for a longer loop.
- **[High Coverage but Tests Miss Defects]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}})** - Coverage is above 80% but bugs still make it to production. The tests check that code runs, not that it works correctly.
- **[A Large Codebase Has No Automated Tests]({{< relref "/docs/symptoms/testing/legacy-system-no-tests" >}})** - No automated tests means every change is risky and slow. Manual testing cannot keep up with delivery pace.
- **[Tests Interfere with Each Other Through Shared Data]({{< relref "/docs/symptoms/testing/test-data-management-chaos" >}})** - Shared test data causes tests to fail unpredictably. You cannot trust the results without re-running.
- **[Test Environments Take Too Long to Reset]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}})** - Resetting takes so long that you skip local runs or batch changes to avoid the wait.

## Integrating and merging

- **[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}})** - Your branch has diverged so far from main that merging takes hours of conflict resolution.
- **[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}})** - The board is full of in-progress items but the done column is empty. The team is busy but throughput is low.
- **[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}})** - Cycle time is long and unpredictable. Items sit in progress for days because they are too large or blocked by dependencies.

## Deploying and releasing

- **[The Team Is Afraid to Deploy]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}})** - Deployments are treated as high-risk events requiring full-team attention. The team deploys less often, which makes each deployment larger and riskier.
- **[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}})** - Releases happen monthly or quarterly and require significant coordination, manual testing, and [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) plans.
- **[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}})** - The team stops merging to stabilize before each release, creating artificial bottlenecks and deferred work.
- **[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}})** - A dedicated stabilization period is needed before every release because the normal process does not produce releasable code.
- **[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}})** - Services are coupled so that deploying one requires deploying others at the same time.
- **[Database Migrations Block or Break Deployments]({{< relref "/docs/symptoms/deployment/database-migrations-block-deploys" >}})** - Schema changes couple deployments to manual coordination and downtime windows.
- **[API Changes Break Consumers Without Warning]({{< relref "/docs/symptoms/deployment/api-changes-break-consumers" >}})** - Changing an API breaks downstream services because there are no contracts or versioning.
- **[Deployments Are One-Way Doors]({{< relref "/docs/symptoms/deployment/no-rollback-capability" >}})** - There is no fast rollback, so every deployment carries irreversible risk.

## Environment and production surprises

- **[It Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}})** - Code passes all your local tests but fails in CI or production. You cannot reproduce the problem locally.
- **[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}})** - The same test produces different results depending on where it runs.
- **[Staging Passes but Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}})** - The staging environment gives false confidence. Problems that staging should catch reach production.
- **[Production Issues Discovered by Customers]({{< relref "/docs/symptoms/visibility/production-issues-found-by-customers" >}})** - The team learns about production problems from customer reports instead of monitoring.
- **[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}})** - Incidents are not detected until the impact has already accumulated.
- **[Setting Up a Development Environment Takes Days]({{< relref "/docs/symptoms/flow/developer-experience/painful-local-development-setup" >}})** - Onboarding friction and undocumented setup steps waste developer time before any code is written.
- **[Getting a Test Environment Requires Filing a Ticket]({{< relref "/docs/symptoms/flow/developer-experience/lack-of-self-service-environments" >}})** - Developers cannot self-serve environments, creating wait time before any testing.
- **[When Something Breaks, Nobody Knows What to Do]({{< relref "/docs/symptoms/visibility/chaotic-incident-response" >}})** - Incident response is chaotic because there are no runbooks or clear ownership.
- **[The Team Ignores Alerts Because There Are Too Many]({{< relref "/docs/symptoms/visibility/alert-fatigue" >}})** - Alert noise trains developers to ignore monitoring, masking real incidents.

See [Learning Paths]({{< relref "/docs/learning-paths" >}}) for a structured reading sequence if you want a guided path through diagnosis and fixes.
