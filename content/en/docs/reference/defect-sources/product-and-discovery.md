---
title: "Product & Discovery Defects"
linkTitle: "Product & Discovery"
weight: 1
description: >
  Defects that originate before a single line of code is written - the most expensive category because they compound through every downstream phase.
---

These defects originate before a single line of code is written. They are the most expensive to
fix because they compound through every downstream phase.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Building the wrong thing | Discovery | Product analytics platforms, usage trend alerts | <span class="ai-high">&#9650;</span> Synthesize user feedback, support tickets, and usage data to surface misalignment earlier than production metrics | Validated user research before backlog entry; dual-track agile |
| Solving a problem nobody has | Discovery | Support ticket clustering tools, feature adoption tracking | <span class="ai-high">&#9650;</span> Semantic analysis of interview transcripts, forums, and support tickets to identify real vs. assumed pain | Problem validation as a stage gate; publish problem brief before solution |
| Correct problem, wrong solution | Discovery | A/B testing frameworks, [feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}) cohort comparison | Evaluate prototypes against problem definitions; generate alternative approaches | Prototype multiple approaches; measurable success criteria first |
| Meets spec but misses user intent | Requirements | Session replay tools, rage-click and error-loop detection | <span class="ai-high">&#9650;</span> Review acceptance criteria against user behavior data to flag misalignment | Acceptance criteria focused on user outcomes, not checklists |
| Over-engineering beyond need | Design | Static analysis for dead code and unused abstractions | <span class="ai-high">&#9650;</span> Flag unnecessary abstraction layers and premature optimization in code review | YAGNI principle; justify every abstraction layer |
| Prioritizing wrong work | Discovery | [DORA metrics]({{< relref "/docs/reference/glossary#dora-metrics" >}}) versus business outcomes, WSJF scoring | Synthesize roadmap, customer data, and market signals to surface opportunity costs | WSJF prioritization with outcome data |
| Inaccessible UI excludes users | Pre-commit | axe-core, pa11y, Lighthouse accessibility audits | <span class="ai-blocked">Current tooling sufficient</span> | WCAG compliance as acceptance criteria; automated accessibility checks in [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) |

## Related Content

- [Defect Sources]({{< relref "/docs" >}}) - full catalog overview and how to use it
- [Testing]({{< relref "/docs/testing" >}}) - testing types and best practices
- [Anti-Patterns]({{< relref "/docs/anti-patterns" >}}) - patterns that undermine delivery performance
