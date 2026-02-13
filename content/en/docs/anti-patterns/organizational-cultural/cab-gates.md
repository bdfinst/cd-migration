---
title: "Change Advisory Board Gates"
linkTitle: "Change Advisory Board Gates"
weight: 55
category: "Organizational & Cultural"
risk_level: high
description: >
  Manual committee approval required for every production change. Meetings are weekly. One-line
  fixes wait alongside major migrations.
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

Before any change can reach production, it must be submitted to the Change Advisory Board. The
developer fills out a change request form: description of the change, impact assessment, rollback
plan, testing evidence, and approval signatures. The form goes into a queue. The CAB meets once
a week - sometimes every two weeks - to review the queue. Each change gets a few minutes of
discussion. The board approves, rejects, or requests more information.

A one-line configuration fix that a developer finished on Monday waits until Thursday's CAB
meeting. If the board asks a question, the change waits until the next meeting. A two-line bug
fix sits in the same queue as a database migration, reviewed by the same people with the same
ceremony.

Common variations:

- **The rubber-stamp CAB.** The board approves everything. Nobody reads the change requests
  carefully because the volume is too high and the context is too shallow. The meeting exists
  to satisfy an audit requirement, not to catch problems. It adds delay without adding safety.
- **The bottleneck approver.** One person on the CAB must approve every change. That person is
  in six other meetings, has 40 pending reviews, and is on vacation next week. Deployments
  stop when they are unavailable.
- **The emergency change process.** Urgent fixes bypass the CAB through an "emergency change"
  procedure that requires director-level approval and a post-hoc review. The emergency process
  is faster, so teams learn to label everything urgent. The CAB process is for scheduled changes,
  and fewer changes are scheduled.
- **The change freeze.** Certain periods - end of quarter, major events, holidays - are declared
  change-free zones. No production changes for days or weeks. Changes pile up during the freeze
  and deploy in a large batch afterward, which is exactly the high-risk event the freeze was
  meant to prevent.
- **The form-driven process.** The change request template has 15 fields, most of which are
  irrelevant for small changes. Developers spend more time filling out the form than making the
  change. Some fields require information the developer does not have, so they make something up.

The telltale sign: a developer finishes a change and says "now I need to submit it to the CAB"
with the same tone they would use for "now I need to go to the dentist."

## Why This Is a Problem

CAB gates exist to reduce risk. In practice, they increase risk by creating delay, encouraging
batching, and providing a false sense of security. The review is too shallow to catch real
problems and too slow to enable fast delivery.

### It reduces quality

A CAB review is a review by people who did not write the code, did not test it, and often do not
understand the system it affects. A board member scanning a change request form for five minutes
cannot assess the quality of a code change. They can check that the form is filled out. They
cannot check that the change is safe.

The real quality checks - automated tests, code review by peers, deployment verification - happen
before the CAB sees the change. The CAB adds nothing to quality because it reviews paperwork, not
code. The developer who wrote the tests and the reviewer who read the diff know far more about
the change's risk than a board member reading a summary.

Meanwhile, the delay the CAB introduces actively harms quality. A bug fix that is ready on Monday
but cannot deploy until Thursday means users experience the bug for three extra days. A security
patch that waits for weekly approval is a vulnerability window measured in days.

Teams without CAB gates deploy quality checks into the pipeline itself: automated tests, security
scans, peer review, and deployment verification. These checks are faster, more thorough, and
more reliable than a weekly committee meeting.

### It increases rework

The CAB process generates significant administrative overhead. For every change, a developer must
write a change request, gather approval signatures, and attend (or wait for) the board meeting.
This overhead is the same whether the change is a one-line typo fix or a major feature.

When the CAB requests more information or rejects a change, the cycle restarts. The developer
updates the form, resubmits, and waits for the next meeting. A change that was ready to deploy
a week ago sits in a review loop while the developer has moved on to other work. Picking it back
up costs context-switching time.

The batching effect creates its own rework. When changes are delayed by the CAB process, they
accumulate. Developers merge multiple changes to avoid submitting multiple requests. Larger
batches are harder to review, harder to test, and more likely to cause problems. When a problem
occurs, it is harder to identify which change in the batch caused it.

### It makes delivery timelines unpredictable

The CAB introduces a fixed delay into every deployment. If the board meets weekly, the minimum
time from "change ready" to "change deployed" is up to a week, depending on when the change
was finished relative to the meeting schedule. This delay is independent of the change's size,
risk, or urgency.

The delay is also variable. A change submitted on Monday might be approved Thursday. A change
submitted on Friday waits until the following Thursday. If the board requests revisions, add
another week. Developers cannot predict when their change will reach production because the
timeline depends on a meeting schedule and a queue they do not control.

This unpredictability makes it impossible to make reliable commitments. When a stakeholder asks
"when will this be live?" the developer must account for development time plus an unpredictable
CAB delay. The answer becomes "sometime in the next one to three weeks" for a change that took
two hours to build.

### It creates a false sense of security

The most dangerous effect of the CAB is the belief that it prevents incidents. It does not. The
board reviews paperwork, not running systems. A well-written change request for a dangerous
change will be approved. A poorly written request for a safe change will be questioned. The
correlation between CAB approval and deployment safety is weak at best.

Studies of high-performing delivery organizations consistently show that external change approval
processes do not reduce failure rates. The 2019 Accelerate State of DevOps Report found that
teams with external change approval had higher failure rates than teams using peer review and
automated checks. The CAB provides a feeling of control without the substance.

This false sense of security is harmful because it displaces investment in controls that
actually work. If the organization believes the CAB prevents incidents, there is less pressure
to invest in automated testing, deployment verification, and progressive rollout - the controls
that actually reduce deployment risk.

### Impact on continuous delivery

Continuous delivery requires that any change can reach production quickly through an automated
pipeline. A weekly approval meeting is fundamentally incompatible with continuous deployment.

The math is simple. If the CAB meets weekly and reviews 20 changes per meeting, the maximum
deployment frequency is 20 per week. A team practicing CD might deploy 20 times per day. The
CAB process reduces deployment frequency by two orders of magnitude.

More importantly, the CAB process assumes that human review of change requests is a meaningful
quality gate. CD assumes that automated checks - tests, security scans, deployment verification -
are better quality gates because they are faster, more consistent, and more thorough. These are
incompatible philosophies. A team practicing CD replaces the CAB with pipeline-embedded controls
that provide equivalent (or superior) risk management without the delay.

## How to Fix It

Eliminating the CAB outright is rarely possible because it exists to satisfy regulatory or
organizational governance requirements. The path forward is to replace the manual ceremony with
automated controls that satisfy the same requirements faster and more reliably.

### Step 1: Classify changes by risk (Week 1)

Not all changes carry the same risk. Introduce a risk classification:

| Risk level | Criteria | Example | Approval process |
|-----------|---------|---------|-----------------|
| Standard | Small, well-tested, automated rollback | Config change, minor bug fix, dependency update | Peer review + passing pipeline = auto-approved |
| Normal | Medium scope, well-tested | New feature behind a feature flag, API endpoint addition | Peer review + passing pipeline + team lead sign-off |
| High | Large scope, architectural, or compliance-sensitive | Database migration, authentication change, PCI-scoped change | Peer review + passing pipeline + architecture review |

The goal is to route 80-90% of changes through the standard process, which requires no CAB
involvement at all.

### Step 2: Define pipeline controls that replace CAB review (Weeks 2-3)

For each concern the CAB currently addresses, implement an automated alternative:

| CAB concern | Automated replacement |
|-------------|---------------------|
| "Will this change break something?" | Automated test suite with high coverage, pipeline-gated |
| "Is there a rollback plan?" | Automated rollback built into the deployment pipeline |
| "Has this been tested?" | Test results attached to every change as pipeline evidence |
| "Is this change authorized?" | Peer code review with approval recorded in version control |
| "Do we have an audit trail?" | Pipeline logs capture who changed what, when, with what test results |

Document these controls. They become the evidence that satisfies auditors in place of the CAB
meeting minutes.

### Step 3: Pilot auto-approval for standard changes (Week 3)

Pick one team or one service as a pilot. Standard-risk changes from that team bypass the CAB
entirely if they meet the automated criteria:

1. Code review approved by at least one peer.
2. All pipeline stages passed (build, test, security scan).
3. Change classified as standard risk.
4. Deployment includes automated health checks and rollback capability.

Track the results: deployment frequency, change fail rate, and incident count. Compare with the
CAB-gated process.

### Step 4: Present the data and expand (Weeks 4-8)

After a month of pilot data, present the results to the CAB and organizational leadership:

- How many changes were auto-approved?
- What was the change fail rate for auto-approved changes vs. CAB-reviewed changes?
- How much faster did auto-approved changes reach production?
- How many incidents were caused by auto-approved changes?

If the data shows that auto-approved changes are as safe or safer than CAB-reviewed changes
(which is the typical outcome), expand the auto-approval process to more teams and more change
types.

### Step 5: Reduce the CAB to high-risk changes only (Week 8+)

With most changes flowing through automated approval, the CAB's scope shrinks to genuinely
high-risk changes: major architectural shifts, compliance-sensitive changes, and cross-team
infrastructure modifications. These changes are infrequent enough that a review process is not
a bottleneck.

The CAB meeting frequency drops from weekly to as-needed. The board members spend their time on
changes that actually benefit from human review rather than rubber-stamping routine deployments.

| Objection | Response |
|-----------|----------|
| "The CAB is required by our compliance framework" | Most compliance frameworks (SOX, PCI, HIPAA) require separation of duties and change control, not a specific meeting. Automated pipeline controls with audit trails satisfy the same requirements. Engage your auditors early to confirm. |
| "Without the CAB, anyone could deploy anything" | The pipeline controls are stricter than the CAB. The CAB reviews a form for five minutes. The pipeline runs thousands of tests, security scans, and verification checks. Auto-approval is not no-approval - it is better approval. |
| "We've always done it this way" | The CAB was designed for a world of monthly releases. In that world, reviewing 10 changes per month made sense. In a CD world with 10 changes per day, the same process becomes a bottleneck that adds risk instead of reducing it. |
| "What if an auto-approved change causes an incident?" | What if a CAB-approved change causes an incident? (They do.) The question is not whether incidents happen but how quickly you detect and recover. Automated deployment verification and rollback detect and recover faster than any manual process. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Lead time](../../../reference/metrics/lead-time/) | Should decrease as CAB delay is removed for standard changes |
| [Release frequency](../../../reference/metrics/release-frequency/) | Should increase as deployment is no longer gated on weekly meetings |
| [Change fail rate](../../../reference/metrics/change-fail-rate/) | Should remain stable or decrease - proving auto-approval is safe |
| Percentage of changes auto-approved | Should climb toward 80-90% |
| CAB meeting frequency | Should decrease from weekly to as-needed |
| Time from "ready to deploy" to "deployed" | Should drop from days to hours or minutes |

## Related Content

- [Single Path to Production](../../../pipeline/single-path-to-production/) - The pipeline replaces manual gates
- [Deterministic Pipeline](../../../pipeline/deterministic-pipeline/) - Automated controls that provide consistent quality checks
- [Rollback](../../../pipeline/rollback/) - Automated rollback replaces manual rollback plans in change requests
- [Metrics-Driven Improvement](../../../optimize/metrics-driven-improvement/) - Using data to prove that automated controls work
- [Deploy on Demand](../../../deliver-on-demand/deploy-on-demand/) - The end state where any change can deploy when ready
