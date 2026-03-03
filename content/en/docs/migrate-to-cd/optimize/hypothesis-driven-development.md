---
title: "Hypothesis-Driven Development"
linkTitle: "Hypothesis-Driven Development"
weight: 8
description: >
  Treat every change as an experiment with a predicted outcome, measure the result, and adjust future work based on evidence.
---

{{% pageinfo %}}
**Phase 3 - Optimize**

Hypothesis-driven development treats every change as an experiment. Instead of building features because someone asked for them and hoping they help, teams state a predicted outcome before writing code, measure the result after deployment, and use the evidence to decide what to do next. Combined with [feature flags]({{< relref "/docs/reference/glossary#feature-flag" >}}), [small batches]({{< relref "/docs/reference/glossary#batch-size" >}}), and [metrics-driven improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}), this practice closes the loop between shipping and learning.
{{% /pageinfo %}}

## Why Hypothesis-Driven Development

Most teams ship features without stating what outcome they expect. A product manager requests a feature, developers build it, and everyone moves on to the next item. Weeks later, nobody checks whether the feature actually helped.

This is waste. Teams accumulate features without knowing their impact, backlogs grow based on opinion rather than evidence, and the product drifts in whatever direction the loudest voice demands.

Hypothesis-driven development fixes this by making every change answer a question. If the answer is "yes, it helped," the team invests further. If the answer is "no," the team reverts or pivots before sinking more effort into the wrong direction. Over time, this produces a product shaped by evidence rather than assumptions.

## The Lifecycle

The hypothesis-driven development lifecycle has five stages. Each stage has a specific purpose and a clear output that feeds the next stage.

### 1. Form the Hypothesis

A hypothesis is a falsifiable prediction about what a change will accomplish. It follows a specific format:

**"We believe [change] will produce [outcome] because [reason]."**

The "because" clause is critical. Without it, you have a wish, not a hypothesis. The reason forces the team to articulate the causal model behind the change, which makes it possible to learn even when the experiment fails.

{{< card header="**Good hypothesis vs. bad hypothesis**" >}}
**Good:** "We believe adding a progress indicator to the checkout flow will reduce cart abandonment by 10% because users currently leave when they cannot tell how many steps remain."

- Specific change (progress indicator in checkout)
- Measurable outcome (10% reduction in cart abandonment)
- Stated reason (users leave due to uncertainty about remaining steps)

---

**Bad:** "We believe improving the checkout experience will increase conversions."

- Vague change (what does "improving" mean?)
- No target (how much increase?)
- No reason (why would it increase conversions?)
{{< /card >}}

**Criteria for a testable hypothesis:**

| Criterion | Test | Example |
|-----------|------|---------|
| Specific change | Can you describe exactly what will be different? | "Add a 3-step progress bar to the checkout page header" |
| Measurable outcome | Can you define a number that will move? | "Cart abandonment rate drops from 45% to 40%" |
| Time-bound | Do you know when to check? | "Measured over 2 weeks with at least 5,000 sessions" |
| Falsifiable | Is it possible for the experiment to fail? | Yes - abandonment could stay the same or increase |
| Connected to business value | Does the outcome matter to the business? | Reduced abandonment directly increases revenue |

### 2. Design the Experiment

Once the hypothesis is formed, design an experiment that can confirm or reject it.

**Scope the change to one variable.** If you change the checkout layout and add a progress indicator and reduce the number of form fields at the same time, you cannot attribute the outcome to any single change. Change one thing at a time.

**Define success and failure criteria before writing code.** This prevents moving the goalposts after seeing the results. Write down what "success" looks like and what "failure" looks like before the first commit.

{{< card header="**Experiment design template**" >}}
**Hypothesis:** Adding a progress indicator will reduce cart abandonment by 10%.

**Method:** A/B test - 50% of users see the progress indicator, 50% see the current checkout.

**Success criteria:** Abandonment rate in the test group is at least 8% lower than control (allowing a 2% margin).

**Failure criteria:** Abandonment rate difference is less than 5%, or the test group shows higher abandonment.

**Sample size:** Minimum 5,000 sessions per group.

**Time box:** 2 weeks or until sample size is reached, whichever comes first.
{{< /card >}}

**Choose the measurement method:**

| Method | When to Use | Tradeoff |
|--------|------------|----------|
| A/B test | You have enough traffic to split users into groups | Most rigorous, but requires sufficient volume |
| Before/after | Low traffic or infrastructure changes that affect everyone | Simpler, but confounding factors are harder to control |
| Cohort comparison | Targeting a specific user segment | Good for segment-specific changes, harder to generalize |

### 3. Implement and Deploy

Build the change using the same [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) practices you use for any other work.

**Use feature flags to control exposure.** The [feature flag]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}) infrastructure you built earlier in this phase is what makes experiments possible. Deploy the change behind a flag, then use the flag to control which users see the new behavior.

**Deploy through the standard CD [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}).** Experiments are not special. They go through the same build, test, and deployment process as every other change. This ensures the experiment code meets the same quality bar as production code.

**Keep the change small.** A hypothesis-driven change should follow the same [small batch]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) discipline as any other work. If the experiment requires weeks of development, the scope is too large. Break it into smaller experiments that can each be measured independently.

**Example implementation:**

{{< card code=true header="**Feature flag controlling an A/B experiment**" lang="java" >}}
public class CheckoutController {

    private final FeatureFlagService flags;
    private final MetricsService metrics;

    public CheckoutController(FeatureFlagService flags, MetricsService metrics) {
        this.flags = flags;
        this.metrics = metrics;
    }

    public CheckoutPage renderCheckout(User user, Cart cart) {
        boolean showProgress = flags.isEnabled("experiment-checkout-progress", user);

        metrics.record("checkout-started", Map.of(
            "variant", showProgress ? "with-progress" : "control",
            "userId", user.getId()
        ));

        if (showProgress) {
            return new CheckoutPage(cart, new ProgressIndicator(3));
        }
        return new CheckoutPage(cart);
    }
}
{{< /card >}}

### 4. Measure Results

After the time box expires or the sample size is reached, compare the results against the predefined success criteria.

**Compare against your criteria, not against your hopes.** If the success criterion was "8% reduction in abandonment" and you achieved 3%, that is a failure by your own definition, even if 3% sounds nice. Rigorous criteria prevent confirmation bias.

**Account for confounding factors.** Did a marketing campaign run during the experiment? Was there a holiday? Did another team ship a change that affects the same flow? Document anything that might have influenced the results.

**Record the outcome regardless of success or failure.** Failed experiments are as valuable as successful ones. They update the team's understanding of how the product works and prevent repeating the same mistakes.

{{< card header="**Experiment result record**" >}}
**Hypothesis:** Progress indicator reduces cart abandonment by 10%.

**Result:** Abandonment dropped 4% in the test group (not statistically significant at p < 0.05).

**Verdict:** Failed - did not meet the 8% threshold.

**Confounding factors:** A site-wide sale ran during week 2, which may have increased checkout motivation in both groups.

**Learning:** Progress visibility alone is not sufficient to address abandonment. Exit survey data suggests price comparison (leaving to check competitors) is the primary driver, not checkout confusion.

**Next action:** Design a new experiment targeting price confidence instead of checkout flow.
{{< /card >}}

### 5. Adjust

The final stage closes the loop. Based on the results, the team takes one of three actions:

**If validated:** Remove the feature flag and make the change permanent. Update the product documentation. Feed the learning into the next hypothesis - what else could you improve now that this change is in place?

**If invalidated:** Revert the change by disabling the flag. Document what was learned and why the hypothesis was wrong. Use the learning to form a better hypothesis. Do not treat invalidation as failure - a team that never invalidates a hypothesis is not running real experiments.

**If inconclusive:** Decide whether to extend the experiment (more time, more traffic) or abandon it. If confounding factors were identified, consider rerunning the experiment under cleaner conditions. Set a hard limit on reruns to avoid indefinite experimentation.

## Common Pitfalls

| Pitfall | What Happens | How to Avoid It |
|---------|-------------|-----------------|
| No success criteria defined upfront | Team rationalizes any result as a win | Write success and failure criteria before the first commit |
| Changing multiple variables at once | Cannot attribute the outcome to any single change | Scope each experiment to one variable |
| Abandoning experiments too early | Insufficient data leads to wrong conclusions | Set a minimum sample size and time box; commit to both |
| Never invalidating a hypothesis | Experiments are performative, not real | Celebrate invalidations - they prevent wasted effort |
| Skipping the record step | Team repeats failed experiments or forgets what worked | Maintain an experiment log that is part of the team's knowledge base |
| Hypothesis disconnected from business outcomes | Team optimizes technical metrics nobody cares about | Every hypothesis must connect to a metric the business tracks |
| Experiments that are too large | Weeks of development before any measurement | Apply [small batch]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) discipline to experiments too |

## Measuring Success

| Indicator | Target | Why It Matters |
|-----------|--------|----------------|
| Experiments completed per quarter | 4 or more | Confirms the team is running experiments, not just shipping features |
| Percentage of experiments with predefined success criteria | 100% | Confirms rigor - no experiment should start without criteria |
| Ratio of validated to invalidated hypotheses | Between 40-70% validated | Too high means hypotheses are not bold enough; too low means the team is guessing |
| Time from hypothesis to result | 2-4 weeks | Confirms experiments are scoped small enough to get fast answers |
| Decisions changed by experiment results | Increasing | Confirms experiments actually influence product direction |

## Next Step

Experiments generate learnings, but learnings only turn into improvements when the team discusses them. [Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}) provide the forum where the team reviews experiment results, decides what to do next, and adjusts the process itself.

---

## Related Content

- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - the measurement infrastructure that hypothesis-driven development depends on
- [Small Batches]({{< relref "/docs/migrate-to-cd/optimize/small-batches" >}}) - the practice that keeps experiments small enough to measure
- [Feature Flags]({{< relref "/docs/migrate-to-cd/optimize/feature-flags" >}}) - the mechanism that controls experiment exposure
- [Retrospectives]({{< relref "/docs/migrate-to-cd/optimize/retrospectives" >}}) - where the team discusses experiment results and decides next steps
- [First-Class Artifacts]({{< relref "/docs/agentic-cd/specification/first-class-artifacts" >}}) - how ACD formalizes experiment artifacts for agent-assisted workflows
- [Agent-Assisted Specification]({{< relref "/docs/agentic-cd/specification/agent-assisted-specification" >}}) - how agents can help generate and evaluate hypotheses
