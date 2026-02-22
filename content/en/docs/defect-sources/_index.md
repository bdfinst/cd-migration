---
title: "Systemic Defect Fixes"
linkTitle: "Systemic Defect Fixes"
weight: 8
description: >
  A catalog of defect sources across the delivery value stream with earliest detection points, AI shift-left opportunities, and systemic prevention strategies.
aliases:
  - /docs/defect-sources/
---

{{% pageinfo %}}
Defects do not appear randomly. They originate from specific, predictable sources in the delivery
value stream. This reference catalogs those sources so teams can shift detection left, automate
where possible, and apply AI where it adds real value to the feedback loop.

The goal is systems thinking: detect issues as early as possible in the value stream so feedback informs continuous improvement in how we work, not just reactive fixes to individual defects.

- <span class="ai-high">&#9650;</span> AI shifts detection earlier than current automation alone
- Dark cells = current automation is sufficient; AI adds no additional value
- No marker = AI assists at the current detection point but does not shift it earlier
{{% /pageinfo %}}

## How to Use This Catalog

1. **Pick your pain point.** Find the category where your team loses the most time to defects or rework. Start there, not at the top.
2. **Focus on the Systemic Prevention column.** Automated detection catches defects faster, but systemic prevention eliminates entire categories. Prioritize the prevention fix for each issue you selected.
3. **Measure before and after.** Track defect escape rate by category and time-to-detection. If the systemic fix is working, both metrics improve within weeks.

<div class="detection-sequence" role="img" aria-label="Detection stages from earliest to latest: Discovery, Requirements, Design, Coding, Pre-commit, CI, Acceptance Tests, Production">
  <div class="detection-sequence__track">
    <span class="detection-stage" data-cost="1">Discovery</span>
    <span class="detection-stage" data-cost="2">Requirements</span>
    <span class="detection-stage" data-cost="3">Design</span>
    <span class="detection-stage" data-cost="4">Coding</span>
    <span class="detection-stage" data-cost="5">Pre-commit</span>
    <span class="detection-stage" data-cost="6">CI</span>
    <span class="detection-stage" data-cost="7">Acceptance Tests</span>
    <span class="detection-stage" data-cost="8">Production</span>
  </div>
  <div class="detection-sequence__caption">Shift left: earlier detection is cheaper to fix</div>
</div>

## Categories

| Category | What it covers |
|----------|---------------|
| [Product & Discovery](product-and-discovery/) | Wrong features, misaligned requirements, accessibility gaps - defects born before coding begins |
| [Integration & Boundaries](integration-and-boundaries/) | Interface mismatches, behavioral assumptions, race conditions at service boundaries |
| [Knowledge & Communication](knowledge-and-communication/) | Implicit domain knowledge, ambiguous requirements, tribal knowledge loss, divergent mental models |
| [Change & Complexity](change-and-complexity/) | Unintended side effects, technical debt, feature interactions, configuration drift |
| [Testing & Observability Gaps](testing-and-observability-gaps/) | Untested edge cases, missing contract tests, insufficient monitoring, environment parity |
| [Process & Deployment](process-and-deployment/) | Long-lived branches, manual steps, large batches, inadequate [rollback](../glossary/#rollback), work stacking |
| [Data & State](data-and-state/) | Schema migration failures, null assumptions, concurrency issues, cache invalidation |
| [Dependency & Infrastructure](dependency-and-infrastructure/) | Third-party breaking changes, environment differences, network partition handling |
| [Security & Compliance](security-and-compliance/) | Vulnerabilities, secrets in source, auth gaps, injection, regulatory requirements, audit trails |
| [Performance & Resilience](performance-and-resilience/) | Regressions, resource leaks, capacity limits, missing timeouts, graceful degradation |

{{% alert title="Where AI helps - and where it does not" %}}
AI adds the most value where detection requires reasoning across multiple signals that existing
tools cannot correlate: ambiguous requirements, undocumented assumptions, semantic code impact,
and knowledge gaps. Where deterministic tools already solve the problem (infrastructure drift,
null safety, branch age), AI adds cost without benefit. Look for the <span class="ai-high">&#9650;</span> markers to find the highest-value AI opportunities.
{{% /alert %}}

## Related Content

- [ACD](../agentic-cd/) - Extend continuous delivery with constraints for AI agent-generated changes
- [AI Adoption Roadmap](../agentic-cd/adoption-roadmap/) - Safely incorporate AI into your delivery process
- [Assess Phase](../migrate-to-cd/migration-path/assess/) - Current-state assessment where defect source analysis begins
- [Testing](../testing/) - Testing types, patterns, and best practices
- [Anti-Patterns](../anti-patterns/) - Patterns that undermine delivery performance
- [Testing Symptoms](../symptoms/testing/) - Symptoms caused by testing gaps
- [Deployment Symptoms](../symptoms/deployment/) - Symptoms caused by deployment process problems
- [Visibility Symptoms](../symptoms/visibility/) - Symptoms caused by missing observability

---
