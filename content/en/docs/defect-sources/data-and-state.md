---
title: "Data & State Defects"
linkTitle: "Data & State"
weight: 7
description: >
  Data defects are particularly dangerous because they can corrupt persistent state. Unlike code defects, data corruption often cannot be fixed by deploying a new version.
---

Data defects are particularly dangerous because they can corrupt persistent state. Unlike code
defects, data corruption often cannot be fixed by deploying a new version.

| Issue | Earliest Detection<br>(Automation) | Automated<br>Detection | Earlier Detection<br>with AI | Systemic<br>Prevention |
|-------|-------------------|-------------------|-------------------|-----|
| Schema migration and backward compatibility failures | [CI](../glossary/#ci-continuous-integration) | Schema compatibility validators, migration dry-runs | Predict downstream impact by understanding consumer usage patterns | Expand-then-contract schema migrations; never breaking changes |
| Null or missing data assumptions | Pre-commit | Null safety static analyzers, strict type systems | Flag code where optional fields are used without null checks | Null-safe type systems; Option/Maybe as default; validate at boundaries |
| Concurrency and ordering issues | CI | Thread sanitizers, load tests with randomized timing | <span class="ai-blocked">Design patterns, not AI</span> | Design for out-of-order delivery; idempotent consumers |
| Cache invalidation errors | Acceptance Tests | Cache consistency monitoring, TTL verification, stale data detection | Review cache invalidation logic for incomplete paths or mismatches | Short TTLs; event-driven invalidation |

## Related Content

- [Defect Sources](../) - full catalog overview and how to use it
- [Testing](../../testing/) - testing types and best practices
