---
title: "Application Configuration"
linkTitle: "Application Configuration"
weight: 9
description: >
  Separate what varies between environments from what does not.
---

## Definition

Application configuration defines the internal behavior of your application and is bundled with the artifact. It does not vary between environments. This is distinct from environment configuration (secrets, URLs, credentials) which varies by deployment.

We embrace [The Twelve-Factor App config](https://12factor.net/config) definitions:

- **Application Configuration**: Internal to the app, does NOT vary by environment (feature flags, business rules, UI themes, default settings)
- **Environment Configuration**: Varies by deployment (database URLs, API keys, service endpoints, credentials)

## Key Principles

Application configuration should be:

1. **Version controlled** with the source code
2. **Deployed as part of the immutable artifact**
3. **Testable** in the CI pipeline
4. **Unchangeable** after the artifact is built

## What Is Improved

- **Immutability**: The artifact tested in staging is identical to what runs in production
- **Traceability**: You can trace any behavior back to a specific commit
- **Testability**: Application behavior can be validated in the pipeline before deployment
- **Reliability**: No configuration drift between environments caused by manual changes
- **Faster rollback**: Rolling back an artifact rolls back all application configuration changes

## Migration Guidance

For detailed guidance on managing application configuration, see:

- [Application Configuration]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}) - Phase 2 pipeline practice with static vs dynamic feature flag patterns and getting started steps

## Additional Resources

- [The Twelve-Factor App: Config](https://12factor.net/config)
- [Continuous Delivery: Configuration Management](https://continuousdelivery.com/foundations/configuration-management/)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
