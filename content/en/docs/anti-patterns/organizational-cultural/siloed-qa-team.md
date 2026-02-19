---
title: "Siloed QA Team"
linkTitle: "Siloed QA Team"
weight: 57
category: "Organizational & Cultural"
risk_level: high
description: >
  Testing is someone else's job - developers write code and throw it to QA, who find bugs days later when context is already lost.
tags:
  - test-strategy
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A developer finishes a story, marks it done, and drops it into a QA queue. The QA team - a separate group with its own manager, its own metrics, and its own backlog - picks it up when capacity allows. By the time a tester sits down with the feature, the developer is two stories further along. When the bug report arrives, the developer must mentally reconstruct what they were thinking when they wrote the code.

This pattern appears in organizations that inherited a waterfall structure even as they adopted agile ceremonies. The board shows sprints and stories, but the workflow still has a sequential "dev done, now QA" phase. Quality becomes a gate, not a practice. Testers are positioned as inspectors who catch defects rather than collaborators who help prevent them.

The QA team is often the bottleneck that neither developers nor management want to discuss. Developers claim stories are done while a pile of untested work accumulates in the QA queue. Actual cycle time - from story start to verified done - is two or three times what the development-only time suggests. Releases are delayed because QA "isn't finished yet," which is rationalized as the price of quality.

Common variations:

- **Offshore QA.** Testing is performed by a lower-cost team in a different timezone, adding 24 hours of communication lag to every bug report.
- **UAT as the only real test.** Automated testing is minimal; user acceptance testing by a separate team is the primary quality gate, happening at the end of a release cycle.
- **Specialist performance or security QA.** Non-functional testing is owned by separate specialist teams who are only engaged at the end of development.

The telltale sign: the QA team's queue is always longer than its capacity, and releases regularly wait for testing to "catch up."

## Why This Is a Problem

Separating testing from development treats quality as a property you inspect for rather than a property you build in. Inspection finds defects late; building in prevents them from forming.

### It reduces quality

When testers and developers work separately, testers cannot give developers the real-time feedback that prevents defect recurrence. A developer who never pairs with a tester never learns which of their habits produce fragile, hard-to-test code. The feedback loop - write code, get bug report, fix bug, repeat - operates on a weekly cycle rather than a daily one.

Manual testing by a separate team is also inherently incomplete. Testers work from requirements documents and acceptance criteria written before the code existed. They cannot anticipate every edge case the code introduces, and they cannot keep up with the pace of change as a team scales. The illusion of thoroughness - a QA team signed off on it - provides false confidence that automated testing tied directly to the codebase does not.

The separation also creates a perverse incentive around bug severity. When bug reports travel across team boundaries, they are frequently downgraded in severity to avoid delaying releases. Developers push back on "won't fix" calls. QA pushes for "must fix." Neither team has full context on what the right call is, and the organizational politics of the decision matter more than the actual risk.

### It increases rework

A logic error caught 10 minutes after writing takes 5 minutes to fix. The same defect reported by a QA team three days later takes 30 to 90 minutes - the developer must re-read the code, reconstruct the intent, and verify the fix does not break surrounding logic. The defect discovered in production costs even more.

Siloed QA maximizes defect age. A bug report that arrives in the developer's queue a week after the code was written is the most expensive version of that bug. Multiply across a team of 8 developers generating 20 stories per sprint, and the rework overhead is substantial - often accounting for 20 to 40 percent of development capacity.

Context loss makes rework particularly painful. Developers who must revisit old code frequently introduce new defects in the process of fixing the old one, because they are working from incomplete memory of what the code is supposed to do. Rework is not just slow; it is risky.

### It makes delivery timelines unpredictable

The QA queue introduces variance that makes delivery timelines unreliable. Development velocity can be measured and forecast. QA capacity is a separate variable with its own constraints, priorities, and bottlenecks. A release date set based on development completion is invalidated by a QA backlog that management cannot see until the week of release.

This leads teams to pad estimates unpredictably. Developers finish work early and start new stories rather than reporting "done" because they know the feature will sit in QA anyway. The board shows everything in progress simultaneously because neither development nor QA has a reliable throughput the other can plan around.

Stakeholders experience this as the team not knowing when things will be ready. The honest answer - "development is done but QA hasn't started" - sounds like an excuse. The team's credibility erodes, and pressure increases to skip testing to hit dates, which causes production incidents, which confirms to management that QA is necessary, which entrenches the bottleneck.

### Impact on continuous delivery

CD requires that quality be verified automatically in the pipeline on every commit. A siloed QA team that manually tests completed work is incompatible with this model. You cannot run a pipeline stage that waits for a human to click through a test script.

The cultural dimension matters as much as the structural one. CD requires every developer to feel responsible for the quality of what they ship. When testing is "someone else's job," developers externalize quality responsibility. They do not write tests, do not think about testability when designing code, and do not treat a test failure as their problem to solve. This mindset must change before CD practices can take hold.

## How to Fix It

### Step 1: Measure the QA queue and its impact (Week 1)

Before making structural changes, quantify the cost of the current model to build consensus for change.

1. Measure the average time from "dev complete" to "QA verified" for stories over the last 90 days.
2. Count the number of bugs reported by QA versus bugs caught by developers before reaching QA.
3. Calculate the average age of bugs when they are reported to developers.
4. Map which test types are currently automated versus manual and estimate the manual test time per sprint.
5. Share these numbers with both development and QA leadership as the baseline for improvement.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "Our QA team is highly skilled and adds real value." | Their skills are more valuable when applied to exploratory testing, test strategy, and automation - not manual regression. The goal is to leverage their expertise better, not eliminate it. |
| "The numbers don't tell the whole story." | They rarely do. Use them to start a conversation, not to win an argument. |

### Step 2: Shift test ownership to the development team (Weeks 2-6)

1. Embed QA engineers into development teams rather than maintaining a separate QA team. One QA engineer per team is a reasonable starting ratio.
2. Require developers to write unit and integration tests as part of each story - not as a separate task, but as part of the definition of done.
3. Establish a team-level automation coverage target (e.g., 80% of acceptance criteria covered by automated tests before a story is considered done).
4. Add automated test execution to the CI pipeline so every commit is verified without human intervention.
5. Redirect QA engineer effort from manual verification to test strategy, automation framework maintenance, and exploratory testing of new features.
6. Remove the separate QA queue from the board and replace it with a "verified done" column that requires automated test passage.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "Developers can't write good tests." | Most cannot yet, because they were never expected to. Start with one pair this sprint - a QA engineer and a developer writing tests together for a single story. Track defect rates on that story versus unpairing stories. The data will make the case for expanding. |
| "We don't have time to write tests and features." | You are already spending that time fixing bugs QA finds. Count the hours your team spent on bug fixes last sprint. That number is the time budget for writing the automated tests that would have prevented them. |

### Step 3: Build the quality feedback loop into the pipeline (Weeks 6-12)

1. Configure the CI pipeline to run the full automated test suite on every pull request and block merging on test failure.
2. Add test failure notification directly to the developer who wrote the failing code, not to a QA queue.
3. Create a test results dashboard visible to the whole team, showing coverage trends and failure rates over time.
4. Establish a policy that no story can be demonstrated in a sprint review unless its automated tests pass in the pipeline.
5. Schedule a monthly retrospective specifically on test coverage gaps - what categories of defects are still reaching production and what tests would have caught them.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "The pipeline will be too slow if we run all tests on every commit." | Structure tests in layers: fast unit tests on every commit, slower integration tests on merge, full end-to-end on release candidate. Measure current pipeline time, apply the layered structure, and re-measure - most teams cut commit-stage feedback time to under five minutes. |
| "Automated tests miss things humans catch." | Yes. Automated tests catch regressions reliably at low cost. Humans catch novel edge cases. Both are needed. Free your QA engineers from regression work so they can focus on the exploratory testing only humans can do. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Development cycle time](../../../metrics/development-cycle-time/) | Reduction in time from story start to verified done, as the QA queue wait disappears |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should improve as automated tests catch defects before production |
| [Lead time](../../../metrics/lead-time/) | Decrease as testing no longer adds days or weeks between development and deployment |
| [Integration frequency](../../../metrics/integration-frequency/) | Increase as developers gain confidence that automated tests catch regressions |
| [Work in progress](../../../metrics/work-in-progress/) | Reduction in stories stuck in the QA queue |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Improvement as defects are caught earlier when they are cheaper to fix |

## Related Content

- [Testing fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - how to build an effective automated test suite
- [Working agreements](../../../migrate-to-cd/migration-path/foundations/working-agreements/) - define shared quality expectations across the team
- [Deterministic pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - make test results reliable so the pipeline can be trusted
- [Metrics-driven improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - use data to track the transition from siloed to embedded testing
- [Separate Ops/Release Team](../separate-ops-team/) - related pattern where testing isolation mirrors deployment isolation
