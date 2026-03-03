---
title: "Configuration Embedded in Artifacts"
linkTitle: "Configuration Embedded in Artifacts"
weight: 40
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  Connection strings, API URLs, and feature flags are baked into the build, requiring a rebuild per environment and meaning the tested artifact is never what gets deployed.
tags:
  - environment-consistency
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The build process pulls a configuration file that includes the database hostname, the API base URL for downstream services, the S3 bucket name, and a handful of feature flag values. These values are different for each environment - development, staging, and production each have their own database and their own service endpoints. To handle this, the build system accepts an environment name as a parameter and selects the corresponding configuration file before compiling or packaging.

The result is three separate artifacts: one built for development, one for staging, one for production. The pipeline builds and tests the staging artifact, finds no problems, and then builds a new artifact for production using the production configuration. That production artifact has never been run through the test suite. The team deploys it anyway, reasoning that the code is the same even if the artifact is different.

This reasoning fails regularly. Environment-specific configuration values change the behavior of the application in ways that are not always obvious. A connection string that points to a read-replica in staging but a primary database in production changes the write behavior. A feature flag that is enabled in staging but disabled in production activates code paths that the deployed artifact has never executed. An API URL that points to a mock service in testing but a live external service in production exposes latency and error handling behavior that was never exercised.

Common variations:

- **Compiled configuration.** Connection strings or environment names are compiled directly into binaries or bundled into JAR files, making extraction impossible without a rebuild.
- **Build-time templating.** A templating tool substitutes environment values during the build step, producing artifacts that contain the substituted values rather than references to external configuration.
- **Per-environment Dockerfiles.** Separate Dockerfile variants for each environment copy different configuration files into the image layer.
- **Secrets in source control.** Environment-specific values including credentials are checked into the repository in environment-specific config files, making rotation difficult and audit trails nonexistent.

The telltale sign: the build pipeline accepts an environment name as an input parameter, and changing that parameter produces a different artifact.

## Why This Is a Problem

An artifact that is rebuilt for each environment is not the same artifact that was tested.

### It reduces quality

Configuration-dependent bugs reach production undetected because the artifact that arrives there was never run through the test suite. Testing provides meaningful quality assurance only when the thing being tested is the thing being deployed. When the production artifact is built separately from the tested artifact, even if the source code is identical, the production artifact has not been validated. Any configuration-dependent behavior - connection pooling, timeout values, feature flags, service endpoints - may behave differently in the production artifact than in the tested one.

This gap is not theoretical. Configuration-dependent bugs are common and often subtle. An application that connects to a local mock service in testing and a real external service in production will exhibit different timeout behavior, different error rates, and different retry logic under load. If those behaviors have never been exercised by a test, the first time they are exercised is in production, by real users.

Building once and injecting configuration at deploy time eliminates this class of problem. The artifact that reaches production is byte-for-byte identical to the artifact that ran through the test suite. Any behavior the tests exercised is guaranteed to be present in the deployed system.

### It increases rework

When every environment requires its own build, the build step multiplies. A pipeline that builds for three environments runs the build three times, spending compute and time on work that produces no additional quality signal. More significantly, a failed production deployment that requires a rollback and rebuild means the team must go through the full build-for-production cycle again, even though the source code has not changed.

Configuration bugs discovered in production often require not just a configuration change but a full rebuild and redeployment cycle, because the configuration is baked into the artifact. A corrected connection string that could be a one-line change in an external config file instead requires committing a changed config file, triggering a new build, waiting for the build to complete, and redeploying. Each cycle takes time that extends the duration of the production incident.

Externalizing configuration reduces this rework to a configuration change and a redeploy, with no rebuild required.

### It makes delivery timelines unpredictable

Per-environment builds introduce additional pipeline stages and longer pipeline durations. A pipeline that would take 10 minutes to build once takes 30 minutes to build three times, blocking feedback at every stage. Teams that need to ship an urgent fix to production must wait through a full rebuild before they can deploy, even if the fix is a one-line change that has nothing to do with configuration.

Per-environment build requirements also create coupling between the delivery team and whoever manages the configuration files. A new environment cannot be created by the infrastructure team without coordinating with the application team to add a new build variant. That coupling creates a coordination overhead that slows down every environment-related change, from creating test environments to onboarding new services.

### Impact on continuous delivery

CD is built on the principle of build once, deploy many times. The artifact produced by the pipeline should be promotable through environments without modification. When configuration is embedded in artifacts, promotion requires rebuilding, which means the promoted artifact is new and unvalidated. The core CD guarantee - that what you tested is what you deployed - cannot be maintained.

Immutable artifacts are a foundational CD practice. Externalizing configuration is what makes immutable artifacts possible. Without it, the pipeline can verify a specific artifact but cannot guarantee that the artifact reaching production is the one that was verified.

## How to Fix It

### Step 1: Identify all embedded configuration values

Audit the build process to find every place where an environment-specific value is introduced at build time. This includes configuration files read during compilation, environment variables consumed by build scripts, template substitution steps, and any build parameter that affects what ends up in the artifact. Document the full list before changing anything.

### Step 2: Classify values by sensitivity and access pattern

Separate configuration values into categories: non-sensitive application configuration (URLs, feature flags, pool sizes), sensitive credentials (database passwords, API keys, certificates), and runtime-computed values (hostnames assigned at deploy time). Each category calls for a different externalization approach - application config files, a secrets vault, and deployment-time injection, respectively.

### Step 3: Externalize non-sensitive configuration (Weeks 2-3)

Move non-sensitive configuration values out of the build and into externally-managed configuration files, environment variables injected at runtime, or a configuration service. The application should read these values at startup from the environment, not from values baked in at build time. Refactor the application code to expect external configuration rather than compiled-in defaults. Test by running the same artifact against multiple configuration sets.

### Step 4: Move secrets to a vault (Weeks 3-4)

Credentials should never live in config files or be passed as environment variables set by humans. Move them to a dedicated secrets management system - HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or the equivalent in your infrastructure. Update the application to retrieve secrets from the vault at startup or at first use. Remove credential values from source control entirely and rotate any credentials that were ever stored in a repository.

### Step 5: Modify the pipeline to build once

Refactor the pipeline so it produces a single artifact regardless of target environment. The artifact is built once, stored in an artifact registry, and then deployed to each environment in sequence by injecting the appropriate configuration at deploy time. Remove per-environment build parameters. The pipeline now has the shape: build, store, deploy-to-staging (inject staging config), test, deploy-to-production (inject production config).

### Step 6: Verify artifact identity across environments

Add a pipeline step that records the artifact checksum after the build and verifies that the same checksum is present in every environment where the artifact is deployed. This is the mechanical guarantee that what was tested is what was deployed. Alert on any mismatch.

| Objection | Response |
|-----------|----------|
| "Our configuration and code are tightly coupled and separating them would require significant refactoring." | Start with the values that change most often between environments. You do not need to externalize everything at once - each value you move out reduces your risk and your rebuild frequency. |
| "We need to compile in some values for performance reasons." | Performance-critical compile-time constants are usually not environment-specific. If they are, profile first - most applications see no measurable difference between compiled-in and environment-variable-read values. |
| "Feature flags need to be in the build to avoid dead code." | Feature flags are the canonical example of configuration that should be external. External feature flag systems exist precisely to allow behavior changes without rebuilds. |
| "Our secrets team controls configuration and we cannot change their process." | Start by externalizing non-sensitive configuration, which you likely do control. The secrets externalization can follow once you have demonstrated the pattern. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Build duration](../../../metrics/build-duration/) | Reduction as builds move from per-environment to single-artifact |
| [Change fail rate](../../../metrics/change-fail-rate/) | Fewer production failures caused by configuration-dependent behavior differences between tested and deployed artifacts |
| [Lead time](../../../metrics/lead-time/) | Shorter path from commit to production as rebuild-per-environment cycles are eliminated |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Faster recovery from configuration-related incidents when a config change no longer requires a full rebuild |
| [Release frequency](../../../metrics/release-frequency/) | Increased deployment frequency as the pipeline no longer multiplies build time across environments |

## Related Content

- [Application configuration management](../../../migrate-to-cd/migration-path/pipeline/application-config/)
- [Immutable artifacts](../../../migrate-to-cd/migration-path/pipeline/immutable-artifacts/)
- [Production-like environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/)
- [Everything as code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/)
- [Single path to production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/)
