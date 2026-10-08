---
title: "Branch by Abstraction"
linkTitle: "Branch by Abstraction"
weight: 2
description: >
  Replace an existing implementation behind a stable interface, one small commit at a time, without a long-lived branch.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

Branch by abstraction lets you replace an internal implementation, algorithm, or library on trunk. You do not need a long-lived branch, and you do not disrupt the code that already depends on it.
{{% /pageinfo %}}

## What is branch by abstraction?

Branch by abstraction introduces an interface over an existing implementation and redirects callers to that interface. You then build and switch in a new implementation behind the interface, all as small commits on trunk. The "branching" happens in the abstraction layer, not in version control.

> The technique replaces a source-control branch with a branch in the code itself. That code branch is an interface with two implementations, one of which is live.

### What branch by abstraction is not

- It is not a long-lived feature branch with an interface added to justify it. If the work still takes weeks on a branch, the abstraction hasn't replaced anything.
- It is not the [strangler fig pattern]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}). Branch by abstraction swaps an implementation behind an in-process interface. Strangler fig replaces a whole subsystem or service by routing traffic to it at a system boundary. Use branch by abstraction inside a codebase you own; use strangler fig when the thing being replaced is bigger than one component.
- It is not a permanent abstraction layer. Once the swap is complete, remove the old implementation, and remove the interface too if nothing else needs it.

## What branch by abstraction improves

| Problem | How Branch by Abstraction Helps |
|---------|----------------------------------|
| Large refactors force a long-lived branch | The refactor happens in small commits on trunk, behind an interface |
| Fear of breaking existing callers during a rewrite | Callers depend on the interface, not the implementation, so the swap is invisible to them |
| "Big bang" cutover risk | The switch is a single dependency-injection change, easy to revert |
| Dead code left behind after a migration | The interface makes the old implementation easy to find and delete |

## Making the swap

### Step 1: Abstract

Introduce an interface over the existing code and redirect every caller to it. The commit changes no behavior: the interface wraps the current implementation and nothing else changes.

{{< card code=true header="**Step 1: introduce the interface over the existing implementation**" lang="javascript" >}}
class AuthService {
  authenticate(credentials) {
    // existing implementation, moved behind the interface unchanged
  }
}

// callers now depend on AuthService, not the concrete legacy class
const auth = new AuthService();
{{< /card >}}

### Step 2: Implement

Build the new implementation alongside the old one, as its own class. Commit and deploy the new class in small pieces. No caller uses the new class yet, so it carries the same zero risk as [dark code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}).

{{< card code=true header="**Step 2: build the new implementation alongside the old one**" lang="javascript" >}}
class LegacyAuthService {
  authenticate(credentials) {
    // existing messy implementation, untouched
  }
}

class ModernAuthService {
  authenticate(credentials) {
    // new implementation, built and tested incrementally
  }
}
{{< /card >}}

### Step 3: Switch

Change the dependency injection or factory binding to instantiate the new implementation instead of the old one. The binding change is the entire cutover: one line, one commit, easy to revert.

{{< card code=true header="**Step 3: switch the binding to the new implementation**" lang="javascript" >}}
// container.js
container.register('AuthService', ModernAuthService); // was LegacyAuthService
{{< /card >}}

You might need to de-risk the switch further or confirm that the two implementations produce identical results. In that case, run them side by side with a [parallel run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}) before flipping the binding.

### Step 4: Prune

Delete the legacy implementation. Delete the interface too if only one implementation remains and nothing else depends on the abstraction.

{{< card code=true header="**Step 4: delete the legacy implementation**" lang="javascript" >}}
class AuthService {
  authenticate(credentials) {
    // just the modern implementation now
  }
}
{{< /card >}}

Cleanup here is a straightforward deletion of a class. There is no scattered `if/else` logic to search for, because the old and new implementations were never in the same function.

## Key pitfalls

### 1. "We built the new implementation and the interface in the same commit"

Combining the two makes the abstraction hard to review on its own merits. It also removes the option to ship the interface as a safe, standalone step. Extract the interface first, verify it changes nothing, then start on the new implementation.

### 2. "We left the old implementation in place after the switch"

The switch commit is not the finish line. If the old class is still in the codebase a month later, delete it. An unused implementation behind a working interface is exactly the kind of dead weight branch by abstraction is supposed to avoid.

### 3. "We used branch by abstraction to replace a whole service"

If the replacement spans multiple components, teams, or a system boundary, that's a [strangler fig]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}) problem, not an in-process interface swap.

## Measuring success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Time from abstraction to switch | Days to a few weeks | Confirms the technique is replacing a branch, not becoming one |
| Legacy implementations still in the codebase after switch | Zero after the agreed cleanup window | Confirms pruning actually happens |
| Commits per swap | Many small commits, no single large diff | Confirms the refactor stayed on trunk in small pieces |

## Next step

If you need to prove the new implementation matches production behavior before switching the binding, use [Parallel Run]({{< relref "/docs/foundations/evolutionary-coding/parallel-run" >}}).

## Related content

- [Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}) - the full decision hierarchy
- [Dark Code]({{< relref "/docs/foundations/evolutionary-coding/dark-code" >}}) - the simpler technique for new, unreferenced logic
- [Architecture Decoupling]({{< relref "/docs/optimize/architecture-decoupling" >}}) - the strangler fig pattern for replacing whole subsystems
- [Long-Lived Feature Branches]({{< relref "/docs/anti-patterns/branching-integration/long-lived-feature-branches" >}}) - the anti-pattern branch by abstraction replaces
- [Branch By Abstraction](https://www.branchbyabstraction.com/) - external reference site for the pattern
