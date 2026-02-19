---
title: "Outsourced Development with Handoffs"
linkTitle: "Outsourced Development with Handoffs"
weight: 69
category: "Organizational & Cultural"
risk_level: medium
description: >
  Code is written by one team, tested by another, and deployed by a third, adding days of latency
  and losing context at every handoff.
tags:
  - team-dynamics
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

A feature is developed by an offshore team that works in a different time zone. When the code is
complete, a build is packaged and handed to a separate QA team, who test against a documented
requirements list. The QA team finds defects and files tickets. The offshore team receives the
tickets the next morning, fixes the defects, and sends another build. After QA signs off, a
deployment request is submitted to the operations team. Operations schedules the deployment
for the next maintenance window.

From "code complete" to "feature in production" is three weeks. In those three weeks, the
developer who wrote the code has moved on to the next feature. The QA engineer testing the code
never met the developer and does not know why certain design decisions were made. The operations
engineer deploying the code has never seen the application before.

Each handoff has a communication cost, a delay cost, and a context cost. The communication
cost is the effort of documenting what is being passed and why. The delay cost is the latency
between the handoff and the next person picking up the work. The context cost is what is lost
in the transfer - the knowledge that lives in the developer's head and does not make it into
any artifact.

Common variations:

- **The time zone gap.** Development and testing are in different time zones. A question from
  QA arrives at 3pm local time. The developer sees it at 9am the next day. The answer enables
  a fix that goes to QA the following day. A two-minute conversation took 48 hours.
- **The contract boundary.** The outsourced team is contractually defined. They deliver
  to a specification. They are not empowered to question the specification or surface
  ambiguity. Problems discovered during development are documented and passed back through
  a formal change request process.
- **The test team queue.** The QA team operates a queue. Work enters the queue when development
  finishes. The queue has a service level of five business days. All work waits in the queue
  regardless of urgency.
- **The operations firewall.** The development and test organizations are not permitted to
  deploy to production. Only a separate operations team has production access. All deployments
  require a deployment request document, a change ticket, and a scheduled maintenance window.
- **The specification waterfall.** Requirements are written by a business analyst team, handed
  to development, then to QA, then to operations. By the time operations deploys, the
  requirements document is four months old and several things have changed, but the document
  has not been updated.

The telltale sign: when a production defect is discovered, tracking down the person who wrote
the code requires a trail of tickets across three organizations, and that person no longer
remembers the relevant context.

## Why This Is a Problem

A bug found in production gets routed to a ticket queue. By the time it reaches the developer
who wrote the code, the context is gone and the fix takes three times as long as it would have
taken when the code was fresh. That delay is baked into every defect, every clarification, every
deployment in a multi-team handoff model.

### It reduces quality

A defect found in the hour after the code was written is fixed in minutes with full context. The
same defect found by a separate QA team a week later requires reconstructing context, writing a
reproduction case, and waiting for the developer to return to code they no longer remember clearly.
The quality of the fix suffers because the context has degraded - and the cost is paid on every
defect, across every handoff.

When testing is done by a separate team, the developer's understanding of the code is lost. QA
engineers test against written requirements, which describe what was intended but not why specific
implementation decisions were made. Edge cases that the developer would recognize are tested by
people who do not have the developer's mental model of the system.

Teams where developers test their own work - and where testing is automated and runs
continuously - catch a higher proportion of defects earlier. The person closest to the code is
also the person best positioned to test it thoroughly.

### It increases rework

QA files a defect. The developer reviews it and responds that the code matches the specification.
QA disagrees. Both are right. The specification was ambiguous. Resolving the disagreement requires
going back to the original requirements, which may themselves be ambiguous. The round trip from
QA report to developer response to QA acceptance takes days - and the feature was not actually
broken, just misunderstood.

These misunderstanding defects multiply wherever the specification is the only link between two
teams that never spoke directly. The QA team tests against what was intended; the developer
implemented what they understood. The gap between those two things is rework.

The operations handoff creates its own rework. Deployment instructions written by someone who
did not build the system are often incomplete. The operations engineer encounters something not
covered in the deployment guide, must contact the developer for clarification, and the
deployment is delayed. In the worst case, the deployment fails and must be rolled back, requiring
another round of documentation and scheduling.

### It makes delivery timelines unpredictable

A feature takes one week to develop and two days to test. It spends three weeks in queues. The
developer can estimate the development time. They cannot estimate how long the QA queue will be
three weeks from now, or when the next operations maintenance window will be scheduled. The
delivery date is hostage to a series of handoff delays that compound in unpredictable ways.

Queue times are the majority of elapsed time in most outsourced handoff models - often 60-80% of
total time - and they are largely outside the development team's control. Forecasting is guessing
at queue depths, not estimating actual work.

### Impact on continuous delivery

CD requires a team that owns the full delivery path: from code to production. Multi-team handoff
models fragment this ownership deliberately. The developer is responsible for code correctness.
QA is responsible for verified functionality. Operations is responsible for production stability.
No one is responsible for the whole.

CD practices - automated testing, deployment pipelines, continuous integration - require investment
and iteration. With fragmented ownership, nobody has both the knowledge and the authority to
invest in the pipeline. The development team knows what tests would be valuable but does not
control the test environment. The operations team controls the deployment process but does not
know the application well enough to automate its deployment safely. The gap between the two is
where CD improvement efforts go to die.

## How to Fix It

### Step 1: Map the current handoffs and their costs (Week 1)

Draw the current flow from development complete to production deployed. For each handoff, record
the average wait time (time in queue) and the average active processing time. Calculate what
percentage of total elapsed time is queue time versus actual work time. In most outsourced
multi-team models, queue time is 60-80% of total time. Making this visible creates the business
case for reducing handoffs.

### Step 2: Embed testing earlier in the development process (Weeks 2-4)

The highest-value handoff to eliminate is the gap between development and testing. Two paths forward:

Option A: Shift testing left. Work with the QA team to have a QA engineer participate in
development rather than receive a finished build. The QA engineer writes acceptance test cases
before development starts; the developer implements against those cases. When development is
complete, testing is complete, because the tests ran continuously during development.

Option B: Automate the regression layer. Work with the development team to build an automated
regression suite that runs in the pipeline. The QA team's role shifts from executing repetitive
tests to designing test strategies and exploratory testing.

Both options reduce the handoff delay without eliminating the QA function.

### Step 3: Create a deployment pipeline that the development team owns (Weeks 3-6)

Negotiate with the operations team for the development team to own deployments to non-production
environments. Production deployment can remain with operations initially, but the deployment
process should be automated so that operations is executing a pipeline, not manually following
a deployment runbook. This removes the manual operations bottleneck while preserving the
access control that operations legitimately owns.

### Step 4: Introduce a shared responsibility model for production (Weeks 6-12)

The goal is a model where the team that builds the service has a defined role in running it.
This does not require eliminating the operations team - it requires redefining the boundary.
A starting position: the development team is on call for application-level incidents. The
operations team is on call for infrastructure-level incidents. Both teams are in the same
incident channel. The development team gets paged when their service has a production problem.
This feedback loop is the foundation of operational quality.

### Step 5: Renegotiate contract or team structures based on evidence (Months 3-6)

After generating evidence that reduced-handoff delivery produces better quality and shorter
lead times, use that evidence to renegotiate. If the current model involves a contracted
outsourced team, propose expanding their scope to include testing, or propose bringing
automated pipeline work in-house while keeping feature development outsourced. The goal is
to align contract boundaries with value delivery rather than functional specialization.

| Objection | Response |
|-----------|----------|
| "QA must be independent of development for compliance reasons" | Independence of testing does not require a separate team with a queue. A QA engineer can be an independent reviewer of automated test results and a designer of test strategies without being the person who manually executes every test. Many compliance frameworks permit automated testing executed by the development team with independent sign-off on results. |
| "Our outsourcing contract specifies this delivery model" | Contracts are renegotiated based on business results. If you can demonstrate that reducing handoffs shortens delivery timelines by two weeks, the business case for renegotiating the contract scope is clear. Start with a pilot under a change order before seeking full contract revision. |
| "Operations needs to control production for stability" | Operations controlling access is different from operations controlling deployment timing. Automated deployment pipelines with proper access controls give operations visibility and auditability without requiring them to manually execute every deployment. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Lead time](../../../metrics/lead-time/) | Should decrease significantly as queue times between handoffs are reduced |
| Handoff count per feature | Should decrease toward one - development to production via an automated pipeline |
| Defect escape rate | Should decrease as testing is embedded earlier in the process |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as the team building the service also operates it |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as time spent waiting for handoffs is removed |
| [Work in progress](../../../metrics/work-in-progress/) | Should decrease as fewer items are waiting in queues between teams |

## Related Content

- [Single Path to Production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - The pipeline model that replaces multi-team handoff chains
- [Testing Fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Building the automated test layer that replaces manual QA handoffs
- [Production-Like Environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Reducing the gap between test and production that creates late defect discovery
- [No On-Call or Operational Ownership](../no-operational-ownership/) - The related pattern where the team that builds does not run
- [Value Stream Mapping](../../../migrate-to-cd/migration-path/assess/value-stream-mapping/) - Visualizing the handoff delays in the current delivery process
