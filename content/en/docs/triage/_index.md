---
title: "Find Your Symptom"
linkTitle: "Find Your Symptom"
weight: 3
description: >
  Answer a few questions to narrow down which dysfunction symptoms match your situation.
---

Expand the category that best describes what your team is experiencing, then follow the
sub-questions to find the most relevant symptom pages.

<details>
<summary><strong>We have problems with our tests</strong></summary>

<details>
<summary>Tests pass sometimes and fail sometimes without code changes</summary>

Your tests are non-deterministic. This is often caused by environment differences or test
architecture that depends on external systems.

- **[Tests Randomly Pass or Fail](../symptoms/testing/flaky-tests/)** - Pipeline fails, rerun passes, nobody investigates
- **[Tests Pass in One Environment but Fail in Another](../symptoms/testing/environment-dependent-failures/)** - Works locally, fails in CI, or the reverse

</details>

<details>
<summary>We have good coverage numbers but bugs still reach production</summary>

Coverage measures which lines execute, not whether the tests verify correct behavior. High
coverage with low defect detection points to a test design problem.

- **[High Coverage but Tests Miss Defects](../symptoms/testing/high-coverage-ineffective-tests/)** - Tests assert implementation details instead of behavior

</details>

<details>
<summary>Refactoring is risky because it breaks tests</summary>

When tests are coupled to implementation details rather than behavior, any internal change
causes test failures even when the behavior is correct.

- **[Refactoring Breaks Tests](../symptoms/testing/refactoring-breaks-tests/)** - Internal changes break tests that should not care about implementation

</details>

<details>
<summary>The test suite takes too long to run</summary>

Slow tests delay feedback and encourage developers to skip running them locally.

- **[Test Suite Is Too Slow to Run](../symptoms/testing/slow-test-suites/)** - Tests take so long that developers avoid running them
- **[Pipelines Take Too Long](../symptoms/flow/slow-pipelines/)** - The overall pipeline is slow, not just tests

</details>

</details>

<details>
<summary><strong>Deploying and releasing is painful</strong></summary>

<details>
<summary>The team avoids or dreads deployments</summary>

When deployments frequently cause incidents, the team learns to treat them as high-risk events.

- **[The Team Is Afraid to Deploy](../symptoms/deployment/fear-of-deploying/)** - Deployments cause anxiety because they frequently fail
- **[Releases Are Infrequent and Painful](../symptoms/deployment/infrequent-releases/)** - The team batches changes into large, risky releases

</details>

<details>
<summary>We need to coordinate multiple services or teams to deploy</summary>

Deployment coordination signals architectural coupling or process constraints.

- **[Multiple Services Must Be Deployed Together](../symptoms/deployment/coordinated-deployments/)** - Services cannot be deployed independently
- **[Merge Freezes Before Deployments](../symptoms/deployment/merge-freeze/)** - The team stops merging to stabilize before a release

</details>

<details>
<summary>We need a stabilization period before each release</summary>

If you need dedicated time to "harden" before releasing, the normal development process is not
producing releasable code.

- **[Hardening Sprints Are Needed Before Every Release](../symptoms/deployment/hardening-sprints/)** - Extra time required to make code production-ready
- **[Staging Passes but Production Fails](../symptoms/deployment/staging-passes-production-fails/)** - Staging environment does not catch production problems

</details>

</details>

<details>
<summary><strong>Work is slow and things pile up</strong></summary>

<details>
<summary>Lots of things are in progress but few are finishing</summary>

High work-in-progress means the team is spread thin. Nothing gets the focus needed to finish.

- **[Everything Started, Nothing Finished](../symptoms/flow/too-much-wip/)** - The board shows many items in progress, few reaching done
- **[Work Items Take Days or Weeks to Complete](../symptoms/flow/work-items-take-too-long/)** - Individual items take far longer than estimated

</details>

<details>
<summary>Merging and integrating code is difficult</summary>

When integration is deferred, branches diverge and merging becomes painful.

- **[Merging Is Painful and Time-Consuming](../symptoms/flow/painful-merges/)** - Merges require significant effort to resolve conflicts
- **[Pull Requests Sit for Days Waiting for Review](../symptoms/flow/prs-waiting-for-review/)** - Code waits in the review queue instead of flowing forward

</details>

<details>
<summary>Feedback on changes takes too long</summary>

Slow feedback loops mean developers context-switch away and problems grow before they are caught.

- **[Feedback Takes Hours Instead of Minutes](../symptoms/flow/no-fast-feedback/)** - Developers wait hours or days to learn if a change works
- **[Pipelines Take Too Long](../symptoms/flow/slow-pipelines/)** - The pipeline itself is the bottleneck

</details>

</details>

<details>
<summary><strong>Production problems and team health</strong></summary>

<details>
<summary>Customers find problems before we do</summary>

If your monitoring does not catch issues before users report them, you have an observability gap.

- **[Production Issues Discovered by Customers](../symptoms/visibility/production-issues-found-by-customers/)** - Users report bugs the team did not know existed
- **[Production Problems Are Discovered Hours or Days Late](../symptoms/visibility/slow-detection/)** - Incidents go unnoticed until impact accumulates

</details>

<details>
<summary>Code behaves differently in different environments</summary>

Environment inconsistency makes it impossible to reproduce problems reliably.

- **[It Works on My Machine](../symptoms/visibility/works-on-my-machine/)** - Code works locally but fails elsewhere
- **[Tests Pass in One Environment but Fail in Another](../symptoms/testing/environment-dependent-failures/)** - Environment differences cause test failures

</details>

<details>
<summary>The team is exhausted from process overhead</summary>

When the delivery process creates friction at every step, the team burns out.

- **[Team Burnout and Unsustainable Pace](../symptoms/visibility/team-burnout/)** - Process overhead is wearing the team down

</details>

</details>
