---
aliases:
  - /docs/symptoms/works-on-my-machine/
title: "It Works on My Machine"
linkTitle: "Works on my machine"
description: >
  Code that works in one developer's environment fails in another, in CI, or in production.
  Environment differences make results unreproducible.
tags:
  - environment-consistency
---

## What you are seeing

A developer runs the application locally and everything works. They push to [CI](../../glossary/#ci-continuous-integration) and the build
fails. Or a teammate pulls the same branch and gets a different result. Or a bug report comes in
that nobody can reproduce locally.

The team spends hours debugging only to discover the issue is environmental: a different Node
version, a missing system library, a different database encoding, or a service running on the
developer's machine that is not available in CI. The code is correct. The environments are
different.

New team members experience this acutely. Setting up a development environment takes days of
following an outdated wiki page, asking teammates for help, and discovering undocumented
dependencies. Every developer's machine accumulates unique configuration over time, making "works
on my machine" a common refrain and a useless debugging signal.

## Common causes

### Snowflake Environments

When development environments are set up manually and maintained individually, each developer's
machine becomes unique. One developer installed Python 3.9, another has 3.11. One has PostgreSQL
14, another has 15. These differences are invisible until someone hits a version-specific behavior.
Reproducible, containerized development environments eliminate the variance by ensuring every
developer works in an identical setup.

**Read more:** [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/)

### Manual Deployments

When environment setup is a manual process documented in a wiki or README, it is never followed
identically. Each developer interprets the instructions slightly differently, installs a slightly
different version, or skips a step that seems optional. The manual process guarantees divergence
over time. Infrastructure as code and automated setup scripts ensure consistency.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

### Tightly Coupled Monolith

When the application has implicit dependencies on its environment (specific file paths, locally
running services, system-level configuration), it is inherently sensitive to environmental
differences. Well-designed code with explicit, declared dependencies works the same way
everywhere. Code that reaches into its runtime environment for undeclared dependencies works only
where those dependencies happen to exist.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

## How to narrow it down

1. **Do all developers use the same OS, runtime versions, and dependency versions?** If not,
   environment divergence is the most likely cause. Start with
   [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/).
2. **Is the development environment setup automated or manual?** If it is a wiki page that takes
   a day to follow, the manual process creates the divergence. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Does the application depend on local services, file paths, or system configuration that is
   not declared in the codebase?** If the application has implicit environmental dependencies,
   it will behave differently wherever those dependencies differ. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).

---

**Ready to fix this?** The most common cause is [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/). Start with its [How to Fix It](../../anti-patterns/pipeline/snowflake-environments/#how-to-fix-it) section for week-by-week steps.

## Related Content

- [Tests Pass in One Environment but Fail in Another](../../symptoms/testing/environment-dependent-failures/) - The same root cause manifests in both development and testing
- [Staging Passes but Production Fails](../../symptoms/deployment/staging-passes-production-fails/) - Environment inconsistency at the deployment stage
- [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/) - Unique environments that diverge over time
- [Production-Like Environments](../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Making all environments consistent and reproducible
- [Everything as Code](../../migrate-to-cd/migration-path/foundations/everything-as-code/) - Infrastructure and configuration managed in version control
