---
title: "Thin-Spread Teams"
linkTitle: "Thin-Spread Teams"
weight: 56
category: "Organizational & Cultural"
risk_level: high
description: >
  A small team owns too many products. Everyone context-switches constantly and nobody has
  enough focus to deliver any single product well.
tags:
  - team-dynamics
  - work-decomposition
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

Ten developers are responsible for fifteen products. Each developer is the primary contact for
two or three of them. When a production issue hits one product, the assigned developer drops
whatever they are working on for another product and switches context. Their current work stalls.
The team's board shows progress on many things and completion of very few.

Common variations:

- **The pillar model.** Each developer "owns" a pillar of products. They are the only person who
  understands those systems. When they are unavailable, their products are frozen. When they are
  available, they split attention across multiple codebases daily.
- **The interrupt-driven team.** The team has no protected capacity. Any stakeholder can pull any
  developer onto any product at any time. The team's sprint plan is a suggestion that rarely
  survives the first week.
- **The utilization trap.** Management sees ten developers and fifteen products as a staffing
  problem to optimize rather than a focus problem to solve. The response is to assign each
  developer to more products to "keep everyone busy" rather than to reduce the number of products
  the team owns.
- **The divergent processes.** Because each product evolved independently, each has different
  build tools, deployment processes, and conventions. Switching between products means switching
  mental models entirely. The cost of context switching is not just the product domain but the
  entire toolchain.

The telltale sign: ask any developer what they are working on, and the answer involves three
products and an apology for not making more progress on any of them.

## Why This Is a Problem

Spreading a team across too many products is a team topology failure. It turns every developer
into a single point of failure for their assigned products while preventing the team from
building shared knowledge or sustainable delivery practices.

### It reduces quality

A developer who touches three codebases in a day cannot maintain deep context in any of them.
They make shallow fixes rather than addressing root causes because they do not have time to
understand the full system. Code reviews are superficial because the reviewer is also juggling
multiple products. Defects accumulate because nobody has the sustained attention to prevent them.

A team focused on one or two products develops deep understanding. They spot patterns, catch
design problems, and write code that accounts for the system's history and constraints.

### It increases rework

Context switching has a measurable cost. Research consistently shows that switching between tasks
adds 20 to 40 percent overhead as the brain reloads the mental model of each project. A developer
who spends an hour on Product A, two hours on Product B, and then returns to Product A has lost
significant time to switching. The work they do in each window is lower quality because they never
fully loaded context.

The shallow work that results from fragmented attention produces more bugs, more missed edge
cases, and more rework when the problems surface later.

### It makes delivery timelines unpredictable

When a developer owns three products, their availability for any one product depends on what
happens with the other two. A production incident on Product B derails the sprint commitment for
Product A. A stakeholder escalation on Product C pulls the developer off Product B. Delivery dates
for any single product are unreliable because the developer's time is a shared resource subject
to competing demands.

A team with a focused product scope can make and keep commitments because their capacity is
dedicated, not shared across unrelated priorities.

### It creates single points of failure everywhere

Each developer becomes the sole expert on their assigned products. When that developer is sick,
on vacation, or leaves the company, their products have nobody who understands them. The team
cannot absorb the work because everyone else is already spread thin across their own products.

This is Knowledge Silos at organizational scale. Instead of one developer being the only person
who knows one subsystem, every developer is the only person who knows multiple entire products.

### Impact on continuous delivery

[CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) requires a team that can deliver any of their products at any time. Thin-spread teams cannot
do this because delivery capacity for each product is tied to a single person's availability. If
that person is busy with another product, the first product's [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) is effectively blocked.

CD also requires investment in automation, testing, and pipeline infrastructure. A team spread
across fifteen products cannot invest in improving the delivery practices for any one of them
because there is no sustained focus to build momentum.

## How to Fix It

### Step 1: Count the real product load

List every product, service, and system the team is responsible for. Include maintenance,
on-call, and operational support. For each, identify the primary and secondary contacts. Make the
single-point-of-failure risks visible.

### Step 2: Consolidate ownership

Work with leadership to reduce the team's product scope. The goal is to reach a ratio where the
team can maintain shared knowledge across all their products. For most teams, this means two to
four products for a team of six to eight developers.

Products the team cannot focus on should be transferred to another team, put into maintenance
mode with explicit reduced expectations, or retired.

### Step 3: Protect focus with capacity allocation

Until the product scope is fully reduced, protect focus by allocating capacity explicitly. Dedicate
specific developers to specific products for the full sprint rather than letting them split across
products daily. Rotate assignments between sprints to build shared knowledge.

Reserve a percentage of capacity (20 to 30 percent) for [unplanned work]({{< relref "/docs/reference/glossary#unplanned-work" >}}) and production support so
that interrupts do not derail the sprint plan entirely.

### Step 4: Standardize tooling across products

Reduce the context-switching cost by standardizing build tools, deployment processes, and coding
conventions across the team's products. When all products use the same pipeline structure and
testing patterns, switching between them requires loading only the domain context, not an entirely
different toolchain.

| Objection | Response |
|-----------|----------|
| "We can't hire more people, so someone has to own these products" | The question is not who owns them but how many one team can own well. A team that owns fifteen products poorly delivers less than a team that owns four products well. Reduce scope rather than adding headcount. |
| "Every product is critical" | If fifteen products are all critical and ten developers support them, none of them are getting the attention that "critical" requires. Prioritize ruthlessly or accept that "critical" means "at risk." |
| "Developers should be flexible enough to work across products" | Flexibility and fragmentation are different things. A developer who rotates between two products per sprint is flexible. A developer who touches four products per day is fragmented. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------:|
| Products per developer | Should decrease toward two or fewer active products per person |
| Context switches per day | Should decrease as developers focus on fewer products |
| Single-point-of-failure count | Should decrease as shared knowledge grows within the reduced scope |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Should decrease as sustained focus replaces fragmented attention |

## Related Content

- [Rotation Ramp-Up Drag]({{< relref "/docs/symptoms/flow/team-knowledge/rotation-ramp-up-drag" >}}) - Delivery slowdown that repeats with every team rotation
- [Repeated Domain Mistakes]({{< relref "/docs/symptoms/flow/team-knowledge/repeated-domain-mistakes" >}}) - Institutional memory lost with each rotation, same errors recur
- [Domain Model Erosion]({{< relref "/docs/symptoms/flow/developer-experience/domain-model-erosion" >}}) - Codebase degraded by successive teams without domain continuity
- [Slow Defect Resolution]({{< relref "/docs/symptoms/flow/developer-experience/slow-defect-resolution" >}}) - Bugs take disproportionately long when debuggers don't know the domain
- [Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}}) - Roster instability driven by treating engineers as interchangeable capacity
- [Knowledge Silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}) - Thin-spread teams create silos at the product level, not just the subsystem level
- [Unbounded WIP]({{< relref "/docs/anti-patterns/team-workflow/unbounded-wip" >}}) - Too many products is WIP at the team level
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Agreements on product scope and capacity allocation
- [Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}) - Reducing coupling between products makes ownership boundaries cleaner
