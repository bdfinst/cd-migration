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

A developer runs the tests locally and they pass. They push to [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) and the same tests fail. Or the
CI [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) is green but the tests fail in the staging environment. A code defect does not cause
these failures. Differences between environments cause them: a different OS version, database
version, or timezone setting. A missing environment variable or a service that is available
locally but not in CI has the same effect.

The developer spends time debugging the failure and discovers the root cause is environmental, not
logical. They add a workaround (skip the test in CI, add an environment check, adjust a timeout)
and move on. These workarounds accumulate over time. The test suite becomes littered with
environment-specific conditionals and skipped tests.

The team loses confidence in the test suite because results depend on where the tests run rather
than whether the code is correct.

## Common causes

### Snowflake environments

When people configure each environment by hand and maintain it independently, the environments
drift apart over time. The developer's laptop has one version of a database driver. The CI server
has another. The staging environment has a third. These differences stay invisible until a test
exercises a code path that behaves differently across versions.

Do not harmonize configurations manually, because they will drift again. Provision all
environments from the same infrastructure code.

**Read more:** [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}})

### Manual deployments

When deployment and environment setup are manual processes, subtle differences creep in. One
developer installed a dependency a particular way. A different person configured the CI server
with slightly different settings. Someone set up the staging environment months ago and nobody
has updated it. Manual processes are never identical twice, and the variance causes environment-
dependent behavior.

**Read more:** [Manual Deployments]({{< relref "/docs/anti-patterns/pipeline/manual-deployments" >}})

### Tightly coupled monolith

Some applications have hidden dependencies on external state, such as filesystem paths, network
services, or system configuration. Tests for these applications work in one environment and fail
in another because the external state differs. Well-isolated code with explicit dependencies is portable across
environments. Tightly coupled code that reaches into its environment for implicit dependencies is
fragile.

**Read more:** [Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

### Environment branches

When each environment deploys from its own long-lived branch, tests can pass on one environment's branch and fail on another because the code differs, not just the setup. The merged code carries a different mix of features and config than the branch that was tested.

**Read more:** [Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}})

## How to narrow it down

1. **Are all environments provisioned from the same infrastructure code?** If not, environment
   drift is the most likely cause. Start with
   [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}).
2. **Are environment setup and configuration manual?** If different people configured different
   environments, the variance is a direct result of manual processes. Start with
   [Manual Deployments]({{< relref "/docs/anti-patterns/pipeline/manual-deployments" >}}).
3. **Do the failing tests depend on external services, filesystem paths, or system
   configuration?** If tests assume specific external state rather than declaring explicit
   dependencies, the code's coupling to its environment is the issue. Start with
   [Tightly Coupled Monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}).
4. **Does each environment deploy from its own long-lived branch?** If the failing environment
   runs a branch that differs from the one where tests passed, start with
   [Environment Branches]({{< relref "/docs/anti-patterns/branching-integration/environment-branches" >}}).

---

**Ready to fix this?** The most common cause is [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments#how-to-fix-it" >}}) section for week-by-week steps.

## Related content

- [Tests Randomly Pass or Fail]({{< relref "/docs/symptoms/testing/flaky-tests" >}}) - Environment differences are a common cause of flaky tests
- [It Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}) - The same root cause affects both testing and development
- [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}) - Eliminating environment variance
- [Production-Like Environments]({{< relref "/docs/pipeline/production-like-environments" >}}) - Making all environments consistent
- [Environments Run Different Code]({{< relref "/docs/symptoms/deployment/environments-run-different-code" >}}) - When each environment runs different code, not just different settings
- [Testing Fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}}) - Designing tests that are environment-independent
