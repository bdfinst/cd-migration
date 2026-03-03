---
title: "Deploying Only at Sprint Boundaries"
linkTitle: "Deploying Only at Sprint Boundaries"
weight: 5
category: "Organizational & Cultural"
risk_level: high
description: >
  All stories are bundled into a single end-of-sprint release, creating two-week batch deployments wearing Agile clothing.
tags:
  - batch-size
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The team runs two-week sprints. The sprint demo happens on Friday. Deployment to production
happens on Friday after the demo, or sometimes the following Monday morning. Every story
completed during the sprint ships in that deployment. A story finished on day two of the
sprint waits twelve days before it reaches users. A story finished on day thirteen ships
within hours of the boundary.

The team is practicing Agile. They have a backlog, a sprint board, a burndown chart, and
a retrospective. They are delivering regularly - every two weeks. The Scrum guide does not
mandate a specific deployment cadence, and the team has interpreted "sprint" as the natural
unit of delivery. A sprint is a delivery cycle; the end of a sprint is the delivery moment.

This feels like discipline. The team is not deploying untested, incomplete work. They are
delivering "sprint increments" - coherent, tested, reviewed work. The sprint boundary is
a quality gate. Only what is "sprint complete" ships.

In practice, the sprint boundary is a batch boundary. A story completed on day two and a
story completed on day thirteen ship together because they are in the same sprint. Their
deployment is coupled not by any technical dependency but by the calendar. The team has
recreated the release train inside the sprint, with the sprint length as the train schedule.

The two-week deployment cycle accumulates the same problems as any batch deployment: larger
change sets per deployment, harder diagnosis when things go wrong, longer wait time for
users to receive completed work, and artificial pressure to finish stories before the sprint
boundary rather than when they are genuinely ready.

Common variations:

- **The sprint demo gate.** Nothing deploys until the sprint demo approves it. If the demo
  reveals a problem, the fix goes into the next sprint and waits another two weeks.
- **The "only fully-complete stories" filter.** Stories that are complete but have known
  minor issues are held back from the sprint deployment, creating a permanent backlog of
  "almost done" work.
- **The staging-only sprint.** The sprint delivers to staging, and a separate production
  deployment process (weekly, bi-weekly) governs when staging work reaches production.
  The sprint adds a deployment stage without replacing the gating calendar.
- **The sprint-aligned release planning.** Marketing and stakeholder communications are built
  around the sprint boundary, making it socially difficult to deploy work before the sprint
  ends even when the work is ready.

The telltale sign: a developer who finishes a story on day two is told to "mark it done for
sprint review" rather than "deploy it now."

## Why This Is a Problem

The sprint is a planning and learning cadence. It is not a deployment cadence. When the
sprint becomes the deployment cadence, the team inherits all of the problems of infrequent
batch deployment and adds an Agile ceremony layer on top. The sprint structure that is meant
to produce fast feedback instead produces two-week batches with a demo attached.

### It reduces quality

Sprint-boundary deployments mean that bugs introduced at the beginning of a sprint are not
discovered in production until the sprint ends. During those two weeks, the bug may be
compounded by subsequent changes that build on the same code. What started as a simple defect
in week one becomes entangled with week two's work by the time production reveals it.

The sprint demo is not a substitute for production feedback. Stakeholders in a sprint demo
see curated workflows on a staging environment. Real users in production exercise the full
surface area of the application, including edge cases and unusual workflows that no demo
scenario covers. The two weeks between deployments is two weeks of production feedback the
team is not getting.

Code review and quality verification also degrade at batch boundaries. When many stories
complete in the final days before a sprint demo, reviewers process multiple pull requests
under time pressure. The reviews are less thorough than they would be for changes spread
evenly throughout the sprint. The "quality gate" of the sprint boundary is often thinner
in practice than in theory.

### It increases rework

The sprint-boundary deployment pattern creates strong incentives for story-padding: adding
estimated work to stories so they fill the sprint rather than completing early and sitting
idle. A developer who finishes a story in three days when it was estimated as six might add
refinements to avoid the appearance of the story completing too quickly. This is waste.

Sprint-boundary batching also increases the cost of defects found in production. A defect
found on Monday in a story that was deployed Friday requires a fix, a full sprint pipeline
run, and often a wait until the next sprint boundary before the fix reaches production. What
should be a same-day fix becomes a two-week cycle. The defect lives in production for the
full duration.

Hot patches - emergency fixes that cannot wait for the sprint boundary - create process
exceptions that generate their own overhead. Every hot patch requires a separate deployment
outside the normal sprint cadence, which the team is not practiced at. Hot patch deployments
are higher-risk because they fall outside the normal process, and the team has not automated
them because they are supposed to be exceptional.

### It makes delivery timelines unpredictable

From a user perspective, the sprint-boundary deployment model means that any completed work
is unavailable for up to two weeks. A feature requested urgently is developed urgently but
waits at the sprint boundary regardless of how quickly it was built. The development effort
was responsive; the delivery was not.

Sprint boundaries also create false completion milestones. A story marked "done" at sprint
review is done in the planning sense - completed, reviewed, accepted. But it is not done in
the delivery sense - users cannot use it yet. Stakeholders who see a story marked done at
sprint review and then ask for feedback from users a week later are surprised to learn the
work has not reached production yet.

For multi-sprint features, the sprint-boundary deployment model means intermediate increments
never reach production. The feature is developed across sprints but only deployed when the
whole feature is ready - which combines the sprint boundary constraint with the big-bang
feature delivery problem. The sprints provide a development cadence but not a delivery
cadence.

### Impact on continuous delivery

Continuous delivery requires that completed work can reach production quickly through an
automated pipeline. The sprint-boundary deployment model imposes a mandatory hold on all
completed work until the calendar says it is time. This is the definitional opposite of
"can be deployed at any time."

CD also creates the learning loop that makes Agile valuable. The value of a two-week sprint
comes from delivering and learning from real production use within the sprint, then using
those learnings to inform the next sprint. Sprint-boundary deployment means that production
learning from sprint N does not begin until sprint N+1 has already started. The learning
cycle that Agile promises is delayed by the deployment cadence.

The goal is to decouple the deployment cadence from the sprint cadence. Stories should deploy
when they are ready, not when the calendar says. The sprint remains a planning and review
cadence. It is no longer a deployment cadence.

## How to Fix It

### Step 1: Separate the deployment conversation from the sprint conversation

In the next sprint planning session, explicitly establish the distinction:

- The sprint is a planning cycle. It determines what the team works on in the next two weeks.
- Deployment is a technical event. It happens when a story is complete and the pipeline
  passes, not when the sprint ends.
- The sprint review is a team learning ceremony. It can happen at the sprint boundary even
  if individual stories were already deployed throughout the sprint.

Write this down and make it visible. The team needs to internalize that sprint end is not
deployment day - deployment day is every day there is something ready.

### Step 2: Deploy the first story that completes this sprint, immediately

Make the change concrete by doing it:

1. The next story that completes this sprint with a passing pipeline - deploy it to production
   the day it is ready.
2. Do not wait for the sprint review.
3. Monitor it. Note that nothing catastrophic happens.

This demonstration breaks the mental association between sprint end and deployment. Once the
team has deployed mid-sprint and seen that it is safe and unremarkable, the sprint-boundary
deployment habit weakens.

### Step 3: Update the Definition of Done to include deployment

Change the team's Definition of Done:

- Old Definition of Done: code reviewed, merged, pipeline passing, accepted at sprint demo.
- New Definition of Done: code reviewed, merged, pipeline passing, deployed to production
  (or to staging with production deployment automated).

A story that is code-complete but not deployed is not done. This definition change forces
the deployment question to be resolved per story rather than per sprint.

### Step 4: Decouple the sprint demo from deployment

If the sprint demo is the gate for deployment, remove the gate:

1. Deploy stories as they complete throughout the sprint.
2. The sprint demo shows what was deployed during the sprint rather than approving what is
   about to be deployed.
3. Stakeholders can verify sprint demo content in production rather than in staging, because
   the work is already there.

This is a better sprint demo. Stakeholders see and interact with code that is already live,
not code that is still staged for deployment. "We are about to ship this" becomes "this is
already shipped."

### Step 5: Address emergency patch processes (Weeks 2-4)

If the team has a separate hot patch process, examine it:

1. If deploying mid-sprint is now normal, the distinction between a hot patch and a normal
   deployment disappears. The hot patch process can be retired.
2. If specific changes are still treated as exceptions (production incidents, critical bugs),
   ensure those changes use the same automated pipeline as normal deployments. Emergency
   deployments should be faster normal deployments, not a different process.

### Step 6: Align stakeholder reporting to continuous delivery reality (Weeks 3-6)

Update stakeholder communication so it reflects continuous delivery rather than sprint
boundaries:

1. Replace "sprint deliverables" reports with a continuous delivery report: what was deployed
   this week and what is the current production state?
2. Establish a lightweight communication channel for production deployments - a Slack message,
   an email notification, a release note entry - so stakeholders know when new work reaches
   production without waiting for sprint review.
3. Keep the sprint review as a team learning ceremony but frame it as reviewing what was
   delivered and learned, not approving what is about to ship.

| Objection | Response |
|-----------|----------|
| "Our product owner wants to see and approve stories before they go live" | The product owner's approval role is to accept or reject story completion, not to authorize deployment. Use feature flags so the product owner can review completed stories in production before they are visible to users. Approval gates the visibility, not the deployment. |
| "We need the sprint demo for stakeholder alignment" | Keep the sprint demo. Remove the deployment gate. The demo can show work that is already live, which is more honest than showing work that is "about to" go live. |
| "Our team is not confident enough to deploy without the sprint as a safety net" | The sprint boundary is not a safety net - it is a delay. The actual safety net is the test suite, the code review process, and the automated deployment with health checks. Invest in those rather than in the calendar. |
| "We are a regulated industry and need approval before deployment" | Review the actual regulation. Most require documented approval of changes, not deployment gating. Code review plus a passing automated pipeline provides a documented approval trail. Schedule a meeting with your compliance team and walk them through what the automated pipeline records - most find it satisfies the requirement. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Should increase from once per sprint toward multiple times per week |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as stories deploy when complete rather than at sprint end |
| Time from story complete to production deployment | Should decrease from up to 14 days to under 1 day |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as smaller, individual deployments replace sprint batches |
| [Work in progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) | Should decrease as "done but not deployed" stories are eliminated |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Should decrease as production defects can be fixed and deployed immediately |

## Related Content

- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - The principle that reduces deployment risk by reducing deployment size
- [Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}) - Decoupling deployment from user visibility for product owner approval workflows
- [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}) - Stories small enough to complete and deploy frequently
- [Release Trains]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/release-trains" >}}) - The same batch deployment pattern at a larger scale
- [Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}) - One automated path that deploys any passing change on demand
