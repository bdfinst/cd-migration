---
title: "Deferring CD Until After the Rewrite"
linkTitle: "Deferring CD Until After the Rewrite"
weight: 91
category: "Organizational & Cultural"
risk_level: medium
description: >
  CD adoption is deferred until a mythical rewrite that may never happen, while the existing
  system continues to be painful to deploy.
tags:
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

The engineering team has a plan. The current system is a fifteen-year-old monolith: undocumented,
tightly coupled, slow to build, and painful to deploy. Everyone agrees it needs to be replaced.
The new architecture is planned: microservices, event-driven, cloud-native, properly tested from
the start. When the new system is ready, the team will practice CD properly.

The rewrite was scoped two years ago. The first service was delivered. The second is in progress.
The third has been descoped twice. The monolith continues to receive new features because business
cannot wait for the rewrite. The old system is as painful to deploy as ever. New features are
being added to the system that was supposed to be abandoned. The rewrite horizon has moved from
"Q4 this year" to "sometime next year" to "when we get the migration budget approved."

The team is waiting for a future state to start doing things better. The future state keeps
retreating. The present state keeps getting worse.

Common variations:

- **The platform prerequisite.** "We can't practice CD until we have the new platform." The new
  platform is eighteen months away. In the meantime, deployments remain manual and painful. The
  platform arrives - and is missing the one capability the team needed, which requires another
  six months of work.
- **The containerization first.** "We need to containerize everything before we can build a
  proper pipeline." Containerization is a reasonable goal, but it is not a prerequisite for
  automated testing, trunk-based development, or deployment automation. The team waits for
  containerization before improving any practice.
- **The greenfield sidestep.** When asked why the current system does not have automated tests, the
  answer is "that codebase is untestable; we're writing the new system with tests." The new system
  is a side project that may never replace the primary system. Meanwhile, the primary system
  ships defects that tests would have caught.
- **The waiting for tooling.** "Once we've migrated to [new CI tool], we'll build out the
  pipeline properly." The tooling migration takes a year. Building the pipeline properly does
  not start when the tool arrives because by then a new prerequisite has emerged.

The telltale sign: the phrase "once we finish the rewrite" has appeared in planning conversations
for more than a year, and the completion date has moved at least twice.

## Why This Is a Problem

Deferral is a form of compounding debt. Each month the existing system continues to be deployed
manually is a month of manual deployment effort that automation would have eliminated. Each month
without automated testing is a month of defects that would have been caught earlier. The future
improvement, when it arrives, must pay for itself against an accumulating baseline of foregone
benefit.

### It reduces quality

A user hits a bug in the existing system today. The fix is delayed because the team is focused
on the rewrite. "We'll get it right in the new system" is not comfort to the user affected now -
or to the users who will be affected by the next bug from a codebase with no automated tests.

There is also a structural risk: the existing system continues to receive features. Features
added to the "soon to be replaced" system are written without the quality discipline the team
plans to apply to the new system. The technical debt accelerates because everyone knows the
system is temporary. By the time the rewrite is complete - if it ever is - the existing system
has accumulated years of change made under the assumption that quality does not matter because
the system will be replaced.

### It increases rework

The new system goes live. Within two weeks, the business discovers it does not handle a particular
edge case that the old system handled silently for years. Nobody wrote it down. The team spends a
sprint reverse-engineering and replicating behavior that a test suite on the old system would have
documented automatically. This happens not once but repeatedly throughout the migration.

Deferring test automation also defers the discovery of architectural problems. In teams that write
tests, untestable code is discovered immediately when trying to write the first test. In teams
that defer testing to the new system, the architectural problems that make testing hard are
discovered only during the rewrite - when they are significantly more expensive to address.

### It makes delivery timelines unpredictable

The rewrite was scoped at six months. At month four, the team discovers the existing system has
integrations nobody documented. The timeline moves to nine months. At month seven, scope increases
because the business added new requirements. The horizon is always receding.

When the rewrite slips, the CD adoption it was supposed to unlock also slips. The team is
delivering against two roadmaps: the existing system's features (which the business needs now)
and the new system's construction (which nobody is willing to slow down). Both slip. The existing
system's delivery timeline remains painful. The new system's delivery timeline is aspirational
and usually wrong.

### Impact on continuous delivery

CD is a set of practices that can be applied incrementally to existing systems. Waiting for a
rewrite to start those practices means not benefiting from them for the duration of the rewrite
and then having to build them fresh on the new system without the organizational experience of
having used them on anything real.

Teams that introduce CD practices to existing systems - even painful, legacy systems - build the
organizational muscle memory and tooling that transfers to the new system. Automated testing on
the legacy system, however imperfect, is experience that informs how tests are written on the new
system. Deployment automation for the legacy system is practice for deployment automation on the
new system. Deferring CD defers not just the benefits but the organizational learning.

## How to Fix It

### Step 1: Identify what can improve now, without the rewrite

List the specific practices the team is deferring to the rewrite. For each one, identify the
specific technical barrier: "We can't add tests because class X has 12 dependencies that cannot
be injected." Then determine whether the barrier applies to all parts of the system or only some.

In most legacy systems, there are areas with lower coupling that can be tested today. There is
a deployment process that can be automated even if the application architecture is not ideal.
There is a build process that can be made faster. Not everything is blocked by the rewrite.

### Step 2: Start the "strangler fig" for at least one CD practice (Weeks 2-4)

The strangler fig pattern - wrapping old behavior with new - applies to practices as well as
architecture. Choose one CD practice and apply it to the new code being added to the existing
system, even while the old code remains unchanged.

For example: all new classes written in the existing system are testable (properly isolated with
injected dependencies). Old untestable classes are not rewritten, but no new untestable code is
added. Over time, the testable fraction of the codebase grows. The rewrite is not a prerequisite
for this improvement - a team agreement is.

### Step 3: Automate the deployment of the existing system (Weeks 3-8)

Manual deployment of the existing system is a cost paid on every deployment. Deployment automation
does not require a new architecture. Even a monolith with a complex deployment process can have
that process codified in a pipeline script. The benefit is immediate. The organizational
experience of running an automated deployment pipeline transfers directly to the new system when
it is ready.

### Step 4: Set a "both systems healthy" standard for the rewrite (Weeks 4-8)

Reframing the rewrite as a migration rather than an escape hatch changes the team's relationship
to the existing system. The standard: both systems should be healthy. The existing system receives
the same deployment pipeline investment as the new system. Tests are written for new features
on the existing system. Operational monitoring is maintained on the existing system.

This creates two benefits. First, the existing system is better cared for. Second, the team
stops treating the rewrite as the only path to quality improvement, which reduces the urgency
that has been artificially attached to the rewrite timeline.

### Step 5: Establish criteria for declaring the rewrite "done" (Ongoing)

Rewrites without completion criteria never end. Define explicitly what the rewrite achieves:
what functionality must be migrated, what performance targets must be met, what CD practices
must be operational. When those criteria are met, the rewrite is done. This prevents the
horizon from receding indefinitely.

| Objection | Response |
|-----------|----------|
| "The existing codebase is genuinely untestable - you cannot add tests to it" | Some code is very hard to test. But "very hard" is not "impossible." Characterization testing, integration tests at the boundary, and applying the strangler fig to new additions are all available. Even imperfect test coverage on an existing system is better than none. |
| "We don't want to invest in automation for code we're about to throw away" | You are not about to throw it away - you have been about to throw it away for two years. The expected duration of the investment is the duration of the rewrite, which is already longer than estimated. A year of automated deployment benefit is real return. |
| "The new system will be built with CD from the start, so we'll get the benefits there" | That is true, but it ignores that the existing system is what your users depend on today. Defects escaping from the existing system cost real money, regardless of how clean the new system's practices will be. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Percentage of new code in existing system covered by automated tests | Should increase from the current baseline as new code is held to a higher standard |
| [Release frequency](../../../metrics/release-frequency/) | Should increase as deployment automation reduces the friction of deploying the existing system |
| [Lead time](../../../metrics/lead-time/) | Should decrease for the existing system as manual steps are automated |
| Rewrite completion percentage vs. original estimate | Tracking this honestly surfaces how much the horizon has moved |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease for the existing system as test coverage increases |

## Related Content

- [The "We're Different" Mindset](../were-different-mindset/) - The related pattern of using context as a reason not to start
- [Architecture Decoupling](../../../migrate-to-cd/migration-path/optimize/architecture-decoupling/) - Incremental approaches to improving an existing system's architecture
- [Testing Fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - How to start building test coverage on an existing codebase
- [Build Automation](../../../migrate-to-cd/migration-path/foundations/build-automation/) - Automating the build and deployment of an existing system
- [Assess: Identify Constraints](../../../migrate-to-cd/migration-path/assess/identify-constraints/) - Distinguishing real technical barriers from assumed ones
