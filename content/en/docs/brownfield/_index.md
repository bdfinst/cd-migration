---
title: "Migrating Brownfield to CD"
linkTitle: "Brownfield CD"
weight: 3
description: >
  Already have a running system? A phased approach to migrating existing applications and teams to continuous delivery.
---

{{% pageinfo %}}
Most teams adopting CD are not starting from scratch. They have existing codebases, existing
processes, existing habits, and existing pain. This section provides the phased migration path
from where you are today to continuous delivery, without stopping feature delivery along the way.
{{% /pageinfo %}}

## The Reality of Brownfield Migration

Migrating an existing system to CD is harder than building CD into a greenfield project. You are
working against inertia: existing branching strategies, existing test suites (or lack thereof),
existing deployment processes, and existing team habits. Every change has to be made incrementally,
alongside regular delivery work.

The good news: every team that has successfully adopted CD has done it this way. The practices in
this guide are designed for incremental adoption, not big-bang transformation.

## The Migration Phases

The migration is organized into five phases. Each phase builds on the previous one. Start with
Phase 0 to understand where you are, then work through the phases in order.

| Phase | Name | Goal | Key Question |
|-------|------|------|--------------|
| 0 | [Assess](../migration-path/assess/) | Understand where you are | "How far are we from CD?" |
| 1 | [Foundations](../migration-path/foundations/) | Daily integration, testing, small work | "Can we integrate safely every day?" |
| 2 | [Pipeline](../migration-path/pipeline/) | Automated path to production | "Can we deploy any commit automatically?" |
| 3 | [Optimize](../migration-path/optimize/) | Improve flow, reduce batch size | "Can we deliver small changes quickly?" |
| 4 | [Continuous Deployment](../migration-path/continuous-deployment/) | Deploy on demand | "Can we deploy every change?" |

## Where to Start

### If you don't know where you stand

Start with [Phase 0 - Assess](../migration-path/assess/). Complete the value stream mapping exercise, take
baseline metrics, and fill out the current-state checklist. These activities tell you exactly
where you stand and which phase to begin with.

### If you know your biggest pain point

Start with [Anti-Patterns](../anti-patterns/). Find the problem your team feels most, and follow the
links to the practices and migration phases that address it.

### Quick self-assessment

If you don't have time for a full assessment, answer these questions:

- **Do all developers integrate to trunk at least daily?** If no, start with
  [Phase 1](../migration-path/foundations/).
- **Do you have a single automated pipeline that every change goes through?** If no, start with
  [Phase 2](../migration-path/pipeline/).
- **Can you deploy any green build to production on demand?** If no, focus on the gap between
  your current state and [Phase 2](../migration-path/pipeline/) completion criteria.
- **Do you deploy at least weekly?** If no, look at [Phase 3](../migration-path/optimize/) for batch size and
  flow optimization.

## Principles for Brownfield Migration

### Do not stop delivering features

The migration is done alongside regular delivery work, not instead of it. Each practice is adopted
incrementally. You do not stop the world to rewrite your test suite or redesign your pipeline.

### Fix the biggest constraint first

Use your value stream map and metrics to identify which blocker is the current constraint. Fix
that one thing. Then find the next constraint and fix that. Do not try to fix everything at once.

See [Identify Constraints](../migration-path/assess/identify-constraints/) and the
[CD Dependency Tree](../reference/cd-dependency-tree/).

### Make progress visible

Track your DORA metrics from day one: deployment frequency, lead time for changes, change failure
rate, and mean time to restore. These metrics show whether your changes are working and build the
case for continued investment.

See [Baseline Metrics](../migration-path/assess/baseline-metrics/).

### Start with one team

CD adoption works best when a single team can experiment, learn, and iterate without waiting for
organizational consensus. Once one team demonstrates results, other teams have a concrete example
to follow.

## Common Brownfield Challenges

These challenges are specific to migrating existing systems. For the full catalog of problems
teams face, see [Anti-Patterns](../anti-patterns/).

| Challenge | Why it's hard | Approach |
|-----------|--------------|----------|
| Large codebase with no tests | Writing tests retroactively is expensive and the ROI feels unclear | Do not try to add tests to the whole codebase. Add tests to every file you touch. Use the test-for-every-bug-fix rule. Coverage grows where it matters most. |
| Long-lived feature branches | The team has been using feature branches for years and the workflow feels safe | Reduce branch lifetime gradually: from two weeks to one week to two days to same-day. Do not switch to trunk overnight. |
| Manual deployment process | The "deployment expert" has a 50-step runbook in their head | Document the manual process first. Then automate one step at a time, starting with the most error-prone step. |
| Flaky test suite | Tests that randomly fail have trained the team to ignore failures | Quarantine all flaky tests immediately. They do not block the build until they are fixed. Zero tolerance for new flaky tests. |
| Tightly coupled architecture | Changing one module breaks others unpredictably | You do not need microservices. You need clear boundaries. Start by identifying and enforcing module boundaries within the monolith. |
| Organizational resistance | "We've always done it this way" | Start small, show results, build the case with data. One team deploying daily with lower failure rates is more persuasive than any slide deck. |

## Migration Timeline

These ranges assume a single team working on the migration alongside regular delivery work:

| Phase | Typical Duration | Biggest Variable |
|-------|-----------------|-----------------|
| Phase 0 - Assess | 1-2 weeks | None - just do it |
| Phase 1 - Foundations | 1-6 months | Current testing and trunk-based development maturity |
| Phase 2 - Pipeline | 1-3 months | Complexity of existing deployment process |
| Phase 3 - Optimize | 2-6 months | Organizational willingness to change batch size and approval processes |
| Phase 4 - Continuous Deployment | 1-3 months | Confidence in pipeline and rollback capability |

Do not treat these timelines as commitments. The migration is an iterative improvement process,
not a project with a deadline.

## Related Content

- [Anti-Patterns](../anti-patterns/) - Start with the problem you feel most
- [Phase 0 - Assess](../migration-path/assess/) - Understand your current state
- [AI Adoption Roadmap](../ai-adoption-roadmap/) - How to safely incorporate AI into your delivery process
- [Common Blockers](../reference/common-blockers/) - Frequently encountered obstacles
- [FAQ](../faq/) - Frequently asked questions about CD migration
