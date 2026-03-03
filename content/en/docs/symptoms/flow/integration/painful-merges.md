---
aliases:
  - /docs/symptoms/painful-merges/
title: "Merging Is Painful and Time-Consuming"
linkTitle: "Painful merges"
description: >
  Integration is a dreaded, multi-day event. Teams delay merging because it is painful, which
  makes the next merge even worse.
tags:
  - integration-frequency
  - batch-size
---

## What you are seeing

A developer has been working on a feature branch for two weeks. They open a pull request and
discover dozens of conflicts across multiple files. Other developers have changed the same areas
of the codebase. Resolving the conflicts takes a full day. Some conflicts are straightforward
(two people edited adjacent lines), but others are semantic (two people changed the same
function's behavior in different ways). The developer must understand both changes to merge
correctly.

After resolving conflicts, the tests fail. The merged code compiles but does not work because the
two changes are logically incompatible. The developer spends another half-day debugging the
interaction. By the time the branch is merged, the developer has spent more time integrating than
they spent building the feature.

The team knows merging is painful, so they delay it. The delay makes the next merge worse because
more code has diverged. The cycle repeats until someone declares a "merge day" and the team spends
an entire day resolving accumulated drift.

## Common causes

### Long-Lived Feature Branches

When branches live for weeks or months, they accumulate divergence from the main line. The longer
the branch lives, the more changes happen on main that the branch does not include. At merge time,
all of that divergence must be reconciled at once. A branch that is one day old has almost no
conflicts. A branch that is two weeks old may have dozens.

**Read more:** [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}})

### Integration Deferred

When the team does not practice [continuous integration]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) (integrating to main at least daily), each
developer's work diverges independently. The build may be green on each branch but broken when
branches combine. CI means integrating continuously, not running a build server. Without frequent
integration, merge pain is inevitable.

**Read more:** [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}})

### Monolithic Work Items

When work items are too large to complete in a day or two, developers must stay on a branch for
the duration. A story that takes a week forces a week-long branch. Breaking work into smaller
increments that can be integrated daily eliminates the divergence window that causes painful
merges.

**Read more:** [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}})

## How to narrow it down

1. **How long do branches typically live before merging?** If branches live longer than two days,
   the [branch lifetime]({{< relref "/docs/reference/glossary#branch-lifetime" >}}) is the primary driver of merge pain. Start with
   [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}).
2. **Does the team integrate to main at least once per day?** If developers work in isolation for
   days before integrating, they are not practicing continuous integration regardless of whether a
   CI server exists. Start with
   [Integration Deferred]({{< relref "/docs/anti-patterns/branching-integration/integration-deferred" >}}).
3. **How large are the typical work items?** If stories take a week or more, the work
   decomposition forces long branches. Start with
   [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}).

---

**Ready to fix this?** The most common cause is [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches#how-to-fix-it" >}}) section for week-by-week steps.

## Related Content

- [Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}) - Long-lived work creates the divergence that makes merges painful
- [Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}) - Merge pain discourages frequent integration
- [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}) - The primary cause of merge conflicts
- [Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}) - Integrating at least daily to prevent divergence
- [Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) - Measure how often developers integrate to trunk
