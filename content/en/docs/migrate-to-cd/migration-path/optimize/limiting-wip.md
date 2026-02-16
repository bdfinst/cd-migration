---
title: "Limiting Work in Progress"
linkTitle: "Limiting WIP"
weight: 3
description: >
  Focus on finishing work over starting new work to improve flow and reduce cycle time.
---

{{% pageinfo %}}
**Phase 3 - Optimize** | Adapted from [Dojo Consortium](https://dojoconsortium.org)

Work in progress (WIP) is inventory. Like physical inventory, it loses value the longer it sits unfinished. Limiting WIP is the most counterintuitive and most impactful practice in this entire migration: doing less work at once makes you deliver more.
{{% /pageinfo %}}

## Why Limiting WIP Matters

Every item of work in progress has a cost:

- **Context switching:** Moving between tasks destroys focus. Research consistently shows that switching between two tasks reduces productive time by 20-40%.
- **Delayed feedback:** Work that is started but not finished cannot be validated by users. The longer it sits, the more assumptions go untested.
- **Hidden dependencies:** The more items in progress simultaneously, the more likely they are to conflict, block each other, or require coordination.
- **Longer cycle time:** Little's Law states that cycle time = WIP / throughput. If throughput is constant, the only way to reduce cycle time is to reduce WIP.

> "Stop starting, start finishing."
>
> - Lean saying

## How to Set Your WIP Limit

### The N+2 Starting Point

A practical starting WIP limit for a team is **N+2**, where N is the number of team members actively working on delivery.

| Team Size | Starting WIP Limit | Rationale |
|-----------|-------------------|-----------|
| 3 developers | 5 items | Allows one item per person plus a small buffer |
| 5 developers | 7 items | Same principle at larger scale |
| 8 developers | 10 items | Buffer becomes proportionally smaller |

**Why N+2 and not N?** Because some items will be blocked waiting for review, testing, or external dependencies. A small buffer prevents team members from being idle when their primary task is blocked. But the buffer should be small - two items, not ten.

### Continuously Lower the Limit

The N+2 formula is a starting point, not a destination. Once the team is comfortable with the initial limit, reduce it:

1. **Start at N+2.** Run for 2-4 weeks. Observe where work gets stuck.
2. **Reduce to N+1.** Tighten the limit. Some team members will occasionally be "idle" - this is a feature, not a bug. They should swarm on blocked items.
3. **Reduce to N.** At this point, every team member is working on exactly one thing. Blocked work gets immediate attention because someone is always available to help.
4. **Consider going below N.** Some teams find that pairing (two people, one item) further reduces cycle time. A team of 6 with a WIP limit of 3 means everyone is pairing.

Each reduction will feel uncomfortable. That discomfort is the point - it exposes problems in your workflow that were previously hidden by excess WIP.

## What Happens When You Hit the Limit

When the team reaches its WIP limit and someone finishes a task, they have two options:

1. **Pull the next highest-priority item** (if the WIP limit allows it).
2. **Swarm on an existing item** that is blocked, stuck, or nearing its cycle time target.

When the WIP limit is reached and no items are complete:

- **Do not start new work.** This is the hardest part and the most important.
- **Help unblock existing work.** Pair with someone. Review a pull request. Write a missing test. Talk to the person who has the answer to the blocking question.
- **Improve the process.** If nothing is blocked but everything is slow, this is the time to work on automation, tooling, or documentation.

## Swarming

Swarming is the practice of multiple team members working together on a single item to get it finished faster. It is the natural complement to WIP limits.

### When to Swarm

- An item has been in progress for longer than the team's cycle time target (e.g., more than 2 days)
- An item is blocked and the blocker can be resolved by another team member
- The WIP limit is reached and someone needs work to do
- A critical defect needs to be fixed immediately

### How to Swarm Effectively

| Approach | How It Works | Best For |
|----------|-------------|----------|
| **Pair programming** | Two developers work on the same item at the same machine | Complex logic, knowledge transfer, code that needs review |
| **Mob programming** | The whole team works on one item together | Critical path items, complex architectural decisions |
| **Divide and conquer** | Break the item into sub-tasks and assign them | Items that can be parallelized (e.g., frontend + backend + tests) |
| **Unblock and return** | One person resolves the blocker, then hands back | External dependencies, environment issues, access requests |

### Why Teams Resist Swarming

The most common objection: "It's inefficient to have two people on one task." This is only true if you measure efficiency as "percentage of time each person is writing new code." If you measure efficiency as "how quickly value reaches production," swarming is almost always faster because it reduces handoffs, wait time, and rework.

## How Limiting WIP Exposes Workflow Issues

One of the most valuable effects of WIP limits is that they make hidden problems visible. When you cannot start new work, you are forced to confront the problems that slow existing work down.

| Symptom When WIP Is Limited | Root Cause Exposed |
|-----------------------------|--------------------|
| "I'm idle because my PR is waiting for review" | Code review process is too slow |
| "I'm idle because I'm waiting for the test environment" | Not enough environments, or environments are not self-service |
| "I'm idle because I'm waiting for the product owner to clarify requirements" | Stories are not refined before being pulled into the sprint |
| "I'm idle because my build is broken and I can't figure out why" | Build is not deterministic, or test suite is flaky |
| "I'm idle because another team hasn't finished the API I depend on" | Architecture is too tightly coupled (see [Architecture Decoupling](../architecture-decoupling/)) |

Each of these is a bottleneck that was previously invisible because the team could always start something else. With WIP limits, these bottlenecks become obvious and demand attention.

## Implementing WIP Limits

### Step 1: Make WIP Visible (Week 1)

Before setting limits, make current WIP visible:

- Count the number of items currently "in progress" for the team
- Write this number on the board (physical or digital) every day
- Most teams are shocked by how high it is. A team of 5 often has 15-20 items in progress.

### Step 2: Set the Initial Limit (Week 2)

- Calculate N+2 for your team
- Add the limit to your board (e.g., a column header that says "In Progress (limit: 7)")
- Agree as a team that when the limit is reached, no new work starts

### Step 3: Enforce the Limit (Week 3+)

- When someone tries to pull new work and the limit is reached, the team helps them find an existing item to work on
- Track violations: how often does the team exceed the limit? What causes it?
- Discuss in [retrospectives](../retrospectives/): Is the limit too high? Too low? What bottlenecks are exposed?

### Step 4: Reduce the Limit (Monthly)

- Every month, consider reducing the limit by 1
- Each reduction will expose new bottlenecks - this is the intended effect
- Stop reducing when the team reaches a sustainable flow where items move from start to done predictably

## Key Pitfalls

### 1. "We set a WIP limit but nobody enforces it"

A WIP limit that is not enforced is not a WIP limit. Enforcement requires a team agreement and a visible mechanism. If the board shows 10 items in progress and the limit is 7, the team should stop and address it immediately. This is a working agreement, not a suggestion.

### 2. "Developers are idle and management is uncomfortable"

This is the most common failure mode. Management sees "idle" developers and concludes WIP limits are wasteful. In reality, those "idle" developers are either swarming on existing work (which is productive) or the team has hit a genuine bottleneck that needs to be addressed. The discomfort is a signal that the system needs improvement.

### 3. "We have WIP limits but we also have expedite lanes for everything"

If every urgent request bypasses the WIP limit, you do not have a WIP limit. Expedite lanes should be rare - one per week at most. If everything is urgent, nothing is.

### 4. "We limit WIP per person but not per team"

Per-person WIP limits miss the point. The goal is to limit team WIP so that team members are incentivized to help each other. A per-person limit of 1 with no team limit still allows the team to have 8 items in progress simultaneously with no swarming.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| [Work in progress](../../../metrics/work-in-progress/) | At or below team limit | Confirms the limit is being respected |
| [Development cycle time](../../../metrics/development-cycle-time/) | Decreasing | Confirms that less WIP leads to faster delivery |
| Items completed per week | Stable or increasing | Confirms that finishing more, starting less works |
| Time items spend blocked | Decreasing | Confirms bottlenecks are being addressed |

## Next Step

WIP limits expose problems. [Metrics-Driven Improvement](../metrics-driven-improvement/) provides the framework for systematically addressing them.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## Related Content

- [Too Much WIP](../../../symptoms/flow/too-much-wip/) - the primary symptom that WIP limits address
- [Work Items Take Too Long](../../../symptoms/flow/work-items-take-too-long/) - a symptom caused by excess work in progress
- [PRs Waiting for Review](../../../symptoms/flow/prs-waiting-for-review/) - a bottleneck that WIP limits expose
- [Unbounded WIP](../../../anti-patterns/team-workflow/unbounded-wip/) - the anti-pattern of having no limits on work in progress
- [Push-Based Work Assignment](../../../anti-patterns/team-workflow/push-based-work-assignment/) - the anti-pattern of assigning work rather than letting teams pull it
- [Work in Progress metric](../../../metrics/work-in-progress/) - how to measure and track WIP over time
