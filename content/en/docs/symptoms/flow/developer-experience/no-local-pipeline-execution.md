---
aliases:
  - /docs/symptoms/no-local-pipeline-execution/
title: "Developers Cannot Run the Pipeline Locally"
linkTitle: "No local pipeline execution"
description: >
  The only way to know if a change passes CI is to push it and wait. Broken builds are discovered after commit, not before.
tags:
  - deployment-automation
  - test-strategy
---

## What you are seeing

A developer makes a change, commits, and pushes to [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}). Thirty minutes later, the build is red. A linting rule was violated. Or a test file was missing from the commit. Or the build script uses a different version of a dependency than the developer's local machine. The developer fixes the issue and pushes again. Another wait. Another failure - this time a test that only runs in CI and not in the local test suite.

This cycle destroys focus. The developer cannot stay in flow waiting for CI results. They switch to something else, then switch back when the notification arrives. Each context switch adds recovery time. A change that took thirty minutes to write takes two hours from first commit to green build, and the developer was not thinking about it for most of that time.

The deeper issue is that CI and local development are different environments. Tests that pass locally fail in CI because of dependency version differences, missing environment variables, or test execution order differences. The developer cannot reproduce CI failures locally, which makes them much harder to debug and creates a pattern of "push and hope" rather than "validate locally and push with confidence."

## Common causes

### Missing deployment pipeline

[Pipelines]({{< relref "/docs/reference/glossary#pipeline" >}}) designed for cloud-only execution - pulling from private [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) repositories, requiring CI-specific secrets, using platform-specific compute resources - cannot run locally by construction. The pipeline was designed for the CI environment and only the CI environment.

Pipelines designed with local execution in mind use tools that run identically in any environment: containerized build steps, locally runnable test commands, shared dependency resolution. A developer running the same commands locally that the pipeline runs in CI gets the same results. The feedback loop shrinks from 30 minutes to seconds.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

### Snowflake environments

When the CI environment differs from the developer's local environment in ways that affect test outcomes, local and CI results diverge. Different OS versions, different dependency caches, different environment variables, different file system behaviors - any of these can cause tests to pass locally and fail in CI.

Standardized, code-defined environments that run identically locally and in CI eliminate the divergence. If the build step runs inside the same container image locally and in CI, the results are the same.

**Read more:** [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}})

## How to narrow it down

1. **Can a developer run every pipeline step locally?** If any step requires CI-specific infrastructure, secrets, or platform features, that step cannot be validated before pushing. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
2. **Do tests produce different results locally versus in CI?** If yes, the environments differ in ways that affect test outcomes. Start with [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}).
3. **How long does a developer wait between push and feedback?** If feedback takes more than a few minutes, the incentive is to batch pushes and work on something else while waiting. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).

**Ready to fix this?** The most common cause is [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline#how-to-fix-it" >}}) section for week-by-week steps.
