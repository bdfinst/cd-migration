---
title: "Defect Sources"
draft: true
linkTitle: "Defect Sources"
weight: 4
description: >
  A catalog of defect causes across the delivery value stream with detection methods, AI enhancement opportunities, and systemic fixes.
---

{{% pageinfo %}}
Adapted from [AI Patterns: Defect Detection](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/)

Defects do not appear randomly. They originate from specific, predictable sources in the delivery
value stream. This reference catalogs those sources so teams can shift detection left, automate
where possible, and apply AI to accelerate the feedback loop.
{{% /pageinfo %}}

## Product & Discovery

These defects originate before a single line of code is written. They are the most expensive to
fix because they compound through every downstream phase.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Building the wrong thing | Adoption dashboards, user research validation | Synthesize user feedback, support tickets, and usage data to surface misalignment earlier than production metrics | Validated user research before backlog entry; dual-track agile |
| Solving a problem nobody has | Problem validation stage gate, user interviews | Analyze support tickets and feature requests to identify real vs. assumed pain points | Problem validation as a stage gate; publish problem brief before solution |
| Correct problem, wrong solution | Prototype testing, A/B experiments | Compare proposed solution against prior approaches in similar domains | Prototype multiple approaches; measurable success criteria first |
| Meets spec but misses user intent | User acceptance testing, session recordings | Review acceptance criteria against user behavior data to flag misalignment | Acceptance criteria focused on user outcomes, not checklists |
| Over-engineering beyond need | Code complexity metrics, architecture review | Flag unnecessary abstraction layers and unused extension points | YAGNI principle; justify every abstraction layer |
| Prioritizing wrong work | Outcome tracking, opportunity scoring | Automated WSJF scoring using historical outcome data | WSJF prioritization with outcome data |

## Integration & Boundaries

Defects at system boundaries are invisible to unit tests and often survive until production.
Contract testing and deliberate boundary design are the primary defenses.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Interface mismatches | Contract tests (Pact, OpenAPI, buf) | Compare API schemas across versions to detect breaking changes before merge | Mandatory contract tests per boundary; API-first with generated clients |
| Wrong assumptions about upstream/downstream | Integration tests, behavioral contract documentation | Analyze call patterns across services to detect undocumented behavioral expectations | Document behavioral contracts; defensive coding at boundaries |
| Race conditions | Thread sanitizers, concurrency testing | Static analysis for concurrent access patterns; suggest idempotent alternatives | Idempotent design; queues over shared mutable state |
| Inconsistent distributed state | Distributed tracing (Jaeger, Zipkin), chaos engineering | Anomaly detection across distributed state to flag synchronization failures | Deliberate consistency model choices; saga with compensation logic |

## Knowledge & Communication

These defects emerge from gaps between what people know and what the code expresses.
They are the hardest to detect with automated tools and the easiest to prevent with team practices.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Implicit domain knowledge not in code | Knowledge concentration metrics, code review | Generate documentation from code and tests; flag where docs have drifted from implementation | Domain-Driven Design with ubiquitous language; embed rules in code |
| Ambiguous requirements | Three Amigos sessions, example mapping | Review requirements for ambiguity, missing edge cases, and contradictions; generate test scenarios | Three Amigos before work; example mapping; executable specs |
| Tribal knowledge loss | Bus factor analysis, documentation coverage | Identify knowledge silos by analyzing commit patterns and code ownership concentration | Pair/mob programming as default; rotate on-call; living docs |
| Divergent mental models across teams | Cross-team reviews, shared domain models | Compare terminology and domain models across codebases to detect semantic mismatches | Shared domain models; explicit bounded contexts |

## Change & Complexity

These defects are caused by the act of changing existing code. The larger the change and the
longer it lives outside trunk, the higher the risk.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Unintended side effects | Mutation testing (Stryker, PIT), regression suites | Automated blast radius analysis from change diffs; flag high-risk modifications | Small focused commits; trunk-based development; feature flags |
| Accumulated technical debt | Code complexity trends (CodeScene), static analysis | Track complexity trends and predict which modules are approaching failure thresholds | Refactoring as part of every story; dedicated debt budget |
| Unanticipated feature interactions | Feature flag testing, canary deployments | Analyze feature flag combinations to predict interaction conflicts | Feature flags with controlled rollout; modular design; canary deployments |
| Configuration drift | Infrastructure as code validation, environment diffing | Detect configuration differences across environments automatically | Infrastructure as code; immutable infrastructure; GitOps |

## Testing & Observability Gaps

These defects survive because the safety net has holes. The fix is not more testing - it is
better-targeted testing and observability that closes the specific gaps.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Untested edge cases and error paths | Property-based testing (Hypothesis, fast-check), boundary analysis | Generate edge case test scenarios from code analysis; identify untested paths | Property-based testing as standard; boundary value analysis |
| Missing contract tests at boundaries | Boundary inventory audit, integration failure analysis | Scan service boundaries and flag missing contract test coverage | Mandatory contract tests per new boundary |
| Insufficient monitoring | SLO tracking, incident post-mortems | Analyze production incidents to recommend missing monitoring and alerting | Observability as non-functional requirement; SLOs for every user-facing path |
| Test environments don't reflect production | Environment parity checks, deployment failure analysis | Compare environment configurations to flag meaningful differences | Production-like data in staging; test in production with flags |

## Process & Deployment

These defects are caused by the delivery process itself. Manual steps, large batches, and
slow feedback loops create the conditions for failure.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Long-lived branches | Branch age metrics, merge conflict frequency | Flag branches exceeding age thresholds; predict merge conflict probability | Trunk-based development; merge at least daily |
| Manual pipeline steps | Value stream mapping, deployment audit | Identify manual steps in the pipeline that can be automated | Automate every step commit-to-production |
| Batching too many changes per release | Deployment frequency metrics, change failure correlation | Correlate batch size with failure rates to quantify the cost of large batches | Continuous delivery; every commit is a candidate |
| Inadequate rollback capability | Rollback testing, incident recovery time | Automated risk scoring from change diff and deployment history | Blue/green or canary deployments; auto-rollback on health failure |
| Reliance on human review to catch preventable defects | Defect origin analysis, review effectiveness metrics | Identify defects caught in review that could be caught by automated tools | Reserve human review for knowledge transfer and design decisions |
| Manual review of risks and compliance (CAB) | Change lead time analysis, CAB effectiveness metrics | Automated change risk scoring to replace subjective risk assessment | Replace CAB with automated progressive delivery |

## Data & State

Data defects are particularly dangerous because they can corrupt persistent state. Unlike code
defects, data corruption often cannot be fixed by deploying a new version.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Schema migration and backward compatibility failures | Migration testing, schema version tracking | Analyze schema changes for backward compatibility violations before merge | Expand-then-contract schema migrations; never breaking changes |
| Null or missing data assumptions | Null safety analysis (NullAway, TypeScript strict), property testing | Static analysis for null safety; flag unhandled optional values | Null-safe type systems; Option/Maybe as default; validate at boundaries |
| Concurrency and ordering issues | Distributed tracing, idempotency testing | Detect patterns vulnerable to out-of-order delivery | Design for out-of-order delivery; idempotent consumers |
| Cache invalidation errors | Cache hit/miss monitoring, stale data detection | Analyze cache invalidation patterns and flag potential staleness windows | Short TTLs; event-driven invalidation |

## Dependency & Infrastructure

These defects originate outside your codebase but break your system. The fix is to treat
external dependencies as untrusted boundaries.

| Defect Cause | Detection Method | AI Enhancement | Fix |
|-------------|-----------------|----------------|-----|
| Third-party library breaking changes | Dependency scanning (Dependabot, Renovate), automated upgrade PRs | Analyze changelog and API diffs to predict breaking impact before upgrade | Pin dependencies; automated upgrade PRs with test gates |
| Infrastructure differences across environments | Infrastructure as code validation, environment parity checks | Compare infrastructure definitions across environments to flag drift | Single source of truth for all environments; containerization |
| Network partitions and partial failures handled wrong | Chaos engineering (Gremlin, Litmus), failure injection testing | Analyze error handling code for missing failure modes | Circuit breakers; retries; bulkheads as defaults; test failure modes explicitly |

## From Reactive to Proactive

{{% alert title="Systemic Thinking" %}}
The traditional approach to defects is reactive: wait for a bug, find it, fix it. The catalog
above enables a proactive approach: understand where defects originate, detect them at the
earliest possible point, and fix the systemic cause rather than the individual symptom.

AI enhances this shift by processing signals (code changes, test results, production metrics,
user feedback) faster and across more dimensions than manual analysis allows. But AI does not
replace the systemic fixes. Automated detection without process change just finds defects faster
without preventing them.

The goal is not zero defects. The goal is defects caught at the cheapest point in the value
stream, with systemic fixes that prevent the same category of defect from recurring.
{{% /alert %}}

## Related Content

- [Common Blockers](under-construction/) <!-- target: reference/common-blockers --> - Frequently encountered obstacles on the path to CD
- [Testing](under-construction/) <!-- target: reference/testing --> - Testing types, patterns, and best practices
- [Anti-Patterns](anti-patterns/) - Patterns that undermine delivery performance
- [Replacing Manual Validations](brownfield/replacing-manual-validations/) - The mechanical cycle of replacing manual checks with automation
- [AI Adoption Roadmap](ai-adoption-roadmap/) - How to safely incorporate AI into your delivery process

---

> This content is adapted from [AI Patterns: Defect Detection](https://bdfinst.github.io/ai-patterns/defect-detection-and-fixes/),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
