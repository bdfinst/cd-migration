---
title: "Production-Like Environments"
linkTitle: "Production-Like Environments"
weight: 7
description: >
  Test in environments that mirror production to catch environment-specific issues early.
---

## Definition

It is crucial to leverage pre-production environments in your CD pipeline to run all of your tests (unit, integration, UAT, manual QA, E2E) early and often. Test environments increase interaction with new features and exposure to bugs - both of which are important prerequisites for reliable software.

## Types of Pre-Production Environments

Most organizations employ both static and short-lived environments and utilize them for case-specific stages of the SDLC:

- **Staging environment**: The last environment that teams run automated tests against prior to deployment, particularly for testing interaction between all new features after a merge. Its infrastructure reflects production as closely as possible.

- **Ephemeral environments**: Full-stack, on-demand environments spun up on every code change. Each ephemeral environment is leveraged in your pipeline to run E2E, unit, and integration tests on every code change. These environments are defined in version control, created and destroyed automatically on demand. They are short-lived by definition but should closely resemble production. They replace long-lived "static" environments and the maintenance required to keep those stable.

## What Is Improved

- **Infrastructure is kept consistent**: Test environments deliver results that reflect real-world performance. Fewer unprecedented bugs reach production since using prod-like data and dependencies allows you to run your entire test suite earlier.
- **Test against latest changes**: These environments rebuild upon code changes with no manual intervention.
- **Test before merge**: Attaching an ephemeral environment to every PR enables E2E testing in your CI before code changes get deployed to staging.

## Migration Guidance

For detailed guidance on implementing production-like environments, see:

- [Production-Like Environments](../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Phase 2 pipeline practice with environment parity, ephemeral environments, and getting started steps

## Additional Resources

- [EphemeralEnvironments.io](https://ephemeralenvironments.io) - Resource on ephemeral environment practices
- [Continuous Delivery](https://continuousdelivery.com/) - Jez Humble and David Farley
