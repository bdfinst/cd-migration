---
aliases:
  - /docs/symptoms/no-fast-feedback/
title: "Feedback Takes Hours Instead of Minutes"
linkTitle: "No fast feedback"
description: >
  The time from making a change to knowing whether it works is measured in hours, not minutes.
  Developers batch changes to avoid waiting.
tags:
  - integration-frequency
  - test-strategy
---

## What you are seeing

A developer makes a change and wants to know if it works. They push to [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) and wait 45 minutes for
the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). Or they open a PR and wait two days for a review. Or they deploy to staging and wait
for a manual QA pass that happens next week. By the time feedback arrives, the developer has moved
on to something else.

The slow feedback changes developer behavior. They batch multiple changes into a single commit to
avoid waiting multiple times. They skip local verification and push larger, less certain changes.
They start new work before the previous change is validated, juggling multiple incomplete tasks.

When feedback finally arrives and something is wrong, the developer must context-switch back. The
mental model from the original change has faded. Debugging takes longer because the developer is
working from memory rather than from active context. If multiple changes were batched, the
developer must untangle which one caused the failure.

## Common causes

### Inverted Test Pyramid

When most tests are slow E2E tests, the test feedback loop is measured in tens of minutes rather
than seconds. Unit tests provide feedback in seconds. E2E tests take minutes or hours. A team with
a fast unit test suite can verify a change in under a minute. A team whose testing relies on E2E
tests cannot get feedback faster than those tests can run.

**Read more:** [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}})

### Integration Deferred

When the team does not integrate frequently (at least daily), the feedback loop for integration
problems is as long as the [branch lifetime]({{< relref "/docs/reference/glossary#branch-lifetime" >}}). A developer working on a two-week branch does not
discover integration conflicts until they merge. Daily integration catches conflicts within hours.
[Continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) catches them within minutes.

**Read more:** [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}})

### Manual Testing Only

When there are no automated tests, the only feedback comes from manual verification. A developer
makes a change and must either test it manually themselves (slow) or wait for someone else to test
it (slower). Automated tests provide feedback in the pipeline without requiring human effort or
scheduling.

**Read more:** [Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}})

### Long-Lived Feature Branches

When pull requests wait days for review, the code review feedback loop dominates total cycle time.
A developer finishes a change in two hours, then waits two days for review. The review feedback
loop is 24 times longer than the development time. Long-lived branches produce large PRs, and
large PRs take longer to review. Fast feedback requires fast reviews, which requires small PRs,
which requires short-lived branches.

**Read more:** [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}})

### Manual Regression Testing Gates

When every change must pass through a manual QA gate, the feedback loop includes human scheduling.
The QA team has a queue. The change waits in line. When the tester gets to it, days have passed.
Automated testing in the pipeline replaces this queue with instant feedback.

**Read more:** [Manual Regression Testing Gates]({{< relref "/docs/anti-patterns/testing/manual-regression-testing-gates" >}})

## How to narrow it down

1. **How fast can the developer verify a change locally?** If the local test suite takes more than
   a few minutes, the test strategy is the bottleneck. Start with
   [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}).
2. **How frequently does the team integrate to main?** If developers work on branches for days
   before integrating, the integration feedback loop is the bottleneck. Start with
   [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}}).
3. **Are there automated tests at all?** If the only feedback is manual testing, the lack of
   automation is the bottleneck. Start with
   [Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}).
4. **How long do PRs wait for review?** If review turnaround is measured in days, the review
   process is the bottleneck. Start with
   [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}).
5. **Is there a manual QA gate in the pipeline?** If changes wait in a QA queue, the manual gate
   is the bottleneck. Start with
   [Manual Regression Testing Gates]({{< relref "/docs/anti-patterns/testing/manual-regression-testing-gates" >}}).

**Ready to fix this?** The most common cause is [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Pipelines Take Too Long]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}) - Pipeline speed is the most common feedback bottleneck
- [Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}}) - Review queues add days to the feedback loop
- [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}}) - Delayed integration delays feedback
- [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}) - Automated builds that give feedback in minutes
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Fast tests as the foundation of fast feedback
- [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) - Track the speed of your feedback loop
