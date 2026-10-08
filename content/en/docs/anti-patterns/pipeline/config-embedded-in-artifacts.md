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

## What this looks like

The build process pulls a configuration file. The file includes the database hostname, the API base URL for downstream services, the S3 bucket name, and a handful of feature flag values. These values are different for each environment - development, staging, and production each have their own database and their own service endpoints. To handle this, the build system accepts an environment name as a parameter and selects the corresponding configuration file before compiling or packaging.

The result is three separate artifacts: one built for development, one for staging, one for production. The pipeline builds and tests the staging artifact, finds no problems, and then builds a new artifact for production using the production configuration. That production artifact has never been run through the test suite. The team deploys it anyway, reasoning that the code is the same even if the artifact is different.

This reasoning fails regularly, because environment-specific configuration values change application behavior in ways that are not always obvious. A connection string that points to a read-replica in staging but a primary database in production changes the write behavior. A feature flag that is enabled in staging but disabled in production activates code paths that the deployed artifact has never executed. An API URL can point to a mock service in testing but a live external service in production. In production, that URL exposes latency and error handling behavior that no test exercised.

Common variations:

- **Compiled configuration.** Connection strings or environment names are compiled directly into binaries or bundled into JAR files, making extraction impossible without a rebuild.
- **Build-time templating.** A templating tool substitutes environment values during the build step, producing artifacts that contain the substituted values rather than references to external configuration.
- **Per-environment Dockerfiles.** Separate Dockerfile variants for each environment copy different configuration files into the image layer.
- **Secrets in source control.** Environment-specific values including credentials are checked into the repository in environment-specific config files, making rotation difficult and audit trails nonexistent.

The telltale sign: the build pipeline accepts an environment name as an input parameter, and changing that parameter produces a different artifact.

## Why this is a problem

An artifact that is rebuilt for each environment is not the same artifact that was tested.

### It reduces quality

Configuration-dependent bugs reach production undetected because the artifact that arrives there was never run through the test suite. Testing provides meaningful quality assurance only when you deploy the thing you tested. When the production artifact is built separately from the tested artifact, even if the source code is identical, the production artifact has not been validated. Any configuration-dependent behavior - connection pooling, timeout values, feature flags, service endpoints - may behave differently in the production artifact than in the tested one.

This gap is not theoretical. Configuration-dependent bugs are common and often subtle. Consider an application that connects to a local mock service in testing and a real external service in production. Under load, it shows different timeout behavior, different error rates, and different retry logic. If no test has exercised those behaviors, real users exercise them first, in production.

Building once and injecting configuration at deploy time eliminates this class of problem. The artifact that reaches production is byte-for-byte identical to the artifact that ran through the test suite. Any behavior the tests exercised is guaranteed to be present in the deployed system.

### It increases rework

When every environment requires its own build, the build step multiplies. A pipeline that builds for three environments runs the build three times, spending compute and time on work that produces no additional quality signal. More significantly, a failed production deployment can require a rollback and rebuild. The team must then go through the full build-for-production cycle again, even though the source code has not changed.

Because the configuration is baked into the artifact, a configuration bug found in production often needs more than a configuration change. It needs a full rebuild and redeployment cycle. A corrected connection string could be a one-line change in an external config file. Instead, the team must commit a changed config file, trigger a new build, wait for the build to complete, and redeploy. Each cycle takes time that extends the duration of the production incident.

Externalizing configuration reduces this rework to a configuration change and a redeploy, with no rebuild required.

### It makes delivery timelines unpredictable

Per-environment builds introduce additional pipeline stages and longer pipeline durations. A pipeline that would take 10 minutes to build once takes 30 minutes to build three times, blocking feedback at every stage. A team that needs to ship an urgent fix must wait through a full rebuild before deploying. The wait applies even to a one-line fix that has nothing to do with configuration.

Per-environment build requirements also create coupling between the delivery team and whoever manages the configuration files. A new environment cannot be created by the infrastructure team without coordinating with the application team to add a new build variant. That coupling creates a coordination overhead that slows down every environment-related change, from creating test environments to onboarding new services.

### Impact on continuous delivery

CD is built on the principle of build once, deploy many times. The artifact produced by the pipeline should be promotable through environments without modification. When configuration is embedded in artifacts, promotion requires rebuilding, which means the promoted artifact is new and unvalidated. The core CD guarantee - that what you tested is what you deployed - cannot be maintained.

Immutable artifacts are a foundational CD practice. Externalizing configuration is what makes immutable artifacts possible. Without it, the pipeline can verify a specific artifact but cannot guarantee that the artifact reaching production is the one that was verified.

## How to fix it

### Step 1: Identify all embedded configuration values

Audit the build process to find every place where an environment-specific value is introduced at build time. Check configuration files read during compilation, environment variables consumed by build scripts, and template substitution steps. Also check any build parameter that affects what ends up in the artifact. Document the full list before changing anything.

### Step 2: Classify values by sensitivity and access pattern

Separate configuration values into three categories. Each category calls for a different externalization approach:

- **Non-sensitive application configuration** (URLs, feature flags, pool sizes): use application config files.
- **Sensitive credentials** (database passwords, API keys, certificates): use a secrets vault.
- **Runtime-computed values** (hostnames assigned at deploy time): use deployment-time injection.

### Step 3: Externalize non-sensitive configuration (weeks 2-3)

Move non-sensitive configuration values out of the build and into externally-managed configuration files, environment variables injected at runtime, or a configuration service. The application should read these values at startup from the environment, not from values baked in at build time. Refactor the application code to expect external configuration rather than compiled-in defaults. Test by running the same artifact against multiple configuration sets.

### Step 4: Move secrets to a vault (weeks 3-4)

Do not store credentials in config files. Do not pass them as environment variables set by humans. Move them to a dedicated secrets management system - HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or the equivalent in your infrastructure. Update the application to retrieve secrets from the vault at startup or at first use. Remove credential values from source control entirely and rotate any credentials that were ever stored in a repository.

### Step 5: Modify the pipeline to build once

Refactor the pipeline so it produces a single artifact regardless of target environment. Build the artifact once and store it in an artifact registry. Deploy it to each environment in sequence, injecting the appropriate configuration at deploy time. Remove per-environment build parameters. The pipeline now has the shape: build, store, deploy-to-staging (inject staging config), test, deploy-to-production (inject production config).

### Step 6: Verify artifact identity across environments

Add a pipeline step that records the artifact checksum after the build. Have the step verify the same checksum in every environment where the artifact is deployed. The checksum check is the mechanical guarantee that what was tested is what was deployed. Alert on any mismatch.

| Objection | Response |
|-----------|----------|
| "Our configuration and code are tightly coupled and separating them would require significant refactoring." | Start with the values that change most often between environments. You do not need to externalize everything at once - each value you move out reduces your risk and your rebuild frequency. |
| "We need to compile in some values for performance reasons." | Performance-critical compile-time constants are usually not environment-specific. If they are, profile first - most applications see no measurable difference between compiled-in and environment-variable-read values. |
| "Feature flags need to be in the build to avoid dead code." | Feature flags are the canonical example of configuration that should be external. External feature flag systems exist precisely to allow behavior changes without rebuilds. |
| "Our secrets team controls configuration and we cannot change their process." | Start by externalizing non-sensitive configuration, which you likely do control. The secrets externalization can follow once you have demonstrated the pattern. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Reduction as builds move from per-environment to single-artifact |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Fewer production failures caused by configuration-dependent behavior differences between tested and deployed artifacts |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Shorter path from commit to production as rebuild-per-environment cycles are eliminated |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Faster recovery from configuration-related incidents when a config change no longer requires a full rebuild |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Increased deployment frequency as the pipeline no longer multiplies build time across environments |

## Related content

- [Application configuration management]({{< relref "/docs/pipeline/application-config" >}})
- [Immutable artifacts]({{< relref "/docs/pipeline/immutable-artifacts" >}})
- [Production-like environments]({{< relref "/docs/pipeline/production-like-environments" >}})
- [Everything as code]({{< relref "/docs/foundations/everything-as-code" >}})
- [Single path to production]({{< relref "/docs/pipeline/single-path-to-production" >}})
