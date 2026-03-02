---
title: "Testing Only at the End"
linkTitle: "Testing only at the end"
weight: 20
category: "Testing & Quality"
risk_level: high
description: >
  QA is a phase after development, making testers downstream consumers of developer output
  rather than integrated team members.
tags:
  - test-strategy
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The team works in two-week sprints. Development happens in the first week and a half. The last
few days are "QA time," when testers receive the completed work and begin exercising it. Bugs
found during QA must either be fixed quickly before the deadline or pushed to the next sprint.
Bugs found after the sprint closes are treated as defects and added to a bug backlog. The bug
backlog grows faster than the team can clear it.

Developers consider a task "done" when their code review is merged. Testers receive the work
without having been involved in defining what "tested" means. They write test cases after the
fact based on the specification - if one exists - and their own judgment about what matters.
The developers are already working on the next sprint by the time bugs are reported. Context has
decayed. A bug found two weeks after the code was written is harder to diagnose than the same bug
found two hours after.

Common variations:

- **The sequential handoff.** Development completes all features. Work is handed to QA. QA
  returns a bug list. Development fixes the bugs. Work is handed back to QA for regression
  testing. This cycle repeats until QA signs off. The release date is determined by how many
  cycles occur.
- **The last-mile test environment.** A test environment is only provisioned for the QA phase.
  Developers have no environment that resembles production and cannot test their own work in
  realistic conditions. All realistic testing happens at the end.
- **The sprint-end test blitz.** Testers are not idle during the sprint - they are catching up
  on testing from two sprints ago while development works on the current sprint. The lag means
  bugs from last sprint are still being found when the sprint they caused has been closed for
  two weeks.
- **The separate QA team.** A dedicated QA team sits organizationally separate from development.
  They are not in sprint planning, not in design discussions, and not consulted until code exists.
  Their role is validation, not quality engineering.

The telltale sign: developers and testers work on the same sprint but testers are always testing
work from a previous sprint. The team is running two development cycles in parallel, offset by
one iteration.

## Why This Is a Problem

Testing at the end of development is a legacy of the waterfall model, where phases were
sequential by design. In that model, the cost of rework was assumed to be fixed, and the way to
minimize it was to catch problems as late as possible in a structured way. Agile and CD have
changed those assumptions. Rework cost is lowest when defects are caught immediately, which
requires testing to happen throughout development.

### It reduces quality

Bugs caught late are more expensive to fix for two reasons. First, context decay: the developer
who wrote the code is no longer in that code. They are working on something new. When a bug
report arrives two weeks after the code was written, they must reconstruct their understanding
of the code before they can understand the bug. This reconstruction is slow and error-prone.

Second, cascade effects: code written after the buggy code may depend on the bug. A calculation
that produces incorrect results might be consumed by downstream logic that was written assuming
the incorrect result was correct. Fixing the original bug now requires fixing everything downstream
too. The further the bug travels through the codebase before being caught, the more code depends
on the incorrect behavior.

When testing happens throughout development - when the developer writes a test before or alongside
the code - the bug is caught in seconds or minutes. The developer has full context. The fix is
immediate. Nothing downstream has been built on the incorrect behavior yet.

### It increases rework

End-of-sprint testing consistently produces a volume of bugs that exceeds the team's capacity to
fix them before the deadline. The backlog of unfixed bugs grows. Teams routinely carry a bug
backlog of dozens or hundreds of issues. Each issue in that backlog represents work that was done,
found to be wrong, and not yet corrected - work in progress that is neither done nor abandoned.

The rework is compounded by the handoff model itself. A tester writes a bug report. A developer
reads it, interprets it, fixes it, and marks it resolved. The tester verifies the fix. If the
fix is wrong, another cycle begins. Each cycle includes the overhead of the handoff: context
switching, communication delays, and the cost of re-familiarizing with the problem. A bug that a
developer could fix in 10 minutes if caught during development might take two hours across multiple
handoff cycles.

When developers and testers collaborate during development - discussing acceptance criteria before
coding, running tests as code is written - the handoff cycle does not exist. Problems are found
and fixed in a single context by people who both understand the problem.

### It makes delivery timelines unpredictable

The duration of an end-of-development testing phase is proportional to the number of bugs found,
which is not knowable in advance. Teams plan for a fixed QA window - say, three days - but if
testing finds 20 critical bugs, the window stretches to two weeks. The release date, which was
based on the planned QA window, is now wrong.

This unpredictability affects every stakeholder. Product managers cannot commit to delivery dates
because QA is a variable they cannot control. Developers cannot start new work cleanly because
they may be pulled back to fix bugs from the previous sprint. Testers are under pressure to
move faster, which leads to shallower testing and more bugs escaping to production.

The further from development that testing occurs, the more the feedback cycle looks like a batch
process: large batches of work go in one end, a variable quantity of bugs come out the other end,
and the time to process the batch is unpredictable.

### It creates organizational dysfunction

Testers who could catch a bug in the design conversation instead spend their time writing bug reports two weeks after the code shipped - and then defending their findings to developers who have already moved on. The structure wastes both their time. When testing is a separate downstream phase, the relationship between developers and testers
becomes adversarial by structure. Developers want to minimize the bug count that reaches QA.
Testers want to find every bug. Both objectives are reasonable, but the structure sets them in
opposition: developers feel reviewed and found wanting, testers feel their work is treated as
an obstacle to release.

This dysfunction persists even when individual developers and testers have good working
relationships. The structure rewards developers for code that passes QA and testers for finding
bugs, not for shared ownership of quality outcomes. Testers are not consulted on design decisions
where their perspective could prevent bugs from being written in the first place.

### Impact on continuous delivery

CD requires automated testing throughout the pipeline. A team that relies on a manual, end-of-
development QA phase cannot automate it into the pipeline. The pipeline runs, but the human
testing phase sits outside it. The pipeline provides only partial safety. Deployment frequency
is limited to the frequency of QA cycles, not the frequency of pipeline runs.

Moving to CD requires shifting the testing model fundamentally. Testing must happen at every
stage: as code is written (unit tests), as it is integrated (integration tests run in CI), and
as it is promoted toward production (acceptance tests in the pipeline). The QA function shifts
from end-stage bug finding to quality engineering: designing test strategies, building
automation, and ensuring coverage throughout the pipeline. That shift cannot happen incrementally
within the existing end-of-development model - it requires changing what testing means.

## How to Fix It

Shifting testing earlier is as much a cultural and organizational change as a technical one.
The goal is shared ownership of quality between developers and testers, with testing happening
continuously throughout the development process.

### Step 1: Involve testers in story definition

The first shift is the earliest in the process: bring testers into the conversation before
development begins.

1. In the next sprint planning, include a tester in story refinement.
2. For each story, agree on acceptance criteria and the test cases that will verify them before
   coding starts.
3. The developer and tester agree: "when these tests pass, this story is done."

This single change improves quality in two ways. Testers catch ambiguities and edge cases during
definition, before the code is written. And developers have a clear, testable definition of done
that does not depend on the tester's interpretation after the fact.

### Step 2: Write automated tests alongside the code (Weeks 2-3)

For each story, require that automated tests be written as part of the development work.

1. The developer writes the unit tests as the code is written.
2. The tester authors or contributes acceptance test scripts during the sprint, not after.
3. Both sets of tests run in CI on every commit. A failing test is a blocking issue.

The tests do not replace the tester's judgment - they capture the acceptance criteria as
executable specifications. The tester's role shifts from manual execution to test strategy and
exploratory testing for behaviors not covered by the automated suite.

### Step 3: Give developers a production-like environment for self-testing (Weeks 2-4)

If developers test only on their local machines and testers test on a shared environment, the
testing conditions diverge. Bugs that appear only in integrated environments surface during QA,
not during development.

1. Provision a personal or pull-request-level environment for each developer. Infrastructure
   as code makes this feasible at low cost.
2. Developers must verify their changes in a production-like environment before marking a story
   ready for review.
3. The shared QA environment shifts from "where testing happens" to "where additional integration
   testing happens," not the first environment where the code is verified.

### Step 4: Define a "definition of done" that includes tests

If the team's definition of done allows a story to be marked complete without passing automated
tests, the incentive to write tests is weak. Change the definition.

1. A story is not done unless it has automated acceptance tests that pass in CI.
2. A story is not done unless the developer has tested it in a production-like environment.
3. A story is not done unless the tester has reviewed the test coverage and agreed it is
   sufficient.

This makes quality a shared gate, not a downstream handoff.

### Step 5: Shift the QA function toward quality engineering (Weeks 4-8)

As automated testing takes over the verification function that manual QA was performing, the
tester's role evolves. This transition requires explicit support and re-skilling.

1. Identify what currently takes the most tester time. If it is manual regression testing,
   that is the automation target.
2. Work with testers to automate the highest-value regression tests first.
3. Redirect freed tester capacity toward exploratory testing, test strategy, and pipeline
   quality engineering.

Testers who build automation for the pipeline provide more value than testers who manually
execute scripts. They also find more bugs, because they work earlier in the process when bugs
are cheaper to fix.

### Step 6: Measure bug escape rate and shift the metric forward (Ongoing)

Teams that test only at the end measure quality by the number of bugs found in QA. That metric
rewards QA effort, not quality outcomes. Change what is measured.

1. Track where bugs are found: in development, in CI, in code review, in QA, in production.
2. The goal is to shift discovery leftward. More bugs found in development is good. Fewer bugs
   found in QA is good. Zero bugs in production is the target.
3. Review the distribution in retrospectives. When a bug reaches QA, ask: why was this not
   caught earlier? What test would have caught it?

| Objection | Response |
|-----------|----------|
| "Testers are expensive - we can't have them involved in every story" | Testers involved in definition prevent bugs from being written. A tester's hour in planning prevents five developer hours of bug fix and retest cycle. The cost of early involvement is far lower than the cost of late discovery. |
| "Developers are not good at testing their own work" | That is true for exploratory testing of complete features. It is not true for unit tests of code they just wrote. The fix is not to separate testing from development - it is to build a test discipline that covers both developer-written tests and tester-written acceptance scenarios. |
| "We would need to slow down to write tests" | Teams that write tests as they go are faster overall. The time spent on tests is recovered in reduced debugging, reduced rework, and faster diagnosis when things break. The first sprint with tests is slower. The tenth sprint is faster. |
| "Our testers do not know how to write automation" | Automation is a skill that is learnable. Start with the testers contributing acceptance criteria in plain language and developers automating them. Grow tester automation skills over time. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Bug discovery distribution | Should shift earlier - more bugs found in development and CI, fewer in QA and production |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as rework from late-discovered bugs is reduced |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as automated tests catch regressions before deployment |
| Automated test count in CI | Should increase as tests are written alongside code |
| Bug backlog size | Should decrease or stop growing as fewer bugs escape development |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Should decrease as bugs are caught closer to when the code was written |

## Related Content

- [Testing Fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Building the automated test suite that supports continuous testing
- [QA Signoff as a Release Gate](../qa-signoff-gate/) - The downstream consequence of end-of-development testing
- [Manual Testing Only](../manual-testing-only/) - The broader pattern of which this is a subset
- [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/) - Smaller stories make continuous testing more practical
- [Metrics-Driven Improvement](../../../migrate-to-cd/migration-path/optimize/metrics-driven-improvement/) - Using bug discovery distribution to guide improvement
