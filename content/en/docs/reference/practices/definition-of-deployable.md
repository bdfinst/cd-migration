---
title: "Definition of Deployable"
linkTitle: "Definition of Deployable"
weight: 5
description: >
  Automated criteria that determine when a change is ready for production.
---

## Definition

The "definition of deployable" is your organization's agreed-upon set of non-negotiable quality criteria that every artifact must pass before it can be deployed to any environment. This definition should be automated, enforced by the pipeline, and treated as the authoritative verdict on whether a change is ready for deployment.

## Key Principles

1. **Pipeline is definitive**: If the pipeline passes, the artifact is deployable - no exceptions
2. **Automated validation**: All criteria are checked automatically, not manually
3. **Consistent across environments**: The same standards apply whether deploying to test or production
4. **Fails fast**: The pipeline rejects artifacts that do not meet the standard immediately

## What Should Be in Your Definition

Your definition of deployable should include automated checks for:

- **Security**: SAST scans, dependency vulnerability scans, secret detection
- **Functionality**: Unit tests, integration tests, end-to-end tests, regression tests
- **Compliance**: Audit trails, policy as code, change documentation
- **Performance**: Response time thresholds, load test baselines, resource utilization
- **Reliability**: Health check validation, graceful degradation tests, rollback verification
- **Code quality**: Linting, static analysis, complexity metrics

## What Is Improved

- **Removes bottlenecks**: No waiting for manual approval meetings
- **Increases quality**: Automated checks catch more issues than manual reviews
- **Reduces cycle time**: Deployable artifacts are identified in minutes, not days
- **Improves collaboration**: Shared understanding of quality standards
- **Enables continuous delivery**: Trust in the pipeline makes frequent deployments safe

## Migration Guidance

For detailed guidance on defining what "deployable" means for your organization, see:

- [Deployable Definition](../../migrate-to-cd/migration-path/pipeline/deployable-definition/) - Phase 2 pipeline practice with progressive quality gates, context-specific definitions, and getting started steps

## Additional Resources

- [Dave Farley: Real Example of a Deployment Pipeline in the Fintech Industry](https://www.youtube.com/watch?v=bHKHdp4H-8w)
- [Continuous Delivery: The Deployment Pipeline](https://www.informit.com/articles/article.aspx?p=1621865)
- [Accelerate](https://itrevolution.com/articles/accelerate-book/) - Nicole Forsgren, Jez Humble, Gene Kim
