---
title: "Parallel Run"
linkTitle: "Parallel Run"
weight: 3
description: >
  Run a new implementation alongside the old one in production and compare results before you trust it.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

A parallel run executes the old and new code paths against the same production input, but only returns the old result to the caller. It proves correctness with real traffic before anyone depends on the new path.
{{% /pageinfo %}}

## What Is a Parallel Run?

A parallel run, sometimes called shadowing or a dark launch of logic, wraps a call so both the current implementation and a candidate replacement execute against identical production input. The caller always receives the current implementation's result. The candidate's result is captured and compared, never returned.

This technique is best known from GitHub's open-source Scientist library, which formalized the pattern for verifying refactors of high-risk code paths.

### What a Parallel Run Is Not

- It is not a percentage rollout. Every request runs through both implementations; nothing is split between them. Percentage rollout is a [feature flag]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}) concern that comes after a parallel run has already established parity.
- It is not A/B testing or [hypothesis-driven development]({{< relref "/docs/migrate-to-cd/optimize/hypothesis-driven-development" >}}). Users never see the candidate's output during a parallel run, so it measures technical correctness, not user response.
- It is not a permanent architecture. The comparison harness is temporary scaffolding, removed once the candidate becomes the primary path.

## What a Parallel Run Improves

| Problem | How a Parallel Run Helps |
|---------|---------------------------|
| High-risk rewrites of pricing, billing, or calculation logic | Mismatches surface on real production input before the new logic is trusted |
| "We think the refactor is equivalent, but we're not sure" | Telemetry gives statistical confidence instead of a guess |
| Regressions that only show up on rare production inputs | Every production request exercises both paths, including edge cases test suites miss |
| Risky migrations with no rollback story | The old path stays authoritative until the data proves the new one is safe |

## Running the Comparison

### Step 1: Wrap the call

Introduce a thin proxy around the existing call. The caller's contract does not change.

{{< card code=true header="**Step 1: wrap the call so both implementations execute**" lang="javascript" >}}
async function calculatePrice(order) {
  const legacyResult = await legacyPricingEngine.calculate(order);

  // Fire the candidate asynchronously; never let it affect the response
  shadowRun(() => modernPricingEngine.calculate(order), legacyResult, order);

  return legacyResult;
}
{{< /card >}}

### Step 2: Run the candidate and compare

Run the new implementation against the same input, in the background, and log any mismatch along with enough context to debug it.

{{< card code=true header="**Step 2: compare results and log mismatches**" lang="javascript" >}}
async function shadowRun(candidateFn, legacyResult, order) {
  try {
    const candidateResult = await candidateFn();
    if (!isEquivalent(candidateResult, legacyResult)) {
      telemetry.recordMismatch('pricing-engine', {
        orderId: order.id,
        legacyResult,
        candidateResult,
      });
    }
  } catch (err) {
    telemetry.recordCandidateError('pricing-engine', { orderId: order.id, err });
  }
}
{{< /card >}}

### Step 3: Watch the telemetry

Track mismatch rate, candidate error rate, and performance delta over a statistically meaningful window. Investigate every mismatch; each one is either a genuine bug in the candidate or a case where the legacy behavior was wrong and needs a deliberate decision.

### Step 4: Cut over and remove the harness

Once the mismatch rate holds at zero for the agreed period, switch the candidate to the primary path, typically with [branch by abstraction]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding/branch-by-abstraction" >}}), and delete the comparison harness. Leaving it in place after cutover is unnecessary runtime cost with no further benefit.

## When a Parallel Run Is Not Enough

- **The old and new implementations must not both execute**, for example when the operation has side effects like sending an email or charging a card. Idempotent, side-effect-free logic (pricing, scoring, routing decisions) is what parallel run is for. For operations with side effects, use [branch by abstraction]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding/branch-by-abstraction" >}}) with a smaller, monitored rollout instead.
- **You are changing a shared schema or contract, not just an implementation.** Use [expand and contract]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding/expand-and-contract" >}}) instead.

## Key Pitfalls

### 1. "We let the candidate's exceptions bubble up to the caller"

The candidate's failures must never affect the response. Catch and log every exception from the candidate path independently of the legacy path.

### 2. "We ran the comparison for a day and called it proven"

A parallel run needs enough volume and enough time to cover the input space that matters, including rare edge cases and periodic patterns like end-of-month billing. Set the comparison window based on when those cases actually occur, not a fixed number of days.

### 3. "We kept the shadow harness running after cutover"

The harness is temporary. Once the candidate is primary and stable, remove the shadow call entirely. Running both implementations forever doubles compute cost for no ongoing benefit.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Mismatch rate | Trending to zero before cutover | The core signal that the candidate is safe to promote |
| Candidate error rate | Zero, independent of the legacy path | Confirms the candidate doesn't crash on real production input |
| Time from shadow start to harness removal | Weeks, not indefinite | Confirms the harness is treated as temporary scaffolding |

## Next Step

If the change touches a shared database schema or an API contract rather than a single implementation, use [Expand and Contract]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding/expand-and-contract" >}}).

## Related Content

- [Evolutionary Coding Techniques]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding" >}}) - the full decision hierarchy
- [Branch by Abstraction]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development/evolutionary-coding/branch-by-abstraction" >}}) - the technique that typically performs the eventual cutover
- [Change Failure Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) - the metric a parallel run protects for high-risk changes
