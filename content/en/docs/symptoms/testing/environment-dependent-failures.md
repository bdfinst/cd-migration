---
aliases:
  - /docs/symptoms/environment-dependent-failures/
title: "Tests Pass in One Environment but Fail in Another"
linkTitle: "Environment-dependent test failures"
description: >
  Tests pass locally but fail in CI, or pass in CI but fail in staging. Environment differences
  cause unpredictable failures.
tags:
  - environment-consistency
  - test-strategy
---

## What you are seeing

A developer runs the tests locally and they pass. They push to CI and the same tests fail. Or the
CI pipeline is green but the tests fail in the staging environment. The failures are not caused by
a code defect. They are caused by differences between environments: a different OS version, a
different database version, a different timezone setting, a missing environment variable, or a
service that is available locally but not in CI.

The developer spends time debugging the failure and discovers the root cause is environmental, not
logical. They add a workaround (skip the test in CI, add an environment check, adjust a timeout)
and move on. The workaround accumulates over time. The test suite becomes littered with
environment-specific conditionals and skipped tests.

The team loses confidence in the test suite because results depend on where the tests run rather
than whether the code is correct.

## Common causes

### Snowflake Environments

When each environment is configured by hand and maintained independently, they drift apart over
time. The developer's laptop has one version of a database driver. The CI server has another. The
staging environment has a third. These differences are invisible until a test exercises a code
path that behaves differently across versions. The fix is not to harmonize configurations manually
(they will drift again) but to provision all environments from the same infrastructure code.

**Read more:** [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/)

### Manual Deployments

When deployment and environment setup are manual processes, subtle differences creep in. One
developer installed a dependency a particular way. The CI server was configured by a different
person with slightly different settings. The staging environment was set up months ago and has not
been updated. Manual processes are never identical twice, and the variance causes environment-
dependent behavior.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

### Tightly Coupled Monolith

When the application has hidden dependencies on external state (filesystem paths, network
services, system configuration), tests that work in one environment fail in another because the
external state differs. Well-isolated code with explicit dependencies is portable across
environments. Tightly coupled code that reaches into its environment for implicit dependencies is
fragile.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

## How to narrow it down

1. **Are all environments provisioned from the same infrastructure code?** If not, environment
   drift is the most likely cause. Start with
   [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/).
2. **Are environment setup and configuration manual?** If different people configured different
   environments, the variance is a direct result of manual processes. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Do the failing tests depend on external services, filesystem paths, or system
   configuration?** If tests assume specific external state rather than declaring explicit
   dependencies, the code's coupling to its environment is the issue. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
