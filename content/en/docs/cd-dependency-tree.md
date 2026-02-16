---
title: "CD Dependency Tree"
linkTitle: "Dependency Tree"
weight: 13
description: >
  Visual guide showing how CD practices depend on and build upon each other.
---

{{% pageinfo %}}
The full interactive dependency tree is at
[practices.minimumcd.org](https://practices.minimumcd.org). This page summarizes the key
dependency chains and how they map to the migration phases in this guide.
{{% /pageinfo %}}

Continuous delivery is not a single practice you adopt. It is a system of interdependent
practices where each one supports and enables others. The
[interactive CD dependency tree](https://practices.minimumcd.org) maps the full set of practices
and their dependency relationships. Understanding these dependencies helps you plan your migration
in the right order, addressing foundational practices before building on them.

## How Dependencies Work

CD sits at the top of the tree. It depends directly on many practices, each of which has its own
dependencies. When practice A depends on practice B, it means B is a prerequisite or enabler
for A. You cannot reliably adopt A without B in place.

For example, continuous delivery depends directly on:

| Category | Direct Dependencies |
|----------|-------------------|
| **Pipeline** | Application pipeline, immutable artifacts, on-demand rollback, configuration management |
| **Testing** | Continuous testing, automated database changes, test environments |
| **Integration** | Continuous integration |
| **Environment** | Automated environment provisioning, monitoring and alerting |
| **Organizational** | Cross-functional product teams, developer-driven support, prioritized features |
| **Development** | ATDD, modular system design |

Each of these has its own dependency chain. The application pipeline alone depends on automated
testing, deployment automation, automated artifact versioning, and quality gates. Automated
testing in turn depends on build automation. Build automation depends on version control and
dependency management. The chain runs deep.

Explore the full tree at [practices.minimumcd.org](https://practices.minimumcd.org) to trace
any dependency chain from CD down to its foundations.

## Key Dependency Chains

### BDD enables testing enables CI enables CD

Behavior-Driven Development produces clear, testable acceptance criteria. Those criteria drive
functional testing and acceptance test-driven development. A comprehensive, fast test suite
enables Continuous Integration with confidence. And CI is the foundational prerequisite for CD.

If your team skips BDD, stories are ambiguous. If stories are ambiguous, tests are incomplete
or wrong. If tests are unreliable, CI is unreliable. And if CI is unreliable, CD is impossible.

### Trunk-Based Development enables CI

CI requires that all developers integrate to a shared trunk at least once per day. If your team
uses long-lived feature branches, you are not doing CI regardless of how often your build server
runs. TBD is not optional for CD. It is a prerequisite.

### Cross-functional teams enable component ownership enables modular systems

How teams are organized determines what they can deliver independently. A team organized around a
domain (owning the services, data, and interfaces for that domain) can decompose work into
[vertical slices](../glossary/#vertical-sliced-story) within their boundary and deploy without
coordinating with other teams. A team organized around a technical layer (the "frontend team,"
the "DBA team") cannot. Every feature requires handoffs across layer teams, and deployment
requires coordinating all of them.

Conway's Law makes this structural: the system's architecture will mirror the team structure.
In the dependency tree, cross-functional product teams enable component ownership, which enables
the modular system design that CD requires.

### Version control is the root of everything

Nearly every automation practice traces back to version control. Build automation, configuration
management, infrastructure automation, and component ownership all depend on it. If your version
control practices are weak (infrequent commits, poor branching discipline, configuration stored
outside version control), the entire tree above it is compromised.

## Mapping to Migration Phases

The dependency tree directly informs the sequencing of migration phases:

| Dependency Layer | Migration Phase | Why This Order |
|-----------------|-----------------|----------------|
| Development practices (TBD, BDD, trunk-based development) | [Phase 1 - Foundations](../migrate-to-cd/migration-path/foundations/) | These are prerequisites for CI, which is a prerequisite for everything else |
| Build and test infrastructure (build automation, automated testing, test environments) | [Phase 1](../migrate-to-cd/migration-path/foundations/) and [Phase 2](../migrate-to-cd/migration-path/pipeline/) | You need reliable build and test infrastructure before you can build a reliable pipeline |
| Pipeline practices (application pipeline, immutable artifacts, configuration management, rollback) | [Phase 2 - Pipeline](../migrate-to-cd/migration-path/pipeline/) | The pipeline depends on solid CI and development practices |
| Flow optimization (small batches, feature flags, WIP limits, metrics) | [Phase 3 - Optimize](../migrate-to-cd/migration-path/optimize/) | Optimization requires a working pipeline to optimize |
| Organizational practices (cross-functional teams, component ownership, developer-driven support) | All phases | These cross-cutting practices support every phase. Team structure should be addressed early because it constrains architecture and work decomposition |

## Using the Tree to Diagnose Problems

When something in your delivery process is not working, trace it through the dependency tree
to find the root cause.

**Deployments keep failing.**
Look at what feeds CD in the tree. Is your pipeline deterministic? Are you using immutable
artifacts? Is your application config externalized? The failure is likely in one of the
pipeline practices.

**CI builds are constantly broken.**
Look at what feeds CI. Are developers actually practicing TBD (integrating daily)? Is the test
suite reliable, or is it full of flaky tests? Is the build automated end-to-end? The broken
builds are a symptom of a problem in the development practices layer.

**You cannot reduce batch size.**
Look at what feeds small batches. Is work being decomposed into vertical slices? Are feature
flags available so partial work can be deployed safely? Is the architecture decoupled enough
to allow independent deployment? The batch size problem originates in one of these upstream
practices.

**Every feature requires cross-team coordination to deploy.**
Look at team structure. Are teams organized around domains they can deliver independently, or
around technical layers that force handoffs for every feature? If deploying a feature requires
the frontend team, backend team, and DBA team to coordinate a release window, the team
structure is preventing independent delivery. No amount of pipeline automation fixes this.
The team boundaries need to change.

{{% alert title="Migration Tip" %}}
When you encounter a problem, resist the urge to fix the symptom. Use the
[dependency tree](https://practices.minimumcd.org) to trace the problem to its root cause.
Fixing the symptom (for example, adding more manual testing to catch deployment failures) will
not solve the underlying issue and often adds toil that makes things worse. Fix the dependency
that is broken, and the downstream problem resolves itself.
{{% /alert %}}

## Explore the Full Tree

The static summary on this page covers the most important dependency chains. The full
interactive tree at [practices.minimumcd.org](https://practices.minimumcd.org) lets you:

- Trace any practice's complete dependency chain from CD down to its foundations
- Browse practices organized by category (automation, behavior, behavior-enabled automation)
- Understand maturity levels from foundational practices to advanced CD enablers
- Track your team's adoption progress across the full practice set

---

> The CD dependency tree is maintained at
> [practices.minimumcd.org](https://practices.minimumcd.org).
