---
title: "Migrating Brownfield to CD"
linkTitle: "Brownfield CD"
weight: 10
description: >
  Already have a running system? A phased approach to migrating existing applications and teams to continuous delivery.
---

{{% pageinfo %}}
Most teams adopting [CD](../../reference/glossary/#cd-continuous-delivery) are not starting from scratch. They have existing codebases, existing
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

## What to Expect

Brownfield CD adoption is predictably difficult in ways that catch teams off guard. Knowing what
is coming makes it less likely you will interpret normal friction as evidence that the approach
is wrong.

**Things will feel slower before they feel faster.** When you adopt trunk-based development and
start building a real test suite, you are working against the grain of an existing codebase. Tests
will reveal problems that were previously hidden. Integration friction will surface. Teams
sometimes mistake this initial friction for regression. It is not - it is the system becoming
visible. The slowdown is temporary. The improvement it enables is permanent.

**The technical practices will be ready before the organization is.** You can complete Phases 1
through 3 while approval processes, change windows, and release coordination overhead remain
unchanged. The pipeline will be capable of deploying any green build long before the organization
gives you permission to do it on demand. This organizational lag is the most common stall point
in Phase 4. Plan for it early - start the conversation with leadership while you are still in
Phase 2 so there is no surprise when you arrive at Phase 4 ready to remove the last gates.

**Metrics are your evidence.** The hardest part of brownfield migration is sustaining investment
through the long period when foundations are being built but delivery feels slow. Track your
[DORA metrics](../../reference/glossary/#dora-metrics) from Phase 0. Small improvements in lead time and deployment frequency
become the business case for continued investment. Without this data, leadership will pull the
team back to feature work at the first sign of difficulty.

## The Migration Phases

The migration is organized into five phases. Each phase builds on the previous one. Start with
Phase 0 to understand where you are, then work through the phases in order.

| Phase | Name | Goal | Key Question |
|-------|------|------|--------------|
| 0 | [Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) | Understand where you are | "How far are we from CD?" |
| 1 | [Foundations]({{< relref "/docs/migrate-to-cd/foundations" >}}) | Daily integration, testing, small work | "Can we integrate safely every day?" |
| 2 | [Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) | Automated path to production | "Can we deploy any commit automatically?" |
| 3 | [Optimize]({{< relref "/docs/migrate-to-cd/optimize" >}}) | Improve flow, reduce [batch size](../../reference/glossary/#batch-size) | "Can we deliver small changes quickly?" |
| 4 | [Deliver on Demand]({{< relref "/docs/migrate-to-cd/continuous-deployment" >}}) | Deploy any change when needed | "Can we deliver any change to production when needed?" |

## Where to Start

### If you don't know where you stand

Start with [Phase 0 - Assess]({{< relref "/docs/migrate-to-cd/assess" >}}). Complete the [value stream mapping](../../reference/glossary/#value-stream-map) exercise, take
[baseline metrics](../../reference/glossary/#baseline-metrics), and fill out the current-state checklist. These activities tell you exactly
where you stand and which phase to begin with.

### If you know your biggest pain point

Start with [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}). Find the problem your team feels most, and follow the
links to the practices and migration phases that address it.

### Quick self-assessment

If you don't have time for a full assessment, answer these questions:

- **Do all developers integrate to trunk at least daily?** If no, start with
  [Phase 1]({{< relref "/docs/migrate-to-cd/foundations" >}}).
- **Do you have a single automated [pipeline](../../reference/glossary/#pipeline) that every change goes through?** If no, start with
  [Phase 2]({{< relref "/docs/migrate-to-cd/pipeline" >}}).
- **Can you deploy any green build to production on demand?** If no, focus on the gap between
  your current state and [Phase 2]({{< relref "/docs/migrate-to-cd/pipeline" >}}) completion criteria.
- **Do you deploy at least weekly?** If no, look at [Phase 3]({{< relref "/docs/migrate-to-cd/optimize" >}}) for batch size and
  flow optimization.

## Principles for Brownfield Migration

### Do not stop delivering features

The migration is done alongside regular delivery work, not instead of it. Each practice is adopted
incrementally. You do not stop the world to rewrite your test suite or redesign your pipeline.

### Fix the biggest constraint first

Use your value stream map and metrics to identify which blocker is the current [constraint](../../reference/glossary/#constraint). Fix
that one thing. Then find the next constraint and fix that. Do not try to fix everything at once.

See [Identify Constraints]({{< relref "/docs/migrate-to-cd/assess/identify-constraints" >}}) and the
[CD Dependency Tree]({{< relref "/docs/reference/cd-dependency-tree" >}}).

### Make progress visible

Track your [DORA metrics](../../reference/glossary/#dora-metrics) from day one: [deployment frequency](../../reference/glossary/#deployment-frequency), [lead time for changes](../../reference/glossary/#lead-time-for-changes), [change failure rate](../../reference/glossary/#change-failure-rate-cfr), and [mean time to restore](../../reference/glossary/#mean-time-to-restore-mttr). These metrics show whether your changes are working and build the
case for continued investment.

See [Baseline Metrics]({{< relref "/docs/migrate-to-cd/assess/baseline-metrics" >}}).

### Start with one team

CD adoption works best when a single team can experiment, learn, and iterate without waiting for
organizational consensus. Once one team demonstrates results, other teams have a concrete example
to follow.

## Common Brownfield Challenges

These challenges are specific to migrating existing systems. For the full catalog of problems
teams face, see [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}).

| Challenge | Why it's hard | Approach |
|-----------|--------------|----------|
| Large codebase with no tests | Writing tests retroactively is expensive and the ROI feels unclear | Do not try to add tests to the whole codebase. Add tests to every file you touch. Use the test-for-every-bug-fix rule. Coverage grows where it matters most. |
| Long-lived feature branches | The team has been using feature branches for years and the workflow feels safe | Reduce [branch lifetime](../../reference/glossary/#branch-lifetime) gradually: from two weeks to one week to two days to same-day. Do not switch to trunk overnight. |
| Manual deployment process | The "deployment expert" has a 50-step runbook in their head | Document the manual process first. Then automate one step at a time, starting with the most error-prone step. |
| Flaky test suite | Tests that randomly fail have trained the team to ignore failures | Quarantine all flaky tests immediately. They do not block the build until they are fixed. Zero tolerance for new flaky tests. |
| Tightly coupled architecture | Changing one module breaks others unpredictably | You do not need microservices. You need clear boundaries. Start by identifying and enforcing module boundaries within the monolith. |
| Organizational resistance | "We've always done it this way" | Start small, show results, build the case with data. One team deploying daily with lower failure rates is more persuasive than any slide deck. |

## Related Content

- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - Start with the problem you feel most
- [Phase 0 - Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) - Understand your current state
