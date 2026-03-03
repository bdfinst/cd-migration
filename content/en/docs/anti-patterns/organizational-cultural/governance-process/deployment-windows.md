---
title: "Deployment Windows"
linkTitle: "Deployment Windows"
weight: 7
category: "Organizational & Cultural"
risk_level: high
description: >
  Production changes are only allowed during specific hours, creating artificial queuing and batching that increases risk per deployment.
tags:
  - process-gates
  - batch-size
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The policy is clear: production deployments happen on Tuesday and Thursday between 2 AM and
4 AM. Outside of those windows, no code may be deployed to production except through an
emergency change process that requires manager and director approval, a post-deployment
review meeting, and a written incident report regardless of whether anything went wrong.

The 2 AM window was chosen because user traffic is lowest. The twice-weekly schedule was
chosen because it gives the operations team time to prepare. Emergency changes are expensive
by design - the bureaucratic overhead is meant to discourage teams from circumventing the
process. The policy is documented, enforced, and has been in place for years.

A developer merges a critical security patch on Monday at 9 AM. The patch is ready. The
pipeline is green. The vulnerability it addresses is known and potentially exploitable. The
fix will not reach production until 2 AM on Tuesday - sixteen hours later. An emergency change
request is possible, but the cost is high and the developer's manager is reluctant to approve
it for a "medium severity" vulnerability.

Meanwhile, the deployment window fills. Every team has been accumulating changes since the
Thursday window. Tuesday's 2 AM window will contain forty changes from six teams, touching
three separate services and a shared database. The operations team running the deployment
will have a checklist. They will execute it carefully. But forty changes deploying in a two-hour
window is inherently complex, and something will go wrong. When it does, the team will spend
the rest of the night figuring out which of the forty changes caused the problem.

Common variations:

- **The weekend freeze.** No deployments from Friday afternoon through Monday morning.
  Changes that are ready on Friday wait until the following Tuesday window. Five days of
  accumulation before the next deployment.
- **The quarter-end freeze.** No deployments in the last two weeks of every quarter. Changes
  pile up during the freeze and deploy in a large batch when it ends. The freeze that was
  meant to reduce risk produces the highest-risk deployment of the quarter.
- **The pre-release lockdown.** Before a major product launch, a freeze prevents any
  production changes. Post-launch, accumulated changes deploy in a large batch. The launch
  that required maximum stability is followed by the least stable deployment period.
- **The maintenance window.** Infrastructure changes (database migrations, certificate
  renewals, configuration updates) are grouped into monthly maintenance windows. A
  configuration change that takes five minutes to apply waits three weeks for the maintenance
  window.

The telltale sign: when a developer asks when their change will be in production, the answer
involves a day of the week and a time of day that has nothing to do with when the change
was ready.

## Why This Is a Problem

Deployment windows were designed to reduce risk by controlling when deployments happen. In
practice, they increase risk by forcing changes to accumulate, creating larger and more complex
deployments, and concentrating all delivery risk into a small number of high-stakes events.
The cure is worse than the disease it was intended to treat.

### It reduces quality

When forty changes deploy in a two-hour window and something breaks, the team spends the rest
of the night figuring out which of the forty changes is responsible. When a single change is
deployed, any problem that appears afterward is caused by that change. Investigation is fast,
rollback is clean, and the fix is targeted.

Deployment windows compress changes into batches. The larger the batch, the coarser the
quality signal. Teams working under deployment window constraints learn to accept that
post-deployment diagnosis will take hours, that some problems will not be diagnosed until
days after deployment when the evidence has clarified, and that rollback is complex because
it requires deciding which of the forty changes to revert.

The quality degradation compounds over time. As batch sizes grow, post-deployment incidents
become harder to investigate and longer to resolve. The deployment window policy that was meant
to protect production actually makes production incidents worse by making their causes harder
to identify.

### It increases rework

The deployment window creates a pressure cycle. Changes accumulate between windows. As the
window approaches, teams race to get their changes ready in time. Racing creates shortcuts:
testing is less thorough, reviews are less careful, edge cases are deferred to the next
window. The window intended to produce stable, well-tested deployments instead produces
last-minute rushes.

Changes that miss a window face a different rework problem. A change that was tested and
ready on Monday sits in staging until Tuesday's 2 AM window. During those sixteen hours,
other changes may be merged to the main branch. The change that was "ready" is now behind
other changes that might interact with it. When the window arrives, the deployer may need
to verify compatibility between the ready change and the changes that accumulated after it.
A change that should have deployed immediately requires new testing.

The 2 AM deployment time is itself a source of rework. Engineers are tired. They make
mistakes that alert engineers would not make. Post-deployment monitoring is less attentive
at 2 AM than at 2 PM. Problems that would have been caught immediately during business hours
persist until morning because the team doing the monitoring is exhausted or asleep by the
time the monitoring alerts trigger.

### It makes delivery timelines unpredictable

Deployment windows make delivery timelines a function of the deployment schedule, not the
development work. A feature completed on Wednesday will reach users on Tuesday morning - at
the earliest. A feature completed on Friday afternoon reaches users on Tuesday morning. From
a user perspective, both features were "ready" at different times but arrived at the same
time. Development responsiveness does not translate to delivery responsiveness.

This disconnect frustrates stakeholders. Leadership asks for faster delivery. Teams optimize
development and deliver code faster. But the deployment window is not part of development -
it is a governance constraint - so faster development does not produce faster delivery.
The throughput of the development process is capped by the throughput of the deployment
process, which is capped by the deployment window schedule.

Emergency exceptions make the unpredictability worse. The emergency change process is slow,
bureaucratic, and risky. Teams avoid it except in genuine crises. This means that urgent
but non-critical changes - a significant bug affecting 10% of users, a performance degradation
that is annoying but not catastrophic, a security patch for a medium-severity vulnerability -
wait for the next scheduled window rather than deploying immediately. The delivery timeline
for urgent work is the same as for routine work.

### Impact on continuous delivery

Continuous delivery is the ability to deploy any change to production at any time. Deployment
windows are the direct prohibition of exactly that capability. A team with deployment windows
cannot practice continuous delivery by definition - the deployment policy prevents it.

Deployment windows also create a category of technical debt that is difficult to pay down:
undeployed changes. A main branch that contains changes not yet deployed to production is a
branch that has diverged from production. The difference between the main branch and production
represents undeployed risk - changes that are in the codebase but whose production behavior
is unknown. High-performing CD teams keep this difference as small as possible, ideally zero.
Deployment windows guarantee a large and growing difference between the main branch and
production at all times between windows.

The window policy also prevents the cultural shift that CD requires. Teams cannot learn
from rapid deployment cycles if rapid deployment is prohibited. The feedback loops that build
CD competence - deploy, observe, fix, deploy again - are stretched to day-scale rather than
hour-scale. The learning that CD produces is delayed proportionally.

## How to Fix It

### Step 1: Document the actual risk model for deployment windows

Before making any changes, understand why the windows exist and whether the stated reasons
are accurate:

1. Collect data on production incidents caused by deployments over the last six to twelve
   months. How many incidents were deployment-related? When did they occur - inside or
   outside normal business hours?
2. Calculate the average batch size per deployment window. Track whether larger batches
   correlate with higher incident rates.
3. Identify whether the 2 AM window has actually prevented incidents or merely moved them
   to times when fewer people are awake to observe them.

Present this data to the stakeholders who maintain the deployment window policy. In most cases,
the data shows that deployment windows do not reduce incidents - they concentrate them and
make them harder to diagnose.

### Step 2: Make the deployment process safe enough to run during business hours (Weeks 1-3)

Reduce deployment risk so that the 2 AM window becomes unnecessary. The window exists because
deployments are believed to be risky enough to require low traffic and dedicated attention -
address the risk directly:

1. Automate the deployment process completely, eliminating manual steps that fail at 2 AM.
2. Add automated post-deployment health checks and rollback so that a failed deployment is
   detected and reversed within minutes.
3. Implement progressive delivery (canary, blue-green) so that the blast radius of any
   deployment problem is limited even during peak traffic.

When deployment is automated, health-checked, and limited to small blast radius, the argument
that it can only happen at 2 AM with low traffic evaporates.

### Step 3: Reduce batch size by increasing deployment frequency (Weeks 2-4)

Deploy more frequently to reduce batch size - batch size is the greatest source of deployment
risk:

1. Start by adding a second window within the current week. If deployments happen Tuesday
   at 2 AM, add Thursday at 2 AM. This halves the accumulation.
2. Move the windows to business hours. A Tuesday morning deployment at 10 AM is lower risk
   than a Tuesday morning deployment at 2 AM because the team is alert, monitoring is
   staffed, and problems can be addressed immediately.
3. Continue increasing frequency as automation improves: daily, then on-demand.

Track change fail rate and incident rate at each frequency increase. The data will show
that higher frequency with smaller batches produces fewer incidents, not more.

### Step 4: Establish a path for urgent changes outside the window (Weeks 2-4)

Replace the bureaucratic emergency process with a technical solution. The emergency process
exists because the deployment window policy is recognized as inflexible for genuine urgencies
but the overhead discourages its use:

1. Define criteria for changes that can deploy outside the window without emergency approval:
   security patches above a certain severity, bug fixes for issues affecting more than N
   percent of users, rollbacks of previous deployments.
2. For changes meeting these criteria, the same automated pipeline that deploys within the
   window can deploy outside it. No emergency approval needed - the pipeline's automated
   checks are the approval.
3. Track out-of-window deployments and their outcomes. Use this data to expand the criteria
   as confidence grows.

### Step 5: Pilot window-free deployment for a low-risk service (Weeks 3-6)

Choose a service that:

- Has automated deployment with health checks.
- Has strong automated test coverage.
- Has limited blast radius if something goes wrong.
- Has monitoring in place.

Remove the deployment window constraint for this service. Deploy on demand whenever changes
are ready. Track the results for two months: incident rate, time to detect failures, time
to restore service. Present the data.

This pilot provides concrete evidence that deployment windows are not a safety mechanism -
they are a risk transfer mechanism that moves risk from deployment timing to deployment
batch size. The pilot data typically shows that on-demand, small-batch deployment is safer
than windowed, large-batch deployment.

| Objection | Response |
|-----------|----------|
| "User traffic is lowest at 2 AM - deploying then reduces user impact" | Deploying small changes continuously during business hours with automated rollback reduces user impact more than deploying large batches at 2 AM. Run the pilot in Step 5 and compare incident rates - a single-change deployment that fails during peak traffic affects far fewer users than a forty-change batch failure at 2 AM. |
| "The operations team needs to staff for deployments" | This is the operations team staffing for a manual process. Automate the process and the staffing requirement disappears. If the operations team needs to monitor post-deployment, automated alerting is more reliable than a tired operator at 2 AM. |
| "We tried deploying more often and had more incidents" | More frequent deployment of the same batch sizes would produce more incidents. More frequent deployment of smaller batch sizes produces fewer incidents. The frequency and the batch size must change together. |
| "Compliance requires documented change windows" | Most compliance frameworks (ITIL, SOX, PCI-DSS) require documented change management and audit trails, not specific deployment hours. An automated pipeline that records every deployment with test evidence and approval trails satisfies the same requirements more thoroughly than a time-based window policy. Engage the compliance team to confirm. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Should increase from twice-weekly to daily and eventually on-demand |
| Average changes per deployment | Should decrease as deployment frequency increases |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as smaller, more frequent deployments replace large batches |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Should decrease as deployments happen during business hours with full team awareness |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as changes deploy when ready rather than at scheduled windows |
| Emergency change requests | Should decrease as the on-demand deployment process becomes available for all changes |

## Related Content

- [Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}) - Automated rollback is what makes deployment safe enough to do at any time
- [Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}) - One consistent automated path replaces manually staffed deployment events
- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - Smaller deployments are the primary lever for reducing deployment risk
- [Release Trains]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/release-trains" >}}) - A closely related pattern where a scheduled release window governs all changes
- [Change Advisory Board Gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}) - Another gate-based anti-pattern that creates similar queuing and batching problems
