---
aliases:
  - /docs/symptoms/resistance-to-trunk-based-development/
title: "The Team Resists Merging to the Main Branch"
linkTitle: "Resistance to trunk-based development"
description: >
  Developers feel unsafe committing to trunk. Feature branches persist for days or weeks before merge.
tags:
  - integration-frequency
  - batch-size
---

## What you are seeing

Everyone still has long-lived feature branches. The team agreed to try [trunk-based development](../../glossary/#tbd-trunk-based-development), but three sprints later "merge to trunk when the feature is done" is the informal rule. Branches live for days or weeks. When developers finally merge, there are conflicts. The conflicts take hours to resolve. Everyone agrees this is a problem but nobody knows how to break the cycle.

The core objection is safety: "I'm not going to push half-finished code to main." This is a reasonable concern in the current environment. The main branch has no automated test suite that would catch regressions quickly. There is no [feature flag](../../glossary/#feature-flag) infrastructure to let partially-built features live in production in a dormant state. Trunk-based development feels reckless because the prerequisites for it are not in place.

The team is not wrong to feel unsafe. They are wrong to believe long-lived branches are safer. The longer a branch lives, the larger the eventual merge, the more conflicts, and the more risk concentrated into the merge event. The fear of merging to trunk is rational, but the response makes the underlying problem worse.

## Common causes

### Manual testing only

Without a fast automated test suite, merging to trunk means accepting unknown risk. Developers protect themselves by deferring the merge until they have done sufficient manual verification - which takes days. Teams with a fast automated suite that runs in minutes find the resistance dissolves. When a broken commit is caught in five minutes, committing to trunk stops feeling reckless and starts feeling like the obvious way to work.

**Read more:** [Manual testing only](../../anti-patterns/testing/manual-testing-only/)

### Manual regression testing gates

When a manual QA phase gates each release, trunk is never truly releasable. Merging to trunk does not mean the code is production-ready - it still has to pass manual testing. This reduces the psychological pressure to keep trunk releasable. The team does not feel the cost of a broken trunk immediately because it is not the signal they monitor.

When trunk is the thing that gates production, a broken trunk is a fire drill - every minute it is broken is a minute the team cannot ship. That urgency is what makes developers take frequent integration seriously. Without it, the resistance to committing to trunk has no natural counter-pressure.

**Read more:** [Manual regression testing gates](../../anti-patterns/testing/manual-regression-testing-gates/)

### Long-lived feature branches

Feature branch habits are self-reinforcing. Teams with ingrained feature branch practices have calibrated their workflows, tools, and feedback loops to the batching model. Switching to trunk-based development requires changing all of those workflows simultaneously, which is disorienting.

The habits that make long-lived branches feel safe - waiting to merge until the feature is complete, doing final testing on the branch, getting full review before touching trunk - are the same habits that keep the resistance alive. Small, deliberate workflow changes - reviewing smaller units, integrating while work is in progress, getting feedback from the [pipeline](../../glossary/#pipeline) rather than a gated review - reduce the resistance step by step rather than requiring an all-at-once mindset shift.

**Read more:** [Long-lived feature branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)

### Monolithic work items

Large work items cannot be integrated to trunk incrementally without deliberate design. A story that takes three weeks requires either keeping a branch for three weeks, or learning to hide in-progress work behind feature flags, dark launch patterns, or abstraction layers. Without those techniques, large items force long-lived branches.

Decomposing work into smaller items that can be integrated to trunk in a day or two makes trunk-based development natural rather than effortful.

**Read more:** [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/)

## How to narrow it down

1. **Does the team have an automated test suite that runs in under 10 minutes?** If not, the feedback loop needed to make frequent trunk commits safe does not exist. Start with [Manual testing only](../../anti-patterns/testing/manual-testing-only/).
2. **Is trunk always releasable?** If releases require a manual QA phase regardless of trunk state, there is no incentive to keep trunk releasable. Start with [Manual regression testing gates](../../anti-patterns/testing/manual-regression-testing-gates/).
3. **Do work items typically take more than two days to complete?** If items take longer than two days, integrating to trunk daily requires techniques for hiding in-progress work. Start with [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/).

**Ready to fix this?** The most common cause is [Long-lived feature branches](../../anti-patterns/branching-integration/long-lived-feature-branches/). Start with its [How to Fix It](../../anti-patterns/branching-integration/long-lived-feature-branches/#how-to-fix-it) section for week-by-week steps.
