---
title: "No improvement time budgeted"
linkTitle: "No improvement time budgeted"
weight: 100
category: "Organizational & Cultural"
risk_level: high
description: >
  100% of capacity is allocated to feature delivery with no time for pipeline improvements, test automation, or tech debt, trapping the team on the feature treadmill.
tags:
  - team-dynamics
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What this looks like

The sprint planning meeting begins. The product manager presents the list of features and fixes that need to be delivered this sprint. The team estimates them and fills to capacity.

Someone mentions the flaky test suite that takes 45 minutes to run and fails 20% of the time for non-code reasons. "We'll get to that," someone says. It goes on the backlog. The backlog item is a year old.

This is the feature treadmill. In this delivery system, the only work that gets done produces a demo-able feature or resolves a visible customer complaint. Infrastructure improvements, test automation, pipeline maintenance, technical debt reduction, and process improvement are always deprioritized. They do not produce something a product manager can put in a release note. The team runs at 100% utilization, feels busy all the time, and makes very little actual progress on delivery capability.

The treadmill is self-reinforcing. The slow, flaky test suite means developers do not run tests locally, which means more defects reach CI, which means more time diagnosing test failures. The manual deployment process makes deploying risky and infrequent, so releases are large and risky. Risky releases mean more incidents and more firefighting, which leaves less time for improvement. Every hour not invested in improvement adds to the cost of the next hour of feature development.

Common variations:

- **Improvement as a separate team's job.** A "DevOps" or "platform" team owns all infrastructure and tooling work. Development teams never invest in their own pipeline because it is "not their job." The platform team is perpetually backlogged.
- **Improvement only after a crisis.** The team addresses technical debt and pipeline problems only after a production incident or a missed deadline makes the cost visible. Improvement is reactive, not systematic.
- **Improvement in a separate quarter.** The organization plans one quarter per year for "technical work." The quarter arrives, gets partially displaced by pressing features, and provides a fraction of the capacity needed to address accumulating debt.

The telltale sign: the team can name specific improvements that would meaningfully accelerate delivery. But no sprint in the last three months prioritized those improvements.

## Why this is a problem

The test suite takes 45 minutes and fails 20% of the time for non-code reasons. It costs each developer hours of wasted time every week. That time compounds sprint after sprint because the fix was never prioritized. A team operating at 100% utilization has zero capacity to improve. Every hour spent on features at the expense of improvement is an hour that makes the next hour of feature development slower.

### It reduces quality

Without time for test automation, tests remain manual or absent. Manual tests are slower, less reliable, and cover less of the codebase than automated ones. Defect escape rates - the percentage of bugs that reach production - stay high because the coverage that would catch them does not exist.

Without time for pipeline improvement, the pipeline remains slow and unreliable. A slow pipeline means developers commit infrequently to avoid long wait times for feedback. Infrequent commits mean larger diffs. Larger diffs mean harder reviews. Harder reviews mean more missed issues.

The causal chain from "we don't have time to improve the pipeline" to "we have more defects in production" is real. But enough distance separates each step that management does not perceive the connection.

Without time for refactoring, code quality degrades over time. Features added to a deteriorating codebase are harder to add correctly and take longer to test. The velocity that looks stable in the sprint metrics is actually declining in real terms as the code becomes harder to work with.

### It increases rework

Technical debt is deferred maintenance. Like physical maintenance, deferred technical maintenance does not disappear - it accumulates interest. A 45-minute test suite that is not fixed this sprint still takes 45 minutes next sprint, and the sprint after that. Meanwhile it wastes 45 minutes of developer time each sprint.

Consider a team of 8 developers running tests twice per day for six months. That adds up to hundreds of hours of wasted time, far more than fixing the test suite would have taken.

Infrastructure problems that are not addressed compound in the same way. A deployment process that requires three manual steps does not become safer over time. It becomes riskier, because the system around it changes while the manual steps do not. The steps that were accurate documentation 18 months ago are now partially wrong, but no one has updated them because no one had time.

Feature work built on a deteriorating foundation requires more rework per feature. The codebase was never refactored to maintain clarity, so developers do not understand it well. They make wrong assumptions and produce code that must be reworked. Their tests are brittle because the underlying code is brittle.

### It makes delivery timelines unpredictable

A team that does not invest in improvement is flying with degrading instruments. The test suite was reliable six months ago; now it is flaky. The build was fast last year; now it takes 35 minutes. The deployment runbook was accurate 18 months ago; now it is a starting point that requires improvisation. Each degradation adds unpredictability to delivery.

The compounding effect means that improvement debt is not linear. A team that defers improvement for two years does not merely have twice the problems of a team that deferred for one year. Its codebase is harder to change, its pipeline is harder to fix, and its habits resist improvement. The capacity needed to escape the treadmill grows over time.

Unpredictability frustrates stakeholders and erodes trust. When the team cannot reliably forecast delivery timelines because their own systems are unpredictable, the credibility of every estimate suffers. The response is often more process - more planning, more status meetings, more checkpoints - which consumes more of the time that could go toward improvement.

### Impact on continuous delivery

CD requires a reliable, fast pipeline and a codebase that can be changed safely and quickly. Both require ongoing investment to maintain. A pipeline that is not continuously improved becomes slower, less reliable, and harder to operate. A codebase that is not refactored becomes harder to test, slower to understand, and more expensive to change.

The teams that achieve and sustain CD are not the ones that got lucky with an easy codebase. They are the ones that treat pipeline and codebase quality as continuous investments, budgeted explicitly in every sprint, and protected from displacement by feature pressure. CD is a capability that must be built and maintained, not a state you arrive at once.

Teams that allocate zero time to improvement typically never begin the CD journey. Or they begin it and stall when the initial improvements erode under feature pressure.

## How to fix it

### Step 1: Quantify the cost of not improving

Management will not protect improvement time without evidence that the current approach is expensive. Build the business case.

1. Measure the time your team spends per sprint on symptoms of deferred improvement. Include waiting for slow builds, diagnosing flaky tests, executing manual deployment steps, and triaging recurring bugs.
2. Estimate the time investment required to address the top three items on your improvement backlog. Compare this to the recurring cost calculated above.
3. Identify one improvement item that would pay back its investment in under one sprint cycle - a quick win that demonstrates the return on improvement investment.
4. Calculate your deployment lead time and change fail rate. Poor performance on these metrics is a consequence of deferred improvement; use them to make the cost visible to management.
5. Present the findings as a business case: "We are spending X hours per sprint on symptoms of deferred debt. Addressing the top three items would cost Y hours over Z sprints. The payback period is W sprints."

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "We don't have time to measure this." | You already spend the time on the symptoms. The measurement is about making that cost visible so it can be managed. Block 4 hours for one sprint to capture the data. |
| "Product won't accept reduced feature velocity." | Present the data showing that deferred improvement is already reducing feature velocity. The choice is not "features vs. improvement" - it is "slow features now with no improvement" versus "slightly slower features now with accelerating velocity later." |

### Step 2: Protect a regular improvement allocation (weeks 2-4)

1. Negotiate a standing allocation of improvement time: the standard recommendation is 20% of team capacity per sprint, but even 10% is better than zero. This is not a one-time improvement sprint - it is a permanent budget.
2. Add improvement items to the sprint backlog alongside features with the same status as user stories: estimated, prioritized, owned, and reviewed at the sprint retrospective.
3. Define "improvement" broadly: test automation, pipeline speed, dependency updates, refactoring, runbook creation, monitoring improvements, and process changes all qualify. Do not restrict it to infrastructure.
4. Establish a rule: improvement items are not displaced by feature work within the sprint. If a feature takes longer than estimated, the feature scope is reduced, not the improvement allocation.
5. Track the improvement allocation as a sprint metric alongside velocity and report it to stakeholders with the same regularity as feature delivery.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "20% sounds like a lot. Can we start smaller?" | Yes. Start with 10% and measure the impact. As velocity improves, the argument for maintaining or expanding the allocation makes itself. |
| "The improvement backlog is too large to know where to start." | Prioritize by impact on the most painful daily friction: the slow test that every developer runs ten times a day, the manual step that every deployment requires, the alert that fires every night. |

### Step 3: Make improvement outcomes visible and accountable (weeks 4-8)

1. Set quarterly improvement goals with measurable outcomes: "Test suite run time below 10 minutes," "Zero manual deployment steps for service X," "Change fail rate below 5%."
2. Report pipeline and delivery metrics to stakeholders monthly: build duration, change fail rate, deployment frequency. Make the connection between improvement investment and metric improvement explicit.
3. Celebrate improvement outcomes with the same visibility as feature deliveries. A presentation that shows the team cut build time from 35 minutes to 8 minutes is worth as much as a feature demo.
4. Include improvement capacity as a non-negotiable in project scoping conversations. When a new initiative is estimated, the improvement allocation is part of the team's effective capacity, not an overhead to be cut.
5. Conduct a quarterly improvement retrospective: what did we address this quarter, what was the measured impact, and what are the highest-priority items for next quarter?
6. Make the improvement backlog visible to leadership. Show a ranked list with estimated cost and projected benefit for each item. That transparency builds trust in the prioritization.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "This sounds like a lot of overhead for 'fixing stuff.'" | The overhead is the visibility that protects the improvement allocation from being displaced by feature pressure. Without visibility, improvement time is the first thing cut when a sprint gets tight. |
| "Developers should just do this as part of their normal work." | They cannot, because "normal work" is 100% features. The allocation makes improvement legitimate, scheduled, and protected. That is the structural change needed. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Reduction as pipeline improvements take effect; a direct measure of improvement work impact |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Improvement as test automation and quality work reduces defect escape rate |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Decrease as pipeline speed, automated testing, and deployment automation reduce total cycle time |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Increase as deployment process improvements reduce the cost and risk of each deployment |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Reduction as tech debt reduction and test automation make features faster to build and verify |
| [Work in progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) | Improvement items in progress alongside features, demonstrating the allocation is real |

## Related content

- [Metrics-driven improvement]({{< relref "/docs/optimize/metrics-driven-improvement" >}}) - use delivery metrics to identify where improvement investment has the highest return
- [Retrospectives]({{< relref "/docs/optimize/retrospectives" >}}) - retrospectives are the forum where improvement items should be identified and prioritized
- [Identify constraints]({{< relref "/docs/assess/identify-constraints" >}}) - finding the highest-leverage improvement targets requires identifying the constraint that limits throughput
- [Testing fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}) - test automation is one of the first improvement investments that pays back quickly
- [Working agreements]({{< relref "/docs/foundations/working-agreements" >}}) - defining the improvement allocation in team working agreements protects it from sprint-by-sprint negotiation
