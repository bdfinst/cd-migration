---
title: "Environment Branches"
linkTitle: "Environment branches"
weight: 14
category: "Branching & Integration"
risk_level: critical
description: >
  A long-lived git branch for each environment, where merging into a branch is the deployment.
  Each merge produces a new combination of code and config that nobody has tested.
tags:
  - integration-frequency
  - batch-size
  - environment-consistency
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What this looks like

The repository has long-lived branches named for environments: `dev`, `uat`, and `master`. Each
branch maps to a running environment. Merging into a branch is the deployment. Merge to `dev` and
the dev environment updates. Merge `dev` into `uat` and testers see the change. Merge `uat` into
`master` and it goes to production.

Each branch carries its own environment-specific configuration: connection strings, URLs,
credential references, and sometimes small code differences. Developers branch features from
`master` and merge them into each environment branch separately. A feature can be in `dev` but not
in `uat`, and nobody can say with confidence which environment has which change. This page is about
git branches. For environment checks written into application code, see
[Hardcoded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}).

Common variations:

- **The promotion merge.** A change moves forward by merging `dev` into `uat` and `uat` into
  `master`. Each merge needs conflict resolution because the branches have drifted apart.
- **The cherry-pick promotion.** Only some commits move to the next environment. The branches now
  hold different sets of changes and the differences grow with every release.
- **The config-only branch.** The code is the same on paper, but each branch holds its own copy of
  the config files. Those copies diverge as people fix one environment and forget the others.
- **The gatekeeper branch.** A QA or UAT team controls what merges into `uat`. The team decides
  which features are tested together, so features are tested in combinations that never reach
  production.

The telltale sign: a developer asks "is my change in uat yet?" and the answer requires checking
branch history instead of looking at a single pipeline.

## Why this is a problem

Environment branches feel orderly. Each environment has a home in version control, and promotion
looks like a controlled process. But the process moves code between branches instead of moving one
tested artifact between environments. That delays integration, multiplies the code that must be
verified, and lets environments drift apart.

### It reduces quality

A test run on one branch is invalidated when the code is merged to another branch. Each merge
produces a new, untested combination of code and config. The `uat` branch passed its tests with
the `uat` config and the features merged into it. The merge into `master` brings in the `master`
config and possibly different features. The result is something nobody has ever run.

Teams know this and compensate by re-testing after every merge, or by skipping the re-test and
hoping. Neither works. Re-testing every branch multiplies the cost of verification. Skipping it
ships untested combinations to production. Production incidents then trace to "a config difference
we did not know about" or "a feature that was only in uat."

With one release candidate (an
[immutable artifact]({{< relref "/docs/reference/glossary#immutable-artifact" >}}) that has not
yet been released) tested in every environment, a passing result applies to the exact bytes that
reach production. There is no merge between test and release to invalidate it.

### It increases rework

Every change must be merged once per environment branch. A bug fix applied to `uat` must also reach
`dev` and `master`, or the branches diverge. Conflicts appear because the branches carry different
config and different subsets of features. Developers spend time reconciling branches instead of
building features.

Rework also comes from failures that only appear in one environment. A defect that "works in dev,
fails in UAT" takes time to diagnose because the cause could be the code, the config, or the set
of features merged into that branch. Developers diff branches to find which of the three it is.

When every environment runs the same artifact, the only difference is configuration injected at
deployment time. A failure in one environment points to the config or the infrastructure, not to a different
build.

### It makes delivery timelines unpredictable

Promotion becomes a queue. A change waits for the next merge to `uat`, then for the testers to
finish, then for the next merge to `master`. Each wait depends on someone's schedule. The time from
"merged to `dev`" to "in production" varies from days to weeks, and nobody can forecast it.

Merge conflicts add more variance. The merge from `uat` to `master` may be trivial or may need a
day of work. The team learns the cost only when it tries. Release dates slip, and the usual
response is more coordination, which adds more waiting.

With a single path to production, the time from commit to release is the pipeline's run time plus
any deliberate approval. It is the same for every change, so it can be predicted.

### It defers integration and lets environments drift

Features sit on `dev` or `uat` for days or weeks before they reach `master`. Integration with the
rest of the system is deferred until the final merge, which is the same [deferred
integration]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}})
problem that long-lived feature branches create. The risk lands at the end, close to the release
date.

Meanwhile the environments drift. Each branch accumulates its own fixes and its own config. Over
time `dev`, `uat`, and `master` stop being copies of each other with different settings and
become three different systems. "Works in dev, fails in UAT" is the visible result.

[Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}) with one artifact keeps the environments identical in everything except
config, and keeps that config outside the code.

### Impact on continuous delivery

[Continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) depends on a
single, repeatable path where every change is built once, verified, and released. Environment
branches replace that path with several. The artifact that reaches production is not the artifact
that was tested, so the test results cannot support a decision to release.

Environment branches also prevent [continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}).
Work is not integrated to trunk daily when it must be merged into several long-lived branches
first. The [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) cannot give fast, trustworthy feedback when each branch is a separate path with its own config and its
own untested merge at the end.

## How to fix it

### Step 1: Inventory the differences and move config out of the branches (weeks 1-2)

Compare the branches: `git diff dev..uat` and `git diff uat..master`. List every difference and
sort each into one of three groups:

1. **Environment values.** URLs, hostnames, credential references, feature settings. These belong
   in runtime configuration.
2. **Code differences.** Behavior that exists on one branch and not another. These need to be
   merged to trunk.
3. **Accidental drift.** Fixes applied to one branch and never carried over. Decide which version
   is correct and keep only that one.

Move the environment values out of the repository's branches and into configuration injected at
deployment time. See [Application Configuration]({{< relref "/docs/pipeline/application-config" >}}) for how
to separate config from the build.

### Step 2: Build one release candidate from trunk and promote it (weeks 2-4)

A release candidate is an
[immutable artifact]({{< relref "/docs/reference/glossary#immutable-artifact" >}}) that has not
yet been released. Its lifecycle has three parts:

1. **Build once** from trunk. The pipeline produces a single artifact.
2. **Test that same artifact** in every environment, in order, supplying each environment's config
   at deploy time.
3. **Discard or release.** If any test fails, discard the candidate and fix trunk. If all pass,
   release that artifact.

Nothing is rebuilt or merged between environments, so a passing result stays valid. Start from
[Immutable Artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}}), route every change
through a [Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}), and
agree on what makes a candidate good enough to release with the
[Deployable Definition]({{< relref "/docs/pipeline/deployable-definition" >}}).

### Step 3: Integrate incomplete work to trunk with evolutionary coding (weeks 3-6)

Environment branches often exist to hold work that is not ready for production. Integrate that work
to trunk instead. Start with the least intrusive technique that fits. The
[Evolutionary Coding]({{< relref "/docs/foundations/evolutionary-coding" >}}) index explains how to
choose.

- **[Dark code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}).** Build and
  deploy the new logic with nothing calling it, then connect it last. Also known as "connect tests
  last" or "dark launch."
- **[Branch by abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}).**
  Put an abstraction in front of the old behavior, build the replacement behind it, and switch over
  when ready.
- **[Parallel run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}).** Run the
  old and new implementations side by side and compare results before trusting the new one.
- **[Expand and contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}).**
  Add the new structure next to the old, migrate consumers, then remove the old structure.
- **[Strangler fig]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}).**
  Route traffic to a new subsystem piece by piece when you are replacing a whole subsystem, not a
  single implementation.

### Step 4: Use feature flags as the last resort (weeks 4-6)

When none of the techniques above fit, hide the incomplete work behind a toggle. See
[Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}). Flags add runtime state and cleanup
work, so use them only where the earlier techniques do not apply.

### Step 5: Retire the environment branches (weeks 6-8)

Once the pipeline builds from trunk and selects each environment's config at deploy time, the
branches have no job. Merge any changes you still want to trunk, stop accepting merges into
`dev` and `uat`, then delete them. Keep one trunk. The pipeline, not the branch name, decides which
environment receives the artifact.

### Step 6: Address the objections (ongoing)

| Objection | Response |
|-----------|----------|
| "We need a branch per environment to hold the config" | Config in a branch means a merge can change it. Supply environment values at deploy time so one artifact runs everywhere and the config is reviewed in one place. |
| "UAT needs to control what gets tested" | UAT controls what is promoted, not what is merged. Testers pull the current release candidate into their environment and decide whether it moves on. Features that are not ready stay dark in the same artifact. |
| "We can't deploy incomplete features" | You can deploy them if nothing reaches them. Dark code and the other techniques in Step 3 keep unfinished work out of reach. |
| "The branches protect production from unfinished work" | A branch gives no protection that a tested artifact does not already give, and every merge adds an untested combination. Production is safer when the same artifact passed every earlier stage. |
| "Changing this is a big risk" | Move one environment at a time. Start by building one artifact for `dev` and `uat`, prove it, then fold in `master`. Each step is small and reversible. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| Number of long-lived environment branches | Should drop to zero |
| Differences between environments' deployed artifacts | Should drop to zero. Only config differs. |
| [Integration frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) | Should increase toward at least daily per developer |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Should decrease as promotion merges and queues disappear |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease and become more consistent |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as production runs what was tested |

## Team discussion

Use these questions in a retrospective to explore how this anti-pattern affects your team:

- Can we say, right now, which features are in each environment? How long does it take to find out?
- When did a defect last appear in one environment and not another? What turned out to be the cause?
- Which differences between our environment branches are config, which are code, and which are accidents?

## Related content

- [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}) - the same deferred integration problem, at the feature level
- [Cherry-Pick Releases]({{< relref "/docs/anti-patterns/branching-integration/cherry-pick-releases" >}}) - the same selective promotion, applied to release branches
- [Release Branches with Extensive Backporting]({{< relref "/docs/anti-patterns/branching-integration/release-branches-backporting" >}}) - another long-lived branch per target, with the same merge overhead
- [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}}) - why late integration concentrates risk near the release
- [Artifacts Rebuilt per Environment]({{< relref "/docs/symptoms/deployment/artifacts-rebuilt-per-environment" >}}) - the symptom of building again for each environment
- [Immutable Artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}}) - build once and promote the same artifact
- [Hardcoded Environment Assumptions]({{< relref "/docs/anti-patterns/pipeline/hardcoded-environment-assumptions" >}}) - environment checks in code, a separate problem from environment branches in git
- [Evolutionary Coding]({{< relref "/docs/foundations/evolutionary-coding" >}}) - techniques for integrating incomplete work to trunk

Content contributed by {{% contributor-credit "jun-jose" %}}
