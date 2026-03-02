---
title: "The 'We're Different' Mindset"
linkTitle: "The 'We're Different' Mindset"
weight: 59
category: "Organizational & Cultural"
risk_level: medium
description: >
  The belief that CD works for others but not here - "we're regulated," "we're too big," "our
  technology is too old" - is used to justify not starting.
tags:
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

A team attends a conference talk about CD. The speaker describes deploying dozens of times per day,
automated pipelines catching defects before they reach users, developers committing directly to
trunk. On the way back to the office, the conversation is skeptical: "That's great for a startup
with a greenfield codebase, but we have fifteen years of technical debt." Or: "We're in financial
services - we have compliance requirements they don't deal with." Or: "Our system is too integrated;
you can't just deploy one piece independently."

Each statement contains a grain of truth. The organization is regulated. The codebase is old. The
system is tightly coupled. But the grain of truth is used to dismiss the entire direction rather
than to scope the starting point. "We cannot do it perfectly today" becomes "we should not start
at all."

This pattern is often invisible as a pattern. Each individual objection sounds reasonable. Regulators
do impose constraints. Legacy codebases do create real friction. The problem is not any single
objection but the pattern of always finding a reason why this organization is different from the
ones that succeeded - and never finding a starting point small enough that the objection does not
apply.

Common variations:

- **"We're regulated."** Compliance requirements are used as a blanket veto on any CD practice.
  Nobody actually checks whether the regulation prohibits the practice. The regulation is invoked
  as intuition, not as specific cited text.
- **"Our technology is too old."** The mainframe, the legacy monolith, the undocumented Oracle
  schema is treated as an immovable object. CD is for teams that started with modern stacks.
  The legacy system is never examined for which parts could be improved now.
- **"We're too big."** Size is cited as a disqualifier. "Amazon can do it because they built their
  systems for it from the start, but we have 50 teams all depending on each other." The
  coordination complexity is real, but it is treated as permanent rather than as a problem to
  be incrementally reduced.
- **"Our customers won't accept it."** The belief that customers require staged rollouts, formal
  release announcements, or quarterly update cycles - often without ever asking the customers.
  The assumed customer requirement substitutes for an actual customer requirement.
- **"We tried it once and it didn't work."** A failed pilot - often underresourced, poorly
  scoped, or abandoned after the first difficulty - is used as evidence that the approach does
  not apply to this organization. A single unsuccessful attempt becomes generalized proof of
  impossibility.

The telltale sign: the conversation about CD always ends with a "but" - and the team reaches the
"but" faster each time the topic comes up.

## Why This Is a Problem

The "we're different" mindset is self-reinforcing. Each time a reason not to start is accepted, the
organization's delivery problems persist, which produces more evidence that the system is too hard
to change, which makes the next reason not to start feel more credible. The gap between the
organization and its more capable peers widens over time.

### It reduces quality

A defect introduced today will be found in manual regression testing three weeks from now, after
batch changes have compounded it with a dozen other modifications. The developer has moved on,
the context is gone, and the fix takes three times as long as it would have at the time of writing.
That cost repeats on every release.

Each release involves more manual testing, more coordination, more risk from large batches
of accumulated changes. The "we're different" position does not protect quality; it protects the
status quo while quality quietly erodes. Organizations that do start CD improvement, even in small
steps, consistently report better defect detection and lower production incident rates than they
had before.

### It increases rework

An hour of manual regression testing on every release, run by people who did not write the code,
is an hour that automation would eliminate - and it compounds with every release. Manual test
execution, manual deployment processes, manual environment setup each represent repeated effort
that the "we're different" mindset locks in permanently.

Teams that do not practice CD tend to have longer feedback loops. A defect introduced today is
discovered in integration testing three weeks from now, at which point the developer has to
context-switch back to code they no longer remember clearly. The rework of late defect discovery
is real, measurable, and avoidable - but only if the team is willing to build the testing and
integration practices that catch defects earlier.

### It makes delivery timelines unpredictable

Ask a team using this pattern when the next release will be done. They cannot tell you. Long release
cycles, complex manual processes, and large batches of accumulated changes combine to make each
release a unique, uncertain event. When every release is a special case, there is no baseline for
improvement and no predictable delivery cadence.

CD improves predictability precisely because it makes delivery routine. When deployment happens
frequently through an automated pipeline, each deployment is small, understood, and follows a
consistent process. The "we're different" organizations have the most to gain from this
routinization - and the longest path to it, which the mindset ensures they never begin.

### Impact on continuous delivery

The "we're different" mindset prevents CD adoption not by identifying insurmountable barriers but
by preventing the work of understanding which barriers are real, which are assumed, and which
could be addressed with modest effort. Most organizations that have successfully adopted CD
started with systems and constraints that looked, from the outside, like the objections their
peers were raising.

The regulated industries argument deserves direct rebuttal: banks, insurance companies, healthcare
systems, and defense contractors practice CD. The regulation constrains what must be documented
and audited, not how frequently software is tested and deployed. The teams that figured this out
did not have a different regulatory environment - they had a different starting assumption about
whether starting was possible.

## How to Fix It

### Step 1: Audit the objections for specificity

List every reason currently cited for why CD is not applicable. For each reason, find the specific
constraint: cite the regulation by name, identify the specific part of the legacy system that
cannot be changed, describe the specific customer requirement that prevents frequent deployment.
Many objections do not survive the specificity test - they dissolve into "we assumed this was
true but haven't checked."

For those that survive, determine whether the constraint applies to all practices or only some.
A compliance requirement that mandates separation of duties does not prevent automated testing.
A legacy monolith that cannot be broken up this year can still have its deployment automated.

### Step 2: Find one team and one practice where the objections do not apply

Even in highly constrained organizations, some team or some part of the system is less constrained
than the general case. Identify the team with the cleanest codebase, the fewest dependencies, the
most autonomy over their deployment process. Start there. Apply one practice - automated testing,
trunk-based development, automated deployment to a non-production environment. Generate evidence
that it works in this organization, with this technology, under these constraints.

### Step 3: Document the actual regulatory constraints (Weeks 2-4)

Engage the compliance or legal team directly with a specific question: "Here is a practice we want
to adopt. Does our regulatory framework prohibit it?" In most cases the answer is "no" or "yes,
but here is what you would need to document to satisfy the requirement." The documentation
requirement is manageable; the vague assumption that "regulation prohibits this" is not.

Bring the regulatory analysis back to the engineering conversation. "We checked. The regulation
requires an audit trail for deployments, not a human approval gate. Our pipeline can generate the
audit trail automatically." Specificity defuses the objection.

### Step 4: Run a structured constraint analysis (Weeks 3-6)

For each genuine technical constraint identified in Step 1, assess:

- Can this constraint be removed in 30 days? 90 days? 1 year?
- What would removing it make possible?
- What is the cost of not removing it over the same period?

This produces a prioritized improvement backlog grounded in real constraints rather than assumed
impossibility. The framing shifts from "we can't do CD" to "here are the specific things we need
to address before we can adopt this specific practice."

### Step 5: Build the internal case with evidence (Ongoing)

Each successful improvement creates evidence that contradicts the "we're different" position. A
team that automated their deployment in a regulated environment has demonstrated that automation
and compliance are compatible. A team that moved to trunk-based development on a fifteen-year-old
codebase has demonstrated that age is not a barrier to good practices. Document these wins
explicitly and share them. The "we're different" mindset is defeated by examples, not arguments.

| Objection | Response |
|-----------|----------|
| "We're in a regulated industry and have compliance requirements" | Name the specific regulation and the specific requirement. Most compliance frameworks require traceability and separation of duties, which automated pipelines satisfy better than manual processes. Regulated organizations including banks, insurers, and healthcare companies practice CD today. |
| "Our technology is too old to automate" | Age does not prevent incremental improvement. The first goal is not full CD - it is one automated test that catches one class of defect earlier. Start there. The system does not need to be fully modernized before automation provides value. |
| "We're too large and too integrated" | Size and integration complexity are the symptoms that CD addresses. The path through them is incremental decoupling, starting with the highest-value seams. Large integrated systems benefit from CD more than small systems do - the pain of manual releases scales with size. |
| "Our customers require formal release announcements" | Check whether this is a stated customer requirement or an assumed one. Many "customer requirements" for quarterly releases are internal assumptions that have never been tested with actual customers. Feature flags can provide customers the stability of a formal release while the team deploys continuously. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Number of "we can't do this because" objections with specific cited evidence | Should decrease as objections are tested against reality and either resolved or properly scoped |
| [Release frequency](../../../metrics/release-frequency/) | Should increase as barriers are addressed and deployment becomes more routine |
| [Lead time](../../../metrics/lead-time/) | Should decrease as practices that reduce handoffs and manual steps are adopted |
| Number of teams practicing at least one CD-adjacent practice | Should grow as the pilot demonstrates viability |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should remain stable or improve as automation replaces manual processes |

## Related Content

- [Assess: Identify Constraints](../../../migrate-to-cd/migration-path/assess/identify-constraints/) - A structured method for distinguishing real constraints from assumed ones
- [Value Stream Mapping](../../../migrate-to-cd/migration-path/assess/value-stream-mapping/) - Making the current delivery process visible so improvement areas can be identified
- [After the Rewrite](../after-the-rewrite/) - A related pattern that defers improvement to a future that never arrives
- [Working Agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - Establishing shared commitments to start improving, whatever the constraints
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Using evidence to make the case for change
