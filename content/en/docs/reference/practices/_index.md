---
title: "CD Practices"
linkTitle: "Practices"
weight: 10
description: >
  Concise definitions of the core continuous delivery practices from MinimumCD.
---

These pages define the minimum practices required for [continuous delivery](../glossary/#cd-continuous-delivery). Each page covers
what the practice is, why it matters, and what the minimum criteria are. For migration
guidance and tactical how-to content, follow the links to the corresponding phase pages.

## Core Practices

- **[Continuous Integration]({{< relref "/docs/reference/practices/continuous-integration" >}})** - Integrate work to trunk at least daily with automated testing
- **[Trunk-Based Development]({{< relref "/docs/reference/practices/trunk-based-development" >}})** - All changes integrate into a single shared trunk
- **[Single Path to Production]({{< relref "/docs/reference/practices/single-path-to-production" >}})** - One automated [pipeline](../glossary/#pipeline) for all changes to reach any environment
- **[Deterministic Pipeline]({{< relref "/docs/reference/practices/deterministic-pipeline" >}})** - Same inputs always produce the same outputs
- **[Definition of Deployable]({{< relref "/docs/reference/practices/definition-of-deployable" >}})** - Automated criteria that determine production readiness
- **[Immutable Artifacts]({{< relref "/docs/reference/practices/immutable-artifacts" >}})** - Build once, deploy everywhere without modification
- **[Production-Like Environments]({{< relref "/docs/reference/practices/production-like-environments" >}})** - Test in environments that mirror production
- **[Rollback]({{< relref "/docs/reference/practices/rollback" >}})** - Fast, automated recovery from any deployment
- **[Application Configuration]({{< relref "/docs/reference/practices/application-configuration" >}})** - Separate what varies between environments from what does not
