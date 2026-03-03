---
title: "Distant Date Commitments"
linkTitle: "Distant Date Commitments"
weight: 31
category: "Organizational & Cultural"
risk_level: medium
description: >
  Fixed scope committed to months in advance causes pressure to cut corners as deadlines approach,
  making quality flex instead of scope.
tags:
  - process-gates
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

A roadmap is published. It lists features with target quarters attached: Feature A in Q2, Feature B
in Q3, Feature C by year-end. The estimates were rough - assembled by combining gut feel and
optimistic assumptions - but they are now treated as binding commitments. Stakeholders plan
marketing campaigns, sales conversations, and partner timelines around these dates.

Months later, the team is three weeks from the committed quarter and the feature is 60 percent done.
The scope was more complex than the estimate assumed. Dependencies were discovered. The team makes a
familiar choice: ship what exists, skip the remaining testing, and call it done. The feature ships
incomplete. The marketing campaign runs. Support tickets arrive.

What makes this pattern distinctive from ordinary deadline pressure is the time horizon. The
commitment was made so far in advance that the people making it could not have known what the work
actually involved. The estimate was pure speculation, but it acquired the force of a contract
somewhere between the planning meeting and the stakeholder presentation.

Common variations:

- **The annual roadmap.** Every January, leadership commits the year's deliverables. By March,
  two dependencies have shifted and one feature turned out to be three features. The roadmap
  is already wrong, but nobody is permitted to change it because it was "committed."
- **The public announcement problem.** A feature is announced at a conference or in a press
  release before the team has estimated it. The team finds out about their new deadline from
  a news article. The announcement locks the date in a way that no internal process can unlock.
- **The cascading dependency commitment.** Team A commits to delivering something Team B
  depends on. Team B commits to something Team C depends on. Each team's estimate assumed the
  upstream team would be on time. When Team A slips by two weeks, everyone slips, but all
  dates remain officially unchanged.
- **The "stretch goal" that becomes the plan.** What was labeled a stretch goal in the planning
  meeting appears on the roadmap without the qualifier. The team is now responsible for
  delivering something that was never a real commitment in the first place.

The telltale sign: when a team member asks "can we adjust scope?" the answer is "the date was
already communicated externally" - and nobody remembers whether that was actually true.

## Why This Is a Problem

A team discovers in week six that the feature requires a dependency that does not yet exist. The date was committed four months ago. There is no mechanism to surface this as a planning input, so quality absorbs the gap. Distant date commitments break the feedback loop between discovery and planning. When the gap between commitment and delivery is measured in months, the organization has no mechanism to incorporate what is learned during development. The plan is frozen at the moment of maximum ignorance.

### It reduces quality

When scope is locked months before delivery and reality diverges from the plan, quality absorbs the
gap. The team cannot reduce scope because the commitment was made at the feature level. They cannot
move the date because it was communicated to stakeholders. The only remaining variable is how
thoroughly the work is done. Tests get skipped. Edge cases are deferred to a future release. Known
defects ship with "will fix in the next version" attached.

This is not a failure of discipline - it is the rational response to an impossible constraint. A
team that cannot negotiate scope or time has no other lever. Teams that work with short planning
horizons and rolling commitments can maintain quality because they can reduce scope to match actual
capacity as understanding develops.

### It increases rework

Distant commitments encourage big-batch planning. When dates are set a quarter or more out, the
natural response is to plan a quarter or more of work to fill the window. Large batches mean large
integrations. Large integrations mean complex merges, late-discovered conflicts, and rework that
compounds.

The commitment also creates sunk-cost pressure. When a team has spent two months building toward a
committed feature and discovers the approach is wrong, they face pressure to continue rather than
pivot. The commitment was based on an approach; changing the approach feels like abandoning the
commitment. Teams hide or work around fundamental problems rather than surface them, accumulating
rework that eventually has to be paid.

### It makes delivery timelines unpredictable

There is a paradox here: commitments made months in advance feel like they increase predictability

- because dates are known - but they actually decrease it. The dates are not based on actual work
understanding; they are based on early guesses. When the guesses prove wrong, the team has two
choices: slip visibly (missing the committed date) or slip invisibly (shipping incomplete or
defect-laden work on time). Both outcomes undermine trust in delivery timelines.

Teams that commit to shorter horizons and iterate deliver more predictably because their commitments
are based on what they actually understand. A two-week commitment made at the start of a sprint has
a fundamentally different information basis than a six-month commitment made at an annual planning
session.

### Impact on continuous delivery

CD shortens the feedback loop between building and learning. Distant date commitments work against
this by locking the plan before feedback can arrive. A team practicing CD might discover in week
two that a feature needs to be redesigned. That discovery is valuable - it should change the plan.
But if the plan was committed months ago and communicated externally, the discovery becomes a
problem to manage rather than information to act on.

CD depends on the team's ability to adapt as they learn. Fixed distant commitments treat the plan
as more reliable than the evidence. They make the discipline of continuous delivery harder to
justify because they frame "we need to reduce scope to maintain quality" as a failure rather than
a normal response to new information.

## How to Fix It

### Step 1: Map current commitments and their basis

List every active commitment with a date attached. For each one, note when the commitment was made,
what information existed at the time, and how much has changed since. This makes visible how far
the original estimate has drifted from current reality. Share the analysis with leadership - not as
an indictment, but as a calibration conversation about how accurate distant commitments tend to be.

### Step 2: Introduce a commitment horizon policy

Propose a tiered commitment structure:

- Hard commitments (communicated externally, scope locked): Only for work that starts within 4
  weeks. Anything further is a forecast, not a commitment.
- Soft commitments (directionally correct, scope adjustable): Up to one quarter out.
- Roadmap themes (investment areas, no scope or date implied): Beyond one quarter.

This does not eliminate planning - it reframes what planning produces. The output is "we are
investing in X this quarter" rather than "we will ship feature Y with this exact scope by this
exact date."

### Step 3: Establish a regular scope-negotiation cadence (Weeks 2-4)

Create a monthly review for any active commitment more than four weeks out. Ask: Is the scope
still accurate? Has the estimate changed? What is the latest realistic delivery range? Make scope
adjustment a normal part of the process rather than an admission of failure. Stakeholders who
participate in regular scope conversations are less surprised than those who receive a quarterly
"we need to slip" announcement.

### Step 4: Practice breaking features into independently valuable pieces (Weeks 3-6)

Work with product ownership to decompose large features into pieces that can ship and provide value
independently. Features designed as all-or-nothing deliveries are the root cause of most distant
date pressure. When the first slice ships in week four, the conversation shifts from "are we on
track for the full feature in Q3?" to "here is what users have now; what should we build next?"

### Step 5: Build the history that enables better forecasts (Ongoing)

Track the gap between initial commitments and actual delivery. Over time, this history becomes the
basis for realistic planning. "Our Q-length features take on average 1.4x the initial estimate" is
useful data that justifies longer forecasting ranges and more scope flexibility. Present this data
to leadership as evidence that the current commitment model carries hidden inaccuracy.

| Objection | Response |
|-----------|----------|
| "Our stakeholders need dates to plan around" | Stakeholders need to plan, but plans built on inaccurate dates fail anyway. Start by presenting a range ("sometime in Q3") for the next commitment and explain the confidence level behind it. Stakeholders who understand the uncertainty plan more realistically than those given false precision. |
| "If we don't commit, nothing will get prioritized" | Prioritization does not require date-locked scope commitments. Replace the next date-locked roadmap item with an investment theme and an ordered backlog. Show stakeholders the top five items and ask them to confirm the order rather than the date. |
| "We already announced this externally" | External announcements of future features are a separate risk-management problem. Going forward, work with marketing and sales to communicate directional roadmaps rather than specific feature-and-date commitments. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Commitment accuracy rate | Percentage of commitments that deliver their original scope on the original date - expect this to be lower than assumed |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as features are decomposed and shipped incrementally rather than held for a committed date |
| Scope changes per feature | Should be treated as normal signal, not failure - an increase in visible scope changes means the process is becoming more honest |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as the pressure to rush incomplete work to a committed date is reduced |
| Time from feature start to first user value | Should decrease as features are broken into smaller independently shippable pieces |

## Related Content

- [Deadline-Driven Development]({{< relref "/docs/anti-patterns/organizational-cultural/planning/deadline-driven-development" >}}) - The sprint-level version of the same pressure
- [Missing Product Ownership]({{< relref "/docs/anti-patterns/organizational-cultural/team-dynamics/missing-product-ownership" >}}) - Without a product owner, there is nobody to renegotiate scope as understanding develops
- [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - Breaking features into pieces that can ship independently
- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - The delivery practice that makes distant date commitments unnecessary
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - Using historical delivery data to make more accurate forecasts
