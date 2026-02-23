---
title: "Trunk-Based Development"
linkTitle: "Trunk-Based Development"
weight: 1
description: >
  Integrate all work to the trunk at least once per day to enable continuous integration.
---

{{% pageinfo %}}
**Phase 1 - Foundations**

[Trunk-based development](../../../../glossary/#tbd-trunk-based-development) is the first foundation to establish. Without daily integration to a shared trunk, the rest of the [CD](../../../../glossary/#cd-continuous-delivery) migration cannot succeed. This page covers the core practice, two migration paths, and a tactical guide for getting started.
{{% /pageinfo %}}

## What Is Trunk-Based Development?

Trunk-based development (TBD) is a branching strategy where all developers integrate their work into a single shared branch - the trunk - at least once per day. The trunk is always kept in a releasable state.

This is a **non-negotiable prerequisite for [continuous delivery](../../../../glossary/#cd-continuous-delivery)**. If your team is not integrating to trunk daily, you are not doing [CI](../../../../glossary/#ci-continuous-integration), and you cannot do CD. There is no workaround.

> "If it hurts, do it more often, and bring the pain forward."
>
> - Jez Humble, *Continuous Delivery*

### What TBD Is Not

- It is **not** "everyone commits directly to `main` with no guardrails." You still test, review, and validate work - you just do it in small increments.
- It is **not** incompatible with code review. It requires review to happen quickly.
- It is **not** reckless. It is the opposite: small, frequent integrations are far safer than large, infrequent merges.

## What Trunk-Based Development Improves

| Problem | How TBD Helps |
|---------|---------------|
| Merge conflicts | Small changes integrated frequently rarely conflict |
| Integration risk | Bugs are caught within hours, not weeks |
| Long-lived branches diverge from reality | The trunk always reflects the current state of the codebase |
| "Works on my branch" syndrome | Everyone shares the same integration point |
| Slow feedback | CI runs on every integration, giving immediate signal |
| Large batch deployments | Small changes are individually [deployable](../../../../glossary/#deployable) |
| Fear of deployment | Each change is small enough to reason about |

## Two Migration Paths

There are two valid approaches to trunk-based development. Both satisfy the minimum CD requirement of daily integration. Choose the one that fits your team's current maturity and constraints.

### Path 1: Short-Lived Branches

Developers create branches that live for **less than 24 hours**. Work is done on the branch, reviewed quickly, and merged to trunk within a single day.

**How it works:**

1. Pull the latest trunk
2. Create a short-lived branch
3. Make small, focused changes
4. Open a pull request (or use pair programming as the review)
5. Merge to trunk before end of day
6. The branch is deleted after merge

**Best for teams that:**

- Currently use long-lived feature branches and need a stepping stone
- Have regulatory requirements for traceable review records
- Use pull request workflows they want to keep (but make faster)
- Are new to TBD and want a gradual transition

**Key constraint:** The branch must merge to trunk within 24 hours. If it does not, you have a long-lived branch and you have lost the benefit of TBD.

### Path 2: Direct Trunk Commits

Developers commit directly to trunk. Quality is ensured through pre-commit checks, pair programming, and strong automated testing.

**How it works:**

1. Pull the latest trunk
2. Make a small, tested change locally
3. Run the local build and test suite
4. Push directly to trunk
5. CI validates the commit immediately

**Best for teams that:**

- Have strong automated test coverage
- Practice pair or mob programming (which provides real-time review)
- Want maximum integration frequency
- Have high trust and shared code ownership

**Key constraint:** This requires excellent test coverage and a culture where the team owns quality collectively. Without these, direct trunk commits become reckless.

## How to Choose Your Path

Ask these questions:

1. **Do you have automated tests that catch real defects?** If no, start with Path 1 and invest in [testing fundamentals](../testing-fundamentals/) in parallel.
2. **Does your organization require documented review approvals?** If yes, use Path 1 with rapid pull requests.
3. **Does your team practice pair programming?** If yes, Path 2 may work immediately - pairing is a continuous review process.
4. **How large is your team?** Teams of 2-4 can adopt Path 2 more easily. Larger teams may start with Path 1 and transition later.

Both paths are valid. The important thing is **daily integration to trunk**. Do not spend weeks debating which path to use. Pick one, start today, and adjust.

## Essential Supporting Practices

Trunk-based development does not work in isolation. These supporting practices make daily integration safe and sustainable.

### Feature Flags

When you integrate to trunk daily, incomplete features will exist on trunk. [Feature flags](../../../../glossary/#feature-flag) let you merge code that is not yet ready for users.

{{% code-collapse title="Simple feature flag example" lang="javascript" %}}
// Simple feature flag example
if (featureFlags.isEnabled('new-checkout-flow', user)) {
  return newCheckout(cart);
} else {
  return legacyCheckout(cart);
}
{{% /code-collapse %}}

**Rules for feature flags in TBD:**

- Use flags to decouple deployment from release
- Remove flags within days or weeks - they are temporary by design
- Keep flag logic simple; avoid nested or dependent flags
- Test both flag states in your automated test suite

**When NOT to use feature flags:**

- New features that can be built and connected in a final commit - use Connect Last instead
- Behavior changes that replace existing logic - use Branch by Abstraction instead
- New API routes - build the route, expose it as the last change
- Bug fixes or hotfixes - deploy immediately without a flag
- Simple changes where standard deployment is sufficient

Feature flags are covered in more depth in [Phase 3: Optimize](../../optimize/).

### Evolutionary Coding Practices

The ability to make code changes that are not complete features and integrate them to trunk without breaking existing behavior is a core skill for trunk-based development. You never make big-bang changes. You make small changes that limit risk. Feature flags are one approach, but two other patterns are equally important.

#### Branch by Abstraction

Branch by abstraction lets you gradually replace existing behavior while continuously integrating to trunk. It works in four steps:

{{% code-collapse title="Branch by abstraction - four-step pattern" lang="javascript" %}}
// Step 1: Create abstraction (integrate to trunk)
class PaymentProcessor {
  process(payment) {
    return this.implementation.process(payment)
  }
}

// Step 2: Add new implementation alongside old (integrate to trunk)
class StripePaymentProcessor {
  process(payment) {
    // New Stripe implementation
  }
}

// Step 3: Switch implementations (integrate to trunk)
const processor = useNewStripe
  ? new StripePaymentProcessor()
  : new LegacyProcessor()

// Step 4: Remove old implementation (integrate to trunk)
{{% /code-collapse %}}

Each step is a separate commit that keeps trunk working. The old behavior runs until you explicitly switch, and you can remove the abstraction layer once the migration is complete.

#### Connect Last

Connect Last means you build all the components of a feature, each individually tested and integrated to trunk, and wire them into the user-visible path only in the final commit.

{{% code-collapse title="Connect Last pattern - build components then wire to UI" lang="javascript" %}}
// Commits 1-10: Build new checkout components (all tested, all integrated)
function CheckoutStep1() { /* tested, working */ }
function CheckoutStep2() { /* tested, working */ }
function CheckoutStep3() { /* tested, working */ }

// Commit 11: Wire up to UI (final integration)
<Route path="/checkout" component={CheckoutStep1} />
{{% /code-collapse %}}

Because nothing references the new code until the last commit, there is no risk of breaking existing behavior during development.

#### Which Pattern Should I Use?

| Pattern | Best for | Example |
|---------|----------|---------|
| **Connect Last** | New features that do not affect existing code | Building a new checkout flow, adding a new report page |
| **Branch by Abstraction** | Replacing or modifying existing behavior | Swapping a payment processor, migrating a data layer |
| **Feature Flags** | Gradual rollout, testing in production, or customer-specific features | Dark launches, A/B tests, beta programs |

If your change does not touch existing code paths, Connect Last is the simplest option. If you are replacing something that already exists, Branch by Abstraction gives you a safe migration path. Reserve feature flags for cases where you need runtime control over who sees the change.

### Commit Small, Commit Often

Each commit should be a small, coherent change that leaves trunk in a working state. If you are committing once a day in a large batch, you are not getting the benefit of TBD.

**Guidelines:**

- Each commit should be independently deployable
- A commit should represent a single logical change
- If you cannot describe the change in one sentence, it is too big
- Target multiple commits per day, not one large commit at end of day

### Test-Driven Development (TDD) and ATDD

[TDD](../../../../glossary/#tdd-test-driven-development) provides the safety net that makes frequent integration sustainable. When every change is accompanied by tests, you can integrate confidently.

- **TDD:** Write the test before the code. Red, green, refactor.
- **ATDD (Acceptance Test-Driven Development):** Write acceptance criteria as executable tests before implementation.

Both practices ensure that your test suite grows with your code and that trunk remains releasable.

## Getting Started: A Tactical Guide

### Step 1: Shorten Your Branches (Week 1)

If your team currently uses long-lived feature branches, start by shortening their lifespan.

| Current State | Target |
|---------------|--------|
| Branches live for weeks | Branches live for < 1 week |
| Merge once per sprint | Merge multiple times per week |
| Large merge conflicts are normal | Conflicts are rare and small |

**Action:** Set a team agreement that no branch lives longer than 2 days. Track branch age as a metric.

### Step 2: Integrate Daily (Week 2-3)

Tighten the window from 2 days to 1 day.

**Action:**

- Every developer merges to trunk at least once per day, every day they write code
- If work is not complete, use a feature flag or other technique to merge safely
- Track [integration frequency](../../../../metrics/integration-frequency/) as your primary metric

### Step 3: Ensure Trunk Stays Green (Week 2-3)

Daily integration is only useful if trunk remains in a releasable state.

**Action:**

- Run your test suite on every merge to trunk
- If the build breaks, fixing it becomes the team's top priority
- Establish a [working agreement](../../../../glossary/#working-agreement): "broken build = stop the line" (see [Working Agreements](../working-agreements/))

### Step 4: Remove the Safety Net of Long Branches (Week 4+)

Once the team is integrating daily with a green trunk, eliminate the option of long-lived branches.

**Action:**

- Configure branch protection rules to warn or block branches older than 24 hours
- Remove any workflow that depends on long-lived branches (e.g., "dev" or "release" branches)
- Celebrate the transition - this is a significant shift in how the team works

## Key Pitfalls

### 1. "We integrate daily, but we also keep our feature branches"

If you are merging to trunk daily but also maintaining a long-lived feature branch, you are not doing TBD. The feature branch will diverge, and merging it later will be painful. The integration to trunk must be the **only** integration point.

### 2. "Our builds are too slow for frequent integration"

If your CI [pipeline](../../../../glossary/#pipeline) takes 30 minutes, integrating multiple times a day feels impractical. This is a real constraint - address it by investing in [build automation](../build-automation/) and parallelizing your test suite. Target a build time under 10 minutes.

### 3. "We can't integrate incomplete features to trunk"

Yes, you can. Use feature flags to hide incomplete work from users. The code exists on trunk, but the feature is not active. This is a standard practice at every company that practices CD.

### 4. "Code review takes too long for daily integration"

If pull request reviews take 2 days, daily integration is impossible. The solution is to change how you review: pair programming provides continuous review, mob programming reviews in real time, and small changes can be reviewed asynchronously in minutes. See [Code Review](../code-review/) for specific techniques.

### 5. "What if someone pushes a bad commit to trunk?"

This is why you have automated tests, CI, and the "broken build = top priority" agreement. Bad commits will happen. The question is how fast you detect and fix them. With TBD and CI, the answer is minutes, not days.

## Measuring Success

Track these metrics to verify your TBD adoption:

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Integration frequency](../../../../metrics/integration-frequency/) | At least 1 per developer per day | Confirms daily integration is happening |
| Branch age | < 24 hours | Catches long-lived branches |
| [Build duration](../../../../metrics/build-duration/) | < 10 minutes | Enables frequent integration without frustration |
| Merge conflict frequency | Decreasing over time | Confirms small changes reduce conflicts |

## Further Reading

This page covers the essentials for Phase 1 of your migration. For detailed guidance on specific scenarios:

- [TBD Migration Guide](tbd-migration/) - Detailed scenarios including regulated environments, multi-team environments, and advanced pitfalls
- [Trunk-Based Development](../../../../practices/trunk-based-development/) - Practice definition and minimum criteria
- [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com) - Comprehensive reference by Paul Hammant

## Next Step

Once your team is integrating to trunk daily, build the test suite that makes that integration trustworthy. Continue to [Testing Fundamentals](../testing-fundamentals/).

## Related Content

- [Painful Merges](../../../../symptoms/flow/painful-merges/) - Symptom eliminated by integrating to trunk daily
- [Merge Freeze](../../../../symptoms/deployment/merge-freeze/) - Symptom caused by long-lived branches and infrequent integration
- [No Fast Feedback](../../../../symptoms/flow/no-fast-feedback/) - Symptom that daily integration and CI address directly
- [Long-Lived Feature Branches](../../../../anti-patterns/branching-integration/long-lived-feature-branches/) - Anti-pattern that TBD replaces
- [Integration Deferred](../../../../anti-patterns/branching-integration/integration-deferred/) - Anti-pattern where integration is postponed until late in development
- [Integration Frequency](../../../../metrics/integration-frequency/) - Key metric for tracking TBD adoption
