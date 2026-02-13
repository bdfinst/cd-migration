---
title: "Deterministic Pipeline"
draft: true
linkTitle: "Deterministic Pipeline"
weight: 2
description: >
  The same inputs to the pipeline always produce the same outputs.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

A deterministic pipeline produces consistent, repeatable results. Given the same commit,
the same environment definition, and the same configuration, the pipeline will build the
same artifact, run the same tests, and produce the same outcome - every time. There is no
variance introduced by uncontrolled dependencies, environmental drift, manual
intervention, or non-deterministic test behavior.

Determinism is what transforms a pipeline from "a script that usually works" into a
reliable delivery system. When the pipeline is deterministic, a green build means
something. A failed build points to a real problem. Teams can trust the signal.

## Why It Matters for CD Migration

Non-deterministic pipelines are the single largest source of wasted time in delivery
organizations. When builds fail randomly, teams learn to ignore failures. When the same
commit passes on retry, teams stop investigating root causes. When different environments
produce different results, teams lose confidence in pre-production validation.

During a CD migration, teams are building trust in automation. Every flaky test, every
"works on my machine" failure, and every environment-specific inconsistency erodes that
trust. A deterministic pipeline is what earns the team's confidence that automation can
replace manual verification.

## Key Principles

### Version control everything

Every input to the pipeline must be version controlled:

- **Application source code** - the obvious one
- **Infrastructure as Code** - the environment definitions themselves
- **Pipeline definitions** - the CI/CD configuration files
- **Test data and fixtures** - the data used by automated tests
- **Dependency lockfiles** - exact versions of every dependency (e.g., `package-lock.json`, `Pipfile.lock`, `go.sum`)
- **Tool versions** - the versions of compilers, runtimes, linters, and build tools

If an input to the pipeline is not version controlled, it can change without notice, and
the pipeline is no longer deterministic.

### Lock dependency versions

Floating dependency versions (version ranges, "latest" tags) are a common source of
non-determinism. A build that worked yesterday can break today because a transitive
dependency released a new version overnight.

Use lockfiles to pin exact versions of every dependency. Commit lockfiles to version
control. Update dependencies intentionally through pull requests, not implicitly through
builds.

### Eliminate environmental variance

The pipeline should run in a controlled, reproducible environment. Containerize build
steps so that the build environment is defined in code and does not drift over time. Use
the same base images in CI as in production. Pin tool versions explicitly rather than
relying on whatever is installed on the build agent.

### Remove human intervention

Any manual step in the pipeline is a source of variance. A human choosing which tests to
run, deciding whether to skip a stage, or manually approving a step introduces
non-determinism. The pipeline should run from commit to deployment without human
decisions.

This does not mean humans have no role - it means the pipeline's behavior is fully
determined by its inputs, not by who is watching it run.

### Fix flaky tests immediately

A flaky test is a test that sometimes passes and sometimes fails for the same code. Flaky
tests are the most insidious form of non-determinism because they train teams to distrust
the test suite.

When a flaky test is detected, the response must be immediate:

1. **Quarantine the test** - remove it from the pipeline so it does not block other changes
2. **Fix it or delete it** - flaky tests provide negative value; they are worse than no test
3. **Investigate the root cause** - flakiness often indicates a real problem (race conditions, shared state, time dependencies, external service reliance)

Never allow a culture of "just re-run it" to take hold. Every re-run masks a real problem.

## Anti-Patterns

### Unpinned dependencies

Using version ranges like `^1.2.0` or `>=2.0` in dependency declarations without a
lockfile means the build resolves different versions on different days. This applies to
application dependencies, build plugins, CI tool versions, and base container images.

### Shared, mutable build environments

Build agents that accumulate state between builds (cached files, installed packages,
leftover containers) produce different results depending on what ran previously. Each
build should start from a clean, known state.

### Tests that depend on external services

Tests that call live external APIs, depend on shared databases, or rely on network
resources introduce uncontrolled variance. External services change, experience outages,
and respond with different latency - all of which make the pipeline non-deterministic.

### Time-dependent tests

Tests that depend on the current time, current date, or elapsed time are inherently
non-deterministic. A test that passes at 2:00 PM and fails at midnight is not testing
your application - it is testing the clock.

### Manual retry culture

Teams that routinely re-run failed pipelines without investigating the failure have
accepted non-determinism as normal. This is a cultural anti-pattern that must be
addressed alongside the technical ones.

## Good Patterns

### Containerized build environments

Define your build environment as a container image. Pin the base image version. Install
exact versions of all tools. Run every build in a fresh instance of this container. This
eliminates variance from the build environment.

### Hermetic builds

A hermetic build is one that does not access the network during the build process. All
dependencies are pre-fetched and cached. The build can run identically on any machine, at
any time, with or without network access.

### Contract tests for external dependencies

Replace live calls to external services with contract tests. These tests verify that your
code interacts correctly with an external service's API contract without actually calling
the service. Combine with service virtualization or test doubles for integration tests.

### Deterministic test ordering

Run tests in a fixed, deterministic order - or better, ensure every test is independent
and can run in any order. Many test frameworks default to random ordering to detect
inter-test dependencies; use this during development but ensure no ordering dependencies
exist.

### Immutable CI infrastructure

Treat CI build agents as cattle, not pets. Provision them from images. Replace them
rather than updating them. Never allow state to accumulate on a build agent between
pipeline runs.

## How to Get Started

### Step 1: Audit your pipeline inputs

List every input to your pipeline that is not version controlled. This includes
dependency versions, tool versions, environment configurations, test data, and pipeline
definitions themselves.

### Step 2: Add lockfiles and pin versions

For every dependency manager in your project, ensure a lockfile is committed to version
control. Pin CI tool versions explicitly. Pin base image versions in Dockerfiles.

### Step 3: Containerize the build

Move your build steps into containers with explicitly defined environments. This is often
the highest-leverage change for improving determinism.

### Step 4: Identify and fix flaky tests

Review your test history for tests that have both passed and failed for the same commit.
Quarantine them immediately and fix or remove them within a defined time window (such as
one sprint).

### Step 5: Monitor pipeline determinism

Track the rate of pipeline failures that are resolved by re-running without code changes.
This metric (sometimes called the "re-run rate") directly measures non-determinism. Drive
it to zero.

## Connection to the Pipeline Phase

Determinism is what gives the [single path to production](../single-path-to-production/)
its authority. If the pipeline produces inconsistent results, teams will work around it.
A deterministic pipeline is also the prerequisite for a meaningful
[deployable definition](../deployable-definition/) - your quality gates are only as
reliable as the pipeline that enforces them.

When the pipeline is deterministic, [immutable artifacts](../immutable-artifacts/) become
trustworthy: you know that the artifact was built by a consistent, repeatable process, and
its validation results are real.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
