---
title: "The Same Mistakes Happen in the Same Domain Repeatedly"
linkTitle: "Repeated domain mistakes"
description: >
  Post-mortems and retrospectives show the same root causes appearing in the same areas. Each new team makes decisions that previous teams already tried and abandoned.
tags:
  - team-dynamics
---

## What you are seeing

A post-mortem reveals that the payments module failed in the same way it failed eighteen months
ago. The fix applied then was not documented, and the developer who applied it is no longer on
the team. A retrospective surfaces a proposal to split the monolith into services - a direction
the team two rotations ago evaluated and rejected for reasons nobody on the current team knows.

The same conversations happen repeatedly. The same edge cases get missed. The same architectural
directions get proposed, piloted, and quietly abandoned without any record of why. Each new group
treats the domain as a fresh problem rather than building on what was learned before.

## Common causes

### Thin-Spread Teams

When engineers are rotated through a domain based on capacity rather than staying long enough to
build expertise, institutional memory does not accumulate. The decisions, experiments, and hard
lessons from previous rotations leave with those developers. The next group inherits the code but
not the understanding of why it is structured the way it is, what was tried before, or what the
failure modes are. They are likely to repeat the same exploration, reach the same dead ends, and
make the same mistakes.

**Read more:** [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

### Knowledge Silos

When knowledge about a domain lives only in specific individuals, it evaporates when they leave.
Architectural decision records, runbooks, and documented post-mortem outcomes are the
externalized forms of that knowledge. Without them, every departure is a partial reset. The
remaining team cannot distinguish between "we haven't tried that" and "we tried that and here
is what happened."

**Read more:** [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Do post-mortems show the same root causes in the same areas of the system?** If recurring
   incidents map to the same modules and the fixes do not persist, the team is not accumulating
   learning. Start with [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).
2. **Are architectural proposals evaluated without knowledge of what was tried before?** If
   the team cannot answer "was this approach considered previously, and what happened," decisions
   are being made without institutional memory. Start with
   [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).

**Ready to fix this?** The most common cause is [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/). Start with its [How to Fix It](../../anti-patterns/team-workflow/knowledge-silos/#how-to-fix-it) section for week-by-week steps.

---

## Related Content

- [Team Membership Changes Constantly](../team-instability/) - Roster changes that reset accumulated knowledge
- [Rotation Ramp-Up Drag](../rotation-ramp-up-drag/) - Delivery slowdown that accompanies each knowledge reset
- [Domain Model Erosion](../domain-model-erosion/) - Structural degradation caused by repeated uninformed decisions
- [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/) - Rotation model that prevents institutional memory from forming
- [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/) - Knowledge not externalized into artifacts the next team can use
