---
title: "Single Path to Production"
linkTitle: "Single Path to Production"
weight: 3
description: >
  All deployments flow through one automated pipeline - no exceptions.
---

## Definition

The deployment pipeline is the single, standardized path for all changes to reach any environment - development, testing, staging, or production. No manual deployments, no side channels, no "quick fixes" bypassing the pipeline. If it is not deployed through the pipeline, it does not get deployed.

## Key Principles

1. **Single path**: All deployments flow through the same pipeline
2. **No exceptions**: Even hotfixes and rollbacks go through the pipeline
3. **Automated**: Deployment is triggered automatically after pipeline validation
4. **Auditable**: Every deployment is tracked and traceable
5. **Consistent**: The same process deploys to all environments

## What Is Improved

- **Reliability**: Every deployment is validated the same way
- **Traceability**: Clear audit trail from commit to production
- **Consistency**: Environments stay in sync
- **Speed**: Automated deployments are faster than manual
- **Safety**: Quality gates are never bypassed
- **Confidence**: Teams trust that production matches what was tested
- **Recovery**: Rollbacks are as reliable as forward deployments

## Migration Guidance

For detailed guidance on establishing a single path to production, see:

- [Single Path to Production](../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - Phase 2 pipeline practice with anti-patterns, code examples, and getting started steps

## Additional Resources

- [Continuous Delivery: The Deployment Pipeline](https://www.informit.com/articles/article.aspx?p=1621865)
- [Accelerate](https://itrevolution.com/product/accelerate/) - Nicole Forsgren, Jez Humble, Gene Kim
- [Site Reliability Engineering: Release Engineering](https://sre.google/sre-book/release-engineering/)
