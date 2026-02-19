---
aliases:
  - /docs/symptoms/no-leadership-buy-in/
title: "Leadership Sees CD as a Technical Nice-to-Have"
linkTitle: "No leadership buy-in"
description: >
  Management does not understand why CD matters. No budget for tooling. No time allocated for improvement.
tags:
  - team-dynamics
  - process-gates
---

## What you are seeing

Pipeline improvement work loses to feature delivery every sprint. The team wants to invest in deployment automation, test infrastructure, and pipeline improvements. The engineering manager supports this in principle. But every sprint, when capacity is allocated, the product backlog wins. There are features to ship, commitments to keep, a roadmap to deliver against. Pipeline improvements are real work - weeks of investment - but they do not appear on any roadmap and do not map to revenue-generating features.

When the team escalates to leadership, the response is supportive but non-committal: "Yes, we need to do that. Find a way to fit it in." The team tries to fit it in - at the margins, in slack time, adjacent to feature work. The improvement work is slow, fragmented, and regularly displaced. Three years in, the pipeline is incrementally better, but the fundamental problems remain.

What is missing is organizational priority. CD adoption requires sustained investment - not a one-time sprint but ongoing capacity allocated to improving the delivery system. Without a sponsor who can protect that capacity from feature demand, improvement work will always lose to delivery pressure.

## Common causes

### Velocity as individual metric

When management measures progress by story points or feature delivery rate, investment in pipeline infrastructure looks like a reduction in output. A sprint where half the team works on deployment automation produces fewer feature story points than a sprint where everyone delivers features. Leaders optimizing for short-term throughput will consistently deprioritize it.

When lead time and deployment frequency are tracked alongside feature delivery, pipeline investment has a visible ROI. Leadership can see the case for it in the same dashboard they use for feature delivery - and pipeline work stops competing invisibly against features that do show up on a scoreboard.

**Read more:** [Velocity as individual metric](../../anti-patterns/organizational-cultural/velocity-as-individual-metric/)

### Missing product ownership

Without a product owner who understands that delivery capability is itself a product attribute, pipeline work has no advocate in planning. Features with product owners get prioritized. Infrastructure work without sponsors does not. The team needs someone with organizational standing who can represent improvement work as a priority in the same planning conversation as feature work.

**Read more:** [Missing product ownership](../../anti-patterns/organizational-cultural/missing-product-ownership/)

### Deadline-driven development

When the organization is organized around fixed delivery dates, any work that does not directly advance the date looks like overhead. CD adoption requires investing in the delivery system itself, which competes with delivering to the schedule. Until management understands that delivery capability is what makes future schedules achievable, the investment will not be protected.

**Read more:** [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/)

## How to narrow it down

1. **Does management measure and track delivery lead time, deployment frequency, and change fail rate?** If not, the measurement system does not reward CD investment. Start with [Velocity as individual metric](../../anti-patterns/organizational-cultural/velocity-as-individual-metric/).
2. **Is there an organizational sponsor who advocates for delivery capability improvements in planning?** If improvement work has no sponsor, it will always lose to features with sponsors. Start with [Missing product ownership](../../anti-patterns/organizational-cultural/missing-product-ownership/).
3. **Is delivery organized around fixed commitment dates?** If yes, anything not tied to the date is implicitly deprioritized. Start with [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/).
