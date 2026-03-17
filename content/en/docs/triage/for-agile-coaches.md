---
title: "Symptoms for Agile Coaches"
linkTitle: "For Agile Coaches"
weight: 4
aliases:
  - /docs/symptoms/for-agile-coaches/
description: >
  Dysfunction symptoms that surface in team process, collaboration, and integration workflows -
  the areas where coaching has the most leverage.
---

These are the symptoms you see in retrospectives, stand-ups, and planning sessions. They show up
as process friction, collaboration breakdowns, and integration pain. If something on this list
sounds familiar, follow the link to find what is causing it and how to fix it.

## Work is stuck or invisible

- **[Everything Started, Nothing Finished]({{< relref "/docs/symptoms/flow/work-management/too-much-wip" >}})** - The board is full of in-progress items but the done column is empty. The team is busy but throughput is low.
- **[Work Items Take Days or Weeks to Complete]({{< relref "/docs/symptoms/flow/work-management/work-items-take-too-long" >}})** - Cycle time is long and unpredictable. Items sit in progress for days because they are too large or blocked by dependencies.
- **[Blocked Work Sits Idle Instead of Being Picked Up]({{< relref "/docs/symptoms/flow/work-management/blocked-work-sits-idle" >}})** - When work is blocked, nobody swarms to unblock it. Items sit in a blocked column until the original assignee returns to them.
- **[Sprint Planning Is Dominated by Dependency Negotiation]({{< relref "/docs/symptoms/flow/work-management/dependency-heavy-planning" >}})** - Most of planning is spent coordinating with other teams, not deciding what to build.
- **[Features Must Wait for a Separate QA Team]({{< relref "/docs/symptoms/deployment/waiting-on-qa-team" >}})** - A handoff to QA creates a queue that blocks flow and delays feedback to developers.
- **[Work Stalls Waiting for the Platform Team]({{< relref "/docs/symptoms/flow/work-management/waiting-on-platform-team" >}})** - Cross-team dependencies create idle time that planning cannot eliminate.

## Integration and feedback loops

- **[Pull Requests Sit for Days Waiting for Review]({{< relref "/docs/symptoms/flow/integration/prs-waiting-for-review" >}})** - Work is done but not reviewed. Developers start new branches while waiting, driving up work in progress.
- **[Merging Is Painful and Time-Consuming]({{< relref "/docs/symptoms/flow/integration/painful-merges" >}})** - Branches diverge so far from the main line that merging takes hours of conflict resolution.
- **[The Team Resists Merging to the Main Branch]({{< relref "/docs/symptoms/flow/integration/resistance-to-trunk-based-development" >}})** - Developers prefer long-lived branches because merging feels risky. The team lacks the safety net to integrate frequently.
- **[Feedback Takes Hours Instead of Minutes]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}})** - Developers do not learn whether a change works until long after they wrote it, which encourages large batches.
- **[The Team Is Caught Between Shipping Fast and Not Breaking Things]({{< relref "/docs/symptoms/flow/integration/speed-vs-stability-tension" >}})** - Speed and stability feel like a tradeoff. The team lacks the practices that make both possible.
- **[Test Automation Always Lags Behind Development]({{< relref "/docs/symptoms/testing/test-automation-lags-development" >}})** - Automation is treated as a follow-up task, so the safety net is always incomplete when it matters most.

## Team knowledge and collaboration

- **[Retrospectives Produce No Real Change]({{< relref "/docs/symptoms/flow/team-knowledge/meaningless-retrospectives" >}})** - Action items are generated but never acted on. The team has stopped believing retrospectives lead to improvement.
- **[The Team Has No Shared Agreements About How to Work]({{< relref "/docs/symptoms/flow/team-knowledge/no-shared-workflow-expectations" >}})** - There is no team working agreement. Each person follows their own workflow, leading to friction and misaligned expectations.
- **[The Same Mistakes Happen in the Same Domain Repeatedly]({{< relref "/docs/symptoms/flow/team-knowledge/repeated-domain-mistakes" >}})** - Lessons are not retained. The same types of defects or process failures recur because knowledge is not shared.
- **[Team Membership Changes Constantly]({{< relref "/docs/symptoms/flow/team-knowledge/team-instability" >}})** - People rotate in and out. The team never builds enough shared context to improve its own process.
- **[Delivery Slows Every Time the Team Rotates]({{< relref "/docs/symptoms/flow/team-knowledge/rotation-ramp-up-drag" >}})** - New members take weeks to become productive because knowledge lives in people, not in the system.
- **[The Team Has No Shared Working Hours Across Time Zones]({{< relref "/docs/symptoms/flow/team-knowledge/distributed-team-no-overlap" >}})** - Async-only communication slows integration and makes pairing or swarming impractical.

## Delivery pace and sustainability

- **[Completed Stories Do Not Match What Was Needed]({{< relref "/docs/symptoms/flow/work-management/completed-work-misses-intent" >}})** - Work is technically done but does not solve the problem. Requirements were misunderstood or changed without feedback loops.
- **[Stakeholders See Working Software Only at Release Time]({{< relref "/docs/symptoms/flow/work-management/delayed-stakeholder-feedback" >}})** - Feedback arrives too late to act on. The team builds the wrong thing because stakeholders are not involved until the end.
- **[Some Developers Are Overloaded While Others Wait]({{< relref "/docs/symptoms/flow/work-management/uneven-workloads" >}})** - Work is assigned to individuals rather than pulled by the team. Bottlenecks form around specific people.
- **[Team Burnout and Unsustainable Pace]({{< relref "/docs/symptoms/visibility/team-burnout" >}})** - Process friction, on-call burden, and deployment stress are wearing the team down. Attrition risk is high.
- **[The Team Is Chasing DORA Benchmarks]({{< relref "/docs/symptoms/visibility/chasing-dora-benchmarks" >}})** - Metrics become targets rather than diagnostics, distorting behavior instead of improving it.

See [Learning Paths]({{< relref "/docs/learning-paths" >}}) for a structured reading sequence through diagnosis and fixes.
