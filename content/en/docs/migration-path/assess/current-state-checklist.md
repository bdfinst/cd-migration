---
title: "Current State Checklist"
draft: true
linkTitle: "Current State Checklist"
weight: 4
description: >
  Self-assess your team against MinimumCD practices to understand your starting point and determine where to begin your migration.
---

{{% pageinfo %}}
**Phase 0 - Assess**
{{% /pageinfo %}}

This checklist translates the practices defined by [MinimumCD.org](https://minimumcd.org) into
concrete yes-or-no questions you can answer about your team today. It is not a test to pass. It is
a diagnostic tool that shows you which practices are already in place and which ones your migration
needs to establish.

Work through each category with your team. Be honest - checking a box you have not earned gives
you a migration plan that skips steps you actually need.

## How to Use This Checklist

For each item, mark it with an `[x]` if your team consistently does this today - not occasionally,
not aspirationally, but as a default practice. If you do it sometimes but not reliably, leave it
unchecked.

---

## Trunk-Based Development

- [ ] All developers integrate their work to the trunk (main branch) at least once every 24 hours
- [ ] No branch lives longer than 24 hours before being integrated
- [ ] The team does not use code freeze periods to stabilize for release
- [ ] There are fewer than 3 active branches at any given time
- [ ] Merge conflicts are rare and small when they occur

**Why it matters:** Long-lived branches are the single biggest source of integration risk. Every
hour a branch lives is an hour where it diverges from what everyone else is doing. Trunk-based
development eliminates integration as a separate, painful event and makes it a continuous,
trivial activity. Without this practice, continuous integration is impossible, and without
continuous integration, continuous delivery is impossible.

---

## Continuous Integration

- [ ] Every commit to trunk triggers an automated build
- [ ] The automated build includes running the full unit test suite
- [ ] All tests must pass before any change is merged to trunk
- [ ] A broken build is treated as the team's top priority to fix (not left broken while other work continues)
- [ ] The build and test cycle completes in less than 10 minutes

**Why it matters:** Continuous integration means that the team always knows whether the codebase
is in a working state. If builds are not automated, if tests do not run on every commit, or if
broken builds are tolerated, then the team is flying blind. Every change is a gamble that
something else has not broken in the meantime.

---

## Pipeline Practices

- [ ] There is a single, defined path that every change follows to reach production (no side doors, no manual deployments, no exceptions)
- [ ] The pipeline is deterministic: given the same input commit, it produces the same output every time
- [ ] Build artifacts are created once and promoted through environments (not rebuilt for each environment)
- [ ] The pipeline runs automatically on every commit to trunk without manual triggering
- [ ] Pipeline failures provide clear, actionable feedback that developers can act on within minutes

**Why it matters:** A pipeline is the mechanism that turns code changes into production
deployments. If the pipeline is inconsistent, manual, or bypassable, then you do not have a
reliable path to production. You have a collection of scripts and hopes. Deterministic, automated
pipelines are what make deployment a non-event rather than a high-risk ceremony.

---

## Deployment

- [ ] The team has at least one environment that closely mirrors production configuration (OS, middleware, networking, data shape)
- [ ] Application configuration is externalized from the build artifact (config files, environment variables, or a config service - not baked into the binary)
- [ ] The team can roll back a production deployment within minutes, not hours
- [ ] Deployments to production do not require downtime
- [ ] The deployment process is the same for every environment (dev, staging, production) with only configuration differences

**Why it matters:** If your test environment does not look like production, your tests are lying
to you. If configuration is baked into your artifact, you are rebuilding for each environment,
which means the thing you tested is not the thing you deploy. If you cannot roll back quickly,
every deployment is a high-stakes bet. These practices ensure that what you test is what you
ship, and that shipping is safe.

---

## Quality

- [ ] The team has automated tests at multiple levels (unit, integration, and at least some end-to-end)
- [ ] A build that passes all automated checks is considered deployable without additional manual verification
- [ ] There are no manual quality gates between a green build and production (no manual QA sign-off, no manual regression testing required)
- [ ] Defects found in production are addressed by adding automated tests that would have caught them, not by adding manual inspection steps
- [ ] The team monitors production health and can detect deployment-caused issues within minutes

**Why it matters:** Quality that depends on manual inspection does not scale and does not speed
up. As your deployment frequency increases through the migration, manual quality gates become
the bottleneck. The goal is to build quality in through automation so that a green build means
a deployable build. This is the foundation of continuous delivery: if it passes the pipeline,
it is ready for production.

---

## Scoring Guide

Count the number of items you checked across all categories.

| Score | Your Starting Point | Recommended Phase |
|-------|--------------------|--------------------|
| **0-5** | You are early in your journey. Most foundational practices are not yet in place. | Start at the beginning of **[Phase 1 - Foundations](../../foundations/)**. Focus on trunk-based development and basic test automation first. |
| **6-12** | You have some practices in place but significant gaps remain. This is the most common starting point. | Start with **[Phase 1 - Foundations](../../foundations/)** but focus on the categories where you had the fewest checks. Your [constraint analysis](../identify-constraints/) will tell you which gap to close first. |
| **13-18** | Your foundations are solid. The gaps are likely in pipeline automation and deployment practices. | You may be able to move quickly through Phase 1 and focus your effort on **[Phase 2 - Pipeline](../../pipeline/)**. Validate with your value stream map that your remaining constraints match. |
| **19-22** | You are well-practiced in most areas. Your migration is about closing specific gaps and optimizing flow. | Review your unchecked items - they point to specific topics in **[Phase 3 - Optimize](../../optimize/)** or **[Phase 4 - Continuous Deployment](../../continuous-deployment/)**. |
| **23-25** | You are already practicing most of what MinimumCD defines. Your focus should be on consistency and the final push to continuous deployment. | Jump to **[Phase 4 - Continuous Deployment](../../continuous-deployment/)** and focus on deploying every change. |

{{% alert title="A Score Is Not a Grade" %}}
This checklist exists to help your team find its starting point, not to judge your team's
competence. A score of 5 does not mean your team is failing - it means your team has a clear
picture of what to work on. A score of 22 does not mean you are done - it means your remaining
gaps are specific and targeted.

The only wrong answer is a dishonest one.
{{% /alert %}}

## Putting It All Together

You now have four pieces of information from Phase 0:

1. **A value stream map** showing your end-to-end delivery process with wait times and rework loops
2. **Baseline metrics** for deployment frequency, lead time, change failure rate, and MTTR
3. **An identified top constraint** telling you where to focus first
4. **This checklist** confirming which practices are in place and which are missing

Together, these give you a clear, data-informed starting point for your migration. You know where
you are, you know what is slowing you down, and you know which practices to establish first.

## Next Step

You are ready to begin [Phase 1 - Foundations](../../foundations/). Start with the practice area
that addresses your top constraint.
