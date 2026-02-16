---
title: "Rollback"
linkTitle: "Rollback"
weight: 8
description: >
  Fast, automated recovery from any deployment.
---

## Definition

Rollback on-demand means the ability to quickly and safely revert to a previous working version of your application at any time, without requiring special approval, manual intervention, or complex procedures. It should be as simple and reliable as deploying forward.

## Key Principles

1. **Fast**: Rollback completes in minutes, not hours. Target < 5 minutes.
2. **Automated**: No manual steps or special procedures. Single command or click.
3. **Safe**: Rollback is validated just like forward deployment.
4. **Simple**: Any team member can execute it without specialized knowledge.
5. **Tested**: Rollback mechanism is regularly tested, not just used in emergencies.

## What Is Improved

- **Mean Time To Recovery (MTTR)**: Drops from hours to minutes
- **Deployment frequency**: Increases due to reduced risk
- **Team confidence**: Higher willingness to deploy
- **Customer satisfaction**: Faster incident resolution
- **On-call burden**: Reduced stress for on-call engineers

## Migration Guidance

For detailed guidance on implementing rollback capability, see:

- [Rollback](../../migrate-to-cd/migration-path/pipeline/rollback/) - Phase 2 pipeline practice with blue-green, canary, feature flag, and database-safe rollback patterns

## Additional Resources

- [Site Reliability Engineering: Release Engineering](https://sre.google/sre-book/release-engineering/)
- [Martin Fowler: Blue-Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [Martin Fowler: Canary Release](https://martinfowler.com/bliki/CanaryRelease.html)
- [Refactoring Databases: Evolutionary Database Design](https://databaserefactoring.com/)
