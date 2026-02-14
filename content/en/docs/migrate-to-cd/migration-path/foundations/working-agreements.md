---
title: "Working Agreements"
linkTitle: "Working Agreements"
weight: 6
description: >
  Establish shared definitions of done and ready to align the team on quality and process.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | Adapted from [Dojo Consortium](https://dojoconsortium.org)

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

### The Revert Rule

If a broken build cannot be fixed within 10 minutes, revert the offending commit and fix the issue on a branch. This keeps trunk green and unblocks the rest of the team. The developer who made the change is not being punished - they are protecting the team's flow.

Reverting feels uncomfortable at first. Teams worry about "losing work." But a reverted commit is not lost - the code is still in the Git history. The developer can re-apply their change after fixing the issue. The alternative - a broken trunk for hours while someone debugs - is far more costly.

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

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
