---
title: "No On-Call or Operational Ownership"
linkTitle: "No On-Call or Operational Ownership"
weight: 102
category: "Organizational & Cultural"
risk_level: medium
description: >
  The team builds services but doesn't run them, eliminating the feedback loop from production
  problems back to the developers who can fix them.
tags:
  - team-dynamics
  - observability
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

The development team builds a service and hands it to operations when it is "ready for production."
From that point, operations owns it. When the service has an incident, the operations team is
paged. They investigate, apply workarounds, and open tickets for anything requiring code changes.
Those tickets go into the development team's backlog. The development team triages them during
sprint planning, assigns them a priority, and schedules them for a future sprint.

The developer who wrote the code that caused the incident is not involved in the middle-of-the-night
recovery. They find out about the incident when the ticket arrives in their queue, often days
later. By then, the immediate context is gone. The incident report describes the symptom but
not the root cause. The developer fixes what the ticket describes, which may or may not be the
actual underlying problem.

The operations team, meanwhile, is maintaining a growing portfolio of services, none of which they
built. They understand the infrastructure but not the application logic. When the service behaves
unexpectedly, they have limited ability to distinguish a configuration problem from a code defect.
They escalate to development, who has no operational context. Neither team has the full picture.

Common variations:

- **The "thrown over the wall" deployment.** The development team writes deployment
  documentation and hands it to operations. The documentation was accurate at the time of
  writing; the service has since changed in ways that were not reflected in the documentation.
  Operations deploys based on stale instructions.
- **The black-box service.** The service has no meaningful logging, no metrics exposed, and
  no health endpoints. Operations cannot distinguish "running correctly" from "running
  incorrectly" without generating test traffic. When an incident occurs, the only signal is
  a user complaint.
- **The ticket queue gap.** A production incident opens a ticket. The ticket enters the
  development team's backlog. The backlog is triaged weekly. The incident recurs three more
  times before the fix is prioritized, because the ticket does not communicate severity in
  a way that interrupts the sprint.
- **The "not our problem" boundary.** A performance regression is attributed to the
  infrastructure by development and to the application by operations. Each team's position is
  technically defensible. Nobody is accountable for the user-visible outcome, which is that
  the service is slow and nobody is fixing it.

The telltale sign: when asked "who is responsible if this service has an outage at 2am?" there
is either silence or an answer that refers to a team that did not build the service and does not
understand its code.

## Why This Is a Problem

Operational ownership is a feedback loop. When the team that builds a service is also responsible
for running it, every production problem becomes information that improves the next decision about
what to build, how to test it, and how to deploy it. When that feedback loop is severed, the
signal disappears into a ticket queue and the learning never happens.

### It reduces quality

A developer adds a third-party API call without a circuit breaker. The 3am pager alert goes to
operations, not to the developer. The developer finds out about the outage when a ticket arrives
days later, stripped of context, describing a symptom but not a cause. The circuit breaker never
gets added because the developer who could add it never felt the cost of its absence.

When developers are on call for their own services, that changes. The circuit breaker gets added
because the developer knows from experience what happens without it. The memory leak gets fixed
permanently because the developer was awakened at 2am to restart the service. Consequences that
are immediate and personal produce quality that abstract code review cannot.

### It increases rework

The service crashes. Operations restarts it. A ticket is filed: "service crashed; restarted;
running again." The development team closes it as "operations-resolved" without investigating
why. The service crashes again the following week. Operations restarts it. Another ticket is
filed. This cycle repeats until the pattern becomes obvious enough to force a root-cause
investigation - by which point users have been affected multiple times and operations has
spent hours on a problem that a proper first investigation would have closed.

The root cause is never identified without the developer who wrote the code. Without operational
feedback reaching that developer, problems are fixed by symptom and the underlying defect stays
in production.

### It makes delivery timelines unpredictable

A critical bug surfaces at midnight. Operations opens a ticket. The developer who can fix it
does not see it until the next business day - and then has to drop current work, context-switch
into code they may not have touched in weeks, and diagnose the problem from an incident report
written by someone who does not know the application. By the time the fix ships, half a sprint
is gone.

This unplanned work arrives without warning and at unpredictable intervals. Every significant
production incident is a sprint disruption. Teams without operational ownership cannot plan their
sprints reliably because they cannot predict how much of the sprint will be consumed by emergency
responses to production problems in services they no longer actively maintain.

### Impact on continuous delivery

CD requires that the team deploying code has both the authority and the accountability to ensure
it works in production. The deployment pipeline - automated testing, deployment verification,
health checks - is only as valuable as the feedback it provides. When the team that deployed the
code does not receive the feedback from production, the pipeline is not producing the learning
it was designed to produce.

CD also depends on a culture where production problems are treated as design feedback. "The service
went down because the retry logic was wrong" is design information that should change how the
next service's retry logic is written. When that information lands in an operations team rather
than in the development team that wrote the retry logic, the design doesn't change. The next
service is written with the same flaw.

## How to Fix It

### Step 1: Instrument the current services for observability (Weeks 1-3)

Before changing any ownership model, make production behavior visible to the development team.
Add structured logging with a correlation ID that traces requests through the system. Add metrics
for the key service-level indicators: request rate, error rate, latency distribution, and resource
utilization. Add health endpoints that reflect the service's actual operational state. The
development team needs to see what the service is doing in production before they can be
meaningfully accountable for it.

### Step 2: Give the development team read access to production telemetry

The development team should be able to query production logs and metrics without filing a request
or involving operations. This is the minimum viable feedback loop: the team can see what is
happening in the system they built. Even if they are not yet on call, direct access to production
observability changes the development team's relationship to production behavior.

### Step 3: Introduce a rotating "production week" responsibility (Weeks 3-6)

Before full on-call rotation, introduce a gentler entry point: one developer per week is the
designated production liaison. They monitor the service during business hours, triage incoming
incident tickets from operations, and investigate root causes. They are the first point of contact
when operations escalates. This builds the team's operational knowledge without immediately adding
after-hours pager responsibility.

### Step 4: Establish a joint incident response practice (Weeks 4-8)

For the next three significant incidents, require both the development team's production-week
rotation and the operations team's on-call engineer to work the incident together. The goal is
mutual knowledge transfer: operations learns how the application behaves, development learns what
operations sees during an incident. Write joint runbooks that capture both operational response
steps and development-level investigation steps.

### Step 5: Transfer on-call ownership incrementally (Months 2-4)

Once the development team has operational context - observability tooling, runbooks, incident
experience - formalize on-call rotation. The development team is paged for application-level
incidents (errors, performance regressions, business logic failures). The operations team is
paged for infrastructure-level incidents (hardware, network, platform). Both teams are in the
same incident channel. The boundary is explicit and agreed upon.

### Step 6: Close the feedback loop into development practice (Ongoing)

Every significant production incident should produce at least one change to the development
process: a new automated test that would have caught the defect, an improvement to the deployment
health check, a metric added to the dashboard. This is the core feedback loop that operational
ownership is designed to enable. Track the connection between incidents and development practice
improvements explicitly.

| Objection | Response |
|-----------|----------|
| "Developers should write code, not do operations" | The "you build it, you run it" model does not eliminate operations - it eliminates the information gap between building and running. Developers who understand operational consequences of their design decisions write better software. Operations teams with developer involvement write better runbooks and respond more effectively. |
| "Our operations team is in a different country; we can't share on-call" | Time zone gaps make full integration harder, but they do not prevent partial feedback loops. Business-hours production ownership for the development team, shared incident post-mortems, and direct telemetry access all transfer production learning to developers without requiring globally distributed on-call rotations. |
| "Our compliance framework requires operations to have exclusive production access" | Separation of duties for production access is compatible with shared operational accountability. Developers can review production telemetry, participate in incident investigations, and own service-level objectives without having direct production write access. The feedback loop can be established within the access control constraints. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as the team with code knowledge is involved in incident response |
| Incident recurrence rate | Should decrease as root causes are identified and fixed by the team that built the service |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as operational feedback informs development quality decisions |
| Time from incident detection to developer notification | Should decrease from days (ticket queue) to minutes (direct pager) |
| Number of services with dashboards and runbooks owned by the development team | Should increase toward 100% of services |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should become more predictable as unplanned production interruptions decrease |

## Related Content

- [Blind Operations](../../monitoring-observability/blind-operations/) - The observability gap that makes operational ownership impossible to exercise effectively
- [Outsourced Development with Handoffs](../outsourced-development-handoffs/) - The related pattern of separating builders from operators
- [Production-Like Environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Environments that surface operational problems before production does
- [Deploy on Demand](../../../migrate-to-cd/migration-path/continuous-deployment/deploy-on-demand/) - The end state where the team owns the full delivery path including production
- [Retrospectives](../../../migrate-to-cd/migration-path/optimize/retrospectives/) - The forum for converting production incidents into development process improvements
