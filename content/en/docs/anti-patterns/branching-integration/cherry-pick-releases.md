---
title: "Cherry-Pick Releases"
linkTitle: "Cherry-Pick Releases"
weight: 12
category: "Branching & Integration"
risk_level: high
description: >
  Hand-selecting specific commits for release instead of deploying trunk, indicating trunk is
  never trusted to be deployable.
tags:
  - integration-frequency
  - batch-size
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

When a release is approaching, the team does not simply deploy trunk. Instead, someone - usually
a release engineer or a senior developer - reviews the commits that have landed since the last
release and selects which ones should go out. Some commits are approved. Others are held back
because the feature is not ready, the ticket was not signed off, or there is uncertainty about
whether the code is safe. The selected commits are cherry-picked onto a release branch and tested
there before deployment.

The decision meeting runs long. People argue about which commits are safe to include. The release
engineer needs to understand the implications of including Commit A without Commit B, which it
might depend on. Sometimes a cherry-pick causes a conflict because the selected commits assumed
an ordering that is now violated. The release branch needs its own fixes. By the time the release
is ready, the release branch has diverged from trunk, and the next release cycle starts with the
same conversation.

Common variations:

- **The inclusion whitelist.** Only commits explicitly tagged or approved for the release are
  included. Everything else is held back by default. The tagging process is a separate workflow
  that developers forget, creating releases with missing changes that were expected to be included.
- **The exclusion blacklist.** Trunk is the starting point, but specific commits are removed
  because they are "not ready." Removing a commit that has dependencies is often impossible
  cleanly, requiring manual reversal.
- **The feature-complete gate.** Commits are held back until the product manager approves the
  feature as complete. Trunk accumulates undeployable partial work. The gate is the symptom;
  the incomplete work being merged to trunk is the root cause.
- **The hotfix bypass.** A critical bug is fixed on the release branch but the cherry-pick back
  to trunk is forgotten. The next release reintroduces the bug because trunk never had the fix.

The telltale sign: the team has a meeting or a process to decide which commits go into a release.
If you have to decide, trunk is not deployable.

## Why This Is a Problem

Cherry-pick releases are a workaround for a more fundamental problem: trunk is not trusted to be
in a deployable state at all times. The cherry-pick process does not solve that problem - it works
around it while making it more expensive and harder to fix.

### It reduces quality

Bugs that never existed on trunk appear on the release branch because the cherry-picked combination of commits was never tested as a coherent system. That is a class of defect the team creates by doing the cherry-pick. Cherry-picking changes the context in which code is tested. Trunk has commits in the order they
were written, with all their dependencies. A cherry-picked release branch has a subset of those
commits in a different order, possibly with conflicts and manual resolutions layered on top. The
release branch is a different artifact than trunk. Tests that pass on trunk may not pass - or may
not be sufficient - for the release branch.

The problem intensifies when the cherry-picked set creates implicit dependencies. Commit A changed
a shared utility function that Commit C also uses. Commit B was excluded. Without Commit B, the
utility function behaves differently than it does on trunk. The release branch has a combination
of code that never existed as a coherent state during development.

When trunk is always deployable, the release is simply a promotion of a tested, coherent state.
Every commit on trunk was tested in the context of all previous commits. There are no cherry-pick
combinations to reason about.

### It increases rework

Each cherry-pick is a manual operation. When commits have conflicts, the conflict must be resolved
manually. When the release branch needs a fix, the fix must often be applied to both the release
branch and trunk, a process known as backporting. Backporting is frequently forgotten, which means
the same bug reappears in the next release.

The rework is not just the cherry-pick operations themselves. It includes the review cycles: the
meeting to decide which commits are included, the re-testing of the release branch as a distinct
artifact, the investigation of bugs that appear only on the release branch, and the backport work.
All of that effort is overhead that produces no new functionality.

When trunk is always deployable, the release process is promotion and verification - testing a
state that already exists and was already tested. There is no branch-specific rework because there
is no branch.

### It makes delivery timelines unpredictable

The cherry-pick decision process cannot be time-boxed reliably. The release engineering team does
not know in advance how many commits will need review, how many conflicts will arise, or how much
the release branch will diverge from trunk. The release date slips not because development is
late but because the release process itself takes longer than expected.

Product managers and stakeholders experience this as "the release is ready, so why isn't it
deployed?" The code is complete. The features are tested. But the team is still in the cherry-pick
and release-branch-testing phase, which can add days to what appears complete from the outside.

The process also creates a queuing effect. When the release branch diverges far enough from trunk,
the divergence blocks new development on trunk because developers are unsure whether their changes
will conflict with the release branch activity. Work pauses while the release is sorted out. The
pause is unplanned and difficult to budget in advance.

### It signals a broken relationship with trunk

Each release cycle spent cherry-picking is a cycle not spent fixing the underlying problem. The process contains the damage while the root cause grows more expensive to address. Cherry-pick releases are a symptom, not a root cause. The reason the team cherry-picks is that
trunk is not trusted. Trunk is not trusted because incomplete features are merged before they are
safe to deploy, because the automated test suite does not provide sufficient confidence, or because
the team has no mechanism for hiding partially complete work from users. The cherry-pick process
is a compensating control that addresses the symptom while the root cause persists.

The cherry-pick process grows more expensive as more code is held back from trunk. Eventually
the team has a de-facto release branch strategy indistinguishable from the anti-patterns described
in [Release Branches with Extensive Backporting]({{< relref "/docs/anti-patterns/branching-integration/release-branches-backporting" >}}).

### Impact on continuous delivery

CD requires that every commit to trunk is potentially releasable. Cherry-pick releases prove the
opposite: most commits are not releasable, and it takes a manual curation process to assemble a
releasable set. That is the inverse of CD.

The cherry-pick process also makes deployment frequency a discrete, expensive event rather than a
routine operation. CD requires that deployment is cheap enough to do many times per day. If the
deployment process includes a review meeting, a branch creation, a targeted test cycle, and a
backport operation, it is not cheap. Teams with cherry-pick releases are typically limited to
weekly or monthly releases, which means bugs take weeks to reach users and business value is
delayed proportionally.

## How to Fix It

Eliminating cherry-pick releases requires making trunk trustworthy. The practices that do this -
feature flags, comprehensive automated testing, small batches, trunk-based development - are the
same practices that underpin continuous delivery.

### Step 1: Understand why commits are currently being held back

Do not start by changing the branching workflow. Start by understanding the reasons commits are
excluded from releases.

1. For the last three to five releases, list every commit that was held back and why.
2. Group the reasons: incomplete features, unreviewed changes, failed tests, stakeholder hold,
   uncertain dependencies, other.
3. The distribution tells you where to focus. If most holds are "incomplete feature," the fix is
   feature flags. If most holds are "failed tests," the fix is test reliability. If most holds
   are "stakeholder approval needed," the fix is shifting the approval gate earlier.

Document the findings. Share them with the team and get agreement on which root cause to address
first.

### Step 2: Introduce feature flags for incomplete work (Weeks 2-4)

The most common reason commits are held back is that the feature is not ready for users. Feature
flags decouple deployment from release. Incomplete work can merge to trunk and be deployed to
production while remaining invisible to users.

1. Choose a simple feature flag mechanism. A configuration file read at startup is sufficient to
   start.
2. For the next feature that would have been held back from a release, wrap the user-facing entry
   point in a flag.
3. Merge to trunk and deploy. Verify that the feature is invisible when the flag is off.
4. When the feature is ready, flip the flag. No deployment required.

Once the team sees that incomplete features do not require cherry-picking, the pull toward feature
flags grows naturally. Each held-back commit is a candidate for the flag treatment.

### Step 3: Strengthen the automated test suite (Weeks 2-5)

Commits are also held back because of uncertainty about their safety. That uncertainty is a
signal that the automated test suite is not providing sufficient confidence.

1. Identify the test gaps that correspond to the uncertainty. If the team is unsure whether a
   change affects the payment flow, are there tests for the payment flow?
2. Add tests for the high-risk paths that are currently unverified.
3. Set a requirement: if you cannot write a test that proves your change is safe, the change is
   not ready to merge.

The goal is a suite that makes the team confident enough in every green build to deploy it.
That confidence is what makes trunk deployable.

### Step 4: Move stakeholder approval before merge

If commits are held back because product managers have not signed off, the approval gate is in
the wrong place. Move it to before trunk integration.

1. Product review happens on a branch, before merge.
2. Once approved, the branch is merged to trunk.
3. Trunk is always in an approved state.

This is a workflow change, not a technical change. It requires that product managers review work
in progress rather than waiting for a release candidate. Most find this easier, not harder, because
they can give feedback while the developer is still working rather than after everything is frozen.

### Step 5: Deploy trunk directly on a fixed cadence (Weeks 4-6)

Once the holds are addressed - features flagged, tests strengthened, approvals moved earlier - run
an experiment: deploy trunk directly without a cherry-pick step.

1. Pick a low-stakes deployment window.
2. Deploy trunk as-is. Do not cherry-pick anything.
3. Monitor the deployment. If issues arise, diagnose their source. Are they from previously-held
   commits? From test gaps? From incomplete feature flag coverage?

Each deployment that succeeds without cherry-picking builds confidence. Each issue is a specific
thing to fix, not a reason to revert to cherry-picking.

### Step 6: Retire the cherry-pick process

Once trunk deployments have been reliable for several cycles, formalize the change. Remove the
cherry-pick step from the deployment runbook. Make "deploy trunk" the documented and expected
process.

| Objection | Response |
|-----------|----------|
| "We have commits on trunk that are not ready to go out" | Those commits should be behind feature flags. If they are not, that is the problem to fix. Every commit that merges to trunk should be deployable. |
| "Product has to approve features before they go live" | Approval should happen before the feature is activated - either before merge (flip the flag after approval) or by controlling the flag in production. Holding a deployment hostage to approval couples your release cadence to a process that can be decoupled. |
| "What if a cherry-picked commit breaks the release branch?" | It will. Repeatedly. That is the cost of the process you are describing. The alternative is to make trunk deployable so you never need the release branch. |
| "Our release process requires auditing which commits went out" | Deploy trunk and record the commit hash. The audit trail is a git log, not a cherry-pick selection record. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Commits held back per release | Should decrease toward zero |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Should increase as deployment becomes a lower-ceremony operation |
| Release branch divergence from trunk | Should decrease and eventually disappear |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as commits reach production without waiting for a curation cycle |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should remain stable or improve as trunk becomes reliably deployable |
| Deployment process duration | Should decrease as manual cherry-pick steps are removed |

## Related Content

- [Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}) - The branching model that makes trunk deployable by default
- [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - Breaking work into units small enough to merge complete
- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - Reducing batch size eliminates the need to hold back commits
- [Release Branches with Extensive Backporting]({{< relref "/docs/anti-patterns/branching-integration/release-branches-backporting" >}}) - The pattern that cherry-picking evolves into when not addressed
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Building the test confidence that makes trunk trustworthy
