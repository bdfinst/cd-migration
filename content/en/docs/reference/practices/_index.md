---
title: "CD Practices"
linkTitle: "Practices"
weight: 3
description: >
  Concise definitions of the core continuous delivery practices from MinimumCD.
---

These pages define the minimum practices required for continuous delivery. Each page covers
what the practice is, why it matters, and what the minimum criteria are. For migration
guidance and tactical how-to content, follow the links to the corresponding phase pages.

## Core Practices

- **[Continuous Integration](continuous-integration/)** - Integrate work to trunk at least daily with automated testing
- **[Trunk-Based Development](trunk-based-development/)** - All changes integrate into a single shared trunk
- **[Single Path to Production](single-path-to-production/)** - One automated pipeline for all changes to reach any environment
- **[Deterministic Pipeline](deterministic-pipeline/)** - Same inputs always produce the same outputs
- **[Definition of Deployable](definition-of-deployable/)** - Automated criteria that determine production readiness
- **[Immutable Artifacts](immutable-artifacts/)** - Build once, deploy everywhere without modification
- **[Production-Like Environments](production-like-environments/)** - Test in environments that mirror production
- **[Rollback](rollback/)** - Fast, automated recovery from any deployment
- **[Application Configuration](application-configuration/)** - Separate what varies between environments from what does not
