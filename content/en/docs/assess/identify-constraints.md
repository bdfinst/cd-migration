---
title: "Identify Constraints"
linkTitle: "Identify Constraints"
weight: 3
description: >
  Use your value stream map and baseline metrics to find the bottlenecks that limit your delivery flow.
aliases:
  - /docs/migrate-to-cd/assess/identify-constraints/
---

{{% pageinfo %}}
**Phase 0 - Assess** | {{< scope-label "team-org" >}}
{{% /pageinfo %}}

Your [value stream map]({{< relref "/docs/assess/value-stream-mapping" >}}) shows you where time goes. Your
[baseline metrics]({{< relref "/docs/assess/baseline-metrics" >}}) tell you how fast and how safely you deliver. Now you
need to answer the most important question in your migration: **What is the one thing most
limiting your delivery flow right now?**

This is not a question you answer by committee vote or gut feeling. It is a question you answer
with the data you have already collected.

## The Theory of Constraints

Eliyahu Goldratt's Theory of Constraints offers a simple and powerful insight: every system has
exactly one [constraint]({{< relref "/docs/reference/glossary#constraint" >}}) that limits its overall throughput. Improving anything other than that
constraint does not improve the system.

Consider a delivery process where code review takes 30 minutes, but the queue for a review
takes 2 days. Manual regression testing then takes 5 days. If you invest three months
building a faster build [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) that saves 10 minutes per build, you have improved something
that is not the constraint. The 5-day regression testing cycle still dominates your [lead time]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}}).
You have made a non-bottleneck more efficient, which changes nothing about how fast you deliver.

The implication for your [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) migration is direct: **you must find and address constraints in order
of impact.** Fix the biggest one first. Then find and fix the next one. Working in order of impact is how you
make sustained, measurable progress rather than spreading effort across improvements that do not
move the needle.

### What your team controls

Your team can apply constraint analysis to everything within your delivery boundary without
needing external approval:

- Running the value stream mapping exercise and gathering baseline metrics
- Identifying testing bottlenecks, code review delays, and environment availability issues
- Resolving integration and merge conflicts through trunk-based development
- Addressing work decomposition and WIP limit problems

### What requires broader change

Some constraints are organizational, not technical. Your team can identify them, but resolving
them requires engaging outside your boundary:

- **Deployment gates:** CAB meetings, multi-team sign-offs, and approval queues are policy
  decisions. Removing or automating them requires organizational consensus.
- **Manual handoffs:** When work must pass through a separate test team, security review, or
  operations team, the constraint is in the process structure, not the pipeline. Resolving it
  means changing how those teams engage, not only how your team works.
- **Change windows:** Release schedules and deployment blackout periods are set by the
  organization, not the team. Challenge them with data, not only intent.

Use the constraint analysis in this page to build a prioritized case for those conversations.

## Common constraint categories

Software delivery constraints tend to cluster into a few recurring categories. As you review your
[value stream map]({{< relref "/docs/reference/glossary#value-stream-map" >}}), look for these patterns.

### Testing bottlenecks

**Symptoms:** Large wait time between "code complete" and "verified." Manual regression test
cycles measured in days or weeks. Low %C/A at the testing step, indicating frequent rework.
High [change failure rate]({{< relref "/docs/reference/glossary#change-failure-rate-cfr" >}}) in your baseline metrics despite significant testing effort.

**What is happening:** Testing is being done as a phase after development rather than as a
continuous activity during development. Manual test suites have grown to cover every scenario
ever encountered, and running them takes longer with every release. The test environment is
shared and frequently broken.

**Migration path:** [Phase 1 - Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}})

### Deployment gates

**Symptoms:** Wait times of days or weeks between "tested" and "deployed." Change Advisory Board
(CAB) meetings that happen weekly or biweekly. Multiple sign-offs required from people who are
not involved in the actual change.

**What is happening:** The organization has substituted process for confidence. Because
deployments have historically been risky (large batches, manual processes, poor [rollback]({{< relref "/docs/reference/glossary#rollback" >}})), layers
of approval have been added. These approvals add delay but rarely catch issues that automated
testing would not. They exist because the deployment process is not trustworthy, and they
persist because removing them feels dangerous.

**Migration path:** [Phase 2 - Pipeline Architecture]({{< relref "/docs/pipeline/pipeline-architecture" >}}) and
building the automated quality evidence that makes manual approvals unnecessary.

### Environment provisioning

**Symptoms:** Developers waiting hours or days for a test or staging environment. "Works on my
machine" failures when code reaches a shared environment. Environments that drift from production
configuration over time.

**What is happening:** Environments are manually provisioned, shared across teams, and treated as
pets rather than cattle. There is no automated way to create a [production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}) on
demand. Teams queue for shared environments, and environment configuration has diverged from
production.

**Migration path:** [Phase 2 - Production-Like Environments]({{< relref "/docs/pipeline/production-like-environments" >}})

### Code review delays

**Symptoms:** Pull requests sitting open for more than a day. Review queues with 5 or more
pending reviews. Developers context-switching because they are blocked waiting for review.

**What is happening:** Code review is being treated as an asynchronous handoff rather than a
collaborative activity. Reviews happen when the reviewer "gets to it" rather than as a
near-immediate response. Large pull requests make review daunting, which increases queue time
further.

**Migration path:** [Phase 1 - Code Review]({{< relref "/docs/foundations/code-review" >}}) and
[Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}) to reduce [branch lifetime]({{< relref "/docs/reference/glossary#branch-lifetime" >}})
and review size.

### Manual handoffs

**Symptoms:** Multiple steps in your value stream map where work transitions from one team to
another. Tickets being reassigned across teams. "Throwing it over the wall" language in how people
describe the process.

**What is happening:** Delivery is organized as a sequence of specialist stages (dev, test, ops,
security) rather than as a cross-functional flow. Each handoff introduces a queue, a context
loss, and a communication overhead. The more handoffs, the longer the lead time and the more
likely that information is lost.

**Migration path:** This is an organizational constraint, not a technical one. Address it
gradually: form cross-functional teams and automate the specialist activities into the
pipeline. Handoffs then become automated checks rather than manual transfers.

## Using your value stream map to find the constraint

Pull out your [value stream map]({{< relref "/docs/reference/glossary#value-stream-map" >}}) and follow this process:

### Step 1: Rank steps by wait time

List every step in your value stream and sort them by wait time, longest first. Your biggest
constraint is almost certainly in the top three. Wait time is more important than process time
because wait time is pure waste - nothing is happening, no value is being created.

### Step 2: Look for rework loops

Identify steps where work frequently loops back. A testing step with a 40% rework rate means
that nearly half of all changes go through the development-to-test cycle twice. The effective
wait time for that step is nearly doubled when you account for rework.

### Step 3: Count handoffs

Each handoff between teams or roles is a queue point. If your value stream has 8 handoffs, you
have 8 places where work waits. Look for handoffs that could be eliminated by automation or
by reorganizing work within the team.

### Step 4: Cross-reference with metrics

Check your findings against your baseline metrics:

- **High lead time with low process time** = the constraint is in the queues (wait time), not in
  the work itself
- **High change failure rate** = the constraint is in quality practices, not in speed
- **Low [deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) with everything else reasonable** = the constraint is in the
  deployment process itself or in organizational policy

## Prioritizing: Fix the biggest one first

{{% alert title="One Constraint at a Time" %}}
Resist the temptation to tackle multiple constraints simultaneously. The Theory of Constraints
is clear: improving a non-bottleneck does not improve the system. Identify the single biggest
constraint and focus your migration effort there. Move to the next constraint only when the
first one is no longer the bottleneck.

This does not mean the entire team works on one thing. It means your improvement initiatives
are sequenced to address constraints in order of impact.
{{% /alert %}}

Once you have identified your top constraint, map it to a migration phase:

| If Your Top Constraint Is... | Start With... |
|------------------------------|---------------|
| Integration and merge conflicts | [Phase 1 - Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}) |
| Manual testing cycles | [Phase 1 - Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}) |
| Large work items that take weeks | [Phase 1 - Work Decomposition]({{< relref "/docs/foundations/work-decomposition" >}}) |
| Code review bottlenecks | [Phase 1 - Code Review]({{< relref "/docs/foundations/code-review" >}}) |
| Manual or inconsistent deployments | [Phase 2 - Single Path to Production]({{< relref "/docs/pipeline/single-path-to-production" >}}) |
| Environment availability | [Phase 2 - Production-Like Environments]({{< relref "/docs/pipeline/production-like-environments" >}}) |
| Change approval processes | [Phase 2 - Pipeline Architecture]({{< relref "/docs/pipeline/pipeline-architecture" >}}) |
| Large [batch sizes]({{< relref "/docs/reference/glossary#batch-size" >}}) | [Phase 3 - Small Batches]({{< relref "/docs/optimize/small-batches" >}}) |

## The next constraint

Fixing your first constraint will improve your flow. It will also reveal the next constraint.
The new constraint is expected and healthy. A delivery process is a chain, and strengthening the weakest link
means a different link becomes the weakest.

Constraints surface one after another, which is why the migration is organized in phases. Phase 1 addresses the foundational constraints
that nearly every team has (integration practices, testing, small work). Phase 2 addresses
pipeline constraints. Phase 3 optimizes flow. You will cycle through constraint identification
and resolution throughout your migration.

Plan to revisit your value stream map and metrics after addressing each major constraint. Your
map from today will be outdated within weeks of starting your migration - and that is a sign of
progress.

## Next step

Complete the [Current State Checklist]({{< relref "/docs/assess/current-state-checklist" >}}) to assess your team against
specific MinimumCD practices and confirm your migration starting point.

---

## Related content

- [Work Items Take Too Long]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}}) - a flow symptom often traced back to the constraints this guide helps identify
- [Too Much WIP]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}}) - a symptom that constraint analysis frequently uncovers
- [Unbounded WIP]({{< relref "/docs/anti-patterns/team-workflow/unbounded-wip" >}}) - an anti-pattern that shows up as a queue constraint in your value stream
- [CAB Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}) - an organizational anti-pattern that commonly surfaces as a deployment gate constraint
- [Monolithic Work Items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}) - an anti-pattern that increases lead time by inflating batch size
- [Value Stream Mapping]({{< relref "/docs/assess/value-stream-mapping" >}}) - the prerequisite exercise that produces the data this guide analyzes
