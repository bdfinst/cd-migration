---
title: "New Releases Introduce Regressions in Previously Working Functionality"
linkTitle: "Regressions on release"
description: >
  Something that worked before the release is broken after it. The team spends time after every release chasing down what changed and why.
tags:
  - test-strategy
  - batch-size
  - integration-frequency
---

## What you are seeing

The release goes out. Within hours, bug reports arrive for behavior that was working before the
release. A calculation that was correct is now wrong. A form submission that was completing now
errors. A feature that was visible is now missing. The team starts bisecting the release,
searching through a large set of changes to find which one caused the regression.

Post-mortems for regressions tend to follow the same pattern: the change that caused the problem
looked safe in isolation, but it interacted with another change in an unexpected way. Or the code
path that broke was not covered by any automated test, so nobody saw the breakage until a user
reported it. Or a configuration value changed alongside the code change, and the combination
behaved differently than either change alone.

Regressions erode trust in the team's ability to release safely. The team responds by adding
more manual checks before releases, which slows the release cycle, which increases [batch size](../../glossary/#batch-size),
which increases the surface area for the next regression.

## Common causes

### Large Release Batches

When releases contain many changes - dozens of commits, multiple features, several bug fixes -
the surface area for regressions grows with the batch size. Each change is a potential source
of breakage. Changes that are individually safe can interact in unexpected ways when they ship
together. Diagnosing which change caused the regression requires searching through a large set
of candidates. Small, frequent releases make regressions rare because each release contains
few changes, and when one does occur, the cause is obvious.

**Read more:** [Infrequent, Painful Releases](../infrequent-releases/)

### Testing Only at the End

When tests run only immediately before a release rather than continuously throughout development,
regressions accumulate silently between test runs. A change that breaks existing behavior is not
detected until the pre-release test cycle, by which time more code has been built on top of the
broken behavior. The longer the gap between when the regression was introduced and when it is
found, the more expensive it is to fix.

**Read more:** [Testing Only at the End](../../anti-patterns/testing/testing-only-at-the-end/)

### Long-Lived Feature Branches

When developers work on branches that diverge from the main codebase for days or weeks, merging
creates interactions that were never tested. Each branch was developed and tested independently.
When they merge, the combined code behaves differently than either branch alone. The larger the
divergence, the more likely the merge produces unexpected behavior that manifests as a regression
in previously working functionality.

**Read more:** [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)

### Fixes Applied to the Release Branch but Not to Trunk

When a defect is found in a released version, the team branches from the release tag and
applies a fix to that branch to ship a patch quickly. If the fix is never ported back to
trunk, the next release from trunk still contains the defect. The patch branch and trunk have
diverged: the patch has the fix, trunk does not.

The correct sequence is to fix trunk first, then cherry-pick the fix to the release branch.
This guarantees trunk always contains the fix and subsequent releases from trunk are not
affected.

{{< figure src="/images/hotfix-flow.svg" alt="Two diagrams comparing hotfix approaches. Anti-pattern: release branch branched from v1.0, fix applied to release branch only, fix never reaches trunk, defect persists in future trunk releases. Correct: fix applied to trunk first, then cherry-picked to the release branch, all future releases from trunk include the fix." >}}

**Read more:** [Release Branches with Extensive Backporting](../../anti-patterns/branching-integration/release-branches-backporting/)

## How to narrow it down

1. **How many changes does a typical release contain?** If a release contains more than a
   handful of commits, the batch size is a risk factor. Reducing release frequency reduces the
   chance of interactions and makes regressions easier to diagnose. Start with
   [Infrequent, Painful Releases](../infrequent-releases/).
2. **Do tests run on every commit or only before a release?** If the team discovers regressions
   at release time, the feedback loop is too long. Tests should catch breakage within minutes of
   the change being pushed. Start with
   [Testing Only at the End](../../anti-patterns/testing/testing-only-at-the-end/).
3. **Are developers working on branches that diverge from the main codebase for more than a
   day?** If yes, untested merge interactions are a likely source of regressions. Start with
   [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/).
4. **Does the same regression appear in multiple releases?** If a bug that was fixed in a
   patch release keeps coming back, the fix was applied to the release branch but never merged
   to trunk. Start with
   [Release Branches with Extensive Backporting](../../anti-patterns/branching-integration/release-branches-backporting/).

---

## Related Content

- [Fear of Deploying](../fear-of-deploying/) - Regressions are a primary driver of deployment anxiety
- [Staging Passes but Production Fails](../staging-passes-production-fails/) - Related pattern where environment differences cause post-deploy failures
- [High Coverage but Tests Miss Defects](../../symptoms/testing/high-coverage-ineffective-tests/) - Tests that do not catch regressions despite high coverage numbers
- [Infrequent, Painful Releases](../infrequent-releases/) - Large batch releases that increase regression risk
- [Testing Only at the End](../../anti-patterns/testing/testing-only-at-the-end/) - Delayed feedback that lets regressions accumulate
- [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/) - Branch divergence that creates untested merge interactions
- [Release Branches with Extensive Backporting](../../anti-patterns/branching-integration/release-branches-backporting/) - Fixes that never make it back to trunk
