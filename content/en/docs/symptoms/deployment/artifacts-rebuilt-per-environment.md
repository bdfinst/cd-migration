---
aliases:
  - /docs/symptoms/artifacts-rebuilt-per-environment/
title: "The Build Runs Again for Every Environment"
linkTitle: "Artifacts rebuilt per environment"
description: >
  Build outputs are discarded and rebuilt for each environment. Production is not running the artifact that was tested.
tags:
  - deployment-automation
  - environment-consistency
---

## What you are seeing

The build runs in dev, produces an [artifact]({{< relref "/docs/reference/glossary#artifact" >}}), and tests run against it. Then the artifact is discarded and a new build runs for the staging branch. The staging artifact is tested, then discarded. A third build runs from the production branch, and that artifact gets deployed. The team has no way to verify that the artifact deployed to production is equivalent to the one that was tested in staging.

The problem is subtle until it causes an incident. A build that includes a library version cached in the dev builder but not in the staging builder. A build that captures a slightly different git state because a commit was made between the staging and production builds. An environment variable baked into the build artifact that differs between environments. These differences are usually invisible - until they cause a failure in production that cannot be reproduced anywhere else.

The team treats this as normal because "it has always worked this way." The process was designed when builds were simple and deterministic. As dependencies, build tooling, and environment configurations have grown more complex, the assumption of build equivalence has become increasingly unreliable.

## Common causes

### Snowflake environments

When build environments differ between stages - different OS versions, cached dependency states, or tool versions - the same source code produces different artifacts in different environments. The "staging artifact" and the "production artifact" are built from nominally the same source but in environments with different characteristics.

Standardized build environments defined as code produce the same artifact from the same source, regardless of where the build runs. When the dev, staging, and production builds all run in the same container with the same pinned dependencies, the team can verify equivalence. The team no longer has to assume it. The production failure that could not be reproduced elsewhere becomes reproducible because the environments are no longer different in invisible ways.

**Read more:** [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}})

### Missing deployment pipeline

A [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) that promotes a single artifact through environments eliminates the per-environment rebuild entirely. The artifact is built once, assigned a version identifier, stored in an artifact registry, and deployed to each environment in sequence. The artifact that reaches production is exactly the artifact that was tested.

Without a pipeline with artifact promotion, rebuilding per environment is the natural default. Each environment has its own build process, and the relationship between artifacts built for different environments is assumed rather than guaranteed.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

### Environment branches

When each environment deploys from its own long-lived branch, each branch gets its own build. The dev, staging, and production artifacts come from different branch histories, so the rebuild is built into the workflow. Merging to the next branch triggers a new build of code that was never combined this way before, and the earlier test results do not carry over.

Building once from trunk and promoting that artifact removes the reason to rebuild. Each environment receives the same artifact and differs only in configuration supplied at deploy time.

**Read more:** [Environment branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}})

## How to narrow it down

1. **Is a separate build triggered for each environment?** If staging and production builds run independently, the artifacts are not guaranteed to be equivalent. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
2. **Are the build environments for each stage identical?** If dev, staging, and production builds run on differently configured machines, the same source produces different artifacts. Start with [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}).
3. **Can the team trace the exact artifact version in production back to a specific test run?** If not, there is no artifact provenance and no guarantee of what was tested. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
4. **Does each environment deploy from its own long-lived branch?** If dev, staging, and production each have a branch that changes are merged into, each merge triggers a new build. Start with [Environment branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}).

**Ready to fix this?** The most common cause is [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline#how-to-fix-it" >}}) section for week-by-week steps.

---

## Related content

- [Environments Run Different Code]({{< relref "/docs/symptoms/deployment/environments-run-different-code" >}}) - Code differs between environments, often because each deploys from its own branch
