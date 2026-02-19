---
title: "Release Trains"
linkTitle: "Release Trains"
weight: 3
category: "Organizational & Cultural"
risk_level: high
description: >
  Changes wait for the next scheduled release window regardless of readiness, batching unrelated work and adding artificial delay.
tags:
  - batch-size
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The schedule is posted in the team wiki: releases go out every Thursday at 2 PM. There is
a code freeze starting Wednesday at noon. If your change is not merged by Wednesday noon, it
catches the next train. The next train leaves Thursday in one week.

A developer finishes a bug fix on Wednesday at 1 PM - one hour after code freeze. The fix is
ready. The tests pass. The change is reviewed. But it will not reach production until the
following Thursday, because it missed the train. A critical customer-facing bug sits in a
merged, tested, deployable state for eight days while the release train idles at the station.

The release train schedule was created for good reasons. Coordinating deployments across
multiple teams is hard. Having a fixed schedule gives everyone a shared target to build toward.
Operations knows when to expect deployments and can staff accordingly. The train provides
predictability. The cost - delay for any change that misses the window - is accepted as the
price of coordination.

Over time, the costs compound in ways that are not obvious. Changes accumulate between
train departures, so each train carries more changes than it would if deployment were more
frequent. Larger trains are riskier. The operations team that manages the Thursday deployment
must deal with a larger change set each week, which makes diagnosis harder when something goes
wrong. The schedule that was meant to provide predictability starts producing unpredictable
incidents.

Common variations:

- **The bi-weekly train.** Two weeks between release windows. More accumulation, higher risk
  per release, longer delay for any change that misses the window.
- **The multi-team coordinated train.** Several teams must coordinate their deployments.
  If any team misses the window, or if their changes are not compatible with another team's
  changes, the whole train is delayed. One team's problem becomes every team's delay.
- **The feature freeze.** A variation of the release train where the schedule is driven by
  a marketing event or business deadline. No new features after the freeze date. Changes
  that are not "ready" by the freeze date wait for the next release cycle, which may be
  months away.
- **The change freeze.** No production changes during certain periods - end of quarter, major
  holidays, "busy seasons." Changes pile up before the freeze and deploy in a large batch
  when the freeze ends, creating exactly the risky deployment event the freeze was designed
  to avoid.

The telltale sign: developers finishing their work on Thursday afternoon immediately calculate
whether they will make the Wednesday cutoff for the next week's train, or whether they are
looking at a two-week wait.

## Why This Is a Problem

The release train creates an artificial constraint on when software can reach users. The
constraint is disconnected from the quality or readiness of the software. A change that is
fully tested and ready to deploy on Monday waits until Thursday not because it needs more
time, but because the schedule says Thursday. The delay creates no value and adds risk.

### It reduces quality

A deployment carrying twelve accumulated changes takes hours to diagnose when something goes
wrong - any of the dozen changes could be the cause. When a dozen changes accumulate between
train departures and are deployed together, the post-deployment quality signal is aggregated:
if something goes wrong, it went wrong because of one of these dozen changes. Identifying
which change caused the problem requires analysis of all changes in the batch, correlation
with timing, and often a process of elimination.

Compare this to deploying changes individually. When a single change is deployed and something
goes wrong, the investigation starts and ends in one place: the change that just deployed.
The cause is obvious. The fix is fast. The quality signal is precise.

The batching effect also obscures problems that interact. Two individually safe changes can
combine to cause a problem that neither would cause alone. In a release train deployment where
twelve changes deploy simultaneously, an interaction problem between changes three and eight
may not be identifiable as an interaction at all. The team spends hours investigating what
should be a five-minute diagnosis.

### It increases rework

The release train schedule forces developers to estimate not just development time but train
timing. If a feature looks like it will take ten days and the train departs in nine days,
the developer faces a choice: rush to make the train, or let the feature catch the next one.
Rushing to make a scheduled release is one of the oldest sources of quality-reducing shortcuts
in software development. Developers skip the thorough test, defer the edge case, and merge
work that is "close enough" because missing the train means two weeks of delay.

Code that is rushed to make a release train accumulates technical debt at an accelerated rate.
The debt is deferred to the next cycle, which is also constrained by a train schedule, which
creates pressure to rush again. The pattern reinforces itself.

When a release train deployment fails, recovery is more complex than recovery from an
individual deployment. A single-change deployment that causes a problem rolls back cleanly.
A twelve-change release train deployment that causes a problem requires deciding which of
the twelve changes to roll back - and whether rolling back some changes while keeping others
is even possible, given how changes may interact.

### It makes delivery timelines unpredictable

The release train promises predictability: releases happen on a schedule. In practice, it
delivers the illusion of predictability at the release level while making individual feature
delivery timelines highly variable.

A feature completed on Wednesday afternoon may reach users in one day (if Thursday's train is
the next departure) or in nine days (if Wednesday's code freeze just passed). The feature's
delivery timeline is not determined by the quality of the feature or the effectiveness of the
team - it is determined by a calendar. Stakeholders who ask "when will this be available?"
receive an answer that has nothing to do with the work itself.

The train schedule also creates sprint-end pressure. Teams working in two-week sprints aligned
to a weekly release train must either plan to have all sprint work complete by Wednesday noon
(cutting the sprint short effectively) or accept that end-of-sprint work will catch the
following week's train. This planning friction recurs every cycle.

### Impact on continuous delivery

The defining characteristic of CD is that software is always in a releasable state and can
be deployed at any time. The release train is the explicit negation of this: software can
only be deployed at scheduled times, regardless of its readiness.

The release train also prevents teams from learning the fast-feedback lessons that CD
produces. CD teams deploy frequently and learn quickly from production. Release train teams
deploy infrequently and learn slowly. A bug that a CD team would discover and fix within
hours might take a release train team two weeks to even deploy the fix for, once the bug
is discovered.

The train schedule can feel like safety - a known quantity in an uncertain process. In
practice, it provides the structure of safety without the substance. A train full of a dozen
accumulated changes is more dangerous than a single change deployed on its own, regardless
of how carefully the train departure was scheduled.

## How to Fix It

### Step 1: Make train departures more frequent (Week 1-2)

If the release train currently departs weekly, move to twice-weekly. If it departs bi-weekly,
move to weekly. This is the easiest immediate improvement - it requires no new tooling and
reduces the worst-case delay for a missed train by half.

Measure the change: track how many changes are in each release, the change fail rate, and
the incident rate per release. More frequent, smaller releases almost always show lower
failure rates than less frequent, larger releases.

### Step 2: Identify why the train schedule exists (Week 1-2)

Find the problem the train schedule was created to solve:

- Is the deployment process slow and manual? (Fix: automate the deployment.)
- Does deployment require coordination across multiple teams? (Fix: decouple the deployments.)
- Does operations need to staff for deployment? (Fix: make deployment automatic and safe enough
  that dedicated staffing is not required.)
- Is there a compliance requirement for deployment scheduling? (Fix: determine the actual
  requirement and find automation-based alternatives.)

Addressing the underlying problem allows the train schedule to be relaxed. Relaxing the
schedule without addressing the underlying problem will simply re-create the pressure that
led to the schedule in the first place.

### Step 3: Decouple service deployments (Weeks 2-4)

If the release train exists to coordinate deployment of multiple services, the goal is to
make each service deployable independently:

1. Identify the coupling between services that requires coordinated deployment. Usually this
   is shared database schemas, API contracts, or shared libraries.
2. Apply backward-compatible change strategies: add new API fields without removing old ones,
   apply the expand-contract pattern for database changes, version APIs that need to change.
3. Deploy services independently once they can handle version skew between each other.

This decoupling work is the highest-value investment for teams running multi-service release
trains. Once services can deploy independently, coordinated release windows are unnecessary.

### Step 4: Automate the deployment process (Weeks 2-4)

Automate every manual step in the deployment process. Manual processes require scheduling
because they require human attention and coordination; automated deployments can run at any
time without human involvement:

1. Automate the deployment steps (see the Manual Deployments anti-pattern for guidance).
2. Add post-deployment health checks and automated rollback.
3. Once deployment is automated and includes health checks, there is no reason it cannot
   run whenever a change is ready, not just on Thursday.

The release train schedule exists partly because deployment feels like an event that requires
planning and presence. Automated deployment with automated rollback makes deployment routine.
Routine processes do not need special windows.

### Step 5: Introduce feature flags for high-risk or coordinated changes (Weeks 3-6)

Use feature flags to decouple deployment from release for changes that genuinely need
coordination - for example, a new API endpoint and the marketing campaign that announces it:

1. Deploy the new API endpoint behind a feature flag.
2. The endpoint is deployed but inactive. No coordination with marketing is needed for
   deployment.
3. On the announced date, enable the flag. The feature becomes available without a
   deployment event.

This pattern allows teams to deploy continuously while still coordinating user-visible releases
for business reasons. The code is always in production - only the activation is scheduled.

### Step 6: Set a deployment frequency target and track it (Ongoing)

Establish a team target for deployment frequency and track it:

- Start with a target of at least one deployment per day (or per business day).
- Track deployments over time and report the trend.
- Celebrate increases in frequency as improvements in delivery capability, not as increased
  risk.

| Objection | Response |
|-----------|----------|
| "The release train gives our operations team predictability" | What does the operations team need predictability for? If it is staffing for a manual process, automating the process eliminates the need for scheduled staffing. If it is communication to users, that is a user notification problem, not a deployment scheduling problem. |
| "Some of our services are tightly coupled and must deploy together" | Tight coupling is the underlying problem. The release train manages the symptom. Services that must deploy together are a maintenance burden, an integration risk, and a delivery bottleneck. Decoupling them is the investment that removes the constraint. |
| "Missing the train means a two-week wait - that motivates people to hit their targets" | Motivating with artificial scarcity is a poor engineering practice. The motivation to ship on time should come from the value delivered to users, not from the threat of an arbitrary delay. Track how often changes miss the train due to circumstances outside the team's control, and bring that data to the next retrospective. |
| "We have always done it this way and our release process is stable" | Stable does not mean optimal. A weekly release train that works reliably is still deploying twelve changes at once instead of one, and still adding up to a week of delay to every change. Double the departure frequency for one month and compare the change fail rate - the data will show whether stability depends on the schedule or on the quality of each change. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Release frequency](../../../metrics/release-frequency/) | Should increase from weekly or bi-weekly toward multiple times per week |
| Changes per release | Should decrease as release frequency increases |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as smaller, more frequent releases carry less risk |
| [Lead time](../../../metrics/lead-time/) | Should decrease as artificial scheduling delay is removed |
| Maximum wait time for a ready change | Should decrease from days to hours |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as smaller deployments are faster to diagnose and roll back |

## Related Content

- [Single Path to Production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - A consistent automated path replaces manual coordination
- [Feature Flags](../../../migrate-to-cd/migration-path/optimize/feature-flags/) - Decoupling deployment from release removes the need for coordinated release windows
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - Smaller, more frequent deployments carry less risk than large, infrequent ones
- [Rollback](../../../migrate-to-cd/migration-path/pipeline/rollback/) - Automated rollback makes frequent deployment safe enough to stop scheduling it
- [Change Advisory Board Gates](cab-gates/) - A related pattern where manual approval creates similar delays
