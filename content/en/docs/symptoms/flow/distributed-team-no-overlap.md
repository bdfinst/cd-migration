---
aliases:
  - /docs/symptoms/distributed-team-no-overlap/
title: "The Team Has No Shared Working Hours Across Time Zones"
linkTitle: "Distributed team, no overlap"
description: >
  Code reviews wait overnight. Questions block for 12+ hours. Async handoffs replace collaboration.
tags:
  - team-dynamics
  - integration-frequency
---

## What you are seeing

A developer in London finishes a piece of work at 5 PM and creates a pull request. The reviewer in San Francisco is starting their day but has morning meetings and gets to the review at 2 PM Pacific - which is 10 PM London time, the next day. The author is offline. The reviewer leaves comments. The author responds the following morning. The review cycle takes four days for a change that would have taken 20 minutes with any overlap.

Integration conflicts sit unresolved for hours. The developer who could resolve the conflict is asleep when it is discovered. By the time they wake up, the main branch has moved further. Resolving the conflict now requires understanding changes made by multiple people across multiple time zones, none of whom are available simultaneously to sort it out.

The team has adapted with async-first practices: detailed PR descriptions, recorded demos, comprehensive written documentation. These adaptations reduce the cost of asynchrony but do not eliminate it. The team's throughput is bounded by communication latency, and the work items that require back-and-forth are the most expensive.

## Common causes

### Long-lived feature branches

Long-lived branches mean that integration conflicts are larger and more complex when they finally surface. Resolving a small conflict asynchronously is tolerable. Resolving a three-day branch merge asynchronously is genuinely difficult - the changes are large, the context for each change is spread across people in different time zones, and the resolution requires understanding decisions made by people who are not available.

Frequent, small integrations to trunk reduce conflict size. A conflict that would have been 500 lines with a week-old branch is 30 lines when branches are integrated daily.

**Read more:** [Long-lived feature branches](../../anti-patterns/branching-integration/long-lived-feature-branches/)

### Monolithic work items

Large items create larger diffs, more complex reviews, and more integration conflicts. In a distributed team, the time cost of large items is amplified by communication overhead. A review that requires one round of comments takes one day in a distributed team. A review that requires three rounds takes three days. Large items that require extensive review are expensive by construction.

Small items have small diffs. Small diffs require fewer review rounds. Fewer review rounds means faster cycle time even with the communication latency of a distributed team.

**Read more:** [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/)

### Knowledge silos

When critical knowledge lives in one person and that person is in a different time zone, questions block for 12 or more hours. The developer in Singapore who needs to ask the database expert in London waits overnight for each exchange. Externalizing knowledge into documentation, tests, and code comments reduces the per-question communication overhead.

When the answer to a common question is in a runbook, a developer does not need to wait for the one person who knows. The knowledge is available regardless of time zone.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **What is the average number of review round-trips for a pull request?** Each round-trip adds approximately one day of latency in a distributed team. Reducing item size reduces review complexity. Start with [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/).
2. **How often do integration conflicts require synchronous discussion to resolve?** If conflicts regularly need a real-time conversation, they are large enough that asynchronous resolution is impractical. Start with [Long-lived feature branches](../../anti-patterns/branching-integration/long-lived-feature-branches/).
3. **Do developers regularly wait overnight for answers to questions?** If yes, the knowledge needed for daily work is not accessible without specific people. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
