---
aliases:
  - /docs/symptoms/security-review-bottleneck/
title: "Security Review Is a Gate, Not a Guardrail"
linkTitle: "Security review bottleneck"
description: >
  Changes queue for weeks waiting for central security review. Security slows delivery rather than enabling it.
tags:
  - process-gates
  - deployment-automation
---

## What you are seeing

The queue for security review is weeks long. Changes that are otherwise ready to deploy sit waiting while the central security team works through backlog from across the organization. When security review finally happens, it is often a cursory check because the backlog pressure is too high for thorough review.

Security reviews happen late in the development cycle, after development is complete and the team has moved on to new work. When the security team identifies a real issue, it requires context-switching back to code written weeks ago. Developers have forgotten the details. The fix takes longer than it would have if the security issue had been caught during development.

The security team does not scale with development velocity. As the organization ships more, the security queue grows. The team has learned to front-load reviews for "obviously security-sensitive" changes and skip or rush reviews for everything else - exactly the wrong approach. The changes that seem routine are often where vulnerabilities hide.

## Common causes

### Missing deployment pipeline

Security tools can be integrated directly into the pipeline: dependency scanning, static analysis, secret detection, container image scanning. When these checks run automatically on every commit, they catch issues immediately - while the developer still has the code in mind and fixing is fast. The central security team can focus on policy and architecture rather than reviewing individual changes.

A pipeline with automated security gates provides continuous, scalable security coverage. The coverage is consistent because it runs on every change, not just the ones that reach the security team's queue. Issues are caught in minutes rather than weeks.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### CAB gates

The same dynamics that make change advisory boards a bottleneck for general changes apply to security review gates. Manual approval at the end of the process creates a queue. The queue grows when the team ships more than the reviewers can process. Calendar-driven release cycles create bursts of review requests at predictable times.

Moving security left - into development tooling and pipeline gates rather than release gates - eliminates the end-of-process queue entirely. Security feedback during development is faster and cheaper than security review after development.

**Read more:** [CAB gates](../../anti-patterns/organizational-cultural/cab-gates/)

### Manual regression testing gates

When security review is one of several manual gates a change must pass, the waits compound. A change waiting for regression testing cannot enter the security review queue. A change completing security review cannot go to production until the regression window opens. Each gate multiplies the total lead time for a change.

Automated testing eliminates the regression testing gate, which reduces how many changes are stacked up waiting for security review at any given time. A change that exits automated testing immediately enters the security queue rather than waiting for a regression window to open. Shrinking the queue makes each security review faster and more thorough - which is what was lost when backlog pressure turned reviews into cursory checks.

**Read more:** [Manual regression testing gates](../../anti-patterns/testing/manual-regression-testing-gates/)

## How to narrow it down

1. **Does the team have automated security scanning in the CI pipeline?** If not, security coverage depends on the central security team's capacity, which does not scale. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Is security review a manual approval gate before every production deployment?** If changes cannot deploy without explicit security approval, the gate is the constraint. Start with [CAB gates](../../anti-patterns/organizational-cultural/cab-gates/).
3. **Do changes queue for multiple manual approvals in sequence?** If security review is one of several sequential gates, reducing other gates will also reduce security review pressure. Start with [Manual regression testing gates](../../anti-patterns/testing/manual-regression-testing-gates/).
