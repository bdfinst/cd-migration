---
title: "Pipeline Reference Architecture"
linkTitle: "Pipeline Reference Architecture"
weight: 6
description: >
  Pipeline reference architectures for single-team, multi-team, and distributed service delivery, with quality gates sequenced by defect detection priority.
---

{{% pageinfo %}}
This section defines quality gates sequenced by defect detection priority and three
pipeline patterns that apply them. Quality gates are derived from the
[Systemic Defect Fixes](../defect-sources/) catalog and sequenced so the cheapest, fastest
checks run first.

Gates marked with **[Pre-Feature]** must be in place and passing before any new feature
work begins. They form the baseline safety net that every commit runs through. Adding
features without these gates means defects accumulate faster than the team can detect them.
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
| **Linting and formatting** | Code style consistency, preventable review noise | [Process & Deployment](../defect-sources/#process--deployment) | <span class="gate-required">Required</span> |
| **Static type checking** | Null/missing data assumptions, type mismatches | [Data & State](../defect-sources/#data--state) | <span class="gate-required">Required</span> |
| **Secret scanning** | Secrets committed to source control | [Security & Compliance](../defect-sources/#security--compliance) | <span class="gate-required">Required</span> |
| **SAST (injection patterns)** | Injection vulnerabilities, taint analysis | [Security & Compliance](../defect-sources/#security--compliance) | <span class="gate-required">Required</span> |
| **Race condition detection** | Race conditions (thread sanitizers, where language supports it) | [Integration & Boundaries](../defect-sources/#integration--boundaries) | |
| **Timeout enforcement checks** | Missing timeout and deadline enforcement | [Performance & Resilience](../defect-sources/#performance--resilience) | |

### CI Stage 1: Build and Fast Tests <span class="stage-time">< 5 min</span>

These run on every commit to trunk.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Compilation / build** | Build reproducibility, dependency resolution | [Dependency & Infrastructure](../defect-sources/#dependency--infrastructure) | <span class="gate-required">Required</span> |
| **Unit tests** | Logic errors, unintended side effects, edge cases | [Change & Complexity](../defect-sources/#change--complexity) | <span class="gate-required">Required</span> |
| **Dependency vulnerability scan (SCA)** | Known vulnerabilities in dependencies | [Security & Compliance](../defect-sources/#security--compliance) | <span class="gate-required">Required</span> |
| **License compliance scan** | License compliance violations | [Security & Compliance](../defect-sources/#security--compliance) | |
| **Code complexity and duplication scoring** | Accumulated technical debt | [Change & Complexity](../defect-sources/#change--complexity) | |

### CI Stage 2: Integration and Contract Tests <span class="stage-time">< 10 min</span>

These validate boundaries between components.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Contract tests** | Interface mismatches, wrong assumptions about upstream/downstream | [Integration & Boundaries](../defect-sources/#integration--boundaries) | <span class="gate-required">Required</span> |
| **Schema migration validation** | Schema migration and backward compatibility failures | [Data & State](../defect-sources/#data--state) | <span class="gate-required">Required</span> |
| **Infrastructure-as-code drift detection** | Configuration drift, environment differences | [Dependency & Infrastructure](../defect-sources/#dependency--infrastructure) | |
| **Environment parity checks** | Test environments not reflecting production | [Testing & Observability Gaps](../defect-sources/#testing--observability-gaps) | |

### CI Stage 3: Broader Automated Verification <span class="stage-time">< 15 min</span>

These run in parallel where possible.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Mutation testing** | Untested edge cases and error paths, weak assertions | [Testing & Observability Gaps](../defect-sources/#testing--observability-gaps) | |
| **Performance benchmarks** | Performance regressions | [Performance & Resilience](../defect-sources/#performance--resilience) | |
| **Resource leak detection** | Resource leaks (memory, connections) | [Performance & Resilience](../defect-sources/#performance--resilience) | |
| **Security integration tests** | Authentication and authorization gaps | [Security & Compliance](../defect-sources/#security--compliance) | |
| **Compliance-as-code policy checks** | Regulatory requirement gaps, missing audit trails | [Security & Compliance](../defect-sources/#security--compliance) | |
| **SBOM generation** | License compliance, dependency transparency | [Security & Compliance](../defect-sources/#security--compliance) | |

### Acceptance Tests <span class="stage-time">< 20 min</span>

These validate user-facing behavior in a production-like environment.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Functional acceptance tests** | Building the wrong thing, meets spec but misses intent | [Product & Discovery](../defect-sources/#product--discovery) | |
| **Load and capacity tests** | Unknown capacity limits, slow response times | [Performance & Resilience](../defect-sources/#performance--resilience) | |
| **Chaos and resilience tests** | Network partition handling, missing graceful degradation | [Performance & Resilience](../defect-sources/#performance--resilience) | |
| **Cache invalidation verification** | Cache invalidation errors | [Data & State](../defect-sources/#data--state) | |
| **Feature interaction tests** | Unanticipated feature interactions | [Change & Complexity](../defect-sources/#change--complexity) | |

### Production Verification

These run during and after deployment. They are not optional - they close the feedback loop.

| Gate | Defect Sources Addressed | Catalog Section | Pre-Feature |
|------|--------------------------|-----------------|:-----------:|
| **Health checks with auto-rollback** | Inadequate rollback capability | [Process & Deployment](../defect-sources/#process--deployment) | |
| **Canary or progressive deployment** | Batching too many changes per release | [Process & Deployment](../defect-sources/#process--deployment) | |
| **Real user monitoring and SLO checks** | Slow user-facing response times, product-market misalignment | [Performance & Resilience](../defect-sources/#performance--resilience) | |
| **Structured audit logging verification** | Missing audit trails | [Security & Compliance](../defect-sources/#security--compliance) | |

---

## Pre-Feature Baseline

{{% alert title="These gates must be active before starting feature work" color="warning" %}}
Without these gates passing on every commit to trunk, defects accumulate faster than the
team can detect them. If any are missing, add them before writing new features. The
[Foundations phase](../migrate-to-cd/migration-path/foundations/) covers how to establish
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

1. **[Single Team, Single Deployable](single-team/)** - one team owns one
   [modular monolith](../glossary/#modular-monolith) with a linear pipeline
2. **[Multiple Teams, Single Deployable](multi-team/)** - multiple teams own
   sub-domain modules within a shared modular monolith, each with its own sub-pipeline
   feeding a thin integration pipeline
3. **[Independent Teams, Independent Deployables](independent-teams/)** - each team
   owns an independently deployable service with its own full pipeline and API contract
   verification

---

## Mapping to the Defect Sources Catalog

Each quality gate above is derived from the [Systemic Defect Fixes](../defect-sources/)
catalog. The catalog organizes defects by origin - product and discovery, integration,
knowledge, change and complexity, testing gaps, process, data, dependencies, security, and
performance. The pipeline gates are the automated enforcement points for the systemic
prevention strategies described in the catalog.

When adding or removing gates, consult the catalog to ensure that no defect category loses
its detection point. A gate that seems redundant may be the only automated check for a
specific defect source.

## Further Reading

For a deeper treatment of pipeline design, stage sequencing, and deployment strategies, see
Dave Farley's
[Continuous Delivery Pipelines](https://leanpub.com/cd-pipelines) which covers pipeline
architecture patterns in detail.

## Related Content

- [Systemic Defect Fixes](../defect-sources/) - the defect source catalog that informs gate selection
- [Pipeline Architecture](../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - how to evolve pipeline architecture from entangled to loosely coupled
- [Deterministic Pipeline](../practices/deterministic-pipeline/) - ensuring the pipeline produces consistent results
- [Single Path to Production](../practices/single-path-to-production/) - why all changes must flow through one pipeline
- [Immutable Artifacts](../practices/immutable-artifacts/) - build once, deploy everywhere
- [Phase 2: Pipeline](../migrate-to-cd/migration-path/pipeline/) - the migration phase that establishes the pipeline
- [Slow Pipelines](../symptoms/flow/slow-pipelines/) - what happens when pipeline architecture is not optimized
- [Agentic CD](../agentic-cd/) - additional pipeline constraints when AI agents contribute changes
