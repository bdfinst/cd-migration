---
title: "Deterministic Pipeline"
linkTitle: "Deterministic Pipeline"
weight: 2
description: >
  The same inputs to the pipeline always produce the same outputs.
---

{{% pageinfo %}}
**Phase 2 - Pipeline**
{{% /pageinfo %}}

## Definition

A deterministic [pipeline](../../../glossary/#pipeline) produces consistent, repeatable results. Given the same commit,
the same environment definition, and the same configuration, the pipeline will build the
same [artifact](../../../glossary/#artifact), run the same tests, and produce the same outcome - every time. There is no
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

During a [CD](../../../glossary/#cd-continuous-delivery) migration, teams are building trust in automation. Every flaky test, every
"works on my machine" failure, and every environment-specific inconsistency erodes that
trust. A deterministic pipeline is what earns the team's confidence that automation can
replace manual verification.

## Key Principles

### Version control everything

Every input to the pipeline must be version controlled:

- **Application source code** - the obvious one
- **Infrastructure as Code** - the environment definitions themselves
- **Pipeline definitions** - the pipeline configuration files
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
the same base images in [CI](../../../glossary/#ci-continuous-integration) as in production. Pin tool versions explicitly rather than
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

## Example: Non-Deterministic vs Deterministic Pipeline

Seeing anti-patterns and good patterns side by side makes the difference concrete.

### Anti-Pattern: Non-Deterministic Pipeline


{{% code-collapse title="Anti-pattern: non-deterministic pipeline with floating versions and manual steps" %}}
```yaml
# Bad: Uses floating versions
dependencies:
  nodejs: "latest"
  postgres: "14"  # No minor/patch version

# Bad: Relies on external state
test:
  - curl https://api.example.com/test-data
  - run_tests --use-production-data

# Bad: Time-dependent tests
test('shows current date', () => {
  expect(getDate()).toBe(new Date())  # Fails at midnight!
})

# Bad: Manual steps
deploy:
  - echo "Manually verify staging before approving"
  - wait_for_approval
```
{{% /code-collapse %}}

Results vary based on when the pipeline runs, what is in production, which dependency
versions are "latest," and human availability.

### Good Pattern: Deterministic Pipeline


{{% code-collapse title="Good pattern: deterministic pipeline with pinned versions and automated verification" %}}
```yaml
# Good: Pinned versions
dependencies:
  nodejs: "18.17.1"
  postgres: "14.9"

# Good: Version-controlled test data
test:
  - docker-compose up -d
  - ./scripts/seed-test-data.sh  # From version control
  - npm run test

# Good: Deterministic time handling
test('shows date', () => {
  const mockDate = new Date('2024-01-15')
  jest.useFakeTimers().setSystemTime(mockDate)
  expect(getDate()).toBe(mockDate)
})

# Good: Automated verification
deploy:
  - deploy_to_staging
  - run_smoke_tests
  - if: smoke_tests_pass
    deploy_to_production
```
{{% /code-collapse %}}

Same inputs always produce same outputs. Pipeline results are trustworthy and
reproducible.

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

## Tactical Patterns

### Immutable Build Containers

Define your build environment as a versioned container image with every dependency pinned:


{{% code-collapse title="Immutable build container: Dockerfile with pinned base image and tools" %}}
```dockerfile
# Dockerfile.build - version controlled
FROM node:18.17.1-alpine3.18

RUN apk add --no-cache \
    python3=3.11.5-r0 \
    make=4.4.1-r1

WORKDIR /app
COPY package-lock.json .
RUN npm ci --frozen-lockfile
```
{{% /code-collapse %}}

Every build runs inside a fresh instance of this image. No drift, no accumulated state.

### Dependency Lockfiles

Always use dependency lockfiles. This is essential for deterministic builds:


{{% code-collapse title="Dependency lockfile: package-lock.json with pinned exact versions" %}}
```json
// package-lock.json (ALWAYS commit to version control)
{
  "dependencies": {
    "express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-5/PsL6iGPdfQ/..."
    }
  }
}
```
{{% /code-collapse %}}

Rules for lockfiles:

- **Use `npm ci` in CI** (not `npm install`) - `npm ci` installs exactly what the lockfile specifies
- **Never add lockfiles to `.gitignore`** - they must be committed
- **Avoid version ranges in production dependencies** - no `^`, `~`, or `>=` without a lockfile enforcing exact resolution
- **Never rely on "latest" tags** for any dependency, base image, or tool

### Quarantine Pattern for Flaky Tests

When a flaky test is detected, move it to quarantine immediately. Do not leave it in the
main suite where it erodes trust in the pipeline:


{{% code-collapse title="Quarantine pattern: skip and annotate flaky tests with tracking info" %}}
```javascript
// tests/quarantine/flaky-test.spec.js
describe.skip('Quarantined: Flaky integration test', () => {
  // Quarantined due to intermittent timeout
  // Tracking issue: #1234
  // Fix deadline: 2024-02-01
  it('should respond within timeout', () => {
    // Test code
  })
})
```
{{% /code-collapse %}}

Quarantine is not a permanent home. Every quarantined test must have:

1. A tracking issue linked in the test file
2. A deadline for resolution (no more than one sprint)
3. A clear root cause investigation plan

If a quarantined test cannot be fixed by the deadline, delete it and write a better test.

### Hermetic Test Environments

Give each pipeline run a fresh, isolated environment with no shared state:


{{% code-collapse title="Hermetic test environment: GitHub Actions with fresh isolated database per run" %}}
```yaml
# GitHub Actions example
jobs:
  test:
    runs-on: ubuntu-22.04
    services:
      postgres:
        image: postgres:14.9
        env:
          POSTGRES_DB: testdb
          POSTGRES_PASSWORD: testpass
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      # Each workflow run gets a fresh database
```
{{% /code-collapse %}}

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

## FAQ

### What if a test is occasionally flaky but hard to reproduce?

This is still a problem. Flaky tests indicate either a real bug in your code (race
conditions, shared state) or a problem with your test (dependency on external state,
timing sensitivity). Both need to be fixed. Quarantine the test, investigate thoroughly,
and fix the root cause.

### Can we use retries to handle flaky tests?

Retries mask problems rather than fixing them. A test that passes on retry is hiding a
failure, not succeeding. Fix the flakiness instead of retrying.

### How do we handle tests that involve randomness?

Seed your random number generators with a fixed seed in tests:


{{% code-collapse title="Deterministic randomness: fixed seed for predictable test results" %}}
```javascript
// Deterministic randomness
const rng = new Random(12345) // Fixed seed
const result = shuffle(array, rng)
expect(result).toEqual([3, 1, 4, 2]) // Predictable
```
{{% /code-collapse %}}

### What if our deployment requires manual verification?

Manual verification can happen after deployment, not before. Deploy automatically based on
pipeline results, then verify in production using automated smoke tests or observability
tooling. If verification fails, roll back automatically.

### Should the pipeline ever be non-deterministic?

There are rare cases where controlled non-determinism is useful (chaos engineering, fuzz
testing), but these should be:

1. Explicitly designed and documented
2. Separate from the core deployment pipeline
3. Reproducible via saved seeds or recorded inputs

## Health Metrics

Track these metrics to measure your pipeline's determinism:

- **Test flakiness rate** - percentage of test runs that produce different results for the same commit. Target less than 1%, ideally zero.
- **Pipeline re-run rate** - percentage of pipeline failures resolved by re-running without code changes. This directly measures non-determinism. Target zero.
- **Time to fix flaky tests** - elapsed time from detection to resolution. Target less than one day.
- **Manual override rate** - how often someone manually approves, skips, or re-runs a stage. Target near zero.

## Connection to the Pipeline Phase

Determinism is what gives the [single path to production](../single-path-to-production/)
its authority. If the pipeline produces inconsistent results, teams will work around it.
A deterministic pipeline is also the prerequisite for a meaningful
[deployable definition](../deployable-definition/) - your quality gates are only as
reliable as the pipeline that enforces them.

When the pipeline is deterministic, [immutable artifacts](../immutable-artifacts/) become
trustworthy: you know that the artifact was built by a consistent, repeatable process, and
its validation results are real.

## Related Content

- [Flaky Tests](../../../symptoms/testing/flaky-tests/) - the most common source of non-determinism in pipelines
- [Environment-Dependent Failures](../../../symptoms/testing/environment-dependent-failures/) - failures caused by uncontrolled environmental variance
- [Slow Pipelines](../../../symptoms/flow/slow-pipelines/) - often worsened by re-runs of non-deterministic failures
- [Snowflake Environments](../../../anti-patterns/pipeline/snowflake-environments/) - an anti-pattern that introduces environmental variance into the pipeline
- [Immutable Artifacts](../immutable-artifacts/) - the Pipeline practice that depends on deterministic builds to be trustworthy
- [Build Duration](../../../metrics/build-duration/) - a metric directly affected by pipeline determinism and re-run rates
