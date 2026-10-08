---
title: "Dark Code"
linkTitle: "Dark Code"
weight: 1
description: >
  Deploy new logic to production before anything calls it, so it carries zero release risk until you wire it in.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

Dark code is the default technique for integrating incomplete work. It costs nothing to maintain and requires no cleanup, because the code never runs until you decide to connect it.
{{% /pageinfo %}}

## What is dark code?

Dark code is new logic that is fully built, tested, and deployed to production, but not yet reachable. No route, UI trigger, or message consumer points to it. It sits inert in the running binary until the final commit connects it.

This is sometimes called "connect tests last" or a "dark launch," because the implementation is complete; only the wiring is missing.

### What dark code is not

- It is not dead code left behind after a change. Dark code is temporary and has a defined moment it becomes live.
- It is not a feature flag. There is no runtime check and no conditional branch. The only cleanup is the wiring commit itself, which is not cleanup at all.
- It is not untested. The code has full unit and integration test coverage before it deploys; only production traffic hasn't reached it yet.

## What dark code improves

| Problem | How Dark Code Helps |
|---------|---------------------|
| A feature takes multiple days or weeks to build | Each piece integrates and deploys daily; only the last commit exposes it |
| [Feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}) sprawl | No flag is created, so there's nothing to track or remove later |
| Fear of half-built features reaching users | Code with no caller cannot be reached by any user, regardless of deployment frequency |
| Large, risky final pull requests | The final change is a small wiring commit, not the whole feature |

## Building behind dark code

### Step 1: Build the implementation

Write the domain logic, service, or component with its own unit and integration tests, exactly as you would if it were shipping today. Commit and deploy continuously as you go.

### Step 2: Deploy without wiring

Each commit ships to production. The code compiles, is tested, and runs inside the deployed artifact, but nothing calls it. There is no behavior change for users, because there is no path to the new code.

{{< card code=true header="**Dark code: new service deployed with no caller**" lang="javascript" >}}
// discountEngine.js - deployed, tested, unreferenced
class DiscountEngine {
  calculate(cart) {
    // Fully implemented and unit tested
  }
}

module.exports = DiscountEngine;

// Nothing in the request handlers imports DiscountEngine yet.
// It ships with every deploy and does nothing until it's wired in.
{{< /card >}}

### Step 3: Wire it in as the final change

Once the implementation is complete and reviewed, the last pull request adds the entry point: the route, the UI trigger, or the consumer binding.

{{< card code=true header="**Dark code: final commit adds the entry point**" lang="javascript" >}}
const DiscountEngine = require('./discountEngine');
const engine = new DiscountEngine();

app.post('/cart/checkout', (req, res) => {
  const discount = engine.calculate(req.body.cart);
  res.json({ discount });
});
{{< /card >}}

This commit is small and easy to review, because all the risk was already tested and deployed in the commits before it.

## When dark code is not enough

Dark code works when you control every caller and can wait to wire the last one in. It does not work when:

- **You need to compare the new logic against production behavior before trusting it.** Use [parallel run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}) instead.
- **You are replacing an implementation that already has live callers.** Use [branch by abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}) instead.
- **The business needs the release timed independently of when the code is ready**, such as a coordinated launch or a gradual percentage rollout. Use a [feature flag]({{< relref "/docs/optimize/feature-flags" >}}) instead.

## Key pitfalls

### 1. "We wired it in early to test in production"

If you need production traffic to validate the new code before trusting it, that is a parallel run, not dark code. Wiring in an unfinished path to see what happens exposes users to unfinished work.

### 2. "The dark code sat unwired for three months"

Dark code should be wired in within days, not months. If the entry point keeps slipping, the feature isn't actually close to done, and calling it dark code is hiding that from the team.

## Measuring success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Time from first dark commit to wiring | Days | Confirms dark code isn't a substitute for finishing the feature |
| Size of the final wiring commit | Small: a route or binding, not logic | Confirms the risk was already tested and deployed incrementally |
| Feature flags created per sprint | Decreasing as dark code adoption increases | Confirms flags are reserved for cases dark code can't cover |

## Next step

When you're replacing an implementation that already has live callers instead of adding a new one, use [Branch by Abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}).

## Related content

- [Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}) - the full decision hierarchy
- [Trunk-Based Development]({{< relref "/docs/foundations/trunk-based-development" >}}) - the practice dark code makes safe
- [Feature Flags]({{< relref "/docs/optimize/feature-flags" >}}) - the alternative to reach for once dark code doesn't apply
- [Small Batches]({{< relref "/docs/optimize/small-batches" >}}) - deploying each piece of a feature continuously
