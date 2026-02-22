---
aliases:
  - /docs/symptoms/prs-waiting-for-review/
title: "Pull Requests Sit for Days Waiting for Review"
linkTitle: "PRs waiting for review"
description: >
  Pull requests queue up and wait. Authors have moved on by the time feedback arrives.
tags:
  - integration-frequency
  - team-dynamics
---

## What you are seeing

A developer opens a pull request and waits. Hours pass. A day passes. They ping someone in chat.
Eventually, comments arrive, but the author has moved on to something else and has to reload
context to respond. Another round of comments. Another wait. The PR finally merges two or three
days after it was opened.

The team has five or more open PRs at any time. Some are days old. Developers start new work
while they wait, which creates more PRs, which creates more review load, which slows reviews
further.

## Common causes

### Long-Lived Feature Branches

When developers work on branches for days, the resulting PRs are large. Large PRs take longer to
review because reviewers need more time to understand the scope of the change. A 300-line PR is
daunting. A 50-line PR takes 10 minutes. The branch length drives the PR size, which drives the
review delay.

**Read more:** [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)

### Knowledge Silos

When only specific individuals can review certain areas of the codebase, those individuals become
bottlenecks. Their review queue grows while other team members who could review are not
considered qualified. The constraint is not review capacity in general but review capacity for
specific code areas concentrated in too few people.

**Read more:** [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Push-Based Work Assignment

When work is assigned to individuals, reviewing someone else's code feels like a distraction
from "my work." Every developer has their own assigned stories to protect. Helping a teammate
finish their work by reviewing their PR competes with the developer's own assignments. The
incentive structure deprioritizes collaboration.

**Read more:** [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/)

## How to narrow it down

1. **Are PRs larger than 200 lines on average?** If yes, the reviews are slow because the
   changes are too large to review quickly. Start with
   [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)
   and the work decomposition that feeds them.
2. **Are reviews waiting on specific individuals?** If most PRs are assigned to or waiting on
   one or two people, the team has a knowledge bottleneck. Start with
   [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).
3. **Do developers treat review as lower priority than their own coding work?** If yes, the
   team's norms do not treat review as a first-class activity. Start with
   [Push-Based Work Assignment](../../anti-patterns/team-workflow/push-based-work-assignment/) and
   establish a team [working agreement](../../glossary/#working-agreement) that reviews happen before starting new work.

---

**Ready to fix this?** The most common cause is [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/). Start with its [How to Fix It](../../anti-patterns/branching-integration/long-lived-feature-branches/#how-to-fix-it) section for week-by-week steps.

## Related Content

- [Everything Started, Nothing Finished](../too-much-wip/) - Blocked PRs drive up work in progress
- [Feedback Takes Hours Instead of Minutes](../no-fast-feedback/) - Review delays are a form of slow feedback
- [Long-Lived Feature Branches](../../anti-patterns/branching-integration/long-lived-feature-branches/) - Branches that outlive their review window
- [Code Review](../../migrate-to-cd/migration-path/foundations/code-review/) - Making review fast and continuous
- [Trunk-Based Development](../../migrate-to-cd/migration-path/foundations/trunk-based-development/) - Short-lived branches that are reviewed same-day
- [Development Cycle Time](../../metrics/development-cycle-time/) - Track review wait time as part of cycle time
