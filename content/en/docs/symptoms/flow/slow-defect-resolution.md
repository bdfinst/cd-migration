---
title: "Bugs in Familiar Areas Take Disproportionately Long to Fix"
linkTitle: "Slow defect resolution"
description: >
  Defects that should be straightforward take days to resolve because the people debugging them are learning the domain as they go. Fixes sometimes introduce new bugs in the same area.
tags:
  - team-dynamics
---

## What you are seeing

A bug is filed against the billing module. It looks simple from the outside - a calculation is
off by a percentage in certain conditions. The developer assigned to it spends a day reading code
before they can even reproduce the problem reliably. The fix takes another day. Two weeks later,
a related bug appears: the fix was correct for the case it addressed but violated an assumption
elsewhere in the module that nobody told the developer about.

Defect resolution time in specific areas of the system is consistently longer than in others.
Post-mortems note that the fix was made by someone unfamiliar with the domain. Bugs cluster in
the same modules, with fixes that address the symptom rather than the underlying rule that was
violated.

## Common causes

### Knowledge Silos

When only a few people understand a domain deeply, defects in that domain can only be resolved
quickly by those people. When they are unavailable - on leave, on another team, or gone - the
bug sits or gets assigned to someone who must reconstruct context before they can make progress.
The reconstruction is slow, incomplete, and prone to introducing new violations of rules the
developer discovers only after the fact.

**Read more:** [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Thin-Spread Teams

When engineers are rotated through a domain based on capacity, the person available to fix a bug
is often not the person who knows the domain. They are familiar with the tech stack but not with
the business rules, edge cases, and historical decisions that make the module behave the way it
does. Debugging becomes an exercise in reverse-engineering domain knowledge from code that may
not accurately reflect the original intent.

**Read more:** [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

## How to narrow it down

1. **Are defect resolution times consistently longer in specific modules than in others?** If
   certain areas of the system take significantly longer to debug regardless of defect severity,
   those areas have a knowledge concentration problem. Start with
   [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Do fixes in certain areas frequently introduce new bugs in the same area?** If corrections
   create new violations, the developer fixing the bug lacks the domain knowledge to understand
   the full set of constraints they are working within. Start with
   [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).

---

## Related Content

- [Domain Model Erosion](../domain-model-erosion/) - An eroded domain model makes every bug harder to reason about
- [Repeated Domain Mistakes](../repeated-domain-mistakes/) - Fixes that do not stick because root causes are not understood
- [Blocked Work Sits Idle](../blocked-work-sits-idle/) - Related pattern where work stalls waiting for the one person who knows
- [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/) - Domain knowledge concentrated in too few people
- [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/) - Rotation model that puts unfamiliar developers on domain-specific bugs
