---
aliases:
  - /docs/symptoms/staging-passes-production-fails/
title: "Staging Passes but Production Fails"
linkTitle: "Staging passes, production fails"
description: >
  Deployments pass every pre-production check but break when they reach production.
tags:
  - environment-consistency
  - deployment-automation
---

## What you are seeing

Code passes tests, QA signs off, staging looks fine. Then the release
hits production and something breaks: a feature behaves differently, a dependent service times
out, or data that never appeared in staging triggers an unhandled edge case.

The team scrambles to roll back or hotfix. Confidence in the [pipeline](../../glossary/#pipeline) drops. People start adding
more manual verification steps, which slows delivery without actually preventing the next
surprise.

## Common causes

### Snowflake Environments

When each environment is configured by hand (or was set up once and has drifted since), staging
and production are never truly the same. Different library versions, different environment
variables, different network configurations. Code that works in one context silently fails in
another because the environments are only superficially similar.

**Read more:** [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/)

### Blind Operations

Sometimes the problem is not that staging passes and production fails. It is that production
failures go undetected until a customer reports them. Without monitoring and alerting, the team
has no way to verify production health after a deploy. "It works in staging" becomes the only
signal, and production problems surface hours or days late.

**Read more:** [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Tightly Coupled Monolith

Hidden dependencies between components mean that a change in one area affects behavior in
another. In staging, these interactions may behave differently because the data is smaller, the
load is lighter, or a dependent service is stubbed. In production, the full weight of real usage
exposes coupling the team did not know existed.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Manual Deployments

When deployment involves human steps (running scripts by hand, clicking through a console,
copying files), the process is never identical twice. A step skipped in staging, an extra
configuration applied in production, a different order of operations. The deployment itself
becomes a source of variance between environments.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **Are your environments provisioned from the same infrastructure code?** If not, or if you
   are not sure, start with [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/).
2. **How did you discover the production failure?** If a customer or support team reported it
   rather than an automated alert, start with
   [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/).
3. **Does the failure involve a different service or module than the one you changed?** If yes,
   the issue is likely hidden coupling. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
4. **Is the deployment process identical and automated across all environments?** If not, start
   with [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).

**Ready to fix this?** The most common cause is [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/). Start with its [How to Fix It](../../anti-patterns/pipeline/snowflake-environments/#how-to-fix-it) section for week-by-week steps.

---

## Related Content

- [It Works on My Machine](../../symptoms/visibility/works-on-my-machine/) - The same environment inconsistency pattern at a different stage
- [Tests Pass in One Environment but Fail in Another](../../symptoms/testing/environment-dependent-failures/) - Environment-dependent behavior is the common root
- [Snowflake Environments](../../anti-patterns/pipeline/snowflake-environments/) - Unique environments that diverge from production
- [Production-Like Environments](../../migrate-to-cd/migration-path/pipeline/production-like-environments/) - Making staging match production
- [Change Fail Rate](../../metrics/change-fail-rate/) - Track deployment failures that staging should have caught
