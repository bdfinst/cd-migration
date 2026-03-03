---
title: "Knowledge & Communication Defects"
linkTitle: "Knowledge & Communication"
weight: 3
description: >
  Defects that emerge from gaps between what people know and what the code expresses - the hardest to detect with automated tools and the easiest to prevent with team practices.
---

These defects emerge from gaps between what people know and what the code expresses.
They are the hardest to detect with automated tools and the easiest to prevent with team practices.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Implicit domain knowledge not in code | Coding | Magic number detection, code ownership analytics | <span class="ai-high">&#9650;</span> Identify undocumented business rules and knowledge gaps from code and test analysis | Domain-Driven Design with ubiquitous language; embed rules in code |
| Ambiguous requirements | Requirements | Flag stories without acceptance criteria, [BDD]({{< relref "/docs/reference/glossary#bdd-behavior-driven-development" >}}) spec coverage tracking | <span class="ai-high">&#9650;</span> Review requirements for ambiguity, missing edge cases, and contradictions; generate test scenarios | Three Amigos before work; example mapping; executable specs |
| Tribal knowledge loss | Coding | Bus factor analysis from commit history, single-author concentration alerts | <span class="ai-high">&#9650;</span> Generate documentation from code and tests; flag documentation drift from implementation | Pair/mob programming as default; rotate on-call; living docs |
| Divergent mental models across teams | Design | Divergent naming detection, contract test failures | <span class="ai-high">&#9650;</span> Compare terminology and domain models across codebases to detect semantic mismatches | Shared domain models; explicit bounded contexts |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - patterns that undermine delivery performance
