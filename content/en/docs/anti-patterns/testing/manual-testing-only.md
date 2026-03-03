---
title: "Manual Testing Only"
linkTitle: "Manual Testing Only"
weight: 16
category: "Testing & Quality"
risk_level: critical
description: >
  Zero automated tests. The team has no idea where to start and the codebase was not designed
  for testability.
tags:
  - test-strategy
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What This Looks Like

The team deploys by manually verifying things work. Someone clicks through the application, checks
a few screens, and declares it good. There is no test suite. No test runner configured. No test
directory in the repository. The [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) server, if one exists, builds the code and stops there.

When a developer asks "how do I know if my change broke something?" the answer is either "you
don't" or "someone from QA will check it." Bugs discovered in production are treated as inevitable.
Nobody connects the lack of automated tests to the frequency of production incidents because there
is no baseline to compare against.

Common variations:

- **Tests exist but are never run.** Someone wrote tests a year ago. The test suite is broken and
  nobody has fixed it. The tests are checked into the repository but are not part of any [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}})
  or workflow.
- **Manual test scripts as the safety net.** A spreadsheet or wiki page lists hundreds of manual
  test cases. Before each release, someone walks through them by hand. The process takes days. It
  is the only verification the team has.
- **Testing is someone else's job.** Developers write code. A separate QA team tests it days or
  weeks later. The feedback loop is so long that developers have moved on to other work by the
  time defects are found.
- **"The code is too legacy to test."** The team has decided the codebase is untestable.
  Functions are thousands of lines long, everything depends on global state, and there are no
  seams where test doubles could be inserted. This belief becomes self-fulfilling - nobody tries
  because everyone agrees it is impossible.

The telltale sign: when a developer makes a change, the only way to verify it works is to deploy
it and see what happens.

## Why This Is a Problem

Without automated tests, every change is a leap of faith. The team has no fast, reliable way to
know whether code works before it reaches users. Every downstream practice that depends on
confidence in the code - continuous integration, automated deployment, frequent releases - is
blocked.

### It reduces quality

When there are no automated tests, defects are caught by humans or by users. Humans are slow,
inconsistent, and unable to check everything. A manual tester cannot verify 500 behaviors in an
hour, but an automated suite can. The behaviors that are not checked are the ones that break.

Developers writing code without tests have no feedback on whether their logic is correct until
someone else exercises it. A function that handles an edge case incorrectly will not be caught
until a user hits that edge case in production. By then, the developer has moved on and lost
context on the code they wrote.

With even a basic suite of automated tests, developers get feedback in minutes. They catch their
own mistakes while the code is fresh. The suite runs the same checks every time, never forgetting
an edge case and never getting tired.

### It increases rework

Without tests, rework comes from two directions. First, bugs that reach production must be
investigated, diagnosed, and fixed - work that an automated test would have prevented. Second,
developers are afraid to change existing code because they have no way to verify they have not
broken something. This fear leads to workarounds: copy-pasting code instead of refactoring,
adding conditional branches instead of restructuring, and building new modules alongside old ones
instead of modifying what exists.

Over time, the codebase becomes a patchwork of workarounds layered on workarounds. Each change
takes longer because the code is harder to understand and more fragile. The absence of tests is
not just a testing problem - it is a design problem that compounds with every change.

Teams with automated tests refactor confidently. They rename functions, extract modules, and
simplify logic knowing that the test suite will catch regressions. The codebase stays clean
because changing it is safe.

### It makes delivery timelines unpredictable

Without automated tests, the time between "code complete" and "deployed" is dominated by manual
verification. How long that verification takes depends on how many changes are in the batch, how
available the testers are, and how many defects they find. None of these variables are predictable.

A change that a developer finishes on Monday might not be verified until Thursday. If defects are
found, the cycle restarts. [Lead time]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}}) from commit to production is measured in weeks, and the
variance is enormous. Some changes take three days, others take three weeks, and the team cannot
predict which.

Automated tests collapse the verification step to minutes. The time from "code complete" to
"verified" becomes a constant, not a variable. Lead time becomes predictable because the largest
source of variance has been removed.

### Impact on continuous delivery

Automated tests are the foundation of [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}). Without them, there is no automated
quality gate. Without an automated quality gate, there is no safe way to deploy frequently.
Without frequent deployment, there is no fast feedback from production. Every CD practice assumes
that the team can verify code quality automatically. A team with no test automation is not on a
slow path to CD - they have not started.

## How to Fix It

Starting test automation on an untested codebase feels overwhelming. The key is to start small,
establish the habit, and expand coverage incrementally. You do not need to test everything before
you get value - you need to test something and keep going.

### Step 1: Set up the test infrastructure

Before writing a single test, make it trivially easy to run tests:

1. Choose a test framework for your primary language. Pick the most popular one - do not
   deliberate.
2. Add the framework to the project. Configure it. Write a single test that asserts `true == true`
   and verify it passes.
3. Add a `test` script or command to the project so that anyone can run the suite with a single
   command (e.g., `npm test`, `pytest`, `mvn test`).
4. Add the test command to the CI pipeline so that tests run on every push.

The goal for week one is not coverage. It is infrastructure: a working test runner in the pipeline
that the team can build on.

### Step 2: Write tests for every new change

Establish a team rule: every new change must include at least one automated test. Not "every new
feature" - every change. Bug fixes get a regression test that fails without the fix and passes
with it. New functions get a test that verifies the core behavior. Refactoring gets a test that
pins the existing behavior before changing it.

This rule is more important than retroactive coverage. New code enters the codebase tested. The
tested portion grows with every commit. After a few months, the most actively changed code has
coverage, which is exactly where coverage matters most.

### Step 3: Target high-change areas for retroactive coverage (Weeks 3-6)

Use your version control history to find the files that change most often. These are the files
where bugs are most likely and where tests provide the most value:

1. List the 10 files with the most commits in the last six months.
2. For each file, write tests for its core public behavior. Do not try to test every line - test
   the functions that other code depends on.
3. If the code is hard to test because of tight coupling, wrap it. Create a thin adapter around
   the untestable code and test the adapter. This is the Strangler Fig pattern applied to testing.

### Step 4: Make untestable code testable incrementally (Weeks 4-8)

If the codebase resists testing, introduce seams one at a time:

| Problem | Technique |
|---------|-----------|
| Function does too many things | Extract the pure logic into a separate function and test that |
| Hard-coded database calls | Introduce a repository interface, inject it, test with a fake |
| Global state or singletons | Pass dependencies as parameters instead of accessing globals |
| No dependency injection | Start with "poor man's DI" - default parameters that can be overridden in tests |

You do not need to refactor the entire codebase. Each time you touch a file, leave it slightly
more testable than you found it.

### Step 5: Set a coverage floor and ratchet it up

Once you have meaningful coverage in actively changed code, set a coverage threshold in the
pipeline:

1. Measure current coverage. Say it is 15%.
2. Set the pipeline to fail if coverage drops below 15%.
3. Every two weeks, raise the floor by 2-5 percentage points.

The floor prevents backsliding. The ratchet ensures progress. The team does not need to hit 90%
coverage - they need to ensure that coverage only goes up.

| Objection | Response |
|-----------|----------|
| "The codebase is too legacy to test" | You do not need to test the legacy code directly. Wrap it in testable adapters and test those. Every new change gets a test. Coverage grows from the edges inward. |
| "We don't have time to write tests" | You are already spending that time on manual verification and production debugging. Tests shift that cost to the left where it is cheaper. Start with one test per change - the overhead is minutes, not hours. |
| "We need to test everything before it's useful" | One test that catches one regression is more useful than zero tests. The value is immediate and cumulative. You do not need full coverage to start getting value. |
| "Developers don't know how to write tests" | Pair a developer who has testing experience with one who does not. If nobody on the team has experience, invest one day in a testing workshop. The skill is learnable in a week. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Test count | Should increase every sprint |
| Code coverage of actively changed files | More meaningful than overall coverage - focus on files changed in the last 30 days |
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Should increase slightly as tests are added, but stay under 10 minutes |
| Defects found in production vs. in tests | Ratio should shift toward tests over time |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Should decrease as test coverage catches regressions before deployment |
| Manual testing effort per release | Should decrease as automated tests replace manual verification |

## Team Discussion

Use these questions in a retrospective to explore how this anti-pattern affects your team:

- What percentage of our test coverage is automated today? How long would it take to run a full regression manually?
- Which parts of the system are we most afraid to change? Is that fear connected to missing test coverage?
- If we could automate one manual testing step this sprint, what would have the highest immediate impact?

## Related Content

- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - How to build a test strategy for CD
- [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}) - Tests need a pipeline to run in
- [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}) - The next problem to solve once you have tests
- [Manual Regression Testing Gates]({{< relref "/docs/anti-patterns/testing/manual-regression-testing-gates" >}}) - The manual testing this replaces
- [Deterministic Pipeline]({{< relref "/docs/migrate-to-cd/pipeline/deterministic-pipeline" >}}) - Tests as automated quality gates
- [Testing & Observability Gaps]({{< relref "/docs/reference/defect-sources/testing-and-observability-gaps" >}}) - defect categories that survive without automated test coverage.
