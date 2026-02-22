---
title: "Hard-Coded Environment Assumptions"
linkTitle: "Hard-Coded Environment Assumptions"
weight: 81
category: "Pipeline & Infrastructure"
risk_level: medium
description: >
  Code that behaves differently based on environment name (if env == 'production') is scattered throughout the codebase.
tags:
  - environment-consistency
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

Search the codebase for the string "production" and dozens of matches come back from inside
application logic. Some are safety guards: `if (environment != 'production') { runSlowMigration(); }`.
Some are [feature flags](../../glossary/#feature-flag) implemented by hand: `if (environment == 'staging') { showDebugPanel(); }`.
Some are notification suppressors: `if (env !== 'prod') { return; }` at the top of an alerting
function. The production environment is not just a deployment target - it is a concept woven
into the source code.

These checks accumulate over years through a pattern of small compromises. A developer needs to
run a one-time data migration in production. Rather than add a proper feature flag or migration
framework, they add a check: `if (env == 'production' && !migrationRan) { runMigration(); }`.
A developer wants to enable a slow debug mode in staging only. They add
`if (env == 'staging') { enableVerboseLogging(); }`. Each check makes sense in isolation and
adds code that "nobody will ever touch again." Over time, the codebase accumulates dozens of
these checks, and the test environment no longer runs the same code as production.

The consequence becomes apparent when something works in staging but fails in production, or
vice versa. The team investigates and eventually discovers a branch in the code that runs only
in production. The bug existed in production all along. The staging environment never ran the
relevant code path. The tests, which run against staging-equivalent configuration, never caught
it.

Common variations:

- **Feature toggles by environment name.** New features are enabled or disabled by checking
  the environment name rather than a proper feature flag system. "Turn it on in staging, turn
  it on in production next week" implemented as `env === 'staging'`.
- **Behavior suppression for testing.** Slow operations, external calls, or side effects are
  suppressed in non-production environments: `if (env == 'production') { sendEmail(); }`. The
  code that sends emails is never tested in the pipeline.
- **Hardcoded URLs and endpoints.** Service URLs are selected by environment name rather than
  injected as configuration: `url = (env == 'prod') ? 'https://api.example.com' : 'https://staging-api.example.com'`.
  Adding a new environment requires code changes.
- **Database seeding by environment.** `if (env != 'production') { seedTestData(); }` runs
  in every environment except production. Production-specific behavior is never verified
  before it runs in production.
- **Logging and monitoring gaps.** Debug logging enabled only in staging, metrics emission
  suppressed in test. The production behavior of these systems is untested.

The telltale sign: "it works in staging" and "it works in production" are considered two
different statements rather than synonyms, because the code genuinely behaves differently
in each.

## Why This Is a Problem

Environment-specific code branches create a fragmented codebase where no environment runs
exactly the same software as any other. Testing in staging validates one version of the code.
Production runs another. The staging-to-production promotion is not a verification that the
same software works in a different environment - it is a transition to different software
running in a different environment.

### It reduces quality

Production code paths gated behind `if (env == 'production')` are never executed by the
test suite. They run for the first time in front of real users. The fundamental premise of
a testing [pipeline](../../glossary/#pipeline) is that code validated in earlier stages is the same code that reaches
production. Environment-specific branches break this premise.

This creates an entire category of latent defects: bugs that exist only in the code paths
that are inactive during testing. The email sending code that only runs in production has
never been exercised against the current version of the email template library. The payment
processing code with a production-only safety check has never been run through the integration
tests. These paths accumulate over time, and each one is an untested assumption that could
break silently.

Teams without environment-specific code run identical logic in every environment. Behavior
differences between environments arise only from configuration - database connection strings,
API keys, feature flag states - not from conditionally compiled code paths. When staging passes,
the team has genuine confidence that production will behave the same way.

### It increases rework

A developer who needs to modify a code path that is only active in production cannot run
that path locally or in the [CI](../../glossary/#ci-continuous-integration) pipeline. They must deploy to production and observe, or
construct a special environment that mimics the production condition. Neither option is
efficient, and both slow the development cycle for every change that touches a production-only
path.

When production-specific bugs are found, they can only be reproduced in production (or in
a [production-like environment](../../glossary/#production-like-environment) that requires special setup). Debugging in production is slow
and carries risk. Every reproduction attempt requires a deployment. The development cycle for
production-only bugs is days, not hours.

The environment-name checks also accumulate technical debt. Every new environment (a
performance testing environment, a demo environment, a disaster recovery environment) requires
auditing the codebase for existing environment-specific branches and deciding how each one
should behave in the new context. Code that checks `if (env == 'staging')` does the wrong
thing in a performance environment. Adding the performance environment creates another category
of environment-specific bugs.

### It makes delivery timelines unpredictable

Deployments to production become higher-risk events when production runs code that staging
never ran. The team cannot fully trust staging validation, so they compensate with longer
watching periods after production deployment, more conservative deployment schedules, and
manual verification steps that do not apply to staging deployments.

When a production-only bug is discovered, diagnosing it takes longer than a standard bug
because reproducing it requires either production access or special environment setup. The
incident investigation must first determine whether the bug is production-specific, which
adds steps before the actual debugging begins.

The unpredictability compounds when production-specific bugs appear infrequently. A code path
that runs only in production and only under certain conditions may not fail until a specific
user action or a specific date (if, for example, the production-only branch contains a date
calculation). These bugs have the longest time-to-discovery and the most complex investigation.

### Impact on continuous delivery

[Continuous delivery](../../glossary/#cd-continuous-delivery) depends on the ability to validate software in staging with high confidence
that it will behave the same way in production. Environment-specific code undermines this
confidence at its foundation. If the code literally runs different logic in production than
in staging, then staging validation is incomplete by design.

CD also requires the ability to deploy frequently and safely. Deployments to a production
environment that runs different code than staging are higher-risk than they should be. Each
deployment introduces not just the changes the developer made, but also all the untested
production-specific code paths that happen to be active. The team cannot deploy frequently
with confidence when they cannot trust that staging behavior predicts production behavior.

## How to Fix It

### Step 1: Audit the codebase for environment-name checks (Week 1)

Find every location where environment-specific logic is embedded in code:

1. Search for environment name literals in the codebase: `'production'`, `'staging'`, `'prod'`,
   `'development'`, `'dev'`, `'test'` used in conditional expressions.
2. Search for environment variable reads that feed conditionals: `process.env.NODE_ENV`,
   `System.getenv("ENVIRONMENT")`, `os.environ.get("ENV")`.
3. Categorize each result: Is this a configuration lookup (acceptable)? A feature flag
   implemented by hand (replace with proper flag)? Behavior suppression (remove or externalize)?
   A hardcoded URL or connection string (externalize to configuration)?
4. Create a list ordered by risk: code paths that are production-only and have no test
   coverage are highest risk.

### Step 2: Externalize URL and endpoint selection to configuration (Weeks 1-2)

Start with hardcoded URLs and connection strings - they are the easiest environment assumptions to eliminate:

{{% code-collapse title="Externalizing a hardcoded URL to configuration (Java)" %}}
```java
// Before - hard-coded environment assumption
String apiUrl;
if (environment.equals("production")) {
    apiUrl = "https://api.payments.example.com";
} else {
    apiUrl = "https://api-staging.payments.example.com";
}

// After - externalized to configuration
String apiUrl = config.getRequired("payments.api.url");
```
{{% /code-collapse %}}

The URL is now injected at deployment time from environment-specific configuration files or
a configuration management system. The code is identical in every environment. Adding a new
environment requires no code changes, only a new configuration entry.

### Step 3: Replace hand-rolled feature flags with a proper mechanism (Weeks 2-3)

Introduce a proper feature flag mechanism wherever environment-name checks are implementing
feature toggles:

{{% code-collapse title="Replacing an environment-name feature toggle with a proper flag (JavaScript)" %}}
```javascript
// Before - environment name as feature flag
if (process.env.NODE_ENV === 'staging') {
  enableNewCheckout();
}

// After - explicit feature flag
if (featureFlags.isEnabled('new-checkout')) {
  enableNewCheckout();
}
```
{{% /code-collapse %}}

Feature flag state is now configuration rather than code. The flag can be enabled in staging
and disabled in production (or vice versa) without changing code. The code path that new-checkout
activates is now testable in every environment, including the test suite, by setting the flag
appropriately.

Start with a simple in-process feature flag backed by a configuration file. Migrate to a
dedicated feature flag service as the pattern matures.

### Step 4: Remove behavior suppression by environment (Weeks 3-4)

Replace environment-aware suppression of email sending, external API calls, and notification
firing with proper test doubles:

1. Identify all places where production-only behavior is gated behind an environment check.
2. Extract that behavior behind an interface or function parameter.
3. Inject a real implementation in production configuration and a test implementation in
   non-production configuration.

{{% code-collapse title="Replacing environment-gated email sending with dependency injection (Java)" %}}
```java
// Before - production check suppresses email sending in test
public void notifyUser(User user) {
    if (!environment.equals("production")) return;
    emailService.send(user.email(), ...);
}

// After - email service is injected, tests inject a recording double
public void notifyUser(User user, EmailService emailService) {
    emailService.send(user.email(), ...);
}
```
{{% /code-collapse %}}

The production code now runs in every environment. Tests use a recording double that captures
what emails would have been sent, allowing tests to verify the notification logic. The
environment check is gone.

### Step 5: Add integration tests for previously-untested production paths (Weeks 4-6)

Add tests for every production-only code path that is now testable:

1. Identify the code paths that were previously only active in production.
2. Write integration tests that exercise those paths with appropriate test doubles or test
   infrastructure.
3. Add these tests to the CI pipeline so they run on every commit.

This step converts previously-untested production-specific logic into well-tested shared logic.
Each test added reduces the population of latent production-only defects.

### Step 6: Enforce the no-environment-name-in-code rule (Ongoing)

Add a static analysis check that fails the pipeline if environment name literals appear in
application logic (as opposed to configuration loading):

- Use a custom lint rule in the language's linting framework.
- Or add a build-time check that scans for the prohibited patterns.
- Exception: the configuration loading code that reads the environment name to select the
  right configuration file is acceptable. Flag everything else for review.

| Objection | Response |
|-----------|----------|
| "Some behavior genuinely has to be different in production" | Behavior that differs by environment should differ because of configuration, not because of code. The database URL is different in production - that is configuration. The business logic for how a payment is processed should be identical - that is code. Audit your environment checks this sprint and sort them into these two buckets. |
| "We use environment checks to prevent data corruption in tests" | This is the right concern, solved the wrong way. Protect production data by isolating test environments from production data stores, not by guarding code paths. If a test environment can reach production data stores, fix that network isolation first - the environment check is treating the symptom. |
| "Replacing our hand-rolled feature flags is a big project" | Start with the highest-risk checks first - the ones where production runs code that tests never execute. A simple configuration-based feature flag is ten lines of code. Replace one high-risk check this sprint and add the test that was previously impossible to write. |
| "Our staging environment intentionally limits some external calls to control cost" | Limit the external calls at the infrastructure level (mock endpoints, sandbox accounts, rate limiting), not by removing code paths. Move the first cost-driven environment check to an infrastructure-level mock this sprint and delete the code branch. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Environment-specific code checks (count) | Should reach zero in application logic (may remain in configuration loading) |
| Code paths executed in staging but not production | Should approach zero |
| Production incidents caused by production-only code paths | Should decrease as those paths become tested |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as staging validation becomes more reliable |
| [Lead time](../../../metrics/lead-time/) | Should decrease as production-only debugging cycles are eliminated |
| Time to reproduce production bugs locally | Should decrease as code paths become environment-agnostic |

## Related Content

- [Application Configuration](../../../migrate-to-cd/migration-path/pipeline/application-config/) - The right way to vary behavior between environments is through configuration
- [Production-Like Environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Environments should differ only in scale and configuration, not in behavior
- [Feature Flags](../../../migrate-to-cd/migration-path/optimize/feature-flags/) - Proper feature flags replace environment-name feature toggles
- [Everything as Code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/) - Configuration belongs in version control, not in conditional code
- [Deterministic Pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - A deterministic pipeline requires the same code to run in every environment
