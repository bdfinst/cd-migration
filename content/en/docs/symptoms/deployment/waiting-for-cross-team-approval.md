---
title: "Work Requires Sign-Off from Teams Not Involved in Delivery"
linkTitle: "Cross-team approval gates"
description: >
  Changes cannot ship without approval from architecture review boards, legal, compliance, or other teams that are not part of the delivery process and have their own schedules.
tags:
  - process-gates
  - team-dynamics
---

## What you are seeing

A change is ready to ship. Before it can go to production, it requires sign-off from an
architecture review board, a legal review for data handling, a compliance team for regulatory
requirements, or some combination of these. Each reviewing team has its own meeting cadence.
The architecture board meets every two weeks. Legal responds when they have capacity. Compliance
has a queue.

The team submits the request and waits. In the meantime, the code sits in a branch or is
merged behind a [feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}), accumulating risk as the codebase moves around it. When approval
finally arrives, the original context has faded. If the reviewer requests changes, the wait
restarts. The team learns to front-load reviews by submitting for approval before development
is complete, but the timing never aligns perfectly and changes after approval trigger new review
cycles.

## Common causes

### Compliance Interpreted as Manual Approval

Compliance requirements - security controls, audit trails, regulatory evidence - are real and
necessary. The problem is when compliance is operationalized as manual sign-off rather than as
automated verification. A control that requires a human to review and approve every change is a
bottleneck by design. The same control expressed as an automated check in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) is fast,
consistent, and more reliable. Manual approval processes grow over time as new requirements are
added and old ones are never removed.

**Read more:** [Compliance Interpreted as Manual Approval]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/compliance-manual-approval" >}})

### Separation of Duties as Separate Teams

Separation of duties is a legitimate control for high-risk changes. It becomes an anti-pattern
when it is implemented as a structural requirement that every change go through a different team
for approval, regardless of risk level. Low-risk routine changes get the same review overhead as
high-risk changes. The review team becomes a bottleneck because they are reviewing everything
rather than focusing on changes that actually warrant scrutiny.

**Read more:** [Separation of Duties as Separate Teams]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/separation-of-duties-antipattern" >}})

## How to narrow it down

1. **Are approval gates mandatory regardless of change risk?** If a trivial config change and
   a major architectural change go through the same review process, the gate is not calibrated
   to risk. Start with
   [Separation of Duties as Separate Teams]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/separation-of-duties-antipattern" >}}).
2. **Could the compliance requirement be expressed as an automated check?** If the review
   consists of a human verifying something that a tool could verify faster and more consistently,
   the control should be automated. Start with
   [Compliance Interpreted as Manual Approval]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/compliance-manual-approval" >}}).

**Ready to fix this?** The most common cause is [Compliance Interpreted as Manual Approval]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/compliance-manual-approval" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/compliance-manual-approval#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Change Management Overhead]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}) - CAB and change advisory processes with similar dynamics
- [Security Review Bottleneck]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}) - Security-specific approval gate
- [Waiting on QA Team Sign-Off]({{< relref "/docs/symptoms/deployment/waiting-on-qa-team" >}}) - Quality-specific gate with the same structural cause
- [Compliance Interpreted as Manual Approval]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/compliance-manual-approval" >}}) - Manual compliance operationalization that creates queues
- [Separation of Duties as Separate Teams]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/separation-of-duties-antipattern" >}}) - Structural separation that applies uniformly regardless of risk
