---
title: "Symptoms for Managers"
linkTitle: "For Managers"
weight: 8
description: >
  Dysfunction symptoms grouped by business impact - unpredictable delivery, quality, and team health.
---

These are the symptoms that show up in sprint reviews, quarterly planning, and 1-on-1s. They
manifest as missed commitments, quality problems, and retention risk.

## Unpredictable delivery

- **[Everything Started, Nothing Finished](flow/too-much-wip/)** - The team reports progress on many items but finishes few. Sprint commitments are routinely missed because work that seemed "almost done" stalls.
- **[Work Items Take Days or Weeks to Complete](flow/work-items-take-too-long/)** - Estimates are consistently wrong. A "3-day story" takes two weeks. Forecasting becomes unreliable.
- **[Releases Are Infrequent and Painful](deployment/infrequent-releases/)** - The organization can only ship quarterly because each release requires weeks of stabilization. Business opportunities are lost to lead time.
- **[Hardening Sprints Are Needed Before Every Release](deployment/hardening-sprints/)** - The team needs dedicated time to "harden" before every release. This hidden cost is not visible in velocity metrics.

## Quality reaching customers

- **[Production Issues Discovered by Customers](visibility/production-issues-found-by-customers/)** - Customers report bugs before the team knows about them. Each incident erodes trust and creates unplanned support work.
- **[Staging Passes but Production Fails](deployment/staging-passes-production-fails/)** - The team followed the process - tests passed, staging looked good - but production still broke. The process gives false confidence.
- **[High Coverage but Tests Miss Defects](testing/high-coverage-ineffective-tests/)** - The team reports strong test coverage numbers, but defects keep reaching production. The metric is not measuring what it appears to measure.
- **[Production Problems Are Discovered Hours or Days Late](visibility/slow-detection/)** - Problems are not detected until the blast radius has grown. The mean time to detect is measured in hours or days, not minutes.

## Coordination overhead

- **[Multiple Services Must Be Deployed Together](deployment/coordinated-deployments/)** - Deploying requires coordination across teams and services. This creates scheduling dependencies and increases the cost of every change.
- **[Merge Freezes Before Deployments](deployment/merge-freeze/)** - Development stops before each release so the team can stabilize. This idle time is invisible but costly.
- **[The Team Is Afraid to Deploy](deployment/fear-of-deploying/)** - Deployments are treated as risky events. The team prefers to batch and delay rather than ship frequently, which amplifies risk.

## Team health and retention

- **[Team Burnout and Unsustainable Pace](visibility/team-burnout/)** - Process friction, on-call burden, and deployment stress are wearing the team down. Attrition risk is high.
- **[Merging Is Painful and Time-Consuming](flow/painful-merges/)** - Developers spend significant time resolving merge conflicts instead of building features. This is invisible overhead that slows delivery.
- **[Pull Requests Sit for Days Waiting for Review](flow/prs-waiting-for-review/)** - Developers are blocked waiting for reviews. This creates frustration and drives up work-in-progress as they start new things while waiting.
- **[It Works on My Machine](visibility/works-on-my-machine/)** - Environment inconsistency means developers waste time debugging problems that only appear in certain environments. This is preventable friction.

## What to do next

If these symptoms sound familiar, these resources can help you build a case for change and
find a starting point:

- **[Phase 0: Assess](../migrate-to-cd/migration-path/assess/)** - Map your value stream, take baseline measurements, and identify your top constraints.
- **[DORA Capabilities](../reference/dora-capabilities/)** - The research-backed capabilities that predict delivery performance. Use this to connect symptoms to organizational capabilities.
- **[Metrics Reference](../reference/metrics/)** - Definitions for the metrics used throughout this guide, including the four DORA metrics.
- **[FAQ: How long does the migration take?](../faq/#how-long-does-the-migration-take)** - Rough timelines for each phase of the migration.
- **[FAQ: What if our organization requires CAB?](../faq/#what-if-our-organization-requires-manual-change-approval-cab)** - How to move from manual change approval to automated evidence.
