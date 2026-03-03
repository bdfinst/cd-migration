---
title: "Pipeline Reference Architecture"
linkTitle: "Pipeline Reference Architecture"
weight: 7
description: >
  Pipeline reference architectures for single-team, multi-team, and distributed service delivery, with quality gates sequenced by defect detection priority.
---

{{% pageinfo %}}
This section defines quality gates sequenced by defect detection priority and three
[pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) patterns that apply them. Quality gates are derived from the
[Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}) catalog and sequenced so the cheapest, fastest
checks run first.

Gates marked with **[Pre-Feature]** must be in place and passing before any new feature
work begins. They form the baseline safety net that every commit runs through. Adding
features without these gates means defects accumulate faster than the team can detect them.

Gates marked with <span class="ai-high">&#9650;</span> are enhanced by AI - the AI shifts
detection earlier or catches issues that rule-based tools miss. See the
[Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}) catalog for details.
{{% /pageinfo %}}

## Quality Gates in Priority Sequence

The gate sequence follows a single principle: **fail fast, fail cheap**. Gates that catch
the most common defects with the least execution time run first. Each gate listed below
maps to one or more defect sources from the catalog.

### Pre-commit Gates

These run on the developer's machine before code leaves the workstation. They provide
sub-second to sub-minute feedback.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Linting and formatting** | Code style consistency, preventable review noise | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}) | <span class="gate-required">Required</span> |
| **Static type checking** | Null/missing data assumptions, type mismatches | [Data & State]({{< relref "/docs/reference/defect-sources/data-and-state" >}}) | <span class="gate-required">Required</span> |
| **Secret scanning** | Secrets committed to source control | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | <span class="gate-required">Required</span> |
| **SAST (injection patterns)** | Injection vulnerabilities, taint analysis | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | <span class="gate-required">Required</span> |
| **Race condition detection** | Race conditions (thread sanitizers, where language supports it) | [Integration & Boundaries]({{< relref "/docs/reference/defect-sources/integration-and-boundaries" >}}) | |
| **Accessibility linting** | Missing alt text, ARIA violations, contrast failures | [Product & Discovery]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}) | |
| **Unit tests** | Logic errors, unintended side effects, edge cases | [Change & Complexity]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}) | <span class="gate-required">Required</span> |
| **Timeout enforcement checks** | Missing timeout and deadline enforcement | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| <span class="ai-high">&#9650;</span> **AI semantic code review** | Logic errors, missing edge cases, subtle injection vectors beyond pattern matching | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}), [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |

### CI Stage 1: Build and Fast Tests <span class="stage-time">< 5 min</span>

These run on every commit to trunk.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **All pre-commit gates** | Re-run in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) to catch anything bypassed locally | See [Pre-commit Gates](#pre-commit-gates) | <span class="gate-required">Required</span> |
| **Compilation / build** | Build reproducibility, dependency resolution | [Dependency & Infrastructure]({{< relref "/docs/reference/defect-sources/dependency-and-infrastructure" >}}) | <span class="gate-required">Required</span> |
| **Dependency vulnerability scan (SCA)** | Known vulnerabilities in dependencies | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | <span class="gate-required">Required</span> |
| **License compliance scan** | License compliance violations | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| **Code complexity and duplication scoring** | Accumulated technical debt | [Change & Complexity]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}) | |
| <span class="ai-high">&#9650;</span> **AI change impact analysis** | Semantic blast radius of changes; unintended side effects beyond syntactic dependencies | [Change & Complexity]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}) | |
| <span class="ai-high">&#9650;</span> **AI vulnerability reachability analysis** | Correlate CVEs with actual code usage paths to prioritize exploitable risks over theoretical ones | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| **Stage duration warning** | Warn if Stage 1 exceeds 10 minutes; slow fast-feedback loops mask defects and delay trunk integration | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}) | |

### CD Stage 1: Integration and Contract Tests <span class="stage-time">< 10 min</span>

These validate boundaries between components.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Contract tests** | Interface mismatches, wrong assumptions about upstream/downstream | [Integration & Boundaries]({{< relref "/docs/reference/defect-sources/integration-and-boundaries" >}}) | <span class="gate-required">Required</span> |
| **Schema migration validation** | Schema migration and backward compatibility failures | [Data & State]({{< relref "/docs/reference/defect-sources/data-and-state" >}}) | <span class="gate-required">Required</span> |
| **Infrastructure-as-code drift detection** | Configuration drift, environment differences | [Dependency & Infrastructure]({{< relref "/docs/reference/defect-sources/dependency-and-infrastructure" >}}) | |
| **Environment parity checks** | Test environments not reflecting production | [Testing & Observability Gaps]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}) | |
| <span class="ai-high">&#9650;</span> **AI boundary coverage analysis** | Integration boundaries missing contract tests; semantic service relationship mapping | [Testing & Observability Gaps]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}) | |
| <span class="ai-high">&#9650;</span> **AI behavioral assumption detection** | Undocumented assumptions at service boundaries that contract tests don't cover | [Integration & Boundaries]({{< relref "/docs/reference/defect-sources/integration-and-boundaries" >}}) | |

### CD Stage 2: Broader Automated Verification <span class="stage-time">< 15 min</span>

These run in parallel where possible.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Mutation testing** | Untested edge cases and error paths, weak assertions | [Testing & Observability Gaps]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}) | |
| **Performance benchmarks** | Performance regressions | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| **Resource leak detection** | Resource leaks (memory, connections) | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| **Security integration tests** | Authentication and authorization gaps | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| **Compliance-as-code policy checks** | Regulatory requirement gaps, missing audit trails | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| **SBOM generation** | License compliance, dependency transparency | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| **Automated WCAG compliance scan** | Full-page rendered accessibility checks with browser automation | [Product & Discovery]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}) | |
| <span class="ai-high">&#9650;</span> **AI edge case test generation** | Untested boundaries and error conditions identified from code path analysis | [Testing & Observability Gaps]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}) | |
| <span class="ai-high">&#9650;</span> **AI authorization path analysis** | Missing authorization checks and privilege escalation patterns in code paths | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| <span class="ai-high">&#9650;</span> **AI resilience review** | Single points of failure and missing fallback paths in architecture | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| <span class="ai-high">&#9650;</span> **AI regulatory mapping** | Map regulatory requirements to implementation artifacts; flag uncovered controls | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |

### Acceptance Tests <span class="stage-time">< 20 min</span>

These validate user-facing behavior in a [production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}).

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **[Functional acceptance tests]({{< relref "/docs/reference/glossary#functional-acceptance-tests" >}})** | Implementation does not match acceptance criteria | [Product & Discovery]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}) | |
| **Load and capacity tests** | Unknown capacity limits, slow response times | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| **Chaos and resilience tests** | Network partition handling, missing graceful degradation | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| **Cache invalidation verification** | Cache invalidation errors | [Data & State]({{< relref "/docs/reference/defect-sources/data-and-state" >}}) | |
| **Feature interaction tests** | Unanticipated feature interactions | [Change & Complexity]({{< relref "/docs/reference/defect-sources/change-and-complexity" >}}) | |
| <span class="ai-high">&#9650;</span> **AI intent alignment review** | Acceptance criteria vs. user behavior data misalignment; specs that meet the letter but miss the intent | [Product & Discovery]({{< relref "/docs/reference/defect-sources/product-and-discovery" >}}) | |

### Production Verification

These run during and after deployment. They are not optional - they close the feedback loop.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Health checks with auto-rollback** | Inadequate [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) capability | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}) | |
| **Canary or progressive deployment** | Batching too many changes per release | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}) | |
| **Real user monitoring and SLO checks** | Slow user-facing response times, product-market misalignment | [Performance & Resilience]({{< relref "/docs/reference/defect-sources/performance-and-resilience" >}}) | |
| **Structured audit logging verification** | Missing audit trails | [Security & Compliance]({{< relref "/docs/reference/defect-sources/security-and-compliance" >}}) | |
| <span class="ai-high">&#9650;</span> **AI change risk scoring** | Automated risk assessment from change diff, deployment history, and blast radius analysis | [Process & Deployment]({{< relref "/docs/reference/defect-sources/process-and-deployment" >}}) | |

---

## Pre-Feature Baseline

{{% alert title="These gates must be active before starting feature work" color="warning" %}}
Without these gates passing on every commit to trunk, defects accumulate faster than the
team can detect them. If any are missing, add them before writing new features. The
[Foundations phase]({{< relref "/docs/migrate-to-cd/foundations" >}}) covers how to establish
this baseline.

1. Linting and formatting
2. Static type checking
3. Secret scanning
4. SAST for injection patterns
5. Compilation / build
6. Unit tests
7. Dependency vulnerability scan
8. Contract tests at every integration boundary
9. Schema migration validation
{{% /alert %}}

---

## Pipeline Patterns

These three patterns apply the quality gates above to progressively more complex team
and deployment topologies. Most organizations start with Pattern 1 and evolve toward
Pattern 3 as team count and deployment independence requirements grow.

1. **[Single Team, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/single-team" >}})** - one team owns one
   [modular monolith]({{< relref "/docs/reference/glossary#modular-monolith" >}}) with a linear pipeline
2. **[Multiple Teams, Single Deployable]({{< relref "/docs/reference/pipeline-reference-architecture/multi-team" >}})** - multiple teams own
   sub-domain modules within a shared modular monolith, each with its own sub-pipeline
   feeding a thin integration pipeline
3. **[Independent Teams, Independent Deployables]({{< relref "/docs/reference/pipeline-reference-architecture/independent-teams" >}})** - each team
   owns an independently [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) service with its own full pipeline and API contract
   verification

---

## Mapping to the Defect Sources Catalog

Each quality gate above is derived from the [Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}})
catalog. The catalog organizes defects by origin - product and discovery, integration,
knowledge, change and complexity, testing gaps, process, data, dependencies, security, and
performance. The pipeline gates are the automated enforcement points for the systemic
prevention strategies described in the catalog.

Gates marked with <span class="ai-high">&#9650;</span> correspond to catalog entries where AI
shifts detection earlier than current rule-based automation. For expert agent patterns that
implement these gates in an agentic [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) context, see
[ACD Pipeline Enforcement]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}).

When adding or removing gates, consult the catalog to ensure that no defect category loses
its detection point. A gate that seems redundant may be the only automated check for a
specific defect source.

## Further Reading

For a deeper treatment of pipeline design, stage sequencing, and deployment strategies, see
Dave Farley's
[Continuous Delivery Pipelines](https://leanpub.com/cd-pipelines) which covers pipeline
architecture patterns in detail.

## Related Content

- [Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}) - the defect source catalog that informs gate selection
- [Pipeline Architecture]({{< relref "/docs/migrate-to-cd/pipeline/pipeline-architecture" >}}) - how to evolve pipeline architecture from entangled to loosely coupled
- [Deterministic Pipeline]({{< relref "/docs/reference/practices/deterministic-pipeline" >}}) - ensuring the pipeline produces consistent results
- [Single Path to Production]({{< relref "/docs/reference/practices/single-path-to-production" >}}) - why all changes must flow through one pipeline
- [Immutable Artifacts]({{< relref "/docs/reference/practices/immutable-artifacts" >}}) - build once, deploy everywhere
- [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) - the migration phase that establishes the pipeline
- [Slow Pipelines]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}) - what happens when pipeline architecture is not optimized
- [ACD]({{< relref "/docs/agentic-cd" >}}) - additional pipeline constraints when AI agents contribute changes
