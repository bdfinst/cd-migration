---
aliases:
  - /docs/symptoms/ml-pipeline-deployment-gaps/
title: "Data Pipelines and ML Models Have No Deployment Automation"
linkTitle: "Data and ML deployment gaps"
description: >
  Application code has a CI/CD pipeline, but ML models and data pipelines are deployed manually or on an ad hoc schedule.
tags:
  - deployment-automation
  - test-strategy
---

## What you are seeing

ML models and data [pipelines](../../glossary/#pipeline) are deployed manually while application code has a full [CI](../../glossary/#ci-continuous-integration)/[CD](../../glossary/#cd-continuous-delivery) pipeline. When a developer pushes a change to the application, tests run, an [artifact](../../glossary/#artifact) is built, and deployment promotes automatically through environments. But the ML model that drives the product's recommendations was trained two months ago and deployed by a data scientist who ran a Python script from their laptop. Nobody knows which version of the model is in production or what training data it was built on.

Data pipelines have a similar problem. The ETL job that populates the feature store was written in a Jupyter notebook, runs on a schedule via a cron job on a single server, and is updated by manually copying a new version to the server when it changes. There is no version control for the notebook, no automated tests for the pipeline logic, and no staging environment where the pipeline can be validated before it runs against production data.

## Common causes

### Missing deployment pipeline

The pipeline infrastructure that handles application deployments was not extended to cover model artifacts and data pipelines. Extending it requires ML-aware tooling - model registries, data versioning, training pipelines - that must be built or configured separately from standard application pipeline tools.

Establishing basic practices first - version control for pipeline code, a model registry with version tracking, automated tests for pipeline logic - creates the foundation. A minimal pipeline that validates data pipeline changes before production deployment closes the gap between how application code and model artifacts are treated, removing the dual delivery standard.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Manual deployments

The default for ML work is manual because the discipline of ML operations is younger than software deployment automation. Without deliberate investment in model deployment automation, manual remains the default: a data scientist deploys a model by running a script, updating a config file, or copying files to a server.

Applying the same deployment automation principles to model deployment - versioned artifacts, automated promotion, health checks after deployment - closes the gap between ML and application delivery standards.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Knowledge silos

Model deployment and data pipeline operations often live with specific individuals who have the expertise and the access to execute them. When those people are unavailable, model retraining, pipeline updates, and deployment operations cannot happen. The knowledge of how the ML infrastructure works is not distributed.

Documenting deployment procedures, building runbooks for model [rollback](../../glossary/#rollback), and cross-training team members on data infrastructure operations distributes the knowledge before automation is in place.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Is the currently deployed model version tracked in version control with a record of when it was deployed?** If not, there is no audit trail for model deployments. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Can any engineer deploy an updated model or data pipeline, or does it require a specific person?** If specific expertise is required, the knowledge is siloed. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
3. **Are data pipeline changes validated in a non-production environment before running against production data?** If not, data pipeline changes go directly to production without validation. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).

**Ready to fix this?** The most common cause is [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/). Start with its [How to Fix It](../../anti-patterns/pipeline/missing-deployment-pipeline/#how-to-fix-it) section for week-by-week steps.
