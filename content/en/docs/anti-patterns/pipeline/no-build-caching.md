---
title: "No Build Caching or Optimization"
linkTitle: "No Build Caching or Optimization"
weight: 48
category: "Pipeline & Infrastructure"
risk_level: medium
description: >
  Every build starts from scratch, downloading dependencies and recompiling unchanged code on every run.
tags:
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

Every time a developer pushes a commit, the pipeline downloads the entire dependency tree from
scratch. Maven pulls every JAR from the repository. npm fetches every package from the registry.
The compiler reprocesses every source file regardless of whether it changed. A build that could
complete in two minutes takes fifteen because the first twelve are spent re-acquiring things the
pipeline already had an hour ago.

Nobody optimized the pipeline when it was set up because "we can fix that later." Later never
arrived. The build is slow, but it works, and slowing down is so gradual that nobody identifies
it as the crisis it is. New modules get added, new dependencies arrive, and the build grows from
fifteen minutes to thirty to forty-five. Engineers start doing other things while the pipeline
runs. Context switching becomes habitual. The slow pipeline stops being a pain point and starts
being part of the culture.

The problem compounds at scale. When ten developers are all pushing commits, ten pipelines are
all downloading the same packages from the same registries at the same time. The network is
saturated. Builds queue behind each other. A commit pushed at 9:00 AM might not have results
until 9:50. The feedback loop that the pipeline was supposed to provide - fast signal on whether
the code works - stretches to the point of uselessness.

Common variations:

- **No dependency caching.** Package managers download every dependency from external registries
  on every build. No cache layer is configured in the pipeline tool. External registry outages
  cause build failures that have nothing to do with the code.
- **Full recompilation.** The build system does not track which source files changed and
  recompiles everything. Language-level incremental compilation is disabled or not configured.
- **No layer caching for containers.** Docker builds always start from the base image. Layers
  that rarely change (OS packages, language runtimes, common libraries) are rebuilt on every
  run rather than reused.
- **No artifact reuse across pipeline stages.** Each stage of the pipeline re-runs the build
  independently. The test stage compiles the code again instead of using the artifact the build
  stage already produced.
- **No build caching for test infrastructure.** Test database schemas are re-created from
  scratch on every run. Test fixture data is regenerated rather than persisted.

The telltale sign: a developer asks "is the build done yet?" and the honest answer is "it's been
running for twenty minutes but we should have results in another ten or fifteen."

## Why This Is a Problem

Slow pipelines are not merely inconvenient. They change behavior in ways that accumulate into
serious delivery problems. When feedback is slow, developers adapt by reducing how often they
seek feedback - which means defects go longer before detection.

### It reduces quality

A 45-minute pipeline means a developer who pushed at 9:00 AM does not learn about a failing test until 9:45, by which time they have moved on and must reconstruct the context to fix it. The value of a CI pipeline comes from its speed. A pipeline that reports results in five minutes
gives developers information while the change is still fresh in their minds. They can fix a
failing test immediately, while they still understand the code they just wrote. A pipeline that
takes forty-five minutes delivers results after the developer has context-switched into completely
different work.

When pipeline results arrive forty-five minutes later, fixing failures is harder. The developer
must remember what they changed, why they changed it, and what state the system was in when they
pushed. That context reconstruction takes time and is error-prone. Some developers stop reading
pipeline notifications at all, letting failures accumulate until someone complains that the build
is broken.

Long builds also discourage the fine-grained commits that make debugging easy. If each push
triggers a forty-five-minute wait, developers batch changes to reduce the number of pipeline
runs. Instead of pushing five small commits, they push one large one. When that large commit
fails, the cause is harder to isolate. The quality signal becomes coarser at exactly the moment
it needs to be precise.

### It increases rework

Slow pipelines inflate the cost of every defect. A bug caught five minutes after it was
introduced costs minutes to fix. A bug caught forty-five minutes later, after the developer has
moved on, costs that context-switching overhead plus the debugging time plus the time to re-run
the pipeline to verify the fix. Slow pipelines do not make bugs cheaper to find - they make
them dramatically more expensive.

At the team level, slow pipelines create merge queues. When a build takes thirty minutes, only
two or three pipelines can complete per hour. A team of ten developers trying to merge throughout
the day creates a queue. Commits wait an hour or more to receive results. Developers who merge
late discover their changes conflict with merges that completed while they were waiting. Conflict
resolution adds more rework. The merge queue becomes a daily frustration that consumes hours
of developer attention.

Flaky external dependencies add another source of rework. When builds download packages from
external registries on every run, they are exposed to registry outages, rate limits, and
transient network errors. These failures are not defects in the code, but they require the
same response: investigate the failure, determine the cause, re-trigger the build. A build
that fails due to a rate limit on the npm registry is pure waste.

### It makes delivery timelines unpredictable

Pipeline speed is a factor in every delivery estimate. If the pipeline takes forty-five minutes
per run and a feature requires a dozen iterations to get right, the pipeline alone consumes nine
hours of calendar time - and that assumes no queuing. Add pipeline queues during busy hours
and the actual calendar time is worse.

This makes delivery timelines hard to predict because pipeline duration is itself variable.
A build that usually takes twenty minutes might take forty-five when registries are slow. It
might take an hour when the build queue is backed up. Developers learn to pad their estimates
to account for pipeline overhead, but the padding is imprecise because the overhead is
unpredictable.

Teams working toward faster release cadences hit a ceiling imposed by pipeline duration.
Deploying multiple times per day is impractical when each pipeline run takes forty-five minutes.
The pipeline's slowness constrains deployment frequency and therefore constrains everything that
depends on deployment frequency: feedback from users, time-to-fix for production defects,
ability to respond to changing requirements.

### Impact on continuous delivery

The pipeline is the primary mechanism of continuous delivery. Its speed determines how quickly
a change can move from commit to production. A slow pipeline is a slow pipeline at every stage
of the delivery process: slower feedback to developers, slower verification of fixes, slower
deployment of urgent changes.

Teams that optimize their pipelines consistently find that deployment frequency increases
naturally afterward. When a commit can go from push to production validation in ten minutes
rather than forty-five, deploying frequently becomes practical rather than painful. The slow
pipeline is often not the only barrier to CD, but it is frequently the most visible one and
the one that yields the most immediate improvement when addressed.

## How to Fix It

### Step 1: Measure current build times by stage (Week 1)

Measure before optimizing. Understand where the time goes:

1. Pull build time data from the pipeline tool for the last 30 days.
2. Break down time by stage: dependency download, compilation, unit tests, integration tests,
   packaging, and any other stages.
3. Identify the top two or three stages by elapsed time.
4. Check whether build times have been growing over time by comparing last month to three months
   ago.

This baseline makes it possible to measure improvement. It also reveals whether the slow stage
is dependency download (fixable with caching), compilation (fixable with incremental builds),
or tests (a different problem requiring test optimization).

### Step 2: Add dependency caching to the pipeline (Week 1-2)

Enable dependency caching. Most CI/CD platforms have built-in support:

- For Maven: cache `~/.m2/repository`. Use the `pom.xml` hash as the cache key so the cache
  invalidates when dependencies change.
- For npm: cache `node_modules` or the npm cache directory. Use `package-lock.json` as the
  cache key.
- For Gradle: cache `~/.gradle/caches`. Use the Gradle wrapper version and `build.gradle`
  hash as the cache key.
- For Docker: enable BuildKit layer caching. Structure Dockerfiles so rarely-changing layers
  (base image, system packages, language runtime) come before frequently-changing layers
  (application code).

Dependency caching is typically the highest-return optimization and the easiest to implement.
A build that downloads 200 MB of packages on every run can drop to downloading nothing on
cache hits.

### Step 3: Enable incremental compilation (Weeks 2-3)

If compilation is a major time sink, ensure the build tool is configured for incremental builds:

- Java with Maven: use the `-am` flag to build only changed modules in multi-module projects.
  Enable incremental compilation in the compiler plugin configuration.
- Java with Gradle: incremental compilation is on by default. Verify it has not been disabled
  in build configuration. Enable the build cache for task output reuse.
- Node.js: use `--cache` flags for transpilers like Babel and TypeScript. TypeScript's
  `incremental` flag writes `.tsbuildinfo` files that skip unchanged files.

Verify that incremental compilation is actually working by pushing a trivial change (a comment
edit) and checking whether the build is faster than a full build.

### Step 4: Parallelize independent pipeline stages (Weeks 2-3)

Review the pipeline for stages that are currently sequential but could run in parallel:

- Unit tests and static analysis do not depend on each other. Run them simultaneously.
- Container builds for different services in a monorepo can run in parallel.
- Different test suites (fast unit tests, slower integration tests) can run in parallel with
  integration tests starting after unit tests pass.

Most modern pipeline tools support parallel stage execution. The improvement depends on how
many independent stages exist, but it is common to cut total pipeline time by 30-50% by
parallelizing work that was previously serialized by default.

### Step 5: Move slow tests to a later pipeline stage (Weeks 3-4)

Not all tests need to run before every deployment decision. Reorganize tests by speed:

1. Fast tests (unit tests, component tests under one second each) run on every push and must
   pass before merging.
2. Medium tests (integration tests, API tests) run after merge, gating deployment to staging.
3. Slow tests (full end-to-end browser tests, load tests) run on a schedule or as part of
   the release validation stage.

This does not eliminate slow tests - it moves them to a position where they are not blocking
the developer feedback loop. The developer gets fast results from the fast tests within
minutes, while the slow tests run asynchronously.

### Step 6: Set a pipeline duration budget and enforce it (Ongoing)

Establish an agreed-upon maximum pipeline duration for the developer feedback stage - ten
minutes is a common target - and treat any build that exceeds it as a defect to be fixed:

1. Add build duration as a metric tracked on the team's improvement board.
2. Assign ownership when a new dependency or test causes the pipeline to exceed the budget.
3. Review the budget quarterly and tighten it as optimization improves the baseline.

| Objection | Response |
|-----------|----------|
| "Caching is risky - we might use stale dependencies" | Cache keys solve this. When the dependency manifest changes, the cache key changes and the cache is invalidated. The cache is only reused when nothing in the dependency specification has changed. |
| "Our build tool doesn't support caching" | Check again. Maven, Gradle, npm, pip, Go modules, and most other package managers have caching support in all major CI platforms. The configuration is usually a few lines. |
| "The pipeline runs in Docker containers so there is no persistent cache" | Most CI platforms support external cache storage (S3 buckets, GCS buckets, NFS mounts) that persists across container-based builds. Docker BuildKit can pull layer cache from a registry. |
| "We tried parallelizing and it caused intermittent failures" | Intermittent failures from parallelization usually indicate tests that share state (a database, a filesystem path, a port). Fix the test isolation rather than abandoning parallelization. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Pipeline stage duration - dependency download | Should drop to near zero on cache hits |
| Pipeline stage duration - compilation | Should drop after incremental compilation is enabled |
| Total pipeline duration | Should reach the team's agreed budget (often 10 minutes or less) |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as faster pipelines reduce wait time in the delivery flow |
| [Lead time](../../../metrics/lead-time/) | Should decrease as pipeline bottlenecks are removed |
| [Integration frequency](../../../metrics/integration-frequency/) | Should increase as the cost of each integration drops |

## Related Content

- [Pipeline Architecture](../../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - Structuring the pipeline so slow stages do not block fast feedback
- [Deterministic Pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - Caching and parallelism must not introduce non-determinism
- [Build Automation](../../../migrate-to-cd/migration-path/foundations/build-automation/) - Reliable build automation is the foundation that caching is built on
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Using build time data to prioritize optimization work
