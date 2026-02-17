---
title: "Working Agreements"
linkTitle: "Working Agreements"
weight: 6
description: >
  Establish shared definitions of done and ready to align the team on quality and process.
---

{{% pageinfo %}}
**Phase 1 - Foundations**

The practices in Phase 1 - trunk-based development, testing, small work, and fast review - only work when the whole team commits to them. Working agreements make that commitment explicit. This page covers the key agreements a team needs before moving to pipeline automation in Phase 2.
{{% /pageinfo %}}

## Why Working Agreements Matter

A working agreement is a shared commitment that the team creates, owns, and enforces together. It is not a policy imposed from outside. It is the team's own answer to the question: "How do we work together?"

Without working agreements, CD practices drift. One developer integrates daily; another keeps a branch for a week. One developer fixes a broken build immediately; another waits until after lunch. These inconsistencies compound. Within weeks, the team is no longer practicing CD - they are practicing individual preferences.

Working agreements prevent this drift by making expectations explicit. When everyone agrees on what "done" means, what "ready" means, and how CI works, the team can hold each other accountable without conflict.

## Definition of Done

The Definition of Done (DoD) is the team's shared standard for when a work item is complete. For CD, the Definition of Done must include deployment.

### Minimum Definition of Done for CD

A work item is **done** when all of the following are true:

- [ ] Code is integrated to trunk
- [ ] All automated tests pass
- [ ] Code has been reviewed (via pairing, mob, or pull request)
- [ ] The change is deployable to production
- [ ] No known defects are introduced
- [ ] Relevant documentation is updated (API docs, runbooks, etc.)
- [ ] Feature flags are in place for incomplete user-facing features

### Why "Deployed to Production" Matters

Many teams define "done" as "code is merged." This creates a gap between "done" and "delivered." Work accumulates in a staging environment, waiting for a release. Risk grows with each unreleased change.

In a CD organization, "done" means the change is in production (or ready to be deployed to production at any time). This is the ultimate test of completeness: the change works in the real environment, with real data, under real load.

In Phase 1, you may not yet have the pipeline to deploy every change to production automatically. That is fine - your DoD should still include "deployable to production" as the standard, even if the deployment step is not yet automated. The pipeline work in [Phase 2](../../pipeline/) will close that gap.

### Extending Your Definition of Done

As your CD maturity grows, extend the DoD:

| Phase | Addition to DoD |
|-------|-----------------|
| Phase 1 (Foundations) | Code integrated to trunk, tests pass, reviewed, deployable |
| Phase 2 (Pipeline) | Artifact built and validated by the pipeline |
| Phase 3 (Optimize) | Change deployed to production behind a feature flag |
| Phase 4 (Deliver on Demand) | Change deployed to production and monitored |

## Definition of Ready

The Definition of Ready (DoR) answers: "When is a work item ready to be worked on?" Pulling unready work into development creates waste - unclear requirements lead to rework, missing acceptance criteria lead to untestable changes, and oversized stories lead to long-lived branches.

### Minimum Definition of Ready for CD

A work item is **ready** when all of the following are true:

- [ ] Acceptance criteria are defined and specific (using Given-When-Then or equivalent)
- [ ] The work item is small enough to complete in 2 days or less
- [ ] The work item is testable - the team knows how to verify it works
- [ ] Dependencies are identified and resolved (or the work item is independent)
- [ ] The team has discussed the work item (Three Amigos or equivalent)
- [ ] The work item is estimated (or the team has agreed estimation is unnecessary for items this small)

### Common Mistakes with Definition of Ready

- **Making it too rigid.** The DoR is a guideline, not a gate. If the team agrees a work item is understood well enough, it is ready. Do not use the DoR to avoid starting work.
- **Requiring design documents.** For small work items (< 2 days), a conversation and acceptance criteria are sufficient. Formal design documents are for larger initiatives.
- **Skipping the conversation.** The DoR is most valuable as a prompt for discussion, not as a checklist. The Three Amigos conversation matters more than the checkboxes.

## CI Working Agreement

The CI working agreement codifies how the team practices continuous integration. This is the most operationally critical working agreement for CD.

### The CI Agreement

The team agrees to the following practices:

**Integration:**

- [ ] Every developer integrates to trunk at least once per day
- [ ] Branches (if used) live for less than 24 hours
- [ ] No long-lived feature, development, or release branches

**Build:**

- [ ] All tests must pass before merging to trunk
- [ ] The build runs on every commit to trunk
- [ ] Build results are visible to the entire team

**Broken builds:**

- [ ] A broken build is the team's top priority - it is fixed before any new work begins
- [ ] The developer(s) who broke the build are responsible for fixing it immediately
- [ ] If the fix will take more than 10 minutes, revert the change and fix it offline
- [ ] No one commits to a broken trunk (except to fix the break)

**Work in progress:**

- [ ] Finishing existing work takes priority over starting new work
- [ ] The team limits work in progress to maintain flow
- [ ] If a developer is blocked, they help a teammate before starting a new story

### Why "Broken Build = Top Priority"

This is the single most important CI agreement. When the build is broken:

- No one can integrate safely. Changes are stacking up.
- Trunk is not releasable. The team has lost its safety net.
- Every minute the build stays broken, the team accumulates risk.

"Fix the build" is not a suggestion. It is an agreement that the team enforces collectively. If the build is broken and someone starts a new feature instead of fixing it, the team should call that out. This is not punitive - it is the team protecting its own ability to deliver.

#### Stop the Line - Why All Work Stops

Some teams interpret "fix the build" as "stop merging until it is green." That is not enough. When the build is red, **all feature work stops** - not just merges. Every developer on the team shifts attention to restoring green.

This sounds extreme, but the reasoning is straightforward:

- **Work closer to production is more valuable than work further away.** A broken trunk means nothing in progress can ship. Fixing the build is the highest-leverage activity anyone on the team can do.
- **Continuing feature work creates a false sense of progress.** Code written against a broken trunk is untested against the real baseline. It may compile, but it has not been validated. That is not progress - it is inventory.
- **The team mindset matters more than the individual fix.** When everyone stops, the message is clear: the build belongs to the whole team, not just the person who broke it. This shared ownership is what separates teams that practice CI from teams that merely have a CI server.

#### Two Timelines: Stop vs. Do Not Stop

Consider two teams that encounter the same broken build at 10:00 AM.

**Team A stops all feature work:**

- 10:00 - Build breaks. The team sees the alert and stops.
- 10:05 - Two developers pair on the fix while a third reviews the failing test.
- 10:20 - Fix is pushed. Build goes green.
- 10:25 - The team resumes feature work. Total disruption: roughly 30 minutes.

**Team B treats it as one person's problem:**

- 10:00 - Build breaks. The developer who caused it starts investigating alone.
- 10:30 - Other developers commit new changes on top of the broken trunk. Some changes conflict with the fix in progress.
- 11:30 - The original developer's fix does not work because the codebase has shifted underneath them.
- 14:00 - After multiple failed attempts, the team reverts three commits (the original break plus two that depended on the broken state).
- 15:00 - Trunk is finally green. The team has lost most of the day, and three developers need to redo work. Total disruption: 5+ hours.

The team that stops immediately pays a small, predictable cost. The team that does not stop pays a large, unpredictable one.

### The Revert Rule

If a broken build cannot be fixed within 10 minutes, revert the offending commit and fix the issue on a branch. This keeps trunk green and unblocks the rest of the team. The developer who made the change is not being punished - they are protecting the team's flow.

Reverting feels uncomfortable at first. Teams worry about "losing work." But a reverted commit is not lost - the code is still in the Git history. The developer can re-apply their change after fixing the issue. The alternative - a broken trunk for hours while someone debugs - is far more costly.

#### When to Forward Fix vs. Revert

Not every broken build requires a revert. If the developer who broke it can identify the cause quickly, a forward fix is faster and simpler. The key is a strict time limit:

1. **Start a 15-minute timer** the moment the build goes red.
2. If the developer has a fix ready and pushed within 15 minutes, ship the forward fix.
3. If the timer expires and the fix is not in trunk, **revert immediately** - no extensions, no "I'm almost done."

The timer prevents the most common failure mode: a developer who is "five minutes away" from a fix for an hour. After 15 minutes without a fix, the probability of a quick resolution drops sharply, and the cost to the rest of the team climbs. Revert, restore green, and fix the problem offline without time pressure.

### Common Objections to Stop-the-Line

Teams adopting stop-the-line discipline encounter predictable pushback. These responses can help.

| Objection | Response |
|-----------|----------|
| "We can't afford to stop - we have a deadline." | You cannot afford not to stop. Every minute the build is red, you accumulate changes that are untested against the real baseline. Stopping for 20 minutes now prevents losing half a day later. The fastest path to your deadline runs through a green build. |
| "Stopping kills our velocity." | Velocity that includes work built on a broken trunk is an illusion. Those story points will come back as rework, failed deployments, or production incidents. Real velocity requires a releasable trunk. |
| "We already stop all the time - it's not working." | Frequent stops indicate a different problem: the team is merging changes that break the build too often. Address that root cause with better pre-merge testing, smaller commits, and pair programming on risky changes. Stop-the-line is the safety net, not the solution for chronic build instability. |
| "It's a known flaky test - we can ignore it." | A flaky test you ignore trains the team to ignore all red builds. Fix the flaky test or remove it. There is no middle ground. A red build must always mean "something is wrong" or the signal loses all value. |
| "Management won't support stopping feature work." | Frame it in terms management cares about: lead time and rework cost. Show the two-timeline comparison above. Teams that stop immediately have shorter cycle times and less unplanned rework. This is not about being cautious - it is about being fast. |

## How Working Agreements Support the CD Migration

Each working agreement maps directly to a Phase 1 practice:

| Practice | Supporting Agreement |
|----------|---------------------|
| [Trunk-based development](../trunk-based-development/) | CI agreement: daily integration, branch age < 24h |
| [Testing fundamentals](../testing-fundamentals/) | DoD: all tests pass. CI: tests pass before merge |
| [Build automation](../build-automation/) | CI: build runs on every commit. Broken build = top priority |
| [Work decomposition](../work-decomposition/) | DoR: work items < 2 days. WIP limits |
| [Code review](../code-review/) | CI: review within 2 hours. DoD: code reviewed |

Without these agreements, individual practices exist in isolation. Working agreements connect them into a coherent way of working.

## Template: Create Your Own Working Agreements

Use this template as a starting point. Customize it for your team's context. The specific targets may differ, but the structure should remain.

### Team Working Agreement Template

```markdown
# [Team Name] Working Agreement
Date: [Date]
Participants: [All team members]

## Definition of Done
A work item is done when:
- [ ] Code is integrated to trunk
- [ ] All automated tests pass
- [ ] Code has been reviewed (method: [pair / mob / PR])
- [ ] The change is deployable to production
- [ ] No known defects are introduced
- [ ] [Add team-specific criteria]

## Definition of Ready
A work item is ready when:
- [ ] Acceptance criteria are defined (Given-When-Then)
- [ ] The item can be completed in [X] days or less
- [ ] The item is testable
- [ ] Dependencies are identified
- [ ] The team has discussed the item
- [ ] [Add team-specific criteria]

## CI Practices
- Integration frequency: at least [X] per developer per day
- Maximum branch age: [X] hours
- Review turnaround: within [X] hours
- Broken build response: fix within [X] minutes or revert
- WIP limit: [X] items per developer

## Review Practices
- Default review method: [pair / mob / async PR]
- PR size limit: [X] lines
- Review focus: [correctness, security, clarity]
- Style enforcement: [automated via linting]

## Meeting Cadence
- Standup: [time, frequency]
- Retrospective: [frequency]
- Working agreement review: [frequency, e.g., monthly]

## Agreement Review
This agreement is reviewed and updated [monthly / quarterly].
Any team member can propose changes at any time.
All changes require team consensus.
```

### Tips for Creating Working Agreements

1. **Include everyone.** Every team member should participate in creating the agreement. Agreements imposed by a manager or tech lead are policies, not agreements.
2. **Start simple.** Do not try to cover every scenario. Start with the essentials (DoD, DoR, CI) and add specifics as the team identifies gaps.
3. **Make them visible.** Post the agreements where the team sees them daily - on a team wiki, in the team channel, or on a physical board.
4. **Review regularly.** Agreements should evolve as the team matures. Review them monthly. Remove agreements that are second nature. Add agreements for new challenges.
5. **Enforce collectively.** Working agreements are only effective if the team holds each other accountable. This is a team responsibility, not a manager responsibility.
6. **Start with agreements you can keep.** If the team is currently integrating once a week, do not agree to integrate three times daily. Agree to integrate daily, practice for a month, then tighten.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Agreement adherence | Team self-reports > 80% adherence | Indicates agreements are realistic and followed |
| Agreement review frequency | Monthly | Ensures agreements stay relevant |
| Integration frequency | Meets CI agreement target | Validates the CI working agreement |
| Broken build fix time | Meets CI agreement target | Validates the broken build response agreement |

## Next Step

With working agreements in place, your team has established the foundations for continuous delivery: daily integration, reliable testing, automated builds, small work, fast review, and shared commitments.

You are ready to move to [Phase 2: Pipeline](../../pipeline/), where you will build the automated path from commit to production.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## Related Content

- [Team Burnout](../../../symptoms/visibility/team-burnout/) - Symptom that clear agreements and sustainable practices help prevent
- [Unbounded WIP](../../../anti-patterns/team-workflow/unbounded-wip/) - Anti-pattern addressed by WIP limit agreements
- [Undone Work](../../../anti-patterns/team-workflow/undone-work/) - Anti-pattern prevented by a strong Definition of Done
- [Deadline-Driven Development](../../../anti-patterns/organizational-cultural/deadline-driven-development/) - Anti-pattern where pressure overrides team agreements
- [Velocity as Individual Metric](../../../anti-patterns/organizational-cultural/velocity-as-individual-metric/) - Anti-pattern that undermines collaborative working agreements
- [DORA Capabilities](../../../dora-capabilities/) - Research-backed capabilities that working agreements support
