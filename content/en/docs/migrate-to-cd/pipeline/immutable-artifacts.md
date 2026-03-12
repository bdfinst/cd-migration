---
title: "Immutable Artifacts"
linkTitle: "Immutable Artifacts"
weight: 4
description: >
  Build once, deploy everywhere. The same artifact is used in every environment.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | {{< scope-label "team" >}}
{{% /pageinfo %}}

## Definition

An [immutable artifact]({{< relref "/docs/reference/glossary#immutable-artifact" >}}) is a build output that is created exactly once and deployed to every
environment without modification. The binary, container image, or package that runs in
production is byte-for-byte identical to the one that passed through testing. Nothing is
recompiled, repackaged, or altered between environments.

"Build once, deploy everywhere" is the core principle. The [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) is sealed at build
time. Configuration is injected at deployment time (see
[Application Configuration]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}})), but the artifact itself never
changes.

## Why It Matters for CD Migration

If you build a separate artifact for each environment - or worse, make manual adjustments
to artifacts at deployment time - you can never be certain that what you tested is what
you deployed. Every rebuild introduces the possibility of variance: a different dependency
resolved, a different compiler flag applied, a different snapshot of the source.

Immutable artifacts eliminate an entire class of "works in staging, fails in production"
problems. They provide confidence that the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) results are real: the artifact that
passed every quality gate is the exact artifact running in production.

For teams migrating to [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}), this practice is a concrete, mechanical step that delivers
immediate trust. Once the team sees that the same container image flows from [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) to
staging to production, the deployment process becomes verifiable instead of hopeful.

## Key Principles

### Build once

The artifact is produced exactly once, during the build stage of the pipeline. It is
stored in an artifact repository (such as a container registry, Maven repository, npm
registry, or object store) and every subsequent stage of the pipeline - and every
environment - pulls and deploys that same artifact.

### No manual adjustments

Artifacts are never modified after creation. This means:

- No recompilation for different environments
- No patching binaries in staging to fix a test failure
- No adding environment-specific files into a container image after the build
- No editing properties files inside a deployed artifact

### Version everything that goes into the build

Because the artifact is built once and cannot be changed, every input must be correct at
build time:

- **Source code** - committed to version control at a specific commit hash
- **Dependencies** - locked to exact versions via lockfiles
- **Build tools** - pinned to specific versions
- **Build configuration** - stored in version control alongside the source

### Tag and trace

Every artifact must be traceable back to the exact commit, pipeline run, and set of inputs
that produced it. Use content-addressable identifiers (such as container image digests),
semantic version tags, or build metadata that links the artifact to its source.

## Anti-Patterns

### Rebuilding per environment

Building the artifact separately for development, staging, and production - even from the
same source - means each artifact is a different build. Different builds can produce
different results due to non-deterministic build processes, updated dependencies, or
changed build environments.

### SNAPSHOT or mutable versions

Using version identifiers like `-SNAPSHOT` (Maven), `latest` (container images), or
unversioned "current" references means the same version label can point to different
artifacts at different times. This makes it impossible to know exactly what is deployed.
This applies to both the artifacts you produce and the dependencies you consume. A
dependency pinned to a `-SNAPSHOT` version can change underneath you between builds,
silently altering your artifact's behavior without any version change. Version numbers
are cheap - assign a new one for every meaningful change rather than reusing a mutable
label.

### Manual intervention at failure points

When a deployment fails, the fix must go through the pipeline. Manually patching the
artifact, restarting with modified configuration, or applying a hotfix directly to the
running system breaks immutability and bypasses the quality gates.

### Environment-specific builds

Build scripts that use conditionals like "if production, include X" create
environment-coupled artifacts. The artifact should be environment-agnostic;
[environment configuration]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}) handles the differences.

### Artifacts that self-modify

Applications that write to their own deployment directory, modify their own configuration
files at runtime, or store state alongside the application binary are not truly immutable.
Runtime state must be stored externally.

## Good Patterns

### Container images as immutable artifacts

Container images are an excellent vehicle for immutable artifacts. A container image built
in CI, pushed to a registry with a content-addressable digest, and pulled into each
environment is inherently immutable. The image that ran in staging is provably identical
to the image running in production.

### Artifact promotion

Instead of rebuilding for each environment, promote the same artifact through environments.
The pipeline builds the artifact once, deploys it to a test environment, validates it,
then promotes it (deploys the same artifact) to staging, then production. The artifact
never changes; only the environment it runs in changes.

### Content-addressable storage

Use content-addressable identifiers (SHA-256 digests, content hashes) rather than mutable
tags as the primary artifact reference. A content-addressed artifact is immutable by
definition: changing any byte changes the address.

### Signed artifacts

Digitally sign artifacts at build time and verify the signature before deployment. This
guarantees that the artifact has not been tampered with between the build and the
deployment. This is especially important for supply chain security.

### Reproducible builds

Strive for builds where the same source input produces a bit-for-bit identical artifact.
While not always achievable (timestamps, non-deterministic linkers), getting close makes
it possible to verify that an artifact was produced from its claimed source.

## How to Get Started

### Step 1: Separate build from deployment

If your pipeline currently rebuilds for each environment, restructure it into two
distinct phases: a build phase that produces a single artifact, and a deployment phase that
takes that artifact and deploys it to a target environment with the appropriate
configuration.

### Step 2: Set up an artifact repository

Choose an artifact repository appropriate for your technology stack - a container registry
for container images, a package registry for libraries, or an object store for compiled
binaries. All downstream pipeline stages pull from this repository.

### Step 3: Eliminate mutable version references

Replace `latest` tags, `-SNAPSHOT` versions, and any other mutable version identifier
with immutable references. Use commit-hash-based tags, semantic versions, or
content-addressable digests.

### Step 4: Implement artifact promotion

Modify your pipeline to deploy the same artifact to each environment in sequence. The
pipeline should pull the artifact from the repository by its immutable identifier and
deploy it without modification.

### Step 5: Add traceability

Ensure every deployed artifact can be traced back to its source commit, build log, and
pipeline run. Label container images with build metadata. Store build provenance alongside
the artifact in the repository.

### Step 6: Verify immutability

Periodically verify that what is running in production matches what the pipeline built.
Compare image digests, checksums, or signatures. This catches any manual modifications
that may have bypassed the pipeline.

## Connection to the Pipeline Phase

Immutable artifacts are the physical manifestation of trust in the pipeline. The
[single path to production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}) ensures all changes flow
through the pipeline. The [deterministic pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}) ensures the
build is repeatable. The [deployable definition]({{< relref "/docs/migrate-to-cd/pipeline/deployable-definition" >}}) ensures the
artifact meets quality criteria. Immutability ensures that the validated artifact - and
only that artifact - reaches production.

This practice also directly supports [rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}): because previous artifacts
are stored unchanged in the artifact repository, rolling back is simply deploying a
previous known-good artifact.

## Related Content

- [Staging Passes, Production Fails]({{< relref "/docs/symptoms/deployment/staging-passes-production-fails" >}}) - a symptom eliminated when the same artifact is deployed to every environment
- [Snowflake Environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}) - an anti-pattern that undermines artifact immutability through environment-specific builds
- [Application Configuration]({{< relref "/docs/migrate-to-cd/pipeline/application-config" >}}) - the Pipeline practice that enables immutability by externalizing environment-specific values
- [Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}) - the Pipeline practice that ensures the build process itself is repeatable
- [Rollback]({{< relref "/docs/migrate-to-cd/pipeline/rollback" >}}) - the Pipeline practice that relies on stored immutable artifacts for fast recovery
- [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) - a metric that improves when validated artifacts are deployed without modification
