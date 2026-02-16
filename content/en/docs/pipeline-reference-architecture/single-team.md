---
title: "Single Team, Single Deployable"
linkTitle: "Single Team"
weight: 1
draft: true
description: >
  A linear pipeline pattern for a single team owning a modular monolith.
---

This architecture suits a team of up to 8-10 people owning a
[modular monolith](../../reference/glossary/#modular-monolith) - a single deployable
application with well-defined internal module boundaries. The codebase is organized by
domain, not by technical layer. Each module encapsulates its own data, logic, and
interfaces, communicating with other modules through explicit internal APIs. The
application deploys as one unit, but its internal structure makes it possible to reason
about, test, and change one module without understanding the entire codebase. The pipeline
is linear with parallel stages where dependencies allow.

<div class="pipeline-legend">
  <span class="pipeline-legend__item pipeline-legend__item--prefeature">Pre-Feature Gate</span>
  <span class="pipeline-legend__item pipeline-legend__item--ci">CI Stage</span>
  <span class="pipeline-legend__item pipeline-legend__item--parallel">Parallel Verification</span>
  <span class="pipeline-legend__item pipeline-legend__item--accept">Acceptance</span>
  <span class="pipeline-legend__item pipeline-legend__item--prod">Production</span>
</div>

```mermaid
graph TD
    classDef prefeature fill:#0d7a32,stroke:#0a6128,color:#fff
    classDef ci fill:#224968,stroke:#1a3a54,color:#fff
    classDef parallel fill:#30648e,stroke:#224968,color:#fff
    classDef accept fill:#6c757d,stroke:#565e64,color:#fff
    classDef prod fill:#a63123,stroke:#8a2518,color:#fff

    A["Pre-commit Gates<br/><small>Lint, Types, Secrets, SAST</small>"]:::prefeature
    B["Build + Unit Tests"]:::prefeature
    C["Contract + Schema Tests"]:::prefeature
    D["Security Scans"]:::parallel
    E["Performance Benchmarks"]:::parallel
    F["Acceptance Tests<br/><small>Production-Like Env</small>"]:::accept
    G["Create Immutable Artifact"]:::ci
    H["Deploy Canary / Progressive"]:::prod
    I["Health Checks + SLO Monitors<br/>Auto-Rollback"]:::prod

    A -->|"commit to trunk"| B
    B --> C
    C --> D & E
    D --> F
    E --> F
    F --> G
    G --> H
    H --> I
```

## Key Characteristics

- **One pipeline, one artifact**: The entire application builds and deploys as a single
  immutable artifact. There is no fan-out or fan-in.
- **Linear with parallel branches**: Security scans and performance benchmarks run in
  parallel because neither depends on the other. Everything else is sequential.
- **Trunk-based development**: All developers commit to trunk at least daily. The pipeline
  runs on every commit.
- **Total target time**: Under 15 minutes from commit to production-ready artifact.
  Acceptance tests may extend this to 20 minutes for complex applications.
- **Ownership**: The team owns the pipeline definition, which lives in the same repository
  as the application code.

## When This Architecture Breaks Down

This architecture stops working when:

- The system becomes too large for a single team to manage.
- Build times extend along with the ability to respond quickly even after optimization
- Different parts of the application need different deployment cadences

When these symptoms appear, consider splitting into the
[multi-team architecture](../multi-team/) or decomposing the application into
independently deployable services with their
[own pipelines](../independent-teams/).

## Related Content

- [Quality Gates](../) - the full gate sequence this pipeline applies
- [Multiple Teams, Single Deployable](../multi-team/) - the next pattern when one team is not enough
- [Modular Monolith](../../reference/glossary/#modular-monolith) - glossary definition
- [Pipeline Architecture](../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - how to evolve pipeline architecture from entangled to loosely coupled
