---
aliases:
  - /docs/symptoms/slow-pipelines/
title: "Pipelines Take Too Long"
linkTitle: "Slow pipelines"
description: >
  CI/CD pipelines take 30 minutes or more. Developers stop waiting and lose the feedback loop.
tags:
  - test-strategy
  - deployment-automation
  - batch-size
---

## What you are seeing

A developer pushes a commit and waits. Thirty minutes pass. An hour. The pipeline is still
running. The developer context-switches to another task, and by the time the pipeline finishes
(or fails), they have moved on mentally. If the build fails, they must reload context, figure out
what went wrong, fix it, push again, and wait another 30 minutes.

Developers stop running the full test suite locally because it takes too long. They push and hope.
Some developers batch multiple changes into a single push to avoid waiting multiple times, which
makes failures harder to diagnose. Others skip the pipeline entirely for small changes and merge
with only local verification.

The pipeline was supposed to provide fast feedback. Instead, it provides slow feedback that
developers work around rather than rely on.

## Common causes

### Inverted Test Pyramid

When most of the test suite consists of end-to-end or integration tests rather than unit tests,
the pipeline is dominated by slow, resource-intensive test execution. E2E tests launch browsers,
spin up services, and wait for network responses. A test suite with thousands of unit tests (that
run in seconds) and a small number of targeted E2E tests is fast. A suite with hundreds of E2E
tests and few unit tests is slow by construction.

**Read more:** [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/)

### Snowflake Environments

When pipeline environments are not standardized or reproducible, builds include extra time for
environment setup, dependency installation, and configuration. Caching is unreliable because the
environment state is unpredictable. A pipeline that spends 15 minutes downloading dependencies
because there is no reliable cache layer is slow for infrastructure reasons, not test reasons.

**Read more:** [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/)

### Tightly Coupled Monolith

When the codebase has no clear module boundaries, every change triggers a full rebuild and a full
test run. The pipeline cannot selectively build or test only the affected components because the
dependency graph is tangled. A change to one module might affect any other module, so the pipeline
must verify everything.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Manual Regression Testing Gates

When the pipeline includes a manual testing phase, the wall-clock time from push to green
includes human wait time. A pipeline that takes 10 minutes to build and test but then waits two
days for manual sign-off is not a 10-minute pipeline. It is a two-day pipeline with a 10-minute
automated prefix.

**Read more:** [Manual Regression Testing Gates](../../anti-patterns/testing/manual-regression-testing-gates/)

## How to narrow it down

1. **What percentage of pipeline time is spent running tests?** If test execution dominates and
   most tests are E2E or integration tests, the test strategy is the bottleneck. Start with
   [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/).
2. **How much time is spent on environment setup and dependency installation?** If the pipeline
   spends significant time on infrastructure before any tests run, the build environment is the
   bottleneck. Start with
   [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/).
3. **Can the pipeline build and test only the changed components?** If every change triggers a
   full rebuild, the architecture prevents selective testing. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
4. **Does the pipeline include any manual steps?** If a human must approve or act before the
   pipeline completes, the human is the bottleneck. Start with
   [Manual Regression Testing Gates](../../anti-patterns/testing/manual-regression-testing-gates/).
