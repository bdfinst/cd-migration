---
title: "Evolutionary Coding Techniques"
linkTitle: "Evolutionary Coding Techniques"
weight: 2
description: >
  Choose the least intrusive technique for integrating incomplete work to trunk, from dark code to feature flags as a last resort.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

[Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}) requires integrating incomplete work daily without breaking trunk or exposing half-built features to users. This section covers the techniques that make that possible, ordered from least to most costly to maintain.
{{% /pageinfo %}}

## Deployment is not release

[Deployment]({{< relref "/docs/reference/glossary#deployable" >}}) is a technical action: pushing code to production. Release is a business decision: making a capability available to users. Evolutionary coding techniques are how you deploy continuously while controlling release independently.

[Feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}) are the best-known way to make that separation, which is why teams reach for them first. But a runtime `if (flag)` branch is conditional complexity. You have to test every flag combination, and you have to delete the flag later or it becomes permanent debt. Most incomplete work does not need a flag at all. Structure the work so the unfinished parts are inert until they are ready.

Use the least intrusive technique that solves the problem. Reach for a flag only when nothing simpler applies.

## In this section

| Page | What You'll Learn |
|------|-------------------|
| [Dark Code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}) | Deploy new logic before anything calls it, so it carries zero release risk |
| [Branch by Abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}) | Replace an existing implementation behind a stable interface, one commit at a time |
| [Parallel Run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}) | Prove a new implementation matches production behavior before you trust it |
| [Expand and Contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}) | Evolve a shared database schema or API contract without a breaking change |

## The hierarchy of techniques

Work down this list. Each technique carries more long-term maintenance cost than the one above it.

| Technique | What It Costs to Maintain |
|-----------|---------------------------|
| [Dark code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}) | Nothing. The code sits unreferenced until it's wired in. |
| [Branch by abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}) | One interface and one deletion once the swap is complete. |
| [Parallel run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}) | A temporary comparison harness. |
| [Expand and contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}) | A multi-step migration with a defined end state. |
| [Strangler fig]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}) | A routing layer, but no branching inside the code it replaces. |
| [Feature flags]({{< relref "/docs/optimize/feature-flags" >}}) | Ongoing lifecycle management: an owner, a removal date, and combinatorial test cases until it's deleted. |

## How to choose

Ask these questions in order. Stop at the first "yes."

1. **Can the change be introduced additively, with nothing pointing to it yet?** Use [dark code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}).
2. **Does an existing interface already isolate this behavior, or can you extract one first?** Use [branch by abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}).
3. **Do you need to prove the new logic produces the same answer as the old logic before you trust it?** Use [parallel run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}).
4. **Are you changing a shared contract, like a database schema or an API, that other code or services depend on?** Use [expand and contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}).
5. **Are you replacing a whole subsystem or service, not a single implementation?** Use the [strangler fig pattern]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}) at the routing layer.
6. **Is this strictly a business release timing decision that none of the above can express?** Examples include a coordinated launch, a kill switch, an entitlement, or an experiment. Use a [feature flag]({{< relref "/docs/optimize/feature-flags" >}}), and only at the edge of the system.

Reaching question 6 is a legitimate reason to flag. Reaching for a flag at question 1 is not.

## Rules if you do reach for a flag

- **Flag at the edge, not in domain logic.** Put the check in a controller, router, or top-level entry point. Never bury the check inside business logic or a data-access layer.
- **Give every flag an expiration date at creation time.** No date means the flag is permanent, and permanent release flags are debt.
- **Create the removal ticket in the same pull request that adds the flag.** Not later.
- **Never nest flags.** If capability B depends on capability A, extend A's flag instead of stacking a second flag on top of it.

See [Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}) for the full flag lifecycle, from creation through removal.

## Key pitfalls

### 1. "We used a flag because it was the tool we already knew"

Familiarity is not a reason to skip the hierarchy. A flag left in place after launch is technical debt that dark code or branch by abstraction would never have created in the first place.

### 2. "We picked branch by abstraction, but nothing was calling the old code through an interface yet"

Extract the interface first, as its own zero-behavior-change commit, before starting the swap. Introducing an abstraction and a new implementation in the same change makes the abstraction hard to review on its own merits.

### 3. "We treated a database migration like a code refactor"

A shared schema or API is a contract other people's code depends on. Use [expand and contract]({{< relref "/docs/foundations/evolutionary-coding/expand-and-contract" >}}) rather than branch by abstraction for anything consumed outside your own codebase.

## Next step

These techniques are what make [trunk-based development]({{< relref "/docs/foundations/trunk-based-development" >}}) safe for incomplete work. Once your team can integrate daily without flag sprawl, continue building the [test architecture]({{< relref "/docs/foundations/testing-fundamentals" >}}) that backs it.

## Related content

- [Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}) - the practice these techniques make safe
- [TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration" >}}) - worked scenarios using these techniques
- [Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}) - full lifecycle guidance for when a flag is the right tool
- [Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}) - the strangler fig pattern for replacing whole subsystems
- [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}) - the anti-pattern these techniques replace
- [Small Batches]({{< relref "/docs/optimize/small-batches" >}}) - the batch-sizing discipline these techniques support
