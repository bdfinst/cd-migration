---
title: "The Codebase No Longer Reflects the Business Domain"
linkTitle: "Domain model erosion"
description: >
  Business terms are used inconsistently. Domain rules are duplicated, contradicted, or implicit. No one can explain all the invariants the system is supposed to enforce.
tags:
  - team-dynamics
---

## What you are seeing

The same business concept goes by three different names in three different modules. A rule about
how orders are validated exists in the API layer, partially in a service, and also in the
database - with slight differences between them. A developer making a change to the payments flow
discovers undocumented assumptions mid-implementation and is not sure whether they are intentional
constraints or historical accidents.

New developers cannot form a coherent mental model of the domain from the code alone. They learn
by asking colleagues, but colleagues often disagree or are uncertain. The system works, mostly,
but nobody can fully explain why it is structured the way it is or what would break if a
particular constraint were removed.

## Common causes

### Thin-Spread Teams

When engineers rotate through a domain without staying long enough to understand its business
rules deeply, each rotation leaves its own layer of interpretation on the codebase. One team
names a concept one way. The next team introduces a parallel concept with a different name
because they did not recognize the existing one. A third team adds a validation rule without
knowing an equivalent rule already existed elsewhere. Over time the code reflects the sequence
of teams that worked in it rather than the business domain it is supposed to model.

**Read more:** [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

### Knowledge Silos

When the canonical understanding of the domain lives in a few individuals, the code drifts from
that understanding whenever those individuals are not involved in a change. Developers without
deep domain knowledge make reasonable-seeming implementation choices that violate rules they were
never told about. The gap between what the domain expert knows and what the code expresses widens
with each change made without them.

**Read more:** [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Are the same business concepts named differently in different parts of the codebase?** If
   a developer must learn multiple synonyms for the same thing to navigate the code, the domain
   model has been interpreted independently by multiple teams. Start with
   [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).
2. **Can team members explain all the validation rules the system enforces, and do their
   explanations agree?** If there is disagreement or uncertainty, domain knowledge is not
   shared or externalized. Start with
   [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/).

---

## Related Content

- [Repeated Domain Mistakes](../repeated-domain-mistakes/) - Uninformed decisions that compound erosion over time
- [Team Membership Changes Constantly](../team-instability/) - Roster changes that bring independent domain interpretations
- [Slow Defect Resolution in the Domain](../slow-defect-resolution/) - Debugging becomes harder as the model becomes less legible
- [Thin-Spread Teams](../../anti-patterns/organizational-cultural/thin-spread-teams/) - Rotation model that accumulates independent interpretations
- [Knowledge Silos](../../anti-patterns/team-workflow/knowledge-silos/) - Domain understanding not embedded in shared artifacts
