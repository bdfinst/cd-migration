---
aliases:
  - /docs/symptoms/test-data-management-chaos/
title: "Tests Interfere with Each Other Through Shared Data"
linkTitle: "Test data management chaos"
description: >
  Tests share mutable state in a common database. Results vary by run order, making failures unreliable signals of real bugs.
tags:
  - test-strategy
  - environment-consistency
---

## What you are seeing

Your test suite is technically running, but the results are a coin flip. A test that passed yesterday fails today because another test ran first and left dirty data in the shared database. You spend thirty minutes debugging a failure only to find the root cause was a record inserted by an unrelated test two hours ago. When you rerun the suite in isolation, everything passes. When you run it in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) with the full suite, it fails at random.

Shared database state is the source of the chaos. The database schema and seed data were set up once, years ago, by someone who has since left. Nobody is sure what state the database is supposed to be in before any given test. Some tests clean up after themselves; most do not. Some tests depend on records created by other tests. The execution order matters, but nobody explicitly controls it - so the suite is fragile by construction.

The downstream effect is that your team has stopped trusting test failures. When a red build appears, the first instinct is not "there is a bug" but "someone broke the test data again." You rerun the build, it goes green, and you ship. Real bugs make it to production because the signal-to-noise ratio of your test suite has collapsed.

## Common causes

### Manual testing only

Teams that have relied on manual testing tend to reach for a shared database as the natural extension of how testers have always worked - against a shared test environment. When automated tests are added later, they inherit the same model: one environment, one database, shared by everyone. Nobody designed a data strategy; it evolved from how the team already worked.

When teams shift to isolated test data - each test owns and tears down its own data - interference disappears. Tests become deterministic. A failing test means code is broken, not the environment.

**Read more:** [Manual testing only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}})

### Inverted test pyramid

When most automated tests are end-to-end or integration tests that exercise a real database, test data problems compound. Each test requires realistic, complex data to be in place. The more tests that depend on a shared database, the more opportunities for interference and the harder it becomes to manage the data lifecycle.

Shifting toward a pyramid with a large base of unit tests reduces database dependency dramatically. Unit tests run against in-memory structures and do not touch shared state. The integration and end-to-end tests that remain can be designed more carefully with isolated, purpose-built datasets. With fewer tests competing for shared database rows, the random CI failures that triggered "just rerun it" reflexes become rare, and a red build is a signal worth investigating.

**Read more:** [Inverted test pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}})

### Snowflake environments

When test environments are hand-crafted and not reproducible from code, database state drifts over time. Schema migrations get applied inconsistently. Seed data scripts run at different times in different environments. Each environment develops its own data personality, and tests written against one environment fail on another.

Reproducible environments - created from code on demand and destroyed after use - eliminate drift. When the database is provisioned fresh from a migration script and a known seed set for each test run, the starting state is always predictable. Tests that produced different results on different machines or at different times start producing consistent results, and the team can stop dismissing CI failures as environment noise.

**Read more:** [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}})

## How to narrow it down

1. **Do tests pass when run individually but fail when run together?** Mutual interference from shared mutable state is the most likely cause. Start with [Inverted test pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}).
2. **Does the test suite pass on one machine but fail in CI?** The test environment differs from the developer's local database. Start with [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}).
3. **Is there no documented strategy for setting up and tearing down test data?** The team never established a data strategy. Start with [Manual testing only]({{< relref "/docs/anti-patterns/testing/manual-testing-only" >}}).

**Ready to fix this?** The most common cause is [Inverted test pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid#how-to-fix-it" >}}) section for week-by-week steps.
