---
title: "Immutable Artifacts"
linkTitle: "Immutable Artifacts"
weight: 6
description: >
  Build once, deploy everywhere. The artifact is never modified after creation.
---

## Definition

Central to CD is that we are validating the artifact with the pipeline. It is built once and deployed to all environments. A common anti-pattern is building an artifact for each environment. The pipeline should generate immutable, versioned artifacts.

- **Immutable Pipeline**: Failures should be addressed by changes in version control so that two executions with the same configuration always yield the same results. Never go to the failure point, make adjustments in the environment, and re-start from that point.

- **Immutable Artifacts**: Some package management systems allow the creation of release candidate versions. For example, it is common to find `-SNAPSHOT` versions in Java. However, this means the artifact's behavior can change without modifying the version. Version numbers are cheap. If we are to have an immutable pipeline, it must produce an immutable artifact. Never use or produce `-SNAPSHOT` versions.

Immutability provides the confidence to know that the results from the pipeline are real and repeatable.

## What Is Improved

- **Everything must be version controlled**: source code, environment configurations, application configurations, and even test data. This reduces variability and improves the quality process.
- **Confidence in testing**: The artifact validated in pre-production is byte-for-byte identical to what runs in production.
- **Faster rollback**: Previous artifacts are unchanged in the artifact repository, ready to be redeployed.
- **Audit trail**: Every artifact is traceable to a specific commit and pipeline run.

## Migration Guidance

For detailed guidance on implementing immutable artifacts, see:

- [Immutable Artifacts](../../migrate-to-cd/migration-path/pipeline/immutable-artifacts/) - Phase 2 pipeline practice with anti-patterns, good patterns, and getting started steps

## Additional Resources

- [The Twelve-Factor App](https://12factor.net/)
- [Continuous Delivery](https://continuousdelivery.com/) - Jez Humble and David Farley
