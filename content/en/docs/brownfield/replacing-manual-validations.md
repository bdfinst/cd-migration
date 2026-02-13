---
title: "Replacing Manual Validations with Automation"
linkTitle: "Replacing Manual Validations"
weight: 2
description: >
  The repeating mechanical cycle at the heart of every brownfield CD migration: identify a manual validation, automate it, prove the automation works, and remove the manual step.
---

{{% pageinfo %}}
The [Brownfield CD overview](..) covers the migration phases, principles, and common challenges.
This page covers the **core mechanical process** - the specific, repeating cycle of replacing
manual validations with automation that drives every phase forward.
{{% /pageinfo %}}

## The Replacement Cycle

Every brownfield CD migration follows the same four-step cycle, repeated until no manual
validations remain between commit and production:

1. **Identify** a manual validation in the delivery process.
2. **Automate** the check so it runs in the pipeline without human intervention.
3. **Validate** that the automation catches the same problems the manual step caught.
4. **Remove** the manual step from the process.

Then pick the next manual validation and repeat.

Two rules make this cycle work:

- **Do not skip "validate."** Run the manual and automated checks in parallel long enough to
  prove the automation catches what the manual step caught. Without this evidence, the team will
  not trust the automation, and the manual step will creep back.
- **Do not skip "remove."** Keeping both the manual and automated checks adds cost without
  removing it. The goal is replacement, not duplication. Once the automated check is proven,
  retire the manual step explicitly.

## Inventory Your Manual Validations

Before you can replace manual validations, you need to know what they are. A
[value stream map](../../under-construction/) <!-- target: migration-path/assess/value-stream-mapping --> is the fastest way to find them. Walk the
path from commit to production and mark every point where a human has to inspect, approve, verify,
or execute something before the change can move forward.

Common manual validations and where they typically live:

| Manual Validation | Where It Lives | What It Catches |
|-------------------|---------------|-----------------|
| Manual regression testing | QA team runs test cases before release | Functional regressions in existing features |
| Code style review | PR review checklist | Formatting, naming, structural consistency |
| Security review | Security team sign-off before deploy | Vulnerable dependencies, injection risks, auth gaps |
| Environment configuration | Ops team configures target environment | Missing env vars, wrong connection strings, incorrect feature flags |
| Smoke testing | Someone clicks through the app after deploy | Deployment-specific failures, broken integrations |
| Change advisory board | CAB meeting approves production changes | Risk assessment, change coordination, rollback planning |
| Database migration review | DBA reviews and runs migration scripts | Schema conflicts, data loss, performance regressions |

Your inventory will include items not on this list. That is expected. The list above covers the
most common ones, but every team has process-specific manual steps that accumulated over time.

## Prioritize by Effort and Friction

Not all manual validations are equal. Some cause significant delay on every release. Others are
quick and infrequent. Prioritize by mapping each validation on two axes:

**Friction** (vertical axis - how much pain the manual step causes):

- How often does it run? (every commit, every release, quarterly)
- How long does it take? (minutes, hours, days)
- How often does it produce errors? (rarely, sometimes, frequently)

High-frequency, long-duration, error-prone validations cause the most friction.

**Effort to automate** (horizontal axis - how hard is the automation):

- Is the codebase ready? (clean interfaces vs. tightly coupled)
- Do tools exist? (linters, test frameworks, scanning tools)
- Is the validation well-defined? (clear pass/fail vs. subjective judgment)

Start with high-friction, low-effort validations. These give you the fastest return and build
momentum for harder automations later. This is the same constraint-based thinking described in
[Identify Constraints](../../under-construction/) <!-- target: migration-path/assess/identify-constraints --> - fix the biggest bottleneck first.

| | Low Effort | High Effort |
|---|-----------|-------------|
| **High Friction** | Start here - fastest return | Plan these - high value but need investment |
| **Low Friction** | Do these opportunistically | Defer - low return for high cost |

## Walkthrough: Replacing Manual Regression Testing

A concrete example of the full cycle applied to a common brownfield problem.

### Starting state

The QA team runs 200 manual test cases before every release. The full regression suite takes three
days. Releases happen every two weeks, so the team spends roughly 20% of every sprint on manual
regression testing.

### Step 1: Identify

The value stream map shows the 3-day manual regression cycle as the single largest wait time
between "code complete" and "deployed." This is the constraint.

### Step 2: Automate (start small)

Do not attempt to automate all 200 test cases at once. Rank the test cases by two criteria:

- **Failure frequency:** Which tests actually catch bugs? (In most suites, a small number of
  tests catch the majority of real regressions.)
- **Business criticality:** Which tests cover the highest-risk functionality?

Pick the top 20 test cases by these criteria. Write automated tests for those 20 first. This is
enough to start the validation step.

### Step 3: Validate (parallel run)

Run the 20 automated tests alongside the full manual regression suite for two or three release
cycles. Compare results:

- Did the automated tests catch the same failures the manual tests caught?
- Did the automated tests miss anything the manual tests caught?
- Did the automated tests catch anything the manual tests missed?

Track these results explicitly. They are the evidence the team needs to trust the automation.

### Step 4: Remove

Once the automated tests have proven equivalent for those 20 test cases across multiple cycles,
remove those 20 test cases from the manual regression suite. The manual suite is now 180 test
cases - taking roughly 2.7 days instead of 3.

### Repeat

Pick the next 20 highest-value test cases. Automate them. Validate with parallel runs. Remove the
manual cases. The manual suite shrinks with each cycle:

| Cycle | Manual Test Cases | Manual Duration | Automated Tests |
|-------|------------------|-----------------|-----------------|
| Start | 200 | 3.0 days | 0 |
| 1 | 180 | 2.7 days | 20 |
| 2 | 160 | 2.4 days | 40 |
| 3 | 140 | 2.1 days | 60 |
| 4 | 120 | 1.8 days | 80 |
| 5 | 100 | 1.5 days | 100 |

Each cycle also gets faster because the team builds skill and the test infrastructure matures.
For more on structuring automated tests effectively, see
[Testing Fundamentals](../../migration-path/foundations/testing-fundamentals/) and
[Functional Testing](../../under-construction/) <!-- target: reference/testing/functional -->.

## When Refactoring Is a Prerequisite

Sometimes you cannot automate a validation because the code is not structured for it. In these
cases, refactoring is a prerequisite step within the replacement cycle - not a separate initiative.

| Code-Level Blocker | Why It Prevents Automation | Refactoring Approach |
|--------------------|---------------------------|---------------------|
| Tight coupling between modules | Cannot test one module without setting up the entire system | Extract interfaces at module boundaries so modules can be tested in isolation |
| Hardcoded configuration | Cannot run the same code in test and production environments | Extract configuration into environment variables or config files |
| No clear entry points | Cannot call business logic without going through the UI | Extract business logic into callable functions or services |
| Shared mutable state | Test results depend on execution order and are not repeatable | Isolate state by passing dependencies explicitly instead of using globals |
| Scattered database access | Cannot test logic without a running database and specific data | Consolidate data access behind a repository layer that can be substituted in tests |

The key discipline: refactor only the minimum needed for the specific validation you are
automating. Do not expand the refactoring scope beyond what the current cycle requires. This keeps
the refactoring small, low-risk, and tied to a concrete outcome.

For more on decoupling strategies, see
[Architecture Decoupling](../../under-construction/) <!-- target: migration-path/optimize/architecture-decoupling -->.

## The Compounding Effect

Each completed replacement cycle frees time that was previously spent on manual validation. That
freed time becomes available for the next automation cycle. The pace of migration accelerates as
you progress:

| Cycle | Manual Time per Release | Time Available for Automation | Cumulative Automated Checks |
|-------|------------------------|-------------------------------|----------------------------|
| Start | 5 days | Limited (squeezed between feature work) | 0 |
| After 2 cycles | 4 days | 1 day freed | 2 validations automated |
| After 4 cycles | 3 days | 2 days freed | 4 validations automated |
| After 6 cycles | 2 days | 3 days freed | 6 validations automated |
| After 8 cycles | 1 day | 4 days freed | 8 validations automated |

Early cycles are the hardest because you have the least available time. This is why starting with
the highest-friction, lowest-effort validation matters - it frees the most time for the least
investment.

The same compounding dynamic applies to
[small batches](../../under-construction/) <!-- target: migration-path/optimize/small-batches --> - smaller changes are easier to validate, which
makes each cycle faster, which enables even smaller changes.

## Small Steps in Everything

The replacement cycle embodies the same small-batch discipline that CD itself requires. The
principle applies at every level of the migration:

- **Automate one validation at a time.** Do not try to build the entire pipeline in one sprint.
- **Refactor one module at a time.** Do not launch a "tech debt initiative" to restructure the
  whole codebase before you can automate anything.
- **Remove one manual check at a time.** Do not announce "we are eliminating manual QA" and try
  to do it all at once.

The risk of big-step migration:

- The work stalls because the scope is too large to complete alongside feature delivery.
- ROI is distant because nothing is automated until everything is automated.
- Feature delivery suffers because the team is consumed by a transformation project instead of
  delivering value.

This connects directly to the brownfield migration principle:
[do not stop delivering features](..). The replacement cycle is designed to produce value at every
iteration, not only at the end.

For more on decomposing work into small steps, see
[Work Decomposition](../../under-construction/) <!-- target: migration-path/foundations/work-decomposition -->.

## Measuring Progress

Track these metrics to gauge migration progress. Start collecting them from
[baseline](../../under-construction/) <!-- target: migration-path/assess/baseline-metrics --> before you begin replacing validations.

| Metric | What It Tells You | Target Direction |
|--------|-------------------|-----------------|
| Manual validations remaining | How many manual steps still exist between commit and production | Down to zero |
| Time spent on manual validation per release | How much calendar time manual checks consume each release cycle | Decreasing each quarter |
| Pipeline coverage % | What percentage of validations are automated in the pipeline | Increasing toward 100% |
| Deployment frequency | How often you deploy to production | Increasing |
| Lead time for changes | Time from commit to production | Decreasing |

If manual validations remaining is decreasing but deployment frequency is not increasing, you may
be automating low-friction validations that are not on the critical path. Revisit your
prioritization and focus on the validations that are actually blocking faster delivery.

## Related Content

- [Value Stream Mapping](../../under-construction/) <!-- target: migration-path/assess/value-stream-mapping --> - Find your manual validations
- [Identify Constraints](../../under-construction/) <!-- target: migration-path/assess/identify-constraints --> - Prioritize which validation to replace first
- [Baseline Metrics](../../under-construction/) <!-- target: migration-path/assess/baseline-metrics --> - Measure your starting point
- [Testing Fundamentals](../../migration-path/foundations/testing-fundamentals/) - Build automated tests that replace manual testing
- [Work Decomposition](../../under-construction/) <!-- target: migration-path/foundations/work-decomposition --> - Break migration work into small steps
- [Small Batches](../../under-construction/) <!-- target: migration-path/optimize/small-batches --> - The principle behind incremental replacement
- [Architecture Decoupling](../../under-construction/) <!-- target: migration-path/optimize/architecture-decoupling --> - Refactoring strategies for testability
- [Deterministic Pipeline](../../under-construction/) <!-- target: migration-path/pipeline/deterministic-pipeline --> - Where automated validations live
- [Common Blockers](../../under-construction/) <!-- target: reference/common-blockers --> - Frequently encountered obstacles during migration
- [Functional Testing](../../under-construction/) <!-- target: reference/testing/functional --> - Structuring automated functional tests
