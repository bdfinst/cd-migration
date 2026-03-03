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

- **[Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}})** - Pipeline fails, rerun passes, nobody investigates
- **[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}})** - Works locally, fails in [CI](../reference/glossary/#ci-continuous-integration), or the reverse

</details>

<details>
<summary>We have good coverage numbers but bugs still reach production</summary>

Coverage measures which lines execute, not whether the tests verify correct behavior. High
coverage with low defect detection points to a test design problem.

- **[High Coverage but Tests Miss Defects]({{< relref "/docs/symptoms/testing/high-coverage-ineffective-tests" >}})** - Tests assert implementation details instead of behavior

</details>

<details>
<summary>Refactoring is risky because it breaks tests</summary>

When tests are coupled to implementation details rather than behavior, any internal change
causes test failures even when the behavior is correct.

- **[Refactoring Breaks Tests]({{< relref "/docs/symptoms/testing/refactoring-breaks-tests" >}})** - Internal changes break tests that should not care about implementation

</details>

<details>
<summary>The test suite takes too long to run</summary>

Slow tests delay feedback and encourage developers to skip running them locally.

- **[Test Suite Is Too Slow to Run]({{< relref "/docs/symptoms/testing/slow-test-suites" >}})** - Tests take so long that developers avoid running them
- **[Test Environments Take Too Long to Reset Between Runs]({{< relref "/docs/symptoms/testing/slow-test-environment-reset" >}})** - Environment and database reset time prevents running the full suite on every change
- **[Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}})** - The overall pipeline is slow, not just tests

</details>

<details>
<summary>AI-generated code is causing quality or security problems</summary>

When developers use AI to generate code without understanding the output, functional bugs and
security vulnerabilities ship because review standards have not kept pace with new tooling.

- **[AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}})** - Developers commit AI output they cannot explain, and bugs hide in unexamined logic

</details>

</details>

<details>
<summary><strong>Deploying and releasing is painful</strong></summary>

<details>
<summary>The team avoids or dreads deployments</summary>

When deployments frequently cause incidents, the team learns to treat them as high-risk events.

- **[The Team Is Afraid to Deploy]({{< relref "/docs/symptoms/deployment/fear-of-deploying" >}})** - Deployments cause anxiety because they frequently fail
- **[Releases Are Infrequent and Painful]({{< relref "/docs/symptoms/deployment/infrequent-releases" >}})** - The team batches changes into large, risky releases

</details>

<details>
<summary>We need to coordinate multiple services or teams to deploy</summary>

Deployment coordination signals architectural coupling or process constraints.

- **[Multiple Services Must Be Deployed Together]({{< relref "/docs/symptoms/deployment/coordinated-deployments" >}})** - Services cannot be deployed independently
- **[Merge Freezes Before Deployments]({{< relref "/docs/symptoms/deployment/merge-freeze" >}})** - The team stops merging to stabilize before a release

</details>

<details>
<summary>We need a stabilization period before each release</summary>

If you need dedicated time to "harden" before releasing, the normal development process is not
producing releasable code.

- **[Hardening Sprints Are Needed Before Every Release]({{< relref "/docs/symptoms/deployment/hardening-sprints" >}})** - Extra time required to make code production-ready
- **[Staging Passes but Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}})** - Staging environment does not catch production problems

</details>

</details>

<details>
<summary><strong>Work is slow and things pile up</strong></summary>

<details>
<summary>Lots of things are in progress but few are finishing</summary>

High [work-in-progress](../reference/glossary/#wip-work-in-progress) means the team is spread thin. Nothing gets the focus needed to finish.

- **[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}})** - The board shows many items in progress, few reaching done
- **[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}})** - Individual items take far longer than estimated

</details>

<details>
<summary>Merging and integrating code is difficult</summary>

When integration is deferred, branches diverge and merging becomes painful.

- **[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}})** - Merges require significant effort to resolve conflicts
- **[Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}})** - Code waits in the review queue instead of flowing forward

</details>

<details>
<summary>Feedback on changes takes too long</summary>

Slow feedback loops mean developers context-switch away and problems grow before they are caught.

- **[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}})** - Developers wait hours or days to learn if a change works
- **[Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}})** - The pipeline itself is the bottleneck

</details>

<details>
<summary>AI tools are not making us faster</summary>

AI coding assistants should reduce implementation time, but the overhead of prompting, reviewing,
and correcting AI output sometimes exceeds the time to write the code directly.

- **[AI Tooling Slows You Down Instead of Speeding You Up]({{< relref "/docs/symptoms/flow/developer-experience/ai-tooling-slowdown" >}})** - The prompt-review-fix cycle takes longer than coding it yourself

</details>

</details>

<details>
<summary><strong>Production problems and team health</strong></summary>

<details>
<summary>Customers find problems before we do</summary>

If your monitoring does not catch issues before users report them, you have an observability gap.

- **[Production Issues Discovered by Customers]({{< relref "/docs/symptoms/visibility/production-issues-found-by-customers" >}})** - Users report bugs the team did not know existed
- **[Production Problems Are Discovered Hours or Days Late]({{< relref "/docs/symptoms/visibility/slow-detection" >}})** - Incidents go unnoticed until impact accumulates

</details>

<details>
<summary>Code behaves differently in different environments</summary>

Environment inconsistency makes it impossible to reproduce problems reliably.

- **[It Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}})** - Code works locally but fails elsewhere
- **[Tests Pass in One Environment but Fail in Another]({{< relref "/docs/symptoms/testing/environment-dependent-failures" >}})** - Environment differences cause test failures

</details>

<details>
<summary>The team is exhausted from process overhead</summary>

When the delivery process creates friction at every step, the team burns out.

- **[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}})** - Process overhead is wearing the team down

</details>

</details>

<details>
<summary><strong>Organizational and process problems</strong></summary>

<details>
<summary>Changes require approval chains or committees before deploying</summary>

When manual approval gates exist between a green [pipeline](../reference/glossary/#pipeline) and production, they add delay
without reducing risk.

- **[Every Change Requires a Ticket and Approval Chain]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}})** - Bureaucratic gates that add delay without reducing risk
- **[Work Requires Sign-Off from Teams Not Involved in Delivery]({{< relref "/docs/symptoms/deployment/waiting-for-cross-team-approval" >}})** - Cross-team approvals that create queues

</details>

<details>
<summary>Another team controls our pipeline or infrastructure</summary>

When the team cannot change its own delivery process, improvement stalls.

- **[Teams Cannot Change Their Own Pipeline]({{< relref "/docs/symptoms/deployment/pipeline-changes-require-another-team" >}})** - Pipeline changes require another team
- **[Work Stalls Waiting for the Platform Team]({{< relref "/docs/symptoms/flow/work-management/waiting-on-platform-team" >}})** - Infrastructure requests create queues

</details>

<details>
<summary>Knowledge is concentrated in a few people</summary>

When only certain people can deploy, debug, or explain the architecture, the team is fragile.

- **[Releases Depend on One Person]({{< relref "/docs/symptoms/deployment/release-manager-bottleneck" >}})** - One person is the bottleneck for every release
- **[Delivery Slows Every Time the Team Rotates]({{< relref "/docs/symptoms/flow/team-knowledge/rotation-ramp-up-drag" >}})** - New team members take weeks to become productive
- **[Bugs in Familiar Areas Take Disproportionately Long to Fix]({{< relref "/docs/symptoms/flow/developer-experience/slow-defect-resolution" >}})** - Developers assigned to unfamiliar components take too long to understand and change them correctly

</details>

<details>
<summary>Leadership does not see delivery improvement as a priority</summary>

Without organizational support, technical improvements stall at the first policy conflict.

- **[Leadership Sees CD as a Technical Nice-to-Have]({{< relref "/docs/symptoms/visibility/no-leadership-buy-in" >}})** - No executive sponsorship for delivery improvement
- **[Features Must Wait for a Separate QA Team]({{< relref "/docs/symptoms/deployment/waiting-on-qa-team" >}})** - Organizational structure creates handoffs

</details>

</details>
