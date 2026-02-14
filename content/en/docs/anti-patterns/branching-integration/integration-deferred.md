---
title: "Integration Deferred"
linkTitle: "Integration Deferred"
weight: 11
category: "Branching & Integration"
risk_level: critical
description: >
  The build has been red for weeks and nobody cares. "CI" means a build server exists, not that
  anyone actually integrates continuously.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What This Looks Like

The team has a build server. It runs after every push. There is a dashboard somewhere that shows
build status. But the build has been red for three weeks and nobody has mentioned it. Developers
push code, glance at the result if they remember, and move on. When someone finally investigates,
the failure is in a test that broke weeks ago and nobody can remember which commit caused it.

The word "continuous" has lost its meaning. Developers do not integrate their work into trunk
daily - they work on branches for days or weeks and merge when the feature feels done. The build
server runs, but nobody treats a red build as something that must be fixed immediately. There is no
shared agreement that trunk should always be green. "CI" is a tool in the infrastructure, not a
practice the team follows.

Common variations:

- **The build server with no standards.** A CI server runs on every push, but there are no rules
  about what happens when it fails. Some developers fix their failures. Others do not. The build
  flickers between green and red all day, and nobody trusts the signal.
- **The nightly build.** The build runs once per day, overnight. Developers find out the next
  morning whether yesterday's work broke something. By then they have moved on to new work and
  lost context on what they changed.
- **The "CI" that is just compilation.** The build server compiles the code and nothing else. No
  tests run. No static analysis. The build is green as long as the code compiles, which tells the
  team almost nothing about whether the software works.
- **The manually triggered build.** The build server exists, but it does not run on push. After
  pushing code, the developer must log into the CI server and manually start the build and tests.
  When developers are busy or forget, their changes sit untested. When multiple pushes happen
  between triggers, a failure could belong to any of them. The feedback loop depends entirely on
  developer discipline rather than automation.
- **The branch-only build.** CI runs on feature branches but not on trunk. Each branch builds in
  isolation, but nobody knows whether the branches work together until merge day. Trunk is not
  continuously validated.
- **The ignored dashboard.** The CI dashboard exists but is not displayed anywhere the team can
  see it. Nobody checks it unless they are personally waiting for a result. Failures accumulate
  silently.

The telltale sign: if you can ask "how long has the build been red?" and nobody knows the answer,
continuous integration is not happening.

## Why This Is a Problem

Continuous integration is not a tool - it is a practice. The practice requires that every developer
integrates to a shared trunk at least once per day and that the team treats a broken build as the
highest-priority problem. Without the practice, the build server is just infrastructure generating
notifications that nobody reads.

### It reduces quality

When the build is allowed to stay red, the team loses its only automated signal that something is
wrong. A passing build is supposed to mean "the software works as tested." A failing build is
supposed to mean "stop and fix this before doing anything else." When failures are ignored, that
signal becomes meaningless. Developers learn that a red build is background noise, not an alarm.

Once the build signal is untrusted, defects accumulate. A developer introduces a bug on Monday. The
build fails, but it was already red from an unrelated failure, so nobody notices. Another developer
introduces a different bug on Tuesday. By Friday, trunk has multiple interacting defects and nobody
knows when they were introduced or by whom. Debugging becomes archaeology.

When the team practices continuous integration, a red build is rare and immediately actionable. The
developer who broke it knows exactly which change caused the failure because they committed minutes
ago. The fix is fast because the context is fresh. Defects are caught individually, not in tangled
clusters.

### It increases rework

Without continuous integration, developers work in isolation for days or weeks. Each developer
assumes their code works because it passes on their machine or their branch. But they are building
on assumptions about shared code that may already be outdated. When they finally integrate, they
discover that someone else changed an API they depend on, renamed a class they import, or modified
behavior they rely on.

The rework cascade is predictable. Developer A changes a shared interface on Monday. Developer B
builds three days of work on the old interface. On Thursday, developer B tries to integrate and
discovers the conflict. Now they must rewrite three days of code to match the new interface. If
they had integrated on Monday, the conflict would have been a five-minute fix.

Teams that integrate continuously discover conflicts within hours, not days. The rework is measured
in minutes because the conflicting changes are small and the developers still have full context on
both sides. The total cost of integration stays low and constant instead of spiking unpredictably.

### It makes delivery timelines unpredictable

A team without continuous integration cannot answer the question "is the software releasable right
now?" Trunk may or may not compile. Tests may or may not pass. The last successful build may have
been a week ago. Between then and now, dozens of changes have landed without anyone verifying that
they work together.

This creates a stabilization period before every release. The team stops feature work, fixes the
build, runs the test suite, and triages failures. This stabilization takes an unpredictable amount
of time - sometimes a day, sometimes a week - because nobody knows how many problems have
accumulated since the last known-good state.

With continuous integration, trunk is always in a known state. If the build is green, the team can
release. If the build is red, the team knows exactly which commit broke it and how long ago. There
is no stabilization period because the code is continuously stabilized. Release readiness is a
fact that can be checked at any moment, not a state that must be achieved through a dedicated
effort.

### It masks the true cost of integration problems

When the build is permanently broken or rarely checked, the team cannot see the patterns that would
tell them where their process is failing. Is the build slow? Nobody notices because nobody waits
for it. Are certain tests flaky? Nobody notices because failures are expected. Do certain parts of
the codebase cause more breakage than others? Nobody notices because nobody correlates failures to
changes.

These hidden problems compound. The build gets slower because nobody is motivated to speed it up.
Flaky tests multiply because nobody quarantines them. Brittle areas of the codebase stay brittle
because the feedback that would highlight them is lost in the noise.

When the team practices CI and treats a red build as an emergency, every friction point becomes
visible. A slow build annoys the whole team daily, creating pressure to optimize it. A flaky test
blocks everyone, creating pressure to fix or remove it. The practice surfaces the problems. Without
the practice, the problems are invisible and grow unchecked.

### Impact on continuous delivery

Continuous integration is the foundation that every other CD practice is built on. Without it, the
pipeline cannot give fast, reliable feedback on every change. Automated testing is pointless if
nobody acts on the results. Deployment automation is pointless if the artifact being deployed has
not been validated. Small batches are pointless if the batches are never verified to work together.

A team that does not practice CI cannot practice CD. The two are not independent capabilities that
can be adopted in any order. CI is the prerequisite. Every hour that the build stays red is an
hour during which the team has no automated confidence that the software works. Continuous delivery
requires that confidence to exist at all times.

## How to Fix It

### Step 1: Fix the build and agree it stays green (Week 1)

Before anything else, get trunk to green. This is the team's first and most important commitment.

1. Assign the broken build as the highest-priority work item. Stop feature work if necessary.
2. Triage every failure: fix it, quarantine it to a non-blocking suite, or delete the test if it
   provides no value.
3. Once the build is green, make the team agreement explicit: **a red build is the team's top
   priority.** Whoever broke it fixes it. If they cannot fix it within 15 minutes, they revert
   their change and try again with a smaller commit.

Write this agreement down. Put it in the team's working agreements document. If you do not have
one, start one now. The agreement is simple: we do not commit on top of a red build, and we do not
leave a red build for someone else to fix.

### Step 2: Make the build visible (Week 1)

The build status must be impossible to ignore:

- Display the build dashboard on a large monitor visible to the whole team.
- Configure notifications so that a broken build alerts the team immediately - in the team chat
  channel, not in individual email inboxes.
- If the build breaks, the notification should identify the commit and the committer.

Visibility creates accountability. When the whole team can see that the build broke at 2:15 PM
and who broke it, social pressure keeps people attentive. When failures are buried in email
notifications, they are easily ignored.

### Step 3: Require integration at least once per day (Week 2)

The "continuous" in continuous integration means at least daily, and ideally multiple times per day.
Set the expectation:

- Every developer integrates their work to trunk at least once per day.
- If a developer has been working on a branch for more than a day without integrating, that is a
  problem to discuss at standup.
- Track [integration frequency](../../../reference/metrics/integration-frequency/) per developer
  per day. Make it visible alongside the build dashboard.

This will expose problems. Some developers will say their work is not ready to integrate. That is a
decomposition problem - the work is too large. Some will say they cannot integrate because the build
is too slow. That is a pipeline problem. Each problem is worth solving. See
[Long-Lived Feature Branches](long-lived-feature-branches/) for techniques to break large work
into daily integrations.

### Step 4: Make the build fast enough to provide useful feedback (Weeks 2-3)

A build that takes 45 minutes is a build that developers will not wait for. Target under 10
minutes for the primary feedback loop:

- Identify the slowest stages and optimize or parallelize them.
- Move slow integration tests to a secondary pipeline that runs after the fast suite passes.
- Add build caching so that unchanged dependencies are not recompiled on every run.
- Run tests in parallel if they are not already.

The goal is a fast feedback loop: the developer pushes, waits a few minutes, and knows whether
their change works with everything else. If they have to wait 30 minutes, they will context-switch,
and the feedback loop breaks.

### Step 5: Address the objections (Weeks 3-4)

| Objection | Response |
|-----------|----------|
| "The build is too slow to fix every red immediately" | Then the build is too slow, and that is a separate problem to solve. A slow build is not a reason to ignore failures - it is a reason to invest in making the build faster. |
| "Some tests are flaky - we can't treat every failure as real" | Quarantine flaky tests into a non-blocking suite. The blocking suite must be deterministic. If a test in the blocking suite fails, it is real until proven otherwise. |
| "We can't integrate daily - our features take weeks" | The features take weeks. The integrations do not have to. Use branch by abstraction, feature flags, or vertical slicing to integrate partial work daily. |
| "Fixing someone else's broken build is not my job" | It is the whole team's job. A red build blocks everyone. If the person who broke it is unavailable, someone else should revert or fix it. The team owns the build, not the individual. |
| "We have CI - the build server runs on every push" | A build server is not CI. CI is the practice of integrating frequently and keeping the build green. If the build has been red for a week, you have a build server, not continuous integration. |

### Step 6: Build the habit (Week 4+)

Continuous integration is a daily discipline, not a one-time setup. Reinforce the habit:

- Review integration frequency in retrospectives. If it is dropping, ask why.
- Celebrate streaks of consecutive green builds. Make it a point of team pride.
- When a developer reverts a broken commit quickly, recognize it as the right behavior - not as a
  failure.
- Periodically audit the build: is it still fast? Are new flaky tests creeping in? Is the test
  coverage meaningful?

The goal is a team culture where a red build feels wrong - like an alarm that demands immediate
attention. When that instinct is in place, CI is no longer a process being followed. It is how
the team works.

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Build pass rate | Percentage of builds that pass on first run - should be above 95% |
| Time to fix a broken build | Should be under 15 minutes, with revert as the fallback |
| [Integration frequency](../../../reference/metrics/integration-frequency/) | At least one integration per developer per day |
| [Build duration](../../../reference/metrics/build-duration/) | Should be under 10 minutes for the primary feedback loop |
| Longest period with a red build | Should be measured in minutes, not hours or days |
| [Development cycle time](../../../reference/metrics/development-cycle-time/) | Should decrease as integration overhead drops and stabilization periods disappear |

## Related Content

- [Trunk-Based Development](../../../migrate-to-cd/migration-path/foundations/trunk-based-development/) - CI requires integrating to a shared trunk, not just building branches
- [Build Automation](../../../migrate-to-cd/migration-path/foundations/build-automation/) - The pipeline infrastructure that CI depends on
- [Testing Fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Fast, reliable tests are essential for a CI build that teams trust
- [Long-Lived Feature Branches](long-lived-feature-branches/) - Long branches prevent daily integration and are both a cause and symptom of missing CI
- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - The team agreement to keep the build green must be explicit
