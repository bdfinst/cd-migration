---
title: "Delivery Slows Every Time the Team Rotates"
linkTitle: "Rotation ramp-up drag"
description: >
  A new developer joins or is flexed in and delivery slows for weeks while they learn the domain. The pattern repeats with every rotation.
tags:
  - team-dynamics
---

## What you are seeing

A developer is moved onto the team because there is capacity there and they know the tech stack.
For the first two to three weeks, velocity drops. Simple changes take longer than expected
because the new person is learning the domain while doing the work. They ask questions that
previous team members would have answered instantly. They make safe, conservative choices to
avoid breaking something they don't fully understand.

Then the rotation ends or another team member is pulled away, and the cycle starts again. The
team never fully recovers its pre-rotation pace before the next disruption. Velocity measured
across a quarter looks flat even though the team is working as hard as ever.

## Common causes

### Thin-Spread Teams

When engineers are treated as interchangeable capacity and moved to where utilization is needed,
the team never develops stable domain expertise. Each rotation brings someone who knows the
technology but not the business rules, the data model quirks, the historical decisions, or the
failure modes that prior members learned through experience. The knowledge required to deliver
quickly in a domain cannot be acquired in days. It accumulates over months of working in it.

**Read more:** [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

### Knowledge Silos

When domain knowledge lives in individuals rather than in documentation, runbooks, and code
structure, it is not available to the next person who joins. The new team member must reconstruct
understanding that the previous person carried in their head. Every rotation restarts that
reconstruction from scratch.

**Read more:** [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Does velocity measurably drop for several weeks after a team change?** If the pattern is
   consistent and repeatable, the team's delivery speed depends on individual domain knowledge
   rather than shared, documented understanding. Start with
   [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).
2. **Is domain knowledge written down or does it live in specific people?** If new team members
   learn by asking colleagues rather than reading documentation, the knowledge is not externalized.
   Start with [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).

---

## Related Content

- [Team Membership Changes Constantly](../team-instability/) - Frequent roster changes that trigger repeated ramp-up cycles
- [Blocked Work Sits Idle](../blocked-work-sits-idle/) - Knowledge gaps that prevent anyone else from picking up stuck work
- [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/) - Rotation model that prevents domain expertise from accumulating
- [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/) - Domain knowledge concentrated in individuals rather than shared
- [Working Agreements](../../migrate-to-cd/migration-path/foundations/working-agreements/) - Documented practices that survive team changes
