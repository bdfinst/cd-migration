---
title: "Progressive Rollout"
linkTitle: "Progressive Rollout"
weight: 2
description: >
  Use canary, blue-green, and percentage-based deployments to reduce deployment risk.
---

{{% pageinfo %}}
**Phase 4 - Deliver on Demand** | Original content

Progressive rollout strategies let you deploy to production without deploying to all users simultaneously. By exposing changes to a small group first and expanding gradually, you catch problems before they affect your entire user base. This page covers the three major strategies, when to use each, and how to implement automated rollback.
{{% /pageinfo %}}

## Why Progressive Rollout?

Even with comprehensive tests, production-like environments, and small batch sizes, some issues only surface under real production traffic. Progressive rollout is the final safety layer: it limits the blast radius of any deployment by exposing the change to a small audience first.

This is not a replacement for testing. It is an addition. Your automated tests should catch the vast majority of issues. Progressive rollout catches the rest - the issues that depend on real user behavior, real data volumes, or real infrastructure conditions that cannot be fully replicated in test environments.

## The Three Strategies

### Strategy 1: Canary Deployment

A [canary deployment](../../../glossary/#canary-deployment) routes a small percentage of production traffic to the new version while the majority continues to hit the old version. If the canary shows no problems, traffic is gradually shifted.

```
                        ┌─────────────────┐
                   5%   │  New Version     │  ← Canary
                ┌──────►│  (v2)            │
                │       └─────────────────┘
  Traffic ──────┤
                │       ┌─────────────────┐
                └──────►│  Old Version     │  ← Stable
                  95%   │  (v1)            │
                        └─────────────────┘
```

**How it works:**

1. Deploy the new version alongside the old version
2. Route 1-5% of traffic to the new version
3. Compare key metrics (error rate, latency, business metrics) between canary and stable
4. If metrics are healthy, increase traffic to 25%, 50%, 100%
5. If metrics degrade, route all traffic back to the old version

**When to use canary:**

- Changes that affect request handling (API changes, performance optimizations)
- Changes where you want to compare metrics between old and new versions
- Services with high traffic volume (you need enough canary traffic for statistical significance)

**When canary is not ideal:**

- Changes that affect batch processing or background jobs (no "traffic" to route)
- Very low traffic services (the canary may not get enough traffic to detect issues)
- Database schema changes (both versions must work with the same schema)

**Implementation options:**

| Infrastructure | How to Route Traffic |
|---------------|---------------------|
| Kubernetes + service mesh (Istio, Linkerd) | Weighted routing rules in VirtualService |
| Load balancer (ALB, NGINX) | Weighted target groups |
| CDN (CloudFront, Fastly) | Origin routing rules |
| Application-level | Feature flag with percentage rollout |

### Strategy 2: Blue-Green Deployment

Blue-green deployment maintains two identical production environments. At any time, one (blue) serves live traffic and the other (green) is idle or staging.

```
  BEFORE:
    Traffic ──────► [Blue - v1] (ACTIVE)
                    [Green]     (IDLE)

  DEPLOY:
    Traffic ──────► [Blue - v1] (ACTIVE)
                    [Green - v2] (DEPLOYING / SMOKE TESTING)

  SWITCH:
    Traffic ──────► [Green - v2] (ACTIVE)
                    [Blue - v1]  (STANDBY / ROLLBACK TARGET)
```

**How it works:**

1. Deploy the new version to the idle environment (green)
2. Run smoke tests against green to verify basic functionality
3. Switch the router/load balancer to point all traffic at green
4. Keep blue running as an instant rollback target
5. After a stability period, repurpose blue for the next deployment

**When to use blue-green:**

- You need instant, complete rollback (switch the router back)
- You want to test the deployment in a full production environment before routing traffic
- Your infrastructure supports running two parallel environments cost-effectively

**When blue-green is not ideal:**

- Stateful applications where both environments share mutable state
- Database migrations (the new version's schema must work for both environments during transition)
- Cost-sensitive environments (maintaining two full production environments doubles infrastructure cost)

**Rollback speed:** Seconds. Switching the router back is the fastest rollback mechanism available.

### Strategy 3: Percentage-Based Rollout

Percentage-based rollout gradually increases the number of users who see the new version. Unlike canary (which is traffic-based), percentage rollout is typically user-based - a specific user always sees the same version during the rollout period.

```
  Hour 0:   1% of users  → v2,  99% → v1
  Hour 2:   5% of users  → v2,  95% → v1
  Hour 8:  25% of users  → v2,  75% → v1
  Day 2:   50% of users  → v2,  50% → v1
  Day 3:  100% of users  → v2
```

**How it works:**

1. Enable the new version for a small percentage of users (using feature flags or infrastructure routing)
2. Monitor metrics for the affected group
3. Gradually increase the percentage over hours or days
4. At any point, reduce the percentage back to 0% if issues are detected

**When to use percentage rollout:**

- User-facing feature changes where you want consistent user experience (a user always sees v1 or v2, not a random mix)
- Changes that benefit from A/B testing data (compare user behavior between groups)
- Long-running rollouts where you want to collect business metrics before full exposure

**When percentage rollout is not ideal:**

- Backend infrastructure changes with no user-visible impact
- Changes that affect all users equally (e.g., API response format changes)

**Implementation:** Percentage rollout is typically implemented through [Feature Flags](../../optimize/feature-flags/) (Level 2 or Level 3), using the user ID as the hash key to ensure consistent assignment.

## Choosing the Right Strategy

| Factor | Canary | Blue-Green | Percentage |
|--------|--------|------------|------------|
| **Rollback speed** | Seconds (reroute traffic) | Seconds (switch environments) | Seconds (disable flag) |
| **Infrastructure cost** | Low (runs alongside existing) | High (two full environments) | Low (same infrastructure) |
| **Metric comparison** | Strong (side-by-side comparison) | Weak (before/after only) | Strong (group comparison) |
| **User consistency** | No (each request may hit different version) | Yes (all users see same version) | Yes (each user sees consistent version) |
| **Complexity** | Moderate | Moderate | Low (if you have feature flags) |
| **Best for** | API changes, performance changes | Full environment validation | User-facing features |

Many teams use more than one strategy. A common pattern:

- **Blue-green** for infrastructure and platform changes
- **Canary** for service-level changes
- **Percentage rollout** for user-facing feature changes

## Automated Rollback

Progressive rollout is only effective if rollback is automated. A human noticing a problem at 3 AM is not a reliable rollback mechanism.

### Metrics to Monitor

Define automated rollback triggers before deploying. Common triggers:

| Metric | Trigger Condition | Example |
|--------|------------------|---------|
| Error rate | Canary error rate > 2x stable error rate | Stable: 0.1%, Canary: 0.3% -> rollback |
| Latency (p99) | Canary p99 > 1.5x stable p99 | Stable: 200ms, Canary: 400ms -> rollback |
| Health check | Any health check failure | HTTP 500 on /health -> rollback |
| Business metric | Conversion rate drops > 5% for canary group | 10% conversion -> 4% conversion -> rollback |
| Saturation | CPU or memory exceeds threshold | CPU > 90% for 5 minutes -> rollback |

### Automated Rollback Flow

```
Deploy new version
       │
       ▼
Route 5% of traffic to new version
       │
       ▼
Monitor for 15 minutes
       │
       ├── Metrics healthy ──────► Increase to 25%
       │                                │
       │                                ▼
       │                          Monitor for 30 minutes
       │                                │
       │                                ├── Metrics healthy ──────► Increase to 100%
       │                                │
       │                                └── Metrics degraded ─────► ROLLBACK
       │
       └── Metrics degraded ─────► ROLLBACK
```

### Implementation Tools

| Tool | How It Helps |
|------|-------------|
| **Argo Rollouts** | Kubernetes-native progressive delivery with automated analysis and rollback |
| **Flagger** | Progressive delivery operator for Kubernetes with Istio, Linkerd, or App Mesh |
| **Spinnaker** | Multi-cloud deployment platform with canary analysis |
| **Custom scripts** | Query your metrics system, compare thresholds, trigger rollback via API |

The specific tool matters less than the principle: define rollback criteria before deploying, monitor automatically, and roll back without human intervention.

## Implementing Progressive Rollout

### Step 1: Choose Your First Strategy (Week 1)

Pick the strategy that matches your infrastructure:

- If you already have feature flags: start with percentage-based rollout
- If you have Kubernetes with a service mesh: start with canary
- If you have parallel environments: start with blue-green

### Step 2: Define Rollback Criteria (Week 1)

Before your first progressive deployment:

1. Identify the 3-5 metrics that define "healthy" for your service
2. Define numerical thresholds for each metric
3. Define the monitoring window (how long to wait before advancing)
4. Document the rollback procedure (even if automated, document it for human understanding)

### Step 3: Run a Manual Progressive Rollout (Week 2-3)

Before automating, run the process manually:

1. Deploy to a canary or small percentage
2. A team member monitors the dashboard for the defined window
3. The team member decides to advance or rollback
4. Document what they checked and how they decided

This manual practice builds understanding of what the automation will do.

### Step 4: Automate the Rollout (Week 4+)

Replace the manual monitoring with automated checks:

1. Implement metric queries that check your rollback criteria
2. Implement automated traffic shifting (advance or rollback based on metrics)
3. Implement alerting so the team knows when a rollback occurs
4. Test the automation by intentionally deploying a known-bad change (in a controlled way)

## Key Pitfalls

### 1. "Our canary doesn't get enough traffic for meaningful metrics"

If your service handles 100 requests per hour, a 5% canary gets 5 requests per hour - not enough to detect problems statistically. Solutions: use a higher canary percentage (25-50%), use longer monitoring windows, or use blue-green instead (which does not require traffic splitting).

### 2. "We have progressive rollout but rollback is still manual"

Progressive rollout without automated rollback is half a solution. If the canary shows problems at 2 AM and nobody is watching, the damage occurs before anyone responds. Automated rollback is the essential companion to progressive rollout.

### 3. "We treat progressive rollout as a replacement for testing"

Progressive rollout is the last line of defense, not the first. If you are regularly catching bugs in canary that your test suite should have caught, your test suite needs improvement. Progressive rollout should catch rare, production-specific issues - not common bugs.

### 4. "Our rollout takes days because we're too cautious"

A rollout that takes a week negates the benefits of continuous deployment. If your confidence in the pipeline is low enough to require a week-long rollout, the issue is pipeline quality, not rollout speed. Address the root cause through better testing and more production-like environments.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Automated rollbacks per month | Low and stable | Confirms the pipeline catches most issues before production |
| Time from deploy to full rollout | Hours, not days | Confirms the team has confidence in the process |
| Incidents caught by progressive rollout | Tracked (any number) | Confirms the progressive rollout is providing value |
| Manual interventions during rollout | Zero | Confirms the process is fully automated |

## Next Step

With deploy on demand and progressive rollout, your technical deployment infrastructure is complete. [Agentic CD](../../../../agentic-cd/) explores how AI-assisted patterns can extend these practices further.

---

## Related Content

- [Fear of Deploying](../../../symptoms/deployment/fear-of-deploying/) - a symptom that progressive rollout eliminates by limiting blast radius
- [Production Issues Found by Customers](../../../symptoms/visibility/production-issues-found-by-customers/) - a visibility problem that automated canary analysis helps detect before users are affected
- [Staging Passes, Production Fails](../../../symptoms/deployment/staging-passes-production-fails/) - a symptom that progressive rollout mitigates by catching production-specific issues early
- [Feature Flags](../../optimize/feature-flags/) - the foundation for percentage-based rollout strategies
- [Blind Operations](../../../anti-patterns/monitoring-observability/blind-operations/) - an anti-pattern that must be resolved before automated rollback can work
- [Change Failure Rate](../../../metrics/change-fail-rate/) - the metric that progressive rollout helps keep low by catching issues before full exposure
