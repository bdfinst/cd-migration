---
title: "Document Your Current Process"
linkTitle: "Document Current Process"
weight: 1
description: >
  Before formal value stream mapping, get the team to write down every step from "ready to push" to "running in production." Quick wins surface immediately; the documented process becomes better input for the value stream mapping session.
---

{{% pageinfo %}}
The [Brownfield CD overview](..) covers the migration phases, principles, and common challenges.
This page covers the **first practical step** - documenting what actually happens today between a
developer finishing a change and that change running in production.
{{% /pageinfo %}}

## Why Document Before Mapping

[Value stream mapping](../../migration-path/assess/value-stream-mapping/) is a powerful tool for systemic improvement. It requires measurement, cross-team
coordination, and careful analysis. That takes time to do well, and it should not be rushed.

But you do not need a value stream map to spot obvious friction. Manual steps that could be
automated, wait times caused by batching, handoffs that exist only because of process - these
are visible the moment you write the process down.

Document your current process first. This gives you two things:

1. **Quick wins you can fix this week.** Obvious waste that requires no measurement or
   cross-team coordination to remove.
2. **Better input for value stream mapping.** When you do the formal mapping session, the team
   is not starting from a blank whiteboard. They have a shared, written description of what
   actually happens, and they have already removed the most obvious friction.

Quick wins build momentum. Teams that see immediate improvements are more willing to invest in
the deeper systemic work that value stream mapping reveals.

## How to Do It

Get the team together. Pick a recent change that went through the full process from "ready to
push" to "running in production." Walk through every step that happened, in order.

The rules:

- **Document what actually happens, not what should happen.** If the official process says
  "automated deployment" but someone actually SSH-es into a server and runs a script, write
  down the SSH step.
- **Include the invisible steps.** The Slack message asking for review. The email requesting
  deploy approval. The wait for the Tuesday deploy window. These are often the biggest sources
  of delay and they are usually missing from official process documentation.
- **Get the whole team in the room.** Different people see different parts of the process. The
  developer who writes the code may not know what happens after the merge. The ops person who
  runs the deploy may not know about the QA handoff. You need every perspective.
- **Write it down as an ordered list.** Not a flowchart, not a diagram, not a wiki page with
  sections. A simple numbered list of steps in the order they actually happen.

## What to Capture for Each Step

For every step in the process, capture these details:

| Field | What to Write | Example |
|-------|--------------|---------|
| Step name | What happens, in plain language | "QA runs manual regression tests" |
| Who does it | Person or role responsible | "QA engineer on rotation" |
| Manual or automated | Is this step done by a human or by a tool? | "Manual" |
| Typical duration | How long the step itself takes | "4 hours" |
| Wait time before it starts | How long the change sits before this step begins | "1-2 days (waits for QA availability)" |
| What can go wrong | Common failure modes for this step | "Tests find a bug, change goes back to dev" |

The wait time column is usually more revealing than the duration column. A deploy that takes 10
minutes but only happens on Tuesdays has up to 7 days of wait time. The step itself is not the
problem - the batching is.

## Example: A Typical Brownfield Process

This is a realistic example of what a brownfield team's process might look like before any CD
practices are adopted. Your process will differ, but the pattern of manual steps and wait times
is common.

| # | Step | Who | Manual/Auto | Duration | Wait Before | What Can Go Wrong |
|---|------|-----|-------------|----------|-------------|-------------------|
| 1 | Push to feature branch | Developer | Manual | Minutes | None | Merge conflicts with other branches |
| 2 | Open pull request | Developer | Manual | 10 min | None | Forgot to update tests |
| 3 | Wait for code review | Developer (waiting) | Manual | - | 4 hours to 2 days | Reviewer is busy, PR sits |
| 4 | Address review feedback | Developer | Manual | 30 min to 2 hours | - | Multiple rounds of feedback |
| 5 | Merge to main branch | Developer | Manual | Minutes | - | Merge conflicts from stale branch |
| 6 | CI runs (build + unit tests) | CI server | Automated | 15 min | Minutes | Flaky tests cause false failures |
| 7 | QA picks up ticket from board | QA engineer | Manual | - | 1-3 days | QA backlog, other priorities |
| 8 | Manual functional testing | QA engineer | Manual | 2-4 hours | - | Finds bug, sends back to dev |
| 9 | Request deploy approval | Team lead | Manual | 5 min | - | Approver is on vacation |
| 10 | Wait for deploy window | Everyone (waiting) | - | - | 1-7 days (deploys on Tuesdays) | Window missed, wait another week |
| 11 | Ops runs deployment | Ops engineer | Manual | 30 min | - | Script fails, manual rollback |
| 12 | Smoke test in production | Ops engineer | Manual | 15 min | - | Finds issue, emergency rollback |

**Total typical time: 3 to 14 days from "ready to push" to "running in production."**

Even before measurement or analysis, patterns jump out:

- Steps 3, 7, and 10 are pure wait time - nothing is happening to the change.
- Steps 8 and 12 are manual testing that could potentially be automated.
- Step 10 is artificial batching - deploys happen on a schedule, not on demand.
- Step 9 might be a rubber-stamp approval that adds delay without adding safety.

## Spotting Quick Wins

Once the process is documented, look for these patterns. Each one is a potential quick win that
the team can fix without a formal improvement initiative.

### Automation targets

Steps that are purely manual but have well-known automation:

- **Code formatting and linting.** If reviewers spend time on style issues, add a linter to CI.
  This saves reviewer time on every single PR.
- **Running tests.** If someone manually runs tests before merging, make CI run them
  automatically on every push.
- **Build and package.** If someone manually builds artifacts, automate the build in the
  pipeline.
- **Smoke tests.** If someone manually clicks through the app after deploy, write a small set
  of automated smoke tests.

### Batching delays

Steps where changes wait for a scheduled event:

- **Deploy windows.** "We deploy on Tuesdays" means every change waits an average of 3.5 days.
  Moving to deploy-on-demand (even if still manual) removes this wait entirely.
- **QA batches.** "QA tests the release candidate" means changes queue up. Testing each change
  as it merges removes the batch.
- **CAB meetings.** "The change advisory board meets on Thursdays" adds up to a week of wait
  time per change.

### Process-only handoffs

Steps where work moves between people not because of a skill requirement, but because of
process:

- **QA sign-off that is a rubber stamp.** If QA always approves and never finds issues, the
  sign-off is not adding value.
- **Approval steps that are never rejected.** Track the rejection rate. If an approval step
  has a 0% rejection rate over the last 6 months, it is ceremony, not a gate.
- **Handoffs between people who sit next to each other.** If the developer could do the step
  themselves but "process says" someone else has to, question the process.

### Unnecessary steps

Steps that exist because of historical reasons and no longer serve a purpose:

- **Manual steps that duplicate automated checks.** If CI runs the tests and someone also runs
  them manually "just to be sure," the manual run is waste.
- **Approvals for low-risk changes.** Not every change needs the same level of scrutiny. A
  typo fix in documentation does not need a CAB review.

## Quick Wins vs. Value Stream Improvements

Not everything you find in the documented process is a quick win. Distinguish between the two:

| | Quick Wins | Value Stream Improvements |
|---|-----------|--------------------------|
| **Scope** | Single team can fix | Requires cross-team coordination |
| **Timeline** | Days to a week | Weeks to months |
| **Measurement** | Obvious before/after | Requires baseline metrics and tracking |
| **Risk** | Low - small, reversible changes | Higher - systemic process changes |
| **Examples** | Add linter to CI, remove rubber-stamp approval, enable on-demand deploys | Restructure testing strategy, redesign deployment pipeline, change team topology |

**Do the quick wins now.** Do not wait for the value stream mapping session. Every manual step
you remove this week is one less step cluttering the value stream map and one less source of
friction for the team.

**Bring the documented process to the value stream mapping session.** The team has already
aligned on what actually happens, removed the obvious waste, and built some momentum. The value
stream mapping session can focus on the systemic issues that require measurement, cross-team
coordination, and deeper analysis.

## What Comes Next

1. **Fix the quick wins.** Assign each one to someone with a target of this week or next week.
   Do not create a backlog of improvements that sits untouched.
2. **Schedule the value stream mapping session.** Use the documented process as the starting
   point. See [Value Stream Mapping](../../migration-path/assess/value-stream-mapping/).
3. **Start the replacement cycle.** For manual validations that are not quick wins, use the
   [Replacing Manual Validations](../replacing-manual-validations/) cycle to systematically
   automate and remove them.

## Related Content

- [Value Stream Mapping](../../migration-path/assess/value-stream-mapping/) - The formal analysis tool for systemic improvements
- [Replacing Manual Validations](../replacing-manual-validations/) - The cycle for automating and removing manual steps
- [Identify Constraints](../../migration-path/assess/identify-constraints/) - Prioritize which bottleneck to fix first
- [Baseline Metrics](../../migration-path/assess/baseline-metrics/) - Measure your starting point before making changes
