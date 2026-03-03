---
title: "Features Must Wait for a Separate QA Team Before Shipping"
linkTitle: "Waiting on QA team sign-off"
description: >
  Work is complete from the development team's perspective but cannot ship until a separate QA team tests and approves it. QA has its own queue and schedule.
tags:
  - team-dynamics
  - process-gates
---

## What you are seeing

Development marks a story done. It moves to a "ready for QA" column and waits. The QA team
has its own sprint, its own backlog, and its own capacity constraints. The feature sits for
three days before a QA engineer picks it up. Testing takes another two days. Feedback arrives
a week after development completed. The developer has moved on to other work and has to reload
context to address the comments.

Near release time, QA becomes a bottleneck. Many features arrive at once, QA capacity cannot
absorb them all, and some features are held over to the next release. Defects found late in QA
are more expensive to fix because other work has been built on top of the untested code. The
team's release dates become determined by QA queue depth, not by development completion.

## Common causes

### Siloed QA Team

When quality assurance is a separate team rather than a shared practice embedded in development,
testing becomes a handoff rather than a continuous activity. Developers write code and hand it
to QA. QA tests it and hands defects back. The two teams operate on different cadences. Because
quality is seen as QA's responsibility, developers write less thorough tests of their own -
why duplicate the effort? The siloed structure makes late testing the structural default rather
than an avoidable outcome.

**Read more:** [Siloed QA Team]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/siloed-qa-team" >}})

### QA Signoff as a Release Gate

When QA sign-off is a formal gate that must be passed before any release, the gate creates a
queue. Features arrive at the gate in batches. QA must process all of them before anything
ships. If QA finds a defect, the release waits while it is fixed and retested. The gate structure
means quality problems are found late, in large batches, making them expensive to fix and
disruptive to release schedules.

**Read more:** [QA Signoff as a Release Gate]({{< relref "/docs/anti-patterns/testing/qa-signoff-gate" >}})

## How to narrow it down

1. **Is there a "waiting for QA" column on the board, and do items spend days there?** If
   work regularly accumulates waiting for QA to pick it up, the team has a handoff bottleneck
   rather than a continuous quality practice. Start with
   [Siloed QA Team]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/siloed-qa-team" >}}).
2. **Can the team deploy without QA sign-off?** If QA approval is a required step before
   any production release, the gate creates batch testing and late defect discovery. Start with
   [QA Signoff as a Release Gate]({{< relref "/docs/anti-patterns/testing/qa-signoff-gate" >}}).

**Ready to fix this?** The most common cause is [Siloed QA Team]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/siloed-qa-team" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/siloed-qa-team#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related Content

- [Security Review Bottleneck]({{< relref "/docs/symptoms/deployment/security-review-bottleneck" >}}) - Same structural pattern with a security team gate
- [Change Management Overhead]({{< relref "/docs/symptoms/deployment/change-management-overhead" >}}) - Additional approval gates that accumulate before release
- [Waiting on Platform Team]({{< relref "/docs/symptoms/flow/work-management/waiting-on-platform-team" >}}) - Related cross-team dependency pattern
- [Siloed QA Team]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/siloed-qa-team" >}}) - QA as a separate function rather than shared practice
- [QA Signoff as a Release Gate]({{< relref "/docs/anti-patterns/testing/qa-signoff-gate" >}}) - Formal gate that creates batch testing and late feedback
