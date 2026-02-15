---
title: "Metrics-Driven Improvement"
linkTitle: "Metrics-Driven Improvement"
weight: 4
description: >
  Use DORA metrics and improvement kata to drive systematic delivery improvement.
---

{{% pageinfo %}}
**Phase 3 - Optimize** | Original content combining DORA recommendations and improvement kata

Improvement without measurement is guesswork. This page combines the DORA four key metrics with the improvement kata pattern to create a systematic, repeatable approach to getting better at delivery.
{{% /pageinfo %}}

## The Problem with Ad Hoc Improvement

Most teams improve accidentally. Someone reads a blog post, suggests a change at standup, and the team tries it for a week before forgetting about it. This produces sporadic, unmeasurable progress that is impossible to sustain.

Metrics-driven improvement replaces this with a disciplined cycle: measure where you are, define where you want to be, run a small experiment, measure the result, and repeat. The improvement kata provides the structure. DORA metrics provide the measures.

## The Four DORA Metrics

The DORA research program (now part of Google Cloud) has identified four key metrics that predict software delivery performance. These are the metrics you should track throughout your CD migration.

### 1. Deployment Frequency

How often your team deploys to production.

| Performance Level | Deployment Frequency |
|-------------------|---------------------|
| Elite | On-demand (multiple deploys per day) |
| High | Between once per day and once per week |
| Medium | Between once per week and once per month |
| Low | Between once per month and once every six months |

**What it tells you:** How comfortable your team and pipeline are with deploying. Low frequency usually indicates manual gates, fear of deployment, or large batch sizes.

**How to measure:** Count the number of successful deployments to production per unit of time. Automated deploys count. Hotfixes count. Rollbacks do not.

### 2. Lead Time for Changes

The time from a commit being pushed to trunk to that commit running in production.

| Performance Level | Lead Time |
|-------------------|-----------|
| Elite | Less than one hour |
| High | Between one day and one week |
| Medium | Between one week and one month |
| Low | Between one month and six months |

**What it tells you:** How efficient your pipeline is. Long lead times indicate slow builds, manual approval steps, or infrequent deployment windows.

**How to measure:** Record the timestamp when a commit merges to trunk and the timestamp when that commit is running in production. The difference is lead time. Track the median, not the mean (outliers distort the mean).

### 3. Change Failure Rate

The percentage of deployments that cause a failure in production requiring remediation (rollback, hotfix, or patch).

| Performance Level | Change Failure Rate |
|-------------------|-------------------|
| Elite | 0-15% |
| High | 16-30% |
| Medium | 16-30% |
| Low | 46-60% |

**What it tells you:** How effective your testing and validation pipeline is. High failure rates indicate gaps in test coverage, insufficient pre-production validation, or overly large changes.

**How to measure:** Track deployments that result in a degraded service, require rollback, or need a hotfix. Divide by total deployments. A "failure" is defined by the team - typically any incident that requires immediate human intervention.

### 4. Mean Time to Restore (MTTR)

How long it takes to recover from a failure in production.

| Performance Level | Time to Restore |
|-------------------|----------------|
| Elite | Less than one hour |
| High | Less than one day |
| Medium | Less than one day |
| Low | Between one week and one month |

**What it tells you:** How resilient your system and team are. Long recovery times indicate manual rollback processes, poor observability, or insufficient incident response practices.

**How to measure:** Record the timestamp when a production failure is detected and the timestamp when service is fully restored. Track the median.

## The DORA Capabilities

Behind these four metrics are 24 capabilities that the DORA research has shown to drive performance. They organize into five categories. Use this as a diagnostic tool: when a metric is lagging, look at the related capabilities to identify what to improve.

### Continuous Delivery Capabilities

These directly affect your pipeline and deployment practices:

- Version control for all production artifacts
- Automated deployment processes
- Continuous integration
- Trunk-based development
- Test automation
- Test data management
- Shift-left security
- Continuous delivery (the ability to deploy at any time)

### Architecture Capabilities

These affect how easily your system can be changed and deployed:

- Loosely coupled architecture
- Empowered teams that can choose their own tools
- Teams that can test, deploy, and release independently

### Product and Process Capabilities

These affect how work flows through the team:

- Customer feedback loops
- Value stream visibility
- Working in small batches
- Team experimentation

### Lean Management Capabilities

These affect how the organization supports delivery:

- Lightweight change approval processes
- Monitoring and observability
- Proactive notification
- WIP limits
- Visual management of workflow

### Cultural Capabilities

These affect the environment in which teams operate:

- Generative organizational culture (Westrum model)
- Encouraging and supporting learning
- Collaboration within and between teams
- Job satisfaction
- Transformational leadership

For a detailed breakdown, see the [DORA Capabilities reference](../../../reference/dora-capabilities/).

## The Improvement Kata

The improvement kata is a four-step pattern from lean manufacturing adapted for software delivery. It provides the structure for turning DORA measurements into concrete improvements.

### Step 1: Understand the Direction

Where does your CD migration need to go?

This is already defined by the phases of this migration guide. In Phase 3, your direction is: smaller batches, faster flow, and higher confidence in every deployment.

### Step 2: Grasp the Current Condition

Measure your current DORA metrics. Be honest - the point is to understand reality, not to look good.

**Practical approach:**

1. Collect two weeks of data for all four DORA metrics
2. Plot the data - do not just calculate averages. Look at the distribution.
3. Identify which metric is furthest from your target
4. Investigate the related capabilities to understand why

**Example current condition:**

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| Deployment frequency | Weekly | Daily | 5x improvement needed |
| Lead time | 3 days | < 1 day | Pipeline is slow or has manual gates |
| Change failure rate | 25% | < 15% | Test coverage or change size issue |
| MTTR | 4 hours | < 1 hour | Rollback is manual |

### Step 3: Establish the Next Target Condition

Do not try to fix everything at once. Pick one metric and define a specific, measurable, time-bound target.

**Good target:** "Reduce lead time from 3 days to 1 day within the next 4 weeks."

**Bad target:** "Improve our deployment pipeline." (Too vague, no measure, no deadline.)

### Step 4: Experiment Toward the Target

Design a small experiment that you believe will move the metric toward the target. Run it. Measure the result. Adjust.

**The experiment format:**

| Element | Description |
|---------|-------------|
| **Hypothesis** | "If we [action], then [metric] will [improve/decrease] because [reason]." |
| **Action** | What specifically will you change? |
| **Duration** | How long will you run the experiment? (Typically 1-2 weeks) |
| **Measure** | How will you know if it worked? |
| **Decision criteria** | What result would cause you to keep, modify, or abandon the change? |

**Example experiment:**

> **Hypothesis:** If we parallelize our integration test suite, lead time will drop from 3 days to under 2 days because 60% of lead time is spent waiting for tests to complete.
>
> **Action:** Split the integration test suite into 4 parallel runners.
>
> **Duration:** 2 weeks.
>
> **Measure:** Median lead time for commits merged during the experiment period.
>
> **Decision criteria:** Keep if lead time drops below 2 days. Modify if it drops but not enough. Abandon if it has no effect or introduces flakiness.

### The Cycle Repeats

After each experiment:

1. Measure the result
2. Update your understanding of the current condition
3. If the target is met, pick the next metric to improve
4. If the target is not met, design another experiment

This creates a continuous improvement loop. Each cycle takes 1-2 weeks. Over months, the cumulative effect is dramatic.

## Connecting Metrics to Action

When a metric is lagging, use this guide to identify where to focus.

### Low Deployment Frequency

| Possible Cause | Investigation | Action |
|----------------|--------------|--------|
| Manual approval gates | Map the approval chain | Automate or eliminate non-value-adding approvals |
| Fear of deployment | Ask the team what they fear | Address the specific fear (usually testing gaps) |
| Large batch size | Measure changes per deploy | Implement [small batches](../small-batches/) practices |
| Deploy process is manual | Time the deploy process | Automate the deployment pipeline |

### Long Lead Time

| Possible Cause | Investigation | Action |
|----------------|--------------|--------|
| Slow builds | Time each pipeline stage | Optimize the slowest stage (often tests) |
| Waiting for environments | Track environment wait time | Implement self-service environments |
| Waiting for approval | Track approval wait time | Reduce approval scope or automate |
| Large changes | Measure commit size | Reduce batch size |

### High Change Failure Rate

| Possible Cause | Investigation | Action |
|----------------|--------------|--------|
| Insufficient test coverage | Measure coverage by area | Add tests for the areas that fail most |
| Tests pass but production differs | Compare test and prod environments | Make environments more [production-like](../../pipeline/production-like-environments/) |
| Large, risky changes | Measure change size | Reduce batch size, use [feature flags](../feature-flags/) |
| Configuration drift | Audit configuration differences | Externalize and version configuration |

### Long MTTR

| Possible Cause | Investigation | Action |
|----------------|--------------|--------|
| Rollback is manual | Time the rollback process | Automate [rollback](../../pipeline/rollback/) |
| Hard to identify root cause | Review recent incidents | Improve observability and alerting |
| Hard to deploy fixes quickly | Measure fix lead time | Ensure pipeline supports rapid hotfix deployment |
| Dependencies fail in cascade | Map failure domains | Improve [architecture decoupling](../architecture-decoupling/) |

## Building a Metrics Dashboard

Make your DORA metrics visible to the team at all times. A dashboard on a wall monitor or a shared link is ideal.

**Essential elements:**

- Current values for all four DORA metrics
- Trend lines showing direction over the past 4-8 weeks
- Current target condition highlighted
- Active experiment description

**Keep it simple.** A spreadsheet updated weekly is better than a sophisticated dashboard that nobody maintains. The goal is visibility, not tooling sophistication.

## Key Pitfalls

### 1. "We measure but don't act"

Measurement without action is waste. If you collect metrics but never run experiments, you are creating overhead with no benefit. Every measurement should lead to a hypothesis. Every hypothesis should lead to an experiment.

### 2. "We use metrics to compare teams"

DORA metrics are for teams to improve themselves, not for management to rank teams. Using metrics for comparison creates incentives to game the numbers. Each team should own its own metrics and its own improvement targets.

### 3. "We try to improve all four metrics at once"

Focus on one metric at a time. Improving deployment frequency and change failure rate simultaneously often requires conflicting actions. Pick the biggest bottleneck, address it, then move to the next.

### 4. "We abandon experiments too quickly"

Most experiments need at least two weeks to show results. One bad day is not a reason to abandon an experiment. Set the duration up front and commit to it.

## Measuring Success

| Indicator | Target | Why It Matters |
|-----------|--------|----------------|
| Experiments per month | 2-4 | Confirms the team is actively improving |
| Metrics trending in the right direction | Consistent improvement over 3+ months | Confirms experiments are having effect |
| Team can articulate current condition and target | Everyone on the team knows | Confirms improvement is a shared concern |
| Improvement items in backlog | Always present | Confirms improvement is treated as a deliverable |

## Next Step

Metrics tell you what to improve. [Retrospectives](../retrospectives/) provide the team forum for deciding how to improve it.

---

## Related Content

- [Deployment Frequency](../../../reference/metrics/release-frequency/) - one of the four key DORA metrics
- [Lead Time](../../../reference/metrics/lead-time/) - one of the four key DORA metrics
- [Change Fail Rate](../../../reference/metrics/change-fail-rate/) - one of the four key DORA metrics
- [Mean Time to Repair](../../../reference/metrics/mean-time-to-repair/) - one of the four key DORA metrics
- [DORA Capabilities](../../../reference/dora-capabilities/) - the 24 capabilities that drive delivery performance
- [Retrospectives](../retrospectives/) - the team forum for acting on what metrics reveal
