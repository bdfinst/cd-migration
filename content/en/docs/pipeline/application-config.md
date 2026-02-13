---
title: "Application Configuration"
linkTitle: "Application Config"
weight: 5
description: >
  Separate configuration from code so the same artifact works in every environment.
---

{{% pageinfo %}}
**Phase 2 — Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

Application configuration is the practice of correctly separating what varies between
environments from what does not, so that a single [immutable artifact](../immutable-artifacts/)
can run in any environment. This distinction — drawn from the
[Twelve-Factor App](https://12factor.net/config) methodology — is essential for
continuous delivery.

There are two distinct types of configuration:

- **Application config** — settings that define how the application behaves, are the same
  in every environment, and should be bundled with the artifact. Examples: routing rules,
  feature flag defaults, serialization formats, timeout policies, retry strategies.

- **Environment config** — settings that vary by deployment target and must be injected at
  deployment time. Examples: database connection strings, API endpoint URLs, credentials,
  resource limits, logging levels for that environment.

Getting this distinction right is critical. Bundling environment config into the artifact
breaks immutability. Externalizing application config that does not vary creates
unnecessary complexity and fragility.

## Why It Matters for CD Migration

Configuration is where many CD migrations stall. Teams that have been deploying manually
often have configuration tangled with code — hardcoded URLs, environment-specific build
profiles, configuration files that are manually edited during deployment. Untangling this
is a prerequisite for immutable artifacts and automated deployments.

When configuration is handled correctly, the same artifact flows through every environment
without modification, environment-specific values are injected at deployment time, and
feature behavior can be changed without redeploying. This enables the deployment speed and
safety that continuous delivery requires.

## Key Principles

### Bundle what does not vary

Application configuration that is identical across all environments belongs inside the
artifact. This includes:

- **Default feature flag values** — the static, compile-time defaults for feature flags
- **Application routing and mapping rules** — URL patterns, API route definitions
- **Serialization and encoding settings** — JSON configuration, character encoding
- **Internal timeout and retry policies** — backoff strategies, circuit breaker thresholds
- **Validation rules** — input validation constraints, business rule parameters

These values are part of the application's behavior definition. They should be version
controlled with the source code and deployed as part of the artifact.

### Externalize what varies

Environment configuration that changes between deployment targets must be injected at
deployment time:

- **Database connection strings** — different databases for test, staging, production
- **External service URLs** — different endpoints for downstream dependencies
- **Credentials and secrets** — always injected, never bundled, never in version control
- **Resource limits** — memory, CPU, connection pool sizes tuned per environment
- **Environment-specific logging levels** — verbose in development, structured in production
- **Feature flag overrides** — dynamic flag values managed by an external flag service

### Feature flags: static vs. dynamic

Feature flags deserve special attention because they span both categories:

- **Static feature flags** — compiled into the artifact as default values. They define the
  initial state of a feature when the application starts. Changing them requires a new
  build and deployment.

- **Dynamic feature flags** — read from an external service at runtime. They can be
  toggled without deploying. Use these for operational toggles (kill switches, gradual
  rollouts) and experiment flags (A/B tests).

A well-designed feature flag system uses static defaults (bundled in the artifact) that can
be overridden by a dynamic source (external flag service). If the flag service is
unavailable, the application falls back to its static defaults — a safe, predictable
behavior.

## Anti-Patterns

### Hardcoded environment-specific values

Database URLs, API endpoints, or credentials embedded directly in source code or
configuration files that are baked into the artifact. This forces a different build per
environment and makes secrets visible in version control.

### Externalizing everything

Moving all configuration to an external service — including values that never change
between environments — creates unnecessary runtime dependencies. If the configuration
service is down and a value that is identical in every environment cannot be read, the
application fails to start for no good reason.

### Environment-specific build profiles

Build systems that use profiles like `mvn package -P production` or Webpack configurations
that toggle behavior based on `NODE_ENV` at build time create environment-coupled
artifacts. The artifact must be the same regardless of where it will run.

### Configuration files edited during deployment

Manually editing `application.properties`, `.env` files, or YAML configurations on the
server during or after deployment is error-prone, unrepeatable, and invisible to the
pipeline. All configuration injection must be automated.

### Secrets in version control

Credentials, API keys, certificates, and tokens must never be stored in version control —
not even in "private" repositories, not even encrypted with simple mechanisms. Use a
secrets manager (Vault, AWS Secrets Manager, Azure Key Vault) and inject secrets at
deployment time.

## Good Patterns

### Environment variables for environment config

Following the Twelve-Factor App approach, inject environment-specific values as
environment variables. This is universally supported across languages and platforms, works
with containers and orchestrators, and keeps the artifact clean.

### Layered configuration

Use a configuration framework that supports layering:

1. **Defaults** — bundled in the artifact (application config)
2. **Environment overrides** — injected via environment variables or mounted config files
3. **Dynamic overrides** — read from a feature flag service or configuration service at runtime

Each layer overrides the previous one. The application always has a working default, and
environment-specific or dynamic values override only what needs to change.

### Config maps and secrets in orchestrators

Kubernetes ConfigMaps and Secrets (or equivalent mechanisms in other orchestrators)
provide a clean separation between the artifact (the container image) and the
environment-specific configuration. The image is immutable; the configuration is injected
at pod startup.

### Secrets management with rotation

Use a dedicated secrets manager that supports automatic rotation, audit logging, and
fine-grained access control. The application retrieves secrets at startup or on-demand,
and the secrets manager handles rotation without requiring redeployment.

### Configuration validation at startup

The application should validate its configuration at startup and fail fast with a clear
error message if required configuration is missing or invalid. This catches configuration
errors immediately rather than allowing the application to start in a broken state.

## How to Get Started

### Step 1: Inventory your configuration

List every configuration value your application uses. For each one, determine: Does this
value change between environments? If yes, it is environment config. If no, it is
application config.

### Step 2: Move environment config out of the artifact

For every environment-specific value currently bundled in the artifact (hardcoded URLs,
build profiles, environment-specific property files), extract it and inject it via
environment variable, config map, or secrets manager.

### Step 3: Bundle application config with the code

For every value that does not vary between environments, ensure it is committed to version
control alongside the source code and included in the artifact at build time. Remove it
from any external configuration system where it adds unnecessary complexity.

### Step 4: Implement feature flags properly

Set up a feature flag framework with static defaults in the code and an external flag
service for dynamic overrides. Ensure the application degrades gracefully if the flag
service is unavailable.

### Step 5: Remove environment-specific build profiles

Eliminate any build-time branching based on target environment. The build produces one
artifact. Period.

### Step 6: Automate configuration injection

Ensure that configuration injection is fully automated in the deployment pipeline. No
human should manually set environment variables or edit configuration files during
deployment.

## Connection to the Pipeline Phase

Application configuration is the enabler that makes
[immutable artifacts](../immutable-artifacts/) practical. An artifact can only be truly
immutable if it does not contain environment-specific values that would need to change
between deployments.

Correct configuration separation also supports
[production-like environments](../production-like-environments/) — because the same
artifact runs everywhere, the only difference between environments is the injected
configuration, which is itself version controlled and automated.

When configuration is externalized correctly, [rollback](../rollback/) becomes
straightforward: deploy the previous artifact with the appropriate configuration, and the
system returns to its prior state.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
