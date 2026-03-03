---
title: "Pressure to Skip Testing"
linkTitle: "Pressure to Skip Testing"
weight: 107
category: "Organizational & Cultural"
risk_level: high
description: >
  Management pressures developers to skip or shortcut testing to meet deadlines. The test suite
  rots sprint by sprint as skipped tests become the norm.
tags:
  - test-strategy
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A deadline is approaching. The manager asks the team how things are going. A developer says the
feature is done but the tests still need to be written. The manager says "we'll come back to the
tests after the release." The tests are never written. Next sprint, the same thing happens. After
a few months, the team has a codebase with patches of coverage surrounded by growing deserts of
untested code.

Nobody made a deliberate decision to abandon testing. It happened one shortcut at a time, each
one justified by a deadline that felt more urgent than the test suite.

Common variations:

- **"Tests are a nice-to-have."** The team treats test writing as optional scope that gets cut
  when time is short. Features are estimated without testing time. Tests are a separate backlog
  item that never reaches the top.
- **"We'll add tests in the hardening sprint."** Testing is deferred to a future sprint dedicated
  to quality. That sprint gets postponed, shortened, or filled with the next round of urgent
  features. The testing debt compounds.
- **"Just get it out the door."** A manager or product owner explicitly tells developers to skip
  tests for a specific release. The implicit message is that shipping matters and quality does
  not. Developers who push back are seen as slow or uncooperative.
- **The coverage ratchet in reverse.** The team once had 70% test coverage. Each sprint, a few
  untested changes slip through. Coverage drops to 60%, then 50%, then 40%. Nobody notices the
  trend because each individual drop is small. By the time someone looks at the number, half the
  safety net is gone.
- **Testing theater.** Developers write the minimum tests needed to pass a coverage gate - trivial
  assertions, tests that verify getters and setters, tests that do not actually exercise
  meaningful behavior. The coverage number looks healthy but the tests catch nothing.

The telltale sign: the team has a backlog of "write tests for X" tickets that are months old and
have never been started, while production incidents keep increasing.

## Why This Is a Problem

Skipping tests feels like it saves time in the moment. It does not. It borrows time from the
future at a steep interest rate. The effects are invisible at first and catastrophic later.

### It reduces quality

Every untested change is a change that nobody can verify automatically. The first few skipped
tests are low risk - the code is fresh in the developer's mind and unlikely to break. But as
weeks pass, the untested code is modified by other developers who do not know the original intent.
Without tests to pin the behavior, regressions creep in undetected.

The damage accelerates. When half the codebase is untested, developers cannot tell which changes
are safe and which are risky. They treat every change as potentially dangerous, which slows them
down. Or they treat every change as probably fine, which lets bugs through. Either way, quality
suffers.

Teams that maintain their test suite catch regressions within minutes of introducing them. The
developer who caused the regression fixes it immediately because they are still working on the
relevant code. The cost of the fix is minutes, not days.

### It increases rework

Untested code generates rework in two forms. First, bugs that would have been caught by tests
reach production and must be investigated, diagnosed, and fixed under pressure. A bug found by a
test costs minutes to fix. The same bug found in production costs hours - plus the cost of
the incident response, the rollback or hotfix, and the customer impact.

Second, developers working in untested areas of the codebase move slowly because they have no
safety net. They make a change, manually verify it, discover it broke something else, revert,
try again. Work that should take an hour takes a day because every change requires manual
verification.

The rework is invisible in sprint metrics. The team does not track "time spent debugging issues
that tests would have caught." But it shows up in velocity: the team ships less and less each
sprint even as they work longer hours.

### It makes delivery timelines unpredictable

When the test suite is healthy, the time from "code complete" to "deployed" is a known quantity.
The pipeline runs, tests pass, the change ships. When the test suite has been hollowed out by
months of skipped tests, that step becomes unpredictable. Some changes pass cleanly. Others
trigger production incidents that take days to resolve.

The manager who pressured the team to skip tests in order to hit a deadline ends up with less
predictable timelines, not more. Each skipped test is a small increase in the probability that a
future change will cause an unexpected failure. Over months, the cumulative probability climbs
until production incidents become a regular occurrence rather than an exception.

Teams with comprehensive test suites deliver predictably because the automated checks eliminate
the largest source of variance - undetected defects.

### It creates a death spiral

The most dangerous aspect of this anti-pattern is that it is self-reinforcing. Skipping tests
leads to more bugs. More bugs lead to more time spent firefighting. More time firefighting means
less time for testing. Less testing means more bugs. The cycle accelerates.

At the same time, the codebase becomes harder to test. Code written without tests in mind tends
to be tightly coupled, dependent on global state, and difficult to isolate. The longer testing is
deferred, the more expensive it becomes to add tests later. The team's estimate for "catching up
on testing" grows from days to weeks to months, making it even less likely that management will
allocate the time.

Eventually, the team reaches a state where the test suite is so degraded that it provides no
confidence. The team is effectively back to [manual testing only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}})
but with the added burden of maintaining a broken test infrastructure that nobody trusts.

### Impact on continuous delivery

Continuous delivery requires automated quality gates that the team can rely on. A test suite that
has been eroded by months of skipped tests is not a quality gate - it is a gate with widening
holes. Changes pass through it not because they are safe but because the tests that would have
caught the problems were never written.

A team cannot deploy continuously if they cannot verify continuously. When the manager says "skip
the tests, we need to ship," they are not just deferring quality work. They are dismantling the
infrastructure that makes frequent, safe deployment possible.

## How to Fix It

### Step 1: Make the cost visible

The pressure to skip tests comes from a belief that testing is overhead rather than investment.
Change that belief with data:

1. Count production incidents in the last 90 days. For each one, identify whether an automated
   test could have caught it. Calculate the total hours spent on incident response.
2. Measure the team's change fail rate - the percentage of deployments that cause a failure or
   require a rollback.
3. Track how long manual verification takes per release. Sum the hours across the team.

Present these numbers to the manager applying pressure. Frame it concretely: "We spent 40 hours
on incident response last quarter. Thirty of those incidents would have been caught by tests that
we skipped."

### Step 2: Include testing in every estimate

Stop treating tests as separate work items that can be deferred:

1. Agree as a team: no story is "done" until it has automated tests. This is a working agreement,
   not a suggestion.
2. Include testing time in every estimate. If a feature takes three days to build, the estimate is
   three days - including tests. Testing is not additive; it is part of building the feature.
3. Stop creating separate "write tests" tickets. Tests are part of the story, not a follow-up
   task.

When a manager asks "can we skip the tests to ship faster?" the answer is "the tests are part of
shipping. Skipping them means the feature is not done."

### Step 3: Set a coverage floor and enforce it

Prevent further erosion with an automated guardrail:

1. Measure current test coverage. Whatever it is - 30%, 50%, 70% - that is the floor.
2. Configure the pipeline to fail if a change reduces coverage below the floor.
3. Ratchet the floor up by 1-2 percentage points each month.

The floor makes the cost of skipping tests immediate and visible. A developer who skips tests
will see the pipeline fail. The conversation shifts from "we'll add tests later" to "the pipeline
won't let us merge without tests."

### Step 4: Recover coverage in high-risk areas (Weeks 3-6)

You cannot test everything retroactively. Prioritize the areas that matter most:

1. Use version control history to find the files with the most changes and the most bug fixes.
   These are the highest-risk areas.
2. For each high-risk file, write tests for the core behavior - the functions that other code
   depends on.
3. Allocate a fixed percentage of each sprint (e.g., 20%) to writing tests for existing code.
   This is not optional and not deferrable.

### Step 5: Address the management pressure directly (Ongoing)

The root cause is a manager who sees testing as optional. This requires a direct conversation:

| What the manager says | What to say back |
|----------------------|-----------------|
| "We don't have time for tests" | "We don't have time for the production incidents that skipping tests causes. Last quarter, incidents cost us X hours." |
| "Just this once, we'll catch up later" | "We said that three sprints ago. Coverage has dropped from 60% to 45%. There is no 'later' unless we stop the bleeding now." |
| "The customer needs this feature by Friday" | "The customer also needs the application to work. Shipping an untested feature on Friday and a hotfix on Monday does not save time." |
| "Other teams ship without this many tests" | "Other teams with similar practices have a change fail rate of X%. Ours is Y%. The tests are why." |

If the manager continues to apply pressure after seeing the data, escalate. Test suite erosion is
a technical risk that affects the entire organization's ability to deliver. It is appropriate to
raise it with engineering leadership.

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Test coverage trend | Should stop declining and begin climbing |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as coverage recovers |
| Production incidents from untested code | Track root causes - "no test coverage" should become less frequent |
| Stories completed without tests | Should drop to zero |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Should stabilize as manual verification decreases |
| Sprint capacity spent on incident response | Should decrease as fewer untested changes reach production |

## Related Content

- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Building a test strategy that becomes part of how the team works
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Making "done includes tests" an explicit team agreement
- [Manual Testing Only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}) - Where this anti-pattern ends up if left unchecked
- [Flaky Tests]({{< relref "/docs/symptoms/testing/flaky-tests" >}}) - Another way trust in the test suite erodes
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - Using data to make the case for quality practices
- [ACD]({{< relref "/docs/agentic-cd" >}}) - How ACD counters this anti-pattern by making test-first workflow mandatory
