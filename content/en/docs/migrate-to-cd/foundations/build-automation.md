---
title: "Build Automation"
linkTitle: "Build Automation"
weight: 3
description: >
  Automate your build process so a single command builds, tests, and packages your application.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

Build automation is the single-command loop that makes [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) possible. If you cannot build, test, and package with one command, you cannot automate your [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}).
{{% /pageinfo %}}

## What Build Automation Means

A single command (or CI trigger) executes the entire sequence from source code to [deployable]({{< relref "/docs/reference/glossary#deployable" >}}) [artifact]({{< relref "/docs/reference/glossary#artifact" >}}):

1. **Compile** the source code (if applicable)
2. **Run** all automated tests
3. **Package** the application into a deployable artifact (container image, binary, archive)
4. **Report** the result (pass or fail, with details)

No manual steps. No "run this script, then do that." No tribal knowledge about which flags to set or which order to run things. One command, every time, same result.

### The Litmus Test

Ask yourself: *"Can a new team member clone the repository and produce a deployable artifact with a single command within 15 minutes?"*

If the answer is no, your build is not fully automated.

## Why Build Automation Matters for CD

Without build automation, every other practice in this guide breaks down. You cannot have continuous integration if the build requires manual intervention. You cannot have a deterministic pipeline if the build produces different results depending on who runs it.

| [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) Requirement | How Build Automation Supports It |
|----------------|----------------------------------|
| **Reproducibility** | The same commit always produces the same artifact, on any machine |
| **Speed** | Automated builds can be optimized, cached, and parallelized |
| **Confidence** | If the build passes, the artifact is trustworthy |
| **Developer experience** | Developers run the same build locally that CI runs, eliminating "works on my machine" |
| **Pipeline foundation** | The CD pipeline is just the build running automatically on every commit |

## Key Practices

### 1. Version-Controlled Build Scripts

Your build configuration lives in the same repository as your code. It is versioned, reviewed, and tested alongside the application.

**What belongs in version control:**

- Build scripts (Makefile, build.gradle, package.json scripts, Dockerfile)
- [Dependency]({{< relref "/docs/reference/glossary#dependency" >}}) manifests (requirements.txt, go.mod, pom.xml, package-lock.json)
- Pipeline definitions (.github/workflows, .gitlab-ci.yml, Jenkinsfile)
- Environment setup scripts (docker-compose.yml for local development)

**What does not belong in version control:**

- Secrets and credentials (use secret management tools)
- Environment-specific configuration values (use environment variables or config management)
- Generated artifacts (build outputs, compiled binaries)

**Anti-pattern:** Build instructions that exist only in a wiki, a Confluence page, or one developer's head. If the build steps are not in the repository, they will drift from reality.

### 2. Dependency Management

All dependencies must be declared explicitly and resolved deterministically.

**Practices:**

- **Lock files:** Use lock files (package-lock.json, Pipfile.lock, go.sum) to pin exact dependency versions. Check lock files into version control.
- **Reproducible resolution:** Running the dependency install twice should produce identical results.
- **No undeclared dependencies:** Your build should not rely on tools or libraries that happen to be installed on the build machine. If you need it, declare it.
- **Dependency scanning:** Automate vulnerability scanning of dependencies as part of the build. Do not wait for a separate security review.

**Anti-pattern:** "It builds on Jenkins because Jenkins has Java 11 installed, but the Dockerfile uses Java 17." The build must declare and control its own runtime.

### 3. Build Caching

Fast builds keep developers in flow. Caching is the primary mechanism for build speed.

**What to cache:**

- **Dependencies:** Download once, reuse across builds. Most build tools (npm, Maven, Gradle, pip) support a local cache.
- **Compilation outputs:** Incremental compilation avoids rebuilding unchanged modules.
- **Docker layers:** Structure your Dockerfile so that rarely-changing layers (OS, dependencies) are cached and only the application code layer is rebuilt.
- **Test fixtures:** Prebuilt test data or container images used by tests.

**Guidelines:**

- **Cache aggressively** for local development and CI
- **Invalidate caches** when dependencies or build configuration change
- **Never cache test results.** Tests must always run

### 4. Single Build Script Entry Point

Developers, CI, and CD should all use the same entry point.

{{< card code=true header="**Makefile as single build entry point**" lang="makefile" >}}
# Example: Makefile as the single entry point

.PHONY: build test package all

all: build test package

build:
	./gradlew compileJava

test:
	./gradlew test

package:
	docker build -t myapp:$(GIT_SHA) .

clean:
	./gradlew clean
	docker rmi myapp:$(GIT_SHA) || true
{{< /card >}}

The CI server runs `make all`. A developer runs `make all`. The result is the same. There is no separate "CI build script" that diverges from what developers run locally.

### 5. Artifact Versioning

Every build artifact must be traceable to the exact commit that produced it.

**Practices:**

- Tag artifacts with the Git commit SHA or a build number derived from it
- Store build metadata (commit, branch, timestamp, builder) in the artifact or alongside it
- Never overwrite an existing artifact. If the version exists, the artifact is immutable

This becomes critical in [Phase 2]({{< relref "/docs/migrate-to-cd/pipeline/immutable-artifacts" >}}) when you establish [immutable artifact]({{< relref "/docs/reference/glossary#immutable-artifact" >}}) practices.

## CI Server Setup Basics

The CI server is the mechanism that runs your build automatically.

### What the CI Server Does

1. **Watches the trunk** for new commits
2. **Runs the build** (the same command a developer would run locally)
3. **Reports the result** (pass/fail, test results, build duration)
4. **Notifies the team** if the build fails

### Minimum CI Configuration

Regardless of which CI tool you use (GitHub Actions, GitLab CI, Jenkins, CircleCI), the configuration follows the same pattern:

{{< card code=true header="**Conceptual minimum CI configuration**" lang="yaml" >}}
# Conceptual CI configuration (adapt to your tool)
trigger:
  branch: main  # Run on every commit to trunk

steps:
  - checkout: source code
  - install: dependencies
  - run: build
  - run: tests
  - run: package
  - report: test results and build status
{{< /card >}}

### CI Principles for Phase 1

- **Run on every commit.** Not nightly, not weekly, not "when someone remembers." Every commit to trunk triggers a build.
- **Treat a failing build as the team's top priority.** Stop work until trunk is green again. (See [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}).)
- **Run the same build everywhere.** Use the same script in CI and local development. No CI-only steps that developers cannot reproduce.
- **Fail fast.** Run the fastest checks first (compilation, unit tests) before the slower ones (integration tests, packaging).

## Build Time Targets

Build speed directly affects developer productivity and [integration frequency]({{< relref "/docs/reference/glossary#integration-frequency" >}}). If the build takes 30 minutes, developers will not integrate multiple times per day.

| Build Phase | Target | Rationale |
|-------------|--------|-----------|
| Compilation | < 1 minute | Developers need instant feedback on syntax and type errors |
| Unit tests | < 3 minutes | Fast enough to run before every commit |
| Integration tests | < 5 minutes | Must complete before the developer context-switches |
| Full build (compile + test + package) | < 10 minutes | The outer bound for fast feedback |

### If Your Build Is Too Slow

Slow builds are a common [constraint]({{< relref "/docs/reference/glossary#constraint" >}}) that blocks CD adoption. Address them systematically:

1. **Profile the build.** Identify which steps take the most time. Optimize the bottleneck, not everything.
2. **Parallelize tests.** Most test frameworks support parallel execution. Run independent test suites concurrently.
3. **Use build caching.** Avoid recompiling or re-downloading unchanged dependencies.
4. **Split the build.** Run fast checks (lint, compile, unit tests) as a "fast feedback" stage. Run slower checks (integration tests, security scans) as a second stage.
5. **Upgrade build hardware.** Sometimes the fastest optimization is more CPU and RAM.

## Common Anti-Patterns

| Anti-pattern | Impact | Fix |
|---|---|---|
| **Manual build steps** | Error-prone, slow, and impossible to parallelize or cache. | Script every step so no human intervention is required. |
| **Environment-specific builds** | You are not testing the same artifact you deploy, making production bugs impossible to diagnose. | Build one artifact and configure it per environment at deployment time. (See [Application Config]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}).) |
| **Build scripts that only run in CI** | Developers cannot reproduce CI failures locally, leading to slow debugging cycles. | Use a single build entry point that both CI and developers use. |
| **Missing dependency pinning** | The build is non-deterministic; the same code can produce different results on different days. | Use lock files and pin all dependency versions. |
| **Long build queues** | Delayed feedback defeats the purpose of CI because developers context-switch before seeing results. | Ensure CI infrastructure can handle your commit frequency with parallel build agents. |

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | < 10 minutes | Enables fast feedback and frequent integration |
| Build success rate | > 95% | Indicates reliable, reproducible builds |
| Time from commit to build result | < 15 minutes (including queue time) | Measures the full feedback loop |
| Developer ability to build locally | 100% of team | Confirms the build is portable and documented |

## Next Step

With build automation in place, you can build, test, and package your application reliably. The next foundation is ensuring that the work you integrate daily is small enough to be safe. Continue to [Work Decomposition]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}}).

---

## Related Content

- [Slow Pipelines]({{< relref "/docs/symptoms/flow/integration/slow-pipelines" >}}): symptom caused by unoptimized or missing build automation
- [Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}): symptom eliminated when the build runs the same everywhere
- [Missing Deployment Pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}): anti-pattern where no automated path from commit to production exists
- [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}): anti-pattern caused by environment-specific builds
- [Everything as Code]({{< relref "/docs/migrate-to-cd/foundations/everything-as-code" >}}): companion guide for versioning build scripts, pipelines, and infrastructure
- [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}): metric for tracking build speed improvements
